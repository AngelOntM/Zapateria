import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Size from 'App/Models/Size'

export default class SizesController {
    public async index({ response }: HttpContextContract) {
        const dato = await Size.ver()
        return response.json({ dato })
    }

    public async store({ request, response }: HttpContextContract) {
        const validatedData = await Size.validar(request)
        const dato = await Size.crear(validatedData)
        return response.json({ dato });
    }

    public async show({ response, params }: HttpContextContract) {
        const dato = await Size.verUno(params.id)
        return response.json({ dato })
    }

    public async update({ request, response, params }: HttpContextContract) {
        const validatedData = await Size.validar(request)
        const registro = await Size.verUno(params.id)
        const dato = await Size.modificar(validatedData, registro)
        return response.json({ dato })
    }

    public async destroy({ response, params }: HttpContextContract) {
        const dato = await Size.verUno(params.id)
        await Size.eliminar(dato)
        return response
            .status(200)
            .send({ message: 'Registro Eliminado' })
    }
}
