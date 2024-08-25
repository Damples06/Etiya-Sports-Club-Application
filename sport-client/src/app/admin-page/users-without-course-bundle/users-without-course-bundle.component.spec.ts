import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UsersWithoutCourseBundleComponent } from './users-without-course-bundle.component';

describe('UsersWithoutCourseBundleComponent', () => {
  let component: UsersWithoutCourseBundleComponent;
  let fixture: ComponentFixture<UsersWithoutCourseBundleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UsersWithoutCourseBundleComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UsersWithoutCourseBundleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
