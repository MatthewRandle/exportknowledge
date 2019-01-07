import { splitList } from "./splitList";
import { getMovieIDs } from "./getMovieIDs";
import { getMovieStats } from "./getMovieStats";
import { getTVShowIDs } from "./getTVShowIDs";
import { getTVShowStats } from "./getTVShowStats";
import calcMostInADay from "./calculateMostInADay";

import errorHandler from "../../utils/actionErrorHandler";

export const FETCH_STATISTICS = "FETCH_STATISTICS";
export const SET_IN_PROGRESS = "SET_IN_PROGRESS";
export const ERROR = "ERROR";
export const SET_STATUS = "SET_STATUS";
export const CLEAR_STATISTICS = "CLEAR_STATISTICS";

async function formatFile(file, listItems) {
    //If file apis aren't supported by browser
    if (!(window.File && window.FileReader && window.FileList && window.Blob)) {
        throw new Error("Problem reading file.");
    }

    let formattedData;

    await new Promise((resolve, reject) => {
        let reader = new FileReader();
        

        reader.onload = function () {
            formattedData = processData(reader.result);
            resolve();
        };

        // start reading the file. When it is done, calls the onload event defined above.
        reader.readAsBinaryString(file);
    });

    return formattedData;
}

function processData(allText) {
    var allTextLines = allText.split(/\r\n|\n/);
    var headers = allTextLines[0].split(',');
    var lines = [];

    for (var i = 1; i < allTextLines.length; i++) {
        var data = allTextLines[i].split(',');
        if (data.length == headers.length) {

            var tarr = [];
            for (var j = 0; j < headers.length; j++) {
                tarr.push(data[j]);
            }
            lines.push(tarr);
        }
    }
    // alert(lines);
    return lines;
}

export const calculateStatistics = (file) => async dispatch => {
    try {     
        dispatch({ type: SET_STATUS, payload: { status: "Calculating..." } });

        let formattedData = await formatFile(file);

        let movies = new Array(0);
        let tvShows = new Array(0);

        splitList(formattedData, movies, tvShows);

        let movieIDs = await getMovieIDs(movies);
        let movieStats = await getMovieStats(movieIDs.ids);
        let movieStatsFormatted = formatMovieStats(movieStats.stats);

        let tvShowIDs = await getTVShowIDs(tvShows);
        let tvShowStats = await getTVShowStats(tvShowIDs.ids);
        let tvStatsFormatted = formatTvStats(tvShowStats.stats);

        let most = calcMostInADay(tvShowStats.stats, movieStats.stats, formattedData);

        dispatch({ type: SET_STATUS, payload: { status: null } });
        dispatch({ type: FETCH_STATISTICS, payload: { movieStats: movieStatsFormatted, tvShowStats: tvStatsFormatted, most } });
    }
    catch (err) {
        dispatch(errorHandler(err));
    }
};

function formatMovieStats(stats) {
    let amount = 0;
    let minutes = 0;

    stats.forEach(item => {
        amount += item[1];
        minutes += (item[0] * item[1]); //runtime * watches
    })

    return { amount, hours: minutes / 60 };
}

function formatTvStats(stats) {
    let amountOfShows = 0;
    let amountOfEpisodes = 0;
    let minutes = 0;

    stats.forEach(item => {
        amountOfShows++;
        amountOfEpisodes += item[1];
        minutes += (item[0] * item[1]); //runtime * amount of watched episodes
    })

    return { amountOfEpisodes, amountOfShows, hours: minutes / 60 };
}

export const setInProgress = (newValue) => dispatch => {
    dispatch({ type: SET_IN_PROGRESS, payload: newValue });
};

export const clearStatistics = () => dispatch => {
    console.log("clear stats");
    dispatch({ type: CLEAR_STATISTICS });
};