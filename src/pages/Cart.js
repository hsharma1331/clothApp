import React from 'react'
import { useCart, useDispatchCart } from '../components/ContextReducer'

export default function Cart() {

    let data = useCart();
    let dispatch = useDispatchCart();
    if (data.length === 0) {
        return (
            <div>
                <div className='m-5 w-100 text-center text-warning fs-3' >The cart is empty.</div>
            </div>
        )
    }
    let totalPrice = data.reduce((total, cloth) => total + cloth.price, 0)

    const handleCheckout = async () => {
        let userEmail = localStorage.getItem("userEmail");
        let response = await fetch("http://localhost:5000/api/orderData",
            {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(
                    {
                        order_data: data,
                        email: userEmail,
                        order_date: new Date().toDateString()
                    })
            }
        )
if(response.status===200){
    dispatch({type:"DROPCART"})
}
    }


    return (
        <div>

            <div className='container m-auto table-responsive table-responsive-sm table-responsive-md '>
                <table className='table table-dark table-hover '>
                    <thead >
                        <tr>
                            <th className='text-primary fs-4' scope='col'>#</th>
                            <th className='text-primary fs-4' scope='col'>Name</th>
                            <th className='text-primary fs-4' scope='col'>Quantity</th>
                            <th className='text-primary fs-4' scope='col'>Option</th>
                            <th className='text-primary fs-4' scope='col'>Amount</th>
                            <th className='text-danger fs-4' scope='col'>Remove</th>
                        </tr>
                    </thead>
                    <tbody>
                        {data.map((cloth, index) =>
                            <tr>
                                <th scope='row'>{index + 1}</th>
                                <td>{cloth.name}</td>
                                <td>{cloth.qty}</td>
                                <td>{cloth.size}</td>
                                <td>{cloth.price}</td>
                                <td><button className='btn'><i className="bi bi-trash3-fill fs-4 text-warning" onClick={() => { dispatch({ type: "REMOVE", index: index }) }} /></button></td>
                            </tr>
                        )}
                    </tbody>
                </table>
                <div><h1 className='fs-2 text-success'>Total Price :{totalPrice}</h1></div>
                <div>
                    <button className='btn bg-success mt-5' onClick={handleCheckout}>Check Out</button>
                </div>
            </div>
        </div>
    )
}
