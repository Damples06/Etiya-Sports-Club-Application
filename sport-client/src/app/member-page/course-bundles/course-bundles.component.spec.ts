import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CourseBundlesComponent } from './course-bundles.component';

describe('CourseBundlesComponent', () => {
  let component: CourseBundlesComponent;
  let fixture: ComponentFixture<CourseBundlesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CourseBundlesComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CourseBundlesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
