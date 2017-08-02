var app = angular.module('appProevend', ["ngRoute"]);

// Configuración de las rutas

app.config(function ($routeProvider) {

    $routeProvider
        .when('/', {
            templateUrl: 'home.html',
            controller: 'homeController'
        })
        .when('/event', {
            templateUrl: 'piece/viewdata/mosaic',
            controller: 'eventController'
        })
        .when('/event/:event/config', {
            templateUrl: 'event/config.html',
            controller: 'eventConfigController'
        })
        .when('/event/:event/segmenter', {
            templateUrl: 'piece/segmenter',
            controller: 'segmenterController'
        })
        .when('/event/:event/ticket', {
            templateUrl: 'piece/viewdata/datatable',
            controller: 'ticketController'
        })
        .when('/event/:event/preregisters', {
            templateUrl: 'piece/viewdata/datatable',
            controller: 'preregisteredController'
        })
        .when('/event/:event/registers', {
            templateUrl: 'piece/viewdata/datatable',
            controller: 'registeredController'
        })
        .when('/event/:id', {
            templateUrl: 'event/view.html',
            controller: 'eventViewController'
        })
        .when('/company', {
            templateUrl: 'piece/viewdata/mosaic',
            controller: 'companyController'
        })
        .otherwise({reditrectTo: "/"});
});
// register the interceptor as a service
/*$provide.factory('myHttpInterceptor', function($q, dependency1, dependency2) {
    return {
        // optional method
        'request': function(config) {
            console.log("Ajax Listener : request");
            // do something on success
            return config;
        },

        // optional method
        'requestError': function(rejection) {
            console.log("Ajax Listener : request error");
            // do something on error
            if (canRecover(rejection)) {
                return responseOrNewPromise
            }
            return $q.reject(rejection);
        },



        // optional method
        'response': function(response) {
            console.log("Ajax Listener : response");
            // do something on success
            return response;
        },

        // optional method
        'responseError': function(rejection) {
            console.log("Ajax Listener : response error");
            // do something on error
            if (canRecover(rejection)) {
                return responseOrNewPromise
            }
            return $q.reject(rejection);
        }
    };
});

$httpProvider.interceptors.push('myHttpInterceptor');


// alternatively, register the interceptor via an anonymous factory
$httpProvider.interceptors.push(function($q, dependency1, dependency2) {
    return {
        'request': function(config) {
            // same as above
        },

        'response': function(response) {
            // same as above
        }
    };
});*/

app.run(function ($rootScope) {
    $rootScope.$on("$locationChangeStart", function (event, next, current) {
        $rootScope.actionSelected.unBefore();
        $("[data-item].select").removeClass("select");
        $(".vd_detail").removeClass("show");
        $rootScope.actionSelected.unAfter();
        $rootScope.params = {};
        $rootScope.page.buttons = {};
        $rootScope.datatable = {
            "icon": "fa-ticket",
            "columns": ["Nombre", "Precio", "Comentario", "Icon"],
            "rows": [],
            "ids":[],
            "data": [],
            "selecteds": [],
            "addSelected": function (i) {
                $rootScope.datatable.beforeEvent();
                if (!$rootScope.datatable.isSelected(i))
                    $rootScope.datatable.selecteds.push(i);
                else
                    $rootScope.datatable.removeSelected(i);

                $rootScope.datatable.afterEvent();
            },
            "selected": function (i) {
                $rootScope.datatable.beforeEvent();

                $rootScope.datatable.selecteds = [];
                $rootScope.datatable.selecteds.push(i);

                $rootScope.datatable.afterEvent();
            },
            "addSelectedAll": function () {
                $rootScope.datatable.beforeEvent();
                var totals = $rootScope.datatable.rows.length;
                if ($rootScope.datatable.selecteds.length == totals) {
                    $rootScope.datatable.selecteds = [];
                } else {
                    $rootScope.datatable.selecteds = [];
                    for (var i = 0; i < totals; i++) {
                        $rootScope.datatable.selecteds.push(i)
                    }
                }
                $rootScope.datatable.afterEvent();
            },
            "isSelectedAll": function () {
                var totals = $rootScope.datatable.rows.length;
                return $rootScope.datatable.selecteds.length == totals;
            },
            "isSelected": function (i) {
                return $rootScope.datatable.selecteds.indexOf(i) > -1 ? true : false;
            },
            "removeSelected": function (i) {
                $rootScope.datatable.beforeEvent();
                var index = $rootScope.datatable.selecteds.indexOf(i);
                $rootScope.datatable.selecteds.splice(index, 1);
                $rootScope.datatable.afterEvent();
            },
            "beforeEvent": function () {

            },
            "afterEvent": function () {

            }
        }
    });
});


/*CONTROLADORES */


