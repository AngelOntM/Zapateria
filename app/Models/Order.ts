import { DateTime } from 'luxon'
import { BaseModel, BelongsTo, belongsTo, column, HasMany, hasMany } from '@ioc:Adonis/Lucid/Orm'
import Supplier from './Supplier'
import Shipper from './Shipper'
import Orderdetail from './Orderdetail'
import { schema, rules } from '@ioc:Adonis/Core/Validator'
import Database from '@ioc:Adonis/Lucid/Database'


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


  public static ver() {
    return this.query()
  }

  public static verUno(id) {
    return this.findByOrFail('orderid', id)
  }

  public static crear(data) {
    return this.create(data)
  }

  public static schema() {
    const postSchema = schema.create({
      supplierid: schema.number(),
      shipperid: schema.number(),
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

  public static verOrders() {
    return Database.from('orders')
      .select('*')
      .select(
        Database.from('suppliers')
          .select('suppliers.name')
          .whereColumn('supplierid', 'suppliers.supplierid')
          .as('supplier')
      )
      .select(
        Database.from('shippers')
          .select('shippers.name')
          .whereColumn('shipperid', 'shippers.shipperid')
          .as('shipper')
      )
  }

  public static verOrdersUno(id) {
    return Database.from('orders')
      .select('*')
      .select(
        Database.from('suppliers')
          .select('suppliers.name')
          .whereColumn('supplierid', 'suppliers.supplierid')
          .as('supplier')
      )
      .select(
        Database.from('shippers')
          .select('shippers.name')
          .whereColumn('shipperid', 'shippers.shipperid')
          .as('shipper')
      )
      .where('orderid', id)
  }
}
