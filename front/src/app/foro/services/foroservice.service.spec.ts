import { TestBed } from '@angular/core/testing';

import { ForoserviceService } from './foroservice.service';

describe('ForoserviceService', () => {
  let service: ForoserviceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ForoserviceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
