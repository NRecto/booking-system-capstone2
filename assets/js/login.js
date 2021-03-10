let logInUser = document.querySelector('#logInUser');
logInUser.addEventListener('submit', (e) => {
    e.preventDefault();

    let email = document.querySelector('#email').value;
    let password = document.querySelector('#password').value;


    let body = {
        email: email,
        password: password
    }

    fetch('http://localhost:4000/api/users/login/', {
            method: "POST",
            body: JSON.stringify(body),
            headers: {
                'Content-Type': 'application/json',
            }
        })
        .then(res => res.json())
        .then(data => {
                console.log(data)
                if (data) {
                    console.log(true)

                } else {
                    alert("Login failed!")
                    console.log(false)
                }
            }

        )
})