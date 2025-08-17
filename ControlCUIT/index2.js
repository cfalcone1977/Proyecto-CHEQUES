const boton_donar=document.getElementById("donar");
const ventana_modal=document.getElementById("ventanaModal");
const boton_cerrar_modal=document.getElementById("btncerrarModal");


cuit=document.getElementById('CUIT');
boton_consulta=document.getElementById('boton');
contenedor_situacion=document.getElementById('panelInformacion')
datos=document.getElementById('contenedor_datos_cliente');  //DATOS CLIENTE (info)
panel=document.getElementById('contenedor_situacion_bancos'); //SITUACION EN BANCOS (info)
contenedorCheques=document.getElementById('panelCheques');
panelCheques=document.getElementById('contenedor_situacion_cheques'); //SITUACION CHEQUES (info)
panelChequesMontos=document.getElementById('montos');

const urlConsultaCuit="https://api.bcra.gob.ar/centraldedeudores/v1.0/Deudas/";
const urlConsultaCheques="https://api.bcra.gob.ar/centraldedeudores/v1.0/Deudas/ChequesRechazados/";


function mostrarDatosCliente(datosC){  //Trabaja sobre el elemento p "contenedor_datos_cliente" que esta en section: "datosCliente"
    const pDatosNombre=document.createElement('pre'); // creo elemento pre "pDatosNombre" en seccion "datosCliente"
    pDatosNombre.textContent=`Nombre: ${datosC.results.denominacion}`;
    datos.appendChild(pDatosNombre);
    const pDatosPeriodo=document.createElement('pre'); // creo elemento pre "pDatosPeriodo" en seccion "datosCLiente".
    pDatosPeriodo.textContent=`Estado al: ${datosC.results.periodos[0].periodo}`;
    datos.appendChild(pDatosPeriodo);
}

async function consultaCUIT(numero_cuit) {
    try {
        const response = await fetch(urlConsultaCuit+numero_cuit.value);
        const data = await response.json();
        //console.log(data.status);
        if (data.status>=400){
                                         throw new Error(data.errorMessages[0]);
                             }
        return data;// un objeto data con diferentes propiedades, otros objetos y arreglos.
    } catch (error) {
        mostrarError(error.message,panel);
        //console.error("Error al acceder a CUIT:",error.message);
        return null;//si da error se devuelve null
    }
}
async function consultaCheques(numero_cuit){
    try {
        const response = await fetch(urlConsultaCheques+numero_cuit.value);
        const data= await response.json();
        if (data.status>=400){
                              throw new Error(data.errorMessages[0]);
        }
        //console.log(data);
        //console.log(data.results.causales[0]);
        //console.log(data.results.causales[0].causal);
        return data;
    } catch (error) {
          console.log(error.message,"no posee CHEQUES RECHAZADOS");
          mostrarError(error.message,panelCheques);
          return null;
    }
}


function mostrarEntidadesOperadas(datosE){
    const CantBancosOperados=datosE.results.periodos[0].entidades.length; // determino la cantidad de Bancos     
    let peorSituacion=1;
    for (let i = 0; i < CantBancosOperados; i=i+1) {    //bucle para recorrer los bancos
      const pEntidad=document.createElement('pre');   // creo elemento pEntidad en seccion panel
      const monto=(Number(datosE.results.periodos[0].entidades[i].monto))*1000; //transformo en numero para multiplicar por 1000
      const montoS=monto.toLocaleString(); // transformo en String para poder asignar una cantidad de caracteres fija luego
      const situacion=datosE.results.periodos[0].entidades[i].situacion;                      
      const situacionS=situacion.toLocaleString(); //transformo en strng para poder darle una cantidad fija de caracteres
      pEntidad.textContent=datosE.results.periodos[0].entidades[i].entidad.padStart(60) +"   $"+ montoS.padStart(16) + "   " + situacionS.padStart(3);
      panel.appendChild(pEntidad);  
      if (peorSituacion<situacion) {
                                  peorSituacion=situacion;
                                   }
}
if (peorSituacion==1){
    contenedor_situacion.style.backgroundColor='green';
} else if ((peorSituacion>1) && (peorSituacion<=2)){  // creo condiciones para darle color dependiendo situacion **faltaria verde en 1**
              contenedor_situacion.style.backgroundColor='yellow'; //situacion >1 y <=2 amarillo
                     } else if (peorSituacion>=3) {
                             contenedor_situacion.style.backgroundColor='red';//situacion >=3 rojo
                   } 
}

