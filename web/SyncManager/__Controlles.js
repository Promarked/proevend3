/**
 * Created by Promarked on 3/04/2017.
 */

app.controller('HomeController', function ($scope, $http, $rootScope) {
    $rootScope.current.controllerName = "Home";
    $rootScope.page.title = "Inico";
    $rootScope.page.subtitle = "Pagina inicial";

});

app.controller('EventListController', function ($scope, $http, $rootScope) {
    $rootScope.current.controllerName = "EventList";
    $rootScope.page.title = "Lista de Eventos";
    $rootScope.page.subtitle = "Lista de todos los eventos que puede ver";
    $rootScope.entity = "event";

    var modalSetting = function () {
        $rootScope.modal.title = "Crear Evento";
        $rootScope.modal.type = "form";
        $rootScope.modal.url = '../event.create';
        $rootScope.modal.fields = [
            {name: "name", label: "Nombre", type: "text"},
            {name: "comment", label: "Descripcion", type: "textarea"},
            {name: "start", label: "Fecha inicial", type: "date"},
            {name: "end", label: "Fecha final", type: "date"}  ,
            {name: "country", label: "Pais", type: "text"},
            {name: "province", label: "Departamento", type: "text"},
            {name: "city", label: "Ciudad", type: "text"},
            {name: "quota", label: "Cupo", type: "number"},
        ];
    }

    $rootScope.addModalConfig = function () {
        $rootScope.modal.form.data = {};
        modalSetting();
    }

    $rootScope.editModalConfig = function () {
        $rootScope.modal.form.data = $rootScope.data.getSelectedObj();
        modalSetting();
        console.log("Editar Elemento");
        $rootScope.modal.title = "Editar Evento";
        $rootScope.modal.type = "form";
        $rootScope.modal.url = '../event/' + $rootScope.modal.form.data.id + ".edit";
        console.log($rootScope.modal.form.data);
    }
    $rootScope.deleteModalConfig = function () {
        $rootScope.modal.form.data = $rootScope.data.getSelectedObj();
        $rootScope.modal.fields = [
            {
                name: "name",
                value: "<h2>" + $rootScope.modal.form.data.name + "</h2><p>¿Estas seguro que desea eliminar este evento?</p>",
                type: "html"
            }
        ];
        console.log("Eliminar Elemento");

        $rootScope.modal.title = "Eliminar Evento";
        $rootScope.modal.type = "form";

        $rootScope.modal.url='../event.delete';
        console.log($rootScope.modal.form.data);
    }

    $http.get("../event.json");
    $scope.data.onDbl = function (event) {
        $rootScope.current.event = event;
        window.location = "#!/event/" + event.id;
    }


    $rootScope.datatable.columns = [
        {"name": "name", "label": "Nombre"},
        {"name": "comment", "label": "Descripcion"},
        {"name": "start", "label": "Comienza"},
        {"name": "end", "label": "Termina"}
    ];
    $rootScope.datatable.icon = "fa fa-calendar";

    console.log("Event Controller");
});

app.controller('EventController', function ($scope, $routeParams, $http, $rootScope) {
    $rootScope.current.controllerName = "Event";
    $rootScope.page.title = "Evento #" + $routeParams.event;
    $rootScope.page.subtitle = "Evento especifico";


});

app.controller('SeccionController', function ($scope, $routeParams, $http, $rootScope) {
    $rootScope.current.controllerName = "ConfigEvent";
    $rootScope.current.controllerSubName = "Seccion";
    $rootScope.page.title = "Secciones"
    $rootScope.page.subtitle = "Evento especifico";
});

app.controller('TicketController', function ($scope, $routeParams, $http, $rootScope) {
    $rootScope.current.controllerName = "Ticket";
    $rootScope.page.title = "Tiquetes"
    $rootScope.page.subtitle = "Evento especifico";

    $scope.count = 0;
    $rootScope.datatable.columns = [
        {"name": "name", "label": "Nombre"},
        {"name": "comment", "label": "Descripcion"},
        {"name": "price", "label": "Precio"},
    ];
    $rootScope.datatable.icon = "fa fa-ticket";
    $rootScope.setSync = function (time) {
        if ($rootScope.current.event !== undefined && $scope.count == 0) {
            $scope.count = 1;
        }
        $http.get("../event/" + $rootScope.current.event.id + "/ticket.json");
    }

    $rootScope.setSync();
});

