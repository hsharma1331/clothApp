import React ,{useState} from 'react'
import { Link , useNavigate } from 'react-router-dom'

export default function Login() {

  let navigate=useNavigate();
    const [data,setData] = useState({password:'',email:''})
    
    const formFun = async(e)=>{
    e.preventDefault();
    const response =await fetch("http://localhost:5000/api/loginuser",
    {
        method:'POST',
        headers:{
            'Content-Type':'application/json'
        },
        body:JSON.stringify({
            password:data.password,
            email:data.email
        })
    })
        const json=await response.json();
        console.log(json);
        if(!json.success){
    alert("enter valid details")
        }
        else{
            localStorage.setItem("userEmail",data.email);               //storing this one to use it in OrderData 
            localStorage.setItem("authToken",json.authToken)
            // localStorage.setItem("variable where we want to save the value",variable in which the value is stored)
            console.log(localStorage.setItem("authToken",json.authToken));
          navigate('/')
        }
    }
    
    function dataUpdate(val) {
    
        setData({...data,[val.target.name]:val.target.value})
    }
  return (
    <div>
        <div className='container'>
            <form onSubmit={formFun}>
                <div className="mb-3">
                    <label htmlFor="exampleInputEmail1" className="form-label">Email</label>
                    <input type="email" name='email' value={data.email} className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" onChange={dataUpdate}/>
                </div>
                <div className="mb-3">
                    <label htmlFor="exampleInputPassword1" className="form-label">Password</label>
                    <input type="password" name='password' value={data.password} className="form-control" id="exampleInputPassword1" onChange={dataUpdate}/>
                </div>
                <div className="mb-3 form-check">
                    <input type="checkbox" className="form-check-input" id="exampleCheck1"/>
                        <label className="form-check-label" htmlFor="exampleCheck1">Check me out</label>
                </div>
                <button type="submit" className="btn btn-primary m-3">Login</button>
                <Link to='/createuser' className='btn btn-warning'>New User</Link>
            </form>
        </div>
    </div>
  )
}
