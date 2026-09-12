export interface Cve {
    cpes: any[];
    cve_id: string;
    cvss: any;
    cvss_v2: any;
    cvss_v3: any;
    cvss_v4: any;
    cvss_version: any;
    epss: any;
    id?: string;
    kev: boolean;
    propose_action?: any;
    published_time: string;
    ranking_epss: any;
    ransomware_campaign?: any;
    references: any[];
    summary: any;
}
export interface CveLoadMatch {
    id: string;
}
export interface IfYouHaveTheNameOfASpecificSoftwareProductAndWantTo {
}
export interface IfYouHaveTheNameOfASpecificSoftwareProductAndWantToLoadMatch {
    count?: boolean;
    limit?: number;
    product: string;
    skip?: number;
}
export interface ThisEndpointIsTailoredForSearchesBasedOnProductNameOr {
}
export interface ThisEndpointIsTailoredForSearchesBasedOnProductNameOrLoadMatch {
    count?: boolean;
    cpe23?: any;
    end_date?: any;
    is_kev?: boolean;
    limit?: number;
    product?: any;
    skip?: number;
    sort_by_epss?: boolean;
    start_date?: any;
}
