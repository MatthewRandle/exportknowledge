import React from "react";
import { Formik, Field } from "formik";

const NewCoursePart = (props) => {
    return (
        <div className="editCourse_container">
            <div className="editCourse">
                <div className="editCourse_form">
                    <Formik
                        enableReinitialize={true}
                        initialValues={{
                            title: "",
                            video: "",
                            description: "",
                            url: "",
                            text: "",
                            length: "",
                            exists: 0,
                        }}
                        onSubmit={(values) => {
                            props.submit(
                                values.title,
                                values.video,
                                values.description,
                                values.url,
                                values.text,
                                values.length,
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

export default NewCoursePart;