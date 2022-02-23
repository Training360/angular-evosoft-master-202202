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

  it('data-table shuld exist', async () => {
    const table = fixture.debugElement.nativeElement.querySelector('table.table');
    expect(table).toBeTruthy();
  });

  it('data-table shuld have trhee rows', async () => {
    const rows = fixture.debugElement.nativeElement.querySelectorAll(
      'table.table tbody tr'
    );
    expect(rows.length).toBe(3);
  });

  it('data-table\'s rows should contain valid data', async () => {
    const cells = fixture.debugElement.nativeElement.querySelectorAll(
      'table.table tbody tr:first-child td'
    );

    // Sylvan	Bovingdon	sbovingdonri@npr.org	Female	6 Eastwood Way
    expect(cells[0].textContent).toMatch(/991/);
    expect(cells[1].textContent).toMatch(/Sylvan/);
    expect(cells[2].textContent).toMatch(/Bovingdon/);
    expect(cells[3].textContent).toMatch(/sbovingdonri@npr.org/);
    expect(cells[4].textContent).toMatch(/Female/);
    expect(cells[5].textContent).toMatch(/6 Eastwood Way/);
  });

  it('data-table shuld have two buttons per rows', async () => {
    const buttons = fixture.debugElement.nativeElement.querySelectorAll(
      'table.table tbody tr:first-child button');
    expect(buttons.length).toBe(2);
  });

  it('handleSelect should be called', async () => {
    const infoButton = fixture.debugElement.nativeElement.querySelector(
      'table.table tbody tr:first-child button.btn-info');

    const spy = spyOn<UserComponent, any>(component, 'handleSelect');
    infoButton.click();
    fixture.detectChanges();

    await fixture.whenStable();
    expect(spy).toHaveBeenCalled();
  });

  it('handleSelect should be called with the selected user', async () => {
    const infoButton = fixture.debugElement.nativeElement.querySelector(
      'table.table tbody tr:nth-child(2) button.btn-info');

    const spy = spyOn<UserComponent, any>(component, 'handleSelect');
    infoButton.click();
    fixture.detectChanges();

    await fixture.whenStable();

    const user = userList[1];
    expect(spy).toHaveBeenCalledWith(user);
  });


});
