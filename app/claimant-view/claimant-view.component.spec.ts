import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ClaimantViewComponent } from './claimant-view.component';

describe('ClaimantViewComponent', () => {
  let component: ClaimantViewComponent;
  let fixture: ComponentFixture<ClaimantViewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ClaimantViewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ClaimantViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
