import faker from 'faker';

import AppError from '@shared/errors/AppError';

import FakeMusicStylesRepository from '@modules/music_styles/repositories/fakes/FakeMusicStylesRepository';
import CreateMusicStyleService from '@modules/music_styles/services/CreateMusicStyleService';

let fakeMusicStylesRepository: FakeMusicStylesRepository;
let createMusicStyle: CreateMusicStyleService;

describe('CreateMusicStyle', () => {
  beforeEach(() => {
    fakeMusicStylesRepository = new FakeMusicStylesRepository();

    createMusicStyle = new CreateMusicStyleService(fakeMusicStylesRepository);
  });

  it('should be able to create a new music style', async () => {
    const name = `${faker.name.title()} ${faker.name.title()}`;

    const musicStyle = await createMusicStyle.execute({
      name,
    });

    expect(musicStyle).toHaveProperty('id');
    expect(musicStyle.name).toBe(name);
  });

  it('should not be able to create a new music style with the name of another', async () => {
    const musicStyle = await fakeMusicStylesRepository.create({
      name: `${faker.name.title()} ${faker.name.title()}`,
    });

    await expect(
      createMusicStyle.execute({
        name: musicStyle.name,
      })
    ).rejects.toBeInstanceOf(AppError);
  });
});
