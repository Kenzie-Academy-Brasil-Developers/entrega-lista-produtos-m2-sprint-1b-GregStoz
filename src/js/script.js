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

//let totalPrice = document.querySelector(".total__value");

const cartList = [];

// SCRIPT CARRINHO -- -- ADD / REMOVE
let cartSection = document.querySelector(".cart__container");

let totalItems = document.getElementById("total-items");

let totalPrice = document.getElementById("total-price");

let priceArea = document.querySelector(".price__container");

function createAlert() {
  let tagAlert = document.createElement("div");

  let tagImg = document.createElement("img");
  let tagAlertTitle = document.createElement("h3");
  let tagAlertText = document.createElement("p");

  if (cartList.length > 0) {
    priceArea.classList.remove("hidden");
  }

  if (cartList.length == 0) {
    tagAlert.classList.add("cart-alert");
    tagImg.src = "./src/img/alert-circle.png";
    tagImg.alt = "Carrinho Vazio";
    tagAlertTitle.innerText = "Carrinho Vazio";
    tagAlertText.innerText = "Adicione produtos";
    priceArea.classList.add("hidden");

    tagAlert.append(tagImg, tagAlertTitle, tagAlertText);

    cartSection.appendChild(tagAlert);
  }
}
createAlert();

function addProduct(product) {
  cartList.push(product);
  cartReader(cartList);
  sumCart();
  createAlert();
}

function removeProduct(product) {
  cartList.splice(product, 1);
  cartReader(cartList);
  sumCart();
  createAlert();
}

function sumCart() {
  let cartTotalPrice = cartList.reduce(
    (total, current) => (total += current.preco),
    0
  );
  totalPrice.innerText = cartTotalPrice.toFixed(2).replace(".", ",");
  totalItems.innerText = cartList.length;
}

function cartReader(products) {
  cartSection.innerHTML = "";
  products.forEach((element) => {
    let cartProduct = element;

    let cartCard = createCartCard(cartProduct);

    cartSection.appendChild(cartCard);
  });
}

function createCartCard(cardList) {
  let name = cardList.nome;
  let price = cardList.preco;
  if (cardList.promocao === true) {
    price = cardList.precoPromocao;
  }

  let image = cardList.img;
  let removeCart = "🗑️ Remover";

  let tagParentDiv = document.createElement("div");
  let tagDiv = document.createElement("div");
  let tagImage = document.createElement("img");
  let tagName = document.createElement("h4");
  let tagPrice = document.createElement("span");
  let tagRemoveCart = document.createElement("a");

  tagRemoveCart.addEventListener("click", () => removeProduct(cardList));

  tagParentDiv.classList.add("cart-container");
  tagDiv.classList.add("cart-content");

  tagImage.src = image;
  tagImage.alt = name;
  tagName.innerText = name;
  tagPrice.innerText = `R$ ${price.toFixed(2).replace(".", ",")}`;
  tagRemoveCart.innerText = removeCart;

  tagParentDiv.append(tagImage, tagDiv);
  tagDiv.appendChild(tagName);
  tagDiv.appendChild(tagPrice);
  tagDiv.appendChild(tagRemoveCart);

  return tagParentDiv;
}

// 1 - RENDERIZAR PRODUTOS NA VITRINE GERAL - forEach()

function itemReader() {
  produtos.forEach((element) => {
    let item = {
      nome: element.nome,
      preco: element.preco,
      secao: element.secao,
      categoria: element.categoria,
      img: element.img,
    };
    if (item.secao == "Hortifruti") {
      arrayFruit.push(item);
    } else if (item.secao == "Laticínio") {
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
    let type = element.secao;
    let image = element.img;
    let pricePromo = element.precoPromocao;
    let itemInfo = element.componentes;

    let tagLi = document.createElement("li");

    let tagImage = document.createElement("img");
    let tagName = document.createElement("h3");
    let tagType = document.createElement("span");
    let tagPrice = document.createElement("p");
    let tagAddCart = document.createElement("button");
    let tagItemInfo = document.createElement("p");

    tagAddCart.innerText = "Comprar";

    tagAddCart.addEventListener("click", () => addProduct(element));
    tagItemInfo.innerText = itemInfo.toString().replaceAll(",", ", ");
    tagImage.src = image;
    tagImage.alt = name;
    tagName.innerText = name;

    if (element.promocao == true) {
      tagPrice.classList.add("destaque");
      tagPrice.innerText = `R$ ${pricePromo
        .toFixed(2)
        .replace(".", ",")} preço promocional`;
    } else {
      tagPrice.innerText = `R$ ${price.toFixed(2).replace(".", ",")}`;
    }

    tagType.innerText = type;

    productList.appendChild(tagLi);

    tagLi.appendChild(tagImage);
    tagLi.appendChild(tagName);
    tagLi.appendChild(tagType);
    tagLi.appendChild(tagItemInfo);
    tagLi.appendChild(tagPrice);
    tagLi.appendChild(tagAddCart);

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
  searchArray.splice(0, searchArray.length);
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
    let sectionOfProduct = element.secao.toLowerCase();

    if (
      productName.includes(search) ||
      typeOfProduct.includes(search) ||
      sectionOfProduct.includes(search)
    ) {
      searchArray.push(element);

      return search;
    }
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
