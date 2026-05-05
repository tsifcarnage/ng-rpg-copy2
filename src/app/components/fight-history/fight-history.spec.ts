import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FightHistory } from './fight-history';

describe('FightHistory', () => {
  let component: FightHistory;
  let fixture: ComponentFixture<FightHistory>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FightHistory]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FightHistory);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
