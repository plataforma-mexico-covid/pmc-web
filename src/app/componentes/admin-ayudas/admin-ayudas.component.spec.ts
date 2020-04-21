import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminAyudasComponent } from './admin-ayudas.component';

describe('AdminAyudasComponent', () => {
  let component: AdminAyudasComponent;
  let fixture: ComponentFixture<AdminAyudasComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdminAyudasComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminAyudasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
