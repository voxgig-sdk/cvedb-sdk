
const envlocal = __dirname + '/../../../.env.local'
require('dotenv').config({ quiet: true, path: [envlocal] })

import Path from 'node:path'
import * as Fs from 'node:fs'

import { test, describe, afterEach } from 'node:test'
import assert from 'node:assert'


import { CvedbSDK, BaseFeature, stdutil } from '../../..'

import {
  envOverride,
  liveDelay,
  makeCtrl,
  makeMatch,
  makeReqdata,
  makeStepData,
  makeValid,
  maybeSkipControl,
} from '../../utility'


describe('ThisEndpointIsTailoredForSearchesBasedOnProductNameOrEntity', async () => {

  // Per-test live pacing. Delay is read from sdk-test-control.json's
  // `test.live.delayMs`; only sleeps when CVEDB_TEST_LIVE=TRUE.
  afterEach(liveDelay('CVEDB_TEST_LIVE'))

  test('instance', async () => {
    const testsdk = CvedbSDK.test()
    const ent = testsdk.ThisEndpointIsTailoredForSearchesBasedOnProductNameOr()
    assert(null != ent)
  })


  test('basic', async (t) => {

    const live = 'TRUE' === process.env.CVEDB_TEST_LIVE
    for (const op of ['load']) {
      if (maybeSkipControl(t, 'entityOp', 'this_endpoint_is_tailored_for_searches_based_on_product_name_or.' + op, live)) return
    }

    const setup = basicSetup()
    // The basic flow consumes synthetic IDs and field values from the
    // fixture (entity TestData.json). Those don't exist on the live API.
    // Skip live runs unless the user provided a real ENTID env override.
    if (setup.syntheticOnly) {
      t.skip('live entity test uses synthetic IDs from fixture — set CVEDB_TEST_THIS_ENDPOINT_IS_TAILORED_FOR_SEARCHES_BASED_ON_PRODUCT_NAME_OR_ENTID JSON to run live')
      return
    }
    const client = setup.client
    const struct = setup.struct

    const isempty = struct.isempty
    const select = struct.select

    let this_endpoint_is_tailored_for_searches_based_on_product_name_or_ref01_data = Object.values(setup.data.existing.this_endpoint_is_tailored_for_searches_based_on_product_name_or)[0] as any

    // LOAD
    const this_endpoint_is_tailored_for_searches_based_on_product_name_or_ref01_ent = client.ThisEndpointIsTailoredForSearchesBasedOnProductNameOr()
    const this_endpoint_is_tailored_for_searches_based_on_product_name_or_ref01_match_dt0: any = {}
    const this_endpoint_is_tailored_for_searches_based_on_product_name_or_ref01_data_dt0 = await this_endpoint_is_tailored_for_searches_based_on_product_name_or_ref01_ent.load(this_endpoint_is_tailored_for_searches_based_on_product_name_or_ref01_match_dt0)
    assert(null != this_endpoint_is_tailored_for_searches_based_on_product_name_or_ref01_data_dt0)


  })
})



function basicSetup(extra?: any) {
  // TODO: fix test def options
  const options: any = {} // null

  // TODO: needs test utility to resolve path
  const entityDataFile =
    Path.resolve(__dirname, 
      '../../../../.sdk/test/entity/this_endpoint_is_tailored_for_searches_based_on_product_name_or/ThisEndpointIsTailoredForSearchesBasedOnProductNameOrTestData.json')

  // TODO: file ready util needed?
  const entityDataSource = Fs.readFileSync(entityDataFile).toString('utf8')

  // TODO: need a xlang JSON parse utility in voxgig/struct with better error msgs
  const entityData = JSON.parse(entityDataSource)

  options.entity = entityData.existing

  let client = CvedbSDK.test(options, extra)
  const struct = client.utility().struct
  const merge = struct.merge
  const transform = struct.transform

  let idmap = transform(
    ['this_endpoint_is_tailored_for_searches_based_on_product_name_or01','this_endpoint_is_tailored_for_searches_based_on_product_name_or02','this_endpoint_is_tailored_for_searches_based_on_product_name_or03'],
    {
      '`$PACK`': ['', {
        '`$KEY`': '`$COPY`',
        '`$VAL`': ['`$FORMAT`', 'upper', '`$COPY`']
      }]
    })

  // Detect whether the user provided a real ENTID JSON via env var. The
  // basic flow consumes synthetic IDs from the fixture file; without an
  // override those synthetic IDs reach the live API and 4xx. Surface this
  // to the test so it can skip rather than fail.
  const idmapEnvVal = process.env['CVEDB_TEST_THIS_ENDPOINT_IS_TAILORED_FOR_SEARCHES_BASED_ON_PRODUCT_NAME_OR_ENTID']
  const idmapOverridden = null != idmapEnvVal && idmapEnvVal.trim().startsWith('{')

  const env = envOverride({
    'CVEDB_TEST_THIS_ENDPOINT_IS_TAILORED_FOR_SEARCHES_BASED_ON_PRODUCT_NAME_OR_ENTID': idmap,
    'CVEDB_TEST_LIVE': 'FALSE',
    'CVEDB_TEST_EXPLAIN': 'FALSE',
    'CVEDB_APIKEY': 'NONE',
  })

  idmap = env['CVEDB_TEST_THIS_ENDPOINT_IS_TAILORED_FOR_SEARCHES_BASED_ON_PRODUCT_NAME_OR_ENTID']

  const live = 'TRUE' === env.CVEDB_TEST_LIVE

  if (live) {
    client = new CvedbSDK(merge([
      {
        apikey: env.CVEDB_APIKEY,
      },
      extra
    ]))
  }

  const setup = {
    idmap,
    env,
    options,
    client,
    struct,
    data: entityData,
    explain: 'TRUE' === env.CVEDB_TEST_EXPLAIN,
    live,
    syntheticOnly: live && !idmapOverridden,
    now: Date.now(),
  }

  return setup
}
  
