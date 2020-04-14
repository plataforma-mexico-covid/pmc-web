import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AyudaCiudadanoComponent } from './ayuda-ciudadano.component';

describe('AyudaCiudadanoComponent', () => {
  let component: AyudaCiudadanoComponent;
  let fixture: ComponentFixture<AyudaCiudadanoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AyudaCiudadanoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AyudaCiudadanoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
