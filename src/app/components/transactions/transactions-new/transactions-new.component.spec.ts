import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TransactionsNewComponent } from './transactions-new.component';

describe('TransactionsNewComponent', () => {
  let component: TransactionsNewComponent;
  let fixture: ComponentFixture<TransactionsNewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TransactionsNewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TransactionsNewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
