export const generateVideoThumbnails = async (videoFile, numberOfThumbnails) => {
    let thumbnail = [];
    let fractions = [];
    return new Promise(async (resolve, reject) => {
        if (!videoFile.type?.includes("video")) reject("Not a valid video file");
        await getVideoDuration(videoFile).then(async (duration) => {
            for (let i = 0; i <= duration; i += duration / numberOfThumbnails) {
                fractions.push(Math.floor(i));
            }
            let promiseArray = fractions.map((time) => {
                return getVideoThumbnail(videoFile, time)
            });
            await Promise.all(promiseArray).then((res) => {
                res.forEach((res) => {
                    thumbnail.push(res);
                });
                resolve(thumbnail);
            }).catch((err) => {
                console.error(err)
            }).finally((res) => {
                console.log(res);
                resolve(thumbnail);
            })
        });
        reject("Something went wrong");
    });
};

const getVideoThumbnail = (file, videoTimeInSeconds) => {
    return new Promise((resolve, reject) => {
        if (file.type.match("video")) {
            const video = document.createElement("video");
            video.src = URL.createObjectURL(file);
            video.onloadedmetadata = () => {
                video.currentTime = videoTimeInSeconds;
                video.onseeked = async () => {
                    const canvas = document.createElement("canvas");
                    canvas.width = video.videoWidth;
                    canvas.height = video.videoHeight;
                    const context = canvas.getContext("2d");
                    context.drawImage(video, 0, 0, canvas.width, canvas.height);
                    const thumbnailUrl = canvas.toDataURL("image/jpeg");
                    resolve(thumbnailUrl);
                };
            };
            video.onerror = () => {
                reject("Error loading video data");
            };
        } else {
            reject("File is not a valid video");
        }
    });
};

const getVideoDuration = (videoFile) => {
    return new Promise((resolve, reject) => {
        if (videoFile.type.match("video")) {
            const video = document.createElement("video");
            video.src = URL.createObjectURL(videoFile);
            video.onloadedmetadata = () => {
                resolve(video.duration);
            };
            video.onerror = () => {
                reject("Error loading video data");
            };
        } else {
            reject("File is not a valid video");
        }
    });
};
