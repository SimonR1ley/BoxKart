import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BuildCardsComponent } from './build-cards.component';

describe('BuildCardsComponent', () => {
  let component: BuildCardsComponent;
  let fixture: ComponentFixture<BuildCardsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BuildCardsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BuildCardsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
