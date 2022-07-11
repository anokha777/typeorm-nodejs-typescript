import { DataSource } from 'typeorm';
import { Request, Response } from 'express';
import { AppDataSource } from '../../data-source';
import { Photo } from '../entity/Photo.entity';

export const testController = {
  getTest: async (req: Request, res: Response, next: any) => {
    const savedPhotos = await AppDataSource.manager.findBy(Photo, { id: 1 });
    console.log('All photos from the db: ', savedPhotos);
    res
      .status(200)
      .send({ success: true, message: 'Thankyou, get photos: ', savedPhotos });
  },

  saveTest: async (req: Request, res: Response, next: any) => {
    console.log('body req-----', req.body.name);
    const photo = new Photo();
    photo.name = 'Me and Bears';
    photo.description = 'I am near polar bears';
    photo.filename = 'photo-with-bears.jpg';
    photo.views = 1;
    photo.isPublished = true;

    await AppDataSource.manager.save(photo);
    console.log('Photo has been saved. Photo id is', photo.id);

    res.status(200).send({
      success: true,
      message: 'Photo has been saved. Photo is: ',
      photo,
    });
  },

  updateTest: async (req: Request, res: Response, next: any) => {
    await AppDataSource.manager.update(Photo, 1, { name: 'update name' });

    res.status(200).send({ success: true, message: 'Thankyou, updated test' });
  },

  deleteTest: async (req: Request, res: Response, next: any) => {
    await AppDataSource.manager.delete(Photo, 1);
    res.status(200).send({ success: true, message: 'Thankyou, deleted test' });
  },
};
