<?php
declare(strict_types=1);

// Cvedb SDK utility: prepare_body

class CvedbPrepareBody
{
    public static function call(CvedbContext $ctx): mixed
    {
        if ($ctx->op->input === 'data') {
            return ($ctx->utility->transform_request)($ctx);
        }
        return null;
    }
}
