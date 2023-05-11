import React from 'react'
import {Link, useNavigate,useParams } from 'react-router-dom'
import Carousel from "react-multi-carousel";



import "react-multi-carousel/lib/styles.css";

const responsive = {
    superLargeDesktop: {
      // the naming can be any, depends on you.
      breakpoint: { max: 4000, min: 3000 },
      items: 6
    },
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 4
    },
    tablet: {
      breakpoint: { max: 1024, min: 464 },
      items: 3
    },
    mobile: {
      breakpoint: { max: 464, min: 0 },
      items: 2
    }
  };

function WatchMovie() {
    const [data,setData]=React.useState([])
    const [reco,setReco]=React.useState([])
    const navigate =useNavigate()
    let params=useParams()
    let endOfSubs
    if(!localStorage.getItem('endOfSubs')) endOfSubs=""
    if(localStorage.getItem('endOfSubs')){
        endOfSubs=JSON.parse(localStorage.getItem('endOfSubs')).endOfSubs
    }
    let token
    if(!localStorage.getItem('login')) endOfSubs=""
    if(localStorage.getItem('login')){
        token=JSON.parse(localStorage.getItem('login')).token
    }
    React.useEffect(()=>{
        if(endOfSubs<Date.now()) return navigate('/in/login') 
        else{
            fetch(process.env.REACT_APP_BACKEND_BASEURL+`/movieById/${params.id}`,{

            })
            .then((result)=>result.json())
            .then(res=>{
                console.log(res)
                
                if(res.status==false){
                   return alert(res.message)
                }
                else{
                    setData(res.data)
                    fetch(process.env.REACT_APP_BACKEND_BASEURL+`/getRecommendedMovies`,{
                        method:'POST',
                        headers:{
                          'Content-type': 'application/json',
                          
                        },
                        body:JSON.stringify({name:res.data.Title})
                    }).then((result1)=>result1.json())
                    .then(res1=>{
                        setReco(res1.data)
                    })

                }
                
                
            })
            
        }

    },[])
  return (
    <>
    <div className='movieById' style={{backgroundColor:"#000000" , height:"80vh" }} >
        <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.4.1/css/bootstrap.min.css"></link>
        <header >

            
                <div className="p-5 text-center bg-image" style={{backgroundImage:`url(${data.Poster_Url}) `,backgroundRepeat: "no-repeat",backgroundPosition:"center",backgroundSize: "380px",backgroundColor:"#000000", position:"relative"}}>
                    <div className="mask" style={{backgroundColor:"rgba(0, 0, 0, 0.6)", height:500,position:'relative'}}>
                    <div className="d-flex justify-content-center align-items-center h-100" style={{position:'absolute',bottom:"0px",width:"100%"}} >
                      <div className="text-white"  >
                          <h1 className="mb-3" style={{color:"#ff0000"}} >{data.Title}</h1>
                          <p className="mb-3" style={{color:"#ffffff"}}>{data.Overview}</p>
                          <button className="btn btn-outline-light btn-lg"  type="button" style={{backgroundColor:"#ff0000"}}>Play</button>
                      </div>
                    </div>
                    </div>
                </div>
            


        
        </header>


        
    </div>
    <div style={{backgroundColor:"#000000"}}>
    <div class="container" style={{paddingBottom:40,paddingTop:20,height:"100%",width:"100%",backgroundColor:"#000000"}} >
              <h3><b style={{color:"#FF0000"}}>Recommended Movies</b></h3>
              <Carousel responsive={responsive} >
                  {
                    reco.map((x)=>
                      <div style={{height:300}}>
                          <Link onClick={()=>{navigate(`/in/movies/${x.id}`);window.location.reload(true)}}  className='EachMovie'><img style={{width:200,height:300,objectFit:'fill'}} src={x['Poster_Url']} /></Link>
                      </div>
                    )
                  }

              </Carousel>

    </div>
    </div>
    </>

    
  )
}

export default WatchMovie