/*Controlador Principal*/
app.controller('mainController', function ($scope, $http, $rootScope) {
    $rootScope.$on('$routeChangeStart', function (next, current) {
        $rootScope.view = {loadReady: false};
    });
    $rootScope.modal = {
        title: "", include: "", okAction: function () {

        }, list: {}
    };
    $rootScope.page = {title: "Dashboard", subtitle: ""};
    $rootScope.loadingHidden = function () {
        $("#loader-root").animate({"opacity": 0}, 500, function () {
            $("#loader-root").css({"display": "none"});
        });
    };
    $rootScope.actionSelected = {
        "un": function () {
            if (!$rootScope.isSeletCurrent) {
                $rootScope.actionSelected.unBefore();
                $("[data-item].select").removeClass("select");
                $(".vd_detail").removeClass("show");
                $rootScope.actionSelected.unAfter();
            }
        },
        "unBefore": function () {
        },
        "unAfter": function () {
        },
        "on": function (op) {
            $rootScope.isSeletCurrent = true;
            $rootScope.actionSelected.onBefore(op);
            $rootScope.actionSelected.onAfter(op);
            $rootScope.isSeletCurrent = false;
        },
        "onDbl": function () {
        },
        "onBefore": function () {
        },
        "onAfter": function () {
        },
    };


    $rootScope.loadingShow = function () {
        $("#loader-root").css({"display": "block"});
        $("#loader-root").animate({"opacity": 1}, 500);
    };
    $rootScope.titlePage = "Inicio";
    $rootScope.selected = {};
    $rootScope.setDetail = function (title, image, fields) {
        $rootScope.selected = {};
        $rootScope.selected.title = title;
        $rootScope.selected.image = image;
        $rootScope.selected.fields = fields;
    };

    $rootScope.modal.set = function (name, title, include, action, message) {
        $rootScope.modal.list[name] = {
            "name": name,
            "title": title,
            "include": include,
            "action": action,
            "message": message
        };
    };
    $rootScope.modal.select = function (name) {
        $rootScope.modal.name = name;
        $rootScope.modal.title = $rootScope.modal.list[name].title;
        $rootScope.modal.action = $rootScope.modal.list[name].action;
    };

    $rootScope.assents = {};

    $rootScope.initLoadImage = function (object) {
        if ($rootScope.assents[object.photo] !== undefined) {
            object.background = $rootScope.assents[object.photo];
        } else {
            $http.get("file/base64/" + object.photo)
                .then(function (response) {
                    $rootScope.assents[object.photo] = response.data;
                    object.background = response.data;
                });
        }
    }


});

/*******************************************/
/*Controlador Dashboard Home*/
app.controller('homeController', function ($scope, $http, $rootScope) {
    $rootScope.page.title = "Dashboard";
    $rootScope.page.menu = {
        items: [
            {label: "Inicio", link: "", icon: "fa fa-home"},
            {label: "Eventos", link: "event", icon: "fa fa-calendar"},
            {label: "Compañias", link: "company", icon: "fa fa-building"},
        ]
    };
    $("#loader-root").animate({"opacity": 0}, 500, function () {
        $("#loader-root").css({"display": "none"});
    });
    $rootScope.selected.detailRealy = true;
    $rootScope.view.loadReady = true;

    $rootScope.loadingHidden();

    var ctx = document.getElementById("myChart");
    var myChart = new Chart(ctx, {
        type: 'bar',
        data: {
            labels: ["Red", "Blue", "Yellow", "Green", "Purple", "Orange"],
            datasets: [{
                label: '# of Votes',
                data: [12, 19, 3, 5, 2, 3],
                backgroundColor: [
                    'rgba(255, 99, 132, 0.2)',
                    'rgba(54, 162, 235, 0.2)',
                    'rgba(255, 206, 86, 0.2)',
                    'rgba(75, 192, 192, 0.2)',
                    'rgba(153, 102, 255, 0.2)',
                    'rgba(255, 159, 64, 0.2)'
                ],
                borderColor: [
                    'rgba(255,99,132,1)',
                    'rgba(54, 162, 235, 1)',
                    'rgba(255, 206, 86, 1)',
                    'rgba(75, 192, 192, 1)',
                    'rgba(153, 102, 255, 1)',
                    'rgba(255, 159, 64, 1)'
                ],
                borderWidth: 1
            }]
        },
        options: {
            scales: {
                yAxes: [{
                    ticks: {
                        beginAtZero: true
                    }
                }]
            }
        }
    });
});

