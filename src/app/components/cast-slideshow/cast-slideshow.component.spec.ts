import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CastSlideshowComponent } from './cast-slideshow.component';

describe('CastSlideshowComponent', () => {
  let component: CastSlideshowComponent;
  let fixture: ComponentFixture<CastSlideshowComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CastSlideshowComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CastSlideshowComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
