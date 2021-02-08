'use strict'

const User = use('App/Models/User')
const Database = use('Database')
const Helpers = use('Helpers')
const Hash = use('Hash')

class UserUpdateController {

	async index({request, response})
	{
		const trx = await Database.beginTransaction()

		try {
			let process = await this.process(request, trx)

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
			await trx.rollback()

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
			.first()

		if (!user) {
			return false
		}

		await User.query()
			.where('user_id', request.input('__id'))
			.update({
				username: request.input('username'),
				email: request.input('email'),
				about: request.input('about'),
				password: request.input('password')
					? await Hash.make(request.input('password'))
					: user.password,
				photo: request.file('photo')
					? await this.uploadHandler(request)
					: user.photo
			}, trx)

		await trx.commit()
		return await this.newData(user)
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

	async newData(user)
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
			.where('user_id', user.user_id)
			.first()
	}

}

module.exports = UserUpdateController
