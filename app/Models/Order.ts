import { DateTime } from 'luxon'
import { BaseModel, BelongsTo, belongsTo, column, HasMany, hasMany } from '@ioc:Adonis/Lucid/Orm'
import Supplier from './Supplier'
import Shipper from './Shipper'
import Orderdetail from './Orderdetail'

export default class Order extends BaseModel {
  @column({ isPrimary: true })
  public orderid: number

  @column()
  public supplierid: number

  @column()
  public shipperid: number

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime

  @belongsTo(() => Supplier, {
    localKey: 'supplierid'
  })
  public Supplier: BelongsTo<typeof Supplier>

  @belongsTo(() => Shipper, {
    localKey: 'shipperid'
  })
  public Shipper: BelongsTo<typeof Shipper>

  @hasMany(() => Orderdetail, {
    foreignKey: 'orderid'
  })
  public orderdetails: HasMany<typeof Orderdetail>
}
