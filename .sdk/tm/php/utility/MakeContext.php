<?php
declare(strict_types=1);

// Cvedb SDK utility: make_context

require_once __DIR__ . '/../core/Context.php';

class CvedbMakeContext
{
    public static function call(array $ctxmap, ?CvedbContext $basectx): CvedbContext
    {
        return new CvedbContext($ctxmap, $basectx);
    }
}
