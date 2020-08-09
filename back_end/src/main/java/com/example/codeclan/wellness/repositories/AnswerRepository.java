package com.example.codeclan.wellness.repositories;

import com.example.codeclan.wellness.models.Answer;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface AnswerRepository extends JpaRepository<Answer, Long> {

}
