import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CityPage } from './city-page';

describe('CityPage', () => {
  let component: CityPage;
  let fixture: ComponentFixture<CityPage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CityPage]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CityPage);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
