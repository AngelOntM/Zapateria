import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Carrito from 'App/Models/Carrito';

export default class CarritosController {
  public async index({ auth }: HttpContextContract) {

  }

  public async create({ auth, request, response }: HttpContextContract) {
    const mongoose = require('mongoose');
    await mongoose.connect('mongodb+srv://admin:admin@sandbox.a6qqr.mongodb.net/zapateria?retryWrites=true&w=majority');
    const validar = await Carrito.validar(request)
    return mongoose
  }

  public async store({ }: HttpContextContract) { }

  public async show({ }: HttpContextContract) { }

  public async edit({ }: HttpContextContract) { }

  public async update({ }: HttpContextContract) { }

  public async destroy({ }: HttpContextContract) { }
}
