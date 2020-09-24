import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RatesDescriptionComponent } from './rates-description.component';

describe('RatesDescriptionComponent', () => {
  let component: RatesDescriptionComponent;
  let fixture: ComponentFixture<RatesDescriptionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RatesDescriptionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RatesDescriptionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
