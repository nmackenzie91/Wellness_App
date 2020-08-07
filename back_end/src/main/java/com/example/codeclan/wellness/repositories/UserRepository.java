package com.example.codeclan.wellness.repositories;

import com.example.codeclan.wellness.models.User;
import org.springframework.data.jpa.repository.JpaRepository;

public interface UserRepository extends JpaRepository<User, Long> {

    User findUserById(Long UserId);

}
