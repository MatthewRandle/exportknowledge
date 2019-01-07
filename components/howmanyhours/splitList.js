//Split the list into 2 list containing tv shows and movies
export function splitList(list, movies, tvshows) {
    if(list == null) { return; }
    
    list.forEach(element => {
        let showOrMovie = element[0].substring(1, element[0].length-1); //gets rid of "" which each element has

        //If element is a tv show
        if (showOrMovie.indexOf("Season") !== -1 
        || showOrMovie.indexOf("Series") !== -1 
        || showOrMovie.indexOf("Chapter") !== -1 
        || showOrMovie.indexOf("Volume") !== -1 
        || showOrMovie.indexOf("Vol.") !== -1
        || occurrences(showOrMovie, ":") > 1) {
            splitTVShow(showOrMovie, tvshows);
        }
        //Else its a movie
        else {
            splitMovies(showOrMovie, movies);
        }
    });
}

function splitTVShow(element, tvshows) {
    let colonIndex = element.indexOf(":");

    element = colonIndex !== -1 ? element.substring(0, colonIndex).trim() : element;

    if(element.indexOf("(U.K.)") !== -1) {
        let regionIndex = element.indexOf("(U.K.)");
        element = element.substring(0, regionIndex).trim();
    }

    if (element.indexOf("(U.S.)") !== -1) {
        let regionIndex = element.indexOf("(U.S.)");
        element = element.substring(0, regionIndex).trim();
    }

    let showExists = false;
    let showIndex; //If show exists showIndex will be the index that the show exists at

    //For each of the shows in tvshows
    for (let i = 0; i < tvshows.length; i++) {
        //If element already exists in tvshows array
        if (element === tvshows[i][0]) {
            showExists = true;
            showIndex = i;
            i = tvshows.length; //Exits loop
        }
    }

    //If the show isnt in array yet, add it as a new one with only one episode
    if (!showExists) {
        tvshows.push([element, 1]);
    }
    else {
        //Show exists so just add 1 to the count column
        tvshows[showIndex][1]++;
    }
}

function splitMovies(element, movies) {
    let movieExists = false;
    let movieIndex;

    for (let i = 0; i < movies.length; i++) {
        //If movie already exists in movies array
        if (element === movies[i][0]) {
            movieExists = true;
            movieIndex = i;
            i = movies.length; //Exists loop
        }
    }

    if (!movieExists) {
        movies.push([element, 1]);
    }
    else {
        movies[movieIndex][1]++;
    }
}

function occurrences(string, subString, allowOverlapping) {
    string += "";
    subString += "";
    if (subString.length <= 0) return (string.length + 1);

    var n = 0,
        pos = 0,
        step = allowOverlapping ? 1 : subString.length;

    while (true) {
        pos = string.indexOf(subString, pos);
        if (pos >= 0) {
            ++n;
            pos += step;
        } else break;
    }
    return n;
}