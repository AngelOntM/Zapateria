import BaseSeeder from '@ioc:Adonis/Lucid/Seeder'
import Access from 'App/Models/Access'


export default class AccessSeeder extends BaseSeeder {
  public async run() {
    await Access.createMany([
      {
        name: 'admin',
      },
      {
        name: 'empleado',
      }
    ])
  }
}