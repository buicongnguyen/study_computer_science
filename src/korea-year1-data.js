export const koreaUniversitySources = [
  {
    id: "ku-cs-curriculum-2025",
    label: "Korea University CS curriculum table for 2025 entrants",
    url: "https://cs.korea.ac.kr/cs/under/computer_Curriculum.do?article.offset=0&articleLimit=10&articleNo=765285&mode=view",
    note:
      "Official department page showing the 2025+ curriculum, including year-one required liberal arts and computer science foundation courses.",
  },
  {
    id: "ku-course-codes",
    label: "Korea University course-code guide",
    url: "https://univ.korea.ac.kr/uc/curriculum/initial.do",
    note:
      "Official university guide listing the course-code mappings for required general-education subjects such as Academic English, first-year seminar, SW programming, and data science.",
  },
  {
    id: "ku-cs-registration-guide-2026",
    label: "CS course registration guidelines (updated January 2026)",
    url: "https://registrar.korea.ac.kr/_res/eduinfo/etc/info_caution_info.pdf",
    note:
      "Official registration guide confirming that 2025+ Computer Science students take COSE101, COSE111, and COSE112 as their academic-foundation requirements and can register for up to 19 credits per semester.",
  },
  {
    id: "ku-academic-inquiry",
    label: "Academic Inquiry I introduction",
    url: "https://univ.korea.ac.kr/uc/curriculum/requirements_research_intro.do",
    note:
      "Official course introduction explaining that Academic Inquiry I develops critical, integrative, and creative thinking across disciplines.",
  },
  {
    id: "ku-writing",
    label: "Writing course introduction",
    url: "https://univ.korea.ac.kr/uc/curriculum/requirements_writing_intro.do",
    note:
      "Official university page for the required writing course taken by College of Informatics students.",
  },
  {
    id: "ku-english",
    label: "Academic English I introduction",
    url: "https://univ.korea.ac.kr/uc/curriculum/requirements_english_intro.do",
    note:
      "Official page stating that Academic English I aims to improve academic and communication-focused English ability.",
  },
  {
    id: "ku-seminar",
    label: "First-Year Seminar introduction",
    url: "https://univ.korea.ac.kr/uc/curriculum/requirements_seminar_intro.do",
    note:
      "Official page describing First-Year Seminar I and II as required courses for adjustment to university life and adviser-guided support.",
  },
  {
    id: "ku-sw-basics",
    label: "SW Programming Basics introduction",
    url: "https://univ.korea.ac.kr/uc/curriculum/requirements_sw_intro.do",
    note:
      "Official page describing the course as an introduction to computational thinking and programming fundamentals.",
  },
  {
    id: "ku-data-ai",
    label: "Data Science and AI introduction",
    url: "https://univ.korea.ac.kr/uc/curriculum/requirements_data_intro.do",
    note:
      "Official page describing the course as an introduction to data-science and AI concepts with hands-on practice.",
  },
  {
    id: "ku-life-science",
    label: "World of Life Sciences introduction",
    url: "https://univ.korea.ac.kr/uc/curriculum/requirements_biology_intro.do",
    note:
      "Official page describing the course as a MOOC organized around life, disease, and treatment technologies.",
  },
];

export const koreaUniversityQuickFacts = [
  {
    value: "11",
    label: "tracked year-one subjects",
    note: "This guide focuses on the official first-year required subjects visible from the 2025+ curriculum and course-registration materials.",
  },
  {
    value: "3",
    label: "CS foundation courses",
    note: "For 2025+ entrants, the academic-foundation requirement is COSE101, COSE111, and COSE112.",
  },
  {
    value: "19",
    label: "maximum credits per semester",
    note: "The January 2026 registration guide states a normal semester load of up to 19 credits, with limited extra-credit exceptions.",
  },
  {
    value: "2025+",
    label: "curriculum basis",
    note: "The homepage is aligned to the official curriculum table posted for 2025-entry students.",
  },
];

