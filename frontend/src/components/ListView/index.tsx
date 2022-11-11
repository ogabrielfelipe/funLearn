import { PencilLine, Trash } from "phosphor-react";
import { Btn, Container, ContentBtn, ContentList, TextList } from "./styles";

type ListViewItems = {
    id: string;
    name1: string;
    name2: string;

}

interface ListViewProps{
    names: ListViewItems[];

    handleEdit: () => void;
    handleDelete: () => void;
}


function ListView( { names }: ListViewProps ){

    function handleAlter(e){
        console.log(e.target.parentElement.childNodes[1].textContent)
    }


    return (
        <Container>

            { names.length === 0 ? (
                <>
                </>

            ) : (
                names.map( (name, index) =>{
                    return (
                        <ContentList key={index}>
                            <TextList>{name.name1}</TextList>
                            <TextList>{name.name2}</TextList>
                            <ContentBtn>
                                <Btn  onClick={handleAlter}><PencilLine size={25} weight="regular" /><span id={name.id} hidden>{name.id}</span></Btn>
                                <Btn><Trash size={25} weight="regular" /><span hidden>{name.id}</span></Btn>
                            </ContentBtn>
                        </ContentList>
                    )
                }) 
            )
               
            }            
        </Container>
    )
}

export { ListView }