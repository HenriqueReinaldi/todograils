import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CriacaoHomeComponent } from './criacao-home.component';

describe('CriacaoHomeComponent', () => {
  let component: CriacaoHomeComponent;
  let fixture: ComponentFixture<CriacaoHomeComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CriacaoHomeComponent]
    });
    fixture = TestBed.createComponent(CriacaoHomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
