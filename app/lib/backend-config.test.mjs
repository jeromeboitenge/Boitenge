import test from 'node:test';
import assert from 'node:assert/strict';
import { buildBackendUrl, getBackendBaseUrl } from './backend-config.js';

test('uses the configured backend for production requests', () => {
  process.env.NEXT_PUBLIC_BACKEND_API_URL = 'https://api.example.com';
  assert.equal(getBackendBaseUrl(), 'https://api.example.com');
  assert.equal(buildBackendUrl('/api/projects'), 'https://api.example.com/api/projects');
});

test('falls back to the default Render URL when no env is set', () => {
  delete process.env.NEXT_PUBLIC_BACKEND_API_URL;
  assert.equal(getBackendBaseUrl(), 'https://portifolio-backend-ptck.onrender.com');
  assert.equal(buildBackendUrl('/api/projects'), 'https://portifolio-backend-ptck.onrender.com/api/projects');
});
