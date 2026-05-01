import type { DivyaExpression } from './divyaState';

const messageBank: Record<DivyaExpression, string[]> = {
  idle: ['Ready when you are.', 'Let\'s take one gentle step.'],
  focus: ['Stay with your breath.', 'You\'re doing great—keep going.'],
  calm: ['Let\'s go slow today.', 'You\'re safe—one moment at a time.'],
  happy: ['Amazing consistency!', 'Your streak is building momentum.'],
  celebrate: ['I\'m proud of you.', 'Ritual complete—beautiful work.'],
};

export const getDivyaMessage = (expression: DivyaExpression, seed = 0): string => {
  const entries = messageBank[expression];
  return entries[seed % entries.length];
};
