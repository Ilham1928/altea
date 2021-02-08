'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class User extends Model {
	static boot () {
    super.boot()

    this.addTrait('@provider:Lucid/SoftDeletes')
  }

	static get primaryKey () {
    return 'user_id'
  }

	static get table () {
		return 'users'
	}

	static get createdAtColumn () {
    return 'created_at'
  }

	static get updatedAtColumn () {
    return 'updated_at'
  }

}

module.exports = User
