import * as express from 'express';
import LoginRoutes from './database/routes/LoginRoutes';
import TeamRoutes from './database/routes/TeamRoutes';
import MatchRoutes from './database/routes/MatchRoutes';
import LeaderBoardRoutes from './database/routes/LeaderBoardRoutes';

class App {
  public app: express.Express;
  private loginRoutes: LoginRoutes;
  private teamRoutes: TeamRoutes;
  private matchRoutes: MatchRoutes;
  private leaderBoardRoutes: LeaderBoardRoutes;

  constructor() {
    this.app = express();

    this.config();

    this.loginRoutes = new LoginRoutes();
    this.teamRoutes = new TeamRoutes();
    this.matchRoutes = new MatchRoutes();
    this.leaderBoardRoutes = new LeaderBoardRoutes();

    // Não remover essa rota
    this.app.get('/', (_req, res) => res.json({ ok: true }));

    this.app.use('/login', this.loginRoutes.loginRouter);
    this.app.use('/teams', this.teamRoutes.teamRouter);
    this.app.use('/matches', this.matchRoutes.matchRouter);
    this.app.use('/leaderboard', this.leaderBoardRoutes.leaderBoardRouter);
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
