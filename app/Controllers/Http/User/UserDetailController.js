'use strict'

const User = use('App/Models/User')
const Database = use('Database')
const Helpers = use('Helpers')

class UserDetailController {

	async index({request, response})
	{
		try {
      const process = await this.process(request)

			if (process) {
				return response.status(200).json({
					'code': 200,
					'message': 'Ok',
					'data': process
				})
			}else{
				return response.status(200).json({
					'code': 422,
					'message': 'Unprocessable Entity',
					'data': '__id not found'
				})
			}

		} catch (e) {
			return response.status(200).json({
				'code': 500,
				'message': 'Something Wrong',
				'data': e.message
			})
		}
	}

	async process(request)
	{
    return await User
			.query()
			.select(
				'user_id as __id',
				'username',
				'email',
				'about',
				Database.raw(
					'if(photo is null or photo = "", null,'
					+' CONCAT("'+ Helpers.tmpPath('uploads/user') +'/", photo))'
					+' as photo'
				)
			)
			.where('user_id', request.input('__id'))
			.first()
	}
}

module.exports = UserDetailController
