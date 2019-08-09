import React from "react";
import { Formik, Field } from "formik";
import Select from "react-select";

import "../../../stylesheets/css/EditCourse.css";

const NewCourse = (props) => {
    return (
        <div className="editCourse_container pushFooter">
            <div className="editCourse">
                <div className="editCourse_form">
                    <Formik
                        enableReinitialize={true}
                        initialValues={{
                            url: props.course ? props.course.url : "",
                            title: props.course ? props.course.title : "",
                            image: props.course ? props.course.image : "",
                            video: props.course ? props.course.video || "" : "",
                            exists: props.course ? props.course.exists : 0,
                            description: props.course ? props.course.description : ""
                        }}
                        onSubmit={(values) => {
                            props.submit(
                                values.url,
                                values.title,
                                values.image,
                                values.video,
                                values.exists,
                                values.description
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

                                    <p>Image</p>
                                    <Field
                                        type="text"
                                        name="image"
                                        value={values.image}
                                    />

                                    <p>Video</p>
                                    <Field
                                        type="text"
                                        name="video"
                                        value={values.video}
                                    />

                                    <p>Preview Description</p>
                                    <textarea
                                        maxLength={150}
                                        style={{ resize: "none", height: "100px" }}
                                        name="preview"
                                        cols="30"
                                        rows="300"
                                        onChange={handleChange}
                                        value={values.preview}
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
                                        maxLength={250}
                                    />

                                    <p>Category</p>
                                    <Select
                                        name="category"
                                        value={props.selectedCategory}
                                        onChange={props.handleCategoryChange}
                                        options={props.categories}
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
                                    <button onClick={() => props.delete(props.article ? props.article.id || null : null)}>
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

export default NewCourse;