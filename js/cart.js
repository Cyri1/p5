// var cartContent = JSON.parse(localStorage.getItem("cartContent"))
// var totalPrice;

// function sum() { // calcule le prix total
//     totalPrice = 0;
//     $(".price").each(function () {
//         totalPrice = totalPrice + parseInt($(this).text())
//     })
//     $("#total, #confirm-total").text(totalPrice.toFixed(2) + ' €')
//     return
// }


// $(function () { // au chargement de la page
//     if (Array.isArray(cartContent) && cartContent.length > 0) { // si cartContent est un tableau contenant des valeurs
//         $('#empty-cart').remove() //supprime la ligne "votre panier est vide"
//         for (var value of cartContent) { //alors pour chaque ligne du cartContent ajouter une nouvelle ligne au tableau avec les infos du produit
//             value = JSON.parse(value)
//             $('#cart-list').append(
//                 `<tr>
//             <td><button class="btn btn-sm btn-outline-danger remove">X</button></td>
//             <td>` + value.name + `</td>
//             <td>` + value.lens + `</td>
//             <td class="price">` + value.price + `</td>
//             </tr>`)
//         }
//         $('#cart-list').append( //ajouter une ligne pour le total 
//             `<tr>
//             <td class="text-right" colspan="3"><strong>Total : </strong></td>
//             <td id="total"></td>
//             </tr>`)
//         sum() //calculer le prix total
//     }

//     $(".remove").on('click', function (e) {
//         var row = $(this).closest("tr") //ligne cliquée
//         var rowIndex = $(row).index() //sauvegarder l'index de la ligne cliquée
//         $(row).remove(); //supprimer la ligne du DOM
//         cartContent.splice(rowIndex, 1) //supprime la ligne du tableau cartContent
//         localStorage.setItem("cartContent", JSON.stringify(cartContent)) //mettre à jour le localStorage
//         sum() //mettre à jour le prix total
//     })

//     $("#submit-order").on('click', function (e) {
//         // vérfier chaque champs avant d'envoyer le formulaire
//         var email = $("#email").val()
//         var firstname = $("#firstname").val()
//         var name = $("#name").val()
//         var city = $("#city").val()
//         var address = $("#address").val()

//         var regexEmail = /^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i
//         var regexNodigit = /^[^0-9]{2,}$/
//         var regexAddress = /^[A-Za-z0-9" "]{2,}$/

//         if (regexEmail.test(email)) {
//             $("#check-email").html(`<small class="text-success">Valide</small>`)
//         } else {
//             $("#check-email").html(`<small class="text-danger">Ce champ ne doit contenir ni caractères spéciaux autre que "-", "_", ".", ni majuscules, ni accents.</small>`)
//         }

//         if (regexNodigit.test(firstname)) {
//             $("#check-firstname").html(`<small class="text-success">Valide</small>`)
//         } else {
//             $("#check-firstname").html(`<small class="text-danger">Ce champ ne doit pas contenir de chiffres et contenir plus de 2 caractères.</small>`)
//         }

//         if (regexNodigit.test(name)) {
//             $("#check-name").html(`<small class="text-success">Valide</small>`)
//         } else {
//             $("#check-name").html(`<small class="text-danger">Ce champ ne doit pas contenir de chiffres et contenir plus de 2 caractères.</small>`)
//         }

//         if (regexNodigit.test(city)) {
//             $("#check-city").html(`<small class="text-success">Valide</small>`)
//         } else {
//             $("#check-city").html(`<small class="text-danger">Ce champ ne doit pas contenir de chiffres et contenir plus de 2 caractères.</small>`)
//         }

//         if (regexAddress.test(address)) {
//             $("#check-address").html(`<small class="text-success">Valide</small>`)
//         } else {
//             $("#check-address").html(`<small class="text-danger">Ce champ doit contenir plus de 2 caractères.</small>`)
//         }

//         /////// si tous les champs sont OK alors envoyer le POST
//         if (regexEmail.test(email) && regexNodigit.test(firstname) && regexNodigit.test(name) && regexNodigit.test(city) && regexAddress.test(address)) {

//             //créer l'array products et le remplir avec les id du cartContent
//             var products = [];
//             for (value of cartContent) {
//                 value = JSON.parse(value)
//                 products.push(value.id)
//             }

//             // créer l'object contact 
//             var body = {
//                 contact: {
//                     "firstName": firstname,
//                     "lastName": name,
//                     "address": address,
//                     "city": city,
//                     "email": email
//                 },
//                 products
//             }

//             function status(response) {
//                 if (response.status >= 200 && response.status < 300) {
//                     return Promise.resolve(response)
//                 } else {
//                     return Promise.reject(new Error(response.statusText))
//                 }
//             }

//             function json(response) {
//                 return response.json()
//             }

//             fetch("https://oc-p5-api.herokuapp.com/api/cameras/order", {
//                     method: 'POST',
//                     headers: {
//                         'Content-type': 'application/json'
//                     },
//                     body: JSON.stringify(body)
//                 })
//                 .then(status)
//                 .then(json)
//                 .then(function (data) {
//                     localStorage.removeItem("cartContent")
//                     window.location.href = "confirm.html?orderid="+data.orderId
//                 }).catch(function (error) {
//                     console.log('Request failed', error)
//                 });
//         }
//     })
// })

var cartContent = JSON.parse(localStorage.getItem("cartContent"))
var totalPrice;

