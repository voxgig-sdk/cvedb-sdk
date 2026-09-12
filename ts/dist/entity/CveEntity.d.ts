import { CvedbEntityBase } from '../CvedbEntityBase';
import type { CvedbSDK } from '../CvedbSDK';
import type { Control } from '../types';
import type { Cve, CveLoadMatch } from '../CvedbTypes';
declare class CveEntity extends CvedbEntityBase<Cve> {
    constructor(client: CvedbSDK, entopts: any);
    make(this: CveEntity): CveEntity;
    load(this: any, reqmatch?: CveLoadMatch, ctrl?: Control): Promise<CveEntity>;
}
export { CveEntity };
