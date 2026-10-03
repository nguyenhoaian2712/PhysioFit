export type BodyRegionId = 
  | 'neck' 
  | 'shoulder' 
  | 'elbow' 
  | 'wrist_hand' 
  | 'upper_back' 
  | 'mid_back' 
  | 'lower_back' 
  | 'hip' 
  | 'thigh' 
  | 'knee' 
  | 'calf_shin' 
  | 'ankle_foot';

export type BodyView = 'front' | 'back';

export type DifficultyLevel = 'Dễ' | 'Trung bình' | 'Nâng cao';

export interface BodyRegion {
  id: BodyRegionId;
  name: string;
  vietnameseName: string;
  description: string;
  view: BodyView[];
  icon: string;
  problemCount: number;
}

export interface ProblemCondition {
  id: string;
  name: string;
  bodyRegionId: BodyRegionId;
  description: string;
  symptoms: string[];
  recommendedGoals: string[];
  exerciseIds: string[];
}

export interface ExerciseVideo {
  provider: 'youtube';
  videoId: string;
  url: string;
  thumbnail: string;
}

export interface ExerciseStep {
  stepNumber: number;
  title: string;
  instruction: string;
  durationSeconds?: number;
}

export interface Exercise {
  id: string;
  title: string;
  bodyRegionId: BodyRegionId;
  bodyRegionName: string;
  problemIds: string[];
  problemNames: string[];
  difficulty: DifficultyLevel;
  durationMinutes: number;
  repsSets: string;
  goals: string[];
  precautions: string[];
  instructions: ExerciseStep[];
  video: ExerciseVideo;
  tags: string[];
  isPopular?: boolean;
}

export interface PainRecord {
  id: string;
  timestamp: string;
  exerciseId?: string;
  exerciseTitle?: string;
  bodyRegionId: BodyRegionId;
  bodyRegionName: string;
  painLevelBefore: number; // 0-10
  painLevelAfter?: number;  // 0-10
  notes?: string;
}

export interface ROMRecord {
  id: string;
  timestamp: string;
  jointName: string;
  movementType: string;
  bodyRegionId: BodyRegionId;
  measuredAngle: number;
  targetAngle: number;
  unit: string;
  notes?: string;
}

export interface WorkoutSession {
  id: string;
  timestamp: string;
  exerciseId: string;
  exerciseTitle: string;
  bodyRegionId: BodyRegionId;
  durationSeconds: number;
  completed: boolean;
  painBefore: number;
  painAfter: number;
  notes?: string;
}

export interface User {
  id: string;
  fullName: string;
  age: number;
  location: string;
  commonConditions: string[];
  otherCondition?: string;
  createdAt: string;
  updatedAt: string;
  onboardingCompleted: boolean;
  savedExerciseIds: string[];
  dailyGoalMinutes: number;
  preferences?: {
    soundEnabled: boolean;
    ambientVolume: number;
    sparklesEnabled: boolean;
  };
}

export type UserProfile = User;
