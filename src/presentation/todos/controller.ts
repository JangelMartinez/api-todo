import { Request, Response } from "express"
import { prisma } from "../../data/postgres";
import { CreateTodoDto, UpdateTodoDto } from "../../domain/dtos";
import { error } from "console";


export class TodosController {

    //* Dependency Inyection (DI)

    constructor(){}

    public getTodos = async (req: Request, res:Response) => {

        const allTodos = await prisma.todo.findMany();

        return res.json( allTodos );

    };

    public getTodoById = async (req:Request, res:Response) => {

        const id = +req.params.id;
        if (isNaN(id)) return res.status(400).json({ error: 'ID argument is not a number'});

        const todo = await prisma.todo.findFirst( {
            where: { id }
        });

        ( todo )
            ? res.json(todo)
            : res.status(404).json({ error: `TODO with id ${ id } not found`});
        
    };

    public createTodo = async ( req: Request, res: Response ) => {

        const [ error, createTodoDto ] = CreateTodoDto.create(req.body);

        if (error ) return res.status(400).json( { error });

        const todo = await prisma.todo.create({ 
            data: createTodoDto! // la admiración es en caso de que createTodoDto sea undefined o no exista
        });

        return res.json(todo);

    };

    public updateTodo = async (req: Request, res: Response ) => {

        const id = +req.params.id;
        const [error, updateTodoDto ] = UpdateTodoDto.create({...req.body, id});
        if ( error ) return res.status(400).json( { error } )

        const todo = await prisma.todo.findFirst({
            where: { id },
        });

        if ( !todo ) return res.status(400).json({error: `Todo with id ${id} not found`});

        const updatedTodo = await prisma.todo.update({
            where: { id: id},
            data: updateTodoDto!.values
        });
        
        return res.json( updatedTodo );

    };

    public deleteTodo = async (req: Request, res: Response ) => {

        const id = +req.params.id;
        if ( isNaN(id) ) return res.status(400).json({error: 'Id argument is not a number'});

        
        const todo = await prisma.todo.findFirst({
            where: { id: id},
        });

        if ( !todo ) return res.status(400).json({error: `Todo with id ${id} not found`});

        const todoDelete = await prisma.todo.delete({
            where: { id }
        });

        ( todoDelete )
            ? res.json( todoDelete )
            : res.status(400).json({ error: `Todo with id ${id} not found`})

    };

}