import { CvedbEntityBase } from '../CvedbEntityBase';
import type { CvedbSDK } from '../CvedbSDK';
import type { Control } from '../types';
import type { ThisEndpointIsTailoredForSearchesBasedOnProductNameOr, ThisEndpointIsTailoredForSearchesBasedOnProductNameOrLoadMatch } from '../CvedbTypes';
declare class ThisEndpointIsTailoredForSearchesBasedOnProductNameOrEntity extends CvedbEntityBase<ThisEndpointIsTailoredForSearchesBasedOnProductNameOr> {
    constructor(client: CvedbSDK, entopts: any);
    make(this: ThisEndpointIsTailoredForSearchesBasedOnProductNameOrEntity): ThisEndpointIsTailoredForSearchesBasedOnProductNameOrEntity;
    load(this: any, reqmatch?: ThisEndpointIsTailoredForSearchesBasedOnProductNameOrLoadMatch, ctrl?: Control): Promise<ThisEndpointIsTailoredForSearchesBasedOnProductNameOrEntity>;
}
export { ThisEndpointIsTailoredForSearchesBasedOnProductNameOrEntity };
