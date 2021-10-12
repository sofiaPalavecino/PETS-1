import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { SliderPublisOrgasComponent } from './slider-publis-orgas.component';

describe('SliderPublisOrgasComponent', () => {
  let component: SliderPublisOrgasComponent;
  let fixture: ComponentFixture<SliderPublisOrgasComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ SliderPublisOrgasComponent ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(SliderPublisOrgasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
