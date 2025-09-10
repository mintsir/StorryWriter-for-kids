// Mock data for story writing educational app

export const storyStructureLesson = {
  title: "The Secret to Great Stories: The Story Structure",
  introduction: "Every amazing story has three important parts, just like a sandwich has three layers!",
  parts: [
    {
      id: 1,
      name: "Introduction (Beginning)",
      icon: "play-circle",
      description: "This is where you introduce your main character and the setting",
      details: "In the beginning, you need to tell us:",
      tips: [
        "Who is your main character? (Name, age, what they look like)",
        "Where does the story happen? (School, home, magical forest, etc.)",
        "What is the character doing at the start?",
        "What makes this day special or different?"
      ],
      examples: [
        "Emma was a curious 8-year-old who loved exploring. One sunny morning in her grandmother's garden, she noticed something sparkling under the old oak tree.",
        "Tommy was having the worst day ever at Pine Valley Elementary School. It was lunch time and he sat alone in the cafeteria, when suddenly..."
      ],
      color: "bg-green-100",
      borderColor: "border-green-300"
    },
    {
      id: 2,
      name: "Main Story (Middle)",
      icon: "zap",
      description: "This is the exciting part where the adventure happens",
      details: "In the middle, this is where the magic happens:",
      tips: [
        "What problem or adventure does your character face?",
        "What exciting things happen?",
        "How does your character feel? (scared, excited, curious, brave)",
        "What actions do they take to solve the problem?"
      ],
      examples: [
        "As Emma dug near the tree, she found a tiny door with a note that said 'Only kind hearts can enter.' When she knocked gently, a fairy appeared and asked for her help to save the garden from wilting.",
        "A new student named Alex sat down next to Tommy. Alex seemed sad and didn't have lunch. Tommy remembered how lonely he felt and decided to share his sandwich, even though he was still hungry."
      ],
      color: "bg-blue-100",
      borderColor: "border-blue-300"
    },
    {
      id: 3,
      name: "Conclusion (Ending)",
      icon: "check-circle",
      description: "This is where you wrap up the story and show what your character learned",
      details: "In the ending, you need to:",
      tips: [
        "How did the problem get solved?",
        "What did your character learn?",
        "How do they feel now?",
        "What happens next for your character?"
      ],
      examples: [
        "Emma helped the fairy by watering the magical flowers with kindness. The garden bloomed beautifully, and the fairy gave Emma a special seed. From that day on, Emma knew that being kind could create real magic.",
        "Tommy and Alex became best friends. Tommy learned that sharing and being kind to others made him feel much happier than being alone. The next day, they sat together again and invited another lonely student to join them."
      ],
      color: "bg-purple-100",
      borderColor: "border-purple-300"
    }
  ]
};

export const storyCategories = [
  {
    id: 1,
    name: "Adventure",
    description: "Exciting journeys and discoveries",
    icon: "compass",
    color: "bg-gradient-to-br from-orange-100 to-orange-200",
    storyStarters: {
      introduction: [
        "You discover a mysterious map in your school locker...",
        "While hiking with your family, you find a hidden cave...",
        "Your pet starts acting strange and leads you somewhere..."
      ],
      middle: [
        "Suddenly, you hear footsteps behind you...",
        "The path splits into three different directions...",
        "You realize you're not alone in this place..."
      ],
      conclusion: [
        "What did this adventure teach you about being brave?",
        "How will you use what you learned in your next adventure?",
        "What would you tell other kids about facing challenges?"
      ]
    }
  },
  {
    id: 2,
    name: "Friendship",
    description: "Stories about making friends and being kind",
    icon: "heart",
    color: "bg-gradient-to-br from-pink-100 to-pink-200",
    storyStarters: {
      introduction: [
        "A new student joins your class and seems very shy...",
        "Your best friend is upset and won't tell you why...",
        "You see someone sitting alone at lunch..."
      ],
      middle: [
        "You decide to do something kind to help...",
        "At first, things don't go as planned...",
        "You discover something surprising about this person..."
      ],
      conclusion: [
        "How did your kindness make a difference?",
        "What did you learn about friendship?",
        "How did helping others make you feel?"
      ]
    }
  },
  {
    id: 3,
    name: "Family",
    description: "Stories about family love and togetherness",
    icon: "home",
    color: "bg-gradient-to-br from-green-100 to-green-200",
    storyStarters: {
      introduction: [
        "Your grandparent is visiting and wants to show you something special...",
        "It's a family tradition day, but you're not excited about it...",
        "You want to do something special to help your family..."
      ],
      middle: [
        "As you spend time together, something unexpected happens...",
        "You discover something new about your family member...",
        "You face a challenge that you need to solve together..."
      ],
      conclusion: [
        "What did you learn about your family?",
        "How did this experience bring you closer?",
        "What family traditions will you remember forever?"
      ]
    }
  }
];

export const writingHints = {
  introduction: [
    "Start by describing your main character - what do they look like? What do they like to do?",
    "Paint a picture of where your story happens - is it sunny? Quiet? Busy? Magical?",
    "Show us what makes this day different from other days",
    "Use describing words to help us see and feel what's happening"
  ],
  middle: [
    "This is where the excitement happens! What challenge does your character face?",
    "Show us how your character feels - are they nervous? Excited? Determined?",
    "What actions does your character take? Do they ask for help? Try something brave?",
    "Add some dialogue - what do the characters say to each other?"
  ],
  conclusion: [
    "How does your character solve the problem or complete their adventure?",
    "What lesson did your character learn? How are they different now?",
    "End with a positive feeling - what good thing happened because of their actions?",
    "Sometimes you can hint at what might happen next!"
  ]
};

export const completedStories = [
  {
    id: 1,
    title: "The Magic Garden Helper",
    category: "Adventure",
    studentName: "Sarah, age 8",
    introduction: "Emma was a curious girl who loved spending time in her grandmother's beautiful garden. One morning, she noticed the flowers looked sad and droopy, even though Grandma had been watering them every day.",
    middle: "Emma decided to investigate. She found tiny footprints leading to a miniature door behind the roses. When she knocked softly, a worried garden fairy appeared. The fairy explained that the flowers needed more than water - they needed kind words and gentle care. Emma spent the whole afternoon talking to each flower and helping the fairy.",
    conclusion: "By evening, all the flowers were bright and beautiful again. The fairy thanked Emma and gave her a magical seed. Emma learned that being kind and caring can make wonderful things happen. Now she helps in the garden every day.",
    dateCompleted: "2024-12-28",
    teacherFeedback: "Great job showing Emma's kindness! I love how you explained the problem clearly and showed how caring actions made a difference."
  }
];

export const progressData = {
  storiesCompleted: 3,
  currentStreak: 5,
  favoritePart: "Middle (Adventure parts)",
  strongestSkill: "Creating interesting characters",
  nextGoal: "Adding more describing words"
};