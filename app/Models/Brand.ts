import { DateTime } from 'luxon'
import { BaseModel, column, HasMany, hasMany } from '@ioc:Adonis/Lucid/Orm'
import Product from './Product'
import { schema, rules } from '@ioc:Adonis/Core/Validator'


export default class Brand extends BaseModel {
  @column({ isPrimary: true })
  public brandid: number

  @column()
  public brand: string

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime

  @hasMany(() => Product, {
    foreignKey: 'brandid'
  })
  public products: HasMany<typeof Product>

  public static ver() {
    return this.query()
  }

  public static verUno(id) {
    return this.findByOrFail('brandid', id)
  }

  public static crear(data) {
    return this.create(data)
  }

  public static schema() {
    const postSchema = schema.create({
      brand: schema.string({}, [rules.unique({ table: 'brands', column: 'brand' })])
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
