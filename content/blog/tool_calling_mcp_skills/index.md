---
title: "Tool Calling, MCP, and Skills: How LLM Agents Actually Use External Capabilities"
date: "2026-03-27T22:01:03.284Z"
description: "A practical, implementation-level explanation of tool calling, MCP, skills, and why CLI-based agents have become common."
featuredImage: tool_calling_mcp_skills/ogp.jpg
tags: ["en", "deep-learning", "programming"]
---

TL;DR: Tool calling, MCP, and skills are often discussed as if they were competing features, but they operate at different layers. Tool calling is a structured output mechanism. MCP is a protocol for supplying tools. Skills are text instructions that shape how the model reasons. From the model's point of view, all of them ultimately enter the context window as text or text-like structure. Once you look at them this way, two recent trends become easier to understand: why skill loading is usually implemented as progressive disclosure, and why many coding agents lean heavily on CLI tools.

I recently had a long conversation about tool calling, MCP, skills, and CLI-based agents. What made the discussion interesting was that the disagreement was not really about product features. It was about implementation boundaries.

People often ask questions like:

- Is MCP replacing tool calling?
- Are skills just another kind of tool?
- Why do coding agents seem to prefer CLI over a "cleaner" protocol?

These are reasonable questions, but they mix together several layers of the stack. In this post, I want to reorganize them from the model's point of view. The key idea is simple: an LLM does not directly execute tools, mount protocols, or "run a skill." It generates tokens under a carefully assembled context. The rest is orchestration.