function mostrarChequesRechazados(LCHEQUES){
    let contCheques=0;
    let montoTotalRechazos=0;
    let cantChequesPagos=0;
    let montoChequesPagos=0;

    for (let i = 0; i < LCHEQUES.results.causales[0].entidades.length; i=i+1) {
        for (let i2 = 0; i2 <LCHEQUES.results.causales[0].entidades[i].detalle.length ; i2=i2+1) {
            const listadoCheques=document.createElement('pre');
            let SNumero=LCHEQUES.results.causales[0].entidades[i].detalle[i2].nroCheque.toString();
            let SMonto=LCHEQUES.results.causales[0].entidades[i].detalle[i2].monto.toLocaleString();
            let SFecha=LCHEQUES.results.causales[0].entidades[i].detalle[i2].fechaRechazo;
            let SPago=LCHEQUES.results.causales[0].entidades[i].detalle[i2].fechaPago==null ? "DEBE" : "PAGO";
            listadoCheques.textContent="Nro.: "+SNumero.padStart(8) +"  Monto $:"+ SMonto.padStart(14) + "   " +SFecha+"  "+ SPago.padStart(4);
            panelCheques.appendChild(listadoCheques);
            console.log("Numero:" + LCHEQUES.results.causales[0].entidades[i].detalle[i2].nroCheque);
            console.log("Monto: " + LCHEQUES.results.causales[0].entidades[i].detalle[i2].monto);  
            if (LCHEQUES.results.causales[0].entidades[i].detalle[i2].fechaPago!=null){
                                                              cantChequesPagos=cantChequesPagos+1;
                                                              montoChequesPagos=montoChequesPagos+LCHEQUES.results.causales[0].entidades[i].detalle[i2].monto;
                                                                                }
            contCheques=contCheques+1;
            montoTotalRechazos=montoTotalRechazos+Number(LCHEQUES.results.causales[0].entidades[i].detalle[i2].monto);
        }
    }
    let montoRechazosHtml=document.createElement('pre');
    montoRechazosHtml.textContent=`Rechazos: ${contCheques} Abonados: ${cantChequesPagos}`;
    panelChequesMontos.appendChild(montoRechazosHtml);
    montoRechazosHtml=document.createElement('pre');
    montoRechazosHtml.textContent=`Monto Rechazado: $ ${montoTotalRechazos.toLocaleString()} Monto pagado: $ ${montoChequesPagos.toLocaleString()}`;
    panelChequesMontos.appendChild(montoRechazosHtml);
    contenedorCheques.style.backgroundColor='red';
    console.log("cantidad de cheques Rechazados: ", contCheques);
    console.log("Cantidad de cheques pagados:    ",cantChequesPagos);        
    console.log("Monto de cheques rechazados:    ",montoTotalRechazos);  
    console.log("Monto de cheques Pagados:       ",montoChequesPagos);  

}

function limpiarDatos(){
    cuit.value="";
    datos.innerHTML="";
    panel.innerHTML="";
    panelCheques.innerHTML="";
    panelChequesMontos.innerHTML="";
    contenedor_situacion.style.backgroundColor="white"; 
    contenedorCheques.style.backgroundColor="white";

}

function mostrarError(estadoError,lugar){
    boton_consulta.disabled=true;
    const Error=document.createElement('pre'); // creo elemento ERROR en seccion datosCliente
    Error.textContent=`${estadoError}`;
    lugar.appendChild(Error);
}

