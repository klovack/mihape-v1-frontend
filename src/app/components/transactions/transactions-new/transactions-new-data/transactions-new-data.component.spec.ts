import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TransactionsNewDataComponent } from './transactions-new-data.component';

describe('TransactionsNewDataComponent', () => {
  let component: TransactionsNewDataComponent;
  let fixture: ComponentFixture<TransactionsNewDataComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TransactionsNewDataComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TransactionsNewDataComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
