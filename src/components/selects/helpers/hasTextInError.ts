export const hasTextInError = (error?: boolean | string) => {
  if (!error || error === true) {
    return false;
  }

  return true;
};
