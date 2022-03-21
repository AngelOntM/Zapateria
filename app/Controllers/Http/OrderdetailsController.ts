import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import { schema } from '@ioc:Adonis/Core/Validator'
import Orderdetail from 'App/Models/Orderdetail'

export default class OrderdetailsController {
    public async index({ response }: HttpContextContract) {
        const orderdetails = await Orderdetail.query();
        return response.json({ orderdetails })
    }

    public async store({ request, response }: HttpContextContract) {
        const postSchema = schema.create({
            orderid: schema.number(),
            productid: schema.number(),
            quantity: schema.number(),
            unitprice: schema.number()
        })
        const validatedData = await request.validate({ schema: postSchema })
        const orderdetails = await Orderdetail.create({ orderid: validatedData.orderid, productid: validatedData.productid, quantity: validatedData.quantity, unitprice: validatedData.unitprice });
        return response.json({ orderdetails });

    }

    public async show({ response, params }: HttpContextContract) {
        const orderdetails = await Orderdetail.findByOrFail('orderdetailid', params.id);
        return response.json({ orderdetails })
    }

    public async update({ request, response, params }: HttpContextContract) {
        const postSchema = schema.create({
            orderid: schema.number(),
            productid: schema.number(),
            quantity: schema.number(),
            unitprice: schema.number()
        })
        const validatedData = await request.validate({ schema: postSchema })
        const orderdetails = await Orderdetail.findByOrFail('orderdetailid', params.id)
        orderdetails.merge(validatedData)
        await orderdetails.save()
        return response.json({ orderdetails })
    }

    public async destroy({ response, params }: HttpContextContract) {
        const orderdetails = await Orderdetail.findByOrFail('orderdetailid', params.id)
        await orderdetails.delete()
        return response.json({ orderdetails })
    }
}
