-- migrate:up
SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- Name: book; Type: TABLE; Schema: public; Owner: -
--
CREATE TABLE public.book (
    id BIGSERIAL NOT NULL,
    title text NOT NULL,
    description text NOT NULL,
    author text NOT NULL,
    publishing_company text NOT NULL,
    publish_year integer NOT NULL,
    isbn text NOT NULL,
    pages integer NOT NULL,
    is_available boolean NOT NULL,
    create_date timestamp with time zone NOT NULL,
    updated_date timestamp with time zone,
    deleted_date timestamp with time zone,
    rent_max_days integer NOT NULL
);


--
-- Name: book_category; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.book_category (
    id BIGSERIAL NOT NULL,
    book_id bigint NOT NULL,
    category_id integer NOT NULL,
    create_date timestamp with time zone NOT NULL,
    deleted_date timestamp with time zone
);


--
-- Name: category; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.category (
    id SERIAL NOT NULL,
    name text NOT NULL,
    display_name text NOT NULL,
    create_date timestamp with time zone NOT NULL,
    updated_date timestamp with time zone,
    deleted_date timestamp with time zone
);


--
-- Name: comment; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.comment (
    id BIGSERIAL NOT NULL,
    book_id bigint NOT NULL,
    user_id bigint NOT NULL,
    title text NOT NULL,
    comment text NOT NULL,
    stars double precision NOT NULL,
    create_date timestamp with time zone NOT NULL,
    deleted_date timestamp with time zone
);


--
-- Name: favorite_book; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.favorite_book (
    id SERIAL NOT NULL,
    book_id bigint NOT NULL,
    user_id bigint NOT NULL,
    create_date timestamp with time zone NOT NULL,
    deleted_date timestamp with time zone
);


--
-- Name: permission; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.permission (
    id SERIAL NOT NULL,
    name text NOT NULL,
    display_name text NOT NULL,
    create_date timestamp with time zone NOT NULL,
    updated_date timestamp with time zone,
    deleted_date timestamp with time zone
);


--
-- Name: rent; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.rent (
    id BIGSERIAL NOT NULL,
    user_id bigint NOT NULL,
    book_id bigint NOT NULL,
    penalty double precision,
    rent_date timestamp with time zone NOT NULL,
    devolution_date timestamp with time zone,
    create_date timestamp with time zone NOT NULL,
    deleted_date timestamp with time zone
);


--
-- Name: role; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.role (
    id SERIAL NOT NULL,
    name text NOT NULL,
    display_name text NOT NULL,
    create_date timestamp with time zone NOT NULL,
    updated_date timestamp with time zone,
    deleted_date timestamp with time zone
);


--
-- Name: role_permission; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.role_permission (
    id BIGSERIAL NOT NULL,
    role_id integer NOT NULL,
    permission_id integer NOT NULL,
    create_date timestamp with time zone NOT NULL,
    deleted_date timestamp with time zone
);


--
-- Name: schema_migrations; Type: TABLE; Schema: public; Owner: -
--


--
-- Name: user; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public."user" (
    id BIGSERIAL NOT NULL,
    name text NOT NULL,
    surname text NOT NULL,
    address text,
    address_number text,
    address_complement text,
    address_district text,
    address_city text,
    address_zipcode text,
    email text NOT NULL,
    email_confirmed boolean NOT NULL,
    create_date timestamp with time zone NOT NULL,
    updated_date timestamp with time zone,
    deleted_date timestamp with time zone,
    password text NOT NULL,
    salt text NOT NULL
);


--
-- Name: user_role; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.user_role (
    id BIGSERIAL NOT NULL,
    role_id integer NOT NULL,
    user_id bigint NOT NULL,
    create_date timestamp with time zone NOT NULL,
    deleted_date timestamp with time zone
);


--
-- Name: book_category book_category_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.book_category
    ADD CONSTRAINT book_category_pkey PRIMARY KEY (id);


--
-- Name: book book_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.book
    ADD CONSTRAINT book_pkey PRIMARY KEY (id);


--
-- Name: category category_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.category
    ADD CONSTRAINT category_pkey PRIMARY KEY (id);


--
-- Name: comment comment_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.comment
    ADD CONSTRAINT comment_pkey PRIMARY KEY (id);


--
-- Name: favorite_book favorite_book_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.favorite_book
    ADD CONSTRAINT favorite_book_pkey PRIMARY KEY (id);


--
-- Name: permission permission_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.permission
    ADD CONSTRAINT permission_pkey PRIMARY KEY (id);


