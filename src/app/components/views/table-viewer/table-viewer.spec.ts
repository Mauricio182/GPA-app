import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TableViewer } from './table-viewer';

describe('TableViewer', () => {
  let component: TableViewer;
  let fixture: ComponentFixture<TableViewer>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TableViewer]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TableViewer);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
