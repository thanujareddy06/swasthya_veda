import { Leaf, Wind, Flame, Droplets, ArrowRight } from 'lucide-react';
import { DoshaScores } from './PrakritiQuiz';

interface DoshaResultsProps {
  scores: DoshaScores;
  onContinue: () => void;
}

export default function DoshaResults({ scores, onContinue }: DoshaResultsProps) {
  const total = scores.vata + scores.pitta + scores.kapha;
  const percentages = {
    vata: Math.round((scores.vata / total) * 100),
    pitta: Math.round((scores.pitta / total) * 100),
    kapha: Math.round((scores.kapha / total) * 100)
  };

  const dominant = Object.entries(percentages).sort((a, b) => b[1] - a[1])[0][0];
  const dominantName = dominant.charAt(0).toUpperCase() + dominant.slice(1);

  const getDoshaInfo = (dosha: string) => {
    const info = {
      vata: {
        icon: <Wind className="w-12 h-12" />,
        color: 'blue',
        element: 'Air & Space',
        qualities: ['Quick', 'Creative', 'Energetic', 'Changeable'],
        balance: 'Warm, grounding foods; regular routines; calming practices',
        imbalance: 'Anxiety, dry skin, constipation, irregular digestion'
      },
      pitta: {
        icon: <Flame className="w-12 h-12" />,
        color: 'red',
        element: 'Fire & Water',
        qualities: ['Intense', 'Focused', 'Leader', 'Competitive'],
        balance: 'Cooling foods; avoid spicy; moderate activity; stress management',
        imbalance: 'Irritability, inflammation, acidity, skin rashes'
      },
      kapha: {
        icon: <Droplets className="w-12 h-12" />,
        color: 'green',
        element: 'Earth & Water',
        qualities: ['Stable', 'Calm', 'Nurturing', 'Enduring'],
        balance: 'Light, warm foods; regular exercise; variety and stimulation',
        imbalance: 'Weight gain, lethargy, congestion, depression'
      }
    };
    return info[dosha as keyof typeof info];
  };

  const dominantInfo = getDoshaInfo(dominant);

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 via-orange-50 to-rose-50 py-8 px-4">
      <div className="max-w-5xl mx-auto">
        <div className="bg-white/80 backdrop-blur-sm rounded-3xl p-8 shadow-xl border border-amber-200 mb-6">
          <div className="text-center mb-12">
            <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-green-500 to-emerald-600 text-white rounded-full mb-4">
              <Leaf className="w-10 h-10" />
            </div>
            <h1 className="text-4xl font-bold text-gray-900 mb-2">Your Prakriti Profile</h1>
            <p className="text-xl text-gray-600">Your unique Ayurvedic constitution</p>
          </div>

          <div className="mb-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">Dosha Distribution</h2>
            <div className="space-y-4">
              <DoshaBar
                name="Vata"
                percentage={percentages.vata}
                color="blue"
                icon={<Wind className="w-6 h-6" />}
              />
              <DoshaBar
                name="Pitta"
                percentage={percentages.pitta}
                color="red"
                icon={<Flame className="w-6 h-6" />}
              />
              <DoshaBar
                name="Kapha"
                percentage={percentages.kapha}
                color="green"
                icon={<Droplets className="w-6 h-6" />}
              />
            </div>
          </div>

          <div className="grid md:grid-cols-3 gap-6 mb-8">
            <DoshaCard
              name="Vata"
              percentage={percentages.vata}
              info={getDoshaInfo('vata')}
              isDominant={dominant === 'vata'}
            />
            <DoshaCard
              name="Pitta"
              percentage={percentages.pitta}
              info={getDoshaInfo('pitta')}
              isDominant={dominant === 'pitta'}
            />
            <DoshaCard
              name="Kapha"
              percentage={percentages.kapha}
              info={getDoshaInfo('kapha')}
              isDominant={dominant === 'kapha'}
            />
          </div>
        </div>

        <div className="bg-gradient-to-br from-amber-100 to-orange-100 rounded-3xl p-8 shadow-xl border-2 border-amber-300 mb-6">
          <div className={`inline-flex items-center justify-center w-16 h-16 bg-${dominantInfo.color}-500 text-white rounded-2xl mb-4`}>
            {dominantInfo.icon}
          </div>
          <h2 className="text-3xl font-bold text-gray-900 mb-2">
            You are predominantly {dominantName}
          </h2>
          <p className="text-lg text-gray-700 mb-6">
            Element: {dominantInfo.element}
          </p>

          <div className="grid md:grid-cols-2 gap-6 mb-8">
            <div className="bg-white/60 rounded-xl p-6">
              <h3 className="font-bold text-gray-900 mb-3">Your Qualities</h3>
              <div className="flex flex-wrap gap-2">
                {dominantInfo.qualities.map((quality, index) => (
                  <span
                    key={index}
                    className={`px-3 py-1 bg-${dominantInfo.color}-100 text-${dominantInfo.color}-800 rounded-full text-sm font-medium`}
                  >
                    {quality}
                  </span>
                ))}
              </div>
            </div>

            <div className="bg-white/60 rounded-xl p-6">
              <h3 className="font-bold text-gray-900 mb-3">Balance Through</h3>
              <p className="text-gray-700 text-sm leading-relaxed">{dominantInfo.balance}</p>
            </div>
          </div>

          <div className="bg-white/60 rounded-xl p-6">
            <h3 className="font-bold text-gray-900 mb-2">Watch for Imbalance</h3>
            <p className="text-gray-700 text-sm">{dominantInfo.imbalance}</p>
          </div>
        </div>

        <div className="text-center">
          <button
            onClick={onContinue}
            className="inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-green-600 to-emerald-600 text-white text-lg font-semibold rounded-xl hover:shadow-xl transition-all transform hover:scale-105"
          >
            Continue to Dashboard
            <ArrowRight className="w-5 h-5" />
          </button>
        </div>
      </div>
    </div>
  );
}

