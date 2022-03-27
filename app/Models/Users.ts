import { DateTime } from 'luxon'
import Hash from '@ioc:Adonis/Core/Hash'
import { column, beforeSave, BaseModel } from '@ioc:Adonis/Lucid/Orm'
import { schema, rules } from '@ioc:Adonis/Core/Validator'
import Database from '@ioc:Adonis/Lucid/Database'


export default class Users extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public email: string

  @column({ serializeAs: null })
  public password: string

  @column()
  public rememberMeToken?: string

  @column()
  public isActivated: boolean = true

  @column()
  public accessid: number = 3

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime

  @beforeSave()
  public static async hashPassword(users: Users) {
    if (users.$dirty.password) {
      users.password = await Hash.make(users.password)
    }
  }

  public static validarAdmin() {
    const postSchema = schema.create({
      email: schema.string({}, [rules.email()]),
      password: schema.string(),
      isActivated: schema.boolean(),
      accessid: schema.number()
    })
    return postSchema
  }

  public static validarEmpleado() {
    const postSchema = schema.create({
      email: schema.string({}, [rules.email()]),
      password: schema.string()
    })
    return postSchema
  }

  public static desactivar(User) {
    if (User.isActivated == false) {
      Database.from('api_tokens').where('user_id', User.id).delete()
    }
  }

  public static validar(nivel, request) {
    if (nivel == 1) {
      try {
        const validatedData = request.validate({ schema: this.validarAdmin() })
        return validatedData
      } catch (e) {
        return e
      }
    } else if (nivel == 2 || nivel == 3) {
      const validatedData = request.validate({ schema: this.validarEmpleado() })
      return validatedData
    }
  }

  public static verUno(nivel, idO, idB) {
    if (nivel == 1) {
      const users = Database.from('users').where('id', idB);
      return users
    } else if (nivel == 2 || nivel == 3) {
      if (idO == idB) {
        const users = Database.from('users').where('id', idB);
        return users
      } else
        return null

    }
  }

  public static crear(data) {
    return this.create(data)
  }

  public static ver() {
    return this.query()
  }

  public static eliminar(dato) {
    return dato.delete()
  }

  public static modificar(data, registro) {
    return registro.merge(data).save()
  }
}
