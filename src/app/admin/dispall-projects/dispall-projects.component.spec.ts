import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DispallProjectsComponent } from './dispall-projects.component';

describe('DispallProjectsComponent', () => {
  let component: DispallProjectsComponent;
  let fixture: ComponentFixture<DispallProjectsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DispallProjectsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DispallProjectsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
