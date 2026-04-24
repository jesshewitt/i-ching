# Wilhelm translation style guide

Working notes for translating Richard Wilhelm's 1924 German text (*I Ging: Das Buch der Wandlungen*) into fresh English. The goal is accuracy to Wilhelm, not mimicry of the 1950 Baynes English version.

Translated by Claude (Anthropic), 2026, from Wilhelm's 1924 German. Edited by Jess Hewitt. The translation is released into the public domain under CC0 1.0 Universal; see `LICENSE-translation` at the repo root for the full notice.

## Register

- Formal but not archaic. No "thee", "thou", "unto", or KJV flavour.
- Preserve Wilhelm's slightly aphoristic quality where the German is aphoristic.
- Prose should sound like a 20th century educated German speaker rendered faithfully into modern English. Think "translated essay" not "rewritten oracle".
- **Gender-neutral pronouns** for *der Edle*, *der Weise*, and generic *der Mensch*: use singular "they / them / their / themself". Wilhelm's German is grammatically masculine but conceptually gender-neutral, and modern English can reflect that without violence to the text. Exception: when a specific gendered figure is named (a bride, a father, a king), keep the gender.

## Core terminology

Wilhelm's choices are sometimes different from conventional sinological English. Follow Wilhelm, not Baynes.

| German | English | Notes |
|---|---|---|
| der Edle | the noble one | Wilhelm's rendering of 君子 (jūnzǐ). Do *not* use Baynes's "superior man". |
| der große Mann | the great man | Wilhelm's rendering of 大人 (dàrén). |
| der Weise | the sage | For 聖人 (shèngrén). |
| das Schöpferische | the Creative | Das Schöpferische always capitalised when referring to the hexagram/principle. |
| das Empfangende | the Receptive | Same. |
| Gelingen | success | Consistent across all hexagrams. |
| Beharrlichkeit | perseverance | Consistent. |
| Heil! | good fortune! | For 吉 (jí). Keep as exclamation if Wilhelm has it. |
| Unheil | misfortune | For 凶 (xiōng). |
| Makel | blame | "Kein Makel" -> "No blame" (for 無咎). |
| Reue | remorse | For 悔. |
| fördernd | favorable, furthering | "Fördernd ist es, den großen Mann zu sehen" -> "It is favorable to see the great man". |
| Urkraft | primal force | |
| Urtiefen | primal depths | |

## Structural phrases

The line headers are formulaic. Keep them consistent across all 64 hexagrams:

| German | English |
|---|---|
| Anfangs eine Neun bedeutet | A nine at the beginning means |
| Neun auf zweitem Platz bedeutet | A nine in the second place means |
| Neun auf drittem Platz bedeutet | A nine in the third place means |
| Neun auf viertem Platz bedeutet | A nine in the fourth place means |
| Neun auf fünftem Platz bedeutet | A nine in the fifth place means |
| Oben eine Neun bedeutet | A nine at the top means |
| Anfangs eine Sechs bedeutet | A six at the beginning means |
| Sechs auf zweitem Platz bedeutet | A six in the second place means |
| (etc.) | |
| Wenn lauter Neunen erscheinen, bedeutet das | When all lines are nines, this means |
| Wenn lauter Sechsen erscheinen, bedeutet das | When all lines are sixes, this means |

Section labels:

| German | English |
|---|---|
| Das Urteil | The Judgment |
| Das Bild | The Image |
| Die einzelnen Linien | The Lines |

## Trigram names

Wilhelm uses German-phonetic transliterations (Kiën, Dschen, Gen, Dui). In the translation, render trigram names in the English Wade-Giles form used elsewhere in this app:

| Wilhelm German | This app |
|---|---|
| Kiën | Ch'ien |
| Dschen | Chen |
| Kan | K'an |
| Gen | Ken |
| Kun | K'un |
| Sun | Sun |
| Li | Li |
| Dui | Tui |

## Quoted material

Wilhelm frequently quotes **Kungtse** (Confucius) and other classical sources. Keep these as English-language block quotes in the translated commentary. Attribute to "Confucius" rather than "Kungtse" in running prose unless the German specifically marks the name as the speaker.

## Punctuation

- German quotation marks «...» or "..." -> English double quotes "..."
- German comma/clause rules differ; restructure freely for English flow.
- Keep German's `»... ...«` nested quoting pattern as English `"... '...' ..."` where needed.
- Do **not** use em dashes (-). Use hyphens or restructure the sentence.

## Footnotes

Wilhelm's prose includes author-supplied footnotes marked `*`, `**`, `***`, explaining e.g. seasonal associations or cross-references to Genesis. For the app, drop the footnotes (they're scholarly apparatus not part of the oracle). We can reinstate them as a separate field later if desired.

## JSON field mapping

The Wilhelm German page structure maps onto existing Baynes JSON fields as follows:

| Baynes field | Wilhelm German source |
|---|---|
| `commentary` | Opening paragraphs describing the hexagram (before Das Urteil) |
| `judgment` | Short verse under "Das Urteil" header |
| `judgmentCommentary` | All prose paragraphs between Das Urteil and Das Bild |
| `image` | Short verse under "Das Bild" header |
| `imageCommentary` | All prose paragraphs between Das Bild and Die einzelnen Linien |
| `lines[0..5]` | The six short line texts (under each "Neun auf ... bedeutet") |
| `lines[6]` | The "Wenn lauter Neunen/Sechsen erscheinen" short text (only for Hexagrams 1 and 2) |
| `linesCommentary[0..5]` | The prose commentary under each line |
| `linesCommentary[6]` | The prose commentary under the all-nines/all-sixes text (only for Hexagrams 1 and 2) |

Hexagrams 1 and 2 are the only two with an "all same lines" variant, so only those entries have 7-element `lines` and `linesCommentary` arrays. All other hexagrams have 6 of each.

## Scope

Currently covering Book 1 only (Der Text). Book 3 (Die Kommentare) is deeper philosophical commentary not present in the Baynes JSON and not in scope for this translation pass.
