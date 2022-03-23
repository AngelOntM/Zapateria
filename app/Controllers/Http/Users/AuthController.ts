import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import User from 'App/Models/Users'
import { rules, schema } from '@ioc:Adonis/Core/Validator'
import Hash from '@ioc:Adonis/Core/Hash'


export default class AuthController {
    public async register({ request, response }: HttpContextContract) {
        // validate email
        const data = await request.validate({ schema: User.validarEmpleado() })
        const user = await User.create(data)
        return response.created(user)
    }

    //   login function
    public async login({ request, response, auth }: HttpContextContract) {
        const password = await request.input('password')
        const email = await request.input('email')

        const user = await User
            .query()
            .where('email', email)
            .firstOrFail()

        if (!(await Hash.verify(user.password, password))) {
            return response.badRequest('Invalid credentials')
        } else if (user.isActivated == true) {
            const token = await (await auth.use('api').generate(user, {
                expiresIn: '30mins'
            }))
            return token
        }
        else {
            return response
                .status(400)
                .send({ error: { message: 'User is not active' } })
        }
    }

    //   logout function
    public async logout({ auth, response }: HttpContextContract) {
        await auth.logout()
        return response.status(200)
    }
}
