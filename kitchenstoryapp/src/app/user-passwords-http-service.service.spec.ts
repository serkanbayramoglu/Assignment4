import { TestBed } from '@angular/core/testing';

import { UserPasswordsHttpServiceService } from './user-passwords-http-service.service';

describe('UserPasswordsHttpServiceService', () => {
  let service: UserPasswordsHttpServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(UserPasswordsHttpServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
