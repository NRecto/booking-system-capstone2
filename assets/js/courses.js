
let adminUser = localStorage['isAdmin'];
let adminButton = document.querySelector('#adminButton');

let cardFooter;

// ADD COURSE BUTTON IF ADMIN
if (adminUser == 'false' || !adminUser) {
    adminButton == "";
} else {
    adminButton.innerHTML = `
            <div class="col-12 text-center my-5">
                <a href="./addCourse.html" class="btn btn-primary">Add Course</a>
            </div>
            `
}

fetch('https://nrecto-course-booking.herokuapp.com/api/courses/')
    .then(res => {
        return res.json()
    })
    .then(data => {
        // console.log(data)
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
        // DYNAMICALLY CHANGE THE FOOTER ACCPRDING TO isAdmin
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
                        <a href="./editCourse.html?courseId=${courseId}" class="btn btn-primary editButton">

                            Edit

                        </a>
                        <a href="./course.html?courseId=${courseId}" class="btn btn-warning checkButton">

                        Check Course

                        </a>
                    `
            }
            return cardFooter;
        }
        
        

        // const toggleSwitch = document.querySelector('.card-footer');
        
        // toggleSwitch.addEventListener('change', () =>{
        //     console.log("test")
        // });

        let courseContainer = document.querySelector("#courseContainer");
        let courseData = activeCourse.map(elem => {
            return `
            <div class="col-12 col-md-6 my-3 d-flex flex-nowrap mx-auto">
                <div class="card">
                    <div class="card-body">
                    <h5 class="card-title">${elem.name}</h5>
                    <p class="card-text text-right">&#8369; ${elem.price}</p>
                    <p class="card-text">${elem.description}</p>
                    </div>
                    <div class="card-footer ">
                    ${displayCardFooter(elem._id)}
                    </div>
                </div>
            </div>`
        })
        courseContainer.innerHTML = courseData.join(" ");


    })