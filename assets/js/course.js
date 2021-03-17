const urlParams = new URLSearchParams(window.location.search);
const courseId = urlParams.get('courseId');

// console.log(courseId)
let url = `http://localhost:4000/api/courses/${courseId}`;

fetch(url)
.then( res => res.json())
.then(data => {
console.log(data)
let courseName = document.querySelector('#courseName');
let courseDesc = document.querySelector('#courseDesc');
let coursePrice = document.querySelector('#coursePrice');


courseName.innerHTML = data.name;
courseDesc.innerHTML = data.description;
coursePrice.innerHTML = data.price;

document.querySelector('#enrollButton').addEventListener('click', () => {
    
    fetch('http://localhost:4000/api/users/enroll',
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