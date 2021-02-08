'use strict'

class UserDelete {

  get rules () {
    return {
      __id: 'required'
    }
  }

  get messages () {
		return {
      '__id.required': '__id cannot be blank'
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

module.exports = UserDelete
