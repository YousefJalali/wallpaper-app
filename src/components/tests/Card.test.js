import React from 'react';
import { shallow } from "enzyme";
import styled from 'styled-components/native';
import "jest-styled-components/native";

import Card from "../Card";

const Button = styled.button`
  color: red;
`
// const Button = () => (
//   <button>ha</button>
// )

describe("Card", () => {
  it("renders correctly", () => {
    const wrapper = shallow(<Button />);
    expect(wrapper).toMatchSnapshot();
    // On the first run of this test, Jest will generate a snapshot file automatically.
  });
});
