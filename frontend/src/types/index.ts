export interface User {
  id: string;
  username: string;
  email: string;
}

export interface Comment {
  id: string;
  content: string;
  userId: string;
  user: User;
  contentType: string;
  contentId: string;
  createdAt: string;
  updatedAt: string;
}

export interface Spell {
  id: string;
  name: string;
  level: number;
  school: string;
  castingTime: string;
  range: string;
  components: string;
  duration: string;
  description: string;
  classes: string[];
  comments: Comment[];
}

export interface Class {
  id: string;
  name: string;
  hitDie: number;
  primaryAbility: string;
  saves: string[];
  description: string;
  comments: Comment[];
}

export interface Race {
  age: any;
  alignment: string;
  languages: boolean;
  subraces: boolean;
  id: string;
  name: string;
  speed: number;
  size: string;
  abilityBonus: string;
  traits: string[];
  description: string;
  comments: Comment[];
}
