import { DateTime } from 'luxon'
import { BaseModel, column } from '@ioc:Adonis/Lucid/Orm'
import { schema } from '@ioc:Adonis/Core/Validator'
const { Schema } = require('mongoose')


export default class Carrito extends BaseModel {
  @column({ isPrimary: true })
  public carritoid: number

  @column()
  public productid: number

  @column()
  public quantity: number

  @column()
  public unitprice: number

  @column()
  public userid: number

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime

  public static ver() {
    return this.query()
  }

  public static verUno(id) {
    return this.findByOrFail('orderdetailid', id)
  }

  public static crear(data) {
    return this.create(data)
  }

  public static schema() {
    const postSchema = new Schema({
      orderid: Number,
      productid: Number,
      quantity: Number,
      userid: Number
    })
    postSchema
  }

  public static validar(data) {
    return data.validate({ schema: this.schema() })
  }

  public static eliminar(dato) {
    return dato.delete()
  }

  public static modificar(data, registro) {
    return registro.merge(data).save()
  }

  public static crearStock(quantity, product) {
    product.stock = product.stock + quantity
    return product
  }

  public static modificarStock(quantity, newquantity, product) {
    const nq = quantity - newquantity
    product.stock = product.stock - nq
    return product
  }
}

