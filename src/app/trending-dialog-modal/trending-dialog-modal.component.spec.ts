import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TrendingDialogModalComponent } from './trending-dialog-modal.component';

describe('TrendingDialogModalComponent', () => {
  let component: TrendingDialogModalComponent;
  let fixture: ComponentFixture<TrendingDialogModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TrendingDialogModalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TrendingDialogModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
