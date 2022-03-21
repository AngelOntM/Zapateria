import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import { schema } from '@ioc:Adonis/Core/Validator'
import Size from 'App/Models/Size'

export default class SizesController {
    public async index({ response }: HttpContextContract) {
        const sizes = await Size.query();
        return response.json({ sizes })
    }

    public async store({ request, response }: HttpContextContract) {
        const postSchema = schema.create({
            size: schema.number()
        })
        const validatedData = await request.validate({ schema: postSchema })
        const sizes = await Size.create({ size: validatedData.size });
        return response.json({ sizes });
    }

    public async show({ response, params }: HttpContextContract) {
        const sizes = await Size.findByOrFail('sizeid', params.id);
        return response.json({ sizes })
    }

    public async update({ request, response, params }: HttpContextContract) {
        const postSchema = schema.create({
            size: schema.number()
        })
        const validatedData = await request.validate({ schema: postSchema })
        const sizes = await Size.findByOrFail('sizeid', params.id)
        sizes.merge(validatedData)
        await sizes.save()
        return response.json({ sizes })
    }

    public async destroy({ response, params }: HttpContextContract) {
        const sizes = await Size.findByOrFail('sizeid', params.id)
        await sizes.delete()
        return response.json({ sizes })
    }
}
