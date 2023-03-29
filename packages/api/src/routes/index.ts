import { Request, Response, Router } from 'express';

import List from "./ListRoute";
import Add from "./AddRoute";
import Delete from "./DeleteRoute";
import Update from "./UpdateRoute";

const routers = Router();


routers.get('/', (request: Request, response: Response) => {
  return response.status(200).json({
    api: 'API Brain Agriculture',
    version: '1.0.0',
    developer: {
      name: 'Brain Agriculture v1'
    }
  });
});

routers.use('/ruralproducer', List);
routers.use('/ruralproducer', Add);
routers.use('/ruralproducer', Delete);
routers.use('/ruralproducer', Update);

export default routers;
