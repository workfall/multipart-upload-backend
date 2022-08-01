import { Body, Controller, Get, Inject, Post, UploadedFile, UseInterceptors } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { SharedServiceService } from './shared-service.service';

@Controller('')
export class SharedServiceController {
    constructor(
        private sharedServiceService: SharedServiceService
    ) {}

    @Post('upload-file')
    @UseInterceptors(FileInterceptor('file'))
    async uploadFile(@UploadedFile() file: Express.Multer.File) {
        return await this.sharedServiceService.uploadFile(file);
    }

    @Post('create-multipart')
    async createMultiPart(@Body() body: any) {
        return await this.sharedServiceService.createMultipartUpload(body);
    }

    @Post('upload-part')
    async uploadPart(@Body() body: any) {
        return await this.sharedServiceService.uploadPart(body);
    }

    @Post('complete-multipart')
    async completeMultiPart(@Body() body: any) {
        return await this.sharedServiceService.completeMultiPart(body);
    }
}
