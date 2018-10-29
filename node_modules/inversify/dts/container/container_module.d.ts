import { interfaces } from "../interfaces/interfaces";
declare class ContainerModule implements interfaces.ContainerModule {
    guid: string;
    registry: interfaces.ContainerModuleCallBack;
    constructor(registry: interfaces.ContainerModuleCallBack);
}
export { ContainerModule };
