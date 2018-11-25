import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RecipientSelectComponent } from './recipient-select.component';

describe('RecipientSelectComponent', () => {
  let component: RecipientSelectComponent;
  let fixture: ComponentFixture<RecipientSelectComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RecipientSelectComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RecipientSelectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
