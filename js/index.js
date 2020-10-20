/**********************************JQUERY**********************************/
// fetch("https://oc-p5-api.herokuapp.com/api/cameras")
//     .then(response => response.json())
//     .then(response => {
//         $.each(response, function (key, value) {
//             $("#products").append(`
//             <div class="product-index card m-5">
//             <img src="` + value.imageUrl + `" class="card-img-top" alt="image d'appareil photo">
//             <div class="card-body">
//                 <h5 class="card-title">` + value.name + `</h5>
//                 <p class="card-text">` + value.description + `</p>
//                 <h5 class="card-title">` + (value.price / 100).toFixed(2) + ` €</h5>
//                 <a href="./product.html?id=` + value._id + `" class="btn btn-secondary m-2">Fiche produit</a>
//             </div>
//             </div>`)
//         })
//     })
//     .catch(error => console.log("Erreur : " + error));

/**********************************VANILLA JS**********************************/
fetch("https://oc-p5-api.herokuapp.com/api/cameras")
    .then(response => response.json())
    .then(response => {
        for (value of response) {
            var div = document.createElement('div');
            div.setAttribute('class', 'product-index card m-5');
            div.innerHTML = `
                <img src="${value.imageUrl}" class="card-img-top" alt="image d'appareil photo">
                <div class="card-body">
                    <h5 class="card-title">${value.name}</h5>
                    <p class="card-text">${value.description}</p>
                    <h5 class="card-title">${(value.price / 100).toFixed(2)} €</h5>
                    <a href="./product.html?id=${value._id}" class="btn btn-secondary m-2">Fiche produit</a>
                </div>
                `;
            document.getElementById('products').appendChild(div);
        }
    })
    .catch(error => console.log("Erreur : " + error));