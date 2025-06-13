import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LotProcessFormComponent } from './lot-process-form.component';

describe('LotProcessFormComponent', () => {
  let component: LotProcessFormComponent;
  let fixture: ComponentFixture<LotProcessFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LotProcessFormComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LotProcessFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
