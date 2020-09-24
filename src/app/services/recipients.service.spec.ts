import { TestBed, inject } from '@angular/core/testing';

import { RecipientsService } from './recipients.service';

describe('RecipientsService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [RecipientsService]
    });
  });

  it('should be created', inject([RecipientsService], (service: RecipientsService) => {
    expect(service).toBeTruthy();
  }));
});
