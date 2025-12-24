'use client';

import { useAuthStore } from '../store/useAuthStore';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

export default function Header() {
  const { user, logout, isAuthenticated } = useAuthStore();
  const router = useRouter();

  const handleLogout = () => {
    logout();
    router.push('/');
  };

  return (
    <header className="bg-gray-900 text-white shadow-lg">
      <div className="container mx-auto px-4 py-4">
        <div className="flex justify-between items-center">
          <div className="flex items-center space-x-8">
            <Link href="/" className="text-2xl font-bold hover:text-yellow-400 transition-colors">
              D&D Справочник
            </Link>
            <nav className="hidden md:flex space-x-6">
              <Link href="/spells" className="hover:text-yellow-400 transition-colors">
                Заклинания
              </Link>
              <Link href="/classes" className="hover:text-yellow-400 transition-colors">
                Классы
              </Link>
              <Link href="/races" className="hover:text-yellow-400 transition-colors">
                Расы
              </Link>
            </nav>
          </div>
          
          <div className="flex items-center space-x-4">
            {isAuthenticated() ? (
              <>
                <span className="hidden md:inline">Привет, {user?.username}</span>
                <button
                  onClick={handleLogout}
                  className="bg-red-600 hover:bg-red-700 px-4 py-2 rounded transition-colors"
                >
                  Выйти
                </button>
              </>
            ) : (
              <>
                <Link
                  href="/login"
                  className="bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded transition-colors"
                >
                  Войти
                </Link>
                <Link
                  href="/register"
                  className="bg-green-600 hover:bg-green-700 px-4 py-2 rounded transition-colors"
                >
                  Регистрация
                </Link>
              </>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}