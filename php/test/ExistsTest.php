<?php
declare(strict_types=1);

// Cvedb SDK exists test

require_once __DIR__ . '/../cvedb_sdk.php';

use PHPUnit\Framework\TestCase;

class ExistsTest extends TestCase
{
    public function test_create_test_sdk(): void
    {
        $testsdk = CvedbSDK::test(null, null);
        $this->assertNotNull($testsdk);
    }
}
