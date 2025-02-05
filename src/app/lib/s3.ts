import {
  S3Client,
  PutObjectCommand,
  ListObjectsV2Command,
  DeleteObjectsCommand,
} from "@aws-sdk/client-s3";

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
    // const fileUrl = `https://${bucketName}.s3.${bucketRegion}.amazonaws.com/${key}`;
    return fileUrl;
  } catch (error) {
    console.error("S3 Error", error);
  }
}

export async function deleteFile(location: string) {
  const params = {
    Bucket: bucketName,
    Prefix: location,
  };
  const listCommand = new ListObjectsV2Command(params);
  let list = await s3Client.send(listCommand);
  if (list.KeyCount) {
    const deleteCommand = new DeleteObjectsCommand({
      Bucket: bucketName,
      Delete: {
        Objects: list.Contents?.map((content) => ({ Key: content.Key })),
        Quiet: false,
      },
    });
    let deleted = await s3Client.send(deleteCommand);
    if (deleted.Errors) {
      deleted.Errors.map((error) =>
        console.log(`${error.Key} could not be deleted - ${error.Code}`)
      );
    }
    return `${deleted.Deleted?.length} files deleted.`;
  }
}
