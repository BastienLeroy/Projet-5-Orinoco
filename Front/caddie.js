let caddie = {
    
    init: function(){
        console.log("caddie.js : OK !");
        caddie.showCaddieProduct();

        // Fonction du boutton vider le panier
        const deleteItem = document.querySelector(".deleteItems");
        deleteItem.addEventListener('click', function(){
            localStorage.clear();
            console.log("click");
            
            const caddieContainerList = document.querySelector(".caddieContainerListItems");
            console.log(caddieContainerList.firstChild);

            const caddieTotalPrice = document.querySelector(".caddieContainerPrice");
            caddieTotalPrice.textContent = '0';

            while (caddieContainerList.firstChild) {
                caddieContainerList.removeChild(caddieContainerList.firstChild)
            }
        });
        

        /*
        const testLocalStorageValue = JSON.parse(localStorage.panierTest);
        console.log("testLocalStorageValue :", testLocalStorageValue);
        */
    },
 
    showCaddieProduct : function(){
        //console.log("show");
        //console.log("localStorage :", localStorage);
        const caddiePrice = document.querySelector(".caddieContainerPrice");
        let totalPrice = 0;
        
        
        
        for (const [id, options] of Object.entries(localStorage)){
            //console.log("id :", id);
            //console.log("option :", options);

            const optionsObject = JSON.parse(options);
            //console.log("optionsObject :", optionsObject);


            
            /* Recuperer donnée corespondant à l'id via appel ajax (fetch) */
            fetch(`http://localhost:3000/api/cameras/${id}`) 
            .then(res => {
                return res.json();
            })
            .then(response => {
                const price = response.price.toString(10);// Permet de modifier le number en string
                const priceFormat = price.slice(0,(price.length-2));// Permet de recuperer la chaine de caractere de "l'element" 0  jusqu'au dernier -2

                const argumentCaddieItems = {
                    name : response.name,
                    description : response.description,
                    urlImage : response.imageUrl,
                    option : optionsObject.productOption,
                    qty : optionsObject.quantity,
                    price : priceFormat// Permet de recuperer la chaine de caractere de "l'element" 0  jusqu'au dernier -2

                }
                caddie.createItemCaddie(argumentCaddieItems);
                totalPrice += (priceFormat*optionsObject.quantity);
                //console.log(totalPrice);
                caddiePrice.textContent = totalPrice +"€";
            })
        }
        
    },
    

    createItemCaddie: function({ name, description, urlImage, option, qty, price }) {
        // Appellation dynamique pour les contenant qui récupère les données de "response"
        const cardCaddie = document.querySelector(".caddieContainerListItems");

        const newCardCaddie = document.createElement("div");
        newCardCaddie.classList.add("caddieCard");

        const newcaddieCardContent = document.createElement("div");
        newcaddieCardContent.classList.add("caddieCardContent");

        const insertText = document.createElement("h3");
        insertText.textContent = name;

        const insertDescription = document.createElement("h5");
        insertDescription.textContent = description;

        const insertOption = document.createElement("h5");
        insertOption.textContent = option;

        const insertQuantity = document.createElement("h5");
        insertQuantity.textContent = qty;

        const insertPrice = document.createElement("caddieCardContentPrice");
        insertPrice.textContent = (price*qty) +"€";

        const newcaddieCardImage = document.createElement("div");
        newcaddieCardImage.classList.add("caddieCardImage");

        const insertImage = document.createElement("img");
        insertImage.src = urlImage;
        insertImage.classList.add("caddieCardImageContent");

        // Création dynamique des contenant qui récupère les données de "response"
        newcaddieCardImage.appendChild(insertImage);

        /* Container qui contient la balise h4 et la div ".caddieCardImage" (contenant la balise img ".caddieCardImageContent") */
        newcaddieCardContent.appendChild(insertText);
        newcaddieCardContent.appendChild(insertDescription);
        newcaddieCardContent.appendChild(insertOption);
        newcaddieCardContent.appendChild(insertQuantity);
        newcaddieCardContent.appendChild(insertPrice);
        
        /* Contient l'ensemble des données d'un produit du panier */
        newCardCaddie.appendChild(newcaddieCardContent);
        newCardCaddie.appendChild(newcaddieCardImage);

        /* Insère l'item représentant un produit du panier dans le container qui contient tout les élements du panier */
        cardCaddie.appendChild(newCardCaddie);
    },
                    
};

document.addEventListener('DOMContentLoaded', caddie.init);