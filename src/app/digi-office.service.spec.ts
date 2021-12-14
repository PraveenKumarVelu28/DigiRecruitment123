import { TestBed } from '@angular/core/testing';

import { DigiOfficeService } from './digi-office.service';

describe('DigiOfficeService', () => {
  let service: DigiOfficeService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DigiOfficeService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
