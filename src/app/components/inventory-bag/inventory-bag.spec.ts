import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InventoryBag } from './inventory-bag';

describe('InventoryBag', () => {
  let component: InventoryBag;
  let fixture: ComponentFixture<InventoryBag>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [InventoryBag]
    })
    .compileComponents();

    fixture = TestBed.createComponent(InventoryBag);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
