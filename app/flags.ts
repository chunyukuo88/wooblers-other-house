import { cookies } from 'next/headers';

const activationValue = process.env.NEXT_PUBLIC_FF_PRIVATE_IMAGES_ON!;

function enabledByFeatureFlag(flagValue: string) {
  if (!flagValue) {
    return false;
  }
  return flagValue === activationValue;
}

const cookieKey = process.env.NEXT_PUBLIC_FF_PRIVATE_IMAGES_KEY!;
async function enabledByCookie() {
  const cookieStore = await cookies();
  const activationCookieValue = await cookieStore.get(cookieKey)?.value;
  if (!activationCookieValue) {
    return false;
  }
  return activationCookieValue === activationValue;
}

export async function getFeatureStatus(queryParamValue: string) {
  const featureEnabledByQueryParams = enabledByFeatureFlag(queryParamValue);
  const featureEnabledByCookie = await enabledByCookie();
  return featureEnabledByQueryParams || featureEnabledByCookie;
}
