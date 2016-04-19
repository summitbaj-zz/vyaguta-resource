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
import ProjectStatusRow from '../../../src/js/components/project-status/ProjectStatusRow';


function setup() {
    var props = {
        index: 1,
        projectStatus: {id: 1, title: 'Some ProjectStatus'},
        deleteProjectStatus: expect.createSpy()
    }
    var component = shallow(<ProjectStatusRow {...props}/>);

    return {
        component: component,
        deleteButton: component.find('button'),
        tableData: component.find('td'),
        props: props
    }
}

describe('ProjetStatusRow Component', () => {
    it('renders a delete button', () => {
        var {deleteButton} = setup();
        expect(deleteButton.length).toEqual(1);
    });


    it('should call deleteProjectStatus method when the delete button is clicked', () => {
        var {deleteButton, props}  = setup();
        deleteButton.simulate('click');
        expect(props.deleteProjectStatus).toHaveBeenCalled();
    });
});