export const mimeType = (extensions = ['*']) => {
  // @TODO handle other MIME types.
  const mimes = extensions.map((ext) => {
    return `image/${ext}`;
  });
  return mimes.join(', ');
};
