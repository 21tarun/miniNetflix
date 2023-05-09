import React from 'react'
import Nav from './Nav'
import Subscription from './Subscription'
import { useNavigate } from "react-router-dom";

function SignUp(props) {
    const [email,setEmail]=React.useState(props.email)
    const [password,setPassword]=React.useState("")
    const [name,setName]=React.useState("")

    const [success,setSuccess]=React.useState(false)

    const navigate =useNavigate()
    function createUser(){
        if(!email) return alert("email is mandatory")
        if(!password) return alert("password is mandatory")
        if(!name) return alert("name is mandatory")
        let data ={email,password,name}
        fetch(process.env.REACT_APP_BACKEND_BASEURL+"/user",{
            method:"POST",
            headers:{
                'Content-type': 'application/json',

            },
            body: JSON.stringify(data)

        })
        .then((result)=>result.json())
        .then(res=>{
            if(res.status==true){
                data={email,password}
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
                        localStorage.setItem('login',JSON.stringify({
                            login:true,
                            token:res.token,
                            userId:res.userId

                        }))
                        localStorage.setItem('endOfSubs',JSON.stringify({
                            endOfSubs:res.endOfSubs
                        }))

                        

                        setSuccess(true)
                        
                    }
                    else if(res.status==false){
                        
                        if(res.message=="user credential wrong") alert("invalid email or password")
                    }

                    
                })
            }
            else if(res.status==false){
                alert(res.message)
            }

            
        })
    }
  return (
    <div className='signUp'>
        <Nav/>
        {
            !success?
            <div className='signUpForm'>
            <h2 style={{color:'#FFFFFF', paddingTop:40}}>Register</h2><br/>
                <label style={{color:'#FFFFFF',paddingRight:180}} >Full Name</label>
                <input style={{width:250,margin:'auto'}} type="text"  placeholder='Full Name' value={name} onChange={(e)=>{setName(e.target.value)}} /><br/>
    
    
                <label style={{color:'#FFFFFF',paddingRight:215}} >Email</label>
                <input style={{width:250,margin:'auto'}} type="email"  placeholder='Email address' value={email} onChange={(e)=>{setEmail(e.target.value)}} /><br/>
    
                <label style={{color:'#FFFFFF' ,paddingRight:190}} >Password</label>
                <input style={{width:250,margin:'auto'}} type="password" placeholder='password' value={password} onChange={(e)=>{setPassword(e.target.value)}}/><br/>
    
                <button type='button' style={{color:"#FFFFFF", backgroundColor:"#FF0000", width:80,margin:'auto',height:30, marginBottom:20}} onClick={createUser}>Register</button>
                
    
            </div>:
            <Subscription email={email} />
        }
    </div>
  )
}

export default SignUp