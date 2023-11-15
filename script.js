const buttons = document.querySelectorAll('.buttonClass');

function activateButton(clickedButton) {
    buttons.forEach(button => button.classList.remove('active'));
    clickedButton.classList.add('active');
}

const buttons1 = document.querySelectorAll('.buttonClass1');

function activateButton1(clickedButton1) {
    buttons1.forEach(button1 => button1.classList.remove('active'));
    clickedButton1.classList.add('active');
}
