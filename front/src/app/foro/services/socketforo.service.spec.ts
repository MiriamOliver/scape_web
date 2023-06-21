import { TestBed } from '@angular/core/testing';

import { SocketforoService } from './socketforo.service';

describe('SocketforoService', () => {
  let service: SocketforoService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SocketforoService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
