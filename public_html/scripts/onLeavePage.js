/*Prompt une alert en quittant une page*/

$(window).on("beforeunload", function () {
    return "Si vous retournez en arrière, les données de votre commande seront perdues.";
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