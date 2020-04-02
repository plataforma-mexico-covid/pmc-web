import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RegistroInicioComponent } from './registro-inicio.component';

describe('RegistroInicioComponent', () => {
  let component: RegistroInicioComponent;
  let fixture: ComponentFixture<RegistroInicioComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RegistroInicioComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RegistroInicioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
