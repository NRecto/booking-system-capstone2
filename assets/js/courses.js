// fetch(url)
// .then(res)
// .then(data)
// .catch()

let adminUser = localStorage['isAdmin'];
let adminButton = document.querySelector('#adminButton');

let cardFooter;

if (adminUser == 'false' || !adminUser) {
    adminButton == "";
} else {
    adminButton.innerHTML = `
            <div class="col-md-2 mx-auto">
                <a href="" class="btn btn-primary">Add Coure</a>
            </div>`
}

fetch('http://localhost:4000/api/courses/')
    .then(res => {
        return res.json()
    })
    .then(data => {

    function displayCardFooter(courseId){

        if (adminUser == "false" || !adminUser) {
            cardFooter = ` 
            <a href="./course.html?courseId=${courseId}" class="btn btn-primary">

                 Select Course

            </a>`
        } else {
            cardFooter = `<a href="./editCourse.html?courseId=${courseId}" class="btn btn-primary editButton">

                Edit

            </a>
             <a href="./deleteCourse.html?courseId=${courseId}" class="btn btn-danger deleteButton">

                Delete

             </a>`
        }
        return cardFooter;
    }
        

        // <li>name</li>
        let courseContainer = document.querySelector("#courseContainer");
        let courseData = data.map(elem => {
            return `
            <div class="col-md-6 my-3">
                <div class="card">
                 <div class="card-body">
                    <h5 class="card-title">${elem.name}</h5>
                    <p class="card-text text-right">&#8369; ${elem.price}</p>
                    <p class="card-text">${elem.description}</p>
                    </div>
                    <div class="card-footer">
                    ${displayCardFooter(elem._id)}
                </div>
                </div>
            </div>`
        })
        courseContainer.innerHTML = courseData.join(" ");


    })