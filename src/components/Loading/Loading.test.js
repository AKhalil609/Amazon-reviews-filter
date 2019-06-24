import {shallow} from 'enzyme';
import React from 'react';
import Loading from './index';
import {findByTestAttr} from '../../TestUtils/utils'

const setup = (props={}) =>{
    const setupProps = { ...props };
    return shallow(<Loading {...setupProps} />)
}
describe('<Loading />', () => { 
    test('should render correctly', () => {
        let wrapper = setup()
        const component = findByTestAttr(wrapper, 'component-loading');
        expect(component.length).toBe(1)
    })
})
