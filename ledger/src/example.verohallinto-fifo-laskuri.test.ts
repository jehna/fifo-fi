import test from "ava"
import { calculateGains, Ledger } from "."
import { utcDate } from "./testutils"

// Sourced from:
// https://www.vero.fi/tietoa-verohallinnosta/yhteystiedot-ja-asiointi/asioi-verkossa/verohallinnon_laskuri/fifo-laskuri/
// (downloadable excel-file, version 1.1)

const initialLedger: Ledger = [
  {
    id: "1",
    timestamp: utcDate("2016-01-01"),
    from: { symbol: "EUR", amount: 1_000, unitPriceEur: 1 },
    to: { symbol: "BTC", unitPriceEur: 1_000, amount: 1 },
  },
  {
    id: "2",
    timestamp: utcDate("2016-01-02"),
    from: { symbol: "EUR", amount: 1_500, unitPriceEur: 1 },
    to: { symbol: "BTC", unitPriceEur: 1_500, amount: 1 },
  },
  {
    id: "3",
    timestamp: utcDate("2016-11-01"),
    from: { symbol: "BTC", amount: 0.5, unitPriceEur: 2_000 },
    to: { symbol: "EUR", amount: 1_000, unitPriceEur: 1 },
  },
  {
    id: "4",
    timestamp: utcDate("2017-12-01"),
    from: { symbol: "BTC", amount: 1, unitPriceEur: 10_000 },
    to: { symbol: "EUR", amount: 10_000, unitPriceEur: 1 },
  },
  {
    id: "5",
    timestamp: utcDate("2017-12-30"),
    from: { symbol: "BTC", amount: 0.3, unitPriceEur: 500 },
    to: { symbol: "EUR", amount: 150, unitPriceEur: 1 },
  },
]

test("'Ohje laskurin käyttämiseen' -tab example", (t) => {
  t.is(
    calculateGains(utcDate("2015-12-31"), utcDate("2016-12-31"), initialLedger),
    500
  )
  t.is(
    calculateGains(utcDate("2016-12-31"), utcDate("2017-12-31"), initialLedger),
    7700
  )
})
