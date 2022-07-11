// Is Fav

function isFavs(arr, path, id){

  // If we are on the watch later page...then no 
  // need to check for what is added to watch as they all set to watch later
  if(path === '/favourites'){
      return true;
  }

  // If there is nothing added to watch later...
  // then no need to check if movie has been added.
  if(arr.length === 0){
    return false;
  }

  // Checks whether the object is favourited
  return arr.some((obj) => obj.id === id);

}

export default isFavs;