import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RecipientsDetailComponent } from './recipients-detail.component';

describe('RecipientsDetailComponent', () => {
  let component: RecipientsDetailComponent;
  let fixture: ComponentFixture<RecipientsDetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RecipientsDetailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RecipientsDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
