import type { Room } from './types';

/** Locate errors in document order, regardless of the currently displayed pane. */
export function firstInvalidMeasurement(rooms: Room[], errors: Record<string, string>) {
  for (const [roomIndex, room] of rooms.entries()) {
    for (const [windowIndex, measurement] of room.windows.entries()) {
      for (const field of ['width', 'height'] as const) {
        const inputId = `${measurement.id}-${field}`;
        if (errors[inputId]) return { roomIndex, windowIndex, inputId };
      }
    }
  }
  return null;
}

export function clampWindowIndex(index: number, windowCount: number) {
  return Math.max(0, Math.min(index, windowCount - 1));
}
