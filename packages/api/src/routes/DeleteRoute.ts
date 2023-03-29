import { Request, Response, Router } from 'express';
import db from '../db';
const router = Router();


router.delete('/:id', async (req: Request, resp: Response) => {
    const id = String(req.params?.id);
    let errorMessage = '';
    db.serialize(() => {
        db.run('DELETE FROM ruralproducer WHERE id = ?', id, function (err) {
            if (err) {
                errorMessage = err.message;
            }
        });
    });

    setTimeout(() => { return resp.status(errorMessage === '' ? 200 : 400).json({ massage: errorMessage, error: errorMessage !== '' }); }, 1e3)

});

export default router;