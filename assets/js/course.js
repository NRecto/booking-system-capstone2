const urlParams = new URLSearchParams(window.location.search);
const courseId = urlParams.get('courseId');
const isAdmin = localStorage['isAdmin'];

// console.log(courseId)
let url = `https://nrecto-course-booking.herokuapp.com/api/courses/${courseId}`;

fetch(url)
.then( res => res.json())
.then(data => {
console.log(data.enrollees)
let courseName = document.querySelector('#courseName');
let courseDesc = document.querySelector('#courseDesc');
let coursePrice = document.querySelector('#coursePrice');
let courseEnrollees = document.querySelector('#courseEnrollees');



if (isAdmin == 'false') {
    
    courseName.innerHTML = data.name;
    courseDesc.innerHTML = data.description;
    coursePrice.innerHTML = data.price;
} else {
    courseName.innerHTML = data.name;
    courseDesc.innerHTML = data.description;
    coursePrice.innerHTML = data.price;

    let enrolleeData = data.enrollees.map( data => {
        return `
        <table class="table table-hover">
            <thead>
                <tr>   
                    <th>Enrolled User</th>
                    <th>User ID</th>
                </tr>
            </thead>
            <tbody>
                <tr>   
                    <td></td>
                    <td>${data.userId}</td>
                </tr>
            </tbody>
        </table>
        ` 
        
    } );
    courseEnrollees.innerHTML = enrolleeData.join("");
    
}

document.querySelector('#enrollButton').addEventListener('click', () => {
    
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