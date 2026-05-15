<?php
declare(strict_types=1);

// Cvedb SDK utility: result_body

class CvedbResultBody
{
    public static function call(CvedbContext $ctx): ?CvedbResult
    {
        $response = $ctx->response;
        $result = $ctx->result;
        if ($result && $response && $response->json_func && $response->body) {
            $result->body = ($response->json_func)();
        }
        return $result;
    }
}
