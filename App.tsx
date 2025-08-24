
import React, { useState } from 'react';
import QuizForm from './components/QuizForm';
import VideoPreview from './components/VideoPreview';
import { LoadingSpinner, LogoIcon } from './components/icons';
import type { VideoOptions, Question, GeneratedQuiz } from './types';
import { generateQuizScript } from './services/geminiService';

export default function App(): React.ReactNode {
  const [videoOptions, setVideoOptions] = useState<VideoOptions>({
    background: { type: 'color', value: '#1a202c' },
    watermark: 'QuizMaster',
    aiVoiceover: true,
  });

  const [questions, setQuestions] = useState<Question[]>([
    {
      id: crypto.randomUUID(),
      text: 'What is the capital of Malaysia?',
      options: [
        { id: crypto.randomUUID(), text: 'Kuala Lumpur' },
        { id: crypto.randomUUID(), text: 'Singapore' },
        { id: crypto.randomUUID(), text: 'Jakarta' },
        { id: crypto.randomUUID(), text: 'Bangkok' },
      ],
      correctOptionId: '',
    },
  ]);
  
  const [generatedQuiz, setGeneratedQuiz] = useState<GeneratedQuiz | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async () => {
    setError(null);

    const hasIncompleteQuestions = questions.some(
      q => !q.text || q.options.some(opt => !opt.text) || !q.correctOptionId
    );
    if (hasIncompleteQuestions) {
      setError('Please fill in all questions, options, and select a correct answer for each question.');
      return;
    }
    
    setIsLoading(true);
    setGeneratedQuiz(null);

    try {
      const result = await generateQuizScript(questions, videoOptions);
      setGeneratedQuiz(result);
    } catch (e) {
      setError(e instanceof Error ? e.message : 'An unknown error occurred during video generation.');
      console.error(e);
    } finally {
      setIsLoading(false);
    }
  };
  
  // Set initial correct answer for default question
  React.useEffect(() => {
    if (questions.length === 1 && !questions[0].correctOptionId) {
      const updatedQuestions = [...questions];
      const firstOptionId = updatedQuestions[0].options[0]?.id;
      if (firstOptionId) {
        updatedQuestions[0].correctOptionId = firstOptionId;
        setQuestions(updatedQuestions);
      }
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="min-h-screen bg-gray-900 text-white font-sans">
      <header className="bg-gray-800/50 backdrop-blur-sm border-b border-gray-700 sticky top-0 z-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center space-x-3">
              <LogoIcon />
              <h1 className="text-xl sm:text-2xl font-bold tracking-tight text-cyan-400">
                AI Video Quiz Generator
              </h1>
            </div>
          </div>
        </div>
      </header>

      <main className="container mx-auto p-4 sm:p-6 lg:p-8">
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
          <div className="lg:col-span-3">
            <QuizForm
              questions={questions}
              setQuestions={setQuestions}
              videoOptions={videoOptions}
              setVideoOptions={setVideoOptions}
              onSubmit={handleSubmit}
              isLoading={isLoading}
            />
          </div>

          <div className="lg:col-span-2">
            <div className="sticky top-24">
              <h2 className="text-2xl font-bold mb-4 text-gray-300">Preview</h2>
              <div className="aspect-[9/16] w-full max-w-sm mx-auto bg-gray-800 rounded-2xl shadow-2xl overflow-hidden ring-1 ring-gray-700 flex items-center justify-center">
                {isLoading ? (
                  <div className="flex flex-col items-center text-center p-4">
                    <LoadingSpinner />
                    <p className="mt-4 text-lg font-semibold text-cyan-400">Generating Quiz...</p>
                    <p className="text-sm text-gray-400 mt-1">AI is crafting your video. This might take a moment.</p>
                  </div>
                ) : error ? (
                   <div className="p-6 text-center">
                    <h3 className="text-red-500 font-bold text-lg">Generation Failed</h3>
                    <p className="text-gray-400 mt-2 text-sm">{error}</p>
                   </div>
                ) : generatedQuiz ? (
                  <VideoPreview quiz={generatedQuiz} options={videoOptions} />
                ) : (
                  <div className="text-center p-4">
                    <p className="text-gray-400">Your generated video preview will appear here.</p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
