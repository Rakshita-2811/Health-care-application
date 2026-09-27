const API_URL = "http://localhost:8080/patients";


// Load dashboard
function loadDashboard(){

    fetch(API_URL)

    .then(response => response.json())

    .then(data => {

        // Total Patients
        document.getElementById("totalPatients").innerHTML = data.length;

        let male = 0;
        let female = 0;
        let others = 0;

        let table = document.getElementById("patientTable");
        table.innerHTML = "";

        data.forEach(patient => {

            // Count Gender
            if(patient.gender.toUpperCase() === "M"){
                male++;
            }
            else if(patient.gender.toUpperCase() === "F"){
                female++;
            }
            else{
                others++;
            }

            table.innerHTML += `
            <tr>
                <td>${patient.name}</td>
                <td>${patient.age}</td>
                <td>${patient.gender}</td>
                <td>${patient.mobile}</td>
                <td>${patient.village}</td>
                <td>${patient.bloodGroup}</td>
            </tr>
            `;
        });

        // Update Dashboard
        document.getElementById("maleCount").innerHTML = male;
        document.getElementById("femaleCount").innerHTML = female;
        document.getElementById("otherCount").innerHTML = others;

    })

    .catch(error => {
        console.log(error);
        alert("Unable to load dashboard.");
    });

}


// Logout
function logout(){

    localStorage.removeItem("user");

    window.location.href = "login.html";

}


// Load dashboard automatically
window.onload = loadDashboard;