import { Injectable } from '@nestjs/common';
import * as AWS from "aws-sdk";

@Injectable()
export class SharedServiceService {
    AWS_S3_BUCKET = process.env.AWS_S3_BUCKET;
    s3 = new AWS.S3({ accessKeyId: process.env.AWS_S3_ACCESS_KEY, secretAccessKey: process.env.AWS_S3_KEY_SECRET });

    async createMultipartUpload(body) {
        const params = {
            Bucket: this.AWS_S3_BUCKET,
            Key: String(body.name),
        };

        return await this.s3.createMultipartUpload(params).promise();
    }

    async uploadPart(body) {
        // console.log('body', body);
        
        const params = {
            Bucket: this.AWS_S3_BUCKET,
            Key: String(body.name),
            UploadId: body.uploadId,
            PartNumber: body.partNumber,
            // Body: body.file,
        };

        return await this.s3.uploadPart(params).promise();
    }

    async completeMultiPart(body) {
        const params = {
            Bucket: this.AWS_S3_BUCKET,
            Key: String(body.name),
            UploadId: body.UploadId,
            MultipartUpload: {
                Parts: body.parts,
            }
        };

        return await this.s3.completeMultipartUpload(params).promise();
    }

    async getPreSignedUrl(body) {
        
        const params = {
            Bucket: this.AWS_S3_BUCKET,
            Key: String(body.name),
            Expires: 60,
            ContentType: body.contentType,
        };

        return await this.s3.getSignedUrlPromise('putObject', params);
    }

    async abortMultiPart(body) {
        const params = {
            Bucket: this.AWS_S3_BUCKET,
            Key: String(body.name),
            UploadId: body.uploadId,
        };

        return await this.s3.abortMultipartUpload(params).promise();
    }
}
