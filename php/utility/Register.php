<?php
declare(strict_types=1);

// Cvedb SDK utility registration

require_once __DIR__ . '/../core/UtilityType.php';
require_once __DIR__ . '/Clean.php';
require_once __DIR__ . '/Done.php';
require_once __DIR__ . '/MakeError.php';
require_once __DIR__ . '/FeatureAdd.php';
require_once __DIR__ . '/FeatureHook.php';
require_once __DIR__ . '/FeatureInit.php';
require_once __DIR__ . '/Fetcher.php';
require_once __DIR__ . '/MakeFetchDef.php';
require_once __DIR__ . '/MakeContext.php';
require_once __DIR__ . '/MakeOptions.php';
require_once __DIR__ . '/MakeRequest.php';
require_once __DIR__ . '/MakeResponse.php';
require_once __DIR__ . '/MakeResult.php';
require_once __DIR__ . '/MakePoint.php';
require_once __DIR__ . '/MakeSpec.php';
require_once __DIR__ . '/MakeUrl.php';
require_once __DIR__ . '/Param.php';
require_once __DIR__ . '/PrepareAuth.php';
require_once __DIR__ . '/PrepareBody.php';
require_once __DIR__ . '/PrepareHeaders.php';
require_once __DIR__ . '/PrepareMethod.php';
require_once __DIR__ . '/PrepareParams.php';
require_once __DIR__ . '/PreparePath.php';
require_once __DIR__ . '/PrepareQuery.php';
require_once __DIR__ . '/ResultBasic.php';
require_once __DIR__ . '/ResultBody.php';
require_once __DIR__ . '/ResultHeaders.php';
require_once __DIR__ . '/TransformRequest.php';
require_once __DIR__ . '/TransformResponse.php';

CvedbUtility::setRegistrar(function (CvedbUtility $u): void {
    $u->clean = [CvedbClean::class, 'call'];
    $u->done = [CvedbDone::class, 'call'];
    $u->make_error = [CvedbMakeError::class, 'call'];
    $u->feature_add = [CvedbFeatureAdd::class, 'call'];
    $u->feature_hook = [CvedbFeatureHook::class, 'call'];
    $u->feature_init = [CvedbFeatureInit::class, 'call'];
    $u->fetcher = [CvedbFetcher::class, 'call'];
    $u->make_fetch_def = [CvedbMakeFetchDef::class, 'call'];
    $u->make_context = [CvedbMakeContext::class, 'call'];
    $u->make_options = [CvedbMakeOptions::class, 'call'];
    $u->make_request = [CvedbMakeRequest::class, 'call'];
    $u->make_response = [CvedbMakeResponse::class, 'call'];
    $u->make_result = [CvedbMakeResult::class, 'call'];
    $u->make_point = [CvedbMakePoint::class, 'call'];
    $u->make_spec = [CvedbMakeSpec::class, 'call'];
    $u->make_url = [CvedbMakeUrl::class, 'call'];
    $u->param = [CvedbParam::class, 'call'];
    $u->prepare_auth = [CvedbPrepareAuth::class, 'call'];
    $u->prepare_body = [CvedbPrepareBody::class, 'call'];
    $u->prepare_headers = [CvedbPrepareHeaders::class, 'call'];
    $u->prepare_method = [CvedbPrepareMethod::class, 'call'];
    $u->prepare_params = [CvedbPrepareParams::class, 'call'];
    $u->prepare_path = [CvedbPreparePath::class, 'call'];
    $u->prepare_query = [CvedbPrepareQuery::class, 'call'];
    $u->result_basic = [CvedbResultBasic::class, 'call'];
    $u->result_body = [CvedbResultBody::class, 'call'];
    $u->result_headers = [CvedbResultHeaders::class, 'call'];
    $u->transform_request = [CvedbTransformRequest::class, 'call'];
    $u->transform_response = [CvedbTransformResponse::class, 'call'];
});
