SET statement_timeout = 0;
SET lock_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SET check_function_bodies = false;
SET client_min_messages = warning;

SET search_path = public, pg_catalog;

SET default_tablespace = '';

SET default_with_oids = false;


CREATE TABLE budget_types (
    id character varying(32) NOT NULL,
    title character varying(255) NOT NULL,
    created_by character varying(32) NOT NULL,
    updated_by character varying(32),
    created_at timestamp with time zone NOT NULL,
    updated_at timestamp with time zone
);
ALTER TABLE budget_types OWNER TO frieddust;
ALTER TABLE ONLY budget_types
    ADD CONSTRAINT budget_types_pk PRIMARY KEY (id);
ALTER TABLE ONLY budget_types
    ADD CONSTRAINT budget_types_title_key UNIQUE (title);


CREATE TABLE project_types (
    id character varying(32) NOT NULL,
    title character varying(255) NOT NULL,
    created_by character varying(32) NOT NULL,
    updated_by character varying(32),
    created_at timestamp with time zone NOT NULL,
    updated_at timestamp with time zone
);
ALTER TABLE project_types OWNER TO frieddust;
ALTER TABLE ONLY project_types
    ADD CONSTRAINT project_types_pk PRIMARY KEY (id);
ALTER TABLE ONLY project_types
    ADD CONSTRAINT project_types_title_key UNIQUE (title);

    
CREATE TABLE project_status (
    id character varying(32) NOT NULL,
    title character varying(255) NOT NULL,
    created_by character varying(32) NOT NULL,
    updated_by character varying(32),
    created_at timestamp with time zone NOT NULL,
    updated_at timestamp with time zone
);
ALTER TABLE project_status OWNER TO frieddust;
ALTER TABLE ONLY project_status
    ADD CONSTRAINT project_status_pk PRIMARY KEY (id);
ALTER TABLE ONLY project_status
    ADD CONSTRAINT project_status_title_key UNIQUE (title);

CREATE TABLE tags (
    id character varying(32) NOT NULL,
    title character varying(255) NOT NULL,
    created_by character varying(32) NOT NULL,
    updated_by character varying(32),
    created_at timestamp with time zone NOT NULL,
    updated_at timestamp with time zone
);
ALTER TABLE tags OWNER TO frieddust;
ALTER TABLE ONLY tags
    ADD CONSTRAINT tags PRIMARY KEY (id);
ALTER TABLE ONLY tags
    ADD CONSTRAINT tags_title_key UNIQUE (title);
  
    
CREATE TABLE projects (
    id character varying(32) NOT NULL,
    title character varying(255) NOT NULL,
    description text,
    account_manager character varying(32),
    project_type_id character varying(32),
    budget_type_id character varying(32),
    project_status_id character varying(32),
    start_date date,
    end_date date,
    created_by character varying(32) NOT NULL,
    updated_by character varying(32),
    created_at timestamp with time zone NOT NULL,
    updated_at timestamp with time zone   
);
ALTER TABLE projects OWNER TO frieddust;
ALTER TABLE ONLY projects
    ADD CONSTRAINT projects_pkey PRIMARY KEY (id);
ALTER TABLE ONLY projects
    ADD CONSTRAINT projects_title_key UNIQUE (title);
ALTER TABLE ONLY projects 
	ADD CONSTRAINT project_type_fk FOREIGN KEY(project_type_id) REFERENCES project_types ON DELETE CASCADE;
ALTER TABLE ONLY projects 
	ADD CONSTRAINT project_status_fk FOREIGN KEY(project_status_id) REFERENCES project_status ON DELETE CASCADE;
ALTER TABLE ONLY projects 
	ADD CONSTRAINT budget_type_fk FOREIGN KEY(budget_type_id) REFERENCES budget_types ON DELETE CASCADE;
 
	
CREATE TABLE projects_tags (
    project_id character varying(32) NOT NULL,
    tag_id character varying(32) NOT NULL
);
ALTER TABLE projects_tags OWNER TO frieddust;
ALTER TABLE ONLY projects_tags
    ADD CONSTRAINT unique_project_tag_key_constraints UNIQUE (project_id, tag_id);
ALTER TABLE ONLY projects_tags 
	ADD CONSTRAINT project_id_fk FOREIGN KEY(project_id) REFERENCES projects ON DELETE CASCADE;
ALTER TABLE ONLY projects_tags
	ADD CONSTRAINT tag_id_fk FOREIGN KEY(tag_id) REFERENCES tags ON DELETE CASCADE;


CREATE TABLE project_members (
    id character varying(32) NOT NULL,
    project_id character varying(32) NOT NULL,
    employee character varying(32) NOT NULL,
    role_id character varying(32),
    allocation decimal(2,2),
    billed boolean,
    active boolean,
    join_date date,
    end_date date,
    created_by character varying(32) NOT NULL,
    updated_by character varying(32),
    created_at timestamp with time zone NOT NULL,
    updated_at timestamp with time zone  
);
ALTER TABLE project_members OWNER TO frieddust;
ALTER TABLE ONLY project_members
    ADD CONSTRAINT project_members_pkey PRIMARY KEY (id);
ALTER TABLE ONLY project_members 
	ADD CONSTRAINT projects_fk FOREIGN KEY(project_id) REFERENCES projects ON DELETE CASCADE;
	
CREATE TABLE project_histories (
    id character varying(32) NOT NULL,
    project_id character varying(32) NOT NULL,
    batch_id character varying(32) NOT NULL,
    attribute character varying(255) NOT NULL,
    old_value character varying(255),
    new_value character varying(255),
    reason text,
    created_by character varying(32) NOT NULL,
    updated_by character varying(32),
    created_at timestamp with time zone NOT NULL,
    updated_at timestamp with time zone
);
ALTER TABLE project_histories OWNER TO frieddust;
ALTER TABLE ONLY project_histories
    ADD CONSTRAINT project_histories_pk PRIMARY KEY (id);
    
CREATE TABLE project_member_histories (
    id character varying(32) NOT NULL,
    project_member_id character varying(32) NOT NULL,
    batch_id character varying(32) NOT NULL,
    attribute character varying(255) NOT NULL,
    old_value character varying(255),
    new_value character varying(255),
    reason text,
    created_by character varying(32) NOT NULL,
    updated_by character varying(32),
    created_at timestamp with time zone NOT NULL,
    updated_at timestamp with time zone
);
ALTER TABLE project_member_histories OWNER TO frieddust;
ALTER TABLE ONLY project_member_histories
    ADD CONSTRAINT project_member_histories_pk PRIMARY KEY (id);
	
REVOKE ALL ON SCHEMA public FROM PUBLIC;
REVOKE ALL ON SCHEMA public FROM frieddust;
GRANT ALL ON SCHEMA public TO frieddust;
GRANT ALL ON SCHEMA public TO PUBLIC;
