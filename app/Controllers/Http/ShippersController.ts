import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Shipper from 'App/Models/Shipper'

export default class ShippersController {
    public async index({ auth, response }: HttpContextContract) {
        if (auth.user?.accessid != 3) {
            const dato = await Shipper.ver()
            return response.json({ dato })
        } else {
            return response
                .status(400)
                .send({ error: { message: 'User has no permissions' } })
        }
    }

    public async store({ auth, request, response }: HttpContextContract) {
        if (auth.user?.accessid != 3) {
            const validatedData = await Shipper.validar(request)
            const dato = await Shipper.crear(validatedData)
            return response.json({ dato });
        } else {
            return response
                .status(400)
                .send({ error: { message: 'User has no permissions' } })
        }
    }

    public async show({ auth, response, params }: HttpContextContract) {
        if (auth.user?.accessid != 3) {
            const dato = await Shipper.verUno(params.id)
            return response.json({ dato })
        } else {
            return response
                .status(400)
                .send({ error: { message: 'User has no permissions' } })
        }
    }

    public async update({ auth, request, response, params }: HttpContextContract) {
        if (auth.user?.accessid != 3) {
            const validatedData = await Shipper.validar(request)
            const registro = await Shipper.verUno(params.id)
            const dato = await Shipper.modificar(validatedData, registro)
            return response.json({ dato })
        } else {
            return response
                .status(400)
                .send({ error: { message: 'User has no permissions' } })
        }
    }

    public async destroy({ auth, response, params }: HttpContextContract) {
        if (auth.user?.accessid != 3) {
            const dato = await Shipper.verUno(params.id)
            await Shipper.eliminar(dato)
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
