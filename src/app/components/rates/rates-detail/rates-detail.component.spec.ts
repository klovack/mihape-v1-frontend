import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RatesDetailComponent } from './rates-detail.component';

describe('RatesDetailComponent', () => {
  let component: RatesDetailComponent;
  let fixture: ComponentFixture<RatesDetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RatesDetailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RatesDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
