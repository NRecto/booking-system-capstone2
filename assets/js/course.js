const urlParams = new URLSearchParams(window.location.search);
const courseId = urlParams.get('courseId');
const isAdmin = localStorage['isAdmin'];
const token = localStorage['token'];

// NAV BAR IF NOT LOGIN
let navbar = document.querySelector('.navbar');

if  (!token) {
    navbar.innerHTML = `<div class="container-fluid">
    <a class="navbar-brand" href="./../index.html">Zuitter</a>
    <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
        <span class="navbar-toggler-icon"></span>
    </button>
    <div class="collapse navbar-collapse" id="navbarNav">
        <ul class="navbar-nav ms-auto">
            <li class="nav-item ">
                <a class="nav-link active" aria-current="page" href="./../index.html">Home</a>
            </li>
            <li class="nav-item">
                <a class="nav-link" href="./pages/courses.html">Courses</a>
            </li>
        </ul>
        <ul class="navbar-nav">
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
            <a class="navbar-brand" href="./../index.html">Zuitter</a>
            <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                <span class="navbar-toggler-icon"></span>
            </button>
            <div class="collapse navbar-collapse" id="navbarNav">
                <ul class="navbar-nav ms-auto">
                    <li class="nav-item ">
                        <a class="nav-link active" aria-current="page" href="./../index.html">Home</a>
                    </li>
                    <li class="nav-item">
                        <a class="nav-link" href="./courses.html">Courses</a>
                    </li>
                </ul>
                <ul class="navbar-nav">
                    <li class="nav-item ">
                        <a href="./logout.html" class="nav-link ">Logout</a>
                    </li>
                </ul>
            </div>
        </div>
    `
}
// END NAVBAR VALIDATION

// console.log(courseId)
let url = `https://nrecto-course-booking.herokuapp.com/api/courses/${courseId}`;

fetch(url)
.then( res => res.json())
.then(data => {
// console.log(data.enrollees)
let courseName = document.querySelector('#courseName');
let courseDesc = document.querySelector('#courseDesc');
let coursePrice = document.querySelector('#coursePrice');
let adminData = document.querySelector('#adminData');

    courseName.innerHTML = data.name;
    courseDesc.innerHTML = data.description;
    coursePrice.innerHTML = data.price;

// console.log(data.enrollees)
let userData;
let userNo = 0;

if (isAdmin == 'true') {
    if ( data.enrollees == 0) {
        return userData = "No Enrollees yet."
    } else {
        let enrolleeData = data.enrollees.map( data => {
            userNo++
            return `
            <tr>   
            <td>${userNo}</td>
            <td>${data.userId}</td>
        </tr>
            `
        });
    
        userData = enrolleeData.join("");
    }
    courseName.innerHTML = data.name;
    courseDesc.innerHTML = data.description;
    coursePrice.innerHTML = data.price;
    adminData.innerHTML = `
                    <table class="table table-hover">
                        <thead>
                            <tr>   
                                <th>Enrolled User</th>
                                <th>User ID</th>
                            </tr>
                        </thead>
                        <tbody>
                            ${userData}
                        </tbody>
                    </table>
    `
}




document.querySelector('#enrollButton').addEventListener('click', () => {

    // validate if login
    if (!token) {
        alert("Login first, to enroll.")
        window.location.replace('./login.html')
    }
        
    fetch('https://nrecto-course-booking.herokuapp.com/api/users/enroll',
        {
            method: 'POST',
            headers: {
                'Content-Type' : 'application/json',
                'Authorization' : `Bearer ${localStorage['token']}`
            },
            body: JSON.stringify({courseId})
        }
    )
    .then( res => res.json() )
    .then( data => {
        if (!data) {
            alert("Something Went Wrong")
        } else {
            alert("Thank You for Enroll. Please Check your Email for more information.")
            window.location.replace('./courses.html')
        }
    })
    
})



})