import React from "react";

const Statistics = (props) => {
    return(
        <div className="howmanyhours-container pushFooter">
            <div className="howmanyhours">
                <div className="totalHours">
                    <h1><span>{(props.tvShowStats.hours + props.movieStats.hours).toFixed()}</span></h1>
                    <p>Total Hours Spent Watching Netflix</p>

                    <img src="/static/chevron-down.jpg" alt="Scroll Down For More Stats" />
                </div>

                <div className="totalTvHours">
                    <h1>You watched <span>{props.tvShowStats.hours.toFixed()}</span> hours of TV</h1>
                    <div style={{ width: "100%", display: "flex", justifyContent: "center" }}>
                        <p>across <span>{props.tvShowStats.amountOfShows}</span> shows</p>
                        <p>which had <span>{props.tvShowStats.amountOfEpisodes}</span> episodes</p>
                    </div>                    
                </div>

                <div className="totalMovieHours">
                    <h1>and you watched <span>{props.movieStats.hours.toFixed()}</span> hours of Movies</h1>
                    <p>across <span>{props.movieStats.amount}</span> movies</p>
                </div>

                <div className="most">
                    <p><span>{props.most.mostHours.toFixed()}</span> is your most amount of hours in one day...</p>
                    <p>...where you watched</p>
                    {props.renderMostInADay()}
                </div>
            </div>
        </div>
    )
}

export default Statistics;