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
    $(".content").click(function () {
        $rootScope.$$root.hideNofifymenu();
    });

    $rootScope.$$wait = function (callback, seconds) {
        return window.setTimeout(callback, seconds * 1000);
    };

    $rootScope.$page = function (data) {
        $rootScope.page = data;
    }

    $rootScope.$$form = {
        data: {},
        $updateSelect: function (control, option) {
            console.log(">> Update Select v");
            console.log(control);
            console.log(option);
            if(control.type=="select"){
                control.value = option.value;
                control.valueLabel = option.label;
            }
        },
        $control: function (control, value, action) {
            if (control.type == "date") {
                control.valid=false;
                control.class="";
                if((control.value==undefined || control.value=="")){
                    if(/blur/.test(action) && control.required){
                        control.class="value-invalid";
                    }else{
                        control.valid=true;
                    }
                }else{
                    control.valid=true;
                }
            }

            if (control.type == "select") {
                if (value != undefined) control.valueLabel = value;
                control.valid=false;
                control.class="";
                var isExact = false;
                if((control.valueLabel==undefined || control.valueLabel=="")){
                    if(/blur/.test(action) && control.required){
                        control.class="value-invalid";
                    }else{
                        control.valid=true;
                        control.results = control.options;
                    }
                }else{
                    var find = control.valueLabel.replace("  ", " ").cleanAccents();
                    find = find.replace(/,|\s/, "(.)*");
                    var results = [], isExact = false, regExp = new RegExp(find, 'gi');
                    for (var i = 0; i < control.options.length; i++) {
                        var object = control.options[i];
                        if (regExp.test(object.label.cleanAccents())) results.push(object);
                        if (control.valueLabel == object.label) {
                            isExact = true;
                            control.value= object.value;
                            control.valid=true;
                            break;
                        }
                    }
                    if(!isExact){
                        if(/blur/.test(action)){
                            control.class ="value-invalid";
                        }else{
                            if(results.length>0){
                                control.results = results;
                            }else{
                                control.class ="value-invalid";
                                control.results = control.options;
                            }
                        }
                    }else{
                        control.valid=true;
                    }
                }
            }

            if (control.type == "autocomplete") {
                if(value!=undefined) control.value = value;
                control.class="";
                var value = control.value.replace("  ", " ").cleanAccents();
                value = control.value.replace(/,|\s/, "(.)*");
                var results = [], isExact=false;
                var regExp = new RegExp(value, 'gi');
                for (var i = 0; i < control.options.length; i++) {
                    var object = control.options[i];
                    if (regExp.test(object.cleanAccents())) results.push(object);

                    if (control.value == object) {
                        isExact= true;
                        results = [];
                        break;
                    }
                }
                control.results = results;

                if(control.value!=undefined && control.value!=""){
                    if(control.strict){
                        if(isExact){
                            control.results = [];
                            control.valid=true;
                        }else{
                            if(/blur/.test(action))
                                control.class="value-invalid";
                            control.valid=false;
                        }
                    }else{
                        if(control.pattern!=undefined){
                            if(control.pattern.test(control.value)){
                                control.results = results;
                                control.valid=true;
                            }else{
                                if(/blur/.test(action)){
                                    control.class="value-invalid";
                                }
                                control.valid=false;
                            }
                        }
                    }
                }else{
                    if(/blur/.test(action)){
                        if(control.required){
                            control.results = control.option;
                            control.class="value-invalid";
                            control.valid=false;
                        }else{
                            control.valid=true;
                        }
                    }
                }

            }

            if (control.type == "input" || control.type == "text"  || control.type == "textarea"  ) {
                control.valid=false;
                control.class="";
                if(control.required){
                    if(control.pattern)
                        if(control.pattern.test(control.value)){
                            control.class="value-invalid";
                            control.valid=false;
                        }

                    if((control.value==undefined || control.value==""))
                        if(/blur/.test(action) && control.required) control.class="value-invalid";
                        else control.valid=true;
                    else
                        if(control.pattern!=undefined )
                            if(control.pattern.test(value)) control.valid=true;
                            else control.class="value-invalid";
                        else control.valid=true;
                }
            }

            /*if (control.type == "date" ) {
                if(control.required){
                    if(control.pattern){
                        if(control.pattern.test(control.value)){
                            control.class="value-invalid";
                            control.valid=false;
                        }
                    }
                    if(action=="blur" && (control.value=="" || control.value==undefined )){
                        control.class="value-invalid";
                        control.valid=false;
                    }else{
                        control.class="";
                        control.valid=true;
                    }
                }
            }*/


        },
        add: function (name, controls, title, submit, cancel) {
            $f.defaultValue(submit, "Aceptar");
            $f.defaultValue(cancel, "Cancelar");
            for (var i = 0 ; i < controls.length; i++){
                var control = controls[i];
                if(control.type=="select"){
                    console.log(">>> Select Encontrado <<");
                    for (var j =0; j < control.options.length ; j++){
                        var option = control.options[j];
                        console.log(">option >"+typeof option);
                        if(typeof option =='string' ){
                            var newOption = {value: option, label:option}
                            controls[i].options[j]= newOption;
                        }
                    }
                }
            }

            this.data[name] = {
                name: name, controls: controls, title: title, submit: submit, cancel: cancel
            }
        },
        get: function (name) {
            return this.data[name];
        }

    }

    $rootScope.$f = $f;

    $rootScope.$$modal = {
        show: function () {
            if (!this.is()) $("#modal_button").click();
        },
        hide: function () {
            if (this.is()) $("#modal_button").click();
        },
        is: function () {
            return $("body").hasClass("modal-open");
        },
        toggle: function () {
            if (this.is())
                this.hide();
            else this.show();
        }
    }

    $rootScope.$$menu = {
        data: {},
        select: function (index) {
            if (index != undefined) {
                if (index != this.data.selected) {
                    this.data.selected = index;
                    this.data.menuheigth = $("#menu-" + index).children("ul").height();
                    $("#menu-" + index).removeClass("closed");
                } else {
                    this.data.selected = null;
                    $("#menu-" + index).addClass("closed");
                }
            }
            return this.data.selected;
        },
        config: function (menu) {
            if (menu != undefined) {
                this.data.menu = menu;
            }

            return this.data.menu;
        }
    }

    $rootScope.$$root = {
        /*Sub menu Functions*/
        toggleSubmenu: function () {
            if (this.isSubmenu())this.hideSubmenu();
            else this.showSubmenu()
        },
        isSubmenu: function () {
            return $("body").hasClass("submenu");
        },
        showSubmenu: function () {
            $("body").addClass("submenu");
        },
        hideSubmenu: function () {
            $("body").removeClass("submenu");
        },

        /*Nav menu Functions*/
        toggleNavmenu: function () {
            if (this.isNavmenu())this.hideNavmenu();
            else this.showNavmenu()
        },
        isNavmenu: function () {
            return !$("body").hasClass("nav-left-hide");
        },
        showNavmenu: function () {
            $("body").removeClass("nav-left-hide");
        },
        hideNavmenu: function () {
            $("body").addClass("nav-left-hide");
        },

        /*Nofify menu Functions*/
        toggleNofifymenu: function () {
            if (this.isNofifymenu())this.hideNofifymenu();
            else this.showNofifymenu();
        },
        isNofifymenu: function () {
            return $(".notify-col").height() > 1;
        },
        showNofifymenu: function () {
            $(".notify-col").height($(".notify-pane").height() + 20);
            $("body").addClass("submenu-sub");

        },
        hideNofifymenu: function () {
            $(".notify-col").height(1);
            $(".mega-li.current").removeClass("current");
            $("body").removeClass("submenu-sub");
        },

        /*values current locals Function*/
        current: function (value) {
            if (value == "height")
                return $(window).height();
            else if (value == "width")
                return $(window).width();
        }
    }

    $rootScope.$$submenu = {
        configs: [],
        data: {},
        add: function (name, items, title, mode) {
            this.configs[name] = {
                name: name, items: items, title: title, mode: mode
            };
        },
        setup: function (name) {
            if ($rootScope.$$root.isNofifymenu() && name == this.name) {
                $rootScope.$$root.hideNofifymenu();
            } else {
                this.name = name;
                $(".mega-li.current").removeClass("current");
                $("#top-menu-" + name).addClass("current");
                this.items = this.configs[name].items;
                this.title = this.configs[name].title;
                this.mode = this.configs[name].mode;
                $rootScope.$$wait(function () {
                    $rootScope.$$root.showNofifymenu();
                }, 0.05);
            }
        },
        title: "", mode: "",
        items: []
    }

    $rootScope.$$datatable = {
        datatables:[],
        add:function (name, columns, icon, handles) {
            this.datatables[name]={
                name:name,
                columns: columns,
                icon: icon,
                handles: handles
            };
        },
        setDatas:function(datatable,datas){
            this.datatables[datatable].datas = datas;
        },
        getDatas:function (datatable) {
            return this.datatables[datatable].datas;
        },
        getView:function (name) {
            return this.datatables[name];
        },
        getValue:function(datatable, name, object){
            if(this.datatables[datatable].handles[name]!=undefined){
                return this.datatables[datatable].handles[name](object);
            }else{
                return object[name];
            }
        }
    };

    $rootScope.$on("$locationChangeStart", function (event, next, current) {
        $rootScope.$page({
            title: "Dashboard - Proevend"
        });
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

});