'use client';

import { useQuery, gql } from '@apollo/client';
import CommentSection from '../../../components/CommentSection';
import { Race } from '../../../types';

const GET_RACE = gql`
  query GetRace($id: ID!) {
    race(id: $id) {
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

export default function RaceDetailPage({ params }: { params: { id: string } }) {
  const { loading, error, data } = useQuery(GET_RACE, {
    variables: { id: params.id },
    skip: !params.id,
  });

  if (loading) return <div className="text-center py-8">Загрузка...</div>;
  if (error) return <div className="text-center py-8 text-red-600">Ошибка: {error.message}</div>;

  if (!data?.race) {
    return <div className="text-center py-8">Раса не найдена</div>;
  }

  const race: Race = data.race;

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">{race.name}</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Левая колонка */}
        <div className="space-y-6">
          <div className="bg-white rounded-lg shadow p-6">
            <h2 className="text-xl font-bold mb-4">Основная информация</h2>
            <div className="space-y-4">
              <div className="flex items-center">
                <span className="font-semibold mr-2">Размер:</span>
                <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded">{race.size}</span>
              </div>
              
              <div className="flex items-center">
                <span className="font-semibold mr-2">Скорость:</span>
                <span className="bg-green-100 text-green-800 px-3 py-1 rounded">{race.speed} футов</span>
              </div>
              
              <div className="flex items-center">
                <span className="font-semibold mr-2">Бонусы характеристик:</span>
                <span className="bg-purple-100 text-purple-800 px-3 py-1 rounded">{race.abilityBonus}</span>
              </div>
            </div>
          </div>
          
          {/* Особенности */}
          {race.traits && race.traits.length > 0 && (
            <div className="bg-white rounded-lg shadow p-6">
              <h2 className="text-xl font-bold mb-4">Особенности</h2>
              <ul className="space-y-3">
                {race.traits.map((trait, index) => (
                  <li key={index} className="flex items-start">
                    <span className="inline-block w-6 h-6 bg-blue-100 text-blue-800 rounded-full text-center mr-2 flex-shrink-0">
                      {index + 1}
                    </span>
                    <span className="text-gray-700">{trait}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
        
        {/* Правая колонка */}
        <div className="space-y-6">
          <div className="bg-white rounded-lg shadow p-6">
            <h2 className="text-xl font-bold mb-4">Описание</h2>
            <div className="text-gray-700 leading-relaxed">
              {race.description.split('\n').map((paragraph, index) => (
                <p key={index} className="mb-4 last:mb-0">
                  {paragraph}
                </p>
              ))}
            </div>
          </div>
          
          {/* Кнопка возврата */}
          <div className="bg-gray-50 rounded-lg p-6 text-center">
            <a 
              href="/races"
              className="inline-block bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-6 rounded transition-colors"
            >
              ← Вернуться к списку рас
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}