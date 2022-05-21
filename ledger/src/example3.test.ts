import test from "ava"
import { calculateGains, Ledger } from "."
import { eq, utcDate } from "./testutils"
import { toComputedLedger } from "./to-computed-ledger"

// Sourced from:
// https://www.vero.fi/en/detailed-guidance/guidance/48411/taxation-of-virtual-currencies3/#:~:text=Example%203

const initialLedger: Ledger = [
  {
    id: "1",
    timestamp: utcDate("2020-01-01"),
    from: { amount: 10_000, symbol: "EUR", unitPriceEur: 1 },
    to: { amount: 10, symbol: "B", unitPriceEur: 1_000 },
  },
  {
    id: "2",
    timestamp: utcDate("2020-02-01"),
    from: { amount: 1, symbol: "B", unitPriceEur: 500 },
    to: { amount: 500, symbol: "EUR", unitPriceEur: 1 },
  },
]

test("Example 3.1", (t) => {
  t.is(
    calculateGains(utcDate("2019-12-31"), utcDate("2020-02-01"), initialLedger)
      .gains,
    -500
  )

  eq(t, toComputedLedger(initialLedger).left["B"], [
    {
      item: initialLedger[0],
      amount: 9,
      purchaseTimestamp: utcDate("2020-01-01"),
      unitPriceEur: 1000,
    },
  ])
})

const ledger2: Ledger = [
  ...initialLedger,
  {
    id: "3",
    timestamp: utcDate("2020-03-01"),
    from: { symbol: "B", amount: 9, unitPriceEur: 10_000 },
    to: { symbol: "EUR", amount: 90_000, unitPriceEur: 1 },
    fee: { symbol: "EUR", amount: 1_000, unitPriceEur: 1 },
  },
]

test("Example 3.2", (t) => {
  t.is(
    calculateGains(utcDate("2020-02-01"), utcDate("2020-03-01"), ledger2).gains,
    72_000
  )
})

const ledger2_10YearVersion: Ledger = [
  ...initialLedger,
  {
    id: "4",
    timestamp: utcDate("2030-03-01"),
    from: { symbol: "B", amount: 9, unitPriceEur: 10_000 },
    to: { symbol: "EUR", amount: 90_000, unitPriceEur: 1 },
    fee: { symbol: "EUR", amount: 1_000, unitPriceEur: 1 },
  },
]

test("Example 3.2, but hold for over 10 years", (t) => {
  t.is(
    calculateGains(
      utcDate("2020-02-01"),
      utcDate("2030-03-01"),
      ledger2_10YearVersion
    ).gains,
    54_000
  )
})
