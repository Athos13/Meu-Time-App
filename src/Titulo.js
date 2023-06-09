import React from "react";

const Titulo = ({texto, color, margin})=>{
return(
    <h2 style={{color, margin}}>{texto}</h2>
)
}

export default Titulo