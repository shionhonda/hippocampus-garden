---
title: "Book Review: AI Engineering by Chip Huyen"
date: "2025-02-15T22:12:03.284Z"
description: "A detailed guide on how to build applications with foundation models."
featuredImage: book_review_huyen/ogp.jpg
tags: ["en", "book", "machine-learning"]
---

I recently read "[AI Engineering](https://amzn.to/3QGwm2N)" by Chip Huyen (published by O'Reilly in 2025) and will summarize its content along with my thoughts.

## General overview and thoughts

Foundation models have sparked a big change in AI. It's hard to go a day without hearing about them. Almost every digital tool we use today has some AI in it. "AI Engineering" is a detailed guide that shows us how to build AI applications. What makes this book stand out is how it ties together all the key parts—from the technical side of AI models to the practical side of setting up and developing applications. I really like how it emphasizes thinking about products in AI engineering, which many technical books often miss.

The book goes deep into topics like finetuning and inference optimization. While these topics are too advanced for your use case, they make the book a great resource for beginners and experienced engineers alike.

## Summary of the book

Let me take you through each chapter and share what I learned.

### Chapter 1: Introduction to Building AI Applications with Foundation Models

The journey into AI engineering starts with understanding its fundamental concepts. This chapter introduces important ideas such as **masked language models**, **autoregressive language models**, **self-supervision**, and foundation models. These concepts are explained in the light of recent advancements in AI, particularly highlighting the significant changes brought about by ChatGPT since 2022.

Foundation models are highly adaptable and can be used in various areas like coding, writing, chatbots, workflow automation, and media creation. However, the chapter emphasizes the need to carefully assess the specific use case when developing AI applications. You shouldn't use AI just because it's available. Safety and regulatory issues are very important because AI models are less controllable than traditional models.

The book makes a clear distinction between AI engineering and traditional machine learning engineering by focusing on a product-oriented approach. AI engineering is made up of three main layers: application development, model development, and infrastructure, with more emphasis on the first two. Unlike traditional methods that start with data, AI engineering begins with understanding product requirements and then adapts models to meet those needs. This shows a shift towards focusing on achieving specific product outcomes.

### Chapter 2: Understanding Foundation Models

This chapter delves deeper into the foundational aspects of foundation models. These models rely heavily on large datasets, and their effectiveness is directly tied to the quality of the data they are trained on. Unfortunately, many common datasets contain problems like clickbait, misinformation, and conspiracy theories. Therefore, it's crucial to filter data effectively and include a variety of languages to make these models robust and widely applicable. While general-purpose models are useful for common tasks, specialized fields like genetic research or medical imaging require domain-specific models to meet their unique needs.

The chapter also emphasizes the importance of model architectures, particularly the **Transformer**, which is the backbone of most language-based foundation models. Key concepts such as **attention mechanisms** and **multi-head attention** are explained, along with alternative architectures like state-space models, including Mamba and H3.

To ensure that models align with human values, post-training processes are necessary. These include techniques like **supervised finetuning** and preference optimization methods such as **reinforcement learning from human feedback (RLHF)** and **direct preference optimization (DPO)**. To put it simply, a pretrained model might communicate like a webpage, producing raw and unstructured text, whereas a post-trained model communicates more like a human, offering responses that are natural and coherent.

Understanding the probabilistic nature of language models is also important. The way models generate outputs is influenced by sampling strategies, with parameters like **temperature** affecting how creative or deterministic the outputs are. There are three main sampling strategies to consider:

- **Top-k sampling**: The model picks from the k most likely tokens.
- **Top-p (nucleus) sampling**: The model selects from the smallest set of tokens whose combined probability is above a certain threshold p.
- **Beam search**: The model creates multiple sequences and chooses the best one.

Many model providers now offer structured output features, which constrain the output to fit a predefined schema by limiting the possible tokens that can be generated. Despite these advancements, challenges such as inconsistencies and hallucinations remain, highlighting the ongoing need to improve AI reliability and trustworthiness.

### Chapter 3: Evaluation Methodology

[As Greg Brockman noted](https://x.com/gdb/status/1733553161884127435), evaluations are suprisingly often all we need. Despite their importance, many people still rely on subjective methods like personal opinions or simply glancing at outputs, often referred to as a "vibe check." These approaches are not dependable and can lead to wrong conclusions. As AI models become more advanced, traditional benchmarks such as GLUE are no longer sufficient. This means we need new ways to evaluate models to accurately identify which ones perform best.

One important concept in model evaluation is **perplexity**. Perplexity helps us understand how well a model can predict the next word in a sequence, which is a measure of its predictive power. It is calculated as 2 raised to the power of the entropy of the model's predictions, and it is the inverse of the probability of the next word. A lower perplexity indicates better performance, but if the perplexity is too low, it might suggest that the model has memorized the data, which is not desirable.

To assess how well model outputs match the expected results, we can use several methods. Exact match evaluations check if the output is exactly the same as the expected result. Lexical similarity metrics like BLEU and ROUGE measure how similar the output is to the expected result in terms of word choice and order. Embedding-based similarity provides a more flexible way to compare outputs by considering the meaning of the words. With the latest developments in large language models (LLMs), we can even use these models to judge the quality of outputs. However, this approach has its own challenges, such as dealing with the probabilistic nature of AI and its inherent biases.

### Chapter 4: Evaluating AI Systems

This chapter explores how to evaluate AI systems effectively, ensuring they align with business goals and deliver real value. The key is to match evaluation metrics with business KPIs, which helps in selecting models that truly meet your needs. When choosing a model, consider important factors like how well it performs in specific domains, the quality of its output, and its ability to follow instructions. With so many models available, both proprietary and open-source, having a clear and organized approach is crucial.

Here's a step-by-step guide to help you pick the right model for your specific needs:

1. Start by filtering models based on essential characteristics, such as whether they are open-source or support multiple modalities.
2. Use public benchmarks to further narrow down your options, considering factors like model quality, cost, and response time.
3. Conduct offline tests using your own data to see how the models perform in your specific context.
4. Finally, keep an eye on the model's performance in real-world applications to ensure it continues to meet your expectations.

To build a robust evaluation pipeline, follow these five steps:

1. Evaluate all parts of your system. For example, if your system extracts text from PDFs, check how accurately it does this. Use both turn-based evaluations (for each interaction) and task-based evaluations (for entire conversations).
2. Set clear evaluation guidelines. Decide what makes a good response from an AI, like whether it should be polite or direct, and ensure it meets criteria like relevance, factual accuracy, and safety. Create scoring rubrics with examples and link these metrics to your business goals.
3. Choose your evaluation methods and data. Use automated metrics whenever possible, but don't shy away from human evaluations when necessary.
4. Determine the right sample size for your tests. For instance, to detect a 1% difference in performance, you need 10,000 samples with 95% confidence. For a 3% difference, 1,000 samples are enough, and for a 10% difference, 100 samples will do.
5. Continuously refine your evaluation process. Regularly update your methods to keep them relevant and effective.

### Chapter 5: Prompt Engineering

**Prompt engineering** plays a vital role in enhancing the performance of AI models. While it can sometimes feel more like an art than a science, this chapter aims to focus on the scientific aspects of prompt engineering.

A well-crafted prompt usually consists of three main parts: a task description, examples, and the task itself. With the help of **in-context learning**, models can understand and learn from these prompts without needing to be retrained. There are three main types of prompts, listed by their priority: system prompts, user prompts, and tool prompts. It's important to note that language models can only handle text within a certain context length, which can range from 1,000 to 1 million tokens. These models tend to give more attention to the information at the beginning and end of the prompts. Here are some guidelines for creating effective prompts:

1. Be clear and specific. For example, instead of saying "Explain this," you could say "Summarize this in three sentences."
2. Define the output format clearly. For instance, you might instruct, "Respond in JSON format: {'summary': '...'}."
3. Provide examples to facilitate few-shot learning.
4. Break down complex tasks into simpler, manageable subtasks.
5. Employ **chain of thought (CoT)** reasoning to guide the model's thinking process.

As you continue to refine and adjust your prompts, managing them can become increasingly challenging. Fortunately, there are numerous tools available to help you track different versions, compare prompts using various evaluation metrics, and optimize them for better performance.

It's also crucial to protect your system from prompt attacks, such as jailbreaking, information extraction, and remote code execution. Common strategies to mitigate these risks include implementing system-level defenses, filtering contexts, and hardening prompts. Despite these measures, it is difficult to guard against every possible attack, so make sure to protect sensitive information at the system level as well.

### Chapter 6: RAG and Agents

To make AI models perform effectively, they need contextual information. There are two main ways to provide this context: through **retrieval-augmented generation (RAG)** and agents.

RAG systems use an external memory to search through documents, tables, or chat histories. They combine this with a retriever and a generative model. The retriever's quality is very important for the system's success. There are two main types of retrievers:

- **Term-based retrieval**: This method works on a lexical level, using techniques like TF-IDF and BM25. It's straightforward, quick, cost-effective, and works well without much setup.
- **Embedding-based retrieval**: This method works on a semantic level. It embeds documents and stores them in a vector database, using tools like FAISS, ScaNN, and HNSW. Although more complex, it can outperform term-based retrieval when properly optimized.

Sometimes, a combination of both term-based and embedding-based retrieval is used for better results. To evaluate retrieval performance, we use metrics like context precision, recall, NDCG, MAP, and MRR. It's also important to consider performance metrics such as query throughput and build time. To make RAG systems more efficient, we often adjust chunking strategies, re-ranking, and query rewriting.

An **agent** is a system that can understand its environment and take actions based on that understanding. Compared to RAG systems, agents usually need more powerful models because errors can increase quickly over multiple steps, and the stakes are higher when interacting with the real world. Agents use external tools to complete tasks:

- **Knowledge augmentation**: This helps in retrieving relevant information, like text retrieval or database queries.
- **Capability extension**: This expands the agent's abilities beyond the model, such as using code interpreters or web browsers.
- **Action execution**: This allows agents to interact with external environments, like sending emails or writing to a database.

For an agent to complete tasks successfully, it needs a solid planning strategy. A simple approach is to create a plan and execute it right away, but this can be risky if the plan has errors. A better method is to create a plan and check it before executing. This validation can be done using simple rules (like ensuring the plan is less than 10 steps) or by using another call to an LLM.

To improve agent performance, systems often include plan generation, reflection, error correction, execution validation, and function calling. If an agent uses many tools, analyzing how these tools are used can help optimize execution. For instance, if two tools are often used together, they can be combined to reduce overhead. It's also crucial to limit the agent's access to the real world to prevent security risks.

### Chapter 7: Finetuning

Finetuning is a technique used to enhance a model's ability to follow instructions, ensuring it produces outputs in specific styles and formats that meet your needs. This process can make models more tailored to your requirements, but it comes with a significant initial cost in terms of time and resources.

When deciding between finetuning and RAG, it's important to weigh the pros and cons. Finetuning might not always be the best first step for several reasons. Firstly, it can negatively impact a model's performance on tasks it wasn't specifically finetuned for. Secondly, successful finetuning demands a deep understanding of model training processes. Thirdly, it can be expensive. Additionally, while you are in the process of finetuning, model providers might release updates or improvements to their models, potentially rendering your finetuning efforts less effective. Therefore, it is generally advised to maximize the performance of your model through prompt engineering before considering finetuning. Prompt engineering can often achieve significant improvements without the downsides of finetuning. Moreover, one of the main reasons AI systems fail is due to insufficient information, a problem that RAG can effectively address by providing the necessary context.

If you decide to proceed with finetuning, you need to understand how to train models. This includes grasping key concepts such as backpropagation, numeric representations, and training hyperparameters like learning rate, batch size, and the number of epochs. You should also be familiar with parameter-efficient finetuning techniques, such as **low-rank adaptation (LoRA)**, to make the process more efficient and effective.

### Chapter 8: Dataset Engineering

To successfully finetune a model, it's essential to start with a high-quality dataset. This chapter will guide you through the process of building effective training data.

The quality of your data is crucial. Often, a small amount of high-quality data can be more effective than a large quantity of poor-quality data. Research, such as the findings from Llama 3, shows that human-generated data can sometimes be error-prone and inconsistent, particularly in areas like safety policies. So, what defines high-quality data? Key factors include relevance, consistency, correctness, proper format, uniqueness, and compliance with standards. Your dataset should encompass a wide range of problems that your model is expected to address. For example, if your model needs to handle coding tasks, your dataset should include examples of coding. Similarly, if your chat model must support multiple languages, ensure your dataset includes those languages. The amount of data required depends on various factors, including the finetuning techniques you plan to use, the complexity of the tasks, and your performance objectives. Striking the right balance between data quantity and quality is vital.

Annotating data is a challenging task. It's important to establish clear guidelines for annotators to follow; otherwise, they might produce inconsistent results. Due to the difficulties in data annotation, you might consider generating data using another LLM. This method can help increase data quantity and coverage, address privacy concerns, and enhance overall data quality.

Data processing must align with the specific needs of your use case. Begin by examining the data to ensure it aligns with your objectives. Analyze the data distribution, look for outliers, and check the time range, among other factors. If you identify any issues, it's necessary to clean the data. This involves removing irrelevant, duplicate, sensitive, copyrighted, and toxic data. A manual review of the data is essential to confirm that your data processing methods are effective and accurate.

### Chapter 9: Inference Optimization

When you decide to deploy your model, you should focus on optimizing the inference process to keep costs low. This involves understanding and balancing various metrics that can affect performance. Some key metrics to be aware of include **time to first token (TTFT)**, **time per output token (TPOT)**, **time between tokens (TBT)**, **latency**, and **throughput**. Each of these metrics plays a role in how efficiently your model operates.

Choosing the right hardware is also important. You need to understand the memory hierarchy, which includes GPU Static RAM, High Bandwidth Memory, and CPU Dynamic RAM. Additionally, being familiar with different utilization metrics and AI accelerators can help you make informed decisions.

There are several techniques you can use to optimize the inference process:

- **Quantization**: This technique involves reducing the precision of model weights, which helps decrease memory usage and computational costs.
- **Distillation**: Here, you train a smaller model to replicate the behavior of a larger model, making it more efficient.
- **Speculative decoding**: This method allows you to decode multiple tokens quickly using a lightweight model, and then verify these predictions in parallel with the original model.
- **Inference with references**: By using reference tokens from the input and verifying them with the original model, you can improve tasks like updating code drafts.
- **Batching**: This increases GPU utilization by processing multiple requests together, which can enhance efficiency.
- **Key-Value cache**: This reduces the computational load of the attention mechanism by caching key and value matrices.
- **Prompt cache**: By caching pre-fill results, you avoid recomputing them for repeated queries, saving time and resources.
- **Advanced parallelism techniques**: These techniques help reduce redundant memory usage across GPUs, further optimizing performance.

By carefully applying these techniques, you can significantly improve the efficiency and cost-effectiveness of your model's inference process.

### Chapter 10: AI Engineering Architecture and User Feedback

To conclude the book, this chapter discusses how to apply the techniques covered here to build successful products. This takes an iterative process.

1. Enhance context by giving the model access to external data sources and tools
2. Add guardrails to protect your system and your users
3. Add model routers and gateways to optimize cost and performance
4. Optimize for latency and costs with caching
5. Add agent patterns to maximize the capabilities of your system

To iterate on the above steps, user feedback plays a critical role. In the context of LLMs, there are new ways to collect feedback. You can obtain explicit feedback by directly asking users questions like, "Did we solve your problem?" Implicit feedback can also be gathered by observing user behavior. For instance, if users frequently stop the response generation midway, exit the application unexpectedly, or display signs of frustration, these actions may indicate that the system is not meeting their needs. However, it's important to recognize the limitations of feedback. Feedback can be influenced by randomness, position bias, and recency bias, which means it might not always be reliable. Users may also find it challenging to evaluate which response is better, especially in scenarios involving complex tasks like solving math problems.
