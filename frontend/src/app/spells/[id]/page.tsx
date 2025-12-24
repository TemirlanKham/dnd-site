'use client';

import { useQuery, gql } from '@apollo/client';
import { useParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import CommentSection from '@/components/CommentSection';

const GET_SPELL = gql`
  query GetSpell($id: ID!) {
    spell(id: $id) {
      id
      name
      level
      school
      castingTime
      range
      components
      duration
      description
      classes
    }
  }
`;

interface Spell {
  id: string;
  name: string;
  level: number;
  school: string;
  castingTime: string;
  range: string;
  components: string;
  duration: string;
  description: string;
  classes: string[];
}

export default function SpellDetailPage() {
  const params = useParams();
  const router = useRouter();
  const id = params.id as string;

  const { loading, error, data } = useQuery(GET_SPELL, {
    variables: { id },
    skip: !id,
  });

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-[60vh]">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Загрузка заклинания...</p>
        </div>
      </div>
    );
  }

  if (error) {
    console.error('GraphQL Error:', error);
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="bg-red-50 border border-red-200 rounded-lg p-6 max-w-2xl mx-auto">
          <h2 className="text-xl font-bold text-red-700 mb-2">Ошибка</h2>
          <p className="text-red-600 mb-4">{error.message}</p>
          <button
            onClick={() => router.back()}
            className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded transition-colors"
          >
            ← Назад
          </button>
        </div>
      </div>
    );
  }

  if (!data?.spell) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="text-center py-12">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">Заклинание не найдено</h2>
          <Link
            href="/spells"
            className="text-blue-600 hover:text-blue-800 font-medium"
          >
            ← Вернуться к списку заклинаний
          </Link>
        </div>
      </div>
    );
  }

  const spell: Spell = data.spell;

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white py-8">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Хлебные крошки */}
        <nav className="mb-8">
          <ol className="flex items-center space-x-2 text-sm text-gray-600">
            <li><Link href="/" className="hover:text-blue-600">Главная</Link></li>
            <li>→</li>
            <li><Link href="/spells" className="hover:text-blue-600">Заклинания</Link></li>
            <li>→</li>
            <li className="font-medium text-blue-700">{spell.name}</li>
          </ol>
        </nav>

        {/* Карточка заклинания */}
        <div className="bg-white rounded-xl shadow-lg p-6 mb-8 border border-gray-200">
          <div className="flex justify-between items-start mb-6">
            <div>
              <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">
                {spell.name}
              </h1>
              <div className="flex flex-wrap items-center gap-3">
                <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                  spell.level === 0 
                    ? 'bg-green-100 text-green-800' 
                    : spell.level <= 3 
                      ? 'bg-blue-100 text-blue-800' 
                      : spell.level <= 6 
                        ? 'bg-purple-100 text-purple-800' 
                        : 'bg-red-100 text-red-800'
                }`}>
                  {spell.level === 0 ? 'Заговор' : `Уровень ${spell.level}`}
                </span>
                <span className="px-3 py-1 bg-gray-100 text-gray-800 rounded-full text-sm font-medium">
                  {spell.school}
                </span>
              </div>
            </div>
          </div>

          {/* Детали заклинания */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
            <div className="bg-gray-50 rounded-lg p-4">
              <div className="text-sm text-gray-500 mb-1">Время наложения</div>
              <div className="font-medium">{spell.castingTime}</div>
            </div>
            <div className="bg-gray-50 rounded-lg p-4">
              <div className="text-sm text-gray-500 mb-1">Дистанция</div>
              <div className="font-medium">{spell.range}</div>
            </div>
            <div className="bg-gray-50 rounded-lg p-4">
              <div className="text-sm text-gray-500 mb-1">Компоненты</div>
              <div className="font-medium">{spell.components}</div>
            </div>
            <div className="bg-gray-50 rounded-lg p-4">
              <div className="text-sm text-gray-500 mb-1">Длительность</div>
              <div className="font-medium">{spell.duration}</div>
            </div>
          </div>

          {/* Описание */}
          <div className="mb-8">
            <h2 className="text-xl font-bold text-gray-800 mb-4">Описание</h2>
            <div className="prose max-w-none">
              <p className="text-gray-700 leading-relaxed whitespace-pre-line">
                {spell.description}
              </p>
            </div>
          </div>

          {/* Классы */}
          <div className="mb-8">
            <h2 className="text-xl font-bold text-gray-800 mb-4">Доступно классам</h2>
            <div className="flex flex-wrap gap-2">
              {spell.classes.map((className, index) => (
                <span
                  key={index}
                  className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm font-medium"
                >
                  {className}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Секция комментариев */}
        <CommentSection 
          contentType="spell" 
          contentId={spell.id}
        />

        {/* Кнопка возврата */}
        <div className="mt-8 text-center">
          <Link
            href="/spells"
            className="inline-flex items-center text-blue-600 hover:text-blue-800 font-medium"
          >
            <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
            Вернуться к списку заклинаний
          </Link>
        </div>
      </div>
    </div>
  );
}