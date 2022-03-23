import { DateTime } from 'luxon'
import { BaseModel, column, HasMany, hasMany, ManyToMany, manyToMany } from '@ioc:Adonis/Lucid/Orm'
import Order from './Order'

export default class Shipper extends BaseModel {
  @column({ isPrimary: true })
  public shipperid: number

  @column()
  public name: string

  @column()
  public phone: number

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime

  @hasMany(() => Order, {
    foreignKey: 'shipperid'
  })
  public orders: HasMany<typeof Order>

  /*@manyToMany(() => Supplier)
  public suppliers: ManyToMany<typeof Supplier>*/

}
