/**
 * Created by Promarked on 16/08/2017.
 */

function Service ($http, $scope) {
    this.$http = $http;
    this.$scope = $scope;
    this.$gateway = {};
    this.$temp= {data:{}};

    this.setGateway = function (name, url, options) {
        var gateway = {
            route:url,
            create:options && options.create? options.create:'.create',
            edit:options && options.edit? options.edit:'.edit',
            delete:options && options.edit? options.delete:'.delete',
            view:options && options.edit? options.get:'.json',
            listView:options && options.listView? options.listView:undefined,
        }
        this.$gateway[name]= gateway;
        this.$temp.data[name]={};
    };

    this.setListView= function(name, listView){
        this.$gateway[name].listView = listView;
    }

    this.create= function (name, data, fn) {
        data.$tid=this.uniqid();
        data.$inprocess = "create";
        this.$temp.data[name][data.$tid]=data;
        if(this.$gateway[name].listView!=undefined){
            this.$gateway[name].listView.datas.push(data);
        }
    };
    this.edit= function (name, data, fn) {
        data.$inprocess = "edit";
    };
    this.delete= function (name, data, fn) {
        data.$inprocess = "delect";
    };
    this.list= function (name, fn) {

    };
    this.get= function (name, id ,fn) {

    };
    this.uniqid=function () {
        return (new Date().getTime()).toString(16);
    };
}