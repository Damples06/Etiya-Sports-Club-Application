package com.etiya.sportsClubApplication.entity;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonManagedReference;
import jakarta.persistence.*;
import lombok.Data;

import java.util.List;

@Data
@Entity
@Table(name = "course_bundle")
public class CourseBundle {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private Long id;

    @Column(name = "total_course")
    private int totalCourse;

    @Column(name = "remaining_courses")
    private int remainingCourses;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id", referencedColumnName = "id")
    @JsonBackReference(value = "user-courseBundle")
    private User user;

    @OneToMany(mappedBy = "courseBundle", fetch = FetchType.LAZY, cascade = CascadeType.ALL)
    @JsonManagedReference(value = "courseBundle-arrival")
    private List<Arrival> arrivals;
}
