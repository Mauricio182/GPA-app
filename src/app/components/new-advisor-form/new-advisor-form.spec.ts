import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewAdvisorForm } from './new-advisor-form';

describe('NewAdvisorForm', () => {
  let component: NewAdvisorForm;
  let fixture: ComponentFixture<NewAdvisorForm>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NewAdvisorForm]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NewAdvisorForm);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
