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
    id uuid NOT NULL,
    title CITEXT NOT NULL,
    created_by uuid NOT NULL,
    updated_by uuid,
    created_at timestamp with time zone NOT NULL,
    updated_at timestamp with time zone
);
ALTER TABLE budget_types OWNER TO frieddust;
ALTER TABLE ONLY budget_types
    ADD CONSTRAINT budget_types_pk PRIMARY KEY (id);
ALTER TABLE ONLY budget_types
    ADD CONSTRAINT budget_types_title_key UNIQUE (title);


CREATE TABLE project_types (
    id uuid NOT NULL,
    title CITEXT NOT NULL,
    created_by uuid NOT NULL,
    updated_by uuid,
    created_at timestamp with time zone NOT NULL,
    updated_at timestamp with time zone
);
ALTER TABLE project_types OWNER TO frieddust;
ALTER TABLE ONLY project_types
    ADD CONSTRAINT project_types_pk PRIMARY KEY (id);
ALTER TABLE ONLY project_types
    ADD CONSTRAINT project_types_title_key UNIQUE (title);

    
CREATE TABLE project_status (
    id uuid NOT NULL,
    title CITEXT NOT NULL,
    color_code character varying(7),
    created_by uuid NOT NULL,
    updated_by uuid,
    created_at timestamp with time zone NOT NULL,
    updated_at timestamp with time zone
);
ALTER TABLE project_status OWNER TO frieddust;
ALTER TABLE ONLY project_status
    ADD CONSTRAINT project_status_pk PRIMARY KEY (id);
ALTER TABLE ONLY project_status
    ADD CONSTRAINT project_status_title_key UNIQUE (title);

CREATE TABLE tags (
    id uuid NOT NULL,
    title CITEXT NOT NULL,
    created_by uuid NOT NULL,
    updated_by uuid,
    created_at timestamp with time zone NOT NULL,
    updated_at timestamp with time zone
);
ALTER TABLE tags OWNER TO frieddust;
ALTER TABLE ONLY tags
    ADD CONSTRAINT tags_pk PRIMARY KEY (id);
ALTER TABLE ONLY tags
    ADD CONSTRAINT tags_title_key UNIQUE (title);

    
CREATE TABLE clients (
	id uuid NOT NULL,
	name character varying(255) NOT NULL,
	email CITEXT NOT NULL,
	phone_no character varying(255),
	skype character varying(255),
	address character varying(255),
	description text,
	created_by uuid NOT NULL,
	updated_by uuid,
	created_at timestamp with time zone NOT NULL,
	updated_at timestamp with time zone
);
ALTER TABLE clients OWNER TO frieddust;
ALTER TABLE ONLY clients
	ADD CONSTRAINT clients_pk PRIMARY KEY (id);
ALTER TABLE ONLY clients
    ADD CONSTRAINT clients_email_key UNIQUE (email);
  
    
