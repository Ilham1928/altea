'use strict'

const User = use('App/Models/User')
const Database = use('Database')
const Helpers = use('Helpers')
const Hash = use('Hash')

class UserCreateController {

    async index({request, response})
    {
			const trx = await Database.beginTransaction()

			try {
				let store = await this.data(request, trx)

				return response.status(200).json({
					code: 200,
					message: 'Ok',
					data: {}
				})
			} catch (e) {
				await trx.rollback()

				return response.status(500).json({
					code: 500,
					message: 'Something Wrong',
					data: e.message
				})
			}
    }

    async data(request, trx)
    {
			await User.create({
				username: request.input('username'),
				email: request.input('email'),
				password: await Hash.make(request.input('password')),
				about: request.input('about'),
				photo: await this.uploadHandler(request)
			}, trx)

			await trx.commit()
    }

		async uploadHandler(request)
		{
			const photo = request.file('photo')
			const filename = `${new Date().getTime()}.${photo.subtype}`

			await photo.move(Helpers.tmpPath('uploads/user'), {
				name: filename,
				overwrite: true
		 	})

			if (!photo.moved()) {
		    return false
		  }

			return filename
		}
}

module.exports = UserCreateController
