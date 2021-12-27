import DatabaseService from './DatabaseService';

export default class ProjectDependencies {

    static dependencies;

    constructor(){
        this.DatabaseService = new DatabaseService();
    }

    /**
     * return the ProjectDependecies Instance.
     * @returns {ProjectDependencies} return an instance of ProjectDependencies.
    */
    static getInstance() {
        if(ProjectDependencies.dependencies == null) { ProjectDependencies.dependencies = new ProjectDependencies(); }
        return ProjectDependencies.dependencies;
    }
}