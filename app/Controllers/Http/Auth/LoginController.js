'use strict'

class LoginController {
    index({view}){
        return view.render('auth.login')
    }

    async check({request, response, session, auth}){
        const {email, password} = request.all()

        await auth.attempt(email, password)
        return response.route('dashboard.index')
    }

    async logout({auth, response}){
        await auth.logout()
        return response.route('login.index')
    }
}

module.exports = LoginController
