import React from "react";
import Titulo from "./Titulo";
import Head from "./Head";
import { Link } from "react-router-dom";

const Times = ()=>{
const [carregando,setCarregando]=React.useState(null)
const nomePais=window.localStorage.getItem("nomePais")
const idLiga=window.localStorage.getItem("idLiga")
const [times,setTimes]=React.useState(null)
let key = window.localStorage.getItem("key")

React.useEffect(()=>{
    fetch(`https://v3.football.api-sports.io/teams?league=${idLiga}&season=2021`, {
    "method": "GET",
    "headers": {
        "x-rapidapi-host": "v3.football.api-sports.io",
        "x-rapidapi-key": `${key}`
    }
})
.then(response => response.json(), setCarregando(true))
.then(json => json.response)
.then(response => setTimes(response.filter(item => item.team.country === nomePais)))
.then(()=>setCarregando(false) )
.catch(err => console.log(err))

console.log(times)
},[key])


function timeClicado({target}){
  const nomeTime=target.parentNode.firstChild
  window.localStorage.setItem("nomeTime", nomeTime.innerText)
  
  const idTime = target.parentNode.childNodes[2]
  window.localStorage.setItem("idTime", idTime.innerText)
 } 



return(
 <section className="altura-minima">
  <Head title="Meu Site | Times" description="Times dessa liga"/>

    <Titulo texto={"Times - "+ nomePais}/>
    { carregando && <p>Carregando...</p>}

    <ul className="container">
     
      {times && times.map((time) => (
      <li onClick={timeClicado} key={time.team.id}>

        <h3>{time.team.name}</h3> <span>{time.team.id}</span>
        <div className="div-img">
          <img src={time.team.logo} alt={time.team.code}></img>
        </div>
        <p>Fundado em:{time.team.founded}</p>
    
        <Link to='/TimeDados'>Dados desse time </Link>

      </li>))}

    </ul>
</section>
)
}

export default Times