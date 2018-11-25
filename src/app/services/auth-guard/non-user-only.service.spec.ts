import { TestBed, inject } from '@angular/core/testing';

import { NonUserOnlyGuard } from './non-user-only.service';

describe('NonUserOnlyGuard', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [NonUserOnlyGuard]
    });
  });

  it('should be created', inject([NonUserOnlyGuard], (service: NonUserOnlyGuard) => {
    expect(service).toBeTruthy();
  }));
});
