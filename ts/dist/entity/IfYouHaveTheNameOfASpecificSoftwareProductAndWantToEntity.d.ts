import { CvedbEntityBase } from '../CvedbEntityBase';
import type { CvedbSDK } from '../CvedbSDK';
import type { Control } from '../types';
import type { IfYouHaveTheNameOfASpecificSoftwareProductAndWantTo, IfYouHaveTheNameOfASpecificSoftwareProductAndWantToLoadMatch } from '../CvedbTypes';
declare class IfYouHaveTheNameOfASpecificSoftwareProductAndWantToEntity extends CvedbEntityBase<IfYouHaveTheNameOfASpecificSoftwareProductAndWantTo> {
    constructor(client: CvedbSDK, entopts: any);
    make(this: IfYouHaveTheNameOfASpecificSoftwareProductAndWantToEntity): IfYouHaveTheNameOfASpecificSoftwareProductAndWantToEntity;
    load(this: any, reqmatch?: IfYouHaveTheNameOfASpecificSoftwareProductAndWantToLoadMatch, ctrl?: Control): Promise<IfYouHaveTheNameOfASpecificSoftwareProductAndWantToEntity>;
}
export { IfYouHaveTheNameOfASpecificSoftwareProductAndWantToEntity };
