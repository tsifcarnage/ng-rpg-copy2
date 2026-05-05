import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FightActions } from './fight-actions';

describe('FightActions', () => {
  let component: FightActions;
  let fixture: ComponentFixture<FightActions>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FightActions]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FightActions);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
