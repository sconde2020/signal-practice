import { ComponentFixture, TestBed } from '@angular/core/testing';
import { computed, signal } from '@angular/core';
import { provideRouter } from '@angular/router';

import { UserList } from './user-list';
import { UserService } from '../user.service';

describe('UserList', () => {
  let component: UserList;
  let fixture: ComponentFixture<UserList>;

  const nameFilter = signal('');
  const cityFilter = signal('');
  const companyFilter = signal('');
  const users = signal([]);
  let loadAllUsersCalls = 0;

  const mockUserService = {
    filters: {
      nameFilter,
      cityFilter,
      companyFilter,
      hasActiveFilters: computed(() => !!(nameFilter() || cityFilter() || companyFilter())),
      setName: (value: string) => nameFilter.set(value),
      setCity: (value: string) => cityFilter.set(value),
      setCompany: (value: string) => companyFilter.set(value),
      clear: () => {
        nameFilter.set('');
        cityFilter.set('');
        companyFilter.set('');
      }
    },
    filteredUsers: users,
    loading: signal(false),
    error: signal<string | null>(null),
    resultCount: computed(() => users().length),
    cities: signal<string[]>([]),
    companies: signal<string[]>([]),
    loadAllUsers: () => {
      loadAllUsersCalls += 1;
    }
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UserList],
      providers: [provideRouter([]), { provide: UserService, useValue: mockUserService }]
    }).compileComponents();

    fixture = TestBed.createComponent(UserList);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should load users on init', () => {
    expect(loadAllUsersCalls).toBeGreaterThan(0);
  });
});
