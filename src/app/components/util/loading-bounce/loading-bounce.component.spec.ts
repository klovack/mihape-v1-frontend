import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LoadingBounceComponent } from './loading-bounce.component';

describe('LoadingBounceComponent', () => {
  let component: LoadingBounceComponent;
  let fixture: ComponentFixture<LoadingBounceComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LoadingBounceComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LoadingBounceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
