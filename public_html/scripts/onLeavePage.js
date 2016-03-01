/*Prompt une alert en quittant une page*/

$(window).on("beforeunload", function () {
    return "Vous allez quitter la saisie de votre commande. êtes-vous sûr?";
});

$(document).ready(function () {
    $(".cancelUnload").on("click", function (e) {
        $(window).off("beforeunload");
        return true;
    });
    $("form").on("submit", function (e) {
        $(window).off("beforeunload");
        return true;
    });
});