import express, { Request, Response} from 'express';

interface Options {
  port: number;
}

export class Server {

  private app = express();
  private readonly port: number;

  constructor(options: Options) {
    const { port } = options;
    this.port = port;
  }

  async start() {
    
    this.app.use( express.json() );
    this.app.use( express.urlencoded({ extended: true }) );

    this.app.get("/",(req: Request, res: Response) => {
      res.json({
        message: "Server is working properly"
      });
    });

    this.app.listen(this.port, () => {
      console.log(`Server running on port ${ this.port }`);
    });
  }
}