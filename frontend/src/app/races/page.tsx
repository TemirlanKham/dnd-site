'use client';

import { useQuery, gql } from '@apollo/client';
import { Race } from '../../types';

const GET_RACES = gql`
  query GetRaces {
    races {
      id
      name
      speed
      size
      abilityBonus
      traits
      description
    }
  }
`;

export default function RacesPage() {
  const { loading, error, data } = useQuery(GET_RACES);

  if (loading) return <div className="text-center py-8">Загрузка...</div>;
  if (error) return <div className="text-center py-8 text-red-600">Ошибка: {error.message}</div>;

  // Проверка на наличие данных
  if (!data?.races?.length) {
    return <div className="text-center py-8">Нет данных о расах</div>;
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold mb-8 text-center">Расы D&D 5e</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {data.races.map((race: Race) => (
          <div 
            key={race.id} 
            className="bg-white rounded-lg shadow-lg p-6 hover:shadow-xl transition-shadow border border-gray-200"
          >
            <h2 className="text-2xl font-bold mb-4 text-gray-800">{race.name}</h2>
            
            <div className="space-y-3 mb-4">
              <div className="flex items-center">
                <span className="font-semibold text-gray-700 mr-2">Размер:</span>
                <span className="bg-purple-100 text-purple-800 px-2 py-1 rounded">{race.size}</span>
                <span className="mx-2">•</span>
                <span className="font-semibold text-gray-700 mr-2">Скорость:</span>
                <span className="bg-green-100 text-green-800 px-2 py-1 rounded">{race.speed} футов</span>
              </div>
              
              <div className="flex items-center">
                <span className="font-semibold text-gray-700 mr-2">Бонусы характеристик:</span>
                <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded">{race.abilityBonus}</span>
              </div>
            </div>
            
            <div className="pt-4 border-t border-gray-200">
              <p className="text-gray-700">{race.description}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}