/*******************************************/
/*Cotroladores de Eventos*/
/*Lista de eventos*/
app.controller('eventController', function ($scope, $http, $rootScope) {
    $rootScope.page.menu = {
        items: [
            {label: "Inicio", link: "", icon: "fa fa-home"},
            {label: "Eventos", link: "event", icon: "fa fa-calendar"},
            {label: "Compañias", link: "company", icon: "fa fa-building"},
        ]
    };
    $rootScope.page.title = "Eventos";
    $rootScope.page.subtitle = "Todos los eventos a los que esta cuenta tiene acceso.";
    $rootScope.modal.set("form-add-event", "Nuevo Evento", "event.form.html", function () {
        $rootScope.view.loadReady = false;
        var action = $("#form-add-event").attr("action");
        var method = $("#form-add-event").attr("method");
        var formData = new FormData($("#form-add-event")[0]);
        $.ajax({
            type: method,
            url: action,
            data: formData,
            enctype: 'multipart/form-data',
            processData: false,
            contentType: false,
        }).done(function (request, textStatus, jqXHR) {
            notification("topright", "success", "fa fa-exclamation-circle vd_green", "¡Correcto!", "Evento creado exitozamente");
            $("#modal").modal("hide");
            $http.get("event.json")
                .then(function (response) {
                    $scope.objets = response.data.events;
                    $rootScope.loadingHidden();
                    $rootScope.selected.detailRealy = true;
                    $rootScope.view.loadReady = true;
                    $rootScope.loadingHidden();
                });

        }).fail(function (jqXHR, textStatus, errorThrown) {
            notification("topright", "notify", "fa fa-exclamation-triangle vd_yellow", "¡Algo esta mal", "No se ha podido establecer comunicacion.");
        });

    });

    $rootScope.modal.set("msg-delete-event", "Eliminar Evento", undefined, function () {

        var url = "event/" + $scope.delete.id + "/delete";
        $http.post(url)
            .then(function (response) {
                notification("topright", "success", "fa fa-exclamation-circle vd_green", "¡Correcto!", "Evento eliminado exitozamente");
                $http.get("event.json")
                    .then(function (response) {
                        $scope.objets = response.data.events;
                        $rootScope.loadingHidden();
                        $rootScope.selected.detailRealy = true;
                        $rootScope.view.loadReady = true;
                        $rootScope.loadingHidden();
                        $("#modal").modal("hide");
                        $rootScope.actionSelected.un();

                    });
            });

    }, {"title": "¿Esta Seguro de borrar este evento?", "comment": "Antes de realizar esta accion pienselo bien."});
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
        $rootScope.selected.obj = $scope.objets[num];
        $rootScope.select = $scope.objets[num];
        $rootScope.page.buttons.enter = {
            "label": "Ver", "icon": "fa fa-eye", "click": function () {
                window.location = "#!/event/" + $rootScope.selected.obj.id;
            }
        };
        //$rootScope.page.buttons.edit = {"label": "Editar", "icon": "fa fa-pencil-square-o"};
        $rootScope.page.buttons.delete = {
            "label": "Eliminar", "icon": "fa fa-trash-o", "click": function () {
                $("#modal").modal("show");
                var obj = $scope.objets[num];
                $scope.delete = obj;
                $rootScope.modal.select("msg-delete-event");
            }
        };
        $rootScope.selected.detailRealy = false;
        var delay = setInterval(function () {
            if (!$scope.isDblClick) {
                var obj = $scope.objets[num];
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
                if (delay)
                    clearInterval(delay);
            }
        }, 500);


    }

    $scope.actionSelected.onDbl = function (item) {
        $scope.isDblClick = true;
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


});
/*Vista general de eventos*/
app.controller('eventViewController', function ($scope, $routeParams, $http, $rootScope) {
    var id = $routeParams.id;
    $rootScope.params.event = id;
    $rootScope.page.buttons = [];
    $http.get("event/" + id + ".json")
        .then(function (response) {
            var event = response.data.event;
            $rootScope.page.title = event.name;
            $rootScope.current = {"event": event};
            $rootScope.page.subtitle = event.comment;
            $rootScope.selected.detailRealy = true;
            $rootScope.view.loadReady = true;
            $rootScope.loadingHidden();
        });

});
/*configuracion de eventos*/
app.controller('eventConfigController', function ($scope, $routeParams, $http, $rootScope) {
    var id = $routeParams.id;

});
/*Vista para segmentar eventos*/
app.controller('segmenterController', function ($scope, $routeParams, $http, $rootScope) {
    var event = $routeParams.event;

    $rootScope.params.event = event;
    $scope.colors = ["rgb(255, 178, 102)", "rgb(102, 204, 255)", "rgb(132, 195, 190)", "rgb(194, 58, 34)", "rgb(174, 197, 206)", "rgb(119, 220, 119)", "rgb(254, 179, 70)", "rgb(255, 153, 255)", "rgb(149, 110, 213)"];
    $scope.colorsA = ["rgba(255, 178, 102,0.7)", "rgba(102, 204, 255,0.7)", "rgba(132, 195, 190,0.7)", "rgba(194, 58, 34,0.7)", "rgba(174, 197, 206,0.7)", "rgba(119, 220, 119,0.7)", "rgba(254, 179, 70,0.7)", "rgba(255, 153, 255,0.7)", "rgba(149, 110, 213 ,0.7)"];


    /*$rootScope.modal.set("form-add-segment", "Nuevo Evento", "event.form.html", function () {

     });*/

    $rootScope.page.buttons = {
        "add": {
            "label": "Nuevo", "icon": "fa fa-plus", "click": function () {
                $scope.form = {type: "Nuevo"};
                $scope.segmentCurrent = undefined;
                $("#dialog-add-time").addClass("show");
            }
        }
    };


    $scope.nextfunctions = function (eventid) {
        $rootScope.current.event.startDate = new Date($rootScope.current.event.start);
        $rootScope.current.event.endDate = new Date($rootScope.current.event.end);
        $http.get("event/" + eventid + "/segmenter.json")
            .then(function (response) {
                var list = response.data.sections;

                $scope.datatime = {"days": response.data.event.durationDays};
                $scope.datas = [];
                for (var i = 0; i < list.length; i++) {
                    $scope.addDataOrder(list[i]);

                }
                for (var i = 0; i < list.length; i++) {
                    list[i].positionLine = $scope.getPositionLineTime(list[i]);
                }
                console.log($scope.datas);
                $scope.datatime.daysArray = [];
                $scope.datatime.hoursArray = [];
                for (var i = 1; i <= $scope.datatime.days; i++) {
                    $scope.datatime.daysArray.push(i);
                }
                for (var i = 0; i <= 23; i++) {
                    $scope.datatime.hoursArray.push(i);
                }
                $rootScope.selected.detailRealy = true;
                $rootScope.view.loadReady = true;
                $rootScope.loadingHidden();
            });
    }


    $scope.addDataOrder = function (data) {
        var borderColor;
        var backgroundColor;
        if ($scope.segmentCurrent !== undefined) {
            borderColor = $scope.segmentCurrent.borderColor;
            backgroundColor = $scope.segmentCurrent.backgroundColor;
        }
        data.startDate = new Date(data.start);
        data.endDate = new Date(data.end);
        data.before = 0;

        if ($scope.datas == undefined) {
            $scope.datas = [];
        }
        data.borderColor = borderColor !== undefined ? borderColor : $scope.colors[$scope.datas.length];
        data.backgroundColor = backgroundColor !== undefined ? backgroundColor : $scope.colorsA[$scope.datas.length];

        $scope.datas.push(data);
        for (var i = 0; i < $scope.datas.length; i++) {
            $scope.datas[i].positionLine = $scope.getPositionLineTime($scope.datas[i]);
        }
    }
    $scope.setDataOrder = function (data) {
        data.startDate = new Date(data.start);
        data.endDate = new Date(data.end);
        data.before = 0;


        for (var i = 0; i < $scope.datas.length; i++) {
            var cu = $scope.datas[i]
            if (cu.$$hashKey > data.$$hashKey) {
                //$scope.datas[i]=data;
                break;
            }
        }

        for (var i = 0; i < $scope.datas.length; i++) {
            $scope.datas[i].positionLine = $scope.getPositionLineTime($scope.datas[i]);
        }

    }

    $scope.getPositionLineTime = function (data) {
        var list = $scope.datas;
        var beforeItems = 0;
        var i = 0
        while (i < list.length && obj !== data) {

            var obj = list[i];
            if (obj == data)
                break;
            if (obj != data && (obj.endDate.getTime() > data.startDate.getTime() ) && obj.positionLine >= beforeItems)
                beforeItems++;
            else break;
            i++;
        }
        data.before = beforeItems;
        var spaceOcupe = 100 + beforeItems * 150 + beforeItems * 10 + 160;
        if (spaceOcupe > $scope.datatime.minWidth || $scope.datatime.minWidth == undefined)
            $scope.datatime.minWidth = spaceOcupe;
        return beforeItems * 150 + beforeItems * 10;
    }

    $scope.getHeightLineTime = function (data, d, h) {
        var height = data.endDate.getTime() - data.startDate.getTime();


        var event = $rootScope.current.event;
        var diffi = data.startDate - event.startDate;
        var dayi = parseInt(diffi / (1000 * 60 * 60 * 24)) + 1;
        var minuteShowTotal = diffi / (1000 * 60);
        var difff = data.endDate - event.startDate;
        var dayf = parseInt((difff - 1000) / (1000 * 60 * 60 * 24)) + 1

        height = height / (1000 * 60);
        if (height > 24 * 60 && dayi == d) {
            height = 24 * 60;
            if (height + minuteShowTotal > 24 * 60) {
                height = height - minuteShowTotal;
                //  console.log("Segundo Cambio Cambio : "+height);
            }
        } else if (dayi < d && dayf > d) {
            height = 24 * 60;
        } else if (dayi < d && dayf >= d) {
            height = data.endDate.getHours() * 60 + data.endDate.getMinutes();
        }

        return height;
    }


    $scope.isShowLineTime = function (data, d, h) {
        var event = $rootScope.current.event;
        var diffi = data.startDate - event.startDate;
        var dayi = parseInt(diffi / (1000 * 60 * 60 * 24)) + 1;
        var houri = parseInt(diffi / (1000 * 60 * 60));

        var difff = data.endDate - event.startDate;
        var dayf = parseInt((difff - 1000) / (1000 * 60 * 60 * 24)) + 1

        return dayi == d && houri == h || dayi < d && dayf >= d && h == 0;
    }
    $scope.dateToStringFull = function (date) {
        return date.getFullYear() + "-" + (date.getMonth() + 1) + "-" + date.getDate() + " " + (date.getHours() > 10 ? date.getHours() : "0" + date.getHours()) + ":" + (date.getMinutes() > 10 ? date.getMinutes() : "0" + date.getMinutes()) + "";
    }
    $scope.dateToStringTime = function (date) {
        return (date.getHours() > 9 ? date.getHours() : "0" + date.getHours()) + ":" + (date.getMinutes() > 9 ? date.getMinutes() : "0" + date.getMinutes()) + "";
    }

    $scope.submitForm = function () {
        var startEvent = $rootScope.current.event.startDate;
        var data = {};
        if ($scope.segmentCurrent !== undefined) {
            data = $scope.segmentCurrent;
        }
        var dayStart = parseInt($scope.form.dayStart) - 1;
        var dayEnd = parseInt($scope.form.dayEnd) - 1;
        var hourStart = parseInt($scope.form.timeStart.split(":")[0]);
        var hourEnd = parseInt($scope.form.timeEnd.split(":")[0]);
        var minuteStart = parseInt($scope.form.timeStart.split(":")[1]);
        var minuteEnd = parseInt($scope.form.timeEnd.split(":")[1]);


        data.startDate = new Date(startEvent.getTime() + ((dayStart * 60 * 24) + hourStart * 60 + minuteStart) * 1000 * 60);
        data.endDate = new Date(startEvent.getTime() + ((dayEnd * 60 * 24) + hourEnd * 60 + minuteEnd) * 1000 * 60);

        if (data.startDate < data.endDate) {
            data.name = $scope.form.name;
            data.comment = $scope.form.comment;
            data.place = $scope.form.place;
            data.end = $scope.dateToStringFull(data.endDate);
            data.start = $scope.dateToStringFull(data.startDate);
            $("#dialog-add-time").removeClass("show");

            if ($scope.segmentCurrent === undefined) {
                console.log("Nuevo segmento");
                $scope.addDataOrder(data);

            } else {
                console.log("Editar segmento");
                $scope.setDataOrder(data);
            }

        } else {
            notification("topright", "error", "fa fa-exclamation-circle vd_yellow", "Fechas incorrectas", "La fecha inicial deber ser menor a la fecha final");
            console.log(data.startDate);
            console.log(data.endDate);
        }
    }

    $scope.setectSegment = function (data) {
        var segement;
        for (var i = 0; i < $scope.datas.length; i++) {
            if ($scope.datas[i].$$hashKey == data.$$hashKey) {
                segement = $scope.datas[i];
                $scope.segmentCurrent = segement;
                break;
            }

        }
        if (segement != undefined) {
            var event = $rootScope.current.event;
            var diffi = segement.startDate - event.startDate;
            var dayi = parseInt(diffi / (1000 * 60 * 60 * 24)) + 1;

            var difff = segement.endDate - event.startDate;
            var dayf = parseInt((difff - 1000) / (1000 * 60 * 60 * 24)) + 1;
            if ($scope.form === undefined)
                $scope.form = {type: "Editar"};
            else
                $scope.form.type = "Editar";
            if ($scope.form == undefined)
                $scope.form = {};
            $scope.form.dayStart = dayi + "";
            $scope.form.dayEnd = dayf + "";
            $scope.form.timeStart = $scope.dateToStringTime(segement.startDate);
            $scope.form.timeEnd = $scope.dateToStringTime(segement.endDate);
            $scope.form.name = segement.name;
            $scope.form.comment = segement.comment;
            $scope.form.place = segement.place;
            $("#dialog-add-time").addClass("show");
        }
    }


    if ($rootScope.current == undefined || $rootScope.current.event == undefined) {
        $http.get("event/" + event + ".json")
            .then(function (response) {
                var event = response.data.event;
                $rootScope.page.title = event.name;
                if ($rootScope.current == undefined)
                    $rootScope.current = {"event": event};
                else
                    $rootScope.current.event = event;

                $rootScope.page.title = "Segmentos del evento";
                $rootScope.page.subtitle = event.name;
                $scope.nextfunctions(event.id);

            });
    } else {
        $rootScope.page.title = "Segmentos del evento";
        $rootScope.page.subtitle = $rootScope.current.event.name;
        $scope.nextfunctions(event);

    }

});
/*Vista de Ticketes de eventos*/
app.controller('ticketController', function ($scope, $routeParams, $http, $rootScope) {
    var event = $routeParams.event;
    $rootScope.page.buttons = {
        "add": {
            "label": "Nuevo", "icon": "fa fa-plus", "click": function () {
                $("#modal").modal("show");
                $rootScope.modal.list["form-add-ticket"].title = "Nuevo Tiquete";
                $rootScope.modal.list["form-add-ticket"].action=function () {
                    var action = 'event/' + $rootScope.current.event.id + '/ticket/create';
                    var method = $("#form-add-ticket").attr("method");
                    var formData = new FormData($("#form-add-ticket")[0]);
                    var action = 'event/' + $rootScope.current.event.id + '/ticket/create';
                    var method = $("#form-add-ticket").attr("method");
                    var formData = new FormData($("#form-add-ticket")[0]);
                    $.ajax({
                        type: method,
                        url: action,
                        data: formData,
                        enctype: 'multipart/form-data',
                        processData: false,
                        contentType: false,
                    }).done(function (request, textStatus, jqXHR) {
                        notification("topright", "success", "fa fa-exclamation-circle vd_green", "¡Correcto!", "Ticket creado exitozamente");
                        $("#modal").modal("hide");
                        var tickets = request.tickets;
                        $rootScope.datatable.columns = ["Nombre", "Precio", "Comentario"];
                        $rootScope.datatable.rows = [];
                        $rootScope.datatable.ids = [];
                        $rootScope.datatable.data=[];
                        for (var i = 0; i < tickets.length; i++) {
                            $rootScope.datatable.ids.push(tickets[i].id);
                            $rootScope.datatable.rows.push([tickets[i].name, tickets[i].price, tickets[i].commnet]);
                            $rootScope.datatable.data.push(tickets[i]);
                        }
                        $scope.$digest();
                    }).fail(function (jqXHR, textStatus, errorThrown) {
                        notification("topright", "notify", "fa fa-exclamation-triangle vd_yellow", "¡Algo esta mal", "No se ha podido establecer comunicacion.");
                    });
                }
                if($rootScope.form===undefined)
                    $rootScope.form={};
                $rootScope.form.ticket = {
                    name: "",
                    commnet: "",
                    price: 0,
                }
                $rootScope.modal.select("form-add-ticket");
            }
        }
    };

    $rootScope.modal.set("msg-delete-event", "Eliminar Evento", undefined, function () {

    }, {"title": "¿Esta Seguro de borrar este evento?", "comment": "Antes de realizar esta accion pienselo bien."});
    $rootScope.datatable.icon = "fa-ticket";
    $rootScope.datatable.columns = ["Nombre", "Precio", "Comentario"];
    $rootScope.datatable.afterEvent = function () {
        delete $rootScope.page.buttons.delete;
        delete $rootScope.page.buttons.edit;
        if ($scope.datatable.selecteds.length == 1) {
            $rootScope.page.buttons.edit = {
                "label": "Editar", "icon": "fa fa-pencil-square-o", "click": function () {
                    var index = $rootScope.datatable.selecteds[0]
                    $("#modal").modal("show");
                    if ($rootScope.form == undefined)
                        $rootScope.form = {};
                    $rootScope.form.ticket = {
                        name: $rootScope.datatable.data[index].name,
                        commnet: $rootScope.datatable.data[index].commnet,
                        price: parseInt($rootScope.datatable.data[index].price),
                    };

                    $rootScope.modal.list["form-add-ticket"].title = "Editar Tiquete";
                    $rootScope.modal.list["form-add-ticket"].action = function () {
                        var action = 'event/' + $rootScope.current.event.id + '/ticket/'+$rootScope.datatable.ids[index]+'/edit';
                        var method = $("#form-add-ticket").attr("method");
                        var formData = new FormData($("#form-add-ticket")[0]);
                        $.ajax({
                            type: method,
                            url: action,
                            data: formData,
                            enctype: 'multipart/form-data',
                            processData: false,
                            contentType: false,
                        }).done(function (request, textStatus, jqXHR) {
                            notification("topright", "success", "fa fa-exclamation-circle vd_green", "¡Correcto!", "Ticket creado exitozamente");
                            $("#modal").modal("hide");
                            var tickets = request.tickets;
                            $rootScope.datatable.columns = ["Nombre", "Precio", "Comentario"];
                            $rootScope.datatable.rows = [];
                            $rootScope.datatable.ids = [];
                            $rootScope.datatable.data = [];
                            for (var i = 0; i < tickets.length; i++) {
                                $rootScope.datatable.ids.push(tickets[i].id);
                                $rootScope.datatable.rows.push([tickets[i].name, tickets[i].price, tickets[i].commnet]);
                                $rootScope.datatable.data.push(tickets[i]);
                            }
                            $rootScope.form.ticket = {
                                name: "",
                                commnet: "",
                                price: 0,
                            }
                            $scope.$digest();
                        }).fail(function (jqXHR, textStatus, errorThrown) {
                            notification("topright", "notify", "fa fa-exclamation-triangle vd_yellow", "¡Algo esta mal", "No se ha podido establecer comunicacion.");
                        });

                    };

                    $rootScope.modal.select("form-add-ticket");
                }
            };
        }
        if ($scope.datatable.selecteds.length > 0) {
            $rootScope.page.buttons.delete = {
                "label": "Eliminar", "icon": "fa fa-trash", "click": function () {
                    if ($scope.datatable.selecteds.length == 1) {
                        $rootScope.modal.set("msg-delete-ticket", "Eliminar Tiquete", undefined, function () {
                            var ticketIds=[];
                            for(var i = 0; i < $rootScope.datatable.selecteds.length; i++){
                                ticketIds.push($rootScope.datatable.ids[$rootScope.datatable.selecteds[i]]);
                            }
                            console.log("enviando : "+ticketIds);
                            $.ajax({
                                type: 'POST',
                                url: 'event/'+$rootScope.current.event.id+"/ticket/delete/many",
                                data: {"tickets":ticketIds},
                            }).done(function (request, textStatus, jqXHR) {
                                console.log(request);
                                $rootScope.selected.detailRealy = true;
                                $rootScope.view.loadReady = true;
                                $rootScope.loadingHidden();
                                if(request.status=="success"){
                                    notification("topright", "success", "fa fa-exclamation-circle vd_green", "¡Correcto!", "Tiquete borrado exitosamente");
                                }else if(request.status=="error"){
                                    notification("topright", "error", "fa fa-exclamation-circle vd_yellow", "¡Error!", "Tiquete no se encuentra o no tiene permitido borrarlo.");
                                }

                                $("#modal").modal("hide");
                                var tickets = request.tickets;
                                $rootScope.datatable.rows = [];
                                $rootScope.datatable.ids = [];
                                $rootScope.datatable.data=[];
                                for (var i = 0; i < tickets.length; i++) {
                                    $rootScope.datatable.ids.push(tickets[i].id);
                                    $rootScope.datatable.rows.push([tickets[i].name, tickets[i].price, tickets[i].commnet]);
                                    $rootScope.datatable.data.push(tickets[i]);
                                }
                                $scope.$digest();
                            }).fail(function (jqXHR, textStatus, errorThrown) {
                                notification("topright", "notify", "fa fa-exclamation-triangle vd_yellow", "¡Algo esta mal", "No se ha podido establecer comunicacion.");
                            });
                        }, {
                            "title": "¿Esta Seguro de borrar este Tiquete?",
                            "comment": "Antes de realizar esta accion pienselo bien."
                        });
                        $rootScope.select = {"name": $scope.datatable.selecteds[0].name};
                    } else {
                        $rootScope.modal.set("msg-delete-ticket", "Eliminar Tiquetes", undefined, function () {
                            var ticketIds=[];
                            for(var i = 0; i < $rootScope.datatable.selecteds.length; i++){
                                ticketIds.push($rootScope.datatable.ids[$rootScope.datatable.selecteds[i]]);
                            }
                            $.ajax({
                                type: 'POST',
                                url: 'event/'+$rootScope.current.event.id+"/ticket/delete/many",
                                data: {"tickets":ticketIds},
                            }).done(function (request, textStatus, jqXHR) {
                                console.log(request);
                                if(request.status=="success"){
                                    notification("topright", "success", "fa fa-exclamation-circle vd_green", "¡Correcto!", "Tiquetes borrados exitosamente");
                                }else if(request.status=="error"){
                                    notification("topright", "error", "fa fa-exclamation-circle vd_yellow", "¡Error!", "Tiquetes no se encuentran o no tiene permitido borrarlos.");
                                }

                                $("#modal").modal("hide");
                                var tickets = request.tickets;
                                $rootScope.datatable.rows = [];
                                $rootScope.datatable.ids = [];
                                $rootScope.datatable.data=[];
                                for (var i = 0; i < tickets.length; i++) {
                                    $rootScope.datatable.ids.push(tickets[i].id);
                                    $rootScope.datatable.rows.push([tickets[i].name, tickets[i].price, tickets[i].commnet]);
                                    $rootScope.datatable.data.push(tickets[i]);
                                }
                                $scope.$digest();
                            }).fail(function (jqXHR, textStatus, errorThrown) {
                                notification("topright", "notify", "fa fa-exclamation-triangle vd_yellow", "¡Algo esta mal", "No se ha podido establecer comunicacion.");
                            });
                        }, {
                            "title": "¿Esta Seguro de borrar estos Tiquete?",
                            "comment": "Antes de realizar esta accion pienselo bien."
                        });
                        $rootScope.select = {"name": $scope.datatable.selecteds.length + " Ticketes"};
                    }

                    $("#modal").modal("show");
                    $rootScope.modal.select("msg-delete-ticket");
                }
            };
        }
    }


    $rootScope.modal.set("form-add-ticket", "Nuevo Ticket", "event/g/ticket.form.html", function () {
        var action = 'event/' + $rootScope.current.event.id + '/ticket/create';
        var method = $("#form-add-ticket").attr("method");
        var formData = new FormData($("#form-add-ticket")[0]);
        $.ajax({
            type: method,
            url: action,
            data: formData,
            enctype: 'multipart/form-data',
            processData: false,
            contentType: false,
        }).done(function (request, textStatus, jqXHR) {
            notification("topright", "success", "fa fa-exclamation-circle vd_green", "¡Correcto!", "Ticket creado exitozamente");
            $("#modal").modal("hide");
            var tickets = request.tickets;
            $rootScope.datatable.columns = ["Nombre", "Precio", "Comentario"];
            $rootScope.datatable.rows = [];
            $rootScope.datatable.ids = [];
            $rootScope.datatable.data=[];
            for (var i = 0; i < tickets.length; i++) {
                $rootScope.datatable.ids.push(tickets[i].id);
                $rootScope.datatable.rows.push([tickets[i].name, tickets[i].price, tickets[i].commnet]);
                $rootScope.datatable.data.push(tickets[i]);
            }
            $scope.$digest();
        }).fail(function (jqXHR, textStatus, errorThrown) {
            notification("topright", "notify", "fa fa-exclamation-triangle vd_yellow", "¡Algo esta mal", "No se ha podido establecer comunicacion.");
        });

    });

    $rootScope.params.event = event;
    $scope.nextfunctions = function (eventid) {
        $http.get("event/" + eventid + "/ticket.json")
            .then(function (response) {
                var tickets = response.data.tickets;
                $rootScope.datatable.columns = ["Nombre", "Precio", "Comentario"];
                $rootScope.datatable.rows = [];
                $rootScope.datatable.ids = [];
                $rootScope.datatable.data=[];
                for (var i = 0; i < tickets.length; i++) {
                    $rootScope.datatable.ids.push(tickets[i].id);
                    $rootScope.datatable.rows.push([tickets[i].name, tickets[i].price, tickets[i].commnet]);
                    $rootScope.datatable.data.push(tickets[i]);
                }
                $rootScope.selected.detailRealy = true;
                $rootScope.view.loadReady = true;
                $rootScope.loadingHidden();

            });
    }

    if ($rootScope.current == undefined || $rootScope.current.event == undefined) {
        $http.get("event/" + event + ".json")
            .then(function (response) {
                var event = response.data.event;
                $rootScope.page.title = event.name;
                if ($rootScope.current == undefined)
                    $rootScope.current = {"event": event};
                else
                    $rootScope.current.event = event;
                $rootScope.page.title = "Lista de Tiquetes";
                $rootScope.page.subtitle = event.name;
                $scope.nextfunctions(event.id);
            });
    } else {
        $rootScope.page.title = "Lista de Tiquetes";
        $rootScope.page.subtitle = $rootScope.current.event.name;
        $scope.nextfunctions(event);
    }
});

