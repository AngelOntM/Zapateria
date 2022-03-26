import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Shipper from 'App/Models/Shipper'

export default class ShippersController {
    public async index({ response }: HttpContextContract) {
        const dato = await Shipper.ver()
        return response.json({ dato })
    }

    public async store({ request, response }: HttpContextContract) {
        const validatedData = await Shipper.validar(request)
        const dato = await Shipper.crear(validatedData)
        return response.json({ dato });
    }

    public async show({ response, params }: HttpContextContract) {
        const dato = await Shipper.verUno(params.id)
        return response.json({ dato })
    }

    public async update({ request, response, params }: HttpContextContract) {
        const validatedData = await Shipper.validar(request)
        const registro = await Shipper.verUno(params.id)
        const dato = await Shipper.modificar(validatedData, registro)
        return response.json({ dato })
    }

    public async destroy({ response, params }: HttpContextContract) {
        const dato = await Shipper.verUno(params.id)
        await Shipper.eliminar(dato)
        return response
            .status(200)
            .send({ message: 'Registro Eliminado' })
    }
}
