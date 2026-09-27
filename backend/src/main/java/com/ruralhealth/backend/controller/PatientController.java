package com.ruralhealth.backend.controller;

import com.ruralhealth.backend.model.Patient;
import com.ruralhealth.backend.service.PatientService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/patients")
@CrossOrigin(origins = "*")
public class PatientController {

    @Autowired
    private PatientService patientService;


    // Create / Save patient
    @PostMapping
    public Patient savePatient(@RequestBody Patient patient) {
        return patientService.savePatient(patient);
    }


    // Get all patients
    @GetMapping
    public List<Patient> getAllPatients() {
        return patientService.getAllPatients();
    }


    // Get patient by ID
    @GetMapping("/{id}")
    public Patient getPatientById(@PathVariable String id) {
        return patientService.getPatientById(id);
    }


    // Update patient
    @PutMapping("/{id}")
    public Patient updatePatient(
            @PathVariable String id,
            @RequestBody Patient patient) {

        return patientService.updatePatient(id, patient);
    }


    // Delete patient
    @DeleteMapping("/{id}")
    public String deletePatient(@PathVariable String id) {

        patientService.deletePatient(id);

        return "Patient deleted successfully";
    }
}