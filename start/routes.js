'use strict'

/*
|--------------------------------------------------------------------------
| Routes
|--------------------------------------------------------------------------
|
| Http routes are entry points to your web application. You can create
| routes for different URLs and bind Controller actions to them.
|
| A complete guide on routing is available here.
| http://adonisjs.com/docs/4.1/routing
|
*/

/** @type {typeof import('@adonisjs/framework/src/Route/Manager')} */
const Route = use('Route')

Route.group(() => {

	// User routes
	Route.get('user', 'User/UserController.index')
	Route.post('user/create', 'User/UserCreateController.index').validator('User/UserCreate')
	Route.post('user/update', 'User/UserUpdateController.index').validator('User/UserUpdate')
	// Route.get('user', 'User/UserController.index')
	Route.delete('user/delete', 'User/UserDeleteController.index').validator('User/UserDelete')


}).prefix('api/v1')
