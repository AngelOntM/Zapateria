import { DateTime } from 'luxon'
import { BaseModel, column, HasMany, hasMany, ManyToMany, manyToMany } from '@ioc:Adonis/Lucid/Orm'
import Order from './Order'

export default class Supplier extends BaseModel {
  @column({ isPrimary: true })
  public supplierid: number

  @column()
  public name: string

  @column()
  public email: string

  @column()
  public phone: number

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime

  @hasMany(() => Order, {
    foreignKey: 'supplierid'
  })
  public orders: HasMany<typeof Order>

  /*@manyToMany(() => Shipper)
  public shippers: ManyToMany<typeof Shipper>*/

}
