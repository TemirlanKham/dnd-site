import Link from "next/link"

export default function Home() {
  return (
    <div className="min-h-screen">
      <div className="text-center py-16">
        <h1 className="text-5xl font-bold text-gray-900 mb-4">
          D&D Справочник 5e
        </h1>
        <p className="text-xl text-gray-600 mb-8">
          Полный справочник по Dungeons & Dragons 5-й редакции
        </p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 px-4">
        <div className="bg-white rounded-lg shadow-lg p-6 hover:shadow-xl transition-shadow">
          <div className="text-3xl mb-4">⚡</div>
          <Link href="/spells" className="hover:text-yellow-400 transition-colors">
          <h2 className="text-2xl font-bold mb-2">Заклинания</h2>
          <p className="text-gray-600">Полный список заклинаний всех уровней</p>
          </Link>
        </div>
        
        <div className="bg-white rounded-lg shadow-lg p-6 hover:shadow-xl transition-shadow">
          <div className="text-3xl mb-4">⚔️</div>
          <Link href="/classes" className="hover:text-yellow-400 transition-colors">
          <h2 className="text-2xl font-bold mb-2">Классы</h2>
          <p className="text-gray-600">Изучите классы персонажей</p>
          </Link>
        </div>
        
        <div className="bg-white rounded-lg shadow-lg p-6 hover:shadow-xl transition-shadow">
          <div className="text-3xl mb-4">👥</div>
          <Link href="/races" className="hover:text-yellow-400 transition-colors">
          <h2 className="text-2xl font-bold mb-2">Расы</h2>
          <p className="text-gray-600">Узнайте о расах D&D</p>
          </Link>
        </div>
      </div>
    </div>
  );
}