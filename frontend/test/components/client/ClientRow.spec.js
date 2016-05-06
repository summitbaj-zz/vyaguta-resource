/**
 * Created by
 * Pratish Shrestha <pratishshrestha@lftechnology.com>
 * on 4/18/16.
 */

//libraries
import React from 'react';
import expect from 'expect';
import {shallow} from 'enzyme';

//components
import ClientRow from '../../../src/js/components/client/ClientRow';

function setup() {
    var props = {
        index: 1,
        client: {id: 1, title: 'Some Client'},
        deleteClient: expect.createSpy()
    }
    var component = shallow(<ClientRow {...props}/>);

    return {
        component: component,
        deleteButton: component.find('button'),
        tableData: component.find('td'),
        props: props
    }
}

describe('ClientRow Component', () => {
    it('renders a delete button', () => {
        var {deleteButton} = setup();
        expect(deleteButton.length).toEqual(1);
    });


    it('should call deleteClient method when the delete button is clicked', () => {
        var {deleteButton, props}  = setup();
        deleteButton.simulate('click');
        expect(props.deleteClient).toHaveBeenCalled();
    });
})