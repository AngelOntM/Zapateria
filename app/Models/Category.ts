import { DateTime } from 'luxon'
import { BaseModel, column, HasMany, hasMany } from '@ioc:Adonis/Lucid/Orm'
import Product from './Product'
import { schema, rules } from '@ioc:Adonis/Core/Validator'


export default class Category extends BaseModel {
  @column({ isPrimary: true })
  public categoryid: number

  @column()
  public category: string

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime

  @hasMany(() => Product, {
    foreignKey: 'categoryid'
  })
  public products: HasMany<typeof Product>

  public static ver() {
    return this.query()
  }

  public static verUno(id) {
    return this.findByOrFail('categoryid', id)
  }

  public static crear(data) {
    return this.create(data)
  }

  public static schema() {
    const postSchema = schema.create({
      category: schema.string({}, [rules.unique({ table: 'categories', column: 'category' })])
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
