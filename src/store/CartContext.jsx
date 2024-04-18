import { createContext, useReducer} from 'react';

const CartContext = createContext({
    items: [],
    addItem: (item) => {},
    removeItem: (id) => {},
    clearCart: () => {}
});

//we pass pointer to this reducer function in our useReducer hook,
//and this function will be called by react when action is dispatched
//and parameters state and action will be provided by react
function cartReducer(state,action){
    if(action.type === 'ADD_ITEM'){
        
        //find index of item in our array, if its already added before, so that we can increment quantity
        const existingCartItemIndex = state.items.findIndex(
            (item) => item.id === action.item.id);

        //copying our state item array into another array, becuase we dont want to mutate state directly
        const updatedItems = [...state.items];

        if(existingCartItemIndex > -1){
            const existingItem = state.items[existingCartItemIndex];
           
            const updatedItem = {
                ...existingItem,
                quantity: existingItem.quantity + 1
            };

            //updating state in an immutable way
            updatedItems[existingCartItemIndex] = updatedItem;
        }else{
            //add a new property called quantity in our state, when adding first time,
            //put quantity 1 for first time adding
            updatedItems.push({...action.item, quantity: 1});
        }

        //returning new state from the reducer, as it is the job of reducer
        return {...state, items: updatedItems};
    }
    if(action.type === 'REMOVE_ITEM'){
        const existingCartItemIndex = state.items.findIndex(
            (item) => item.id === action.id
        );

        const existingCartItem = state.items[existingCartItemIndex];
        const updatedItems = [...state.items];
        if(existingCartItem.quantity === 1){
           
            updatedItems.splice(existingCartItemIndex,1); //remove 1 item at index
        }
        else{
            const updatedItem = {
                ...existingCartItem,
                quantity: existingCartItem.quantity - 1,
            };
            updatedItems[existingCartItemIndex] = updatedItem;
        }

        return {...state, items: updatedItems};
    }

    if(action.type === 'CLEAR_CART'){
        return { ...state, items: []};
    }

    return state;
}
export function CartContextProvider({children}) {

    //useReducer hook : first arg is reducer function and second is the initial state. We decice the shape of our state here.
    const [cart, dispatchCartAction ] = useReducer(cartReducer, { items: []});

    function addItem(item) {
        dispatchCartAction({ type: 'ADD_ITEM', item: item});
    }
    function removeItem(id){
        dispatchCartAction({ type: 'REMOVE_ITEM', id: id});
    }
    function clearCart(){
        dispatchCartAction({ type: 'CLEAR_CART'});
    }

    //whenever cart state changes, cart.items in below context value object will also change
    // and distributed to all components that are wrapped by provider
    const cartContext = {
      items: cart.items,
        addItem: addItem,   //function pointer that we have defined above
        removeItem: removeItem,
        clearCart: clearCart,
    };

    console.log(cartContext);

    return <CartContext.Provider value={cartContext}>
        {children}
    </CartContext.Provider>
}

export default CartContext;