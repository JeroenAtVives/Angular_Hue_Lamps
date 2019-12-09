import { TestBed } from '@angular/core/testing';

import { LampenService } from './lampen.service';

describe('LampenService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: LampenService = TestBed.get(LampenService);
    expect(service).toBeTruthy();
  });
});
