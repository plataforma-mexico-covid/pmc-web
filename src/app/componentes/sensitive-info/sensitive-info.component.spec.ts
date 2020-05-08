import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SensitiveInfoComponent } from './sensitive-info.component';

describe('SensitiveInfoComponent', () => {
  let component: SensitiveInfoComponent;
  let fixture: ComponentFixture<SensitiveInfoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SensitiveInfoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SensitiveInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
