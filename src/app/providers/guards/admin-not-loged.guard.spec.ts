import { TestBed } from '@angular/core/testing';

import { AdminNotLogedGuard } from './admin-not-loged.guard';

describe('AdminNotLogedGuard', () => {
  let guard: AdminNotLogedGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(AdminNotLogedGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
