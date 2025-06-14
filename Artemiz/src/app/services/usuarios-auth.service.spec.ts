import { TestBed } from '@angular/core/testing';

import { UsuariosAuthService } from './usuarios-auth.service';

describe('UsuariosAuthService', () => {
  let service: UsuariosAuthService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(UsuariosAuthService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
