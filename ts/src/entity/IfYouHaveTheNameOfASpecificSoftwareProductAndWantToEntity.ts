
import { inspect } from 'node:util'

import { CvedbEntityBase } from '../CvedbEntityBase'

import type {
  CvedbSDK,
} from '../CvedbSDK'


import type {
  Operation,
  Context,
  Control,
} from '../types'


// TODO: needs Entity superclass
class IfYouHaveTheNameOfASpecificSoftwareProductAndWantToEntity extends CvedbEntityBase {

  constructor(client: CvedbSDK, entopts: any) {
    super(client, entopts)
    this.name = 'if_you_have_the_name_of_a_specific_software_product_and_want_to'
    this.name_ = 'if_you_have_the_name_of_a_specific_software_product_and_want_to'
    this.Name = 'IfYouHaveTheNameOfASpecificSoftwareProductAndWantTo'
  }


  make(this: IfYouHaveTheNameOfASpecificSoftwareProductAndWantToEntity) {
    return new IfYouHaveTheNameOfASpecificSoftwareProductAndWantToEntity(this._client, this.entopts())
  }



  async load(this: any, reqmatch?: any, ctrl?: Control) {

    const utility = this._utility

    const {
      makeContext,
      done,
      error,
      featureHook,
      makePoint,
      makeRequest,
      makeResponse,
      makeResult,
      makeSpec,
    } = utility

    let fres: Promise<any> | undefined = undefined

    let ctx: Context = makeContext({
      opname: 'load',
      ctrl,
      match: this._match,
      data: this._data,
      reqmatch
    }, this._entctx)

    try {

      fres = featureHook(ctx, 'PrePoint')
      if (fres instanceof Promise) { await fres }

      ctx.out.point = makePoint(ctx)
      if (ctx.out.point instanceof Error) {
        return error(ctx, ctx.out.point)
      }



      fres = featureHook(ctx, 'PreSpec')
      if (fres instanceof Promise) { await fres }

      ctx.out.spec = makeSpec(ctx)
      if (ctx.out.spec instanceof Error) {
        return error(ctx, ctx.out.spec)
      }



      fres = featureHook(ctx, 'PreRequest')
      if (fres instanceof Promise) { await fres }

      ctx.out.request = await makeRequest(ctx)
      if (ctx.out.request instanceof Error) {
        return error(ctx, ctx.out.request)
      }



      fres = featureHook(ctx, 'PreResponse')
      if (fres instanceof Promise) { await fres }

      ctx.out.response = await makeResponse(ctx)
      if (ctx.out.response instanceof Error) {
        return error(ctx, ctx.out.response)
      }



      fres = featureHook(ctx, 'PreResult')
      if (fres instanceof Promise) { await fres }

      ctx.out.result = await makeResult(ctx)
      if (ctx.out.result instanceof Error) {
        return error(ctx, ctx.out.result)
      }



      fres = featureHook(ctx, 'PreDone')
      if (fres instanceof Promise) { await fres }

      if (null != ctx.result) {
        if (null != ctx.result.resmatch) {
          this._match = ctx.result.resmatch
        }

        if (null != ctx.result.resdata) {
          this._data = ctx.result.resdata
        }
      }

      return done(ctx)
    }
    catch (err: any) {

      fres = featureHook(ctx, 'PreUnexpected')
      if (fres instanceof Promise) { await fres }

      err = this._unexpected(ctx, err)

      if (err) {
        throw err
      }
      else {
        return undefined
      }
    }
  }






}


export {
  IfYouHaveTheNameOfASpecificSoftwareProductAndWantToEntity
}
