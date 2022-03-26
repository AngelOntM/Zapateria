import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Brand from 'App/Models/Brand'

export default class BrandsController {
  public async index({ response }: HttpContextContract) {
    const dato = await Brand.ver()
    return response.json({ dato })
  }

  public async store({ request, response }: HttpContextContract) {
    const validatedData = await Brand.validar(request)
    const dato = await Brand.crear(validatedData)
    return response.json({ dato });
  }

  public async show({ response, params }: HttpContextContract) {
    const dato = await Brand.verUno(params.id)
    return response.json({ dato })
  }

  public async update({ request, response, params }: HttpContextContract) {
    const validatedData = await Brand.validar(request)
    const registro = await Brand.verUno(params.id)
    const dato = await Brand.modificar(validatedData, registro)
    return response.json({ dato })
  }

  public async destroy({ response, params }: HttpContextContract) {
    const dato = await Brand.verUno(params.id)
    await Brand.eliminar(dato)
    return response
      .status(200)
      .send({ message: 'Registro Eliminado' })
  }
}
