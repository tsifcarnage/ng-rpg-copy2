import { ClassType } from "../enums/class-type.enum";
import { IBaseEntity } from "./base-entity.interface";

export interface ICharacter extends IBaseEntity {
  type: ClassType;
  features: string[];
}

