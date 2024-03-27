export const checkMimeType = (mimeType: string) => {
  const mimeTypeMap: Record<string, string> = {
    'application/pdf': './pdf-placeholder.png',
    'application/msword': './word-placeholder.png',
    'application/vnd.openxmlformats-officedocument.wordprocessingml.document':
      './word-placeholder.png',
    '/^image\\/.*$/': './img-placeholder.png',
    '/^(application|text)\\/.*$/': './doc-placeholder.png',
  };

  const lowercaseMimeType = mimeType.toLowerCase();

  for (const [pattern, placeholderPath] of Object.entries(mimeTypeMap)) {
    if (
      lowercaseMimeType === pattern ||
      new RegExp(pattern).test(lowercaseMimeType)
    ) {
      return placeholderPath;
    }
  }

  return './img-placeholder.png';
};
