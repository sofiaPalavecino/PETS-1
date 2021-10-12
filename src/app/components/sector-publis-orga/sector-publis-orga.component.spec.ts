import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { SectorPublisOrgaComponent } from './sector-publis-orga.component';

describe('SectorPublisOrgaComponent', () => {
  let component: SectorPublisOrgaComponent;
  let fixture: ComponentFixture<SectorPublisOrgaComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ SectorPublisOrgaComponent ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(SectorPublisOrgaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
