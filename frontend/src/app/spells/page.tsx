'use client';

import { useState } from 'react';
import { useQuery, gql } from '@apollo/client';
import { Spell } from '../../types';

const GET_SPELLS = gql`
  query GetSpells($search: String) {
    spells(search: $search) {
      id
      name
      level
      school
      castingTime
      range
      description
      classes
    }
  }
`;

export default function SpellsPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const { loading, error, data } = useQuery(GET_SPELLS, {
    variables: { search: searchQuery },
  });

  if (loading) return <div className="text-center py-8">Загрузка...</div>;
  if (error) return <div className="text-center py-8 text-red-600">Ошибка: {error.message}</div>;

  const spells = data?.spells || [];

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold mb-8 text-center">Заклинания</h1>
      
      <div className="mb-8">
        <input
          type="text"
          placeholder="Поиск заклинаний..."
          className="w-full max-w-2xl mx-auto block p-4 bg-gray-800 text-white rounded-lg border border-gray-700 focus:border-blue-500 focus:ring-2 focus:ring-blue-500 focus:outline-none"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>

      <div className="space-y-6">
        {spells.length === 0 ? (
          <div className="text-center py-12 text-gray-500">
            {searchQuery ? 'Заклинания не найдены' : 'Нет заклинаний'}
          </div>
        ) : (
          spells.map((spell: Spell) => (
            <div 
              key={spell.id} 
              className="bg-gray-800 rounded-lg shadow-lg p-6 hover:shadow-xl transition-shadow"
            >
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h2 className="text-2xl font-bold text-white mb-1">{spell.name}</h2>
                  <div className="flex items-center space-x-4">
                    <span className="text-blue-300 font-medium">
                      Уровень {spell.level} • {spell.school}
                    </span>
                  </div>
                </div>
              </div>
              
              <p className="text-gray-300 mb-4">{spell.description}</p>
              
              <div className="flex flex-wrap gap-4 text-sm text-gray-400">
                <div className="flex items-center">
                  <span className="font-semibold mr-2">Время:</span>
                  <span>{spell.castingTime}</span>
                </div>
                <div className="flex items-center">
                  <span className="font-semibold mr-2">Дистанция:</span>
                  <span>{spell.range}</span>
                </div>
              </div>
              
              <div className="mt-4 pt-4 border-t border-gray-700">
                <span className="font-semibold text-gray-400 mr-2">Классы:</span>
                <div className="flex flex-wrap gap-2 mt-2">
                  {spell.classes.map((className, index) => (
                    <span 
                      key={index} 
                      className="bg-purple-600 text-purple-100 px-3 py-1 rounded-full text-sm"
                    >
                      {className}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}