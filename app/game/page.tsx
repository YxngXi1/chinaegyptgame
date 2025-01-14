'use client'

import { useState, useEffect } from 'react';
import Image from 'next/image';
import questions from '@/utils/questions';

const QuizGame = () => {
  const [shuffledQuestions, setShuffledQuestions] = useState<{ question: string; options: string[]; answer: string }[]>([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [showResult, setShowResult] = useState(false);
  const [leftImageSize, setLeftImageSize] = useState('w-[697.5px] h-[850px]'); // Initial size
  const [rightImageSize, setRightImageSize] = useState('w-[697.5px] h-[850px]'); // Initial size
  const [flashColor, setFlashColor] = useState<string | null>(null); // Flash color state

  useEffect(() => {
    const shuffled = [...questions].sort(() => Math.random() - 0.5);
    setShuffledQuestions(shuffled);
  }, []);

  const handleAnswer = (selectedOption: string, optionIndex: number) => {
    if (selectedOption === shuffledQuestions[currentQuestionIndex].answer) {
      setScore(score + 1);
      setFlashColor('bg-green-500'); // Set flash color to green
      new Audio('/ding.mp3').play(); // Play correct answer sound
      if (optionIndex === 0) {
        setLeftImageSize('w-full h-full'); // Expand to full size
        setRightImageSize('w-[697.5px] h-[850px]'); // Keep the right image size
      } else if (optionIndex === 2) {
        setLeftImageSize('w-[697.5px] h-[850px]'); // Keep the left image size
        setRightImageSize('w-full h-full'); // Expand to full size
      } else if (optionIndex === 1) {
        setLeftImageSize('w-full h-full');
        setRightImageSize('w-full h-full');
      }
    } else {
      setFlashColor('bg-red-500'); // Set flash color to red
      setShowResult(true); // End the game
      setLeftImageSize('w-full h-full'); // Expand both images to full size at the end
      setRightImageSize('w-full h-full');
    }

    setTimeout(() => setFlashColor(null), 500); // Remove flash color after 500ms

    if (!showResult) {
      const nextQuestionIndex = currentQuestionIndex + 1;
      if (nextQuestionIndex < shuffledQuestions.length) {
        setCurrentQuestionIndex(nextQuestionIndex);
      } else {
        setShowResult(true);
        setLeftImageSize('w-full h-full'); // Expand both images to full size at the end
        setRightImageSize('w-full h-full');
      }
    }
  };

  if (shuffledQuestions.length === 0) {
    return <div>Loading...</div>;
  }

  const currentQuestion = shuffledQuestions[currentQuestionIndex];

  return (
    <>
      <main className='bg-black h-screen text-white flex items-center justify-center relative'>
        {flashColor && <div className={`absolute inset-0 ${flashColor} opacity-50 z-50 transition-opacity duration-1000 ease-in-out`}></div>}
        <h2 className='absolute mt-4 ml-4 text-[24px] font-thin z-20 top-0 left-0'>Score: {score}</h2>
        <div className='absolute top-0 left-0 h-full w-1/2 flex items-center justify-center'>
          <div className={`${leftImageSize} transition-all duration-500 relative`}>
            <div className='absolute inset-0 bg-black opacity-50'></div>
            <Image src='/game/egypt.webp' alt='Left Image' layout='fill' objectFit='cover' className=''/>
          </div>
        </div>
        <div className='text-center relative z-10 h-full flex flex-col justify-between bg-black bg-opacity-50 w-full'>
          {!showResult ? (
            <div className='h-full flex flex-col justify-between items-center w-full my-32'>
              <h2 className='text-4xl font-bold'>{currentQuestion.question}</h2>
              <div className='grid grid-rows-2 grid-cols-3 gap-4 mb-4 w-2/3'>
                <div className='flex items-center justify-center row-start-2 col-start-1'>
                  <button className='text-[#F7FFAA] hover:text-white w-[201px] h-[68px] rounded-full border-white border-4 bg-opacity-0 hover:bg-[#F7FFAA] hover:border-[#F7FFAA] transition ease-in-out duration-300' onClick={() => handleAnswer(currentQuestion.options[0], 0)}>
                    <p className='text-[35px] font-thin'>{currentQuestion.options[0]}</p>
                  </button>
                </div>
                <div className='flex items-center justify-center row-start-1 col-start-2'>
                  <button className='text-[#F7FFAA] hover:text-white w-[201px] h-[68px] rounded-full border-white border-4 bg-opacity-0 hover:bg-[#F7FFAA] hover:border-[#F7FFAA] transition ease-in-out duration-300' onClick={() => handleAnswer(currentQuestion.options[1], 1)}>
                    <p className='text-[35px] font-thin'>{currentQuestion.options[1]}</p>
                  </button>
                </div>
                <div className='flex items-center justify-center row-start-2 col-start-3'>
                  <button className='text-[#F7FFAA] hover:text-white w-[201px] h-[68px] rounded-full border-white border-4 bg-opacity-0 hover:bg-[#F7FFAA] hover:border-[#F7FFAA] transition ease-in-out duration-300' onClick={() => handleAnswer(currentQuestion.options[2], 2)}>
                    <p className='text-[35px] font-thin'>{currentQuestion.options[2]}</p>
                  </button>
                </div>
              </div>
            </div>
          ) : (
            <div>
              <h2>Your Final Score: {score}</h2>
            </div>
          )}
        </div>
        <div className='absolute top-0 right-0 h-full w-1/2 flex items-center justify-center'>
          <div className={`${rightImageSize} transition-all duration-500 relative`}>
            <div className='absolute inset-0 bg-black opacity-50'></div>
            <Image src='/game/china.jpg' alt='Right Image' layout='fill' objectFit='cover' />
          </div>
        </div>  
      </main>
    </>
  );
};

export default QuizGame;