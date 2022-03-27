import { DateTime } from 'luxon'
import { BaseModel, belongsTo, BelongsTo, column } from '@ioc:Adonis/Lucid/Orm'
import Order from './Order'
import Product from './Product'
import { schema, rules } from '@ioc:Adonis/Core/Validator'
import Database from '@ioc:Adonis/Lucid/Database'


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
    return this.findByOrFail('orderdetailid', id)
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

  public static modificarProducto(id, quantity) {
    const producto = Product.verUno(id)
    console.log('producto', producto)
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

  public static verOrders() {
    return Database.from('orderdetails')
      .select('*')
      .select(
        Database.from('products')
          .select('products.name')
          .whereColumn('productid', 'products.productid')
          .as('product')
      )

  }
}
