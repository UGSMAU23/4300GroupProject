'use client';
import { useEffect, useState } from 'react';
import { League_Spartan } from 'next/font/google';
import { useRouter } from 'next/navigation';
import { useSession } from 'next-auth/react';
import questionsData from '@/app/questions';

const league = League_Spartan({
    weight: '400',
    subsets: ['latin']
});

interface Question {
    question?: string;
    questions?: string;
    type: 'pick-one' | 'pick-multiple' | 'free-number' | 'free-text' | 'phone-number' | 'email';
    answers?: string[];
    min?: number;
    max?: number;
}

const Form = () => {

    const router = useRouter();
    const { data: session } = useSession();
    const [questions, setQuestions] = useState<Question[]>([]);
    const [responses, setResponses] = useState<Record<number, string | string[]>>({});

    useEffect(() => {
        setQuestions(questionsData);
    }, []);

    const handleChange = (index: number, value: string | string[]) => {
        setResponses((prev) => ({ ...prev, [index]: value }));
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
    
        if (!session?.user?.email) {
          console.error("User session or email not available");
          return;
        }
    
        try {
          // Get user by email to retrieve MongoDB _id
          const resUser = await fetch(`/api?email=${session.user.email}`);
          const userData = await resUser.json();
          const userId = userData.user?._id;
    
          if (!userId) {
            console.error("User ID not found");
            return;
          }
          const answersArray = questions.map((q, index) => {
            const rawLabel = q.question || q.questions || `Question ${index + 1}`;
            const label = rawLabel.replace(/:$/, ""); // remove trailing colon if present
            const response = responses[index];
          
            if (Array.isArray(response)) {
              return `${label}: ${response.join(", ")}`;
            }
          
            return `${label}: ${response || "No answer"}`;
          });
          console.log("Submitting answers:", answersArray);

          const excludedLabels = [
            "I would like potential roommates to contact me via",
            "Phone Number (if selected above)",
            "Email (if selected above)"
          ];

          const filteredAnswersArray = answersArray.filter(answer => {
            return !excludedLabels.some(label => answer.startsWith(label));
          });
    
          // Submit answers to /api/user/[id]
          const updateRes = await fetch(`/api/user/${userId}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ answers: answersArray })
          });
    
          if (updateRes.ok) {

            const gptResponse = await fetch('/api/generate', {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({
                prompt: `The following are survey answers from a college student filling out a roommate compatibility form. Write a short paragraph (3-4 sentences) that summarizes their lifestyle, habits, and roommate preferences in a friendly tone starting with "This student...". :\n\n${filteredAnswersArray.join(', ')}`
              })
            });
            
            const { result: generatedDescription } = await gptResponse.json();
            console.log("GPT Description: ", generatedDescription);

            const updateDescription = await fetch(`/api/user/${userId}`, {
              method: 'PUT',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({ description: generatedDescription })
            });
            
            if (updateDescription.ok) {
              console.log("Updated the description for a user.");
            } else {
              console.log("Failed to update user description.");
            }

            router.push('/matches');
          } else {
            console.error("Failed to submit answers");
          }
        } catch (err) {
          console.error("Error submitting form:", err);
        }
      };
    

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
                onChange={(e) => handleChange(index, e.target.value)}
              />
            </div>
          );
        }

        if (q.type === 'phone-number') {
          return (
            <div key={index} className="mb-8">
              <label className="block font-medium mb-2 text-gray-900">{label}</label>
              <input
                type="tel"
                name={`question-${index}`}
                className="border border-gray-300 rounded-md px-4 py-2 w-full shadow-sm"
                onChange={(e) => handleChange(index, e.target.value)}
              />
            </div>
          );
        }

        if (q.type === 'email') {
          return (
            <div key={index} className="mb-8">
              <label className="block font-medium mb-2 text-gray-900">{label}</label>
              <input
                type="email"
                name={`question-${index}`}
                className="border border-gray-300 rounded-md px-4 py-2 w-full shadow-sm"
                onChange={(e) => handleChange(index, e.target.value)}
              />
            </div>
          );
        }

        if (q.type === 'free-text') {
          return (
            <div key={index} className="mb-8">
              <label className="block font-medium mb-2 text-gray-900">{label}</label>
              <input
                type="text"
                name={`question-${index}`}
                className="border border-gray-300 rounded-md px-4 py-2 w-full shadow-sm"
                onChange={(e) => handleChange(index, e.target.value)}
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
                      onChange={() => handleChange(index, ans)}
                    />
                    <span className="text-gray-800">{ans}</span>
                  </label>
                ))}
              </div>
            </div>
          );
        }
    
        if (q.type === 'pick-multiple') {
          const currentValues = (responses[index] as string[]) || [];
    
          const toggleCheckbox = (ans: string, checked: boolean) => {
            const updated = checked
              ? [...currentValues, ans]
              : currentValues.filter((val) => val !== ans);
    
            handleChange(index, updated);
          };
    
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
                      checked={currentValues.includes(ans)}
                      onChange={(e) => toggleCheckbox(ans, e.target.checked)}
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
            <h1 className="text-3xl md:text-5xl text-center text-black max-w-4xl">
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
      );
    };
    
    export default Form;