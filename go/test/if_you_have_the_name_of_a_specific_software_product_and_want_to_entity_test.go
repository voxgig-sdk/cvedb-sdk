package sdktest

import (
	"encoding/json"
	"os"
	"path/filepath"
	"runtime"
	"strings"
	"testing"
	"time"

	sdk "github.com/voxgig-sdk/cvedb-sdk/go"
	"github.com/voxgig-sdk/cvedb-sdk/go/core"

	vs "github.com/voxgig-sdk/cvedb-sdk/go/utility/struct"
)

func TestIfYouHaveTheNameOfASpecificSoftwareProductAndWantToEntity(t *testing.T) {
	t.Run("instance", func(t *testing.T) {
		testsdk := sdk.TestSDK(nil, nil)
		ent := testsdk.IfYouHaveTheNameOfASpecificSoftwareProductAndWantTo(nil)
		if ent == nil {
			t.Fatal("expected non-nil IfYouHaveTheNameOfASpecificSoftwareProductAndWantToEntity")
		}
	})

	t.Run("basic", func(t *testing.T) {
		setup := if_you_have_the_name_of_a_specific_software_product_and_want_toBasicSetup(nil)
		// Per-op sdk-test-control.json skip — basic test exercises a flow
		// with multiple ops; skipping any op skips the whole flow.
		_mode := "unit"
		if setup.live {
			_mode = "live"
		}
		for _, _op := range []string{"load"} {
			if _shouldSkip, _reason := isControlSkipped("entityOp", "if_you_have_the_name_of_a_specific_software_product_and_want_to." + _op, _mode); _shouldSkip {
				if _reason == "" {
					_reason = "skipped via sdk-test-control.json"
				}
				t.Skip(_reason)
				return
			}
		}
		// The basic flow consumes synthetic IDs from the fixture. In live mode
		// without an *_ENTID env override, those IDs hit the live API and 4xx.
		if setup.syntheticOnly {
			t.Skip("live entity test uses synthetic IDs from fixture — set CVEDB_TEST_IF_YOU_HAVE_THE_NAME_OF_A_SPECIFIC_SOFTWARE_PRODUCT_AND_WANT_TO_ENTID JSON to run live")
			return
		}
		client := setup.client

		// Bootstrap entity data from existing test data (no create step in flow).
		ifYouHaveTheNameOfASpecificSoftwareProductAndWantToRef01DataRaw := vs.Items(core.ToMapAny(vs.GetPath("existing.if_you_have_the_name_of_a_specific_software_product_and_want_to", setup.data)))
		var ifYouHaveTheNameOfASpecificSoftwareProductAndWantToRef01Data map[string]any
		if len(ifYouHaveTheNameOfASpecificSoftwareProductAndWantToRef01DataRaw) > 0 {
			ifYouHaveTheNameOfASpecificSoftwareProductAndWantToRef01Data = core.ToMapAny(ifYouHaveTheNameOfASpecificSoftwareProductAndWantToRef01DataRaw[0][1])
		}
		// Discard guards against Go's unused-var check when the flow's steps
		// happen not to consume the bootstrap data (e.g. list-only flows).
		_ = ifYouHaveTheNameOfASpecificSoftwareProductAndWantToRef01Data

		// LOAD
		ifYouHaveTheNameOfASpecificSoftwareProductAndWantToRef01Ent := client.IfYouHaveTheNameOfASpecificSoftwareProductAndWantTo(nil)
		ifYouHaveTheNameOfASpecificSoftwareProductAndWantToRef01MatchDt0 := map[string]any{}
		ifYouHaveTheNameOfASpecificSoftwareProductAndWantToRef01DataDt0Loaded, err := ifYouHaveTheNameOfASpecificSoftwareProductAndWantToRef01Ent.Load(ifYouHaveTheNameOfASpecificSoftwareProductAndWantToRef01MatchDt0, nil)
		if err != nil {
			t.Fatalf("load failed: %v", err)
		}
		if ifYouHaveTheNameOfASpecificSoftwareProductAndWantToRef01DataDt0Loaded == nil {
			t.Fatal("expected load result to be non-nil")
		}

	})
}

func if_you_have_the_name_of_a_specific_software_product_and_want_toBasicSetup(extra map[string]any) *entityTestSetup {
	loadEnvLocal()

	_, filename, _, _ := runtime.Caller(0)
	dir := filepath.Dir(filename)

	entityDataFile := filepath.Join(dir, "..", "..", ".sdk", "test", "entity", "if_you_have_the_name_of_a_specific_software_product_and_want_to", "IfYouHaveTheNameOfASpecificSoftwareProductAndWantToTestData.json")

	entityDataSource, err := os.ReadFile(entityDataFile)
	if err != nil {
		panic("failed to read if_you_have_the_name_of_a_specific_software_product_and_want_to test data: " + err.Error())
	}

	var entityData map[string]any
	if err := json.Unmarshal(entityDataSource, &entityData); err != nil {
		panic("failed to parse if_you_have_the_name_of_a_specific_software_product_and_want_to test data: " + err.Error())
	}

	options := map[string]any{}
	options["entity"] = entityData["existing"]

	client := sdk.TestSDK(options, extra)

	// Generate idmap via transform, matching TS pattern.
	idmap := vs.Transform(
		[]any{"if_you_have_the_name_of_a_specific_software_product_and_want_to01", "if_you_have_the_name_of_a_specific_software_product_and_want_to02", "if_you_have_the_name_of_a_specific_software_product_and_want_to03"},
		map[string]any{
			"`$PACK`": []any{"", map[string]any{
				"`$KEY`": "`$COPY`",
				"`$VAL`": []any{"`$FORMAT`", "upper", "`$COPY`"},
			}},
		},
	)

	// Detect ENTID env override before envOverride consumes it. When live
	// mode is on without a real override, the basic test runs against synthetic
	// IDs from the fixture and 4xx's. Surface this so the test can skip.
	entidEnvRaw := os.Getenv("CVEDB_TEST_IF_YOU_HAVE_THE_NAME_OF_A_SPECIFIC_SOFTWARE_PRODUCT_AND_WANT_TO_ENTID")
	idmapOverridden := entidEnvRaw != "" && strings.HasPrefix(strings.TrimSpace(entidEnvRaw), "{")

	env := envOverride(map[string]any{
		"CVEDB_TEST_IF_YOU_HAVE_THE_NAME_OF_A_SPECIFIC_SOFTWARE_PRODUCT_AND_WANT_TO_ENTID": idmap,
		"CVEDB_TEST_LIVE":      "FALSE",
		"CVEDB_TEST_EXPLAIN":   "FALSE",
	})

	idmapResolved := core.ToMapAny(env["CVEDB_TEST_IF_YOU_HAVE_THE_NAME_OF_A_SPECIFIC_SOFTWARE_PRODUCT_AND_WANT_TO_ENTID"])
	if idmapResolved == nil {
		idmapResolved = core.ToMapAny(idmap)
	}

	if env["CVEDB_TEST_LIVE"] == "TRUE" {
		mergedOpts := vs.Merge([]any{
			map[string]any{
			},
			extra,
		})
		client = sdk.NewCvedbSDK(core.ToMapAny(mergedOpts))
	}

	live := env["CVEDB_TEST_LIVE"] == "TRUE"
	return &entityTestSetup{
		client:        client,
		data:          entityData,
		idmap:         idmapResolved,
		env:           env,
		explain:       env["CVEDB_TEST_EXPLAIN"] == "TRUE",
		live:          live,
		syntheticOnly: live && !idmapOverridden,
		now:           time.Now().UnixMilli(),
	}
}
