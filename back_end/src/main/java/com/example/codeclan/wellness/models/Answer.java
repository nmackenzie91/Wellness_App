package com.example.codeclan.wellness.models;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

import javax.persistence.*;

@Entity
@Table(name = "answers")
public class Answer {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "score")
    private int score;

    @Column(name = "question")
    private String question;

    @JsonIgnoreProperties("answers")
    @ManyToOne
    @JoinColumn(name = "submission_id", nullable = false)
    private Submission submission;

    public Answer(Submission submission, int score, String question) {
        this.submission = submission;
        this.score = score;
        this.question = question;
    }

    public Answer(){

    }

    public Long getId() {
        return id;
    }

    public int getScore() {
        return score;
    }

    public void setScore(int score) {
        this.score = score;
    }

    public String getQuestion() {
        return question;
    }

    public void setQuestion(String question){
        this.question = question;
    }

    public Submission getSubmission() {
        return submission;
    }

    public void setSubmission(Submission submission) {
        this.submission = submission;
    }

}
