<?php
declare(strict_types=1);

// Cvedb SDK base feature

class CvedbBaseFeature
{
    public string $version;
    public string $name;
    public bool $active;

    // Positions this feature when added via the client `extend` option:
    // "__before__" / "__after__" / "__replace__" name an already-added
    // feature (mirrors the ts feature `_options`). Declared so setting it
    // on an extension instance avoids the dynamic-property deprecation.
    public ?array $_options = null;

    public function __construct()
    {
        $this->version = '0.0.1';
        $this->name = 'base';
        $this->active = true;
    }

    public function get_version(): string { return $this->version; }
    public function get_name(): string { return $this->name; }
    public function get_active(): bool { return $this->active; }

    public function init(CvedbContext $ctx, array $options): void {}
    public function PostConstruct(CvedbContext $ctx): void {}
    public function PostConstructEntity(CvedbContext $ctx): void {}
    public function SetData(CvedbContext $ctx): void {}
    public function GetData(CvedbContext $ctx): void {}
    public function GetMatch(CvedbContext $ctx): void {}
    public function SetMatch(CvedbContext $ctx): void {}
    public function PrePoint(CvedbContext $ctx): void {}
    public function PreSpec(CvedbContext $ctx): void {}
    public function PreRequest(CvedbContext $ctx): void {}
    public function PreResponse(CvedbContext $ctx): void {}
    public function PreResult(CvedbContext $ctx): void {}
    public function PreDone(CvedbContext $ctx): void {}
    public function PreUnexpected(CvedbContext $ctx): void {}
}
