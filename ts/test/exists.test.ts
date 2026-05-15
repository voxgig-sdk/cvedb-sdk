
import { test, describe } from 'node:test'
import { equal } from 'node:assert'


import { CvedbSDK } from '..'


describe('exists', async () => {

  test('test-mode', async () => {
    const testsdk = await CvedbSDK.test()
    equal(null !== testsdk, true)
  })

})
