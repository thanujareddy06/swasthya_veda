import { useState, useRef, useEffect } from 'react';
import { Send, Bot, User as UserIcon } from 'lucide-react';

interface Message {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: Date;
}

interface ChatBotProps {
  doshaScores: {
    vata: number;
    pitta: number;
    kapha: number;
  };
}

export default function ChatBot({ doshaScores }: ChatBotProps) {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      role: 'assistant',
      content: `Namaste! I am AyurWell AI, your personal Ayurvedic wellness guide. Based on your Prakriti assessment, I see you have Vata at ${doshaScores.vata}%, Pitta at ${doshaScores.pitta}%, and Kapha at ${doshaScores.kapha}%. How may I assist you with your wellness journey today?`,
      timestamp: new Date()
    }
  ]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSend = async () => {
    if (!input.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      role: 'user',
      content: input,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsTyping(true);

    setTimeout(() => {
      const aiResponse: Message = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: getAIResponse(input, doshaScores),
        timestamp: new Date()
      };
      setMessages(prev => [...prev, aiResponse]);
      setIsTyping(false);
    }, 1500);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <div className="bg-white/80 backdrop-blur-sm rounded-2xl border border-amber-200 flex flex-col h-[calc(100vh-12rem)]">
      <div className="p-6 border-b border-amber-200">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 bg-gradient-to-br from-green-500 to-emerald-600 rounded-full flex items-center justify-center">
            <Bot className="w-6 h-6 text-white" />
          </div>
          <div>
            <h2 className="text-xl font-bold text-gray-900">AyurWell AI</h2>
            <p className="text-sm text-gray-600">Your Ayurvedic wellness companion</p>
          </div>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto p-6 space-y-4">
        {messages.map((message) => (
          <MessageBubble key={message.id} message={message} />
        ))}
        {isTyping && (
          <div className="flex items-start gap-3">
            <div className="w-8 h-8 bg-gradient-to-br from-green-500 to-emerald-600 rounded-full flex items-center justify-center flex-shrink-0">
              <Bot className="w-4 h-4 text-white" />
            </div>
            <div className="bg-green-50 rounded-2xl rounded-tl-none px-4 py-3 max-w-[80%]">
              <div className="flex gap-1">
                <div className="w-2 h-2 bg-green-600 rounded-full animate-bounce"></div>
                <div className="w-2 h-2 bg-green-600 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                <div className="w-2 h-2 bg-green-600 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
              </div>
            </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      <div className="p-4 border-t border-amber-200">
        <div className="flex gap-3">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder="Ask me anything about Ayurveda, diet, or wellness..."
            className="flex-1 px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-500"
          />
          <button
            onClick={handleSend}
            disabled={!input.trim()}
            className="px-6 py-3 bg-gradient-to-r from-green-600 to-emerald-600 text-white rounded-xl hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed transition-all"
          >
            <Send className="w-5 h-5" />
          </button>
        </div>
        <p className="text-xs text-gray-500 mt-2 text-center">
          AI responses are for educational purposes. Consult a practitioner for personalized advice.
        </p>
      </div>
    </div>
  );
}

function MessageBubble({ message }: { message: Message }) {
  const isUser = message.role === 'user';

  return (
    <div className={`flex items-start gap-3 ${isUser ? 'flex-row-reverse' : ''}`}>
      <div className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${
        isUser
          ? 'bg-gradient-to-br from-amber-500 to-orange-600'
          : 'bg-gradient-to-br from-green-500 to-emerald-600'
      }`}>
        {isUser ? <UserIcon className="w-4 h-4 text-white" /> : <Bot className="w-4 h-4 text-white" />}
      </div>
      <div className={`rounded-2xl px-4 py-3 max-w-[80%] ${
        isUser
          ? 'bg-gradient-to-r from-amber-100 to-orange-100 rounded-tr-none'
          : 'bg-green-50 rounded-tl-none'
      }`}>
        <p className="text-gray-800 whitespace-pre-wrap">{message.content}</p>
        <p className="text-xs text-gray-500 mt-1">
          {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
        </p>
      </div>
    </div>
  );
}

function getAIResponse(input: string, doshaScores: { vata: number; pitta: number; kapha: number }): string {
  const lowerInput = input.toLowerCase();

  const dominant = Object.entries(doshaScores).sort((a, b) => b[1] - a[1])[0][0];

  if (lowerInput.includes('food') || lowerInput.includes('eat') || lowerInput.includes('diet')) {
    if (dominant === 'vata') {
      return "For Vata balance, I recommend warm, grounding foods:\n\n• Cooked grains like rice and oats\n• Root vegetables\n• Warm milk with spices\n• Ghee and healthy oils\n• Sweet, sour, and salty tastes\n\nAvoid cold, dry, or raw foods. Eat at regular times and in a calm environment.";
    } else if (dominant === 'pitta') {
      return "For Pitta balance, focus on cooling foods:\n\n• Sweet fruits like melons and grapes\n• Cooling vegetables like cucumber\n• Coconut water and milk\n• Ghee and sweet grains\n• Sweet, bitter, and astringent tastes\n\nAvoid spicy, sour, and salty foods. Eat at moderate temperature.";
    } else {
      return "For Kapha balance, choose light, warming foods:\n\n• Light grains like quinoa and barley\n• Leafy greens and vegetables\n• Legumes and beans\n• Warming spices\n• Pungent, bitter, and astringent tastes\n\nAvoid heavy, oily, or sweet foods. Practice mindful eating.";
    }
  }

  if (lowerInput.includes('dosha') || lowerInput.includes('prakriti')) {
    return `Based on your assessment, your dominant dosha is ${dominant.charAt(0).toUpperCase() + dominant.slice(1)} at ${doshaScores[dominant as keyof typeof doshaScores]}%.\n\nYour constitution represents:\n• Vata: ${doshaScores.vata}% - Governs movement and creativity\n• Pitta: ${doshaScores.pitta}% - Governs metabolism and transformation\n• Kapha: ${doshaScores.kapha}% - Governs structure and stability\n\nThis unique blend influences your physical, mental, and emotional characteristics.`;
  }

  if (lowerInput.includes('sleep') || lowerInput.includes('rest')) {
    return "Good sleep is essential for all doshas:\n\n• Vata: Go to bed by 10 PM, maintain routine\n• Pitta: Cool bedroom, avoid screens before bed\n• Kapha: Wake early, avoid excessive sleep\n\nTry warm milk with nutmeg, gentle oil massage, and calming breathwork before bed.";
  }

  if (lowerInput.includes('stress') || lowerInput.includes('anxiety')) {
    return "Ayurveda offers beautiful practices for mental balance:\n\n• Meditation and pranayama (breathwork)\n• Daily oil massage (Abhyanga)\n• Herbal teas like Brahmi or Ashwagandha\n• Regular routine and sleep\n• Connection with nature\n\nRemember, your mind and body are interconnected. What you eat and how you live affects your mental state.";
  }

  if (lowerInput.includes('exercise') || lowerInput.includes('yoga')) {
    if (dominant === 'vata') {
      return "For Vata types, choose grounding exercises:\n\n• Gentle yoga and stretching\n• Walking in nature\n• Tai chi or qigong\n• Swimming\n\nAvoid excessive or erratic exercise. Focus on stability and calm.";
    } else if (dominant === 'pitta') {
      return "For Pitta types, moderate cooling activities:\n\n• Swimming and water sports\n• Moonlight walks\n• Moderate yoga\n• Non-competitive activities\n\nAvoid overheating or competitive intensity.";
    } else {
      return "For Kapha types, invigorating exercise:\n\n• Running or brisk walking\n• Dynamic yoga\n• Dance and aerobics\n• Strength training\n\nRegular vigorous exercise helps balance Kapha energy.";
    }
  }

  return "Thank you for your question! I'm here to guide you on your Ayurvedic wellness journey. I can help with:\n\n• Personalized food recommendations\n• Understanding your dosha\n• Lifestyle and daily routines\n• Herbal remedies and natural healing\n• Exercise and yoga guidance\n• Seasonal adjustments\n\nWhat would you like to explore?";
}
