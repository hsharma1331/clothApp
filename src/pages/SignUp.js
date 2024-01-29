import React, { useState } from 'react'
import { Link } from 'react-router-dom';

export default function SignUp() {

const [data,setData] = useState({name:'',password:'',email:'',address:''})

const formFun = async(e)=>{
e.preventDefault();
const response =await fetch("https://clothbac.onrender.com/api/createuser",
{
    method:'POST',
    headers:{
        'Content-Type':'application/json'
    },
    body:JSON.stringify({
        name:data.name,
        password:data.password,
        location:data.address,
        email:data.email
    })
})
    const json=await response.json();
    console.log(json);
    if(!json.success){
alert("enter valid details")
    }
}

function dataUpdate(val) {
    // setData({name:val.target.value})
    // setData({email:val.target.value})
    // setData({password:val.target.value})
    // setData({address:val.target.value})

    setData({...data,[val.target.name]:val.target.value})
}

    return (
        <div className='container'>
            <form onSubmit={formFun}>
                <div className="mb-3">
                    <label htmlFor="name" className="form-label">Name</label>
                    <input type="text" className="form-control" id="exampleInputName1" name='name' value={data.name} onChange={dataUpdate}/>
                </div>
                <div className="mb-3">
                    <label htmlFor="exampleInputEmail1" className="form-label">Email</label>
                    <input type="email" name='email' value={data.email} className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" onChange={dataUpdate}/>
                </div>
                <div className="mb-3">
                    <label htmlFor="exampleInputPassword1" className="form-label">Password</label>
                    <input type="password" name='password' value={data.password} className="form-control" id="exampleInputPassword1" onChange={dataUpdate}/>
                </div>
                <div className="mb-3">
                    <label htmlFor="exampleInputPassword1" className="form-label">Address</label>
                    <input type="text" name='address' value={data.address} className="form-control" id="exampleInputAddress1" onChange={dataUpdate}/>
                </div>
                <div className="mb-3 form-check">
                    <input type="checkbox" className="form-check-input" id="exampleCheck1"/>
                        <label className="form-check-label" htmlFor="exampleCheck1">Check me out</label>
                </div>
                <button type="submit" className="btn btn-primary m-3">SignUp</button>
                <Link to='/login' className='btn btn-warning'>Already a User</Link>
            </form>
        </div>
    )
}
