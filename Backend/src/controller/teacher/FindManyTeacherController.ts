import { Request, Response } from "express";
import { FindManyTeacherService } from "../../service/teacher/FindManyTeacherService";



class FindManyTeacherController{
    async handle (req: Request, res: Response){
        const { name } = req.body;
        const user = req.user;

        const findManyTeacher = new FindManyTeacherService()
        const result = await findManyTeacher.execute({
            name: name,
            user: user
        })

        return res.status(200).json(result)
        
    }
}

export { FindManyTeacherController }