--
-- Name: rent rent_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.rent
    ADD CONSTRAINT rent_pkey PRIMARY KEY (id);


--
-- Name: role_permission role_permission_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.role_permission
    ADD CONSTRAINT role_permission_pkey PRIMARY KEY (id);


--
-- Name: role role_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.role
    ADD CONSTRAINT role_pkey PRIMARY KEY (id);


-- Name: book_category unique_book_category; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.book_category
    ADD CONSTRAINT unique_book_category UNIQUE (book_id, category_id, deleted_date);


--
-- Name: category unique_category; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.category
    ADD CONSTRAINT unique_category UNIQUE (name, display_name, deleted_date);


--
-- Name: comment unique_comment_per_book; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.comment
    ADD CONSTRAINT unique_comment_per_book UNIQUE (book_id, user_id, deleted_date);


--
-- Name: user unique_email; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public."user"
    ADD CONSTRAINT unique_email UNIQUE (email, deleted_date);


--
-- Name: favorite_book unique_favorite_book_per_user; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.favorite_book
    ADD CONSTRAINT unique_favorite_book_per_user UNIQUE (book_id, user_id, deleted_date);


--
-- Name: permission unique_permission; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.permission
    ADD CONSTRAINT unique_permission UNIQUE (name, create_date, deleted_date);


--
-- Name: rent unique_rent_book_by_person; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.rent
    ADD CONSTRAINT unique_rent_book_by_person UNIQUE (user_id, book_id, devolution_date, deleted_date);


--
-- Name: role unique_role; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.role
    ADD CONSTRAINT unique_role UNIQUE (name, display_name, deleted_date);


--
-- Name: role_permission unique_role_permission; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.role_permission
    ADD CONSTRAINT unique_role_permission UNIQUE (role_id, permission_id, deleted_date);


--
-- Name: user_role unique_user_role; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.user_role
    ADD CONSTRAINT unique_user_role UNIQUE (role_id, user_id, deleted_date);


--
-- Name: user user_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public."user"
    ADD CONSTRAINT user_pkey PRIMARY KEY (id);


--
-- Name: user_role user_role_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.user_role
    ADD CONSTRAINT user_role_pkey PRIMARY KEY (id);


--
-- Name: book_category book_id_fk; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.book_category
    ADD CONSTRAINT book_id_fk FOREIGN KEY (book_id) REFERENCES public.book(id);


--
-- Name: favorite_book book_id_fk; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.favorite_book
    ADD CONSTRAINT book_id_fk FOREIGN KEY (book_id) REFERENCES public.book(id);


--
-- Name: comment book_id_fk; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.comment
    ADD CONSTRAINT book_id_fk FOREIGN KEY (book_id) REFERENCES public.book(id) NOT VALID;


--
-- Name: rent book_id_fk; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.rent
    ADD CONSTRAINT book_id_fk FOREIGN KEY (book_id) REFERENCES public.book(id);


--
-- Name: book_category category_id_fk; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.book_category
    ADD CONSTRAINT category_id_fk FOREIGN KEY (category_id) REFERENCES public.category(id);


--
-- Name: role_permission permission_id_fk; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.role_permission
    ADD CONSTRAINT permission_id_fk FOREIGN KEY (permission_id) REFERENCES public.permission(id);


--
-- Name: user_role role_id_fk; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.user_role
    ADD CONSTRAINT role_id_fk FOREIGN KEY (role_id) REFERENCES public.role(id) MATCH FULL;


--
-- Name: role_permission role_id_fk; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.role_permission
    ADD CONSTRAINT role_id_fk FOREIGN KEY (role_id) REFERENCES public.role(id);


--
-- Name: user_role user_id_fk; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.user_role
    ADD CONSTRAINT user_id_fk FOREIGN KEY (user_id) REFERENCES public."user"(id);


--
-- Name: favorite_book user_id_fk; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.favorite_book
    ADD CONSTRAINT user_id_fk FOREIGN KEY (user_id) REFERENCES public."user"(id);


--
-- Name: comment user_id_fk; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.comment
    ADD CONSTRAINT user_id_fk FOREIGN KEY (user_id) REFERENCES public."user"(id) NOT VALID;


--
-- Name: rent user_id_fk; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.rent
    ADD CONSTRAINT user_id_fk FOREIGN KEY (user_id) REFERENCES public."user"(id);


--
-- PostgreSQL database dump complete
--


--
-- Dbmate schema migrations
--



-- migrate:down

