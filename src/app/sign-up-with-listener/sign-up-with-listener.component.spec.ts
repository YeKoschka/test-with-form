import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SignUpWithListenerComponent } from './sign-up-with-listener.component';

describe('SignUpWithListenerComponent', () => {
  let component: SignUpWithListenerComponent;
  let fixture: ComponentFixture<SignUpWithListenerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SignUpWithListenerComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SignUpWithListenerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
