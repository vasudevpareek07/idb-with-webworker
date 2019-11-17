import { TestBed } from '@angular/core/testing';

import { WorkerIDBService } from './worker-idb.service';

describe('WorkerIDBService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: WorkerIDBService = TestBed.get(WorkerIDBService);
    expect(service).toBeTruthy();
  });
});
