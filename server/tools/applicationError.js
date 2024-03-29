module.exports = class applicationError extends Error {
    constructor(message, status) {
        super(message);

        Error.captureStackTrace(this, this.constructor);

        this.name = this.constructor.name;

        console.log(message);
        this.status = status || 500;
    }
}
