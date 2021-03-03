let productDetail = {

    init: function(){
        productDetail.getProductId()
    },

    getProductId: function() {
        const queryString = window.location.search; // Récupère tout ce qui se trouve à partir du caractère "?" dans une URL (www.monurl.com/produits?id=fd51fd1 donnera "?id=fd51fd1").
        const urlParams = new URLSearchParams(queryString); // Isole les paramètres et leur valeurs (exemple : www.monurl.com/produits?id=fd51fd1 donnera {"id": "fd51fd1"}.
        const productId = urlParams.get('id'); // Récupère la valeur du paramètre "id".

        productDetail.fetchData(productId);
    },

    fetchData: function(id) {
        const detailProductImage = document.querySelector(".image");
        const detailProductTitle = document.querySelector(".title");
        const detailProductDescription = document.querySelector(".description");
        const detailProductPrice = document.querySelector(".price");
        const detailProductOptions = document.querySelector(".option");

        fetch('http://localhost:3000/api/cameras/'+id)
            .then(res => {
                return res.json();
            })
            .then(response => {
                console.log("productDetailTest.js fetch response", response);

                // Ajout des options dans le <select> 
                const optionsList = response.lenses;
                for(let count = 0; count < optionsList.length; count++) {
                    const optionItem = document.createElement("option");
                    optionItem.value = optionsList[count];
                    optionItem.textContent = optionsList[count];
                    detailProductOptions.appendChild(optionItem);

                }
                //permet de "remplir" les querySelectors (suite à la fonction fetchData)
                console.log(detailProductPrice);
                detailProductImage.src=response.imageUrl;
                detailProductTitle.textContent=response.name;
                detailProductDescription.textContent=response.description;
                detailProductPrice.textContent=response.price;


                

            })
    }
};

document.addEventListener('DOMContentLoaded', productDetail.init);