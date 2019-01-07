import React from 'react';
import { shallow, mount } from 'enzyme';

import { ArticlePanelContainer } from "./index";
import ArticlePanel from "./ArticlePanel";

describe("Tests for ArticlePanel container", () => {
    let defaultProps = {
        admin: false,
        url: undefined,
        timestamp: "2018-07-18 15:52:19",
        title: undefined,
        image: undefined,
        description: undefined,
        exists: 1,
        location: { pathname: "/article/test" },
        history: { push: jest.fn() }
    };

    const articlePanelContainer = (props) => {
        const wrapper = mount(<ArticlePanelContainer {...{...defaultProps, ...props}} />);
        return wrapper;
    };

    test("When props are undefined an <ArticlePanelErrorBoundary /> is rendered", () => {
        const wrapper = articlePanelContainer();

        expect(wrapper.find("ArticlePanelErrorBoundary").length).toBe(1);
    })

    test("When all article props are passed an <ArticlePanel /> is rendered", () => {
        const wrapper = articlePanelContainer({ url: "Test", title: "test", image: "test", description: "test" });

        expect(wrapper.find(ArticlePanel).length).toBe(1);
    })
});

describe("Tests for ArticlePanel presentational", () => {
    let defaultProps = {
        title: "test",
        url: "test",
        image: "test",
        push: jest.fn(),
        description: "test",
        exists: 0,
        timestamp: "test",
        onAdminPage: false
    };

    const articlePanel = (props) => {
        const wrapper = mount(<ArticlePanel {...{ ...defaultProps, ...props }} />);
        return wrapper;
    };

    test("When article doesnt exist and not on admin page only one div is rendered (a dummy div)", () => {
        const wrapper = articlePanel();

        expect(wrapper.find("div").length).toBe(1);
    })

    test("When article doesnt exist and we are on the admin page the articlePanel is rendered", () => {
        const wrapper = articlePanel({ onAdminPage: true });

        expect(wrapper.find(ArticlePanel).length).toBe(1);
    })

    test("When article exists there should be one ArticlePanel", () => {
        const wrapper = articlePanel({ exists: 1 });

        expect(wrapper.find(ArticlePanel).length).toBe(1);
    })

    test("When article DOESNT exist BUT we are on admin page, expect to find class 'articlePanel_bottomBar articlePanel_bottomBar--doesntExist'", () => {
        const wrapper = articlePanel({ onAdminPage: true });

        expect(wrapper.find("div").last().hasClass("articlePanel_bottomBar articlePanel_bottomBar--doesntExist")).toBe(true);
    })

    test("When article does exist BUT we are on admin page, expect to find class 'articlePanel_bottomBar'", () => {
        const wrapper = articlePanel({ exists: 1, onAdminPage: true });

        expect(wrapper.find("div").last().hasClass("articlePanel_bottomBar")).toBe(true);
    })

    test("When article exists AND we are not on admin page, expect to find class 'articlePanel_container'", () => {
        const wrapper = articlePanel({ exists: 1 });

        expect(wrapper.find("div").at(0).hasClass("articlePanel_container")).toBe(true);
    })
})