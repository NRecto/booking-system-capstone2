const urlParams = new URLSearchParams(window.location.search);
const courseId = urlParams.get('courseId');

let url = `https://nrecto-course-booking.herokuapp.com/api/courses/${courseId}`;


let courseName = document.querySelector('#courseName');
let coursePrice = document.querySelector('#coursePrice');
let courseDesc = document.querySelector('#courseDesc');

fetch(url)
.then( res => res.json() )
.then( data =>{
	courseName.innerHTML = data.name
	coursePrice.innerHTML = `&#8369;  ${data.price}`
	courseDesc.innerHTML = data.description
} )


document.querySelector('.form-select').addEventListener('change' , (e) => {
	
	if (e.target.value == "true" ) {
		fetch(url, {
			method: 'PUT',
			headers: {
				'Authorization': `Bearer ${localStorage['token']}`
			}
		})
		.then( res => res.json())
		.then( () => alert('Course Enabled'))
	} else {
		fetch(url, {
			method: 'DELETE',
			headers: {
				'Authorization': `Bearer ${localStorage['token']}`
			}
		})
		.then( res => res.json())
		.then( () => alert('Course disabled'))
	}
})
