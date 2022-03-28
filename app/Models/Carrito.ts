import { DateTime } from 'luxon'
import { BaseModel, column } from '@ioc:Adonis/Lucid/Orm'
import { schema } from '@ioc:Adonis/Core/Validator'


export default class Carrito extends BaseModel {
  @column({ isPrimary: true })
  public carritoid: number

  @column()
  public productid: number

  @column()
  public quantity: number

  @column()
  public unitprice: number

  @column()
  public userid: number

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime

  public static ver() {
    return this.query()
  }

  public static schema() {
    const postSchema = schema.create({
      userid: schema.number(),
      productid: schema.number(),
      quantity: schema.number(),
      unitprice: schema.number()
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

  public static crearStock(quantity, product) {
    product.stock = product.stock - quantity
    return product
  }

  public static regresarStock(quantity, product) {
    product.stock = product.stock + quantity
    return product
  }


}

