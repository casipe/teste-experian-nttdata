
var sqlite3 = require('sqlite3').verbose();
var db = new sqlite3.Database('./database.db');
const uuid = require('uuid');
import { datasMock } from './mock';

export default db;
export const initDb = () => {
    db.run(`DROP TABLE IF EXISTS ruralproducer;`);
    setTimeout(() => {
        db.run(`CREATE TABLE ruralproducer(
                id TEXT, 
                nome TEXT,
                doc TEXT,
                nomeFazenda TEXT,
                cidade TEXT,
                uf TEXT,
                culturaPlantada TEXT,
                areaTotal TEXT,
                areaVegetacao TEXT,
                areaAgricultavel TEXT
            )`)
    }, 1e3);



    setTimeout(() => {
        datasMock.map((datas) => {


            const insertDatas = [
                uuid.v1(),
                datas.doc,
                datas.nome,
                datas.nomeFazenda,
                datas.cidade,
                datas.uf,
                datas.culturaPlantada,
                datas.areaTotal,
                datas.areaVegetacao,
                datas.areaAgricultavel
            ];

            db.serialize(() => {
                db.serialize(() => {
                    db.run(`INSERT INTO ruralproducer( 
            id,
            doc,
            nome ,
            nomeFazenda ,
            cidade ,
            uf,
            culturaPlantada,
            areaTotal,
            areaVegetacao ,
            areaAgricultavel) VALUES(?,?,?,?,?,?,?,?,?,?)`, insertDatas, function (err) {
                        if (err) {
                            console.log("Erro insert Mock", err.message);
                        }
                    });
                });
            });

        });
    }, 1e3);
};