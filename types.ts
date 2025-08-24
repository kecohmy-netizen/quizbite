
export interface Option {
  id: string;
  text: string;
}

export interface Question {
  id: string;
  text: string;
  options: Option[];
  correctOptionId: string;
}

export type BackgroundType = 'color' | 'gradient' | 'image';

export interface Background {
  type: BackgroundType;
  value: string; // Hex for color, CSS gradient string, or image URL
}

export interface VideoOptions {
  background: Background;
  watermark: string;
  aiVoiceover: boolean;
}

// Type for the data structure returned by Gemini API
export interface GeneratedQuestion {
  question_text: string;
  options: string[];
  correct_answer_index: number;
  voiceover_script: string;
  duration_seconds: number;
}

export interface GeneratedQuiz {
  title: string;
  questions: GeneratedQuestion[];
}
