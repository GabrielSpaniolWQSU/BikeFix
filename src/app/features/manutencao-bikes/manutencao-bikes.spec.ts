import { provideHttpClient } from '@angular/common/http';
import { provideRouter } from '@angular/router';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ManutencaoBikes } from './manutencao-bikes';

describe('ManutencaoBikes', () => {
  let component: ManutencaoBikes;
  let fixture: ComponentFixture<ManutencaoBikes>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ManutencaoBikes],
      providers: [provideHttpClient(), provideRouter([])],
    }).compileComponents();

    fixture = TestBed.createComponent(ManutencaoBikes);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

