import React from "react";
import Titulo from "./Titulo";
import { useNavigate } from "react-router-dom";
import './App.css'
import Head from "./Head";

const Login = ()=>{
  const navigate=useNavigate()

  const [inputVal, setInputVal]=React.useState(null)
  const [erro,setErro] =React.useState(null)
  const userKey = ()=>window.localStorage.setItem("key",inputVal)

  
    function request(event){
      event.preventDefault()
  
      fetch("https://v3.football.api-sports.io/leagues", {
       "method": "GET",
       "headers": {
           "x-rapidapi-host": "v3.football.api-sports.io",
           "x-rapidapi-key": `${inputVal}`
       }
   })
   .then(response => response.json())
   .then(json => {if(!json.errors.token){navigate('./Ligas'); userKey()}
  else{
    setErro("Usuário não autenticado. Insira uma chave válida.")
  }})
   .catch(err => console.log(err)) 
    }

    

return(
<section className="Login-container altura-minima">
  <Head title="Meu Time | Login" description="Página de Login"/>
    
    <form onSubmit={request} className="Login-form">
        <Titulo margin="10px 0" texto="Login"/>
          {erro && <p style={{fontSize:"1.0rem", color:"red"}}>{erro}</p>}

          <label htmlFor="chave"> Chave de acesso:</label>
          <input type="password" id="chave" onChange={({target})=>setInputVal(target.value)} valor={inputVal}/>
          
          <button>Enviar</button>
    </form>

    <a href="https://dashboard.api-football.com/login/expirate"  rel="noreferrer" target="_blank"
    style={{marginTop:"20px"}}>
      Clique aqui se não tem uma chave
    </a>
    
</section>
)
}

export default Login