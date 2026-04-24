import test from 'node:test'
import assert from 'node:assert/strict'
import {seeded} from '../site/js/rng.js'
import hexagrams from '../site/data/hexagrams.json' with { type: 'json' }

test('seeded rng is deterministic for the same seed', () => {
    const a = seeded('42')
    const b = seeded('42')
    for (let i = 0; i < 20; i++) assert.equal(a(), b())
})

test('seeded rng differs across seeds', () => {
    const a = seeded('42')
    const b = seeded('43')
    const aOut = Array.from({length: 10}, () => a())
    const bOut = Array.from({length: 10}, () => b())
    assert.notDeepEqual(aOut, bOut)
})

test('coin-flip output is pinned for seed 42', () => {
    // Mirror Reading.getLines — tests the full rng + flip chain end-to-end.
    // If this breaks, previously bookmarked /reading/42 URLs will return different hexagrams.
    const rand = seeded('42')
    let lines = ''
    for (let i = 0; i < 6; i++) {
        let sum = 0
        for (let j = 0; j < 3; j++) {
            rand() < 0.5 ? sum += 2 : sum += 3
        }
        lines += sum.toString()
    }
    assert.equal(lines, '686887')
})

test('hexagrams data shape is intact', () => {
    assert.equal(hexagrams.length, 64)
    const values = new Set()
    for (const h of hexagrams) {
        assert.ok(h.id >= 1 && h.id <= 64, `id out of range: ${h.id}`)
        assert.match(h.value, /^[78]{6}$/, `invalid value: ${h.value}`)
        assert.ok(typeof h.cename === 'string' && h.cename.length > 0, `cename missing on ${h.id}`)
        assert.ok(typeof h.ename === 'string' && h.ename.length > 0, `ename missing on ${h.id}`)
        assert.ok(Array.isArray(h.lines), `lines missing on ${h.id}`)
        assert.ok(Array.isArray(h.linesCommentary), `linesCommentary missing on ${h.id}`)
        values.add(h.value)
    }
    assert.equal(values.size, 64, 'hexagram values must all be unique')
})
