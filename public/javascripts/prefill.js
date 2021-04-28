var questionlocation = location.href.indexOf('?');

function FillForm() {
    if (questionlocation < 0) { return; }

    var q = location.href.substr(questionlocation + 1);

    var list = q.split('&');
    for (var i = 0; i < list.length; i++) {

        var param = list[i].split('=')[0]
        var value = list[i].split('=')[1]

        value = decodeURIComponent(value)

        document.getElementsByName(param)[0].value = value;
    }
}

document.addEventListener('DOMContentLoaded', function() {
    FillForm();
})