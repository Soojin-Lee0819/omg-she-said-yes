export type Category = {
  id: string;
  name: string;
  questions: string[];
};

export const categories: Category[] = [
  {
    id: "family",
    name: "Family & Traditions",
    questions: [
      "Consider the methods of discipline you experienced during your upbringing. How might your parenting style reflect those strategies, and how might it differ?",
      "If you were to enter into marriage, which bond with your parents would be the most difficult to shift, and why?",
      "How would you describe the financial situation and emotional atmosphere in your household during your formative years? How do you perceive this influencing your current life?",
      "How do you plan to honor holidays, birthdays, and important occasions with both your relatives and your partner's family?",
      "What significance does your family place on the act of gift-giving?",
      "How do you envision a 'family'?",
      "If you could influence your upbringing, what alterations would you make to the dynamics within your household?",
      "How will marriage influence the relationships you maintain with your family members and close companions?",
      "What traditions, customs, and expected responsibilities did you grow up with in your household?",
      "How do you plan to merge your family traditions and practices with your partner's?",
      "Which pivotal experiences do you feel are crucial for your future spouse to have undergone, and which circumstances do you prefer they had avoided?",
      "Do you know any couples who enjoy a thriving and strong marriage? What do you admire about them?",
      "What is the number of children you imagine raising in your ideal family?",
      "Have you considered the possibility of starting a family once married?",
      "Are you open to the possibility of adopting a child?",
      "What formal education or prior experiences have prepared you for the duties of parenting or becoming a stepparent?",
    ]
  },
  {
    id: "communication",
    name: "Communication & Conflict",
    questions: [
      "What strategies would you employ to maintain a healthy balance of mutual reliance once married?",
      "What strategies would you use to maintain balance in the partnership through mutual support while also holding yourselves accountable for your own behaviors?",
      "What similarities or differences exist in your communication styles? What does it mean to become proficient in the way your partner communicates?",
      "How would you initiate a conversation with me about a characteristic I possess that greatly concerns you?",
      "Discuss the strategies you employ to manage stress and pinpoint the triggers that lead to your feelings of tension and irritation.",
      "How comfortable are you with handling conflicts or disagreements? How do you typically go about resolving them?",
      "During a conflict, do you tend to yield, withdraw, seek compromise, try to win, or settle? How do you typically respond?",
      "What causes conflicts in relationships? What have you learned about your own role in them?",
      "How would you communicate your displeasure to me if I were to make a poor choice in a professional context or during everyday life?",
      "Do you believe openness is crucial in all facets of our partnership, or do you think certain aspects should remain private?",
      "Would your former partner describe you as someone who embodies integrity and dependability?",
      "What emotions do you find simple to convey, and which ones pose challenges when you try to communicate them?",
      "How would you modify your regular use of devices and social media to accommodate a shared married lifestyle?",
      "Do you hold the conviction that transparency and honesty should govern all parts of a marriage?",
      "How do you prefer to receive an apology when you have been hurt?",
    ]
  },
  {
    id: "past",
    name: "Past & History",
    questions: [
      "How have your past relationships shaped you into a more suitable partner at this moment?",
      "Can you describe three impactful experiences from your early years through your eighteenth birthday?",
      "Consider your individual traits and the situation of your life before your current partner became a part of it.",
      "What descriptions might people from your past relationships provide when recounting their experiences with you?",
      "Can you articulate the fundamental elements of your past relationships and pinpoint three key reasons for their conclusion?",
      "Have you long harbored a secret that you've consistently chosen not to reveal to your parents?",
      "Is there a loss in your life that you still need to fully grieve?",
      "How would you characterize your relationship with your father using five descriptive words?",
      "What five adjectives would you use to describe your relationship with your mother?",
      "Could you discuss the most difficult time or lowest point you've experienced and how you overcame it?",
      "When you reflect on past romantic involvements, how would you rate your level of regret on a scale of 0 to 10? How might those feelings influence your capacity to connect with a new partner?",
      "Who are the people you have had to forgive in your life?",
      "How often and in what manner do you engage with a former partner, if at all? What are your emotions when those interactions occur?",
      "How have your past relationships shaped your view of what a healthy partnership looks like?",
      "What has a past relationship taught you that you want to carry forward?",
      "Are there any experiences in your past that might affect our relationship that I should know about?",
    ]
  },
  {
    id: "values",
    name: "Values & Vision",
    questions: [
      "What five traits do you possess that would contribute to a successful lifelong partnership, and which three elements of your character could cause hesitation in someone considering a shared future with you?",
      "Complete this statement in ten different ways: 'If I choose to pursue a future in marriage, I would...'",
      "Have you ever held back questions about me that you've been eager to ask?",
      "Are there any elements of my personality or current life circumstances that worry you?",
      "How have spiritual teachings or core beliefs become apparent to you through life's difficult moments?",
      "How do you evaluate the strength of your friendships with people of your own gender? Do you have close, deep friendships?",
      "Do you hold anything in your life to be so crucial that it must stay unchanged, or view it as something you could never give up?",
      "Which aspects of your life have had the greatest impact on who you are today?",
      "What traits do you believe are absolutely crucial for a lifelong companion?",
      "Imagine your emotional and spiritual well-being ten years into the future. How closely do your values and financial perspectives align with where you want to be?",
      "In the context of marriage, what do you anticipate a partner will... (finish the sentence)",
      "In a marital union, what do you anticipate a spouse will... (finish the sentence)",
      "What events do you hope your future partner has never encountered?",
      "Which five fears exert the greatest influence on your life?",
      "Are you receptive to constructive feedback and guidance?",
      "Have you thought about participating in premarital counseling? Are you open to marital counseling if significant challenges arise?",
      "What questions do you have about sexuality and intimacy? Are you aiming to deepen your understanding?",
      "Do you believe that maintaining this relationship would require you to change or sacrifice elements of who you are?",
      "What is your vision for the evolution of our relationship?",
    ]
  },
  {
    id: "lifestyle",
    name: "Lifestyle & Personality",
    questions: [
      "What pursuits do you hold in high regard, and which of these would become more meaningful if we participated in them as a couple?",
      "What kinds of cuisine do you prefer, and how do you value the importance of a nutritious diet?",
      "How would you describe your political stance?",
      "Where are you currently on your spiritual journey?",
      "Are you fond of animals? How would you handle a situation where one of you wants a pet and the other doesn't?",
      "In what ways have certain movies, books, or television series shaped your perspectives or feelings about relationships?",
      "Which characteristics of your partner are you most proud of?",
      "Can you detail the different roles you have held in your career and what you loved or disliked about each?",
      "What activities bring you joy in your personal time? Would your dedication to these activities change upon marriage?",
      "How might the experience of marriage enhance your life in ways that staying single might not?",
      "What is the source of your perception of marriage — the examples of peers, education, or literature? How do you plan to keep growing in your understanding of it?",
      "What areas of your life do you insist on handling yourself, and which are you prepared to share?",
      "Considering the prevalence of divorce, what elements could fortify your partnership against it?",
      "What are your dreams for the kind of marriage you want to build?",
      "What motivates you to consider a lifelong commitment with your current partner?",
      "How do you want to spend your free time as a couple? What does a perfect weekend look like to you?",
    ]
  },
  {
    id: "money",
    name: "Money & Practical Life",
    questions: [
      "How would you describe your current financial situation and your approach to money management?",
      "How do you feel about combining finances versus keeping separate accounts in marriage?",
      "What are your financial goals for the next five years? The next ten?",
      "How do you typically respond to financial stress or unexpected expenses?",
      "What does financial security mean to you, and how important is it relative to other life priorities?",
      "How do you feel about debt — student loans, credit cards, mortgages?",
      "What are your spending habits? Do you consider yourself a saver or a spender?",
      "How do you plan to divide financial responsibilities in a shared household?",
      "What role did money play in your family growing up, and how has that shaped your attitude toward finances today?",
      "Are there any financial obligations — debts, support payments, family commitments — I should know about?",
      "How do you envision your partnership progressing as a team financially in the future?",
      "What was the duration of your most significant past relationship before the decision to commit was made? What did you learn?",
      "What were your hopes and dreams in your past relationships, and how do they compare with your hopes for this one?",
      "How does your current relationship differ from your past ones in meaningful ways?",
      "Reflect on the level of happiness you expect in your married life. What specific steps do you intend to take to turn that vision into reality?",
      "What have you done to actively work on improving yourself as a partner?",
    ]
  }
];

export const allQuestions = categories.flatMap((c) =>
  c.questions.map((q, i) => ({
    id: `${c.id}-${i}`,
    question: q,
    categoryId: c.id,
    categoryName: c.name,
  }))
);
