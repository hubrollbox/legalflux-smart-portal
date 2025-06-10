/**
 * Generates a base64 blur placeholder for an image using native browser APIs.
 * @param width - The width of the image.
 * @param height - The height of the image.
 * @param color - The background color for the placeholder.
 * @returns A base64 string representing the placeholder.
 */
export function generateBlurPlaceholder(width: number, height: number, color: string = '#f0f0f0'): string {
  const canvas = document.createElement('canvas');
  canvas.width = width;
  canvas.height = height;
  const ctx = canvas.getContext('2d');

  if (ctx) {
    ctx.fillStyle = color;
    ctx.fillRect(0, 0, width, height);
  }

  return canvas.toDataURL();
}
