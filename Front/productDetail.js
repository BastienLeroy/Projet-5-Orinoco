let productDetail = {

    init: function(){
        console.log("productDetail.js : OK !");
        productDetail.getProductId();
    },

    getProductId: function() {
        const queryString = window.location.search; // Récupère tout ce qui se trouve à partir du caractère "?" dans une URL (www.monurl.com/produits?id=fd51fd1 donnera "?id=fd51fd1").
        const urlParams = new URLSearchParams(queryString); // Isole les paramètres et leur valeurs (exemple : www.monurl.com/produits?id=fd51fd1 donnera {"id": "fd51fd1"}.
        const productId = urlParams.get('id'); // Récupère la valeur du paramètre "id".

        productDetail.fetchData(productId);
    },

    fetchData: function(id) { //Selection de chaque div qui sera rempli par la suite
        const detailProductImage = document.querySelector(".image");
        const detailProductTitle = document.querySelector(".title");
        const detailProductDescription = document.querySelector(".description");
        const detailProductPrice = document.querySelector(".price");
        const detailProductOptions = document.querySelector(".option");
        const detailProductQuantity = document.querySelector(".qty");
        

        fetch('http://localhost:3000/api/cameras/'+id) // appel du array par fetch
            .then(res => {
                return res.json();
            })
            .then(response => {
                console.log("productDetail.js fetch response", response);
                const price = response.price.toString(10);
                const priceString = price.slice(0,(price.length-2));
                
                
                // Ajout des options dans le <select> 
                const optionsList = response.lenses;
                for(let count = 0; count < optionsList.length; count++) {
                    const optionItem = document.createElement("option");
                    optionItem.value = optionsList[count];
                    optionItem.textContent = optionsList[count];
                    detailProductOptions.appendChild(optionItem);

                }
                
                //permet de "remplir" les querySelectors (suite à la fonction fetchData)
                console.log("detailProductPrice :", detailProductTitle);
                detailProductImage.src=response.imageUrl;
                detailProductTitle.textContent=response.name;
                detailProductDescription.textContent=response.description;
                detailProductPrice.textContent=priceString + "€";
               
            });

        //Si je "click" sur button "ajouter au panier" viens modifier 0 par nombre d'article commander, et l'article est ajouter dans la page "caddie"
        let addCounterCart = document.querySelector(".addToCaddie");
        
        addCounterCart.addEventListener("click", function addToCart(e) {
            productDetail.setDataLocalStorage(id, detailProductOptions.value, detailProductQuantity.value);
            counterCartDisplay.setCounterCartDisplay();
        });
    },

    setDataLocalStorage: function(id, productOption, qty) {
        /*localStorage.setItem(`${id}`, `${productOption}`, `${qty}`);*/
        
        const localStorageValue = {
            productOption: productOption,
            quantity : qty,
            
        };
        localStorage.setItem(id, JSON.stringify(localStorageValue));
        console.log(localStorageValue.quantity)
    },
    
};

document.addEventListener('DOMContentLoaded', productDetail.init);