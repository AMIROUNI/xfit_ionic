package com.symptomcheck.xfit_backend.models;
import com.fasterxml.jackson.annotation.JsonBackReference;
import jakarta.persistence.*;
import lombok.Data;

@Data
@Entity
@Table(name = "program_details")
public class ProgramDetail {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String exerciseName;

    private String description;

    private int day; // day number in the program

    @ManyToOne
    @JoinColumn(name = "program_id")
    @JsonBackReference
    private Program program;
}