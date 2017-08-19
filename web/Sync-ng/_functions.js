/**
 * Created by Promarked on 5/08/2017.
 */


var $f = {
    defaultValue: function (variable, value) {
        if (variable == undefined) {
            variable = value;
        }
        return variable;
    },
    string: {
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
            decode: function (text) {
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
        normalize: function (text) {
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
            return rp;
        },
        hasIgnoreFormat: function (find, text) {
            find = find.toLowerCase();
            text = text.toLowerCase();
            find = this.normalize(find);
            text = this.normalize(text);
            return new RegExp(find).test(text);
        }
    },
}


function appFunctions($routeParams, $rootScope, $http) {
    $(".content").click(function () {
        $rootScope.$$root.hideNofifymenu();
    });
    $rootScope.$f = $f;
    $$wait = $rootScope.$$wait = function (callback, seconds) {
        return window.setTimeout(callback, seconds * 1000);
    };

    $$page = $rootScope.$$page = {
        data: {},
        config: function (data) {
            if (data.title != undefined) this.data.title = data.title;
            if (data.comment != undefined) this.data.comment = data.comment;
            if (data.tabtitle != undefined) this.data.tabtitle = data.tabtitle + ' | Proevend'; else if (data.title != undefined) this.data.tabtitle = data.title + ' | Proevend';
        },
        get: function (name) {
            return this.data[name];
        }
    }

    $$form = $rootScope.$$form = {
        data: {form: {}},
        $updateSelect: function (control, option) {
            if (control.type == "select") {
                control.value = option.value;
                control.valueLabel = option.label;
            }
        },
        $control: function (control, value, action) {
            if (control.type == "date") {
                control.valid = false;
                control.class = "";
                if ((control.value == undefined || control.value == "")) {
                    if (/blur/.test(action) && control.required) {
                        control.class = "value-invalid";
                    } else {
                        control.valid = true;
                    }
                } else {
                    control.valid = true;
                }
            }

            if (control.type == "select") {

                var event = window.event;
                if(!(event.keyCode == 38 || event.keyCode == 40 || event.keyCode == 13)){
                    control.index = -1;
                }

                if (value != undefined) control.valueLabel = value;
                control.valid = false;
                control.class = "";
                var isExact = false;
                if ((control.valueLabel == undefined || control.valueLabel == "")) {
                    if (/blur/.test(action) && control.required) {
                        control.class = "value-invalid";
                    } else {
                        control.valid = true;
                        control.results = control.options;
                    }
                } else {
                    var find = control.valueLabel.replace("  ", " ").cleanAccents();
                    find = find.replace(/,|\s/, "(.)*");
                    var results = [], isExact = false, regExp = new RegExp(find, 'gi');
                    for (var i = 0; i < control.options.length; i++) {
                        var object = control.options[i];
                        if (regExp.test(object.label.cleanAccents())) results.push(object);
                        if (control.valueLabel == object.label) {
                            isExact = true;
                            control.value = object.value;
                            control.valid = true;
                            break;
                        }
                    }


                    if (!isExact) {
                        if (/blur/.test(action)) {
                            control.class = "value-invalid";
                        } else {
                            if (results.length > 0) {
                                control.results = results;
                            } else {
                                control.class = "value-invalid";
                                control.results = control.options;
                            }
                        }
                    } else {
                        control.valid = true;
                    }
                }

                if(event.keyCode == 38){
                    if(control.index>0)
                        control.index=control.index-1;
                }else if(event.keyCode == 40){
                    if(control.index<control.results.length-1)
                        control.index=control.index+1;
                }else if(event.keyCode == 13){
                    if(control.index>=0 && control.index<=control.results.length-1)
                        $$form.$updateSelect(control, control.results[control.index]);
                    control.index=-1;
                }else{
                    control.index=-1;
                }
            }

            if (control.type == "autocomplete") {
                if (value != undefined) control.value = value;
                control.class = "";
                var value = control.value.replace("  ", " ").cleanAccents();
                value = control.value.replace(/,|\s/, "(.)*");
                var results = [], isExact = false;
                var regExp = new RegExp(value, 'gi');
                if (value != undefined && value != "" && value != " " && (control.searchMin == undefined || (value.length >= control.searchMin)))
                    for (var i = 0; i < control.options.length; i++) {
                        var object = control.options[i];
                        if (regExp.test(object.cleanAccents())) results.push(object);

                        if (control.value == object) {
                            isExact = true;
                            results = [];
                            break;
                        }
                    }
                control.results = results;

                if (control.value != undefined && control.value != "") {
                    if (control.strict) {
                        if (isExact) {
                            control.results = [];
                            control.valid = true;
                        } else {
                            if (/blur/.test(action))
                                control.class = "value-invalid";
                            control.valid = false;
                        }
                    } else {
                        if (control.pattern != undefined) {
                            if (control.pattern.test(control.value)) {
                                control.results = results;
                                control.valid = true;
                            } else {
                                if (/blur/.test(action)) {
                                    control.class = "value-invalid";
                                }
                                control.valid = false;
                            }
                        }
                    }
                } else {
                    if (/blur/.test(action)) {
                        if (control.required) {
                            control.results = control.option;
                            control.class = "value-invalid";
                            control.valid = false;
                        } else {
                            control.valid = true;
                        }
                    }
                }

            }

            if (control.type == "email") {
                control.valid = false;
                control.class = "";
                var pattern = /^\w+(\.\w+)*@\w+(\.\w+)*(\.[a-zA-Z]{2,4})$/;
                if (control.required) {
                    control.valid = false;
                    if ((control.value == undefined || control.value == ""))
                        if ("blur" == (action) && control.required) control.class = "value-invalid";
                        else control.valid = true;
                    else if ("blur" == (action))
                        if (pattern.test(control.value))
                            control.valid = true;
                        else control.class = "value-invalid";
                } else {
                    if ((control.value != undefined && control.value != ""))
                        if ("blur" == (action))
                            if (pattern.test(control.value))
                                control.valid = true;
                            else control.class = "value-invalid";
                }
            }

            if (control.type == "input" || control.type == "text" || control.type == "textarea") {
                control.valid = false;
                control.class = "";

                if(control.value != undefined && control.value != "" ){
                    if(control.pattern!=undefined){
                        if(control.pattern.test(control.value)){
                            control.valid = true;
                        }else {
                            if(action=="blur")
                                control.class = "value-invalid";
                        }
                    }else{
                        control.valid = true;
                    }
                }else{
                    if(control.required){
                        if(action=="blur")
                            control.class = "value-invalid";
                    }else{
                        control.valid = true;
                    }
                }


            }
        },
        add: function (name, controls, title, submit, cancel, action) {
            $f.defaultValue(submit, "Aceptar");
            $f.defaultValue(cancel, "Cancelar");
            for (var i = 0; i < controls.length; i++) {
                var control = controls[i];

                if (control.type == "select") {
                    controls[i].valueLabel = "";
                    for (var j = 0; j < control.options.length; j++) {
                        var option = control.options[j];
                        if (typeof option == 'string') {
                            var newOption = {value: option, label: option};
                            controls[i].options[j] = newOption;
                        }
                    }
                } else {
                    controls[i].value = "";
                }
            }

            this.data.form[name] = {
                name: name, controls: controls, title: title, submit: submit, cancel: cancel, action: action
            }
        },
        get: function (name) {
            return this.data.form[name];
        },
        reset: function (name) {
            for (var i = 0; i < this.get(name).controls.length; i++) {
                this.data.form[name].controls[i].class = "";
            }
        },
        submit: function (name) {
            var form = this.get(name);
            var controls = form.controls;
            var invalids = [];
            var data ={};
            for (var i = 0; i < controls.length; i++) {
                var control = controls[i];
                $$form.$control(control, control.value, "blur");
                if (!control.valid) {
                    invalids.push(control.label);
                }else{
                    data[control.name] = control.value;
                }
            }
            if (invalids.length > 0) {
                $.notify({
                    title: '<h2>Rebice los campos</h2>',
                    message: '<b> <ul><li>' + invalids.join('</li><li>') + '</li></ul></b>.'
                }, {
                    type: 'danger'
                });
            } else {
                $.notify({
                    title: '<h2>Datos Correctos</h2>',
                    message: 'Enviando datos.'
                }, {
                    type: 'info'
                });
                if(name=="modal")
                    $$modal.hide();
                this.data.form[name].action(data);

            }
        }

    };

    $$modal = $rootScope.$$modal = {
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
        },
        setForm: function (name, options) {
            var form = $$form.get(name);
            var action = options.action || form.action;
            var submit = options.submit || form.submit;
            var cancel = options.cancel || form.cancel;
            var title = options.title || form.title;

            $rootScope.$$form.add("modal", form.controls.clone(), title, submit, cancel, form.action);
        },
        resetForm: function () {
            $rootScope.$$form.reset("modal");
        },


    }

    $$menu = $rootScope.$$menu = {
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

    $$root = $rootScope.$$root = {
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

    $$submenu = $rootScope.$$submenu = {
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

    $$datatable = $rootScope.$$datatable = {
        datatables: [],
        add: function (name, columns, icon, handles) {
            this.datatables[name] = {
                name: name,
                columns: columns,
                icon: icon,
                handles: handles,
                selected: []
            };
        },
        configMenu: function (name, context) {
            this.datatables[name].menu = context;
        },
        getMenu: function (name, type) {
            if (type != undefined) {
                if (type == 'nav-object') {
                    if (this.getSelectedObjects(name).length > 0) {
                        var menutemp = this.datatables[name].menu;
                        var menu = [];
                        for (var i = 0; i < menutemp.length; i++) {
                            if (menutemp[i].nav && this.menuConditional(name, menutemp[i]))
                                menu.push(menutemp[i]);
                        }
                        this.datatables[name].menu$temp = menu;
                        return menu;
                    } else {
                        return this.datatables[name].menu$temp;
                    }
                }

            } else {

            }
            return this.datatables[name].menu;
        },
        onMenu: function (name, object) {
            if (this.datatables[name].beforeMenu)
                this.datatables[name].beforeMenu(object);

            var is = false;
            var objects = this.getSelectedObjects(name);
            for (var i = 0; i < objects.length && !is; i++)
                if (objects[i].id == object.id) is = true;
            showable = true;
            var e = window.event;
            if (!is)
                this.datatables[name].selected = [object.id];

            $('#context-menu-table').css({"position": "absolute", "top": e.pageY, "left": e.pageX, "display": "block"});
            $('#context-menu-table').show();
            showable = false;

        },
        handleMenu: function (name, beforeMenu) {
            this.datatables[name].beforeMenu = beforeMenu;
        },


        getLabelSelected: function (name) {
            var l = this.getView(name).selected.length;

            if (l == 0) {
                return this.datatables[name].labelSelected$temp;
            }
            if (l < 2) {
                var object = this.getSelectedObject(name);
                if (this.datatables[name].beforeLabelSelect != undefined)
                    this.datatables[name].labelSelected$temp = this.datatables[name].beforeLabelSelect(object);

                else if (object.name != undefined)
                    this.datatables[name].labelSelected$temp = object.name;
                else if (object.firstName != undefined && object.lastName != undefined)
                    this.datatables[name].labelSelected$temp = object.firstName + " " + object.lastName;
                else if (object.firstName != undefined)
                    this.datatables[name].labelSelected$temp = object.firstName;
                else this.datatables[name].labelSelected$temp = object[1];

                return this.datatables[name].labelSelected$temp;
            } else if (l > 1) {
                this.datatables[name].labelSelected$temp = l + " Objetos seleccionados";
                return this.datatables[name].labelSelected$temp;
            }

        },
        runAction: function (name, item) {
            var objects = this.getSelectedObjects(name);
            var cont;
            if (objects.length > 0) {
                for (var i = 0; i < objects.length; i++) {
                    cont = item.action(objects[i]);
                    if (cont != undefined && !cont)
                        break;
                }
            } else {
                item.action(objects[i]);
            }

        },

        on: function (name, funcs) {
            this.datatables[name].click = funcs.click;
            this.datatables[name].dbclick = funcs.dbclick;
            this.datatables[name].rclick = funcs.rclick;
        },
        setDatas: function (name, datas) {
            this.datatables[name].datas = datas;
        },
        getDatas: function (name) {
            return this.datatables[name].datas;
        },
        getView: function (name) {
            return this.datatables[name];
        },
        getValue: function (datatable, name, object) {
            if (this.datatables[datatable].handles[name] != undefined) {
                return this.datatables[datatable].handles[name](object);
            } else {
                return object[name];
            }
        },
        isSelected: function (name, object) {
            for (var i = 0; i < this.datatables[name].selected.length; i++) {
                if (this.datatables[name].selected[i] == object.id) {
                    return true;
                }
            }
            return false;
        },
        addSelected: function (name, object) {
            for (var i = 0; i < this.datatables[name].selected.length; i++) {
                if (this.datatables[name].selected[i] == object.id) {
                    return false;
                }
            }
            this.datatables[name].selected.push(object.id);
            return true;
        },
        removeSelected: function (name, object) {
            for (var i = 0; i < this.datatables[name].selected.length; i++) {
                if (this.datatables[name].selected[i] == object.id) {
                    this.datatables[name].selected.splice(i, 1);
                    return true;
                }
            }

            return false;
        },
        removeSelectedAll: function (name) {
            this.datatables[name].selected = [];
        },
        getSelectedObject: function (name) {
            var data = this.getDatas(name);
            for (var i = 0; i < data.length; i++) {
                if (this.datatables[name].selected[0] == data[i].id) {
                    return data[i];
                }
            }
            return false;
        },
        getSelectedObjects: function (name) {
            var data = this.getDatas(name);
            var objects = [];
            for (var i = 0; i < data.length; i++) {
                for (var j = 0; j < this.datatables[name].selected.length; j++)
                    if (this.datatables[name].selected[j] == data[i].id) {
                        objects.push(data[i]);
                    }
            }
            return objects;
        },
        selected: function (name, object) {
            if (this.datatables[name].beforeMenu)
                this.datatables[name].beforeMenu(object);
            if (this.datatables.click != undefined) this.datatables.click(object);
            if (!this.isSelected(name, object)) {
                this.addSelected(name, object);
            } else {
                this.removeSelected(name, object);
            }
        },
        selectedUnic: function (name, object) {
            if (this.datatables[name].beforeMenu)
                this.datatables[name].beforeMenu(object);

            this.datatables[name].selected = [object.id];
        },
        menuConditional: function (name, menu) {
            var objects = this.getSelectedObjects(name);
            var is = true;
            if (menu.if != undefined)
                for (var i = 0; i < objects.length && is; i++) {
                    is = menu.if(objects[i], objects.length);
                }
            return is;
        }
    };
}

$(function () {
    String.prototype.hasIgnoreFormat = function (string) {
        return $f.string.hasIgnoreFormat(this, string);
    }

    String.prototype.cleanAccents = function () {
        return $f.string.normalize(this)
    }
    String.prototype.htmlEncode = function () {
        return $f.string.chaset.encode(this);
    }
    Array.prototype.clone = function () {
        return this.slice(0);
    };

    $.wait = function (callback, seconds) {
        return window.setTimeout(callback, seconds * 1000);
    };

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