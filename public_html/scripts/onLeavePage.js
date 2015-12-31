/*Prompt une alert en quittant une page*/

$(window).on("beforeunload", function () {
    return "Si vous quittez maintenant cette page, les données de votre commande seront perdues. êtes-vous sûr?";
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