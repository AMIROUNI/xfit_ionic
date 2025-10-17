package com.symptomcheck.xfit_backend.controllers;

import com.symptomcheck.xfit_backend.models.ProgramDetail;
import com.symptomcheck.xfit_backend.services.ProgramDetailService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/v1/program/detail")
@RequiredArgsConstructor
public class ProgramDetailController {

    private final ProgramDetailService programDetailService;

    /**
     * Get all program details
     */
    @GetMapping
    public ResponseEntity<List<ProgramDetail>> getAllDetails() {
        List<ProgramDetail> details = programDetailService.getAllDetails();
        return ResponseEntity.ok(details);
    }

    /**
     * Get a program detail by ID
     */
    @GetMapping("/{id}")
    public ResponseEntity<ProgramDetail> getDetailById(@PathVariable Long id) {
        return programDetailService.getDetailById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    /**
     * Get all details for a specific program ID
     */
    @GetMapping("/program/{programId}")
    public ResponseEntity<List<ProgramDetail>> getDetailsByProgramId(@PathVariable Long programId) {
        List<ProgramDetail> details = programDetailService.getDetailsByProgramId(programId);
        return ResponseEntity.ok(details);
    }

    /**
     * Create a new program detail
     */
    @PostMapping
    public ResponseEntity<ProgramDetail> createDetail(@RequestBody ProgramDetail detail) {
        ProgramDetail savedDetail = programDetailService.saveDetail(detail);
        return ResponseEntity.ok(savedDetail);
    }

    /**
     * Update an existing program detail
     */
    @PutMapping("/{id}")
    public ResponseEntity<ProgramDetail> updateDetail(@PathVariable Long id, @RequestBody ProgramDetail updatedDetail) {
        ProgramDetail detail = programDetailService.updateDetail(id, updatedDetail);
        if (detail == null) {
            return ResponseEntity.notFound().build();
        }
        return ResponseEntity.ok(detail);
    }

    /**
     * Delete a program detail by ID
     */
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteDetail(@PathVariable Long id) {
        programDetailService.deleteDetail(id);
        return ResponseEntity.noContent().build();
    }
}
