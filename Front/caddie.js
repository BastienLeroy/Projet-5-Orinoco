let caddie = {
    
    init: function(){
        console.log("caddie.js : OK !");
        caddie.setCounterCartDisplay();
    },

    setCounterCartDisplay: function(){
        const counterCart = document.querySelector(".counterCaddie");
        const cartCounter = localStorage.length;
        counterCart.textContent = cartCounter;
    },
    
//partie "back"
    //ajoute au caddie les article selectionné

    //faire total des article avec une fonction qui deffinira le "price" de l'"id " et ajoutera si plusieurs

//partie client
    //selection de chaque input du form avec querySelector

    //utiliser local storage pour"enregistrer les données utilisateur avec windows.sessionStorage 
};

document.addEventListener('DOMContentLoaded', caddie.init);