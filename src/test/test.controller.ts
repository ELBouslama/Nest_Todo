import { Controller, Get, Post } from '@nestjs/common';

@Controller('test')
export class TestController {


@Get("")
get() : String {
    console.log("Get test ") ; 
    return'GET Test' ; 
}

@Post("")
post() : String {
    console.log("Post test ") ; 
    return'Post Test' ; 
}



}
