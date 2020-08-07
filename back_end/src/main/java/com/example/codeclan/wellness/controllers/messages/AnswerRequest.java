package com.example.codeclan.wellness.controllers.messages;

import java.io.Serializable;

public class AnswerRequest implements Serializable {

    private String question;
    private int score;

    public String getQuestion() {
        return question;
    }

    public void setQuestion(String question) {
        this.question = question;
    }

    public int getScore() {
        return score;
    }

    public void setScore(int score) {
        this.score = score;
    }
}
