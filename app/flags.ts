import { cookies } from 'next/headers';

const activationValue = process.env.NEXT_PUBLIC_FF_PRIVATE_IMAGES_ON!;

function enabledByFeatureFlag(flagValue: string) {
  return flagValue === activationValue;
}

async function enabledByCookie(queryParamKey: string) {
  const cookieStore = await cookies();
  const activationCookieValue = cookieStore.get(queryParamKey)?.value;
  return activationCookieValue === activationValue;
}

export async function getFeatureStatus(queryParamKey: string) {
  const featureEnabledByQueryParams = enabledByFeatureFlag(queryParamKey);
  const featureEnabledByCookie = enabledByCookie(queryParamKey);
  return featureEnabledByQueryParams || featureEnabledByCookie;
}
