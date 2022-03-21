import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class Orders extends BaseSchema {
  protected tableName = 'orders'

  public async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('orderid')
      table
        .integer('supplierid')
        .unsigned()
        .references('suppliers.supplierid')
        .onDelete('CASCADE')
      table
        .integer('shipperid')
        .unsigned()
        .references('shippers.shipperid')
        .onDelete('CASCADE')
      table.timestamps()
    })
  }

  public async down() {
    this.schema.dropTable(this.tableName)
  }
}
