import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import { schema } from '@ioc:Adonis/Core/Validator'
import Shipper from 'App/Models/Shipper'

export default class ShippersController {
    public async index({ response }: HttpContextContract) {
        const shippers = await Shipper.query();
        return response.json({ shippers })
    }

    public async store({ request, response }: HttpContextContract) {
        const postSchema = schema.create({
            name: schema.string(),
            phone: schema.number()
        })
        const validatedData = await request.validate({ schema: postSchema })
        const shippers = await Shipper.create({ name: validatedData.name, phone: validatedData.phone });
        return response.json({ shippers });
    }

    public async show({ response, params }: HttpContextContract) {
        const shippers = await Shipper.findByOrFail('shipperid', params.id);
        return response.json({ shippers })
    }

    public async update({ request, response, params }: HttpContextContract) {
        const postSchema = schema.create({
            name: schema.string(),
            phone: schema.number()
        })
        const validatedData = await request.validate({ schema: postSchema })
        const shippers = await Shipper.findByOrFail('shipperid', params.id)
        shippers.merge(validatedData)
        await shippers.save()
        return response.json({ shippers })
    }

    public async destroy({ response, params }: HttpContextContract) {
        const shippers = await Shipper.findByOrFail('shipperid', params.id)
        await shippers.delete()
        return response.json({ shippers })
    }
}
