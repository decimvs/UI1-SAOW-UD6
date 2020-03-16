import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UsuariosBorrarComponent } from './usuarios-borrar.component';

describe('UsuariosBorrarComponent', () => {
  let component: UsuariosBorrarComponent;
  let fixture: ComponentFixture<UsuariosBorrarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UsuariosBorrarComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UsuariosBorrarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
