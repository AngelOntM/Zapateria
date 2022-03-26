import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Category from 'App/Models/Category'

export default class CategoriesController {
    public async index({ response }: HttpContextContract) {
        const dato = await Category.ver()
        return response.json({ dato })
    }

    public async store({ request, response }: HttpContextContract) {
        const validatedData = await Category.validar(request)
        const dato = await Category.crear(validatedData)
        return response.json({ dato });
    }

    public async show({ response, params }: HttpContextContract) {
        const dato = await Category.verUno(params.id)
        return response.json({ dato })
    }

    public async update({ request, response, params }: HttpContextContract) {
        const validatedData = await Category.validar(request)
        const registro = await Category.verUno(params.id)
        const dato = await Category.modificar(validatedData, registro)
        return response.json({ dato })
    }

    public async destroy({ response, params }: HttpContextContract) {
        const dato = await Category.verUno(params.id)
        await Category.eliminar(dato)
        return response
            .status(200)
            .send({ message: 'Registro Eliminado' })
    }
}
