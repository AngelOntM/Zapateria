import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import { schema } from '@ioc:Adonis/Core/Validator'
import Brand from 'App/Models/Brand'

export default class BrandsController {
  public async index({ response }: HttpContextContract) {
    const brands = await Brand.query();
    return response.json({ brands })
  }

  public async store({ request, response }: HttpContextContract) {
    const postSchema = schema.create({
      name: schema.string()
    })
    const validatedData = await request.validate({ schema: postSchema })
    const brands = await Brand.create({ name: validatedData.name });
    return response.json({ brands });

  }

  public async show({ response, params }: HttpContextContract) {
    const brands = await Brand.findByOrFail('brandid', params.id);
    return response.json({ brands })
  }

  public async update({ request, response, params }: HttpContextContract) {
    const postSchema = schema.create({
      name: schema.string()
    })
    const validatedData = await request.validate({ schema: postSchema })
    const brands = await Brand.findByOrFail('brandid', params.id)
    brands.merge(validatedData)
    await brands.save()
    console.log(response)
    return response.json({ brands })
  }

  public async destroy({ response, params }: HttpContextContract) {
    const brands = await Brand.findByOrFail('brandid', params.id)
    await brands.delete()
    return response.json({ brands })
  }
}
