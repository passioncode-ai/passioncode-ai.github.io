// A D1-shaped database over node:sqlite for the Worker's unit tests, with the real
// migrations applied. Only the calls the Worker makes: prepare/bind/first/all/run and batch.
import { readdirSync, readFileSync } from 'node:fs'
import { resolve } from 'node:path'
import { DatabaseSync } from 'node:sqlite'

export function d1 () {
  const db = new DatabaseSync(':memory:')
  const dir = resolve(import.meta.dirname, '..', 'migrations')
  for (const file of readdirSync(dir).filter(f => f.endsWith('.sql')).sort()) db.exec(readFileSync(resolve(dir, file), 'utf8'))
  const statement = (sql, params = []) => ({
    bind: (...values) => statement(sql, values),
    first: async () => db.prepare(sql).get(...params) ?? null,
    all: async () => ({ results: db.prepare(sql).all(...params) }),
    run: async () => { const r = db.prepare(sql).run(...params); return { meta: { changes: r.changes } } },
    _run: () => db.prepare(sql).run(...params)
  })
  return {
    raw: db,
    prepare: sql => statement(sql),
    batch: async statements => { db.exec('BEGIN'); try { for (const s of statements) s._run(); db.exec('COMMIT') } catch (e) { db.exec('ROLLBACK'); throw e } }
  }
}
