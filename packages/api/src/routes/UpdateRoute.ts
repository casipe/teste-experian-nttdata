import { Request, Response, Router } from 'express';
import db from '../db';
const router = Router();


router.put('/:id', async (req: Request, resp: Response) => {

    const datas: any = req.body;
    const id = String(req.params?.id);
    const updateDatas = [
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
    console.log({ updateDatas })
    let errorMessage = '';
    const sql = `UPDATE ruralproducer SET        
            doc=?,
            nome=? ,
            nomeFazenda=? ,
            cidade=? ,
            uf=?,
            culturaPlantada=?,
            areaTotal=?,
            areaVegetacao =?,
            areaAgricultavel=? 
                WHERE id = "${id}"`;

    db.serialize(() => {
        db.run(sql, updateDatas, function (err) {
            if (err) {
                errorMessage = err.message;
            }
        });
    });


    setTimeout(() => { return resp.status(errorMessage === '' ? 200 : 400).json({ massage: errorMessage, error: errorMessage !== '' }); }, 1e3)
});

export default router;