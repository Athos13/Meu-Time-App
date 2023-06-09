import React from "react";
import Titulo from "./Titulo";
import { Link } from "react-router-dom";
import Head from "./Head";

  const Paises = ()=>{
    const [carregando,setCarregando]=React.useState(null)
    const nomeLiga=window.localStorage.getItem("nomeLiga")
    const [paises,setPaises]=React.useState(null)
    let key = window.localStorage.getItem("key")

    React.useEffect(()=>{
        fetch(`https://v3.football.api-sports.io/leagues`, {
        "method": "GET",
        "headers": {
            "x-rapidapi-host": "v3.football.api-sports.io",
            "x-rapidapi-key": `${key}`
        }
    })
    .then(response => response.json(), setCarregando(true))
    .then(json => json.response)
    .then(response => setPaises(response.filter(item => item.league.name===nomeLiga)))
    .then(()=> setCarregando(false))
    .catch(err => console.log(err))
    
    console.log(paises)
    },[key])


function paisClicado({target}){
      const h1Pais=target.parentNode.firstChild
      window.localStorage.setItem("nomePais", h1Pais.innerText)
      console.log(h1Pais)
     }

    

return(
 <section className="altura-minima">
  <Head title="Meu Site | Paises" description="Paises dessa liga"/>

    <Titulo texto={"Paises da " + nomeLiga}/>

    { carregando && <p>Carregando...</p>}
    <ul className="container">
     
      {paises && paises.map((pais) => (
      <li onClick={paisClicado}  key={pais.league.id}>
        <h3>{pais.country.name}</h3>
        <div className="div-img">
          <img src={pais.country.flag} alt={pais.country.name}></img>
        </div>

        <Link to='/times'>Times desse país</Link>
      </li>))}

    </ul>
</section>
)
}

export default Paises