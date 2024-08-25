package com.etiya.sportsClubApplication.repository;

import com.etiya.sportsClubApplication.entity.CourseBundle;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface CourseBundleRepository extends JpaRepository<CourseBundle, Long> {

    @Query("select cb from CourseBundle cb where cb.user.id = :userId")
    List<CourseBundle> findByUserId(@Param("userId") Long userId);

    List<CourseBundle> findByRemainingCourses(int i);
}
