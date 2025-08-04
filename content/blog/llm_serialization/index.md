---
title: "How LLMs Actually Process Your Prompts, Tools, and Schemas"
date: "2025-08-04T22:01:03.284Z"
description: "A deep dive into how LLMs serialize prompts, output schemas, and tool descriptions into a token sequence, with examples from Llama 4's implementation."
featuredImage: llm_serialization/ogp.jpg
tags: ["en", "deep-learning", "nlp"]
---

"Hey, this tool description looks like a prompt. Should I put it in the system prompt or pass it as a tool parameter?"

One of my colleagues asked me this question a while ago, and it's such a great question! When you're writing:

```python
tools = [{
    "function": {
        "name": "get_weather",
        "description": "Get the current weather for a city"  # This looks like a prompt!
    }
}]
```

That description does look exactly like something you'd write in a prompt. So why do we pass it separately?

Here's the thing that is not obvious to developers: **inside the LLM, there's no difference**. Your system prompt, user message, tool definitions, and JSON schemas all become a single, continuous stream of tokens.

This blog post reveals how LLMs serialize all these components into one sequence, using [Llama 4](https://www.llama.com/docs/model-cards-and-prompt-formats/llama4/) and [Kimi K2](https://moonshotai.github.io/Kimi-K2/) as our main examples.

## Everything Is Tokens

LLMs don't see your nicely structured API calls. They see tokens - numerical representations of text chunks. When you make this API call:

```python
response = client.chat.completions.create(
    model="llama-4",
    messages=[
        {"role": "system", "content": "You are a helpful assistant"},
        {"role": "user", "content": "What's the weather in Beijing?"}
    ],
    tools=[{
        "type": "function",
        "function": {
            "name": "get_weather",
            "description": "Get current weather",
            "parameters": {...}
        }
    }]
)
```

The LLM receives something like this token stream:

```
<|begin_of_text|><|header_start|>system<|header_end|>
You are a helpful assistant

Here is a list of functions in JSON format that you can invoke:
[{"type": "function", "function": {"name": "get_weather", "description": "Get current weather", "parameters": {...}}}]
<|eot|>
<|header_start|>user<|header_end|>
What's the weather in Beijing?<|eot|>
<|header_start|>assistant<|header_end|>
```

Notice how tool definitions are injected into the token stream in the system prompt.

## The Serialization Process

Let's break down the serialization process step by step.

### 1. Role-Based Messages

Each message gets wrapped with special tokens that tell the model what type of content it's reading:

- System prompts: `<|header_start|>system<|header_end|>...<|eot|>`
- User messages: `<|header_start|>user<|header_end|>...<|eot|>`
- Assistant responses: `<|header_start|>assistant<|header_end|>...<|eot|>`

"eot" is short for "end of turn" and it's a special token that must be added after each message.

### 2. Structured Output Schemas

When you request structured output with a JSON schema, it's typically added as part of the system prompt:

```text
<|header_start|>system<|header_end|>
...
You must respond in JSON format matching this schema:
{"type": "object", "properties": {"name": {"type": "string"}, "age": {"type": "number"}}}
<|eot|>
```

LLMs are trained to generate JSON objects that match the schema.

### 3. Tool Calling

[Tools are just structured outputs](https://github.com/humanlayer/12-factor-agents/blob/main/content/factor-04-tools-are-structured-outputs.md), so it works the same way.

```text
<|header_start|>system<|header_end|>
...
Here is a list of functions in JSON format that you can invoke:
[
  {
    "type": "function",
    "function": {
      "name": "get_weather",
      "description": "Get weather for a location",
      "parameters": {
        "type": "object",
        "properties": {
          "location": {"type": "string"}
        }
      }
    }
  }
]
<|eot|>
```

Tool calling creates a multi-turn conversation. After the model outputs a tool call, the application executes it and feeds the result back:

```text
<|header_start|>tool<|header_end|>
{"temperature": "22°C", "condition": "sunny"}
<|eot|>
<|header_start|>assistant<|header_end|>
The weather in Beijing is currently sunny with a temperature of 22°C.
<|eot|>
```

The entire conversation – system prompt, user query, tool results, and final response – forms one continuous token stream.

### 4. Images

What if you pass an image to the model? If the model supports image inputs, they would be serialized like this:

```text
<|begin_of_text|><|header_start|>user<|header_end|>
<|image_start|><|image|><|patch|>...<|patch|><|image_end|>Describe this image in two sentences<|eot|>
```

Images are split into patches, and each patch is encoded as a string (e.g., base64). Then image patches are tokenized by a separate image tokenizer.

## Why This Matters for Developers

Thankfully, API providers abstract away most of this complexity and you don't have to understand how to serialize your prompts for the LLM. But understanding the underlying mechanism helps you debug issues and optimize token usage.

- **Order matters**: Most models expect tool definitions early in the token stream, typically right after the system prompt. This means when the conversation becomes long, the tool definition goes in the middle of the context window, where the model tends to pay less attention.
- **Hack your context window**: If you want to optimize for token usage, you could use [a hack like this](https://github.com/humanlayer/12-factor-agents/blob/main/content/factor-03-own-your-context-window.md#standard-vs-custom-context-formats) to save tokens for representing roles and turns.

## Conclusion

Here are the key takeaways:

- **Everything is serialized**: Your separate API parameters all end up in one token sequence with special tokens
- **Position matters**: Tool definitions typically come after system prompts but before user messages
- **It's all learned behavior**: Models must be trained on these exact patterns to work correctly

Next time you use tool calling or structured outputs, remember: you're not really passing separate parameters to the model. You're contributing to a carefully orchestrated token stream that the model has learned to parse and respond to. The magic isn't in the API - it's in how the model learned to interpret these special token patterns during training.

Answering the original question: **the tool description is serialized into the token stream just like any other part of the conversation**. The model is supposed to understand how to use tools just from tool descriptions, but if it doesn't work well, you can always add it to the system prompt for better context.