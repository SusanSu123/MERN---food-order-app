import { gql } from '@apollo/client';

export const QUERY_FOODS = gql`
  query getFoods($category: ID) {
    foods(category: $category) {
      _id
      name
      description
      price
      quantity
      image
      category {
        _id
      }
    }
  }
`;

export const QUERY_CHECKOUT = gql`
  query getCheckout($foods: [ID]!) {
    checkout(foods: $foods) {
      session
    }
  }
`;

export const QUERY_ALL_FOODS = gql`
  {
    foods {
      _id
      name
      description
      price
      quantity
      category {
        name
      }
    }
  }
`;

export const QUERY_CATEGORIES = gql`
  {
    categories {
      _id
      name
    }
  }
`;

export const QUERY_USER = gql`
  {
    user {
      firstName
      lastName
      orders {
        _id
        purchaseDate
        foods {
          _id
          name
          description
          price
          quantity
          image
        }
      }
    }
  }
`;
