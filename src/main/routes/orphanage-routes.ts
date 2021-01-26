import { Router } from 'express'

export default (router: Router): void => {
  router.post('/orphanage', (req, res) => {
    res.json({ ok: 'ok' })
  })
}
