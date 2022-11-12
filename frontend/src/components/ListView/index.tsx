import { PencilLine, Trash } from "phosphor-react";
import { Btn, Container, ContentBtn, ContentList, TextList } from "./styles";

type ListViewItems = {
    id: string;
    name1: string;
    name2: string;

}

interface ListViewProps{
    names: ListViewItems[];

    handleEdit: (identItem: string) => void;
    handleDelete: (identItem: string) => void;
}


function ListView( { names, handleEdit, handleDelete  }: ListViewProps ){

    function onClickAlter(identItem: string){
        handleEdit(identItem)
    }

    function onClickDelete(identItem: string){
        handleDelete(identItem)
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
                                <Btn onClick={() => onClickAlter(name.id)}><PencilLine size={25} weight="regular" /><span id={name.id} hidden>{name.id}</span></Btn>
                                <Btn onClick={() => onClickDelete(name.id)}><Trash size={25} weight="regular" /><span hidden>{name.id}</span></Btn>
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