import { Router } from 'express'

import { ClientsController } from './controllers/ClientsController'

const routes = Router();

const clientsController = new ClientsController()

routes.post('/clients', clientsController.create)
routes.get('/clients', clientsController.index)
routes.get('/clients/:id', clientsController.show)
routes.put('/clients/:id', clientsController.update)
routes.delete('/clients/:id', clientsController.delete)

export { routes }

