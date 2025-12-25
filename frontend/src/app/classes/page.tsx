'use client';

import { useQuery, gql } from '@apollo/client';
import { Class } from '../../types';

const GET_CLASSES = gql`
  query GetClasses {
    classes {
      id
      name
      hitDie
      primaryAbility
      saves
      description
    }
  }
`;
export default function ClassesPage() {
  const { loading, error, data } = useQuery(GET_CLASSES);

  if (loading) return <div className="text-center py-8">Загрузка...</div>;
  if (error) return <div className="text-center py-8 text-red-600">Ошибка: {error.message}</div>;

  if (!data?.classes?.length) {
    return <div className="text-center py-8">Нет данных о классах</div>;
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold mb-8 text-center">Классы</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {data.classes.map((cls: Class) => (
          <div 
            key={cls.id} 
            className="bg-white rounded-lg shadow-lg p-6 hover:shadow-xl transition-shadow border border-gray-200"
          >
            <h2 className="text-2xl font-bold mb-4 text-gray-800">{cls.name}</h2>
            
            <div className="space-y-3 mb-4">
              <div className="flex items-center">
                <span className="font-semibold text-gray-700 mr-2">Кость хитов:</span>
                <span className="bg-red-100 text-red-800 px-2 py-1 rounded">d{cls.hitDie}</span>
              </div>
              
              <div className="flex items-center">
                <span className="font-semibold text-gray-700 mr-2">Основная характеристика:</span>
                <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded">{cls.primaryAbility}</span>
              </div>
              
              <div className="flex items-start">
                <span className="font-semibold text-gray-700 mr-2">Спас-броски:</span>
                <div className="flex flex-wrap gap-1">
                  {cls.saves.map((save, index) => (
                    <span 
                      key={index} 
                      className="bg-green-100 text-green-800 px-2 py-1 rounded text-sm"
                    >
                      {save}
                    </span>
                  ))}
                </div>
              </div>
            </div>
            
            <div className="pt-4 border-t border-gray-200">
              <p className="text-gray-700">{cls.description}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}