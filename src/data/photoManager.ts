import type { Photo } from './photos';

export type PhotoSectionKey = 'portfolio' | 'personal';

export interface ManagedPhotoUpdate {
  section: PhotoSectionKey;
  photo: Photo;
  position?: number;
}

export const generatePhotoId = (prefix = 'photo') => `${prefix}-${Date.now()}`;

export function insertPhoto(
  photos: Photo[],
  photo: Photo,
  position?: number
): Photo[] {
  if (position === undefined || position < 0 || position > photos.length) {
    return [...photos, photo];
  }

  return [...photos.slice(0, position), photo, ...photos.slice(position)];
}

export function removePhoto(photos: Photo[], id: string): Photo[] {
  return photos.filter((photo) => photo.id !== id);
}

export function movePhoto(
  photos: Photo[],
  id: string,
  direction: 'up' | 'down'
): Photo[] {
  const index = photos.findIndex((photo) => photo.id === id);
  if (index === -1) return photos;

  const targetIndex = direction === 'up' ? index - 1 : index + 1;
  if (targetIndex < 0 || targetIndex >= photos.length) return photos;

  const updated = [...photos];
  const [item] = updated.splice(index, 1);
  updated.splice(targetIndex, 0, item);
  return updated;
}
