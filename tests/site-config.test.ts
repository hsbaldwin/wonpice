import test from 'node:test';
import assert from 'node:assert/strict';
import { resolveSiteUrl } from '../lib/site';

test('public publication requires a real HTTPS domain origin before metadata can be built', () => {
  assert.equal(resolveSiteUrl('https://curtain.wonpice.com/', true), 'https://curtain.wonpice.com');
  for (const url of [
    undefined,
    '',
    'not a URL',
    'http://curtain.wonpice.com',
    'https://localhost',
    'https://curtain.localhost',
    'https://curtain.local',
    'https://curtain.internal',
    'https://localhost.',
    'https://intranet',
    'https://127.0.0.1',
    'https://0x7f000001',
    'https://192.168.1.10',
    'https://[::1]',
    'https://[fc00::1]',
    'https://user:password@curtain.wonpice.com',
    'https://curtain.wonpice.com:3000',
    'https://curtain.wonpice.com/guides',
    'https://curtain.wonpice.com/?preview=1',
    'https://curtain.wonpice.com/#main',
    'https://curtain.wonpice.com?',
    ' https://curtain.wonpice.com',
  ]) {
    assert.throws(
      () => resolveSiteUrl(url, true),
      /SITE_INDEXABLE=true requires NEXT_PUBLIC_SITE_URL/,
    );
  }
});

test('preview publication retains its local development origin', () => {
  assert.equal(resolveSiteUrl(undefined, false), 'http://localhost:3000');
  assert.equal(resolveSiteUrl('http://127.0.0.1:3107', false), 'http://127.0.0.1:3107');
});
