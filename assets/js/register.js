let registerForm = document.querySelector('#registerForm');
registerForm.addEventListener('submit', (e) => {
    e.preventDefault();
    let firstName = document.querySelector('#firstName').value;
    let lastName = document.querySelector('#lastName').value;
    let email = document.querySelector('#email').value;
    let mobileNo = document.querySelector('#mobileNo').value;
    let password = document.querySelector('#password').value;
    let confirmPassword = document.querySelector('#confirmPassword').value;
    let body = {
        firstName: firstName,
        lastName: lastName,
        email: email,
        mobileNo: mobileNo,
        password: password,
        confirmPassword: confirmPassword
    }
    fetch('https://nrecto-course-booking.herokuapp.com/api/users/', {
            method: "POST",
            body: JSON.stringify(body),
            headers: {
                'Content-Type': 'application/json',
            }
        })
        .then(res => res.json())
        .then(data => {
                // console.log(data)
                if (data) {
                    Swal.fire({
                        title: 'Succes!',
                        text: 'Registration Successful',
                        icon: 'success',
                        confirmButtonText: 'Cool'
                    })
                    .then( () => window.location.replace('./login.html') )
                } else {
                    Swal.fire({
                        title: 'Error!',
                        text: 'Something went wrong. Please try again',
                        icon: 'error',
                        confirmButtonText: 'Ok'
                      })
                }
            }

        )
})