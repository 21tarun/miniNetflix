import React from 'react'
import { Link, useNavigate, NavLink } from 'react-router-dom'
import Carousel from "react-multi-carousel";
import {Button ,Modal} from 'react-bootstrap'
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







function Movies() {

    
    let [data,setData]= React.useState({latest:[],popular:[],liked:[],romantic:[],horror:[],animation:[],fiction:[],thriller:[]})
    let [search,setSearch]=React.useState(false)
    let [searchData,setSearchData]=React.useState([])
    
    const navigate =useNavigate()
    let endOfSubs
    if(!localStorage.getItem('endOfSubs')) endOfSubs=""
    if(localStorage.getItem('endOfSubs')){
        endOfSubs=JSON.parse(localStorage.getItem('endOfSubs')).endOfSubs
    }
    let token
    if(!localStorage.getItem('login')) token=""
    if(localStorage.getItem('login')){
        token=JSON.parse(localStorage.getItem('login')).token
    }
    React.useEffect(()=>{
        if(endOfSubs<Date.now()) return navigate('/in/login') 
        else{
            fetch(process.env.REACT_APP_BACKEND_BASEURL+"/movies",{
                headers:{
    
                    'x-api-key':token
                }
            })
            .then((result)=>result.json())
            .then(res=>{
                console.log(res)
                
                if(res.status==false){
                   return alert(res.message)
                }
                setData(res.data)
                
                
            })

        }
    },[])

    function searchpage(value){
      if(value=="")setSearch(false)
      if(value!=""){
        setSearch(true)
        let Tdata= {text:value}
        fetch(process.env.REACT_APP_BACKEND_BASEURL+"/search",{
          method:'POST',
          headers:{
            'Content-type': 'application/json',
            
          },
          body:JSON.stringify(Tdata)
        })
        .then((result)=>result.json())
        .then(res=>{
            console.log(res)
            
            if(res.status==false){
              return alert(res.message)
            }
            setSearchData(res.data)
            
            
          })
      }

      
      
  }
  function movieDetail(title){
    console.log(title)

  }

 

  return (
    
  <div className='movies' style={{backgroundColor:'#000000',height:'100vh'}}>
      <div className="topnav">
          <h4 className="active">miniNetflix</h4>

          <input type="text" placeholder="Search.." onChange={(e)=>{searchpage(e.target.value)}}/>
          <button type="button" className='signout' onClick={()=>{localStorage.removeItem('endOfSubs');localStorage.removeItem('login');window.location.reload()}}>SignOut</button>
      </div>
      {
        !search?
        <div style={{backgroundColor:'#000000'}}>
          <div id="myCarousel" class="carousel slide" data-ride="carousel">
              <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.4.1/css/bootstrap.min.css"></link>
              <ol class="carousel-indicators">
                <li data-target="#myCarousel" data-slide-to="0" ></li>
                <li data-target="#myCarousel" data-slide-to="1"></li>
                <li data-target="#myCarousel" data-slide-to="2"></li>
                <li data-target="#myCarousel" data-slide-to="3"></li>
                <li data-target="#myCarousel" data-slide-to="4"></li>
              </ol>


            
            <div  class='carousel-inner'>
              {
                data['latest'].map((x,i)=>
                  i==0?
                  <div class="item active" >
                    
                    <Link to={`${x.id}`}  className='EachMovie'><img src={x['Poster_Url']}  style={{height:600,width:1000,margin:'auto'}}/></Link>
                    
                    
                  </div>:
                  <div class="item" >
                    
                    <Link to={`${x.id}`}  className='EachMovie'><img src={x['Poster_Url']}  style={{height:600,width:1000,margin:'auto'}}/></Link>
                      
                      
                        
                  </div>

                )
              }


            </div>

            
            <a class="left carousel-control" href="#myCarousel" data-slide="prev">
              <span class="glyphicon glyphicon-chevron-left"></span>
              <span class="sr-only">Previous</span>
            </a>
            <a class="right carousel-control" href="#myCarousel" data-slide="next">
              <span class="glyphicon glyphicon-chevron-right"></span>
              <span class="sr-only">Next</span>
            </a>
          </div>

          <div class="container" style={{marginTop:40}}>
              <h3><b style={{color:"#FF0000"}}>most watched</b></h3>
              <Carousel responsive={responsive}>
                  {
                    data['popular'].map((x)=>
                      <div style={{height:300}}>
                          <Link to={`${x.id}`}  className='EachMovie'><img style={{width:200,height:300,objectFit:'fill'}} src={x['Poster_Url']} /></Link>
                      </div>
                    )
                  }

              </Carousel>

          </div>
          <div class="container" style={{marginTop:40}}>
              <h3><b style={{color:"#FF0000"}}>most liked </b></h3>
              <Carousel responsive={responsive}>
                  {
                    data['liked'].map((x)=>
                      <div style={{height:300}}>
                        <Link to={`${x.id}`} className='EachMovie'><img style={{width:200,height:300,objectFit:'fill'}} src={x['Poster_Url']} /></Link>
                      </div>
                    )
                  }

              </Carousel>

          </div>
          <div class="container" style={{marginTop:40}}>
              <h3><b style={{color:"#FF0000"}}>Romance</b></h3>
              <Carousel responsive={responsive}>
                  {
                    data['romantic'].map((x)=>
                      <div style={{height:300}}>
                        <Link to={`${x.id}`} className='EachMovie'><img style={{width:200,height:300,objectFit:'fill'}} src={x['Poster_Url']} /></Link>
                      </div>
                    )
                  }

              </Carousel>

          </div>
          <div class="container" style={{marginTop:40}}>
              <h3><b style={{color:"#FF0000"}}>Horror</b></h3>
              <Carousel responsive={responsive}>
                  {
                    data['horror'].map((x)=>
                      <div style={{height:300}}>
                        <Link to={`${x.id}`} className='EachMovie'><img style={{width:200,height:300,objectFit:'fill'}} src={x['Poster_Url']} /></Link>
                      </div>
                    )
                  }

              </Carousel>

          </div>
          <div class="container" style={{marginTop:40}}>
              <h3><b style={{color:"#FF0000"}}>Animation</b></h3>
              <Carousel responsive={responsive}>
                  {
                    data['animation'].map((x)=>
                      <div style={{height:300}}>
                        <Link to={`${x.id}`} className='EachMovie'><img style={{width:200,height:300,objectFit:'fill'}} src={x['Poster_Url']} /></Link>
                      </div>
                    )
                  }

              </Carousel>

          </div>
          <div class="container" style={{marginTop:40}}>
              <h3><b style={{color:"#FF0000"}}>Science Fiction</b></h3>
              <Carousel responsive={responsive}>
                  {
                    data['fiction'].map((x)=>
                      <div style={{height:300}}>
                        <Link to={`${x.id}`} className='EachMovie'><img style={{width:200,height:300,objectFit:'fill'}} src={x['Poster_Url']} /></Link>
                      </div>
                    )
                  }

              </Carousel>

          </div>
          <div class="container" style={{marginTop:40}}>
              <h3><b style={{color:"#FF0000"}}>Thriller</b></h3>
              <Carousel responsive={responsive}>
                  {
                    data['thriller'].map((x)=>
                      <div style={{height:300}}>
                        <Link to={`${x.id}`} className='EachMovie'><img style={{width:200,height:300,objectFit:'fill'}} src={x['Poster_Url']} /></Link>
                      </div>
                    )
                  }

              </Carousel>

          </div>
      </div>:
      <div class="container" style={{backgroundColor:'#000000'}} >
      <div class="row"  style={{backgroundColor:'#000000'}} >
        <div class="MultiCarousel" data-items="1,3,5,6" data-slide="1" id="MultiCarousel"  data-interval="1000" style={{backgroundColor:'#000000'}}>
                <div class="MultiCarousel-inner" style={{backgroundColor:'#000000'}}>
                    {
                      searchData.map((x)=>
                        <div class="item" style={{width:200,height:300}}>
                          <div class="pad15" style={{width:200,height:300}}>
                            <Link to={`${x.id}`} className='EachMovie'><img style={{width:200,height:300,objectFit:'fill'}} src={x['Poster_Url']} /></Link>
                          </div>
                        </div>
                      )
                    }

                </div>

            </div>
      </div>

    </div>
      }

    
</div>
  )
}

export default Movies