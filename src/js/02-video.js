import Player from '@vimeo/player';
import throttle from 'lodash.throttle';

const iframe = document.querySelector('iframe');
const player = new Player(iframe);
const CURRENT_TIME_PLAYER = "videoplayer-current-time";
const startPlayingTime = localStorage.getItem(CURRENT_TIME_PLAYER);

// function gettingTimeFromStorage(time) {
//     try {
//         const timeOBJ = localStorage.getItem(time);
//         return timeOBJ === null ? undefined : JSON.parse(timeOBJ);
//     } catch (error) {
//         console.error("Get state error: ", error.message);
//     }
// }

function savingCurrentTimePlaying(currentTime) {
    // console.log(currentTime);
    try {
        const timeStorage = JSON.stringify(currentTime.seconds);
        localStorage.setItem(CURRENT_TIME_PLAYER, timeStorage);
    } catch (error) {
        console.error("Set state error: ", error.message);
    }
}

player.on('timeupdate', throttle(savingCurrentTimePlaying, 1000));

if (startPlayingTime !== null) {
    player.setCurrentTime(startPlayingTime).then(function (seconds) {
        console.log(seconds);
        // seconds = the actual time that the player seeked to
    }).catch(function (error) {
        switch (error.name) {
            case 'RangeError':
                // the time was less than 0 or greater than the video’s duration
                break;

            default:
                // some other error occurred
                break;
        }
    });
};