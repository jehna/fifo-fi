import test from "ava"
import { calculateGains, Ledger } from "."
import { utcDate } from "./testutils"

// Sourced from:
// https://www.vero.fi/en/detailed-guidance/guidance/48411/taxation-of-virtual-currencies3/#:~:text=Example%202

const initialLedger: Ledger = [
  {
    id: "1",
    timestamp: utcDate("2020-01-01"),
    from: { amount: 1_000, symbol: "EUR", unitPriceEur: 1 },
    to: { amount: 200, symbol: "A", unitPriceEur: 5 },
  },
  {
    id: "2",
    timestamp: utcDate("2020-02-01"),
    from: { amount: 100, symbol: "A", unitPriceEur: 10 },
    to: { amount: 1_000, symbol: "EUR", unitPriceEur: 1 },
  },
]

test("Example 2.1", (t) => {
  t.is(
    calculateGains(utcDate("2019-12-31"), utcDate("2020-02-01"), initialLedger),
    500
  )
})
