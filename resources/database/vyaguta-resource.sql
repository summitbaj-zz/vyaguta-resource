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
    ADD CONSTRAINT budget_types PRIMARY KEY (id);
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
    ADD CONSTRAINT project_types PRIMARY KEY (id);
ALTER TABLE ONLY project_types
    ADD CONSTRAINT project_types_title_key UNIQUE (title);


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
    

REVOKE ALL ON SCHEMA public FROM PUBLIC;
REVOKE ALL ON SCHEMA public FROM frieddust;
GRANT ALL ON SCHEMA public TO frieddust;
GRANT ALL ON SCHEMA public TO PUBLIC;
