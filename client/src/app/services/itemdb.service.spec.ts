import { TestBed } from '@angular/core/testing';

import { ItemdbService } from './itemdb.service';

describe('ItemdbService', () => {
  let service: ItemdbService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ItemdbService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
