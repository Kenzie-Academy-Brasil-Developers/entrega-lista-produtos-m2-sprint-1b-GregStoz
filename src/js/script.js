// 0 - CONTEUDOS ARMAZENADOS
const arrayFruit = [];
const arrayMilk = [];
const arrayBakery = [];

const searchArray = [];

const productList = document.querySelector("ul");

const inputPlace = document.querySelector(".campoBuscaPorNome");
const inputButton = document.querySelector(".estiloGeralBotoes");

const allSection = document.getElementById("all__products");
const fruitSection = document.getElementById("fruit__products");
const bakerySection = document.getElementById("bakery__products");
const milkSection = document.getElementById("milk__products");

let totalPrice = document.querySelector(".total__value");

// 1 - RENDERIZAR PRODUTOS NA VITRINE GERAL - forEach()

function itemReader() {
  produtos.forEach((element) => {
    let item = {
      nome: element.nome,
      preco: element.preco,
      sessao: element.sessao,
      categoria: element.categoria,
      img: element.img,
    };
    if (item.sessao == "Hortifruti") {
      arrayFruit.push(item);
    } else if (item.sessao == "Laticínio") {
      arrayMilk.push(item);
    } else {
      arrayBakery.push(item);
    }
  });
}
itemReader();

function createItemCard(array) {
  array.forEach((element) => {
    let name = element.nome;
    let price = element.preco;
    let type = element.sessao;
    let image = element.img;

    let tagLi = document.createElement("li");

    let tagImage = document.createElement("img");
    let tagName = document.createElement("h3");
    let tagType = document.createElement("span");
    let tagPrice = document.createElement("p");

    tagImage.src = image;

    tagImage.alt = name;
    tagName.innerText = name;
    tagType.innerText = type;
    tagPrice.innerText = `R$ ${price.toFixed(2).replace(".", ",")}`;

    productList.appendChild(tagLi);

    tagLi.appendChild(tagImage);
    tagLi.appendChild(tagName);
    tagLi.appendChild(tagType);
    tagLi.appendChild(tagPrice);
    valueCalculator(array);
  });
}
createItemCard(produtos);

// 2 - SELECIONAR PRODUTOS POR CATEGORIA - CLICANDO NOS MENUS

function createFruitSection() {
  productList.innerHTML = "";
  createItemCard(arrayFruit);
}

fruitSection.addEventListener("click", createFruitSection);

function createMilkSection() {
  productList.innerHTML = "";
  createItemCard(arrayMilk);
}

milkSection.addEventListener("click", createMilkSection);

function createBakerySection() {
  productList.innerHTML = "";
  createItemCard(arrayBakery);
}

bakerySection.addEventListener("click", createBakerySection);

// 3 - FILTRAR BUSCA POR NOME - filter() e includes()

// inputPlace
// inputButton

inputPlace.addEventListener("keyup", searchProduct);

function createSearchSection() {
  productList.innerHTML = "";
  createItemCard(searchArray);
  searchArray.splice(0, 1);
}

function searchProduct(event) {
  if (event.keyCode == 13) {
    let inputValue = inputPlace.value;

    searchFn(inputValue);
    createSearchSection();
  }
}

function searchOnClick() {
  let inputValue = inputPlace.value;

  searchFn(inputValue);
  createSearchSection();
}

function searchFn(searchValue) {
  produtos.forEach((element) => {
    let search = searchValue.toLowerCase();
    let productName = element.nome.toLowerCase();
    let typeOfProduct = element.categoria.toLowerCase();
    let sectionOfProduct = element.sessao.toLowerCase();

    if (
      productName.includes(search) ||
      typeOfProduct.includes(search) ||
      sectionOfProduct.includes(search)
    ) {
      searchArray.push(element);
    }
    return search;
  });
}

// 4 - CALCULAR E APRESENTAR VALOR TOTAL - reduce()

function valueCalculator(array) {
  let cartTotalPrice = array.reduce(
    (total, current) => (total += current.preco),
    0
  );
  totalPrice.innerText = `R$ ${cartTotalPrice.toFixed(2).replace(".", ",")}`;
}

// 5 - CRIAR FUNCIONALIDADE DO BOTAO PARA MOSTRAR TODOS OS PRODUTOS
function resetShop() {
  productList.innerHTML = "";
  createItemCard(produtos);
}

allSection.addEventListener("click", resetShop);
