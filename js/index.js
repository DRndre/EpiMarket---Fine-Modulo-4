const api = "https://striveschool-api.herokuapp.com/api/product/";
const key = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NWQ3NzNhOTc2YTY0YjAwMTllZjFiOTQiLCJpYXQiOjE3MDg4Njk4MTAsImV4cCI6MTcxMDA3OTQxMH0.YPo0eU3BlEWHw8tTrS0kP_8UgHmlYem97G3xf5I6Rpk";

let containerProducts = document.getElementById('containerProducts');


window.onload = getProducts();

async function getProducts(){
    try{
        const response =  await fetch(api, {
            headers:{
                'Authorization': `Bearer ${key}`
            }  
        })
        const data = await response.json();

        data.forEach(element => {
            getProduct(element);
        });
    }catch (err){
        console.log(err);
    }

}

//CICLO DI PRODOTTI -- PER OGNI PRODOTTO CREATO VENGONO SALVATI I PARAMETRI
function getProduct({name, brand, price, imageUrl, _id}){
    let colProduct = document.createElement('div');
    colProduct.classList.add('col-10', 'col-sm-5', 'col-md-3', 'mb-3');

    let productBox = document.createElement('div');
    productBox.classList.add('card', 'text-center');

    let img = document.createElement('img');
    img.classList.add('card-img-top');
    img.src = imageUrl;

    let bodyCard = document.createElement('div');
    bodyCard.classList.add('card-body');

    let productTitle = document.createElement('h6');
    productTitle.innerText = name;
    console.log(name);

    let productBrand = document.createElement('p');
    productBrand.innerText = brand;
    console.log(brand);

    let productPrice = document.createElement('p');
    productPrice.innerText = price+'€';

    let detailsButton = document.createElement('a');
    detailsButton.classList.add('btn', 'btn-primary', 'm-2');
    detailsButton.innerText = 'Details';

    detailsButton.addEventListener('click', () =>{
        detailsButton.href = "detailsProduct.html?id=" + _id;
    })

    bodyCard.append(productTitle, productBrand, productPrice, detailsButton);
    productBox.append(img, bodyCard);
    colProduct.appendChild(productBox);
    containerProducts.appendChild(colProduct);
}

function handleSearch(event) {
    event.preventDefault();

    const searchText = event.target.querySelector('input[type="search"]').value.toLowerCase();
    const productCards = document.querySelectorAll('.col-10'); 
    productCards.forEach(card => {
        const productName = card.querySelector('h6').innerText.toLowerCase();

        if (productName.includes(searchText)) {
            card.style.display = 'block';
        } else {
            card.style.display = 'none';
        }
    });
}

