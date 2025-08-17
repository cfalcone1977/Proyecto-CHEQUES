
const urlTraerEntidades="https://api.bcra.gob.ar/cheques/v1.0/entidades";
const selectorBancos=document.getElementById("bancos");


async function traerEntidades(){
      try {
        const response = await fetch(urlTraerEntidades);
        const datos = await response.json();
        if (datos.status>=400){
                                         throw new Error(data.errorMessages[0]);
                             }
        return datos;
    } catch (error) {
        console.error("Error al acceder a CUIT:",error.message);
        return null;//si da error se devuelve null
    }
}

async function crearSelectorBancos(){
   const entidades= await traerEntidades();
   entidades.results.forEach(entidad => {
         const entidadBanco=document.createElement("option");
         entidadBanco.value=entidad.denominacion;
         entidadBanco.textContent=entidad.denominacion;
         entidadBanco.setAttribute("data-codigo",entidad.codigoEntidad);
         selectorBancos.appendChild(entidadBanco);
         console.log(entidad.denominacion);       
         console.log(entidad.codigoEntidad)
   });



}
    
crearSelectorBancos();

selectorBancos.addEventListener("change",(e)=>{
       const bancoSeleccionado=e.target.options[e.target.selectedIndex];
       console.log(bancoSeleccionado.dataset.codigo);
});

