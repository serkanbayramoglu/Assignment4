import { TestBed } from '@angular/core/testing';

import { KSitemsHttpServiceService } from './ksitems-http-service.service';

describe('KSitemsHttpServiceService', () => {
  let service: KSitemsHttpServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(KSitemsHttpServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
