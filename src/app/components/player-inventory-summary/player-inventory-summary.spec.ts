import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PlayerInventorySummary } from './player-inventory-summary';

describe('PlayerInventorySummary', () => {
  let component: PlayerInventorySummary;
  let fixture: ComponentFixture<PlayerInventorySummary>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PlayerInventorySummary]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PlayerInventorySummary);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
