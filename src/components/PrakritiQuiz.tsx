import { useState } from 'react';
import { Leaf, ArrowLeft, ArrowRight } from 'lucide-react';

interface PrakritiQuizProps {
  onComplete: (scores: DoshaScores) => void;
  onBack: () => void;
}

export interface DoshaScores {
  vata: number;
  pitta: number;
  kapha: number;
}

interface Question {
  id: number;
  category: string;
  question: string;
  options: {
    text: string;
    scores: DoshaScores;
  }[];
}

const questions: Question[] = [
  {
    id: 1,
    category: "Physical",
    question: "What best describes your body frame?",
    options: [
      { text: "Thin, light, delicate bones", scores: { vata: 2, pitta: 0, kapha: 0 } },
      { text: "Medium build, moderate muscle tone", scores: { vata: 0, pitta: 2, kapha: 0 } },
      { text: "Large, solid, well-built frame", scores: { vata: 0, pitta: 0, kapha: 2 } }
    ]
  },
  {
    id: 2,
    category: "Physical",
    question: "How would you describe your skin?",
    options: [
      { text: "Dry, rough, cool to touch", scores: { vata: 2, pitta: 0, kapha: 0 } },
      { text: "Warm, oily, prone to redness", scores: { vata: 0, pitta: 2, kapha: 0 } },
      { text: "Thick, moist, smooth, cool", scores: { vata: 0, pitta: 0, kapha: 2 } }
    ]
  },
  {
    id: 3,
    category: "Physical",
    question: "What is your typical body weight pattern?",
    options: [
      { text: "Difficulty gaining weight, lose easily", scores: { vata: 2, pitta: 0, kapha: 0 } },
      { text: "Moderate, stable weight", scores: { vata: 0, pitta: 2, kapha: 0 } },
      { text: "Gain weight easily, hard to lose", scores: { vata: 0, pitta: 0, kapha: 2 } }
    ]
  },
  {
    id: 4,
    category: "Mental",
    question: "How do you learn and process information?",
    options: [
      { text: "Quick to learn, quick to forget", scores: { vata: 2, pitta: 0, kapha: 0 } },
      { text: "Sharp intellect, focused learning", scores: { vata: 0, pitta: 2, kapha: 0 } },
      { text: "Slow to learn, excellent retention", scores: { vata: 0, pitta: 0, kapha: 2 } }
    ]
  },
  {
    id: 5,
    category: "Mental",
    question: "What describes your typical emotional response?",
    options: [
      { text: "Anxious, worried, fearful under stress", scores: { vata: 2, pitta: 0, kapha: 0 } },
      { text: "Irritable, angry, judgmental", scores: { vata: 0, pitta: 2, kapha: 0 } },
      { text: "Calm, stable, sometimes possessive", scores: { vata: 0, pitta: 0, kapha: 2 } }
    ]
  },
  {
    id: 6,
    category: "Physiological",
    question: "How is your digestion?",
    options: [
      { text: "Irregular, bloating, gas", scores: { vata: 2, pitta: 0, kapha: 0 } },
      { text: "Strong, cannot skip meals", scores: { vata: 0, pitta: 2, kapha: 0 } },
      { text: "Slow, steady, can skip meals easily", scores: { vata: 0, pitta: 0, kapha: 2 } }
    ]
  },
  {
    id: 7,
    category: "Physiological",
    question: "What is your sleep pattern like?",
    options: [
      { text: "Light sleeper, interrupted sleep", scores: { vata: 2, pitta: 0, kapha: 0 } },
      { text: "Moderate, sound sleep, 6-7 hours", scores: { vata: 0, pitta: 2, kapha: 0 } },
      { text: "Deep, long sleep, hard to wake", scores: { vata: 0, pitta: 0, kapha: 2 } }
    ]
  },
  {
    id: 8,
    category: "Physiological",
    question: "How is your energy level throughout the day?",
    options: [
      { text: "Bursts of energy, then tired", scores: { vata: 2, pitta: 0, kapha: 0 } },
      { text: "Consistent, strong energy", scores: { vata: 0, pitta: 2, kapha: 0 } },
      { text: "Steady, but takes time to activate", scores: { vata: 0, pitta: 0, kapha: 2 } }
    ]
  },
  {
    id: 9,
    category: "Behavioral",
    question: "How do you approach new situations?",
    options: [
      { text: "Enthusiastic but changeable", scores: { vata: 2, pitta: 0, kapha: 0 } },
      { text: "Determined and goal-oriented", scores: { vata: 0, pitta: 2, kapha: 0 } },
      { text: "Careful, methodical, resistant", scores: { vata: 0, pitta: 0, kapha: 2 } }
    ]
  },
  {
    id: 10,
    category: "Behavioral",
    question: "What is your typical speech pattern?",
    options: [
      { text: "Fast talker, often scattered", scores: { vata: 2, pitta: 0, kapha: 0 } },
      { text: "Sharp, articulate, persuasive", scores: { vata: 0, pitta: 2, kapha: 0 } },
      { text: "Slow, deliberate, melodious", scores: { vata: 0, pitta: 0, kapha: 2 } }
    ]
  }
];

