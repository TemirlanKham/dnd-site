import express from 'express';
import { ApolloServer } from 'apollo-server-express';
import { createServer } from 'http';
import { WebSocketServer } from 'ws';
import { makeExecutableSchema } from '@graphql-tools/schema';
import cors from 'cors';
import { connectDB } from './config/database';
import { typeDefs } from './typeDefs/schema';
import { userResolvers } from './resolvers/userResolvers';
import { commentResolvers } from './resolvers/commentResolvers';
import { spellResolvers } from './resolvers/spellResolvers';
import { classResolvers } from './resolvers/classResolvers';
import { raceResolvers } from './resolvers/raceResolvers';
import { authenticate } from './middleware/auth';
import { useServer } from 'graphql-ws/lib/use/ws';
import bodyParser from 'body-parser';

const startServer = async () => {
  const app = express();
  
  // Настройка CORS для разрешения запросов с фронтенда
  app.use(cors({
    origin: ['http://localhost:3000', 'http://frontend:3000'],
    credentials: true,
  }));
  
  app.use(bodyParser.json());
  
  await connectDB();

  const schema = makeExecutableSchema({
    typeDefs,
    resolvers: [
      userResolvers,
      commentResolvers,
      spellResolvers,
      classResolvers,
      raceResolvers
    ]
  });

  const httpServer = createServer(app);

  const wsServer = new WebSocketServer({
    server: httpServer,
    path: '/graphql'
  });

  useServer({ schema }, wsServer);

  const server = new ApolloServer({
    schema,
    context: ({ req }) => {
      const userId = authenticate({ req });
      return { userId };
    }
  });

  await server.start();
  
  // Применяем middleware с явным приведением типа
  server.applyMiddleware({ 
    app: app as any,
    path: '/graphql',
    cors: false // CORS уже настроен выше
  });

  const PORT = process.env.PORT || 4000;
  httpServer.listen(PORT, () => {
    console.log(`🚀 Сервер запущен на http://localhost:${PORT}${server.graphqlPath}`);
    console.log(`🔌 WebSocket на ws://localhost:${PORT}/graphql`);
    console.log(`📡 CORS разрешены для: http://localhost:3000, http://frontend:3000`);
  });
};

startServer().catch((error) => {
  console.error('Ошибка запуска сервера:', error);
  process.exit(1);
});