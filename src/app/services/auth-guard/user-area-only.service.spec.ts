import { TestBed, inject } from '@angular/core/testing';

import { UserOnlyGuard } from './user-area-only.service';

describe('AuthGuardService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [UserOnlyGuard]
    });
  });

  it('should be created', inject([UserOnlyGuard], (service: UserOnlyGuard) => {
    expect(service).toBeTruthy();
  }));
});
