package com.symptomcheck.xfit_backend.services;

import com.symptomcheck.xfit_backend.models.ProgramDetail;
import com.symptomcheck.xfit_backend.repositories.ProgramDetailRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class ProgramDetailService {

    // Inject the repository to interact with the database
    private final ProgramDetailRepository programDetailRepository;

    /**
     * Get all program details
     * @return List of ProgramDetail
     */
    public List<ProgramDetail> getAllDetails() {
        return programDetailRepository.findAll();
    }

    /**
     * Get a program detail by ID
     * @param id ProgramDetail ID
     * @return Optional of ProgramDetail
     */
    public Optional<ProgramDetail> getDetailById(Long id) {
        return programDetailRepository.findById(id);
    }

    /**
     * Save a new program detail
     * @param detail ProgramDetail object
     * @return Saved ProgramDetail
     */
    public ProgramDetail saveDetail(ProgramDetail detail) {
        return programDetailRepository.save(detail);
    }

    /**
     * Update an existing program detail
     * @param id ProgramDetail ID
     * @param updatedDetail ProgramDetail with new values
     * @return Updated ProgramDetail or null if not found
     */
    public ProgramDetail updateDetail(Long id, ProgramDetail updatedDetail) {
        return programDetailRepository.findById(id)
                .map(detail -> {
                    detail.setExerciseName(updatedDetail.getExerciseName());
                    detail.setDescription(updatedDetail.getDescription());
                    detail.setDay(updatedDetail.getDay());
                    detail.setProgram(updatedDetail.getProgram());
                    return programDetailRepository.save(detail);
                })
                .orElse(null);
    }

    /**
     * Delete a program detail by ID
     * @param id ProgramDetail ID
     */
    public void deleteDetail(Long id) {
        programDetailRepository.deleteById(id);
    }

    /**
     * Get all details for a specific Program ID
     * @param programId ID of the Program
     * @return List of ProgramDetail
     */
    public List<ProgramDetail> getDetailsByProgramId(Long programId) {
        return programDetailRepository.findByProgramId(programId);
    }
}
