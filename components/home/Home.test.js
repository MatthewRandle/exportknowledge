import React from 'react';
import { shallow, mount } from 'enzyme';

import { HomeContainer } from "./index";
import HomeLoader from "./HomeLoader";
import Home from "./Home";

describe("Container Component for Home", () => {
    let defaultProps = {
        fetchLatestArticles: jest.fn(),
        article: undefined
    };

    const homeContainer = (props) => {
        const wrapper = mount(<HomeContainer {...{...defaultProps, ...props}} />);
        return wrapper;
    }

    test("Renders <HomeLoader /> when latest articles are passed as props", () => {
        const wrapper = homeContainer();

        expect(wrapper.find(HomeLoader).length).toBe(1);
    });

    test("Renders <Home /> when latest articles are passed as props", () => {
        const wrapper = homeContainer({ article: { latest: [] } });

        expect(wrapper.find(Home).length).toBe(1);
    });
});