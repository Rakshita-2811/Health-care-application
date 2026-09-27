const API_URL = "http://localhost:8080/doctors";

let updateId = null;
let allDoctors = [];

// Save / Update Doctor
function saveDoctor() {

    let doctor = {

        doctorName: document.getElementById("doctorName").value,
        specialization: document.getElementById("specialization").value,
        phone: document.getElementById("phone").value,
        email: document.getElementById("email").value,
        availableTime: document.getElementById("availableTime").value,
        status: document.getElementById("status").value

    };

    let method = "POST";
    let url = API_URL;

    if(updateId != null){

        method = "PUT";
        url = `${API_URL}/${updateId}`;

    }

    fetch(url,{

        method:method,

        headers:{
            "Content-Type":"application/json"
        },

        body:JSON.stringify(doctor)

    })

    .then(response=>response.json())

    .then(data=>{

        alert(updateId ?
        "Doctor Updated Successfully"
        :
        "Doctor Added Successfully");

        updateId = null;

        document.getElementById("saveBtn").innerHTML = "Save Doctor";

        clearForm();

        loadDoctors();

    })

    .catch(error=>{

        console.log(error);

        alert("Error Saving Doctor");

    });

}



// Load Doctors
function loadDoctors(){

    fetch(API_URL)

    .then(response=>response.json())

    .then(data=>{

        allDoctors = data;

        document.getElementById("count").innerHTML = data.length;

        displayDoctors(data);

    });

}



// Display Doctors
function displayDoctors(data){

    let table = document.getElementById("doctorTable");

    table.innerHTML = "";

    data.forEach(doctor=>{

        table.innerHTML += `

        <tr>

        <td>${doctor.doctorName}</td>

        <td>${doctor.specialization}</td>

        <td>${doctor.phone}</td>

        <td>${doctor.email}</td>

        <td>${doctor.availableTime}</td>

        <td>${doctor.status}</td>

        <td>

        <button onclick="editDoctor('${doctor.id}')">

        Edit

        </button>

        <button onclick="deleteDoctor('${doctor.id}')">

        Delete

        </button>

        </td>

        </tr>

        `;

    });

}



// Search Doctor
function searchDoctor(){

    let search = document.getElementById("searchInput")
    .value
    .toLowerCase();

    let result = allDoctors.filter(doctor =>

        doctor.doctorName.toLowerCase().includes(search) ||

        doctor.specialization.toLowerCase().includes(search)

    );

    displayDoctors(result);

}



// Edit Doctor
function editDoctor(id){

    fetch(`${API_URL}/${id}`)

    .then(response=>response.json())

    .then(doctor=>{

        updateId = id;

        document.getElementById("doctorName").value = doctor.doctorName;
        document.getElementById("specialization").value = doctor.specialization;
        document.getElementById("phone").value = doctor.phone;
        document.getElementById("email").value = doctor.email;
        document.getElementById("availableTime").value = doctor.availableTime;
        document.getElementById("status").value = doctor.status;

        document.getElementById("saveBtn").innerHTML = "Update Doctor";

    });

}



// Delete Doctor
function deleteDoctor(id){

    if(!confirm("Delete this doctor?")){

        return;

    }

    fetch(`${API_URL}/${id}`,{

        method:"DELETE"

    })

    .then(response=>response.text())

    .then(data=>{

        alert(data);

        loadDoctors();

    });

}



// Clear Form
function clearForm(){

    document.getElementById("doctorName").value = "";
    document.getElementById("specialization").value = "";
    document.getElementById("phone").value = "";
    document.getElementById("email").value = "";
    document.getElementById("availableTime").value = "";
    document.getElementById("status").value = "Available";

}



// Load Page
window.onload = loadDoctors;