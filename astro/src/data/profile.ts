export type Locale = "en" | "ja"

type SocialLink = {
  label: string
  href: string
}

type CareerItem = {
  period: string
  title: string
  detail: string
}

type WritingItem = {
  kind: string
  language: string
  label: string
  href: string
  note: string
  originalTitle?: string
}

type LanguageSwitchLabels = {
  en: string
  ja: string
}

type SectionLabels = {
  switchLanguage: string
  introLabel: string
  focusTitle: string
  selectedWritingTitle: string
  careerTitle: string
  booksTitle: string
}

type LocalizedProfile = {
  pageTitle: string
  name: string
  role: string
  location: string
  currentCompany: string
  aboutSummary: string
  introHtml: string
  focus: string[]
  career: CareerItem[]
  booksAndWriting: WritingItem[]
  socials: SocialLink[]
  selectedWritingSlugs: string[]
  languageSwitchLabels: LanguageSwitchLabels
  sectionLabels: SectionLabels
}

const socials = [
  { label: "GitHub", href: "https://github.com/shionhonda" },
  { label: "LinkedIn", href: "https://www.linkedin.com/in/shionhonda/" },
  { label: "X", href: "https://twitter.com/shion_honda/" },
] as const satisfies readonly SocialLink[]

export const profileByLocale: Record<Locale, LocalizedProfile> = {
  en: {
    pageTitle: "About",
    name: "Shion Honda",
    role: "Software Engineer",
    location: "Rome",
    currentCompany: "Alan",
    aboutSummary:
      "Software engineer based in Rome since February 2026. I work on bringing AI agents into products, and I write about evaluation, context engineering, and the practical edges of LLM systems.",
    introHtml:
      'I&apos;m Shion Honda, a software engineer based in Rome since February 2026. At work I focus on turning AI agents into product features that people can actually rely on. That naturally pulled me toward evaluation, context engineering, and tool design: the messy layer between a model demo and a system that survives production.<br /><br />On this site I write implementation-level essays about LLM behavior, agent infrastructure, and the trade-offs behind modern AI products, with occasional notes on software, books, and life in Europe. Before moving deeper into product engineering, I worked on machine learning systems at scale and studied molecular representation learning at the University of Tokyo; some of that earlier academic work is still collected on <a href="https://scholar.google.co.jp/citations?user=NhNlsZcAAAAJ" target="_blank" rel="noreferrer">Google Scholar</a>.',
    focus: [
      "Implementing AI agents as real product features, not isolated demos",
      "Evaluation, context engineering, and tool orchestration for LLM systems",
      "Writing technical essays that explain why systems behave the way they do",
    ],
    career: [
      {
        period: "2026-",
        title: "Software Engineer, Alan",
        detail:
          "Moved to Rome in February 2026 and continued building AI-agent product features, with a recent focus on evaluation and context engineering.",
      },
      {
        period: "2023-2026",
        title: "Software Engineer, Alan",
        detail:
          "Moved from Tokyo to Paris to join Alan and expanded from machine learning into broader product and backend engineering.",
      },
      {
        period: "2020-2023",
        title: "Machine Learning Engineer, Recruit",
        detail:
          "Worked on recommendation and machine-learning systems at production scale for consumer products.",
      },
      {
        period: "2018-2020",
        title: "University of Tokyo",
        detail:
          "Completed a master&apos;s degree in information science. Research focused on representation learning for molecules.",
      },
    ],
    booksAndWriting: [
      {
        kind: "Book",
        language: "Japanese",
        label: "A Practical Guide to Developing Data Platforms",
        originalTitle: "『[実践]データ活用システム開発ガイド』",
        href: "https://www.tkd-pbl.com/book/b616180.html",
        note: "Co-authored. Published in 2022.",
      },
      {
        kind: "Book",
        language: "Japanese",
        label: "Python for Programmers by Deitel & Deitel",
        originalTitle: "『ダイテル Pythonプログラミング』",
        href: "http://www.tkd-pbl.com/book/b559511.html",
        note: "Japanese translation. Published in 2021.",
      },
      {
        kind: "External writing",
        language: "English",
        label: "Medium",
        href: "https://medium.com/@shionhonda",
        note: "Technical writing for Alan and other external publications.",
      },
      {
        kind: "External writing",
        language: "Japanese",
        label: "Qiita",
        href: "https://qiita.com/shionhonda",
        note: "Older writing on topics such as graph neural networks, deep reinforcement learning, and generative models.",
      },
    ],
    socials: [...socials],
    selectedWritingSlugs: [
      "tool_calling_mcp_skills",
      "llm_temperature",
      "ai_papers_2025",
    ],
    languageSwitchLabels: {
      en: "English",
      ja: "日本語",
    },
    sectionLabels: {
      switchLanguage: "Language",
      introLabel: "About",
      focusTitle: "What I work on",
      selectedWritingTitle: "Selected writing",
      careerTitle: "Career",
      booksTitle: "Books and external writing",
    },
  },
  ja: {
    pageTitle: "このサイトについて",
    name: "本田 志温",
    role: "ソフトウェアエンジニア",
    location: "ローマ",
    currentCompany: "Alan",
    aboutSummary:
      "2026年2月からローマ在住。AIエージェントをプロダクトに実装する仕事をしており、eval や context engineering、その周辺の実践知について書いています。",
    introHtml:
      '本田志温と申します。2026年2月からローマに住んでおり、仕事では AI エージェントを実際のプロダクト機能として成立させるための実装に取り組んでいます。最近の関心は eval や context engineering、ツール設計のような、モデルのデモと本番システムのあいだにある泥臭い領域です。<br /><br />このブログでは、LLM のふるまい、エージェント基盤、現代の AI プロダクトにある設計上のトレードオフを、できるだけ実装レベルまで降ろして書いています。ときどきソフトウェア、読書、ヨーロッパでの暮らしについても書きます。プロダクト寄りの仕事に軸足を移す前は、大規模な機械学習システムに携わり、東京大学では分子の表現学習を研究していました。当時の研究実績は <a href="https://scholar.google.co.jp/citations?user=NhNlsZcAAAAJ" target="_blank" rel="noreferrer">Google Scholar</a> に残っています。',
    focus: [
      "AI エージェントをプロダクト機能として成立させるための実装",
      "LLM システムにおける eval、context engineering、ツール連携",
      "仕組みや判断の背景まで含めて説明する技術記事",
    ],
    career: [
      {
        period: "2026-",
        title: "Software Engineer, Alan",
        detail:
          "2026年2月にローマへ移住。AI エージェントの実装に加えて、eval と context engineering を軸にした改善に取り組んでいます。",
      },
      {
        period: "2023-2026",
        title: "Software Engineer, Alan",
        detail:
          "東京からパリへ移住して Alan に入社。機械学習から、より広いプロダクト開発とバックエンド実装へ守備範囲を広げました。",
      },
      {
        period: "2020-2023",
        title: "Machine Learning Engineer, Recruit",
        detail:
          "リクルートで機械学習エンジニアとして勤務。推薦や機械学習システムを大規模プロダクト向けに開発しました。",
      },
      {
        period: "2018-2020",
        title: "東京大学大学院",
        detail: "情報理工学の修士課程で、分子の表現学習を研究しました。",
      },
    ],
    booksAndWriting: [
      {
        kind: "書籍",
        language: "日本語",
        label: "『[実践]データ活用システム開発ガイド』",
        href: "https://www.tkd-pbl.com/book/b616180.html",
        note: "共著。2022年刊。",
      },
      {
        kind: "書籍",
        language: "日本語",
        label: "『ダイテル Pythonプログラミング』",
        originalTitle: "Python for Programmers",
        href: "http://www.tkd-pbl.com/book/b559511.html",
        note: "翻訳を担当。2021年刊。",
      },
      {
        kind: "外部寄稿",
        language: "英語",
        label: "Medium",
        href: "https://medium.com/@shionhonda",
        note: "Alan などでの英語記事。",
      },
      {
        kind: "外部寄稿",
        language: "日本語",
        label: "Qiita",
        href: "https://qiita.com/shionhonda",
        note: "グラフニューラルネットワーク、深層強化学習、生成モデルなどに関する過去記事。",
      },
    ],
    socials: [...socials],
    selectedWritingSlugs: [
      "ai_papers_2025_ja",
      "tuning_playbook",
      "job_hunt_in_france",
    ],
    languageSwitchLabels: {
      en: "English",
      ja: "日本語",
    },
    sectionLabels: {
      switchLanguage: "言語",
      introLabel: "自己紹介",
      focusTitle: "いま取り組んでいること",
      selectedWritingTitle: "おすすめ記事",
      careerTitle: "経歴",
      booksTitle: "書籍・外部寄稿",
    },
  },
}

export const profile = profileByLocale.en

export function getProfile(locale: Locale) {
  return profileByLocale[locale]
}
