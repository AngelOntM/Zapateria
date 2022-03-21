import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class Orderdetails extends BaseSchema {
  protected tableName = 'orderdetails'

  public async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('orderdetailid')
      table
        .integer('orderid')
        .unsigned()
        .references('orders.orderid')
        .onDelete('CASCADE')
      table
        .integer('productid')
        .unsigned()
        .references('products.productid')
        .onDelete('CASCADE')
      table.integer('quantity')
      table.decimal('unitprice')
      table.timestamps()
    })
  }

  public async down() {
    this.schema.dropTable(this.tableName)
  }
}
