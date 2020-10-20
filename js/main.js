var countCartContent
setInterval(function(){ //mise à jour de l'icone chariot en fonction du nombre d'éléments dans le chariot
    if (localStorage.getItem("cartContent")) {
        var cartContent = JSON.parse(localStorage.getItem("cartContent"))
        countCartContent = cartContent.length
    }
    else {
        countCartContent = 0
    }
    document.getElementById('counter').textContent = countCartContent
 }, 1000)