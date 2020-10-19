const urlParams = new URLSearchParams(window.location.search);
const orderid = urlParams.get('orderid')

$(function () {
    $("#orderid").text(orderid)
})