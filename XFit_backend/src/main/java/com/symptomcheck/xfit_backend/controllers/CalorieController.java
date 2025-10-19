package com.symptomcheck.xfit_backend.controllers;

import com.symptomcheck.xfit_backend.dto.CalorieRequestDTO;
import com.symptomcheck.xfit_backend.dto.CalorieResponseDTO;
import com.symptomcheck.xfit_backend.services.CalorieService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/v1/calories")
public class CalorieController {

    private final CalorieService calorieService;

    public CalorieController(CalorieService calorieService) {
        this.calorieService = calorieService;
    }

    @PostMapping("/calculate")
    public ResponseEntity<CalorieResponseDTO> calculateCalories(@RequestBody CalorieRequestDTO req) {
        CalorieResponseDTO res = calorieService.calculateCalories(req);
        return ResponseEntity.ok(res);
    }
}