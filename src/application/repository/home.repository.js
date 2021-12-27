export default class HomeRepository {
    /**
     * @typedef {Object} Message
     * @property {string} message - passing a friendly message.
    */

    /**
     * Sample data for test. return a welcome message
     * @returns { Message }
     */
    getWelcomeData(){
        return {
            message: "Welcome to the host API"
        }
    }

}