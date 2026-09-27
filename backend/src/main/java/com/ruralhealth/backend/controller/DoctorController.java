package com.ruralhealth.backend.controller;

import com.ruralhealth.backend.model.Doctor;
import com.ruralhealth.backend.service.DoctorService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/doctors")
@CrossOrigin(origins = "*")
public class DoctorController {

    @Autowired
    private DoctorService doctorService;

    // Add Doctor
    @PostMapping
    public Doctor addDoctor(@RequestBody Doctor doctor) {
        return doctorService.saveDoctor(doctor);
    }

    // Get All Doctors
    @GetMapping
    public List<Doctor> getAllDoctors() {
        return doctorService.getAllDoctors();
    }

    // Get Doctor By ID
    @GetMapping("/{id}")
    public Doctor getDoctor(@PathVariable String id) {
        return doctorService.getDoctorById(id);
    }

    // Update Doctor
    @PutMapping("/{id}")
    public Doctor updateDoctor(@PathVariable String id,
                               @RequestBody Doctor doctor) {

        return doctorService.updateDoctor(id, doctor);
    }

    // Delete Doctor
    @DeleteMapping("/{id}")
    public String deleteDoctor(@PathVariable String id) {

        doctorService.deleteDoctor(id);

        return "Doctor Deleted Successfully";
    }

}
