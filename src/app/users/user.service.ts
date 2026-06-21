import { computed, effect, inject, Injectable, signal } from '@angular/core';
import { User } from '../user';
import { UserApi } from './user.api';
import { UserFilterStore } from './user-filter.store';

@Injectable({ providedIn: 'root' })
export class UserService {
    private api = inject(UserApi);
    readonly filters = inject(UserFilterStore);

    private _allUsers = signal<User[]>([]);
    private _users = signal<User[]>([]);
    private _selectedUser = signal<User | null>(null);
    private _loading = signal(false);
    private _error = signal<string | null>(null);
    private _detailLoading = signal(false);
    private _detailError = signal<string | null>(null);

    readonly loading = this._loading.asReadonly();
    readonly error = this._error.asReadonly();
    readonly selectedUser = this._selectedUser.asReadonly();
    readonly detailLoading = this._detailLoading.asReadonly();
    readonly detailError = this._detailError.asReadonly();

    readonly cities = computed(() =>
        [...new Set(this._allUsers().map(u => u.address.city))].sort()
    );
    readonly companies = computed(() =>
        [...new Set(this._allUsers().map(u => u.company.name))].sort()
    );

    readonly filteredUsers = computed(() => {
        const name = this.filters.nameFilter().toLowerCase();
        if (!name) return this._users();
        return this._users().filter(u => u.name.toLowerCase().includes(name));
    });

    readonly resultCount = computed(() => this.filteredUsers().length);

    constructor() {
        effect(() => {
            this.fetchFiltered(this.filters.cityFilter(), this.filters.companyFilter());
        });
    }

    loadAllUsers() {
        this.api.getAll().subscribe({
            next: users => this._allUsers.set(users),
            error: () => this._error.set('Failed to load users')
        });
    }

    loadUserById(id: number) {
        this._detailLoading.set(true);
        this._detailError.set(null);

        this.api.getById(id).subscribe({
            next: user => {
                this._selectedUser.set(user);
                this._detailLoading.set(false);
            },
            error: () => {
                this._detailError.set('Failed to load user detail');
                this._detailLoading.set(false);
            }
        });
    }

    private fetchFiltered(city: string, company: string) {
        this._loading.set(true);
        this._error.set(null);

        this.api.getFiltered(city, company).subscribe({
            next: users => { this._users.set(users); this._loading.set(false); },
            error: () => { this._error.set('Failed to fetch users'); this._loading.set(false); }
        });
    }
}