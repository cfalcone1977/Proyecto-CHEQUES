const cuit=document.getElementById('Cuit'); //elemento CUIT
const numeroCheque=document.getElementById('nroCheque'); // elemento numero de cheque
const entidades=document.getElementById('entidadBancaria');   // elemento entidad bancaria
const boton_consultar=document.getElementById('consultar'); // elemento boton para ejecutar consultas

function consultaCuit(cuit_a_verificar){
const direccion_consulta_cuit="https://api.bcra.gob.ar/centraldedeudores/v1.0/Deudas/"+cuit_a_verificar;
console.log(direccion_consulta_cuit);
fetch(direccion_consulta_cuit)
 .then(res=>res.json())
 .then(data=>{console.log(" NOMBRE: "+data.results.denominacion);
              console.log("   CUIT: "+data.results.identificacion);
              console.log("INFORME: "+data.results.periodos[0].periodo);
              const CantBancosOperados=data.results.periodos[0].entidades.length;
              console.log("BANCOS: ");
              console.log("====================================");              
              for (let i = 0; i < CantBancosOperados; i=i+1) {    //FALTA ORDENAR BANCOS POR MAYOR DEUDA
                console.log(data.results.periodos[0].entidades[i].entidad);
                console.log(" DEUDA: "+"$ "+data.results.periodos[0].entidades[i].monto+" expresada en miles (x 1000)");
                console.log(data.results.periodos[0].entidades[i].situacion)
                console.log("====================================");
              }
             })
}

function ConsultarChequesRechazados(cuit_a_verificar){
    
    const direccion_Cheques_Rechazados="https://api.bcra.gob.ar/centraldedeudores/v1.0/Deudas/ChequesRechazados/"+cuit_a_verificar;
    console.log(direccion_Cheques_Rechazados);
    fetch(direccion_Cheques_Rechazados)
    .then(res=>res.json())
    .then(data => {
                console.log(data.results.causales)});
}


const dirEntidades="https://api.bcra.gob.ar/cheques/v1.0/entidades";
//const dirRechazados="https://api.bcra.gob.ar/cheques/v1.0/denunciados/191/08275893";
let direccionArmada="https://api.bcra.gob.ar/cheques/v1.0/denunciados/";
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

                       boton_consultar.addEventListener('click', ()=>{
                                                        consultaCuit(cuit.value);
                                                        ConsultarChequesRechazados(cuit.value);
                                                        const entidadElegida=entidades.value;
                                                        console.log("el Banco elegido tiene codigo: ",entidadElegida);
                                                        direccionArmada=direccionArmada+entidadElegida+"/"+numeroCheque.value;
                                                        console.log(direccionArmada);
                                                        direccionArmada="https://api.bcra.gob.ar/cheques/v1.0/denunciados/";

                                                                })                    
                  })
/*fetch(dirRechazados)
 .then(res=>res.json())
 .then(data => console.log(data.results.detalles))

 console.log("---------------------------------------");
 console.log(BANCOS[12]);*/