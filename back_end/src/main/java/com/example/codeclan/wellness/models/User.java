package com.example.codeclan.wellness.models;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

import javax.persistence.*;
import java.util.ArrayList;
import java.util.List;

@Entity
@Table(name = "users")
public class User {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "name")
    private String name;

    @JsonBackReference
    @OneToMany(mappedBy = "user", fetch = FetchType.LAZY)
    private List<Submission> submissions;

    public User(String name) {
        this.name = name;
        this.submissions = new ArrayList<Submission>();
    }

    public User(){

    }

    public Long getId() {
        return id;
    }

    public String getName() {
        return name;
    }

    public List<Submission> getSubmissions() {
        return submissions;
    }

    public void setName(String name) {
        this.name = name;
    }

    public void setSubmissions(List<Submission> submissions) {
        this.submissions = submissions;
    }

}
