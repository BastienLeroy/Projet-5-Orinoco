let caddie = {
    
    init: function(){
        console.log("caddie.js : OK !");
        caddie.showCaddieProduct();
        
    },
 
    showCaddieProduct : function(){
        console.log("show ");
        console.log(localStorage);
        //faire querySelector du noeud (container)
        for (const [id, option] of Object.entries(localStorage)){
            console.log("id :", id);
            console.log("option :", option);



            //recuperer donnée corespondant à l'id via appel ajax (fetch)
            fetch('http://localhost:3000/api/cameras/'+id) 
            .then(res => {
                return res.json();
            })
            .then(response => {
                console.log(response);
                //créé dynamiquement affichage du produit (createElement)
                
                //inserer les données du produit dans les balises corespondantes ( appendChild)
            })

        }

    }
    //RECUPERER données sur localStorage et les affichés

};

document.addEventListener('DOMContentLoaded', caddie.init);