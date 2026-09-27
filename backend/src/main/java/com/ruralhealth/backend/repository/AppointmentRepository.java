package com.ruralhealth.backend.repository;

import com.ruralhealth.backend.model.Appointment;
import org.springframework.data.mongodb.repository.MongoRepository;

public interface AppointmentRepository extends MongoRepository<Appointment, String> {

}