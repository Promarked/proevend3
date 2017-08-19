/**
 * Created by Promarked on 26/07/2017.
 */
/*
 * Configuracion Angularjs a Server
 */

ngapp.config(function ($routeProvider, $httpProvider, $provide, $interpolateProvider, $locationProvider) {

    $routeProvider
        .when('/', {
            templateUrl: '../includes/content-view.htm',
            controller: 'MainController'
        })

        .otherwise({reditrectTo: "/"});

    $provide.factory('httpInterceptor', function ($q, $rootScope) {
        $rootScope.countRequests = 0;
        $rootScope.superload = true;
        return {
            'request': function (config) {
                console.log("Request");
                $rootScope.$broadcast('httpRequest', config);
                return config || $q.when(config);
            },
            'response': function (response) {
                console.log("Response");
                $rootScope.$broadcast('httpResponse', response);
                $rootScope.$broadcast('finishResponse');
                return response || $q.when(response);
            },
            'requestError': function (rejection) {
                console.log("RequestError");
                $rootScope.$broadcast('httpRequestError', rejection);
                $rootScope.$broadcast('finishResponse');
                return $q.reject(rejection);
            },
            'responseError': function (rejection) {
                console.log("ResponseError");
                $rootScope.$broadcast('httpResponseError', rejection);
                $rootScope.$broadcast('finishResponse');
                return $q.reject(rejection);
            }
        };
    });
    $httpProvider.interceptors.push('httpInterceptor');
});

ngapp.run(function ($routeParams, $rootScope, $http) {
    appFunctions($routeParams, $rootScope, $http);

    $rootScope.$on("$locationChangeStart", function (event, next, current) {
        $rootScope.$$page.config({
            title: "Dashboard"
        });


    });


});

/**Controladores*/
ngapp.controller('MainController', function ($scope, $routeParams, $http, $rootScope) {
    $scope.$broadcast("$locationChangeStart");
    $service = new Service($http,$rootScope);
    $service.setGateway("person", "person");

    $$menu.config([
        {
            label: "Dashboard", controller: "dashborad", link: "#!", icon: "fa fa-dashboard"
        },
        {
            label: "Personas", controller: "peaple", link: "#!/peaple", icon: "fa fa-users",
            sub: [
                {
                    label: "Agregar persona", controller: "peaple", action: function () {
                    $rootScope.$$modal.show();
                }, icon: "fa fa-user-plus"
                },
                {label: "Preinscritos", controller: "peaple", link: "#!/peaple/pre", icon: "fa fa-user-o"},
                {label: "Inscritos", controller: "peaple", link: "#!/peaple/pre", icon: "fa fa-user"}
            ]
        }
    ]);

    $$wait(function () {
        $("body").click();
    }, 0.5);
    $$submenu.add(
        "user",
        [
            {
                value: "Preferencias", icon: "fa fa-wrench", action: function () {
                $rootScope.$$modal.show();
            }
            },
            {
                value: "Cuentas", icon: "fa fa-user-circle-o", action: function () {
                var notify = $.notify('<strong>Saving</strong> Do not close this page...', {
                    allow_dismiss: false,
                    showProgressbar: true
                });

                setTimeout(function () {
                    notify.update({
                        'type': 'success',
                        'message': '<strong>Success</strong> Your page has been saved!',
                        'progress': 25
                    });
                }, 4500);
            }
            },
            {
                value: "Perfil", icon: "fa fa-user", action: function () {
                var notify = $.notify('<strong>Saving</strong> Do not close this page...', {
                    allow_dismiss: false,
                    showProgressbar: true
                });

                setTimeout(function () {
                    notify.update({
                        'type': 'success',
                        'message': '<strong>Success</strong> Your page has been saved!',
                        'progress': 25
                    });
                }, 4500);
            }
            },
            {
                value: "Cambiar contraseña", icon: "fa fa-key", action: function () {
                $rootScope.$$modal.show();
            }
            },
            {
                value: "Cerrar sesión", icon: "fa fa-sign-out", action: function () {
                console.log("-->Cerrar sesió");
            }
            }
        ], "Usuario"
    )
    $$submenu.add(
        "people",
        [
            {
                value: "Manuel De Orta",
                comment: "Se a unido a al VI Semiario de Prueba",
                date: "20 de junio",
                action: function () {
                    console.log("-->Configuracion de usuario");
                }
            }
        ], "Personas", "notify"
    )
    $$submenu.add(
        "news",
        [
            {
                value: "Nueva Actualizacion",
                comment: "Ahora encuentra nuevas caracteristicas que te pueden ayudar a recibir pagos.",
                date: "20 de junio",
                action: function () {
                    console.log("-->Configuracion de usuario");
                }
            }
        ], "Notificaciones", "notify"
    )

    $$form.add("person", preforms.person.fields, "Agregar persona", "Guardar", "Cancelar",function (data) {
        $service.create("person",data, function () {

        });
    });
    $$datatable.add("persons",[
        {name:"fullname",label:"Nombre Completo", width:200},
        {name:"identification",label:"Identificacion", width:100},
        {name:"ocupation",label:"Ocupacion", width:80},
        {name:"status",label:"Estado", width:80},
        {name:"date",label:"Fecha de creacion", width:80}
    ],"", {
        fullname:function (data) {
            return data.firstName + " " + data.lastName;
        }
    });

    $$datatable.setDatas("persons",[]);
    $service.setListView("person", $$datatable.get("person"));
    $$datatable.configMenu("persons",[
        {label:"Nuevo", icon:"fa fa-user-plus", nav:true,always:true,"action":function (obj) {
            $rootScope.$$modal.setForFm("person", {title:"Agregar Persona"});
            $rootScope.$$modal.resetForm();
            $rootScope.$$modal.show();
            return false;
        }},
        {label:"Editar", icon:"fa fa-pencil-square-o", nav:true,if:function (object, count) { return count==1 },"action":function (obj) {
            $.notify("Editar a <b>"+obj.firstName+' '+obj.lastName+' </b>');
        }},
        {label:"Borrar", icon:"fa fa-trash","action":function (obj) {
            $.notify("Borrar a <b>"+obj.firstName+' '+obj.lastName+' </b>');
        }},
        {label:"Copiar nombre completo",nav:true,if:function (object, count) { return count==1 }, icon:'fa fa-clipboard',
            action:function (obj) {
            var $temp = $("<input>")
            $("body").append($temp);
            $temp.val(obj.firstName+' '+obj.lastName).select();
            document.execCommand("copy");
            $temp.remove();
            $.notify("<b>"+obj.firstName+' '+obj.lastName+' </b> copiado en el portapapeles');
        }},
        {label:"Inscribir", icon:"fa fa-thumbs-o-up", nav:true, if:function (object, count) { return object.status=='Preinscrito' } ,"action":function (obj) {
            $.notify("Inscribir a <b>"+obj.firstName+' '+obj.lastName+' </b>');
            obj.status="Inscrito";
        }},
        {label:"Actualizar", icon:"fa fa-refresh", nav:true,always:true,"action":function (obj) {
            $.notify("Actualizar base de datos");
            return false;
        }},

    ]);

});