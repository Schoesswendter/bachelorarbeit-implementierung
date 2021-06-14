var questionlocation = location.href.indexOf('?');

function FillForm() {
    if (questionlocation < 0) { return; }

    var q = location.href.substr(questionlocation + 1);

    var list = q.split('&');
    for (var i = 0; i < list.length; i++) {

        var param = list[i].split('=')[0]
        var value = list[i].split('=')[1]

        value = decodeURIComponent(value.replace(/\+/g, ' '))

        document.getElementsByName(param)[0].value = value;
    }
}

function FillDate() {
    let todays = document.querySelectorAll(".today")

    todays.forEach(element => {
        var today = new Date();
        var dd = String(today.getDate()).padStart(2, '0');
        var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
        var yyyy = today.getFullYear();

        today = dd + '.' + mm + '.' + yyyy;
        element.innerHTML = today;
    });

}

document.addEventListener('DOMContentLoaded', function() {
    FillForm();
    FillDate();
})