import React from 'react';
import {shallow} from 'enzyme';
import {findByTestAttr} from '../../TestUtils/utils';
import Button from '../../components/Button';

const setup = (props={}) =>{
    const setupProps = { ...props };
    return shallow(<Button {...setupProps} />)
}
describe('<Button />', () => { 
    test('should render correctly', () => {
        let wrapper = setup()
        const component = findByTestAttr(wrapper, 'component-button');
        expect(component.length).toBe(1)
    })
})
