import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CatagoryCardComponent } from './catagory-card.component';

describe('CatagoryCardComponent', () => {
  let component: CatagoryCardComponent;
  let fixture: ComponentFixture<CatagoryCardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CatagoryCardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CatagoryCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
