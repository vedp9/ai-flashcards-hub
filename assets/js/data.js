const flashcardsData = [
    {
        id: 1,
        category: "Transformer Internals & Optimization",
        word: "KV Cache",
        simple_def: "A technique that saves information the AI has already calculated so it does not have to calculate the same information again.",
        real_world_scenario: "A chatbot has a long conversation with you. Instead of recalculating everything from the beginning after every new message, KV Cache lets the model reuse information from earlier messages, making responses faster.",
        source: "Hands-On Large Language Models",
        difficulty: "Hard"
    },
    {
        id: 2,
        category: "Transformer Internals & Optimization",
        word: "FlashAttention",
        simple_def: "A faster way for an AI model to calculate attention while using GPU memory more efficiently.",
        real_world_scenario: "You want an AI model to read a very long document, but the GPU runs out of memory. FlashAttention helps the model use memory more efficiently so it can process the document.",
        source: "AI Native Engineering Sprint",
        difficulty: "Hard"
    },
    {
        id: 3,
        category: "Transformer Internals & Optimization",
        word: "LoRA (Low-Rank Adaptation)",
        simple_def: "A way to customize an existing AI model by training a small set of additional parameters instead of changing the entire model.",
        real_world_scenario: "A company wants to adapt one AI model for medical, legal, and finance tasks. Instead of creating three completely new models, they keep the original model and use small LoRA adapters for each area.",
        source: "NLP with Transformers",
        difficulty: "Hard"
    },
    {
        id: 4,
        category: "Transformer Internals & Optimization",
        word: "Quantization (INT8 / INT4)",
        simple_def: "A technique that makes an AI model smaller by storing its numbers using fewer bits.",
        real_world_scenario: "You want to run an AI model on a phone, but the original model is too large. Quantization makes the model smaller so it can use less memory and run on a less powerful device.",
        source: "NLP with Transformers / AI for Tier 2-3",
        difficulty: "Hard"
    },
    {
        id: 5,
        category: "Transformer Internals & Optimization",
        word: "RoPE (Rotary Positional Embeddings)",
        simple_def: "A technique that helps an AI model understand where each word or token appears in a sequence.",
        real_world_scenario: "A coding AI reads a large program. RoPE helps the model understand that a variable created near the beginning of the code is related to where it is used much later.",
        source: "AI Native Engineering Sprint",
        difficulty: "Hard"
    },
    {
        id: 6,
        category: "Agentic Systems & Workflows",
        word: "PRAOR Loop",
        simple_def: "A way for an AI agent to repeatedly Plan, Reason, Act, Observe the result, and Retry when needed.",
        real_world_scenario: "An AI coding agent finds a bug. It plans a fix, reasons about the problem, changes the code, runs the test, observes that the test failed, and tries another fix.",
        source: "AI Native Engineering Sprint",
        difficulty: "Medium"
    },
    {
        id: 7,
        category: "Agentic Systems & Workflows",
        word: "Tool Calling (Function Calling)",
        simple_def: "A way for an AI model to ask an external tool or program to perform a specific action.",
        real_world_scenario: "You tell an AI assistant, 'Cancel my flight.' Instead of only replying with text, the AI calls a flight-booking tool that performs the cancellation.",
        source: "7 Core AI Engineering Projects",
        difficulty: "Medium"
    },
    {
        id: 8,
        category: "Agentic Systems & Workflows",
        word: "Semantic Routing",
        simple_def: "A technique that sends a user's question to the AI model that is most suitable for that type of question.",
        real_world_scenario: "A user asks a simple FAQ question, so the system sends it to a cheaper model. If the user asks a difficult reasoning question, the system sends it to a more powerful model.",
        source: "AI Engineering by Chip Huyen",
        difficulty: "Medium"
    },
    {
        id: 9,
        category: "Agentic Systems & Workflows",
        word: "Context Budgeting",
        simple_def: "The practice of controlling how much information is given to an AI model so that the system stays useful, fast, and affordable.",
        real_world_scenario: "Instead of sending 50 pages of search results to an AI, you select the three most useful sections and send only those. This reduces cost and helps the AI focus on the relevant information.",
        source: "AI Engineering by Chip Huyen",
        difficulty: "Medium"
    },
    {
        id: 10,
        category: "Agentic Systems & Workflows",
        word: "ReAct Framework",
        simple_def: "A method where an AI alternates between thinking about a problem and taking actions to solve it.",
        real_world_scenario: "You ask an AI research agent about a company. It decides what information it needs, searches for it, looks at the result, decides what to search for next, and continues until it has enough information.",
        source: "Hands-On Large Language Models",
        difficulty: "Medium"
    },
    {
        id: 11,
        category: "Production Hardening & System Design",
        word: "Circuit Breaker Pattern",
        simple_def: "A safety pattern that temporarily stops requests to a service when that service keeps failing.",
        real_world_scenario: "Your app depends on an AI API that suddenly goes down. Instead of continuously sending requests and making your own app slower, the circuit breaker temporarily stops requests and tells users to try again later.",
        source: "Design Patterns / AI Native Engineering",
        difficulty: "Medium"
    },
    {
        id: 12,
        category: "Production Hardening & System Design",
        word: "Shadow Mode Deployment",
        simple_def: "Running a new AI model in the background while users continue seeing results from the existing model.",
        real_world_scenario: "Your company wants to replace its current AI model. The new model receives the same real user requests in the background, but users do not see its answers. Engineers compare the results before switching to it.",
        source: "AI Engineering by Chip Huyen",
        difficulty: "Medium"
    },
    {
        id: 13,
        category: "Production Hardening & System Design",
        word: "Fallback Models",
        simple_def: "Using another AI model when the main model fails, becomes unavailable, or takes too long to respond.",
        real_world_scenario: "Your main AI model reaches its API limit. Instead of showing an error to the user, your application automatically sends the request to another available model.",
        source: "The Complete Guide to Production ML",
        difficulty: "Medium"
    },
    {
        id: 14,
        category: "Production Hardening & System Design",
        word: "TTFT (Time To First Token)",
        simple_def: "The time between sending a request to an AI model and receiving the first part of its response.",
        real_world_scenario: "An AI answer takes 10 seconds to finish, but the first words appear after only half a second. The user can start reading immediately instead of staring at a blank screen.",
        source: "AI Engineering by Chip Huyen",
        difficulty: "Medium"
    },
    {
        id: 15,
        category: "Production Hardening & System Design",
        word: "Semantic Caching",
        simple_def: "Saving previous AI answers so they can be reused when another user asks a very similar question.",
        real_world_scenario: "One user asks, 'How do I reset my password?' Later, another user asks, 'How can I change my forgotten password?' The system recognizes that the questions have the same meaning and can reuse the earlier answer.",
        source: "Production-Grade ML Projects",
        difficulty: "Medium"
    },
    {
        id: 16,
        category: "Robust Software Engineering",
        word: "Pydantic Validation",
        simple_def: "A Python tool that checks whether data has the correct type and format before your application uses it.",
        real_world_scenario: "An AI is expected to return a user's age as a number, but it returns 'twenty-five'. Pydantic can detect that the value is not in the expected format before it reaches your database.",
        source: "Robust Python",
        difficulty: "Medium"
    },
    {
        id: 17,
        category: "Robust Software Engineering",
        word: "Dependency Injection",
        simple_def: "A programming pattern where a component receives the things it needs from outside instead of creating them itself.",
        real_world_scenario: "An AI application needs a database. Instead of creating the database connection inside the AI code, you pass the connection into it. During testing, you can pass a fake database instead.",
        source: "Design Patterns (GoF)",
        difficulty: "Medium"
    },
    {
        id: 18,
        category: "Robust Software Engineering",
        word: "Property-Based Testing",
        simple_def: "A testing method where a tool automatically creates many different inputs to find unexpected problems in your code.",
        real_world_scenario: "You build a text-processing system. Instead of testing only a few normal sentences, the testing tool also tries empty text, unusual symbols, emojis, and very long text to find bugs you may not have thought about.",
        source: "Robust Python",
        difficulty: "Medium"
    },
    {
        id: 19,
        category: "Robust Software Engineering",
        word: "Type Hinting",
        simple_def: "Adding information to Python code that tells developers what type of data a variable or function should use.",
        real_world_scenario: "A function expects a list but another part of your application sends a dictionary. Type hints can help your editor identify the mismatch before it causes a bigger problem.",
        source: "Robust Python",
        difficulty: "Medium"
    },
    {
        id: 20,
        category: "Robust Software Engineering",
        word: "Strategy Pattern",
        simple_def: "A design pattern that lets you switch between different ways of doing the same task without changing the main application logic.",
        real_world_scenario: "Your AI application can use OpenAI, Anthropic, or a local model. Instead of changing the whole application whenever you switch models, you create a common interface and select the model you want to use.",
        source: "Design Patterns (GoF)",
        difficulty: "Medium"
    },
    {
        id: 21,
        category: "Math, Stats & Core ML",
        word: "KL Divergence (Kullback-Leibler)",
        simple_def: "A mathematical way to measure how different one probability distribution is from another.",
        real_world_scenario: "While updating an AI model, you want the new model to learn without becoming too different from the original model. KL Divergence helps measure how much the two model behaviors have changed.",
        source: "Deep Learning (Goodfellow) / Advanced Probabilistic ML",
        difficulty: "Hard"
    },
    {
        id: 22,
        category: "Math, Stats & Core ML",
        word: "Bias-Variance Tradeoff",
        simple_def: "The balance between a model being too simple and a model being too sensitive to the training data.",
        real_world_scenario: "A machine learning model performs extremely well on its training data but performs badly on new data. It may be too focused on the training examples, so you simplify the model to help it work better on unseen data.",
        source: "Hands-On Machine Learning (Geron)",
        difficulty: "Hard"
    },
    {
        id: 23,
        category: "Math, Stats & Core ML",
        word: "Gradient Descent",
        simple_def: "An algorithm that helps a machine learning model reduce its errors by gradually adjusting its parameters.",
        real_world_scenario: "A model predicts house prices incorrectly. Gradient Descent looks at the prediction error and repeatedly adjusts the model's parameters to make future predictions better.",
        source: "Calculus Vol 3 / Deep Learning (Goodfellow)",
        difficulty: "Hard"
    },
    {
        id: 24,
        category: "Math, Stats & Core ML",
        word: "A/B Testing",
        simple_def: "A method of comparing two versions of something to see which one performs better.",
        real_world_scenario: "You have two versions of a search system. Half of your users see version A and the other half see version B. You compare the results to find out which version gets more users to click.",
        source: "Practical Statistics for Data Scientists",
        difficulty: "Hard"
    },
    {
        id: 25,
        category: "Math, Stats & Core ML",
        word: "TF-IDF (Term Frequency-Inverse Document Frequency)",
        simple_def: "A method for measuring how important a word is to a document compared with how often that word appears across many documents.",
        real_world_scenario: "A search system sees the word 'the' in almost every document, so it gives that word little importance. A less common word like 'quantum' may receive more importance because it helps identify relevant documents.",
        source: "Data Science from Scratch",
        difficulty: "Hard"
    },
    {
        id: 26,
        category: "Evaluation & Harness Engineering",
        word: "LLM-as-a-Judge",
        simple_def: "Using one AI model to evaluate and score the answers produced by another AI system.",
        real_world_scenario: "You have thousands of AI-generated answers to test. Instead of having a person manually check every answer, you use another capable AI model with a clear evaluation rubric to score them.",
        source: "AI Native Engineering Sprint",
        difficulty: "Medium"
    },
    {
        id: 27,
        category: "Evaluation & Harness Engineering",
        word: "Golden Dataset",
        simple_def: "A carefully prepared set of questions and trusted answers used to check whether an AI system is working correctly.",
        real_world_scenario: "Before changing your AI system, your team creates 200 important questions with verified answers. After every major change, you run those same questions to make sure the new version still performs well.",
        source: "Harness Engineering Curriculum",
        difficulty: "Medium"
    },
    {
        id: 28,
        category: "Evaluation & Harness Engineering",
        word: "RAG Context Precision",
        simple_def: "A measure of how relevant the information retrieved by a RAG system is for answering a user's question.",
        real_world_scenario: "A user asks about your company's refund policy, but your RAG system retrieves documents about shipping. The context precision is poor because the retrieved information is not useful for answering the question.",
        source: "AI Engineering Project Curriculum",
        difficulty: "Medium"
    },
    {
        id: 29,
        category: "Evaluation & Harness Engineering",
        word: "Regression Gating",
        simple_def: "A safety check that stops a new version from being deployed when its performance becomes worse than the previous version.",
        real_world_scenario: "You improve an AI prompt and run your evaluation tests. The new prompt performs better on one task but much worse overall. The regression gate blocks the deployment until the problem is fixed.",
        source: "Harness Engineering Curriculum",
        difficulty: "Medium"
    },
    {
        id: 30,
        category: "Evaluation & Harness Engineering",
        word: "Slice Evaluation",
        simple_def: "Testing an AI system on smaller groups of data to find problems that may be hidden by the overall score.",
        real_world_scenario: "An AI driving system has 98% overall accuracy. When you test only rainy-weather examples, you discover its accuracy drops to 60%. Slice Evaluation helps you find this specific weakness.",
        source: "AI Native Engineering Sprint",
        difficulty: "Medium"
    },
    {
        id: 31,
        category: "Business Leverage & Positioning",
        word: "Proof of Work",
        simple_def: "Showing what you can actually build through real projects instead of only saying what skills you have.",
        real_world_scenario: "Instead of telling a company that you know AI engineering, you build and deploy an AI application, make the code public, and explain how you built it. The project becomes proof of your skills.",
        source: "AI Native Sprint Prep / Positioning",
        difficulty: "Easy"
    },
    {
        id: 32,
        category: "Business Leverage & Positioning",
        word: "Multiplicative Leverage",
        simple_def: "Using things like software, AI, or content to create more value without increasing your work by the same amount.",
        real_world_scenario: "Instead of manually creating the same report for every customer, you build an AI system that creates the reports automatically. The same system can now help many customers without you doing the work each time.",
        source: "Business Reality Curriculum",
        difficulty: "Easy"
    },
    {
        id: 33,
        category: "Business Leverage & Positioning",
        word: "Forward Deployed Engineer (FDE)",
        simple_def: "An engineer who works closely with customers to adapt and implement a company's technology for their specific needs.",
        real_world_scenario: "A company buys an AI product but has its own databases and workflows. An FDE works directly with the customer to connect the product to their systems and make it work for their business.",
        source: "AI Native Engineering Target Roles",
        difficulty: "Easy"
    },
    {
        id: 34,
        category: "Business Leverage & Positioning",
        word: "BLUF (Bottom Line Up Front)",
        simple_def: "A communication style where you give the most important point first instead of making the reader wait for it.",
        real_world_scenario: "You message a busy hiring manager. Instead of writing a long introduction, you start with the important point: 'I built an AI project that reduces invoice processing time by 40%.'",
        source: "The First Minute Conversations",
        difficulty: "Easy"
    },
    {
        id: 35,
        category: "Business Leverage & Positioning",
        word: "Offer Engineering",
        simple_def: "A strategy of creating multiple job opportunities at the same time so you have more choices and stronger negotiating power.",
        real_world_scenario: "You interview with several companies around the same time. When more than one company gives you an offer, you can compare them and negotiate instead of depending on only one opportunity.",
        source: "Outreach and Soft Skills Curriculum",
        difficulty: "Easy"
    },
    {
        id: 36,
        category: "Classic Algorithms",
        word: "Dynamic Programming",
        simple_def: "An algorithm technique that solves a big problem by solving smaller problems and remembering their answers so they do not need to be solved again.",
        real_world_scenario: "A delivery system needs to find the best route. Instead of calculating the same smaller routes repeatedly, it saves the results and reuses them when building the larger route.",
        source: "Classic ML & Algorithms",
        difficulty: "Medium"
    },
    {
        id: 37,
        category: "Classic Algorithms",
        word: "B-Trees",
        simple_def: "A tree-based data structure that helps databases quickly find, add, and remove sorted data.",
        real_world_scenario: "A database contains millions of records. Instead of checking every record to find yesterday's errors, a B-Tree index helps the database quickly find the relevant records.",
        source: "Data-Intensive Applications Foundations",
        difficulty: "Medium"
    },
    {
        id: 38,
        category: "Classic Algorithms",
        word: "Bloom Filters",
        simple_def: "A memory-efficient structure that quickly tells you whether an item has definitely not been seen before or might have been seen.",
        real_world_scenario: "A web scraper finds a URL. Before checking a huge database, it checks a Bloom Filter. If the filter says the URL has definitely not been seen, the scraper can continue quickly.",
        source: "System Design Case Studies",
        difficulty: "Medium"
    },
    {
        id: 39,
        category: "Classic Algorithms",
        word: "K-Means Clustering",
        simple_def: "A machine learning algorithm that automatically groups similar data points together.",
        real_world_scenario: "A company has 100,000 customer support messages without categories. K-Means groups similar messages together, helping the company discover common topics such as refund problems or delivery issues.",
        source: "Hands-On Machine Learning (Geron)",
        difficulty: "Medium"
    },
    {
        id: 40,
        category: "Classic Algorithms",
        word: "Multi-Armed Bandit",
        simple_def: "A method for choosing between several options while continuing to test them to find which one gives the best result.",
        real_world_scenario: "You have three different AI prompts. Instead of testing one prompt at a time, the system sends users to all three and gradually sends more users to the prompt that performs best.",
        source: "Reinforcement Learning (Sutton & Barto)",
        difficulty: "Medium"
    },
    {
        id: 41,
        category: "Transformer Internals & Optimization",
        word: "Tokens / Tokenization",
        simple_def: "The process of breaking text into small pieces called tokens so an AI model can process it.",
        real_world_scenario: "You type 'I love coding' into an AI app. The system breaks the text into smaller pieces called tokens before sending it to the model. AI services often use the number of tokens processed to calculate cost.",
        source: "NLP with Transformers",
        difficulty: "Hard"
    },
    {
        id: 42,
        category: "Transformer Internals & Optimization",
        word: "Context Window",
        simple_def: "The maximum amount of text an AI model can consider at one time while generating a response.",
        real_world_scenario: "You give an AI a very large document and ask a question about it. If the document is larger than the model's context window, the system cannot process all of it at once and may need to split or summarize the content.",
        source: "AI Native Engineering Sprint",
        difficulty: "Hard"
    },
    {
        id: 43,
        category: "Transformer Internals & Optimization",
        word: "Attention Mechanism",
        simple_def: "A mechanism that helps an AI focus on the most relevant words when understanding a piece of text.",
        real_world_scenario: "In the sentence 'I went to the bank to deposit money,' the AI connects 'bank' with 'deposit money' to understand that bank means a financial institution.",
        source: "Hands-On Large Language Models",
        difficulty: "Hard"
    },
    {
        id: 44,
        category: "Transformer Internals & Optimization",
        word: "Fine-Tuning",
        simple_def: "Training an already trained AI model on a smaller, specialized dataset so it performs better at a specific task.",
        real_world_scenario: "A company already has a general AI model but wants it to understand its customer-support style. They fine-tune the model using examples of their previous customer conversations.",
        source: "Hands-On Machine Learning",
        difficulty: "Hard"
    },
    {
        id: 45,
        category: "Transformer Internals & Optimization",
        word: "Hallucination",
        simple_def: "When an AI gives information that sounds correct but is actually false or made up.",
        real_world_scenario: "You ask an AI to list research papers about a topic. It gives you several convincing-looking paper titles, but some of them do not actually exist. The AI has hallucinated information.",
        source: "The Complete Guide to Production ML",
        difficulty: "Hard"
    },
    {
        id: 46,
        category: "Agentic Systems & Workflows",
        word: "RAG (Retrieval-Augmented Generation)",
        simple_def: "A technique where an AI first retrieves relevant information from a knowledge source and then uses it to answer the user's question.",
        real_world_scenario: "A customer asks, 'What is your refund policy?' The AI searches the company's policy documents, finds the relevant section, and uses that information to answer the customer.",
        source: "AI Engineering Project Curriculum",
        difficulty: "Medium"
    },
    {
        id: 47,
        category: "Agentic Systems & Workflows",
        word: "System Prompt",
        simple_def: "Instructions given to an AI that define how it should behave and respond.",
        real_world_scenario: "You build a customer-support chatbot and give it instructions such as 'Be polite, answer using company information, and do not make up answers.' These instructions guide the AI throughout the conversation.",
        source: "Building AI Workflows",
        difficulty: "Medium"
    },
    {
        id: 48,
        category: "Agentic Systems & Workflows",
        word: "Tool Use / Calling",
        simple_def: "Allowing an AI to use external tools such as databases, APIs, search engines, or other software to complete a task.",
        real_world_scenario: "A user asks an AI assistant to check their order status. Instead of guessing, the AI uses a tool to check the company's order database and returns the current status.",
        source: "7 Core AI Engineering Projects",
        difficulty: "Medium"
    },
    {
        id: 49,
        category: "Agentic Systems & Workflows",
        word: "Vector Database",
        simple_def: "A database designed to store numerical representations of information so similar meanings can be searched efficiently.",
        real_world_scenario: "A user searches for 'warm clothes for winter.' A vector database can find products such as 'winter sweaters' even when the exact words in the search are not present.",
        source: "Data-Intensive Applications Foundations",
        difficulty: "Medium"
    },
    {
        id: 50,
        category: "Agentic Systems & Workflows",
        word: "Prompt Engineering",
        simple_def: "The practice of writing clear and effective instructions for an AI model to get the desired output.",
        real_world_scenario: "Instead of asking an AI to 'extract names,' you tell it 'Extract only the people's names and return them as a comma-separated list.' The clearer instruction makes the output easier for your application to use.",
        source: "AI Native Engineering Sprint",
        difficulty: "Medium"
    },
    {
        id: 51,
        category: "Production Hardening & System Design",
        word: "API (Application Programming Interface)",
        simple_def: "A way for one software application to communicate with another software service.",
        real_world_scenario: "Your AI application needs weather information. Instead of building its own weather system, it sends a request to a weather API and receives the current weather data.",
        source: "Robust Python",
        difficulty: "Medium"
    },
    {
        id: 52,
        category: "Production Hardening & System Design",
        word: "Latency",
        simple_def: "The amount of time it takes for a system to respond after receiving a request.",
        real_world_scenario: "You ask an AI voice assistant a question. If it takes 5 seconds to start responding, the conversation feels slow. Reducing latency makes the assistant feel more responsive.",
        source: "AI Engineering by Chip Huyen",
        difficulty: "Medium"
    },
    {
        id: 53,
        category: "Production Hardening & System Design",
        word: "Rate Limiting",
        simple_def: "A system that limits how many requests a user or application can make within a certain amount of time.",
        real_world_scenario: "An AI API allows each user to make 100 requests per minute. If someone suddenly sends thousands of requests, rate limiting blocks or slows the extra requests and protects the system.",
        source: "System Design Case Studies",
        difficulty: "Medium"
    },
    {
        id: 54,
        category: "Production Hardening & System Design",
        word: "Caching",
        simple_def: "Storing frequently used results so they can be returned quickly without doing the same work again.",
        real_world_scenario: "Thousands of users ask an AI chatbot for the store's opening hours. Instead of generating the same answer every time, the system stores the result and quickly returns the saved answer.",
        source: "AI Engineering by Chip Huyen",
        difficulty: "Medium"
    },
    {
        id: 55,
        category: "Production Hardening & System Design",
        word: "Graceful Degradation",
        simple_def: "Designing a system so it can still provide basic functionality when part of it stops working.",
        real_world_scenario: "An AI recommendation service goes offline. Instead of showing an error, the shopping website displays a basic list of popular products so users can still use the site.",
        source: "Production-Grade ML Projects",
        difficulty: "Medium"
    },
    {
        id: 56,
        category: "Robust Software Engineering",
        word: "Version Control (Git)",
        simple_def: "A system that tracks changes to code so developers can review changes and return to an earlier version when needed.",
        real_world_scenario: "You make several changes to your application and accidentally break something. With Git, you can compare your changes and restore an earlier working version.",
        source: "Robust Python",
        difficulty: "Medium"
    },
    {
        id: 57,
        category: "Robust Software Engineering",
        word: "Technical Debt",
        simple_def: "The future cost of choosing a quick or messy technical solution instead of building something properly.",
        real_world_scenario: "Your team uses a quick workaround to launch a feature. Later, that workaround makes the code harder to change, so adding a small new feature takes much longer than expected.",
        source: "Software Engineering Principles",
        difficulty: "Medium"
    },
    {
        id: 58,
        category: "Robust Software Engineering",
        word: "Unit Testing",
        simple_def: "Testing small individual parts of a program to make sure they work correctly.",
        real_world_scenario: "You have a function that calculates the total price of an order. A unit test checks different prices and quantities automatically to make sure the function gives the correct result.",
        source: "Robust Python",
        difficulty: "Medium"
    },
    {
        id: 59,
        category: "Robust Software Engineering",
        word: "Hardcoding",
        simple_def: "Putting a specific value directly into your code instead of storing it somewhere that can be changed easily.",
        real_world_scenario: "You put a tax rate of 10% directly into several parts of your application. When the tax changes to 12%, you have to find and change every occurrence instead of updating one configuration value.",
        source: "Clean Architecture",
        difficulty: "Medium"
    },
    {
        id: 60,
        category: "Robust Software Engineering",
        word: "Open Source",
        simple_def: "Software whose source code is publicly available so people can inspect, use, modify, and contribute to it according to its license.",
        real_world_scenario: "A developer wants to build an AI application using an open-source model. They can access the model's code or weights, run it themselves, and modify or build on it according to its license.",
        source: "AI Native Engineering Sprint",
        difficulty: "Medium"
    },
    {
        id: 61,
        category: "Math, Stats & Core ML",
        word: "Algorithm",
        simple_def: "A step-by-step set of instructions for solving a problem or completing a task.",
        real_world_scenario: "A navigation app needs to find a route from your home to the airport. It uses algorithms to compare possible routes and find a suitable path.",
        source: "Introduction to Algorithms (Cormen)",
        difficulty: "Hard"
    },
    {
        id: 62,
        category: "Math, Stats & Core ML",
        word: "Supervised Learning",
        simple_def: "A type of machine learning where a model learns from examples that already have the correct answers.",
        real_world_scenario: "You want an AI to detect spam emails. You give it many emails labeled 'Spam' and 'Not Spam'. The model learns patterns from these examples and uses them to classify new emails.",
        source: "Hands-On Machine Learning (Geron)",
        difficulty: "Hard"
    },
    {
        id: 63,
        category: "Math, Stats & Core ML",
        word: "Overfitting",
        simple_def: "When a model learns the training data too closely and performs poorly on new data.",
        real_world_scenario: "You train an AI using pictures of dogs where most dogs are standing on grass. The model performs well during training but struggles when it sees a dog indoors because it learned the background instead of the important features.",
        source: "Machine Learning for Beginners",
        difficulty: "Hard"
    },
    {
        id: 64,
        category: "Math, Stats & Core ML",
        word: "Correlation vs. Causation",
        simple_def: "Correlation means two things are related, but it does not prove that one thing caused the other.",
        real_world_scenario: "Ice cream sales and swimming accidents both increase during summer. This does not mean eating ice cream causes swimming accidents. Hot weather increases both activities.",
        source: "The Book of Why (Pearl)",
        difficulty: "Hard"
    },
    {
        id: 65,
        category: "Math, Stats & Core ML",
        word: "Outlier / Anomaly",
        simple_def: "A data point that is very different from most of the other data points.",
        real_world_scenario: "Ten employees earn around $60,000, but one employee earns $10 million. That unusually high salary is an outlier and can strongly affect the average.",
        source: "Practical Statistics for Data Scientists",
        difficulty: "Hard"
    },
    {
        id: 66,
        category: "Evaluation & Harness Engineering",
        word: "Ground Truth",
        simple_def: "The trusted correct answer or information used as a reference for evaluating an AI system.",
        real_world_scenario: "Teachers create the correct answers for 500 math questions. When an AI tutor answers those questions, its answers are compared with the teacher-approved answers to measure its accuracy.",
        source: "Harness Engineering Curriculum",
        difficulty: "Medium"
    },
    {
        id: 67,
        category: "Evaluation & Harness Engineering",
        word: "Deterministic vs. Probabilistic",
        simple_def: "Deterministic systems follow fixed rules and give the same result for the same input, while probabilistic systems work with probabilities and may produce different results.",
        real_world_scenario: "A calculator always returns 4 when you enter 2 + 2. An AI asked to write a poem about dogs may produce a different poem each time because it generates responses based on probabilities.",
        source: "AI Native Engineering Sprint",
        difficulty: "Medium"
    },
    {
        id: 68,
        category: "Evaluation & Harness Engineering",
        word: "A/B Testing",
        simple_def: "A method of comparing two versions of something by showing each version to different groups of users.",
        real_world_scenario: "An online store wants to test two 'Buy Now' buttons. Half the users see Version A and half see Version B. The team compares purchases to see which version performs better.",
        source: "Practical Statistics for Data Scientists",
        difficulty: "Medium"
    },
    {
        id: 69,
        category: "Evaluation & Harness Engineering",
        word: "Edge Case",
        simple_def: "An unusual situation that may not happen often but can cause software to behave incorrectly.",
        real_world_scenario: "A registration form works for normal names but crashes when someone enters a very long name or unusual characters. That unusual input is an edge case the developer needs to handle.",
        source: "Robust Python",
        difficulty: "Medium"
    },
    {
        id: 70,
        category: "Evaluation & Harness Engineering",
        word: "Bias in AI",
        simple_def: "When an AI system produces unfair results because of problems or unfair patterns in the data or process used to build it.",
        real_world_scenario: "A hiring model is trained on historical hiring data where one group was hired much more often than another. If the model learns those patterns without proper safeguards, it may unfairly favor the same group.",
        source: "Foundations of Machine Learning",
        difficulty: "Medium"
    },
    {
        id: 71,
        category: "Business Leverage & Positioning",
        word: "MVP (Minimum Viable Product)",
        simple_def: "A simple first version of a product that contains enough features to test whether people actually want it.",
        real_world_scenario: "You have an idea for a dog-walking service. Instead of building a complete app, you first create a simple website where people can request a walk. If people use it, you can build more features later.",
        source: "Startup Operator Track",
        difficulty: "Easy"
    },
    {
        id: 72,
        category: "Business Leverage & Positioning",
        word: "ROI (Return on Investment)",
        simple_def: "A measure of how much value or return you get compared with what you invested.",
        real_world_scenario: "A company spends $10,000 building an automation tool and saves $50,000 in operating costs over a year. The company can use ROI to evaluate whether the investment was worthwhile.",
        source: "Business Reality Curriculum",
        difficulty: "Easy"
    },
    {
        id: 73,
        category: "Business Leverage & Positioning",
        word: "SaaS (Software as a Service)",
        simple_def: "Software that customers access online, usually by paying a recurring subscription.",
        real_world_scenario: "A company uses an online project-management tool and pays a monthly subscription instead of buying and installing the software once.",
        source: "Alex Hormozi Business Logic",
        difficulty: "Easy"
    },
    {
        id: 74,
        category: "Business Leverage & Positioning",
        word: "Bottleneck",
        simple_def: "The part of a process that limits how quickly the entire process can work.",
        real_world_scenario: "An AI system can create 500 articles a day, but a human editor can review only 20. The editor becomes the bottleneck because everything must wait for the reviews.",
        source: "System Design / AI Engineering",
        difficulty: "Easy"
    },
    {
        id: 75,
        category: "Business Leverage & Positioning",
        word: "Scope Creep",
        simple_def: "When a project gradually becomes larger because more features or requirements are added after the project has already started.",
        real_world_scenario: "You start by building a simple chatbot. Later, people ask for email support, voice calls, analytics, and payment features. The project keeps growing far beyond the original plan.",
        source: "The Complete Guide to Production ML",
        difficulty: "Easy"
    },
    {
        id: 76,
        category: "Classic Algorithms",
        word: "Binary Search",
        simple_def: "A search algorithm that repeatedly cuts a sorted list in half to quickly find a value.",
        real_world_scenario: "You are searching for a name in a sorted phone book. Instead of checking every name, you open the middle, decide which half contains the name, and repeat until you find it.",
        source: "Algorithmic Toolbox",
        difficulty: "Medium"
    },
    {
        id: 77,
        category: "Classic Algorithms",
        word: "Sorting Algorithm",
        simple_def: "An algorithm that arranges data into a specific order, such as smallest to largest or A to Z.",
        real_world_scenario: "An online store lets you sort products by price from low to high. A sorting algorithm arranges the product data so the cheapest products appear first.",
        source: "Introduction to Algorithms (Cormen)",
        difficulty: "Medium"
    },
    {
        id: 78,
        category: "Classic Algorithms",
        word: "Graph Theory",
        simple_def: "A way of representing relationships using points called nodes and connections called edges.",
        real_world_scenario: "Google Maps can represent locations as nodes and roads as connections between them. Graph algorithms can then help find a route between two locations.",
        source: "Data Science from Scratch",
        difficulty: "Medium"
    },
    {
        id: 79,
        category: "Classic Algorithms",
        word: "Recursion",
        simple_def: "A programming technique where a function calls itself to solve smaller versions of the same problem.",
        real_world_scenario: "You need to calculate the total size of folders inside a computer folder. A recursive function can open each folder and call itself to calculate the size of folders inside it.",
        source: "Introduction to Algorithms (Cormen)",
        difficulty: "Medium"
    },
    {
        id: 80,
        category: "Classic Algorithms",
        word: "Big-O Notation",
        simple_def: "A way to describe how the time or memory needed by an algorithm grows as the amount of data increases.",
        real_world_scenario: "An algorithm works quickly with 100 records but becomes extremely slow with 10 million records. Big-O notation helps engineers understand how the algorithm will scale as the data grows.",
        source: "Algorithmic Toolbox",
        difficulty: "Medium"
    },
    {
        id: 81,
        category: "The Brain & Neuroscience of AI",
        word: "The Neocortex",
        simple_def: "The outer layer of the human brain that plays an important role in functions such as language, perception, reasoning, and memory.",
        real_world_scenario: "When you understand a sentence, recognize an object, or solve a problem, parts of your neocortex are involved in processing that information.",
        source: "On Intelligence (Jeff Hawkins)",
        difficulty: "Easy"
    },
    {
        id: 82,
        category: "The Brain & Neuroscience of AI",
        word: "Prediction Engine",
        simple_def: "The idea that intelligence involves using past information to predict what is likely to happen next.",
        real_world_scenario: "When you reach for a cup, your brain predicts where the cup is and how much force you need. If the cup is unexpectedly heavier, your brain quickly adjusts.",
        source: "On Intelligence (Jeff Hawkins)",
        difficulty: "Easy"
    },
    {
        id: 83,
        category: "The Brain & Neuroscience of AI",
        word: "Reference Frames",
        simple_def: "A way of representing where objects are and how they relate to other objects from a particular point of view.",
        real_world_scenario: "You can recognize a coffee cup whether it is upright, tilted, or viewed from another angle. Your brain uses information about the object's position and relationships to understand it.",
        source: "A Thousand Brains (Jeff Hawkins)",
        difficulty: "Easy"
    },
    {
        id: 84,
        category: "The Brain & Neuroscience of AI",
        word: "Artificial General Intelligence (AGI)",
        simple_def: "A hypothetical type of AI that could learn and perform a very wide range of intellectual tasks at a human-like level.",
        real_world_scenario: "A future AGI might be able to learn programming, study a new scientific topic, plan a business project, and solve unfamiliar problems instead of being limited to one specific type of task.",
        source: "AI Engineering & Sprint Philosophy",
        difficulty: "Easy"
    },
    {
        id: 85,
        category: "The Brain & Neuroscience of AI",
        word: "Cortical Columns",
        simple_def: "Small structures in the neocortex that contain groups of neurons involved in processing information.",
        real_world_scenario: "Researchers study cortical columns to understand how the brain represents and processes information. These ideas have influenced some theories about how intelligent systems could work.",
        source: "A Thousand Brains (Jeff Hawkins)",
        difficulty: "Easy"
    },
    {
        id: 86,
        category: "Causality & Logic",
        word: "Counterfactuals (What If?)",
        simple_def: "Questions about what might have happened if something had been different.",
        real_world_scenario: "A doctor sees that a patient recovered after taking a medicine. A counterfactual question would be: 'Would the patient have recovered if they had not taken the medicine?'",
        source: "The Book of Why (Judea Pearl)",
        difficulty: "Hard"
    },
    {
        id: 87,
        category: "Causality & Logic",
        word: "Confounding Variable",
        simple_def: "A third factor that affects two variables and can make it look like one caused the other.",
        real_world_scenario: "Ice cream sales and swimming accidents both increase in summer. Hot weather is a confounding factor because it increases both ice cream purchases and swimming activity.",
        source: "The Book of Why (Judea Pearl)",
        difficulty: "Hard"
    },
    {
        id: 88,
        category: "Causality & Logic",
        word: "Randomized Control Trial (RCT)",
        simple_def: "An experiment where people are randomly divided into groups to test whether a treatment causes a particular result.",
        real_world_scenario: "Researchers want to test a new medicine. They randomly give the real medicine to one group and a placebo to another group, then compare the results.",
        source: "Probabilistic Machine Learning / Stats",
        difficulty: "Hard"
    },
    {
        id: 89,
        category: "Causality & Logic",
        word: "Simpson's Paradox",
        simple_def: "A situation where a trend appears in separate groups of data but changes or reverses when the groups are combined.",
        real_world_scenario: "A treatment appears to work better for both younger and older patients when groups are analyzed separately. But when all patients are combined, the overall result shows the opposite. The difference in group sizes can create Simpson's Paradox.",
        source: "Practical Statistics for Data Scientists",
        difficulty: "Hard"
    },
    {
        id: 90,
        category: "Causality & Logic",
        word: "Incentive Design",
        simple_def: "Designing rewards or rules so that people or systems are encouraged to achieve the intended goal.",
        real_world_scenario: "If a company rewards employees only for the number of tickets they close, employees may rush through tickets instead of solving problems properly. Better incentives reward both speed and quality.",
        source: "Think Like a Freak (Levitt & Dubner)",
        difficulty: "Hard"
    },
    {
        id: 91,
        category: "Generative AI Magic",
        word: "Embeddings",
        simple_def: "Numerical representations of words, sentences, or other data that capture their meaning and relationships.",
        real_world_scenario: "You search for 'comfortable winter clothes.' An embedding-based search can find 'warm sweaters' because their meanings are similar even though the exact words are different.",
        source: "NLP with Transformers",
        difficulty: "Easy"
    },
    {
        id: 92,
        category: "Generative AI Magic",
        word: "Temperature",
        simple_def: "A setting that controls how predictable or varied an AI model's generated responses can be.",
        real_world_scenario: "For a task that needs consistent answers, you may use a lower temperature. For creative writing, you may use a higher temperature to allow more variation in the responses.",
        source: "Hands-On Large Language Models",
        difficulty: "Easy"
    },
    {
        id: 93,
        category: "Generative AI Magic",
        word: "Zero-Shot Learning",
        simple_def: "When an AI performs a task without being given examples of that specific task in the prompt.",
        real_world_scenario: "You ask an AI, 'Translate this Japanese sentence into English.' You do not provide an example translation. The model attempts the task using what it learned during training.",
        source: "Deep Learning for NLP",
        difficulty: "Easy"
    },
    {
        id: 94,
        category: "Generative AI Magic",
        word: "Generative vs. Discriminative",
        simple_def: "Discriminative models mainly predict or classify existing data, while generative models can create new content.",
        real_world_scenario: "A spam classifier decides whether an email is spam or not. A generative AI can create a new email response from an instruction. One classifies existing information while the other generates new information.",
        source: "AI Engineering by Chip Huyen",
        difficulty: "Easy"
    },
    {
        id: 95,
        category: "Generative AI Magic",
        word: "Semantic Routing",
        simple_def: "Using the meaning of a user's request to decide which system, model, or workflow should handle it.",
        real_world_scenario: "A user says, 'My laptop screen is broken.' A semantic router understands that the request is about hardware and sends it to the hardware-support workflow.",
        source: "AI-Native Engineering Sprint",
        difficulty: "Easy"
    },
    {
        id: 96,
        category: "MLOps & Production Data",
        word: "Data Drift",
        simple_def: "When the data a model receives in the real world changes over time compared with the data it was trained on.",
        real_world_scenario: "A model trained to predict shopping behavior before a major change in customer habits may become less accurate when people's buying patterns change significantly.",
        source: "The Complete Guide to Production ML",
        difficulty: "Medium"
    },
    {
        id: 97,
        category: "MLOps & Production Data",
        word: "ETL (Extract, Transform, Load)",
        simple_def: "A process of taking data from different sources, cleaning or changing it, and loading it into a system where it can be used.",
        real_world_scenario: "A company has sales data in different systems. An ETL pipeline collects the data, converts it into a consistent format, cleans errors, and loads it into a data warehouse for analysis.",
        source: "Data Science from Scratch",
        difficulty: "Medium"
    },
    {
        id: 98,
        category: "MLOps & Production Data",
        word: "Docker / Containerization",
        simple_def: "Packaging an application and its required dependencies together so it can run consistently in different environments.",
        real_world_scenario: "Your AI application works on your computer but fails on a teammate's computer because of different software versions. Docker packages the application and its dependencies together so both environments can run the same setup.",
        source: "Mastering the Data Paradox",
        difficulty: "Medium"
    },
    {
        id: 99,
        category: "MLOps & Production Data",
        word: "CI/CD (Continuous Integration / Deployment)",
        simple_def: "An automated process that tests code changes and helps deliver them to production quickly and reliably.",
        real_world_scenario: "A developer pushes new code to GitHub. The CI/CD pipeline automatically runs tests, checks the code, and, if everything passes, deploys the new version of the application.",
        source: "Production-Grade ML Projects",
        difficulty: "Medium"
    },
    {
        id: 100,
        category: "MLOps & Production Data",
        word: "The Cold Start Problem",
        simple_def: "The challenge of making useful recommendations or predictions when there is little or no data about a new user or item.",
        real_world_scenario: "A new user joins a music app but has not listened to any songs yet. The system has little information about their taste, so it may ask them to choose a few favorite artists to get started.",
        source: "Mastering the Data Paradox",
        difficulty: "Medium"
    },
    {
        id: 101,
        category: "Communication & Teamwork",
        word: "Framing (The First Minute)",
        simple_def: "Clearly telling someone what you need, why you are talking to them, and what they should understand before giving them all the details.",
        real_world_scenario: "Instead of telling your manager, 'The database is down, Python has errors, and AWS is failing,' start with the main point: 'I need your approval to spend $50 to fix a server issue.' Then give the important context. Framing helps people understand the decision before getting lost in the details.",
        source: "The First Minute (Chris Fenning)",
        difficulty: "Easy"
    },
    {
        id: 102,
        category: "Communication & Teamwork",
        word: "Parkinson’s Law",
        simple_def: "The idea that work often expands to fill the amount of time you give yourself to complete it.",
        real_world_scenario: "If a team has 60 minutes to choose a logo color, they may spend the entire hour debating tiny details. Give them 15 minutes with a clear goal, and they may make the same decision much faster.",
        source: "The Communication Book",
        difficulty: "Easy"
    },
    {
        id: 103,
        category: "Communication & Teamwork",
        word: "Rubber Duck Debugging",
        simple_def: "Explaining your code step by step out loud so your brain can notice mistakes that you missed while staring at the code.",
        real_world_scenario: "You cannot find a bug in your Python script. You start explaining it out loud: 'First I load the data, then I filter the rows, then I calculate...' Suddenly you realize you used the wrong variable. Nobody needed to fix it for you—the explanation helped you find it.",
        source: "Robust Python",
        difficulty: "Easy"
    },
    {
        id: 104,
        category: "Communication & Teamwork",
        word: "Asynchronous Communication",
        simple_def: "Communicating through documents, messages, and updates that people can read and respond to at different times instead of meeting live.",
        real_world_scenario: "Instead of arranging a one-hour meeting with 10 engineers, you write a short document explaining a new AI feature. Everyone can read it and leave comments when they are available, allowing them to keep their focus time.",
        source: "AI Engineering Team Culture",
        difficulty: "Easy"
    },
    {
        id: 105,
        category: "Communication & Teamwork",
        word: "The XY Problem",
        simple_def: "Asking for help with a specific solution instead of explaining the actual problem you are trying to solve.",
        real_world_scenario: "A developer asks, 'How do I get the last three characters of a filename?' After discussing it, you discover they only wanted to find the file extension. The real problem was finding the extension, not extracting three characters.",
        source: "Robust Python / Engineering Mindset",
        difficulty: "Easy"
    },
    {
        id: 106,
        category: "Software Architecture",
        word: "Object-Oriented Programming (OOP)",
        simple_def: "A way of organizing software around objects that contain data and the actions that can be performed on that data.",
        real_world_scenario: "In a customer management system, you might create a Customer object containing a name and email, along with actions such as updating the email or placing an order. You can then create many Customer objects using the same structure.",
        source: "Design Patterns (GoF)",
        difficulty: "Medium"
    },
    {
        id: 107,
        category: "Software Architecture",
        word: "Singleton Pattern",
        simple_def: "A design pattern that makes sure a class has only one shared instance within an application.",
        real_world_scenario: "Your application needs one shared configuration manager. Instead of allowing every part of the application to create its own copy, the Singleton Pattern provides one shared instance that everyone can use.",
        source: "Design Patterns (GoF)",
        difficulty: "Medium"
    },
    {
        id: 108,
        category: "Software Architecture",
        word: "Decoupling",
        simple_def: "Designing parts of a software system so they depend as little as possible on each other.",
        real_world_scenario: "Your shopping cart and recommendation system are tightly connected. If the recommendation system fails, shopping also stops. By decoupling them, recommendations can fail while customers can still add products to their cart and complete purchases.",
        source: "Robust Python",
        difficulty: "Medium"
    },
    {
        id: 109,
        category: "Software Architecture",
        word: "API Wrapper",
        simple_def: "A layer of software that provides a simpler way to interact with an existing API.",
        real_world_scenario: "Your application uses an AI provider's API. Instead of calling the provider directly from dozens of places in your code, you create one wrapper such as `generate_response()`. If the provider's API changes, you can update the wrapper instead of changing the entire application.",
        source: "AI-Native Engineering Sprint",
        difficulty: "Medium"
    },
    {
        id: 110,
        category: "Software Architecture",
        word: "Refactoring",
        simple_def: "Improving the structure and readability of existing code without changing what the software does.",
        real_world_scenario: "Your application works correctly, but one function has become 500 lines long. You split it into smaller functions and rename confusing variables. The user sees no new feature, but developers can now understand and maintain the code more easily.",
        source: "Robust Python",
        difficulty: "Medium"
    },
    {
        id: 111,
        category: "Advanced Stats Simplified",
        word: "P-Value",
        simple_def: "A number that helps you judge how surprising your experiment's result would be if there were actually no real effect.",
        real_world_scenario: "You change your website button from red to blue and sales increase by 2%. A statistical test gives you a high p-value, meaning the result is not strong evidence that the new color caused the increase. The change could easily be random variation.",
        source: "Practical Statistics for Data Scientists",
        difficulty: "Hard"
    },
    {
        id: 112,
        category: "Advanced Stats Simplified",
        word: "False Positive (Type I Error)",
        simple_def: "When a test says something is positive or present even though it is actually not.",
        real_world_scenario: "A spam filter marks an important customer email as spam. The email really is legitimate, but the system incorrectly classified it as spam. That is a False Positive.",
        source: "Probabilistic Machine Learning",
        difficulty: "Hard"
    },
    {
        id: 113,
        category: "Advanced Stats Simplified",
        word: "Normal Distribution (Bell Curve)",
        simple_def: "A common pattern where most values are close to the average and fewer values appear as you move farther away from it.",
        real_world_scenario: "Suppose you measure the heights of thousands of people from a similar population. Most people will be around the middle range, while very short and very tall people will be less common. When the data follows this pattern, it can look like a bell-shaped curve.",
        source: "Practical Statistics for Data Scientists",
        difficulty: "Hard"
    },
    {
        id: 114,
        category: "Advanced Stats Simplified",
        word: "Selection Bias",
        simple_def: "A problem that happens when the data you collect does not properly represent the larger group you want to understand.",
        real_world_scenario: "You want to know what customers think about your product, but you only survey customers who voluntarily joined your fan community. Their opinions may be much more positive than those of your entire customer base. Your sample is biased.",
        source: "Practical Statistics for Data Scientists",
        difficulty: "Hard"
    },
    {
        id: 115,
        category: "Advanced Stats Simplified",
        word: "Mean vs. Median",
        simple_def: "The mean is the average of all values. The median is the middle value after sorting the values.",
        real_world_scenario: "Nine people earn $50,000 and one person earns $1 million. The mean salary becomes much higher because of the millionaire. The median still represents the typical middle person much better, so analysts often use it when extreme values exist.",
        source: "Think Like a Freak",
        difficulty: "Hard"
    },
    {
        id: 116,
        category: "RL & Optimization",
        word: "Reinforcement Learning (RL)",
        simple_def: "A way of training an AI by letting it take actions and giving it rewards or penalties based on the results.",
        real_world_scenario: "To teach an AI to play a game, you give it points for useful actions and negative rewards for losing. After playing many times, the AI learns which actions tend to produce higher total rewards.",
        source: "Reinforcement Learning (Powell)",
        difficulty: "Hard"
    },
    {
        id: 117,
        category: "RL & Optimization",
        word: "Reward Function",
        simple_def: "The rule that tells a reinforcement learning system how good or bad an action or outcome is.",
        real_world_scenario: "You train a cleaning robot and give it a reward for picking up trash. If your reward is poorly designed, the robot might find a strange way to maximize points without actually keeping the room clean. The reward must represent the real goal carefully.",
        source: "Probabilistic Machine Learning",
        difficulty: "Hard"
    },
    {
        id: 118,
        category: "RL & Optimization",
        word: "Exploration vs. Exploitation",
        simple_def: "The choice between using an option you already know works and trying something new that might work even better.",
        real_world_scenario: "A recommendation system knows one type of video usually gets good engagement. Exploitation means continuing to recommend it. Exploration means occasionally testing a different type of video to discover something even better.",
        source: "Reinforcement Learning (Powell)",
        difficulty: "Hard"
    },
    {
        id: 119,
        category: "RL & Optimization",
        word: "State Space",
        simple_def: "The collection of all possible situations that a system can be in.",
        real_world_scenario: "In a simple board game, there may be only a limited number of possible positions. In chess, the number of possible positions is enormous. This huge state space makes it impossible for an AI to simply memorize every possible situation.",
        source: "Introduction to Algorithms",
        difficulty: "Hard"
    },
    {
        id: 120,
        category: "RL & Optimization",
        word: "Stochastic",
        simple_def: "Describing a system or process that involves randomness or uncertainty.",
        real_world_scenario: "A program that calculates `2 + 2` is deterministic because it always returns 4. Predicting tomorrow's stock price is stochastic because many uncertain events can affect the result.",
        source: "Reinforcement Learning & Stochastic Optimization",
        difficulty: "Hard"
    },
    {
        id: 121,
        category: "Classic Machine Learning",
        word: "Decision Tree",
        simple_def: "A machine learning model that makes predictions by asking a series of questions and following different branches based on the answers.",
        real_world_scenario: "A loan model might first ask whether income is above a certain level, then check payment history, and then consider other factors before reaching an approve or reject decision.",
        source: "Hands-On Machine Learning (Geron)",
        difficulty: "Medium"
    },
    {
        id: 122,
        category: "Classic Machine Learning",
        word: "Random Forest",
        simple_def: "A machine learning model that combines many decision trees and uses their combined predictions to make a final decision.",
        real_world_scenario: "Instead of trusting one decision tree to predict whether a customer will leave, a Random Forest uses many trees. Each tree may see slightly different data, and their combined predictions usually produce a more reliable result.",
        source: "Hands-On Machine Learning (Geron)",
        difficulty: "Medium"
    },
    {
        id: 123,
        category: "Classic Machine Learning",
        word: "Gradient Boosting (XGBoost)",
        simple_def: "A machine learning technique that builds models one after another, with each new model focusing on correcting errors made by the previous models.",
        real_world_scenario: "You are predicting house prices. The first model makes several mistakes. The next model focuses more on those mistakes, and later models continue improving them. Combining the models can produce a highly accurate prediction.",
        source: "Data Science from Scratch",
        difficulty: "Medium"
    },
    {
        id: 124,
        category: "Classic Machine Learning",
        word: "Cross-Validation",
        simple_def: "A way to test a machine learning model multiple times using different parts of the data for training and validation.",
        real_world_scenario: "You have 10,000 customer records. With 5-fold cross-validation, you split the data into five parts, train on four parts, and validate on the remaining part. You repeat this until every part has been used for validation.",
        source: "Practical Statistics for Data Scientists",
        difficulty: "Medium"
    },
    {
        id: 125,
        category: "Classic Machine Learning",
        word: "Hyperparameter Tuning",
        simple_def: "Finding good settings for a machine learning model before or during training.",
        real_world_scenario: "A model has settings such as learning rate or tree depth. You try different combinations and compare their performance on validation data to find settings that work well.",
        source: "Hands-On Machine Learning (Geron)",
        difficulty: "Medium"
    },
    {
        id: 126,
        category: "Classic Machine Learning",
        word: "PCA (Principal Component Analysis)",
        simple_def: "A technique that reduces the number of variables in data while trying to preserve as much of the important variation as possible.",
        real_world_scenario: "Your dataset contains hundreds of related measurements. PCA can transform them into a smaller number of components that capture much of the variation, making the dataset easier to visualize or process.",
        source: "Mathematics for Machine Learning",
        difficulty: "Medium"
    },
    {
        id: 127,
        category: "Classic Machine Learning",
        word: "K-Nearest Neighbors (KNN)",
        simple_def: "A machine learning method that predicts something by looking at the most similar or closest examples in the existing data.",
        real_world_scenario: "A user buys a science-fiction book. KNN finds other users with similar reading histories and looks at what those users bought next. Those patterns can be used to recommend another book.",
        source: "Data Science from Scratch",
        difficulty: "Medium"
    },
    {
        id: 128,
        category: "Classic Machine Learning",
        word: "Support Vector Machine (SVM)",
        simple_def: "A machine learning method that finds a boundary separating different groups of data while trying to keep the boundary as far as possible from the closest examples.",
        real_world_scenario: "You have data points representing apples and oranges. SVM finds a boundary that separates the two groups with the largest possible margin, then uses that boundary to classify new examples.",
        source: "Foundations of Machine Learning",
        difficulty: "Medium"
    },
    {
        id: 129,
        category: "Classic Machine Learning",
        word: "Naive Bayes",
        simple_def: "A fast probability-based machine learning method that assumes features are independent when calculating the likelihood of an outcome.",
        real_world_scenario: "A spam filter looks at words in an email and calculates how likely those words are to appear in spam messages. It combines these probabilities to decide whether the email is likely to be spam.",
        source: "Probabilistic Machine Learning",
        difficulty: "Medium"
    },
    {
        id: 130,
        category: "Classic Machine Learning",
        word: "Confusion Matrix",
        simple_def: "A table that shows how a classification model's predictions compare with the actual answers, including correct and incorrect predictions.",
        real_world_scenario: "A disease detection model is 99% accurate, but the dataset contains mostly healthy people. A confusion matrix reveals how many sick people were correctly detected and how many were missed, giving you a much clearer picture of performance.",
        source: "Practical Statistics for Data Scientists",
        difficulty: "Medium"
    },
    {
        id: 131,
        category: "Neural Networks & Deep Learning",
        word: "Backpropagation",
        simple_def: "The process of sending a model's error backward through the neural network to calculate how its weights should change.",
        real_world_scenario: "A neural network predicts 'dog' when the image is actually a cat. Backpropagation calculates how each part of the network contributed to the error and provides the information needed to adjust the weights during training.",
        source: "Deep Learning (Goodfellow)",
        difficulty: "Hard"
    },
    {
        id: 132,
        category: "Neural Networks & Deep Learning",
        word: "Activation Function (ReLU)",
        simple_def: "A function inside a neural network that transforms a neuron's output and allows the network to learn complex, non-linear patterns.",
        real_world_scenario: "ReLU takes a number and returns 0 when the number is negative, while positive values pass through. Without activation functions, stacking neural network layers would not give the model the same ability to learn complex relationships.",
        source: "Mathematics for Machine Learning",
        difficulty: "Hard"
    },
    {
        id: 133,
        category: "Neural Networks & Deep Learning",
        word: "Epoch vs. Batch",
        simple_def: "A batch is one smaller group of training examples. An epoch is one complete pass through the entire training dataset.",
        real_world_scenario: "You have 1 million training images but your GPU cannot process them all at once. You train using batches of 32 images. After all 1 million images have been processed once, one epoch is complete.",
        source: "Deep Learning (Goodfellow)",
        difficulty: "Hard"
    },
    {
        id: 134,
        category: "Neural Networks & Deep Learning",
        word: "CNN (Convolutional Neural Network)",
        simple_def: "A neural network designed especially for visual data that learns useful patterns such as edges, shapes, and objects from images.",
        real_world_scenario: "A self-driving system receives camera images. Early CNN layers can detect simple patterns such as edges, while deeper layers combine those patterns to recognize objects such as road signs or vehicles.",
        source: "Hands-On Machine Learning (Geron)",
        difficulty: "Hard"
    },
    {
        id: 135,
        category: "Neural Networks & Deep Learning",
        word: "RNN (Recurrent Neural Network)",
        simple_def: "A neural network designed to process sequences while carrying information from earlier steps to later steps.",
        real_world_scenario: "When processing a sentence, an RNN can carry information from earlier words while reading later words. This can help it understand that earlier context may affect the meaning of the current word.",
        source: "Deep Learning for NLP",
        difficulty: "Hard"
    },
    {
        id: 136,
        category: "Neural Networks & Deep Learning",
        word: "Dropout",
        simple_def: "A regularization technique that randomly disables some neurons during training so the network does not depend too heavily on particular neurons.",
        real_world_scenario: "If a neural network becomes too dependent on a small number of neurons, it may perform well on training data but poorly on new data. Dropout temporarily removes random neurons during training, encouraging the network to learn more robust patterns.",
        source: "Deep Learning (Goodfellow)",
        difficulty: "Hard"
    },
    {
        id: 137,
        category: "Neural Networks & Deep Learning",
        word: "Batch Normalization",
        simple_def: "A technique that normalizes the activations of a neural network during training to help make training more stable.",
        real_world_scenario: "As data moves through many neural network layers, the values can become difficult to work with. Batch Normalization adjusts these activations within training batches, which can help the network train more reliably.",
        source: "Hands-On Machine Learning (Geron)",
        difficulty: "Hard"
    },
    {
        id: 138,
        category: "Neural Networks & Deep Learning",
        word: "Learning Rate",
        simple_def: "A setting that controls how large a step the model takes when updating its parameters during training.",
        real_world_scenario: "If the learning rate is too large, training may jump around and miss a good solution. If it is too small, training may take a very long time. A suitable learning rate helps the model learn efficiently.",
        source: "Mathematics for Machine Learning",
        difficulty: "Hard"
    },
    {
        id: 139,
        category: "Neural Networks & Deep Learning",
        word: "Loss Function",
        simple_def: "A mathematical function that measures how far a model's prediction is from the correct answer.",
        real_world_scenario: "A model predicts a house will cost $100,000 when the actual price is $300,000. The loss function converts this error into a numerical score. During training, the model tries to reduce this loss.",
        source: "Deep Learning (Goodfellow)",
        difficulty: "Hard"
    },
    {
        id: 140,
        category: "Neural Networks & Deep Learning",
        word: "GANs (Generative Adversarial Networks)",
        simple_def: "A type of generative model where one network creates examples and another network tries to determine whether they are real or generated.",
        real_world_scenario: "A Generator creates a fake face while a Discriminator tries to identify whether the face is real or fake. During training, the Generator improves at creating realistic examples while the Discriminator improves at detecting them.",
        source: "Deep Learning (Goodfellow)",
        difficulty: "Hard"
    },
    {
        id: 141,
        category: "Advanced NLP & LLM Training",
        word: "RLHF (Reinforcement Learning from Human Feedback)",
        simple_def: "A method of improving an AI model using human preferences about which responses are better or worse.",
        real_world_scenario: "Humans compare two AI answers and indicate which one is more helpful. The training process uses these preferences to make the model more likely to produce responses that people prefer.",
        source: "AI Native Engineering Sprint",
        difficulty: "Hard"
    },
    {
        id: 142,
        category: "Advanced NLP & LLM Training",
        word: "DPO (Direct Preference Optimization)",
        simple_def: "A method for training a language model directly from examples showing which response humans prefer.",
        real_world_scenario: "For the same question, you have a preferred answer and a less preferred answer. DPO uses these preference pairs to train the model to increase the likelihood of producing answers similar to the preferred ones.",
        source: "AI Native Engineering Sprint",
        difficulty: "Hard"
    },
    {
        id: 143,
        category: "Advanced NLP & LLM Training",
        word: "Pre-training vs. Fine-Tuning",
        simple_def: "Pre-training teaches a model broad patterns from a large dataset. Fine-tuning further trains an existing model for a more specific task or style.",
        real_world_scenario: "A language model may first learn general language patterns from a huge dataset. A company can then fine-tune that model using its customer-support examples so it performs better for that specific type of work.",
        source: "Hands-On Large Language Models",
        difficulty: "Hard"
    },
    {
        id: 144,
        category: "Advanced NLP & LLM Training",
        word: "Encoder vs. Decoder",
        simple_def: "An encoder is designed to build useful representations of input text, while a decoder is designed to generate output text step by step.",
        real_world_scenario: "An encoder-based model can be useful for classifying customer reviews as positive or negative. A decoder-based model can generate a new response, article, or story based on a prompt.",
        source: "NLP with Transformers",
        difficulty: "Hard"
    },
    {
        id: 145,
        category: "Advanced NLP & LLM Training",
        word: "BLEU / ROUGE Score",
        simple_def: "Automatic evaluation metrics that compare generated text with one or more reference texts using patterns such as matching words or sequences.",
        real_world_scenario: "You build a translation system that produces thousands of translations. BLEU can compare the generated translations with reference translations automatically, giving you a numerical score without manually checking every sentence.",
        source: "Deep Learning for NLP",
        difficulty: "Hard"
    },
    {
        id: 146,
        category: "Advanced NLP & LLM Training",
        word: "Perplexity",
        simple_def: "A language-model metric that measures how well the model predicts the next tokens in a sequence; lower perplexity generally means the model finds the sequence less surprising.",
        real_world_scenario: "A language model reads 'The cat sat on the...' and assigns high probability to likely next words such as 'mat'. When the next words are unusual or difficult to predict, the model's perplexity can increase.",
        source: "Deep Learning for NLP",
        difficulty: "Hard"
    },
    {
        id: 147,
        category: "Advanced NLP & LLM Training",
        word: "Few-Shot Prompting",
        simple_def: "Giving an AI a few examples of the task before asking it to handle a new example.",
        real_world_scenario: "You want the AI to return addresses as JSON. You provide two examples showing the exact input and JSON output format, then give it a third address. The examples help the model follow the desired pattern.",
        source: "Hands-On Large Language Models",
        difficulty: "Hard"
    },
    {
        id: 148,
        category: "Advanced NLP & LLM Training",
        word: "Instruction Tuning",
        simple_def: "Training a language model on instruction-and-response examples so it becomes better at following user instructions.",
        real_world_scenario: "A base language model is trained mainly to predict text. Instruction tuning gives it examples such as 'Summarize this paragraph' followed by a good summary, helping it learn to respond to commands more effectively.",
        source: "AI Engineering Project Curriculum",
        difficulty: "Hard"
    },
    {
        id: 149,
        category: "Advanced NLP & LLM Training",
        word: "Mixture of Experts (MoE)",
        simple_def: "A model architecture containing multiple expert networks where a routing mechanism selects which experts should process each input.",
        real_world_scenario: "An MoE model may contain different expert networks that learn different patterns. For one input, the router can activate only a subset of experts instead of sending the input through every expert, reducing the computation needed for each input.",
        source: "AI Engineering by Chip Huyen",
        difficulty: "Hard"
    },
    {
        id: 150,
        category: "Advanced NLP & LLM Training",
        word: "Text Chunking",
        simple_def: "Breaking a large document into smaller pieces so an AI system can process, search, or retrieve the information more effectively.",
        real_world_scenario: "You build a RAG system for a 100-page legal document. Instead of giving the entire document to the retrieval system at once, you split it into meaningful chunks so the system can retrieve the sections relevant to a user's question.",
        source: "AI Engineering Project Curriculum",
        difficulty: "Hard"
    },
    {
        id: 151,
        category: "Data Engineering & Systems",
        word: "Batch vs. Stream Processing",
        simple_def: "Batch processing handles data in groups at scheduled times, while stream processing handles data continuously as it arrives.",
        real_world_scenario: "A company can process all of yesterday's sales together every night using batch processing. A fraud detection system may process each credit card transaction immediately using stream processing.",
        source: "AI Engineering by Chip Huyen",
        difficulty: "Medium"
    },
    {
        id: 152,
        category: "Data Engineering & Systems",
        word: "Feature Store",
        simple_def: "A system for storing, managing, and serving machine learning features so models can access consistent data efficiently.",
        real_world_scenario: "A recommendation model needs a user's recent click-through rate. Instead of every application calculating it differently, a feature store can provide a consistent, precomputed version of that feature for training and prediction.",
        source: "The Complete Guide to Production ML",
        difficulty: "Medium"
    },
    {
        id: 153,
        category: "Data Engineering & Systems",
        word: "Data Lake vs. Data Warehouse",
        simple_def: "A data lake stores large amounts of data in many forms, often in relatively raw form. A data warehouse stores structured, organized data optimized for analysis.",
        real_world_scenario: "A company may store raw logs, images, and event data in a data lake. The cleaned sales data needed by finance analysts can then be stored in a data warehouse for fast SQL analysis and reporting.",
        source: "Mastering the Data Paradox",
        difficulty: "Medium"
    },
    {
        id: 154,
        category: "Data Engineering & Systems",
        word: "API Gateway",
        simple_def: "A service that acts as a single entry point for API requests and can handle tasks such as routing, authentication, and rate limiting.",
        real_world_scenario: "A mobile app needs to access payments, user accounts, and an AI service. Instead of connecting directly to every backend service, it sends requests through an API Gateway, which routes each request to the correct service.",
        source: "System Design Case Studies",
        difficulty: "Medium"
    },
    {
        id: 155,
        category: "Data Engineering & Systems",
        word: "Load Balancer",
        simple_def: "A system that distributes incoming requests across multiple servers so traffic does not overload one server.",
        real_world_scenario: "Your AI application suddenly receives thousands of requests. Instead of sending every request to one server, the load balancer distributes them across several healthy servers so the application can handle the traffic.",
        source: "Production-Grade ML Projects",
        difficulty: "Medium"
    },
    {
        id: 156,
        category: "Data Engineering & Systems",
        word: "Database Indexing",
        simple_def: "A technique that creates an additional data structure to help a database find rows faster without scanning the entire table.",
        real_world_scenario: "Your customer table contains 50 million records. Searching for a customer's email without an index may require scanning many rows. An index on the email column can allow the database to locate matching records much faster.",
        source: "Robust Python",
        difficulty: "Medium"
    },
    {
        id: 157,
        category: "Data Engineering & Systems",
        word: "Web Scraping",
        simple_def: "Automatically collecting information from websites using software.",
        real_world_scenario: "You want to track product prices across several websites. A scraper can request pages, extract the relevant price information, and store the results in a database for later analysis, provided the collection complies with the site's rules.",
        source: "Data Science from Scratch",
        difficulty: "Medium"
    },
    {
        id: 158,
        category: "Data Engineering & Systems",
        word: "Parquet Format",
        simple_def: "A column-oriented file format designed to store and process analytical data efficiently.",
        real_world_scenario: "You have a dataset with 100 columns but your analysis only needs the `age` and `salary` columns. Because Parquet stores data by column, an analytics system can often read only the columns it needs instead of loading the entire dataset.",
        source: "Mastering the Data Paradox",
        difficulty: "Medium"
    },
    {
        id: 159,
        category: "Data Engineering & Systems",
        word: "MapReduce",
        simple_def: "A distributed computing approach that splits a large task into smaller tasks, processes them in parallel, and then combines the results.",
        real_world_scenario: "You need to count how often the word 'AI' appears across billions of documents. The Map stage lets many machines count different parts of the data, while the Reduce stage combines their counts into one final number.",
        source: "Data Science from Scratch",
        difficulty: "Medium"
    },
    {
        id: 160,
        category: "Data Engineering & Systems",
        word: "Pagination",
        simple_def: "Splitting a large set of results into smaller pages or batches instead of returning everything at once.",
        real_world_scenario: "A search returns 50,000 invoices. Instead of sending all 50,000 records to the browser, the API returns the first 20. When the user clicks Next, the application requests the next 20.",
        source: "System Design Case Studies",
        difficulty: "Medium"
    },
    {
        id: 161,
        category: "Design Patterns & Clean Code",
        word: "Factory Pattern",
        simple_def: "A design pattern that centralizes the creation of objects so the rest of the application does not need to know the detailed setup process.",
        real_world_scenario: "Your application supports multiple AI providers such as OpenAI, Claude, and a local model. Instead of creating each model manually throughout the codebase, an LLM Factory can choose and create the correct model based on the requested type.",
        source: "Design Patterns (GoF)",
        difficulty: "Medium"
    },
    {
        id: 162,
        category: "Design Patterns & Clean Code",
        word: "Observer Pattern",
        simple_def: "A design pattern where objects subscribe to an event and are automatically notified when that event happens.",
        real_world_scenario: "A payment system announces that a payment is complete. The email service sends a receipt and the account service activates the subscription. Both services receive the event without the payment system needing to tightly control their internal logic.",
        source: "Design Patterns (GoF)",
        difficulty: "Medium"
    },
    {
        id: 163,
        category: "Design Patterns & Clean Code",
        word: "Facade Pattern",
        simple_def: "A design pattern that provides one simple interface for interacting with a complicated system.",
        real_world_scenario: "Processing a PDF may require OCR, text extraction, chunking, embeddings, and database operations. Instead of making developers call each component separately, you provide a simple `process_pdf(file)` function that coordinates the internal steps.",
        source: "Design Patterns (GoF)",
        difficulty: "Medium"
    },
    {
        id: 164,
        category: "Design Patterns & Clean Code",
        word: "Decorator Pattern",
        simple_def: "A design pattern that adds extra behavior to an existing function or object without changing its original implementation.",
        real_world_scenario: "You already have a function that calls an AI model. You want to measure how long it takes. Instead of changing the function itself, you wrap it with a timer decorator that records the start and end time.",
        source: "Design Patterns (GoF)",
        difficulty: "Medium"
    },
    {
        id: 165,
        category: "Design Patterns & Clean Code",
        word: "Magic Numbers",
        simple_def: "Unexplained numbers written directly in code whose meaning is unclear to other developers.",
        real_world_scenario: "You write `price = cost * 1.20`. Another developer cannot tell whether `1.20` represents tax, a fee, or something else. Replacing it with a named constant such as `TAX_RATE` makes the code much easier to understand.",
        source: "Robust Python",
        difficulty: "Medium"
    },
    {
        id: 166,
        category: "Design Patterns & Clean Code",
        word: "Global Variables",
        simple_def: "Variables that can be accessed or changed from many parts of a program, making their state harder to control.",
        real_world_scenario: "One part of the application sets a global `user_role` to `Admin`, while another part changes it to `Guest`. Because many parts of the application can modify the same value, unexpected behavior becomes harder to debug.",
        source: "Robust Python",
        difficulty: "Medium"
    },
    {
        id: 167,
        category: "Design Patterns & Clean Code",
        word: "Linter (Static Analysis)",
        simple_def: "A tool that automatically checks source code for common errors, style problems, and suspicious patterns without running the program.",
        real_world_scenario: "You write Python code with an unused variable and inconsistent formatting. A linter such as Ruff or Flake8 can flag these issues while you are developing, helping you catch problems before the code reaches production.",
        source: "Robust Python",
        difficulty: "Medium"
    },
    {
        id: 168,
        category: "Design Patterns & Clean Code",
        word: "Mocking",
        simple_def: "Replacing a real dependency with a fake one during testing so you can test your code without using the real service.",
        real_world_scenario: "Your payment application calls a payment provider. During automated tests, you do not want to make real payment requests. A mock can pretend the payment provider returned 'Success', allowing you to test your application's logic safely.",
        source: "Robust Python",
        difficulty: "Medium"
    },
    {
        id: 169,
        category: "Design Patterns & Clean Code",
        word: "Idempotency",
        simple_def: "A property where repeating the same operation produces the same intended final result instead of creating unwanted additional effects.",
        real_world_scenario: "A customer clicks 'Pay' twice because the first request seems slow. With an idempotency key, the payment service can recognize that both requests represent the same payment attempt and avoid charging the customer twice.",
        source: "System Design Case Studies",
        difficulty: "Medium"
    },
    {
        id: 170,
        category: "Design Patterns & Clean Code",
        word: "Microservices",
        simple_def: "An architecture where an application is divided into smaller services that can be developed and deployed independently.",
        real_world_scenario: "An online platform may have separate services for payments, recommendations, and video delivery. If the recommendation service fails, the payment and video services can continue operating instead of the entire application necessarily going down.",
        source: "Data-Intensive Applications",
        difficulty: "Medium"
    },
    {
        id: 171,
        category: "Mathematics & Calculus Simplified",
        word: "Derivative",
        simple_def: "A mathematical concept that measures how quickly one quantity changes when another quantity changes.",
        real_world_scenario: "If you know a car's position over time, the derivative of position tells you its instantaneous speed. In machine learning, derivatives help determine how changing a model parameter affects its error.",
        source: "Calculus Volume 1",
        difficulty: "Hard"
    },
    {
        id: 172,
        category: "Mathematics & Calculus Simplified",
        word: "Integral",
        simple_def: "A mathematical method for adding up many tiny quantities to find a total amount.",
        real_world_scenario: "If you know a car's speed at every moment, integrating the speed over time gives the total distance traveled. In probability, integrals can be used to calculate total probability across a continuous range.",
        source: "Calculus Volume 2",
        difficulty: "Hard"
    },
    {
        id: 173,
        category: "Mathematics & Calculus Simplified",
        word: "Local Minimum vs. Global Minimum",
        simple_def: "A local minimum is the lowest point in a nearby region, while a global minimum is the lowest point across the entire function.",
        real_world_scenario: "Imagine walking downhill and reaching the bottom of a small valley. You cannot see a deeper valley farther away, so you stop. The small valley is a local minimum; the deepest valley overall is the global minimum.",
        source: "Calculus Volume 3 / Deep Learning",
        difficulty: "Hard"
    },
    {
        id: 174,
        category: "Mathematics & Calculus Simplified",
        word: "Vector",
        simple_def: "A mathematical object that represents multiple values together and can also represent direction and magnitude.",
        real_world_scenario: "Wind described as '10 km/h north' has both magnitude and direction, so it can be represented as a vector. In AI, words and other data can also be represented as vectors containing many numerical dimensions.",
        source: "Linear Algebra for Everyone",
        difficulty: "Hard"
    },
    {
        id: 175,
        category: "Mathematics & Calculus Simplified",
        word: "Matrix",
        simple_def: "A rectangular arrangement of numbers organized into rows and columns.",
        real_world_scenario: "A grayscale image can be represented as a matrix where each number represents the brightness of one pixel. Machine learning systems perform mathematical operations on these matrices to process the image.",
        source: "Linear Algebra for Everyone",
        difficulty: "Hard"
    },
    {
        id: 176,
        category: "Mathematics & Calculus Simplified",
        word: "Eigenvector",
        simple_def: "A vector whose direction stays unchanged when a particular linear transformation is applied to it, although its size may change.",
        real_world_scenario: "Imagine stretching a shape in a particular way. Most directions may rotate or change, but some special directions remain pointing the same way. Those special directions are represented by eigenvectors and are useful in many areas of mathematics and data science.",
        source: "Linear Algebra for Everyone",
        difficulty: "Hard"
    },
    {
        id: 177,
        category: "Mathematics & Calculus Simplified",
        word: "Orthogonality",
        simple_def: "A mathematical relationship where two vectors are perpendicular, meaning their dot product is zero.",
        real_world_scenario: "On a graph, the x-axis and y-axis are perpendicular. In data and machine learning, orthogonal vectors can represent directions that do not overlap in the mathematical sense.",
        source: "Linear Algebra for Everyone / Pragmatic Programmer",
        difficulty: "Hard"
    },
    {
        id: 178,
        category: "Mathematics & Calculus Simplified",
        word: "Manifold",
        simple_def: "A mathematical space that may have many dimensions but can behave like a simpler space when viewed locally.",
        real_world_scenario: "A large dataset may contain millions of possible numerical dimensions, but the meaningful examples may lie close to a much simpler underlying structure. Machine learning can sometimes discover this lower-dimensional structure.",
        source: "Deep Learning (Goodfellow)",
        difficulty: "Hard"
    },
    {
        id: 179,
        category: "Mathematics & Calculus Simplified",
        word: "Chain Rule",
        simple_def: "A calculus rule for finding how a change in one variable affects another when several functions depend on each other.",
        real_world_scenario: "A neural network has many layers, where the output of one layer becomes the input to the next. The chain rule lets us calculate how a change in an early layer affects the final output, which is essential for backpropagation.",
        source: "Calculus Volume 1",
        difficulty: "Hard"
    },
    {
        id: 180,
        category: "Mathematics & Calculus Simplified",
        word: "Logarithm",
        simple_def: "The reverse of an exponent. It tells you what power you need to raise a number to in order to get another number.",
        real_world_scenario: "Since 10 × 10 × 10 = 1,000, the logarithm base 10 of 1,000 is 3. Logarithms are useful in data science because they can compress very large numbers into a smaller scale, making patterns easier to analyze.",
        source: "Mathematics for Machine Learning",
        difficulty: "Hard"
    },
    {
        id: 181,
        category: "Probability & Bayesian Thinking",
        word: "Bayes' Theorem",
        simple_def: "A way to update what you believe after seeing new evidence.",
        real_world_scenario: "A spam filter thinks an email is probably normal. Then it sees words and patterns commonly found in spam. Bayes' theorem helps update the probability that the email is actually spam."
    },
    {
        id: 182,
        category: "Probability & Bayesian Thinking",
        word: "Markov Property",
        simple_def: "The idea that what happens next depends on the current situation, not the entire past.",
        real_world_scenario: "In a simple game, your next move depends on your current position and the next dice roll. The exact moves you made several turns ago do not directly affect the next state."
    },
    {
        id: 183,
        category: "Probability & Bayesian Thinking",
        word: "Monte Carlo Simulation",
        simple_def: "Using many random simulations to estimate what outcomes are likely to happen.",
        real_world_scenario: "You want to know whether your savings will last through retirement. A computer can simulate thousands of possible investment returns and show how often your money lasts until the end of retirement."
    },
    {
        id: 184,
        category: "Probability & Bayesian Thinking",
        word: "Mutually Exclusive",
        simple_def: "Two events that cannot happen at the same time.",
        real_world_scenario: "When flipping a normal coin once, the result can be Heads or Tails, but not both at the same time. These two outcomes are mutually exclusive."
    },
    {
        id: 185,
        category: "Probability & Bayesian Thinking",
        word: "Prior Probability",
        simple_def: "How likely something is before you consider new evidence.",
        real_world_scenario: "A doctor considers how common a disease is before looking at a patient's test results. If the disease is very rare, its prior probability is low."
    },
    {
        id: 186,
        category: "Probability & Bayesian Thinking",
        word: "Long Tail / Black Swan",
        simple_def: "Rare events that happen very infrequently but can have a very large impact.",
        real_world_scenario: "A company plans for normal levels of customer traffic, but a viral social media post suddenly brings millions of visitors. The rare event can create a much bigger impact than normal daily traffic."
    },
    {
        id: 187,
        category: "Probability & Bayesian Thinking",
        word: "Standard Deviation",
        simple_def: "A measure of how spread out the values are from the average.",
        real_world_scenario: "Two teams have the same average salary. In one team, salaries are close together. In the other, a few people earn much more than everyone else. The second team has a higher standard deviation."
    },
    {
        id: 188,
        category: "Probability & Bayesian Thinking",
        word: "Confidence Interval",
        simple_def: "A range of values used to estimate an unknown population value from sample data.",
        real_world_scenario: "You survey 1,000 users and estimate that 40% would use a new feature. Instead of treating 40% as exact, you report a confidence interval that gives a reasonable range for the true percentage."
    },
    {
        id: 189,
        category: "Probability & Bayesian Thinking",
        word: "Law of Large Numbers",
        simple_def: "As you repeat a random experiment many times, the average result tends to get closer to the expected value.",
        real_world_scenario: "A coin might land Heads four times in a row. But after thousands of flips, the percentage of Heads will usually get much closer to the coin's expected 50%."
    },
    {
        id: 190,
        category: "Probability & Bayesian Thinking",
        word: "Survivorship Bias",
        simple_def: "Focusing only on successful examples while ignoring the unsuccessful ones.",
        real_world_scenario: "You study successful startups and notice that many founders took a certain approach. If you ignore startups that used the same approach and failed, you may wrongly conclude that the approach guarantees success."
    },
    {
        id: 191,
        category: "Search & Traditional AI",
        word: "Heuristic",
        simple_def: "A practical rule or shortcut that helps solve a problem faster, even if it is not always perfect.",
        real_world_scenario: "A navigation system may prefer roads that appear to move you closer to your destination instead of checking every possible route. This shortcut helps find a good route faster."
    },
    {
        id: 192,
        category: "Search & Traditional AI",
        word: "Depth-First Search",
        simple_def: "A search method that follows one path as far as possible before going back and trying another path.",
        real_world_scenario: "When searching through folders, DFS can open one folder, then a folder inside it, and keep going deeper until there are no more folders before returning to check another branch."
    },
    {
        id: 193,
        category: "Search & Traditional AI",
        word: "A* (A-Star) Algorithm",
        simple_def: "A pathfinding algorithm that considers both the distance already traveled and the estimated distance to the goal.",
        real_world_scenario: "A game character needs to reach a destination while avoiding walls. A* compares possible paths using the distance already traveled and an estimate of how far each path is from the destination."
    },
    {
        id: 194,
        category: "Search & Traditional AI",
        word: "Minimax Algorithm",
        simple_def: "A strategy for two-player games that chooses a move while assuming the opponent will make the best move against you.",
        real_world_scenario: "In a chess program, the AI considers possible moves and also considers how the opponent could respond. It chooses the move that gives it the best outcome against strong opposition."
    },
    {
        id: 195,
        category: "Search & Traditional AI",
        word: "Constraint Satisfaction",
        simple_def: "Solving a problem by finding solutions that satisfy a set of rules or constraints.",
        real_world_scenario: "A company needs to create employee shifts. Some employees are unavailable on certain days, while others can only work specific shifts. A constraint-based system searches for schedules that satisfy all these rules."
    },
    {
        id: 196,
        category: "Search & Traditional AI",
        word: "Utility Function",
        simple_def: "A function that gives a score to an outcome based on how desirable it is.",
        real_world_scenario: "A delivery system may score possible routes using travel time, fuel cost, and delivery priority. It can then choose the route with the highest overall utility."
    },
    {
        id: 197,
        category: "Search & Traditional AI",
        word: "Decision Boundary",
        simple_def: "The boundary a machine learning model uses to separate different classes of data.",
        real_world_scenario: "A loan model may learn that customers with certain combinations of income and credit history are more likely to repay. The boundary between the two groups is the model's decision boundary."
    },
    {
        id: 198,
        category: "Search & Traditional AI",
        word: "Knowledge Graph",
        simple_def: "A system that stores entities and the relationships between them.",
        real_world_scenario: "A knowledge graph can connect a person to their company, the company to its industry, and the company to its products. A search system can use these relationships to answer related questions."
    },
    {
        id: 199,
        category: "Search & Traditional AI",
        word: "API Key",
        simple_def: "A secret credential that allows your application to access an API.",
        real_world_scenario: "Your application uses an AI API and needs an API key to make requests. If you publish the key in a public GitHub repository, someone else could use your account and create unexpected charges."
    },
    {
        id: 200,
        category: "Search & Traditional AI",
        word: "Exponential Backoff",
        simple_def: "A retry strategy that waits longer after each failed request.",
        real_world_scenario: "Your application sends a request to a server, but the server is temporarily unavailable. Instead of retrying continuously, the application waits 1 second, then 2, then 4, reducing pressure on the server."
    },
    {
        id: 201,
        category: "Career, Psychology & Workflows",
        word: "Sunk Cost Fallacy",
        simple_def: "Continuing something because you have already invested time or money in it, even when stopping would be better.",
        real_world_scenario: "You spend three months building a tool, but users do not need it. You keep working on it only because of the time already invested instead of moving to a better idea."
    },
    {
        id: 202,
        category: "Career, Psychology & Workflows",
        word: "Imposter Syndrome",
        simple_def: "Feeling that you are not good enough and that others will discover you are less capable than they think.",
        real_world_scenario: "You start a new engineering job and feel like everyone else knows more than you. Even when your work is good, you worry that you are not qualified for the role."
    },
    {
        id: 203,
        category: "Career, Psychology & Workflows",
        word: "80/20 Rule (Pareto Principle)",
        simple_def: "The idea that a small part of your effort often produces a large part of the results.",
        real_world_scenario: "You analyze an app and discover that 20% of its features generate most of the user activity. Improving those important features may create more value than spending time on rarely used features."
    },
    {
        id: 204,
        category: "Career, Psychology & Workflows",
        word: "Pomodoro Technique",
        simple_def: "A time-management method where you work for a focused period and then take a short break.",
        real_world_scenario: "You need to study SQL. You work with full focus for 25 minutes, take a 5-minute break, and then start another focused session."
    },
    {
        id: 205,
        category: "Career, Psychology & Workflows",
        word: "Active Listening",
        simple_def: "Listening carefully and confirming that you understand what the other person is saying.",
        real_world_scenario: "A client says sales reports are difficult to maintain. Instead of immediately suggesting a solution, you repeat the problem in your own words and confirm that you understood it correctly."
    },
    {
        id: 206,
        category: "Career, Psychology & Workflows",
        word: "Dunning-Kruger Effect",
        simple_def: "A cognitive bias where people with limited knowledge may overestimate their ability.",
        real_world_scenario: "Someone watches a few AI tutorials and immediately believes they understand the entire field. After gaining more experience, they realize how much more there is to learn."
    },
    {
        id: 207,
        category: "Career, Psychology & Workflows",
        word: "Elevator Pitch",
        simple_def: "A short explanation of an idea, product, or skill that can be understood quickly.",
        real_world_scenario: "An investor asks what your startup does. Instead of explaining the entire technology, you say, 'Our AI reads legal contracts and highlights important risks in minutes.'"
    },
    {
        id: 208,
        category: "Career, Psychology & Workflows",
        word: "Timeboxing",
        simple_def: "Giving a task a fixed amount of time and stopping when that time is over.",
        real_world_scenario: "You are debugging a small UI issue. Instead of spending the whole afternoon on it, you give yourself 30 minutes. If you cannot solve it, you move on and return later."
    },
    {
        id: 209,
        category: "Career, Psychology & Workflows",
        word: "Pair Programming",
        simple_def: "Two developers working together on the same code, with one writing while the other reviews and guides.",
        real_world_scenario: "One developer writes a new function while another watches for mistakes, asks questions, and suggests improvements. They switch roles as they continue."
    },
    {
        id: 210,
        category: "Career, Psychology & Workflows",
        word: "The 'Yes, And' Rule",
        simple_def: "A brainstorming approach where you accept an idea and build on it instead of immediately rejecting it.",
        real_world_scenario: "A teammate suggests adding an AI assistant to your app. Instead of immediately saying no, you build on the idea by discussing where the assistant could provide the most useful help."
    },
    {
        id: 211,
        category: "Cloud Infrastructure & Advanced Ops",
        word: "GPU (Graphics Processing Unit)",
        simple_def: "A processor designed to perform many calculations in parallel, making it useful for AI workloads.",
        real_world_scenario: "Training a neural network requires performing huge numbers of similar mathematical operations. GPUs can perform many of these operations in parallel, making training much faster than using a CPU alone."
    },
    {
        id: 212,
        category: "Cloud Infrastructure & Advanced Ops",
        word: "ONNX / TensorRT",
        simple_def: "Tools and formats that can help convert and optimize machine learning models for faster inference.",
        real_world_scenario: "A team trains a model in PyTorch but needs to deploy it efficiently on a production server. They can use ONNX and TensorRT to convert and optimize the model for deployment."
    },
    {
        id: 213,
        category: "Cloud Infrastructure & Advanced Ops",
        word: "Load Testing",
        simple_def: "Testing an application with many simulated users or requests to see how it performs under heavy traffic.",
        real_world_scenario: "Before launching a website to a large audience, a team simulates thousands of users signing in at the same time. They discover that the database becomes slow and fix it before launch."
    },
    {
        id: 214,
        category: "Cloud Infrastructure & Advanced Ops",
        word: "Telemetry / Observability",
        simple_def: "Collecting information about a running system so you can understand its health and behavior.",
        real_world_scenario: "Users report that an AI application is slow. The engineering team checks logs, metrics, and traces and discovers that requests to an external API are taking much longer than usual."
    },
    {
        id: 215,
        category: "Cloud Infrastructure & Advanced Ops",
        word: "PII (Personally Identifiable Information)",
        simple_def: "Information that can identify a specific person, such as a name, email address, or phone number.",
        real_world_scenario: "A company stores customer names and email addresses in its database. Because this information can identify customers, it must be handled and protected carefully."
    },
    {
        id: 216,
        category: "Cloud Infrastructure & Advanced Ops",
        word: "Multitenancy",
        simple_def: "A system where multiple customers share the same application or infrastructure while keeping their data separated.",
        real_world_scenario: "A SaaS application serves hundreds of companies using the same platform. Each company can access its own records but cannot see another company's data."
    },
    {
        id: 217,
        category: "Cloud Infrastructure & Advanced Ops",
        word: "Webhook",
        simple_def: "A way for one system to automatically notify another system when an event happens.",
        real_world_scenario: "When a customer completes a payment, a payment service sends a webhook to your application. Your application receives the event and updates the customer's order automatically."
    },
    {
        id: 218,
        category: "Cloud Infrastructure & Advanced Ops",
        word: "Serverless (AWS Lambda)",
        simple_def: "A cloud model where you run code without managing a server yourself, usually paying based on usage.",
        real_world_scenario: "An image-processing function only runs when users upload images. Instead of keeping a server running all day, you can run the function when needed and pay based on its usage."
    },
    {
        id: 219,
        category: "Cloud Infrastructure & Advanced Ops",
        word: "CUDA",
        simple_def: "NVIDIA's platform that lets developers use NVIDIA GPUs for general-purpose computing.",
        real_world_scenario: "A machine learning framework needs to perform calculations on an NVIDIA GPU. CUDA provides the software tools that allow the framework to communicate with and use the GPU."
    },
    {
        id: 220,
        category: "Cloud Infrastructure & Advanced Ops",
        word: "Zero-Downtime Deployment",
        simple_def: "Updating an application without making the service unavailable to users.",
        real_world_scenario: "A company needs to release a new version of its website. It starts the new version while the old version is still serving users, then gradually switches traffic to the new version."
    },
    {
        id: 221,
        category: "Transformer Internals & Optimization",
        word: "Self-Attention",
        simple_def: "A mechanism that lets each word look at other words in the same sequence to understand its meaning.",
        real_world_scenario: "In 'The animal didn't cross the street because it was tired,' attention helps the model connect 'it' with the relevant earlier words and understand the sentence's context."
    },
    {
        id: 222,
        category: "Transformer Internals & Optimization",
        word: "Query, Key, Value (QKV) Matrices",
        simple_def: "Three representations used by attention to decide what information to look for, match against, and use.",
        real_world_scenario: "When processing a sentence, a token creates a Query representing what it needs. Other tokens provide Keys that can be matched against it, and their Values contain the information that can be used."
    },
    {
        id: 223,
        category: "Transformer Internals & Optimization",
        word: "Multi-Head Attention",
        simple_def: "Using multiple attention mechanisms so a Transformer can focus on different relationships in the data at the same time.",
        real_world_scenario: "While reading a sentence, one attention head may focus on grammatical relationships while another focuses on relationships between words that are far apart."
    },
    {
        id: 224,
        category: "Transformer Internals & Optimization",
        word: "Positional Embeddings",
        simple_def: "Information added to token representations so a Transformer can understand the position or order of tokens.",
        real_world_scenario: "The sentences 'The dog bit the man' and 'The man bit the dog' contain the same words but have different meanings. Position information helps the model distinguish their order."
    },
    {
        id: 225,
        category: "Transformer Internals & Optimization",
        word: "Masked Self-Attention (Causal Masking)",
        simple_def: "A method that prevents a model from looking at future tokens when predicting the next token.",
        real_world_scenario: "While training a text-generation model to predict the next word, the model can see the words before the current position but is prevented from seeing the answer that comes later."
    },
    {
        id: 226,
        category: "Software Architecture",
        word: "Encoder vs. Decoder Architecture",
        simple_def: "Encoders are designed to understand input, while decoders are designed to generate output.",
        real_world_scenario: "An encoder model can read a customer message and classify it as a complaint or question. A decoder model can read a prompt and generate a reply."
    },
    {
        id: 227,
        category: "Deep Learning & Transformers",
        word: "The RNN Bottleneck",
        simple_def: "The limitation of RNNs where tokens must be processed sequentially, making parallel processing difficult.",
        real_world_scenario: "An RNN processes a sentence one token after another, so later tokens must wait for earlier ones. This makes training on long sequences harder to parallelize."
    },
    {
        id: 228,
        category: "Advanced NLP & LLM Training",
        word: "In-Context Learning",
        simple_def: "Getting a model to perform a task by providing instructions or examples in the prompt without changing its parameters.",
        real_world_scenario: "You want an AI to classify customer messages. You give it a few examples showing messages labeled 'Refund' and 'Technical Issue', then ask it to classify a new message."
    },
    {
        id: 229,
        category: "Agentic Systems & Workflows",
        word: "Chain-of-Thought (CoT) Prompting",
        simple_def: "A prompting approach that encourages a model to reason through a problem in multiple steps.",
        real_world_scenario: "For a multi-step math problem, you can ask the model to work through the problem step by step before giving the final answer."
    },
    {
        id: 230,
        category: "Classic Machine Learning",
        word: "UMAP (Uniform Manifold Approximation and Projection)",
        simple_def: "A dimensionality-reduction technique used to represent high-dimensional data in fewer dimensions for visualization or analysis.",
        real_world_scenario: "You have thousands of customer embeddings with hundreds of dimensions. UMAP can reduce them to two dimensions so you can visualize whether different customer groups form clusters."
    },
    {
        id: 231,
        category: "Transformer Internals & Optimization",
        word: "Byte Pair Encoding (BPE)",
        simple_def: "A tokenization method that builds tokens by repeatedly combining common character or subword pairs.",
        real_world_scenario: "Instead of storing every word as a completely separate token, a tokenizer can learn common pieces such as 'ing' or 'tion' and reuse them across many words."
    },
    {
        id: 232,
        category: "Transformer Internals & Optimization",
        word: "Out-Of-Vocabulary (OOV)",
        simple_def: "A situation where a word cannot be represented by the vocabulary of a tokenizer or model.",
        real_world_scenario: "An older NLP system may encounter a new technical term that is not in its vocabulary and replace it with an unknown token. Subword tokenization can reduce this problem by breaking the word into smaller known pieces."
    },
    {
        id: 233,
        category: "Transformer Internals & Optimization",
        word: "Contextualized Embeddings",
        simple_def: "Word representations whose meaning changes based on the surrounding context.",
        real_world_scenario: "In 'I ate an apple' and 'Apple released a new phone,' the word 'Apple' has different meanings. A contextual model creates different representations based on the surrounding words."
    },
    {
        id: 234,
        category: "Software Architecture",
        word: "Generative vs. Representation Models",
        simple_def: "Generative models create new content, while representation models create useful representations of existing data.",
        real_world_scenario: "A company can use a representation model to classify customer support messages and a generative model to write replies to those customers."
    },
    {
        id: 235,
        category: "Transformer Internals & Optimization",
        word: "Residual Connections (Skip Connections)",
        simple_def: "Connections that add an earlier layer's information to a later layer, helping information and gradients flow through deep networks.",
        real_world_scenario: "A Transformer layer processes a token representation through several operations. A residual connection adds the original representation back to the result, helping preserve useful information as it moves through the network."
    },
    {
        id: 236,
        category: "Transformer Internals & Optimization",
        word: "Feed-Forward Network (FFN) Layer",
        simple_def: "A neural network layer in a Transformer that independently transforms each token representation after attention.",
        real_world_scenario: "After attention combines information from different tokens, the FFN further processes each token's representation and helps the model learn useful patterns from the data."
    },
    {
        id: 237,
        category: "Transformer Internals & Optimization",
        word: "Layer Normalization",
        simple_def: "A technique that normalizes the values within a layer to help neural network training remain stable.",
        real_world_scenario: "A Transformer has many layers of mathematical operations. Layer normalization helps keep the activations in a manageable range so training remains more stable."
    },
    {
        id: 238,
        category: "Transformer Internals & Optimization",
        word: "Logits",
        simple_def: "The raw scores a model produces before they are converted into probabilities.",
        real_world_scenario: "For the next token, a model might produce different raw scores for 'cat', 'dog', and 'car'. These scores are logits. A function such as Softmax can convert them into probabilities."
    },
    {
        id: 239,
        category: "Math, Stats & Core ML",
        word: "Softmax Function",
        simple_def: "A function that converts a set of scores into probabilities that add up to 1.",
        real_world_scenario: "A classifier produces scores for Cat, Dog, and Car. Softmax converts those scores into probabilities such as 0.8, 0.15, and 0.05."
    },
    {
        id: 240,
        category: "Transformer Internals & Optimization",
        word: "Greedy Search",
        simple_def: "A generation strategy that always chooses the highest-probability next token.",
        real_world_scenario: "If the model predicts that 'The' is most likely followed by 'cat', greedy decoding immediately chooses 'cat' instead of considering other possible tokens."
    },
    {
        id: 241,
        category: "Transformer Internals & Optimization",
        word: "Beam Search",
        simple_def: "A generation strategy that keeps several promising sequences and compares them as it generates text.",
        real_world_scenario: "A translation system considers several possible translations at each step instead of committing to only one word immediately. It keeps the strongest candidate sequences and selects the best overall sequence."
    },
    {
        id: 242,
        category: "Transformer Internals & Optimization",
        word: "Top-K Sampling",
        simple_def: "A generation method that randomly selects the next token from the K highest-probability options.",
        real_world_scenario: "If Top-K is set to 10, the model only considers the 10 most likely next tokens. It then samples from those options instead of considering every token."
    },
    {
        id: 243,
        category: "Transformer Internals & Optimization",
        word: "Top-p (Nucleus) Sampling",
        simple_def: "A generation method that samples from the smallest group of tokens whose combined probability reaches a chosen value.",
        real_world_scenario: "With top-p set to 0.9, the model keeps adding likely tokens until their probabilities add up to about 90%, then samples the next token from that group."
    },
    {
        id: 244,
        category: "Transformer Internals & Optimization",
        word: "Repetition Penalty",
        simple_def: "A generation setting that reduces the chance of repeatedly using the same tokens.",
        real_world_scenario: "If an AI keeps generating the same phrase again and again, a repetition penalty can reduce the probability of recently used tokens and encourage more varied output."
    },
    {
        id: 245,
        category: "Advanced NLP & LLM Training",
        word: "Causal Language Modeling (CLM)",
        simple_def: "Training a model to predict the next token using only the tokens that come before it.",
        real_world_scenario: "During training, a model sees 'The dog is' and tries to predict the next token. Repeating this across huge amounts of text teaches the model patterns of language."
    },
    {
        id: 246,
        category: "Advanced NLP & LLM Training",
        word: "Masked Language Modeling (MLM)",
        simple_def: "Training a model to predict missing tokens using the surrounding context.",
        real_world_scenario: "A sentence such as 'The cat chased the mouse' may become 'The cat [MASK] the mouse.' The model uses the words around the blank to predict the missing word."
    },
    {
        id: 247,
        category: "Advanced NLP & LLM Training",
        word: "Supervised Fine-Tuning (SFT)",
        simple_def: "Training a pretrained model further using examples of desired inputs and outputs.",
        real_world_scenario: "A company wants its AI assistant to answer customer questions in a specific format. It provides many example questions and high-quality answers so the model learns the desired behavior."
    },
    {
        id: 248,
        category: "Advanced NLP & LLM Training",
        word: "Catastrophic Forgetting",
        simple_def: "When learning new information causes a model to lose some of what it learned before.",
        real_world_scenario: "A model is fine-tuned heavily on a narrow dataset. After fine-tuning, it performs well on the new task but becomes worse at some of its previous abilities."
    },
    {
        id: 249,
        category: "Advanced NLP & LLM Training",
        word: "Instruction Tuning",
        simple_def: "Training a model to follow human instructions and perform requested tasks.",
        real_world_scenario: "A model is trained on examples such as 'Summarize this article,' 'Translate this sentence,' and 'Classify this email.' It learns to respond according to the requested task."
    },
    {
        id: 250,
        category: "MLOps & Production Data",
        word: "PEFT (Parameter-Efficient Fine-Tuning)",
        simple_def: "A group of methods that fine-tune only a small part of a model instead of updating all its parameters.",
        real_world_scenario: "A company wants to adapt a large language model for customer support. Instead of updating the entire model, it uses a PEFT method to train a much smaller set of parameters, reducing memory and compute requirements."
    },

    {
        id: 251,
        category: "MLOps & Production Data",
        word: "QLoRA (Quantized LoRA)",
        simple_def: "A way to fine-tune a large AI model using much less GPU memory by keeping the model in a compressed form and training only a small adapter.",
        real_world_scenario: "You want to customize a large language model for customer support. Instead of fully training the entire model, you load a quantized version of the model and train a small LoRA adapter. This makes fine-tuning possible with much less GPU memory."
    },
    {
        id: 252,
        category: "MLOps & Production Data",
        word: "Soft Prompts (Prompt Tuning)",
        simple_def: "A small set of learned numbers that are added to the input so the AI produces better results for a specific task.",
        real_world_scenario: "You want an AI model to classify customer reviews. Instead of changing the whole model or manually creating a perfect prompt, you train a small set of soft prompt values using example reviews and their correct labels."
    },
    {
        id: 253,
        category: "MLOps & Production Data",
        word: "Adapters",
        simple_def: "Small trainable components added to a large AI model so you can customize it without retraining the whole model.",
        real_world_scenario: "Your company uses one large language model for multiple languages. You keep the main model frozen and create a small adapter for German and another for Spanish. You load the appropriate adapter depending on the user's language."
    },

    {
        id: 254,
        category: "Data Engineering & Systems",
        word: "Bi-Encoder (Dense Retrieval)",
        simple_def: "A retrieval method that converts the search query and documents into vectors separately, then compares those vectors to find similar content.",
        real_world_scenario: "A user searches 'How can I reset my password?' Your system converts the question into a vector and compares it with pre-computed vectors of thousands of help articles. The most similar articles are returned quickly."
    },
    {
        id: 255,
        category: "Data Engineering & Systems",
        word: "Cross-Encoder (Re-ranking)",
        simple_def: "A model that reads a search query and a document together and gives them a relevance score.",
        real_world_scenario: "A search system first finds the 50 most likely help articles using vector search. A Cross-Encoder then reads the question together with each article and re-ranks them so the most relevant article appears first."
    },
    {
        id: 256,
        category: "Data Engineering & Systems",
        word: "Cosine Similarity",
        simple_def: "A measure of how similar two vectors are based on the angle between them.",
        real_world_scenario: "A user searches for 'cheap running shoes.' Your system compares the query vector with product vectors. Products whose vectors point in a similar direction are considered more relevant, even if they don't contain the exact same words."
    },
    {
        id: 257,
        category: "Data Engineering & Systems",
        word: "HNSW (Hierarchical Navigable Small World)",
        simple_def: "A fast indexing method that helps a vector database find similar vectors without comparing the query with every stored vector.",
        real_world_scenario: "Your vector database contains millions of document embeddings. Instead of checking every document for every search, HNSW navigates through a graph of nearby vectors and quickly finds the most similar documents."
    },
    {
        id: 258,
        category: "Data Engineering & Systems",
        word: "Symmetric vs. Asymmetric Search",
        simple_def: "Symmetric search matches similar-sized queries and documents, while asymmetric search matches a short query with a longer document.",
        real_world_scenario: "A user types 'How do I reset my password?' and your system needs to find a long help article explaining password recovery. This is asymmetric search because the query is short and the document is much longer."
    },
    {
        id: 259,
        category: "Data Engineering & Systems",
        word: "Chunk Overlap",
        simple_def: "Repeating a small part of one text chunk in the next chunk so important context is not lost between chunks.",
        real_world_scenario: "You split a document into 500-word chunks. A sentence starts near the end of one chunk and continues into the next. With chunk overlap, some text is repeated between the chunks, helping the AI retrieve the complete idea."
    },

    {
        id: 260,
        category: "Cloud Infrastructure & Advanced Ops",
        word: "PagedAttention",
        simple_def: "A memory-management technique that stores an AI model's KV cache in smaller blocks so GPU memory is used more efficiently.",
        real_world_scenario: "Your AI service has many users generating responses at the same time. Their KV caches consume GPU memory. PagedAttention manages this memory in blocks, reducing wasted space and allowing the server to handle more requests."
    },
    {
        id: 261,
        category: "Cloud Infrastructure & Advanced Ops",
        word: "vLLM / TGI",
        simple_def: "Tools designed to efficiently run and serve large language models for applications.",
        real_world_scenario: "You have built a chatbot using a 7B language model. Instead of using a basic model-serving setup, you deploy it with a specialized serving framework such as vLLM or TGI to improve throughput and GPU usage."
    },
    {
        id: 262,
        category: "Cloud Infrastructure & Advanced Ops",
        word: "Continuous Batching",
        simple_def: "A serving technique that continuously adds and removes requests from a batch while the model is generating responses.",
        real_world_scenario: "Five users are using your chatbot at the same time. One user's short request finishes quickly while another user's response takes longer. Continuous batching lets the server add new requests without waiting for the longer request to finish."
    },
    {
        id: 263,
        category: "Cloud Infrastructure & Advanced Ops",
        word: "Quantization (Post-Training)",
        simple_def: "Reducing the numerical precision of a trained AI model so it uses less memory and can run more efficiently.",
        real_world_scenario: "Your trained model uses 16-bit numbers and requires a large GPU. You apply post-training quantization to use 8-bit numbers, reducing memory usage while keeping the model's performance reasonably close to the original."
    },
    {
        id: 264,
        category: "Software Architecture",
        word: "Sentence-Transformers",
        simple_def: "Models that convert sentences or short pieces of text into vectors that represent their meaning.",
        real_world_scenario: "You are building semantic search for an online store. Sentence-Transformers convert product descriptions into vectors. When a customer searches for 'comfortable shoes for walking,' you compare the query vector with the product vectors to find relevant products."
    },
    {
        id: 265,
        category: "Software Architecture",
        word: "T5 (Text-to-Text Transfer Transformer)",
        simple_def: "A Transformer model that represents many NLP tasks as text input followed by text output.",
        real_world_scenario: "You can use the same T5-style setup for different tasks. For translation, you provide 'translate English to German: Hello.' For summarization, you provide the text and ask it to summarize it. Both tasks use the same text-in, text-out approach."
    },

    {
        id: 266,
        category: "Evaluation & Harness Engineering",
        word: "Perplexity",
        simple_def: "A score that measures how well a language model predicts the next tokens in text. Lower is generally better.",
        real_world_scenario: "You train two versions of a language model on similar data. You evaluate both on unseen text. If Model A has lower perplexity than Model B, Model A is generally better at predicting that evaluation text."
    },
    {
        id: 267,
        category: "Evaluation & Harness Engineering",
        word: "BLEU Score",
        simple_def: "A metric that compares an AI-generated translation with a reference translation by looking at matching word sequences.",
        real_world_scenario: "You build an English-to-Spanish translation system. You compare its translations with human reference translations using BLEU to measure how closely the generated wording matches the references."
    },
    {
        id: 268,
        category: "Evaluation & Harness Engineering",
        word: "ROUGE Score",
        simple_def: "A metric commonly used for summarization that measures how much important text overlaps between a generated summary and a reference summary.",
        real_world_scenario: "Your AI summarizes financial reports. You compare its summaries with summaries written by experts. ROUGE helps measure whether important words and phrases from the reference summaries appear in the AI's summaries."
    },
    {
        id: 269,
        category: "Production Hardening & System Design",
        word: "Grounding",
        simple_def: "Connecting an AI's answer to trusted information or sources so the answer is based on real data.",
        real_world_scenario: "A company chatbot answers questions about internal policies. Instead of allowing it to answer from general knowledge, the system retrieves the relevant company documents and asks the AI to answer using those documents."
    },
    {
        id: 270,
        category: "Production Hardening & System Design",
        word: "Guardrails (Input/Output Filtering)",
        simple_def: "Rules or systems that check what goes into an AI and what comes out of it to prevent unsafe or unwanted behavior.",
        real_world_scenario: "A banking chatbot receives a request asking for instructions to attack a database. An input guardrail detects the unsafe request and blocks it before the main AI processes it."
    },
    {
        id: 271,
        category: "Agentic Systems & Workflows",
        word: "Zero-Shot Prompting",
        simple_def: "Asking an AI to perform a task without giving it examples of how to do the task.",
        real_world_scenario: "You give an AI the instruction: 'Classify this customer review as positive or negative.' You provide the review but no example classifications. If the model can complete the task, it is performing zero-shot classification."
    },
    {
        id: 272,
        category: "Agentic Systems & Workflows",
        word: "Few-Shot Prompting",
        simple_def: "Giving an AI a few examples so it can understand the format or pattern you want.",
        real_world_scenario: "You want an AI to convert phone numbers into a specific format. You show it two or three examples of the input and desired output, then give it a new phone number to format."
    },
    {
        id: 273,
        category: "Agentic Systems & Workflows",
        word: "Tool Use (Function Calling)",
        simple_def: "Allowing an AI to request an external function or tool so an application can perform an action.",
        real_world_scenario: "A user says, 'What's the weather in Hyderabad?' The AI recognizes that it needs a weather tool, sends the required structured arguments to the application, and the application calls the weather service and returns the result."
    },
    {
        id: 274,
        category: "Agentic Systems & Workflows",
        word: "ReAct (Reason + Act)",
        simple_def: "An agent workflow where the AI decides what action to take, uses a tool, observes the result, and continues from that result.",
        real_world_scenario: "You ask an AI agent to find information about a company. It searches the web, reads the result, decides what information is still missing, performs another search, and then produces the final answer."
    },
    {
        id: 275,
        category: "Agentic Systems & Workflows",
        word: "Context Length Limit",
        simple_def: "The maximum amount of text and other tokens an AI model can process in one context.",
        real_world_scenario: "You have a 1,000-page legal document but your model cannot fit the entire document into its context window. You use RAG to retrieve only the relevant sections and send those sections to the model."
    },

    {
        id: 276,
        category: "Transformer Internals & Optimization",
        word: "Tokens",
        simple_def: "Small pieces of text that a language model processes instead of reading text directly as whole words.",
        real_world_scenario: "When you send a message to an AI API, the text is converted into tokens. A long word may become several tokens. Token usage affects things like context limits and API costs."
    },
    {
        id: 277,
        category: "Transformer Internals & Optimization",
        word: "Embeddings Space (Dimensionality)",
        simple_def: "A mathematical space where text, images, or other data are represented as vectors based on their features or meaning.",
        real_world_scenario: "You convert product descriptions into 768-dimensional vectors. Products with similar meanings tend to be located closer together in this embedding space, making semantic search possible."
    },
    {
        id: 278,
        category: "Transformer Internals & Optimization",
        word: "Pre-Training Data (The Corpus)",
        simple_def: "The large collection of data used to train a model before it is adapted for specific tasks.",
        real_world_scenario: "A language model is pre-trained on a large collection of books, websites, articles, and other text. The model learns language patterns and general knowledge from this corpus before later fine-tuning."
    },
    {
        id: 279,
        category: "Transformer Internals & Optimization",
        word: "Vocabulary Size",
        simple_def: "The number of unique tokens that a tokenizer can use to represent text.",
        real_world_scenario: "A tokenizer has a vocabulary of 50,000 tokens. When processing a sentence, it breaks the text into tokens from that vocabulary. Words that are not stored as a single token may be split into multiple smaller tokens."
    },
    {
        id: 280,
        category: "Transformer Internals & Optimization",
        word: "The Attention Matrix",
        simple_def: "A matrix showing how strongly each token attends to other tokens in a sequence.",
        real_world_scenario: "In the sentence 'The animal didn't cross the road because it was tired,' attention patterns can help researchers study which earlier words the model focuses on when processing 'it.'"
    },

    {
        id: 281,
        category: "Data Engineering & Systems",
        word: "BM25 (Sparse Retrieval)",
        simple_def: "A traditional search algorithm that ranks documents based mainly on how relevant their words are to the search query.",
        real_world_scenario: "A developer searches for 'ERR-404X' in a technical documentation system. BM25 can quickly find documents containing the exact error code, which can be useful when exact keywords matter."
    },
    {
        id: 282,
        category: "Data Engineering & Systems",
        word: "Hybrid Search",
        simple_def: "Combining keyword search and semantic vector search to retrieve more relevant results.",
        real_world_scenario: "A doctor searches for 'Tylenol headache treatment.' Keyword search finds documents containing 'Tylenol,' while vector search can also find documents discussing 'acetaminophen for migraines.' Combining both gives broader and more precise results."
    },
    {
        id: 283,
        category: "Data Engineering & Systems",
        word: "Semantic Chunking",
        simple_def: "Splitting a document into chunks based on meaning or topic rather than only using a fixed number of characters or words.",
        real_world_scenario: "A company handbook contains sections about leave, salaries, and benefits. Semantic chunking tries to keep each topic together instead of cutting a section in the middle just because a fixed chunk size was reached."
    },

    {
        id: 284,
        category: "Classic Machine Learning",
        word: "BERTopic",
        simple_def: "A topic-modeling technique that uses embeddings and clustering to discover topics in collections of text.",
        real_world_scenario: "A company has 100,000 customer reviews. BERTopic can group reviews with similar meanings and help identify major themes such as shipping problems, product quality, or payment issues."
    },
    {
        id: 285,
        category: "Math, Stats & Core ML",
        word: "c-TF-IDF (Class-Based TF-IDF)",
        simple_def: "A version of TF-IDF used to find words that are especially important to a group or cluster of documents.",
        real_world_scenario: "After grouping thousands of support tickets into topics, c-TF-IDF identifies words that are especially common in each topic. A group containing 'password,' 'reset,' and 'locked' can therefore be labeled as a password-related topic."
    },
    {
        id: 286,
        category: "Classic Machine Learning",
        word: "KeyBERT",
        simple_def: "A technique that uses embeddings to identify keywords or key phrases that are most closely related to a document's meaning.",
        real_world_scenario: "A blogger pastes a 2,000-word article into an SEO tool. KeyBERT analyzes the article and suggests important keywords such as 'machine learning,' 'data analysis,' and 'AI models.'"
    },

    {
        id: 287,
        category: "Neural Networks & Deep Learning",
        word: "Contrastive Learning",
        simple_def: "A training approach that teaches a model to bring similar examples closer together and different examples farther apart in representation space.",
        real_world_scenario: "You train a search model using questions and their correct answers. The model learns to place the question close to its correct answer while placing unrelated answers farther away."
    },
    {
        id: 288,
        category: "Neural Networks & Deep Learning",
        word: "CLIP (Contrastive Language-Image Pretraining)",
        simple_def: "A model that learns a shared representation for images and text, allowing them to be compared.",
        real_world_scenario: "You have thousands of unlabeled company photos. With a CLIP-style model, a user can search for 'dog' and retrieve images that visually match the concept without manually adding a 'dog' label to every photo."
    },
    {
        id: 289,
        category: "Neural Networks & Deep Learning",
        word: "Vision Transformer (ViT)",
        simple_def: "A Transformer model that processes an image by splitting it into small patches and treating those patches like tokens.",
        real_world_scenario: "You give ViT a photo of a car. The image is divided into small patches, converted into representations, and processed by a Transformer to recognize what is shown in the image."
    },

    {
        id: 290,
        category: "Transformer Internals & Optimization",
        word: "Cross-Attention",
        simple_def: "An attention mechanism that lets one sequence use information from another sequence.",
        real_world_scenario: "In a translation model, the decoder generates the translated sentence while using cross-attention to look at information from the encoder's representation of the original sentence."
    },
    {
        id: 291,
        category: "Advanced NLP & LLM Training",
        word: "Knowledge Distillation",
        simple_def: "Training a smaller model to learn from the outputs or behavior of a larger teacher model.",
        real_world_scenario: "A large model produces high-quality answers for a classification task. You use those outputs to train a smaller model, which can then perform the same task with lower memory and serving costs."
    },
    {
        id: 292,
        category: "Transformer Internals & Optimization",
        word: "EOS Token (End of Sequence)",
        simple_def: "A special token that tells a language model that the generated sequence has ended.",
        real_world_scenario: "A chatbot generates an answer token by token. When the model produces its EOS token, the generation system knows that it can stop generating more tokens."
    },
    {
        id: 293,
        category: "Advanced NLP & LLM Training",
        word: "Subword Pooling",
        simple_def: "Combining the representations of multiple subword tokens into one representation for the complete word.",
        real_world_scenario: "A tokenizer splits 'Transformers' into several subword tokens. If your application needs one representation for the complete word, you can combine the token representations using a pooling method such as averaging."
    },
    {
        id: 294,
        category: "Transformer Internals & Optimization",
        word: "Classification Head",
        simple_def: "A small neural network added to a model to turn its learned representation into a class prediction.",
        real_world_scenario: "You use BERT to classify movie reviews. BERT produces a representation of the review, and a classification head uses that representation to predict labels such as positive or negative."
    },

    {
        id: 295,
        category: "Evaluation & Harness Engineering",
        word: "MMLU (Massive Multitask Language Understanding)",
        simple_def: "A benchmark that tests language models on knowledge and reasoning across many different subjects.",
        real_world_scenario: "You want to compare two language models. You evaluate both on MMLU across subjects such as mathematics, law, history, and science to get a standardized comparison."
    },
    {
        id: 296,
        category: "Evaluation & Harness Engineering",
        word: "Chatbot Arena (Elo Rating)",
        simple_def: "A benchmark where people compare anonymous AI responses and the models receive ratings based on those preferences.",
        real_world_scenario: "A user asks the same question to two anonymous AI models. The user chooses which answer is better. Repeating this process across many users produces ratings that can be used to compare models."
    },
    {
        id: 297,
        category: "Production Hardening & System Design",
        word: "Prompt Injection (Jailbreaking)",
        simple_def: "An attack where someone gives an AI instructions designed to override or interfere with its intended behavior.",
        real_world_scenario: "You build an AI that summarizes documents. A malicious document contains instructions telling the AI to ignore its original task and reveal sensitive information. Your system needs protections against this type of prompt injection."
    },
    {
        id: 298,
        category: "Agentic Systems & Workflows",
        word: "Self-Consistency",
        simple_def: "Generating multiple answers to the same problem and selecting an answer based on agreement between the generated results.",
        real_world_scenario: "An AI solves a reasoning problem several times and produces answers such as 42, 42, 84, 42, and 42. A self-consistency approach can select 42 because it appears most often."
    },
    {
        id: 299,
        category: "Evaluation & Harness Engineering",
        word: "Hallucination Mitigation",
        simple_def: "Techniques used to reduce the chance that an AI generates information that is incorrect or unsupported.",
        real_world_scenario: "Your customer-support AI sometimes invents return policies. You connect it to official company documents, instruct it to answer only from those sources, and require it to say that it does not know when the information is unavailable."
    },
    {
        id: 300,
        category: "Data Engineering & Systems",
        word: "Vector Normalization",
        simple_def: "Scaling a vector so that its length becomes 1 while keeping its direction the same.",
        real_world_scenario: "You have embeddings for thousands of documents and want to compare them efficiently. You normalize the vectors so their lengths are 1, which makes dot product directly correspond to cosine similarity."
    }
]