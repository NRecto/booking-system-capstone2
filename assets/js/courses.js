
let adminUser = localStorage['isAdmin'];
let adminButton = document.querySelector('#adminButton');

// NAV BAR IF NOT LOGIN

let token = localStorage['token'];
let navbar = document.querySelector('.navbar');

if  (!token) {
    navbar.innerHTML = `<div class="container-fluid">
    <a class="navbar-brand" href="./../index.html">Campeón</a>
    <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
        <span class="navbar-toggler-icon"></span>
    </button>
    <div class="collapse navbar-collapse" id="navbarNav">
        <ul class="navbar-nav ms-auto">
            <li class="nav-item ">
                <a class="nav-link " aria-current="page" href="./../index.html">Home</a>
            </li>
            <li class="nav-item">
                <a class="nav-link active" href="./courses.html">Courses</a>
            </li>
        </ul>
        <ul class="navbar-nav">
            <li class="nav-item ">
                <a href="./login.html" class="nav-link ">Login</a>
            </li>
            <li class="nav-item">
                <a href="./register.html" class="nav-link ">Register</a>
            </li>
        </ul>
    </div>
</div>`
} else {
    navbar.innerHTML = `
    <div class="container-fluid">
            <a class="navbar-brand" href="./../index.html">Campeón</a>
            <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                <span class="navbar-toggler-icon"></span>
            </button>
            <div class="collapse navbar-collapse" id="navbarNav">
                <ul class="navbar-nav ms-auto">
                    <li class="nav-item ">
                        <a class="nav-link active" aria-current="page" href="./../index.html">Home</a>
                    </li>
                    <li class="nav-item">
                        <a class="nav-link active" href="./courses.html">Courses</a>
                    </li>
                    <li class="nav-item">
                        <a href="./profile.html" class="nav-link ">Profile</a>
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
let cardFooter;

// ADD COURSE BUTTON IF ADMIN
if (adminUser == 'false' || !adminUser) {
    adminButton == "";
} else {
    adminButton.innerHTML = `
            <div class="col-12 text-center my-5">
                <a href="./addCourse.html" class="btn btn-primary adminButton">Add Course</a>
            </div>
            `
}

fetch('https://nrecto-course-booking.herokuapp.com/api/courses/')
    .then(res => {
        return res.json()
    })
    .then(data => {
        console.log(data)
        // if not admin show only active courses
        let activeCourse = [];
        if ( adminUser == 'false' ) {
            data.forEach( course => { 
                if (course.isActive == true) {
                    activeCourse.push(course)
                }
            })
        } else { // otherwise if admin show all courses
            data.forEach( course => {
                return activeCourse.push(course);
            })
        }
        // DYNAMICALLY CHANGE THE FOOTER ACCORDING TO isAdmin
        function displayCardFooter(courseId) {
            if (adminUser == 'false' || !adminUser) {
                cardFooter = 
                ` 
                    <a href="./course.html?courseId=${courseId}" class="btn btn-primary">

                        Select Course

                    </a>
                `
            } else {
                    cardFooter = 
                    `
                    <div class="row">
                        <div class="col-12 col-md-6">
                            <a href="./editCourse.html?courseId=${courseId}" class="btn btn-primary editButton">

                                Edit

                            </a>
                            <a href="./course.html?courseId=${courseId}" class="btn btn-warning checkButton">

                            Check Course

                            </a>
                        </div>
                        <div class="col-12 col-md-6">
                            <div class="col-12" id="courseActive"><p id="courseActiveText"></p></div>
                        </div>
                    </div>
                    `
            }
            return cardFooter;
        }
        
        let courseContainer = document.querySelector("#courseContainer");
        let seeMore;
        let courseData = activeCourse.map(elem => {
            // IF THE DESCRIPTION IS OVER 500 CHARACTERS THEN SEE MORE
            if (elem.description.length > 500) {
                seeMore = elem.description.slice(0,500)
            } else {
                seeMore = elem.description;
            }
            return `
            <div class="col-12 my-3 d-flex justify-content-center" data-aos="zoom-in" data-aos-duration="1500" data-aos-easing="ease-in-out">
                <div class="card">
                    <div class="card-body">
                    <h2 class="card-title">${elem.name}</h2>
                    <p class="card-text text-right">&#8369; ${elem.price}</p>
                    <p class="card-text">${seeMore}<span class="text-secondary"> ... Select course to see more.</span></p>
                    </div>
                    <div class="card-footer ">
                    ${displayCardFooter(elem._id)}
                    </div>
                </div>
            </div>`
        })
        courseContainer.innerHTML = courseData.join(" ");


    })