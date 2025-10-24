import { useState } from 'react';
import { Leaf, Calendar, BookOpen, MessageCircle, User, TrendingUp, Utensils, Activity } from 'lucide-react';
import { DoshaScores } from './PrakritiQuiz';
import DoshaWheel from './DoshaWheel';
import FoodDatabase from './FoodDatabase';
import ChatBot from './ChatBot';

interface DashboardProps {
  doshaScores: DoshaScores;
}

type Tab = 'overview' | 'foods' | 'meals' | 'journal' | 'chat' | 'profile';

export default function Dashboard({ doshaScores }: DashboardProps) {
  const [activeTab, setActiveTab] = useState<Tab>('overview');

  const total = doshaScores.vata + doshaScores.pitta + doshaScores.kapha;
  const percentages = {
    vata: Math.round((doshaScores.vata / total) * 100),
    pitta: Math.round((doshaScores.pitta / total) * 100),
    kapha: Math.round((doshaScores.kapha / total) * 100)
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 via-orange-50 to-rose-50">
      <nav className="bg-white/80 backdrop-blur-sm border-b border-amber-200 sticky top-0 z-50">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Leaf className="w-8 h-8 text-green-700" />
              <span className="text-2xl font-bold text-green-900">AyurWell AI</span>
            </div>
            <div className="flex items-center gap-6">
              <button className="p-2 hover:bg-amber-100 rounded-lg transition-colors">
                <User className="w-6 h-6 text-gray-700" />
              </button>
            </div>
          </div>
        </div>
      </nav>

      <div className="container mx-auto px-6 py-8">
        <div className="grid lg:grid-cols-12 gap-6">
          <aside className="lg:col-span-3">
            <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-4 border border-amber-200 sticky top-24">
              <nav className="space-y-2">
                <NavButton
                  icon={<TrendingUp className="w-5 h-5" />}
                  label="Overview"
                  active={activeTab === 'overview'}
                  onClick={() => setActiveTab('overview')}
                />
                <NavButton
                  icon={<BookOpen className="w-5 h-5" />}
                  label="Food Database"
                  active={activeTab === 'foods'}
                  onClick={() => setActiveTab('foods')}
                />
                <NavButton
                  icon={<Utensils className="w-5 h-5" />}
                  label="Meal Plans"
                  active={activeTab === 'meals'}
                  onClick={() => setActiveTab('meals')}
                />
                <NavButton
                  icon={<Calendar className="w-5 h-5" />}
                  label="Health Journal"
                  active={activeTab === 'journal'}
                  onClick={() => setActiveTab('journal')}
                />
                <NavButton
                  icon={<MessageCircle className="w-5 h-5" />}
                  label="AyurWell AI"
                  active={activeTab === 'chat'}
                  onClick={() => setActiveTab('chat')}
                />
                <NavButton
                  icon={<User className="w-5 h-5" />}
                  label="Profile"
                  active={activeTab === 'profile'}
                  onClick={() => setActiveTab('profile')}
                />
              </nav>
            </div>
          </aside>

          <main className="lg:col-span-9">
            {activeTab === 'overview' && <OverviewTab percentages={percentages} />}
            {activeTab === 'foods' && <FoodDatabase doshaScores={percentages} />}
            {activeTab === 'meals' && <MealPlansTab />}
            {activeTab === 'journal' && <JournalTab />}
            {activeTab === 'chat' && <ChatBot doshaScores={percentages} />}
            {activeTab === 'profile' && <ProfileTab />}
          </main>
        </div>
      </div>
    </div>
  );
}

interface NavButtonProps {
  icon: React.ReactNode;
  label: string;
  active: boolean;
  onClick: () => void;
}

