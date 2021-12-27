import  express from 'express';
import ProjectDependencies from './src/dependencies';
import apiRouter from './src/controller';


const app = express();
const PORT = process.env.PORT || 3000;

ProjectDependencies.getInstance().DatabaseService.initDatabase().then(() => {

    app.use(express.json());
    app.use('/api/v1', apiRouter(ProjectDependencies.getInstance()));

    app.listen(PORT, () => { console.log(`Application started on port ${PORT}`); });

}).catch(err => {
    throw err;
});