cuit.addEventListener('click', ()=>{ //limpiar datos y panel cuando hago click para ingresar CUIT
    if (cuit.value.length==11) {  //Solo cuando el cuit posee 11 digitos, puede ser eliminado
                     limpiarDatos(); //de lo contrario es posible corregir haciendo click en otra parte
                     boton_consulta.disabled=false; // al hacer click en input activa boton nuevamente para proxxima consulta.
                             } 
})
boton_consulta.addEventListener(`click`, async()=>{
       if (cuit.value.length==11) {
                  const CLIENTE= await consultaCUIT(cuit);
                  if (CLIENTE != null)   { //(CLIENTE.status=200) {   
                    mostrarDatosCliente(CLIENTE);
                    mostrarEntidadesOperadas(CLIENTE);
                    boton_consulta.disabled=true; //desactiva boton para no gener sobre impresiones al hacer click!!
                                          } 
                   const CHEQUES= await consultaCheques(cuit);
                   if (CHEQUES!=null){
                           mostrarChequesRechazados(CHEQUES);
                                     }
                  }
});

  boton_donar.addEventListener("click",()=>{
     console.log("Abrir Modal");
     ventana_modal.showModal();
     boton_cerrar_modal.addEventListener("click",()=>{
                                            ventana_modal.close();
     });
  });















/*********************************PRUEBAS ANTERIORES*******************************************
/*function consultaCUIT(numero_cuit) {
    try {
        console.log(urlConsultaCuit+numero_cuit.value);
        fetch(urlConsultaCuit+numero_cuit.value)
         .then(res=>res.json())
         .then(data=>{
            //*******CREANDO DATOS CLIENTE********
            const pDatosNombre=document.createElement('pre'); // creo elemento pDatosNombre en seccion datosCliente
            pDatosNombre.textContent=`Nombre: ${data.results.denominacion}`;
            datos.appendChild(pDatosNombre);

            const pDatosPeriodo=document.createElement('pre'); // creo elemento pDatosPeriodo en seccion datosCLiente
            pDatosPeriodo.textContent=`Estado al: ${data.results.periodos[0].periodo}`;
            datos.appendChild(pDatosPeriodo);

            const CantBancosOperados=data.results.periodos[0].entidades.length; // determino la cantidad de Bancos
         
            for (let i = 0; i < CantBancosOperados; i=i+1) {    //bucle para recorrer los bancos
              const pEntidad=document.createElement('pre');   // creo elemento pEntidad en seccion panel
              const monto=(Number(data.results.periodos[0].entidades[i].monto))*1000; //transformo en numero para multiplicar por 1000
              const montoS=monto.toLocaleString(); // transformo en String para poder asignar una cantidad de caracteres fija luego
              const situacion=data.results.periodos[0].entidades[i].situacion;
              if ((situacion>1) && (situacion<=2)){  // creo condiciones para darle color dependiendo situacion **faltaria verde en 1**
                                        panel.style.backgroundColor='yellow'; //situacion >1 y <=2 amarillo
                              } else if (situacion>=3) {
                                                        panel.style.backgroundColor='red';//situacion >=3 rojo
                                                       }                       

              const situacionS=situacion.toLocaleString(); //transformo en strng para poder darle una cantidad fija de caracteres
              pEntidad.textContent=data.results.periodos[0].entidades[i].entidad.padStart(45) +"   $"+ montoS.padStart(12) + "   " + situacionS.padStart(3);
              panel.appendChild(pEntidad);
              console.log(data.results.periodos[0].entidades[i].entidad);
              console.log(" DEUDA: "+"$ "+(Number(data.results.periodos[0].entidades[i].monto))*1000+" expresada en miles (x 1000)");
              console.log(data.results.periodos[0].entidades[i].situacion)
              console.log("====================================");
            }
            //return data;
           })
    } catch (error) {
        console.error("Error al cargar consulta CUIT:", error);
    }
}*/

/*
async function consultaCUIT(numero_cuit) {
    try {
        console.log(urlConsultaCuit+numero_cuit.value);
        const response = await fetch(urlConsultaCuit+numero_cuit.value);
        const estadoCuit = await response.json();
        return estadoCuit;// devuelvo un objeto con el estado del CUIT en tipo json
    } catch (error) {
        console.error("Error al cargar consulta CUIT:", error);
        return [];//si da error se devuelve una array vacio
    }
}

async function mostrarEntidadesOperadas(objetoCliente){
    console.log(objetoCliente.results.periodos[0].entidades.length);
}

boton_consulta.addEventListener(`click`, ()=>{
                  const CLIENTE=consultaCUIT(cuit);
                  console.log(CLIENTE);
                  mostrarEntidadesOperadas(CLIENTE);
})

*/


/*
{console.log(" NOMBRE: "+data.results.denominacion);
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
*/