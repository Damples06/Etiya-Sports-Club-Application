import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateArrivalComponent } from './create-arrival.component';

describe('CreateArrivalComponent', () => {
  let component: CreateArrivalComponent;
  let fixture: ComponentFixture<CreateArrivalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CreateArrivalComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CreateArrivalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
