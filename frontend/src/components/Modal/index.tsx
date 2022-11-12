import { ButtonConfirmBlue, ButtonConfirmPink } from "../Button";
import { ContainerBtn, ContainerModal, Content, Description, Title } from "./styles";


interface ModalCofirmatioProps {
    title: string;
    description: string;
    msgBtnConfirm: string;
    msgBtnCancel: string
    handleDeleteRegis: (confirmation: boolean) => void;
    handleNotDeleteRegis: (confirmation: boolean) => void;
}


function ModalConfirmation( {title, description, msgBtnCancel, msgBtnConfirm, handleDeleteRegis, handleNotDeleteRegis}:ModalCofirmatioProps ){

    return (
        <ContainerModal>
            <Content>
                <Title>{title}</Title>

                <Description>{description}</Description>

                <ContainerBtn>
                    <ButtonConfirmPink onClick={() => handleNotDeleteRegis(true)}>
                       {msgBtnCancel}
                    </ButtonConfirmPink>
                    <ButtonConfirmBlue onClick={() => handleDeleteRegis(true)}>
                       {msgBtnConfirm}
                    </ButtonConfirmBlue>
                </ContainerBtn>

            </Content>
        </ContainerModal>
    )
}

export { ModalConfirmation }