import * as express from 'express';
import login from './routes/login';
import teams from './routes/teams';
import matches from './routes/matches';
import leaderboards from './routes/leaderboards';
//
class App {
  public app: express.Express;

  constructor() {
    this.app = express();

    this.config();
    this.app.use(login);
    this.app.use(teams);
    this.app.use(matches);
    this.app.use(leaderboards);

    // Não remover essa rota
    this.app.get('/', (req, res) => res.json({ ok: true }));
  }

  private config():void {
    const accessControl: express.RequestHandler = (_req, res, next) => {
      res.header('Access-Control-Allow-Origin', '*');
      res.header('Access-Control-Allow-Methods', 'GET,POST,DELETE,OPTIONS,PUT,PATCH');
      res.header('Access-Control-Allow-Headers', '*');
      next();
    };

    this.app.use(express.json());
    this.app.use(accessControl);
  }

  public start(PORT: string | number):void {
    this.app.listen(PORT, () => console.log(`Running on port ${PORT}`));
  }
}

export { App };

// A execução dos testes de cobertura depende dessa exportação
export const { app } = new App();
