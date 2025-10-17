package com.symptomcheck.xfit_backend.services;

import com.symptomcheck.xfit_backend.models.Program;
import com.symptomcheck.xfit_backend.repositories.ProgramRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class ProgramService {

    // Inject the repository to access database
    private final ProgramRepository programRepository;

    /**
     * Get all programs
     * @return List of Program
     */
    public List<Program> getAllPrograms() {
        return programRepository.findAll();
    }

    /**
     * Get a program by ID
     * @param id Program ID
     * @return Optional<Program>
     */
    public Optional<Program> getProgramById(Long id) {
        return programRepository.findById(id);
    }

    /**
     * Save a new program
     * @param program Program object
     * @return Saved Program
     */
    public Program saveProgram(Program program) {
        return programRepository.save(program);
    }

    /**
     * Update an existing program
     * @param id Program ID
     * @param updatedProgram Program object with new values
     * @return Updated Program or null if not found
     */
    public Program updateProgram(Long id, Program updatedProgram) {
        return programRepository.findById(id)
                .map(program -> {
                    program.setTitle(updatedProgram.getTitle());
                    program.setDescription(updatedProgram.getDescription());
                    program.setDurationInDays(updatedProgram.getDurationInDays());
                    program.setImage(updatedProgram.getImage());
                    program.setDetails(updatedProgram.getDetails());
                    return programRepository.save(program);
                })
                .orElse(null);
    }

    /**
     * Delete a program by ID
     * @param id Program ID
     */
    public void deleteProgram(Long id) {
        programRepository.deleteById(id);
    }
}
