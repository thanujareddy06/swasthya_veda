import { Leaf, Heart, Brain, Sparkles, ArrowRight } from 'lucide-react';

interface LandingPageProps {
  onGetStarted: () => void;
}

export default function LandingPage({ onGetStarted }: LandingPageProps) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 via-orange-50 to-rose-50">
      <nav className="container mx-auto px-6 py-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Leaf className="w-8 h-8 text-green-700" />
            <span className="text-2xl font-bold text-green-900">AyurWell AI</span>
          </div>
          <button
            onClick={onGetStarted}
            className="px-6 py-2 bg-green-700 text-white rounded-lg hover:bg-green-800 transition-colors"
          >
            Get Started
          </button>
        </div>
      </nav>

      <main className="container mx-auto px-6 py-16">
        <div className="text-center max-w-4xl mx-auto mb-20">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/60 rounded-full mb-6 backdrop-blur-sm border border-amber-200">
            <Sparkles className="w-4 h-4 text-amber-600" />
            <span className="text-sm font-medium text-amber-900">Ancient Wisdom Meets Modern AI</span>
          </div>

          <h1 className="text-6xl font-bold text-gray-900 mb-6 leading-tight">
            Personalized Ayurvedic
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-green-600 to-emerald-600"> Wellness</span>
          </h1>

          <p className="text-xl text-gray-700 mb-8 leading-relaxed">
            Transform your health with AI-powered diet plans that blend 5,000 years of Ayurvedic wisdom
            with modern nutrition science. Balance your doshas, nourish your body, heal naturally.
          </p>

          <button
            onClick={onGetStarted}
            className="group inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-green-600 to-emerald-600 text-white text-lg font-semibold rounded-xl hover:shadow-xl transition-all transform hover:scale-105"
          >
            Begin Your Journey
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </button>
        </div>

        <div className="grid md:grid-cols-3 gap-8 mb-20">
          <FeatureCard
            icon={<Brain className="w-8 h-8" />}
            title="AI-Powered Insights"
            description="Our intelligent system analyzes your unique constitution and creates personalized meal plans that adapt to your changing needs."
            gradient="from-blue-500 to-cyan-500"
          />
          <FeatureCard
            icon={<Leaf className="w-8 h-8" />}
            title="Ayurvedic Science"
            description="Every recommendation is rooted in authentic Ayurvedic principles: Rasa, Guna, Virya, Vipaka, and Dosha balance."
            gradient="from-green-500 to-emerald-500"
          />
          <FeatureCard
            icon={<Heart className="w-8 h-8" />}
            title="Holistic Health"
            description="More than just food—track mood, energy, digestion, and receive lifestyle guidance for complete wellness."
            gradient="from-rose-500 to-pink-500"
          />
        </div>

        <div className="bg-white/60 backdrop-blur-sm rounded-3xl p-12 border border-amber-200">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-4xl font-bold text-gray-900 mb-6">
                Your Personal Ayurvedic Guide
              </h2>
              <div className="space-y-4">
                <BenefitItem text="Discover your Prakriti through guided assessment" />
                <BenefitItem text="Get meal plans that balance your doshas" />
                <BenefitItem text="Access 1000+ foods with Ayurvedic properties" />
                <BenefitItem text="Track daily wellness and see real progress" />
                <BenefitItem text="Chat with AyurWell AI for instant guidance" />
              </div>
            </div>
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-br from-green-400 to-emerald-600 rounded-3xl blur-2xl opacity-20"></div>
              <div className="relative bg-gradient-to-br from-amber-100 to-orange-100 rounded-3xl p-8 border-2 border-amber-300">
                <div className="text-center">
                  <div className="inline-flex items-center justify-center w-20 h-20 bg-white rounded-full mb-4 shadow-lg">
                    <Leaf className="w-10 h-10 text-green-600" />
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-2">Start Free Today</h3>
                  <p className="text-gray-700 mb-6">
                    Join thousands discovering balance through personalized Ayurvedic nutrition
                  </p>
                  <button
                    onClick={onGetStarted}
                    className="w-full px-6 py-3 bg-gradient-to-r from-green-600 to-emerald-600 text-white font-semibold rounded-xl hover:shadow-lg transition-all"
                  >
                    Take Prakriti Assessment
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

      <footer className="container mx-auto px-6 py-8 text-center text-gray-600">
        <p>Combining ancient Ayurvedic wisdom with modern AI technology</p>
      </footer>
    </div>
  );
}

interface FeatureCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  gradient: string;
}

function FeatureCard({ icon, title, description, gradient }: FeatureCardProps) {
  return (
    <div className="bg-white/60 backdrop-blur-sm rounded-2xl p-8 border border-amber-200 hover:shadow-xl transition-all transform hover:-translate-y-1">
      <div className={`inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br ${gradient} text-white rounded-xl mb-4`}>
        {icon}
      </div>
      <h3 className="text-xl font-bold text-gray-900 mb-3">{title}</h3>
      <p className="text-gray-700 leading-relaxed">{description}</p>
    </div>
  );
}

interface BenefitItemProps {
  text: string;
}

function BenefitItem({ text }: BenefitItemProps) {
  return (
    <div className="flex items-start gap-3">
      <div className="flex-shrink-0 w-6 h-6 bg-green-600 rounded-full flex items-center justify-center mt-0.5">
        <svg className="w-4 h-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
        </svg>
      </div>
      <span className="text-gray-700 text-lg">{text}</span>
    </div>
  );
}
