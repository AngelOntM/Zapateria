import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Orderdetail from 'App/Models/Orderdetail'

export default class OrderdetailsController {
    public async index({ response }: HttpContextContract) {
        const dato = await Orderdetail.ver()
        return response.json({ dato })
    }

    public async store({ request, response }: HttpContextContract) {
        const validatedData = await Orderdetail.validar(request)
        const dato = await Orderdetail.crear(validatedData)
        return response.json({ dato });
    }

    public async show({ response, params }: HttpContextContract) {
        const dato = await Orderdetail.verUno(params.id)
        return response.json({ dato })
    }

    public async update({ request, response, params }: HttpContextContract) {
        const validatedData = await Orderdetail.validar(request)
        const registro = await Orderdetail.verUno(params.id)
        const dato = await Orderdetail.modificar(validatedData, registro)
        return response.json({ dato })
    }

    public async destroy({ response, params }: HttpContextContract) {
        const dato = await Orderdetail.verUno(params.id)
        await Orderdetail.eliminar(dato)
        return response
            .status(200)
            .send({ message: 'Registro Eliminado' })
    }
}
