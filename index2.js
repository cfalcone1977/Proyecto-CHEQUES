const CHQ = {
    Mbruto: 0,
    fcobro: "01/01/2025",
    dias: 0,
    tasa:0,
    M_a_Cobrar: 0
  }
  
  let cheque=[{Mbruto:12000,fcobro:"01/01/2025",dias:1,tasa:0,M_a_Cobrar:15000},
    {Mbruto:12000,fcobro:"01/01/2025",dias:1,tasa:0,M_a_Cobrar:15000},
    {Mbruto:12000,fcobro:"01/01/2025",dias:1,tasa:0,M_a_Cobrar:15000},
    {Mbruto:12000,fcobro:"01/01/2025",dias:1,tasa:0,M_a_Cobrar:15000},
    {Mbruto:12000,fcobro:"01/01/2025",dias:1,tasa:0,M_a_Cobrar:15000},
    {Mbruto:12000,fcobro:"01/01/2025",dias:1,tasa:0,M_a_Cobrar:15000},
    {Mbruto:12000,fcobro:"01/01/2025",dias:1,tasa:0,M_a_Cobrar:15000},
    {Mbruto:12000,fcobro:"01/01/2025",dias:1,tasa:0,M_a_Cobrar:15000},
    {Mbruto:12000,fcobro:"01/01/2025",dias:1,tasa:0,M_a_Cobrar:15000},
    {Mbruto:12000,fcobro:"01/01/2025",dias:1,tasa:0,M_a_Cobrar:15000},
  ];
  console.log(cheque);
  
  const cheque_aux=document.querySelectorAll('.cheque'); // genero arreglo con el importe de todos los cheques
  console.log(cheque_aux);
  const fecha_aux=document.querySelectorAll('.fecha');   //genero arreglo con las fechas de todos los cheques

  const tasaDiaria=document.getElementById('tasa_diaria');   // tasa diaria
  const tasaAlDia=document.getElementById('tasa_al_dia');  // tasa por CHQ al día
  const tasa7Dias=document.getElementById('tasa_7dias');   // tasa a 7 días
  const tasa15Dias=document.getElementById('tasa_15dias'); // tasa a 15 días
  const tasa30Dias=document.getElementById('tasa_30dias'); // tasa a 30 días
  
  let DATOS0=document.getElementById('datos0');
  let DATOS1=document.getElementById('datos1');
  let DATOS2=document.getElementById('datos2');
  let DATOS3=document.getElementById('datos3');
  let DATOS4=document.getElementById('datos4');
  let DATOS5=document.getElementById('datos5');
  let DATOS6=document.getElementById('datos6');
  let DATOS7=document.getElementById('datos7');
  let DATOS8=document.getElementById('datos8');
  let DATOS9=document.getElementById('datos9');


  const boton_calcular = document.getElementById('calcular');
  
  let TotalBruto=document.getElementById('TOTALBRUTO'); // debe mostrar la suma de todos los importes brutos de los cheques 
  let DiferenciaPorcent=document.getElementById('DIFPORCENT');
  let DiferenciaProfit=document.getElementById('DIFPESOS'); // debe mostrar diferencia entre importe bruto e importe a pagar. 
  let TotalPagar=document.getElementById('TOTALPAGAR'); // debe mostrar la suma de todos los cheques ya negocioados (total a pagar)

  
  function calcular_dias(fecha){
    fecha_actual=new Date();            // calcular cantidad de dias a la fecha de cobro. 
    fecha_cheque=new Date(fecha);
    const dias=(Math.round((fecha_cheque - fecha_actual)/86400000))+1;
    console.log(dias);
    return dias;
    }

  function calculo_tasa(dias){
    if ((dias===0) || (dias===1)) {
        return Number(tasaAlDia.value);
    }
    if ((dias>1) && (dias<7)) {
     let tasa_total=Number(tasaDiaria.value*dias) + Number(tasaAlDia.value);
     return tasa_total;              
    }
    if (dias===7) {
       return tasa7Dias.value;
    }
    if ((dias>7) && (dias<15)) {
    tasa_total=Number(tasaDiaria.value*(dias-7)) + Number(tasa7Dias.value);
    console.log("tasa diaria:",tasaDiaria.value," ",dias," ",tasa7Dias," ",tasa_total);
    return tasa_total;
    }
    if (dias===15) {
      return tasa15Dias.value;
    }
    if ((dias>15) && (dias<30)) {
     tasa_total=Number(tasaDiaria.value*(dias-15)) + Number(tasa15Dias.value);
     return tasa_total;                  
    }
    if (dias===30){
      return tasa30Dias.value;
    }
    if ((dias>30) && (dias<90)) {
     tasa_total=Number(tasaDiaria.value*(dias-30)) + Number(tasa30Dias.value);
     return tasa_total;                   
    }    
    if ((dias>=90)) {
      tasa_total=Number(tasaDiaria.value*dias);
     return tasa_total;                     
                    }
return 0;    

}

