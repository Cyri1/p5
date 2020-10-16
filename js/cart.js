var cartContent = JSON.parse(localStorage.getItem("cartContent"))
var totalPrice;

function sum() { // calcule le prix total
    totalPrice = 0;
    $(".price").each(function () {
        totalPrice = totalPrice + parseInt($(this).text())
    })
    $("#total, #confirm-total").text(totalPrice.toFixed(2) + ' €')
    return
}


$(function () { // au chargement de la page
    if (Array.isArray(cartContent) && cartContent.length > 0) { // si cartContent est un tableau contenant des valeurs
        $('#empty-cart').remove() //supprime la ligne "votre panier est vide"
        for (var value of cartContent) { //alors pour chaque ligne du cartContent ajouter une nouvelle ligne au tableau avec les infos du produit
            value = JSON.parse(value)
            $('#cart-list').append(
                `<tr>
            <td><button class="btn btn-sm btn-outline-danger remove">X</button></td>
            <td>` + value.name + `</td>
            <td>` + value.lens + `</td>
            <td class="price">` + value.price + `</td>
            </tr>`)
        }
        $('#cart-list').append( //ajouter une ligne pour le total 
            `<tr>
            <td class="text-right" colspan="3"><strong>Total : </strong></td>
            <td id="total"></td>
            </tr>`)
        sum() //calculer le prix total
    }

    $(".remove").on('click', function (e) {
        var row = $(this).closest("tr") //ligne cliquée
        var rowIndex = $(row).index() //sauvegarder l'index de la ligne cliquée
        $(row).remove(); //supprimer la ligne du DOM
        cartContent.splice(rowIndex, 1) //supprime la ligne du tableau cartContent
        localStorage.setItem("cartContent", JSON.stringify(cartContent)) //mettre à jour le localStorage
        sum() //mettre à jour le prix total
    })

    $("#submit-order").on('click', function (e) {
        // vérfier chaque champs avant d'envoyer le formulaire
        var email = $("#email").val()
        var firstname = $("#firstname").val()
        var name = $("#name").val()
        var city = $("#city").val()
        var address = $("#address").val()

        if (/^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/.test(email)) {
            $("#check-email").html(`<small class="text-success">Valide</small>`)
        } else {
            $("#check-email").html(`<small class="text-danger">Ce champ ne doit contenir ni caractères spéciaux autre que "-", "_", ".", ni majuscules, ni accents.</small>`)
        }

        if (/^[^0-9]{2,}$/.test(firstname)) {
            $("#check-firstname").html(`<small class="text-success">Valide</small>`)
        } else {
            $("#check-firstname").html(`<small class="text-danger">Ce champ ne doit pas contenir de chiffres et contenir plus de 2 caractères.</small>`)
        }

        if (/^[^0-9]{2,}$/.test(name)) {
            $("#check-name").html(`<small class="text-success">Valide</small>`)
        } else {
            $("#check-name").html(`<small class="text-danger">Ce champ ne doit pas contenir de chiffres et contenir plus de 2 caractères.</small>`)
        }

        if (/^[^0-9]{2,}$/.test(city)) {
            $("#check-city").html(`<small class="text-success">Valide</small>`)
        } else {
            $("#check-city").html(`<small class="text-danger">Ce champ ne doit pas contenir de chiffres et contenir plus de 2 caractères.</small>`)
        }

        if (/^[^%]{2,}$/.test(address)) {
            $("#check-address").html(`<small class="text-success">Valide</small>`)
        } else {
            $("#check-address").html(`<small class="text-danger">Ce champ doit contenir plus de 2 caractères.</small>`)
        }

        /////// si tous les champs sont OK alors envoyer le POST
        if (/^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/.test(email) && /^[^0-9]{2,}$/.test(firstname) && /^[^0-9]{2,}$/.test(name) && /^[^0-9]{2,}$/.test(city) && /^[^%]{2,}$/.test(address)) {

            // créer l'object contact 
            var body = {
                contact: {
                    "firstName": firstname,
                    "lastName": name,
                    "address": address,
                    "city": city,
                    "email": email
                },
                products: [
                    "5be1ed3f1c9d44000030b061"
                ]
            }
            console.log(body)
            // créer l'object contact 
            fetch("https://oc-p5-api.herokuapp.com/api/cameras/order", {
                method: 'POST',
                body: JSON.stringify(body)
            }).then(function (response) {
                console.log(response)
            })

        }
    })
})