import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TuPerfilComponent } from './tu-perfil.component';

describe('TuPerfilComponent', () => {
  let component: TuPerfilComponent;
  let fixture: ComponentFixture<TuPerfilComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TuPerfilComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TuPerfilComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
