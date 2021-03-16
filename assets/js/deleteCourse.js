const urlParams = new URLSearchParams(window.location.search);
const courseId = urlParams.get('courseId');

let url = `http://localhost:4000/api/courses/${courseId}`;

fetch(url, {
	method: 'DELETE',
	headers: {
		'Authorization': `Bearer ${localStorage['token']}`
	}
})
.then( res => res.json())
.then( data => console.log(data))