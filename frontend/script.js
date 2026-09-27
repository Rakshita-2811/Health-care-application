// Backend API URL
const API_URL = "http://localhost:8080/patients";

let updateId = null;

let allPatients = [];




// Add / Update patient
function savePatient() {


    let mobileNumber = document.getElementById("mobile").value;


    // Mobile validation
    if(mobileNumber.length !== 10){

        alert("Mobile number must contain exactly 10 digits");

        return;

    }



    let fullMobile = 
    document.getElementById("countryCode").value 
    + mobileNumber;



    let patient = {

        name: document.getElementById("name").value,

        age: document.getElementById("age").value,

        gender: document.getElementById("gender").value,

        mobile: fullMobile,

        village: document.getElementById("village").value,

        bloodGroup: document.getElementById("bloodGroup").value

    };




    let method = "POST";

    let url = API_URL;



    if(updateId != null){

        method = "PUT";

        url = `${API_URL}/${updateId}`;

    }





    fetch(url, {


        method: method,


        headers:{

            "Content-Type":"application/json"

        },


        body:JSON.stringify(patient)


    })



    .then(response=>response.json())



    .then(data=>{


        alert(updateId ? 
        "Patient Updated Successfully" : 
        "Patient Added Successfully");



        updateId = null;



        document.getElementById("saveBtn").innerHTML =
        "Save Patient";



        clearForm();



        loadPatients();



    });


}








// Load patients
function loadPatients(){


    fetch(API_URL)


    .then(response=>response.json())


    .then(data=>{


        allPatients = data;



        document.getElementById("count").innerHTML = data.length;



        updateDashboard(data);



        displayPatients(data);



    });



}








// Dashboard count
function updateDashboard(data){


    let male = 0;

    let female = 0;

    let others = 0;



    data.forEach(patient=>{


        if(patient.gender === "Male"){

            male++;

        }

        else if(patient.gender === "Female"){

            female++;

        }

        else{

            others++;

        }


    });



    document.getElementById("maleCount").innerHTML = male;


    document.getElementById("femaleCount").innerHTML = female;


    document.getElementById("othersCount").innerHTML = others;



}








// Display patients
function displayPatients(data){


    let table = document.getElementById("patientTable");


    table.innerHTML = "";



    data.forEach(patient=>{


        let row = `


        <tr>


        <td>${patient.name}</td>


        <td>${patient.age}</td>


        <td>${patient.gender}</td>


        <td>${patient.mobile}</td>


        <td>${patient.village}</td>


        <td>${patient.bloodGroup}</td>



        <td>


        <button onclick="editPatient('${patient.id}')">

        Edit

        </button>



        <button onclick="deletePatient('${patient.id}')">

        Delete

        </button>



        </td>



        </tr>


        `;



        table.innerHTML += row;



    });



}








// Search patient
function searchPatient(){


    let search = document
    .getElementById("searchInput")
    .value
    .toLowerCase();



    let result = allPatients.filter(patient=>


        patient.name.toLowerCase().includes(search) ||

        patient.mobile.includes(search)



    );



    displayPatients(result);



}








// Edit patient
function editPatient(id){


    fetch(`${API_URL}/${id}`)


    .then(response=>response.json())


    .then(patient=>{


        updateId = id;



        document.getElementById("name").value = patient.name;


        document.getElementById("age").value = patient.age;


        document.getElementById("gender").value = patient.gender;


        document.getElementById("mobile").value =
        patient.mobile.slice(-10);



        document.getElementById("village").value = patient.village;


        document.getElementById("bloodGroup").value =
        patient.bloodGroup;



        document.getElementById("saveBtn").innerHTML =
        "Update Patient";


    });



}








// Delete patient
function deletePatient(id){


    fetch(`${API_URL}/${id}`,{


        method:"DELETE"


    })


    .then(response=>response.text())


    .then(data=>{


        alert(data);


        loadPatients();



    });



}








// Clear form
function clearForm(){


    document.getElementById("name").value="";

    document.getElementById("age").value="";

    document.getElementById("gender").value="";

    document.getElementById("mobile").value="";

    document.getElementById("village").value="";

    document.getElementById("bloodGroup").value="";


}






window.onload = loadPatients;