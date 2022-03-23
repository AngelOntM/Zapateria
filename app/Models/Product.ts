import { DateTime } from 'luxon'
import { BaseModel, BelongsTo, belongsTo, column, HasMany, hasMany } from '@ioc:Adonis/Lucid/Orm'
import Orderdetail from './Orderdetail'
import Brand from './Brand'
import Size from './Size'
import Category from './Category'

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

  @hasMany(() => Orderdetail, {
    foreignKey: 'productid'
  })
  public Orderdetails: HasMany<typeof Orderdetail>

  @belongsTo(() => Brand, {
    localKey: 'brandid'
  })
  public Brand: BelongsTo<typeof Brand>

  @belongsTo(() => Size, {
    localKey: 'sizeid'
  })
  public Size: BelongsTo<typeof Size>

  @belongsTo(() => Category, {
    localKey: 'categoryid'
  })
  public Category: BelongsTo<typeof Category>
}
