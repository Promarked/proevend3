/**
 * Created by Acer on 22/01/2017.
 */
app.controller('mainController', function ($scope, $http, $rootScope) {
    $rootScope.$on('$routeChangeStart', function (next, current) {
        $rootScope.view = {loadReady: false};
    });
    $rootScope.modal = {title: "", include: "", okAction:function () {
        
    }, list:{}};
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
            $rootScope.isSeletCurrent=true;
            $rootScope.actionSelected.onBefore(op);
            $rootScope.actionSelected.onAfter(op);
            $rootScope.isSeletCurrent=false;
        },
        "onDbl":function () {
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

    $rootScope.modal.set=function (name,title, include, action) {
        $rootScope.modal.list[name]={"name":name,"title":title,"include":include, "action":action};
    };
    $rootScope.modal.select=function (name) {
        $rootScope.modal.name=name;
        $rootScope.modal.title=$rootScope.modal.list[name].title;
        $rootScope.modal.action=$rootScope.modal.list[name].action;
    };

    $rootScope.page.menu={
      items:[
          {label:"Inicio",link:"",icon:"fa fa-home"},
          {label:"Eventos",link:"event",icon:"fa fa-calendar"},
          {label:"Compañias",link:"company",icon:"fa fa-building"},
      ]
    };

});