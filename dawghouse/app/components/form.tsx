'use client';
import { useEffect, useState } from 'react';
import { League_Spartan } from 'next/font/google';
import { useRouter } from 'next/navigation';

import questionsData from '@/app/questions';

const league = League_Spartan({
    weight: '400',
    subsets: ['latin']
});

interface Question {
    question?: string;
    questions?: string;
    type: 'pick-one' | 'pick-multiple' | 'free-number';
    answers?: string[];
    min?: number;
    max?: number;
}

const Form = () => {

    const router = useRouter();
    const [questions, setQuestions] = useState<Question[]>([]);

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        router.push('/matches');
    };

    useEffect(() => {
        setQuestions(questionsData);
    }, []);

    const renderQuestion = (q: Question, index: number) => {
        const label = q.question || q.questions || `Question ${index + 1}`;

        const inputClass = "mr-3 w-4 h-4 accent-red-700";

        if (q.type === 'free-number') {
            return (
                <div key={index} className="mb-8">
                    <label className="block font-medium mb-2 text-gray-900">{label}</label>
                    <input
                        type="number"
                        name={`question-${index}`}
                        className="border border-gray-300 rounded-md px-4 py-2 w-full shadow-sm"
                    />
                </div>
            );
        }

        if (q.type === 'pick-one') {
            return (
                <div key={index} className="mb-8">
                    <label className="block font-medium mb-3 text-gray-900">{label}</label>
                    <div className="flex flex-col gap-3">
                        {q.answers?.map((ans, i) => (
                            <label key={i} className="flex items-center">
                                <input
                                    type="radio"
                                    id={`q${index}-a${i}`}
                                    name={`question-${index}`}
                                    value={ans}
                                    className={inputClass}
                                />
                                <span className="text-gray-800">{ans}</span>
                            </label>
                        ))}
                    </div>
                </div>
            );
        }

        if (q.type === 'pick-multiple') { // Needs limiter so user cannot select more than q.max
            return (
                <div key={index} className="mb-8">
                    <label className="block font-medium mb-3 text-gray-900">{label}</label>
                    <div className="flex flex-col gap-3">
                        {q.answers?.map((ans, i) => (
                            <label key={i} className="flex items-center">
                                <input
                                    type="checkbox"
                                    id={`q${index}-a${i}`}
                                    name={`question-${index}`}
                                    value={ans}
                                    className={inputClass}
                                />
                                <span className="text-gray-800">{ans}</span>
                            </label>
                        ))}
                    </div>
                </div>
            );
        }

        return null;
    };

    return (
        <div className="w-full min-h-screen">
            <div className="bg-white w-full py-10 px-4 flex justify-center items-center">
                <h1 className={`text-3xl md:text-5xl text-center text-black max-w-4xl ${league.className}`}>
                    Complete the following housing survey to calculate your compatible roommates!
                </h1>
            </div>
    
            <div className="bg-red-200 flex justify-center px-4 py-12 min-h-[calc(100vh-10rem)]">
                <div className="bg-white border-solid rounded-lg shadow-lg/50 w-full max-w-[500px]">
                    <form className="flex flex-col m-10" onSubmit={handleSubmit}>
                        {questions.map((q, index) => renderQuestion(q, index))}
                        <div className="bg-red-800 rounded-md flex justify-center cursor-pointer items-center mt-5 shadow-md">
                            <input className="text-white px-4 cursor-pointer py-2" type="submit" value="Submit" />
                        </div>
                    </form>
                </div>
            </div>
        </div>
    ); // Add check to make sure all questions are answered using id index
    
};

export default Form;