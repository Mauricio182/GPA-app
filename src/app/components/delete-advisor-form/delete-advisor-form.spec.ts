import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeleteAdvisorForm } from './delete-advisor-form';

describe('DeleteAdvisorForm', () => {
  let component: DeleteAdvisorForm;
  let fixture: ComponentFixture<DeleteAdvisorForm>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DeleteAdvisorForm]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DeleteAdvisorForm);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
