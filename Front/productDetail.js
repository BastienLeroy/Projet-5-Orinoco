let productDetail = {

    init: function(){
        productDetail.querySelector()
    },

    querySelector: function () {
        const detailProductImage = document.querySelector(".image");
        const detailProductTitle = document.querySelector(".title");
        const detailProductDescription = document.querySelector(".description");
        const detailProductPrice = document.querySelector(".price");
        const detailProductOptions = document.querySelector(".option");

        console.log("detailProductImage", detailProductImage);
        console.log("detailProductTitle", detailProductTitle);
        console.log("detailProductDescription", detailProductDescription);
        console.log("detailProductOptions", detailProductOptions);
        console.log("detailProductPrice", detailProductPrice);
    },

    onClickButtonCardList: function(event) {
        console.log('onClickButtonCardList event :', event.currentTarget.parentElement.dataset.id);
        const idProduct = event.currentTarget.parentElement.dataset.id;

        productDetail.fetchData(idProduct);
    },

    fetchData: function(id) {
        /*
        var myHeaders = new Headers();
        var myInit = {
            method: 'GET',
            headers: myHeaders,
            mode: 'cors',
            cache: 'default'
        };
        */

        const request = fetch('http://localhost:3000/api/cameras/'+id, {
                method: 'GET',
            })
                .then(response => {
                    console.log("coucou");
                    console.log(response);
                })

            /*
            request.then(response => {
                return response.json();
            })
            .then(jsonResponse => {
                console.log("jsonResponse :", jsonResponse);

                const lensesList = jsonResponse.lenses;
                
                for(let count = 0; count < lensesList.length; count ++) {
                    console.log("coucou2");
                    const optionItem = document.createElement("option");
                    optionItem.value = lensesList[count];
                    optionItem.textContent = lensesList[count];
                    detailProductOptions.appendChild(optionItem);
                }
            })
            */
    }
};

document.addEventListener('DOMContentLoaded', productDetail.init);