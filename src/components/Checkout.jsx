import { useContext } from 'react';
import CartContext from '../store/CartContext';
import { currencyFormatter } from '../util/formatting';
import Modal from './UI/Modal.jsx';
import Input from './UI/Input.jsx';
import Button from './UI/Button.jsx';
import UserProgressContext from '../store/UserProgressContext.jsx';
import useHttp from '../hooks/useHttp.js';
import Error from './Error.jsx';

//created outside of component function to avoid re-creation and hence infinite loop
const requestConfig ={
    method: 'POST',
    headers: {
        'Content-Type' : 'application/json'
    },
  //Do not specify "body" key value pair, because until submit is clicked we dont have form data to be sent in post request body
};

export default function Checkout() {
    const cartCtx = useContext(CartContext);
    const userProgressCtx = useContext(UserProgressContext);

    const {data, isLoading: isSending, error, sendRequest, clearData } 
    = useHttp('https://food-order-app-5e331-default-rtdb.firebaseio.com/orders.json', requestConfig);


    const cartTotal = cartCtx.items.reduce(
        (totalPrice, item) => totalPrice + item.quantity * item.price,
        0
    );

    function handleClose(){
        userProgressCtx.hideCheckout();
    }

    function handleFinish(){
        userProgressCtx.hideCheckout();
        cartCtx.clearCart();
        clearData();
    }
    function handleSubmit(event){
        event.preventDefault();

        const formData = new FormData(event.target);
        const customerData = Object.fromEntries(formData.entries());

        sendRequest(JSON.stringify({
            order: {
                items: cartCtx.items,
                customer: customerData,
            },
        })
        );      
    }

    let actions = (
     <>
        <Button type="button" textOnly onClick={handleClose}>Close</Button>
        <Button>Submit Order</Button>
     </>   
    );

    if(isSending){
        actions = <span>Sending order data...</span>
    }

    if(data && !error){
        return(
            <Modal 
              open={userProgressCtx.progress === 'checkout'}
              close={handleFinish}
            >
                <h2>Success !</h2>
                <p>Your order was submitted sucessfully.</p>
                <p>
                    We will get back to you with more details via email within few minutes.
                </p>
                <p className="modal-actions">
                    <button onClick={handleFinish}>ok</button>
                </p>
            </Modal>
        ) ;
    };

    return (
        <Modal open={userProgressCtx.progress === 'checkout'} onClose={handleClose}> 
            <form onSubmit={handleSubmit}>
                <h2> Checkout</h2>
                <p>Total Amount: {currencyFormatter.format(cartTotal)}</p>

                <Input label="Full Name" type="text" id="name"/>
                <Input label="E-Mail Address" type="email" id="email" />
                <Input label="Street" type="text" id="street" />

                <div className="control-row">
                    <Input label="Postal Code" type="text" id="postal-code" />
                    <Input label="City" type="text" id="city" />
                </div>

                {error && <Error title="Failed to submit order" message={error} />}
                <p className="modal-actions">
                    {actions}
                </p>
            </form>

        </Modal>
    );
};