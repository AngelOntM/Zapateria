import { DateTime } from 'luxon'
import { BaseModel, belongsTo, BelongsTo, column } from '@ioc:Adonis/Lucid/Orm'
import Order from './Order'
import Product from './Product'

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
}
