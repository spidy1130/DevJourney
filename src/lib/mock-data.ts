// ─── Content Section Types ────────────────────────────────────────
export type ContentSection =
  | { type: 'heading'; text: string }
  | { type: 'text'; text: string }
  | { type: 'code'; code: string; language?: string; label?: string }
  | { type: 'list'; items: string[]; ordered?: boolean }
  | { type: 'analogy'; items: { left: string; right: string }[] }
  | { type: 'note'; title: string; text: string; icon?: string }
  | { type: 'mistake'; title: string; wrong: string; correct: string }
  | { type: 'output'; text: string };

export interface QuizQuestion {
  id: number;
  question: string;
  options: string[];
  correct: number;
  explanation: string;
}

export interface PracticeAssignment {
  id: string;
  title: string;
  description: string;
  requirements: string[];
  starterCode: string;
}

export interface Lesson {
  id: string;
  day: number;
  title: string;
  isUnlocked: boolean;
  isCompleted: boolean;
  content: {
    sections: ContentSection[];
  };
  quiz: QuizQuestion[];
  practice: PracticeAssignment[];
}

export interface Course {
  id: string;
  slug: string;
  title: string;
  description: string;
  level: string;
  duration: string;
  isAvailable: boolean;
  lessons: Lesson[];
}

// Data version — bump this when the data structure changes to force localStorage reset
export const DATA_VERSION = 8;

