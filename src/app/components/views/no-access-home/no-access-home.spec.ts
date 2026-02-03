import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NoAccessHome } from './no-access-home';

describe('NoAccessHome', () => {
  let component: NoAccessHome;
  let fixture: ComponentFixture<NoAccessHome>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NoAccessHome]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NoAccessHome);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
