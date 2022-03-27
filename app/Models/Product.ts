import { DateTime } from 'luxon'
import { BaseModel, BelongsTo, belongsTo, column, HasMany, hasMany } from '@ioc:Adonis/Lucid/Orm'
import Orderdetail from './Orderdetail'
import Brand from './Brand'
import Size from './Size'
import Category from './Category'
import { schema, rules } from '@ioc:Adonis/Core/Validator'
import Database from '@ioc:Adonis/Lucid/Database'


export default class Product extends BaseModel {
  @column({ isPrimary: true })
  public productid: number

  @column()
  public product: string

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

  @column()
  public size: string

  @column()
  public brand: string

  @column()
  public category: string

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

  public static ver() {
    return this.query()
  }

  public static verProductos() {
    return this.query()
      .innerJoin('sizes', 'sizes.sizeid', 'products.sizeid')
      .innerJoin('categories', 'categories.categoryid', 'products.categoryid')
      .innerJoin('brands', 'brands.brandid', 'products.brandid')
      .select('*')
  }

  public static verUno(id) {
    return this.findByOrFail('productid', id)
  }

  public static verProductosUno(id) {
    return this.query()
      .innerJoin('sizes', 'sizes.sizeid', 'products.sizeid')
      .innerJoin('categories', 'categories.categoryid', 'products.categoryid')
      .innerJoin('brands', 'brands.brandid', 'products.brandid')
      .select('*')
      .where('productid', id)
  }

  public static crear(data) {
    return this.create(data)
  }

  public static schema() {
    const postSchema = schema.create({
      product: schema.string(),
      color: schema.string(),
      stock: schema.number(),
      price: schema.number(),
      sizeid: schema.number(),
      brandid: schema.number(),
      categoryid: schema.number()
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
