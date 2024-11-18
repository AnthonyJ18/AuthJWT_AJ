import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BuscarIDComponent } from './buscar-id.component';

describe('BuscarIDComponent', () => {
  let component: BuscarIDComponent;
  let fixture: ComponentFixture<BuscarIDComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [BuscarIDComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(BuscarIDComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
