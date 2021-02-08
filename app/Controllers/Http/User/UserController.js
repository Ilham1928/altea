'use strict'

const User = use('App/Models/User');
const Database = use('Database')
const Helpers = use('Helpers')

class UserController {

    async index({request, response})
		{
			try {
				let user = await this.data(request)

				if (user) {
					return response.status(200).json({
						code: 200,
						message: 'Ok',
						data: user
					})
				}else{
					return response.status(204).json({
						code: 204,
						message: 'No Content',
						data: []
					})
				}
			} catch (e) {
				return response.status(500).json({
					code: 500,
					message: 'Something Wrong',
					data: e.message
				})
			}
    }

		async data(request)
		{
			let url = Env.get('APP_URL')
			return await User
				.query()
				.select(
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