function mostrarResultados(montoB,montoP){
let Diferencia=Number(montoB)-Number(montoP);
montoB=montoB.toLocaleString('es-Es',{minimumFractionDigits: 2, maximumFractionDigits: 2});
TotalBruto.textContent="$ "+montoB;
montoP=montoP.toLocaleString('es-Es',{minimumFractionDigits: 2, maximumFractionDigits: 2}); // transforma el numero a formato 000.000.000,00.-
TotalPagar.textContent="$ "+ montoP;
Diferencia=Diferencia.toLocaleString('es-Es',{minimumFractionDigits: 2, maximumFractionDigits: 2});
DiferenciaProfit.textContent="$ " + Diferencia;


  }

  function CalculoM_a_Cobrar(tasa,monto){   //funcion que recibe fecha y monto de cada uno de los cheques, calcula dias, 
        let monto_a_pagar=monto-((monto/100)*tasa);
        return monto_a_pagar;
      }
  function mostrarDatos(CHEQUE){
    console.log(`Monto Bruto: ${CHEQUE[0].Mbruto} fecha de Cobro: ${CHEQUE[0].fcobro} dias: ${CHEQUE[0].dias} tasa: ${CHEQUE[0].tasa} a pagar: ${CHEQUE[0].M_a_Cobrar}`);
    let dif0=CHEQUE[0].Mbruto - CHEQUE[0].M_a_Cobrar; 
    let dif1=CHEQUE[1].Mbruto - CHEQUE[1].M_a_Cobrar; 
    let dif2=CHEQUE[2].Mbruto - CHEQUE[2].M_a_Cobrar; 
    let dif3=CHEQUE[3].Mbruto - CHEQUE[3].M_a_Cobrar; 
    let dif4=CHEQUE[4].Mbruto - CHEQUE[4].M_a_Cobrar; 
    let dif5=CHEQUE[5].Mbruto - CHEQUE[5].M_a_Cobrar; 
    let dif6=CHEQUE[6].Mbruto - CHEQUE[6].M_a_Cobrar; 
    let dif7=CHEQUE[7].Mbruto - CHEQUE[7].M_a_Cobrar; 
    let dif8=CHEQUE[8].Mbruto - CHEQUE[8].M_a_Cobrar; 
    let dif9=CHEQUE[9].Mbruto - CHEQUE[9].M_a_Cobrar; 

    for (let i = 0; i < CHEQUE.length; i=i+1) {
      CHEQUE[i].tasa=CHEQUE[i].tasa.toLocaleString('es-Es',{minimumFractionDigits: 2, maximumFractionDigits: 2});
      CHEQUE[i].M_a_Cobrar=CHEQUE[i].M_a_Cobrar.toLocaleString('es-Es',{minimumFractionDigits: 2, maximumFractionDigits: 2});
    }
    dif0=dif0.toLocaleString('es-Es',{minimumFractionDigits:2, maximumFractionDigits:2});
    dif1=dif1.toLocaleString('es-Es',{minimumFractionDigits:2, maximumFractionDigits:2});
    dif2=dif2.toLocaleString('es-Es',{minimumFractionDigits:2, maximumFractionDigits:2});
    dif3=dif3.toLocaleString('es-Es',{minimumFractionDigits:2, maximumFractionDigits:2});
    dif4=dif4.toLocaleString('es-Es',{minimumFractionDigits:2, maximumFractionDigits:2});
    dif5=dif5.toLocaleString('es-Es',{minimumFractionDigits:2, maximumFractionDigits:2});
    dif6=dif6.toLocaleString('es-Es',{minimumFractionDigits:2, maximumFractionDigits:2});
    dif7=dif7.toLocaleString('es-Es',{minimumFractionDigits:2, maximumFractionDigits:2});
    dif8=dif8.toLocaleString('es-Es',{minimumFractionDigits:2, maximumFractionDigits:2});
    dif9=dif9.toLocaleString('es-Es',{minimumFractionDigits:2, maximumFractionDigits:2});
    


    let textoDias0=CHEQUE[0].dias.toString();
    textoDias0=textoDias0.padStart(6);
    let textoDias1=CHEQUE[1].dias.toString();
    textoDias1=textoDias1.padStart(6);
    let textoDias2=CHEQUE[2].dias.toString();
    textoDias2=textoDias2.padStart(6);
    let textoDias3=CHEQUE[3].dias.toString();
    textoDias3=textoDias3.padStart(6);
    let textoDias4=CHEQUE[4].dias.toString();
    textoDias4=textoDias4.padStart(6);
    let textoDias5=CHEQUE[5].dias.toString();
    textoDias5=textoDias5.padStart(6);
    let textoDias6=CHEQUE[6].dias.toString();
    textoDias6=textoDias6.padStart(6);
    let textoDias7=CHEQUE[7].dias.toString();
    textoDias7=textoDias7.padStart(6);
    let textoDias8=CHEQUE[8].dias.toString();
    textoDias8=textoDias8.padStart(6);
    let textoDias9=CHEQUE[9].dias.toString();
    textoDias9=textoDias9.padStart(6);


    let textoTasa0=CHEQUE[0].tasa.toString();
    textoTasa0=textoTasa0.padStart(12);
    let textoTasa1=CHEQUE[1].tasa.toString();
    textoTasa1=textoTasa1.padStart(12);
    let textoTasa2=CHEQUE[2].tasa.toString();
    textoTasa2=textoTasa2.padStart(12);
    let textoTasa3=CHEQUE[3].tasa.toString();
    textoTasa3=textoTasa3.padStart(12);
    let textoTasa4=CHEQUE[4].tasa.toString();
    textoTasa4=textoTasa4.padStart(12);
    let textoTasa5=CHEQUE[5].tasa.toString();
    textoTasa5=textoTasa5.padStart(12);
    let textoTasa6=CHEQUE[6].tasa.toString();
    textoTasa6=textoTasa6.padStart(12);
    let textoTasa7=CHEQUE[7].tasa.toString();
    textoTasa7=textoTasa7.padStart(12);
    let textoTasa8=CHEQUE[8].tasa.toString();
    textoTasa8=textoTasa8.padStart(12);
    let textoTasa9=CHEQUE[9].tasa.toString();
    textoTasa9=textoTasa9.padStart(12);


    let textoDif0=dif0.toString();
    textoDif0=textoDif0.padStart(14);
    let textoDif1=dif1.toString();
    textoDif1=textoDif1.padStart(14);
    let textoDif2=dif2.toString();
    textoDif2=textoDif2.padStart(14);
    let textoDif3=dif3.toString();
    textoDif3=textoDif3.padStart(14);
    let textoDif4=dif4.toString();
    textoDif4=textoDif4.padStart(14);    
    let textoDif5=dif5.toString();
    textoDif5=textoDif5.padStart(14);    
    let textoDif6=dif6.toString();
    textoDif6=textoDif6.padStart(14);    
    let textoDif7=dif7.toString();
    textoDif7=textoDif7.padStart(14);    
    let textoDif8=dif8.toString();
    textoDif8=textoDif8.padStart(14);    
    let textoDif9=dif9.toString();
    textoDif9=textoDif9.padStart(14);    


    let textoM_a_Cobrar0=CHEQUE[0].M_a_Cobrar.toString();
    textoM_a_Cobrar0=textoM_a_Cobrar0.padStart(16);
    let textoM_a_Cobrar1=CHEQUE[1].M_a_Cobrar.toString();
    textoM_a_Cobrar1=textoM_a_Cobrar1.padStart(16);  
    let textoM_a_Cobrar2=CHEQUE[2].M_a_Cobrar.toString();
    textoM_a_Cobrar2=textoM_a_Cobrar2.padStart(16);
    let textoM_a_Cobrar3=CHEQUE[3].M_a_Cobrar.toString();
    textoM_a_Cobrar3=textoM_a_Cobrar3.padStart(16);     
    let textoM_a_Cobrar4=CHEQUE[4].M_a_Cobrar.toString();
    textoM_a_Cobrar4=textoM_a_Cobrar4.padStart(16);      
    let textoM_a_Cobrar5=CHEQUE[5].M_a_Cobrar.toString();
    textoM_a_Cobrar5=textoM_a_Cobrar5.padStart(16);      
    let textoM_a_Cobrar6=CHEQUE[6].M_a_Cobrar.toString();
    textoM_a_Cobrar6=textoM_a_Cobrar6.padStart(16);      
    let textoM_a_Cobrar7=CHEQUE[7].M_a_Cobrar.toString();
    textoM_a_Cobrar7=textoM_a_Cobrar7.padStart(16);      
    let textoM_a_Cobrar8=CHEQUE[8].M_a_Cobrar.toString();
    textoM_a_Cobrar8=textoM_a_Cobrar8.padStart(16);      
    let textoM_a_Cobrar9=CHEQUE[9].M_a_Cobrar.toString();
    textoM_a_Cobrar9=textoM_a_Cobrar9.padStart(16);      



    let largoTexto0=textoDias0+textoTasa0+"%"+textoDif0+textoM_a_Cobrar0;
    let largoTexto1=textoDias1+textoTasa1+"%"+textoDif1+textoM_a_Cobrar1;
    let largoTexto2=textoDias2+textoTasa2+"%"+textoDif2+textoM_a_Cobrar2;
    let largoTexto3=textoDias3+textoTasa3+"%"+textoDif3+textoM_a_Cobrar3;    
    let largoTexto4=textoDias4+textoTasa4+"%"+textoDif4+textoM_a_Cobrar4;
    let largoTexto5=textoDias5+textoTasa5+"%"+textoDif5+textoM_a_Cobrar5;
    let largoTexto6=textoDias6+textoTasa6+"%"+textoDif6+textoM_a_Cobrar6;
    let largoTexto7=textoDias7+textoTasa7+"%"+textoDif7+textoM_a_Cobrar7;
    let largoTexto8=textoDias8+textoTasa8+"%"+textoDif8+textoM_a_Cobrar8;
    let largoTexto9=textoDias9+textoTasa9+"%"+textoDif9+textoM_a_Cobrar9;



    console.log(textoDias0+textoTasa0+"%"+textoDif0+textoM_a_Cobrar0);
    console.log(largoTexto0.length);
    console.log(textoDias1+textoTasa1+"%"+textoDif1+textoM_a_Cobrar1);
    console.log(largoTexto1.length);

    if (CHEQUE[0].Mbruto != 0) {
        DATOS0.textContent=textoDias0+textoTasa0+"%"+textoDif0+textoM_a_Cobrar0;
    }else{
          DATOS0.textContent="";
         }
    if (CHEQUE[1].Mbruto != 0) {
        DATOS1.textContent=textoDias1+textoTasa1+"%"+textoDif1+textoM_a_Cobrar1;
    }else{
          DATOS1.textContent="";
         }
    if (CHEQUE[2].Mbruto != 0) {
        DATOS2.textContent=textoDias2+textoTasa2+"%"+textoDif2+textoM_a_Cobrar2;
    }else{
          DATOS2.textContent="";
         }
    if (CHEQUE[3].Mbruto != 0) {
        DATOS3.textContent=textoDias3+textoTasa3+"%"+textoDif3+textoM_a_Cobrar3;
    }else{
          DATOS3.textContent="";
         }
    if (CHEQUE[4].Mbruto != 0) {
        DATOS4.textContent=textoDias4+textoTasa4+"%"+textoDif4+textoM_a_Cobrar4;
    }else{
          DATOS4.textContent="";
         }
    if (CHEQUE[5].Mbruto != 0) {
        DATOS5.textContent=textoDias5+textoTasa5+"%"+textoDif5+textoM_a_Cobrar5;
    }else{
          DATOS5.textContent="";
         }
    if (CHEQUE[6].Mbruto != 0) {
        DATOS6.textContent=textoDias6+textoTasa6+"%"+textoDif6+textoM_a_Cobrar6;
    }else{
          DATOS6.textContent="";
         }
    if (CHEQUE[7].Mbruto != 0) {
        DATOS7.textContent=textoDias7+textoTasa7+"%"+textoDif7+textoM_a_Cobrar7;
    }else{
          DATOS7.textContent="";
         }
    if (CHEQUE[8].Mbruto != 0) {
        DATOS8.textContent=textoDias8+textoTasa8+"%"+textoDif8+textoM_a_Cobrar8;
    }else{
          DATOS8.textContent="";
         }    

    if (CHEQUE[9].Mbruto != 0) {
        DATOS9.textContent=textoDias9+textoTasa9+"%"+textoDif9+textoM_a_Cobrar9;
    }else{
          DATOS9.textContent="";
         }       

  }    
  
  function mostrarResultados(montoB,montoP,tasaT,cantCheqs){
      let Diferencia=Number(montoB)-Number(montoP);
      montoB=montoB.toLocaleString('es-Es',{minimumFractionDigits: 2, maximumFractionDigits: 2});
      TotalBruto.textContent="$ "+montoB;
      tasaT=tasaT/cantCheqs;
      tasaT=tasaT.toLocaleString('es-Es',{minimumFractionDigits:2, maximumFractionDigits:2});
      DiferenciaPorcent.textContent=tasaT + " %";
      montoP=montoP.toLocaleString('es-Es',{minimumFractionDigits: 2, maximumFractionDigits: 2}); // transforma el numero a formato 000.000.000,00.-
      TotalPagar.textContent="$ "+ montoP;
      Diferencia=Diferencia.toLocaleString('es-Es',{minimumFractionDigits: 2, maximumFractionDigits: 2});
      DiferenciaProfit.textContent="$ " + Diferencia;
  
  
  }
  

  boton_calcular.addEventListener("click",()=>{
      let montoTotalPagar=0;
      let montoTotalBruto=0;
      let tasaTotal=0;
      let contador=0;

      for (let i = 0; i < cheque_aux.length; i=i+1) {
        console.log(i);
              cheque[i].Mbruto=Number(cheque_aux[i].value);
              cheque[i].fcobro=fecha_aux[i].value;
              cheque[i].dias=calcular_dias(cheque[i].fcobro);
              cheque[i].tasa=calculo_tasa(cheque[i].dias);
              cheque[i].M_a_Cobrar=CalculoM_a_Cobrar(cheque[i].tasa,cheque[i].Mbruto);
              montoTotalBruto=montoTotalBruto + cheque[i].Mbruto;
              montoTotalPagar=montoTotalPagar+cheque[i].M_a_Cobrar;
              if ((Number(cheque[i].Mbruto))>0) {
                                                tasaTotal=Number(tasaTotal)+Number(cheque[i].tasa);
                                                contador=contador+1;
                                               }else{
                                                     
                                                    }
            }    
      mostrarDatos(cheque);
      console.log("cantidad de cheques: ",contador);
      if (montoTotalBruto!=0 || montoTotalPagar!=0 || tasaTotal!=0 || contador!=0){
                              mostrarResultados(montoTotalBruto,montoTotalPagar,tasaTotal,contador);
                                                                                  }

                     });







      //fetch("https://api.bcra.gob.ar/cheques/v1.0/entidades")
      //.then(res => res.json())    
      //.then(data => {
      //       const BANCOS=[];
      //       const nuevoBanco={codigo:data.codigoEntidad, nombre:data.denominacion};
      //       console.log(data);
      //              });
               
     /*
      const banco={numero:0,nombre:""};
      async function traerEntidades (){
         try{
           const res=await fetch(dirEntidades);
           const {results} = await res.json();
           let BANCOS=[];
           let banco={numero:0,nombre:""};
           console.log(results.length);
           for (let i = 0; i < results.length; i=i+1) {
                  banco.numero=results[i].codigoEntidad;
                  banco.nombre=results[i].denominacion;
                  console.log("Nro.:",banco.numero," Nombre:",banco.nombre);
                  console.log(banco);
                  BANCOS.push(banco);
                  console.log(BANCOS[i].nombre);
           }
            }
         catch (error){
            console.log(error);
            }
      console.log("-------------------------");
      console.log(BANCOS[15].nombre);      
      }

      traerEntidades();


     */
                                              
  