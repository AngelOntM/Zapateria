import { DateTime } from 'luxon'
import { BaseModel, column } from '@ioc:Adonis/Lucid/Orm'

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
}
