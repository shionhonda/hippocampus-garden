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

Foundation models have revolutionized multiple domains, enabling sophisticated coding assistance, content creation, chatbot development, workflow automation, and media generation. However, the chapter makes an important point: **don't use AI just because it's trendy**. Each AI application needs careful evaluation, especially considering safety and regulatory requirements. This is particularly crucial because AI systems are less controllable than traditional software models.

### Chapter 2: Understanding Foundation Models

This chapter dives deeper into what makes foundation models tick. One key insight is that _these models are only as good as their training data_. The challenges are significant: training data often contains problematic content like clickbait and misinformation, necessitating proper filtering and diverse language representation.

The chapter explains two main types of models: **general-purpose models** that handle common tasks, and **domain-specific models** specialized for fields like genetic research or medical imaging. A significant portion focuses on model architectures, particularly the Transformer, which dominates language-based foundation models. The discussion covers attention mechanisms, multi-head attention, and alternative architectures like Mamba and H3.

The chapter uses a helpful analogy to explain model training: a _pre-trained model_ talks like a webpage (raw, unstructured), while a _post-trained model_ talks like a human (natural, coherent). The text also explores various sampling strategies: **top-k sampling** (choosing from k most likely tokens), **top-p sampling** (selecting from tokens until reaching a probability threshold), and **beam search** (generating multiple sequences to pick the best).

### Chapter 3: Evaluation Methodology

As Greg Brockman noted, "_evaluations are surprisingly often all we need_." This chapter tackles the challenge of properly assessing AI models. It points out a common pitfall: many rely on subjective "vibe checks" instead of rigorous evaluation methods.

The chapter introduces **perplexity** as a key metric for measuring model performance. This metric helps evaluate how well a model predicts the next token, detect potential memorization issues, and identify data leakage when perplexity is unusually low.

For comparing model outputs with ground truth, the chapter presents several approaches: exact match evaluations for strict comparisons, lexical similarity metrics like BLEU and ROUGE for more flexible matching, and embedding-based similarity measures for semantic understanding. An interesting development is using LLMs themselves as judges, though this comes with its own challenges.

### Chapter 4: Evaluating AI Systems

This chapter provides a practical framework for evaluating AI systems in the real world. The key message? **Align your evaluation metrics with business KPIs**. After all, what matters is delivering actual value to users.

The chapter outlines a systematic approach to model selection. First, filter by hard requirements such as open source versus proprietary options, multi-modal capabilities, and deployment constraints. Then, use public benchmarks to assess model quality, cost considerations, and latency requirements. Next, test with your own data through offline evaluations and specific use case measurements. Finally, monitor the model's performance in production by tracking real-world metrics and gathering user feedback.

The chapter presents a detailed five-step evaluation pipeline. Start by evaluating all components - for instance, in a PDF-based system, test the text extraction accuracy while considering both per-turn and full-conversation metrics. Then, define clear guidelines, such as determining whether an AI coach should prioritize politeness or directness in feedback, and create detailed scoring rubrics that link to business goals.

For evaluation methods, the chapter recommends automating where possible while incorporating human evaluation when needed. When calculating sample sizes, use this reference: 10,000 samples to detect a 1% difference, 1,000 samples for 3%, and 100 samples for 10% differences. Finally, continuously refine your evaluation process and adapt to new challenges.

### Chapter 5: Prompt Engineering

While often called an "art," prompt engineering has a scientific foundation. This chapter focuses on the systematic aspects that remain constant even as best practices evolve.

A well-structured prompt consists of three main elements: task description, examples, and the actual task. The chapter introduces the concept of **prompt hierarchy**, where system prompts take highest priority, followed by user prompts, and finally tool prompts.

The chapter provides practical guidelines for effective prompting. Instead of vague instructions like "Explain this," use specific directives such as "Summarize this in 3 sentences." When requiring structured output, specify the exact format, such as JSON structures. Additionally, leverage few-shot learning through examples, break down complex tasks into manageable steps, and implement Chain of Thought (CoT) reasoning.

Security considerations are equally important. The chapter covers defending against prompt attacks, implementing system-level security measures, and establishing proper context filtering and prompt hardening protocols.

### Chapter 6: RAG and Agents

This chapter explores two powerful patterns for enhancing AI models with external information: **RAG** (Retrieval-Augmented Generation) and **Agents**.

