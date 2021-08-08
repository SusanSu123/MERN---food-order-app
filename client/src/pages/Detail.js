import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { useQuery } from '@apollo/client';

import Cart from '../components/Cart';
import { useStoreContext } from '../utils/GlobalState';
import {
    REMOVE_FROM_CART,
    UPDATE_CART_QUANTITY,
    ADD_TO_CART,
    UPDATE_FOODS,
} from '../utils/actions';
import { QUERY_FOODS } from '../utils/queries';
import { idbPromise } from '../utils/helpers';
import spinner from '../assets/spinner.gif';

function Detail() {
    const [state, dispatch] = useStoreContext();
    const { id } = useParams();

    const [currentFood, setCurrentFood] = useState({});

    const { loading, data } = useQuery(QUERY_FOODS);

    const { foods, cart } = state;

    useEffect(() => {
        // already in global store
        if (foods.length) {
            setCurrentFood(foods.find((food) => food._id === id));
        }
        // retrieved from server
        else if (data) {
            dispatch({
                type: UPDATE_FOODS,
                foods: data.foods,
            });

            data.foods.forEach((food) => {
                idbPromise('foods', 'put', food);
            });
        }
        // get cache from idb
        else if (!loading) {
            idbPromise('foods', 'get').then((indexedFoods) => {
                dispatch({
                    type: UPDATE_FOODS,
                    foods: indexedFoods,
                });
            });
        }
    }, [foods, data, loading, dispatch, id]);

    const addToCart = () => {
        const itemInCart = cart.find((cartItem) => cartItem._id === id);
        if (itemInCart) {
            dispatch({
                type: UPDATE_CART_QUANTITY,
                _id: id,
                purchaseQuantity: parseInt(itemInCart.purchaseQuantity) + 1,
            });
            idbPromise('cart', 'put', {
                ...itemInCart,
                purchaseQuantity: parseInt(itemInCart.purchaseQuantity) + 1,
            });
        } else {
            dispatch({
                type: ADD_TO_CART,
                food: { ...currentFood, purchaseQuantity: 1 },
            });
            idbPromise('cart', 'put', { ...currentFood, purchaseQuantity: 1 });
        }
    };

    const removeFromCart = () => {
        dispatch({
            type: REMOVE_FROM_CART,
            _id: currentFood._id,
        });

        idbPromise('cart', 'delete', { ...currentFood });
    };

    return (
        <>
            {currentFood && cart ? (
                <div className="container my-1">
                    <Link to="/menu">← Back to Menu</Link>

                    <h2>{currentFood.name}</h2>

                    <p>{currentFood.description}</p>

                    <p>
                        <strong>Price:</strong>${currentFood.price}{' '}
                        <button onClick={addToCart}>Add to Cart</button>
                        <button
                            disabled={!cart.find((p) => p._id === currentFood._id)}
                            onClick={removeFromCart}
                        >
                            Remove from Cart
                        </button>
                    </p>

                    <img
                        src={`/images/${currentFood.image}`}
                        alt={currentFood.name}
                    />
                </div>
            ) : null}
            {loading ? <img src={spinner} alt="loading" /> : null}
            <Cart />
        </>
    );
}

export default Detail;
