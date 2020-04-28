import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ParenttaskpopupComponent } from './parenttaskpopup.component';

describe('ParenttaskpopupComponent', () => {
  let component: ParenttaskpopupComponent;
  let fixture: ComponentFixture<ParenttaskpopupComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ParenttaskpopupComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ParenttaskpopupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
