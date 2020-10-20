var countCartContent
setInterval(function(){
    if (localStorage.getItem("cartContent")) {
        var cartContent = JSON.parse(localStorage.getItem("cartContent"))
        countCartContent = cartContent.length
    }
    else {
        countCartContent = countCartContent
    }
    document.getElementById('counter').textContent = countCartContent
 }, 1000)