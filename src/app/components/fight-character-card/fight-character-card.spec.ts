import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FightCharacterCard } from './fight-character-card';

describe('FightCharacterCard', () => {
  let component: FightCharacterCard;
  let fixture: ComponentFixture<FightCharacterCard>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FightCharacterCard]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FightCharacterCard);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
