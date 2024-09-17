import "reflect-metadata"
import { DataSource } from "typeorm"
import { Paciente } from "./entity/Paciente"
import { Cargo } from "./entity/Cargo"
import { Funcionario } from "./entity/Funcionario"
import { Medico } from "./entity/Medico"
import { Especializacao } from "./entity/Especializacao"
import { Consulta } from "./entity/Consulta"

export const AppDataSource = new DataSource({
    type: "postgres",
    host: "localhost",
    port: 5432,
    username: "postgres",
    password: "1234",
    database: "medtec-bd",
    synchronize: true,
    logging: false,
    entities: [Paciente, Cargo, Funcionario, Medico, Especializacao, Consulta],
    migrations: [],
    subscribers: [],
})
