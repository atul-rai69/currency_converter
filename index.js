const base_url = "https://cdn.jsdelivr.net/npm/@fawazahmed0/currency-api@2024-03-06/v1/currencies/eur.json";
//https://cdn.jsdelivr.net/npm/@fawazahmed0/currency-api@2024-03-06/v1/currencies/eur.json
const dropdowns = document.querySelectorAll(".dropdown select");
const btn = document.querySelector("form button");
let cur_from= document.querySelector("#currency_from");
let cur_to= document.querySelector("#currency_to");
let message= document.querySelector("#msg");
let amount = document.querySelector("#value");

for(let select of dropdowns){
    for(code in countryList){
        let newoption = document.createElement("option");
        newoption.innerText = code;
        newoption.value= code;
        if(select.name === "from" && code === "USD"){
            newoption.selected="selected";
        }
        else if(select.name === "to" && code === "INR"){
            newoption.selected="selected";
        }
        select.append(newoption);
        select.addEventListener("change", (evt)=>{
            updateflag(evt.target);
            special= 23;
            //console.log(evt.target);
            //console.log(evt);
        });

    }
}

const updateflag = (evt) => {
    let currcode = evt.value;
    let countrycode = countryList[currcode];
    let newsrc =`https://flagsapi.com/${countrycode}/flat/64.png`;
    let img = evt.parentElement.querySelector("img");
    img.src= newsrc;
}
btn.addEventListener("click", async (evt) =>{
    evt.preventDefault();
    //console.log(cur_from);
    let dataa1= cur_from.value;
    let dataa= cur_from.value.toLowerCase();
    //console.log(dataa);
    const real_url=`https://cdn.jsdelivr.net/npm/@fawazahmed0/currency-api@2024-03-06/v1/currencies/${dataa}.json`
    const response= await fetch(real_url);
    let data = await response.json();
    //console.log(data);
    var rndm1  = cur_to.value;
    var rndm  = cur_to.value.toLowerCase();
    let exchange_rate= data[dataa][rndm];
    let given_value = amount.value;
    let final_value = given_value * exchange_rate;
    message.innerText= `${given_value} ${dataa1} = ${final_value} ${rndm1}`;
    

});




