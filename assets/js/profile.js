let token = localStorage['token'];
let profileContainer = document.querySelector('#profileContainer');
let courseName;

if (!token || token === null) {

	alert("You must login First")
	window.location.replace('./login.html')

} else {
	
	fetch('https://nrecto-course-booking.herokuapp.com/api/users/details' ,
	{
		method: 'GET',
		headers: {
			'Content-Type' : 'application/json',
			'Authorization': `Bearer ${token}`
		}
	})
	.then( res => res.json())
	.then( data => {

let enrolledCourses = data.enrollments;

let message = "";

if(enrolledCourses.length === 0){
	message = "No Enrolled Courses yet."
} else {

	let listOfCourses = enrolledCourses.map( course => {	
	let date = new Date(course.enrolledOn)
		return	`
				<tr>
					<td>${course.courseName}</td>
					<td>${date}</td>
					<td>${course.status}</td>
				<tr>
			`
	})	
					message = listOfCourses.join("");

}

const profileDetails = 
`
<div class="col-12">
		<section>
			<div id="userDetail">
				<h2>Name: ${data.firstName} ${data.lastName}</h2>
				<h2>Email : ${data.email}</h2>
			</div>
			<div id="userCoursesEnrolled">
			<h3 class="mt-3">User History</h3>
				<table class="table table-hover">
					<thead>
						<tr>
							<th> Course ID</th>
							<th> Enrolled On</th>
							<th> Status </th>
						</tr>
					</thead>
					<tbody>
						${message}
					</tbody>
				</table>
			</div>
		</section>
	</div>
`
profileContainer.innerHTML = profileDetails;


})
}