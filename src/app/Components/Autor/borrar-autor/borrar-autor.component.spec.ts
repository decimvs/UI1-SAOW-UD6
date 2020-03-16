import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BorrarAutorComponent } from './borrar-autor.component';

describe('BorrarAutorComponent', () => {
  let component: BorrarAutorComponent;
  let fixture: ComponentFixture<BorrarAutorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BorrarAutorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BorrarAutorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
