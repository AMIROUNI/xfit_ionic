package com.symptomcheck.xfit_backend.dto;

public class CalorieResponseDTO {
    private double caloriesNeeded;

    public CalorieResponseDTO(double caloriesNeeded) {
        this.caloriesNeeded = caloriesNeeded;
    }

    public double getCaloriesNeeded() {
        return caloriesNeeded;
    }

    public void setCaloriesNeeded(double caloriesNeeded) {
        this.caloriesNeeded = caloriesNeeded;
    }
}
