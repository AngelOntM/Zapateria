import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class Accesses extends BaseSchema {
  protected tableName = 'accesses'

  public async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('accessid')
      table.string('name')
      table.timestamps()
    })
  }

  public async down() {
    this.schema.dropTable(this.tableName)
  }
}
