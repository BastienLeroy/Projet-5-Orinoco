let counterCartDisplay = {
    init : function(){
        console.log("counterCartDisplay.js = ok")
        counterCartDisplay.setCounterCartDisplay();
    },
    setCounterCartDisplay: function(){
        //const dataCounter = JSON.parse(localStorage);
        const counterCart = document.querySelector(".counterCaddie");
        const cartCounter = localStorage.length;
        counterCart.textContent = cartCounter;
    },
    
}
document.addEventListener('DOMContentLoaded', counterCartDisplay.init);