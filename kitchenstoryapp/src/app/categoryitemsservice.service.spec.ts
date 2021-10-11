import { TestBed } from '@angular/core/testing';

import { CategoryitemsserviceService } from './categoryitemsservice.service';

describe('CategoryitemsserviceService', () => {
  let service: CategoryitemsserviceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CategoryitemsserviceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
