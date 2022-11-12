import Image from "next/image"
import Loading from "../../../public/assets/loading.gif"
import { ContainerLoading, ContentSpinner } from "./styles"

function LoadingManager(){
    return (
        <ContainerLoading>
            <ContentSpinner>
                <Image src={Loading}  layout={"responsive"} alt={"Imagem de carregamento de informações"} />
            </ContentSpinner>
        </ContainerLoading>
    )
}

export { LoadingManager }