import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Brand from 'App/Models/Brand'

export default class BrandsController {
  public async index({ auth, response }: HttpContextContract) {
    if (auth.user?.accessid != 3) {
      const dato = await Brand.ver()
      return response.json({ dato })
    } else {
      return response
        .status(400)
        .send({ error: { message: 'User has no permissions' } })
    }
  }

  public async store({ auth, request, response }: HttpContextContract) {
    if (auth.user?.accessid != 3) {
      const validatedData = await Brand.validar(request)
      const dato = await Brand.crear(validatedData)
      return response.json({ dato });
    } else {
      return response
        .status(400)
        .send({ error: { message: 'User has no permissions' } })
    }
  }

  public async show({ auth, response, params }: HttpContextContract) {
    if (auth.user?.accessid != 3) {
      const dato = await Brand.verUno(params.id)
      return response.json({ dato })
    } else {
      return response
        .status(400)
        .send({ error: { message: 'User has no permissions' } })
    }
  }

  public async update({ auth, request, response, params }: HttpContextContract) {
    if (auth.user?.accessid != 3) {
      const validatedData = await Brand.validar(request)
      const registro = await Brand.verUno(params.id)
      const dato = await Brand.modificar(validatedData, registro)
      return response.json({ dato })
    } else {
      return response
        .status(400)
        .send({ error: { message: 'User has no permissions' } })
    }
  }

  public async destroy({ auth, response, params }: HttpContextContract) {
    if (auth.user?.accessid != 3) {
      const dato = await Brand.verUno(params.id)
      await Brand.eliminar(dato)
      return response
        .status(200)
        .send({ message: 'Registro Eliminado' })
    } else {
      return response
        .status(400)
        .send({ error: { message: 'User has no permissions' } })
    }
  }

}
