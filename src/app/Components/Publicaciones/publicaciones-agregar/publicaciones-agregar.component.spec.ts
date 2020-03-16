import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PublicacionesAgregarComponent } from './publicaciones-agregar.component';

describe('PublicacionesAgregarComponent', () => {
  let component: PublicacionesAgregarComponent;
  let fixture: ComponentFixture<PublicacionesAgregarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PublicacionesAgregarComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PublicacionesAgregarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
