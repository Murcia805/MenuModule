import { TestBed } from '@angular/core/testing';

import { IngredienteService } from './ingrediente.service';

describe('IngredienteService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: IngredienteService = TestBed.get(IngredienteService);
    expect(service).toBeTruthy();
  });
});
