
export enum SkinType {
  OILY = 'Oily',
  DRY = 'Dry',
  COMBINATION = 'Combination',
  SENSITIVE = 'Sensitive',
  NORMAL = 'Normal'
}

export interface Ingredient {
  name: string;
  benefit: string;
  frequency: string;
}

export interface RoutineStep {
  id: string;
  name: string;
  category: 'Cleanser' | 'Treatment' | 'Moisturizer' | 'Protection';
  description: string;
  isCompleted: boolean;
}

export interface UserProfile {
  skinType: SkinType | null;
  concerns: string[];
  lastAnalysisDate: string | null;
  amRoutine: RoutineStep[];
  pmRoutine: RoutineStep[];
}

export interface QuizAnswer {
  questionId: number;
  score: Record<string, number>;
}
