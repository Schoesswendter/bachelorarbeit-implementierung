$(document).ready(function() {
    $(".scroll--down.animate").click(function() {
        var vheight = $(window).height();
        $('html, body').animate({
            scrollTop: (Math.floor($(window).scrollTop() / vheight) + 1) * vheight
        }, 2500);
    })

    $(".scroll--down").click(function() {
        var vheight = $(window).height();
        $('html, body').animate({
            scrollTop: (Math.floor($(window).scrollTop() / vheight) + 1) * vheight
        }, 0);
    })
});