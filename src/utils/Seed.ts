import Player from '../entities/Player';
import { LinqRepository } from 'typeorm-linq-repository';

const SeedPlayers = async () => {
    const player = new Player();
    player.steamid = '76561198119135809';
    player.alias = 'Gabe';
    player.ip = '127.0.0.1';
    player.avatarUrl = 'https://steamcdn-a.akamaihd.net/steamcommunity/public/images/avatars/ba/bae002cf4909ff02182fccb3cefef10e3fdb8e8f_medium.jpg';

    const playerRepository = new LinqRepository(Player);
    await playerRepository.createQueryBuilder('players')
        .delete()
        .execute();
    await playerRepository.create(player);
}

const Seed = async () => {
    await SeedPlayers();
}

export default Seed;