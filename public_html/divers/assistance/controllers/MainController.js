var assistControllers = angular.module('assistControllers', []);

assistControllers = assistApp.controller('MainController', ['$scope', function ($scope) {

        console.log("HOME CONTROLLER reporting for duty.");

        $scope.Categories = [
            {
                id: 'internet',
                name: 'Internet',
                icon: 'assistance-internet',
                cover: '../../images/Divers/Assistance/at/internet.jpg'
            },
            {
                id: 'telFixe/0',
                name: 'Téléphonie Fixe',
                icon: 'assistance-telephonie',
                cover: '../../images/Divers/Assistance/at/telephonie_fixe.jpg'
            },
            {
                id: 'television',
                name: 'Télévision',
                icon: 'assistance-television',
                cover: '../../images/Divers/Assistance/at/television.jpg'
            },
            {
                id: 'telMobile',
                name: 'Téléphonie mobile',
                icon: 'mobile-ico',
                cover: '../../images/Divers/Assistance/at/telephonie_mobile.jpg'
            },
            {
                id: 'mails',
                name: 'Emails',
                icon: 'internet-ico',
                cover: '../../images/Divers/Assistance/at/Mails.jpg'
            },
            {
                id: 'facture-consommation',
                name: 'Facture & consommation',
                icon: 'calculator-ico',
                cover: '../../images/Divers/Assistance/at/facturation.jpg'
            },
            {
                id: 'doc',
                name: 'Documents utiles',
                icon: 'document-ico',
                cover: '../../images/Divers/Assistance/at/docs_utiles.jpg'
            },
            {
                id: 'speed/0',
                name: 'Speed test',
                icon: 'document-ico',
                cover: '../../images/Divers/Assistance/at/docs_utiles.jpg'
            }
        ];
    }]);