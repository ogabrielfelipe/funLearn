import { Request, Response } from "express";
import { FindTeacherService } from "../../service/teacher/FindTeacherService";



class FindTeacherController{
    async handle(req: Request, res: Response){
        const teacherID = req.query['teacherID'] as string

        const user = req.user

        const findTeacher = new FindTeacherService();
        const result = await findTeacher.execute({
            teacherID: teacherID,
            user: user
        })

        return res.status(200).json(result)
    }
}

export { FindTeacherController }