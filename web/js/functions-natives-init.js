/**
 * Created by Promarked on 31/01/2017.
 */
var $clock = 0;

function submitAjax(form, actions) {
    if (!actions) {
        actions = {
            init: function () {
            }, final: function () {
            }, done: function (request) {
            }, fail: function (error) {
            }
        }
    }
    if (actions.init)
        actions.init();
    var action = $(form).attr("action");
    var method = $(form).attr("method");
    var formData = new FormData($(form)[0]);

    $.ajax({
        type: method,
        url: action,
        data: formData,
        enctype: 'multipart/form-data',
        processData: false,
        contentType: false,
    }).done(function (request, textStatus, jqXHR) {
        var status = request.status;
        var type = request.type;
        if (status == "success") {
            if (type == "redirect") {
                window.location = request.location;
            }
            if (request.notification)
                notification("topright", "success", "fa fa-exclamation-circle vd_green", request.notification.title, request.notification.comment);

        } else if (status == "error") {
            if (request.notification)
                notification("topright", "error", "fa fa-exclamation-circle vd_yellow", request.notification.title, request.notification.comment);
        }
        if (request["data-import"] !=undefined) {
            var list = request["data-import"];
            for(var i =0; i< list.length; i++){
                console.log("Importando dato [data: "+list[i].data+", name"+list[i].name+"]");
                $("[data-import='"+list[i].name+"']").val(list[i].data);
            }
        }
        if (actions.done)
            actions.done(request);
        if (actions.final)
            actions.final();
    }).fail(function (jqXHR, textStatus, errorThrown) {
        notification("topright", "notify", "fa fa-exclamation-triangle vd_yellow", "¡Algo esta mal", "No se ha podido establecer comunicacion.");
        if (actions.done)
            actions.done(errorThrown);
        if (actions.final)
            actions.final();
    });

    return false;
}

function updataSelects() {
    $("[select-dataurl]").each(function () {
        var tag = this;
        var nameList = $(tag).attr("select-listname");
        var child = $(tag).children("[select-child]")[0];
        url = $(tag).attr("select-dataurl");
        var exportName = $(tag).attr("data-export");

        var tagExport = $('[data-import="'+exportName+'"]')[0];
        sendAjax(url, {},"POST", {

            done:function (request) {
                var list;
                $(".dropdown-item").unbind();
                if(nameList!=undefined){
                    list = request[nameList];
                }else{
                    list = request;
                }
                $(child).html("");
                for(var i=0; i<list.length; i++){
                    var obje = list[i]
                    $(child).append('<a class="dropdown-item" href="javasctript:void(0)" data-id="'+obje.number+'"><div style="display: table-cell; vertical-align: middle" class="dropdown-item-content"><div class="rounded-circle contant-menu-image" load-image="'+obje.photo+'" ></div> <div class="contant-menu-text">'+obje.name+'</div> </div></a>')
                }

                $(".dropdown-item").click(function () {
                    var clon = $(this).children(".dropdown-item-content").clone();
                    $(tag).children("button").html(clon);
                    $(tagExport).val($(this).attr("data-id"));
                });
                loadImagesAllHtml();
            }
        })
    }) ;
}

$(function () {


    $('.sub-menu').click(function () {
        alert("Sub Menu Show");
        onClickMenu(this);
    });
});


function sendAjax(url, data, method, actions) {
    if (actions==undefined) {
        actions = {
            init: function () {
            }, final: function () {
            }, done: function (request) {
            }, fail: function (error) {
            }
        }
    }
    if (actions.init!==undefined)
        actions.init();
    var action = url;

    $.ajax({
        type: method,
        url: action,
        data: data,
        enctype: 'multipart/form-data',
        processData: false,
        contentType: false,
    }).done(function (request, textStatus, jqXHR) {
        var status = request.status;
        var type = request.type;
        if (status == "success") {
            if (type == "redirect") {
                window.location = request.location;
            }
            if (request.notification)
                notification("topright", "success", "fa fa-exclamation-circle vd_green", request.notification.title, request.notification.comment);

        } else if (status == "error") {
            if (request.notification)
                notification("topright", "error", "fa fa-exclamation-circle vd_yellow", request.notification.title, request.notification.comment);
        }
        if (actions.done!==undefined)
            actions.done(request);
        if (actions.final!==undefined)
            actions.final();
    }).fail(function (jqXHR, textStatus, errorThrown) {
        notification("topright", "notify", "fa fa-exclamation-triangle vd_yellow", "¡Algo esta mal", "No se ha podido establecer comunicacion.");
        if (actions.done!==undefined)
            actions.done(errorThrown);
        if (actions.final!==undefined)
            actions.final();
    });

    return false;
}

function loadImagesAllHtml() {
    $("[load-image]").each(function () {
        var tag = this;
        if($(tag).children(".loader").length==0){
            $(tag).css({"position":"relative"});
            $(tag).append('<div class="loader"></div>');
        }
        sendAjax("file/base64/"+$(this).attr("load-image"),
            {},
            "GET",
            {
                "done":function (request) {
                    $(tag).children(".loader").css({display:"none"});
                    $(tag).css({"background-image":"url('"+request+"')"});
                    $(tag).removeAttr("load-image");
                }
            }
        );
    });
}


function initDatePicketrange() {

    $(".input-daterange").datepicker({
        format: 'yyyy-mm-dd',
        startDate: '+1d',
        language: "es"
    });
    $("[action-number]").click(function () {

        var action = $(this).attr("action-number");
        var input = $(this).attr("for");
        var value = parseInt($("#" + input).val());
        if (!value)
            value = 1;
        if (action == "plus")
            value++;
        else if (action == "minus")
            value--;
        if (value <= 0)
            value = 1;
        $("#" + input).val(value);


    });

}

function initDatePicketrange() {

    $(".input-daterange").datepicker({
        format: 'yyyy-mm-dd',
        startDate: '+1d',
        language: "es"
    });
    $("[action-number]").click(function () {
        var action = $(this).attr("action-number");
        var input = $(this).attr("for");
        var value = parseInt($("#" + input).val());
        if (!value)
            value = 1;
        if (action == "plus")
            value++;
        else if (action == "minus")
            value--;

        if (value <= 0)
            value = 1;

        $("#" + input).val(value);
    });

}

function initTimePicket() {

    $(".input-time").clockpicker({
        placement: 'bottom',
        align: 'left',
        autoclose: true
    });


}

function initAutoSizeText() {
    autosize($('.aurosize'));
}

function onClickMenu(tag) {
    console.log("Click menu");
    var brother = $(tag).siblings('.child-menu')[0];
    if ($(brother).hasClass("open-menu"))
        $(brother).removeClass("open-menu");
    else {
        $(".open-menu").removeClass("open-menu");
        $(brother).addClass("open-menu");
    }
}
