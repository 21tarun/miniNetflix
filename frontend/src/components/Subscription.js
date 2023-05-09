import React from 'react'

import { useNavigate } from "react-router-dom";

function Subscription() {
  const navigate =useNavigate()
  let token
  if(!localStorage.getItem('login')) token=""
  if(localStorage.getItem('login')){
      token=JSON.parse(localStorage.getItem('login')).token
  }

  function subscription(props){
    fetch(process.env.REACT_APP_BACKEND_BASEURL+"/subscription",{
            method:"PUT",
            headers:{
                'x-api-key':token,
                'Content-type': 'application/json'

            },
            body: JSON.stringify(props)

        })
        .then((result)=>result.json())
        .then(res=>{
            if(res.status==true){
                console.log(res)
                localStorage.setItem('endOfSubs',JSON.stringify({
                  endOfSubs:res.endOfSubs
                }))
                navigate('/in/movies')
                
            }
            else if(res.status==false){
                
                alert(res.message)
            }

            
        })
    
  }
  return (
    <div className='subscription'>
      <h2 style={{color:'#ff0000'}}>Choose your subscription plan</h2>
      <div className='subscriptionList'>
      
          <li style={{width:100,heigth:200}}>
              <h1 style={{color:'#ff0000'}}>199 ₹</h1>
              <h4 style={{color:'#FFFFFF'}}>subscription for 1 month</h4>
              <button type="button" onClick={()=>{subscription({amount:199})}} style={{backgroundColor:"#ff0000",color:"#FFFFFF"}}>choose</button>
          </li>
          <li  style={{width:100,heigth:200}}>
              <h1 style={{color:'#ff0000'}}>599 ₹</h1>
              <h4 style={{color:'#FFFFFF'}}>subscription for 4 month</h4>
              <button type="button" onClick={()=>{subscription({amount:599})}} style={{backgroundColor:"#ff0000",color:"#FFFFFF"}}>choose</button>
          </li>
          <li  style={{width:100,heigth:200}}>
              <h1 style={{color:'#ff0000'}}>799 ₹</h1>
              <h4 style={{color:'#FFFFFF'}}>subscription for 6 month</h4>
              <button type="button" onClick={()=>{subscription({amount:799})}} style={{backgroundColor:"#ff0000",color:"#FFFFFF"}}>choose</button>
          </li>
      </div>
    </div>

  )
}

export default Subscription