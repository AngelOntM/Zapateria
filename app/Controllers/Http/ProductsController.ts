import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import { schema } from '@ioc:Adonis/Core/Validator'
import Product from 'App/Models/Product'

export default class ProductsController {
    public async index({ response }: HttpContextContract) {
        const products = await Product.query();
        return response.json({ products })
    }

    public async store({ request, response }: HttpContextContract) {
        const postSchema = schema.create({
            name: schema.string(),
            color: schema.string(),
            stock: schema.number(),
            price: schema.number(),
            sizeid: schema.number(),
            brandid: schema.number(),
            categoryid: schema.number()
        })
        const validatedData = await request.validate({ schema: postSchema })
        const products = await Product.create({ name: validatedData.name, color: validatedData.color, stock: validatedData.stock, price: validatedData.price, sizeid: validatedData.sizeid, brandid: validatedData.brandid, categoryid: validatedData.categoryid });
        return response.json({ products });

    }

    public async show({ response, params }: HttpContextContract) {
        const products = await Product.findByOrFail('productid', params.id);
        return response.json({ products })
    }

    public async update({ request, response, params }: HttpContextContract) {
        const postSchema = schema.create({
            name: schema.string(),
            color: schema.string(),
            stock: schema.number(),
            price: schema.number(),
            sizeid: schema.number(),
            brandid: schema.number(),
            categoryid: schema.number()
        })
        const validatedData = await request.validate({ schema: postSchema })
        const products = await Product.findByOrFail('productid', params.id)
        products.merge(validatedData)
        await products.save()
        return response.json({ products })
    }

    public async destroy({ response, params }: HttpContextContract) {
        const products = await Product.findByOrFail('productid', params.id)
        await products.delete()
        return response.json({ products })
    }
}
