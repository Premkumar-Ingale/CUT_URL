export const errorHandler=(err,req,res,next)=>{
    if(err instanceof AppError) {
        return res.status(err.statusCode).json({
            success: false,
            message: err.message,
        });
    }
    console.error(err)
    res.status(500).json({
        success: false,
        message:err.message || "Internal Server Error",
    });
}
export class AppError extends Error {
    statusCode;
    isOptional;

    constructor(message,statusCode=500,isOptional=true){
        super(message);
        this.statusCode=statusCode;
        this.isOptional=isOptional;
        Error.captureStackTrace(this,this.constructor);
    }
}
export class NotFoundError extends AppError{
    constructor(message="Resource Not Found"){
        super(message,404);
    }
}
export class ConflictError extends AppError{
    constructor(message="Conflict occured"){
        super(message,409);
    }
}
export class BadRequestError extends AppError{
    constructor(message="Bad Request"){
        super(message,400);
    }
}
export class UnauthorizedError extends AppError{
    constructor(message="Unotherized"){
        super(message,401);
    }
}