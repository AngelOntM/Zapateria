import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class Suppliers extends BaseSchema {
  protected tableName = 'suppliers'

  public async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('supplierid')
      table.string('name').notNullable()
      table.string('email').notNullable().unique()
      table.bigInteger('phone')
      table.timestamps()
    })
  }

  public async down() {
    this.schema.dropTable(this.tableName)
  }
}
