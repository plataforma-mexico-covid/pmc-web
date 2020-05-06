import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateAyudaComponent } from './update-ayuda.component';

describe('UpdateAyudaComponent', () => {
  let component: UpdateAyudaComponent;
  let fixture: ComponentFixture<UpdateAyudaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UpdateAyudaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UpdateAyudaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
