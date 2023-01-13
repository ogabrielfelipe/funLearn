
import ThemeDML from '../../../Documentation/Modelos/PerguntasTemeDML.json'
import { CreateAskService } from '../../service/ask/CreateAskService';
import { CreateThemeService } from '../../service/theme/CreateThemeService';

class ImportAsksController{
    async handle(){ 
        
        const theacherID = "64287ef4-3b22-4e25-abd3-c4c241135d80";

        const createTheme = new CreateThemeService();
        const resultCreateTheme = await createTheme.execute({
            name: ThemeDML.tema.nome,
            description: ThemeDML.tema.descricao,
            teacherID: theacherID,
            teams:[],
            active: true
        })
        if (!resultCreateTheme){
            throw new Error("is not possible to create");
        }

        const createAskService = new CreateAskService();
        
        ThemeDML.perguntas.forEach(async ask => {
            await createAskService.execute({
                question: ask.descricao,
                level: ask.nivel === 'Intermediaria' ? 'INTERMEDIARY' : ask.nivel === 'iniciante' ? 'INITIAL' : 'ADVANCED',
                image: "",
                active: true,
                answer: ask.respostas.map(answer =>{
                    return (
                        {
                            "id": null,
                            "description": answer.descricao,
                            "correct": answer.correta
                        }
                    )
                }),
                tip: ask.dicas.map(tip =>{
                    return (
                        {
                            "id": null,
                            "name": tip,
                            "visible": true
                        }
                    )
                }),
                themeID: resultCreateTheme.data.theme.id
            })
        })
        


    }
}

export { ImportAsksController }