import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TransactionsNewOverviewComponent } from './transactions-new-overview.component';

describe('TransactionsNewOverviewComponent', () => {
  let component: TransactionsNewOverviewComponent;
  let fixture: ComponentFixture<TransactionsNewOverviewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TransactionsNewOverviewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TransactionsNewOverviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
