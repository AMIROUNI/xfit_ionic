package com.symptomcheck.xfit_backend.controllers;

import com.symptomcheck.xfit_backend.models.Program;
import com.symptomcheck.xfit_backend.services.ProgramService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/v1/program")
@RequiredArgsConstructor
public class ProgramController {

    private final ProgramService programService;

    /**
     * Get all programs
     */
    @GetMapping
    public ResponseEntity<List<Program>> getAllPrograms() {
        List<Program> programs = programService.getAllPrograms();
        return ResponseEntity.ok(programs);
    }

    /**
     * Get program by ID
     */
    @GetMapping("/{id}")
    public ResponseEntity<Program> getProgramById(@PathVariable Long id) {
        return programService.getProgramById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    /**
     * Create a new program
     */
    @PostMapping
    public ResponseEntity<Program> createProgram(@RequestBody Program program) {
        Program savedProgram = programService.saveProgram(program);
        return ResponseEntity.ok(savedProgram);
    }

    /**
     * Update an existing program
     */
    @PutMapping("/{id}")
    public ResponseEntity<Program> updateProgram(@PathVariable Long id, @RequestBody Program updatedProgram) {
        Program program = programService.updateProgram(id, updatedProgram);
        if (program == null) {
            return ResponseEntity.notFound().build();
        }
        return ResponseEntity.ok(program);
    }

    /**
     * Delete a program by ID
     */
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteProgram(@PathVariable Long id) {
        programService.deleteProgram(id);
        return ResponseEntity.noContent().build();
    }
}
