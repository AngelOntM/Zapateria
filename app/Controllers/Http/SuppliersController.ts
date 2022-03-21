import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import { schema } from '@ioc:Adonis/Core/Validator'
import Supplier from 'App/Models/Supplier'

export default class SuppliersController {
    public async index({ response }: HttpContextContract) {
        const suppliers = await Supplier.query();
        return response.json({ suppliers })
    }

    public async store({ request, response }: HttpContextContract) {
        const postSchema = schema.create({
            name: schema.string(),
            email: schema.string(),
            phone: schema.number()
        })
        const validatedData = await request.validate({ schema: postSchema })
        const suppliers = await Supplier.create({ name: validatedData.name, email: validatedData.email, phone: validatedData.phone });
        return response.json({ suppliers });

    }

    public async show({ response, params }: HttpContextContract) {
        const suppliers = await Supplier.findByOrFail('supplierid', params.id);
        return response.json({ suppliers })
    }

    public async update({ request, response, params }: HttpContextContract) {
        const postSchema = schema.create({
            name: schema.string(),
            email: schema.string(),
            phone: schema.number()
        })
        const validatedData = await request.validate({ schema: postSchema })
        const suppliers = await Supplier.findByOrFail('supplierid', params.id)
        suppliers.merge(validatedData)
        await suppliers.save()
        return response.json({ suppliers })
    }

    public async destroy({ response, params }: HttpContextContract) {
        const suppliers = await Supplier.findByOrFail('supplierid', params.id)
        await suppliers.delete()
        return response.json({ suppliers })
    }
}
