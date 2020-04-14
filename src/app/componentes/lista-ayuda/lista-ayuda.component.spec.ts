import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListaAyudaComponent } from './lista-ayuda.component';

describe('ListaAyudaComponent', () => {
  let component: ListaAyudaComponent;
  let fixture: ComponentFixture<ListaAyudaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListaAyudaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListaAyudaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
