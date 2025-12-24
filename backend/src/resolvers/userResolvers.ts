import User from '../models/User';
import { generateToken } from '../utils/jwt';
import { GraphQLError } from 'graphql';

// Добавьте этот интерфейс в файл резолвера
interface IUserWithMethods extends Document {
  id: string;
  username: string;
  email: string;
  password: string;
  createdAt: Date;
  comparePassword(candidatePassword: string): Promise<boolean>;

}

export const userResolvers = {
  Query: {
    me: async (_: any, __: any, context: any) => {
      if (!context.userId) {
        throw new GraphQLError('Не авторизован', {
          extensions: { code: 'UNAUTHENTICATED' }
        });
      }
      return await User.findById(context.userId);
    }
  },
  Mutation: {
    register: async (_: any, { username, email, password }: any) => {
      const existingUser = await User.findOne({ $or: [{ email }, { username }] });
      if (existingUser) {
        throw new GraphQLError('Пользователь уже существует');
      }

      const user = new User({ username, email, password });
      await user.save();

      const token = generateToken(user.id);
      return { token, user };
    },

    login: async (_: any, { email, password }: any) => {
      const user = await User.findOne({ email }) as IUserWithMethods | null;
      if (!user) {
        throw new GraphQLError('Неверные учетные данные');
      }

      const isValid = await user.comparePassword(password);
      if (!isValid) {
        throw new GraphQLError('Неверные учетные данные');
      }

      const token = generateToken(user.id);
      return { token, user };
    }
  }
};