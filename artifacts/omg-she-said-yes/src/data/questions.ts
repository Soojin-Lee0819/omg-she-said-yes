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
      "Consider the methods of discipline you experienced during your upbringing. How might your parenting style reflect those disciplinary strategies, and how might it differ?",
      "Do you sever the bonds of dependency and allegiance to your parents upon entering into marriage? Which bond would be the most difficult for you to part with, and why?",
      "How would you describe the financial situation and emotional atmosphere in your household during your formative years? How do you perceive this influencing your current life?",
      "How do you plan to honor holidays, birthdays, and important occasions with both your relatives and your partner's family?",
      "What significance does your family place on the act of gift-giving?",
      "How do you envision a 'family'?",
      "If you could influence your upbringing, what alterations would you make to the dynamics within your household?",
      "How will marriage influence the relationships you maintain with your family members and close companions?",
      "What traditions, customs, and expected responsibilities did you grow up with in your household?",
      "How do you plan to merge your family traditions and practices with your partner's?",
    ]
  },
  {
    id: "communication",
    name: "Communication & Conflict",
    questions: [
      "What strategies would you employ to maintain a healthy balance of mutual reliance upon deciding to marry?",
      "What strategies would you use to maintain balance in the partnership through mutual support while also holding yourselves accountable for your own behaviors?",
      "What similarities or differences exist in your communication styles? What does it mean to become proficient in the way your partner communicates?",
      "How would you initiate a conversation with me about a characteristic I possess that greatly concerns you?",
      "Have you considered the possibility of starting a family once married?",
      "Are you open to the possibility of adopting a child?",
      "What formal education or prior experiences have prepared you for the duties of parenting or stepping into the role of a stepparent?",
      "Discuss the strategies you employ to manage stress and pinpoint the triggers that typically lead to your feelings of tension and irritation.",
      "How at ease are you with handling conflicts or disagreements? How do you typically go about finding a resolution?",
      "During a conflict, do you tend to yield, withdraw, seek compromise, try to win, or settle the dispute?",
      "What causes conflicts in relationships? What have you learned about your own role in them?",
      "How would you communicate your displeasure to me if I were to make a poor choice in a professional context or during everyday interactions?",
      "Do you believe openness is crucial in all facets of our partnership, or do you think certain aspects should remain private?",
      "Would your former partner describe you as someone who embodies integrity and dependability?",
      "What emotions do you find simple to convey, and which ones pose challenges when you attempt to communicate them?",
    ]
  },
  {
    id: "past",
    name: "Past & History",
    questions: [
      "How have your past relationships shaped you into a more suitable partner at this moment?",
      "Can you describe three impactful experiences from your early years through your eighteenth birthday?",
      "Consider your individual traits and the situation of your life before your current partner became a part of it.",
      "What descriptions might individuals from your past relationships provide when recounting their experiences with you? What insights have you gained?",
      "Can you articulate the fundamental elements of your past relationships and pinpoint three key reasons for their conclusion?",
      "Have you long harbored a secret that you've consistently chosen not to reveal to your parents?",
      "Is there a loss in your life that you still need to fully grieve?",
      "How would you characterize your relationship with your father using five descriptive words?",
      "What five adjectives would you use to describe your relationship with your mother?",
      "Could you discuss the most difficult time or lowest point you've experienced and the strategy you employed to surmount it?",
      "When you reflect on past romantic involvements, how would you rate your level of regret on a scale of 0 to 10? How might those feelings influence your capacity to connect with another person?",
      "Who are the people you have had to forgive in your life?",
      "How often and in what manner do you engage with a former partner, if at all? What are your emotions when those interactions occur?",
      "How have your past relationships shaped your view of what a healthy partnership looks like?",
      "What has a past relationship taught you that you want to carry forward?",
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
      "How have spiritual teachings become apparent to you through life's difficult moments — times of disappointment, hardship, monetary difficulties, and failure?",
      "How do you evaluate the strength of your bond with individuals of the same gender? Do you have close, deep friendships?",
      "Do you hold anything in your life to be so crucial that it must stay unchanged, or view it as something you could never give up?",
      "Which aspects of your existence have had the greatest impact on you?",
      "What traits do you believe are absolutely crucial for a lifelong companion?",
      "Imagine your emotional and spiritual well-being ten years into the future. How closely do your values and financial perspectives align with where you want to be?",
      "What is the number of children you imagine raising in your ideal family?",
      "In the context of marriage, one anticipates that a partner will... (finish this statement)",
      "In a marital union, one anticipates that a spouse will... (finish this statement)",
      "Which pivotal experiences do you feel are crucial for your future spouse to have undergone, and which circumstances do you prefer they had avoided?",
      "What events do you hope your future partner has never encountered?",
      "Do you know any couples who enjoy a thriving and strong marriage? What do you admire about them?",
      "Which five fears exert the greatest influence on your life?",
      "Would you be willing to discuss your past and present experiences with substances such as alcohol and drugs?",
      "Are you receptive to constructive feedback and guidance?",
      "Have you thought about participating in premarital counseling? Are you open to marital counseling if significant challenges arise after the wedding?",
      "What questions do you have about sexuality and intimacy? Are you aiming to deepen your understanding?",
      "What pursuits do you hold in high regard, and which would become more meaningful if we participated in them as a couple?",
      "What kinds of cuisine do you prefer, and how do you value the importance of a nutritious diet?",
      "How would you describe your political stance?",
      "Where are you currently on your spiritual journey?",
      "Do you believe that maintaining this relationship would require you to change or sacrifice elements of who you are?",
      "Are you fond of animals? How would you handle a situation where one of you wants a pet and the other doesn't?",
      "In what ways have certain movies and television series shaped your perspectives or feelings about relationships?",
      "Which characteristics of your partner are you most proud of?",
      "Can you detail the different positions you have held in your career and what you loved or disliked about each?",
      "What activities bring you joy in your personal time? Would your dedication to these activities change upon marriage?",
      "How would you modify your regular use of devices and social media to accommodate a collaborative married lifestyle?",
      "How might the experience of marriage enhance your life in ways that staying single might not?",
      "What is the source of your perception of marriage — peers, education, or literature? How do you plan to deepen your understanding of it?",
      "What areas of your life do you insist on handling yourself, and which are you prepared to share?",
      "Considering the prevalence of divorce, what elements could fortify your partnership to avoid its dissolution?",
      "What is your vision for the evolution of our relationship?",
      "What terms would you use to characterize your past and current partners?",
      "How do you envision your marriage in the years to come?",
      "What are your dreams for the kind of marriage you want to build?",
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
    ]
  },
  {
    id: "remarriage",
    name: "Remarriage & New Beginnings",
    questions: [
      "How do you envision your partnership progressing in the future?",
      "Could you share insights into a former marital or long-term relationship? What would you examine with the same scrutiny you'd apply to a possible future together?",
      "Before you started dating a former serious partner, how much time had you spent getting to know them?",
      "What characteristics first attracted you to a former partner?",
      "What was the duration of your most significant past relationship before the decision to commit was made?",
      "What prompted your contemplation of marriage or long-term commitment with a past companion?",
      "What were your hopes and dreams in your past relationships?",
      "Select ten adjectives that most accurately portray the person with whom you once had a significant romantic connection.",
      "Select ten adjectives that accurately depict the fundamental characteristics of the person you're considering for a lifelong partnership.",
      "What have you done to improve a past partnership? What was your role in its end, and what did you learn?",
      "Reflect on the level of happiness you expect in your forthcoming marital journey. What specific steps do you intend to take to turn that vision into reality?",
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

if (import.meta.env.DEV) {
  const total = allQuestions.length;
  if (total !== 101) {
    console.warn(`[questions] Expected 101 questions, got ${total}`);
  }
}
