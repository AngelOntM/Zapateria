import { DateTime } from 'luxon'
import { BaseModel, belongsTo, BelongsTo, column } from '@ioc:Adonis/Lucid/Orm'
import Order from './Order'
import Product from './Product'
import { schema, rules } from '@ioc:Adonis/Core/Validator'


export default class Orderdetail extends BaseModel {
  @column({ isPrimary: true })
  public orderdetailid: number

  @column()
  public orderid: number

  @column()
  public productid: number

  @column()
  public quantity: number

  @column()
  public unitprice: number

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime

  @belongsTo(() => Order, {
    localKey: 'orderid'
  })
  public orders: BelongsTo<typeof Order>


  @belongsTo(() => Product, {
    localKey: 'productid'
  })
  public products: BelongsTo<typeof Product>


  public static ver() {
    return this.query()
  }

  public static verUno(id) {
    return this.findByOrFail('brandid', id)
  }

  public static crear(data) {
    return this.create(data)
  }

  public static schema() {
    const postSchema = schema.create({
      orderid: schema.number(),
      productid: schema.number(),
      quantity: schema.number(),
      unitprice: schema.number()
    })
    return postSchema
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
}
