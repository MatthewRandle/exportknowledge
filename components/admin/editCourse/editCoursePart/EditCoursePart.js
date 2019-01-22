import React from "react";
import { Formik, Field } from "formik";

import "../../../../stylesheets/css/EditCourse.css";

const EditCoursePart = (props) => {
    return(
        <div className="editCourse_container">
            <div className="editCourse">
                <div className="editCourse_form">
                    <Formik
                        enableReinitialize={true}
                        initialValues={{
                            title: props.part ? props.part.title : "",
                            video: props.part ? props.part.video || "" : "",
                            description: props.part ? props.part.description : "",
                            url: props.part ? props.part.url : "",
                            text: props.part ? props.part.text : "",
                            length: props.part ? props.part.length : "",
                            part: props.part ? props.part.part : "",
                            exists: props.part ? props.part.exists : 0,
                        }}
                        onSubmit={(values) => {
                            props.submit(
                                values.title,
                                values.video,
                                values.description,
                                values.url,
                                values.text,
                                values.length,
                                values.part,
                                values.exists
                            );
                        }}
                        render={({
                            values,
                            handleSubmit,
                            handleChange
                        }) => (
                                <form autoComplete="off" onSubmit={handleSubmit}>
                                    <p>Desired URL</p>
                                    <Field
                                        type="text"
                                        name="url"
                                        value={values.url}
                                    />

                                    <p>Part</p>
                                    <Field
                                        type="number"
                                        name="part"
                                        value={values.part}
                                        min="0"
                                    />

                                    <p>Title</p>
                                    <Field
                                        type="text"
                                        name="title"
                                        value={values.title}
                                    />

                                    <p>Video</p>
                                    <Field
                                        type="text"
                                        name="video"
                                        value={values.video}
                                    />

                                    <p>Length</p>
                                    <Field
                                        type="number"
                                        name="length"
                                        value={values.length}
                                        min="0"
                                    />

                                    <p>Description</p>
                                    <textarea
                                        style={{ resize: "none", height: "400px", fontSize: "1.2rem" }}
                                        className="editArticle_form_text"
                                        name="description"
                                        cols="30"
                                        rows="100"
                                        onChange={handleChange}
                                        value={values.description}
                                        maxLength={500}
                                    />

                                    <p>Text</p>
                                    <textarea
                                        style={{ resize: "none", height: "700px", fontSize: "1.2rem" }}
                                        className="editArticle_form_text"
                                        name="text"
                                        cols="30"
                                        rows="300"
                                        onChange={handleChange}
                                        value={values.text}
                                        maxLength={15000}
                                    />

                                    <p>Exists</p>
                                    <Field
                                        type="number"
                                        name="exists"
                                        value={values.exists}
                                        min="0"
                                        max="1"
                                    />

                                    <br />
                                    <button type="submit">
                                        Submit
                                    </button>

                                    <br />
                                    <button onClick={() => props.delete(props.part ? props.part.id || null : null)}>
                                        Delete
                                    </button>

                                    <div className="editArticle_error">
                                        <p>{props.adminError || props.error}</p>
                                    </div>
                                </form>
                            )}
                    />
                </div>
            </div>
        </div>
    );
}

export default EditCoursePart;