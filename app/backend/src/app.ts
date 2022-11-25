import * as express from 'express';
import LoginRoutes from './database/routes/LoginRoutes';
import TeamRoutes from './database/routes/TeamRoutes';

class App {
  public app: express.Express;
  private loginRoutes: LoginRoutes;
  private teamRoutes: TeamRoutes;

  constructor() {
    this.app = express();

    this.config();

    this.loginRoutes = new LoginRoutes();
    this.teamRoutes = new TeamRoutes();

    // Não remover essa rota
    this.app.get('/', (_req, res) => res.json({ ok: true }));

    this.app.use('/login', this.loginRoutes.loginRouter);
    this.app.use('/teams', this.teamRoutes.teamRouter);
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

export default App;
