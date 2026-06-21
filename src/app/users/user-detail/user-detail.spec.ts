import { ComponentFixture, TestBed } from '@angular/core/testing';
import { signal } from '@angular/core';
import { ActivatedRoute, convertToParamMap, provideRouter } from '@angular/router';
import { of } from 'rxjs';

import { UserDetail } from './user-detail';
import { UserService } from '../user.service';

describe('UserDetail', () => {
  let component: UserDetail;
  let fixture: ComponentFixture<UserDetail>;
  let loadUserByIdCalls = 0;

  const mockUserService = {
    selectedUser: signal(null),
    detailLoading: signal(false),
    detailError: signal<string | null>(null),
    loadUserById: (_id: number) => {
      loadUserByIdCalls += 1;
    }
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UserDetail],
      providers: [
        provideRouter([]),
        {
          provide: ActivatedRoute,
          useValue: {
            paramMap: of(convertToParamMap({ id: '1' }))
          }
        },
        { provide: UserService, useValue: mockUserService }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(UserDetail);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should load user detail from route id', () => {
    expect(loadUserByIdCalls).toBeGreaterThan(0);
  });
});
