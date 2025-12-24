'use client';

import { useQuery, gql } from '@apollo/client';

const TEST_QUERY = gql`
  query TestQuery {
    spells {
      id
      name
    }
  }
`;

export default function TestPage() {
  const { loading, error, data } = useQuery(TEST_QUERY);

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-4">Тест GraphQL подключения</h1>
      
      <div className="mb-4">
        <p><strong>GraphQL URI:</strong> {process.env.NEXT_PUBLIC_GRAPHQL_URI || 'Не указан'}</p>
      </div>
      
      {loading && <div>Загрузка...</div>}
      
      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
          <strong>Ошибка:</strong> {error.message}
        </div>
      )}
      
      {data && (
        <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded mb-4">
          <strong>Успешно подключено!</strong>
          <p>Получено заклинаний: {data.spells.length}</p>
        </div>
      )}
      
      <div className="mt-4">
        <button 
          onClick={() => window.location.reload()}
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        >
          Обновить
        </button>
      </div>
    </div>
  );
}