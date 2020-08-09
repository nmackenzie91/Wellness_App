package com.example.codeclan.wellness.controllers.messages;

import com.example.codeclan.wellness.models.Answer;

import java.io.Serializable;
import java.util.ArrayList;

public class SubmissionRequest implements Serializable {

    private Long userId;
    private int dayScore;
    private String dayComment;
    private String date;
    private ArrayList<AnswerRequest> answers;

    public Long getUserId() {
        return userId;
    }

    public void setUserId(Long userId) {
        this.userId = userId;
    }

    public int getDayScore() {
        return dayScore;
    }

    public void setDayScore(int dayScore) {
        this.dayScore = dayScore;
    }

    public String getDayComment() {
        return dayComment;
    }

    public void setDayComment(String dayComment) {
        this.dayComment = dayComment;
    }

    public String getDate() {
        return date;
    }

    public void setDate(String date) {
        this.date = date;
    }

    public ArrayList<AnswerRequest> getAnswers() {
        return answers;
    }

    public void setAnswers(ArrayList<AnswerRequest> answers) {
        this.answers = answers;
    }
}
