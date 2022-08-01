import { Injectable } from '@nestjs/common';
import * as AWS from "aws-sdk";

@Injectable()
export class SharedServiceService {
    AWS_S3_BUCKET = process.env.AWS_S3_BUCKET;
    s3 = new AWS.S3({ accessKeyId: process.env.AWS_S3_ACCESS_KEY, secretAccessKey: process.env.AWS_S3_KEY_SECRET });

    async uploadFile(file) {
        const { originalname } = file;

        await this.uploadToS3(file.buffer, this.AWS_S3_BUCKET, originalname, file.mimetype);
    }

    async uploadToS3(file, bucket, name, mimetype) {
        const params = {
            Bucket: bucket,
            Key: String(name),
            Body: file,
            ContentType: mimetype,
            ContentDisposition:"inline",
            CreateBucketConfiguration: {
                LocationConstraint: "us-east-1"
            }
        };

        console.log(params);

        try {
            let s3Response = await this.s3.upload(params).promise();

            console.log(s3Response);
        } catch (e) {
            console.log(e);
        }
    }

    async createMultipartUpload(body) {
        const params = {
            Bucket: this.AWS_S3_BUCKET,
            Key: String(body.name),
        };

        return await this.s3.createMultipartUpload(params).promise();
    }

    async uploadPart(body) {
        const params = {
            Bucket: this.AWS_S3_BUCKET,
            Key: String(body.name),
            UploadId: body.uploadId,
            PartNumber: body.partNumber,
            Body: body.file,
        };

        return await this.s3.uploadPart(params).promise();
    }

    async completeMultiPart(body) {
        const params = {
            Bucket: this.AWS_S3_BUCKET,
            Key: String(body.name),
            UploadId: body.uploadId,
            MultipartUpload: {
                Parts: body.parts
            }
        };

        return await this.s3.completeMultipartUpload(params).promise();
    }
}
