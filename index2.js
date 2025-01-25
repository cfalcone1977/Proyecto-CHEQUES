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
    {Mbruto:12000,fcobro:"01/01/2025",dias:1,tasa:0,M_a_Cobrar:15000}];
  console.log(cheque);
  
  const cheque_aux=document.querySelectorAll('.cheque'); // genero arreglo con el importe de todos los cheques
  console.log(cheque_aux);
  const fecha_aux=document.querySelectorAll('.fecha');   //genero arreglo con las fechas de todos los cheques

  const tasaDiaria=document.getElementById('tasa_diaria');   // tasa diaria
  const tasaAlDia=document.getElementById('tasa_al_dia');  // tasa por CHQ al día
  const tasa7Dias=document.getElementById('tasa_7dias');   // tasa a 7 días
  const tasa15Dias=document.getElementById('tasa_15dias'); // tasa a 15 días
  const tasa30Dias=document.getElementById('tasa_30dias'); // tasa a 30 días
  
  const boton_calcular = document.getElementById('calcular');
  
  let TotalBruto=document.getElementById('TOTALBRUTO'); // debe mostrar la suma de todos los importes brutos de los cheques 
  let DiferenciaPorcent=document.getElementById('DIFPORCENT');
  let DiferenciaProfit=document.getElementById('DIFPESOS'); // debe mostrar diferencia entre importe bruto e importe a pagar. 
  let TotalPagar=document.getElementById('TOTALPAGAR'); // debe mostrar la suma de todos los cheques ya negocioados (total a pagar)

  
  function calcular_dias(fecha){
    fecha_actual=new Date();            // tasa a pagar y devuelve el monto del cheque con el interes descontado. 
    fecha_cheque=new Date(fecha);
    const dias=(Math.round((fecha_cheque - fecha_actual)/86400000))+1;
    console.log(dias);
    return dias;
    }

  function calculo_tasa(dias){
    if ((dias===0) || (dias===1)) {
        return tasaAlDia.value;
    }
    if ((dias>1) && (dias<7)) {
     let tasa_total=Number(tasaDiaria.value*dias) + Number(tasaAlDia.value);
     return tasa_total;              
    }
    if ((dias>=7) && (dias<15)) {
    tasa_total=Number(tasaDiaria.value*dias) + Number(tasa7Dias.value);
    return tasa_total;
    }
    if ((dias>=15) && (dias<30)) {
     tasa_total=Number(tasaDiaria.value*dias) + Number(tasa15Dias.value);
     return tasa_total;                  
    }
    if ((dias>=30) && (dias<90)) {
     tasa_total=Number(tasaDiaria.value*dias) + Number(tasa30Dias.value);
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
      
  
  function mostrarResultados(montoB,montoP,tasaT){
      let Diferencia=Number(montoB)-Number(montoP);
      montoB=montoB.toLocaleString('es-Es',{minimumFractionDigits: 2, maximumFractionDigits: 2});
      TotalBruto.textContent="$ "+montoB;
      tasaT=tasaT/cheque.length;
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
      for (let i = 0; i < cheque_aux.length; i=i+1) {
        console.log(i);
              cheque[i].Mbruto=Number(cheque_aux[i].value);
              cheque[i].fcobro=fecha_aux[i].value;
              cheque[i].dias=calcular_dias(cheque[i].fcobro);
              cheque[i].tasa=calculo_tasa(cheque[i].dias);
              cheque[i].M_a_Cobrar=CalculoM_a_Cobrar(cheque[i].tasa,cheque[i].Mbruto);
              montoTotalBruto=montoTotalBruto + cheque[i].Mbruto;
              montoTotalPagar=montoTotalPagar+cheque[i].M_a_Cobrar;
              tasaTotal=tasaTotal+cheque[i].tasa;

                                                 }    
      mostrarResultados(montoTotalBruto,montoTotalPagar,tasaTotal);
   
                                               });
  