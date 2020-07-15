package com.example.codeclan.wellness.components;

import com.example.codeclan.wellness.models.*;
import com.example.codeclan.wellness.repositories.AnswerRepository;
import com.example.codeclan.wellness.repositories.QuestionRepository;
import com.example.codeclan.wellness.repositories.SubmissionRepository;
import com.example.codeclan.wellness.repositories.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.ApplicationArguments;
import org.springframework.boot.ApplicationRunner;
import org.springframework.stereotype.Component;

import java.text.ParseException;
import java.util.ArrayList;
import java.util.Collections;
import java.util.Random;

@Component
public class DataLoader implements ApplicationRunner {
    
    @Autowired
    AnswerRepository answerRepository;
    
    @Autowired
    SubmissionRepository submissionRepository;
    
    @Autowired
    UserRepository userRepository;
    
    @Autowired
    QuestionRepository questionRepository;
    
    public DataLoader(){
        
    }
    
    public void run(ApplicationArguments args) throws ParseException {

        ArrayList<String> dailyAnswers = new ArrayList<String>();
        Collections.addAll(dailyAnswers,
                "Met my girlfriend",
                "Played fives with the lads",
                "Fish and chips for tea",
                "Went to a nice restaurant",
                "Had a nice swim",
                "Ate like a king",
                "Went for a walk with Pauline",
                "Wrote some good code",
                "Strange day at work",
                "Got wasted",
                "Didn't want to get out of bed",
                "Met with Mikey and Brian",
                "Went to the football",
                "Watched 4 episodes of The Wire",
                "Great weather",
                "Was late for work",
                "Went out for steak",
                "Did nothing",
                "Watched The Godfather and ate too much chocolate",
                "Broke up with my girlfriend",
                "Didn't leave the house",
                "Met with my family",
                "Made lasagne",
                "Chilled at home",
                "Had a long call with Tony",
                "Finished reading Norwegian Wood",
                "Applying for jobs",
                "Learning some Italian",
                "Went for a walk with Brian",
                "Had Tony and Pauline round for tea",
                "Started reading my new book");
        
        
        //Questions
        Question sleep = new Question("SLEEP", "How well did you sleep?");
        questionRepository.save(sleep);
        
        Question eat = new Question("EAT", "Did you eat well?");
        questionRepository.save(eat);
        
        Question social = new Question("SOCIAL", "Did you speak to anyone?");
        questionRepository.save(social);
        
        Question mental = new Question("MENTAL", "Did you learn anything new?");
        questionRepository.save(mental);
        
        Question physical = new Question("PHYSICAL", "Have you exercised?");
        questionRepository.save(physical);

        Question dayQuestion = new Question("DAY", "Rate your day:");
        questionRepository.save(dayQuestion);
                
        //User
        User neil = new User("Neil");
        userRepository.save(neil);

        //Submission
        for(int i =  1 ; i <= 198 ; i++ ){

            int day = i;


            int score1 = (int)(Math.random() * 6) + 1;
            int score2 = (int)(Math.random() * 6) + 1;
            int score3 = (int)(Math.random() * 6) + 1;
            int score4 = (int)(Math.random() * 6) + 1;
            int score5 = (int)(Math.random() * 6) + 1;

            int dayScore = (score1 + score2 + score3 + score4 + score5) / 5;

            int dayComment = (int)(Math.random() * dailyAnswers.size());

            Submission submission = new Submission(neil, dayScore, dailyAnswers.get(dayComment), String.format("2020-1-%s", day));
            submissionRepository.save(submission);


            Answer answer1 = new Answer(submission, score1, sleep.getId());
            answerRepository.save(answer1);

            Answer answer2 = new Answer(submission, score2, eat.getId());
            answerRepository.save(answer2);

            Answer answer3 = new Answer(submission, score3, mental.getId());
            answerRepository.save(answer3);

            Answer answer4 = new Answer(submission, score4, social.getId());
            answerRepository.save(answer4);

            Answer answer5 = new Answer(submission, score5, physical.getId());
            answerRepository.save(answer5);
        }

    }
}
