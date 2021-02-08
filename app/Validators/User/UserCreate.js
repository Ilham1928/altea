'use strict'

class UserCreate {

  get rules () {
    return {
      username: 'required',
			email: 'required|unique:users,email|email',
			password: 'required|min:6|max:12',
			about: 'max:500',
			photo: 'file|file_size:2mb|file_ext:png,jpg,jpeg,gif'
    }
  }

  get messages () {
		return {
      'username.required': 'Username cannot be blank',
      'email.required': 'Email cannot be blank',
			'email.unique': 'This email was exists in database',
			'email.email': 'Email address not valid',
			'password.required': 'Password cannot be blank',
			'password.min': 'Password minimum 6 character length',
			'password.max': 'Password maximum 12 character length',
			'about.max': 'About maximum 500 character length',
			'photo.file': 'Photo must be a file type',
			'photo.file_size': 'Photo maximum size is 2 MB',
			'photo.file_ext': 'Please upload photo with type PNG / JPG / JPEG / GIF'
    }
  }

	async fails (errorMessage) {
    return this.ctx.response.status(200).json({
			code: 422,
			message: errorMessage[0].message,
			data: {}
		})
  }

}

module.exports = UserCreate
