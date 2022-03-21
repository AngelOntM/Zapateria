import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class Shippers extends BaseSchema {
  protected tableName = 'shippers'

  public async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('shipperid')
      table.string('name').notNullable()
      table.integer('phone')
      table.timestamps()
    })
  }

  public async down() {
    this.schema.dropTable(this.tableName)
  }
}
