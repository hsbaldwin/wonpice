import { test } from 'node:test';
import assert from 'node:assert/strict';
import { clampWindowIndex, firstInvalidMeasurement } from '../lib/helper-navigation';
import { newRoom, newWindow, validateRooms } from '../lib/quote';

test('validation locates the first hidden invalid window in document order', () => {
  const rooms = [newRoom('living'), newRoom('bedroom')];
  rooms[0].windows.push(newWindow(), newWindow());
  rooms[1].windows.push(newWindow());
  for (const room of rooms)
    for (const measurement of room.windows) {
      measurement.width = '360';
      measurement.height = '240';
    }
  rooms[0].windows[1].height = '0';
  rooms[1].windows[0].width = '';
  assert.deepEqual(firstInvalidMeasurement(rooms, validateRooms(rooms)), {
    roomIndex: 0,
    windowIndex: 1,
    inputId: `${rooms[0].windows[1].id}-height`,
  });
  // Fixing that field moves to the next invalid room, without dropping any windows.
  rooms[0].windows[1].height = '240.5';
  assert.deepEqual(firstInvalidMeasurement(rooms, validateRooms(rooms)), {
    roomIndex: 1,
    windowIndex: 0,
    inputId: `${rooms[1].windows[0].id}-width`,
  });
  rooms[1].windows[0].width = '280';
  assert.equal(firstInvalidMeasurement(rooms, validateRooms(rooms)), null);
  assert.deepEqual(
    rooms.map((room) => room.windows.length),
    [3, 2],
  );
});

test('both missing dimensions focus width first and window selection remains in bounds', () => {
  const rooms = [newRoom()];
  assert.equal(
    firstInvalidMeasurement(rooms, validateRooms(rooms))?.inputId,
    `${rooms[0].windows[0].id}-width`,
  );
  assert.equal(clampWindowIndex(19, 20), 19);
  assert.equal(clampWindowIndex(19, 1), 0);
  assert.equal(clampWindowIndex(2, 2), 1);
  assert.equal(clampWindowIndex(-1, 1), 0);
});
