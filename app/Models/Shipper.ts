import { DateTime } from 'luxon'
import { BaseModel, column, HasMany, hasMany, ManyToMany, manyToMany } from '@ioc:Adonis/Lucid/Orm'
import Order from './Order'
import { schema, rules } from '@ioc:Adonis/Core/Validator'


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


  public static ver() {
    return this.query()
  }

  public static verUno(id) {
    return this.findByOrFail('shipperid', id)
  }

  public static crear(data) {
    return this.create(data)
  }

  public static schema() {
    const postSchema = schema.create({
      name: schema.string({}, [rules.unique({ table: 'shippers', column: 'name' })]),
      phone: schema.number()
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

}
