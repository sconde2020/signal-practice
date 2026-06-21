import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { UserService } from '../user.service';

@Component({
  selector: 'app-user-list',
  imports: [RouterLink],
  templateUrl: './user-list.html',
  styleUrl: './user-list.css',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class UserList {
  private userService = inject(UserService);
  private filters = this.userService.filters;

  users = this.userService.filteredUsers;
  loading = this.userService.loading;
  error = this.userService.error;
  resultCount = this.userService.resultCount;
  hasActiveFilters = this.filters.hasActiveFilters;
  nameFilter = this.filters.nameFilter;
  cityFilter = this.filters.cityFilter;
  companyFilter = this.filters.companyFilter;
  cities = this.userService.cities;
  companies = this.userService.companies;

  constructor() {
    this.userService.loadAllUsers();
  }

  onNameFilter(term: string) {
    this.filters.setName(term);
  }

  onCityFilter(city: string) {
    this.filters.setCity(city);
  }

  onCompanyFilter(company: string) {
    this.filters.setCompany(company);
  }

  clearFilters() {
    this.filters.clear();
  }

  retry() {
    this.userService.loadAllUsers();
  }
}
