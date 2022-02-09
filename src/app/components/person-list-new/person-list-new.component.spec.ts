import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PersonListNewComponent } from './person-list-new.component';

describe('PersonListNewComponent', () => {
  let component: PersonListNewComponent;
  let fixture: ComponentFixture<PersonListNewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PersonListNewComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PersonListNewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
