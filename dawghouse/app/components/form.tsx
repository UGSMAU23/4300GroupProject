'use client';
import { useEffect, useState } from 'react';
import { League_Spartan } from 'next/font/google';
import { useRouter } from 'next/navigation';
import { useSession } from 'next-auth/react';
import questionsData from '@/app/questions';
import { toast, ToastContainer } from 'react-toastify';

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
    
      async function fetchPreviousAnswers() {
        if (!session?.user?.email) return;
        const loadingAnswersToast = toast.loading("Loading Previous Results...", {position: "top-center", progress: 0});
        try {
          // Get user ID from email
          const resUser = await fetch(`/api?email=${session.user.email}`);
          const userData = await resUser.json();
          const userId = userData.user?._id;
    
          if (!userId) return;
          toast.update(loadingAnswersToast, {progress: .25});
          // Fetch saved answers
          const resAnswers = await fetch(`/api/user/${userId}`);
          const answerData = await resAnswers.json();
          const savedAnswers: string[] = answerData.answers;
    
          toast.update(loadingAnswersToast, {progress: .5});
          // Map those answers back into the responses state
          const restoredResponses: Record<number, string | string[]> = {};
          savedAnswers.forEach((entry: string, index: number) => {
            const [label, ...rest] = entry.split(": ");
            const answerText = rest.join(": ").trim();
            if (answerText === "No answer") return;
            const question = questionsData[index];
    
            if (question?.type === 'pick-multiple') {
              restoredResponses[index] = answerText.split(", ").filter(Boolean);
            } else {
              restoredResponses[index] = answerText;
            }
          });
          toast.update(loadingAnswersToast, {progress: .75});
          setResponses(restoredResponses);
        } catch (err) {
          console.error("Failed to load saved answers:", err);
          toast.update(loadingAnswersToast, {render: "Error loading saved answers", type: "error", progress: 1, autoClose: 2000})
          return;
        }
        toast.update(loadingAnswersToast, {render: "Previous answers loaded", type: "success", progress: 1, autoClose: 2000});
      };
    
      fetchPreviousAnswers();
      // Removed session from the useEffect
    }, []);

    const handleChange = (index: number, value: string | string[]) => {
        setResponses((prev) => ({ ...prev, [index]: value }));
    };

    const calculateScores = () => {
      const get = (i: number) => responses[i] as string;
    
      let personality = 50; // 0 - Shy, 100 - Active
      let gender = 0;
      let living = 50; // 0 - Messy and crowded, 100 - Clean and quiet
      let substances = 100; // 0 - No substances, 100 - Substances

      // Gender
      const myGen = get(0);
      if (myGen.includes("Male")) gender = -50;
      else if (myGen.includes("Other")) gender = 0;
      else gender = 50;

      const otherGen = get(2);
      if (otherGen.includes("Opposite")) gender *= 0.2;
      
      gender += 50;

      // Living
      const cleanliness = get(4);
      if (cleanliness.includes("very clean")) living += 40;
      else if (cleanliness.includes("mostly clean")) living += 20;
      else if (cleanliness.includes("messy")) living -= 30;

      const myCrowd = get(15);
      if (myCrowd.includes("Never")) living += 20;
      else if (myCrowd.includes("Rarely")) living += 12;
      else if (myCrowd.includes("Sometimes")) living += 5;
      else if (myCrowd.includes("Often")) living -= 5;
      else living -= 12;

      const otherCrowd = get(16);
      if (otherCrowd.includes("Never")) living += 12;
      else if (otherCrowd.includes("Rarely")) living += 4;
      else if (otherCrowd.includes("Sometimes")) living += 0;
      else if (otherCrowd.includes("Often")) living -= 10;
      else living -= 15;

      // Personality
      const timePerson = get(17);
      if (timePerson.includes("morning")) personality -= 25;
      else if (timePerson.includes("night")) personality += 18;
      else personality += 8;

      const meShy = get(6);
      if (meShy.includes("Fairly Shy")) personality -= 38;
      else if (meShy.includes("Fairly Outgoing")) personality += 10;
      else if (meShy.includes("Shy")) personality -= 55;
      else if (meShy.includes("Outgoing")) personality += 25;

      const otherShy = get(7);
      if (otherShy.includes("Fairly Shy")) personality -= 14;
      else if (otherShy.includes("Fairly Outgoing")) personality += 14;
      else if (otherShy.includes("Shy")) personality -= 20;
      else if (otherShy.includes("Outgoing")) personality += 20;

      const meAtHome = get(8);
      if (meAtHome.includes("majority")) personality += 10;
      else if (meAtHome.includes("gone")) personality -= 2;
      else personality -= 12;

      const otherAtHome = get(9);
      if (otherAtHome.includes("majority")) personality += 15;
      else if (otherAtHome.includes("Gone")) personality -= 4;
      else if (otherAtHome.includes("Hardly")) personality -= 14;

      const friendly = get(10);
      if (friendly.includes("good")) personality += 12;
      else if (friendly.includes("peacefully")) personality += 5;
      else personality -= 8;

      // Substances
      const myAlcUse = get(11);
      if (myAlcUse.includes("Never")) substances -= 30;
      else if ((myAlcUse).includes("Rarely")) substances -= 20;
      else if ((myAlcUse).includes("Sometimes")) substances -= 10;
      else if ((myAlcUse).includes("Often")) substances -= 2;

      const otherAlcUse = get(12);
      if ((otherAlcUse).includes("Yes")) substances -= 50;
      else if ((otherAlcUse).includes("regular")) substances -= 20;
      else substances += 10;

      const mySmoke = get(13);
      if ((mySmoke).includes("Yes")) substances += 10;
      else substances -= 20;

      const otherSmoke = get(14);
      if ((otherSmoke).includes("Yes")) substances -= 35;
      else substances += 5;
    
      const clamp = (v: number) => Math.max(0, Math.min(100, v));
    
      return {
        personality: clamp(personality),
        living: clamp(living),
        substances: clamp(substances),
        gender: clamp(gender),
        age: parseInt(responses[1] as string) || 20,
        locations: responses[5] as string[] || []
      };
      // Compare values using cosine vector similarity https://www.geeksforgeeks.org/cosine-similarity/
      // Tether final score to locations arr similarity
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const loadToast = toast.loading("Generating Your Profile", {position: 'top-center', progress: 0});
    
        if (!session?.user?.email) {
          console.error("User session or email not available");
          toast.update(loadToast, {render: "Error with user session. Please try again", type: "error", isLoading: false, autoClose: 3000})
          return;
        }
    
        try {
          // Get user by email to retrieve MongoDB _id
          toast.update(loadToast, {render: "Retrieving Your Data", progress: .25});
          const resUser = await fetch(`/api?email=${session.user.email}`);
          const userData = await resUser.json();
          const userId = userData.user?._id;
    
          if (!userId) {
            console.error("User ID not found");
            toast.update(loadToast, {render: "User ID Not Found. Please try again", type: "error", isLoading: false, autoClose: 3000})
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
          toast.update(loadToast, {render: "Submitting Answers to Database", progress: .5});

          const excludedLabels = [
            "I would like potential roommates to contact me via",
            "Phone Number (if selected above)",
            "Email (if selected above)"
          ];

          const filteredAnswersArray = answersArray.filter(answer => {
            return !excludedLabels.some(label => answer.startsWith(label));
          });

          // Submit scores
          toast.update(loadToast, {render: "Submitting Score", progress: .625});
          const scoresArr = calculateScores();
          console.log("Scores:", scoresArr);

          const scoringWait = await fetch(`/api/user/${userId}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ scores: scoresArr })
          });

          if (scoringWait.ok) {
            // Submit answers to /api/user/[id]
            const updateRes = await fetch(`/api/user/${userId}`, {
              method: 'PUT',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({ answers: answersArray })
            });
      
            if (updateRes.ok) {
              toast.update(loadToast, {render: "Generating Summary", progress: .75});
              const gptResponse = await fetch('/api/generate', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                  prompt: `The following are survey answers from a college student filling out a roommate compatibility form. Write a short paragraph (3-4 sentences) that summarizes their lifestyle, habits, and roommate preferences in a friendly tone starting with "This student...". :\n\n${filteredAnswersArray.join(', ')}`
                })
              });
              
              const { result: generatedDescription } = await gptResponse.json();
              console.log("GPT Description: ", generatedDescription);

              toast.update(loadToast, {render: "Saving Summary to Database", progress: .9});
              const updateDescription = await fetch(`/api/user/${userId}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ description: generatedDescription })
              });

              
              if (updateDescription.ok) {
                console.log("Updated the description for a user.");
                toast.update(loadToast, {render: "Profile Generated Successfully", type: "success", isLoading: false, autoClose: 2000, progress: null})
              } else {
                console.log("Failed to update user description.");
                toast.update(loadToast, {render: "Failed to Generate User Profile", type: "error", isLoading: false, autoClose: 3000})
              }
              await new Promise(r => setTimeout(r, 2000));
              router.push('/matches');
            } else {
              console.error("Failed to submit answers");
              toast.update(loadToast, {render: "Failed to submit answers. Please try again", type: "error", isLoading: false, autoClose: 3000})
            }
          }
        } catch (err) {
          console.error("Error submitting form:", err);
          toast.update(loadToast, {render: "Error submitting form.", type: "error", isLoading: false, autoClose: 3000})
        }
      };
    
      const renderQuestion = (q: Question, index: number) => {
        const label = q.question || q.questions || `Question ${index + 1}`;
        const inputClass = "mr-3 w-4 h-4 accent-red-800";
        const isRequired = index < questions.length - 2;
    
        if (q.type === 'free-number') {
          return (
            <div key={index} className="mb-8">
              <label className="block font-medium mb-2 text-gray-900">{label}</label>
              <input
                type="number"
                required={isRequired}
                name={`question-${index}`}
                value={responses[index] || ''}
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
                required={isRequired}
                name={`question-${index}`}
                value={responses[index] || ''}
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
                required={isRequired}
                name={`question-${index}`}
                value={responses[index] || ''}
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
                required={isRequired}
                name={`question-${index}`}
                className="border border-gray-300 rounded-md px-4 py-2 w-full shadow-sm"
                value={(responses[index] as string) || ''}
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
                      required={isRequired}
                      id={`q${index}-a${i}`}
                      name={`question-${index}`}
                      value={ans}
                      className={inputClass}
                      checked={responses[index] === ans}
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
                      checked={(responses[index] as string[] | undefined)?.includes(ans) || false}
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
          <ToastContainer limit={1}/>
          <div className="bg-white w-full py-10 px-4 flex justify-center items-center">
            <h1 className="text-2xl md:text-4xl text-center text-black max-w-4xl">
              Complete the following housing survey to calculate your compatible roommates!
            </h1>
          </div>
    
          <div className="bg-red-200 flex justify-center px-4 py-12 min-h-[calc(100vh-10rem)]">
            <div className="bg-white border-solid rounded-lg shadow-lg/50 w-full max-w-[500px]">
              <form className="flex flex-col m-10" onSubmit={handleSubmit}>
                {questions.map((q, index) => renderQuestion(q, index))}
                <div className="bg-red-800 rounded-md flex justify-center cursor-pointer items-center mt-5 shadow-md">
                  <input className="text-white px-4 cursor-pointer py-2 w-full" type="submit" value="Submit" />
                </div>
              </form>
            </div>
          </div>
        </div>
      );
    };
    
    export default Form;