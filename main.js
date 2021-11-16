$(document).ready (function() {
    var altura=$(`.Menu`).offset().top;

    $(window).on (`scroll`, function(){
        if ($(window).scrollTop() > altura){
            $(`.Menu`).addClass(`Menu-fixed`)
        }else{
            $(`.Menu`).removeClass(`Menu-fixed`)
        }
    });
})