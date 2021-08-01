import React, { useEffect } from 'react';
import FoodItem from '../FoodItem';
import { useStoreContext } from '../../utils/GlobalState';
import { UPDATE_FOODS } from '../../utils/actions';
import { useQuery } from '@apollo/client';
import { QUERY_FOODS } from '../../utils/queries';
import { idbPromise } from '../../utils/helpers';
import spinner from '../../assets/spinner.gif';

function FoodList() {
    const [state, dispatch] = useStoreContext();

    const { currentCategory } = state;

    const { loading, data } = useQuery(QUERY_FOODS);

    useEffect(() => {
        if (data) {
            dispatch({
                type: UPDATE_FOODS,
                foods: data.foods,
            });
            data.foods.forEach((food) => {
                idbPromise('foods', 'put', food);
            });
        } else if (!loading) {
            idbPromise('foods', 'get').then((foods) => {
                dispatch({
                    type: UPDATE_FOODS,
                    foods: foods,
                });
            });
        }
    }, [data, loading, dispatch]);

    function filterFoods() {
        if (!currentCategory) {
            return state.foods;
        }

        return state.foods.filter(
            (food) => food.category._id === currentCategory
        );
    }

    return (
        <div className="my-2">
            {state.foods.length ? (
                <div className="flex-row space-between">
                    {filterFoods().map((food) => (
                        <FoodItem
                            key={food._id}
                            _id={food._id}
                            image={food.image}
                            name={food.name}
                            price={food.price}
                            quantity={food.quantity}
                        />
                    ))}
                </div>
            ) : (
                <h3>You haven't added any food yet!</h3>
            )}
            {loading ? <img src={spinner} alt="loading" /> : null}
        </div>
    );
}

export default FoodList;
