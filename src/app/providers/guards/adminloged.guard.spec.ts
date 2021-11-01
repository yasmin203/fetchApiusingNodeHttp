import { TestBed } from '@angular/core/testing';

import { AdminlogedGuard } from './adminloged.guard';

describe('AdminlogedGuard', () => {
  let guard: AdminlogedGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(AdminlogedGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
