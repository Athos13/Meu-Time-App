import React from "react"
import Header from "./Header"
import Login from "./Login";
import Footer from "./Footer"
import Ligas from "./Ligas"
import Paises from "./Paises";
import Times from "./Times";
import TimeDados from "./TimeDados"
import {BrowserRouter,Routes,Route} from 'react-router-dom'


/*
*/

const App =()=>{
  
  return (
    
    <BrowserRouter >
    <Header/>
    
      <Routes>
          <Route exact path="/" element={<Login/>}/>
          <Route path="Ligas" element={<Ligas/>}/>
          <Route path="Paises" element={<Paises/>}/>
          <Route path="Times" element={<Times/>}/>
          <Route path="TimeDados" element={<TimeDados/>}/>
          

      </Routes>
    <Footer/>
    </BrowserRouter>
    
  )
}
export default App;


