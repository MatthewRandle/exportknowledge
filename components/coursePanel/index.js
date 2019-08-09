import Link from "next/link";

export default (props) => {
    return(
        <div className="coursePanel">
            <img src={props.image} alt={props.title || "Course"}/>
            <div className="coursePanel_content">
                <h2>{props.title}</h2>
                <p>{props.description}</p>

                {/* <button>{props.parts} Parts</button> */}
                <Link href={props.url}>
                    <a className="coursePanel_button">Start Course</a>
                </Link>
            </div>
        </div>
    )
}