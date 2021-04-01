function next(target) {
  var input = target.previousElementSibling;
  
  // Check if input is empty
  if (input.value === '') {
    body.classList.add('error');
  } else {
    body.classList.remove('error');
    
    var enable = document.querySelector('form label.enable'),
        nextEnable = enable.nextElementSibling;
    enable.classList.remove('enable');
    enable.classList.add('disable');
    nextEnable.classList.add('enable');
    
    // Switch active class on left list
    var active = document.querySelector('ul.items li.active'),
        nextActive = active.nextElementSibling;
    active.classList.remove('active');
    nextActive.classList.add('active');
  }
}

function keyDown(event) {
  var key = event.keyCode,
      target = document.querySelector('fieldset.enable .button');
  // keycode 13 = enter keycode 9 = tabulator
  if (key == 13 || key == 9) next(target);
}

var body = document.querySelector('body'),
    form = document.querySelector('form'),
    count = form.querySelectorAll('label').length;

document.body.onmouseup = function (event) {
    var target = event.target || event.toElement;
    if (target.classList.contains("button")) next(target);
};
document.addEventListener("keydown", keyDown, false);