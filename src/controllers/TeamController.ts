import AppDataSource from "../data-source";
import { Request, Response } from 'express';
import { Team } from "../entities/Teams";
import { Like } from "typeorm";
class TeamController {
    public async cadastrar(req: Request, res: Response): Promise<Response> {
        const team1 = new Team()
        team1.name = "Botafogo"
        const teams1 = await AppDataSource.getRepository(Team).save(team1)
        const team2 = new Team()
        team2.name = "Flamengo"
        const teams2 = await AppDataSource.getRepository(Team).save(team2)
        const team3 = new Team()
        team3.name = "Fluminense"
        const teams3 = await AppDataSource.getRepository(Team).save(team3)
        const team4 = new Team()
        team4.name = "Juventude"
        const teams4 = await AppDataSource.getRepository(Team).save(team4)
        const team5 = new Team()
        team5.name = "Palmeiras"
        const teams5 = await AppDataSource.getRepository(Team).save(team5)
        const team6 = new Team()
        team6.name = "Santos"
        const teams6 = await AppDataSource.getRepository(Team).save(team6)
        const team7 = new Team()
        team7.name = "São Gonçalo"
        const teams7 = await AppDataSource.getRepository(Team).save(team7)
        const team8 = new Team()
        team8.name = "São Paulo"
        const teams8 = await AppDataSource.getRepository(Team).save(team8)
        const teams = await AppDataSource.getRepository(Team).find({})
        return res.json({ teams })
    }
    public async getAll(req: Request, res: Response): Promise<Response> {
        const teams = await AppDataSource.getRepository(Team).find({
            order: {
                name: 'ASC'
            }
        })
        return res.json({ teams })
    }
    public async getAllTermo(req: Request, res: Response): Promise<Response> {
        const termo = req.params.termo;
        const teams = await AppDataSource.getRepository(Team).find({
            where: { name: Like(`%${termo}%`) },
            order: {
                name: 'ASC'
            }
        })
        return res.json({ teams })
    }
    public async create(req: Request, res: Response): Promise<Response> {
        const { name } = req.body;
        console.log(name)
        const team = new Team()
        team.name = name
        const teams = await AppDataSource.getRepository(Team).save(team).catch((e) => {

            console.log("detail", e.errno)
            if ( e.errno) {
                if ( e.errno == 19) {
                    return { error: 'Nome já existe' };
                }else{
                    return { error: 'Erro' };

                }
            }
        })

        return res.json({ teams })
    }
    public async update(req: Request, res: Response): Promise<Response> {
        const { id, name } = req.body;
        console.log(name)
        const team = await AppDataSource.getRepository(Team).findOneBy({id:id})
        team.name = name
        const teams = await AppDataSource.getRepository(Team).save(team).catch((e)=>{
            if ( e.errno) {
                if ( e.errno == 19) {
                    return { error: 'Nome já existe' };
                }else{
                    return { error: 'Erro' };

                }
            }
        })

        return res.json({ teams })
    }
    public async delete(req: Request, res: Response): Promise<Response> {
        const { id} = req.body;
        const teams = await AppDataSource.getRepository(Team).delete({id:id})

        return res.json({ teams })
    }
}
export default new TeamController();