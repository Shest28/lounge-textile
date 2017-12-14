/** open menu for mobile version**/
let menu = document.querySelector('#menu');
menu.addEventListener('click', () => {menu.classList.toggle('open')})

/**  work mini-basket**/
class Node {
    constructor(id, caption, price) {
        this.id = id;
        this.caption = caption;
        this.price = price;
    }
}

let arrList = JSON.parse(localStorage.getItem('arrList')) || [];
showMiniBasket();
/** event for click on element shortcut add**/
let addItem = document.querySelector('#add-goods');
addItem = addEventListener('click', addToBasket);

/** show mini-basket list-goods**/
function showMiniBasket() {
    /** show total sum  and count**/
    let mainSum = document.querySelector('#main-sum');
    let totalSum = document.querySelector('#total-sum');
    let countGoods = document.querySelector('#count-goods');

    mainSum.innerHTML = calcTotalSum(arrList) + '';
    totalSum.innerHTML = calcTotalSum(arrList) + '';
    countGoods.innerHTML = arrList.length + ' товаров';

    miniList.innerHTML = '';
    let n = arrList.length;
    for (let i = 0; i < n; i++) {
        let newLi = document.createElement('li');
        newLi.innerHTML = "<span class='name'>" + arrList[i].caption + "</span>"
                        + "<span class='price'>" + arrList[i].price + "</span>"
                        + "<div class='delete' value=" + arrList[i].id + "><i class='fa fa-times-circle' id='deleteItem'></i></div>";
        miniList.appendChild(newLi);
    }
}

/** delete element from mimi-basket**/
let deleteItem = document.querySelector('#deleteItem');
deleteItem = addEventListener('click', deleteFromBasket);

function addToBasket() {
    let target = event.target;
    if (target.getAttribute('class') != 'shortcut basket-icon') return;

    let id = target.parentNode.getAttribute('value');
    let caption = target.parentNode.querySelector('.caption').innerHTML;
    let price =  target.parentNode.querySelector('.price').innerHTML;

    let node = new Node(id, caption, price);
    arrList.push(node);
    localStorage.setItem ('arrList', JSON.stringify(arrList));
    showMiniBasket()
}

function calcTotalSum(arr) {
    if (arr.length)
     return arr.reduce((sum, item) => sum + parseInt(item.price.replace(/\s/g, "")), 0);
    return 0;
}

function deleteFromBasket() {
    let target = event.target;
    if (target.getAttribute('class') != 'fa fa-times-circle') return;

    let id = target.parentNode.getAttribute('value');
    for (let i = 0 ; i < arrList.length; i++) {
        if (arrList[i].id == id) arrList.splice(i, 1);
    }
    localStorage.setItem ('arrList', JSON.stringify(arrList));
    showMiniBasket();
}
