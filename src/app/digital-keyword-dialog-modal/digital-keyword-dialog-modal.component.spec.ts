import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DigitalKeywordDialogModalComponent } from './digital-keyword-dialog-modal.component';

describe('DigitalKeywordDialogModalComponent', () => {
  let component: DigitalKeywordDialogModalComponent;
  let fixture: ComponentFixture<DigitalKeywordDialogModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DigitalKeywordDialogModalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DigitalKeywordDialogModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
