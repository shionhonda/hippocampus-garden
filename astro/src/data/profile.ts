export const profile = {
  name: "Shion Honda",
  role: "Software Engineer",
  location: "Paris",
  bio: "I write about machine learning, software, books, and the systems behind thoughtful technical work.",
  aboutSummary:
    "Software engineer based in Paris. Interested in machine learning, software design, data systems, and long-form technical writing.",
  intro:
    "I am a software engineer based in Paris. I currently work on backend systems and product engineering, and I write here about machine learning, software, books, and ideas worth revisiting over time.",
  focus: [
    "Backend and product engineering for user-facing software",
    "Machine learning systems, evaluation, and practical model usage",
    "Long-form technical writing that stays useful after the news cycle passes",
  ],
  currentCompany: "Alan",
  career: [
    {
      period: "2023-present",
      title: "Software Engineer, Alan",
      detail: "Moved from Tokyo to Paris and shifted toward broader software engineering and product work.",
    },
    {
      period: "2020-2023",
      title: "Machine Learning Engineer, Recruit",
      detail: "Worked on recommendation and machine learning systems at large production scale.",
    },
    {
      period: "Before 2020",
      title: "University of Tokyo",
      detail: "Master's research focused on representation learning for molecules.",
    },
  ],
  booksAndWriting: [
    {
      label: "A Practical Guide to Developing Data Platforms",
      href: "https://www.tkd-pbl.com/book/b616180.html",
      note: "Co-authored, published in 2022.",
    },
    {
      label: "Python for Programmers by Deitel & Deitel",
      href: "http://www.tkd-pbl.com/book/b559511.html",
      note: "Japanese translation, published in 2021.",
    },
    {
      label: "Medium",
      href: "https://medium.com/@shionhonda",
      note: "Company and external technical writing.",
    },
    {
      label: "Qiita",
      href: "https://qiita.com/shionhonda",
      note: "Older Japanese writing on a wider range of technical topics.",
    },
    {
      label: "AI-SCHOLAR",
      href: "https://ai-scholar.tech/author/honda-shion/",
      note: "Introductory AI articles for a broader audience.",
    },
  ],
  socials: [
    { label: "GitHub", href: "https://github.com/shionhonda" },
    { label: "LinkedIn", href: "https://www.linkedin.com/in/shionhonda/" },
    { label: "X", href: "https://twitter.com/shion_honda/" },
    { label: "Hugging Face", href: "https://huggingface.co/shionhonda" },
    { label: "Kaggle", href: "https://kaggle.com/shionhonda/" },
    {
      label: "Scholar",
      href: "https://scholar.google.co.jp/citations?user=NhNlsZcAAAAJ",
    },
  ],
  selectedWritingSlugs: [
    "llm_temperature",
    "tool_calling_mcp_skills",
    "book_review_petrov",
  ],
} as const
