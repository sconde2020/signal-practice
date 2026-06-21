import { computed, Injectable, signal } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class UserFilterStore {
    private _nameFilter = signal('');
    private _cityFilter = signal('');
    private _companyFilter = signal('');

    readonly nameFilter = this._nameFilter.asReadonly();
    readonly cityFilter = this._cityFilter.asReadonly();
    readonly companyFilter = this._companyFilter.asReadonly();

    readonly hasActiveFilters = computed(() =>
        !!(this._nameFilter() || this._cityFilter() || this._companyFilter())
    );

    setName(term: string) { this._nameFilter.set(term); }
    setCity(city: string) { this._cityFilter.set(city); }
    setCompany(company: string) { this._companyFilter.set(company); }

    clear() {
        this._nameFilter.set('');
        this._cityFilter.set('');
        this._companyFilter.set('');
    }
}