interface DoshaBarProps {
  name: string;
  percentage: number;
  color: string;
  icon: React.ReactNode;
}

function DoshaBar({ name, percentage, color, icon }: DoshaBarProps) {
  const colorClasses = {
    blue: 'from-blue-500 to-cyan-500',
    red: 'from-red-500 to-orange-500',
    green: 'from-green-500 to-emerald-500'
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-2">
        <div className="flex items-center gap-2">
          <div className={`text-${color}-600`}>{icon}</div>
          <span className="font-semibold text-gray-900">{name}</span>
        </div>
        <span className="font-bold text-gray-900">{percentage}%</span>
      </div>
      <div className="w-full bg-gray-200 rounded-full h-4">
        <div
          className={`bg-gradient-to-r ${colorClasses[color as keyof typeof colorClasses]} h-4 rounded-full transition-all duration-1000`}
          style={{ width: `${percentage}%` }}
        ></div>
      </div>
    </div>
  );
}

interface DoshaCardProps {
  name: string;
  percentage: number;
  info: any;
  isDominant: boolean;
}

function DoshaCard({ name, percentage, info, isDominant }: DoshaCardProps) {
  return (
    <div
      className={`p-6 rounded-xl border-2 ${
        isDominant
          ? 'border-amber-400 bg-gradient-to-br from-amber-50 to-orange-50'
          : 'border-gray-200 bg-white/60'
      }`}
    >
      {isDominant && (
        <div className="inline-block px-3 py-1 bg-amber-500 text-white text-xs font-bold rounded-full mb-3">
          DOMINANT
        </div>
      )}
      <div className={`inline-flex items-center justify-center w-12 h-12 bg-${info.color}-500 text-white rounded-xl mb-3`}>
        {info.icon}
      </div>
      <h3 className="text-xl font-bold text-gray-900 mb-1">{name}</h3>
      <p className="text-sm text-gray-600 mb-3">{info.element}</p>
      <div className="text-2xl font-bold text-gray-900">{percentage}%</div>
    </div>
  );
}
