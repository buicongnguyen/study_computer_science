const createCard = (id, topic, moduleId, difficulty, question, answer, explanation) => ({
  id,
  topic,
  moduleId,
  difficulty,
  question,
  answer,
  explanation,
});

export const courseCatalog = [
  {
    id: "algorithms",
    topic: "Algorithms",
    tagline: "Design, analyze, and justify efficient solutions.",
    overview:
      "Adapted from the MIT 6.006 lecture sequence, this course moves from algorithmic reasoning into sorting, graph algorithms, shortest paths, dynamic programming, and complexity.",
    studyGoals: [
      "Estimate running time with asymptotic tools and recurrences.",
      "Match common problem shapes to sorting, graph, and dynamic-programming strategies.",
      "Explain why an algorithm is correct, not just why it seems to work.",
    ],
    sources: [
      {
        label: "MIT OpenCourseWare 6.006 lecture notes",
        url: "https://ocw.mit.edu/courses/6-006-introduction-to-algorithms-fall-2011/pages/lecture-notes/",
      },
    ],
    modules: [
      {
        id: "algo-analysis",
        title: "Foundations & Analysis",
        summary:
          "Build the habits of decomposing problems, analyzing growth, and proving correctness.",
        lessons: [
          {
            title: "Algorithmic thinking",
            note: "State the problem clearly, choose the right subproblem, and define what counts as progress.",
          },
          {
            title: "Asymptotic analysis",
            note: "Use growth-rate tools such as Big-O, Big-Theta, and recurrences to compare solutions.",
          },
          {
            title: "Correctness arguments",
            note: "Support algorithms with invariants, induction, and exchange-style reasoning.",
          },
        ],
      },
      {
        id: "algo-sorting",
        title: "Sorting & Search Structures",
        summary:
          "Study the tradeoffs between comparison-based sorting, heaps, trees, and linear-time methods.",
        lessons: [
          {
            title: "Comparison sorting",
            note: "Understand insertion sort, merge sort, and the lower bounds that constrain comparison models.",
          },
          {
            title: "Heaps and ordered trees",
            note: "Use heaps, BSTs, and AVL trees to organize ordered data efficiently.",
          },
          {
            title: "Linear sorting",
            note: "Apply counting and radix sort when key structure lets you beat comparison bounds.",
          },
        ],
      },
      {
        id: "algo-graphs",
        title: "Graph Search & Shortest Paths",
        summary:
          "Traverse graphs systematically and choose the right shortest-path algorithm for the edge constraints.",
        lessons: [
          {
            title: "Breadth-first search",
            note: "Explore vertices level by level to solve reachability and unweighted shortest paths.",
          },
          {
            title: "Depth-first search",
            note: "Use DFS for topological order, dependency exploration, and graph structure reasoning.",
          },
          {
            title: "Shortest paths",
            note: "Compare DAG relaxation, Dijkstra, and Bellman-Ford by their edge-weight assumptions.",
          },
        ],
      },
      {
        id: "algo-dp",
        title: "Dynamic Programming & Limits",
        summary:
          "Recognize overlapping subproblems, assemble recurrences, and see where complexity boundaries matter.",
        lessons: [
          {
            title: "DP patterns",
            note: "Define state carefully, derive recurrences, and choose an evaluation order.",
          },
          {
            title: "Classic applications",
            note: "Practice with edit distance, knapsack, and other problems with reusable substructure.",
          },
          {
            title: "Complexity perspective",
            note: "Separate solvable efficiently from problems that remain intractable in general.",
          },
        ],
      },
    ],
  },
  {
    id: "data-structures",
    topic: "Data Structures",
    tagline: "Pick the right representation for the operations you need.",
    overview:
      "This course tree combines Berkeley CS 61B's data-structure sequence with supporting MIT 6.006 topics to organize collections, balanced trees, hashing, heaps, and graph representations.",
    studyGoals: [
      "Choose a structure by access pattern, not by familiarity.",
      "Explain the cost of common operations using asymptotic and amortized analysis.",
      "Connect abstract data types to the concrete implementations behind them.",
    ],
    sources: [
      {
        label: "Berkeley CS 61B Spring 2025 schedule",
        url: "https://sp25.datastructur.es/",
      },
      {
        label: "MIT OpenCourseWare 6.006 lecture notes",
        url: "https://ocw.mit.edu/courses/6-006-introduction-to-algorithms-fall-2011/pages/lecture-notes/",
      },
    ],
    modules: [
      {
        id: "ds-core",
        title: "Core Collections & ADTs",
        summary:
          "Start with lists, sets, maps, and the difference between an interface and its backing representation.",
        lessons: [
          {
            title: "Lists, sets, and maps",
            note: "Contrast ordered sequences with membership-focused and key-value collections.",
          },
          {
            title: "Abstract data types",
            note: "Define behavior separately from implementation details to preserve flexibility.",
          },
          {
            title: "Array and linked representations",
            note: "Trade contiguous memory and indexing against pointer-based insertion and deletion.",
          },
        ],
      },
      {
        id: "ds-efficiency",
        title: "Efficiency & Disjoint Sets",
        summary:
          "Reason about operation costs over time and model connectivity with union-find structures.",
        lessons: [
          {
            title: "Asymptotics",
            note: "Use growth-rate reasoning to compare operations across different implementations.",
          },
          {
            title: "Amortized analysis",
            note: "Explain why occasional expensive operations can still yield low average cost.",
          },
          {
            title: "Disjoint sets",
            note: "Track partition membership efficiently with union and find operations.",
          },
        ],
      },
      {
        id: "ds-trees",
        title: "Ordered Trees",
        summary:
          "Study ordered search structures, from plain BSTs to balanced trees designed for scale.",
        lessons: [
          {
            title: "Binary search trees",
            note: "Maintain an ordering invariant that supports predecessor and successor operations.",
          },
          {
            title: "Balanced search trees",
            note: "Use rotations or structural rules to keep height near logarithmic.",
          },
          {
            title: "B-trees and red-black trees",
            note: "Choose disk-friendly or rotation-friendly balance schemes depending on the setting.",
          },
        ],
      },
      {
        id: "ds-hash-graph",
        title: "Hashing, Heaps & Graph Models",
        summary:
          "Map keys to buckets, prioritize extreme values, and store graph relationships compactly.",
        lessons: [
          {
            title: "Hash tables",
            note: "Depend on good hashing and collision handling to keep average access fast.",
          },
          {
            title: "Heaps and priority queues",
            note: "Optimize repeated access to a current minimum or maximum.",
          },
          {
            title: "Graph representations",
            note: "Pick adjacency lists or matrices based on graph density and operation needs.",
          },
        ],
      },
    ],
  },
  {
    id: "operating-systems",
    topic: "Operating Systems",
    tagline: "See how kernels coordinate programs, memory, and hardware.",
    overview:
      "Based on MIT 6.1810, this course tracks the kernel boundary from system calls and traps through memory, scheduling, locking, file systems, and advanced OS organization topics.",
    studyGoals: [
      "Explain how the kernel mediates protected access to hardware.",
      "Connect virtual memory, processes, and scheduling into one runtime model.",
      "Reason about concurrency, persistence, and recovery in kernel code.",
    ],
    sources: [
      {
        label: "MIT 6.1810 syllabus",
        url: "https://ocw.mit.edu/courses/6-1810-operating-system-engineering-fall-2023/pages/syllabus/",
      },
      {
        label: "MIT 6.1810 Fall 2023 schedule",
        url: "https://pdos.csail.mit.edu/6.1810/2023/schedule.html",
      },
    ],
    modules: [
      {
        id: "os-kernel",
        title: "Kernel Foundations",
        summary:
          "Learn the protected boundary between applications and the operating system.",
        lessons: [
          {
            title: "OS design",
            note: "Identify the kernel's responsibilities for resource sharing, isolation, and control.",
          },
          {
            title: "System calls and traps",
            note: "Transfer execution from user space into privileged code safely and predictably.",
          },
          {
            title: "Interrupt-driven control",
            note: "React to devices and exceptional events without polling every possibility.",
          },
        ],
      },
      {
        id: "os-memory",
        title: "Memory, Processes & Scheduling",
        summary:
          "Manage address spaces and decide which runnable work owns the CPU next.",
        lessons: [
          {
            title: "Page tables",
            note: "Translate virtual addresses into physical memory with protection metadata.",
          },
          {
            title: "Virtual memory",
            note: "Give processes the illusion of large private memory while using physical memory efficiently.",
          },
          {
            title: "Scheduling",
            note: "Balance fairness, throughput, and responsiveness across competing tasks.",
          },
        ],
      },
      {
        id: "os-concurrency",
        title: "Concurrency & Coordination",
        summary:
          "Coordinate multiple activities that share resources without corrupting state.",
        lessons: [
          {
            title: "Locking",
            note: "Protect critical sections so shared structures remain consistent.",
          },
          {
            title: "Threads and coordination",
            note: "Separate units of execution from processes and manage waiting, waking, and handoff.",
          },
          {
            title: "Deadlock and races",
            note: "Recognize the hazards of partial ordering, cyclic waits, and unsynchronized access.",
          },
        ],
      },
      {
        id: "os-storage",
        title: "Storage & Advanced OS Topics",
        summary:
          "Persist data, recover from crashes, and extend the kernel with mapping and networking features.",
        lessons: [
          {
            title: "File systems",
            note: "Name, organize, cache, and persist data blocks through a consistent interface.",
          },
          {
            title: "Crash recovery",
            note: "Use logging and recovery rules to restore consistent on-disk state after failure.",
          },
          {
            title: "Advanced mechanisms",
            note: "Study mmap, virtual machines, networking support, and multicore scalability concerns.",
          },
        ],
      },
    ],
  },
  {
    id: "networking",
    topic: "Networking",
    tagline: "Follow data from application bytes to routed packets.",
    overview:
      "Structured from Stanford CS144's lecture flow, this course starts with datagrams and reliability, then moves through TCP, congestion control, routing, interfaces, and Internet security.",
    studyGoals: [
      "Explain what each layer contributes to end-to-end communication.",
      "Compare reliability, flow control, and congestion control as separate concerns.",
      "Connect packet handling, routing, and security into one systems story.",
    ],
    sources: [
      {
        label: "Stanford CS144 course page",
        url: "https://cs144.github.io/",
      },
    ],
    modules: [
      {
        id: "net-foundations",
        title: "Internet Foundations",
        summary:
          "Understand datagrams, layering, encapsulation, and how many conversations share one network.",
        lessons: [
          {
            title: "Datagrams",
            note: "Treat packets as independent units that can take different paths through the network.",
          },
          {
            title: "Encapsulation",
            note: "Wrap higher-level payloads in lower-level headers so each layer can do its job.",
          },
          {
            title: "Multiplexing",
            note: "Let many flows share links and endpoints without losing their identity.",
          },
        ],
      },
      {
        id: "net-transport",
        title: "Reliable Transport & TCP",
        summary:
          "Build ordered byte streams atop unreliable packet delivery.",
        lessons: [
          {
            title: "Reliability from unreliability",
            note: "Recover from loss, duplication, or reordering with acknowledgments and retransmission.",
          },
          {
            title: "TCP receiver and sender",
            note: "Track sequence space, windows, and unacknowledged data in flight.",
          },
          {
            title: "Flow control",
            note: "Prevent fast senders from overwhelming slow receivers or small buffers.",
          },
        ],
      },
      {
        id: "net-congestion",
        title: "Packet Switching & Congestion",
        summary:
          "See how shared networks saturate and how transport protocols react to pressure.",
        lessons: [
          {
            title: "Packet switching",
            note: "Statistically share link capacity instead of reserving a dedicated circuit up front.",
          },
          {
            title: "Congestion control",
            note: "Adjust sending behavior based on the network's capacity and feedback.",
          },
          {
            title: "Elastic buffers",
            note: "Absorb short bursts but still expose pressure when persistent overload appears.",
          },
        ],
      },
      {
        id: "net-routing",
        title: "Routing, Interfaces & Security",
        summary:
          "Move packets across networks, connect hosts to links, and defend communication channels.",
        lessons: [
          {
            title: "Routing",
            note: "Choose next hops that move packets closer to their destination.",
          },
          {
            title: "Network interfaces and routers",
            note: "Bridge between host memory, link frames, and routed IP packets.",
          },
          {
            title: "Internet security",
            note: "Protect integrity, confidentiality, and authenticity across hostile networks.",
          },
        ],
      },
    ],
  },
  {
    id: "databases",
    topic: "Databases",
    tagline: "From relational queries to the internals of a DBMS.",
    overview:
      "This tree follows CMU 15-445/645 from the relational model through storage, indexing, query execution, optimization, concurrency control, logging, recovery, and distributed databases.",
    studyGoals: [
      "Understand both how to query data and how the engine executes those queries.",
      "Connect access paths, operators, and optimization choices to query performance.",
      "Explain how transactions preserve correctness under concurrency and failure.",
    ],
    sources: [
      {
        label: "CMU 15-445/645 Spring 2026 schedule",
        url: "https://15445.courses.cs.cmu.edu/spring2026/schedule.html",
      },
    ],
    modules: [
      {
        id: "db-relational",
        title: "Relational Foundations",
        summary:
          "Model data with relations, express requests with algebra, and translate intent into SQL.",
        lessons: [
          {
            title: "Relational model",
            note: "Describe data as tables with attributes and tuples, not as hard-coded navigation paths.",
          },
          {
            title: "Relational algebra",
            note: "Compose operators such as selection, projection, and join to reason about queries formally.",
          },
          {
            title: "Modern SQL",
            note: "Turn relational intent into executable queries with filters, joins, grouping, and ordering.",
          },
        ],
      },
      {
        id: "db-storage",
        title: "Storage Engine Basics",
        summary:
          "Study how a DBMS lays out pages, manages memory, and represents data efficiently.",
        lessons: [
          {
            title: "Database storage",
            note: "Organize records into pages and files that balance locality and update cost.",
          },
          {
            title: "Memory management",
            note: "Use a buffer pool to stage hot pages between disk and RAM.",
          },
          {
            title: "Compression and hashing",
            note: "Save space and improve access speed with compact encodings and hash-based lookups.",
          },
        ],
      },
      {
        id: "db-query",
        title: "Indexes, Execution & Optimization",
        summary:
          "Accelerate access and choose efficient plans for complex relational workloads.",
        lessons: [
          {
            title: "Indexes and filters",
            note: "Narrow search to likely matches instead of scanning every tuple.",
          },
          {
            title: "Join and aggregation algorithms",
            note: "Combine and summarize data with operator implementations tuned to data size and order.",
          },
          {
            title: "Execution and planning",
            note: "Build operator trees and optimize them with cost-based reasoning.",
          },
        ],
      },
      {
        id: "db-transactions",
        title: "Transactions, Recovery & Distribution",
        summary:
          "Preserve correctness when many clients write concurrently and failures happen mid-flight.",
        lessons: [
          {
            title: "Concurrency control",
            note: "Coordinate simultaneous transactions with locking, timestamps, or versioning.",
          },
          {
            title: "Logging and recovery",
            note: "Record enough history to replay or roll back updates after a crash.",
          },
          {
            title: "Distributed databases",
            note: "Extend storage and query processing across nodes without losing correctness.",
          },
        ],
      },
    ],
  },
  {
    id: "computer-architecture",
    topic: "Computer Architecture",
    tagline: "Move from machine representation to modern processor performance.",
    overview:
      "Grounded in Berkeley CS61C, this course covers data representation, C, RISC-V, digital logic, datapaths, pipelining, caches, parallelism, and virtual memory.",
    studyGoals: [
      "Explain how software abstractions map onto instructions, datapaths, and memory.",
      "Connect pipeline and cache behavior to program performance.",
      "Reason about parallel speedup limits and memory hierarchy tradeoffs.",
    ],
    sources: [
      {
        label: "Berkeley CS61C Spring 2026 course page",
        url: "https://cs61c.org/sp26/",
      },
      {
        label: "Berkeley CS61C course notes",
        url: "https://notes.cs61c.org/",
      },
    ],
    modules: [
      {
        id: "arch-representation",
        title: "Representation & Systems Programming",
        summary:
          "Start with the bit-level view of numbers, C, pointers, and floating-point tradeoffs.",
        lessons: [
          {
            title: "Number representation",
            note: "Encode signed integers and reason about overflow at the bit level.",
          },
          {
            title: "C and memory",
            note: "Work directly with pointers, arrays, layout, and manual memory management.",
          },
          {
            title: "Floating point",
            note: "Balance range and precision while accepting rounding behavior.",
          },
        ],
      },
      {
        id: "arch-isa",
        title: "ISA & Toolchain",
        summary:
          "Learn the machine-level contract and the tools that turn programs into runnable binaries.",
        lessons: [
          {
            title: "RISC-V basics",
            note: "Interpret register use, arithmetic, data transfer, and control instructions.",
          },
          {
            title: "Instruction formats and calling convention",
            note: "Respect binary encodings and stack/register discipline across procedure calls.",
          },
          {
            title: "Assembler, linker, loader",
            note: "Split translation, address resolution, and program startup into distinct stages.",
          },
        ],
      },
      {
        id: "arch-processor",
        title: "Processor Design",
        summary:
          "Build up from digital state and logic to datapaths, control, and pipelined execution.",
        lessons: [
          {
            title: "Synchronous digital systems",
            note: "Combine combinational logic with state elements to define clocked behavior.",
          },
          {
            title: "Datapath and control",
            note: "Route data through ALUs, registers, and memories according to control signals.",
          },
          {
            title: "Pipelining",
            note: "Overlap instruction stages for throughput while managing hazards and stalls.",
          },
        ],
      },
      {
        id: "arch-memory",
        title: "Memory Hierarchy & Parallel Performance",
        summary:
          "See how locality, caches, parallelism, and virtual memory shape system speed.",
        lessons: [
          {
            title: "Caches",
            note: "Exploit temporal and spatial locality with small fast memories near the CPU.",
          },
          {
            title: "Amdahl and parallel models",
            note: "Bound speedup and compare SIMD, thread-level, and concurrent execution styles.",
          },
          {
            title: "Virtual memory",
            note: "Coordinate translation, protection, and hierarchy across hardware and software.",
          },
        ],
      },
    ],
  },
  {
    id: "software-engineering",
    topic: "Software Engineering",
    tagline: "Turn ideas into maintainable systems built by real teams.",
    overview:
      "This course synthesizes Berkeley CS 169 and W169A into a practical path through process, requirements, design, testing, refactoring, SaaS architecture, security, and delivery.",
    studyGoals: [
      "Move from vague user needs to testable, maintainable software increments.",
      "Use process, version control, and testing to coordinate team delivery safely.",
      "Treat design quality, security, and performance as continuous engineering work.",
    ],
    sources: [
      {
        label: "Berkeley CS 169 catalog page",
        url: "https://www2.eecs.berkeley.edu/Courses/CS169/",
      },
      {
        label: "Berkeley CS W169A catalog page",
        url: "https://www2.eecs.berkeley.edu/Courses/CSW169A/",
      },
    ],
    modules: [
      {
        id: "se-process",
        title: "Process, Planning & Teams",
        summary:
          "Choose a development process and break delivery into tractable, coordinated work.",
        lessons: [
          {
            title: "Agile and plan-and-document",
            note: "Compare iterative feedback-heavy methods with heavier up-front planning.",
          },
          {
            title: "Estimation and iteration planning",
            note: "Slice work into increments that can be reasoned about and tracked.",
          },
          {
            title: "Team organization",
            note: "Use roles, meetings, and shared artifacts to keep work aligned.",
          },
        ],
      },
      {
        id: "se-design",
        title: "Requirements & Design",
        summary:
          "Translate user needs into stories, specifications, designs, and maintainable module boundaries.",
        lessons: [
          {
            title: "User stories and BDD",
            note: "Capture value from the user's perspective and turn it into executable behavior descriptions.",
          },
          {
            title: "Specifications and design models",
            note: "Clarify expectations with structure, interfaces, and model-based thinking.",
          },
          {
            title: "Patterns and maintainability",
            note: "Apply reusable design ideas when they genuinely improve clarity and changeability.",
          },
        ],
      },
      {
        id: "se-quality",
        title: "Testing, Coverage & Refactoring",
        summary:
          "Build confidence with tests and improve existing systems without changing intended behavior.",
        lessons: [
          {
            title: "TDD and automated tests",
            note: "Use fast feedback to shape implementations and catch regressions early.",
          },
          {
            title: "Coverage and integration",
            note: "Measure how much behavior is exercised and test components working together.",
          },
          {
            title: "Legacy code and refactoring",
            note: "Stabilize a codebase gradually by adding tests and improving structure incrementally.",
          },
        ],
      },
      {
        id: "se-delivery",
        title: "Delivery, SaaS & Operations",
        summary:
          "Ship software in production settings where architecture, security, and performance all matter.",
        lessons: [
          {
            title: "Version control and collaboration",
            note: "Coordinate change safely with branching, review, and shared history.",
          },
          {
            title: "RESTful SaaS architecture",
            note: "Think about services, interfaces, deployment, and public-cloud execution.",
          },
          {
            title: "Security and performance",
            note: "Treat operational risk as part of everyday engineering, not an afterthought.",
          },
        ],
      },
    ],
  },
];

