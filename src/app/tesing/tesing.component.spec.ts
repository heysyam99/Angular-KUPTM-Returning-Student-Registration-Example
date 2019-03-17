import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TesingComponent } from './tesing.component';

describe('TesingComponent', () => {
  let component: TesingComponent;
  let fixture: ComponentFixture<TesingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TesingComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TesingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
