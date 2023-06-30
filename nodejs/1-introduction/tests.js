import test from 'node:test'
import assert from 'node:assert';

console.log('Tests runed');

test('synchronous passing test', () => {
    // This test passes because it does not throw an exception.
    assert.strictEqual(1, 1);
  });

console.log('Result: ok!');