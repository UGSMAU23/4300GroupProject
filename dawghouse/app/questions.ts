export interface Question {
    question?: string;
    questions?: string;
    type: 'pick-one' | 'pick-multiple' | 'free-number';
    answers?: string[];
    min?: number;
    max?: number;
}

const questions: Question[] = [
    {
        question: "Gender:",
        type: "pick-one",
        answers: ["Male", "Female", "Non-Binary", "Other"]
    },
    {
        question: "Age:",
        type: "free-number"
    },
    {
        question: "I prefer to live with:",
        type: "pick-one",
        answers: ["Same Sex Only", "Opposite Sex is OK"]
    },
    {
        question: "Enrollment status as of August 2025:",
        type: "pick-one",
        answers: ["Freshman", "Sophomore", "Junior", "Senior", "Graduate Student"]
    },
    {
        question: "I prefer to live in a:",
        type: "pick-one",
        answers: ["A very clean place", "A mostly clean place", "A messy place", "No preference"]
    },
    {
        question: "I prefer to live in the following neighborhoods:",
        type: "pick-multiple",
        max: 4,
        answers: ["Five Points", "Pulaski Heights", "Macon Highway", "North Ave"]
    },
    {
        question: "I would describe myself as:",
        type: "pick-one",
        answers: ["Shy", "Fairly Shy", "Fairly Outgoing", "Outgoing"]
    },
    {
        question: "I would prefer my roommate to be:",
        type: "pick-one",
        answers: ["Shy", "Fairly Shy", "Fairly Outgoing", "Outgoing", "No preference"]
    },
    {
        question: "I will probably be at my apartment:",
        type: "pick-one",
        answers: ["A majority of the time", "I may be gone on weekends", "I will hardly be home"]
    },
    {
        question: "I prefer my roommate to be in the apartment:",
        type: "pick-one",
        answers: ["A majority of the time", "Gone on weekends", "Hardly home", "No preference"]
    },
    {
        question: "I prefer my roommate to be someone who:",
        type: "pick-one",
        answers: ["I can be good friends with", "I can just peacefully coexist with", "No preference"]
    },
    {
        question: "Describe your alcohol use:",
        type: "pick-one",
        answers: ["Never", "Rarely", "Sometimes", "Often", "Frequently"]
    },
    {
        question: "Do you mind if your roommate drinks? (alcohol)",
        type: "pick-one",
        answers: ["Yes", "No, but I dont want it to be a regular occurrence", "No; anytime is OK"]
    },
    {
        question: "Do you smoke?",
        type: "pick-one",
        answers: ["Yes", "No"]
    },
    {
        question: "Do you mind if your roommates smoke?",
        type: "pick-one",
        answers: ["Yes, do not match me with smokers", "No"]
    },
    {
        question: "How often do you plan to have guests over?",
        type: "pick-one",
        answers: ["Never", "Rarely", "Sometimes", "Often", "Frequently"]
    },
    {
        question: "How often do you prefer your roommates to have guests over?",
        type: "pick-one",
        answers: ["Never", "Rarely", "Sometimes", "Often", "Frequently", "No preference"]
    },
    {
        question: "Which statement best reflects your preferences?",
        type: "pick-one",
        answers: [
            "I would prefer to live with a morning person because I am a morning person.",
            "I would prefer to live with a night person because I am a night person.",
            "I have no preference on what kind of day person I would like to live with."
        ]
    },
    {
        question: "Choose your top 3-5 concerns about future roommates:",
        type: "pick-multiple",
        min: 3,
        max: 5,
        answers: [
            "Obnoxious Behavior",
            "Not picking up after themselves",
            "Parties/Friends over too much",
            "Boy/Girlfriend over all the time",
            "Loud music/TV",
            "Messy living",
            "Eating my food",
            "Being loud when I study/sleep",
            "Friendliness",
            "Respect for my privacy",
            "Be respectful of roommates",
            "Drug use",
            "Prefer someone with strong faith",
            "Open-minded/Not prejudice",
            "Close to my age",
            "Prefer quiet roommates",
            "Likes to cook",
            "No live-in guests",
            "Chores are shared",
            "Using my things without asking"
        ]
    }
];

export default questions;  