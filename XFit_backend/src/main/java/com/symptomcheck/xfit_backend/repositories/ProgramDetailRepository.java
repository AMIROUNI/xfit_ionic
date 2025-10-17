package com.symptomcheck.xfit_backend.repositories;

import com.symptomcheck.xfit_backend.models.ProgramDetail;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;


@Repository
public interface ProgramDetailRepository extends JpaRepository<ProgramDetail,Long> {

    List<ProgramDetail> findByProgramId(Long programId);

}
