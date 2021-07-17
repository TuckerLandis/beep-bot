// add two integers
// add decimals
// add negative
// add string
// one number?
// string 'ten'

import sum from './add.js'

test('Add 2 Integers', () => {
    expect(sum(1,2)).toBe(3)
})

test('Add 2 Decimals', () => {
    expect(sum(1.2, 2.2)).toBe(3.4)
})

test('Add negatives', () => {
    expect(sum(-1, 2)).toBe(1)
})

test('Add strings', () => {
    expect(sum('1', '2')).toBe(3)
})

test('Add one', () => {
    expect(sum('1')).toBe(1)
})

test(`Add string 'ten'`, () => {
    expect(sum('ten', 2)).toBe(NaN)
})