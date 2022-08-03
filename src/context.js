import React, { useContext, useEffect, useReducer} from "react";
import cartItems from "./data";
import reducer from "./reducer";
const url = 'https://course-api.com/react-useReducer-cart-project';

const AppContext = React.createContext(undefined);

const initialState = {
    loading: false,
    cart: cartItems,
    total: 0,
    amount: 0,
}

const AppProvider = ({children}) => {

    const [ state, dispatch ] = useReducer(reducer, initialState);

    const clearCart = () => {
        dispatch({ type: 'CLEAR_CART' })
    }

    const removeCart = (id) => {
        dispatch({ type: 'REMOVE', payload:id })
    }

    const increaseCart = (id) => {
        dispatch({ type: 'INCREASE', payload:id })
    }

    const decreaseCart = (id) => {
        dispatch({ type: 'DECREASE', payload:id })
    }

    const fetchData = async () => {
        dispatch({ type: 'LOADING' })
        const response = await fetch(url);
        const cart = await response.json();
        dispatch({ type: 'DISPLAY_DATA', payload: cart })
    }

    const toggleAmount = (id, type) => {
        dispatch({ type: 'TOGGLE_AMOUNT', payload: {id, type} })
    }

    useEffect( () => {
        fetchData()
    },[])

    useEffect( () => {
        dispatch({ type: 'GET_TOTALS' })
    }, [state.cart])

    return (
        <AppContext.Provider value={
            {
                ...state,
                clearCart,
                removeCart,
                increaseCart,
                decreaseCart,
                toggleAmount,
            }
        }
        >
            {children}
        </AppContext.Provider>
    )
}

// custom hook - make sure "use" keyword always
export const useGlobalContext = () => {
    return useContext(AppContext);
}

export { AppContext, AppProvider }