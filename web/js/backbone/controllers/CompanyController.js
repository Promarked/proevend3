app.controller('companyController', function ($scope, $http, $rootScope) {
    $rootScope.page.title= "Compa�ias";
    $rootScope.page.menu={
        items:[
            {label:"Inicio",link:"",icon:"fa fa-home"},
            {label:"Eventos",link:"event",icon:"fa fa-calendar"},
            {label:"Compa�ias",link:"company",icon:"fa fa-building"},
        ]
    };
    $http.post("company.json")
        .then(function (response) {
            $scope.objets = response.data.companys;
            console.log($scope.objets);
            $rootScope.selected.detailRealy = true;
            $rootScope.view.loadReady = true;
            $rootScope.loadingHidden();
        });
});