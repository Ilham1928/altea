'use strict'

const User = use('App/Models/User');

class UserController {

    async index({request, response})
		{
			let user = await this.data(request)
			return response.json({
				code: 200,
				message: 'Ok',
				data: user
			})
    }

		async data(request)
		{
			return await User
				.query()
				.paginate(10)
		}
}

module.exports = UserController
