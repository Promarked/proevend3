$(function () {
    $("[app-action='click-target']").click(function () {

        if($(this).siblings('div.child-menu.sub').hasClass("show")){
            $(this).siblings('div.child-menu.sub').removeClass("show");
        }else{
            $('div.child-menu.sub.show').removeClass("show");
            $(this).siblings('div.child-menu.sub').addClass("show");
        }
    });
});