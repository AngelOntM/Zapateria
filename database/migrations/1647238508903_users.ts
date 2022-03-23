import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class UsersSchema extends BaseSchema {
  protected tableName = 'users'

  public async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id').primary()
      table.string('email', 255).notNullable().unique()
      table.string('password', 180).notNullable()
      table.boolean('is_activated').notNullable().defaultTo(true)
      table.string('remember_me_token').nullable()
      table
        .integer('accessid')
        .unsigned()
        .references('accesses.accessid')
        .onDelete('CASCADE')
        .defaultTo('2')
      table.timestamps()
    })
  }

  public async down() {
    this.schema.dropTable(this.tableName)
  }
}
