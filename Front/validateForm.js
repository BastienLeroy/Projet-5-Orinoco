let validateForm = {

    init: function(){
        console.log("validateForm");
        console.log(localStorage);

        const dataCommand = JSON.parse(localStorage.dataCommand);
        console.log("datacommand :", dataCommand);

        const congrat = document.querySelector(".validateContentCongrat");
        const infoID = document.querySelector(".infoID");
        const infoAdress = document.querySelector(".infoAdress");
        const infoMail = document.querySelector(".infoMail");
        const totalID = document.querySelector(".validateContentTotal");

        congrat.textContent = "Félicitations votre commande est validé sous le numero de commande : " + " " + dataCommand.orderId;
        infoID.textContent = "Récapitulatif de vos informations : " + dataCommand.contact.lastName + " " + dataCommand.contact.firstName;
        infoAdress.textContent =  "Votre colis sera livrée à l'adresse suivante : " + dataCommand.contact.address + " " + dataCommand.contact.city;
        infoMail.textContent = "Votre mail : " + dataCommand.contact.email;
        totalID.textContent = "Le montant de votre commande est de : " + localStorage.totalPrice + " €";

        localStorage.clear();

    }    

    
}

document.addEventListener('DOMContentLoaded', validateForm.init);