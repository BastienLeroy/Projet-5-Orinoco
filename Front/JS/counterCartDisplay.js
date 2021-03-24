let counterCartDisplay = {
    /* Fonction d'initialisation */
    init : function(){
        counterCartDisplay.setCounterCartDisplay();
    },
    setCounterCartDisplay: function(){ // Fonction de "comptage" pour le panier
        const counterCart = document.querySelector(".counterCaddie");

        if (localStorage.cart) {
            const localStorageCart = JSON.parse(localStorage.cart);
            console.log("counterCartDisplay localStorageCart :", localStorageCart);

            let counter = 0;
            
            for (const [key, value] of Object.entries(localStorageCart)) { //boucle for pour venir récupérer la quantité d'articles ajouté au panier
                counter += parseInt(value.quantity);
                counterCart.textContent = counter;
            }
        }
    }
}
document.addEventListener('DOMContentLoaded', counterCartDisplay.init);