
package com.symptomcheck.xfit_backend.repositories;

import com.symptomcheck.xfit_backend.models.Program;
import com.symptomcheck.xfit_backend.models.ProgramDetail;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;


@Repository
public interface ProgramRepository extends JpaRepository<Program,Long> {

}
