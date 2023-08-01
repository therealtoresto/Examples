const { addNumbers } = require('./5-jest.js');

test('Additional two numbers', () => {
    expect(addNumbers(1, 2)).toBe(3);
});

test('object assignment', () => {
    const obj = {
        name: 'Pavlo',
        email: 'pavlo@gmail.com'
    }
    obj['username'] = 'pavlo_111';
    expect(obj).toEqual({ name: 'Pavlo', email: 'pavlo@gmail.com', username: 'pavlo_111' });
});

test('Match null', () => {
    const result = null;
    expect(result).toBeNull();
    expect(result).toBeDefined();
    expect(result).not.toBeUndefined();
    expect(result).toBeFalsy();
});

test('Numbers matching', () => {
    const result = 1 + 2;

    expect(result).toBeGreaterThan(1);
    expect(result).toBeGreaterThanOrEqual(3);
    expect(result).toBeLessThan(10);
});

const array = [
    'cat', 'dog', 'fish', 'bird', 'human'
];

test('Array matching', () => {
    expect(array).toContain('fish');
})