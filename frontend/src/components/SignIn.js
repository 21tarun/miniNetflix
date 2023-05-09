import React from 'react'
import Nav from './Nav'
import {Link} from 'react-router-dom'
import Subscription from './Subscription'
import { useNavigate } from 'react-router-dom'

function SignIn() {
    const [email,setEmail]=React.useState("")
    const [password,setPassword]=React.useState("")
    const [success,setSuccess]=React.useState(false)
    const [subs,setSubs]=React.useState(false)
    const navigate =useNavigate()


    function loginUser(){
        if(!email) return alert("email is mandatory")
        if(!password) return alert("password is mandatory")
        
        let data ={email,password}
        fetch(process.env.REACT_APP_BACKEND_BASEURL+"/login",{
            method:"POST",
            headers:{
                'Content-type': 'application/json',

            },
            body: JSON.stringify(data)

        })
        .then((result)=>result.json())
        .then(res=>{
            if(res.status==true){
                console.log(res)
                localStorage.setItem('login',JSON.stringify({
                    login:true,
                    token:res.token,
                    userId:res.userId

                }))
                localStorage.setItem('endOfSubs',JSON.stringify({
                    endOfSubs:res.endOfSubs
                }))

                if(res.endOfSubs>Date.now())setSubs(true)
                console.log(Number(res.endOfSubs),Date.now())
                setSuccess(true)
                
            }
            else if(res.status==false){
                
                if(res.message=="user credential wrong") alert("invalid email or password")
            }

            
        })

    }
  return (
    <div className='signin'>
        
        {
            !success?
            <div className='login'>
                <h2 style={{color:'#FFFFFF', paddingTop:40}}>Sign In</h2><br/>
                <label style={{color:'#FFFFFF',paddingRight:215}} >Email</label>
                <input style={{width:250,margin:'auto'}} type="email" placeholder='Email address' onChange={(e)=>{setEmail(e.target.value)}}/><br/>

                <label style={{color:'#FFFFFF' ,paddingRight:190}} >Password</label>
                <input style={{width:250,margin:'auto'}} type="password" placeholder='password' onChange={(e)=>{setPassword(e.target.value)}}/><br/>

                <button type='button' style={{color:"#FFFFFF", backgroundColor:"#FF0000", width:80,margin:'auto',height:30}} onClick={loginUser}>SignIn</button>
                <Link to="/">SignUp</Link>


            </div>:
            
            subs?navigate('/in/movies'):<Subscription email={email}/>
        }
    </div>
  )
}

export default SignIn

