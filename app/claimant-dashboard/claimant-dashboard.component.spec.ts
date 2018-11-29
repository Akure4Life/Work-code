import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ClaimantDashboardComponent } from './claimant-dashboard.component';

describe('ClaimantDashboardComponent', () => {
  let component: ClaimantDashboardComponent;
  let fixture: ComponentFixture<ClaimantDashboardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ClaimantDashboardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ClaimantDashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
