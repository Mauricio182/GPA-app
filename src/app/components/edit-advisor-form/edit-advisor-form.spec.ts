import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditAdvisorForm } from './edit-advisor-form';

describe('EditAdvisorForm', () => {
  let component: EditAdvisorForm;
  let fixture: ComponentFixture<EditAdvisorForm>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EditAdvisorForm]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EditAdvisorForm);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
