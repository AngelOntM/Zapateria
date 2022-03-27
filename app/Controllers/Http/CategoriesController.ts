import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Category from 'App/Models/Category'

export default class CategoriesController {
    public async index({ auth, response }: HttpContextContract) {
        if (auth.user?.accessid != 3) {
            const dato = await Category.ver()
            return response.json({ dato })
        } else {
            return response
                .status(400)
                .send({ error: { message: 'User has no permissions' } })
        }
    }

    public async store({ auth, request, response }: HttpContextContract) {
        if (auth.user?.accessid != 3) {
            const validatedData = await Category.validar(request)
            const dato = await Category.crear(validatedData)
            return response.json({ dato });
        } else {
            return response
                .status(400)
                .send({ error: { message: 'User has no permissions' } })
        }
    }

    public async show({ auth, response, params }: HttpContextContract) {
        if (auth.user?.accessid != 3) {
            const dato = await Category.verUno(params.id)
            return response.json({ dato })
        } else {
            return response
                .status(400)
                .send({ error: { message: 'User has no permissions' } })
        }
    }

    public async update({ auth, request, response, params }: HttpContextContract) {
        if (auth.user?.accessid != 3) {
            const validatedData = await Category.validar(request)
            const registro = await Category.verUno(params.id)
            const dato = await Category.modificar(validatedData, registro)
            return response.json({ dato })
        } else {
            return response
                .status(400)
                .send({ error: { message: 'User has no permissions' } })
        }
    }

    public async destroy({ auth, response, params }: HttpContextContract) {
        if (auth.user?.accessid != 3) {
            const dato = await Category.verUno(params.id)
            await Category.eliminar(dato)
            return response
                .status(200)
                .send({ message: 'Registro Eliminado' })
        } else {
            return response
                .status(400)
                .send({ error: { message: 'User has no permissions' } })
        }
    }

}
