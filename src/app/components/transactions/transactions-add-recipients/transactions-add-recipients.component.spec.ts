import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TransactionsAddRecipientsComponent } from './transactions-add-recipients.component';

describe('TransactionsAddRecipientsComponent', () => {
  let component: TransactionsAddRecipientsComponent;
  let fixture: ComponentFixture<TransactionsAddRecipientsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TransactionsAddRecipientsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TransactionsAddRecipientsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
