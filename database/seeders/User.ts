import BaseSeeder from '@ioc:Adonis/Lucid/Seeder'
import Users from 'App/Models/Users'


export default class UserSeeder extends BaseSeeder {
  public async run() {
    await Users.create(
      {
        email: 'admin@admin.com',
        password: '12345678',
        accessid: 1
      }
    )
  }

}