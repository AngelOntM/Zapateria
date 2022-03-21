import { DateTime } from 'luxon'
import { BaseModel, column } from '@ioc:Adonis/Lucid/Orm'

export default class Product extends BaseModel {
  @column({ isPrimary: true })
  public productid: number

  @column()
  public name: string

  @column()
  public color: string

  @column()
  public stock: number

  @column()
  public price: number

  @column()
  public sizeid: number

  @column()
  public brandid: number

  @column()
  public categoryid: number

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime
}
