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
    

consultaCuit("20261346959");
ConsultarChequesRechazados("20228864936");


/*¿Qué porcentaje de descuento se aplicó? 
Resta el precio final del precio original: 50 − 35 = 15. 
Divide el resultado entre el precio original: 15 ÷ 50 = 0,30. 
Multiplica por 100 para obtener el porcentaje: 0,30 × 100 = 30%.*/