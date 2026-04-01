import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CheckOldTurnover } from './check-old-turnover';

describe('CheckOldTurnover', () => {
  let component: CheckOldTurnover;
  let fixture: ComponentFixture<CheckOldTurnover>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CheckOldTurnover]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CheckOldTurnover);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
