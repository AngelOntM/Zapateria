import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import { schema } from '@ioc:Adonis/Core/Validator'
import Category from 'App/Models/Category'

export default class CategoriesController {
    public async index({ response }: HttpContextContract) {
        const categories = await Category.query();
        return response.json({ categories })
    }

    public async store({ request, response }: HttpContextContract) {
        const postSchema = schema.create({
            name: schema.string()
        })
        const validatedData = await request.validate({ schema: postSchema })
        const categories = await Category.create({ name: validatedData.name });
        return response.json({ categories });
    }

    public async show({ response, params }: HttpContextContract) {
        const categories = await Category.findByOrFail('categoryid', params.id);
        return response.json({ categories })
    }

    public async update({ request, response, params }: HttpContextContract) {
        const postSchema = schema.create({
            name: schema.string()
        })
        const validatedData = await request.validate({ schema: postSchema })
        const categories = await Category.findByOrFail('categoryid', params.id)
        categories.merge(validatedData)
        await categories.save()
        return response.json({ categories })
    }

    public async destroy({ response, params }: HttpContextContract) {
        const categories = await Category.findByOrFail('categoryid', params.id)
        await categories.delete()
        return response.json({ categories })
    }
}
