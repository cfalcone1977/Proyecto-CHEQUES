const entidades=document.getElementById('entidadBancaria');   // elemento entidad bancaria

const dirEntidades="https://api.bcra.gob.ar/cheques/v1.0/entidades";
const dirRechazados="https://api.bcra.gob.ar/cheques/v1.0/denunciados/191/08275893";
const banco={numero:0,nombre:""};
let BANCOS=[];
fetch(dirEntidades)
  .then( (res)=>res.json())
  .then((data) => {
                  data.results.forEach(entidad => {
                     BANCOS.push(entidad);                          
                  });
                  console.log(BANCOS);
                  BANCOS.forEach(entidad=> {
                       const opcion=document.createElement('option');
                       opcion.value=entidad.codigoEntidad;
                       opcion.text=entidad.denominacion;
                       entidades.appendChild(opcion);   
                                           })
                       entidades.addEventListener('change', ()=>{
                                                        const entidadElegida=entidades.value;
                                                        console.log("el Banco elegido tiene codigo: ",entidadElegida);
                                                                })                    
                  })
fetch(dirRechazados)
 .then(res=>res.json())
 .then(data => console.log(data.results.detalles))

 console.log("---------------------------------------");
 console.log(BANCOS[12]);