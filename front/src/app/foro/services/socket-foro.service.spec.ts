import { TestBed } from '@angular/core/testing';

import { SocketForoService } from './socket-foro.service';

describe('SocketForoService', () => {
  let service: SocketForoService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SocketForoService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
