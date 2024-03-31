import { Router } from "express";
import { TodosController } from "./todos/controller";
import { TodoRoutes } from "./todos/routes";
import { TodoDatasourceImpl } from "../infrastructure/datasource/datasource.impl";
import { TodoRepositoryImpl } from "../infrastructure/repositories/todo.repository.impl";


export class AppRoutes {

    static get routes(): Router {
        
        const router = Router();

        const datasource = new TodoDatasourceImpl();
        const todoRepository = new TodoRepositoryImpl( datasource )

        const todoController = new TodosController(todoRepository);

        router.use('/api/todos', TodoRoutes.routes);

        return router;
    }

}