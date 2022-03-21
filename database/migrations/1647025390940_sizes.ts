import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class Sizes extends BaseSchema {
  protected tableName = 'sizes'

  public async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('sizeid')
      table.decimal("size").notNullable()
      table.timestamps()
    })
  }

  public async down() {
    this.schema.dropTable(this.tableName)
  }
}
