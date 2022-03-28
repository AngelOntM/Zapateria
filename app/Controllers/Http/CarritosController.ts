import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Carrito from 'App/Models/Carrito';
import Product from 'App/Models/Product';
const mongoose = require('mongoose');
const { Schema } = mongoose;
mongoose.connect('mongodb+srv://admin:admin@proyectoventas.kvfl7.mongodb.net/zapateria?retryWrites=true&w=majority');
const carros = new Schema({
  userid: Number,
  productid: Number,
  product: String,
  quantity: Number,
  unitprice: Number
});
const carrito = mongoose.model('carritos', carros)

export default class CarritosController {
  public async index({ response }: HttpContextContract) {
    const find = await carrito.find()
    return response.json({ find })
  }

  public async show({ response, params }: HttpContextContract) {
    const find = await carrito.find({ 'userid': params.id })
    return response.json({ find })
  }

  public async store({ auth, request, response }: HttpContextContract) {
    const validatedData = await Carrito.validar(request)
    const buscar = await Product.verUno(validatedData.productid)
    var dato = await new carrito({
      userid: auth.user?.id,
      productid: validatedData.productid,
      product: buscar.product,
      quantity: validatedData.quantity,
      unitprice: validatedData.unitprice
    });
    console.log(dato.productid)
    const registro = await Product.verUno(dato.productid)
    const dato1 = await Carrito.crearStock(dato.quantity, registro)
    if (dato1.stock >= 0) {
      await Product.modificar(dato1, registro)
      await dato.save()
      return response.json({ dato })
    } else {
      return response
        .status(400)
        .send({ error: { message: 'Insufficient Stock' } })
    }
  }

  public async update({ response, params }: HttpContextContract) {
    await carrito.deleteMany({ 'id': params.id })
    return response.json({ carrito })
  }

  public async destroy({ response, params }: HttpContextContract) {
    const dato = await carrito.findOne({ '_id': params.id })
    const registro = await Product.verUno(dato.productid)
    await carrito.deleteOne({ '_id': params.id })
    const dato1 = await Carrito.regresarStock(dato.quantity, registro)
    await Product.modificar(dato1, registro)
    await dato.save()
    return response
      .status(200)
      .send({ message: 'Registro Eliminado' })

  }
}
