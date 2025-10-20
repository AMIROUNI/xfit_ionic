package com.symptomcheck.xfit_backend.services;

import com.symptomcheck.xfit_backend.dto.CalorieRequestDTO;
import com.symptomcheck.xfit_backend.dto.CalorieResponseDTO;
import org.springframework.stereotype.Service;

@Service
public class CalorieService {

    public CalorieResponseDTO calculateCalories(CalorieRequestDTO req) {
        double bmr;

        if ("male".equalsIgnoreCase(req.getGender())) {
            bmr = 10 * req.getWeightKg() + 6.25 * req.getHeightCm() - 5 * req.getAge() + 5;
        } else {
            bmr = 10 * req.getWeightKg() + 6.25 * req.getHeightCm() - 5 * req.getAge() - 161;
        }

        double multiplier;
        switch (req.getActivityLevel()) {
            case "light": multiplier = 1.375; break;
            case "moderate": multiplier = 1.55; break;
            case "active": multiplier = 1.725; break;
            case "very-active": multiplier = 1.9; break;
            default: multiplier = 1.2;
        }

        double maintenance = bmr * multiplier;
        double caloriesNeeded;

        switch (req.getGoal()) {
            case "lose": caloriesNeeded = maintenance - 500; break;
            case "gain": caloriesNeeded = maintenance + 500; break;
            default: caloriesNeeded = maintenance;
        }

        return new CalorieResponseDTO(caloriesNeeded);
    }
}
