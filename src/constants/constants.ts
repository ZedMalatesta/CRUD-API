export enum ResponceMessages {
    INTERNAL_ERROR_MESSAGE = "Invernal server error",
    NOT_FOUND_ERROR_MESSAGE = "Not found",
    INVALID_DATA = 'Invalid data',
    DELETE_SUCCESS = 'Record was successfully deleted'
}

export enum StatusCodes {
    OK = 200,
    CREATED = 201,
    NO_CONTENT = 204,
    INVALID_DATA = 400,
    NOT_FOUND = 404,
    INTERNAL_ERROR = 500
}

export enum Headers {
    TEXT = 'plain/text',
    JSON = 'application/json'
}