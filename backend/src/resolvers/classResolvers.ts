import Class from '../models/Class';
import Comment from '../models/Comment';

export const classResolvers = {
  Query: {
    classes: async () => {
      return await Class.find();
    },
    class: async (_: any, { id }: { id: string }) => {
      return await Class.findById(id);
    }
  },
  Class: {
    comments: async (parent: any) => {
      return await Comment.find({ 
        contentType: 'class', 
        contentId: parent.id 
      }).sort({ createdAt: -1 });
    }
  }
};