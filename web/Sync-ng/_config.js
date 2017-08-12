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

    $rootScope.$$menu.config([
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

    $rootScope.$$wait(function () {
        $("body").click();
    }, 0.5);
    $rootScope.$$submenu.add(
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
    $rootScope.$$submenu.add(
        "people",
        [
            {
                value: "Manuel De Orta",
                comment: "Se a unido a al VI Semiario de Prueba",
                date: "20 de junio",
                date: "20 de junio",
                action: function () {
                    console.log("-->Configuracion de usuario");
                }
            }
        ], "Personas", "notify"
    )
    $rootScope.$$submenu.add(
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

    $rootScope.$$form.add("modal", [
        {
            name: "pay", label: "Forma de Pago", value: "Efecty", type: "select", options: [
            "Consignacion",
            "Efectivo en el evento",
            "Invitacion"
        ]
        },
        {name: "firthname", label: "Nombres", value: "Manuel", type: "input", col: "2", "required":true},
        {name: "lastname", label: "Apellidos", value: "De Orta", type: "input", col: "2", "required":true},
        {name: "comments", label: "Reseña", value: "", type: "textarea"},
        {type: "date-range", start: "start", end: "end"},
        {name: "start", label: "Inicia", value: "", type: "date", "required":true},
        {name: "end", label: "Finaliza ", value: "", type: "date", "required":true},
        {
            name: "lotation",
            label: "Lugar",
            value: "",
            message: "Ciudad, Provincia, Pais",
            type: "autocomplete",
            options: $$data.cities,
            required:true,
            strict:true
        },
    ], "Agregar persona", "Guardar");
    $rootScope.$$datatable.add("persons",[
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
    $rootScope.$$datatable.setDatas("persons",[
        {id:1,firstName:"Manuel", lastName:"De Orta", identification:"104749283", ocupation:"Ingeniero de Sistemas",date:"10-03-2017", status:"Preinscrito"},
        {id:2,firstName:"Victor", lastName:"De Orta", identification:"698876786", ocupation:"Ingeniero Civil",date:"11-03-2017", status:"Inscrito"},
        {id:3,firstName:"Marly", lastName:"Melo", identification:"3242342", ocupation:"Esteticista",date:"11-03-2017", status:"Inscrito"},
        {id:5,firstName:"Valentina", lastName:"De Orta", identification:"587658", ocupation:"Psicologa",date:"12-03-2017", status:"Preinscrito"},
        {id:6,firstName:"Jorge", lastName:"Osorio", identification:"798987", ocupation:"Logistico",date:"20-03-2017", status:"Inscrito"},
        {id:8,firstName:"Clara", lastName:"Caraballo", identification:"546547", ocupation:"Ingeniero",date:"06-03-2017", status:"Preinscrito"},
        {id:9,firstName:"Leticia", lastName:"Cardenas", identification:"56657676", ocupation:"Medico General",date:"08-03-2017", status:"Asistente"},
        {id:11,firstName:"Maria", lastName:"Caraballo", identification:"76986987", ocupation:"Medico General",date:"01-03-2017", status:"Asistente"}
    ]);
    $rootScope.$$datatable.handleMenu("persons",function (object) {
        var menu = [
            {label:"Editar", "action":function (obj) {
                $.notify("Editar a <b>"+obj.firstName+' '+obj.lastName+' </b>');
            }},
            {label:"Copiar nombre completo", action:function (obj) {
                var $temp = $("<input>")
                $("body").append($temp);
                $temp.val(obj.firstName+' '+obj.lastName).select();
                document.execCommand("copy");
                $temp.remove();
                $.notify("<b>"+obj.firstName+' '+obj.lastName+' </b> copiado en el portapapeles');
            }}
        ];
        if(object.status =="Preinscrito"){
            object.status ="Inscrito";
            menu.push({label:"Convertir en asistente", action:function (obj) {
                $.notify("<b>"+obj.firstName+' '+obj.lastName+' </b> se convirtio en inscrito');
            }});
        }
        return menu;

    });
    $rootScope.$$datatable.configMenu("persons",[
        {label:"Editar", "action":function (obj) {
            $.notify("Editar a <b>"+obj.firstName+' '+obj.lastName+' </b>');
        }},
        {label:"Copiar nombre completo", action:function (obj) {
            var $temp = $("<input>")
            $("body").append($temp);
            $temp.val(obj.firstName+' '+obj.lastName).select();
            document.execCommand("copy");
            $temp.remove();
            $.notify("<b>"+obj.firstName+' '+obj.lastName+' </b> copiado en el portapapeles');
        }}
    ]);

});