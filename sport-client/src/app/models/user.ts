export interface User {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  roles: Role[];
  courseBundles: CourseBundle[];
  arrivals: Arrival[];
  authorities: Authority[];
}

export interface Role {
  id: number;
  roleName: string;
}

export interface CourseBundle {
  id: number;
  totalCourse: number;
  remainingCourses: number;
  arrivals: Arrival[];
}

export interface Arrival {
  id: number;
  date: string;
  status: string;
}

export interface Authority {
  authority: string;
}
