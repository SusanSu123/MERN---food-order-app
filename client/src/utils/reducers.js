import { useReducer } from 'react';
import {
    UPDATE_FOODS,
    ADD_TO_CART,
    UPDATE_CART_QUANTITY,
    REMOVE_FROM_CART,
    ADD_MULTIPLE_TO_CART,
    UPDATE_CATEGORIES,
    UPDATE_CURRENT_CATEGORY,
    CLEAR_CART,
    TOGGLE_CART,
} from './actions';


export const reducer = (state, action) => {
    switch (action.type) {
        case UPDATE_FOODS:
            return {
                ...state,
                foods: [...action.foods],
            };
        case ADD_TO_CART:
            return {
                ...state,
                cartOpen: true,
                cart: [...state.cart, action.food],

            };
        case ADD_MULTIPLE_TO_CART:
            return {
                ...state,
                cart: [...state.cart, ...action.foods],
            };

        case UPDATE_CART_QUANTITY:
            return {
                ...state,
                cartOpen: true,
                cart: state.cart.map((food) => {
                    if (action._id === food._id) {
                        food.purchaseQuantity = action.purchaseQuantity;
                    }
                    return food;
                }),
            };

        case REMOVE_FROM_CART:
            let newState = state.cart.filter((food) => {
                return food._id !== action._id;
            });
            return {
                ...state,
                cartOpen: newState.length > 0,
                cart: newState,
            };

        case CLEAR_CART:
            return {
                ...state,
                cartOpen: false,
                cart: [],
            };

        case TOGGLE_CART:
            return {
                ...state,
                cartOpen: !state.cartOpen,
            };

        case UPDATE_CATEGORIES:
            return {
                ...state,
                categories: [...action.categories],
            };

        case UPDATE_CURRENT_CATEGORY:
            return {
                ...state,
                currentCategory: action.currentCategory,
            };
        default:
            return state;
    }
};

export function useFoodReducer(initialState) {
    return useReducer(reducer, initialState);
}