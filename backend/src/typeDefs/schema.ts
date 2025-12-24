import { gql } from 'apollo-server-express';

export const typeDefs = gql`
  type User {
    id: ID!
    username: String!
    email: String!
    createdAt: String!
  }

  type AuthPayload {
    token: String!
    user: User!
  }

  type Comment {
    id: ID!
    content: String!
    userId: ID!
    user: User!
    contentType: String!
    contentId: ID!
    createdAt: String!
    updatedAt: String!
  }

  type Spell {
    id: ID!
    name: String!
    level: Int!
    school: String!
    castingTime: String!
    range: String!
    components: String!
    duration: String!
    description: String!
    classes: [String!]!
    comments: [Comment!]!
  }

  type Class {
    id: ID!
    name: String!
    hitDie: Int!
    primaryAbility: String!
    saves: [String!]!
    description: String!
    comments: [Comment!]!
  }

  type Race {
    id: ID!
    name: String!
    speed: Int!
    size: String!
    abilityBonus: String!
    traits: [String!]!
    description: String!
    comments: [Comment!]!
  }

  type Query {
    me: User
    spells(search: String): [Spell!]!
    spell(id: ID!): Spell
    classes: [Class!]!
    class(id: ID!): Class
    races: [Race!]!
    race(id: ID!): Race
    comments(contentType: String!, contentId: ID!): [Comment!]!
  }

  type Mutation {
    register(username: String!, email: String!, password: String!): AuthPayload!
    login(email: String!, password: String!): AuthPayload!
    addComment(content: String!, contentType: String!, contentId: ID!): Comment!
    deleteComment(id: ID!): Boolean!
  }

  type Subscription {
    commentAdded(contentType: String!, contentId: ID!): Comment!
  }
`;