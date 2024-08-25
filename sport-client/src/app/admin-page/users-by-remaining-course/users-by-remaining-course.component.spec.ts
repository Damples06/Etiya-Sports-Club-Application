import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UsersByRemainingCourseComponent } from './users-by-remaining-course.component';

describe('UsersByRemainingCourseComponent', () => {
  let component: UsersByRemainingCourseComponent;
  let fixture: ComponentFixture<UsersByRemainingCourseComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UsersByRemainingCourseComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UsersByRemainingCourseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
