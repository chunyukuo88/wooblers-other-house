import { cookies } from 'next/headers';
import { logger } from '../common/logging';

const activationValue = process.env.NEXT_PUBLIC_FF_PRIVATE_IMAGES_ON!;

function enabledByFeatureFlag(flagValue: string) {
  logger('enabled byFeatureFlag 0 - flagValue', flagValue);
  if (!flagValue) {
    return false;
  }
  logger('enabled byFeatureFlag 1 - activationValue', activationValue);
  return flagValue === activationValue;
}

async function enabledByCookie(queryParamKey: string) {
  logger('enabledByCookie 0 - queryParamKey', queryParamKey);
  if (!queryParamKey) {
    return false;
  }
  const cookieStore = await cookies();
  logger('enabledByCookie 1');
  const activationCookieValue = cookieStore.get(queryParamKey)?.value;
  if (!activationCookieValue) {
    return false;
  }
  logger('enabledByCookie 2 - activationCookieValue', activationCookieValue);
  return activationCookieValue === activationValue;
}

export async function getFeatureStatus(queryParamKey: string) {
  logger('getFeatureStatus() 0');
  if (!queryParamKey) {
    return false;
  }
  const featureEnabledByQueryParams = enabledByFeatureFlag(queryParamKey);
  logger('getFeatureStatus() 1');
  const featureEnabledByCookie = enabledByCookie(queryParamKey);
  logger('getFeatureStatus() 2');
  return featureEnabledByQueryParams || featureEnabledByCookie;
}
