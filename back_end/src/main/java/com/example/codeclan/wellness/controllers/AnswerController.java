package com.example.codeclan.wellness.controllers;

import com.example.codeclan.wellness.models.Answer;
import com.example.codeclan.wellness.repositories.AnswerRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
public class AnswerController {

    @Autowired
    AnswerRepository answerRepository;

    @GetMapping("/answers")
    public ResponseEntity<List<Answer>> getAllAnswers(){
        return new ResponseEntity<>(answerRepository.findAll(), HttpStatus.OK);
    }

    @PostMapping("/answers")
    public ResponseEntity<Answer> postAnswer(@RequestBody Answer answer){
        answerRepository.save(answer);
        return new ResponseEntity<>(answer, HttpStatus.CREATED);
    }
}
