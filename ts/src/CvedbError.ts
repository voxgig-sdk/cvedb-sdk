
import { Context } from './Context'


class CvedbError extends Error {

  isCvedbError = true

  sdk = 'Cvedb'

  code: string
  ctx: Context

  constructor(code: string, msg: string, ctx: Context) {
    super(msg)
    this.code = code
    this.ctx = ctx
  }

}

export {
  CvedbError
}

