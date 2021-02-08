'use strict'

const User = use('App/Models/User');
const Database = use('Database')
const Helpers = use('Helpers')

class UserController {

    async index({request, response})
		{
			try {
				let data = await this.process(request)

				if (data.rows.length > 0) {
					return response.status(200).json({
						'code': 200,
						'message': 'Ok',
						'data': data
					})
				}else{
					return response.status(200).json({
						'code': 204,
						'message': 'No Content',
						'data': []
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
          'user_id',
					'username',
					'email',
					'about',
					Database.raw(
						'if(photo is null or photo = "", null,'
						+' CONCAT("'+ Helpers.tmpPath('uploads/user') +'/", photo))'
						+' as photo'
					)
				)
				.paginate(request.input('page') ?? 1, 10)
		}

}

module.exports = UserController
