app.controller('eventController', function ($scope, $http, $rootScope) {
    $rootScope.page.menu={
        items:[
            {label:"Inicio",link:"",icon:"fa fa-home"},
            {label:"Eventos",link:"event",icon:"fa fa-calendar"},
            {label:"Compañias",link:"company",icon:"fa fa-building"},
        ]
    };
    $rootScope.page.title = "Eventos";
    $rootScope.page.subtitle = "Todos los eventos a los que esta cuenta tiene acceso.";
    $rootScope.modal.set("form-add-event", "Nuevo Evento", "event.form.html", function () {

    });
    $rootScope.page.buttons = {
        "add": {
            "label": "Nuevo", "icon": "fa fa-plus", "click": function () {
                $("#modal").modal("show");
                $rootScope.modal.select("form-add-event");
            }
        }
    };

    $scope.numberSelect = 0;
    $http.get("event.json")
        .then(function (response) {
            $scope.objets = response.data.events;
            console.log($scope.objets);
            $rootScope.loadingHidden();
            $rootScope.selected.detailRealy = true;
            $rootScope.view.loadReady = true;
            $rootScope.loadingHidden();
        });
    $scope.actionSelected.on = function (item) {
        $rootScope.isSeletCurrent = true;
        $("[data-item].select").removeClass("select");
        $("[data-item=" + item + "]").addClass("select");
        var num = parseInt(item);
        var delay = setInterval(function () {
            if (!$scope.isDblClick) {

                var obj = $scope.objets[num];
                $rootScope.page.buttons.enter = {"label": "Ver", "icon": "fa fa-eye"};
                $rootScope.page.buttons.edit = {"label": "Editar", "icon": "fa fa-pencil-square-o"};
                $rootScope.page.buttons.delete = {"label": "Eliminar", "icon": "fa fa-trash-o"};
                $rootScope.selected.detailRealy = false;
                $(".vd_detail").addClass("show");
                $http.post("event/resume/" + obj.id + ".json")
                    .then(function (response) {
                        var object = response.data.event;
                        console.log(object);
                        var title = object.name;
                        var image = object.photo;
                        var fields = [
                            {"name": "Descripcion", "value": object.comment},
                            {"name": "Comienzo", "value": object.start, "class": "label label-primary"},
                            {"name": "Finalizacion", "value": object.end, "class": "label label-success"},
                            {"name": "Estado", "value": object.status, "class": "label label-info"},
                            {
                                "name": "Cupo",
                                "value": parseInt(object.quota),
                                "type": "progress",
                                "count": parseInt(10)
                            }
                        ];
                        $rootScope.setDetail(title, image, fields);
                        $rootScope.selected.detailRealy = true;
                        $rootScope.view.loadReady = true;
                        $rootScope.loadingHidden();
                        $rootScope.isSeletCurrent = false;
                    });
                if(delay)
                    clearInterval(delay);
            }
        }, 500);


    }

    $scope.actionSelected.onDbl = function (item) {
        $scope.isDblClick=true;
        var num = parseInt(item);
        var obj = $scope.objets[num];
        $rootScope.selected.detailRealy = false;
        window.location = "#!/event/" + obj.id;

        $scope.actionSelected.un();
        $(".vd_detail").removeClass("show");


    }
    $rootScope.actionSelected.unAfter = function () {
        delete $rootScope.page.buttons.enter;
        delete $rootScope.page.buttons.edit;
        delete $rootScope.page.buttons.delete;
    }


    console.log("Script Finalizado!");


});

app.controller('eventViewController', function ($scope, $routeParams, $http, $rootScope) {
    var id = $routeParams.id;
    $rootScope.page.menu={
        items:[
            {label:"Inicio",link:"",icon:"fa fa-home"},
            {label:"Personas",link:"",icon:"glyphicon glyphicon-user",
                subs:[
                    {label:"Preinscritos",link:"",icon:"fa fa-users"},
                    {label:"Inscritos",link:"",icon:"fa fa-address-book-o"},
                    {label:"Asistentes",link:"",icon:"fa fa-address-card"},
                ]
            },
            {label:"Patrocinadores",link:"",icon:"fa fa-handshake-o"},
            {label:"Registros",link:"",icon:"fa fa-history"},
            {label:"Analisis",link:"",icon:"fa fa-area-chart"},
            {label:"Eventos",link:"event",icon:"fa fa-calendar"},
            {label:"Compañias",link:"company",icon:"fa fa-building"},
        ]
    };
    $rootScope.page.buttons = [];
    $http.get("event/" + id + ".json")
        .then(function (response) {
            var event = response.data.event;
            $rootScope.page.title = event.name;
            $rootScope.page.subtitle = event.comment;
            $rootScope.selected.detailRealy = true;
            $rootScope.view.loadReady = true;
            $rootScope.loadingHidden();
        });

});