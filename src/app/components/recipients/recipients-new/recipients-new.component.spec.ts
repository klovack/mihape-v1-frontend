import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RecipientsNewComponent } from './recipients-new.component';

describe('RecipientsNewComponent', () => {
  let component: RecipientsNewComponent;
  let fixture: ComponentFixture<RecipientsNewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RecipientsNewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RecipientsNewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
