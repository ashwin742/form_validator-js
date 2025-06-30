const form = document.getElementById('form');
const username = document.getElementById('username');
const email = document.getElementById('email');
const password = document.getElementById('password')
const password2 = document.getElementById('password2');


//Error input message
function showError(input, message) {
    const formControl = input.parentElement;
    formControl.className = 'form-control error';
    const small = formControl.querySelector('small');
    small.innerText = message;
}


//Show Success message
function showSuccess(input) {
    const formControl = input.parentElement;
    formControl.className = 'form-control success';
}

//Email Validation
function checkEmail(input) {
    const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if (re.test(input.value.trim())) {
        showSuccess(input);
    } else {
        showError(input, 'Email is not valid');
    }
}


//check if fields were field
function checkRequired(inputArr) {
    inputArr.forEach(function(input) {
        if (input.value.trim() === '') {
            showError(input, `${getFieldName(input)} is required`);
        } else {
            showSuccess(input);
        }
    });
}

//getFieldName
function getFieldName(input) {
    return input.id.charAt(0).toUpperCase() + input.id.slice(1);
}


//check input Length
function checkLength(input, min, max) {
    if (input.value.length < min) {
        showError(input, `${getFieldName(input)} must be at lease ${min} chracters`);
    } else if (input.value.length > max) {
        showError(input, `${getFieldName(input)} must be less ${max}`);
    } else {
        showSuccess(input);
    }
}

//check if password match
function checkPasswordMatch(input1, input2) {
    if (input1.value !== input2.value) {
        showError(input2, 'Passwords do not match');
    }
}

form.addEventListener('submit', function(e) {
    e.preventDefault(); //prevents from actuallly by default submit
    checkRequired([username, email, password, password2]);
    checkLength(username, 3, 15);
    checkLength(password, 6, 25);
    checkEmail(email);
    checkPasswordMatch(password, password2);
});