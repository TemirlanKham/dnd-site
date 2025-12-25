// components/RaceCard.tsx
'use client';

import { Race } from '@/types';
import Link from 'next/link';

interface Props {
  race: Race;
}

export default function RaceCard({ race }: Props) {
  return (
    <Link 
      href={`/races/${race.id}`}
      className="block"
    >
      <div 
        className="bg-white rounded-lg shadow-lg p-6 hover:shadow-xl transition-shadow border border-gray-200 hover:border-blue-300 hover:scale-[1.02] transition-all duration-200 cursor-pointer"
      >
        <h3 className="text-2xl font-bold mb-4 text-gray-800">{race.name}</h3>
        
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
    </Link>
  );
}