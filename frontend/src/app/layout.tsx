'use client';

import './globals.css';
import { ApolloProvider } from '@apollo/client';
import { client } from '@/lib/apollo-client';
import Header from '@/components/Header';

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ru">
      <head>
        <title>D&D Справочник</title>
        <meta name="description" content="Онлайн справочник по Dungeons & Dragons" />
      </head>
      <body className="min-h-screen bg-gray-900 text-white">
        <ApolloProvider client={client}>
          <Header />
          <main className="container mx-auto px-4 py-8">
            {children}
          </main>
        </ApolloProvider>
      </body>
    </html>
  );
}