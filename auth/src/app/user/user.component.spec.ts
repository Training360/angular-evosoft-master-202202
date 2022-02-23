import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserComponent } from './user.component';

import userList from 'src/mocks/user.list';
import { EvoElementsModule } from '../evo-elements/evo-elements.module';
import { UserService } from './service/user.service';
import { Observable, of } from 'rxjs';
import { User } from './model/user';
import { RouterTestingModule } from '@angular/router/testing';

describe('UserComponent', () => {
  let component: UserComponent;
  let fixture: ComponentFixture<UserComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [
        UserComponent,
      ],
      imports: [
        EvoElementsModule,
        RouterTestingModule,
      ],
      providers: [
        {
          provide: UserService,
          useValue: {
            getAll(): Observable<User[]> {
              return of(userList);
            },
          },
        }
      ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
