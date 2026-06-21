import { Routes } from '@angular/router';

export const routes: Routes = [
	{
		path: '',
		pathMatch: 'full',
		redirectTo: 'users'
	},
	{
		path: 'users',
		loadComponent: () => import('./users/user-list/user-list').then((m) => m.UserList)
	},
	{
		path: 'users/:id',
		loadComponent: () => import('./users/user-detail/user-detail').then((m) => m.UserDetail)
	},
	{
		path: '**',
		loadComponent: () => import('./not-found/not-found').then((m) => m.NotFound)
	}
];
