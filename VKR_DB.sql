toc.dat                                                                                             0000600 0004000 0002000 00000005020 14230524000 0014422 0                                                                                                    ustar 00postgres                        postgres                        0000000 0000000                                                                                                                                                                        PGDMP                           z            VKR_2022_DB    14.0    14.0 
    �           0    0    ENCODING    ENCODING        SET client_encoding = 'UTF8';
                      false         �           0    0 
   STDSTRINGS 
   STDSTRINGS     (   SET standard_conforming_strings = 'on';
                      false         �           0    0 
   SEARCHPATH 
   SEARCHPATH     8   SELECT pg_catalog.set_config('search_path', '', false);
                      false         �           1262    25408    VKR_2022_DB    DATABASE     j   CREATE DATABASE "VKR_2022_DB" WITH TEMPLATE = template0 ENCODING = 'UTF8' LOCALE = 'Russian_Russia.1251';
    DROP DATABASE "VKR_2022_DB";
                postgres    false         �           0    0    DATABASE "VKR_2022_DB"    COMMENT     g   COMMENT ON DATABASE "VKR_2022_DB" IS 'АРЕНДА МУЗЫКАЛЬНОГО ОБОРУДОВАНИЯ';
                   postgres    false    3313         �            1259    25410    users    TABLE     <  CREATE TABLE public.users (
    id integer NOT NULL,
    "uName" character varying(30) NOT NULL,
    "uLastName" character varying(60) NOT NULL,
    "uPhone" character varying(11),
    "uEmail" character varying(50) NOT NULL,
    "uPassword" character varying(30) NOT NULL,
    "uRole" integer DEFAULT 3 NOT NULL
);
    DROP TABLE public.users;
       public         heap    postgres    false         �            1259    25409    users_id_seq    SEQUENCE     �   ALTER TABLE public.users ALTER COLUMN id ADD GENERATED ALWAYS AS IDENTITY (
    SEQUENCE NAME public.users_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);
            public          postgres    false    210         �          0    25410    users 
   TABLE DATA           c   COPY public.users (id, "uName", "uLastName", "uPhone", "uEmail", "uPassword", "uRole") FROM stdin;
    public          postgres    false    210       3307.dat �           0    0    users_id_seq    SEQUENCE SET     ;   SELECT pg_catalog.setval('public.users_id_seq', 1, false);
          public          postgres    false    209         ^           2606    25414    users users_pkey 
   CONSTRAINT     N   ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_pkey PRIMARY KEY (id);
 :   ALTER TABLE ONLY public.users DROP CONSTRAINT users_pkey;
       public            postgres    false    210                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                        3307.dat                                                                                            0000600 0004000 0002000 00000000005 14230524000 0014227 0                                                                                                    ustar 00postgres                        postgres                        0000000 0000000                                                                                                                                                                        \.


                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                           restore.sql                                                                                         0000600 0004000 0002000 00000005430 14230524000 0015354 0                                                                                                    ustar 00postgres                        postgres                        0000000 0000000                                                                                                                                                                        --
-- NOTE:
--
-- File paths need to be edited. Search for $$PATH$$ and
-- replace it with the path to the directory containing
-- the extracted data files.
--
--
-- PostgreSQL database dump
--

-- Dumped from database version 14.0
-- Dumped by pg_dump version 14.0

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

DROP DATABASE "VKR_2022_DB";
--
-- Name: VKR_2022_DB; Type: DATABASE; Schema: -; Owner: postgres
--

CREATE DATABASE "VKR_2022_DB" WITH TEMPLATE = template0 ENCODING = 'UTF8' LOCALE = 'Russian_Russia.1251';


ALTER DATABASE "VKR_2022_DB" OWNER TO postgres;

\connect "VKR_2022_DB"

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

--
-- Name: DATABASE "VKR_2022_DB"; Type: COMMENT; Schema: -; Owner: postgres
--

COMMENT ON DATABASE "VKR_2022_DB" IS 'АРЕНДА МУЗЫКАЛЬНОГО ОБОРУДОВАНИЯ';


SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- Name: users; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.users (
    id integer NOT NULL,
    "uName" character varying(30) NOT NULL,
    "uLastName" character varying(60) NOT NULL,
    "uPhone" character varying(11),
    "uEmail" character varying(50) NOT NULL,
    "uPassword" character varying(30) NOT NULL,
    "uRole" integer DEFAULT 3 NOT NULL
);


ALTER TABLE public.users OWNER TO postgres;

--
-- Name: users_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

ALTER TABLE public.users ALTER COLUMN id ADD GENERATED ALWAYS AS IDENTITY (
    SEQUENCE NAME public.users_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);


--
-- Data for Name: users; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.users (id, "uName", "uLastName", "uPhone", "uEmail", "uPassword", "uRole") FROM stdin;
\.
COPY public.users (id, "uName", "uLastName", "uPhone", "uEmail", "uPassword", "uRole") FROM '$$PATH$$/3307.dat';

--
-- Name: users_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.users_id_seq', 1, false);


--
-- Name: users users_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_pkey PRIMARY KEY (id);


--
-- PostgreSQL database dump complete
--

                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                        