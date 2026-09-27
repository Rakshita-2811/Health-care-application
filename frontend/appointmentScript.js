const API_URL = "http://localhost:8080/appointments";

const DOCTOR_API_URL = "http://localhost:8080/doctors";


let updateId = null;

let allAppointments = [];



// ===============================
// Save / Update Appointment
// ===============================

function saveAppointment() {


    let appointment = {


        patientName:
        document.getElementById("patientName").value,


        doctorName:
        document.getElementById("doctorName").value,


        appointmentDate:
        document.getElementById("appointmentDate").value,


        appointmentTime:
        document.getElementById("appointmentTime").value,


        reason:
        document.getElementById("reason").value,


        status:
        document.getElementById("status").value


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


        body:JSON.stringify(appointment)



    })



    .then(response=>response.json())



    .then(data=>{


        alert(
            updateId 
            ? "Appointment Updated Successfully"
            : "Appointment Booked Successfully"
        );



        updateId = null;



        document.getElementById("saveBtn").innerHTML =
        "Book Appointment";



        clearForm();



        loadAppointments();



    })



    .catch(error=>{


        console.log(error);


        alert("Error saving appointment");


    });



}









// ===============================
// Load Appointments
// ===============================


function loadAppointments(){


    fetch(API_URL)


    .then(response=>response.json())


    .then(data=>{


        allAppointments=data;



        document.getElementById("count").innerHTML =
        data.length;



        displayAppointments(data);



    })



    .catch(error=>{


        console.log("Appointment loading error:",error);


    });



}









// ===============================
// Load Doctors From MongoDB
// ===============================


function loadDoctors(){


    fetch(DOCTOR_API_URL)



    .then(response=>response.json())



    .then(data=>{


        let doctorSelect =
        document.getElementById("doctorName");



        doctorSelect.innerHTML =

        `
        <option value="">
            Select Doctor
        </option>
        `;



        data.forEach(doctor=>{


            doctorSelect.innerHTML +=


            `
            <option value="${doctor.doctorName}">

                ${doctor.doctorName} - ${doctor.specialization}

            </option>
            `;



        });



    })



    .catch(error=>{


        console.log(
            "Doctor loading error:",
            error
        );


    });



}









// ===============================
// Display Appointments
// ===============================


function displayAppointments(data){



    let table =
    document.getElementById("appointmentTable");



    table.innerHTML="";



    data.forEach(appointment=>{



        table.innerHTML +=



        `

        <tr>


        <td>
        ${appointment.patientName}
        </td>



        <td>
        ${appointment.doctorName}
        </td>



        <td>
        ${appointment.appointmentDate}
        </td>



        <td>
        ${appointment.appointmentTime}
        </td>



        <td>
        ${appointment.reason}
        </td>



        <td>
        ${appointment.status}
        </td>



        <td>


        <button onclick="editAppointment('${appointment.id}')">

        Edit

        </button>



        <button onclick="deleteAppointment('${appointment.id}')">

        Delete

        </button>



        </td>



        </tr>


        `;



    });



}









// ===============================
// Search Appointment
// ===============================


function searchAppointment(){



    let search =

    document.getElementById("searchInput")
    .value
    .toLowerCase();




    let result = allAppointments.filter(a=>


        a.patientName.toLowerCase()
        .includes(search)



        ||

        a.doctorName.toLowerCase()
        .includes(search)



    );



    displayAppointments(result);



}









// ===============================
// Edit Appointment
// ===============================


function editAppointment(id){



    fetch(`${API_URL}/${id}`)



    .then(response=>response.json())



    .then(appointment=>{



        updateId=id;



        document.getElementById("patientName").value =
        appointment.patientName;



        document.getElementById("doctorName").value =
        appointment.doctorName;



        document.getElementById("appointmentDate").value =
        appointment.appointmentDate;



        document.getElementById("appointmentTime").value =
        appointment.appointmentTime;



        document.getElementById("reason").value =
        appointment.reason;



        document.getElementById("status").value =
        appointment.status;



        document.getElementById("saveBtn").innerHTML =
        "Update Appointment";



    });



}









// ===============================
// Delete Appointment
// ===============================


function deleteAppointment(id){



    if(!confirm("Delete this appointment?")){


        return;


    }




    fetch(`${API_URL}/${id}`,{


        method:"DELETE"


    })



    .then(response=>response.text())



    .then(data=>{


        alert(data);


        loadAppointments();



    });



}









// ===============================
// Clear Form
// ===============================


function clearForm(){



    document.getElementById("patientName").value="";


    document.getElementById("doctorName").value="";


    document.getElementById("appointmentDate").value="";


    document.getElementById("appointmentTime").value="";


    document.getElementById("reason").value="";


    document.getElementById("status").value="Booked";


}









// ===============================
// Page Load
// ===============================


window.onload=function(){


    loadAppointments();


    loadDoctors();


};