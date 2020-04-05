import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HeaderEstaticoComponent } from './header-estatico.component';

describe('HeaderEstaticoComponent', () => {
  let component: HeaderEstaticoComponent;
  let fixture: ComponentFixture<HeaderEstaticoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HeaderEstaticoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HeaderEstaticoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