export default function PrakritiQuiz({ onComplete, onBack }: PrakritiQuizProps) {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [scores, setScores] = useState<DoshaScores>({ vata: 0, pitta: 0, kapha: 0 });
  const [selectedOption, setSelectedOption] = useState<number | null>(null);

  const handleOptionSelect = (optionIndex: number) => {
    setSelectedOption(optionIndex);
  };

  const handleNext = () => {
    if (selectedOption !== null) {
      const newScores = {
        vata: scores.vata + questions[currentQuestion].options[selectedOption].scores.vata,
        pitta: scores.pitta + questions[currentQuestion].options[selectedOption].scores.pitta,
        kapha: scores.kapha + questions[currentQuestion].options[selectedOption].scores.kapha
      };
      setScores(newScores);

      if (currentQuestion < questions.length - 1) {
        setCurrentQuestion(currentQuestion + 1);
        setSelectedOption(null);
      } else {
        onComplete(newScores);
      }
    }
  };

  const handlePrevious = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1);
      setSelectedOption(null);
    }
  };

  const progress = ((currentQuestion + 1) / questions.length) * 100;

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 via-orange-50 to-rose-50 py-8 px-4">
      <div className="max-w-3xl mx-auto">
        <div className="mb-8">
          <button
            onClick={onBack}
            className="flex items-center gap-2 text-gray-700 hover:text-gray-900 transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
            Back
          </button>
        </div>

        <div className="bg-white/80 backdrop-blur-sm rounded-3xl p-8 shadow-xl border border-amber-200">
          <div className="flex items-center gap-3 mb-6">
            <Leaf className="w-8 h-8 text-green-700" />
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Prakriti Assessment</h1>
              <p className="text-gray-600">Discover your unique Ayurvedic constitution</p>
            </div>
          </div>

          <div className="mb-8">
            <div className="flex justify-between items-center mb-2">
              <span className="text-sm font-medium text-gray-700">
                Question {currentQuestion + 1} of {questions.length}
              </span>
              <span className="text-sm font-medium text-gray-700">{Math.round(progress)}%</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2.5">
              <div
                className="bg-gradient-to-r from-green-600 to-emerald-600 h-2.5 rounded-full transition-all duration-300"
                style={{ width: `${progress}%` }}
              ></div>
            </div>
          </div>

          <div className="mb-8">
            <div className="inline-block px-4 py-1 bg-amber-100 text-amber-800 rounded-full text-sm font-medium mb-4">
              {questions[currentQuestion].category}
            </div>
            <h2 className="text-2xl font-bold text-gray-900 mb-6">
              {questions[currentQuestion].question}
            </h2>

            <div className="space-y-3">
              {questions[currentQuestion].options.map((option, index) => (
                <button
                  key={index}
                  onClick={() => handleOptionSelect(index)}
                  className={`w-full p-4 text-left rounded-xl border-2 transition-all ${
                    selectedOption === index
                      ? 'border-green-600 bg-green-50 shadow-md'
                      : 'border-gray-200 bg-white hover:border-green-300 hover:bg-green-50/50'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <div
                      className={`w-5 h-5 rounded-full border-2 flex items-center justify-center transition-colors ${
                        selectedOption === index
                          ? 'border-green-600 bg-green-600'
                          : 'border-gray-300'
                      }`}
                    >
                      {selectedOption === index && (
                        <div className="w-2 h-2 bg-white rounded-full"></div>
                      )}
                    </div>
                    <span className="text-gray-800 font-medium">{option.text}</span>
                  </div>
                </button>
              ))}
            </div>
          </div>

          <div className="flex justify-between items-center">
            <button
              onClick={handlePrevious}
              disabled={currentQuestion === 0}
              className="flex items-center gap-2 px-6 py-3 text-gray-700 hover:text-gray-900 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
            >
              <ArrowLeft className="w-5 h-5" />
              Previous
            </button>

            <button
              onClick={handleNext}
              disabled={selectedOption === null}
              className="flex items-center gap-2 px-8 py-3 bg-gradient-to-r from-green-600 to-emerald-600 text-white font-semibold rounded-xl hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed transition-all transform hover:scale-105 disabled:hover:scale-100"
            >
              {currentQuestion === questions.length - 1 ? 'Complete' : 'Next'}
              <ArrowRight className="w-5 h-5" />
            </button>
          </div>
        </div>

        <div className="mt-6 p-6 bg-white/60 backdrop-blur-sm rounded-xl border border-amber-200">
          <h3 className="font-semibold text-gray-900 mb-2">Understanding Doshas</h3>
          <div className="grid grid-cols-3 gap-4 text-sm">
            <div>
              <span className="font-medium text-blue-700">Vata:</span>
              <span className="text-gray-600"> Air & Space - Movement, creativity</span>
            </div>
            <div>
              <span className="font-medium text-red-700">Pitta:</span>
              <span className="text-gray-600"> Fire & Water - Transformation, metabolism</span>
            </div>
            <div>
              <span className="font-medium text-green-700">Kapha:</span>
              <span className="text-gray-600"> Earth & Water - Structure, stability</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
