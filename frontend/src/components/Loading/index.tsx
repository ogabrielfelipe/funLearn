import Image from "next/image"
import LoadingCloud from "../../../public/assets/loading-cloud.gif";
import LottieFilesLoading from "../LottieFiles/Loading";

import { ContainerLoading, ContentSpinner } from "./styles"

function LoadingManager(){
    return (
        <ContainerLoading>
            <ContentSpinner>
                <LottieFilesLoading />
            </ContentSpinner>
        </ContainerLoading>
    )
}

export { LoadingManager }