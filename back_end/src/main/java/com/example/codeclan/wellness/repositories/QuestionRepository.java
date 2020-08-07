package com.example.codeclan.wellness.repositories;

import com.example.codeclan.wellness.models.Question;
import org.springframework.data.jpa.repository.JpaRepository;

public interface QuestionRepository extends JpaRepository<Question, Long> {


}
