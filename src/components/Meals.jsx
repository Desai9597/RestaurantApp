import { useState, useEffect } from 'react';
import MealItem from './MealItem';
import useHttp from '../hooks/useHttp.js';
import Error from './Error.jsx';
import { AVAILABLE_MEALS } from '../available-meals.js';
const requestConfig = {};

export default function Meals() {

  /*  useEffect(() => {
        fetch('../data/available-meals.json', {
          method: 'GET',
        })
          .then((res) => res.json())
          .then((res) => setData(res))
          .catch((err) => err);
      }, []);*/

   /* const { data: loadedMeals, isLoading, error,} = 
        useHttp('/data/available-meals.json', requestConfig, []);

        //console.log(loadedMeals);

    if(isLoading){
        return <p className="center" >Fetching meals...</p>;
    }

    if(error){
        return <Error title="Failed to fetch meals" message={error} />;
    }*/


    return(
        <ul id="meals">
        {AVAILABLE_MEALS.map(meal =>
           <MealItem key={meal.id} meal={meal}/>
        )}
        </ul>
    );
 
}