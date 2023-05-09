
import './App.css';

import {Route,Routes,Navigate } from 'react-router-dom'
import Start from './components/Start';
import SignIn from './components/SignIn';
import SignUp from './components/SignUp';
import Movies from './components/Movies';
import WatchMovie from './components/WatchMovie';


function App() {
 
  return (
   
    <div className="App">
       
       <Routes>
        <Route  path="/" element={<Navigate replace  to="/in" />}/>
         
        <Route path='/in' element={<Start />}/>
        <Route path='in/login' element={<SignIn />}/>
        <Route path='in/movies' element={<Movies />}/>
        <Route path="in/movies/:id" element={<WatchMovie/>}/>
        

        {/* <Route path='/*' element={<PageNotFound />}/> */}
      </Routes>
      
    </div>
  );
}

export default App;
