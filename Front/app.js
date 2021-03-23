//Méthodes contenu dans un objet, initialiser une fois le DOM construit.
let app = {

    /* Fonction d'initialisation */
    init: function() { 
        app.requestProductList();
    },
    
    //requete format dur (type cours openclassroom), appel de la requete pour récuperer les données du serveur
    requestProductList: function() {
        let request = new XMLHttpRequest();
        request.onreadystatechange = function() {

            if (this.readyState == XMLHttpRequest.DONE && this.status == 200) {
                try {
                    
                    var response = JSON.parse(this.response);
                    response.forEach(res => {
                        const price = res.price.toString(10);
                        const argumentCreateItems = {
                            id: res._id,
                            urlImg: res.imageUrl,
                            title: res.name,
                            price: price.slice(0,(price.length-2))
                        };
                        app.createItems(argumentCreateItems);
                    })
                }
                catch (error) {
                    console.log(error);
                }
            }
        };
        request.open("GET", "http://localhost:3000/api/cameras"); //cible la requete
        request.send();
    },

    // Function permettant de créé des div ou éléments en dynamique
    createItems: function({ id, urlImg, title, price }) {
        const itemsCard = document.querySelector(".itemsContainer");
        const newItemsCard = document.createElement("div");
        newItemsCard.classList.add("itemCard");
        
        const newItemsCardContent = document.createElement("div");
        newItemsCardContent.classList.add("ItemCardContent");
      
        const insertText = document.createElement("h2");
        const insertText2 = document.createElement("h5");
        insertText.textContent = title;
        insertText2.textContent = price + "€";
        
        const newItemsCardImage = document.createElement("div");
        newItemsCardImage.classList.add("ItemCardImage");
        
        const insertImage = document.createElement("img");
        insertImage.src = urlImg;
        insertImage.classList.add("ItemCardImageContent");
               
        const linkButton = document.createElement("a");
        linkButton.href = "./produit.html?id="+id;
    
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
    }
};

document.addEventListener('DOMContentLoaded', app.init);
