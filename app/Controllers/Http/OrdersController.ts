import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import { schema } from '@ioc:Adonis/Core/Validator'
import Order from 'App/Models/Order'

export default class OrdersController {
    public async index({ response }: HttpContextContract) {
        const orders = await Order.query();
        return response.json({ orders })
    }

    public async store({ request, response }: HttpContextContract) {
        const postSchema = schema.create({
            supplierid: schema.number(),
            shipperid: schema.number(),
        })
        const validatedData = await request.validate({ schema: postSchema })
        const orders = await Order.create({ shipperid: validatedData.shipperid, supplierid: validatedData.supplierid });
        return response.json({ orders });

    }

    public async show({ response, params }: HttpContextContract) {
        const orders = await Order.findByOrFail('orderid', params.id);
        return response.json({ orders })
    }

    public async update({ request, response, params }: HttpContextContract) {
        const postSchema = schema.create({
            supplierid: schema.number(),
            shipperid: schema.number(),
        })
        const validatedData = await request.validate({ schema: postSchema })
        const orders = await Order.findByOrFail('orderid', params.id)
        orders.merge(validatedData)
        await orders.save()
        return response.json({ orders })
    }

    public async destroy({ response, params }: HttpContextContract) {
        const orders = await Order.findByOrFail('orderid', params.id)
        await orders.delete()
        return response.json({ orders })
    }
}