If you read [my earlier post on prompt and tool serialization](https://hippocampus-garden.com/llm_serialization/), this article is a continuation of the same theme.

## Everything Reduces to Context Construction

At the lowest level, an LLM predicts the next token. That sounds trivial, but it is the right starting point. A tool schema, an MCP-exposed tool, and a skill document may look different to us as developers, yet all of them eventually influence generation by being inserted into the model's input context.[^1]

This is why these concepts are easy to confuse. They all give the model "external capability," but they do so by different mechanisms:

- **Tool calling** gives the model a structured output format.
- **MCP** gives the application a standard way to fetch and expose tools.
- **Skills** give the model procedural guidance in natural language.

So the important question is not "which one wins?" The important question is: **what information is being injected into context, and which parts are delegated to the runtime outside the model?**

## Tool Calling: Structured Output, Not Execution

Let's start from the lowest layer.

With tool calling, the application provides a tool schema, usually with a name, description, and parameter schema. The model then emits something like:

```json
{
  "name": "search_books",
  "arguments": {
    "query": "philosophy"
  }
}
```

It is tempting to say that the model "called a function," but that is not literally what happened. The model generated a structured sequence of tokens that matched the expected format. The runtime saw that output, parsed it, executed the real function, and returned the result to the model as another message.

This distinction matters because it explains both the power and the limitation of tool calling:

- It is relatively deterministic compared with free-form text.
- It is easy to evaluate because you can check whether the tool name and arguments are valid.
- It does not, by itself, solve discovery, routing, authorization, or state management.

In other words, tool calling is best understood as a **syntax layer**. It gives the model a way to express "please execute this operation," but the execution still happens elsewhere.

## MCP: A Protocol Layer on Top of the Same Basic Idea

**MCP** (**Model Context Protocol**) sits one layer above tool calling. Instead of embedding all tool definitions directly into an application's prompt-building logic, MCP standardizes how a host application can connect to external servers that provide tools, resources, and prompts.

From the model's point of view, however, the story is less dramatic than the acronym might suggest. The model still ends up seeing a set of tool descriptions, names, and schemas, then producing a structured request for one of them. What MCP changes is the path by which those tools become available.[^2]

This makes MCP useful for several reasons:

- Tool definitions can be supplied dynamically rather than hardcoded into one application.
- The host, client, and server responsibilities are separated more cleanly.
- External integrations become more reusable across applications.

So MCP is not an alternative to tool calling. It is closer to a **transport and integration layer** for tool exposure. Tool calling still remains the mechanism by which the model expresses the request.

## Skills: Reasoning Scaffolds, Not Tools

Skills are different.

When systems such as Codex or Claude Code use a `SKILL.md`-style document, the file is not usually "executed" as a tool. Instead, it acts like a reusable instruction module. It tells the model how to approach a class of tasks:

```md
To deploy a service:
1. Run tests
2. Build the artifact
3. Deploy via CLI
4. Verify the health endpoint
```

This is why I think the best mental model for skills is **reasoning scaffold**. A skill does not do the work. It shapes the model's plan for doing the work.

That difference is subtle but important:

- A tool is something the runtime can execute.
- A skill is something the model reads and interprets.
- A tool answers "do this."
- A skill answers "here is a good way to think about this."

This also explains why skills feel flexible but less deterministic. Because they are written in natural language, they can compress a lot of procedural knowledge into a small amount of text. But they can also be ignored, misread, or overridden by other instructions.

In that sense, skills are best understood as a **semantics or policy layer**.

## Why Skills Are Usually Loaded Progressively

Once you treat skills as prompt modules, the next question becomes obvious: do systems load all skills all the time?

In practice, usually not.

OpenAI's documentation explicitly describes **progressive disclosure** for skills: the system first uses lightweight metadata such as the skill's name and description, and only loads the full skill content when the task appears relevant.[^3] The cookbook example for using skills in the API shows the same pattern. The hidden prompt contains a list of available skill bundles with short descriptors and file paths, while the actual bundle content is mounted separately for use when needed.[^4]

Anthropic's Claude Code documentation describes a similar idea through project-specific slash commands and custom instructions stored as Markdown files, and Cursor describes its own approach as **dynamic context discovery**.[^5][^6]

This pattern exists for a practical reason: loading every workflow document, every helper script, and every reference file into context at all times would be wasteful. It would increase token cost, add noise, and make tool selection harder rather than easier.

So a skill is often not a static prompt block. It is more like a **lazy-loaded prompt module**.

## How Skill Selection Is Probably Implemented

This is the part many people use without thinking about.

When a coding agent "chooses a skill," it is easy to imagine the main model reading every skill and making a grand, fully autonomous decision. Public documentation suggests something more mundane and more plausible.

A reasonable inference is that production systems use a hybrid pipeline:[^3][^6][^7]

1. A cheap filter narrows the candidate set using metadata such as name, description, tags, file path, or keyword overlap.
2. Retrieval or reranking reduces the set further.
3. The main model, or a smaller routing model, makes the final relevance decision.
4. Only then is the full skill content loaded into the final context.

I call this an inference because vendors usually do not publish the entire orchestrator implementation. Still, the pieces line up:

- OpenAI says that skill `name` and `description` are the main signals for triggering a skill.[^3]
- OpenAI's API cookbook exposes the skill registry as structured metadata, not as one giant prompt blob.[^4]
- Cursor explicitly frames context loading as dynamic discovery rather than static inclusion.[^6]
- Recent work on MCP tool selection also points toward retrieval-based narrowing when the tool set becomes large.[^7]

So the important correction is this: **skill selection is not "the LLM just picks one somehow."** It is more likely a layered retrieval-and-routing problem whose last step happens to involve an LLM.

## Why CLI Has Become So Common

Now we can return to a practical trend. Why do so many coding agents seem to favor CLI?

I do not think the answer is "CLI is better than MCP" in the abstract. The better explanation is that CLI sits at a useful point in the trade-off space.

First, many developer tools already have a CLI. `git`, `docker`, `vercel`, `terraform`, `supabase`, `pytest`, `wrangler` and countless others expose mature command-line interfaces. This means an agent can often use existing infrastructure instead of waiting for someone to build and maintain a separate MCP server.

Second, modern models have become much better at the surrounding loop:

- generating shell commands,
- reading `stdout` and `stderr`,
- reacting to exit codes,
- retrying after failure,
- chaining multiple steps together.

That makes CLI feel "native" to coding agents even though it is still just an external execution surface.

Third, CLI often has forgiving failure semantics. A bad command usually returns an error message, a non-zero exit status, or partial output that can be inspected and corrected. By contrast, schema mismatches in a rigid interface can fail earlier and more opaquely.

Finally, CLI reduces upfront integration cost. A protocol like MCP can be the right answer when you need reusable integration, permission boundaries, or cross-application standardization. But it also introduces server maintenance, schema design, versioning, and authentication overhead. Even articles arguing for MCP usually acknowledge that this is a real trade-off.[^8]

This is why I do not see the current popularity of CLI as a rejection of structure. I see it as a consequence of better models plus lower integration friction.

## Putting the Layers Together

Once we separate the layers, the relationships become clearer.

- **Tool calling** is the syntax by which the model emits an execution request.
- **MCP** is the transport layer by which tools can be discovered and supplied.
- **Skills** are semantic guidance that shape the model's reasoning before it emits either text or a tool request.
- **CLI** is one common execution surface used by the runtime after the model has decided what to do.

That leads to a simple but useful architecture:

1. Build context.
2. Optionally load relevant skills.
3. Expose tools directly or via MCP.
4. Let the model generate text or a structured action.
5. Execute outside the model.
6. Return the observation.
7. Repeat.

This is also why I think debates such as "skills vs MCP" are often framed too broadly. They are not perfect substitutes. They solve different parts of the problem.

## The Real Design Question

The deeper design question is not whether an agent should use tool calling, MCP, skills, or CLI.

The real question is: **how much responsibility do you want to assign to the model?**

If you want stronger guarantees, you move more logic into explicit schemas, constrained execution, and protocol boundaries.

If you want lower upfront cost and more flexibility, you shift more burden onto the model by giving it reusable textual guidance and a permissive execution surface such as CLI.

That is the trade-off behind a lot of today's agent design. In that sense, the evolution of agent systems is not just about adding more capabilities. It is about redistributing responsibility between the LLM and the surrounding runtime.

## Concluding Remarks

When people say that skills made MCP obsolete, I think they are noticing a real shift but describing it imprecisely.

What changed is not that one layer replaced another. What changed is that stronger models made it more practical to rely on natural-language guidance and general-purpose interfaces. As a result, the center of gravity moved a bit from rigid structure toward model-guided orchestration.

But the stack is still layered. Tool calling, MCP, skills, and CLI all remain useful. The main job of an engineer is to decide which layer should carry which kind of complexity.

[^1]: [How LLMs Actually Process Your Prompts, Tools, and Schemas](https://hippocampus-garden.com/llm_serialization/).
[^2]: [Model Context Protocol introduction](https://modelcontextprotocol.io/introduction).
[^3]: OpenAI, [Codex Skills](https://developers.openai.com/codex/skills/) and [Testing Agent Skills Systematically with Evals](https://developers.openai.com/blog/eval-skills/). These documents describe progressive disclosure and note that a skill's name and description are primary routing signals.
[^4]: OpenAI Cookbook, [Skills in the API](https://developers.openai.com/cookbook/examples/skills_in_api/). The example exposes skill metadata in the hidden prompt and mounts the bundle for access during execution.
[^5]: Anthropic, [Claude Code slash commands](https://docs.anthropic.com/en/docs/claude-code/slash-commands). Claude Code supports project-specific Markdown commands and related local instruction files, which are conceptually similar to lightweight prompt modules.
[^6]: Cursor, [Dynamic Context Discovery](https://cursor.com/blog/dynamic-context-discovery). Cursor describes loading only the context that appears relevant to the current task.
[^7]: Sarat Mudunuri, Jian Wan, Ally Qin, Srinivasan Manoharan. [Semantic Tool Discovery for Large Language Models: A Vector-Based Approach to MCP Tool Selection](https://arxiv.org/abs/2603.20313). I cite this not as proof of one vendor's private implementation, but as evidence that retrieval-based narrowing is a natural solution to large tool sets.
[^8]: Adrian Machado, [CLI vs MCP: Which Interface Works Best for AI Agents?](https://zuplo.com/blog/cli-or-mcp). This is not a formal paper, but it usefully summarizes the integration-cost trade-offs that many teams face in practice.
