const { gql } = require('apollo-server-express');

const typeDefs = gql`
  type Category {
    _id: ID
    name: String
  }

  type Food {
    _id: ID
    name: String
    description: String
    image: String
    quantity: Int
    price: Float
    category: Category
  }

  type Order {
    _id: ID
    purchaseDate: String
    foods: [Food]
  }

  type User {
    _id: ID
    firstName: String
    lastName: String
    email: String
    orders: [Order]
  }

  type Checkout {
    session: ID
  }

  type Auth {
    token: ID
    user: User
  }

  type Query {
    categories: [Category]
    foods(category: ID, name: String): [Food]
    food(_id: ID!): Food
    user: User
    order(_id: ID!): Order
    checkout(foods: [ID]!): Checkout
  }

  type Mutation {
    addUser(firstName: String!, lastName: String!, email: String!, password: String!): Auth
    addOrder(foods: [ID]!): Order
    updateUser(firstName: String, lastName: String, email: String, password: String): User
    updateFood(_id: ID!, quantity: Int!): Food
    login(email: String!, password: String!): Auth
  }
  `;

module.exports = typeDefs;