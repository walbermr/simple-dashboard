import { ConnectionOptions } from "typeorm";
import Entities from "../database/typeorm/entities/entities";

const ConnectionObject: ConnectionOptions = {
    type: "sqlite",
    synchronize: true,
    logging: true,
    database: "userdatabase.db",
    entities: Entities
}

export default ConnectionObject
