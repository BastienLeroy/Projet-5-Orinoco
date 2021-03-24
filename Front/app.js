//Méthodes contenu dans un objet, initialiser une fois le DOM construit.
let app = {

    /* Fonction d'initialisation */
    init: async function() { 
        const productList = await app.requestProductList();
        app.createItems(productList);
    },
    
    //requete format dur (type cours openclassroom), appel de la requete pour récuperer les données du serveur
    requestProductList: async function() {
        return await fetch('http://localhost:3000/api/cameras') // appel du array par fetch
            .then(res => {
                return res.json();
            })
    },

    // Function permettant de créé des div ou éléments en dynamique
    createItems: function(productListData) {
        
        const itemsCard = document.querySelector(".itemsContainer");

        productListData.forEach(product => {
            
            const price = product.price.toString();

            const newItemsCard = document.createElement("div");
            newItemsCard.classList.add("itemCard");
            
            const newItemsCardContent = document.createElement("div");
            newItemsCardContent.classList.add("ItemCardContent");
        
            const insertText = document.createElement("h2");
            const insertText2 = document.createElement("h5");
            insertText.textContent = product.name;
            insertText2.textContent = `${price.slice(0, price.length - 2)}€`;
            
            const newItemsCardImage = document.createElement("div");
            newItemsCardImage.classList.add("ItemCardImage");
            
            const insertImage = document.createElement("img");
            insertImage.src = product.imageUrl;
            insertImage.classList.add("ItemCardImageContent");
                
            const linkButton = document.createElement("a");
            linkButton.href = "./produit.html?id="+product._id;
        
            const button = document.createElement("button");
            button.classList.add("itemCardButton");
            button.textContent = ("Voir Détail");
            
            newItemsCardImage.appendChild(insertImage); //cible l'endroit de la création de l'enfant
            newItemsCard.appendChild(newItemsCardImage);
            newItemsCardContent.appendChild(insertText);
            newItemsCardContent.appendChild(insertText2);
            newItemsCard.appendChild(newItemsCardContent);
            linkButton.appendChild(button);
            newItemsCardContent.appendChild(linkButton);
            itemsCard.appendChild(newItemsCard);
        });
    }
};

document.addEventListener('DOMContentLoaded', app.init);
