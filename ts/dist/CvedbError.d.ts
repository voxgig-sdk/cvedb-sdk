import { Context } from './Context';
declare class CvedbError extends Error {
    isCvedbError: boolean;
    sdk: string;
    code: string;
    ctx: Context;
    status: number;
    get notFound(): boolean;
    constructor(code: string, msg: string, ctx: Context);
}
export { CvedbError };
