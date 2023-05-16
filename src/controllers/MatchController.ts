import AppDataSource from "../data-source";
import { Request, Response } from 'express';
import { Team } from "../entities/Teams";
import { Match } from "../entities/Match";
class MatchController{
    public async cadastrar(req: Request, res: Response): Promise<Response> {
        
        const teams1 = await AppDataSource.getRepository(Team).findOneBy({id:1})
       
        const teams2 = await AppDataSource.getRepository(Team).findOneBy({id:2})
       
        const teams3 = await AppDataSource.getRepository(Team).findOneBy({id:3})
    
        const teams4 = await AppDataSource.getRepository(Team).findOneBy({id:4})
    
        const teams5 = await AppDataSource.getRepository(Team).findOneBy({id:5})
      
        const teams6 = await AppDataSource.getRepository(Team).findOneBy({id:6})
        
        // const match1 = new Match()
        // match1.host = teams1
        // match1.visitor = teams2
        // match1.date = new Date("2020-04-19")
        // const matche1 = await AppDataSource.getRepository(Match).save(match1)

        // const match2 = new Match()
        // match1.host = teams3
        // match1.visitor = teams4
        // match1.date = new Date("2021-05-22")
        // const matche2 = await AppDataSource.getRepository(Match).save(match2)

        // const match3 = new Match()
        // match1.host = teams5
        // match1.visitor = teams6
        // match1.date = new Date("2022-09-22")
        // const matche3 = await AppDataSource.getRepository(Match).save(match3)

        const matches = await AppDataSource.getRepository(Match).find({relations:{host:true, visitor:true}})

        return res.json(matches)
    }
    public async create(req: Request, res: Response): Promise<Response> {
        const {idhost, idvisitor} = req.body
        
        const host = await AppDataSource.getRepository(Team).findOneBy({id:idhost})
       
        const visitor = await AppDataSource.getRepository(Team).findOneBy({id:idvisitor})
        
        const match = new Match()
        match.host = host
        match.visitor = visitor

        const newMatch = await AppDataSource.getRepository(Match).save(match)

        return res.json(newMatch)
    }
    public async listLimit(req: Request, res: Response): Promise<Response> {
        const {limit, offset} = req.body

        const Matches = await AppDataSource.getRepository(Match).find({
            relations:{host:true, visitor:true},
            order:{date:"DESC"},
            take:limit,
            skip:offset
        
        })

        return res.json(Matches)
    }
    public async listbyId(req: Request, res: Response): Promise<Response> {
        const id = req.params.id
        console.log(id)
        const team = await AppDataSource.getRepository(Team).findOneBy({id:parseInt(id)})

        const Matches = await AppDataSource.getRepository(Match).find({
            where:[{host:team},{visitor:team }],
            relations:{host:true, visitor:true},
            order:{date:"DESC"},
          
        
        })

        return res.json(Matches)
    }
    public async update(req: Request, res: Response): Promise<Response> {
        const {id,idhost,idvisitor,date} = req.body
        
        
        const host = await AppDataSource.getRepository(Team).findOneBy({id:idhost})
        console.log(host)
        if(!host){
            return res.json({error:"Mandante desconhecido"})
        }
        const visitor = await AppDataSource.getRepository(Team).findOneBy({id:idvisitor})
        if(!visitor){
            return res.json({error:"Visitante desconhecido"})
        }
        var match = await AppDataSource.getRepository(Match).findOneBy({id:id})
        match.host = host
        match.visitor = visitor
        match.date = date

        const updatedMatch = await AppDataSource.getRepository(Match).save(match)

        return res.json(updatedMatch)
    }
    public async delete(req: Request, res: Response): Promise<Response> {
        const { id} = req.body;
        const match = await AppDataSource.getRepository(Match).delete({id:id})

        return res.json({ match })
    }
}
export default new MatchController();