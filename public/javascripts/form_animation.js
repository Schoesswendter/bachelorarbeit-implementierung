function next(target) {
  var input = target.closest('.navigation').previousElementSibling;

  // Check if input is empty
  if (!input.checkValidity() || (input.nodeName == "select" && input.value == "")) {
    document.querySelector('body').classList.add('error');
    console.log(input.validationMessage)
    var tag = document.createElement("p");
    tag.classList.add("validationmsg")
    var text = document.createTextNode(input.validationMessage);
    tag.appendChild(text);
    target.closest('.enabled').appendChild(tag)
  } else {
    document.querySelector('body').classList.remove('error');

    let allerrors = document.querySelectorAll(".validationmsg")

    allerrors.forEach(element => {
      element.remove()
    });

    var enable = document.querySelector('fieldset.enabled'),
      nextEnable = enable.nextElementSibling;
    enable.classList.remove('enabled');
    enable.classList.add('disable');
    nextEnable.classList.add('enabled');

    // Switch active class on left list
    var active = document.querySelector('ul.items li.active'),
      nextActive = active.nextElementSibling;
    active.classList.remove('active');
    active.classList.add('filled');
    nextActive.classList.add('active');
  }
}

function back(target) {
  // get previous field
  var enable = document.querySelector('fieldset.enabled'),
    lastEnable = enable.previousElementSibling;
  enable.classList.remove('enabled');
  lastEnable.classList.add('enabled');

  // remove active class on left list
  var active = document.querySelector('ul.items li.active');
  active.classList.remove('active');
  active.previousElementSibling.classList.add('active');
  document.querySelector('body').classList.remove('error');
}

function keyDown(event) {
  var key = event.keyCode,
    target = document.querySelector('fieldset.enable .button');
  // keycode 13 = enter keycode 9 = tabulator
  if (key == 13 || key == 9) next(target);
}

window.onload = function () {
  var body = document.querySelector('body'),
    form = document.querySelector('form');
  if(form != null) {
    var count = form.querySelectorAll('fieldset').length;

    document.body.onmouseup = function (event) {
      var target = event.target || event.toElement;
      if (target.classList.contains("next")) next(target);
      if (target.classList.contains("back")) back(target);
    };
    document.addEventListener("keydown", keyDown, false);
  }
}