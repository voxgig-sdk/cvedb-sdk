
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


describe('IfYouHaveTheNameOfASpecificSoftwareProductAndWantToEntity', async () => {

  // Per-test live pacing. Delay is read from sdk-test-control.json's
  // `test.live.delayMs`; only sleeps when CVEDB_TEST_LIVE=TRUE.
  afterEach(liveDelay('CVEDB_TEST_LIVE'))

  test('instance', async () => {
    const testsdk = CvedbSDK.test()
    const ent = testsdk.IfYouHaveTheNameOfASpecificSoftwareProductAndWantTo()
    assert(null != ent)
  })


  test('basic', async (t) => {

    const live = 'TRUE' === process.env.CVEDB_TEST_LIVE
    for (const op of ['load']) {
      if (maybeSkipControl(t, 'entityOp', 'if_you_have_the_name_of_a_specific_software_product_and_want_to.' + op, live)) return
    }

    const setup = basicSetup()
    // The basic flow consumes synthetic IDs and field values from the
    // fixture (entity TestData.json). Those don't exist on the live API.
    // Skip live runs unless the user provided a real ENTID env override.
    if (setup.syntheticOnly) {
      t.skip('live entity test uses synthetic IDs from fixture — set CVEDB_TEST_IF_YOU_HAVE_THE_NAME_OF_A_SPECIFIC_SOFTWARE_PRODUCT_AND_WANT_TO_ENTID JSON to run live')
      return
    }
    const client = setup.client
    const struct = setup.struct

    const isempty = struct.isempty
    const select = struct.select

    let if_you_have_the_name_of_a_specific_software_product_and_want_to_ref01_data = Object.values(setup.data.existing.if_you_have_the_name_of_a_specific_software_product_and_want_to)[0] as any

    // LOAD
    const if_you_have_the_name_of_a_specific_software_product_and_want_to_ref01_ent = client.IfYouHaveTheNameOfASpecificSoftwareProductAndWantTo()
    const if_you_have_the_name_of_a_specific_software_product_and_want_to_ref01_match_dt0: any = {}
    const if_you_have_the_name_of_a_specific_software_product_and_want_to_ref01_data_dt0 = await if_you_have_the_name_of_a_specific_software_product_and_want_to_ref01_ent.load(if_you_have_the_name_of_a_specific_software_product_and_want_to_ref01_match_dt0)
    assert(null != if_you_have_the_name_of_a_specific_software_product_and_want_to_ref01_data_dt0)


  })
})



function basicSetup(extra?: any) {
  // TODO: fix test def options
  const options: any = {} // null

  // TODO: needs test utility to resolve path
  const entityDataFile =
    Path.resolve(__dirname, 
      '../../../../.sdk/test/entity/if_you_have_the_name_of_a_specific_software_product_and_want_to/IfYouHaveTheNameOfASpecificSoftwareProductAndWantToTestData.json')

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
    ['if_you_have_the_name_of_a_specific_software_product_and_want_to01','if_you_have_the_name_of_a_specific_software_product_and_want_to02','if_you_have_the_name_of_a_specific_software_product_and_want_to03'],
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
  const idmapEnvVal = process.env['CVEDB_TEST_IF_YOU_HAVE_THE_NAME_OF_A_SPECIFIC_SOFTWARE_PRODUCT_AND_WANT_TO_ENTID']
  const idmapOverridden = null != idmapEnvVal && idmapEnvVal.trim().startsWith('{')

  const env = envOverride({
    'CVEDB_TEST_IF_YOU_HAVE_THE_NAME_OF_A_SPECIFIC_SOFTWARE_PRODUCT_AND_WANT_TO_ENTID': idmap,
    'CVEDB_TEST_LIVE': 'FALSE',
    'CVEDB_TEST_EXPLAIN': 'FALSE',
  })

  idmap = env['CVEDB_TEST_IF_YOU_HAVE_THE_NAME_OF_A_SPECIFIC_SOFTWARE_PRODUCT_AND_WANT_TO_ENTID']

  const live = 'TRUE' === env.CVEDB_TEST_LIVE

  if (live) {
    client = new CvedbSDK(merge([
      {
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
  
