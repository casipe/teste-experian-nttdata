import { Request, Response, Router } from 'express';
const uuid = require('uuid');
import db from '../db';

const router = Router();


router.post('/', async (req: Request, resp: Response) => {

    const id = uuid.v1();
    const datas: any = req.body;

    const insertDatas = [
        id,
        datas.doc,
        datas.nome,
        datas.nomeFazenda,
        datas.cidade,
        datas.uf,
        datas.culturaPlantada,
        datas.areaTotal,
        datas.areaVegetacao,
        datas.areaAgricultavel
    ]
    console.error({ insertDatas })
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
                    return resp.status(400).json({ id: '', massage: err.message, error: true });
                }
            });
        });
    });

    return resp.status(200).json({ id, massage: '', error: false });

});

export default router;