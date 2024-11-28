import {
  S3Client,
  PutObjectCommand,
  GetObjectCommand,
} from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";
import { Buffer } from "buffer";
const bucketName = process.env.BUCKET_NAME;
const bucketRegion = process.env.BUCKET_REGION;
const accessKeyId = process.env.ACCESS_KEY;
const secretAccessKey = process.env.SECRET_ACCESS_KEY;

if (!accessKeyId || !secretAccessKey) {
  throw new Error("AWS credentials are not defined");
}

const s3Client = new S3Client({
  region: bucketRegion,
  credentials: {
    accessKeyId,
    secretAccessKey,
  },
});

export async function uploadFile(
  key: string,
  buffer: Buffer,
  contentType: string
) {
  const params = {
    Bucket: bucketName,
    Key: key,
    Body: buffer,
    ContentType: contentType,
  };
  const command = new PutObjectCommand(params);

  try {
    const response = await s3Client.send(command);
    console.log("S3 Response", response);
    const fileUrl = `https://${bucketName}.s3.${bucketRegion}.amazonaws.com/${key}`;
    return fileUrl;
  } catch (error) {
    console.error("S3 Error", error);
  }
}

export async function getPresignedUrl(key: string) {
  const command = new GetObjectCommand({
    Bucket: bucketName,
    Key: key,
  });

  try {
    const url = await getSignedUrl(s3Client, command, { expiresIn: 3600 });
    console.log("Presigned URL", url);
    return url;
  } catch (error) {
    console.error("Presigned URL Error", error);
  }
}