export const koreaUniversityStudyPlan = [
  {
    title: "Lock the official subject list first",
    body:
      "Use the 2025+ Computer Science curriculum page and the January 2026 registration guide as the source of truth for year-one required courses before building study materials.",
  },
  {
    title: "Separate university-wide requirements from CS foundations",
    body:
      "Your daughter's study load is easier to understand when general-education requirements such as writing and Academic English are separated from the department's core foundations like programming and math.",
  },
  {
    title: "Create subject-specific Q&A from official course descriptions",
    body:
      "For subjects with official introductions, the Q&A should reflect those aims. For technical foundation subjects, the Q&A should act as a gentle study bridge into the most likely early concepts.",
  },
  {
    title: "Refresh against live semester syllabi when classes open",
    body:
      "Once KUPID or course pages publish section-level syllabi and textbook details, expand each subject with professor-specific assignments, terminology, and practice questions.",
  },
];

export const koreaUniversitySubjectGroups = [
  {
    title: "University-wide year-one requirements",
    ids: [
      "geli005",
      "gewr002",
      "ifls800",
      "geks007",
      "geks008",
      "gect002",
      "gect003",
      "gebt001",
    ],
  },
  {
    title: "Computer Science foundations for 2025+ entrants",
    ids: ["cose101", "cose111", "cose112"],
  },
];

