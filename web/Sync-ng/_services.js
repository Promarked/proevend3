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
            create:options && options.create? url + options.create:'.create',
            edit:options && options.edit? url + options.edit:'.edit',
            delete:options && options.delete? url + options.delete:'.delete',
            view:options && options.get? url + options.get:'.json',
            listView:options && options.listView? options.listView:undefined,
        }
        this.$gateway[name]= gateway;
        this.$temp.data[name]={};
    };

    this.setListView= function(name, listView){
        this.$gateway[name].listView = listView;
    }

    this.persist= function (name, data, fn) {
        if(data.id==undefined){
            this.create(name, data, fn);
        }else{
            this.edit(name, data, fn);
        }
    };

    this.create= function (name, data, fn) {
        data.$tid=this.uniqid();
        data.id=this.uniqid();
        data.$inprocess = "create";
        this.$temp.data[name][data.$tid]=data;
        if(this.$gateway[name].listView!=undefined){
            if(this.$gateway[name].listView.tempData!=undefined)
                this.$gateway[name].listView.tempData.push(data);
            else
                this.$gateway[name].listView.tempData=[data];
        }
    };
    this.edit= function (name, data, fn) {
        if(data.$inprocess!=undefined){
            this.$temp.data[name][data.$tid]=data;
        }else{
            data.$inprocess = "edit";
        }
    };
    this.delete= function (name, data, fn) {
        data.$inprocess = "delect";
    };
    this.list= function (name, fn) {
        this.$http.get(this.$gateway[name].get).
            then(function (response) {

            }
        );
    };
    this.get= function (name, id ,fn) {

    };
    this.uniqid=function () {
        return (new Date().getTime()).toString(16);
    };
}