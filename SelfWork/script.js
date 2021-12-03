function promptName() {
    let value = prompt("Введи имя");
    while (value == ""){
        value = prompt("Сюда можно только с нормальным именем");
        while (value == " "){
            value = prompt("Чем думали твои родители когда тебя пробелом называли?!");
        }
        while (value == "  "){
            value = prompt("Мда.... Странный ты как-то!");
        }
        while(value == null){
            value = prompt("Схитрить решил?")
        }
    }
    

    document.getElementById("playerName").innerHTML = value;
};

document.addEventListener("DOMContentLoaded", promptName);

$(document).ready(function(){
    var body = $("body");
    body.fadeIn(600);
    $(document).on("click", "a:not([href^='#']):not([href^='tel']):not([href^='mailto'])", function(e) {
     e.preventDefault();
     $("body").fadeOut(600);
     var self = this;
     setTimeout(function () {
      window.location.href = $(self).attr("href");
     }, 600);
    });
   });

function goToMagicBall(){
    console.log("sdfsdf");
    document.location.href = "../SelfWork/Lab7/index.html";   
}
function goToCardsGame(){
    document.location.href = "../SelfWork/OCHKO/index.html";   
}
function goToBurglar(){
    document.location.href = "../SelfWork/WarCats/index.html";   
}
function goToSlots(){
    document.location.href = "../SelfWork/Slots/index.html";   
}