package com.ruralhealth.backend.service;

import com.ruralhealth.backend.model.Appointment;
import com.ruralhealth.backend.repository.AppointmentRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class AppointmentService {

    @Autowired
    private AppointmentRepository appointmentRepository;

    // Save Appointment
    public Appointment saveAppointment(Appointment appointment) {
        return appointmentRepository.save(appointment);
    }

    // Get All Appointments
    public List<Appointment> getAllAppointments() {
        return appointmentRepository.findAll();
    }

    // Get Appointment By ID
    public Appointment getAppointmentById(String id) {
        return appointmentRepository.findById(id).orElse(null);
    }

    // Update Appointment
    public Appointment updateAppointment(String id, Appointment appointment) {

        Appointment existingAppointment =
                appointmentRepository.findById(id).orElse(null);

        if (existingAppointment != null) {

            existingAppointment.setPatientName(appointment.getPatientName());
            existingAppointment.setDoctorName(appointment.getDoctorName());
            existingAppointment.setAppointmentDate(appointment.getAppointmentDate());
            existingAppointment.setAppointmentTime(appointment.getAppointmentTime());
            existingAppointment.setReason(appointment.getReason());
            existingAppointment.setStatus(appointment.getStatus());

            return appointmentRepository.save(existingAppointment);
        }

        return null;
    }

    // Delete Appointment
    public void deleteAppointment(String id) {
        appointmentRepository.deleteById(id);
    }

}