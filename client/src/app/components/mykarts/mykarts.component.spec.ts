import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MykartsComponent } from './mykarts.component';

describe('MykartsComponent', () => {
  let component: MykartsComponent;
  let fixture: ComponentFixture<MykartsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MykartsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MykartsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
