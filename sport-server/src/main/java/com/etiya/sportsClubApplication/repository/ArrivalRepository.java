package com.etiya.sportsClubApplication.repository;

import com.etiya.sportsClubApplication.entity.Arrival;
import com.etiya.sportsClubApplication.entity.CourseBundle;
import com.etiya.sportsClubApplication.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.time.LocalDate;
import java.util.List;

@Repository
public interface ArrivalRepository extends JpaRepository<Arrival, Long> {

    List<Arrival> findByUser(User user);

    @Query("select a.courseBundle from Arrival a where a.id = :id")
    CourseBundle findCourseBundleByArrivalId(@Param("id") Long id);

    Arrival findByUserAndDate(User user, LocalDate date);
}
