import Comment from '../models/Comment';
import User from '../models/User';
import { GraphQLError } from 'graphql';
import { PubSub } from 'graphql-subscriptions';

const pubsub = new PubSub();
const COMMENT_ADDED = 'COMMENT_ADDED';


export const commentResolvers = {
  Query: {
    comments: async (_: any, { contentType, contentId }: any) => {
      return await Comment.find({ contentType, contentId }).sort({ createdAt: -1 });
    }
  },

  Mutation: {
    addComment: async (_: any, { content, contentType, contentId }: any, context: any) => {
      if (!context.userId) {
        throw new GraphQLError('Не авторизован', {
          extensions: { code: 'UNAUTHENTICATED' }
        });
      }

      const comment = new Comment({
        content,
        userId: context.userId,
        contentType,
        contentId
      });

      await comment.save();
      const populatedComment = await Comment.findById(comment.id).populate('userId');

      pubsub.publish(COMMENT_ADDED, {
        commentAdded: populatedComment,
        contentType,
        contentId
      });

      return populatedComment;
    },

    deleteComment: async (_: any, { id }: any, context: any) => {
      if (!context.userId) {
        throw new GraphQLError('Не авторизован');
      }

      const comment = await Comment.findById(id);
      if (!comment) {
        throw new GraphQLError('Комментарий не найден');
      }

      if (comment.userId.toString() !== context.userId) {
        throw new GraphQLError('Нет прав на удаление');
      }

      await Comment.findByIdAndDelete(id);
      return true;
    }
  },

  Subscription: {
    commentAdded: {
      subscribe: (_: any, { contentType, contentId }: any) => {
        return (pubsub as any).asyncIterator([COMMENT_ADDED]);
      },
      resolve: (payload: any, { contentType, contentId }: any) => {
        if (payload.contentType === contentType && payload.contentId === contentId) {
          return payload.commentAdded;
        }
        return null;
      }
    }
  },

  Comment: {
    user: async (parent: any) => {
      return await User.findById(parent.userId);
    }
  }
};