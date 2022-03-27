import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Orderdetail from 'App/Models/Orderdetail'
import Product from 'App/Models/Product'

export default class OrderdetailsController {
    public async index({ auth, response }: HttpContextContract) {
        if (auth.user?.accessid != 3) {
            const dato = await Orderdetail.ver()
            return response.json({ dato })
        } else {
            return response
                .status(400)
                .send({ error: { message: 'User has no permissions' } })
        }
    }

    public async store({ auth, request, response }: HttpContextContract) {
        if (auth.user?.accessid != 3) {
            const validatedData = await Orderdetail.validar(request)
            const dato = await Orderdetail.crear(validatedData)
            const registro = await Product.verUno(dato.productid)
            const dato1 = await Orderdetail.crearStock(dato.quantity, registro)
            await Product.modificar(dato1, registro)
            return response.json({ dato });
        } else {
            return response
                .status(400)
                .send({ error: { message: 'User has no permissions' } })
        }
    }

    public async show({ auth, response, params }: HttpContextContract) {
        if (auth.user?.accessid != 3) {
            const dato = await Orderdetail.verUno(params.id)
            return response.json({ dato })
        } else {
            return response
                .status(400)
                .send({ error: { message: 'User has no permissions' } })
        }
    }

    public async update({ auth, request, response, params }: HttpContextContract) {
        if (auth.user?.accessid != 3) {
            const validatedData = await Orderdetail.validar(request)
            const registro = await Orderdetail.verUno(params.id)
            const quantity = registro.quantity
            const dato = await Orderdetail.modificar(validatedData, registro)
            const registro1 = await Product.verUno(dato.productid)
            const dato1 = await Orderdetail.modificarStock(quantity, dato.quantity, registro1)
            await Product.modificar(dato1, registro1)
            return response.json({ dato })
        } else {
            return response
                .status(400)
                .send({ error: { message: 'User has no permissions' } })
        }
    }

    public async destroy({ auth, response, params }: HttpContextContract) {
        if (auth.user?.accessid != 3) {
            const dato = await Orderdetail.verUno(params.id)
            await Orderdetail.eliminar(dato)
            return response
                .status(200)
                .send({ message: 'Registro Eliminado' })
        } else {
            return response
                .status(400)
                .send({ error: { message: 'User has no permissions' } })
        }
    }

    public async indexOrderdetails({ response }: HttpContextContract) {
        const dato = await Orderdetail.verOrders()
        return response.json({ dato })
    }

}
