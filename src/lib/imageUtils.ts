import { createCanvas } from 'canvas';

/**
 * Generates a base64 blur placeholder for an image.
 * @param width - The width of the image.
 * @param height - The height of the image.
 * @param color - The background color for the placeholder.
 * @returns A base64 string representing the placeholder.
 */
export function generateBlurPlaceholder(width: number, height: number, color: string = '#f0f0f0'): string {
  const canvas = createCanvas(width, height);
  const ctx = canvas.getContext('2d');

  ctx.fillStyle = color;
  ctx.fillRect(0, 0, width, height);

  return canvas.toDataURL();
}
