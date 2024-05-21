import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminvideojuegoComponent } from './adminvideojuego.component';

describe('AdminvideojuegoComponent', () => {
  let component: AdminvideojuegoComponent;
  let fixture: ComponentFixture<AdminvideojuegoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AdminvideojuegoComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AdminvideojuegoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
