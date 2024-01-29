import React, { useEffect, useRef, useState } from 'react'
import { useCart, useDispatchCart } from './ContextReducer';

export default function Card(props) {

    let options = props.options;
    let keys = Object.keys(options);
    const [qty, setQty] = useState(1);
    const [size, setSize] = useState('')

    let dispatch = useDispatchCart();
    let data = useCart();

    const handleAddToCart = async () => {

        let cloth = [];
        for (const item of data) {
            if (item.id === props.clothItems._id) {
                cloth = item;
                break;
            }
        }
        if (cloth !== []) {
            if (cloth.size === size) {
                await dispatch({ type: "UPDATE", id: props.clothItems._id, price: total, qty: qty })
                return
            }
            else if(cloth.size !==size){
                await dispatch({type:"ADD",id:props.clothItems._id,name:props.clothItems.name,size:size,qty:qty,price:total})
                return
            }
            return
        }

        await dispatch({ type: 'ADD', id: props.clothItems._id, name: props.clothItems.name, img: props.clothItems.img, desc: props.clothItems.description, price: total, qty: qty, size: size });
        console.log(data);
    }


    const priceRef = useRef()
    useEffect(() => {
        setSize(priceRef.current.value)
    }, [])

    let total = qty * parseInt(options[size]);

    return (
        <div>
            <div className="card mt-3" style={{ width: "18rem", height: '500px' }}>
                <img src={props.clothItems.img} className="card-img-top " style={{ height: '200px' }} alt="..." />
                <div className="card-body">
                    <h4>{props.clothItems.name}</h4>
                    <p className="card-text">{props.clothItems.description}</p>
                    <div className="container w-100" style={{ position: 'absolute', bottom: '25px' }}>
                        {/* this is for the quantity */}
                        <select className=" h-30 bg-warning rounded" onChange={(e) => setQty(e.target.value)}>
                            {
                                Array.from(Array(6), (e, i) => {
                                    return (
                                        <option key={i + 1} value={i + 1}>{i + 1}</option>
                                    )
                                })}
                        </select>
                        {/* this is for the size of the garment */}
                        <select className="w-25 h-100 bg-warning rounded mx-1" ref={priceRef} onChange={(e) => setSize(e.target.value)}>
                            {
                                keys.map((key) => {
                                    return <option key={key} value={key} >{key}</option>
                                })
                            }
                        </select>
                        <div className="d-inline">
                            <div className='btn btn-sm bg-warning mx-3 rounded fs-6 ' onClick={handleAddToCart}>Add to Cart</div>
                        </div>
                        <hr />
                        <div>
                            Total Price :{total}

                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
