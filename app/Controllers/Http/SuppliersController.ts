import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Supplier from 'App/Models/Supplier'

export default class SuppliersController {
    public async index({ response }: HttpContextContract) {
        const dato = await Supplier.ver()
        return response.json({ dato })
    }

    public async store({ request, response }: HttpContextContract) {
        const validatedData = await Supplier.validar(request)
        const dato = await Supplier.crear(validatedData)
        return response.json({ dato });
    }

    public async show({ response, params }: HttpContextContract) {
        const dato = await Supplier.verUno(params.id)
        return response.json({ dato })
    }

    public async update({ request, response, params }: HttpContextContract) {
        const validatedData = await Supplier.validar(request)
        const registro = await Supplier.verUno(params.id)
        const dato = await Supplier.modificar(validatedData, registro)
        return response.json({ dato })
    }

    public async destroy({ response, params }: HttpContextContract) {
        const dato = await Supplier.verUno(params.id)
        await Supplier.eliminar(dato)
        return response
            .status(200)
            .send({ message: 'Registro Eliminado' })
    }
}
