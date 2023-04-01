function displayInfo(progressList) {

				const studentInfo = progressList.lstStudentInfo[0]
				const stGrades = progressList.stGrades

				let schoolNameEl = document.getElementById('schoolName');
				schoolNameEl.textContent = studentInfo.SchoolName;

				let schoolAddressEl = document.getElementById('schoolAddress');
				schoolAddressEl.textContent = studentInfo.SchoolAddress +', Ph. : '+studentInfo.SchoolPhoneNumber;

				let schoolEmailEl = document.getElementById('schoolEmail');
				schoolEmailEl.textContent = 'Visit Us at: '+studentInfo.SchoolEmail;

				let scholarNoEl = document.getElementById('scholarNo');
				scholarNoEl.textContent = ':- '+studentInfo.AdmissionNumber;

				let classEl = document.getElementById('class');
				classEl.textContent = ':- '+studentInfo.ClassName;

				let rollNoEl = document.getElementById('rollNo');
				rollNoEl.textContent = ':- '+studentInfo.RollNumber;

				let nameEl = document.getElementById('name');
				nameEl.textContent = ':- '+studentInfo.Name;

				let fatherNameEl = document.getElementById('fatherName');
				fatherNameEl.textContent = ':- '+studentInfo.FatherName;

				let motherNameEl = document.getElementById('motherName');
				motherNameEl.textContent = ':- '+studentInfo.MotherName;	

				let attendanceEl = document.getElementById('attendance');
				attendanceEl.textContent = ':- '+0;

				let dobEl = document.getElementById('dob');
				dobEl.textContent = ':- '+studentInfo.DOB;

				
				let internalsDetails = studentInfo.stInternals
				let subjectNames = []
				for (let each of internalsDetails) {
					if (each.ClassSubject in subjectNames) {
						pass
					} else {
						subjectNames.push(each.ClassSubject)
					}
				};

				const subjects = new Set(subjectNames)
				console.log(subjects)

				const firstTermInternals = []
				const secondTermInternals = []
				for (let subject of subjects) {
					let filteredInternals = internalsDetails.filter(each => each.ClassSubject===subject)
					firstTermInternals.push(Math.max(parseInt(filteredInternals[0].GradePoints),parseInt(filteredInternals[1].GradePoints)))
					secondTermInternals.push(Math.max(parseInt(filteredInternals[2].GradePoints),parseInt(filteredInternals[3].GradePoints)))
				}
				console.log(firstTermInternals, secondTermInternals)

				const termDetails = studentInfo.lstStudent
				const firstTermMains = []
				const secondTermMains = []
				for (let subject of subjects) {
					let filteredMains = termDetails.filter(each => each.SubjectName===subject)
					firstTermMains.push(parseInt(filteredMains[0].Subject_GradePoints))
					secondTermMains.push(parseInt(filteredMains[1].Subject_GradePoints))
				}
				console.log(firstTermMains, secondTermMains)

				const firstTermTotal = []
				for (let i in firstTermInternals) {
					firstTermTotal.push(0.2*firstTermInternals[i]+0.8*firstTermMains[i])
				}

				const secondTermTotal = []
				for (let i in secondTermInternals) {
					secondTermTotal.push(0.2*secondTermInternals[i]+0.8*secondTermMains[i])
				}

				const finalResult = []
				for (let i in firstTermTotal) {
					finalResult.push(0.5*firstTermTotal[i]+0.5*secondTermTotal[i])
				}

				const grades = []
				for (let score of finalResult) {
					for (let grade of stGrades) {
						if (grade.minRange <= score*10 <= grade.maxRange) {
							grades.push(grade.Grade.trim())
							break
						}
					}
				}

				console.log(grades)


				for (let i in subjects) {
					let tableEl = document.getElementById("table");

					let rowEl = document.createElement("tr")

					let subjectEl = document.createElement("th")
					subjectEl.textContent = subjects[i]
					rowEl.appendChild(subjectEl)

					let internal1El = document.createElement("td")
					internal1El.textContent = firstTermInternals[i]
					rowEl.appendChild(internal1El)

					let mains1El = document.createElement("td")
					mains1El.textContent = firstTermMains[i]
					rowEl.appendChild(mains1El)

					let total1El = document.createElement("td")
					total1El.textContent = firstTermTotal[i]
					rowEl.appendChild(total1El)

					let internal2El = document.createElement("td")
					internal2El.textContent = secondTermInternals[i]
					rowEl.appendChild(internal2El)

					let mains2El = document.createElement("td")
					mains2El.textContent = secondTermMains[i]
					rowEl.appendChild(mains2El)

					let total2El = document.createElement("td")
					total2El.textContent = secondTermTotal[i]
					rowEl.appendChild(total2El)

					let grandTotal = document.createElement("td")
					grandTotal.textContent = finalResult[i]
					rowEl.appendChild(grandTotal)

					let gradeEl = document.createElement("td")
					gradeEl.textContent = grades[i]
					rowEl.appendChild(gradeEl)

					tableEl.appendChild(rowEl)
				}



			}

			let url = "http://stageapi.iguru.guru:222/api/ExamManagement/GetStudentProgressReports?schoolID=282&sectionID=2682&eXamMasID=8442&students=181521";
            let options = {
    		  method: "GET"
    		};
    		fetch(url, options)
    		  .then(function (response) {
    		    return response.json();
    		  })
    		  .then(function (jsonData) {
				let progressList = jsonData.Response.ProgressList;
				displayInfo(progressList)
    		  });
