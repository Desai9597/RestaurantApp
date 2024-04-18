import Button from './UI/Button.jsx';
import { currencyFormatter } from "../util/formatting";

import { useContext } from 'react';
import CartContext from '../store/CartContext.jsx';

export default function MealItem({meal}) {
    const cartCtx = useContext(CartContext);
    function handleMealItemToCart(){
        cartCtx.addItem(meal);
    }
    { console.log(meal)};
    return(
     
        <li className="meal-item">
            <article>
                <img src={meal.image} alt={meal.name} />
                <div>
                    <h3>{meal.name}</h3>
                    <p className="meal-item-price">
                        {currencyFormatter.format(meal.price)}
                    </p>
                    <p className="meal-item-description">{meal.description}</p>
                </div>
                <p className="meal-item-actions"> 
                    <Button onClick={handleMealItemToCart}>Add to Cart</Button>
                </p>
            </article>
        </li>
    );
}