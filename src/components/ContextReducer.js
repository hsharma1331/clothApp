import React, { createContext, useContext, useReducer } from 'react'

const CartStateContext = createContext();           //creating global state; so that it can be used anywhere in the app
const CartDispatchContext = createContext();

const reducer = (state, action) => {
    switch (action.type) {
        case 'ADD':
            return [...state, { id: action.id, name: action.name, price: action.price, size: action.size, qty: action.qty, img: action.img, desc: action.desc }]
        case 'REMOVE':
            let newArr = [...state]
            newArr.splice(action.index, 1);
            return newArr;
        case 'UPDATE':
            let arr = [...state];
            arr.find((item, index) => {
                if (item.id === action.id) {
                    arr[index] = { ...item, qty: parseInt(action.qty) + item.qty, price: action.price + item.price }
                }
                return arr;
            })
            return arr;
         case 'DROPCART':
            let emptyArr=[]
            return emptyArr;
        default:
            console.log('error in reducer');
    }
}

export const CartProvider = ({ children }) => {
    const [state, dispatch] = useReducer(reducer, [])         //this dispatch is having multiple no of cases(actions)     //in start , the cart will be empty. so []
    return (
        <CartDispatchContext.Provider value={dispatch}>
            <CartStateContext.Provider value={state}>
                {children}
            </CartStateContext.Provider>
        </CartDispatchContext.Provider>
    )
}

export const useCart = () => useContext(CartStateContext);
export const useDispatchCart = () => useContext(CartDispatchContext);