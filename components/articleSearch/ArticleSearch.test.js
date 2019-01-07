import React from 'react';
import { mount } from 'enzyme';

import { ArticleSearchContainer } from "./index";
import ArticleSearch from "./ArticleSearch";
import ArticleSearchLoader from "./ArticleSearchLoader";

describe("Tests for ArticlePanel container", () => {
    let defaultProps = {
        fetchAllTags: jest.fn(),
        fetchAllArticles: jest.fn(),
        article: {
            all: undefined,
            tags: undefined
        }
    };

    const articleSearchContainer = (props) => {
        const wrapper = mount(<ArticleSearchContainer {...{ ...defaultProps, ...props }} />);
        return wrapper;
    };

    test("Renders <ArticleSearch /> if article props 'all' and 'tags' are passed", () => {
        const wrapper = articleSearchContainer({ 
            article: { 
                all: [],
                tags: []
            }}
        );

        expect(wrapper.find(ArticleSearch).length).toBe(1);
    })

    test("Renders <ArticleSearchLoader /> if article props 'all' and 'tags' are undefined", () => {
        const wrapper = articleSearchContainer();

        expect(wrapper.find(ArticleSearchLoader).length).toBe(1);
    })
});