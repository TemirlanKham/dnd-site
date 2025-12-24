import { verifyToken } from '../utils/jwt';

export const authenticate = (context: any) => {
  const token = context.req?.headers?.authorization?.replace('Bearer ', '');
  
  if (!token) {
    return null;
  }

  const decoded = verifyToken(token);
  return decoded ? decoded.userId : null;
};