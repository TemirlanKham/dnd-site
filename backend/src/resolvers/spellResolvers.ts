import Spell from '../models/Spell';
import Comment from '../models/Comment';

export const spellResolvers = {
  Query: {
    spells: async (_: any, { search }: { search?: string }) => {
      if (search) {
        return await Spell.find({
          name: { $regex: search, $options: 'i' }
        });
      }
      return await Spell.find();
    },
    spell: async (_: any, { id }: { id: string }) => {
      return await Spell.findById(id);
    }
  },
  Spell: {
    comments: async (parent: any) => {
      return await Comment.find({ 
        contentType: 'spell', 
        contentId: parent.id 
      }).sort({ createdAt: -1 });
    }
  }
};