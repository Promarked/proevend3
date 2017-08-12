/**
 * Created by Promarked on 5/08/2017.
 */


var $f={
    defaultValue:function (variable, value) {
       if(variable==undefined){
           variable = value;
       }
       return variable;
    },
    string:{
        chaset: {
            encode: function (text) {
                var rp = text;
                rp = rp.replace("á", '&aacute;');
                rp = rp.replace("é", '&eacute;');
                rp = rp.replace("í", '&iacute;');
                rp = rp.replace("ó", '&oacute;');
                rp = rp.replace("ú", '&uacute;');
                rp = rp.replace("ñ", '&ntilde;');
                rp = rp.replace("ü", '&uuml;');
                //
                rp = rp.replace("Á", '&Aacute;');
                rp = rp.replace("É", '&Eacute;');
                rp = rp.replace("Í", '&Iacute;');
                rp = rp.replace("Ó", '&Oacute;');
                rp = rp.replace("Ú", '&Uacute;');
                rp = rp.replace("Ñ", '&Ntilde;');
                rp = rp.replace("Ü", '&Uuml;');

                return rp;
            },
            decode:function (text) {
                var rp = String(text);
                //
                rp = rp.replace("&aacute;", 'á');
                rp = rp.replace("&eacute;", 'é');
                rp = rp.replace("&iacute;", 'í');
                rp = rp.replace("&oacute;", 'ó');
                rp = rp.replace("&uacute;", 'ú');
                rp = rp.replace("&ntilde;", 'ñ');
                rp = rp.replace("&uuml;", 'ü');
                //
                rp = rp.replace("&Aacute;", 'Á');
                rp = rp.replace("&Eacute;", 'É');
                rp = rp.replace("&Iacute;", 'Í');
                rp = rp.replace("&Oacute;", 'Ó');
                rp = rp.replace("&Uacute;", 'Ú');
                rp = rp.replace("&Ñtilde;", 'Ñ');
                rp = rp.replace("&Üuml;", 'Ü');
                //
                return rp;
            }
        },
        normalize:function (text) {
            var rp = String(text);
            rp = rp.replace("á", 'a');
            rp = rp.replace("é", 'e');
            rp = rp.replace("í", 'i');
            rp = rp.replace("ó", 'o');
            rp = rp.replace("ú", 'u');
            rp = rp.replace("ü", 'u');
            //
            rp = rp.replace("Á", 'A');
            rp = rp.replace("É", 'E');
            rp = rp.replace("Í", 'I');
            rp = rp.replace("Ó", 'O');
            rp = rp.replace("Ú", 'U');
            rp = rp.replace("Ü", 'U');
            return rp ;
        },
        hasIgnoreFormat:function (find, text) {
            find = find.toLowerCase();
            text = text.toLowerCase();
            find = this.normalize(find);
            text = this.normalize(text);
            return new RegExp(find).test(text);
        }
    },
}





function appFunctions($routeParams, $rootScope, $http) {
    $(".content").click(function () {$rootScope.$$root.hideNofifymenu();});
    $rootScope.$f = $f;
    $rootScope.$$wait = function (callback, seconds) {return window.setTimeout(callback, seconds * 1000);};

    $rootScope.$$page={
        config:function (data) {
            if(data.title!=undefined) this.title = data.title;
            if(data.comment!=undefined) this.comment =data.comment;
            if(data.tabtitle!=undefined) this.tabtitle =data.tabtitle +' | Proevend'; else if(data.title!=undefined) this.tabtitle =data.title+' | Proevend';
        }
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

    };

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
                handles: handles,
                selected:[]
            };
        },
        configMenu:function (name, context ) {
            this.datatables[name].menu=context;
        },
        getMenu:function (name) {
            if(this.datatables[name].beforeMenu!=undefined)
                return this.datatables[name].beforeMenu(this.getSelectedObject(name));
            return this.datatables[name].menu;
        },
        handleMenu:function (name,beforeMenu) {
            this.datatables[name].beforeMenu=beforeMenu;
        },
        runAction:function (name, item) {
            item.action(this.getSelectedObject(name));
        },

        on:function (name, funcs) {
            this.datatables[name].click = funcs.click;
            this.datatables[name].dbclick = funcs.dbclick;
            this.datatables[name].rclick = funcs.rclick;
        },
        setDatas:function(name,datas){
            this.datatables[name].datas = datas;
        },
        getDatas:function (name) {
            return this.datatables[name].datas;
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
        },
        isSelected: function (name, object) {
            for(var i =0; i< this.datatables[name].selected.length; i++){
                if(this.datatables[name].selected[i]== object.id){
                    return true;
                }
            }
            return false;
        },
        addSelected: function (name, object) {
            for(var i =0; i< this.datatables[name].selected.length; i++){
                if(this.datatables[name].selected[i]== object.id){
                    return false;
                }
            }
            this.datatables[name].selected.push(object.id);
            return true;
        },
        removeSelected: function (name, object) {
            for(var i =0; i< this.datatables[name].selected.length; i++){
                if(this.datatables[name].selected[i]== object.id){
                    this.datatables[name].selected.splice(i, 1);
                    return true;
                }
            }

            return false;
        },
        removeSelectedAll: function (name) {
            this.datatables[name].selected = [];
        },
        getSelectedObject: function(name){
            var data = this.getDatas(name);
            for(var i =0; i< data.length; i++){
                if(this.datatables[name].selected[0]== data[i].id){
                    return data[i];
                }
            }
            return false;
        },
        selected: function (name, object) {
            if(this.datatables.click!=undefined) this.datatables.click(object);
            if(!this.isSelected(name, object)){
                this.addSelected(name, object);
            }else{
                this.removeSelected(name, object);
            }
        },
        selectedUnic: function (name, object) {
            if(this.datatables[name].selected.length>1){
                this.removeSelectedAll(name);
                this.addSelected(name, object);
            }else{
                if(!this.isSelected(name, object)){
                    this.removeSelectedAll(name);
                    this.addSelected(name, object);
                }else{
                    this.removeSelectedAll(name);
                }
            }
        }
    };
}

$(function () {
    String.prototype.hasIgnoreFormat=function (string) {
        return $f.string.hasIgnoreFormat(this, string);
    }

    String.prototype.cleanAccents=function () {
        return $f.string.normalize(this)
    }
    String.prototype.htmlEncode=function () {
        return $f.string.chaset.encode(this);
    }

    $.wait = function (callback, seconds) {return window.setTimeout(callback, seconds * 1000);};

    $.fn.extend({
        animateCss: function (animationName) {
            var animationEnd = 'webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend';
            this.addClass('animated ' + animationName).one(animationEnd, function () {
                if (/Out/.test(animationName)) {
                    $(this).hide();
                }
                $(this).removeClass('animated ' + animationName);
            });
        }
    });
});