// ─── HTML COURSE ──────────────────────────────────────────────────
export const MOCK_COURSES: Course[] = [
  {
    id: '1',
    slug: 'html',
    title: 'HTML Mastering',
    description: 'Learn the skeleton of the web. Master HTML from basic tags to SEO metadata in 7 structured days.',
    level: 'Beginner',
    duration: '7 Days',
    isAvailable: true,
    lessons: [
      // ═══════════════════════════════════════════════════════════
      // DAY 1 — HTML Fundamentals
      // ═══════════════════════════════════════════════════════════
      {
        id: 'h1',
        day: 1,
        title: 'HTML Fundamentals',
        isUnlocked: true,
        isCompleted: false,
        content: {
          sections: [
            // ── What is HTML? ──
            { type: 'heading', text: 'What is HTML?' },
            { type: 'text', text: 'HTML stands for HyperText Markup Language.' },
            { type: 'text', text: 'HTML is a markup language, not a programming language.' },
            { type: 'text', text: 'It is used to define the structure of a webpage.' },

            // ── Analogy ──
            { type: 'heading', text: 'Analogy' },
            { type: 'analogy', items: [
              { left: 'HTML', right: 'Structure of a house' },
              { left: 'CSS', right: 'Design and decoration' },
              { left: 'JavaScript', right: 'Behavior and functionality' }
            ]},

            // ── How a Webpage Loads ──
            { type: 'heading', text: 'How a Webpage Loads' },
            { type: 'list', ordered: true, items: [
              'Browser requests HTML from server.',
              'Server sends HTML file.',
              'Browser reads HTML.',
              'Browser creates DOM (Document Object Model).',
              'Browser displays the webpage.'
            ]},
            { type: 'text', text: 'Example:' },
            { type: 'code', language: 'html', code: '<h1>Hello World</h1>' },
            { type: 'text', text: 'The browser understands that it needs to display a heading with the text "Hello World".' },

            // ── Basic HTML Document Structure ──
            { type: 'heading', text: 'Basic HTML Document Structure' },
            { type: 'code', language: 'html', code: '<!DOCTYPE html>\n<html>\n\n<head>\n    <title>My Website</title>\n</head>\n\n<body>\n    <h1>Hello World</h1>\n</body>\n\n</html>' },

            // ── Important HTML Tags ──
            { type: 'heading', text: 'Important HTML Tags' },

            { type: 'note', title: '1. DOCTYPE', icon: '📄', text: 'Tells the browser that the document uses HTML5. Always written at the top of the file.' },
            { type: 'code', language: 'html', code: '<!DOCTYPE html>' },

            { type: 'note', title: '2. html Tag', icon: '🌐', text: 'Root element of the webpage. All HTML code is placed inside it.' },
            { type: 'code', language: 'html', code: '<html>\n</html>' },

            { type: 'note', title: '3. head Tag', icon: '🧠', text: 'Stores metadata. Not visible on the webpage. Contains: Title, CSS links, Character encoding, SEO information.' },
            { type: 'code', language: 'html', code: '<head>\n</head>' },

            { type: 'note', title: '4. title Tag', icon: '🏷️', text: 'Sets the text shown on the browser tab.' },
            { type: 'code', language: 'html', code: '<title>My Website</title>' },

            { type: 'note', title: '5. body Tag', icon: '📦', text: 'Contains all visible content: Headings, Paragraphs, Images, Links, Tables.' },
            { type: 'code', language: 'html', code: '<body>\n</body>' },

            // ── HTML Tags (Opening/Closing) ──
            { type: 'heading', text: 'HTML Tags' },
            { type: 'text', text: 'Most HTML elements have an opening tag, content, and a closing tag.' },
            { type: 'code', language: 'html', code: '<h1>Hello</h1>\n\nOpening Tag: <h1>\nContent: Hello\nClosing Tag: </h1>' },

            // ── Heading Tags ──
            { type: 'heading', text: 'Heading Tags' },
            { type: 'text', text: 'HTML provides six levels of headings.' },
            { type: 'code', language: 'html', code: '<h1>Main Heading</h1>\n<h2>Sub Heading</h2>\n<h3>Section Heading</h3>\n<h4>Topic Heading</h4>\n<h5>Small Heading</h5>\n<h6>Tiny Heading</h6>' },
            { type: 'list', items: [
              'h1 is the most important heading.',
              'h6 is the least important heading.',
              'Generally use only one h1 per page.'
            ]},

            // ── Paragraph Tag ──
            { type: 'heading', text: 'Paragraph Tag' },
            { type: 'text', text: 'Used for normal text content.' },
            { type: 'code', language: 'html', code: '<p>This is a paragraph.</p>\n\n<p>I am learning HTML.</p>' },

            // ── Line Break ──
            { type: 'heading', text: 'Line Break' },
            { type: 'text', text: 'The <br> tag moves content to the next line.' },
            { type: 'code', language: 'html', code: 'Hello<br>\nWorld' },
            { type: 'output', text: 'Hello\nWorld' },

            // ── Horizontal Rule ──
            { type: 'heading', text: 'Horizontal Rule' },
            { type: 'text', text: 'The <hr> tag creates a horizontal divider line.' },
            { type: 'code', language: 'html', code: '<p>Chapter 1</p>\n<hr>\n<p>Chapter 2</p>' },

            // ── Comments ──
            { type: 'heading', text: 'Comments' },
            { type: 'text', text: 'Comments are ignored by the browser. They are used for notes, documentation, and temporarily disabling code.' },
            { type: 'code', language: 'html', code: '<!-- This is a comment -->' },

            // ── Complete Example ──
            { type: 'heading', text: 'Complete Example' },
            { type: 'code', language: 'html', code: '<!DOCTYPE html>\n<html>\n\n<head>\n    <title>My First Webpage</title>\n</head>\n\n<body>\n\n    <h1>Welcome to My Website</h1>\n\n    <p>My name is Azad.</p>\n\n    <hr>\n\n    <p>I am learning HTML.</p>\n\n    <!-- This is a comment -->\n\n</body>\n\n</html>' },

            // ── Common Beginner Mistakes ──
            { type: 'heading', text: 'Common Beginner Mistakes' },
            { type: 'mistake', title: 'Mistake 1: Missing Closing Tag', wrong: '<h1>Hello', correct: '<h1>Hello</h1>' },
            { type: 'mistake', title: 'Mistake 2: Visible Content Inside head', wrong: '<head>\n    <h1>Hello</h1>\n</head>', correct: '<body>\n    <h1>Hello</h1>\n</body>' },
            { type: 'mistake', title: 'Mistake 3: Not Using Boilerplate', wrong: '<h1>Hello</h1>', correct: '<!DOCTYPE html>\n<html>\n<head>\n</head>\n<body>\n    <h1>Hello</h1>\n</body>\n</html>' }
          ]
        },
        quiz: [
          {
            id: 1,
            question: "What does HTML stand for?",
            options: ["Hyper Transfer Markup Language", "HyperText Markup Language", "HighText Markup Language", "HyperText Markdown Language"],
            correct: 1,
            explanation: "HTML stands for HyperText Markup Language — the standard language for creating web pages."
          },
          {
            id: 2,
            question: "HTML is:",
            options: ["A programming language", "A database language", "A markup language", "An operating system"],
            correct: 2,
            explanation: "HTML is a markup language used to structure content on the web, not a programming language."
          },
          {
            id: 3,
            question: "Which tag contains all visible content of a webpage?",
            options: ["<head>", "<title>", "<body>", "<html>"],
            correct: 2,
            explanation: "The <body> tag contains all the visible content that is rendered in the browser window."
          },
          {
            id: 4,
            question: "What is the purpose of <!DOCTYPE html>?",
            options: ["Creates a heading", "Creates a paragraph", "Tells the browser the document uses HTML5", "Adds metadata"],
            correct: 2,
            explanation: "<!DOCTYPE html> declares the document type and tells the browser to use the HTML5 standard."
          },
          {
            id: 5,
            question: "Which tag sets the text shown on the browser tab?",
            options: ["<head>", "<body>", "<title>", "<meta>"],
            correct: 2,
            explanation: "The <title> tag defines the text displayed on the browser tab and in search engine results."
          },
          {
            id: 6,
            question: "How many heading levels are available in HTML?",
            options: ["4", "5", "6", "7"],
            correct: 2,
            explanation: "HTML provides 6 heading levels: <h1> (most important) through <h6> (least important)."
          },
          {
            id: 7,
            question: "Which tag is used to create a paragraph?",
            options: ["<para>", "<text>", "<p>", "<paragraph>"],
            correct: 2,
            explanation: "The <p> tag defines a paragraph of text content."
          },
          {
            id: 8,
            question: "Which tag creates a line break?",
            options: ["<break>", "<lb>", "<br>", "<newline>"],
            correct: 2,
            explanation: "The <br> tag inserts a single line break without starting a new paragraph."
          },
          {
            id: 9,
            question: "Which tag creates a horizontal line?",
            options: ["<line>", "<hl>", "<hr>", "<hline>"],
            correct: 2,
            explanation: "The <hr> tag creates a horizontal rule — a thematic break or divider line."
          },
          {
            id: 10,
            question: "How are comments written in HTML?",
            options: ["// Comment", "/* Comment */", "# Comment", "<!-- Comment -->"],
            correct: 3,
            explanation: "HTML comments use the syntax <!-- comment --> and are not displayed in the browser."
          }
        ],
        practice: [
          {
            id: 'h1-a1',
            title: 'Assignment 1: Basic Webpage',
            description: 'Create a webpage containing a page title, one h1 heading, and two paragraphs.',
            requirements: [
              'Add a <title> tag inside the <head> with the text "My First HTML Page".',
              'Add one <h1> heading with a topic of your choice.',
              'Add two <p> paragraphs about why you want to learn coding.'
            ],
            starterCode: '<!DOCTYPE html>\n<html>\n<head>\n    <!-- Add your title here -->\n</head>\n<body>\n    <!-- Add your h1 and paragraphs here -->\n</body>\n</html>'
          },
          {
            id: 'h1-a2',
            title: 'Assignment 2: My Introduction',
            description: 'Create a webpage displaying your personal introduction using proper HTML tags.',
            requirements: [
              'Add one <h1> heading with the text "My Introduction".',
              'Add a paragraph with your Name.',
              'Add a paragraph with your College Name.',
              'Add a paragraph with your Branch.',
              'Add a paragraph with your Career Goal.'
            ],
            starterCode: '<!DOCTYPE html>\n<html>\n<head>\n    <title>My Introduction</title>\n</head>\n<body>\n    <!-- Write your introduction here -->\n</body>\n</html>'
          },
          {
            id: 'h1-a3',
            title: 'Assignment 3: Favorite Technology',
            description: 'Create a webpage about your favorite technology (AI, Web Dev, Cloud, Cyber Security, etc.).',
            requirements: [
              'Add one <h1> heading with the technology name.',
              'Add two <h2> sub-headings for different aspects.',
              'Add three <p> paragraphs with details.',
              'Add one <hr> horizontal line between sections.'
            ],
            starterCode: '<!DOCTYPE html>\n<html>\n<head>\n    <title>My Favorite Technology</title>\n</head>\n<body>\n    <!-- Create your technology page here -->\n</body>\n</html>'
          },
          {
            id: 'h1-a4',
            title: 'Assignment 4: Why I Want to Become a Full Stack Developer',
            description: 'Write a detailed webpage (minimum 150 words) about your motivation to become a Full Stack Developer.',
            requirements: [
              'Add one <h1> heading: "Why I Want to Become a Full Stack Developer".',
              'Add at least two <h2> sub-headings for different sections.',
              'Add multiple <p> paragraphs (minimum 150 words total).',
              'Add one <hr> horizontal line to separate sections.',
              'Use proper HTML boilerplate structure.'
            ],
            starterCode: '<!DOCTYPE html>\n<html>\n<head>\n    <title>Why I Want to Become a Full Stack Developer</title>\n</head>\n<body>\n    <!-- Write your essay here using proper HTML tags -->\n    <!-- Remember: minimum 150 words! -->\n</body>\n</html>'
          }
        ]
      },

      // ═══════════════════════════════════════════════════════════
      // DAY 2 — Links, Images & Paths (placeholder)
      // ═══════════════════════════════════════════════════════════
      {
        id: 'h2',
        day: 2,
        title: 'Links, Images & Paths',
        isUnlocked: false,
        isCompleted: false,
        content: {
          sections: [
            { type: 'heading', text: 'Links, Images & Paths' },
            { type: 'text', text: 'Content coming soon — your instructor will provide Day 2 material.' }
          ]
        },
        quiz: [],
        practice: []
      },

      // DAY 3
      {
        id: 'h3',
        day: 3,
        title: 'Lists & Tables',
        isUnlocked: false,
        isCompleted: false,
        content: {
          sections: [
            { type: 'heading', text: 'Lists & Tables' },
            { type: 'text', text: 'Content coming soon — your instructor will provide Day 3 material.' }
          ]
        },
        quiz: [],
        practice: []
      },

      // DAY 4
      {
        id: 'h4',
        day: 4,
        title: 'Forms & Inputs',
        isUnlocked: false,
        isCompleted: false,
        content: {
          sections: [
            { type: 'heading', text: 'Forms & Inputs' },
            { type: 'text', text: 'Content coming soon — your instructor will provide Day 4 material.' }
          ]
        },
        quiz: [],
        practice: []
      },

      // DAY 5
      {
        id: 'h5',
        day: 5,
        title: 'Semantic HTML5',
        isUnlocked: false,
        isCompleted: false,
        content: {
          sections: [
            { type: 'heading', text: 'Semantic HTML5' },
            { type: 'text', text: 'Content coming soon — your instructor will provide Day 5 material.' }
          ]
        },
        quiz: [],
        practice: []
      },

      // DAY 6
      {
        id: 'h6',
        day: 6,
        title: 'Multimedia & Embedding',
        isUnlocked: false,
        isCompleted: false,
        content: {
          sections: [
            { type: 'heading', text: 'Multimedia & Embedding' },
            { type: 'text', text: 'Content coming soon — your instructor will provide Day 6 material.' }
          ]
        },
        quiz: [],
        practice: []
      },

      // DAY 7
      {
        id: 'h7',
        day: 7,
        title: 'SEO & Meta Tags',
        isUnlocked: false,
        isCompleted: false,
        content: {
          sections: [
            { type: 'heading', text: 'SEO & Meta Tags' },
            { type: 'text', text: 'Content coming soon — your instructor will provide Day 7 material.' }
          ]
        },
        quiz: [],
        practice: []
      }
    ]
  },

  // ─── CSS COURSE ─────────────────────────────────────────────────
  {
    id: '2',
    slug: 'css',
    title: 'CSS Mastery',
    description: 'Style beautiful, responsive websites from scratch using modern techniques.',
    level: 'Beginner',
    duration: '7 Days',
    isAvailable: true,
    lessons: [
      {
        id: 'c1', day: 1, title: 'CSS Intro & Selectors', isUnlocked: true, isCompleted: false,
        content: { sections: [
          { type: 'heading', text: 'Introduction to CSS' },
          { type: 'text', text: 'CSS (Cascading Style Sheets) controls the visual presentation of HTML elements.' },
          { type: 'code', language: 'css', code: 'p {\n  color: blue;\n}\n.container {\n  padding: 20px;\n}' }
        ]},
        quiz: [{ id: 1, question: "What does CSS stand for?", options: ["Creative Style Sheets", "Cascading Style Sheets", "Computer Style Sheets", "Colorful Style Sheets"], correct: 1, explanation: "CSS stands for Cascading Style Sheets." }],
        practice: [{ id: 'c1-a1', title: 'Style Your First Heading', description: 'Target all h1 elements and set their text color to blue.', requirements: ['Use an element selector for h1', 'Set the color property to blue'], starterCode: '/* Style h1 here */\n' }]
      },
      {
        id: 'c2', day: 2, title: 'Colors & Typography', isUnlocked: false, isCompleted: false,
        content: { sections: [{ type: 'heading', text: 'Colors & Typography' }, { type: 'text', text: 'Content coming soon.' }] },
        quiz: [], practice: []
      },
      {
        id: 'c3', day: 3, title: 'Backgrounds & Gradients', isUnlocked: false, isCompleted: false,
        content: { sections: [{ type: 'heading', text: 'Backgrounds & Gradients' }, { type: 'text', text: 'Content coming soon.' }] },
        quiz: [], practice: []
      },
      {
        id: 'c4', day: 4, title: 'The Box Model', isUnlocked: false, isCompleted: false,
        content: { sections: [{ type: 'heading', text: 'The Box Model' }, { type: 'text', text: 'Content coming soon.' }] },
        quiz: [], practice: []
      },
      {
        id: 'c5', day: 5, title: 'Flexbox Alignment', isUnlocked: false, isCompleted: false,
        content: { sections: [{ type: 'heading', text: 'Flexbox Alignment' }, { type: 'text', text: 'Content coming soon.' }] },
        quiz: [], practice: []
      },
      {
        id: 'c6', day: 6, title: 'CSS Grid Layouts', isUnlocked: false, isCompleted: false,
        content: { sections: [{ type: 'heading', text: 'CSS Grid Layouts' }, { type: 'text', text: 'Content coming soon.' }] },
        quiz: [], practice: []
      },
      {
        id: 'c7', day: 7, title: 'Responsive Design', isUnlocked: false, isCompleted: false,
        content: { sections: [{ type: 'heading', text: 'Responsive Design' }, { type: 'text', text: 'Content coming soon.' }] },
        quiz: [], practice: []
      }
    ]
  },
  // ─── JAVASCRIPT COURSE ──────────────────────────────────────────
  {
    id: '3',
    slug: 'javascript',
    title: 'JavaScript Essentials',
    description: 'Master the logic of the web. Functions, DOM, and interactive programming.',
    level: 'Intermediate',
    duration: '14 Days',
    isAvailable: true,
    lessons: [
      {
        id: 'js1',
        day: 1,
        title: 'Introduction to JavaScript',
        isUnlocked: true,
        isCompleted: false,
        content: {
          sections: [
            // ── Why JavaScript Exists ──
            { type: 'heading', text: 'Why JavaScript Exists' },
            { type: 'text', text: 'Before you write a single line of JavaScript, it helps to know why it exists at all. The world already had C++, Java, and Python — powerful, proven languages. So why invent yet another one? The answer is a genuine story: a corporate war, a ten-day scramble, and a "silly little brother" language that outlived every rival.' },

            // ── The Dead Web ──
            { type: 'heading', text: '1. The Web Was Born Dead' },
            { type: 'text', text: 'In the early 1990s, a web page was a static document. It could show text and images, and that was essentially all. There was no way for a page to react to you. If you filled in a form and made a mistake, the page had to ship your data to a distant server and wait for the server to reply just to say "that\'s wrong, try again." Netscape — makers of the dominant browser of the era — realised the web needed to come alive and respond instantly.' },

            // ── Sun and Java ──
            { type: 'heading', text: '2. Enter Sun Microsystems & Java' },
            { type: 'text', text: 'At the same time, Sun Microsystems created a language called Java with one superpower: "write once, run anywhere." A Java program could run on Windows, Mac, or Linux inside a Java Virtual Machine. In 1995, Sun and Netscape partnered to put Java in the browser — the two giants of the early web joined forces.' },
            { type: 'note', title: 'Java\'s Promise', icon: '☕', text: '"Write once, run anywhere" — Java programs ran identically on any OS inside a Java Virtual Machine (JVM). For a web full of different computers, this sounded revolutionary.' },

            // ── Secret War ──
            { type: 'heading', text: '3. The Secret War Against Microsoft' },
            { type: 'text', text: 'Both Sun and Netscape had a common enemy: Microsoft. In the 1990s, Microsoft owned the ground all software stood on — everyone needed Windows. Sun and Netscape dreamed: what if all software ran inside the browser, written in Java? Then Windows would become irrelevant — reduced to "a particularly expensive way to switch the computer on."' },
            { type: 'analogy', items: [
              { left: 'Microsoft\'s power', right: 'Everyone needed Windows to run software' },
              { left: 'Sun + Netscape\'s dream', right: 'Software runs in the browser, OS becomes irrelevant' },
              { left: 'The threat', right: 'Who would pay for Windows if the browser was the platform?' }
            ]},

            // ── Why a Second Language ──
            { type: 'heading', text: '4. Why a Second Language Was Needed' },
            { type: 'text', text: 'If Java was already going into the browser, why invent JavaScript at all? Java was the wrong shape for one specific job.' },
            { type: 'note', title: 'Two Very Different Jobs on a Web Page', icon: '⚙️', text: 'Heavy lifting: big, self-contained programs (a chart tool, a game) — Java\'s territory, for professional programmers.\n\nGlue: small touches that tie the page together — react to a click, check a form field. Needed to be simple enough for web designers.' },
            { type: 'list', items: [
              'Java ran in a sealed box and couldn\'t easily touch the surrounding page.',
              'Java was too heavyweight — starting the JVM just to check a phone number was like starting a truck to open a garage door.',
              'Java was too hard for the web designers who would write the glue code.'
            ]},
            { type: 'text', text: 'So Netscape needed BOTH: Java as the powerful "component language," and a new, light "glue language" for everyone else. That glue language is JavaScript.' },

            // ── Ten Days ──
            { type: 'heading', text: '5. Ten Days in May — How JS Was Created' },
            { type: 'text', text: 'Netscape hired an engineer named Brendan Eich, originally to put Scheme in the browser. Instead, he was asked to build the new glue language — and the prototype was written in roughly ten days in May 1995.' },
            { type: 'note', title: 'The Marketing Constraint', icon: '📣', text: 'Because of the Sun partnership, marketing demanded the new language LOOK LIKE Java to ride its popularity. Eich described being ordered to make it Java\'s "silly little brother." That single business decision — "make it look like Java" — ruled out simply adopting Python or Perl.\n\n"Java and JavaScript are as related as \'car\' and \'carpet.\'" — Famous developer saying' },

            // ── Java vs JS comparison ──
            { type: 'heading', text: '6. Java vs JavaScript — Side by Side' },
            { type: 'analogy', items: [
              { left: 'Java → for professional programmers', right: 'JavaScript → for web designers' },
              { left: 'Java → powerful, fast, full-featured', right: 'JavaScript → light, simple, forgiving' },
              { left: 'Java → ran in a sealed box (applet)', right: 'JavaScript → woven into the page itself' },
              { left: 'Java → could NOT touch the page', right: 'JavaScript → could touch any button, text, element' },
              { left: 'Java → needed a plugin + slow startup', right: 'JavaScript → built-in, ran instantly' },
              { left: 'Java → removed from browsers ~2015', right: 'JavaScript → became the language of the web' }
            ]},

            // ── How it won ──
            { type: 'heading', text: '7. How the Little Brother Won' },
            { type: 'text', text: 'Java was the more powerful language. So how did JavaScript take over the frontend entirely? Not by being better — by being in the right place.' },
            { type: 'list', items: [
              'No plugin, no waiting — JavaScript was already inside every browser and ran instantly. Java needed a plugin installed.',
              'Security — The Java plugin became a notorious source of security holes, and browsers fenced it off harder each year.',
              'JavaScript caught up — Around 2011 onward, browsers gained fast JS engines and native graphics, erasing Java\'s speed advantages.',
              'It lived in the page — Java sat in a box; JavaScript was woven into the document. As the web became about fluid pages, that was exactly the right shape.'
            ]},
            { type: 'text', text: 'Browsers dropped support for Java applets entirely around 2015–2017. The powerful component language was evicted. The silly little glue language became the foundation of the modern web.' },

            // ── Why not C++ ──
            { type: 'heading', text: '8. Developer Knows HTML & CSS — Why Do We Need JavaScript?' },
            { type: 'text', text: 'A natural question: if you know HTML and CSS, why learn JavaScript? And deeper: why not just use a powerful language like C++ in the browser?' },

            { type: 'note', title: 'Reason 1: C++ is too heavy for browsers', icon: '⚖️', text: 'C++ is designed for systems programming — controlling hardware, managing memory manually. Web authors just learned <table> and <font>, not kernel development. The browser needed something lightweight, interpreted, forgiving, and safe.' },
            { type: 'analogy', items: [
              { left: 'C++ Hello World (7+ lines)', right: 'JS Hello World (1 line)' }
            ]},
            { type: 'code', language: 'cpp', code: '#include<iostream>\nusing namespace std;\nint main() {\n   cout << "Hello World";\n}' },
            { type: 'code', language: 'javascript', code: 'console.log("Hello World")' },

            { type: 'note', title: 'Reason 2: Massive Security Nightmare', icon: '🔐', text: 'C++ gives you low-level control over memory and system calls. If a browser ran arbitrary C++ from a website, that code could read/write any file, install malware, access your webcam, or crash your OS.' },
            { type: 'code', language: 'cpp', label: 'What C++ could do (file access):', code: '#include <fstream>\nstd::ofstream file("C:\\\\Users\\\\you\\\\secrets.txt");\nfile << "stolen data";' },
            { type: 'code', language: 'cpp', label: 'What C++ could do (delete everything):', code: '#include <cstdlib>\nsystem("rm -rf /");   // Linux\nsystem("format C:");  // Windows nightmare' },
            { type: 'code', language: 'cpp', label: 'What C++ could do (raw memory access):', code: 'int* p = (int*)0xB8000;  // Access video memory\n*p = 42;' },

            { type: 'note', title: 'Reason 3: System configs were tiny in 1995', icon: '💾', text: 'Typical home PC in 1995: 4–8 MB of RAM, 200–500 MB hard disk, Intel Pentium 75–133 MHz.\n\nRunning a sandboxed C++ runtime would have eaten all available RAM. Browsers had to stay lightweight or people simply wouldn\'t use them.' },
            { type: 'analogy', items: [
              { left: '1995 average RAM', right: '4–8 MB (shared with Windows 95 + browser)' },
              { left: '1995 hard disk', right: '200–500 MB' },
              { left: '1995 CPU', right: 'Intel Pentium 75–133 MHz' },
              { left: 'Today', right: '16+ GB RAM, 1 TB SSD, multi-GHz multi-core CPU' }
            ]},

            { type: 'note', title: 'Reason 4: Automatic Memory Management', icon: '♻️', text: 'Developers don\'t have to manually allocate and free memory in JavaScript. The JS engine handles it automatically through "garbage collection," reducing complexity and preventing common bugs like memory leaks that plague C++.' },

            // ── Today ──
            { type: 'heading', text: '9. The Same Story, Today' },
            { type: 'text', text: 'A modern technology called WebAssembly now lets powerful languages like C++ and Rust run in the browser at near-native speed. Sounds like Java all over again — and yet, WebAssembly CANNOT touch the page. To change a button or react to a click, it must call out to JavaScript.' },
            { type: 'note', title: 'The Beautiful Full Circle', icon: '🔄', text: 'The exact word used in 1995 to describe JavaScript\'s role — "glue" — is the exact word used today for its role next to WebAssembly. Thirty years on, the heavyweight component keeps changing (Java → C++ via WebAssembly), but the glue never does.' },

            { type: 'heading', text: 'The One-Sentence Takeaway' },
            { type: 'text', text: 'Other languages own the computer. JavaScript owns the browser tab — and the browser turned out to be a very big room. It didn\'t win by being the most powerful. It won by being woven into the page, already there, ready to run. And that is the language you start learning today.' }
          ]
        },
        quiz: [
          {
            id: 1,
            question: 'What does HTML stand for?',
            options: ['Hyper Transfer Markup Language', 'HyperText Markup Language', 'HighText Markup Language', 'HyperText Markdown Language'],
            correct: 1,
            explanation: 'HTML stands for HyperText Markup Language — the standard language for creating web pages.'
          },
          {
            id: 2,
            question: 'In what year was JavaScript created?',
            options: ['1990', '1993', '1995', '1999'],
            correct: 2,
            explanation: 'JavaScript was created in May 1995 by Brendan Eich at Netscape Communications.'
          },
          {
            id: 3,
            question: 'Who created JavaScript?',
            options: ['Linus Torvalds', 'Brendan Eich', 'James Gosling', 'Tim Berners-Lee'],
            correct: 1,
            explanation: 'Brendan Eich created the prototype of JavaScript in roughly ten days in May 1995 at Netscape.'
          },
          {
            id: 4,
            question: 'How long did it take Brendan Eich to write the initial JavaScript prototype?',
            options: ['1 day', '10 days', '30 days', '6 months'],
            correct: 1,
            explanation: 'The initial JavaScript prototype was written in approximately ten days in May 1995.'
          },
          {
            id: 5,
            question: 'What was JavaScript\'s original role in the browser?',
            options: ['To replace Java completely', 'To manage databases', 'To act as "glue" connecting page elements', 'To render 3D graphics'],
            correct: 2,
            explanation: 'JavaScript was designed as a "glue language" — simple touches like reacting to clicks and validating forms — while Java handled heavy, self-contained programs.'
          },
          {
            id: 6,
            question: 'Why was JavaScript\'s name chosen to sound like Java?',
            options: ['Because they share the same syntax', 'To confuse programmers', 'As a marketing decision to ride Java\'s popularity', 'Because they were created by the same person'],
            correct: 2,
            explanation: 'The name "JavaScript" was a pure marketing decision. Netscape was partnered with Sun (Java\'s creator), so the new language was named to borrow Java\'s fame even though the two are largely unrelated.'
          },
          {
            id: 7,
            question: 'Which companies partnered in 1995 to put Java in the browser?',
            options: ['Microsoft and Apple', 'Sun and Netscape', 'IBM and Google', 'Oracle and Mozilla'],
            correct: 1,
            explanation: 'Sun Microsystems and Netscape partnered in 1995 to integrate Java into the Netscape browser.'
          },
          {
            id: 8,
            question: 'Why was C++ NOT used as the browser scripting language?',
            options: ['C++ was too slow', 'C++ code could access files, memory, and the OS — a massive security risk', 'C++ was too new', 'C++ could not print to the screen'],
            correct: 1,
            explanation: 'C++ gives unrestricted access to memory, files, and system calls. Running arbitrary C++ from a website would allow malicious code to read your files, crash your OS, or install malware.'
          },
          {
            id: 9,
            question: 'Approximately how much RAM did a typical home computer have in 1995?',
            options: ['64–128 MB', '1–2 GB', '4–8 MB', '512 MB'],
            correct: 2,
            explanation: 'Typical home PCs in 1995 had only 4–8 MB of RAM, shared between Windows 95 and the browser. A heavy C++ runtime would have been impossible to run.'
          },
          {
            id: 10,
            question: 'Which modern technology plays a role similar to Java applets, but still cannot touch the page without JavaScript?',
            options: ['TypeScript', 'WebAssembly', 'Node.js', 'React'],
            correct: 1,
            explanation: 'WebAssembly lets powerful languages like C++ and Rust run in the browser at near-native speed, but it still cannot directly touch the DOM — it must call out to JavaScript for that, just as Java applets once needed the "glue language" too.'
          }
        ],
        practice: [
          {
            id: 'js1-a1',
            title: 'Assignment 1: Your First JavaScript Line',
            description: 'Open the browser console (F12 → Console tab) and run your first JavaScript statement.',
            requirements: [
              'Type: console.log("Hello, JavaScript!") and press Enter.',
              'Try: console.log(2 + 2) — what does it output?',
              'Try: console.log("My name is [your name]") — personalise the message.',
              'Write what you notice about how JavaScript output compares to HTML.'
            ],
            starterCode: '// Open the Console tab (F12) and type these one at a time:\nconsole.log("Hello, JavaScript!");\nconsole.log(2 + 2);\nconsole.log("My name is ___");'
          },
          {
            id: 'js1-a2',
            title: 'Assignment 2: Java vs JavaScript Research',
            description: 'Write a short summary (as comments) comparing Java and JavaScript based on what you\'ve learned.',
            requirements: [
              'List at least 3 differences between Java and JavaScript (as comments).',
              'Write why JavaScript became more popular in browsers than Java.',
              'Explain in your own words: what is meant by JavaScript being the "glue language"?'
            ],
            starterCode: '// Java vs JavaScript — My Summary\n// (Write your answers as comments below)\n\n// Difference 1:\n\n// Difference 2:\n\n// Difference 3:\n\n// Why JS became more popular than Java in browsers:\n\n// What "glue language" means to me:\n'
          },
          {
            id: 'js1-a3',
            title: 'Assignment 3: Why Not C++? Explain It',
            description: 'Imagine you are explaining to a friend why the browser doesn\'t run C++ code from websites. Write your explanation.',
            requirements: [
              'Mention the security problem with C++ (at least 2 specific examples).',
              'Mention the hardware constraint in 1995 (RAM and disk space).',
              'Explain what "garbage collection" means and why it matters for web authors.',
              'Use comments in the JavaScript console to write your answers.'
            ],
            starterCode: '// Why the Browser Cannot Run C++ From Websites\n// (Your explanation as comments)\n\n// Security Problem 1:\n\n// Security Problem 2:\n\n// Hardware Constraint (1995):\n\n// What Garbage Collection means:\n'
          },
          {
            id: 'js1-a4',
            title: 'Assignment 4: Tell the JavaScript Story',
            description: 'Write a short story (150+ words) inside comments explaining how JavaScript came to be. Use the facts from today\'s lesson.',
            requirements: [
              'Start with: why the web was "dead" before JavaScript.',
              'Mention the Sun + Netscape partnership and the war against Microsoft.',
              'Explain why a second language (beyond Java) was needed.',
              'Mention Brendan Eich and the ten-day prototype.',
              'End with: why JavaScript won over Java in the browser.'
            ],
            starterCode: '// The Story of JavaScript\n// (Write 150+ words as comments below)\n\n// In the early 1990s, the web was...\n\n// Then Sun and Netscape partnered because...\n\n// A second language was needed because...\n\n// Brendan Eich created JavaScript in...\n\n// JavaScript won because...\n'
          }
        ]
      },

      // ═══════════════════════════════════════════════════════════
      // JS DAY 2 — Data Types & Variables
      // ═══════════════════════════════════════════════════════════
      {
        id: 'js2',
        day: 2,
        title: 'Data Types in JavaScript',
        isUnlocked: false,
        isCompleted: false,
        content: {
          sections: [
            // ── The Original Problem ──
            { type: 'heading', text: 'The Original Problem: Why Data Types Exist' },
            { type: 'text', text: 'Imagine you\'re building a computer. You have RAM — it\'s just a bunch of 0s and 1s. Someone says: "store the number 42" and "store the word hello".' },
            { type: 'note', title: 'Same Bits, Completely Different Meaning', icon: '🔍', text: '01001000 could be:\n• The number 72\n• The character \'H\'\n• Part of a memory address\n• A boolean true\n\nSame bits. Completely different meaning. That\'s why Data Types were invented.' },
            { type: 'text', text: 'A data type is a label that tells the computer: (1) How many bytes to use for this value, and (2) What operations make sense on it — can you multiply it? Can you uppercase it?' },

            // ── JS Specific Problem ──
            { type: 'heading', text: 'JavaScript\'s Specific Approach' },
            { type: 'text', text: 'Java says: "you must declare the type before using a variable." Like: int x = 5;' },
            { type: 'text', text: 'Brendan Eich was building a scripting language for browsers in 1995. His users weren\'t programmers — they were web designers. So he made the call: let the variable hold any type, figure it out at runtime. This one decision created everything interesting (and annoying) about JavaScript types.' },

            // ── Variables ──
            { type: 'heading', text: 'Variables in JavaScript' },
            { type: 'text', text: 'JavaScript has three ways to declare a variable: const, let, and var. They differ in scope, reassignability, and hoisting behavior.' },

            // const
            { type: 'note', title: 'const — Block-scoped, Cannot be reassigned', icon: '🔒', text: 'Use const as your DEFAULT. It declares a block-scoped variable with a constant reference.\n\n1. Scope: Block (only accessible within { } where defined)\n2. Reassignment: NOT allowed — throws TypeError\n3. Initialization: MANDATORY — must assign a value on declaration\n4. Hoisting: Hoisted but in Temporal Dead Zone (TDZ) — accessing before declaration throws ReferenceError\n5. Mutability: The reference is constant, NOT the value. Object properties can still be changed.' },
            { type: 'code', language: 'javascript', code: '// Block Scope\nif (true) {\n  const PI = 3.14159;\n}\n// console.log(PI); // ReferenceError: PI is not defined\n\n// Reassignment\nconst GREETING = "Hello";\n// GREETING = "Hi"; // TypeError: Assignment to constant variable.\n\n// Mutability (objects CAN be mutated)\nconst CONFIG = { port: 8080 };\nCONFIG.port = 3000; // Allowed! Reference is constant, not value.\n\n// Temporal Dead Zone\n// console.log(MY_CONST); // ReferenceError\nconst MY_CONST = 100;' },

            // let
            { type: 'note', title: 'let — Block-scoped, Can be reassigned', icon: '✏️', text: 'Use let when you know the value will change.\n\n1. Scope: Block\n2. Reassignment: Allowed\n3. Initialization: Optional — defaults to undefined if not initialized\n4. Hoisting: Hoisted but in TDZ — accessing before declaration throws ReferenceError' },
            { type: 'code', language: 'javascript', code: '// Block Scope\nfor (let i = 0; i < 3; i++) {\n  // i is only visible here\n}\n// console.log(i); // ReferenceError: i is not defined\n\n// Reassignment\nlet counter = 0;\ncounter = 1; // Allowed.\n\n// Optional initialization\nlet name; // name is undefined\nname = "Alice";\n\n// Temporal Dead Zone\n// console.log(myLetVar); // ReferenceError\nlet myLetVar = "test";' },

            // var
            { type: 'note', title: 'var — Function-scoped, Avoid in modern JS', icon: '⚠️', text: 'var is the old way. Avoid it in modern JavaScript (ES6+).\n\n1. Scope: Function scope (or global if outside functions) — leaks out of blocks!\n2. Reassignment & Redeclaration: Both allowed\n3. Initialization: Optional — defaults to undefined\n4. Hoisting: Hoisted AND initialized to undefined — no TDZ, no error if accessed early' },
            { type: 'code', language: 'javascript', code: '// Function Scope leaks out of blocks!\nif (true) {\n  var leak = "I am visible outside the if-block";\n}\nconsole.log(leak); // "I am visible outside the if-block"\n\n// Hoisting Behavior\nconsole.log(myVar); // undefined (no error!)\nvar myVar = "Hello";\nconsole.log(myVar); // "Hello"\n\n// Redeclaration allowed\nvar x = 10;\nvar x = 20; // No error. x is now 20.' },

            // Summary table as analogy
            { type: 'heading', text: 'var vs let vs const — Summary' },
            { type: 'analogy', items: [
              { left: 'var → Function scope', right: 'let / const → Block scope' },
              { left: 'var → Reassignable & redeclarable', right: 'const → Neither | let → Reassignable only' },
              { left: 'var → Hoisted to undefined', right: 'let / const → TDZ (error if accessed early)' },
              { left: 'var → Attaches to window object', right: 'let / const → Do NOT attach to window' },
              { left: 'var → Old practice (avoid)', right: 'const = default | let = when must change' }
            ]},

            // ── Primitive Types ──
            { type: 'heading', text: 'Data Types in JavaScript' },
            { type: 'text', text: 'JavaScript has two categories of data types: Primitive types and the Object type.' },
            { type: 'heading', text: '1. Primitive Types' },
            { type: 'text', text: 'Primitives are immutable — their values cannot be changed once created. Operations that appear to modify a primitive actually create a new one. There are 7 primitive types.' },

            { type: 'note', title: 'string', icon: '📝', text: 'Represents textual data. Use single quotes, double quotes, or backticks (template literals).' },
            { type: 'code', language: 'javascript', code: 'let name = "Alice";\nlet greeting = \'Hello, World!\';\nlet template = `User: ${name}`; // Template literals embed expressions' },

            { type: 'note', title: 'number', icon: '🔢', text: 'Represents both integer and floating-point numbers. No distinction between int and float. Special values: Infinity, -Infinity, NaN.' },
            { type: 'code', language: 'javascript', code: 'let integerValue = 100;\nlet floatValue = 3.14;\nlet notANumber = NaN;     // Result of an invalid math op like 0/0\nlet infinity = Infinity;' },

            { type: 'note', title: 'boolean', icon: '✅', text: 'Represents a logical entity with exactly two possible values: true or false.' },
            { type: 'code', language: 'javascript', code: 'let isActive = true;\nlet isComplete = false;' },

            { type: 'note', title: 'undefined', icon: '❓', text: 'Represents the UNINTENTIONAL absence of a value. A variable that has been declared but not assigned is automatically undefined.' },
            { type: 'code', language: 'javascript', code: 'let user;\nconsole.log(user); // undefined' },

            { type: 'note', title: 'null', icon: '🚫', text: 'Represents the INTENTIONAL absence of any object value. Explicitly assigned by a developer to indicate "no value".\n\nnull vs undefined: undefined is the default when nothing is assigned. null is a deliberate assignment of "nothing".' },
            { type: 'code', language: 'javascript', code: 'let data = null; // Intentionally set to have no value' },

            { type: 'note', title: 'bigint', icon: '🔭', text: 'Represents whole numbers larger than the maximum safe integer for the number type. Use the n suffix.' },
            { type: 'code', language: 'javascript', code: 'const veryLargeNumber = 9007199254740991n; // \'n\' makes it a BigInt\nconst another = BigInt(9007199254740992);' },

            { type: 'note', title: 'symbol', icon: '🔑', text: 'Represents a unique, anonymous identifier. Primarily used as unique property keys on objects to avoid naming collisions. Every Symbol() call produces a completely unique value.' },
            { type: 'code', language: 'javascript', code: 'const id1 = Symbol(\'id\');\nconst id2 = Symbol(\'id\');\nconsole.log(id1 === id2); // false — every symbol is unique' },

            // ── Object Type ──
            { type: 'heading', text: '2. The Object Type (Non-Primitive)' },
            { type: 'text', text: 'An object is a mutable collection of key-value pairs. Unlike primitives, a variable assigned to an object stores a REFERENCE (pointer) to the object\'s memory location — not the object itself.' },
            { type: 'code', language: 'javascript', code: '// Object Literal\nlet person = {\n  firstName: "John",\n  lastName: "Doe",\n  age: 30\n};\n\n// Array (specialized object for ordered collections)\nlet numbers = [10, 20, 30, 40];\n\n// Function (also a special type of object)\nfunction greet() {\n  console.log("Hello");\n}' },

            // ── Value vs Reference ──
            { type: 'heading', text: 'Key Difference: Value vs Reference' },
            { type: 'note', title: 'Primitives are Passed by VALUE', icon: '📋', text: 'When you assign a primitive from one variable to another, the VALUE is copied. Changing one does NOT affect the other.' },
            { type: 'code', language: 'javascript', code: 'let a = 10;\nlet b = a; // The value 10 is COPIED into b\nb = 20; // This only changes b\nconsole.log(a); // 10 (a is unaffected)\nconsole.log(b); // 20' },
            { type: 'note', title: 'Objects are Passed by REFERENCE', icon: '🔗', text: 'When you assign an object from one variable to another, the REFERENCE (memory address) is copied. Both variables point to the SAME object. Changing through one variable affects the other!' },
            { type: 'code', language: 'javascript', code: 'let obj1 = { value: 10 };\nlet obj2 = obj1; // The REFERENCE is copied — both point to same object\nobj2.value = 20; // We modify the object through obj2\nconsole.log(obj1.value); // 20 — obj1 is affected too!\nconsole.log(obj2.value); // 20' },

            // ── typeof ──
            { type: 'heading', text: 'The typeof Operator' },
            { type: 'text', text: 'To determine the data type of a variable at runtime, use the typeof operator.' },
            { type: 'code', language: 'javascript', code: 'typeof "Hello"       // "string"\ntypeof 42            // "number"\ntypeof true          // "boolean"\ntypeof undefined     // "undefined"\ntypeof 10n           // "bigint"\ntypeof Symbol(\'id\') // "symbol"\n\ntypeof { a: 1 }      // "object"\ntypeof [1, 2, 3]     // "object" (arrays are objects!)\ntypeof function(){}  // "function" (special case)\ntypeof null          // "object" ← This is a famous JS bug!' },
            { type: 'note', title: 'The null Bug', icon: '🐛', text: 'typeof null returns "object" — this is a long-standing, well-known bug in JavaScript that can never be fixed for backwards compatibility reasons. Always be aware of this quirk!' }
          ]
        },
        quiz: [
          {
            id: 1,
            question: 'Why were data types invented?',
            options: [
              'To make code look cleaner',
              'To tell the computer how many bytes to use and what operations make sense on a value',
              'To make JavaScript more like Java',
              'To enable internet connections'
            ],
            correct: 1,
            explanation: 'A data type tells the computer two things: how many bytes to use for the value, and what operations make sense on it (e.g., can you multiply it? can you uppercase it?).'
          },
          {
            id: 2,
            question: 'Which keyword declares a variable that CANNOT be reassigned?',
            options: ['var', 'let', 'const', 'static'],
            correct: 2,
            explanation: 'const declares a variable with a constant reference — it cannot be reassigned after initialization. Attempting to do so throws a TypeError.'
          },
          {
            id: 3,
            question: 'What is the scope of a var declaration?',
            options: ['Block scope', 'Module scope', 'Function scope (or global)', 'Class scope'],
            correct: 2,
            explanation: 'var is function-scoped (or global if declared outside any function). It leaks out of blocks like if-statements and loops, unlike let and const which are block-scoped.'
          },
          {
            id: 4,
            question: 'What does typeof null return in JavaScript?',
            options: ['"null"', '"undefined"', '"object"', '"primitive"'],
            correct: 2,
            explanation: 'typeof null returns "object" — this is a long-standing, well-known bug in JavaScript. null is actually a primitive, but the typeof operator incorrectly reports it as "object" for historical reasons.'
          },
          {
            id: 5,
            question: 'What is the difference between null and undefined?',
            options: [
              'They are exactly the same thing',
              'undefined is for numbers, null is for strings',
              'undefined is the default when nothing is assigned; null is an explicit assignment of "nothing"',
              'null is the default; undefined is explicitly assigned'
            ],
            correct: 2,
            explanation: 'undefined means a variable has been declared but not assigned any value (unintentional absence). null is explicitly assigned by a developer to indicate "no value" (intentional absence).'
          },
          {
            id: 6,
            question: 'How many primitive data types does JavaScript have?',
            options: ['5', '6', '7', '8'],
            correct: 2,
            explanation: 'JavaScript has 7 primitive types: string, number, boolean, undefined, null, bigint, and symbol.'
          },
          {
            id: 7,
            question: 'What happens when you assign an object from one variable to another?',
            options: [
              'The entire object is copied',
              'Only the first property is copied',
              'The reference (memory address) is copied — both variables point to the same object',
              'A new empty object is created'
            ],
            correct: 2,
            explanation: 'Objects are passed by reference. When you assign obj2 = obj1, both variables point to the SAME object in memory. Modifying through obj2 also affects obj1.'
          },
          {
            id: 8,
            question: 'What value does an uninitialized let variable have?',
            options: ['null', '0', 'undefined', 'It throws an error immediately'],
            correct: 2,
            explanation: 'An uninitialized let variable defaults to undefined. However, if you try to access it BEFORE its declaration in the code (while in the TDZ), you get a ReferenceError.'
          },
          {
            id: 9,
            question: 'What is bigint used for?',
            options: [
              'Storing very small decimal numbers',
              'Representing whole numbers larger than Number.MAX_SAFE_INTEGER',
              'Storing string lengths',
              'Defining very long variable names'
            ],
            correct: 1,
            explanation: 'BigInt represents whole numbers larger than 2^53 - 1 (Number.MAX_SAFE_INTEGER). It is created by adding the "n" suffix to an integer literal, e.g., 9007199254740991n.'
          },
          {
            id: 10,
            question: 'What is the Temporal Dead Zone (TDZ)?',
            options: [
              'A timeout error in JavaScript',
              'The period from the start of a block until a let/const declaration is encountered, during which the variable cannot be accessed',
              'A special browser memory area',
              'The time between a function call and its return'
            ],
            correct: 1,
            explanation: 'The Temporal Dead Zone (TDZ) is the period from the start of a block scope until the let/const variable declaration is reached. Accessing the variable during the TDZ throws a ReferenceError.'
          }
        ],
        practice: [
          {
            id: 'js2-a1',
            title: 'Assignment 1: Variable Scope Explorer',
            description: 'Experiment with var, let, and const to understand scope differences.',
            requirements: [
              'Declare a var inside an if-block and log it from outside — observe it works.',
              'Declare a let inside an if-block and try to log it from outside — observe the error.',
              'Try to reassign a const variable and observe the TypeError.',
              'Show that const object properties CAN be changed even though the variable cannot be reassigned.'
            ],
            starterCode: '// Assignment 1: Variable Scope Explorer\n\n// 1. var leaks out of blocks\nif (true) {\n  var leaky = "I escape blocks!";\n}\nconsole.log(leaky); // What happens?\n\n// 2. let stays in its block\nif (true) {\n  let contained = "I stay inside!";\n}\n// console.log(contained); // What happens when you uncomment this?\n\n// 3. const cannot be reassigned\nconst MAX = 100;\n// MAX = 200; // Uncomment to see the error\n\n// 4. BUT const objects can be mutated\nconst config = { theme: "dark" };\nconfig.theme = "light"; // Does this work?\nconsole.log(config.theme);'
          },
          {
            id: 'js2-a2',
            title: 'Assignment 2: typeof Detective',
            description: 'Use the typeof operator to identify the data type of various values.',
            requirements: [
              'Check the typeof for: a string, a number, a boolean, undefined, null, a bigint, a symbol.',
              'Check the typeof for: an object, an array, and a function.',
              'Pay special attention to what typeof null returns — and note why it\'s a bug.',
              'Write a comment next to each result explaining what you expected vs what you got.'
            ],
            starterCode: '// Assignment 2: typeof Detective\n// Run each line and write what it returns as a comment\n\nconsole.log(typeof "Hello");       // Expected: ?\nconsole.log(typeof 42);            // Expected: ?\nconsole.log(typeof true);          // Expected: ?\nconsole.log(typeof undefined);     // Expected: ?\nconsole.log(typeof null);          // Expected: ? (SURPRISE!)\nconsole.log(typeof 10n);           // Expected: ?\nconsole.log(typeof Symbol("id"));  // Expected: ?\nconsole.log(typeof {a: 1});        // Expected: ?\nconsole.log(typeof [1, 2, 3]);     // Expected: ?\nconsole.log(typeof function(){});  // Expected: ?'
          },
          {
            id: 'js2-a3',
            title: 'Assignment 3: Value vs Reference',
            description: 'Demonstrate the difference between how primitives and objects are stored and copied.',
            requirements: [
              'Create two number variables. Assign one to the other. Change the second. Show the first is unchanged.',
              'Create an object. Assign it to a new variable. Change a property through the new variable.',
              'Show that the ORIGINAL object is also changed (because they share a reference).',
              'Write a comment explaining WHY this happens.'
            ],
            starterCode: '// Assignment 3: Value vs Reference\n\n// PART A: Primitives (copied by VALUE)\nlet original = 42;\nlet copy = original;\ncopy = 100;\nconsole.log("Original:", original); // What is this?\nconsole.log("Copy:", copy);\n// Write why original did not change:\n\n// PART B: Objects (copied by REFERENCE)\nlet obj1 = { score: 50 };\nlet obj2 = obj1;\nobj2.score = 999;\nconsole.log("obj1.score:", obj1.score); // What is this? Why?\nconsole.log("obj2.score:", obj2.score);\n// Write why obj1 was affected:'
          },
          {
            id: 'js2-a4',
            title: 'Assignment 4: Build a Student Profile',
            description: 'Create a student profile object using all different data types you learned today.',
            requirements: [
              'Use const to declare a student object with properties: name (string), age (number), isEnrolled (boolean), grade (null — not assigned yet), studentId (Symbol).',
              'Use typeof to verify the type of each property.',
              'Add a new property to the object after declaration (proving const objects are mutable).',
              'Log the full object to the console.'
            ],
            starterCode: '// Assignment 4: Build a Student Profile\n\nconst student = {\n  name: "Your Name",      // string\n  age: 20,               // number\n  isEnrolled: true,      // boolean\n  grade: null,           // null (not assigned yet)\n  // Add a Symbol for studentId here\n};\n\n// Verify types with typeof:\nconsole.log(typeof student.name);\nconsole.log(typeof student.age);\nconsole.log(typeof student.isEnrolled);\nconsole.log(typeof student.grade); // Remember the bug!\n\n// Add a new property after declaration:\n// student.??? = ???;\n\nconsole.log(student);'
          }
        ]
      },

      // ═══════════════════════════════════════════════════════════
      // JS DAY 3 — Operators, Number Storage, Type Conversion & Comparison
      // ═══════════════════════════════════════════════════════════
      {
        id: 'js3',
        day: 3,
        title: 'Operators in JavaScript',
        isUnlocked: false,
        isCompleted: false,
        content: {
          sections: [
            // ── What is an Operator ──
            { type: 'heading', text: '1. What is an Operator?' },
            { type: 'text', text: 'An operator is a special symbol or keyword used to perform an operation on values. The values the operator works on are called operands. The combination forms an expression that evaluates to a single value.' },
            { type: 'code', language: 'javascript', code: '// In this expression: 5 + 10\n// -> `+` is the operator\n// -> `5` and `10` are the operands\n// -> The expression evaluates to 15\nlet result = 5 + 10;' },

            // ── Assignment Operators ──
            { type: 'heading', text: '2. Assignment Operators' },
            { type: 'text', text: 'These operators assign a value to a variable. The = operator is the fundamental one. Compound operators combine a math operation with assignment.' },
            { type: 'analogy', items: [
              { left: 'x += y', right: 'x = x + y' },
              { left: 'x -= y', right: 'x = x - y' },
              { left: 'x *= y', right: 'x = x * y' },
              { left: 'x /= y', right: 'x = x / y' },
              { left: 'x %= y', right: 'x = x % y' },
              { left: 'x **= y', right: 'x = x ** y' }
            ]},
            { type: 'code', language: 'javascript', code: 'let level = 10;\nlevel += 5;  // level is now 15\nlevel *= 2;  // level is now 30' },

            // ── Arithmetic Operators ──
            { type: 'heading', text: '3. Arithmetic Operators' },
            { type: 'list', items: [
              '+ (Addition), - (Subtraction), * (Multiplication), / (Division)',
              '** (Exponentiation — ES2016): 2 ** 3 evaluates to 8',
              '% (Remainder / Modulo): Returns the remainder of a division — useful for even/odd checks'
            ]},
            { type: 'code', language: 'javascript', code: 'console.log(10 % 3); // 1 (10 divided by 3 = 3 remainder 1)\nconsole.log(10 % 2); // 0 (even numbers always have remainder 0)' },
            { type: 'note', title: '++ and -- : Prefix vs Postfix (Critical Gotcha!)', icon: '⚠️', text: 'Postfix (variable++): evaluates to the ORIGINAL value, THEN increments.\nPrefix (++variable): increments FIRST, THEN evaluates to the NEW value.' },
            { type: 'code', language: 'javascript', code: 'let postfix = 5;\nlet prefix = 5;\n\nconsole.log(postfix++); // 5 — prints original, THEN postfix becomes 6\nconsole.log(postfix);   // 6\n\nconsole.log(++prefix);  // 6 — increments FIRST, then prints\nconsole.log(prefix);    // 6' },

            // ── Comparison Operators ──
            { type: 'heading', text: '4. Comparison Operators' },
            { type: 'text', text: 'These compare two values and return a boolean (true or false). >, <, >=, <= work as expected. The critical concept is Strict vs Loose Equality.' },
            { type: 'note', title: '== (Loose Equality) — AVOID THIS', icon: '🚫', text: 'Compares values AFTER type coercion (automatic type conversion). Leads to confusing bugs.' },
            { type: 'code', language: 'javascript', code: 'console.log(7 == "7");    // true  (string "7" coerced to number 7)\nconsole.log(0 == false);  // true  (false coerced to number 0)' },
            { type: 'note', title: '=== (Strict Equality) — ALWAYS USE THIS', icon: '✅', text: 'Compares value AND type — no coercion. If types differ, result is false immediately.' },
            { type: 'code', language: 'javascript', code: 'console.log(7 === "7");   // false (number ≠ string)\nconsole.log(0 === false); // false (number ≠ boolean)' },

            // ── Logical Operators ──
            { type: 'heading', text: '5. Logical Operators' },
            { type: 'note', title: '&& (Logical AND) — Short-Circuiting', icon: '🔗', text: 'Returns true only if BOTH operands are true. Short-circuits: if left is false, right is NEVER evaluated (prevents errors).' },
            { type: 'code', language: 'javascript', code: 'let user = null;\n// Safe — stops at `user` (falsy), never tries user.name\nif (user && user.name === "Admin") { /* ... */ }' },
            { type: 'note', title: '|| (Logical OR) — Default Values', icon: '🔀', text: 'Returns true if EITHER operand is true. Short-circuits: if left is true, right is NEVER evaluated. Commonly used for default values.' },
            { type: 'code', language: 'javascript', code: 'let username = ""; // empty string is falsy\nlet displayName = username || "Guest"; // displayName = "Guest"' },
            { type: 'note', title: '! (Logical NOT)', icon: '🔄', text: 'Inverts the boolean value. Coerces the operand to boolean first, then flips it.' },
            { type: 'code', language: 'javascript', code: 'let isLoggedIn = false;\nif (!isLoggedIn) {\n  console.log("Please log in.");\n}' },
            { type: 'note', title: 'Truthy & Falsy Values', icon: '💡', text: 'THE 6 FALSY VALUES: false, 0, "" (empty string), null, undefined, NaN\n\nEVERYTHING ELSE IS TRUTHY — including "false" (non-empty string), [] (empty array), and {} (empty object).' },

            // ── Bitwise ──
            { type: 'heading', text: '6. Bitwise Operators (Overview)' },
            { type: 'text', text: 'Bitwise operators work on the binary (base-2) representation of numbers. Less common in web development but important to know. DO NOT confuse & with && or | with ||.' },
            { type: 'analogy', items: [
              { left: '& (AND) — both bits must be 1', right: '5 & 3 → 1 (101 & 011 = 001)' },
              { left: '| (OR) — at least one bit must be 1', right: '5 | 3 → 7 (101 | 011 = 111)' },
              { left: '^ (XOR) — exactly one bit must be 1', right: '5 ^ 3 → 6 (101 ^ 011 = 110)' },
              { left: '~ (NOT) — inverts all bits', right: '~5 → -6' },
              { left: '<< (Left Shift)', right: '5 << 1 → 10 (1010)' },
              { left: '>> (Right Shift)', right: '5 >> 1 → 2 (010)' }
            ]},

            // ── Other Important ──
            { type: 'heading', text: '7. Other Important Operators' },
            { type: 'note', title: 'Ternary Operator (? :)', icon: '❓', text: 'The only operator that takes THREE operands. A compact shorthand for if...else.\n\nSyntax: condition ? expressionIfTrue : expressionIfFalse' },
            { type: 'code', language: 'javascript', code: 'let age = 20;\nlet message = (age >= 18) ? "You can vote." : "You cannot vote yet.";\nconsole.log(message); // "You can vote."' },

            // ── Operator Precedence ──
            { type: 'heading', text: '8. Operator Precedence' },
            { type: 'text', text: 'Precedence determines the order in which operators execute. Multiplication runs before addition, just like in math.' },
            { type: 'code', language: 'javascript', code: 'let result = 2 + 3 * 5; // 17, not 25 — * runs first' },
            { type: 'note', title: 'Best Practice', icon: '💡', text: 'Don\'t memorize the full precedence table. Use parentheses to make the order explicit:' },
            { type: 'code', language: 'javascript', code: 'let result = (2 + 3) * 5; // 25 — intent is perfectly clear' },

            // ── How numbers are stored ──
            { type: 'heading', text: '9. How Numbers Are Stored in JavaScript' },
            { type: 'heading', text: 'Why 0.1 + 0.2 = 0.30000000000000004' },
            { type: 'text', text: 'The computer thinks in Base 2 (binary), but we give it problems in Base 10 (decimal). The translation is not always perfect.' },
            { type: 'note', title: 'The Core Problem', icon: '🔢', text: 'Numbers like 0.1, 0.2, and 0.3 CANNOT be perfectly represented in binary — just like 1/3 cannot be written perfectly in decimal (0.333...).\n\nThe computer must cut off the infinite binary sequence, creating tiny rounding errors for each number.' },
            { type: 'analogy', items: [
              { left: '0.1 stored in binary', right: '≈ 0.10009765625 (slightly MORE than 0.1)' },
              { left: '0.2 stored in binary', right: '≈ 0.19921875 (slightly LESS than 0.2)' },
              { left: 'Their sum', right: '≈ 0.29931640625' },
              { left: '0.3 stored in binary', right: '≈ 0.2998046875 (different rounding error!)' },
              { left: 'Result', right: '0.29931640625 ≠ 0.2998046875 → the famous floating point bug' }
            ]},
            { type: 'code', language: 'javascript', code: 'console.log(0.1 + 0.2); // 0.30000000000000004\n\n// Fix: Use toFixed() for display\nconsole.log((0.1 + 0.2).toFixed(2)); // "0.30"\n\n// Fix: Multiply, operate, then divide\nconsole.log(Math.round((0.1 + 0.2) * 100) / 100); // 0.3' },

            // ── Type Conversion ──
            { type: 'heading', text: '10. Type Conversion in JavaScript' },
            { type: 'text', text: 'Converting data from one type to another is fundamental. There are two ways this happens:' },
            { type: 'analogy', items: [
              { left: 'Implicit Conversion (Coercion)', right: 'JS does it automatically (== operator). Source of bugs.' },
              { left: 'Explicit Conversion', right: 'YOU write code to convert. Safe and professional.' }
            ]},
            { type: 'note', title: 'The "First Thought" Principle', icon: '💡', text: 'Use the NAME of the type you want as a function:\n• Want a Number? Use Number()\n• Want a String? Use String()\n• Want a Boolean? Use Boolean()' },

            { type: 'note', title: 'Converting to String', icon: '📝', text: 'String() — safest and most reliable. Works for any value including null and undefined.' },
            { type: 'code', language: 'javascript', code: 'String(123);    // "123"\nString(true);   // "true"\nString(null);   // "null"\nString([1, 2]); // "1,2"' },

            { type: 'note', title: 'Converting to Number', icon: '🔢', text: 'Number() — follows clear rules:\n• "123" → 123\n• " 123 " → 123 (trims spaces)\n• true → 1, false → 0\n• null → 0\n• undefined → NaN\n• "hello" → NaN' },
            { type: 'code', language: 'javascript', code: 'Number("99.5");    // 99.5\nNumber("  100 "); // 100\nNumber("apple");  // NaN\n\n// parseInt / parseFloat — parse left to right, stop at non-numeric\nparseInt("100px");    // 100 (stops at "p")\nparseFloat("3.14em"); // 3.14 (stops at "e")\nNumber("100px");      // NaN (whole string must be valid)\n\n// Unary + trick\nlet str = "50";\nlet num = +str; // 50 (number)' },

            { type: 'note', title: 'Converting to Boolean', icon: '✅', text: 'Boolean() — the 6 falsy values become false. Everything else becomes true.' },
            { type: 'code', language: 'javascript', code: 'Boolean(0);         // false\nBoolean("");        // false\nBoolean(null);      // false\nBoolean(undefined); // false\nBoolean(NaN);       // false\n\nBoolean(100);       // true\nBoolean("hello");   // true\nBoolean("false");   // true (non-empty string!)\nBoolean([]);        // true (empty array is truthy!)\nBoolean({});        // true (empty object is truthy!)' },

            // ── Comparison Deep Dive ──
            { type: 'heading', text: '11. How to Compare Values — The Full Rules' },
            { type: 'note', title: '=== Strict Equality — One Simple Rule', icon: '✅', text: 'Rule: Are the TYPES the same? If no → false immediately. If yes → compare values normally.\n\nSpecial Case: NaN === NaN is always FALSE (NaN is not equal to itself!).' },
            { type: 'note', title: '== Loose Equality — Abstract Comparison Algorithm', icon: '⚠️', text: 'Rule 1: Same type? → use === rules.\nRule 2: null == undefined → true (the ONLY case).\nRule 3: String + Number → convert string to number, then compare.\nRule 4: Boolean involved → convert boolean to number (true→1, false→0), then restart.\nRule 5: Object + Primitive → convert object to primitive, then restart.\nRule 6: Everything else → false.' },
            { type: 'note', title: 'Relational Operators (<, >, <=, >=)', icon: '🔢', text: 'Step 1: Convert objects to primitives first.\nRule 1: BOTH sides are strings → lexicographic (dictionary) comparison.\nRule 2: All other cases → convert BOTH to numbers. null→0, undefined→NaN.\n\nSpecial: Any NaN comparison → always FALSE.' },
            { type: 'note', title: 'Decision Tree — Quick Reference', icon: '🌳', text: '=== / !==: Just check type AND value. Done.\n\n== / !=: Types same? → compare. null==undefined? → true. Boolean? → toNumber. String+num? → toNumber(string). Object? → toPrimitive.\n\n< > <= >=: Both strings? → dictionary order. Otherwise → both to numbers.' }
          ]
        },
        quiz: [
          {
            id: 1,
            question: 'What is the difference between the prefix and postfix increment operators?',
            options: [
              'There is no difference',
              'Postfix evaluates to the original value then increments; prefix increments first then evaluates',
              'Prefix evaluates to the original value; postfix increments first',
              'Postfix only works on strings'
            ],
            correct: 1,
            explanation: 'Postfix (x++) returns the original value before incrementing. Prefix (++x) increments first and then returns the new value.'
          },
          {
            id: 2,
            question: 'What does 10 % 3 evaluate to?',
            options: ['3', '0', '1', '3.33'],
            correct: 2,
            explanation: '% is the modulo (remainder) operator. 10 divided by 3 is 3 with a remainder of 1. So 10 % 3 = 1.'
          },
          {
            id: 3,
            question: 'What does console.log(7 == "7") output?',
            options: ['false', 'true', 'TypeError', 'undefined'],
            correct: 1,
            explanation: '== (loose equality) performs type coercion. The string "7" is converted to the number 7, and 7 == 7 is true. This is why you should always use === instead.'
          },
          {
            id: 4,
            question: 'What does console.log(7 === "7") output?',
            options: ['true', 'false', 'TypeError', '1'],
            correct: 1,
            explanation: '=== (strict equality) does NOT perform type coercion. It checks both value AND type. 7 (number) and "7" (string) have different types, so it returns false.'
          },
          {
            id: 5,
            question: 'Which of the following is a FALSY value in JavaScript?',
            options: ['"false"', '[]', '{}', '0'],
            correct: 3,
            explanation: 'The 6 falsy values are: false, 0, "" (empty string), null, undefined, NaN. Note: "false" (non-empty string), [] (empty array), and {} (empty object) are all TRUTHY.'
          },
          {
            id: 6,
            question: 'What is the result of: let x = username || "Guest" when username is an empty string?',
            options: ['"username"', '"" (empty string)', '"Guest"', 'undefined'],
            correct: 2,
            explanation: 'An empty string is falsy. The || operator short-circuits to the right operand when the left is falsy, so displayName becomes "Guest".'
          },
          {
            id: 7,
            question: 'Why does 0.1 + 0.2 not equal exactly 0.3 in JavaScript?',
            options: [
              'JavaScript has a bug in its + operator',
              'Decimal numbers like 0.1 and 0.2 cannot be represented exactly in binary, causing tiny rounding errors',
              'You need to use parseInt() for decimal addition',
              '0.1 and 0.2 are string values'
            ],
            correct: 1,
            explanation: 'Computers use binary (base-2). Numbers like 0.1 and 0.2 have infinite binary representations (like 1/3 in decimal). The computer truncates these, causing tiny rounding errors that accumulate.'
          },
          {
            id: 8,
            question: 'What does Number("100px") return?',
            options: ['100', '"100px"', 'NaN', 'undefined'],
            correct: 2,
            explanation: 'Number() requires the ENTIRE string to be a valid number. "100px" is not a valid number, so it returns NaN. Use parseInt("100px") instead to get 100.'
          },
          {
            id: 9,
            question: 'What does the ternary operator look like?',
            options: [
              'if (condition) ? value1 : value2',
              'condition ? valueIfTrue : valueIfFalse',
              'condition : valueIfTrue ? valueIfFalse',
              '(condition) || value1 && value2'
            ],
            correct: 1,
            explanation: 'The ternary operator takes 3 operands: condition ? expressionIfTrue : expressionIfFalse. It\'s a compact shorthand for an if...else statement.'
          },
          {
            id: 10,
            question: 'What is NaN === NaN?',
            options: ['true', 'false', 'TypeError', 'undefined'],
            correct: 1,
            explanation: 'NaN (Not a Number) is the only value in JavaScript that is NOT equal to itself! NaN === NaN is false. Use Number.isNaN() to check if a value is NaN.'
          }
        ],
        practice: [
          {
            id: 'js3-a1',
            title: 'Assignment 1: Operator Playground',
            description: 'Demonstrate the behaviour of key operators — assignment, arithmetic, and the prefix/postfix gotcha.',
            requirements: [
              'Use all 6 compound assignment operators (+=, -=, *=, /=, %=, **=) on a single variable.',
              'Show the difference between prefix (++x) and postfix (x++) by logging the value DURING the operation.',
              'Use the % operator to check if a user-defined number is even or odd.',
              'Use the ** operator to calculate 2 to the power 10.'
            ],
            starterCode: '// Assignment 1: Operator Playground\n\n// 1. Compound Assignment Operators\nlet score = 100;\nscore += 20;  console.log("+=", score);\nscore -= 10;  console.log("-=", score);\nscore *= 2;   console.log("*=", score);\nscore /= 5;   console.log("/=", score);\nscore %= 7;   console.log("%=", score);\nscore **= 2;  console.log("**=", score);\n\n// 2. Prefix vs Postfix\nlet a = 5;\nconsole.log("postfix:", a++); // What prints?\nconsole.log("after postfix:", a);\n\nlet b = 5;\nconsole.log("prefix:", ++b);  // What prints?\nconsole.log("after prefix:", b);\n\n// 3. Even / Odd check with %\nlet num = 17;\nconsole.log(num + " is " + (num % 2 === 0 ? "even" : "odd"));\n\n// 4. Exponentiation\nconsole.log("2^10 =", 2 ** 10);'
          },
          {
            id: 'js3-a2',
            title: 'Assignment 2: Strict vs Loose Equality',
            description: 'Explore the difference between == and === by testing surprising cases.',
            requirements: [
              'Compare 0 == false and 0 === false — explain why they differ.',
              'Compare null == undefined and null === undefined.',
              'Compare "" == false and "" === false.',
              'Demonstrate that NaN === NaN is false, and use Number.isNaN() to check for NaN correctly.'
            ],
            starterCode: '// Assignment 2: Strict vs Loose Equality\n\n// 1. 0 vs false\nconsole.log("0 == false:", 0 == false);   // ?\nconsole.log("0 === false:", 0 === false); // ?\n// Why do they differ?\n\n// 2. null vs undefined\nconsole.log("null == undefined:", null == undefined);   // ?\nconsole.log("null === undefined:", null === undefined); // ?\n\n// 3. empty string vs false\nconsole.log(|\'"" == false:\', "" == false);   // ?\nconsole.log(\'"" === false:\', "" === false); // ?\n\n// 4. NaN quirk\nconsole.log("NaN === NaN:", NaN === NaN);       // ?\nconsole.log("isNaN check:", Number.isNaN(NaN)); // The correct way!'
          },
          {
            id: 'js3-a3',
            title: 'Assignment 3: Type Conversion Practice',
            description: 'Practise explicit type conversion using String(), Number(), and Boolean().',
            requirements: [
              'Convert the number 42, the boolean true, and null to strings. Log each.',
              'Convert "99.9", "  50  " (with spaces), and "hello" to numbers. Log each.',
              'Convert 0, "", [], {}, null, and "false" to booleans. Log each.',
              'Use parseInt("45.9px") and compare with Number("45.9px") — explain the difference.'
            ],
            starterCode: '// Assignment 3: Type Conversion Practice\n\n// 1. To String\nconsole.log(String(42));\nconsole.log(String(true));\nconsole.log(String(null));\n\n// 2. To Number\nconsole.log(Number("99.9"));\nconsole.log(Number("  50  "));\nconsole.log(Number("hello"));\n\n// 3. To Boolean\nconsole.log(Boolean(0));\nconsole.log(Boolean(""));\nconsole.log(Boolean([]));\nconsole.log(Boolean({}));\nconsole.log(Boolean(null));\nconsole.log(Boolean("false")); // Surprising?\n\n// 4. parseInt vs Number\nconsole.log(parseInt("45.9px"));\nconsole.log(Number("45.9px"));\n// Explain the difference:'
          },
          {
            id: 'js3-a4',
            title: 'Assignment 4: Build a Grade Calculator',
            description: 'Use operators, comparison, and the ternary operator to build a simple grade calculator.',
            requirements: [
              'Declare a variable `marks` with a value between 0 and 100.',
              'Use the ternary operator to assign a grade: A (>=90), B (>=75), C (>=60), D (>=40), F (below 40).',
              'Use the && operator to check if marks are valid (between 0 and 100).',
              'Log: "Marks: X | Grade: Y | Pass/Fail: Z" using template literals.'
            ],
            starterCode: '// Assignment 4: Grade Calculator\n\nconst marks = 78; // Change this value to test\n\n// 1. Validate marks (must be 0–100)\nconst isValid = marks >= 0 && marks <= 100;\nconsole.log("Valid input:", isValid);\n\n// 2. Determine grade using ternary\nconst grade = marks >= 90 ? "A" :\n              marks >= 75 ? "B" :\n              marks >= 60 ? "C" :\n              marks >= 40 ? "D" : "F";\n\n// 3. Pass or Fail\nconst result = marks >= 40 ? "Pass" : "Fail";\n\n// 4. Log the result\nconsole.log(`Marks: ${marks} | Grade: ${grade} | ${result}`);'
          }
        ]
      },
      // ═══════════════════════════════════════════════════════════
      // JS DAY 4 — If-Else and Loops
      // ═══════════════════════════════════════════════════════════
      {
        id: 'js4',
        day: 4,
        title: 'If-Else and Loops',
        isUnlocked: false,
        isCompleted: false,
        content: {
          sections: [
            { type: 'heading', text: 'If-Else in JavaScript' },
            { type: 'text', text: 'It\'s like deciding what to wear:' },
            { type: 'list', ordered: true, items: [
              'Question 1 (if): "Is it raining?" -> YES? Put on a raincoat. NO? Move to next question.',
              'Question 2 (else if): "Okay, is it sunny?" -> YES? Put on sunglasses. NO? Move to next question.',
              'The Fallback (else): "Since nothing else was true..." -> Just wear a regular sweater.'
            ]},
            { type: 'heading', text: '1. The Basic if Statement' },
            { type: 'text', text: 'The if statement is the starting point. It checks a single condition. If that condition is true, the code inside its curly braces {} will run. If false, it is skipped.' },
            { type: 'code', language: 'javascript', code: 'if (condition) {\n  // This code runs only if the condition is true.\n}' },
            { type: 'code', language: 'javascript', code: 'let temperature = 30;\n\nif (temperature > 25) {\n  console.log("It\'s a hot day! Wear shorts.");\n}' },
            { type: 'output', text: 'It\'s a hot day! Wear shorts.' },
            { type: 'heading', text: '2. The if...else Statement' },
            { type: 'text', text: 'The else statement provides a "fallback" or "alternative" action. It runs only when the initial if condition is false.' },
            { type: 'code', language: 'javascript', code: 'if (condition) {\n  // This code runs if the condition is true.\n} else {\n  // This code runs if the condition is false.\n}' },
            { type: 'code', language: 'javascript', code: 'let age = 16;\n\nif (age >= 18) {\n  console.log("You are old enough to vote.");\n} else {\n  console.log("You are not old enough to vote yet.");\n}' },
            { type: 'output', text: 'You are not old enough to vote yet.' },
            { type: 'heading', text: '3. The if...else if...else Chain' },
            { type: 'text', text: 'This is the full decision-making chain. It allows you to check multiple different conditions in order. The chain is evaluated from top to bottom. The very first condition that is true gets its code block executed, and the rest skipped.' },
            { type: 'code', language: 'javascript', code: 'if (condition1) {\n  // Runs if condition1 is true.\n} else if (condition2) {\n  // Runs if condition1 is false AND condition2 is true.\n} else if (condition3) {\n  // Runs if 1 and 2 are false AND condition3 is true.\n} else {\n  // Runs if ALL previous conditions were false.\n}' },
            { type: 'code', language: 'javascript', code: 'let score = 85;\nlet grade;\n\nif (score >= 90) {\n  grade = "A";\n} else if (score >= 80) {\n  grade = "B";\n} else if (score >= 70) {\n  grade = "C";\n} else if (score >= 60) {\n  grade = "D";\n} else {\n  grade = "F";\n}\n\nconsole.log(`Your grade is: ${grade}`);' },
            { type: 'heading', text: 'Loop in JavaScript' },
            { type: 'analogy', items: [
              { left: 'for loops', right: 'Best for specific number of iterations (counter)' },
              { left: 'while loops', right: 'Best when exiting is based on a condition (game health)' },
              { left: 'do...while loops', right: 'Best when you MUST run the code at least once (prompting user)' }
            ]},
            { type: 'heading', text: '1. The for Loop' },
            { type: 'text', text: 'The for loop is the most common type. It\'s perfect when you know exactly how many times you want to repeat an action. Think of it like setting a timer for a specific number of repetitions.' },
            { type: 'code', language: 'javascript', code: 'for (initialization; condition; final-expression) { ... }' },
            { type: 'list', items: [
              'Initialization: Runs only once at the beginning to create your counter variable.',
              'Condition: Checked before each repetition. If true, the code runs. If false, the loop stops.',
              'Final-Expression: Runs after each repetition to increment your counter.'
            ]},
            { type: 'code', language: 'javascript', code: 'for (let i = 1; i <= 5; i++) {\n  console.log("This is repetition number:", i);\n}' },
            { type: 'output', text: 'This is repetition number: 1\nThis is repetition number: 2\nThis is repetition number: 3\nThis is repetition number: 4\nThis is repetition number: 5' },
            { type: 'heading', text: '2. The while Loop' },
            { type: 'text', text: 'The while loop is simpler. It\'s perfect when you want to keep looping as long as a certain condition is true, but you don\'t know ahead of time how many repetitions that will be.' },
            { type: 'code', language: 'javascript', code: 'let playerHealth = 10;\n\nwhile (playerHealth > 0) {\n  console.log(`Player health is ${playerHealth}. Attacking monster!`);\n  playerHealth -= 3; // Player takes 3 damage\n\n  if (playerHealth <= 0) {\n    console.log("Player has been defeated!");\n  }\n}' },
            { type: 'output', text: 'Player health is 10. Attacking monster!\nPlayer health is 7. Attacking monster!\nPlayer health is 4. Attacking monster!\nPlayer health is 1. Attacking monster!\nPlayer has been defeated!' },
            { type: 'mistake', title: 'Critical Danger: Infinite Loops', wrong: 'let count = 0;\nwhile (count < 5) {\n  console.log(count);\n} // count never changes!', correct: 'let count = 0;\nwhile (count < 5) {\n  console.log(count);\n  count++;\n}' },
            { type: 'heading', text: '3. The do...while Loop' },
            { type: 'text', text: 'A less common variation. Its unique feature is that the code inside the loop is guaranteed to run at least once. The condition is checked after the code runs, not before.' },
            { type: 'code', language: 'javascript', code: 'let userResponse;\n\ndo {\n  // prompt() only works in the browser environment\n  userResponse = prompt("Please type \'yes\' to continue:");\n} while (userResponse !== "yes");\n\nconsole.log("You typed \'yes\'. Thank you!");' }
          ]
        },
        quiz: [
          {
            id: 1,
            question: "What does the `if` statement do?",
            options: [
              "Runs code multiple times",
              "Checks a single condition and runs code if true",
              "Checks multiple conditions and runs code if false",
              "Stops a loop"
            ],
            correct: 1,
            explanation: "The `if` statement evaluates a single condition and executes its block of code only if the condition evaluates to true."
          },
          {
            id: 2,
            question: "Which statement provides a fallback action if the initial condition is false?",
            options: ["else", "else if", "then", "fallback"],
            correct: 0,
            explanation: "The `else` statement acts as a fallback and executes its code block if the preceding `if` condition evaluates to false."
          },
          {
            id: 3,
            question: "In an `if...else if...else` chain, how many blocks of code will run?",
            options: [
              "All blocks where the condition is true",
              "Only the very first block whose condition evaluates to true",
              "The very last block whose condition evaluates to true",
              "None of the blocks"
            ],
            correct: 1,
            explanation: "The chain evaluates from top to bottom. The very first condition that is true gets executed, and the rest of the chain is skipped."
          },
          {
            id: 4,
            question: "When is a `for` loop most appropriate to use?",
            options: [
              "When you want an infinite loop",
              "When you know exactly how many times to repeat an action",
              "When you want to check a condition after the code runs",
              "When you don't know how many repetitions are needed"
            ],
            correct: 1,
            explanation: "A `for` loop contains a built-in initialization and counter, making it ideal for when you know the exact number of iterations needed."
          },
          {
            id: 5,
            question: "What separates the three parts inside the parentheses of a `for` loop?",
            options: ["Commas (,)", "Colons (:)", "Semicolons (;)", "Spaces"],
            correct: 2,
            explanation: "The three parts of a `for` loop (initialization; condition; final-expression) MUST be separated by semicolons (;)."
          },
          {
            id: 6,
            question: "Which part of the `for` loop runs only once at the very beginning?",
            options: ["The condition", "The final-expression", "The curly braces", "The initialization"],
            correct: 3,
            explanation: "The initialization (e.g., `let i = 0`) runs exactly once at the beginning to set up the counter variable."
          },
          {
            id: 7,
            question: "When is a `while` loop a better choice than a `for` loop?",
            options: [
              "When you need a counter variable `i`",
              "When you want to keep looping based on a truthy condition, without knowing the number of repetitions",
              "When you only want to check strings",
              "When you want the loop to run backwards automatically"
            ],
            correct: 1,
            explanation: "Because the `while` loop only requires a condition, it's perfect for dynamic durations (like waiting for a player's health to drop to 0)."
          },
          {
            id: 8,
            question: "What is the critical danger of not updating the condition variable inside a `while` loop?",
            options: [
              "The program will skip the loop entirely",
              "The program will throw a syntax error",
              "The program will get stuck in an infinite loop and crash",
              "The condition will default to false automatically"
            ],
            correct: 2,
            explanation: "If the condition variable is never updated inside the loop, the condition will always be true, creating an infinite loop that crashes the application."
          },
          {
            id: 9,
            question: "What is the defining feature of a `do...while` loop?",
            options: [
              "It checks the condition before running the code",
              "The code block is guaranteed to run at least once",
              "It can only be used with numbers",
              "It automatically exits after 10 loops"
            ],
            correct: 1,
            explanation: "Because a `do...while` loop evaluates its condition strictly at the END of the loop, the code inside the block executes at least once regardless of the condition."
          },
          {
            id: 10,
            question: "In a `while` loop, where does the variable initialisation and updates usually happen?",
            options: [
              "Both inside the loop",
              "Both inside the parentheses",
              "Initialization before the loop, update inside the loop",
              "Both after the loop finishes"
            ],
            correct: 2,
            explanation: "In a `while` loop, you initialize the variable outside/before the loop starts, and you update it inside the loop's body so the condition eventually changes."
          }
        ],
        practice: [
          {
            id: 'js4-a1',
            title: 'Assignment 1: Temperature Check',
            description: 'Write an if...else chain to output what to wear based on the temperature.',
            requirements: [
              'Declare a variable `temp` and assign it a number.',
              'If the temp is greater than 30, log "It is hot! Wear shorts."',
              'If the temp is between 20 and 30, log "It is warm. Wear a t-shirt."',
              'Else, log "It is cold. Wear a jacket."'
            ],
            starterCode: '// Type your if...else block below\nlet temp = 25;\n'
          },
          {
            id: 'js4-a2',
            title: 'Assignment 2: The for Loop Counter',
            description: 'Create a for loop that counts backwards from 10 down to 1.',
            requirements: [
              'Use a `for` loop.',
              'Initialize the counter at 10.',
              'The condition should keep looping as long as the counter is greater than 0.',
              'The final expression should decrement the counter (--).',
              'Log the counter inside the loop. After the loop, log "Blastoff!".'
            ],
            starterCode: '// Write your backwards counting for loop here\n\nconsole.log("Blastoff!");'
          },
          {
            id: 'js4-a3',
            title: 'Assignment 3: While Loop Enemy Damage',
            description: 'Simulate combat damage with a while loop until the enemy is defeated.',
            requirements: [
              'Declare `enemyHealth = 50`.',
              'Create a while loop that runs as long as `enemyHealth > 0`.',
              'Inside the loop, subtract 15 from enemyHealth each time.',
              'Inside the loop, log "Enemy hit! Health is now ___".',
              'Outside the loop, log "Enemy defeated!".'
            ],
            starterCode: 'let enemyHealth = 50;\n\n// Write your while loop here\n'
          }
        ]
      },
      // ═══════════════════════════════════════════════════════════
      // JS DAY 5 — Number and Math
      // ═══════════════════════════════════════════════════════════
      {
        id: 'js5',
        day: 5,
        title: 'Number and Math',
        isUnlocked: false,
        isCompleted: false,
        content: {
          sections: [
            { type: 'heading', text: '1. Introduction: The Unified Number Type' },
            { type: 'text', text: 'In JavaScript, there is only one type for numbers: `number`. This single type is used to represent both integers (whole numbers like `10`, `-50`) and floating-point numbers (decimals like `3.14`, `-0.5`).' },
            { type: 'text', text: '**The Core Standard:** All numbers in JavaScript are implemented as 64-bit double-precision floating-point numbers, following the international IEEE 754 standard.' },
            { type: 'code', language: 'javascript', code: 'let integer = 100;\nlet float = 99.5;\n\nconsole.log(typeof integer); // "number"\nconsole.log(typeof float);   // "number"' },
            { type: 'heading', text: '2. Creating Numbers' },
            { type: 'list', items: [
              'Standard Literals: 25 (integer), 12.34 (floating-point)',
              'Exponential Notation: 1e9 (1 billion), 5e-6 (0.000005)',
              'Other Bases: 0xFF (hexadecimal/base 16), 0b1010 (binary/base 2), 0o77 (octal/base 8)'
            ]},
            { type: 'code', language: 'javascript', code: 'let billion = 1e9;  // 1 followed by 9 zeros -> 1000000000\nlet hex = 0xFF; // Hexadecimal (base 16) -> 255 in decimal' },
            { type: 'heading', text: '3. The "Gotcha": Floating-Point Inaccuracy' },
            { type: 'text', text: 'Because numbers are stored in a binary floating-point format (base-2), they cannot perfectly represent all decimal fractions (base-10). This leads to rounding errors.' },
            { type: 'code', language: 'javascript', code: 'console.log(0.1 + 0.2); // Outputs: 0.30000000000000004\nconsole.log(0.1 + 0.2 === 0.3); // false' },
            { type: 'list', ordered: true, items: [
              'For financial calculations: Never use floating-point numbers. Work with integers (e.g., store money in cents).',
              'For display: Use the `.toFixed()` method to round the result to a specific number of decimal places.',
              'For comparison: Check if two numbers are "close enough" using `Number.EPSILON`.'
            ]},
            { type: 'heading', text: '4. Special Numeric Values' },
            { type: 'text', text: 'There are three special values that are technically of type `number`.' },
            { type: 'list', items: [
              'Infinity: Represents a value larger than the largest possible number. (1 / 0)',
              '-Infinity: Represents a value smaller than the smallest possible number. (-1 / 0)',
              'NaN (Not a Number): Represents the result of an invalid or undefined mathematical operation. It\'s the error code for failed math.'
            ]},
            { type: 'code', language: 'javascript', code: 'console.log("hello" / 2);    // NaN\nconsole.log(typeof NaN);     // "number"\nconsole.log(NaN === NaN); // false (NaN is never equal to itself)' },
            { type: 'heading', text: '5. Important Number Properties and Methods' },
            { type: 'list', items: [
              'Number.MAX_SAFE_INTEGER: The largest integer that can be safely represented without losing precision (2^53 - 1).',
              'Number.isNaN(value): The reliable way to check if a value is actually NaN, without type coercion.',
              'number.toString(base): Converts a number to a string, optionally specifying base (2 for binary, 16 for hex).',
              'number.toFixed(digits): Formats a number to a fixed number of decimal places and returns a STRING.'
            ]},
            { type: 'code', language: 'javascript', code: 'let price = 19.991234;\nconsole.log(price.toFixed(2)); // "19.99"\n\nconsole.log(Number.isNaN("blue")); // false (it\'s a string, not NaN)' },
            { type: 'heading', text: '6. The Math Object' },
            { type: 'text', text: 'JavaScript provides a built-in `Math` object that has properties and methods for mathematical constants and functions.' },
            { type: 'list', items: [
              'Math.round(x): Standard rounding to the nearest integer.',
              'Math.floor(x): Rounds down to the nearest integer.',
              'Math.ceil(x): Rounds up to the nearest integer.',
              'Math.max() and Math.min(): Returns the largest or smallest of the given numbers.'
            ]},
            { type: 'code', language: 'javascript', code: 'console.log(Math.round(4.7)); // 5\nconsole.log(Math.floor(4.7)); // 4\nconsole.log(Math.ceil(4.2));  // 5\nconsole.log(Math.max(10, -5, 100, 0)); // 100' },
            { type: 'heading', text: '7. The Core Tool: Math.random()' },
            { type: 'text', text: 'JavaScript\'s only built-in tool for randomness is `Math.random()`. It returns a random floating-point number between 0 (inclusive) and 1 (exclusive).' },
            { type: 'heading', text: 'Building a Random Integer Function Step-by-Step' },
            { type: 'text', text: 'The goal is to get a random whole number from 1 to 10 (inclusive).' },
            { type: 'list', ordered: true, items: [
              'Scale up the range: Math.random() * 10 (This gives a number from 0 to 9.999...)',
              'Get rid of the decimals using Math.floor(): Math.floor(Math.random() * 10) (This gives an integer from 0 to 9)',
              'Shift the range to the correct starting point: Math.floor(Math.random() * 10) + 1 (This gives an integer from 1 to 10)'
            ]},
            { type: 'code', language: 'javascript', code: 'function getRandomInt(min, max) {\n  const range = max - min + 1;\n  const scaled = Math.random() * range;\n  const floored = Math.floor(scaled);\n  return floored + min;\n}\n\nconsole.log("Random dice roll (1 to 6):", getRandomInt(1, 6));' },
            { type: 'output', text: 'Random dice roll (1 to 6): 4' }
          ]
        },
        quiz: [
          { id: 1, question: "How many numeric types does JavaScript have for regular use?", options: ["Integer, Float, Double", "Only 'number'", "Number and Int", "Float and Decimal"], correct: 1, explanation: "JavaScript only has the `number` type, which is a 64-bit double-precision floating-point format used for both integers and decimals." },
          { id: 2, question: "What is `1e9` shorthand for?", options: ["1 to the power of 9 (1)", "1 followed by 9 zeros (1,000,000,000)", "0.000000001", "1,000,000,000,000"], correct: 1, explanation: "`e` stands for exponent. `1e9` is 1 times 10^9, which is 1,000,000,000." },
          { id: 3, question: "Why does `0.1 + 0.2` not perfectly equal `0.3`?", options: ["Because Javascript is an interpreted language", "Because `+` converts numbers to strings accidentally", "Because floating-point numbers cannot perfectly represent all decimal fractions, resulting in tiny rounding errors", "Because `0.3` is an invalid number"], correct: 2, explanation: "Floating-point precision limits cause small rounding errors when attempting to perfectly represent infinite binary decimals." },
          { id: 4, question: "What does `typeof NaN` return?", options: ["'string'", "'undefined'", "'NaN'", "'number'"], correct: 3, explanation: "Even though NaN stands for 'Not a Number', it is technically considered a member of the numeric data type." },
          { id: 5, question: "What is special about the value `NaN` when comparing it to itself?", options: ["It crashes the browser", "It equals Infinity", "It is the only value in JavaScript that is NOT equal to itself (NaN === NaN is false)", "It equals 0"], correct: 2, explanation: "`NaN === NaN` evaluates to false. It represents a mathematically undefined or failed operation." },
          { id: 6, question: "What's the difference between the global `isNaN()` and `Number.isNaN()`?", options: ["`Number.isNaN()` coerces values first, `isNaN()` does not", "`isNaN()` coerces values first, `Number.isNaN()` does not", "They are exactly the same", "`Number.isNaN()` only works on integers"], correct: 1, explanation: "`Number.isNaN()` is strictly for values that are ACTUALLY the literal value `NaN`. `isNaN()` will try to convert strings like 'hello' to a number first, resulting in `NaN`, and thus incorrectly returning true." },
          { id: 7, question: "If you call `(19.991).toFixed(2)`, what does it return?", options: ["The number 19.99", "The string '19.99'", "The number 20", "An error"], correct: 1, explanation: "`.toFixed()` formats the number to 2 decimal places and ALWAYS returns a string." },
          { id: 8, question: "Which Math method rounds a number DOWN to the nearest integer?", options: ["Math.round()", "Math.ceil()", "Math.floor()", "Math.trunc()"], correct: 2, explanation: "`Math.floor()` always rounds down towards negative infinity (e.g., 4.9 becomes 4)." },
          { id: 9, question: "What is the exact range of values generated by `Math.random()`?", options: ["1 to 10", "1 to 100", "0 (inclusive) up to 1 (exclusive)", "0 (inclusive) up to 1 (inclusive)"], correct: 2, explanation: "`Math.random()` can return 0, and anything up to 0.999..., but it will never retun exactly 1." },
          { id: 10, question: "To generate a random integer from `min` (inclusive) to `max` (inclusive), what is the correct formula?", options: ["Math.ceil(Math.random() * max) + min", "Math.floor(Math.random() * (max - min + 1)) + min", "Math.round(Math.random() * max)", "Math.random() * max - min"], correct: 1, explanation: "You multiply by the total possible outcomes `(max - min + 1)`, floor it to remove decimals, and then add `min` to shift the range to your starting point." }
        ],
        practice: [
          {
            id: 'js5-a1',
            title: 'Assignment 1: Number Bases and Formatting',
            description: 'Convert a number into different bases and format it.',
            requirements: [
              'Declare a variable `color` assigned to `255`.',
              'Log `color` converted to a hexadecimal string.',
              'Log `color` converted to a binary string.',
              'Declare `price` as `19.956`. Log it formatted to exactly 2 decimal places as a string.'
            ],
            starterCode: 'let color = 255;\n// Your code here\n\nlet price = 19.956;\n// Your code here\n'
          },
          {
            id: 'js5-a2',
            title: 'Assignment 2: Handling NaN correctly',
            description: 'Practice checking for NaN the correct way.',
            requirements: [
              'Create a variable `badMath` which is the result of multiplying the string "apple" by 5.',
              'Log the result of checking if `badMath` is NaN using the global `isNaN()` function.',
              'Log the result of checking if the string "hello" is NaN using `Number.isNaN()`. Notice the difference.',
              'Log the result of `badMath === NaN`. Notice what it returns.'
            ],
            starterCode: 'let badMath = "apple" * 5;\n// Your code here\n'
          },
          {
            id: 'js5-a3',
            title: 'Assignment 3: The Random Item Picker',
            description: 'Use the Math.random() formula to pick a random index.',
            requirements: [
              'Write a function `getRandomIndex(maxLength)` that returns a random integer from 0 up to (maxLength - 1).',
              'Use the formula `Math.floor(Math.random() * maxLength)`. NOTE: Since 0 is min, max-min+1 = (maxLength-1) - 0 + 1 = maxLength.',
              'Call your function passing 5 as the length, and log the result.'
            ],
            starterCode: 'function getRandomIndex(maxLength) {\n  // Your code here \n}\n\nconsole.log("Random index from 5 items:", getRandomIndex(5));\n'
          }
        ]
      },
      // ═══════════════════════════════════════════════════════════
      // JS DAY 6 — Strings in JS
      // ═══════════════════════════════════════════════════════════
      {
        id: 'js6',
        day: 6,
        title: 'Strings in JavaScript',
        isUnlocked: false,
        isCompleted: false,
        content: {
          sections: [
            { type: 'heading', text: '1. Introduction: What is a String?' },
            { type: 'text', text: 'A string is a primitive data type in JavaScript used to represent a sequence of characters. Anything you can type—letters, numbers, symbols, punctuation—can be part of a string.' },
            { type: 'list', items: [
              'It\'s a primitive: This means strings are immutable.',
              'It\'s indexed: Each character has a numerical position starting from zero.',
              'It\'s object-like: Although primitive, it has methods and properties we can use (like `.length`).'
            ]},
            { type: 'heading', text: '2. Creating Strings' },
            { type: 'text', text: 'There are three ways to create a string literal in JavaScript.' },
            { type: 'list', ordered: true, items: [
              'Single Quotes (\'...\'): `let singleQuoted = \'Hello, world!\';`',
              'Double Quotes ("..."): Functionally identical to single quotes. Useful when string contains singles.',
              'Template Literals (`...` - ES6): The most powerful modern way, uses backticks.'
            ]},
            { type: 'code', language: 'javascript', code: 'let doubleQuoted = "He said, \'Hello!\'";\nlet templateLiteral = `This is a template literal.`;' },
            { type: 'heading', text: '3. Core Properties and Concepts' },
            { type: 'heading', text: 'A. The .length Property' },
            { type: 'text', text: 'Every string has a `.length` property that tells you how many characters it contains.' },
            { type: 'code', language: 'javascript', code: 'let greeting = "Hello";\nconsole.log(greeting.length); // Outputs: 5' },
            { type: 'heading', text: 'B. Accessing Individual Characters' },
            { type: 'text', text: 'You can access a character at a specific position using square bracket notation `[]`. The first character is at index `0`.' },
            { type: 'code', language: 'javascript', code: 'let message = "JavaScript";\nconsole.log(message[0]); // "J"\n\n// Common pattern to get the last character:\nconsole.log(message[message.length - 1]); // "t"' },
            { type: 'heading', text: 'C. The Golden Rule: Strings are Immutable' },
            { type: 'text', text: 'This is the most critical concept. You cannot change a string in place. Any method that appears to modify a string will always return a brand new string, leaving the original untouched.' },
            { type: 'code', language: 'javascript', code: 'let name = "alex";\nname[0] = "A"; // Fails silently, does nothing.\nconsole.log(name); // "alex"\n\nlet upperName = name.toUpperCase(); // Returns a brand NEW string\nconsole.log(upperName); // "ALEX"\nconsole.log(name);      // "alex" (original is unchanged)' },
            { type: 'heading', text: '4. Common and Essential String Methods' },
            { type: 'text', text: 'These methods use the dot notation. They all return new strings.' },
            { type: 'heading', text: 'A. Changing Case' },
            { type: 'list', items: [
              '`.toUpperCase()`: Returns new string in uppercase.',
              '`.toLowerCase()`: Returns new string in lowercase.'
            ]},
            { type: 'heading', text: 'B. Finding Substrings' },
            { type: 'list', items: [
              '`.indexOf(substring)`: Returns index of FIRST occurrence. Returns -1 if not found.',
              '`.lastIndexOf(substring)`: Returns index of LAST occurrence.',
              '`.includes(substring)`: ES6 addition. Returns true or false.'
            ]},
            { type: 'code', language: 'javascript', code: 'let sentence = "The fox jumps over the lazy fox.";\nconsole.log(sentence.indexOf("fox"));     // 4\nconsole.log(sentence.indexOf("cat"));     // -1\nconsole.log(sentence.includes("jumps"));  // true' },
            { type: 'heading', text: 'C. Extracting Substrings' },
            { type: 'list', items: [
              '`.slice(startIndex, endIndex)`: Extracts a section. `endIndex` is exclusive. Supports negative indices.',
              '`.substring(startIndex, endIndex)`: Similar to slice but no negative indices.'
            ]},
            { type: 'code', language: 'javascript', code: 'let text = "JavaScript";\nconsole.log(text.slice(0, 4));  // "Java" (indices 0, 1, 2, 3)\nconsole.log(text.slice(-6));    // "Script" (last 6 chars)' },
            { type: 'heading', text: 'D. Replacing Substrings' },
            { type: 'list', items: [
              '`.replace(searchValue, newValue)`: Replaces the FIRST occurrence only.',
              '`.replaceAll(searchValue, newValue)`: ES2021 addition. Replaces ALL occurrences.'
            ]},
            { type: 'code', language: 'javascript', code: 'let greeting = "hello world, hello there";\nconsole.log(greeting.replace("hello", "hi")); // "hi world, hello there"\nconsole.log(greeting.replaceAll("hello", "hi")); // "hi world, hi there"' },
            { type: 'heading', text: 'E. Cleaning Up Whitespace & F. Splitting' },
            { type: 'list', items: [
              '`.trim()`: Removes whitespace from both ends.',
              '`.split(separator)`: Splits a string into an array. Super useful!'
            ]},
            { type: 'code', language: 'javascript', code: 'let words = "The quick brown fox";\nlet wordArray = words.split(" "); // ["The", "quick", "brown", "fox"]' },
            { type: 'heading', text: '5. Template Literals (ES6) - The Modern Way' },
            { type: 'text', text: 'Created with backticks (\\`). They allow string interpolation and multi-line formatting without `+` or `\\\\n`.' },
            { type: 'code', language: 'javascript', code: 'let name = "Alice";\nlet age = 30;\n\n// Interpolation:\nlet message = `Hello, my name is ${name} and I am ${age} years old.`;\n\n// Multi-line:\nlet htmlNew = `\n  <div>\n    <p>Hello</p>\n  </div>\n`;' }
          ]
        },
        quiz: [
          { id: 1, question: "Which of the following is NOT a valid way to create a string in JavaScript?", options: ["Single Quotes ('...')", "Double Quotes (\"...\")", "Template Literals (`...`)", "Forward Slashes (/.../)"], correct: 3, explanation: "Forward slashes are used for Regular Expressions, not standard strings. Single quotes, double quotes, and backticks (template literals) create strings." },
          { id: 2, question: "What does it mean that strings are 'immutable'?", options: ["They cannot be reassigned to a variable", "They can only contain letters, not numbers", "The characters inside a string cannot be changed 'in-place'. Changing them returns a new string.", "They don't have properties like .length"], correct: 2, explanation: "Immutability means you can't modify an existing string. Operations like `.toUpperCase()` leave the original untouched and return a brand new modified string." },
          { id: 3, question: "What is the index of the first character in a string?", options: ["0", "1", "-1", "length"], correct: 0, explanation: "JavaScript uses zero-based indexing, so the first letter is always at index 0." },
          { id: 4, question: "Given `let str = 'Apple';`, how would you access the last letter ('e') using brackets dynamically?", options: ["str[4]", "str[str.length]", "str[str.length - 1]", "str[-1]"], correct: 2, explanation: "Since length is 5, but indexing starts at 0 (max index 4), `str.length - 1` safely targets the last character regardless of how long the string is." },
          { id: 5, question: "If `let name = 'bob';` and then we run `name[0] = 'B';`, what is the value of `name`?", options: ["'Bob'", "Error", "'bob'", "'B'"], correct: 2, explanation: "Because strings are immutable, direct array-like assignment fails silently. `name` remains 'bob'." },
          { id: 6, question: "What does `indexOf` return if the substring is NOT found?", options: ["false", "undefined", "0", "-1"], correct: 3, explanation: "`.indexOf()` returns the number -1 strictly when it cannot find any matching substring." },
          { id: 7, question: "Given `let txt = 'JavaScript'`, what does `txt.slice(0, 4)` return?", options: ["'Jav'", "'Java'", "'JavaS'", "Error"], correct: 1, explanation: "`.slice(0, 4)` starts at index 0 and extracts up to, but NOT including, index 4. So it grabs 0, 1, 2, 3 resulting in 'Java'." },
          { id: 8, question: "What is the difference between `replace` and `replaceAll`?", options: ["No difference", "`replace` uses regex, `replaceAll` uses strings", "`replace` only affects the first match by default, `replaceAll` impacts every match", "`replaceAll` works on arrays"], correct: 2, explanation: "`.replace('a', 'b')` will only swap the very first 'a' it finds. `.replaceAll('a', 'b')` grabs every single one." },
          { id: 9, question: "How does the `.split()` method work?", options: ["It breaks a string into an Array divided by a separator you provide", "It splits a string completely in half", "It removes whitespace", "It splices two strings together"], correct: 0, explanation: "`.split(', ')` will break a string 'a, b, c' into an array `['a', 'b', 'c']`." },
          { id: 10, question: "What is the syntax for injecting variables into a Template Literal?", options: ["#{var}", "${var}", "{{var}}", "<%var%>"], correct: 1, explanation: "Using backticks (``), you inject variables via `${...}` directly within the string." }
        ],
        practice: [
          {
            id: 'js6-a1',
            title: 'Assignment 1: Character Extractor',
            description: 'Extract specific letters from a string based on index and length.',
            requirements: [
              'Declare `company = "Microsoft"`.',
              'Log its total length.',
              'Log the very first letter.',
              'Log the very last letter dynamically (using length).'
            ],
            starterCode: 'let company = "Microsoft";\n// Your code here\n'
          },
          {
            id: 'js6-a2',
            title: 'Assignment 2: String Slicing and Replacing',
            description: 'Practice the .slice() and .replaceAll() methods.',
            requirements: [
              'Declare `phrase = "I love apple pie and apple juice."`.',
              'Extract just the word "love" using slice() and log it.',
              'Replace ALL instances of "apple" with "orange" and save it to a new variable. Log it.',
              'Log the original `phrase` variable to prove it didn\'t change (immutability).'
            ],
            starterCode: 'let phrase = "I love apple pie and apple juice.";\n// Your code here\n'
          },
          {
            id: 'js6-a3',
            title: 'Assignment 3: The Profile Generator (Template Literals)',
            description: 'Use modern template literals to build a profile string.',
            requirements: [
              'Create variables for `firstName`, `lastName`, `city`, and `hobby`.',
              'Construct a multi-line profile string wrapped in backticks.',
              'Inject the variables directly using `${...}`.',
              'The string should look like: \nName: [First Last]\nLocation: [City]\nFavorite Hobby: [Hobby]'
            ],
            starterCode: '// Your variables and profile string here\n\nconsole.log(profile);'
          }
        ]
      }
    ]
  }
];
