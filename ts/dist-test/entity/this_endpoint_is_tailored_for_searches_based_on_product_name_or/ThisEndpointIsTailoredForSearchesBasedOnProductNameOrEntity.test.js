"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const node_path_1 = __importDefault(require("node:path"));
const Fs = __importStar(require("node:fs"));
const node_test_1 = require("node:test");
const node_assert_1 = __importDefault(require("node:assert"));
const live_runner_1 = require("../../live-runner");
const live_entity_1 = require("../../live-entity");
const __1 = require("../../..");
const utility_1 = require("../../utility");
// AFTER the imports on purpose: TypeScript hoists `import` above any
// statement in the emitted CommonJS, so a loader placed above them would
// run only after every imported module had already been evaluated - and
// anything reading process.env at module scope would miss these values.
(0, utility_1.loadEnvLocal)(__dirname + '/../../../.env.local');
(0, node_test_1.describe)('ThisEndpointIsTailoredForSearchesBasedOnProductNameOrEntity', async () => {
    // Per-test live pacing. Delay is read from sdk-test-control.json's
    // `test.live.delayMs`; only sleeps when CVEDB_TEST_LIVE=TRUE.
    (0, node_test_1.afterEach)((0, utility_1.liveDelay)('CVEDB_TEST_LIVE'));
    (0, node_test_1.test)('instance', async () => {
        const testsdk = __1.CvedbSDK.test();
        const ent = testsdk.ThisEndpointIsTailoredForSearchesBasedOnProductNameOr();
        (0, node_assert_1.default)(null != ent);
    });
    (0, node_test_1.test)('basic', async (t) => {
        const live = 'TRUE' === process.env.CVEDB_TEST_LIVE;
        for (const op of ['load']) {
            if (!live && (0, utility_1.maybeSkipControl)(t, 'entityOp', 'this_endpoint_is_tailored_for_searches_based_on_product_name_or.' + op, live))
                return;
        }
        const setup = basicSetup();
        if (setup.live) {
            return (0, live_entity_1.runLiveEntity)(setup, { "active": true, "alias": { "field": {} }, "fields": [], "name": "this_endpoint_is_tailored_for_searches_based_on_product_name_or", "op": { "load": { "input": "data", "name": "load", "points": [{ "active": true, "args": { "query": [{ "active": true, "example": false, "kind": "query", "name": "count", "orig": "count", "reqd": false, "type": "`$BOOLEAN`", "index$": 0 }, { "active": true, "kind": "query", "name": "cpe23", "orig": "cpe23", "reqd": false, "type": "`$ANY`", "index$": 1 }, { "active": true, "kind": "query", "name": "end_date", "orig": "end_date", "reqd": false, "type": "`$ANY`", "index$": 2 }, { "active": true, "example": false, "kind": "query", "name": "is_kev", "orig": "is_kev", "reqd": false, "type": "`$BOOLEAN`", "index$": 3 }, { "active": true, "example": 1000, "kind": "query", "name": "limit", "orig": "limit", "reqd": false, "type": "`$INTEGER`", "index$": 4 }, { "active": true, "kind": "query", "name": "product", "orig": "product", "reqd": false, "type": "`$ANY`", "index$": 5 }, { "active": true, "example": 0, "kind": "query", "name": "skip", "orig": "skip", "reqd": false, "type": "`$INTEGER`", "index$": 6 }, { "active": true, "example": false, "kind": "query", "name": "sort_by_epss", "orig": "sort_by_epss", "reqd": false, "type": "`$BOOLEAN`", "index$": 7 }, { "active": true, "kind": "query", "name": "start_date", "orig": "start_date", "reqd": false, "type": "`$ANY`", "index$": 8 }] }, "contract": { "id": "GET /cves", "json": "{\"operationId\":\"info_cves_get\",\"parameters\":[{\"description\":\"Format required cpe:2.3:part:vendor:product:version\",\"in\":\"query\",\"name\":\"cpe23\",\"required\":false,\"schema\":{\"anyOf\":[{\"pattern\":\"^cpe:2\\\\.3:[aho]:[^:]+:[^:]+:[^:]+(:[^:]*(:[^:]*(:[^:]*(:[^:]*(:[^:]*(:[^:]*(:[^:]*)?)?)?)?)?)?)?$\",\"type\":\"string\"},{\"type\":\"null\"}],\"description\":\"Format required cpe:2.3:part:vendor:product:version\",\"title\":\"Cpe23\"}},{\"in\":\"query\",\"name\":\"product\",\"required\":false,\"schema\":{\"anyOf\":[{\"type\":\"string\"},{\"type\":\"null\"}],\"title\":\"Product\"}},{\"in\":\"query\",\"name\":\"count\",\"required\":false,\"schema\":{\"default\":false,\"title\":\"Count\",\"type\":\"boolean\"}},{\"in\":\"query\",\"name\":\"is_kev\",\"required\":false,\"schema\":{\"default\":false,\"title\":\"Is Kev\",\"type\":\"boolean\"}},{\"in\":\"query\",\"name\":\"sort_by_epss\",\"required\":false,\"schema\":{\"default\":false,\"title\":\"Sort By Epss\",\"type\":\"boolean\"}},{\"in\":\"query\",\"name\":\"skip\",\"required\":false,\"schema\":{\"default\":0,\"title\":\"Skip\",\"type\":\"integer\"}},{\"in\":\"query\",\"name\":\"limit\",\"required\":false,\"schema\":{\"default\":1000,\"title\":\"Limit\",\"type\":\"integer\"}},{\"description\":\"Format YYYY-MM-DDTHH:MM:SS, default time is 00:00:00 on the given date\",\"in\":\"query\",\"name\":\"start_date\",\"required\":false,\"schema\":{\"anyOf\":[{\"pattern\":\"^\\\\d{4}-\\\\d{2}-\\\\d{2}(T\\\\d{2}:\\\\d{2}:\\\\d{2})?$\",\"type\":\"string\"},{\"type\":\"null\"}],\"description\":\"Format YYYY-MM-DDTHH:MM:SS, default time is 00:00:00 on the given date\",\"title\":\"Start Date\"}},{\"description\":\"Format YYYY-MM-DDTHH:MM:SS, default is current date and time\",\"in\":\"query\",\"name\":\"end_date\",\"required\":false,\"schema\":{\"anyOf\":[{\"pattern\":\"^\\\\d{4}-\\\\d{2}-\\\\d{2}(T\\\\d{2}:\\\\d{2}:\\\\d{2})?$\",\"type\":\"string\"},{\"type\":\"null\"}],\"description\":\"Format YYYY-MM-DDTHH:MM:SS, default is current date and time\",\"title\":\"End Date\"}}],\"protocol\":\"http\",\"responses\":{\"200\":{\"content\":{\"application/json\":{\"schema\":{\"anyOf\":[{\"properties\":{\"cves\":{\"description\":\"A collection of CVE objects. Each object provides detailed information about a specific Common Vulnerability and Exposure, including its identification, description, scores, and mitigation recommendations.\",\"items\":{\"properties\":{\"cve_id\":{\"description\":\"The unique identifier assigned to a reported vulnerability, adhering to the CVE-YYYY-NNNNN format, which helps in tracking and referencing vulnerabilities systematically.\",\"title\":\"Cve Id\",\"type\":\"string\"},\"cvss\":{\"anyOf\":[{\"maximum\":10,\"minimum\":0,\"type\":\"number\"},{\"type\":\"null\"}],\"description\":\"The Common Vulnerability Scoring System (CVSS) score, newest version, which ranges from 0 to 10, quantifies the severity of the vulnerability based on various factors such as exploitability, impact, and ease of attack. A score of 10 indicates the highest severity.\",\"title\":\"Cvss\"},\"cvss_v2\":{\"anyOf\":[{\"maximum\":10,\"minimum\":0,\"type\":\"number\"},{\"type\":\"null\"}],\"description\":\"The Common Vulnerability Scoring System (CVSS) score version 2, which ranges from 0 to 10, quantifies the severity of the vulnerability based on various factors such as exploitability, impact, and ease of attack. A score of 10 indicates the highest severity.\",\"title\":\"Cvss V2\"},\"cvss_v3\":{\"anyOf\":[{\"maximum\":10,\"minimum\":0,\"type\":\"number\"},{\"type\":\"null\"}],\"description\":\"The Common Vulnerability Scoring System (CVSS) score version 3, which ranges from 0 to 10, quantifies the severity of the vulnerability based on various factors such as exploitability, impact, and ease of attack. A score of 10 indicates the highest severity.\",\"title\":\"Cvss V3\"},\"cvss_v4\":{\"anyOf\":[{\"maximum\":10,\"minimum\":0,\"type\":\"number\"},{\"type\":\"null\"}],\"description\":\"The Common Vulnerability Scoring System (CVSS) score version 4, which ranges from 0 to 10, quantifies the severity of the vulnerability based on various factors such as exploitability, impact, and ease of attack. A score of 10 indicates the highest severity.\",\"title\":\"Cvss V4\"},\"cvss_version\":{\"anyOf\":[{\"type\":\"number\"},{\"type\":\"null\"}],\"description\":\"The version of the CVSS used in the cvss field.\",\"title\":\"Cvss Version\"},\"epss\":{\"anyOf\":[{\"maximum\":1,\"minimum\":0,\"type\":\"number\"},{\"type\":\"null\"}],\"description\":\"The Exploit Prediction Scoring System (EPSS) score, a probabilistic measure between 0 and 1 (0 and 100%)., predicts the likelihood of a vulnerability being exploited in the wild within the next 30 days. Scores closer to 1 indicate a higher risk of exploitation.\",\"title\":\"Epss\"},\"kev\":{\"description\":\"A boolean value indicating whether the vulnerability is known to be exploited in the wild, which is crucial for prioritizing patching and mitigation efforts.\",\"title\":\"Kev\",\"type\":\"boolean\"},\"product\":{\"anyOf\":[{\"type\":\"string\"},{\"type\":\"null\"}],\"description\":\"Product name of vendor effected by this CVE\",\"title\":\"Product\"},\"propose_action\":{\"anyOf\":[{\"type\":\"string\"},{\"type\":\"null\"}],\"description\":\"Suggested actions or mitigation strategies to address the vulnerability, aimed at reducing its impact or eliminating the risk to affected systems.\",\"title\":\"Propose Action\"},\"published_time\":{\"description\":\"The date and time when the vulnerability was published, in the format YYYY-MM-DDTHH:MM:SS, with UTC time zone.\",\"format\":\"date-time\",\"title\":\"Published Time\",\"type\":\"string\"},\"ranking_epss\":{\"anyOf\":[{\"maximum\":1,\"minimum\":0,\"type\":\"number\"},{\"type\":\"null\"}],\"description\":\"This score ranks the vulnerability in terms of its EPSS score relative to all other scored vulnerabilities. It shows the proportion of vulnerabilities that have the same or a lower risk of being exploited, with a score closer to 1 indicating a higher relative risk.\",\"title\":\"Ranking Epss\"},\"ransomware_campaign\":{\"anyOf\":[{\"type\":\"string\"},{\"type\":\"null\"}],\"description\":\"Indicates if the vulnerability has been exploited in ransomware campaigns, highlighting its significance and potential impact on security posture.\",\"title\":\"Ransomware Campaign\"},\"references\":{\"description\":\"A list of references providing further details, technical advisories, and mitigation guidance related to the vulnerability, facilitating deeper understanding and research.\",\"items\":{\"type\":\"string\"},\"title\":\"References\",\"type\":\"array\"},\"summary\":{\"anyOf\":[{\"type\":\"string\"},{\"type\":\"null\"}],\"description\":\"A brief overview of the vulnerability, providing essential information on what it entails, the affected systems, and the potential impact in clear, understandable English.\",\"title\":\"Summary\"},\"vendor\":{\"anyOf\":[{\"type\":\"string\"},{\"type\":\"null\"}],\"description\":\"Vendor name effected by this CVE\",\"title\":\"Vendor\"},\"version\":{\"anyOf\":[{\"type\":\"string\"},{\"type\":\"null\"}],\"description\":\"Version of product effected by this CVE\",\"title\":\"Version\"}},\"required\":[\"cve_id\",\"summary\",\"cvss\",\"cvss_version\",\"cvss_v2\",\"cvss_v3\",\"cvss_v4\",\"epss\",\"ranking_epss\",\"kev\",\"references\",\"published_time\",\"vendor\",\"product\",\"version\"],\"title\":\"CVE\",\"type\":\"object\"},\"title\":\"Cves\",\"type\":\"array\"}},\"required\":[\"cves\"],\"title\":\"CVEs\",\"type\":\"object\"},{\"properties\":{\"total\":{\"anyOf\":[{\"type\":\"integer\"},{\"type\":\"null\"}],\"description\":\"The total count of CVE entries that match a given query. This is useful for understanding the scope of vulnerabilities affecting a specific product or component without retrieving detailed information about each entry.\",\"title\":\"Total\"}},\"title\":\"CVEsTotal\",\"type\":\"object\"}],\"title\":\"Response Info Cves Get\"}}},\"description\":\"Successful Response\"},\"422\":{\"content\":{\"application/json\":{\"schema\":{\"properties\":{\"detail\":{\"items\":{\"properties\":{\"loc\":{\"items\":{\"anyOf\":[{\"type\":\"string\"},{\"type\":\"integer\"}]},\"title\":\"Location\",\"type\":\"array\"},\"msg\":{\"title\":\"Message\",\"type\":\"string\"},\"type\":{\"title\":\"Error Type\",\"type\":\"string\"}},\"required\":[\"loc\",\"msg\",\"type\"],\"title\":\"ValidationError\",\"type\":\"object\"},\"title\":\"Detail\",\"type\":\"array\"}},\"title\":\"HTTPValidationError\",\"type\":\"object\"}}},\"description\":\"Validation Error\"}},\"securitySource\":\"unspecified\"}", "source": "openapi3", "version": 1 }, "kind": "http", "method": "GET", "orig": "/cves", "segments": [{ "lit": "cves" }], "select": { "exist": ["count", "cpe23", "end_date", "is_kev", "limit", "product", "skip", "sort_by_epss", "start_date"] }, "transform": { "req": "`reqdata`", "res": "`body`" }, "index$": 0 }], "key$": "load" } }, "relations": { "ancestors": [] }, "key$": "this_endpoint_is_tailored_for_searches_based_on_product_name_or", "name__orig": "this_endpoint_is_tailored_for_searches_based_on_product_name_or", "Name": "ThisEndpointIsTailoredForSearchesBasedOnProductNameOr", "name_": "this_endpoint_is_tailored_for_searches_based_on_product_name_or", "name-": "this-endpoint-is-tailored-for-searches-based-on-product-name-or", "NAME": "THIS_ENDPOINT_IS_TAILORED_FOR_SEARCHES_BASED_ON_PRODUCT_NAME_OR", "index$": 2 }, { "active": true, "entity": "this_endpoint_is_tailored_for_searches_based_on_product_name_or", "key$": "BasicThisEndpointIsTailoredForSearchesBasedOnProductNameOrFlow", "kind": "basic", "name": "BasicThisEndpointIsTailoredForSearchesBasedOnProductNameOrFlow", "param": {}, "step": [{ "active": true, "data": {}, "input": { "ref": "this_endpoint_is_tailored_for_searches_based_on_product_name_or_ref01", "srcdatavar": "this_endpoint_is_tailored_for_searches_based_on_product_name_or_ref01_data", "suffix": "_dt0" }, "match": {}, "op": "load", "spec": [], "valid": [{ "apply": "TextFieldMark", "def": { "mark": "Mark01-this_endpoint_is_tailored_for_searches_based_on_product_name_or_ref01" } }], "index$": 0 }] }, 'ThisEndpointIsTailoredForSearchesBasedOnProductNameOr');
        }
        const client = setup.client;
        const struct = setup.struct;
        const isempty = struct.isempty;
        const select = struct.select;
        let this_endpoint_is_tailored_for_searches_based_on_product_name_or_ref01_data = Object.values(setup.data.existing.this_endpoint_is_tailored_for_searches_based_on_product_name_or)[0];
        // LOAD
        const this_endpoint_is_tailored_for_searches_based_on_product_name_or_ref01_ent = client.ThisEndpointIsTailoredForSearchesBasedOnProductNameOr();
        const this_endpoint_is_tailored_for_searches_based_on_product_name_or_ref01_match_dt0 = {};
        const this_endpoint_is_tailored_for_searches_based_on_product_name_or_ref01_data_dt0 = (await this_endpoint_is_tailored_for_searches_based_on_product_name_or_ref01_ent.load(this_endpoint_is_tailored_for_searches_based_on_product_name_or_ref01_match_dt0)).data();
        (0, node_assert_1.default)(null != this_endpoint_is_tailored_for_searches_based_on_product_name_or_ref01_data_dt0);
    });
});
function basicSetup(extra) {
    // TODO: fix test def options
    const options = {}; // null
    // TODO: needs test utility to resolve path
    const entityDataFile = node_path_1.default.resolve(__dirname, '../../../../.sdk/test/entity/this_endpoint_is_tailored_for_searches_based_on_product_name_or/ThisEndpointIsTailoredForSearchesBasedOnProductNameOrTestData.json');
    // TODO: file ready util needed?
    const entityDataSource = Fs.readFileSync(entityDataFile).toString('utf8');
    // TODO: need a xlang JSON parse utility in voxgig/struct with better error msgs
    const entityData = JSON.parse(entityDataSource);
    options.entity = entityData.existing;
    let client = __1.CvedbSDK.test(options, extra);
    const struct = client.utility().struct;
    const merge = struct.merge;
    const transform = struct.transform;
    let idmap = transform(['this_endpoint_is_tailored_for_searches_based_on_product_name_or01', 'this_endpoint_is_tailored_for_searches_based_on_product_name_or02', 'this_endpoint_is_tailored_for_searches_based_on_product_name_or03'], {
        '`$PACK`': ['', {
                '`$KEY`': '`$COPY`',
                '`$VAL`': ['`$FORMAT`', 'upper', '`$COPY`']
            }]
    });
    const env = (0, utility_1.envOverride)({
        'CVEDB_TEST_THIS_ENDPOINT_IS_TAILORED_FOR_SEARCHES_BASED_ON_PRODUCT_NAME_OR_ENTID': idmap,
        'CVEDB_TEST_LIVE': 'FALSE',
        'CVEDB_TEST_EXPLAIN': 'FALSE',
    });
    idmap = env['CVEDB_TEST_THIS_ENDPOINT_IS_TAILORED_FOR_SEARCHES_BASED_ON_PRODUCT_NAME_OR_ENTID'];
    const live = 'TRUE' === env.CVEDB_TEST_LIVE;
    const transport = (0, live_runner_1.createLiveTransport)();
    if (live) {
        const rawIds = process.env['CVEDB_TEST_THIS_ENDPOINT_IS_TAILORED_FOR_SEARCHES_BASED_ON_PRODUCT_NAME_OR_ENTID'];
        idmap = rawIds && rawIds.trim() ? JSON.parse(rawIds) : {};
        if (!idmap || Array.isArray(idmap) || typeof idmap !== 'object') {
            throw new Error('Live ENTID must be a JSON object');
        }
        client = new __1.CvedbSDK(merge([
            // FIRST, so the generated fields below win: sdk-test-control.json's
            // test.client.options adds to the live client, it does not redirect it.
            (0, utility_1.liveClientOptions)(),
            {},
            // 'extra || {}', not a bare 'extra': struct.merge returns UNDEFINED when the
            // last entry is undefined, and basicSetup is normally called with no
            // argument at all - so a bare 'extra' silently discarded the apikey
            // and server values above and handed the SDK undefined. Harmless
            // while there was nothing in that object; not harmless now.
            extra || {},
            { system: { fetch: transport.fetch } }
        ]));
    }
    const setup = {
        idmap,
        env,
        options,
        client,
        struct,
        data: entityData,
        explain: 'TRUE' === env.CVEDB_TEST_EXPLAIN,
        live,
        transport,
        now: Date.now(),
    };
    return setup;
}
//# sourceMappingURL=ThisEndpointIsTailoredForSearchesBasedOnProductNameOrEntity.test.js.map