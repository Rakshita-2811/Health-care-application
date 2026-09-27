const API_URL = "http://localhost:8080/users/login";

function login() {

    let email = document.getElementById("email").value;
    let password = document.getElementById("password").value;
    let role = document.getElementById("role").value;


    if(email === "" || password === "" || role === "") {

        alert("Please fill all fields");
        return;

    }


    fetch(API_URL, {

        method: "POST",

        headers: {
            "Content-Type": "application/json"
        },

        body: JSON.stringify({

            email: email,
            password: password

        })

    })


    .then(response => response.json())


    .then(user => {


        if(user == null || user.id == null) {

            alert("Invalid Email or Password");
            return;

        }


        if(user.role !== role) {

            alert("Selected role does not match your account");
            return;

        }


        alert("Welcome " + user.name);


        localStorage.setItem("user", JSON.stringify(user));


        // Redirect based on role

        if(user.role === "ADMIN") {

            window.location.href = "admin.html";

        }


        else if(user.role === "DOCTOR") {

            window.location.href = "doctor.html";

        }


        else if(user.role === "PATIENT") {

            alert("Patient Dashboard - Coming Soon");

        }


    })


    .catch(error => {

        console.log(error);

        alert("Login Failed");

    });

}