/*******************************************/
/*Cotroladores de Personas*/
/*Lista de Preinscritos*/
app.controller('preregisteredController', function ($scope, $routeParams, $http, $rootScope) {
    var event = $routeParams.event;
    $rootScope.params.event = event;
    $scope.nextfunctions = function (eventid) {
        $http.get("event/" + eventid + "/registers/preregistered.json")
            .then(function (response) {
                var registers = response.data.registers;
                $scope.datatable = {
                    "columns": ["identificacion", "Nombres", "Apellidos", "Email", "Ticket"],
                    "rows": []
                }
                for (var i = 0; i < registers.length; i++) {
                    $scope.datatable.rows.push([registers[i].numberIdent, registers[i].firstName, registers[i].lastName, registers[i].email, registers[i].ticket]);
                }
                $rootScope.selected.detailRealy = true;
                $rootScope.view.loadReady = true;
                $rootScope.loadingHidden();
            });
    }

    if ($rootScope.current == undefined || $rootScope.current.event == undefined) {
        $http.get("event/" + event + ".json")
            .then(function (response) {
                var event = response.data.event;
                $rootScope.page.title = event.name;
                if ($rootScope.current == undefined)
                    $rootScope.current = {"event": event};
                else
                    $rootScope.current.event = event;
                $rootScope.page.title = "Lista de preinscritos";
                $rootScope.page.subtitle = event.name;
                $scope.nextfunctions(event.id);
            });
    } else {
        $rootScope.page.title = "Lista de preinscritos";
        $rootScope.page.subtitle = $rootScope.current.event.name;
        $scope.nextfunctions(event);
    }
});
/*Lista de inscritos*/
app.controller('registeredController', function ($scope, $routeParams, $http, $rootScope) {
    var event = $routeParams.event;
    $rootScope.page.buttons = {
        "add": {
            "label": "Nuevo", "icon": "fa fa-plus", "click": function () {
                $("#modal").modal("show");

                $rootScope.modal.select("form-add-register");
            }
        }
    };
    $rootScope.modal.set("form-add-register", "Nuevo Inscrito", "event/g/registers.form.html", function () {
        /*var action = 'event/' + $rootScope.current.event.id + '/ticket/create';
        var method = $("#form-add-ticket").attr("method");
        var formData = new FormData($("#form-add-ticket")[0]);
        $.ajax({
            type: method,
            url: action,
            data: formData,
            enctype: 'multipart/form-data',
            processData: false,
            contentType: false,
        }).done(function (request, textStatus, jqXHR) {
            notification("topright", "success", "fa fa-exclamation-circle vd_green", "¡Correcto!", "Ticket creado exitozamente");
            $("#modal").modal("hide");
            var tickets = request.tickets;
            $rootScope.datatable.columns = ["Nombre", "Precio", "Comentario"];
            $rootScope.datatable.rows = [];
            $rootScope.datatable.ids = [];
            $rootScope.datatable.data=[];
            for (var i = 0; i < tickets.length; i++) {
                $rootScope.datatable.ids.push(tickets[i].id);
                $rootScope.datatable.rows.push([tickets[i].name, tickets[i].price, tickets[i].commnet]);
                $rootScope.datatable.data.push(tickets[i]);
            }
            $scope.$digest();
        }).fail(function (jqXHR, textStatus, errorThrown) {
            notification("topright", "notify", "fa fa-exclamation-triangle vd_yellow", "¡Algo esta mal", "No se ha podido establecer comunicacion.");
        });*/

    });
    $rootScope.params.event = event;
    $scope.nextfunctions = function (eventid) {
        $http.get("event/" + eventid + "/registers/registered.json")
            .then(function (response) {
                var registers = response.data.registers;
                $scope.datatable = {
                    "columns": ["identificacion", "Nombres", "Apellidos", "Email", "Ticket"],
                    "rows": []
                }
                for (var i = 0; i < registers.length; i++) {
                    $scope.datatable.rows.push([registers[i].numberIdent, registers[i].firstName, registers[i].lastName, registers[i].email, registers[i].ticket]);
                }
                $rootScope.selected.detailRealy = true;
                $rootScope.view.loadReady = true;
                $rootScope.loadingHidden();
            });
    }

    if ($rootScope.current == undefined || $rootScope.current.event == undefined) {
        $http.get("event/" + event + ".json")
            .then(function (response) {
                var event = response.data.event;
                $rootScope.page.title = event.name;
                if ($rootScope.current == undefined)
                    $rootScope.current = {"event": event};
                else
                    $rootScope.current.event = event;
                $rootScope.page.title = "Lista de inscritos";
                $rootScope.page.subtitle = event.name;
                $scope.nextfunctions(event.id);
            });
    } else {
        $rootScope.page.title = "Lista de inscritos";
        $rootScope.page.subtitle = $rootScope.current.event.name;
        $scope.nextfunctions(event);
    }
});



/*******************************************/
/*Cotroladores de Compañias*/
app.controller('companyController', function ($scope, $http, $rootScope) {
    $rootScope.page.title = "Compañias";
    $rootScope.page.menu = {
        items: [
            {label: "Inicio", link: "", icon: "fa fa-home"},
            {label: "Eventos", link: "event", icon: "fa fa-calendar"},
            {label: "Compañias", link: "company", icon: "fa fa-building"},
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