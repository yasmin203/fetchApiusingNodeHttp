let btn1 = document.getElementById("btn1");
let btn2 = document.getElementById("btn2");
let btn3 = document.getElementById("btn3");
let content = document.querySelector("#content");
let content2 = document.querySelector("#content2");
let content3 = document.querySelector("#content3");
let body = document.getElementsByTagName("body");

let Apis = [
  "https://breakingbadapi.com/api/quotes",
  "https://jsonplaceholder.typicode.com/posts",
  "https://jsonplaceholder.typicode.com/todos",
];
const Apiloop = (api) => {
  Apis.forEach((api) => {});
  return api;
};
const api1 = Apiloop(Apis[0]);
const api2 = Apiloop(Apis[1]);
const api3 = Apiloop(Apis[2]);

async function getData(api1) {
  try {
    const data = await (await fetch(`${api1}`)).json();
    printData(data);
    //console.log(data2)
  } catch (e) {
    console.log("ERROR", e.message);
  }
}
getData(api1);

async function printData(data) {
  btn1.addEventListener("click", () => {
  
    data.forEach((el) => {
    //  console.log(el)
      content.innerHTML += `<div><ul>
   <li> <mark> Author  : </mark>  ${el.author}<mark> Quote :</mark> "   ${el.quote}" <mark> Series :</mark> ${el.series}  </li>
   <ul></div>`;
    });
  
   
  });
      


}


//  =========================
async function getData2(api2) {
  try {
    const data2 = await (await fetch(`${api2}`)).json();
    printData2(data2);
    //console.log(data2)
  } catch (e) {
    console.log("ERROR", e.message);
  }
}
getData2(api2);

async function printData2(data2) {
  
  btn2.addEventListener("click", () => {

    data2.forEach((el) => {
    //  console.log(el)
      content2.innerHTML += `<div><ul>
   <li> <mark> ID  : </mark>  ${el.id}<mark> Title :</mark> "   ${el.title}" <mark> Body :</mark> ${el.body}  </li>
   <ul></div>`;
    });
  
  });

}

// =======================================
async function getData3(api3) {
  try {
    const data3 = await (await fetch(`${api3}`)).json();
    printData3(data3);
    //console.log(data2)
  } catch (e) {
    console.log("ERROR", e.message);
  }
}
getData3(api3);

async function printData3(data3) {
  btn3.addEventListener("click", () => {
  //   content2.style.display = "none";
    data3.forEach((el) => {
     // console.log(el)
      content3.innerHTML += `<div><ul>
   <li> <mark> ID  : </mark>  ${el.id}<mark> Title :</mark> "   ${el.title}" <mark> UserID :</mark> ${el.userId}  </li>
   <ul></div>`;
    });

  });
}
