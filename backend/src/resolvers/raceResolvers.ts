import Race from '../models/Race';
import Comment from '../models/Comment';

export const raceResolvers = {
  Query: {
    races: async () => {
      return await Race.find();
    },
    race: async (_: any, { id }: { id: string }) => {
      return await Race.findById(id);
    }
  },
  Race: {
    comments: async (parent: any) => {
      return await Comment.find({ 
        contentType: 'race', 
        contentId: parent.id 
      }).sort({ createdAt: -1 });
    }
  }
};