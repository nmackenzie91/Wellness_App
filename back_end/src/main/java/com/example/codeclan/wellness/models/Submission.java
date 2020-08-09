package com.example.codeclan.wellness.models;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

import javax.persistence.*;
import java.sql.Array;
import java.sql.Time;
import java.text.DateFormat;
import java.text.ParseException;
import java.text.ParsePosition;
import java.text.SimpleDateFormat;
import java.time.Instant;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;

@Entity
@Table(name = "submissions")
public class Submission {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @JsonBackReference
    @ManyToOne
    @JoinColumn(name = "user_id", nullable = false)
    private User user;

    @JsonIgnoreProperties("submission")
    @OneToMany(mappedBy = "submission", fetch = FetchType.LAZY)
    private List<Answer> answers;

    @Column(name = "dayScore")
    private int dayScore;

    @Column(name = "dayComment")
    private String dayComment;

    @Column(name = "date")
    @Temporal(TemporalType.DATE)
    private Date date;

    public Submission(User user, int dayScore, String dayComment, String dateString) throws ParseException {
        DateFormat format = new SimpleDateFormat("yyyy-MM-dd");
        this.user = user;
        this.dayScore = dayScore;
        this.dayComment = dayComment;
        this.answers = new ArrayList<>();
        this.date = format.parse(dateString);
    }

    public Submission(){

    }

    public Long getId() {
        return id;
    }

    public User getUser() {
        return user;
    }

    public void setUser(User user) {
        this.user = user;
    }

    public List<Answer> getAnswers() {
        return answers;
    }

    public void setAnswers(ArrayList<Answer> answers) {
        this.answers = answers;
    }

    public Date getDate() {
        return date;
    }

    public void setDate(Date date) {
        this.date = date;
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

}
