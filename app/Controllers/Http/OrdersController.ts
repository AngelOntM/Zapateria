import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Order from 'App/Models/Order'

export default class OrdersController {
    public async index({ auth, response }: HttpContextContract) {
        if (auth.user?.accessid != 3) {
            const dato = await Order.ver()
            return response.json({ dato })
        } else {
            return response
                .status(400)
                .send({ error: { message: 'User has no permissions' } })
        }
    }

    public async store({ auth, request, response }: HttpContextContract) {
        if (auth.user?.accessid != 3) {
            const validatedData = await Order.validar(request)
            const dato = await Order.crear(validatedData)
            return response.json({ dato });
        } else {
            return response
                .status(400)
                .send({ error: { message: 'User has no permissions' } })
        }
    }

    public async show({ auth, response, params }: HttpContextContract) {
        if (auth.user?.accessid != 3) {
            const dato = await Order.verUno(params.id)
            return response.json({ dato })
        } else {
            return response
                .status(400)
                .send({ error: { message: 'User has no permissions' } })
        }
    }

    public async update({ auth, request, response, params }: HttpContextContract) {
        if (auth.user?.accessid != 3) {
            const validatedData = await Order.validar(request)
            const registro = await Order.verUno(params.id)
            const dato = await Order.modificar(validatedData, registro)
            return response.json({ dato })
        } else {
            return response
                .status(400)
                .send({ error: { message: 'User has no permissions' } })
        }
    }

    public async destroy({ auth, response, params }: HttpContextContract) {
        if (auth.user?.accessid != 3) {
            const dato = await Order.verUno(params.id)
            await Order.eliminar(dato)
            return response
                .status(200)
                .send({ message: 'Registro Eliminado' })
        } else {
            return response
                .status(400)
                .send({ error: { message: 'User has no permissions' } })
        }
    }

    public async indexOrders({ response }: HttpContextContract) {
        const dato = await Order.verOrders()
        return response.json({ dato })
    }

    public async showOrders({ response, params }: HttpContextContract) {
        const dato = await Order.verOrdersUno(params.id)
        return response.json({ dato })
    }

}
