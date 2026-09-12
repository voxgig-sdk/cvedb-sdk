import { CveEntity } from './entity/CveEntity';
import { IfYouHaveTheNameOfASpecificSoftwareProductAndWantToEntity } from './entity/IfYouHaveTheNameOfASpecificSoftwareProductAndWantToEntity';
import { ThisEndpointIsTailoredForSearchesBasedOnProductNameOrEntity } from './entity/ThisEndpointIsTailoredForSearchesBasedOnProductNameOrEntity';
export type * from './CvedbTypes';
import { inspect } from 'node:util';
import type { Context, Feature } from './types';
import { config } from './Config';
import { CvedbEntityBase } from './CvedbEntityBase';
import { Utility } from './utility/Utility';
import { BaseFeature } from './feature/base/BaseFeature';
declare const stdutil: Utility;
declare class CvedbSDK {
    _mode: string;
    _options: any;
    _utility: Utility;
    _features: Feature[];
    _rootctx: Context;
    constructor(options?: any);
    options(): any;
    utility(): any;
    prepare(fetchargs?: any): Promise<any>;
    direct(fetchargs?: any): Promise<Error | {
        ok: boolean;
        status: number;
        headers: any;
        data: any;
        err?: undefined;
    } | {
        ok: boolean;
        err: any;
        status?: undefined;
        headers?: undefined;
        data?: undefined;
    }>;
    _rawRequest(fetchargs?: any): Promise<Error | {
        ok: boolean;
        status: number;
        headers: any;
        data: any;
        err?: undefined;
    } | {
        ok: boolean;
        err: any;
        status?: undefined;
        headers?: undefined;
        data?: undefined;
    }>;
    graphql(query: string, variables?: any, ctrl?: any): Promise<any>;
    Cve(entopts?: Record<string, any>): CveEntity;
    IfYouHaveTheNameOfASpecificSoftwareProductAndWantTo(entopts?: Record<string, any>): IfYouHaveTheNameOfASpecificSoftwareProductAndWantToEntity;
    ThisEndpointIsTailoredForSearchesBasedOnProductNameOr(entopts?: Record<string, any>): ThisEndpointIsTailoredForSearchesBasedOnProductNameOrEntity;
    static test(testoptsarg?: any, sdkoptsarg?: any): CvedbSDK;
    tester(testopts?: any, sdkopts?: any): CvedbSDK;
    toJSON(): {
        name: string;
    };
    toString(): string;
    [inspect.custom](): string;
}
declare const SDK: typeof CvedbSDK;
export { stdutil, config, BaseFeature, CvedbEntityBase, CvedbSDK, SDK, };
