import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HowWeWorkShortComponent } from './how-we-work-short.component';

describe('HowWeWorkShortComponent', () => {
  let component: HowWeWorkShortComponent;
  let fixture: ComponentFixture<HowWeWorkShortComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HowWeWorkShortComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HowWeWorkShortComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
