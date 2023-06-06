import { TestBed } from '@angular/core/testing';

import { SocketpartidaService } from './socketpartida.service';

describe('SocketpartidaService', () => {
  let service: SocketpartidaService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SocketpartidaService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
