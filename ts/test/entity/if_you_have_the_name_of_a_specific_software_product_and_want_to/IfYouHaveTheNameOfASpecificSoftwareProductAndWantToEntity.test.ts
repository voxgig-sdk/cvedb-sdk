

import Path from 'node:path'
import * as Fs from 'node:fs'

import { test, describe, afterEach } from 'node:test'
import assert from 'node:assert'
import { createLiveTransport } from '../../live-runner'
import { runLiveEntity } from '../../live-entity'


import { CvedbSDK, BaseFeature, stdutil } from '../../..'

import {
  envOverride,
  liveClientOptions,
  liveDelay,
  loadEnvLocal,
  makeCtrl,
  makeMatch,
  makeReqdata,
  makeStepData,
  makeValid,
  maybeSkipControl,
} from '../../utility'


// AFTER the imports on purpose: TypeScript hoists `import` above any
// statement in the emitted CommonJS, so a loader placed above them would
// run only after every imported module had already been evaluated - and
// anything reading process.env at module scope would miss these values.
loadEnvLocal(__dirname + '/../../../.env.local')


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
      if (!live && maybeSkipControl(t, 'entityOp', 'if_you_have_the_name_of_a_specific_software_product_and_want_to.' + op, live)) return
    }

    
    const setup = basicSetup()
    if (setup.live) {
      return runLiveEntity(setup, {"active":true,"alias":{"field":{}},"fields":[],"name":"if_you_have_the_name_of_a_specific_software_product_and_want_to","op":{"load":{"input":"data","name":"load","points":[{"active":true,"args":{"query":[{"active":true,"example":false,"kind":"query","name":"count","orig":"count","reqd":false,"type":"`$BOOLEAN`","index$":0},{"active":true,"example":1000,"kind":"query","name":"limit","orig":"limit","reqd":false,"type":"`$INTEGER`","index$":1},{"active":true,"kind":"query","name":"product","orig":"product","reqd":true,"type":"`$STRING`","index$":2},{"active":true,"example":0,"kind":"query","name":"skip","orig":"skip","reqd":false,"type":"`$INTEGER`","index$":3}]},"contract":{"id":"GET /cpes","json":"{\"operationId\":\"info_cpes_get\",\"parameters\":[{\"in\":\"query\",\"name\":\"product\",\"required\":true,\"schema\":{\"title\":\"Product\",\"type\":\"string\"}},{\"in\":\"query\",\"name\":\"count\",\"required\":false,\"schema\":{\"default\":false,\"title\":\"Count\",\"type\":\"boolean\"}},{\"in\":\"query\",\"name\":\"skip\",\"required\":false,\"schema\":{\"default\":0,\"title\":\"Skip\",\"type\":\"integer\"}},{\"in\":\"query\",\"name\":\"limit\",\"required\":false,\"schema\":{\"default\":1000,\"title\":\"Limit\",\"type\":\"integer\"}}],\"protocol\":\"http\",\"responses\":{\"200\":{\"content\":{\"application/json\":{\"schema\":{\"anyOf\":[{\"properties\":{\"cpes\":{\"description\":\"A dictionary of specific CPE version 2.3 identifiers. This dictionary serves as a valuable resource for systematically identifying and categorizing potentially affected software and hardware when assessing vulnerabilities.\",\"items\":{\"type\":\"string\"},\"title\":\"Cpes\",\"type\":\"array\"}},\"required\":[\"cpes\"],\"title\":\"CPEs\",\"type\":\"object\"},{\"properties\":{\"total\":{\"anyOf\":[{\"type\":\"integer\"},{\"type\":\"null\"}],\"description\":\"The total count of CPE identifiers that match a given query. This provides a overview of the number of distinct products or components identified as potentially vulnerable, allowing for a broad assessment of exposure risk.\",\"title\":\"Total\"}},\"title\":\"CPEsTotal\",\"type\":\"object\"}],\"title\":\"Response Info Cpes Get\"}}},\"description\":\"Successful Response\"},\"422\":{\"content\":{\"application/json\":{\"schema\":{\"properties\":{\"detail\":{\"items\":{\"properties\":{\"loc\":{\"items\":{\"anyOf\":[{\"type\":\"string\"},{\"type\":\"integer\"}]},\"title\":\"Location\",\"type\":\"array\"},\"msg\":{\"title\":\"Message\",\"type\":\"string\"},\"type\":{\"title\":\"Error Type\",\"type\":\"string\"}},\"required\":[\"loc\",\"msg\",\"type\"],\"title\":\"ValidationError\",\"type\":\"object\"},\"title\":\"Detail\",\"type\":\"array\"}},\"title\":\"HTTPValidationError\",\"type\":\"object\"}}},\"description\":\"Validation Error\"}},\"securitySource\":\"unspecified\"}","source":"openapi3","version":1},"kind":"http","method":"GET","orig":"/cpes","segments":[{"lit":"cpes"}],"select":{"exist":["count","limit","product","skip"]},"transform":{"req":"`reqdata`","res":"`body`"},"index$":0}],"key$":"load"}},"relations":{"ancestors":[]},"key$":"if_you_have_the_name_of_a_specific_software_product_and_want_to","name__orig":"if_you_have_the_name_of_a_specific_software_product_and_want_to","Name":"IfYouHaveTheNameOfASpecificSoftwareProductAndWantTo","name_":"if_you_have_the_name_of_a_specific_software_product_and_want_to","name-":"if-you-have-the-name-of-a-specific-software-product-and-want-to","NAME":"IF_YOU_HAVE_THE_NAME_OF_A_SPECIFIC_SOFTWARE_PRODUCT_AND_WANT_TO","index$":1}, {"active":true,"entity":"if_you_have_the_name_of_a_specific_software_product_and_want_to","key$":"BasicIfYouHaveTheNameOfASpecificSoftwareProductAndWantToFlow","kind":"basic","name":"BasicIfYouHaveTheNameOfASpecificSoftwareProductAndWantToFlow","param":{},"step":[{"active":true,"data":{},"input":{"ref":"if_you_have_the_name_of_a_specific_software_product_and_want_to_ref01","srcdatavar":"if_you_have_the_name_of_a_specific_software_product_and_want_to_ref01_data","suffix":"_dt0"},"match":{},"op":"load","spec":[],"valid":[{"apply":"TextFieldMark","def":{"mark":"Mark01-if_you_have_the_name_of_a_specific_software_product_and_want_to_ref01"}}],"index$":0}]}, 'IfYouHaveTheNameOfASpecificSoftwareProductAndWantTo')
    }
    const client = setup.client
    const struct = setup.struct

    const isempty = struct.isempty
    const select = struct.select

    let if_you_have_the_name_of_a_specific_software_product_and_want_to_ref01_data = Object.values(setup.data.existing.if_you_have_the_name_of_a_specific_software_product_and_want_to)[0] as any

    // LOAD
    const if_you_have_the_name_of_a_specific_software_product_and_want_to_ref01_ent = client.IfYouHaveTheNameOfASpecificSoftwareProductAndWantTo()
    const if_you_have_the_name_of_a_specific_software_product_and_want_to_ref01_match_dt0: any = {}
    const if_you_have_the_name_of_a_specific_software_product_and_want_to_ref01_data_dt0 = (await if_you_have_the_name_of_a_specific_software_product_and_want_to_ref01_ent.load(if_you_have_the_name_of_a_specific_software_product_and_want_to_ref01_match_dt0)).data()
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

  const env = envOverride({
    'CVEDB_TEST_IF_YOU_HAVE_THE_NAME_OF_A_SPECIFIC_SOFTWARE_PRODUCT_AND_WANT_TO_ENTID': idmap,
    'CVEDB_TEST_LIVE': 'FALSE',
    'CVEDB_TEST_EXPLAIN': 'FALSE',
  })

  idmap = env['CVEDB_TEST_IF_YOU_HAVE_THE_NAME_OF_A_SPECIFIC_SOFTWARE_PRODUCT_AND_WANT_TO_ENTID']

  const live = 'TRUE' === env.CVEDB_TEST_LIVE

  const transport = createLiveTransport()
  if (live) {
    const rawIds = process.env['CVEDB_TEST_IF_YOU_HAVE_THE_NAME_OF_A_SPECIFIC_SOFTWARE_PRODUCT_AND_WANT_TO_ENTID']
    idmap = rawIds && rawIds.trim() ? JSON.parse(rawIds) : {}
    if (!idmap || Array.isArray(idmap) || typeof idmap !== 'object') {
      throw new Error('Live ENTID must be a JSON object')
    }
    client = new CvedbSDK(merge([
      // FIRST, so the generated fields below win: sdk-test-control.json's
      // test.client.options adds to the live client, it does not redirect it.
      liveClientOptions(),
      {
      },
      // 'extra || {}', not a bare 'extra': struct.merge returns UNDEFINED when the
      // last entry is undefined, and basicSetup is normally called with no
      // argument at all - so a bare 'extra' silently discarded the apikey
      // and server values above and handed the SDK undefined. Harmless
      // while there was nothing in that object; not harmless now.
      extra || {},
      { system: { fetch: transport.fetch } }
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
    transport,
    now: Date.now(),
  }

  return setup
}
  
