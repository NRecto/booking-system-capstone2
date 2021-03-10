let authIsAdmin = localStorage['isAdmin'];

let auth = () => {
    if (authIsAdmin === 'false') {
        alert('You are not allowed here!')
        window.location.replace('./login.html')

    }
}
auth();

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

    fetch('http://localhost:4000/api/courses/', {
            method: "POST",
            body: JSON.stringify(body),
            headers: {
                'Content-Type': 'application/json',
                "Authorization": `Bearer ${localStorage['token']}`
            }
        })
        .then(res => res.json())
        .then(data => {
            if (!data) return ('Something went wrong');

            alert('Course created succesfully!')

            window.location.replace('./courses.html')
        })




})