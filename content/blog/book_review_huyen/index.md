---
title: "Book Review: AI Engineering by Chip Huyen"
date: "2025-02-15T22:12:03.284Z"
description: "A comprehensive overview of AI engineering, covering foundation models, application development, and infrastructure."
featuredImage: book_review_huyen/ogp.jpg
tags: ["en", "book", "machine-learning"]
---

I recently read "AI Engineering" by Chip Huyen (published by O'Reilly in 2025) and will summarize its content along with my thoughts.

## General overview and thoughts

"AI Engineering" is a comprehensive guide that takes us through the fascinating world of building AI applications. What makes this book special is how it connects all the important pieces - from the technical details of AI models to the practical aspects of infrastructure and application development. One thing I particularly appreciate is its focus on product-oriented thinking in AI engineering, which is often overlooked in technical books.

The book goes deep into topics like foundation models and evaluation methods. While these chapters can be challenging, especially if you're new to these concepts, they provide valuable insights that both beginners and experienced engineers will find useful. The detailed explanations helped me understand not just how to build AI systems, but why we make certain technical choices along the way.

After reading and summarizing this book, I've come to better understand just how complex and powerful AI engineering can be. The book gives you practical tools and knowledge to build real AI applications, while also helping you understand the bigger picture of what's possible with today's AI technology.

## Summary of the book

Let me walk you through each chapter and share what I learned.

### Chapter 1: Introduction to Building AI Applications with Foundation Models

The journey begins with the fundamentals of AI engineering. The chapter introduces key concepts like masked language models, autoregressive language models, self-supervision, and foundation models. What's particularly interesting is how it frames these concepts in the context of recent AI developments - especially the transformative impact of ChatGPT since 2022.

Foundation models are versatile, applicable in coding, writing, chatbots, workflow automation, and media generation. However, the chapter stresses the importance of carefully evaluating the use case when developing AI applications, as AI should not be employed simply because it is available. Safety and regulatory considerations are critical, given AI's limited controllability compared to traditional models.

The book differentiates AI engineering from traditional machine learning engineering by emphasizing its product-oriented approach. AI engineering consists of three key layers: application development, model development, and infrastructure, with a greater focus on the first two. Unlike traditional approaches that start with data, AI engineering begins with product requirements and adapts models accordingly, highlighting a shift towards prioritizing product outcomes.

### Chapter 2: Understanding Foundation Models

This chapter further digs into the basics of foundation models. Given their reliance on large datasets, foundation models are only as good as the data they are trained on, with common datasets often plagued by issues like clickbait, misinformation, and conspiracy theories. As such, effective data filtering and the inclusion of diverse languages are essential to ensure robustness and wide applicability. While general-purpose models serve common needs, domain-specific models, such as those for genetic research or medical imaging, are vital for specialized fields.

The chapter also highlights the significance of model architectures, focusing on the Transformer, which dominates language-based foundation models. Key concepts such as attention mechanisms and multi-head attention are discussed, along with alternatives like state-space models (e.g., Mamba and H3).

To align models with human values, post-training processes, including supervised finetuning and preference optimization techniques like Reinforcement Learning from Human Feedback (RLHF) and Direct Preference Optimization (DPO), are essential. An analogy to understand this is:

- A pretrained model talks like a webpage, producing raw, unstructured text.
- A post-trained model talks like a human, generating more natural, coherent responses.

It's important to understand the probabilistic nature of language models. Sampling strategies significantly influence model outputs, with parameters like temperature affecting creativity and determinism. There are three main sampling strategies:

- Top-k sampling: The model selects from the k most probable tokens.
- Top-p (nucleus) sampling: The model chooses from the smallest set of tokens whose cumulative probability exceeds a threshold p.
- Beam search: The model generates multiple sequences and selects the best one.

Many model providers offer structured output features, where the output is constrained by a predefined schema. This is done by limiting the possible tokens that can be generated by the provided schema. Despite all the advancements, challenges like inconsistencies and hallucinations persist, underscoring the need for ongoing efforts to enhance AI reliability and trustworthiness.

### Chapter 3: Evaluation Methodology

As Greg Brockman noted, evaluations are suprisingly often all we need. Due to its challenges, many people rely on subjective assessments, such as trusting opinions without rigorous validation or eyeballing outputs (also known as a "vibe check"). However, these methods are not reliable and can lead to incorrect conclusions. As AI models grow more sophisticated, traditional benchmarks like GLUE are becoming saturated, necessitating new evaluation methods to effectively distinguish between high-performing models.

A key concept introduced is perplexity, which helps measure a model's predictive capability and detect memorization issues by indicating how well a model can predict the next token in a sequence. Perplexity is 2 to the power of the entropy of the model's predictions, and it is the inverse of the probability of the next token. Lower perplexity suggests better performance, while unusually low perplexity on a text may indicate data leakage.

To compare the model outputs with the ground truth, we can use exact match evaluations, lexical similarity metrics like BLEU and ROUGE, and embedding-based similarity for more nuanced and flexible model assessments. The recent advancements in LLMs have made it possible to use LLMs to evaluate the quality of the model outputs (AI as a judge), though this comes with challenges such as AI's probabilistic nature and inherent biases.

### Chapter 4: Evaluating AI Systems

This chapter focuses on the methodologies for evaluating AI systems, emphasizing the alignment of evaluation metrics with business KPIs to ensure that AI applications deliver tangible value. It highlights several critical aspects to consider when selecting models, such as domain-specific capabilities, generation quality, and instruction-following abilities. Given the plethora of models available, both proprietary and open-source, a structured approach is necessary for effective model selection.

This chapter provides a framework for choosing the right model for your use case among many available models.

1. Filter out models by hard attributes (e.g., open source, multi-modal, etc.)
2. Use public benchmarks to narrow down the list (e.g., model quality, cost, latency, etc.)
3. Run offline evaluations on your own data
4. Monitor the model's performance online

Building an evaluation pipeline is detailed in five steps, starting with evaluating all system components and defining clear evaluation guidelines. It stresses the importance of both automated and human evaluations, determining appropriate sample sizes for statistical reliability, and iterating on the evaluation process to maintain relevance and robustness. The chapter concludes by underscoring the necessity of combining automated and manual methods to optimize AI applications for accuracy and efficiency.

1. Evaluate all system components
   - If your system extracts text from PDFs, evaluate its extraction accuracy.
   - Use both turn-based and task-based (i.e., per conversation) evaluations
2. Define evaluation guidelines
   - Which is a good response from an AI-powered coach, a polite but not helpful feedback, or a direct but helpful feedback?
   - For customer support AI, a good response might be defined based on relevance, factual consistency, and safety.
   - Once criteria are set, create scoring rubrics with clear examples and tie evaluation metrics to business objectives.
3. Define evaluation methods & data
   - Use automated metrics whenever possible
   - But don’t hesitate to incorporate human evaluation when needed.
4. Determining sample size
   - To detect a 1% difference, you need 10,000 samples (95% confidence).
   - For a 3% difference, you need 1,000 samples.
   - For a 10% difference, you need 100 samples.
5. Iterating on the evaluation pipeline

### Chapter 5: Prompt Engineering

Prompt engineerig is a crucial component for optimizing AI model performance but sometimes it is an art rather than a science. As the "art" part changes over time, this chapter focuses on the science part.

A prompt typically includes a task description, examples, and the task itself. Thanks to the in-context learning capabiliry, models can learn from prompts without retraining. There are different types of prompts: system prompts, user prompts, and tool prompts, in the order of the priority. Language models can only process text within a fixed context length, typically ranging from 1000 to 1 million tokens. Models prioritize information at the beginning and end of prompts. Here are some tips for writing effective prompts:

1. Be clear & unambiguous (e.g., “Explain this” → instead, say “Summarize this in 3 sentences.”).
2. Specify the output format (e.g., “Respond in JSON format: {‘summary’: ‘…’}”)
3. Provide examples (few-shot learning)
4. Break down complex tasks into simpler subtasks
5. Use Chain of Thought (CoT) reasoning

As you iterate on the prompts, it will get harder to manage them. There are many tools available to track versions, compare prompt on various evaluation metrics, and optimize for better performance.

It is essential to defend your system against prompt attacks like jailbreaking, information extraction, and remote code execution. Common mitigation strategies include system-level defenses, context filtering, and prompt hardening. Nevertheless, it is hard to defend your prompt against all attacks, so it is important to safeguard sensitive information at the system level.

### Chapter 6: RAG and Agents

AI models require contextual information to perform well. There are two dominant patterns to provide contextual information: retrieval-augmented generation (RAG) and agents.

RAG systems combine an external memory for searching documents, tables, or chat histories with a retriever and a generative model. The quality of the retriever is crucial for success. There are two approaches to build a retriever:

- Term-based retrieval: Operates on a lexical level (e.g., TF-IDF and BM25)
- Embedding-based retrieval: Operates on a semantic level, embedding documents and storing them in a vector database (e.g., FAISS, ScaNN, and HNSW).

Term-based retrieval is simpler, faster, cheaper, and works well out of the box. Embedding-based retrieval is complex but can outperform term-based retrieval if optimized. We can also take a hybrid approach by using both term-based and embedding-based retrieval. Common evaluation metrics for retrieval include context precision, recall, NDCG, MAP, and MRR. Performance metrics like query throughput and build time are also important. To optimize RAG, we typically tweak chunking strategies, re-ranking, and query rewriting.

An agent is any system that can perceive its environment and act upon it. Compared to RAG, agents typically require more powerful models because error rates compound exponentially over multiple steps and there is a higher stake for interacting with the real world. Agents leverage external tools to solve tasks:

- Knowledge Augmentation: Helps retrieve relevant information (e.g., text retrieval, querying a database).
- Capability Extension: Extends the agent’s abilities beyond the model (e.g., code interpreters, web browsers).
- Action Execution: Allows agents to interact with external environments (e.g., sending an email, writing to a database).

To complete tasks successfully, an agent needs a good planning strategy. A naive approach is to generate a plan and execute it immediately. However, this approach is risky because the plan may contain errors. A better approach is to generate a plan and validate it before execution. The validation can be done using heuristics (e.g., the plan is valid if it is shorter than 10 steps) or by using another LLM call.

To boost agent performance, typical systems include plan generation, reflection, error correction, and execution validation, and function calling. If an agent uses many tools, tool usage data can be leveraged to optimize execution. For example, if two tools are frequently used together, they can be combined to reduce overhead. Also, it is important to restrict the agent's access to the real world to avoid security risks.

### Chapter 7: Finetuning

Finetuning is used to improve a model’s instruction-following ability, particularly to ensure it adheres to specific output styles and formats. While finetuning can help create models that are more customized to your needs, it also requires a significant upfront investment.

Should we use finetuning or RAG? There are several reasons why you might want to avoid jumping into finetuning. First, finetuning can degrade a model’s performance on other tasks. Second, finetuning requires knowledge of how to train models effectively. Third, finetuning is costly. Fourth, while you are finetuning, model providers may release improvements to their models, which can make your finetuning efforts less effective. The general recommendation is to improve performance with prompt engineering as much as possible, and only consider finetuning after exhausting all options with prompting. One of the most common reasons AI systems fail is a lack of information, which RAG can help solve.

To successfully finetune a model, you need to understand how to train models. Key concepts include backpropagation, numeric representations, training hyperparameters (e.g., learning rate, batch size, number of epochs), loss functions, and parameter-efficient finetuning techniques (e.g., LoRA).

### Chapter 8: Data Set Engineering

To ensure the success of finetuning, you need to create a high-quality data set. This chapter focuses on how to build effective data for training.

Data quality is paramount—often, even a small amount of high-quality data can outperform a large amount of noisy data. This is highlighted in papers such as Llama 3, which concluded that human-generated data is more prone to errors and inconsistencies, especially regarding safety policies. So, what makes data high-quality? Several aspects are crucial: relevance, consistency, correctness, format, uniqueness, and compliance. The data set should cover a broad range of problems that your agent is expected to solve. For instance, if your model is expected to perform coding, your data set should include coding tasks. If you want your chat model to handle different languages, the data set should contain those languages. The amount of data you need depends heavily on several factors such as the finetuning techniques used, task complexity, and performance goals. It is important to find the right balance between data quantity and quality.

Annotating data is not an easy task. You first need to define clear guidelines; otherwise, annotators may provide misaligned scores. Given the challenges of data annotation, it can be tempting to synthesize data using another large language model (LLM). This approach allows you to enhance data quantity and coverage, mitigate privacy concerns, and improve overall data quality.

Data must be processed according to the requirements of the specific use case. First, inspect the data to ensure it meets your goals. Plot the distribution of the data, check for outliers, and inspect the time range, etc. If you notice any issues, you need to clean the data. It's crucial to remove irrelevant, duplicated, sensitive, copyrighted, and toxic data. Manual inspection of the data is essential to ensure that your data processing techniques are working as intended.

### Chapter 9: Inference Optimization

If you decide to serve your model, you want to optimize the inference process to minimize the cost.

Inference optimization techniques often involve trade-offs between different metrics. Therefore it is important to understand common metrics: time to first token (TTFT), time per output token (TPOT), time between tokens (TBT), latency,throughput, and so on. To select the best hardware, it’s essential to understand the memory hierarchy (GPU Static RAM, High Bandwidth Memory, and CPU Dynamic RAM), different utilization metrics, and different AI accelerators.

You can optimize your inference process using various techniques, such as:

- Quantization: Reducing the precision of the model weights to lower memory usage and computational cost.
- Distillation: Training a smaller model to mimic the behavior of a larger model.
- Speculative execution: Decoding multiple tokens quickly with a lightweight model and verifying those predictions in parallel with the original model.
- Inference with references: Using reference tokens from the input and verifying them using the original model. This can be useful for tasks such as updating code drafts.
- Batching: Increasing GPU utilization by batching multiple requests together
- Key-value cache: Reducing the amount of computation for the attention mechanism by caching the key and value matrices.
- Prompt cache: Caching the pre-fill results to avoid recomputing them for repeated queries.
- Advanced parallelism techniques: Reduce the redundant memory usage among GPUs

### Chapter 10: AI Engineering Architecture and Feedback

This chapter discusses how to apply the techniques covered in this textbook to build successful products. This takes an iterative process.

1. Enhance context by gicing the model access to external data sources and tools
2. Add guardrails to protect your system and your users
3. Add model routers and gateways to optimize cost and performance
4. Optimize for latency and costs with caching
5. Add agent patterns to maximize the capabilities of your system

To iterate on the above steps, user feedback plays a critical role. With LLMs, there are new ways to gather feedback. We can get explicit feedback by simply asking, “Did we solve your problem?” We can also gather implicit feedback by inferring it from user actions. For example, if users stop the response generation halfway or exit the app in the middle, or if they show frustration, these signals might indicate the chat is not performing well. However, be aware of feedback limitations. Feedback often contains randomness, position bias, and recency bias, so we can’t fully trust feedback initially. Users might struggle to judge which response is better in cases involving math problems.
