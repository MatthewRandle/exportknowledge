import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import Link from "next/link";

import Article from "./Article";
import { fetchArticle, clearArticle } from "./ArticleActions";
import { clearComment } from "../comment/CommentActions";
import ParseText from "../ParseText";

class ArticleContainer extends Component {
    constructor(props) {
        super(props);
        this.state = { videoPlaying: false };
    }

    componentWillUnmount() {
        this.props.clearArticle();
        this.props.clearComment();
    }

    getTitle() {
        if(this.props.article) {
            if(this.props.article.selectedArticle) {
                return this.props.article.selectedArticle.title;  
            }
        }

        return null;
    }

    getImage() {
        if (this.props.article) {
            if (this.props.article.selectedArticle) {
                return this.props.article.selectedArticle.image;
            }
        }              
               
        return null;      
    }

    getVideo() {
        if (this.props.article) {
            if (this.props.article.selectedArticle) {
                if (this.props.article.selectedArticle.video.length > 0) {
                    return this.props.article.selectedArticle.video;
                }
                else {
                    return null;
                }
            }
        }  
            
        return null;
    }

    getPrerequisites() {        
        if (this.props.article) {
            if (this.props.article.selectedArticlesPrerequisites) {
                let prerequisites = this.props.article.selectedArticlesPrerequisites.map((item, i) => {
                    return <p key={i}>{item.title} - Available <Link href={item.url}><a className="article_prerequisites_available">here</a></Link></p>
                });

                return prerequisites;
            }
        }  
        
        return null;
    }

    getText() {
        if (this.props.article) {
            if (this.props.article.selectedArticle) {
                return <ParseText text={this.props.article.selectedArticle.text} />;
            }
        }       
            
        return null;
    }

    getFurtherReading() {
        if(this.props.article) {
            if(this.props.article.selectedArticlesFurtherReading) {
                let furtherReading = this.props.article.selectedArticlesFurtherReading.map((item, i) => {
                    return <p key={i}>{item.title} - Available <Link href={item.url}><a className="article_prerequisites_available">here</a></Link></p>
                });

                return furtherReading;
            }
        }          

        return null;
    }    

    render() {
        return (
            <Article
                title={this.getTitle()}
                image={this.getImage()}
                video={this.getVideo()}
                videoPlaying={this.state.videoPlaying}
                prerequisites={this.getPrerequisites()}
                text={this.getText()}
                furtherReading={this.getFurtherReading()}
                id={this.props.article ? this.props.article.selectedArticle ? this.props.article.selectedArticle.id : null : null}
            />
        );            
    }
}

function mapStateToProps({ article }) {
    return { article };
}

const mapDispatchToProps = dispatch => {
    return {
        fetchArticle: bindActionCreators(fetchArticle, dispatch),
        clearArticle: bindActionCreators(clearArticle, dispatch),
        clearComment: bindActionCreators(clearComment, dispatch)
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(ArticleContainer);