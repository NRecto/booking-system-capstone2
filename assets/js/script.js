let token = localStorage['token'];
let navbar = document.querySelector('.navbar');

if  (!token) {
    navbar.innerHTML = `<div class="container-fluid">
    <a class="navbar-brand" href="./index.html">Zuitter</a>
    <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
        <span class="navbar-toggler-icon"></span>
    </button>
    <div class="collapse navbar-collapse" id="navbarNav">
        <ul class="navbar-nav ms-auto">
            <li class="nav-item ">
                <a class="nav-link active" aria-current="page" href="./index.html">Home</a>
            </li>
            <li class="nav-item">
                <a class="nav-link" href="./pages/courses.html">Courses</a>
            </li>
        </ul>
        <ul class="navbar-nav ">
            <li class="nav-item ">
                <a href="./pages/login.html" class="nav-link ">Login</a>
            </li>
            <li class="nav-item">
                <a href="./pages/register.html" class="nav-link ">Register</a>
            </li>
        </ul>
    </div>
</div>`
} else {
    navbar.innerHTML = `
    <div class="container-fluid">
            <a class="navbar-brand" href="./index.html">Zuitter</a>
            <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                <span class="navbar-toggler-icon"></span>
            </button>
            <div class="collapse navbar-collapse" id="navbarNav">
                <ul class="navbar-nav ms-auto">
                    <li class="nav-item ">
                        <a class="nav-link active" aria-current="page" href="./index.html">Home</a>
                    </li>
                    <li class="nav-item">
                        <a class="nav-link" href="./pages/courses.html">Courses</a>
                    </li>
                </ul>
                <ul class="navbar-nav ">
                    <li class="nav-item ">
                        <a href="./pages/logout.html" class="nav-link ">Logout</a>
                    </li>
                </ul>
            </div>
        </div>
    `
}
fetch('https://nrecto-course-booking.herokuapp.com/api/courses/')
    .then(res => {
        return res.json()
    })
    .then(data => {
        let courseContainer = document.querySelector('#courseContainer');
        let courseData = data.map( course => {
            return `
                    <div class="col-md-6 my-3 d-flex flex-nowrap mx-auto">
                        <div class="card">
                        <div class="card-body">
                            <h5 class="card-title">${course.name}</h5>
                            <p class="card-text text-right">&#8369; ${course.price}</p>
                            <p class="card-text">${course.description}</p>
                        </div>
                        </div>
                    </div>
                    `
        })
        courseContainer.innerHTML = courseData.join("");
    })