'use strict'
const User = use('App/Models/User')
const {validate} = use('Validator')

class RegisterController {
    index({view}){
        return view.render('auth.register')
    }

    async store({request, session, response}){
        const rules = {
            name: 'required|unique:users,name',
            email: 'required|unique:users,email',
            password: 'required',
        }

        const messages = {
            'name.required': 'Nama tidak boleh kosong',
            'name.unique': 'Nama sudah digunakan',
            'email.required': 'Email tidak boleh kosong',
            'email.unique': 'Email sudah digunakan',
            'password.required': 'Password tidak boleh kosong',
        }

        const validation = await validate(request.all(), rules, messages)

        if(validation.fails()){
            session.withErrors(validation.messages()).flashExcept(['password'])
            return response.redirect('back')
        }

        const user = await User.create({
            name: request.input('name'),
            email: request.input('email'),
            password: request.input('password')
        })

        session.flash({notification: 'Register berhasil'})
        return response.redirect('back')
    }


}

module.exports = RegisterController
