'use client';

import { useRouter } from "next/navigation";
import { SettingsProp } from "../settingsCard";

function Questionaire(props: SettingsProp) {
  const router = useRouter();

  const onSubmit = () => {
    router.push("/quiz");
  };
  return (
    <div className="md:mr-10 md:ml-20 md:mt-10 w-80 h-85 pt-10 flex flex-col items-start space-y-6">
      <p className="text-gray-700">
        Have something you'd like to change? View your current answers and retake the roommate quiz below.
      </p>
      <button onClick={onSubmit} className="bg-red-800 hover:bg-red-900 cursor-pointer p-2 text-white rounded-lg">
        Retake Questionnaire
      </button>
    </div>
  );
}

export default Questionaire;