export default function calcMostInADay(tvStats, movieStats, originalData) {
    let newData = new Array(0); //will hold [name, date, length]

    originalData.forEach(item => {
        let showOrMovie = item[0].substring(1, item[0].length - 1); //gets rid of "" which each element has
        let date = item[1].substring(1, item[1].length - 1);

        //If element is a tv show
        if (showOrMovie.indexOf("Season") !== -1
            || showOrMovie.indexOf("Series") !== -1
            || showOrMovie.indexOf("Chapter") !== -1
            || showOrMovie.indexOf("Volume") !== -1
            || showOrMovie.indexOf("Vol.") !== -1
            || occurrences(showOrMovie, ":") > 1) 
        {
            //make the show name the same as it is in the tvStats (removes all parts except identifier, e.g. Spartacus: Blood and Sand => Spartacus)
            let colonIndex = showOrMovie.indexOf(":");
            let showName = colonIndex !== -1 ? showOrMovie.substring(0, colonIndex).trim() : showOrMovie;
            if (showName.indexOf("(U.K.)") !== -1) {
                let regionIndex = showName.indexOf("(U.K.)");
                showName = showName.substring(0, regionIndex).trim();
            }
            if (showName.indexOf("(U.S.)") !== -1) {
                let regionIndex = showName.indexOf("(U.S.)");
                showName = showName.substring(0, regionIndex).trim();
            }            

            tvStats.forEach(show => {
                if(show[2] === showName) { //show[2] is name of show
                    newData.push([ showName, date, show[0] ]); //[name, date, runtime]
                }
            })
        }
        //Else its a movie
        else {
            let movieName = showOrMovie;

            movieStats.forEach(movie => {
                if(movie[2] === movieName) { //if names are equal
                    newData.push([movieName, date, movie[0]]);
                }
            })
        }
    })

    let mostMinutes = 0;
    let mostAmount = 0;
    let mostDate;
    let currentDate = newData[0][1];
    let currentAmount = 0;
    let currentMinutes = 0;

    newData.forEach(item => {
        let date = item[1];

        if (date === currentDate) {
            currentAmount++;
            currentMinutes += item[2];
        }
        else {
            //we found a new date with most watched
            if (currentMinutes > mostMinutes) {
                mostMinutes = currentMinutes;
                mostAmount = currentAmount;
                mostDate = currentDate;
            }

            //we got here because we got a new date, so set the variables accordingly
            currentMinutes = item[2];
            currentAmount = 1;
            currentDate = date;
        }
    })

    let mostNames = new Array(0);

    newData.forEach(item => {
        if(item[1] === mostDate) { //if is one of the episodes/movies watched on the most watched day

            let existsInMostNames = false;

            for(let i = 0; i < mostNames.length; i++) {
                if(item[0] === mostNames[i][0]) {
                    mostNames[i][1]++;
                    existsInMostNames = true;
                    i = mostNames.length;
                }
            }

            if(!existsInMostNames) {
                mostNames.push([ item[0], 1, item[2] ]);
            }
        }
    })

    return { mostDate, mostHours: mostMinutes / 60, mostAmount, mostNames };
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