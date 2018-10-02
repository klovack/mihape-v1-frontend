import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RecipientsOverviewComponent } from './recipients-overview.component';

describe('RecipientsOverviewComponent', () => {
  let component: RecipientsOverviewComponent;
  let fixture: ComponentFixture<RecipientsOverviewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RecipientsOverviewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RecipientsOverviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
