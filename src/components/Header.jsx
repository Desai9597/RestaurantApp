import { useContext } from 'react';
import Button from './UI/Button.jsx';
import logoImg from '../assets/logo.jpg';
import CartContext from '../store/CartContext.jsx';
import UserProgressContext from '../store/UserProgressContext.jsx';
export default function Header() {

    const cartCtx = useContext(CartContext);
    const userProgressCtx = useContext(UserProgressContext);

    //directly calling just length will not work because it will return just the distict items, not added quantity
    //const totalCartItems = cartCtx.items.length;

    //reduce function runs for each item of array and accumulates a total number based on our logic of adding quantity,
    //passing that acculmulator to next execution cycle for next item in array. Iniital sum is 0.
    const totalCartItems = cartCtx.items.reduce((totalNumberOfItems, item) => {
        return totalNumberOfItems + item.quantity; //adding current item quantity and returning for next execution
    } ,0);

    function handleShowCart(){
        userProgressCtx.showCart();
    }

 return (
    <header id="main-header"> 
        <div id="title">
            <img src={logoImg} alt="A restaurant"></img>
            <h1>
               Red Chili Restaurant
            </h1>
        </div>
        <nav>
            <Button textOnly={true} onClick={handleShowCart}>
                Cart ({totalCartItems})
            </Button>
        </nav>
    </header>
 );
}