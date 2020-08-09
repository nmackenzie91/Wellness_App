package com.example.codeclan.wellness.controllers;

import com.example.codeclan.wellness.controllers.messages.AnswerRequest;
import com.example.codeclan.wellness.controllers.messages.SubmissionRequest;
import com.example.codeclan.wellness.models.Answer;
import com.example.codeclan.wellness.models.Submission;
//import com.example.codeclan.wellness.models.SubmissionRequest;
import com.example.codeclan.wellness.models.User;
import com.example.codeclan.wellness.repositories.AnswerRepository;
import com.example.codeclan.wellness.repositories.SubmissionRepository;
import com.example.codeclan.wellness.repositories.UserRepository;
import jdk.nashorn.internal.parser.JSONParser;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.xml.ws.Response;
import java.io.Serializable;
import java.lang.reflect.Array;
import java.text.DateFormat;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.*;

@RestController
public class SubmissionController {

    @Autowired
    SubmissionRepository submissionRepository;

    @Autowired
    UserRepository userRepository;
    
    @Autowired
    AnswerRepository answerRepository;

    // /submissions/userId?from=2020-02-13&to=2020-04-13
    // /submissions/userId?dayScore=3&request=greater
    // /submissions/userId?dayScore=3&request=less
    // /submissions/userId?keyWord=word
    @GetMapping("/submissions/{userId}")
    public ResponseEntity<List<Submission>> getSubmissionsForDateAndUserIdOrScoreOrComment(
            @PathVariable Long userId,
            @RequestParam(name = "from", required = false) String from,
            @RequestParam(name = "to", required = false) String to,
            @RequestParam(name = "keyWord", required = false) String keyWord,
            @RequestParam(name = "dayScore", required = false) Integer dayScore,
            @RequestParam(name = "request", required = false) String request) throws ParseException {
        if (from != null &&  to != null){
            SimpleDateFormat format = new SimpleDateFormat("yyyy-MM-dd");
            Date dateFrom = format.parse(from);
            Date dateTo = format.parse(to);
            return new ResponseEntity<>(submissionRepository.findByUserIdAndDateBetween(userId, dateFrom, dateTo), HttpStatus.OK);
        }
        if (dayScore != null && request != null){
            if(request.equals("greater")){
                return new ResponseEntity<>(submissionRepository.findByUserIdAndDayScoreGreaterThan(userId, dayScore), HttpStatus.OK);
            }
            else if(request.equals("less")){
                return new ResponseEntity<>(submissionRepository.findByUserIdAndDayScoreLessThan(userId, dayScore), HttpStatus.OK);
            }
        }
        if (dayScore != null){
            return new ResponseEntity<>(submissionRepository.findByUserIdAndDayScore(userId, dayScore), HttpStatus.OK);
        }
        if (keyWord != null){
            return new ResponseEntity<>(submissionRepository.findByDayCommentContains(keyWord),  HttpStatus.OK);
        }
        return new ResponseEntity("Request not allowed, you need to select a time interval", HttpStatus.FORBIDDEN);

    }

    @GetMapping(value = "/submissions/{userId}/{id}")
    public ResponseEntity getSubmission(@PathVariable Long userId, @PathVariable Long id){
        return new ResponseEntity<>(submissionRepository.findByUserIdAndId(userId, id), HttpStatus.OK);
    }

    // /trends/1?dayScore=5
    @GetMapping(value = "/trends/{userId}")
    public ResponseEntity<ArrayList> getTrends(@PathVariable Long userId,
                                               @RequestParam(name = "dayScore", required = false) Integer dayScore){
        List<Submission> submissions = submissionRepository.findByUserIdAndDayScore(userId, dayScore);
        HashMap<String, Integer> trendsObject = new HashMap<>();
        ArrayList trendsArray = new ArrayList();
            if (dayScore != null){
                for (Submission submission : submissions ){
                        if (trendsObject.containsKey(submission.getDayComment())) {
                            int i = trendsObject.get(submission.getDayComment()) + 1;
                            trendsObject.replace(submission.getDayComment(), i);
                        } else {
                            trendsObject.put(submission.getDayComment(), 1);
                        }
                    }
            }

        ArrayList<HashMap<String, Integer>> array = new ArrayList();
        for (Map.Entry<String, Integer> entry : trendsObject.entrySet())
        {
            String key = entry.getKey();
            Integer value = entry.getValue();
            HashMap<String, Integer> hash = new HashMap<>();
            hash.put(key, value);
            array.add(hash);
        }
        Comparator<HashMap<String, Integer>> compareByValue = (HashMap<String, Integer> o1, HashMap<String, Integer> o2) -> ((Integer) o1.values().toArray()[0]).compareTo( (Integer)o2.values().toArray()[0] );
        Collections.sort(array, compareByValue.reversed());
        return new ResponseEntity(array, HttpStatus.OK);
    }


    @PostMapping("/submissions")
    public ResponseEntity postSubmission(@RequestBody SubmissionRequest sub) throws ParseException {

        User user = userRepository.findUserById(sub.getUserId());

        Submission newSub = new Submission(user, sub.getDayScore(), sub.getDayComment(), sub.getDate());
        submissionRepository.save(newSub);

        for(AnswerRequest answerRequest : sub.getAnswers()){
            Answer answer = new Answer(newSub, answerRequest.getScore(), answerRequest.getQuestion());
            answerRepository.save(answer);
        }

        return new ResponseEntity<>(newSub, HttpStatus.CREATED);
    }
}