function NavButton({ icon, label, active, onClick }: NavButtonProps) {
  return (
    <button
      onClick={onClick}
      className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${
        active
          ? 'bg-gradient-to-r from-green-600 to-emerald-600 text-white shadow-md'
          : 'text-gray-700 hover:bg-amber-100'
      }`}
    >
      {icon}
      <span className="font-medium">{label}</span>
    </button>
  );
}

interface OverviewTabProps {
  percentages: {
    vata: number;
    pitta: number;
    kapha: number;
  };
}

function OverviewTab({ percentages }: OverviewTabProps) {
  return (
    <div className="space-y-6">
      <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-8 border border-amber-200">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">Your Dosha Balance</h2>
        <div className="flex justify-center">
          <DoshaWheel percentages={percentages} />
        </div>
      </div>

      <div className="grid md:grid-cols-3 gap-6">
        <StatCard
          title="Daily Wellness Score"
          value="85"
          subtitle="Great balance"
          color="green"
          icon={<Activity className="w-6 h-6" />}
        />
        <StatCard
          title="Water Intake"
          value="2.1L"
          subtitle="of 2.5L goal"
          color="blue"
          icon={<Activity className="w-6 h-6" />}
        />
        <StatCard
          title="Meal Adherence"
          value="92%"
          subtitle="This week"
          color="orange"
          icon={<Utensils className="w-6 h-6" />}
        />
      </div>

      <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-8 border border-amber-200">
        <h3 className="text-xl font-bold text-gray-900 mb-4">Today's Recommendations</h3>
        <div className="space-y-3">
          <RecommendationItem
            text="Start your day with warm lemon water to support digestion"
            color="green"
          />
          <RecommendationItem
            text="Include cooling foods like cucumber and coconut today"
            color="blue"
          />
          <RecommendationItem
            text="Practice 10 minutes of meditation for Vata balance"
            color="purple"
          />
        </div>
      </div>
    </div>
  );
}

function MealPlansTab() {
  return (
    <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-8 border border-amber-200">
      <h2 className="text-2xl font-bold text-gray-900 mb-6">Meal Plans</h2>
      <p className="text-gray-600 mb-6">
        AI-generated personalized meal plans will appear here, combining Ayurvedic principles with modern nutrition.
      </p>
      <button className="px-6 py-3 bg-gradient-to-r from-green-600 to-emerald-600 text-white font-semibold rounded-xl hover:shadow-lg transition-all">
        Generate New Plan
      </button>
    </div>
  );
}

function JournalTab() {
  return (
    <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-8 border border-amber-200">
      <h2 className="text-2xl font-bold text-gray-900 mb-6">Health Journal</h2>
      <p className="text-gray-600 mb-6">
        Track your daily wellness including mood, energy, digestion, sleep, and symptoms.
      </p>
      <button className="px-6 py-3 bg-gradient-to-r from-green-600 to-emerald-600 text-white font-semibold rounded-xl hover:shadow-lg transition-all">
        Add Entry
      </button>
    </div>
  );
}

function ProfileTab() {
  return (
    <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-8 border border-amber-200">
      <h2 className="text-2xl font-bold text-gray-900 mb-6">Your Profile</h2>
      <p className="text-gray-600 mb-6">
        Manage your health information, preferences, and account settings.
      </p>
    </div>
  );
}

interface StatCardProps {
  title: string;
  value: string;
  subtitle: string;
  color: string;
  icon: React.ReactNode;
}

function StatCard({ title, value, subtitle, color, icon }: StatCardProps) {
  const colorClasses = {
    green: 'from-green-500 to-emerald-500',
    blue: 'from-blue-500 to-cyan-500',
    orange: 'from-orange-500 to-red-500',
  };

  return (
    <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 border border-amber-200">
      <div className={`inline-flex items-center justify-center w-12 h-12 bg-gradient-to-r ${colorClasses[color as keyof typeof colorClasses]} text-white rounded-xl mb-4`}>
        {icon}
      </div>
      <h3 className="text-sm font-medium text-gray-600 mb-1">{title}</h3>
      <p className="text-3xl font-bold text-gray-900 mb-1">{value}</p>
      <p className="text-sm text-gray-600">{subtitle}</p>
    </div>
  );
}

interface RecommendationItemProps {
  text: string;
  color: string;
}

function RecommendationItem({ text, color }: RecommendationItemProps) {
  const colorClasses = {
    green: 'bg-green-500',
    blue: 'bg-blue-500',
    purple: 'bg-purple-500',
  };

  return (
    <div className="flex items-start gap-3 p-4 bg-amber-50 rounded-xl">
      <div className={`flex-shrink-0 w-2 h-2 ${colorClasses[color as keyof typeof colorClasses]} rounded-full mt-2`}></div>
      <p className="text-gray-800">{text}</p>
    </div>
  );
}
