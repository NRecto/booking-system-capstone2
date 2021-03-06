const urlParams = new URLSearchParams(window.location.search);
const courseId = urlParams.get('courseId');

let url = `https://nrecto-course-booking.herokuapp.com/api/courses/${courseId}`;

fetch(url)
.then( res => res.json())
.then(data => {
// console.log(data)

// TO SHOW IF COURSE IS ACTIVE OR NOT
let courseActive = document.querySelector('#courseActive');
let courseActiveText = document.querySelector('#courseActiveText');
let activeText;
if(data.isActive == true) {
    courseActive.style.backgroundColor = '#05F912';
    activeText = 'Active'
} else {
    courseActive.style.backgroundColor = '#FA0501';
    activeText = 'Disabled'
}
courseActiveText.innerHTML = activeText;
let editCourse = document.querySelector('#editCourse');

return editCourse.innerHTML =
`

<div class="form-row">
    <div class="form-group my-3">
        <input type="text" name="" id="courseName" class="form-control" placeholder="Course Name" value="${data.name}">
    </div>
    <div class="form-group my-3">
        <input type="number" name="" id="coursePrice" class="form-control" placeholder="Course Price" value="${data.price}">
    </div>
</div>
<textarea name="" id="courseDescription" cols="30" rows="5" class="form-control my-3" placeholder="Course Description" value="">${data.description}</textarea>
<button id="submitButton" class="btn btn-outline-primary">Submit</button>

`

})
.then( result =>{
 	let submitButton = document.querySelector('#submitButton')
	submitButton.addEventListener('click' , (e) => {
		e.preventDefault();
		let courseDescription = document.querySelector('#courseDescription').value;
		let courseName = document.querySelector('#courseName').value;
		let coursePrice = document.querySelector('#coursePrice').value;

		let body = {
			_id: courseId,
			name: courseName,
			price: coursePrice,
			description: courseDescription
		}

		fetch('https://nrecto-course-booking.herokuapp.com/api/courses/',
			{
	  			method: 'PUT',
	  			headers: { 'Content-Type': 'application/json',
	  						"Authorization": `Bearer ${localStorage['token']}`
	  					 },
	  			body: JSON.stringify(body)
			})
		.then( res => res.json())
		.then( data => {

			if(!data) {
				Swal.fire({
					title: 'Error!',
					text: 'Something went Wrong.',
					icon: 'error',
					confirmButtonText: 'Ok'
				  })
			} else {
				Swal.fire({
					title: 'Success!',
					text: 'Course Change!',
					icon: 'success',
					confirmButtonText: 'Cool'
				  }).then ( () => window.location.replace('./courses.html'))
			}
		})

	}); // end ofcallback function on submit

	document.querySelector('.form-select').addEventListener('change' , (e) => {
	
		if (e.target.value == "true" ) {
			fetch(url, {
				method: 'PUT',
				headers: {
					'Authorization': `Bearer ${localStorage['token']}`
				}
			})
			.then( res => res.json())
			.then( () => 
				Swal.fire({
					title: 'Success!',
					text: 'Course Enabled!',
					icon: 'success',
					confirmButtonText: 'Cool'
				}).then ( () => window.location.reload())
			)
		} else {
			fetch(url, {
				method: 'DELETE',
				headers: {
					'Authorization': `Bearer ${localStorage['token']}`
				}
			})
			.then( res => res.json())
			.then( () => 
				Swal.fire({
					title: 'Success!',
					text: 'Course Disabled!',
					icon: 'success',
					confirmButtonText: 'Cool'
				}).then ( () => window.location.reload())
			)
		}
	})

})


