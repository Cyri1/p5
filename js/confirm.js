/**********************************JQUERY**********************************/
// const urlParams = new URLSearchParams(window.location.search);
// const orderid = urlParams.get('orderid')
// $(function () {
//     $("#orderid").text(orderid)
// })

/**********************************VANILLA JS**********************************/

const urlParams = new URLSearchParams(window.location.search);
const orderid = urlParams.get('orderid')

document.addEventListener('DOMContentLoaded', (event) => {
    document.getElementById('orderid').textContent = orderid
})