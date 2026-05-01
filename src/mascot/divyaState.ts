export type DivyaMood = 'stressed' | 'neutral' | 'good' | 'great';

export type DivyaExpression =
  | 'idle'
  | 'focus'
  | 'calm'
  | 'happy'
  | 'celebrate';

export interface DivyaContext {
  isRitualStarted?: boolean;
  isCompleted?: boolean;
  mood?: DivyaMood;
  streak?: number;
}

/**
 * Single source of truth for Divya's current expression.
 * Keep this deterministic and side-effect free.
 */
export const getDivyaState = ({
  isRitualStarted = false,
  isCompleted = false,
  mood = 'neutral',
  streak = 0,
}: DivyaContext): DivyaExpression => {
  if (isCompleted) return 'celebrate';
  if (isRitualStarted) return 'focus';
  if (mood === 'stressed') return 'calm';
  if (streak >= 7) return 'happy';
  return 'idle';
};
