import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class Products extends BaseSchema {
  protected tableName = 'products'

  public async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('productid')
      table.string('name').notNullable()
      table.string('color')
      table.integer('stock')
      table.decimal('price')
      table
        .integer('sizeid')
        .unsigned()
        .references('sizes.sizeid')
        .onDelete('CASCADE')
      table
        .integer('brandid')
        .unsigned()
        .references('brands.brandid')
        .onDelete('CASCADE')
      table
        .integer('categoryid')
        .unsigned()
        .references('categories.categoryid')
        .onDelete('CASCADE')
      table.timestamps()
    })
  }

  public async down() {
    this.schema.dropTable(this.tableName)
  }
}
