/*let cheque1 = document.getElementById('cheque1');*/
/*let fecha1 = document.getElementById('fecha1');*/
const cheques=document.querySelectorAll('.cheque'); // genero arreglo con los montos de los cheques
const fechas=document.querySelectorAll('.fecha');   //genero arreglo con las fechas de los cheques

const tasaDiaria=document.getElementById('tasa_diaria');   // valor en % del costo diario o tasa diaria
const tasaAlDia=document.getElementById('tasa_al_dia');  // valor en % de la tasa por CHQ al día
const tasa7Dias=document.getElementById('tasa_7dias');   // valor en % de la tasa a 7 días
const tasa15Dias=document.getElementById('tasa_15dias'); // valor en % de la tasa a 15 días
const tasa30Dias=document.getElementById('tasa_30dias'); // valor en % de la tasa a 30 días
const boton_calcular = document.getElementById('calcular');
let TotalPagar=document.getElementById('TOTALPAGAR'); // total a pagar por cada cheque
let totales=[]; // genero un arreglo de los totales de a pagar de todos los cheques

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
                    TotalPagar.textContent="$ "+ total_a_pagar;
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
return null;    
    
}



boton_calcular.addEventListener("click",()=>{
    for (let i = 0; i < cheques.length; i=i+1) {
            totales[i]=realizarCalculo(fechas[i].value,cheques[i].value);
                                               }
              console.log(totales);                                 
                                             });
