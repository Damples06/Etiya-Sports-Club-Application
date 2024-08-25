import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SellCourseBundleComponent } from './sell-course-bundle.component';

describe('SellCourseBundleComponent', () => {
  let component: SellCourseBundleComponent;
  let fixture: ComponentFixture<SellCourseBundleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SellCourseBundleComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SellCourseBundleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
