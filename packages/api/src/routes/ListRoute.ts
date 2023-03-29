import { Request, Response, Router } from 'express';
import db from '../db';
const router = Router();


router.get('/', async (req: Request, resp: Response) => {
    let datas: any[] = [];
    await db.serialize(() => {
        db.all('SELECT * FROM ruralproducer', function (err, rows) {
            if (err) {
                return console.error('Error list API',err.message);
            }
            datas = rows;
        });
    });
    setTimeout(() => { return resp.status(200).json({ datas, massage: '', error: false }); }, 1e3)
});

export default router;