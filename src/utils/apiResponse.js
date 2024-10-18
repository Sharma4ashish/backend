class ApiResponse {
    constructor(statusCode ,data,Message= "success"){
        this.statusCode = statusCode
        this.data = data
        this.Message = Message

    }
}