import {cookies} from "next/headers";

const activationValue = process.env.NEXT_PUBLIC_FF_PRIVATE_IMAGES_VAL!;

function enabledByFeatureFlag(flagValue: string) {
    return flagValue === activationValue;
}

async function enabledByCookie(queryParamKey: string) {
    const cookieStore = await cookies();
    return cookieStore.get(queryParamKey)?.value === activationValue;
}

export async function getFeatureStatus(searchParam: string, queryParamKey: string){
    const featureEnabledByCookie = enabledByCookie(queryParamKey);
    const featureEnabledByQueryParams = enabledByFeatureFlag(searchParam);
    return featureEnabledByQueryParams || featureEnabledByCookie;
}
