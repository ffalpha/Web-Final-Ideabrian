import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AlgoliaPostsComponent } from './algolia-posts.component';

describe('AlgoliaPostsComponent', () => {
  let component: AlgoliaPostsComponent;
  let fixture: ComponentFixture<AlgoliaPostsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AlgoliaPostsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AlgoliaPostsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  /*it('should create', () => {
    expect(component).toBeTruthy();
  });*/
});
