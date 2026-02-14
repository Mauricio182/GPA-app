import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Progresbar } from './progresbar';

describe('Progresbar', () => {
  let component: Progresbar;
  let fixture: ComponentFixture<Progresbar>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Progresbar]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Progresbar);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
