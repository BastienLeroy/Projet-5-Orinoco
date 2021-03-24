let caddie = {

    totalPrice: 0,
    
    init: function(){
        const testcart = caddie.showCaddieProduct();
        console.log("testcart", testcart.length);

        // Fonction du boutton vider le panier
        const deleteItem = document.querySelector(".deleteItems");
        deleteItem.addEventListener('click', caddie.clearCart);
        
        const button = document.querySelector('.btnBuy');
        button.addEventListener('click', caddie.validateInput);
    },
 
    showCaddieProduct : async function(){
        const caddiePrice = document.querySelector(".caddieContainerPrice");

        if (localStorage.cart) {
            const localStorageCart = JSON.parse(localStorage.cart);
        
            for await (const [id, detail] of Object.entries(localStorageCart)){

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
                        option : detail.productOption,
                        qty : detail.quantity,
                        price : priceFormat// Permet de recuperer la chaine de caractere de "l'element" 0  jusqu'au dernier -2

                    }
                    caddie.createItemCaddie(argumentCaddieItems);
                    caddie.totalPrice += (priceFormat*detail.quantity);
                    caddiePrice.textContent = caddie.totalPrice +"€";
                })
            };
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

        const insertQuantity = document.createElement("h4");
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
    
    validateInput : function() {
        
        const name = document.querySelector("#fisrtName");
        const lastname = document.querySelector("#lastName");
        const email = document.querySelector("#inputEmail4");
        const adress = document.querySelector("#inputAddress");
        const city = document.querySelector("#inputCity");
        const errorMessage = document.querySelector('#errorMessage');
        
        parsedCart = JSON.parse(localStorage.cart);
        const productIdToPost = Object.keys(parsedCart);
        const contactToPost = {};

        if (typeof name.value === "string" && name.value !== "") {
            contactToPost.firstName = name.value;
        } else {
            errorMessage.textContent ='Votre saisi du prénom est incorrect, veuillez la modifiez pour commander';
            validateInput.preventDefault();
        }

        if (typeof lastname.value === "string" && lastname.value !== "") {
            contactToPost.lastName = lastname.value;
        } else {
            errorMessage.textContent ='Votre saisi du nom est incorrect, veuillez la modifiez pour commander';
            validateInput.preventDefault();
        }

        if (typeof email.value === "string" && email.value !== "") {
            contactToPost.email = email.value;
        } else {
            errorMessage.textContent ='Votre saisi de l\'email est incorrect, veuillez la modifiez pour commander';
            validateInput.preventDefault();
        }

        if (typeof adress.value === "string" && adress.value !== "") {
            contactToPost.address = adress.value;
        } else {
            errorMessage.textContent ='Votre saisi de l\'adresse est incorrect, veuillez la modifiez pour commander';
            validateInput.preventDefault();
        }

        if (typeof city.value === "string" && city.value !== "") {
            contactToPost.city = city.value;
        } else {
            errorMessage.textContent ='Votre saisi de ville est incorrect, veuillez la modifiez pour commander';
            validateInput.preventDefault();
        }

        const dataToPost = {
            contact: contactToPost,
            products: productIdToPost
        };
        console.log(dataToPost);

        fetch("http://localhost:3000/api/cameras/order", {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(dataToPost),
        })
            .then(response => {
                return response.json();
            })
            .then(responseData => {
                localStorage.setItem("totalPrice", caddie.totalPrice);
                localStorage.setItem("dataCommand", JSON.stringify(responseData));
                window.location = "validation.html";
            })
            .catch(error => {
                console.log("error :", error);
            })
    },

    clearCart: function() {
        localStorage.clear();               
        const caddieContainerList = document.querySelector(".caddieContainerListItems");
        const caddieTotalPrice = document.querySelector(".caddieContainerPrice");
        caddieTotalPrice.textContent = '0 €, vous avez videz votre caddie !';

        while (caddieContainerList.firstChild) {
            caddieContainerList.removeChild(caddieContainerList.firstChild)
        }
    }
};

document.addEventListener('DOMContentLoaded', caddie.init);