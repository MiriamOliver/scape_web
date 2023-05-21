import { TestBed } from '@angular/core/testing';

import { AdministradorsocketService } from './administradorsocket.service';

describe('AdministradorsocketService', () => {
  let service: AdministradorsocketService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AdministradorsocketService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
