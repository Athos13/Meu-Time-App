import React from "react";
import Titulo from "./Titulo";
import { Link } from "react-router-dom";
import Head from "./Head";

const Ligas = ()=>{

const [ligas,setLigas]=React.useState(null)
const [carregando,setCarregando]=React.useState(null)
let key = window.localStorage.getItem("key")

React.useEffect(()=>{
   fetch("https://v3.football.api-sports.io/leagues", {
	"method": "GET",
	"headers": {
		"x-rapidapi-host": "v3.football.api-sports.io",
		"x-rapidapi-key":`${key}`
	}
})

.then(response => response.json(), setCarregando(true))
.then(json => json.response)
.then(response => setLigas(response))
.then(()=>setCarregando(false) )

.catch(err => console.log(err))

},[key])

function ligaClicada({target}){
 const h1=target.parentNode.firstChild
 window.localStorage.setItem("nomeLiga", h1.innerText)
 
 const idLiga = target.parentNode.childNodes[2]
 window.localStorage.setItem("idLiga", idLiga.innerText)
 
 console.log(h1)
 console.log(idLiga)
}

return(
 <section className="altura-minima">
  <Head title="Meu Time | Ligas" description="Ligas dispóniveis"/>

    <Titulo texto="Ligas Disponiveis"/>
    { carregando && <p>Carregando...</p>}

    <ul className="container">
      {ligas && ligas.map((liga) => (
      <li onClick={ligaClicada} key={liga.league.id}>
      
        <h3>{liga.league.name}</h3> <span>{liga.league.id}</span>
        <div className="div-img">
          <img src={liga.league.logo} alt={liga.league.id}></img>
        </div>
        
      <Link to='/paises'>Mais sobre paises dessa liga</Link>
      </li>
      ))}

    </ul>

 </section>
    
)}

export default Ligas