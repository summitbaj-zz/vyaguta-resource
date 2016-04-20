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
import ProjectRoleRow from '../../../src/js/components/project-role/ProjectRoleRow';

function setup() {
    var props = {
        index: 1,
        projectRole: {id: 1, title: 'Some Projecttype'},
        deleteProjectRole: expect.createSpy()
    }
    var component = shallow(<ProjectRoleRow {...props}/>);

    return {
        component: component,
        deleteButton: component.find('button'),
        tableData: component.find('td'),
        props: props
    }
}

describe('ProjectRoleRow Component', () => {
    it('renders a delete button', () => {
        var {deleteButton} = setup();
        expect(deleteButton.length).toEqual(1);
    });


    it('should call deleteProjectRole method when the delete button is clicked', () => {
        var {deleteButton, props}  = setup();
        deleteButton.simulate('click');
        expect(props.deleteProjectRole).toHaveBeenCalled();
    });
})