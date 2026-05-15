<?php
declare(strict_types=1);

// Cvedb SDK utility: feature_add

class CvedbFeatureAdd
{
    public static function call(CvedbContext $ctx, mixed $f): void
    {
        $ctx->client->features[] = $f;
    }
}