export const koreaUniversitySubjects = [
  {
    id: "geli005",
    code: "GELI005",
    title: "Academic Inquiry I",
    titleKo: "학문세계의탐구 I",
    category: "University-wide requirement",
    credits: "3 credits",
    timing: "Year 1 required",
    summary:
      "This course is meant to build critical, integrative, and creative thinking across disciplines rather than teach one narrow major topic.",
    whyItMatters:
      "For a Computer Science student, this course helps with reading carefully, participating in discussion, and building arguments from evidence, all of which carry over into later reports, presentations, and team projects.",
    officialBasis:
      "The official course introduction says the course aims to cross disciplinary boundaries and cultivate critical, integrative, and creative thinking.",
    checklist: [
      "Read with the question, not just the page count, in mind.",
      "Write down one claim and one piece of evidence for every assigned reading.",
      "Practice turning class discussion points into short written paragraphs.",
    ],
    qa: [
      {
        question: "What kind of success does Academic Inquiry I usually reward?",
        answer:
          "Clear reading, careful argument, and active participation matter more than memorizing isolated facts.",
      },
      {
        question: "How should a first-year CS student prepare for discussion-based classes?",
        answer:
          "Come in with one summary point, one question, and one example from the reading so you can speak concretely instead of improvising vaguely.",
      },
      {
        question: "What is a strong short response in this class?",
        answer:
          "A strong response states a claim, supports it with evidence from the text, and explains why that evidence matters.",
      },
    ],
  },
  {
    id: "gewr002",
    code: "GEWR002",
    title: "Writing",
    titleKo: "글쓰기",
    category: "University-wide requirement",
    credits: "3 credits",
    timing: "Year 1 required",
    summary:
      "The writing requirement trains the basics of academic writing, argument structure, and self-expression needed for university work.",
    whyItMatters:
      "Even in Computer Science, clear writing matters for lab reports, technical documentation, research summaries, internship applications, and teamwork.",
    officialBasis:
      "The university describes this as a foundational writing course for university study, and the course pages emphasize academic writing and structured expression.",
    checklist: [
      "Draft a thesis sentence before drafting the full paragraph.",
      "Use evidence and explanation together, not just quotation or summary alone.",
      "Revise after a break so weak logic becomes easier to spot.",
    ],
    qa: [
      {
        question: "What makes a thesis statement useful in a university writing course?",
        answer:
          "It gives the paper one arguable central claim that the rest of the paragraph or essay can support.",
      },
      {
        question: "Why is revision more than proofreading?",
        answer:
          "Proofreading fixes surface errors, but revision improves logic, structure, evidence, and clarity.",
      },
      {
        question: "What is a common mistake in first-year essays?",
        answer:
          "Many essays summarize sources without explaining the writer's own argument or why the evidence proves it.",
      },
    ],
  },
  {
    id: "ifls800",
    code: "IFLS800",
    title: "Academic English I",
    titleKo: "Academic English I",
    category: "University-wide requirement",
    credits: "2 credits",
    timing: "Placement-based year 1 requirement",
    summary:
      "Academic English I focuses on academic reading, communication, and practical English use in university settings.",
    whyItMatters:
      "Computer Science students constantly meet English in textbooks, documentation, research papers, conference videos, and coding communities.",
    officialBasis:
      "The official introduction says the course is designed to improve academic and communication-focused English ability through content-based activities.",
    checklist: [
      "Keep a small vocabulary notebook for recurring academic and technical words.",
      "Practice summarizing one article or video in English each week.",
      "Read assignment questions before reading the full text.",
    ],
    qa: [
      {
        question: "Why does Academic English matter for a CS major?",
        answer:
          "Because much of computing knowledge, documentation, and research is written or discussed in English.",
      },
      {
        question: "What is one strong study habit for this course?",
        answer:
          "Summarize the reading in your own English after class instead of only highlighting vocabulary.",
      },
      {
        question: "What usually improves faster than students expect?",
        answer:
          "Listening and speaking improve noticeably when students repeatedly work with one topic area instead of only memorizing word lists.",
      },
    ],
  },
  {
    id: "geks007",
    code: "GEKS007",
    title: "First-Year Seminar I",
    titleKo: "[진로·창업] 1학년세미나 I",
    category: "University-wide requirement",
    credits: "1 credit",
    timing: "Semester 1",
    summary:
      "First-Year Seminar I supports adjustment to Korea University through adviser guidance, shared online content, and department-level orientation.",
    whyItMatters:
      "It is only 1 credit, but it carries essential academic-life information and official tasks that can cause avoidable trouble if ignored.",
    officialBasis:
      "The official seminar page says the course exists to help students adjust to university life, and the orientation material says missing the online components can lead to an F.",
    checklist: [
      "Check LMS and department notices every week.",
      "Do not ignore quiz or completion deadlines just because the credit is small.",
      "Write down adviser, department office, and portal contacts early.",
    ],
    qa: [
      {
        question: "Why should a student take First-Year Seminar I seriously even though it is only 1 credit?",
        answer:
          "Because it carries required orientation content, practical survival information, and completion-based tasks that are easy to overlook.",
      },
      {
        question: "What is the biggest risk with seminar-style required courses?",
        answer:
          "Students often underestimate them, miss LMS tasks or quizzes, and lose credit over preventable deadlines.",
      },
      {
        question: "What is a smart outcome to aim for by the end of Seminar I?",
        answer:
          "She should know where to find notices, how registration works, and who to ask when something academic goes wrong.",
      },
    ],
  },
  {
    id: "geks008",
    code: "GEKS008",
    title: "First-Year Seminar II",
    titleKo: "[진로·창업] 1학년세미나 II",
    category: "University-wide requirement",
    credits: "1 credit",
    timing: "Semester 2",
    summary:
      "First-Year Seminar II continues the adviser-guided support structure and helps students consolidate good academic habits after the first semester.",
    whyItMatters:
      "This is a good place to review what worked in semester 1 and fix time-management or registration mistakes before second-year major courses become heavier.",
    officialBasis:
      "The official seminar description states that both Seminar I and II are required before graduation and are built around adviser sections, online content, and department-specific programming.",
    checklist: [
      "Review semester-1 grades and identify one course habit to improve.",
      "Plan a realistic semester schedule before registration opens.",
      "Use seminar tasks to ask concrete questions instead of staying uncertain.",
    ],
    qa: [
      {
        question: "What should First-Year Seminar II help a student do better than Seminar I?",
        answer:
          "It should help her reflect on first-semester performance and make smarter decisions about workload, habits, and support systems.",
      },
      {
        question: "What is one useful question to bring into Seminar II?",
        answer:
          "Which study habits from semester 1 should be kept, changed, or dropped before second-year CS courses get harder?",
      },
      {
        question: "Why does semester-2 reflection matter in first year?",
        answer:
          "Because early corrections in routine, attendance, and planning are much cheaper than fixing accumulated problems later.",
      },
    ],
  },
  {
    id: "gect002",
    code: "GECT002",
    title: "SW Programming Basics",
    titleKo: "[진로·창업] SW프로그래밍의 기초",
    category: "University-wide requirement",
    credits: "3 credits",
    timing: "Year 1 required",
    summary:
      "This course introduces computational thinking and the fundamentals of programming, and the university overview describes it as a Python-based foundation course.",
    whyItMatters:
      "It gives a gentle on-ramp into coding before or alongside the department's deeper programming classes.",
    officialBasis:
      "The official university introduction says the course introduces computational thinking and programming fundamentals, and the university goals page describes it as systematic learning of Python basics.",
    checklist: [
      "Practice by writing tiny programs, not just reading slides.",
      "Trace code line by line on paper when output is confusing.",
      "Name variables clearly so logic stays visible.",
    ],
    qa: [
      {
        question: "What is computational thinking in a beginner-friendly sense?",
        answer:
          "It means breaking a problem into clear steps, data, and rules that a computer can follow.",
      },
      {
        question: "Why do beginners need to write many very small programs?",
        answer:
          "Because frequent small practice builds debugging habits much faster than reading examples passively.",
      },
      {
        question: "What is the difference between an algorithm and a program?",
        answer:
          "An algorithm is the problem-solving method, while a program is one concrete implementation of that method in a language.",
      },
    ],
  },
  {
    id: "gect003",
    code: "GECT003",
    title: "Data Science and AI",
    titleKo: "[진로·창업] 데이터과학과 인공지능",
    category: "University-wide requirement",
    credits: "3 credits",
    timing: "Year 1 required",
    summary:
      "This course introduces the basic concepts of data science and artificial intelligence and includes hands-on tool use.",
    whyItMatters:
      "It helps a first-year CS student understand how data, models, and evaluation fit together before later machine-learning or data-systems courses.",
    officialBasis:
      "The official course page says students experience data-science and AI theory and practice, then apply tools suited to their disciplinary context.",
    checklist: [
      "Always ask what the data means before touching a model.",
      "Track how training data differs from evaluation data.",
      "Write one sentence explaining what each chart or metric actually shows.",
    ],
    qa: [
      {
        question: "What is the basic difference between data and a model?",
        answer:
          "Data is the information you collect, while a model is a rule or system built to explain or predict from that data.",
      },
      {
        question: "Why should training data and test data be separated?",
        answer:
          "Because evaluating on already-seen data can make a model look stronger than it really is.",
      },
      {
        question: "Why does data cleaning matter so much?",
        answer:
          "Because even a sophisticated model gives weak results if the underlying data is messy, biased, or mislabeled.",
      },
    ],
  },
  {
    id: "gebt001",
    code: "GEBT001",
    title: "World of Life Sciences",
    titleKo: "[진로·창업] 생명과학의 세계",
    category: "University-wide requirement",
    credits: "3 credits",
    timing: "Year 1 required",
    summary:
      "This is a MOOC-style general-education course organized around life, disease, and treatment technologies.",
    whyItMatters:
      "For a CS student, this subject broadens scientific literacy and builds comfort with structured online learning, which also appears often in later university coursework.",
    officialBasis:
      "The official introduction says the course is a MOOC built around understanding life, humans and disease, and treatment technology.",
    checklist: [
      "Keep up with weekly video units instead of bingeing them late.",
      "Draw simple concept maps for biological systems and processes.",
      "Link new biological vocabulary to one concrete example.",
    ],
    qa: [
      {
        question: "Why would a CS freshman benefit from a life-science course?",
        answer:
          "It strengthens general scientific literacy and helps her practice understanding structured material outside her main major lens.",
      },
      {
        question: "What is a good way to study a MOOC-style science course?",
        answer:
          "Watch in small sections, take short notes, and pause to restate each process in plain language.",
      },
      {
        question: "What often makes biology feel hard at first?",
        answer:
          "Many students try to memorize terms without first understanding the process or relationship those terms describe.",
      },
    ],
  },
  {
    id: "cose101",
    code: "COSE101",
    title: "Computer Programming I",
    titleKo: "컴퓨터프로그래밍 I",
    category: "CS foundation",
    credits: "3 credits",
    timing: "Semester 1",
    summary:
      "This is the first department-level programming foundation course, and the orientation material labels it as a C programming course.",
    whyItMatters:
      "This is the point where programming stops being a general university skill and becomes part of the major's formal mathematical and systems foundation.",
    officialBasis:
      "The orientation guide lists COSE101 as a first-semester academic-foundation course and notes C programming as its core language.",
    checklist: [
      "Practice compiling, running, and debugging code independently.",
      "Trace variables carefully before assuming the computer is wrong.",
      "Write functions early instead of putting everything in main.",
    ],
    qa: [
      {
        question: "What should a student master early in Computer Programming I?",
        answer:
          "Variables, types, conditionals, loops, functions, arrays, and basic debugging should become comfortable as early as possible.",
      },
      {
        question: "Why is starting with C educationally useful even if it feels strict?",
        answer:
          "Because C exposes how memory, types, and program execution really behave instead of hiding those details behind heavy abstractions.",
      },
      {
        question: "What is the best habit for improving in Programming I?",
        answer:
          "Write and test small programs almost every day, because debugging skill grows from repetition, not from reading alone.",
      },
    ],
  },
  {
    id: "cose111",
    code: "COSE111",
    title: "Mathematics for Computer Science I",
    titleKo: "전산수학 I",
    category: "CS foundation",
    credits: "3 credits",
    timing: "Semester 1",
    summary:
      "The orientation guide labels this course as linear algebra for first-year Computer Science students.",
    whyItMatters:
      "Linear algebra becomes important later in graphics, machine learning, optimization, scientific computing, and data analysis.",
    officialBasis:
      "The official orientation guide lists COSE111 as a first-semester academic-foundation course and describes it as linear algebra.",
    checklist: [
      "Learn to interpret matrix operations conceptually, not only mechanically.",
      "Rework solved examples by hand before looking at the answer.",
      "Connect equations to geometric meaning whenever possible.",
    ],
    qa: [
      {
        question: "Why is linear algebra important for Computer Science?",
        answer:
          "Because vectors and matrices are core tools in graphics, machine learning, optimization, and many data-driven systems.",
      },
      {
        question: "What does solving a system of linear equations really mean?",
        answer:
          "It means finding values that satisfy all equations at the same time, often by understanding the structure of the system as well as computing it.",
      },
      {
        question: "What study mistake is common in a first linear-algebra course?",
        answer:
          "Students often memorize procedures such as row reduction without understanding what the operations are doing or what the final form means.",
      },
    ],
  },
  {
    id: "cose112",
    code: "COSE112",
    title: "Mathematics for Computer Science II",
    titleKo: "전산수학 II",
    category: "CS foundation",
    credits: "3 credits",
    timing: "Semester 2",
    summary:
      "The orientation guide describes this as a basic probability and statistics course for first-year CS students.",
    whyItMatters:
      "Probability and statistics are essential later for AI, systems evaluation, networking, simulation, and data interpretation.",
    officialBasis:
      "The official orientation guide lists COSE112 as a second-semester academic-foundation course and describes it as basic probability and statistics.",
    checklist: [
      "Translate word problems into events, variables, and assumptions before calculating.",
      "Check whether a result is reasonable, not only whether the formula was used.",
      "Keep expectation, variance, and independence conceptually separate.",
    ],
    qa: [
      {
        question: "What is a random variable in simple terms?",
        answer:
          "It is a rule that assigns a numerical value to the outcome of a random process.",
      },
      {
        question: "Why are expectation and variance both important?",
        answer:
          "Expectation describes the average level, while variance describes how spread out the outcomes are around that level.",
      },
      {
        question: "Why does probability matter for Computer Science beyond math class?",
        answer:
          "Because real systems involve uncertainty, noisy data, randomized algorithms, and performance that must be measured rather than assumed.",
      },
    ],
  },
];

export const koreaUniversityDefaultSubjectId = "cose101";
