import { Request, Response } from "express"
import { prisma } from "../../data/postgres";
import { CreateTodoDto, UpdateTodoDto } from "../../domain/dtos";
import { TodoRepository } from "../../domain";


export class TodosController {

    //* Dependency Inyection (DI)

    constructor(
        private readonly todoRepository: TodoRepository,
    ){}

    public getTodos = async (req: Request, res:Response) => {

        const allTodos = await this.todoRepository.getAll();

        return res.json( allTodos );

    };

    public getTodoById = async (req:Request, res:Response) => {

        const id = +req.params.id;
        if (isNaN(id)) return res.status(400).json({ error: 'ID argument is not a number'});

        try {
            const todo = await this.todoRepository.findById(id);
            return res.json(todo);
        } catch (error) {
            return res.status(400).json({error});
        }
        
    };

    public createTodo = async ( req: Request, res: Response ) => {

        const [ error, createTodoDto ] = CreateTodoDto.create(req.body);

        if (error ) return res.status(400).json( { error });

        try {
            const todo = await this.todoRepository.create( createTodoDto! );
            return res.json( todo )            
        } catch (error) {
            return res.status(400).json({error});
        }
       
    };

    public updateTodo = async (req: Request, res: Response ) => {

        const id = +req.params.id;
        const [error, updateTodoDto ] = UpdateTodoDto.create({...req.body, id});
        if ( error ) return res.status(400).json( { error } )

        try {
            const updatedTodo = await this.todoRepository.updateById( updateTodoDto! );
            return res.json( updatedTodo );
        } catch (error) {
            return res.status(400).json({error});
        }

    };

    public deleteTodo = async (req: Request, res: Response ) => {

        const id = +req.params.id;
        if ( isNaN(id) ) return res.status(400).json({error: 'Id argument is not a number'});

        try {
            const deletedTodo = await this.todoRepository.deleteById ( id );
            return res.json ( deletedTodo );
        } catch (error) {
            return res.status(400).json({error});
        }

    };

}