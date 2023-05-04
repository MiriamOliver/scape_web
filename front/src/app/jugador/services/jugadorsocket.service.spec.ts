import { TestBed } from '@angular/core/testing';

import { JugadorsocketService } from './jugadorsocket.service';

describe('JugadorsocketService', () => {
  let service: JugadorsocketService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(JugadorsocketService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
