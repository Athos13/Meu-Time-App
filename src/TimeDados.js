import React from "react";
import Titulo from "./Titulo";
import Head from "./Head";


const TimeDados = ()=>{
const [carregando,setCarregando]=React.useState(null)
const [jogadores,setJogadores]=React.useState(null)
const [dadosTime, setDadosTime]=React.useState(null)
const idLiga=window.localStorage.getItem("idLiga")
const nomeTime=window.localStorage.getItem("nomeTime")
const idTime=window.localStorage.getItem("idTime")

let key = window.localStorage.getItem("key")

React.useEffect(()=>{
    fetch(`https://v3.football.api-sports.io/players?league=${idLiga}&season=2021`, {
    "method": "GET",
    "headers": {
        "x-rapidapi-host": "v3.football.api-sports.io",
        "x-rapidapi-key": `${key}`
    }
})
.then(response => response.json(), setCarregando(true))
.then(json => json.response)
.then(response => setJogadores(response.filter(item => item.statistics[0].team.name===nomeTime)))
.then(()=>setCarregando(false) )
.catch(err => console.log(err))
},[key])



React.useEffect(()=>{
  fetch(`https://v3.football.api-sports.io/teams/statistics?season=2021&team=${idTime}&league=${idLiga}`, {
  "method": "GET",
  "headers": {
      "x-rapidapi-host": "v3.football.api-sports.io",
      "x-rapidapi-key": `${key}`
  }
})
.then(response => response.json())
.then(json => json.response)
.then(response => setDadosTime(response.lineups))
.catch(err => console.log(err))

console.log(jogadores)
},[key])

/** setJogadores(response.filter(item => item.statistics[0].team.name===nomeTime))*/

return(
 <section className="altura-minima">
  <Head title="Meu Time | Dados do time" description="Dados desse time"/>

    <Titulo color={"tomato"} texto={nomeTime}/>
    { carregando && <p>Carregando...</p>}
     
    <ul className="container TimeDados-container">
     <h2 className="TimeDados-h2">Jogadores Disponiveis</h2>

    <div className="TimeDados-divJogadores">
      {jogadores && jogadores.map((jogador) => (
      <li key={jogador.player.id} className="TimeDados-li">

        <div className="TimeDados-card">
            <h2>{jogador.player.firstname}</h2>

            <div className="div-img .TimeDados-div-img">
              <img src={jogador.player.photo} alt={jogador.player.name}></img>
            </div>

            <p>Sobrenome: {jogador.player.lastname}</p>
            <p>Idade: {jogador.player.age}</p>
            <p>Nacionalidade: {jogador.player.nationality}</p>

        </div>
      </li>))}
    </div>
      

 
     <h2 className="TimeDados-h2">Formação Mais Usada</h2>

     <div className="TimeDados-divFormações">
        {dadosTime && dadosTime.map((formacao) => (
        <li key={formacao.formation} className="TimeDados-liFormações">
          <h3>Formação {formacao.formation}</h3>
          <p>Usada {formacao.played} vezes</p>
        </li>))}
     </div>
      
    </ul>
</section>
)
}

export default TimeDados