import { DateTime } from 'luxon'
import { BaseModel, BelongsTo, belongsTo, column, HasMany, hasMany } from '@ioc:Adonis/Lucid/Orm'
import Supplier from './Supplier'
import Shipper from './Shipper'
import Orderdetail from './Orderdetail'
import { schema } from '@ioc:Adonis/Core/Validator'


export default class Order extends BaseModel {
  @column({ isPrimary: true })
  public orderid: number

  @column()
  public supplierid: number

  @column()
  public shipperid: number

  @column()
  public supplier: string

  @column()
  public shipper: string

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
    return this.query()
      .innerJoin('suppliers', 'suppliers.supplierid', 'orders.supplierid')
      .innerJoin('shippers', 'shippers.shipperid', 'orders.shipperid')
      .select('*')
      .preload('orderdetails', (query) => {
        query.innerJoin('products', 'products.productid', 'orderdetails.productid')
      })
  }

  public static verOrdersUno(id) {
    return this.query()
      .innerJoin('suppliers', 'suppliers.supplierid', 'orders.supplierid')
      .innerJoin('shippers', 'shippers.shipperid', 'orders.shipperid')
      .select('*')
      .where('orderid', id)
      .preload('orderdetails', (query) => {
        query.innerJoin('products', 'products.productid', 'orderdetails.productid')
      })
  }
}