app.controller('SponsorController', function ($scope, $routeParams, $http, $rootScope) {
    $rootScope.current.controllerName = "Sponsor";
    $rootScope.page.title = "Patrocinadores"
    $rootScope.page.subtitle = "Entidades que patrocinan el evento";
});


app.controller('PeapleController', function ($scope, $routeParams, $http, $rootScope) {
    $rootScope.current.controllerName = "People";
    $rootScope.page.title = "Personas"
    $rootScope.page.subtitle = "Personas registradas a este evento";
    $scope.count = 0;
    $rootScope.setSync = function (time) {
        if ($rootScope.current.event !== undefined && $scope.count == 0) {
            console.log($rootScope.current.event.xfields);
            var opctions = [];
            $rootScope.current.event.xfields.push({
                "name": "ticket", "label": "Tiquete", "type": "select",
                "opctions": opctions
            });
            $rootScope.modal.fields = $rootScope.current.event.xfields;
            console.log($rootScope.modal.fields);
            $scope.count = 1;
        }

    }

});
app.controller('PeapleAssistantsController', function ($scope, $routeParams, $http, $rootScope) {
    $rootScope.current.controllerName = "People";
    $rootScope.current.controllerSubName = "Assistants";
    $rootScope.page.title = "Asistentes"
    $rootScope.page.subtitle = "Personas registradas a este evento inscritas que ya an asistido";
});
app.controller('PeaplePrescribedController', function ($scope, $routeParams, $http, $rootScope) {
    $rootScope.current.controllerName = "People";
    $rootScope.current.controllerSubName = "Prescribed";
    $rootScope.page.title = "Personas Preinscritas"
    $rootScope.page.subtitle = "Personas registradas a este evento que solo se ha preinscrito o pedido la solicitud de inscripcion";
});
app.controller('PeapleInscribedController', function ($scope, $routeParams, $http, $rootScope) {
    $rootScope.current.controllerName = "People";
    $rootScope.current.controllerSubName = "Inscribed";
    $rootScope.page.title = "Personas Inscritas"
    $rootScope.page.subtitle = "Personas registradas a este evento que ya se encuentra inscritas";
});


app.controller('UsersController', function ($scope, $routeParams, $http, $rootScope) {
    $rootScope.current.controllerName = "User";
    $rootScope.page.title = "Equipo de trabajo"
    $rootScope.page.subtitle = "Usuarios que administran el evento";
});

app.controller('DocumentListController', function ($scope, $routeParams, $http, $rootScope) {
    $rootScope.current.controllerName = "DocumentList";
    $rootScope.page.title = "Documentos"
    $rootScope.page.subtitle = "Modelos de documento para certificados y tiquetes";
});

app.controller('DocumentController', function ($scope, $routeParams, $http, $rootScope) {
    $rootScope.current.controllerName = "Document";
    $rootScope.page.title = "Editar Documento"
    $rootScope.page.subtitle = "";
});

app.controller('LandingPageListController', function ($scope, $routeParams, $http, $rootScope) {
    $rootScope.current.controllerName = "ConfigEvent";
    $rootScope.current.controllerSubName = "LandingPageList";
    $rootScope.page.title = "Landing Pages"
    $rootScope.page.subtitle = "Paginas de aterrisaje";
});

app.controller('ConfigEventController', function ($scope, $routeParams, $http, $rootScope) {
    $rootScope.current.controllerName = "ConfigEvent";
    $rootScope.page.title = "Configuracion del evento"
    $rootScope.page.subtitle = "Congigurar lo datos del evento";
});

app.controller('ConfigInscriptionsController', function ($scope, $routeParams, $http, $rootScope) {
    $rootScope.current.controllerName = "ConfigEvent";
    $rootScope.current.controllerSubName = "ConfigInscriptions";
    $rootScope.page.title = "Configuracion de Incricciones"
    $rootScope.page.subtitle = "Configurar sistema de inscripccion al evento";
});

