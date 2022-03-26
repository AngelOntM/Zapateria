import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Product from 'App/Models/Product'

export default class ProductsController {
    public async index({ response }: HttpContextContract) {
        const dato = await Product.ver()
        return response.json({ dato })
    }

    public async store({ request, response }: HttpContextContract) {
        const validatedData = await Product.validar(request)
        const dato = await Product.crear(validatedData)
        return response.json({ dato });
    }

    public async show({ response, params }: HttpContextContract) {
        const dato = await Product.verUno(params.id)
        return response.json({ dato })
    }

    public async update({ request, response, params }: HttpContextContract) {
        const validatedData = await Product.validar(request)
        const registro = await Product.verUno(params.id)
        const dato = await Product.modificar(validatedData, registro)
        return response.json({ dato })
    }

    public async destroy({ response, params }: HttpContextContract) {
        const dato = await Product.verUno(params.id)
        await Product.eliminar(dato)
        return response
            .status(200)
            .send({ message: 'Registro Eliminado' })
    }
}