function sum() { // calcule le prix total
    totalPrice = 0;
    var priceNodeList = document.querySelectorAll(".price")
    for (value of priceNodeList) {
        totalPrice = totalPrice + parseInt(value.textContent)
    }
    document.getElementById('total').textContent = totalPrice.toFixed(2) + ' €'
    document.getElementById('confirm-total').textContent = totalPrice.toFixed(2) + ' €'
    return
}

document.addEventListener('DOMContentLoaded', (event) => { // au chargement de la page
    if (Array.isArray(cartContent) && cartContent.length > 0) { // si cartContent est un tableau contenant des valeurs
        document.getElementById("empty-cart").remove() //supprime la ligne "votre panier est vide"
        for (var value of cartContent) { //alors pour chaque ligne du cartContent ajouter une nouvelle ligne au tableau avec les infos du produit
            value = JSON.parse(value)
            let tr = document.createElement('tr');
            tr.innerHTML = `<tr>
                            <td><button class="btn btn-sm btn-outline-danger remove">X</button></td>
                            <td>${value.name}</td>
                            <td>${value.lens}</td>
                            <td class="price">${value.price}</td>
                            </tr>`
            document.getElementById('cart-list').appendChild(tr);
        }
        let tr = document.createElement('tr');
        tr.innerHTML = `<tr>
                        <td class="text-right" colspan="3"><strong>Total : </strong></td>
                        <td id="total"></td>
                        </tr>`
        document.getElementById('cart-list').appendChild(tr);
        sum() //calculer le prix total
    }

    document.addEventListener("click", function (event) {

        if (event.target.matches('.remove')) {
            var row = event.target.closest("tr") //ligne cliquée
            var rowIndex = row.rowIndex - 1 //sauvegarder l'index de la ligne cliquée (-1 > ne pas compter le th)
            row.remove(); //supprimer la ligne du DOM
            cartContent.splice(rowIndex, 1) //supprime la ligne du tableau cartContent
            localStorage.setItem("cartContent", JSON.stringify(cartContent)) //mettre à jour le localStorage
            sum() //mettre à jour le prix total
        }
        if (event.target.matches('#submit-order')) {
            // vérfier chaque champs avant d'envoyer le formulaire
            var email = document.getElementById('email').value
            var firstname = document.getElementById('firstname').value
            var name = document.getElementById('name').value
            var city = document.getElementById('city').value
            var address = document.getElementById('address').value

            var regexEmail = /^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i
            var regexNodigit = /^[^0-9]{2,}$/
            var regexAddress = /^[A-Za-z0-9" "]{2,}$/

            if (regexEmail.test(email)) {
                document.getElementById('check-email').innerHTML = `<small class="text-success">Valide</small>`
            } else {
                document.getElementById('check-email').innerHTML = `<small class="text-danger">Ce champ ne doit contenir ni caractères spéciaux autre que "-", "_", ".", ni majuscules, ni accents.</small>`
            }

            if (regexNodigit.test(firstname)) {
                document.getElementById('check-firstname').innerHTML = `<small class="text-success">Valide</small>`
            } else {
                document.getElementById('check-firstname').innerHTML = `<small class="text-danger">Ce champ ne doit pas contenir de chiffres et contenir plus de 2 caractères.</small>`
            }

            if (regexNodigit.test(name)) {
                document.getElementById('check-name').innerHTML = `<small class="text-success">Valide</small>`
            } else {
                document.getElementById('check-name').innerHTML = `<small class="text-danger">Ce champ ne doit pas contenir de chiffres et contenir plus de 2 caractères.</small>`
            }

            if (regexNodigit.test(city)) {
                document.getElementById('check-city').innerHTML = `<small class="text-success">Valide</small>`
            } else {
                document.getElementById('check-city').innerHTML = `<small class="text-danger">Ce champ ne doit pas contenir de chiffres et contenir plus de 2 caractères.</small>`
            }

            if (regexAddress.test(address)) {
                document.getElementById('check-address').innerHTML = `<small class="text-success">Valide</small>`
            } else {
                document.getElementById('check-address').innerHTML = `<small class="text-danger">Ce champ doit contenir plus de 2 caractères.</small>`
            }
            /////// si tous les champs sont OK alors envoyer le POST
            if (regexEmail.test(email) && regexNodigit.test(firstname) && regexNodigit.test(name) && regexNodigit.test(city) && regexAddress.test(address)) {

                //créer l'array products et le remplir avec les id du cartContent
                var products = [];
                for (value of cartContent) {
                    value = JSON.parse(value)
                    products.push(value.id)
                }

                // créer l'object body contenant un objet contact et un array products
                var body = {
                    contact: {
                        "firstName": firstname,
                        "lastName": name,
                        "address": address,
                        "city": city,
                        "email": email
                    },
                    products
                }

                function status(response) { //vérifier que le backend répond avec un status 200
                    if (response.status >= 200 && response.status < 300) {
                        return Promise.resolve(response)
                    } else {
                        return Promise.reject(new Error(response.statusText))
                    }
                }

                function json(response) {
                    return response.json()
                }

                fetch("https://oc-p5-api.herokuapp.com/api/cameras/order", {
                        method: 'POST',
                        headers: {
                            'Content-type': 'application/json'
                        },
                        body: JSON.stringify(body)
                    })
                    .then(status)
                    .then(json)
                    .then(function (data) {
                        localStorage.removeItem("cartContent") //supprimer le cartContent du localStorage
                        window.location.href = "confirm.html?orderid=" + data.orderId //rediriger l'utilisateur vers la page confirm.html avec en parametre d'url l'orderid
                    }).catch(function (error) {
                        console.log('Request failed', error)
                    });
            }
        }
    })
})