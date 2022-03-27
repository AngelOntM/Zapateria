import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Product from 'App/Models/Product'

export default class ProductsController {
    public async index({ response }: HttpContextContract) {
        const dato = await Product.ver()
        return response.json({ dato })
    }

    public async store({ auth, request, response }: HttpContextContract) {
        if (auth.user?.accessid != 3) {
            const validatedData = await Product.validar(request)
            const dato = await Product.crear(validatedData)
            return response.json({ dato });
        } else {
            return response
                .status(400)
                .send({ error: { message: 'User has no permissions' } })
        }
    }

    public async show({ response, params }: HttpContextContract) {
        const dato = await Product.verUno(params.id)
        return response.json({ dato })
    }

    public async update({ auth, request, response, params }: HttpContextContract) {
        if (auth.user?.accessid != 3) {
            const validatedData = await Product.validar(request)
            const registro = await Product.verUno(params.id)
            const dato = await Product.modificar(validatedData, registro)
            return response.json({ dato })
        } else {
            return response
                .status(400)
                .send({ error: { message: 'User has no permissions' } })
        }
    }

    public async destroy({ auth, response, params }: HttpContextContract) {
        if (auth.user?.accessid != 3) {
            const dato = await Product.verUno(params.id)
            await Product.eliminar(dato)
            return response
                .status(200)
                .send({ message: 'Registro Eliminado' })
        } else {
            return response
                .status(400)
                .send({ error: { message: 'User has no permissions' } })
        }
    }

    public async indexProductos({ response }: HttpContextContract) {
        const dato = await Product.verProductos()
        return response.json({ dato })
    }

    public async showProductos({ response, params }: HttpContextContract) {
        const dato = await Product.verProductosUno(params.id)
        return response.json({ dato })
    }
}