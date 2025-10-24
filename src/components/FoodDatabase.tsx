import { useState, useEffect } from 'react';
import { Search, Filter, Wind, Flame, Droplets } from 'lucide-react';
import { supabase } from '../lib/supabase';

interface Food {
  id: string;
  name: string;
  name_sanskrit?: string;
  category: string;
  description?: string;
  calories_per_100g: number;
  protein_g: number;
  carbs_g: number;
  fat_g: number;
  rasa?: string[];
  guna?: string[];
  virya?: string;
  vipaka?: string;
  dosha_effect?: {
    vata: string;
    pitta: string;
    kapha: string;
  };
  health_benefits?: string[];
}

interface FoodDatabaseProps {
  doshaScores: {
    vata: number;
    pitta: number;
    kapha: number;
  };
}

export default function FoodDatabase({ doshaScores }: FoodDatabaseProps) {
  const [foods, setFoods] = useState<Food[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [categoryFilter, setCategoryFilter] = useState<string>('all');
  const [selectedFood, setSelectedFood] = useState<Food | null>(null);

  useEffect(() => {
    loadFoods();
  }, []);

  const loadFoods = async () => {
    try {
      const { data, error } = await supabase
        .from('foods')
        .select('*')
        .order('name');

      if (error) throw error;
      setFoods(data || []);
    } catch (error) {
      console.error('Error loading foods:', error);
    } finally {
      setLoading(false);
    }
  };

  const filteredFoods = foods.filter(food => {
    const matchesSearch = food.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         food.name_sanskrit?.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = categoryFilter === 'all' || food.category === categoryFilter;
    return matchesSearch && matchesCategory;
  });

  const categories = ['all', ...Array.from(new Set(foods.map(f => f.category)))];

  if (loading) {
    return (
      <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-8 border border-amber-200">
        <p className="text-gray-600">Loading food database...</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 border border-amber-200">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">Ayurvedic Food Database</h2>

        <div className="grid md:grid-cols-2 gap-4 mb-6">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="text"
              placeholder="Search foods..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-500"
            />
          </div>

          <div className="relative">
            <Filter className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <select
              value={categoryFilter}
              onChange={(e) => setCategoryFilter(e.target.value)}
              className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-500 appearance-none bg-white"
            >
              {categories.map(cat => (
                <option key={cat} value={cat}>
                  {cat === 'all' ? 'All Categories' : cat}
                </option>
              ))}
            </select>
          </div>
        </div>

        {filteredFoods.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-gray-600 mb-4">No foods found in the database yet.</p>
            <p className="text-sm text-gray-500">The food database will be populated with comprehensive Ayurvedic food data.</p>
          </div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredFoods.map(food => (
              <FoodCard
                key={food.id}
                food={food}
                onClick={() => setSelectedFood(food)}
              />
            ))}
          </div>
        )}
      </div>

      {selectedFood && (
        <FoodDetailModal
          food={selectedFood}
          onClose={() => setSelectedFood(null)}
        />
      )}
    </div>
  );
}

interface FoodCardProps {
  food: Food;
  onClick: () => void;
}

function FoodCard({ food, onClick }: FoodCardProps) {
  return (
    <button
      onClick={onClick}
      className="bg-white rounded-xl p-4 border border-gray-200 hover:border-green-400 hover:shadow-md transition-all text-left"
    >
      <h3 className="font-bold text-gray-900 mb-1">{food.name}</h3>
      {food.name_sanskrit && (
        <p className="text-sm text-gray-600 italic mb-2">{food.name_sanskrit}</p>
      )}
      <div className="flex items-center gap-2 mb-2">
        <span className="px-2 py-1 bg-amber-100 text-amber-800 text-xs rounded-full">
          {food.category}
        </span>
      </div>
      <div className="text-sm text-gray-700">
        <span className="font-medium">{food.calories_per_100g}</span> cal/100g
      </div>
    </button>
  );
}

interface FoodDetailModalProps {
  food: Food;
  onClose: () => void;
}

