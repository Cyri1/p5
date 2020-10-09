cartContent = JSON.parse(localStorage.getItem("cartContent"))
var totalPrice;

function sum() {
    totalPrice = 0;
    $(".price").each(function () {
        totalPrice = totalPrice + parseInt($(this).text());
    });
    $("#total").text(totalPrice.toFixed(2) + ' €')
    return
}


$(function () {
    if (Array.isArray(cartContent) && cartContent.length > 0) { // si cartContent est un tableau contenant des valeurs
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
        $('#empty-cart').remove() //supprime la ligne "votre panier est vide"
        $('#cart-list').append( //ajouter une ligne pour le total 
            `<tr>
            <td class="text-right" colspan="3"><strong>Total : </strong></td>
            <td id="total"></td>
            </tr>`)
        sum()
    }

    $(".remove").on('click', function (e) {
        $(this).closest("tr").remove();
        sum()
    });

});