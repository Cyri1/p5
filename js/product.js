const urlParams = new URLSearchParams(window.location.search);
const id = urlParams.get('id')

fetch("https://oc-p5-api.herokuapp.com/api/cameras/" + id)
    .then(response => response.json())
    .then(response => {
        $(".product-title").text(response.name)
        $(".product-price").text((response.price / 100).toFixed(2) + " €")
        $(".product-description").text(response.description)
        $(".product-img").attr("src", response.imageUrl)
        $.each(response.lenses, function (key, value) {
            $("#lenses").append(`<option value="` + value + `">` + value + `</option>`)
        })
    })
    .catch(error => console.log("Erreur : " + error))


$(function () {
    var cartContent = [];
    $("#add-to-cart").click(function () {

        if (localStorage.getItem("cartContent") !== null) { //si le panier contient quelque chose alors > le parser
            cartContent = JSON.parse(localStorage.getItem("cartContent"))
        }

        var selectedProduct = {
            'name': $("#title").text(),
            'lens': $("#lenses").val(),
            'price': $("#price").text()
        }

        cartContent.push(JSON.stringify(selectedProduct)) // ajoute un string JSON au tableau cartContent
        cartContent = JSON.stringify(cartContent) // stringifier le cartContent pour pouvoir le mettre dans le localstorage
        localStorage.setItem("cartContent", cartContent)

        $('#confirm-modal').modal('show') // popup de confirmation
    });
});