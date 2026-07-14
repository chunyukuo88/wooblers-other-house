import { cookies } from 'next/headers';

const activationValue = process.env.NEXT_PUBLIC_FF_PRIVATE_IMAGES_ON!;

function enabledByFeatureFlag(flagValue: string) {
  if (!flagValue) {
    return false;
  }
  return flagValue === activationValue;
}

async function enabledByCookie(queryParamKey: string) {
  if (!queryParamKey) {
    return false;
  }
  const cookieStore = await cookies();
  const activationCookieValue = cookieStore.get(queryParamKey)?.value;
  if (!activationCookieValue) {
    return false;
  }
  return activationCookieValue === activationValue;
}

export async function getFeatureStatus(queryParamKey: string) {
  if (!queryParamKey) {
    return false;
  }
  const featureEnabledByQueryParams = enabledByFeatureFlag(queryParamKey);
  const featureEnabledByCookie = enabledByCookie(queryParamKey);
  return featureEnabledByQueryParams || featureEnabledByCookie;
}
