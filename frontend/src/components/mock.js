// Mock data for story writing app

export const storyCategories = [
  {
    id: 1,
    name: "Adventure",
    description: "Exciting journeys and discoveries",
    icon: "compass",
    color: "bg-gradient-to-br from-orange-100 to-orange-200",
    prompts: [
      "You discover a hidden treasure map in your backyard...",
      "A magical door appears in your school playground...",
      "You find a talking animal who needs your help..."
    ]
  },
  {
    id: 2,
    name: "Fantasy",
    description: "Magical worlds and creatures",
    icon: "sparkles",
    color: "bg-gradient-to-br from-purple-100 to-purple-200",
    prompts: [
      "You wake up with magical powers...",
      "A friendly dragon visits your town...",
      "You discover you can talk to mythical creatures..."
    ]
  },
  {
    id: 3,
    name: "Friendship",
    description: "Stories about friends and kindness",
    icon: "heart",
    color: "bg-gradient-to-br from-pink-100 to-pink-200",
    prompts: [
      "You meet a new friend who is very different from you...",
      "You help solve a problem between two friends...",
      "You and your best friend go on a special adventure..."
    ]
  },
  {
    id: 4,
    name: "Family",
    description: "Stories about family and home",
    icon: "home",
    color: "bg-gradient-to-br from-green-100 to-green-200",
    prompts: [
      "Your family plans the most amazing weekend...",
      "You help your grandparent with something special...",
      "A family tradition becomes extra special this year..."
    ]
  },
  {
    id: 5,
    name: "Mystery",
    description: "Solve puzzles and uncover secrets",
    icon: "search",
    color: "bg-gradient-to-br from-blue-100 to-blue-200",
    prompts: [
      "Something mysterious is happening in your neighborhood...",
      "You find a strange object with no explanation...",
      "Your pet starts acting very unusual..."
    ]
  },
  {
    id: 6,
    name: "Animals",
    description: "Stories about pets and wildlife",
    icon: "cat",
    color: "bg-gradient-to-br from-yellow-100 to-yellow-200",
    prompts: [
      "You can suddenly understand what animals are thinking...",
      "A lost pet shows up at your door...",
      "You visit a zoo where something magical happens..."
    ]
  }
];

export const savedStories = [
  {
    id: 1,
    title: "The Magic Garden",
    category: "Fantasy",
    content: "Once upon a time, there was a little girl who found a secret garden behind her house. In this garden, flowers could talk and butterflies were as big as birds! She made friends with a wise old sunflower who taught her about kindness and helping others. Every day after school, she would visit her magical friends and learn something new.",
    dateCreated: "2024-12-28",
    wordCount: 65
  },
  {
    id: 2,
    title: "My Best Friend Sam",
    category: "Friendship",
    content: "Sam moved to our town last month and was very shy. I saw him sitting alone at lunch and decided to say hello. We discovered we both love dinosaurs and building with blocks! Now we play together every day and Sam isn't shy anymore. Sometimes being a good friend just means saying hello first.",
    dateCreated: "2024-12-27",
    wordCount: 58
  },
  {
    id: 3,
    title: "The Missing Cookie Mystery",
    category: "Mystery",
    content: "Someone was taking cookies from our kitchen! I decided to solve this mystery. I found crumbs leading to the backyard and tiny paw prints near the doghouse. It turns out our neighbor's puppy had learned to open our back door! We laughed and decided to share our cookies with the clever little detective puppy.",
    dateCreated: "2024-12-26",
    wordCount: 62
  }
];

export const writingTips = [
  "Start with 'Once upon a time' or 'One day' to begin your story",
  "Describe what your characters look like and how they feel",
  "Add exciting action words like 'suddenly' or 'amazingly'",
  "Give your story a happy or surprising ending",
  "Read your story out loud to see how it sounds",
  "Ask yourself: Who is in my story? What happens? Where does it take place?"
];