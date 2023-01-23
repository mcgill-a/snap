import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SnapComponent } from './snap.component';

describe('SnapComponent', () => {
  let component: SnapComponent;
  let fixture: ComponentFixture<SnapComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SnapComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(SnapComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