CREATE TABLE projects (
    id uuid NOT NULL,
    title CITEXT NOT NULL,
    description text,
    account_manager_id uuid,
    project_type_id uuid,
    project_status_id uuid,
    client_id uuid,
    created_by uuid NOT NULL,
    updated_by uuid,
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
	ADD CONSTRAINT client_fk FOREIGN KEY(client_id) REFERENCES clients ON DELETE CASCADE;
 
	
CREATE TABLE projects_tags (
    project_id uuid NOT NULL,
    tag_id uuid NOT NULL
);
ALTER TABLE projects_tags OWNER TO frieddust;
ALTER TABLE ONLY projects_tags
    ADD CONSTRAINT unique_project_tag_key_constraints UNIQUE (project_id, tag_id);
ALTER TABLE ONLY projects_tags 
	ADD CONSTRAINT project_id_fk FOREIGN KEY(project_id) REFERENCES projects ON DELETE CASCADE;
ALTER TABLE ONLY projects_tags
	ADD CONSTRAINT tag_id_fk FOREIGN KEY(tag_id) REFERENCES tags ON DELETE CASCADE;


CREATE TABLE project_roles (
    id uuid NOT NULL,
    title CITEXT NOT NULL,
    description text,
    created_by uuid NOT NULL,
    updated_by uuid,
    created_at timestamp with time zone NOT NULL,
    updated_at timestamp with time zone
);
ALTER TABLE project_roles OWNER TO frieddust;
ALTER TABLE ONLY project_roles
    ADD CONSTRAINT project_roles_pk PRIMARY KEY (id);
ALTER TABLE ONLY project_roles
    ADD CONSTRAINT project_roles_title_key UNIQUE (title);
    

CREATE TABLE contracts (
    id uuid NOT NULL,
    project_id uuid NOT NULL,
    budget_type_id uuid,
    start_date date,
    end_date date,
    actual_end_date date,
    resource text,
    created_by uuid NOT NULL,
    updated_by uuid,
    created_at timestamp with time zone NOT NULL,
    updated_at timestamp with time zone   
);
ALTER TABLE contracts OWNER TO frieddust;
ALTER TABLE ONLY contracts
    ADD CONSTRAINT contracts_pkey PRIMARY KEY (id);
ALTER TABLE ONLY contracts 
	ADD CONSTRAINT projects_fk FOREIGN KEY(project_id) REFERENCES projects ON DELETE CASCADE;
ALTER TABLE ONLY contracts 
	ADD CONSTRAINT budget_type_fk FOREIGN KEY(budget_type_id) REFERENCES budget_types ON DELETE CASCADE;
    
	
CREATE TABLE contract_members (
    id uuid NOT NULL,
    contract_id uuid NOT NULL,
    employee_id uuid NOT NULL,
    role_id uuid,
    allocation decimal(5,2),
    billed boolean,
    join_date date,
    end_date date,
    created_by uuid NOT NULL,
    updated_by uuid,
    created_at timestamp with time zone NOT NULL,
    updated_at timestamp with time zone  
);
ALTER TABLE contract_members OWNER TO frieddust;
ALTER TABLE ONLY contract_members
    ADD CONSTRAINT contract_members_pkey PRIMARY KEY (id);
ALTER TABLE ONLY contract_members 
	ADD CONSTRAINT contracts_fk FOREIGN KEY(contract_id) REFERENCES contracts ON DELETE CASCADE;
ALTER TABLE ONLY contract_members 
	ADD CONSTRAINT project_roles_fk FOREIGN KEY(role_id) REFERENCES project_roles ON DELETE CASCADE;
	
	
CREATE TABLE reason_histories (
    id uuid NOT NULL,
    reason text,
    created_by uuid NOT NULL,
    created_at timestamp with time zone NOT NULL
);
ALTER TABLE reason_histories OWNER TO frieddust;
ALTER TABLE ONLY reason_histories
    ADD CONSTRAINT reason_histories_pkey PRIMARY KEY (id);
    
	
CREATE TABLE project_histories (
    id uuid NOT NULL,
    batch_id uuid NOT NULL,
    project_id uuid NOT NULL,
    title CITEXT NOT NULL,
    description text,
    account_manager_id uuid,
    project_type_id uuid,
    project_status_id uuid,
    client_id uuid
);
ALTER TABLE project_histories OWNER TO frieddust;
ALTER TABLE ONLY project_histories
    ADD CONSTRAINT project_histories_pk PRIMARY KEY (id);
ALTER TABLE ONLY project_histories 
	ADD CONSTRAINT projects_fk FOREIGN KEY(project_id) REFERENCES projects ON DELETE CASCADE;
ALTER TABLE ONLY project_histories 
	ADD CONSTRAINT project_type_fk FOREIGN KEY(project_type_id) REFERENCES project_types ON DELETE CASCADE;
ALTER TABLE ONLY project_histories 
	ADD CONSTRAINT project_status_fk FOREIGN KEY(project_status_id) REFERENCES project_status ON DELETE CASCADE;
ALTER TABLE ONLY project_histories 
	ADD CONSTRAINT clients_fk FOREIGN KEY(client_id) REFERENCES clients ON DELETE CASCADE;
ALTER TABLE ONLY project_histories 
	ADD CONSTRAINT reason_histories_fk FOREIGN KEY(batch_id) REFERENCES reason_histories ON DELETE CASCADE;
    
    
CREATE TABLE contract_histories (
    id uuid NOT NULL,
    batch_id uuid NOT NULL,
    contract_id uuid NOT NULL,
    project_id uuid NOT NULL,
    budget_type_id uuid,
    start_date date,
    end_date date,
    actual_end_date date,
    resource text
);
ALTER TABLE contract_histories OWNER TO frieddust;
ALTER TABLE ONLY contract_histories
    ADD CONSTRAINT contract_histories_pk PRIMARY KEY (id);
ALTER TABLE ONLY contract_histories 
	ADD CONSTRAINT contracts_fk FOREIGN KEY(contract_id) REFERENCES contracts ON DELETE CASCADE;
ALTER TABLE ONLY contract_histories 
	ADD CONSTRAINT projects_fk FOREIGN KEY(project_id) REFERENCES projects ON DELETE CASCADE;
ALTER TABLE ONLY contract_histories 
	ADD CONSTRAINT budget_type_fk FOREIGN KEY(budget_type_id) REFERENCES budget_types ON DELETE CASCADE;
ALTER TABLE ONLY contract_histories 
	ADD CONSTRAINT reason_histories_fk FOREIGN KEY(batch_id) REFERENCES reason_histories ON DELETE CASCADE;
    
    
CREATE TABLE contract_member_histories (
    id uuid NOT NULL,
    batch_id uuid NOT NULL,
    contract_member_id uuid NOT NULL,
    contract_id uuid NOT NULL,
    employee_id uuid NOT NULL,
    role_id uuid,
    allocation decimal(5,2),
    billed boolean,
    join_date date,
    end_date date
);
ALTER TABLE contract_member_histories OWNER TO frieddust;
ALTER TABLE ONLY contract_member_histories
    ADD CONSTRAINT contract_member_histories_pk PRIMARY KEY (id);
ALTER TABLE ONLY contract_member_histories 
	ADD CONSTRAINT contract_members_fk FOREIGN KEY(contract_member_id) REFERENCES contract_members ON DELETE CASCADE;
ALTER TABLE ONLY contract_member_histories 
	ADD CONSTRAINT contracts_fk FOREIGN KEY(contract_id) REFERENCES contracts ON DELETE CASCADE;
ALTER TABLE ONLY contract_member_histories 
	ADD CONSTRAINT project_roles_fk FOREIGN KEY(role_id) REFERENCES project_roles ON DELETE CASCADE;
ALTER TABLE ONLY contract_member_histories 
	ADD CONSTRAINT reason_histories_fk FOREIGN KEY(batch_id) REFERENCES reason_histories ON DELETE CASCADE;
	
	
REVOKE ALL ON SCHEMA public FROM PUBLIC;
REVOKE ALL ON SCHEMA public FROM frieddust;
GRANT ALL ON SCHEMA public TO frieddust;
GRANT ALL ON SCHEMA public TO PUBLIC;