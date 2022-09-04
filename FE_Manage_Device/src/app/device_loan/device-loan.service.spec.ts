import { TestBed } from '@angular/core/testing';

import { DeviceLoanService } from './device-loan.service';

describe('DeviceLoanService', () => {
  let service: DeviceLoanService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DeviceLoanService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
