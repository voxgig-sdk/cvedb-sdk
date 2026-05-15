# Cvedb SDK utility registration
require_relative '../core/utility_type'
require_relative 'clean'
require_relative 'done'
require_relative 'make_error'
require_relative 'feature_add'
require_relative 'feature_hook'
require_relative 'feature_init'
require_relative 'fetcher'
require_relative 'make_fetch_def'
require_relative 'make_context'
require_relative 'make_options'
require_relative 'make_request'
require_relative 'make_response'
require_relative 'make_result'
require_relative 'make_point'
require_relative 'make_spec'
require_relative 'make_url'
require_relative 'param'
require_relative 'prepare_auth'
require_relative 'prepare_body'
require_relative 'prepare_headers'
require_relative 'prepare_method'
require_relative 'prepare_params'
require_relative 'prepare_path'
require_relative 'prepare_query'
require_relative 'result_basic'
require_relative 'result_body'
require_relative 'result_headers'
require_relative 'transform_request'
require_relative 'transform_response'

CvedbUtility.registrar = ->(u) {
  u.clean = CvedbUtilities::Clean
  u.done = CvedbUtilities::Done
  u.make_error = CvedbUtilities::MakeError
  u.feature_add = CvedbUtilities::FeatureAdd
  u.feature_hook = CvedbUtilities::FeatureHook
  u.feature_init = CvedbUtilities::FeatureInit
  u.fetcher = CvedbUtilities::Fetcher
  u.make_fetch_def = CvedbUtilities::MakeFetchDef
  u.make_context = CvedbUtilities::MakeContext
  u.make_options = CvedbUtilities::MakeOptions
  u.make_request = CvedbUtilities::MakeRequest
  u.make_response = CvedbUtilities::MakeResponse
  u.make_result = CvedbUtilities::MakeResult
  u.make_point = CvedbUtilities::MakePoint
  u.make_spec = CvedbUtilities::MakeSpec
  u.make_url = CvedbUtilities::MakeUrl
  u.param = CvedbUtilities::Param
  u.prepare_auth = CvedbUtilities::PrepareAuth
  u.prepare_body = CvedbUtilities::PrepareBody
  u.prepare_headers = CvedbUtilities::PrepareHeaders
  u.prepare_method = CvedbUtilities::PrepareMethod
  u.prepare_params = CvedbUtilities::PrepareParams
  u.prepare_path = CvedbUtilities::PreparePath
  u.prepare_query = CvedbUtilities::PrepareQuery
  u.result_basic = CvedbUtilities::ResultBasic
  u.result_body = CvedbUtilities::ResultBody
  u.result_headers = CvedbUtilities::ResultHeaders
  u.transform_request = CvedbUtilities::TransformRequest
  u.transform_response = CvedbUtilities::TransformResponse
}
