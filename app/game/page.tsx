'use client'

import { useState, useEffect } from 'react';
import Image from 'next/image';
import questions from '@/utils/questions';

const QuizGame = () => {
  const [shuffledQuestions, setShuffledQuestions] = useState<{ question: string; options: string[]; answer: string }[]>([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [showResult, setShowResult] = useState(false);
  const [leftImageSize, setLeftImageSize] = useState('w-[697.5px] h-[950px]'); // Initial size
  const [rightImageSize, setRightImageSize] = useState('w-[697.5px] h-[950px]'); // Initial size

  useEffect(() => {
    const shuffled = [...questions].sort(() => Math.random() - 0.5);
    setShuffledQuestions(shuffled);
  }, []);

  const handleAnswer = (selectedOption: string, optionIndex: number) => {
    if (selectedOption === shuffledQuestions[currentQuestionIndex].answer) {
      setScore(score + 1);
    }
    if (optionIndex === 0) {
      setLeftImageSize('w-full h-full'); // Expand to full size
      setRightImageSize('w-[697.5px] h-[950px]');
    } else if (optionIndex === 1) {
      setLeftImageSize('w-[697.5px] h-[950px]');
      setRightImageSize('w-full h-full'); // Expand to full size
    } else if (optionIndex === 2) {
      setLeftImageSize('w-full h-full');
      setRightImageSize('w-full h-full');
    }
    const nextQuestionIndex = currentQuestionIndex + 1;
    if (nextQuestionIndex < shuffledQuestions.length) {
      setCurrentQuestionIndex(nextQuestionIndex);
    } else {
      setShowResult(true);
    }
  };

  if (shuffledQuestions.length === 0) {
    return <div>Loading...</div>;
  }

  const currentQuestion = shuffledQuestions[currentQuestionIndex];

  return (
    <>
      <main className='bg-black h-screen text-white flex items-center justify-center relative'>
        <h2 className='absolute mt-4 ml-4 text-[24px] font-thin z-50 top-0 left-0'>Score: {score}</h2>
        <div className='absolute top-0 left-0 h-full w-1/2 flex items-center justify-center'>
          <div className={`${leftImageSize} transition-all duration-500 relative`}>
            <Image src='/game/egypt.webp' alt='Left Image' layout='fill' objectFit='cover' className='border'/>
          </div>
        </div>  
        <div className='w-3/4 text-center relative z-10 h-full flex flex-col justify-between'>
          {!showResult ? (
            <div className='h-full flex flex-col justify-between w-full my-32'>
              <h2 className='mt-4'>{currentQuestion.question}</h2>
              <div className='grid grid-rows-2 grid-cols-3 gap-4 mb-4 border w-full'>
                <button className='row-start-2 col-start-1' onClick={() => handleAnswer(currentQuestion.options[0], 0)}>
                  {currentQuestion.options[0]}
                </button>
                <button className='row-start-1 col-start-2' onClick={() => handleAnswer(currentQuestion.options[1], 1)}>
                  {currentQuestion.options[1]}
                </button>
                <button className='row-start-2 col-start-3' onClick={() => handleAnswer(currentQuestion.options[2], 2)}>
                  {currentQuestion.options[2]}
                </button>
              </div>
            </div>
          ) : (
            <div>
              <h2>Your Final Score: {score}/{shuffledQuestions.length}</h2>
            </div>
          )}
        </div>
        <div className='absolute top-0 right-0 h-full w-1/2 flex items-center justify-center'>
          <div className={`${rightImageSize} transition-all duration-500 relative`}>
            <Image src='/game/china.jpg' alt='Right Image' layout='fill' objectFit='cover' />
          </div>
        </div>  
      </main>
    </>
  );
};

export default QuizGame;