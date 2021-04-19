import config from '../config';

export const evaluatePlatform = platform => {
  if (platform === 'ios') {
    const url = `${config.URL_IOS}${config.API_CLIENTS}`;
    return url;
  }
  const url = `${config.URL_ANDROID}${config.API_CLIENTS}`;
  return url;
};

export default {
  evaluatePlatform,
};
