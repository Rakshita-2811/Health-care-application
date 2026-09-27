package com.ruralhealth.backend.service;

import com.ruralhealth.backend.model.Patient;
import com.ruralhealth.backend.repository.PatientRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class PatientService {

    @Autowired
    private PatientRepository patientRepository;

    // Save patient
    public Patient savePatient(Patient patient) {
        return patientRepository.save(patient);
    }

    // Get all patients
    public List<Patient> getAllPatients() {
        return patientRepository.findAll();
    }

    // Get patient by ID
    public Patient getPatientById(String id) {
        return patientRepository.findById(id).orElse(null);
    }

    // Update patient
    public Patient updatePatient(String id, Patient patient) {

        Patient existingPatient = patientRepository.findById(id).orElse(null);

        if (existingPatient != null) {

            existingPatient.setName(patient.getName());
            existingPatient.setAge(patient.getAge());
            existingPatient.setGender(patient.getGender());
            existingPatient.setMobile(patient.getMobile());
            existingPatient.setVillage(patient.getVillage());
            existingPatient.setBloodGroup(patient.getBloodGroup());

            return patientRepository.save(existingPatient);
        }

        return null;
    }

    // Delete patient
    public void deletePatient(String id) {
        patientRepository.deleteById(id);
    }
}