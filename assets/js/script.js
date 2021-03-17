fetch('https://nrecto-course-booking.herokuapp.com/api/courses/')
    .then(res => {
        return res.json()
    })
    .then(data => {
        let courseContainer = document.querySelector('#courseContainer');
        let courseData = data.map( course => {
            return `
                    <div class="col-md-6 my-3">
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