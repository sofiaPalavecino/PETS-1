import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { PopoverAddAdministradoresComponent } from './popover-add-administradores.component';

describe('PopoverAddAdministradoresComponent', () => {
  let component: PopoverAddAdministradoresComponent;
  let fixture: ComponentFixture<PopoverAddAdministradoresComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ PopoverAddAdministradoresComponent ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(PopoverAddAdministradoresComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
