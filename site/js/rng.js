// xmur3: hashes a string into a 32-bit state, used to seed mulberry32.
function xmur3(str) {
    let h = 1779033703 ^ str.length
    for (let i = 0; i < str.length; i++) {
        h = Math.imul(h ^ str.charCodeAt(i), 3432918353)
        h = (h << 13) | (h >>> 19)
    }
    return () => {
        h = Math.imul(h ^ (h >>> 16), 2246822507)
        h = Math.imul(h ^ (h >>> 13), 3266489909)
        h ^= h >>> 16
        return h >>> 0
    }
}

// mulberry32: small, fast seeded PRNG producing floats in [0, 1).
function mulberry32(seed) {
    return () => {
        seed = (seed + 0x6D2B79F5) | 0
        let t = seed
        t = Math.imul(t ^ (t >>> 15), t | 1)
        t ^= t + Math.imul(t ^ (t >>> 7), t | 61)
        return ((t ^ (t >>> 14)) >>> 0) / 4294967296
    }
}

export function seeded(seed) {
    return mulberry32(xmur3(String(seed))())
}
