package com.ruralhealth.backend.service;

import com.ruralhealth.backend.model.Doctor;
import com.ruralhealth.backend.repository.DoctorRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class DoctorService {

    @Autowired
    private DoctorRepository doctorRepository;

    // Add Doctor
    public Doctor saveDoctor(Doctor doctor) {
        return doctorRepository.save(doctor);
    }

    // Get All Doctors
    public List<Doctor> getAllDoctors() {
        return doctorRepository.findAll();
    }

    // Get Doctor By ID
    public Doctor getDoctorById(String id) {
        return doctorRepository.findById(id).orElse(null);
    }

    // Update Doctor
    public Doctor updateDoctor(String id, Doctor doctor) {

        Doctor existingDoctor = doctorRepository.findById(id).orElse(null);

        if (existingDoctor != null) {

            existingDoctor.setDoctorName(doctor.getDoctorName());
            existingDoctor.setSpecialization(doctor.getSpecialization());
            existingDoctor.setPhone(doctor.getPhone());
            existingDoctor.setEmail(doctor.getEmail());
            existingDoctor.setAvailableTime(doctor.getAvailableTime());
            existingDoctor.setStatus(doctor.getStatus());

            return doctorRepository.save(existingDoctor);
        }

        return null;
    }

    // Delete Doctor
    public void deleteDoctor(String id) {
        doctorRepository.deleteById(id);
    }

}
