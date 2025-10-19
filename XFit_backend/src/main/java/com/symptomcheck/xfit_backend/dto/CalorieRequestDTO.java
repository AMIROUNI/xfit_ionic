package com.symptomcheck.xfit_backend.dto;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class CalorieRequestDTO {
    private String firebaseUid;
    private String gender;       // male / female
    private int age;
    private double heightCm;
    private double weightKg;
    private String activityLevel; // light / moderate / active / very-active
    private String goal;          // lose / maintain / gain

}