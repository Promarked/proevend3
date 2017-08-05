/**
 * Created by Promarked on 26/07/2017.
 */
/*
 * Configuracion Angularjs a Server
 */

ngapp.config(function ($routeProvider, $httpProvider, $provide, $interpolateProvider, $locationProvider) {

    $routeProvider
        .when('/', {
            templateUrl: '../includes/data-view.htm',
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



    $rootScope.$$wait = function( callback, seconds){
        return window.setTimeout( callback, seconds * 1000 );
    };
    $rootScope.$page=function (data) {
        $rootScope.page=data;
    }

    $rootScope.$$form={
        data:{},
        $control:function (control) {
            if(control.type=="autocomplete"){
                var value = control.value;
                var results = [];
                var regExp = new RegExp(value);
                for(var i =0; i<control.options.length; i++){
                    var object = control.options[i];
                    if(regExp.test(object)) results.push($f.string.chaset.encode(object));

                }
                control.results = results;

                $rootScope.$digest();

            }
            if(control.value!="" && control.value != undefined){
                control.labelClass="noempty"
            }
            if(typeof control.required == 'function'){
                control.valid=control.required(control.value);
            }else if(control.required !=undefined){
                control.valid=control.required.test(control.value);
            }else{
                control.valid=true;
            }
        },
        add:function (name,controls, title, submit="Aceptar", cancel="Cancelar") {
            this.data[name]={
                name:name, controls:controls, title:title, submit:submit, cancel:cancel
            }
        },
        get:function (name) {
            return this.data[name];
        }

    }
    $(".content").click(function () {
        $rootScope.$$root.hideNofifymenu();
    });
    $rootScope.$f= $f;

    $rootScope.$$modal={
        show:function () {
            if(!this.is()) $("#modal_button").click();
        },
        hide:function () {
            if(this.is()) $("#modal_button").click();
        },
        is:function () {
            return $("body").hasClass("modal-open");
        },
        toggle:function () {
            if(this.is())
                this.hide();
            else this.show();
        }
    }
    $rootScope.$$menu={
        data:{},
        select:function (index) {
            if(index!=undefined){
                if(index!=this.data.selected){
                    this.data.selected=index;
                    this.data.menuheigth= $("#menu-"+index).children("ul").height();
                }else{
                    this.data.selected=null;
                }
            }
            return this.data.selected;
        },
        config: function (menu) {
            if(menu!=undefined){
                this.data.menu=menu;
            }

            return this.data.menu;
        }
    }
    $rootScope.$$root={
        /*Sub menu Functions*/
        toggleSubmenu:function () {
            if(this.isSubmenu())this.hideSubmenu();
            else this.showSubmenu()
        },
        isSubmenu:function () {
            return $("body").hasClass("submenu");
        },
        showSubmenu:function () {
            $("body").addClass("submenu");
        },
        hideSubmenu:function () {
            $("body").removeClass("submenu");
        },

        /*Nav menu Functions*/
        toggleNavmenu:function () {
            if(this.isNavmenu())this.hideNavmenu();
            else this.showNavmenu()
        },
        isNavmenu:function () {
            return !$("body").hasClass("nav-left-hide");
        },
        showNavmenu:function () {
            $("body").removeClass("nav-left-hide");
        },
        hideNavmenu:function () {
            $("body").addClass("nav-left-hide");
        },

        /*Nofify menu Functions*/
        toggleNofifymenu:function () {
            if(this.isNofifymenu())this.hideNofifymenu();
            else this.showNofifymenu();
        },
        isNofifymenu:function () {
            return $(".notify-col").height()>1;
        },
        showNofifymenu:function () {
            $(".notify-col").height($(".notify-pane").height()+20);
            $("body").addClass("submenu-sub");

        },
        hideNofifymenu:function () {
            $(".notify-col").height(1);
            $(".mega-li.current").removeClass("current");
            $("body").removeClass("submenu-sub");
        },

        /*values current locals Function*/
        current:function (value) {
            if(value == "height")
                return $(window).height();
            else if(value == "width")
                return $(window).width();
        }
    }

    $rootScope.$$submenu={
        configs:[],
        data:{},
        add:function (name, items, title, mode) {
            this.configs[name]={
                name:name,items:items,title:title,mode:mode
            };
        },
        setup:function (name) {
            if($rootScope.$$root.isNofifymenu() && name == this.name){
                $rootScope.$$root.hideNofifymenu();
            }else{
                this.name = name;
                $(".mega-li.current").removeClass("current");
                $("#top-menu-"+name).addClass("current");
                this.items = this.configs[name].items;
                this.title = this.configs[name].title;
                this.mode = this.configs[name].mode;
                $rootScope.$$wait( function(){ $rootScope.$$root.showNofifymenu();}, 0.05);
            }
        },
        title:"",mode:"",
        items:[]
    }

    $rootScope.$on("$locationChangeStart", function (event, next, current) {
        $rootScope.$page({
            title:"Dashboard - Proevend"
        });
        $rootScope.$$menu.config([
            {
                label:"Dashboard", controller:"dashborad", link:"#!", icon:"fa fa-dashboard"
            },
            {
                label:"Personas", controller:"peaple", link:"#!/peaple" , icon:"fa fa-users",
                sub:[
                    {label: "Preinscritos", controller:"peaple", action:function () {
                        $rootScope.$$modal.show();
                    }, icon:"fa fa-user-plus"},
                    {label: "Preinscritos", controller:"peaple", link:"#!/peaple/pre", icon:"fa fa-user-o"},
                    {label: "Inscritos", controller:"peaple", link:"#!/peaple/pre", icon:"fa fa-user"}
                ]
            }
        ]);




    });



});

/**Controladores*/
ngapp.controller('MainController', function ($scope, $routeParams, $http, $rootScope) {
    $scope.$broadcast("$locationChangeStart");
    $rootScope.$$wait(function () {
        $("body").click();
    }, 0.5);
    $rootScope.$$submenu.add(
        "user",
        [
            {value:"Preferencias", icon:"fa fa-wrench", action:function () {
                $rootScope.$$modal.show();
            }},
            {value:"Cuentas", icon:"fa fa-user-circle-o", action:function () {
                var notify = $.notify('<strong>Saving</strong> Do not close this page...', {
                    allow_dismiss: false,
                    showProgressbar: true
                });

                setTimeout(function() {
                    notify.update({'type': 'success', 'message': '<strong>Success</strong> Your page has been saved!', 'progress': 25});
                }, 4500);
            }},
            {value:"Perfil", icon:"fa fa-user", action:function () {
                var notify = $.notify('<strong>Saving</strong> Do not close this page...', {
                    allow_dismiss: false,
                    showProgressbar: true
                });

                setTimeout(function() {
                    notify.update({'type': 'success', 'message': '<strong>Success</strong> Your page has been saved!', 'progress': 25});
                }, 4500);
            }},
            {value:"Cambiar contraseña", icon:"fa fa-key", action:function () {
                $rootScope.$$modal.show();
            }},
            {value:"Cerrar sesion", icon:"fa fa-sign-out", action:function () {
                console.log("-->Cerrar sesion");
            }}
        ],"Usuario"
    )
    $rootScope.$$submenu.add(
        "people",
        [
            {value:"Manuel De Orta", comment:"Se a unido a al VI Semiario de Prueba", date:"20 de junio", date:"20 de junio", action:function () {
                console.log("-->Configuracion de usuario");
            }}
        ],"Personas", "notify"
    )
    $rootScope.$$submenu.add(
        "news",
        [
            {value:"Nueva Actualizacion", comment:"Ahora encuentra nuevas caracteristicas que te pueden ayudar a recibir pagos.", date:"20 de junio", action:function () {
                console.log("-->Configuracion de usuario");
            }}
        ],"Notificaciones", "notify"
    )

    $rootScope.$$form.add("modal",[
        {name:"pay",label:"Pago",value:"Efecty", type:"select", options:[
            "Consignacion",
            "Efectivo en el evento",
            {value:"inv", label:"Invitacion"}
        ]},
        {name:"firthname",label:"Nombres",value:"Manuel", type:"input" , col:"2"},
        {name:"lastname",label:"Apellidos",value:"De Orta", type:"input", col:"2"},
        {name:"comments",label:"Reseña",value:"", type:"textarea"},
        {type:"date-range", start:"start", end:"end"},
        {name:"start",label:"Inicia",value:"", type:"date"},
        {name:"end",label:"Finaliza ",value:"", type:"date"},
        {name:"lotation",label:"Localizacion",value:"", message:"Pais, Provincia, Ciudad", type:"autocomplete",
            options:$$data.cities
        },
    ],"Agregar persona","Guardar");

});