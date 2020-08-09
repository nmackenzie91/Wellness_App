package com.example.codeclan.wellness.models;

import javax.persistence.*;

@Entity
@Table(name = "questions")
public class Question {

    @Id
    private String id;

    @Column(name = "content")
    private String content;

    public Question(String id, String content) {
        this.id = id;
        this.content = content;
    }

    public Question(){

    }

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getContent() {
        return content;
    }

    public void setContent(String content) {
        this.content = content;
    }
}
