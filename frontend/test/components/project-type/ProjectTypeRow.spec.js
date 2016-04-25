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
import ProjectTypeRow from '../../../src/js/components/project-type/ProjectTypeRow';

function setup() {
    var props = {
        index: 1,
        projectType: {id: 1, title: 'Some ProjectType'},
        deleteProjectType: expect.createSpy()
    }
    var component = shallow(<ProjectTypeRow {...props}/>);

    return {
        component: component,
        deleteButton: component.find('button'),
        tableData: component.find('td'),
        props: props
    }
}

describe('ProjectTypeRow Component', () => {
    it('renders a delete button', () => {
        var {deleteButton} = setup();
        expect(deleteButton.length).toEqual(1);
    });


    it('should call deleteProjectType method when the delete button is clicked', () => {
        var {deleteButton, props}  = setup();
        deleteButton.simulate('click');
        expect(props.deleteProjectType).toHaveBeenCalled();
    });
})