function FoodDetailModal({ food, onClose }: FoodDetailModalProps) {
  const getDoshaIcon = (dosha: string) => {
    if (dosha === 'vata') return <Wind className="w-4 h-4" />;
    if (dosha === 'pitta') return <Flame className="w-4 h-4" />;
    return <Droplets className="w-4 h-4" />;
  };

  const getDoshaEffect = (effect?: string) => {
    if (effect === 'increases') return '↑';
    if (effect === 'decreases') return '↓';
    return '=';
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4" onClick={onClose}>
      <div className="bg-white rounded-2xl p-8 max-w-2xl w-full max-h-[90vh] overflow-y-auto" onClick={(e) => e.stopPropagation()}>
        <div className="flex justify-between items-start mb-6">
          <div>
            <h2 className="text-3xl font-bold text-gray-900">{food.name}</h2>
            {food.name_sanskrit && (
              <p className="text-lg text-gray-600 italic">{food.name_sanskrit}</p>
            )}
          </div>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 text-2xl"
          >
            ×
          </button>
        </div>

        {food.description && (
          <p className="text-gray-700 mb-6">{food.description}</p>
        )}

        <div className="grid md:grid-cols-2 gap-6 mb-6">
          <div className="bg-amber-50 rounded-xl p-4">
            <h3 className="font-bold text-gray-900 mb-3">Modern Nutrition</h3>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span>Calories:</span>
                <span className="font-semibold">{food.calories_per_100g} per 100g</span>
              </div>
              <div className="flex justify-between">
                <span>Protein:</span>
                <span className="font-semibold">{food.protein_g}g</span>
              </div>
              <div className="flex justify-between">
                <span>Carbs:</span>
                <span className="font-semibold">{food.carbs_g}g</span>
              </div>
              <div className="flex justify-between">
                <span>Fat:</span>
                <span className="font-semibold">{food.fat_g}g</span>
              </div>
            </div>
          </div>

          <div className="bg-green-50 rounded-xl p-4">
            <h3 className="font-bold text-gray-900 mb-3">Ayurvedic Properties</h3>
            <div className="space-y-2 text-sm">
              {food.rasa && food.rasa.length > 0 && (
                <div>
                  <span className="font-medium">Rasa (Taste):</span>
                  <div className="flex flex-wrap gap-1 mt-1">
                    {food.rasa.map((r, i) => (
                      <span key={i} className="px-2 py-0.5 bg-white rounded-full text-xs">
                        {r}
                      </span>
                    ))}
                  </div>
                </div>
              )}
              {food.virya && (
                <div>
                  <span className="font-medium">Virya:</span> {food.virya}
                </div>
              )}
              {food.vipaka && (
                <div>
                  <span className="font-medium">Vipaka:</span> {food.vipaka}
                </div>
              )}
            </div>
          </div>
        </div>

        {food.dosha_effect && (
          <div className="bg-gradient-to-r from-blue-50 via-red-50 to-green-50 rounded-xl p-4 mb-6">
            <h3 className="font-bold text-gray-900 mb-3">Dosha Effects</h3>
            <div className="grid grid-cols-3 gap-4">
              <div className="text-center">
                <div className="flex items-center justify-center gap-1 mb-1">
                  <Wind className="w-5 h-5 text-blue-600" />
                  <span className="font-semibold text-blue-900">Vata</span>
                </div>
                <span className="text-2xl">{getDoshaEffect(food.dosha_effect.vata)}</span>
              </div>
              <div className="text-center">
                <div className="flex items-center justify-center gap-1 mb-1">
                  <Flame className="w-5 h-5 text-red-600" />
                  <span className="font-semibold text-red-900">Pitta</span>
                </div>
                <span className="text-2xl">{getDoshaEffect(food.dosha_effect.pitta)}</span>
              </div>
              <div className="text-center">
                <div className="flex items-center justify-center gap-1 mb-1">
                  <Droplets className="w-5 h-5 text-green-600" />
                  <span className="font-semibold text-green-900">Kapha</span>
                </div>
                <span className="text-2xl">{getDoshaEffect(food.dosha_effect.kapha)}</span>
              </div>
            </div>
          </div>
        )}

        {food.health_benefits && food.health_benefits.length > 0 && (
          <div className="bg-amber-50 rounded-xl p-4">
            <h3 className="font-bold text-gray-900 mb-3">Health Benefits</h3>
            <ul className="space-y-2">
              {food.health_benefits.map((benefit, i) => (
                <li key={i} className="flex items-start gap-2 text-sm text-gray-700">
                  <span className="text-green-600 mt-0.5">•</span>
                  {benefit}
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
}
