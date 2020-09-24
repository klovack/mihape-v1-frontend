import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RatesConverterComponent } from './rates-converter.component';

describe('RatesConverterComponent', () => {
  let component: RatesConverterComponent;
  let fixture: ComponentFixture<RatesConverterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RatesConverterComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RatesConverterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
