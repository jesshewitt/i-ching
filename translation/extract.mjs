// Pull one hexagram's clean German text out of its schuledesrades.org page.
// Usage: node translation/extract.mjs <hexagram-id>
import fs from 'node:fs/promises'

const id = process.argv[2]
if (!id) { console.error('usage: node translation/extract.mjs <id>'); process.exit(1) }

const url = `https://schuledesrades.org/public/iging/buch/sdr/?Q=5|1|2|${id}`
const res = await fetch(url, { headers: { 'user-agent': 'Mozilla/5.0' } })
const html = await res.text()

const m = html.match(/<div id="contentIn">([\s\S]*?)<nav class="navi/)
if (!m) { console.error('content block not found'); process.exit(1) }
let body = m[1]

body = body.replace(/<a href="#jump\d+"[^>]*>[\s\S]*?<\/a>/g, '')
body = body.replace(/<div id="anmerkung"[\s\S]*$/g, '')
body = body.replace(/<(abbr|q|span|strong|b|i|em)[^>]*>|<\/(abbr|q|span|strong|b|i|em)>/g, '"')
body = body.replace(/<br\s*\/?>/g, '\n')
body = body.replace(/<(header|div|h[1-6]|ul|li|section|table|tr|td|th|p)[^>]*>/g, '\n')
body = body.replace(/<\/(header|div|h[1-6]|ul|li|section|table|tr|td|th|p)>/g, '\n')
body = body.replace(/<[^>]+>/g, '')
body = body.replace(/&amp;/g, '&').replace(/&quot;/g, '"').replace(/&#39;/g, "'").replace(/&nbsp;/g, ' ').replace(/&mdash;/g, '-').replace(/&ndash;/g, '-')
body = body.replace(/"+/g, '"')
body = body.split('\n').map(l => l.trim()).filter(Boolean).join('\n')

await fs.writeFile(`/tmp/hex${id}.de.txt`, body)
console.log(body)
