import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TableTurnover } from './table-turnover';

describe('TableTurnover', () => {
  let component: TableTurnover;
  let fixture: ComponentFixture<TableTurnover>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TableTurnover]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TableTurnover);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
