export function evaluateAnswer(question: string, answer: string) {
  // For demo we parse simple "a + b" form
  const match = question.match(/^\s*(\d+)\s*\+\s*(\d+)\s*\?\s*$/) || question.match(/^\s*(\d+)\s*\+\s*(\d+)\s*$/);
  let correct = false;
  if (match) {
    const a = Number(match[1]);
    const b = Number(match[2]);
    correct = Number(answer) === a + b;
  }
  const positive = [
    "Hooray! You found the treasure key! 🗝️",
    "Epic! The magic bridge appears! 🌈",
    "High five! You did it! ✋"
  ];
  const encouraging = [
    "So close! Let’s try together—count it out on your fingers. 🖐️",
    "No worries! The friendly dragon gives you a hint. 🐉",
    "Great effort! Let’s peek again at the numbers. 👀"
  ];
  const companionText = correct ? positive[Math.floor(Math.random()*positive.length)]
                                : encouraging[Math.floor(Math.random()*encouraging.length)];
  return { correct, companionText };
}
