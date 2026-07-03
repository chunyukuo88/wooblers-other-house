export const getStyle = (fontColor: string) => {
  const shadowColor = !fontColor ? 'gray' : 'black';

  const textShadow =
    fontColor !== 'black'
      ? `-1px -1px 0 ${shadowColor}, ` +
        `1px -1px 0 ${shadowColor}, ` +
        `-1px 1px 0 ${shadowColor}, ` +
        `1px 1px 0 ${shadowColor}`
      : undefined;

  return {
    color: fontColor,
    transition: '2s ease-in',
    fontSize: '1.25rem',
    textShadow,
    fontWeight: 700,
  };
};
