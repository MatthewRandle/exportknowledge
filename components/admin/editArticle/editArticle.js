import React from "react";
import { Formik, Field } from "formik";
import Select from "react-select";

import "../../../stylesheets/css/EditArticle.css";

const EditArticle = (props) => {
    console.log(props.error)
    return(
        <div className="editArticle_container">
            <div className="editArticle_form">
                <Formik
                    enableReinitialize= {true}
                    initialValues={{
                        url: props.article ? props.article.url : "",
                        title: props.article ? props.article.title : "",
                        image: props.article ? props.article.image : "",
                        video: props.article ? props.article.video || "" : "",
                        text: props.article ? props.article.text : "",
                        exists: props.article ? props.article.exists : 0,
                        description: props.article ? props.article.description : ""
                    }}
                    onSubmit={(values) => {
                        props.submit(
                                props.article ? props.article.id || null : null,
                                values.url, 
                                values.title, 
                                values.image, 
                                values.text, 
                                values.video, 
                                values.exists,
                                values.description
                            );
                    }}
                    render={({
                        values,
                        handleSubmit,
                        setFieldValue,
                        handleChange
                    }) => (                        
                        <form autoComplete="off" onSubmit={handleSubmit}>
                            <p>Desired URL</p>
                            <Field
                                className="editArticle_form_url"
                                type="text"
                                name="url"
                                value={values.url}
                            />

                            <p>Title</p>
                            <Field
                                className="editArticle_form_title"
                                type="text"
                                name="title"
                                value={values.title}
                            />

                            <p>Image</p>
                            <Field
                                className="editArticle_form_image"
                                type="text"
                                name="image"
                                value={values.image}
                            />

                            <p>Video</p>
                            <Field
                                className="editArticle_form_video"
                                type="text"
                                name="video"
                                value={values.video}
                            />

                            <p>Prerequisites</p>
                            <Select
                                className="editArticle_form_prerequisites"
                                name="prerequisites"
                                value={props.selectedPrerequisites}
                                onChange={props.handlePrerequisiteChange}
                                isMulti
                                options={props.prerequisites}
                            />

                            <p>Description</p>
                            <textarea 
                                maxLength={150}
                                style={{ resize: "none", height: "100px" }}
                                name="description"
                                cols="30"
                                rows="300"
                                onChange={handleChange}
                                value={values.description}   
                            />

                            <p>Text</p>
                            <textarea
                                style={{ resize: "none", height: "700px" }}
                                className="editArticle_form_text"
                                name="text"
                                cols="30"
                                rows="300"   
                                onChange={handleChange} 
                                value={values.text}                      
                            />

                            <p>Tags</p>
                            <Select
                                className="editArticle_form_tags"
                                name="tags"
                                value={props.selectedTags}
                                onChange={props.handleTagsChange}
                                isMulti
                                options={props.tags}
                            />

                            <p>Exists</p>
                            <Field
                                type="number"
                                name="exists"
                                value={values.exists}
                                min="0"
                                max="1"
                            />

                            <br/>
                            <button type="submit">
                                Submit
                            </button>

                            <br/>
                            <button onClick={() => props.delete(props.article ? props.article.id : null)}>
                                Delete
                            </button>

                            {props.error ? props.error.databaseError ? <p>{props.error.databaseError.sqlMessage}</p> : null : null}

                            <div className="editArticle_error">
                                <p>{props.adminError || props.error}</p>
                            </div>
                        </form>
                    )}
                />
            </div>            
        </div>
    );
};

export default EditArticle;