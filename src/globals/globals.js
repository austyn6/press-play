export const API_KEY = '4ac8b5633deda1984e79b0cac56ed039';

export const appStorageName = 'movie-favs';

export const appWatchStorageName = 'watch-later';

function getYear(){
    const d = new Date();
    return d.getFullYear();
}

export { getYear };