<?php
declare(strict_types=1);

// Cvedb SDK feature factory

require_once __DIR__ . '/feature/BaseFeature.php';
require_once __DIR__ . '/feature/TestFeature.php';


class CvedbFeatures
{
    public static function make_feature(string $name)
    {
        switch ($name) {
            case "base":
                return new CvedbBaseFeature();
            case "test":
                return new CvedbTestFeature();
            default:
                return new CvedbBaseFeature();
        }
    }
}
