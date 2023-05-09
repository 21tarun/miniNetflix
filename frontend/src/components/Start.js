import React from 'react'
import Nav from './Nav'
import SignUp from './SignUp'
import { useNavigate } from "react-router-dom";

function Start() {
    let [email,setEmail]=React.useState("")
    
    let [flag,setFlag]=React.useState(false)
    const navigate =useNavigate()
    let token
    if(!localStorage.getItem('login')) token=""
    if(localStorage.getItem('login')){
        token=JSON.parse(localStorage.getItem('login')).token
    }
    if(localStorage.getItem('endOfSubs')){
        var endOfSubs=JSON.parse(localStorage.getItem('endOfSubs')).endOfSubs
        
    }

    React.useEffect(()=>{
        if(endOfSubs>Date.now()) navigate('/in/movies')
    })

    
    function checkEmail(){
        fetch(process.env.REACT_APP_BACKEND_BASEURL+"/checkEmail",{
            method:"POST",
            headers:{
                'Content-type': 'application/json',

            },
            body: JSON.stringify({email})

        })
        .then((result)=>result.json())
        .then(res=>{
            if(res.message=='email not exist'){
                setFlag(true)
            }
            else if(res.message=='email exist'){
                navigate('/in/login')
            }
            else{
                alert(res.message)
            }

            
        })

    }
  return (
    <>
    {
        !flag?
        <div className='start' style={{display:"grid"}}>
            <Nav/>
        
            <div className='emailBar' style={{marginBottom:200}}>
                <h4 style={{color:"#FFFFFF"}}>Enter your email to create or restart your membership.</h4><br/>
                <input type="email" style={{width:400,height:50,marginRight:10}} placeholder='Email Address' onChange={(e)=>setEmail(e.target.value)}/>
                <button  type="button" style={{width:150,height:55,color:'#FFFFFF', backgroundColor:"#FF0000"}} onClick={checkEmail}>Get Started </button>
            </div>

        </div>:
        
        <SignUp  email={email}/>
     
            
        
    }
    </>
  )
}

export default Start