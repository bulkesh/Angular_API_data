import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';

import { HttpDataServiceService } from './http_data_service.service';

describe('HttpDataServiceService', () => {
  let service: HttpDataServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports:[
        HttpClientTestingModule,
      ],
    });
    service = TestBed.inject(HttpDataServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
