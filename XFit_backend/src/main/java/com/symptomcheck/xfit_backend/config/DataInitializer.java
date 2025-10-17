package com.symptomcheck.xfit_backend.config;

import com.symptomcheck.xfit_backend.models.Program;
import com.symptomcheck.xfit_backend.models.ProgramDetail;
import com.symptomcheck.xfit_backend.repositories.ProgramRepository;
import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import java.util.Arrays;

@Configuration
public class DataInitializer {

    @Bean
    CommandLineRunner initDatabase(ProgramRepository programRepository) {
        return args -> {
            if (programRepository.count() == 0) { // Only insert if DB is empty

                // 🏋️‍♂️ Program 1: Full Body Workout
                Program fullBody = new Program();
                fullBody.setTitle("Full Body Beginner");
                fullBody.setDescription("A 7-day workout plan for beginners focusing on all muscle groups.");
                fullBody.setImage("https://images.pexels.com/photos/1552249/pexels-photo-1552249.jpeg?auto=compress&cs=tinysrgb&w=800");
                fullBody.setDurationInDays(7);

                ProgramDetail d1 = new ProgramDetail();
                d1.setExerciseName("Push-ups");
                d1.setDescription("3 sets of 10 reps — great for chest and triceps.");
                d1.setDay(1);
                d1.setProgram(fullBody);

                ProgramDetail d2 = new ProgramDetail();
                d2.setExerciseName("Squats");
                d2.setDescription("3 sets of 15 reps — strengthens legs and core.");
                d2.setDay(1);
                d2.setProgram(fullBody);

                ProgramDetail d3 = new ProgramDetail();
                d3.setExerciseName("Plank");
                d3.setDescription("Hold for 30 seconds — builds core stability.");
                d3.setDay(2);
                d3.setProgram(fullBody);

                fullBody.setDetails(Arrays.asList(d1, d2, d3));


                // 🧘 Program 2: Yoga for Flexibility
                Program yoga = new Program();
                yoga.setTitle("Yoga Flexibility");
                yoga.setDescription("5-day yoga plan to improve flexibility and posture.");
                yoga.setImage("https://images.pexels.com/photos/3822355/pexels-photo-3822355.jpeg?auto=compress&cs=tinysrgb&w=800");
                yoga.setDurationInDays(5);

                ProgramDetail y1 = new ProgramDetail();
                y1.setExerciseName("Sun Salutation");
                y1.setDescription("Perform 10 rounds slowly — warms up the entire body.");
                y1.setDay(1);
                y1.setProgram(yoga);

                ProgramDetail y2 = new ProgramDetail();
                y2.setExerciseName("Tree Pose");
                y2.setDescription("Hold each leg for 30 seconds — improves balance and focus.");
                y2.setDay(2);
                y2.setProgram(yoga);

                yoga.setDetails(Arrays.asList(y1, y2));


                // 🏃‍♂️ Program 3: Cardio Fat Burn
                Program cardio = new Program();
                cardio.setTitle("Cardio Fat Burn");
                cardio.setDescription("An energetic 10-day plan focused on burning calories and boosting stamina.");
                cardio.setImage("https://images.pexels.com/photos/1552242/pexels-photo-1552242.jpeg?auto=compress&cs=tinysrgb&w=800");
                cardio.setDurationInDays(10);

                ProgramDetail c1 = new ProgramDetail();
                c1.setExerciseName("Jumping Jacks");
                c1.setDescription("Do 3 rounds of 50 seconds with 10 seconds rest.");
                c1.setDay(1);
                c1.setProgram(cardio);

                ProgramDetail c2 = new ProgramDetail();
                c2.setExerciseName("Mountain Climbers");
                c2.setDescription("3 sets of 30 seconds — targets core and legs.");
                c2.setDay(2);
                c2.setProgram(cardio);

                cardio.setDetails(Arrays.asList(c1, c2));


                // Save everything
                programRepository.saveAll(Arrays.asList(fullBody, yoga, cardio));

                System.out.println("✅ Initial programs with real images inserted into the database!");
            } else {
                System.out.println("ℹ️ Database already contains data. Skipping initialization.");
            }
        };
    }
}

