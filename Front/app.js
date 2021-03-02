let app = {

    init: function() {
        app.requestProductList();
    },

    requestProductList: function() {
        let request = new XMLHttpRequest();
        request.onreadystatechange = function() {
            console.log(this.status);
            if (this.readyState == XMLHttpRequest.DONE && this.status == 200) {
                try {
                    var response = JSON.parse(this.response);
                    console.log("response :", response);

                    for(let counter = 0; counter < response.length; counter++) {
                        console.log(response[counter].description);
                        console.log(response[counter].imageUrl);
                        app.createItems(response[counter]._id, response[counter].imageUrl, response[counter].description);
                    }
                } 
                catch (error) {
                    console.log(error);
                }
            }
        };
        request.open("GET", "http://localhost:3000/api/cameras"); //ligne pour cibler la requete
        request.send();
    },

    createItems: function(id ,image, text) {
        const itemsCard = document.querySelector(".itemsContainer");
        const newItemsCard = document.createElement("div");
        newItemsCard.classList.add("itemCard");
        newItemsCard.dataset.id = id;

        //newItemsCard.innerHTML = 
        /*`<div class="itemCard" style="width: 18rem;">
            <div class="ItemCardImage">
                <img class="ItemCardImageContent-top" src="..." alt="Card image cap">
            </div>
            <div class="ItemCardContent">
                <h5 class="card-title">Card title</h5>
                <p class="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
                <a href="#" class="btn btn-primary">Go somewhere</a>
            </div>
        </div>`*/ 

        const newItemsCardContent = document.createElement("div");
        newItemsCardContent.classList.add("ItemCardContent");
    
        const insertText = document.createElement("p");
        insertText.textContent = text;
        
        const newItemsCardImage = document.createElement("div");
        newItemsCardImage.classList.add("ItemCardImage");
        
        const insertImage = document.createElement("img");
        insertImage.src = image;
        insertImage.classList.add("ItemCardImageContent");

        const linkButton = document.createElement("a");
        linkButton.href = "./produit.html";
    
        const button = document.createElement("button");
        button.classList.add("itemCardButton");
        button.addEventListener("click", productDetail.onClickButtonCardList);
        
        newItemsCardImage.appendChild(insertImage);
        newItemsCard.appendChild(newItemsCardImage);
        newItemsCardContent.appendChild(insertText);
        newItemsCard.appendChild(newItemsCardContent);
        linkButton.appendChild(button);
        newItemsCard.appendChild(linkButton);
        itemsCard.appendChild(newItemsCard);
    }
};

document.addEventListener('DOMContentLoaded', app.init);




