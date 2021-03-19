// let authIsAdmin = localStorage['isAdmin'];

// let auth = () => {
//     if (authIsAdmin === 'false') {
//         alert('You are not allowed here!')
//         window.location.replace('./login.html')

//     }
// }
// auth();

let createCourse = document.querySelector('#createCourse');

createCourse.addEventListener('submit', (e) => {
    e.preventDefault();

    let name = document.querySelector('#name').value;
    let price = document.querySelector('#price').value;
    let description = document.querySelector('#description').value;

    let body = {
        name,
        price,
        description
    }

    fetch('https://nrecto-course-booking.herokuapp.com/api/courses/', {
            method: "POST",
            body: JSON.stringify(body),
            headers: {
                'Content-Type': 'application/json',
                "Authorization": `Bearer ${localStorage['token']}`
            }
        })
        .then(res => res.json())
        .then(data => {
            
            if (data == false) {
                return Swal.fire({
                    title: 'Error!',
                    text: 'Something went wrong',
                    icon: 'error',
                    confirmButtonText: 'OK'
                    })
            } else {
                return Swal.fire({
                    title: 'Success!',
                    text: 'Course Created!',
                    icon: 'success',
                    confirmButtonText: 'COOL'
                    }).then( () => 
                    window.location.replace('./courses.html')
                    )
            }

        })




})