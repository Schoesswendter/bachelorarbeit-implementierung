$(document).ready(function() {
    var myStorage = localStorage;

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

    $("#consent").click(function() {
        console.log("clicked")
        console.log($("#accept_consent"))
        $("#accept_consent")[0].disabled = false;
    })

    $("#accept_consent").click(function() {
        if($("#consent")[0].checked) {
            myStorage.setItem('consent', 'accepted')
            $(".consent")[0].classList.remove("show")
            $(".consent")[0].classList.add("disabled")
            $(".curtain")[0].classList.remove("show")
            $(".curtain")[0].classList.add("disabled")
        }
    })
});