import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RssDialogModalComponent } from './rss-dialog-modal.component';

describe('RssDialogModalComponent', () => {
  let component: RssDialogModalComponent;
  let fixture: ComponentFixture<RssDialogModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RssDialogModalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RssDialogModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
