//MAPEAMENTO DOS BOTÕES ORDEM CRESCENTE E DECRESCENTE
const btnAscendingOrder = document.querySelector(".btn-ascending-order") //botão ordem crescente
const btnDecreasingOrder = document.querySelector(".btn-order-decreasing") //botão ordem decrescente

//MAPEAMENTO DOS TÍTULOS DA JANELA DE MODAL
const titleDrawnNumber = document.querySelector(".title-drawn-number"); //titulo numero sorteado
const titleDateTime = document.querySelector(".title-date-time"); //titulo data e hora
const titleDrawBetween = document.querySelector(".title-draw-between"); //titulo entre
const titleQuantityNumbers = document.querySelector(".title-quantity-numbers-draw");//titulo quantidade de numeros

//MAPEAMENTO DOS PARÁGRAFOS
const paragraphDrawnNumber = document.querySelector(".paragraph-drawn-numbers"); //paragrafo numero sorteado
const paragraphDateTime = document.querySelector(".paragraph-date-time"); //paragrafo data e hora
const paragraphDrawBetween = document.querySelector(".paragraph-draw-between"); //paragrafo entre
const paragraphQuantityNumbers = document.querySelector(".paragraph-quantity-numbers-draw");//paragráfo quantidade de números
const paragraphAlert = document.querySelector(".paragraph-alert"); //paragrafo da mensagem de alerta

//MAPEAMENTO RADIO
const allRadios = document.getElementsByName('radio');

//MAPEAMENTO SPAN LETRA S
const addLetter = document.querySelector(".add-letter")

//VARIÁVEIS PARA DATA E HORA
const data = new Date();
const day = data.getDate();
const year = data.getFullYear();
const hour = data.getHours();
const minute = data.getMinutes();

//FUNÇÃO SORTEAR NÚMEROS
function generateNumber() {

 //MAPEAMENTO DOS INPUTS
  const inputQtde = document.querySelector(".quantity-numbers").value;
  const inputMin = Math.ceil(document.querySelector(".input-min").value);
  const inputMax = Math.floor(document.querySelector(".input-max").value);
  const max = document.querySelector(".input-max").value;
  const min = document.querySelector(".input-min").value;

  //MAPEAMENTO DOS RADIOS
  const classRadioPar = document.querySelector("#radio-pair").checked;
  const classRadioImpar = document.querySelector("#radio-odd").checked;

  //VARIÁVEIS PARA O ARRAY DA QUANTIDADE DE NÚMEROS INFORMADA
  const numbers = [];
  
  if (inputQtde == "") {
    paragraphAlert.innerHTML = "Informe a quantidade a ser sorteada.";
    document.querySelector(".quantity-numbers").focus();
  } else if (inputQtde <= 0) {
    paragraphAlert.innerHTML = "O valor deve ser maior ou igual a 1.";
    document.querySelector(".quantity-numbers").focus();
  } else if (min == "") {
    paragraphAlert.innerHTML = "Informe o primeiro valor.";
    document.querySelector(".input-min").focus();
  } else if (max == "") {
    paragraphAlert.innerHTML = "Informe o segundo valor.";
    document.querySelector(".input-max").focus();
  } else if (inputMin < 0) {
    paragraphAlert.innerHTML = "O valor deve ser maior ou igual a 0.";
    document.querySelector(".input-min").focus();
  } else if (inputMax <= 0) {
    paragraphAlert.innerHTML = "O valor deve ser maior ou igual a 1.";
    document.querySelector(".input-max").focus();
  } else if (inputMax < inputMin) {
    paragraphAlert.innerHTML = "O segundo valor não pode ser menor que o primeiro.";
  } else if (inputMax < inputQtde && inputMin != 0) {
    paragraphAlert.innerHTML = `Entre ${inputMin}  e ${inputMax} não existem ${inputQtde} números.`;
  } else {

    while (numbers.length < inputQtde) {
      let n = Math.floor(Math.random() * (inputMax - inputMin + 1) + inputMin );
        if (!numbers.includes(n) && classRadioImpar == false && classRadioPar == false ||
            !numbers.includes(n) && classRadioPar == true && n % 2 == 0 ||
            !numbers.includes(n) && classRadioImpar == true && n % 2 == 1) { 
            numbers.push(n);
        } 
      }

    openModal();

    //NÚMEROS SORTEADOS
    paragraphAlert.innerHTML = "";
    titleDrawnNumber.innerHTML = "Resultado do Sorteio:";
    paragraphDrawnNumber.innerHTML =`${numbers.join(",\n")}`;
    
    //ARRAY DE MESES PARA MOSTRA O MÊS POR ESCRITO
    const meses = new Array("Janeiro", "Fevereiro", "Março", "Abril", "Maio", "Junho", "Julho", "Agosto",
      "Setembro", "Outubro", "Novembro", "Dezembro");

    //DATA DO SORTEIO
    titleDateTime.innerHTML = "Data do sorteio:";
    paragraphDateTime.innerHTML = `${day} de ${meses[data.getMonth()]} de ${year},${hour}:${minute}`;

    //SORTEIO ENTRE
    titleDrawBetween.innerHTML = "Sorteio entre:";
    paragraphDrawBetween.innerHTML = `${inputMin} e ${inputMax}`;
   
    //QUANTIDADE DE NÚMEROS SORTEADA
    titleQuantityNumbers.innerHTML = "Quantidade sorteada:";
    paragraphQuantityNumbers.innerHTML = inputQtde;
  }

  //FUNÇÃO PARA ORDENAR EM ORDEM CRESCENTE
  function ascendingOrder () {
    const increasingResult =  numbers.sort((a, b)=>  {return a - b;});
    paragraphDrawnNumber.innerHTML =`${increasingResult.join(",\n")}`;
  }

  //FUNÇÃO PARA ORDENAR EM ORDEM DECRESCENTE
  function descendingOrder () {
    const decreasingResult =  numbers.sort((a, b)=>  {return b - a;});
    paragraphDrawnNumber.innerHTML =`${decreasingResult.join(",\n")}`;
  }

  btnAscendingOrder.addEventListener("click", ascendingOrder)
  btnDecreasingOrder.addEventListener("click", descendingOrder)
}

//FUNÇÃO PARA ADICIONAR A LETRA S CASO A QUANTIDADE FOR MAIOR QUE 0 OU 1
const quantity = document.querySelector(".quantity-numbers")

function changeValue () {

  if(document.querySelector(".quantity-numbers").value > 1) {
    addLetter.innerHTML = "s"
  } else {
    addLetter.innerHTML = ""
  }
}

quantity.addEventListener("change", changeValue)
quantity.addEventListener("keyup", changeValue)

//FUNÇÃO JANELA MODAL
function openModal() {
  const modal = document.getElementById("modal-id");
  modal.classList.add("open");
  modal.addEventListener("click", (e) => {
    if (e.target.id == "modal-id" || e.target.id == "close") {
      modal.classList.remove("open");
      localStorage.fechaModal = "modal-id";
    }
  });
}

//VERIFICAÇÃO SOMENTE UM OU NENHUM RADIO SELECIONADO
let booRadio;
let x = 0;
for (x = 0; x < allRadios.length; x++) {

  allRadios[x].onclick = function() {
    if (booRadio == this) {
      this.checked = false;
      booRadio = null;
    } else {
      booRadio = this;
    }
  };
}