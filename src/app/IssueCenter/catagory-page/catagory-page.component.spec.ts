import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CatagoryPageComponent } from './catagory-page.component';

describe('CatagoryPageComponent', () => {
  let component: CatagoryPageComponent;
  let fixture: ComponentFixture<CatagoryPageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CatagoryPageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CatagoryPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
