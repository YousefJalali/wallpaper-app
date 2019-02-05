const functions = require("firebase-functions");
const admin = require("firebase-admin");
admin.initializeApp();
const { Storage } = require("@google-cloud/storage");
const os = require("os");
const path = require("path");
const spawn = require("child-process-promise").spawn;
const pushId = require("./generate-pushid");

const gcs = new Storage({
  projectId: "skull-background",
  keyFilename: "./service-account-credentials.json"
});

const THUMB_MAX_HEIGHT = 500;
const THUMB_MAX_WIDTH = 500;
const THUMB_PREFIX = "thumb_";

exports.createThumbnail = functions.storage
  .object()
  .onFinalize((object, context) => {
    const filePath = object.name;
    const fileDir = path.dirname(filePath);
    const fileName = path.basename(filePath);
    const thumbFilePath = path.normalize(
      path.join(fileDir, `${THUMB_PREFIX}${fileName}`)
    );
    const contentType = object.contentType;

    //avoid infinite loop
    if (path.basename(filePath).startsWith(THUMB_PREFIX)) {
      return;
    }

    const bucket = gcs.bucket(object.bucket);
    const tmpFilePath = path.join(os.tmpdir(), fileName);
    const metadata = { contentType };

    return bucket
      .file(filePath)
      .download({
        destination: tmpFilePath
      })
      .then(() => {
        return spawn("convert", [
          tmpFilePath,
          "-resize",
          `${THUMB_MAX_WIDTH}x${THUMB_MAX_HEIGHT}`,
          tmpFilePath
        ]).then(() => {
          return bucket.upload(tmpFilePath, {
            destination: THUMB_PREFIX + fileName,
            metadata
          });
        });
      })
      .then(() => {
        const config = {
          action: "read",
          expires: "03-01-2500"
        };
        return Promise.all([
          bucket.file(thumbFilePath).getSignedUrl(config),
          bucket.file(filePath).getSignedUrl(config)
        ]);
      })
      .then(results => {
        const thumbResult = results[0];
        const originalResult = results[1];
        const thumbFileUrl = thumbResult[0];
        const fileUrl = originalResult[0];
        const id = pushId();
        // Add the URLs to the Database
        return admin
          .database()
          .ref("wallpapers")
          .push({ id, url: fileUrl, thumbnailUrl: thumbFileUrl });
      });
  });
