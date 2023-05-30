import { useMutation, useQuery } from "@tanstack/react-query";
import { useRouter } from "next/router";
import { SubmitHandler, UseFormSetValue } from "react-hook-form";
import { IUpdateAttribute } from "types/attribute.types";

export const useAttributeEdit = (setValue: UseFormSetValue<IUpdateAttribute>) => {
    const {query, push} = useRouter()
    const attributeId = Number(query.id)
    const {isLoading} = useQuery({
        queryKey: ['get attribute by id', attributeId],
        queryFn: 
    })
    const {mutateAsync} = useMutation({
        mutationKey: ["update attribute"],
        mutationFn: (data: IUpdateAttribute) => 
    })
    const onSumbit: SubmitHandler<IUpdateAttribute> = async (data) => {
        await mutateAsync(data)
    }
    return {isLoading, onSumbit}
}