"use strict";

///////////////////////////////////////
// Modal window

const modal = document.querySelector(".modal");
const overlay = document.querySelector(".overlay");
const btnCloseModal = document.querySelector(".btn--close-modal");
const btnsOpenModal = document.querySelectorAll(".btn--show-modal");

const openModal = function (e) {
  e.preventDefault();
  modal.classList.remove("hidden");
  overlay.classList.remove("hidden");
};

const closeModal = function () {
  modal.classList.add("hidden");
  overlay.classList.add("hidden");
};

btnsOpenModal.forEach((btn) => btn.addEventListener("click", openModal));

btnCloseModal.addEventListener("click", closeModal);
overlay.addEventListener("click", closeModal);

document.addEventListener("keydown", function (e) {
  if (e.key === "Escape" && !modal.classList.contains("hidden")) {
    closeModal();
  }
});

// Selecting, creating and delete elements

// Selecting
const allSections = document.querySelectorAll(".section"); //seleciona todas as sections

document.getElementById("section--1"); //seleciona pelo ID

const allButtons = document.getElementsByTagName("button"); //seleciona todas as tags buttons
console.log(allButtons); // retorna um HTMLColection e não uma node list. Com o HTMLColection é possível deletar elementos e ele será atualizado automaticamente.

console.log(document.getElementsByClassName("btn")); //tb retorna um HTMLCollection

// Na maioria das vezes usamos o querySelector e querySelectorAll

// Creating and inserting elements
// .insertAdjacentHTML

const message = document.createElement("div"); //criamos o elemento div no DOM e armazenamos em mesage. Mas ele ainda não está em nenhum lugar do DOM, isso é apenas um objeto DOM que podemos usar de alguma forma. Precisamos inseri-lo manualmente na página.
message.classList.add("cookie-message"); //criamos uma classe para message, que será usada para exibir uma mensagem de cookie no final da página. A class cookie-message está no html e css, já formatados.
// message.textContent =
//   'We use cookied for improved functionality and analytics.'; //pode ser desta forma para inserir o texto ou usando o innerHTML como abaixo.

message.innerHTML =
  'We use cookied for improved functionality and analytics. <button class="btn btn--close-cookie">Got it!</button>'; //inserimos o texto da mensagem e o botão que fechará a mensagem.

const header = document.querySelector(".header");
// header.prepend(message); //message será inserido no topo do header, no first child
// header.append(message); //agora message foi para o last child do header
// o elemento foi inserido apenas uma vez, pois ele é um elemento que vive no DOM e só pode aparecer em um local por vez. Não é onipresene :)
// Para utilizarmos o elemento em vários locais ao mesmo tempo é necessário clona-lo, como o ex abaixo

// header.append(message.cloneNode(true)); //agora o elemento message aparece no first e las child do header. Geralmente não é isso que queremos, então vamos apenas fazer o append.
header.append(message);

// header.before(message); //insere antes do header, ou seja é um irmão.
// header.after(message); //insere depois do header, ou seja é um irmão.

//Delete elements
document
  .querySelector(".btn--close-cookie")
  .addEventListener("click", function () {
    message.remove();
  }); //ao clicar no botão irá remover o elemento message

// Styles, Attributes and Classes
// Styles
// continuarmos trabalhando na message
message.style.backgroundColor = "#37383d"; //mudamos a cor do background de message
message.style.width = "120%"; //aumenta o width

console.log(getComputedStyle(message).height); //mostrará no console a altura utilizada

message.style.height =
  Number.parseFloat(getComputedStyle(message).height, 10) + 30 + "px"; //pegou o resultado de getComputedStyle(message).height e somou 30px. FOi necessário usar o parseFloat, para que o js entendesse que era para trabalhar apenas com o número do height.

// para mudar as propriedades das variáveis definidas dentro do root no css, precisamos usar o setProperty

// document.documentElement.style.setProperty('--color-primary', 'orangered'); //o documentElement acessa o root do css. Aqui mudamos a cor primária.

// Atributes
//atributos estão dentro dos elementos...ex Id, src, class..
const logo = document.querySelector(".nav__logo");
console.log(logo.alt);
console.log(logo.className);
console.log(logo.src); //mostra o endereço com o http
console.log(logo.getAttribute("src")); //mostrará o endereço img/logo.png

// assim como podemos ler, podemos definir novos atributos.
logo.alt = "Beautiful minimalist logo";

// Atributte fora do padrão
console.log(logo.designer); //dará undefined pois designer é um atributo fora do padrão que o js não entende. Para conseguir ler, é preciso usar o getAttribute
console.log(logo.getAttribute("designer"));
logo.setAttribute("company", "Banklist"); //criamos um novo atributo dentro de logo

//Data attributes
//só funciona com camelcase ex: version-number (html) e versionNumber (js)
console.log(logo.dataset.versionNumber);

//Classes
// os métodos de classList são add, remove, toggle e contains
//classList.contains nao inclui, apenas mostra o que contem na class selecionada.

