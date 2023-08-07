const colEmbalados = document.querySelector(".col-embalados");
const colVitrine = document.querySelector(".col-vitrine");

const quantidadeEmbalados = colEmbalados.querySelectorAll("input");
const quantidadeVitrine = colVitrine.querySelectorAll("input");

const displayOutputQuantidade = document.querySelector(".output-quantidade");
const displayOutputQuantidadeVitrine = document.querySelector(".output-quantidade-vitrine");

document.getElementById("data").valueAsDate = new Date();
const btnEnviar = document.querySelector("#btn-enviar");

const dataEnvio = document.querySelector(".output-data");

btnEnviar.addEventListener("click", enviar);

const sobraTotalEmbalados = {};
const sobraTotalVitrine = {};

for (let quantidade of quantidadeEmbalados) {
  addEventListener("change", () => {
    if (quantidade.value) {
      sobraTotalEmbalados[quantidade.name] = Number(quantidade.value);
    }
  });
}

for (let quantidade of quantidadeVitrine) {
  addEventListener("change", (e) => {
    const el = e.target;
    const id = el.id;

    if (id.includes("vitrine") && quantidade.value) {
      sobraTotalVitrine[quantidade.name] = Number(quantidade.value);
    }
  });
}

function mostraData() {
    const data = document.querySelector("#data").value;
    const hora = new Date().toLocaleTimeString();
    dataEnvio.innerHTML = `Data: ${data} - Hora: ${hora}<br>`;
}

function enviar() {
  zeraDisplay(); 
  mostraData();
  console.log(sobraTotalEmbalados);
  console.log(sobraTotalVitrine);
  salvarTotal();
  carregarTotal()
}

function salvarTotal() {
    const totalEmbalados = [];
    const totalVitrine = [];

    for (const [key, value] of Object.entries(sobraTotalEmbalados)) {
        totalEmbalados.push(`${key} : ${value}`);
        
    }

    for (const [key, value] of Object.entries(sobraTotalVitrine)) {
        totalVitrine.push(`${key} : ${value}`);
    }

    const totalEmbaladosJSON = JSON.stringify(totalEmbalados);
    const totalVitrineJSON = JSON.stringify(totalVitrine);
    localStorage.setItem("totalEmbalados", totalEmbaladosJSON);
    localStorage.setItem("totalVitrine", totalVitrineJSON);
    }

function carregarTotal() {
    const totalEmbaladosJSON = localStorage.getItem("totalEmbalados");
    const totalVitrineJSON = localStorage.getItem("totalVitrine");
    
    const totalEmbalados = JSON.parse(totalEmbaladosJSON);
    const totalVitrine = JSON.parse(totalVitrineJSON);
    
    for (let cadasabor of totalEmbalados) {
        displayTotal(cadasabor);
        console.log(cadasabor)
    }

    for (let cadasaborVitrine of totalVitrine) {
        displayTotal(cadasaborVitrine);
        console.log(cadasaborVitrine)
    }
}

function displayTotal(totalSabor = 0) {
    
    if (totalSabor.includes('Vitrine')) {
        totalSaborLength = totalSabor.length;
        displayOutputQuantidadeVitrine.innerHTML += `${totalSabor.charAt(totalSaborLength - 1)}<br>`;
    } else {
    displayOutputQuantidade.innerHTML += `${totalSabor} |<br>`;
}}

function zeraDisplay() {
    displayOutputQuantidade.innerHTML = "";
    displayOutputQuantidadeVitrine.innerHTML = "";
}

carregarTotal() 
