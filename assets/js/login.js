let logInUser = document.querySelector('#logInUser');
logInUser.addEventListener('submit', (e) => {
    e.preventDefault();

    let email = document.querySelector('#email').value;
    let password = document.querySelector('#password').value;


    let body = {
        email: email,
        password: password
    }

    fetch('https://nrecto-course-booking.herokuapp.com/api/users/login/', {
            method: "POST",
            body: JSON.stringify(body),
            headers: {
                'Content-Type': 'application/json',
            }
        })
        .then(res => res.json())
        .then(data => {
                // console.log(data)
                if (!data) {
                    return Swal.fire({
                        title: 'Error!',
                        text: 'Login Failed!',
                        icon: 'error',
                        confirmButtonText: 'OK'
                    })
                }else {
                    localStorage.setItem('token', data.Token)

                    fetch('https://nrecto-course-booking.herokuapp.com/api/users/details/', {
                            headers: {
                                "Authorization": `Bearer ${localStorage['token']}`
                            }
                        })
                        .then(res => {
                            return res.json()
                        })
                        .then(data => {
                            localStorage['id'] = data._id;
                            localStorage['isAdmin'] = data.isAdmin;
    
                            window.location.replace('./courses.html')
                        })
                }

                
            })
})