RAG systems function like a smart reference library for AI models, combining searchable external memory, a retriever, and a generative model. The chapter discusses two main approaches to building retrievers. Term-based retrieval works at the word level using methods like TF-IDF and BM25, offering simplicity and speed but potentially missing semantic connections. Embedding-based retrieval operates at the meaning level using vector databases like FAISS and HNSW, providing better contextual understanding but requiring more complex optimization.

The chapter then explores agents, which are AI systems capable of both understanding and acting on their environment. These systems are more complex than RAG due to compounding errors and higher stakes in real-world interactions. Agents utilize three categories of tools: knowledge tools for information retrieval and database queries, capability tools like code interpreters and analysis tools, and action tools for tasks such as sending emails or writing to databases.

Best practices for agent development include generating and validating plans before execution, implementing reflection and error correction mechanisms, establishing proper security controls, and maintaining ongoing monitoring of tool usage patterns.

### Chapter 7: Finetuning

This chapter tackles a crucial question: **When should you finetune your model?**

The chapter begins by outlining important considerations before embarking on finetuning. There are several reasons to be cautious: the risk of performance degradation on other tasks, the need for deep training expertise, significant cost investment, and the possibility that model provider updates might invalidate your work. The general recommendation is to consider finetuning only after exhausting prompt engineering options, when specific output formats are required, for specialized domain knowledge, or when RAG proves insufficient.

The technical portion covers essential concepts for successful finetuning. This includes understanding backpropagation for model learning, numeric representations for data processing, hyperparameter tuning (learning rate, batch size, epochs), and parameter-efficient techniques like LoRA and other modern approaches.

### Chapter 8: Data Set Engineering

This chapter emphasizes a crucial truth: **Quality beats quantity in training data**. The discussion centers on what makes data high-quality, identifying six key aspects: relevance to the use case, consistency in patterns, correctness of information, appropriate formatting, uniqueness without redundancy, and compliance with legal requirements.

The chapter explores two main approaches to data collection. Human annotation, while valuable for real-world understanding, presents challenges in maintaining consistent guidelines and scoring. Synthetic data generation using other LLMs offers advantages in coverage, privacy protection, and quality control, though it comes with its own considerations.

The data processing workflow is detailed in three main steps. The inspection phase involves plotting distributions, checking for outliers, and verifying time ranges. Cleaning focuses on removing irrelevant data, duplicates, sensitive content, and toxic elements. Finally, validation encompasses both manual checks and automated testing to ensure data quality.

### Chapter 9: Inference Optimization

This chapter addresses the practical aspects of deploying AI systems efficiently. The focus is on making models both fast and cost-effective, as even the best model becomes impractical if it's too slow or expensive to run.

The discussion begins with key timing metrics: Time to First Token (TTFT), Time Per Output Token (TPOT), Time Between Tokens (TBT), overall latency, and throughput. Understanding these metrics is crucial for optimization. The chapter also explains the hardware stack, from the fastest but limited GPU Static RAM to the slower but more abundant CPU Dynamic RAM.

The optimization techniques are organized into three categories. Memory optimization includes quantization for reducing precision, distillation for creating smaller models, and KV cache for efficient attention computation. Speed optimization covers speculative execution for fast predictions, batching for improved GPU utilization, and prompt caching for reusing computations. Advanced techniques discuss parallel processing across GPUs, reference-based inference for leveraging existing outputs, and efficient resource management.

### Chapter 10: AI Engineering Architecture and Feedback

The final chapter synthesizes the book's concepts into a comprehensive framework for building production-ready AI systems. It presents an iterative process for system development that begins with enhancing context through data sources and tools, then adds protection through guardrails and security measures. The process continues with resource optimization through model routing and gateway configuration, performance improvements via caching and latency reduction, and capability expansion through agent patterns and automation.

The chapter provides valuable insights into feedback collection in the context of LLMs. It distinguishes between explicit feedback methods, such as direct user questions and satisfaction surveys, and implicit signals derived from user behavior patterns and interaction analysis. However, it also warns about common feedback challenges: the inherent randomness in responses, position and recency biases in user judgments, and the expertise gap that can make technical evaluation difficult for users.

The key takeaway is the importance of systematic feedback collection while understanding its limitations. The chapter emphasizes the need to validate improvements with objective metrics rather than relying solely on user feedback.
