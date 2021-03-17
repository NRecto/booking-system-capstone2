let token = localStorage['token'];
let profileContainer = document.querySelector('#profileContainer');

if (!token || token === null) {
	alert("You must login First")
	window.location.replace('./login.html')
} else {
	fetch('http://localhost:4000/api/users/details' ,
	{
		method: 'GET',
		headers: {
			'Content-Type' : 'application/json',
			'Authorization': `Bearer ${token}`
		}
	})
	.then( res => res.json())
	.then( data => {
		console.log(data.enrollments)
		let enrolledCourses = data.enrollments;

		let message = "";

		if(enrolledCourses.length === 0){
			message = "No Enrolled Courses yet."
		} else {

			let listOfCourses = enrolledCourses.map( course => {
			return	`
					<tr>
						<td>${course.courseId}</td>
						<td>${course.enrolledOn}</td>
						<td>${course.status}</td>
					</tr>
				`
			})	

			message = listOfCourses.join("");
		}

		const profileDetails = 
		`
		<div class="col-12">
                <section class="my-5">
                    <div class="text-center">
                        <h3>First Name: ${data.firstName}</h3>
                        <h3>Last Name: ${data.lastName}</h3>
                        <h3>Email : ${data.email}</h3>
                        <h3 class="mt-3">Class History</h3>
                    </div>
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
                </section>
            </div>
		`
		profileContainer.innerHTML = profileDetails;


	})
}