// Implementando a rolagem suave da página
const btnScrollTo = document.querySelector(".btn--scroll-to"); //seleciona a classe
const section1 = document.querySelector("#section--1"); // seleciona o Id

btnScrollTo.addEventListener("click", function (e) {
  //fazendo na maneira odlschool, primeiro precisamos pegar as coordenadas do elemento que queremos scrollar
  const s1coords = section1.getBoundingClientRect();
  console.log(s1coords);
  //scrolling
  // window.scrollTo({
  //   left: s1coords.letft + window.pageXOffset,
  //   top: s1coords.top + window.pageYOffset,
  //   behavior: 'smooth',
  // }); //criamos um objeto e pasamos as informações. Behavior é como a rolagem será realizada, no caso smooth para ser suave.

  //da forma moderna!
  section1.scrollIntoView({ behavior: "smooth" });
});

//Types of Events and Event Handlers
//Estudar a documentação colocada no notion

// Event Bubbling e Capturing
// Adicionar smooth navigation ao clicar nos links da nav
// document.querySelectorAll('.nav__link').forEach(function (el) {
//   el.addEventListener('click', function (e) {
//     e.preventDefault();
//     const id = this.getAttribute('href'); //aqui vamos pegar o href do link clicado
//     document.querySelector(id).scrollIntoView({ behavior: 'smooth' });
//   });
// });
// o modo acima não é eficinte, pois imagine se fosse 1000 elementos. Seriam feitas 1000 copias através do forEach, o que impactaria no desempenho. A melhor maneira de corrigir isso é usando a delegação de eventos.
// Event delegation
// 1. Add event listenet to common parent element
// 2. Determine what element originated the event
// o e.target se torna fundamental para descobrirmos em qual elemento clicamos e assim podermos direcionar o event Listener.
document.querySelector(".nav__links").addEventListener("click", function (e) {
  e.preventDefault();
  // Matching strategy - vamos comparar o link clicado com a classe para ver se tem o nav__link, que é filho de nav__links
  if (e.target.classList.contains("nav__link")) {
    const id = e.target.getAttribute("href"); //em vez de usarmos o id, pegamos o atributo do elemento clicado.
    document.querySelector(id).scrollIntoView({ behavior: "smooth" });
  }
});

// Dom Traversing - como se andasse pelo DOM, ou seja, podemos selecionar um elemento baseado em outro elemento.
const h1 = document.querySelector("h1");
// Indo para baixo: elementos filho
console.log(h1.querySelectorAll(".highlight")); // retorna NodeList(2) [span.highlight, span.highlight], pois são diretamente ligados como filhos. Caso existisse outro highlight mais para baixo, mas que n seja filho do H1, ele não seria selecionado.
console.log(h1.children); //retorna HTMLCollection(3) [span.highlight, br, span.highlight] pois são todos os filhos DIRETOS de h1
// h1.firstElementChild.style.color = 'white'; //muda a cor do primeiro filho, que é o span
// h1.lastElementChild.style.color = 'blue';//muda a cor do ultimo filho, que é outro span

// Indo para baixo: elementos pais
console.log(h1.parentNode); //retorna o header__title
console.log(h1.parentElement); //retorna o header__title

// h1.closest('.header').style.background = 'var(--gradient-secondary)'; //Seleciona o header mais próximo do h1.
// enquanto o querySelector seleciona os filhos, closest seleciona os pais

// indo para o lado: irmãos (sibilings)
// só podemos acessar os irmãos diretos, ou seja, o anterior ou o próximo.
console.log(h1.previousElementSibling);
console.log(h1.nextElementSibling);
console.log(h1.parentNode.children); //seleciona todos os irmãos, incluindo o h1

// Builgin a tabbed componet - GUIAS
const tabs = document.querySelectorAll(".operations__tab");
const tabsContainer = document.querySelector(".operations__tab-container");
const tabsContent = document.querySelectorAll(".operations__content");
//vamos anexar o eventlistener no tabsContainer, pois ele é pai do tabsContent onde se encontram os botões.
//precisaremos usar o closest method
tabsContainer.addEventListener("click", function (e) {
  const clicked = e.target.closest(".operations__tab"); //com o closest, ao clicar ele vai procurar o operations__tab mais próximo, que é o botão.
  console.log(clicked);

  //Guard clause
  if (!clicked) return; //se clicarmos fora do botão, para não dar erro e retornar null, o código será encerrado. Caso clique no botão, seguirá normalmente.

  //  Remove active class
  // primeiro removemos a active de todas as tabs, para depois add na que for clicada.
  tabs.forEach((t) => t.classList.remove("operations__tab--active"));
  tabsContent.forEach((c) => c.classList.remove("operations__content--active")); //como acima, vamos remover o active de todos os elementos, para add depois ao ser clicado
  // Active tab
  clicked.classList.add("operations__tab--active");

  // Activate content area
  document
    .querySelector(`.operations__content--${clicked.dataset.tab}`)
    .classList.add("operations__content--active"); //irá selecionar o elemento de acordo com o data-tab clicado. No html, data-tab pode ser 1, 2 ou 3 dependendo do botão. Ao clicar add o active.
});
