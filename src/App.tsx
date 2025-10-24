import { useState } from 'react';
import LandingPage from './components/LandingPage';
import PrakritiQuiz from './components/PrakritiQuiz';
import DoshaResults from './components/DoshaResults';
import Dashboard from './components/Dashboard';
import { DoshaScores } from './components/PrakritiQuiz';

type AppState = 'landing' | 'quiz' | 'results' | 'dashboard';

function App() {
  const [appState, setAppState] = useState<AppState>('landing');
  const [doshaScores, setDoshaScores] = useState<DoshaScores | null>(null);

  const handleGetStarted = () => {
    setAppState('quiz');
  };

  const handleQuizComplete = (scores: DoshaScores) => {
    setDoshaScores(scores);
    setAppState('results');
  };

  const handleContinueToDashboard = () => {
    setAppState('dashboard');
  };

  const handleBackToLanding = () => {
    setAppState('landing');
  };

  return (
    <>
      {appState === 'landing' && (
        <LandingPage onGetStarted={handleGetStarted} />
      )}
      {appState === 'quiz' && (
        <PrakritiQuiz
          onComplete={handleQuizComplete}
          onBack={handleBackToLanding}
        />
      )}
      {appState === 'results' && doshaScores && (
        <DoshaResults
          scores={doshaScores}
          onContinue={handleContinueToDashboard}
        />
      )}
      {appState === 'dashboard' && doshaScores && (
        <Dashboard doshaScores={doshaScores} />
      )}
    </>
  );
}

export default App;
