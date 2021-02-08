'use strict'

const User = use('App/Models/User')
const Database = use('Database')

class UserDeleteController {

  async index({request, response})
	{
		const trx = await Database.beginTransaction()

		try {
			const process = await this.process(request, trx)

			if (process) {
				return response.status(200).json({
					'code': 200,
					'message': 'Ok',
					'data': {}
				})
			}else{
				return response.status(200).json({
					'code': 422,
					'message': 'Unprocessable Entity',
					'data': '__id not found'
				})
			}
		} catch (e) {
			trx.rollback()

			return response.status(200).json({
				'code': 500,
				'message': 'Something Wrong',
				'data': e.message
			})
		}
	}

	async process(request, trx)
	{
		const user = await User.query()
			.where('user_id', request.input('__id'))
			.where('deleted_at', null)
			.first()

		if (!user) {
			return false
		}

		user.delete()
		await trx.commit()

		return true
	}

}

module.exports = UserDeleteController