export const courseByTopic = Object.fromEntries(
  courseCatalog.map((course) => [course.topic, course])
);

export const moduleIndex = Object.fromEntries(
  courseCatalog.flatMap((course) =>
    course.modules.map((module) => [module.id, { ...module, topic: course.topic, courseId: course.id }])
  )
);

export const questionBank = [
  createCard(
    "algo-big-o",
    "Algorithms",
    "algo-analysis",
    "Easy",
    "What does a Big-O upper bound describe for an algorithm?",
    "How the algorithm's resource use grows asymptotically in the worst case or an upper-bound sense.",
    "Big-O focuses on growth as input size increases and ignores constant factors and lower-order terms."
  ),
  createCard(
    "algo-recurrence",
    "Algorithms",
    "algo-analysis",
    "Medium",
    "Why are recurrences useful when analyzing divide-and-conquer algorithms?",
    "They express total cost in terms of smaller subproblems plus the work to combine their results.",
    "A recurrence mirrors the recursive structure of the algorithm, making it easier to solve for asymptotic growth."
  ),
  createCard(
    "algo-correctness",
    "Algorithms",
    "algo-analysis",
    "Medium",
    "What is a correctness proof trying to establish?",
    "That the algorithm always returns the intended result for every valid input.",
    "Running fast is not enough; the algorithm also has to be correct under its problem specification."
  ),
  createCard(
    "algo-merge-sort",
    "Algorithms",
    "algo-sorting",
    "Easy",
    "Why does merge sort run in O(n log n) time?",
    "It performs linear-time merging across log n levels of recursive splitting.",
    "Each level touches all n elements once, and there are logarithmically many levels."
  ),
  createCard(
    "algo-counting-sort",
    "Algorithms",
    "algo-sorting",
    "Medium",
    "When is counting sort a better choice than comparison sorting?",
    "When keys come from a reasonably small integer range.",
    "Counting sort uses key counts rather than pairwise comparisons, so it can run in linear time relative to input plus key range."
  ),
  createCard(
    "algo-heap-priority",
    "Algorithms",
    "algo-sorting",
    "Easy",
    "Why is a binary heap a natural implementation for a priority queue?",
    "It keeps the highest- or lowest-priority item at the root while supporting efficient inserts and removals.",
    "The heap property makes extreme-value access fast without fully sorting all elements."
  ),
  createCard(
    "algo-bfs-path",
    "Algorithms",
    "algo-graphs",
    "Easy",
    "What important guarantee does BFS provide in an unweighted graph?",
    "It finds shortest paths measured by number of edges.",
    "Because BFS explores nodes by layers, the first time a vertex is reached is via the fewest hops."
  ),
  createCard(
    "algo-topological",
    "Algorithms",
    "algo-graphs",
    "Medium",
    "What kind of graph is required for topological sorting?",
    "A directed acyclic graph.",
    "Cycles make it impossible to order every edge from earlier to later."
  ),
  createCard(
    "algo-dijkstra-negative",
    "Algorithms",
    "algo-graphs",
    "Medium",
    "Why can plain Dijkstra's algorithm fail on graphs with negative-weight edges?",
    "Its greedy choice assumes once a node is finalized, no cheaper path will appear later.",
    "Negative edges can invalidate that assumption by introducing a cheaper path after a node has already been settled."
  ),
  createCard(
    "algo-dp-properties",
    "Algorithms",
    "algo-dp",
    "Easy",
    "Which two properties usually signal that dynamic programming may help?",
    "Overlapping subproblems and optimal substructure.",
    "DP works best when many larger solutions reuse the same smaller ones and those smaller solutions combine optimally."
  ),
  createCard(
    "algo-edit-distance",
    "Algorithms",
    "algo-dp",
    "Medium",
    "Why is edit distance commonly solved with dynamic programming?",
    "Because the best answer for two strings depends on smaller prefix comparisons that repeat across the table.",
    "The subproblem graph reuses many prefix pairs, so memoization or tabulation avoids recomputing them."
  ),
  createCard(
    "algo-complexity",
    "Algorithms",
    "algo-dp",
    "Hard",
    "What does computational complexity ask beyond designing one specific algorithm?",
    "Whether an entire problem class admits efficient algorithms at all.",
    "Complexity theory studies the inherent difficulty of problems, not just the performance of one candidate solution."
  ),
  createCard(
    "ds-adt",
    "Data Structures",
    "ds-core",
    "Easy",
    "What is an abstract data type?",
    "A specification of behavior and operations without committing to a particular implementation.",
    "The ADT says what the structure should do; the implementation decides how it does it."
  ),
  createCard(
    "ds-linked-list-advantage",
    "Data Structures",
    "ds-core",
    "Easy",
    "What is a common advantage of a linked list over an array?",
    "Insertions and deletions can be done without shifting all later elements.",
    "Linked nodes can be reconnected directly, though random indexing becomes slower."
  ),
  createCard(
    "ds-interface-implementation",
    "Data Structures",
    "ds-core",
    "Medium",
    "Why is it useful to separate a collection's interface from its implementation?",
    "It lets you change the underlying structure without changing the code that uses the abstraction.",
    "This separation improves maintainability and makes performance tradeoffs easier to revisit later."
  ),
  createCard(
    "ds-amortized",
    "Data Structures",
    "ds-efficiency",
    "Medium",
    "What does amortized analysis explain?",
    "The average cost per operation over a sequence that may contain occasional expensive steps.",
    "A single resize or rebuild can be costly, but spread over many cheap operations the average can still be small."
  ),
  createCard(
    "ds-disjoint-set-purpose",
    "Data Structures",
    "ds-efficiency",
    "Easy",
    "What problem is the disjoint-set structure designed to solve?",
    "Tracking which items belong to the same connected component or partition.",
    "Union-find is especially useful when sets merge over time and membership queries are frequent."
  ),
  createCard(
    "ds-path-compression",
    "Data Structures",
    "ds-efficiency",
    "Medium",
    "Why does path compression speed up union-find?",
    "It flattens parent chains during finds so later lookups reach the representative faster.",
    "By shortening many paths at once, future operations become much cheaper."
  ),
  createCard(
    "ds-bst-property",
    "Data Structures",
    "ds-trees",
    "Easy",
    "What invariant makes binary search trees useful for ordered lookup?",
    "Every left subtree key is smaller than the node and every right subtree key is larger.",
    "That ordering lets searches discard half of the remaining structure at each step when the tree is well shaped."
  ),
  createCard(
    "ds-balanced-height",
    "Data Structures",
    "ds-trees",
    "Easy",
    "Why do balanced search trees keep operations efficient?",
    "They prevent the tree height from growing close to n in normal use.",
    "When height stays near log n, search, insert, and delete remain fast."
  ),
  createCard(
    "ds-btree-disk",
    "Data Structures",
    "ds-trees",
    "Medium",
    "Why are B-trees especially well suited to disk-backed storage?",
    "They keep many keys per node, reducing tree height and expensive block accesses.",
    "Wide nodes match page-oriented storage systems better than narrow binary branching."
  ),
  createCard(
    "ds-hash-fast",
    "Data Structures",
    "ds-hash-graph",
    "Easy",
    "What makes a hash table fast on average?",
    "A good hash function spreads keys across buckets so lookups inspect little data.",
    "Average performance depends on controlled load factor and effective collision handling."
  ),
  createCard(
    "ds-heap-search",
    "Data Structures",
    "ds-hash-graph",
    "Medium",
    "Why is a heap a poor choice for arbitrary membership search?",
    "It only guarantees the root is extreme, not that unrelated branches are ordered for full search.",
    "A heap is optimized for repeated min or max extraction, not for general key lookup."
  ),
  createCard(
    "ds-adjacency-list",
    "Data Structures",
    "ds-hash-graph",
    "Medium",
    "Why are adjacency lists often preferred for sparse graphs?",
    "They store only existing edges, using much less space than a dense matrix.",
    "Sparse graphs have far fewer than V squared edges, so adjacency matrices waste memory."
  ),
  createCard(
    "os-system-call",
    "Operating Systems",
    "os-kernel",
    "Easy",
    "What is a system call?",
    "A controlled request for a privileged operating-system service.",
    "Applications use system calls to access hardware-backed resources safely through the kernel."
  ),
  createCard(
    "os-traps",
    "Operating Systems",
    "os-kernel",
    "Medium",
    "What role do traps and interrupts play in an operating system?",
    "They transfer control to kernel handlers when software requests service or hardware signals an event.",
    "This mechanism lets the kernel respond to exceptions, timers, devices, and system calls."
  ),
  createCard(
    "os-user-kernel-mode",
    "Operating Systems",
    "os-kernel",
    "Easy",
    "Why do systems separate user mode from kernel mode?",
    "To protect critical resources by limiting privileged instructions and memory access.",
    "Untrusted programs run with fewer privileges so bugs or attacks cannot directly control the whole machine."
  ),
  createCard(
    "os-page-table",
    "Operating Systems",
    "os-memory",
    "Easy",
    "What is a page table used for?",
    "Mapping virtual addresses to physical memory along with protection metadata.",
    "The page table is central to isolation, sharing, and virtual-memory translation."
  ),
  createCard(
    "os-virtual-memory-purpose",
    "Operating Systems",
    "os-memory",
    "Easy",
    "What major problem does virtual memory solve?",
    "It gives each process a protected address space while letting physical memory be managed flexibly.",
    "Programs see a clean private memory view even though the OS may relocate or page data underneath."
  ),
  createCard(
    "os-scheduler-job",
    "Operating Systems",
    "os-memory",
    "Easy",
    "What is the scheduler responsible for?",
    "Choosing which runnable task gets CPU time next.",
    "Schedulers balance goals such as fairness, responsiveness, and throughput."
  ),
  createCard(
    "os-locks",
    "Operating Systems",
    "os-concurrency",
    "Easy",
    "Why do kernels use locks?",
    "To protect shared state from conflicting concurrent updates.",
    "Without synchronization, multiple execution contexts can interleave and corrupt invariants."
  ),
  createCard(
    "os-concurrency-vs-parallelism",
    "Operating Systems",
    "os-concurrency",
    "Medium",
    "What is the difference between concurrency and parallelism?",
    "Concurrency is about managing multiple in-progress tasks, while parallelism is about tasks running at the same time.",
    "A system can be concurrent on one CPU through interleaving even if no true simultaneous execution occurs."
  ),
  createCard(
    "os-deadlock-condition",
    "Operating Systems",
    "os-concurrency",
    "Hard",
    "What condition makes deadlock possible?",
    "A cycle of tasks each waiting for a resource held by another task in the cycle.",
    "Circular wait is one of the classic necessary conditions for deadlock."
  ),
  createCard(
    "os-file-system-purpose",
    "Operating Systems",
    "os-storage",
    "Easy",
    "What does a file system provide to programs?",
    "A named, persistent abstraction for storing and retrieving data.",
    "It organizes on-disk blocks into files and directories with a stable interface."
  ),
  createCard(
    "os-journaling",
    "Operating Systems",
    "os-storage",
    "Medium",
    "Why is journaling valuable in a file system?",
    "It records intended updates so the system can recover to a consistent state after a crash.",
    "A journal reduces the chance that partially completed writes leave metadata badly corrupted."
  ),
  createCard(
    "os-mmap",
    "Operating Systems",
    "os-storage",
    "Medium",
    "What does memory mapping conceptually let a program do?",
    "Treat file-backed data as if it were part of the process address space.",
    "Mmap connects the file system and virtual memory so paging can move data in on demand."
  ),
  createCard(
    "net-encapsulation",
    "Networking",
    "net-foundations",
    "Easy",
    "What does encapsulation mean in networking?",
    "Wrapping higher-layer data inside lower-layer headers as it moves down the stack.",
    "Each layer adds information needed for its own job while preserving the payload for the next layer."
  ),
  createCard(
    "net-multiplexing",
    "Networking",
    "net-foundations",
    "Medium",
    "Why is multiplexing necessary on a networked host?",
    "Because many conversations need to share the same links and physical interfaces at once.",
    "Ports, headers, and demultiplexing rules let incoming data reach the correct application."
  ),
  createCard(
    "net-datagram",
    "Networking",
    "net-foundations",
    "Easy",
    "What is a datagram?",
    "A self-contained packet that can be routed independently of others.",
    "The network does not need a dedicated path for each datagram before forwarding it."
  ),
  createCard(
    "net-reliability",
    "Networking",
    "net-transport",
    "Medium",
    "How can reliable delivery be built on top of unreliable packet service?",
    "By using acknowledgments, timers, retransmissions, and sequence numbers.",
    "Transport protocols add state and feedback loops that raw packet forwarding does not provide."
  ),
  createCard(
    "net-tcp-receiver",
    "Networking",
    "net-transport",
    "Medium",
    "What does a TCP receiver need to track?",
    "Which sequence numbers have arrived and what contiguous data can be acknowledged next.",
    "Receivers reassemble out-of-order segments and advertise how much more data they can accept."
  ),
  createCard(
    "net-flow-control",
    "Networking",
    "net-transport",
    "Easy",
    "Why is flow control needed even when reliability exists?",
    "To keep a sender from overwhelming the receiver's available buffer space.",
    "Reliable retransmission alone does not protect slow receivers from too much in-flight data."
  ),
  createCard(
    "net-packet-switching",
    "Networking",
    "net-congestion",
    "Medium",
    "How does packet switching differ from circuit switching?",
    "Packet switching shares links dynamically among many flows instead of reserving a fixed path up front.",
    "This improves utilization but introduces queueing and congestion behavior."
  ),
  createCard(
    "net-congestion-control",
    "Networking",
    "net-congestion",
    "Easy",
    "Why does the Internet need congestion control?",
    "Because senders must adapt when shared routers and links are reaching capacity.",
    "Without it, excess traffic can trigger loss, delay, and throughput collapse."
  ),
  createCard(
    "net-buffers",
    "Networking",
    "net-congestion",
    "Medium",
    "What job do network buffers perform?",
    "They absorb short-term mismatches between arrival rate and service rate.",
    "Buffers can smooth bursts, but persistent overload still causes long queues or dropped packets."
  ),
  createCard(
    "net-routing-decision",
    "Networking",
    "net-routing",
    "Easy",
    "What does routing decide?",
    "Which next hop a packet should take toward its destination.",
    "Routers use forwarding rules derived from routing information to keep packets moving across networks."
  ),
  createCard(
    "net-network-interface",
    "Networking",
    "net-routing",
    "Medium",
    "What does a network interface contribute to the stack?",
    "It connects host-side packet handling to link-layer frames sent and received on the medium.",
    "Interfaces sit at the boundary between local device behavior and broader network routing."
  ),
  createCard(
    "net-security-scope",
    "Networking",
    "net-routing",
    "Hard",
    "Why is Internet security broader than just encryption?",
    "Because secure networking also needs authentication, integrity, key management, and protocol hardening.",
    "Encrypted bytes still fail to protect users if peers are unauthenticated or protocols are easy to abuse."
  ),
  createCard(
    "db-relational-model",
    "Databases",
    "db-relational",
    "Easy",
    "What does the relational model represent data as?",
    "Relations composed of tuples and attributes, typically viewed as tables.",
    "The model focuses on declarative structure rather than hard-coded pointer navigation."
  ),
  createCard(
    "db-relational-algebra",
    "Databases",
    "db-relational",
    "Medium",
    "Why is relational algebra important in database systems?",
    "It gives a formal set of operators for reasoning about what a query means and how it can be transformed.",
    "Optimizers rely on algebraic equivalences to rewrite queries into better plans."
  ),
  createCard(
    "db-sql-join-vs-select",
    "Databases",
    "db-relational",
    "Medium",
    "What is the difference between selection and join in SQL thinking?",
    "Selection filters rows within one relation, while join combines related rows across relations.",
    "Both restrict results, but join adds new relationships between tables."
  ),
  createCard(
    "db-pages",
    "Databases",
    "db-storage",
    "Easy",
    "Why do storage engines organize data into pages?",
    "Because disk and buffer managers move data in fixed-size blocks more efficiently than row by row.",
    "Page-based layout aligns logical records with physical I/O and caching behavior."
  ),
  createCard(
    "db-buffer-pool",
    "Databases",
    "db-storage",
    "Easy",
    "What is the role of a buffer pool?",
    "To cache database pages in memory so the system avoids unnecessary disk reads and writes.",
    "The DBMS can control eviction and write-back policies more intelligently than leaving all caching to the OS."
  ),
  createCard(
    "db-compression",
    "Databases",
    "db-storage",
    "Medium",
    "Why is data compression useful inside a DBMS?",
    "It can reduce storage footprint and I/O cost, often improving performance.",
    "Smaller representations let more data fit in memory and fewer bytes travel from disk."
  ),
  createCard(
    "db-index-purpose",
    "Databases",
    "db-query",
    "Easy",
    "Why do databases build indexes?",
    "To locate qualifying tuples without scanning every row in the table.",
    "An index is an access path that narrows the search space for common predicates."
  ),
  createCard(
    "db-hash-index",
    "Databases",
    "db-query",
    "Medium",
    "What kind of predicate is a hash-based access path best suited for?",
    "Exact-match lookups.",
    "Hashing is strong for equality search but does not preserve order for efficient range scans."
  ),
  createCard(
    "db-joins-central",
    "Databases",
    "db-query",
    "Medium",
    "Why are join algorithms such a central topic in database systems?",
    "Because combining tables is common and often dominates query cost.",
    "Different join strategies behave very differently depending on size, memory, indexes, and data order."
  ),
  createCard(
    "db-query-optimizer",
    "Databases",
    "db-query",
    "Medium",
    "What is a query optimizer trying to do?",
    "Choose an execution plan with low estimated cost while preserving query semantics.",
    "The optimizer compares alternative operator orders and access methods using statistics and cost models."
  ),
  createCard(
    "db-two-phase-locking",
    "Databases",
    "db-transactions",
    "Medium",
    "Why is two-phase locking used in transaction processing?",
    "To coordinate conflicting operations so concurrent execution remains serializable.",
    "By controlling when locks are acquired and released, the system prevents unsafe interleavings."
  ),
  createCard(
    "db-logging-recovery",
    "Databases",
    "db-transactions",
    "Medium",
    "What problem do write-ahead logging and recovery protocols solve?",
    "They let the database restore a correct state after crashes that interrupt updates.",
    "The log records enough information to redo committed work and undo incomplete work."
  ),
  createCard(
    "arch-twos-complement",
    "Computer Architecture",
    "arch-representation",
    "Easy",
    "Why is two's complement widely used for signed integers?",
    "It makes addition and subtraction work uniformly in hardware for positive and negative values.",
    "The same adder circuitry can handle both signs without a separate negative-number format."
  ),
  createCard(
    "arch-c-systems",
    "Computer Architecture",
    "arch-representation",
    "Medium",
    "Why is C commonly used in machine-structure courses?",
    "It exposes memory layout and low-level control while still being practical for systems programming.",
    "C sits close enough to hardware to reveal addresses, data representation, and manual memory decisions."
  ),
  createCard(
    "arch-floating-point-tradeoff",
    "Computer Architecture",
    "arch-representation",
    "Medium",
    "What tradeoff is built into floating-point representation?",
    "It gains wide numeric range at the cost of exact precision and predictable rounding behavior.",
    "Floating-point numbers approximate many real values rather than representing them perfectly."
  ),
  createCard(
    "arch-isa-definition",
    "Computer Architecture",
    "arch-isa",
    "Easy",
    "What does an instruction set architecture define?",
    "The programmer-visible machine contract, including instructions, registers, and memory behavior.",
    "Different processors can implement the same ISA with different internal microarchitectures."
  ),
  createCard(
    "arch-calling-convention",
    "Computer Architecture",
    "arch-isa",
    "Easy",
    "Why is a calling convention important?",
    "It standardizes how functions pass arguments, return values, and preserve state.",
    "Without a shared convention, separately compiled code could not call into one another safely."
  ),
  createCard(
    "arch-toolchain-stages",
    "Computer Architecture",
    "arch-isa",
    "Medium",
    "How do assembler, linker, and loader split the work of preparing a program?",
    "The assembler translates instructions, the linker resolves references across files, and the loader places the program into memory to run.",
    "Each stage solves a different part of turning source and objects into an executing process."
  ),
  createCard(
    "arch-combinational-vs-state",
    "Computer Architecture",
    "arch-processor",
    "Easy",
    "What is the difference between combinational logic and state elements?",
    "Combinational logic depends only on current inputs, while state elements remember values across clock cycles.",
    "Processors need both immediate computation and stored context to execute instruction sequences."
  ),
  createCard(
    "arch-pipelining-benefit",
    "Computer Architecture",
    "arch-processor",
    "Easy",
    "What does pipelining primarily improve?",
    "Instruction throughput by overlapping different stages of multiple instructions.",
    "A pipeline can finish more instructions per unit time even if one instruction's latency does not shrink much."
  ),
  createCard(
    "arch-hazard",
    "Computer Architecture",
    "arch-processor",
    "Medium",
    "What is a pipeline hazard?",
    "A situation that prevents the next pipeline step from proceeding safely as planned.",
    "Data, control, and structural hazards can force stalls, forwarding, or flushing."
  ),
  createCard(
    "arch-caches-locality",
    "Computer Architecture",
    "arch-memory",
    "Easy",
    "Why do caches improve performance when locality holds?",
    "Recently used or nearby data is likely to be accessed again, so keeping it in faster memory reduces average access time.",
    "Caches exploit temporal and spatial locality to avoid repeated slow memory accesses."
  ),
  createCard(
    "arch-amdahl",
    "Computer Architecture",
    "arch-memory",
    "Medium",
    "What does Amdahl's Law remind you about parallel speedup?",
    "The sequential part of a workload limits the total speedup no matter how much of the rest is accelerated.",
    "Infinite hardware parallelism cannot remove a bottleneck that stays serial."
  ),
  createCard(
    "arch-virtual-memory",
    "Computer Architecture",
    "arch-memory",
    "Medium",
    "Why is virtual memory also an architecture topic rather than only an OS topic?",
    "Because hardware and software cooperate on translation, protection, faults, and memory hierarchy behavior.",
    "Page tables, TLBs, and fault handling cross the boundary between machine design and kernel policy."
  ),
  createCard(
    "se-agile-contrast",
    "Software Engineering",
    "se-process",
    "Easy",
    "How does Agile differ from plan-and-document approaches at a high level?",
    "Agile emphasizes short iterations and feedback, while plan-and-document emphasizes heavier up-front specification.",
    "The difference is not chaos versus rigor, but when and how learning is incorporated into the process."
  ),
  createCard(
    "se-iteration-planning",
    "Software Engineering",
    "se-process",
    "Medium",
    "Why do teams break work into iterations or sprints?",
    "To reduce planning risk, surface feedback early, and make progress easier to inspect.",
    "Smaller batches help teams learn quickly and adjust before large amounts of effort are sunk."
  ),
  createCard(
    "se-team-roles",
    "Software Engineering",
    "se-process",
    "Easy",
    "Why does explicit team organization matter on larger software projects?",
    "Because coordination overhead grows with team size and unclear ownership leads to confusion and delays.",
    "Defined roles and rituals keep design, communication, and execution aligned."
  ),
  createCard(
    "se-user-story",
    "Software Engineering",
    "se-design",
    "Easy",
    "What is a user story meant to capture?",
    "A slice of user value stated from the perspective of someone who needs the feature.",
    "Stories keep attention on outcomes and are often refined into acceptance criteria and tests."
  ),
  createCard(
    "se-design-patterns",
    "Software Engineering",
    "se-design",
    "Medium",
    "Why should design patterns be applied carefully rather than automatically?",
    "Because patterns are tools for specific problems, and unnecessary abstraction can make code harder to understand.",
    "A pattern is valuable when it clarifies structure or changeability, not when it is added for its own sake."
  ),
  createCard(
    "se-maintainability",
    "Software Engineering",
    "se-design",
    "Easy",
    "What does maintainability mean in a software system?",
    "How easily the system can be understood, modified, tested, and extended over time.",
    "Maintainability depends on design clarity, modularity, tooling, and disciplined change practices."
  ),
  createCard(
    "se-tdd-bdd",
    "Software Engineering",
    "se-quality",
    "Medium",
    "How do TDD and BDD influence implementation work?",
    "They encourage defining expected behavior before or alongside the code that fulfills it.",
    "Tests and executable scenarios become part of the design conversation instead of a late afterthought."
  ),
  createCard(
    "se-unit-vs-integration",
    "Software Engineering",
    "se-quality",
    "Easy",
    "What is the difference between unit tests and integration tests?",
    "Unit tests focus on small isolated behavior, while integration tests check components working together.",
    "Both matter because correct parts can still fail when interfaces or assumptions collide."
  ),
  createCard(
    "se-refactor-legacy",
    "Software Engineering",
    "se-quality",
    "Medium",
    "Why is incremental refactoring usually safer than a total rewrite of legacy code?",
    "It preserves working behavior while letting the team improve structure step by step.",
    "Rewrites discard embedded knowledge and often introduce new risk before delivering user value."
  ),
  createCard(
    "se-version-control",
    "Software Engineering",
    "se-delivery",
    "Easy",
    "Why is version control central to team software work?",
    "It records change history, supports branching and review, and makes collaboration safer.",
    "Teams rely on version control to coordinate work, recover mistakes, and reason about how the system evolved."
  ),
  createCard(
    "se-rest-saas",
    "Software Engineering",
    "se-delivery",
    "Medium",
    "What does a RESTful SaaS architecture typically emphasize?",
    "Network-accessible services with clear resource-oriented interfaces and deployable server-side components.",
    "It frames the application as continuously delivered software accessed over the web rather than as a one-off desktop binary."
  ),
  createCard(
    "se-security-performance",
    "Software Engineering",
    "se-delivery",
    "Medium",
    "Why should security and performance be treated as ongoing engineering work?",
    "Because real systems evolve, and risks emerge from new features, changing load, and operational context.",
    "Teams need continuous testing, measurement, and review instead of assuming one-time fixes are enough."
  ),
];

export const topics = ["All", ...courseCatalog.map((course) => course.topic)];

export const totalModules = courseCatalog.reduce(
  (count, course) => count + course.modules.length,
  0
);
