package com.example.codeclan.wellness.repositories;

import com.example.codeclan.wellness.models.Submission;
import com.example.codeclan.wellness.models.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;

public interface SubmissionRepository extends JpaRepository<Submission, Long> {

    List<Submission> findByUserIdAndDateBetween(Long userId, Date date1, Date date2);

    List<Submission> findByUserId(Long id);

    List<Submission> findByUserIdAndId(Long userId, Long id);

    List<Submission> findByUserIdAndDayScoreGreaterThan(Long userId, Integer dayScore);

    List<Submission> findByUserIdAndDayScoreLessThan(Long userId, Integer dayScore);

    List<Submission> findByDayCommentContains(String keyWord);

    List<Submission> findByUserIdAndDayScore(Long userId, Integer DayScore);
}
