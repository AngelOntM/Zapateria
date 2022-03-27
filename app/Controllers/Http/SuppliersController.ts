import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Supplier from 'App/Models/Supplier'

export default class SuppliersController {
    public async index({ auth, response }: HttpContextContract) {
        if (auth.user?.accessid != 3) {
            const dato = await Supplier.ver()
            return response.json({ dato })
        } else {
            return response
                .status(400)
                .send({ error: { message: 'User has no permissions' } })
        }
    }

    public async store({ auth, request, response }: HttpContextContract) {
        if (auth.user?.accessid != 3) {
            const validatedData = await Supplier.validar(request)
            const dato = await Supplier.crear(validatedData)
            return response.json({ dato });
        } else {
            return response
                .status(400)
                .send({ error: { message: 'User has no permissions' } })
        }
    }

    public async show({ auth, response, params }: HttpContextContract) {
        if (auth.user?.accessid != 3) {
            const dato = await Supplier.verUno(params.id)
            return response.json({ dato })
        } else {
            return response
                .status(400)
                .send({ error: { message: 'User has no permissions' } })
        }
    }

    public async update({ auth, request, response, params }: HttpContextContract) {
        if (auth.user?.accessid != 3) {
            const validatedData = await Supplier.validar(request)
            const registro = await Supplier.verUno(params.id)
            const dato = await Supplier.modificar(validatedData, registro)
            return response.json({ dato })
        } else {
            return response
                .status(400)
                .send({ error: { message: 'User has no permissions' } })
        }
    }

    public async destroy({ auth, response, params }: HttpContextContract) {
        if (auth.user?.accessid != 3) {
            const dato = await Supplier.verUno(params.id)
            await Supplier.eliminar(dato)
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
