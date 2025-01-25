
const CHQ = {
  Mbruto: 0,
  tasa: 0,
  dias: 0,
  Mfinal: 0
}

let cheque=[{Mbruto:12000,tasa:1,dias:1,Mfinal:15000}];
console.log(cheque);

const cheques=document.querySelectorAll('.cheque'); // genero arreglo con el importe de todos los cheques
const fechas=document.querySelectorAll('.fecha');   //genero arreglo con las fechas de todos los cheques

const tasaDiaria=document.getElementById('tasa_diaria');   // tasa diaria
const tasaAlDia=document.getElementById('tasa_al_dia');  // tasa por CHQ al día
const tasa7Dias=document.getElementById('tasa_7dias');   // tasa a 7 días
const tasa15Dias=document.getElementById('tasa_15dias'); // tasa a 15 días
const tasa30Dias=document.getElementById('tasa_30dias'); // tasa a 30 días

const boton_calcular = document.getElementById('calcular');

let TotalBruto=document.getElementById('TOTALBRUTO'); // debe mostrar la suma de todos los importes brutos de los cheques 
let TotalPagar=document.getElementById('TOTALPAGAR'); // debe mostrar la suma de todos los cheques ya negocioados (total a pagar)
let DiferenciaProfit=document.getElementById('DIFPESOS'); // debe mostrar diferencia entre importe bruto e importe a pagar. 
let totales=[]; // arreglo de los importes de cheques ya negocioados.

function realizarCalculo(fecha,monto){   //funcion que recibe fecha y monto de cada uno de los cheques, calcula dias, 
    fecha_actual=new Date();            // tasa a pagar y devuelve el monto del cheque con el interes descontado. 
    fecha_cheque=new Date(fecha);
    const dias=(Math.round((fecha_cheque - fecha_actual)/86400000))+1;
    console.log(dias);
    if ((dias===0) || (dias===1)) {
                    console.log(monto);
                    console.log(tasaAlDia.value);
                    total_a_pagar=monto-((monto/100)*tasaAlDia.value);
                    console.log(total_a_pagar);
                    return total_a_pagar;
    }
    if ((dias>1) && (dias<7)) {
                 console.log(monto);
                 console.log(tasaAlDia.value);
                 console.log(tasaDiaria.value);
                 tasa_total=Number(tasaDiaria.value*dias) + Number(tasaAlDia.value);
                 console.log(tasa_total);
                 total_a_pagar=monto-((monto/100)*tasa_total);
                 console.log(total_a_pagar);     
                 return total_a_pagar;              
    }
    if ((dias>=7) && (dias<15)) {
        console.log(monto);
        console.log(tasa7Dias.value);
        console.log(tasaDiaria.value);
        tasa_total=Number(tasaDiaria.value*dias) + Number(tasa7Dias.value);
        console.log(tasa_total);
        total_a_pagar=monto-((monto/100)*tasa_total);
        console.log(total_a_pagar);  
        return total_a_pagar;
    }
    if ((dias>=15) && (dias<30)) {
                 console.log(monto);
                 console.log(tasa15Dias.value);
                 console.log(tasaDiaria.value);
                 tasa_total=Number(tasaDiaria.value*dias) + Number(tasa15Dias.value);
                 console.log(tasa_total);
                 total_a_pagar=monto-((monto/100)*tasa_total);
                 console.log(total_a_pagar); 
                 return total_a_pagar;                  
    }
       if ((dias>=30) && (dias<90)) {
                 console.log(monto);
                 console.log(tasa30Dias.value);
                 console.log(tasaDiaria.value);
                 tasa_total=Number(tasaDiaria.value*dias) + Number(tasa30Dias.value);
                 console.log(tasa_total);
                 total_a_pagar=monto-((monto/100)*tasa_total);
                 console.log(total_a_pagar);
                 return total_a_pagar;                   
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

boton_calcular.addEventListener("click",()=>{
    let montoTotalPagar=0;
    let montoTotalBruto=0;
    for (let i = 0; i < cheques.length; i=i+1) {
            totales[i]=realizarCalculo(fechas[i].value,cheques[i].value);
            montoTotalBruto=montoTotalBruto + Number(cheques[i].value);
            montoTotalPagar=montoTotalPagar+totales[i];
                                               }    
    mostrarResultados(montoTotalBruto,montoTotalPagar);
    console.log(totales);        
    console.log(montoTotalBruto);
    console.log(montoTotalPagar);

                                             });
