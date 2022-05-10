toc.dat                                                                                             0000600 0004000 0002000 00000027710 14236432007 0014447 0                                                                                                    ustar 00postgres                        postgres                        0000000 0000000                                                                                                                                                                        PGDMP       &    ,        
        z            VKR_2022_DB    14.2    14.2 (    "           0    0    ENCODING    ENCODING        SET client_encoding = 'UTF8';
                      false         #           0    0 
   STDSTRINGS 
   STDSTRINGS     (   SET standard_conforming_strings = 'on';
                      false         $           0    0 
   SEARCHPATH 
   SEARCHPATH     8   SELECT pg_catalog.set_config('search_path', '', false);
                      false         %           1262    16394    VKR_2022_DB    DATABASE     j   CREATE DATABASE "VKR_2022_DB" WITH TEMPLATE = template0 ENCODING = 'UTF8' LOCALE = 'Russian_Russia.1251';
    DROP DATABASE "VKR_2022_DB";
                postgres    false         �            1259    16502 	   equipment    TABLE     M  CREATE TABLE public.equipment (
    id integer NOT NULL,
    "eName" character varying(60) NOT NULL,
    "ePrice" integer,
    "eDescription" character varying(1000),
    "eCategory" character varying(150),
    "pId" integer,
    date_change time without time zone,
    "priceForHour" real,
    "eUsed" integer DEFAULT 0 NOT NULL
);
    DROP TABLE public.equipment;
       public         heap    postgres    false         �            1259    16507    equipment_id_seq    SEQUENCE     �   ALTER TABLE public.equipment ALTER COLUMN id ADD GENERATED ALWAYS AS IDENTITY (
    SEQUENCE NAME public.equipment_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);
            public          postgres    false    209         �            1259    16508    options    TABLE       CREATE TABLE public.options (
    id integer NOT NULL,
    "oName" character varying(160) NOT NULL,
    "oValueIntA" real,
    "oValueIntB" real,
    "oValueChar" character varying(300),
    "eId" integer NOT NULL,
    "oValueName" character varying(50)
);
    DROP TABLE public.options;
       public         heap    postgres    false         �            1259    16513    options_id_seq    SEQUENCE     �   ALTER TABLE public.options ALTER COLUMN id ADD GENERATED ALWAYS AS IDENTITY (
    SEQUENCE NAME public.options_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);
            public          postgres    false    211         �            1259    16514    order_to_equipment    TABLE     �   CREATE TABLE public.order_to_equipment (
    id integer NOT NULL,
    "eId" integer NOT NULL,
    "orderId" integer NOT NULL
);
 &   DROP TABLE public.order_to_equipment;
       public         heap    postgres    false         �            1259    16517    order_to_equipment_id_seq    SEQUENCE     �   ALTER TABLE public.order_to_equipment ALTER COLUMN id ADD GENERATED ALWAYS AS IDENTITY (
    SEQUENCE NAME public.order_to_equipment_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);
            public          postgres    false    213         �            1259    16518    orders    TABLE       CREATE TABLE public.orders (
    id integer NOT NULL,
    "uId" integer NOT NULL,
    "pId" integer NOT NULL,
    "priceAll" integer NOT NULL,
    "priceReady" integer NOT NULL,
    "startDate" timestamp without time zone NOT NULL,
    "endDate" timestamp without time zone NOT NULL
);
    DROP TABLE public.orders;
       public         heap    postgres    false         �            1259    16521    orders_id_seq    SEQUENCE     �   ALTER TABLE public.orders ALTER COLUMN id ADD GENERATED ALWAYS AS IDENTITY (
    SEQUENCE NAME public.orders_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);
            public          postgres    false    215         �            1259    16522    place    TABLE     �   CREATE TABLE public.place (
    id integer NOT NULL,
    "dateOn" time without time zone,
    "dateOut" time without time zone,
    "pIat" double precision NOT NULL,
    "pIon" double precision NOT NULL
);
    DROP TABLE public.place;
       public         heap    postgres    false         �            1259    16525    place_id_seq    SEQUENCE     �   ALTER TABLE public.place ALTER COLUMN id ADD GENERATED ALWAYS AS IDENTITY (
    SEQUENCE NAME public.place_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);
            public          postgres    false    217         �            1259    16526    users    TABLE     <  CREATE TABLE public.users (
    id integer NOT NULL,
    "uName" character varying(30) NOT NULL,
    "uLastName" character varying(60) NOT NULL,
    "uPhone" character varying(19),
    "uEmail" character varying(50) NOT NULL,
    "uPassword" character varying(61) NOT NULL,
    "uRole" integer DEFAULT 3 NOT NULL
);
    DROP TABLE public.users;
       public         heap    postgres    false         �            1259    16530    users_id_seq    SEQUENCE     �   ALTER TABLE public.users ALTER COLUMN id ADD GENERATED ALWAYS AS IDENTITY (
    SEQUENCE NAME public.users_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);
            public          postgres    false    219                   0    16502 	   equipment 
   TABLE DATA           �   COPY public.equipment (id, "eName", "ePrice", "eDescription", "eCategory", "pId", date_change, "priceForHour", "eUsed") FROM stdin;
    public          postgres    false    209       3348.dat           0    16508    options 
   TABLE DATA           m   COPY public.options (id, "oName", "oValueIntA", "oValueIntB", "oValueChar", "eId", "oValueName") FROM stdin;
    public          postgres    false    211       3350.dat           0    16514    order_to_equipment 
   TABLE DATA           B   COPY public.order_to_equipment (id, "eId", "orderId") FROM stdin;
    public          postgres    false    213       3352.dat           0    16518    orders 
   TABLE DATA           d   COPY public.orders (id, "uId", "pId", "priceAll", "priceReady", "startDate", "endDate") FROM stdin;
    public          postgres    false    215       3354.dat           0    16522    place 
   TABLE DATA           H   COPY public.place (id, "dateOn", "dateOut", "pIat", "pIon") FROM stdin;
    public          postgres    false    217       3356.dat           0    16526    users 
   TABLE DATA           c   COPY public.users (id, "uName", "uLastName", "uPhone", "uEmail", "uPassword", "uRole") FROM stdin;
    public          postgres    false    219       3358.dat &           0    0    equipment_id_seq    SEQUENCE SET     >   SELECT pg_catalog.setval('public.equipment_id_seq', 7, true);
          public          postgres    false    210         '           0    0    options_id_seq    SEQUENCE SET     <   SELECT pg_catalog.setval('public.options_id_seq', 7, true);
          public          postgres    false    212         (           0    0    order_to_equipment_id_seq    SEQUENCE SET     G   SELECT pg_catalog.setval('public.order_to_equipment_id_seq', 4, true);
          public          postgres    false    214         )           0    0    orders_id_seq    SEQUENCE SET     ;   SELECT pg_catalog.setval('public.orders_id_seq', 2, true);
          public          postgres    false    216         *           0    0    place_id_seq    SEQUENCE SET     :   SELECT pg_catalog.setval('public.place_id_seq', 3, true);
          public          postgres    false    218         +           0    0    users_id_seq    SEQUENCE SET     :   SELECT pg_catalog.setval('public.users_id_seq', 3, true);
          public          postgres    false    220         x           2606    16532    equipment equipment_pkey 
   CONSTRAINT     V   ALTER TABLE ONLY public.equipment
    ADD CONSTRAINT equipment_pkey PRIMARY KEY (id);
 B   ALTER TABLE ONLY public.equipment DROP CONSTRAINT equipment_pkey;
       public            postgres    false    209         z           2606    16534    options options_pkey 
   CONSTRAINT     R   ALTER TABLE ONLY public.options
    ADD CONSTRAINT options_pkey PRIMARY KEY (id);
 >   ALTER TABLE ONLY public.options DROP CONSTRAINT options_pkey;
       public            postgres    false    211         |           2606    16536 *   order_to_equipment order_to_equipment_pkey 
   CONSTRAINT     h   ALTER TABLE ONLY public.order_to_equipment
    ADD CONSTRAINT order_to_equipment_pkey PRIMARY KEY (id);
 T   ALTER TABLE ONLY public.order_to_equipment DROP CONSTRAINT order_to_equipment_pkey;
       public            postgres    false    213         ~           2606    16538    orders orders_pkey 
   CONSTRAINT     P   ALTER TABLE ONLY public.orders
    ADD CONSTRAINT orders_pkey PRIMARY KEY (id);
 <   ALTER TABLE ONLY public.orders DROP CONSTRAINT orders_pkey;
       public            postgres    false    215         �           2606    16540    place place_pkey 
   CONSTRAINT     N   ALTER TABLE ONLY public.place
    ADD CONSTRAINT place_pkey PRIMARY KEY (id);
 :   ALTER TABLE ONLY public.place DROP CONSTRAINT place_pkey;
       public            postgres    false    217         �           2606    16542    users users_pkey 
   CONSTRAINT     N   ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_pkey PRIMARY KEY (id);
 :   ALTER TABLE ONLY public.users DROP CONSTRAINT users_pkey;
       public            postgres    false    219         �           2606    16571    equipment equipment_pId_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public.equipment
    ADD CONSTRAINT "equipment_pId_fkey" FOREIGN KEY ("pId") REFERENCES public.place(id) NOT VALID;
 H   ALTER TABLE ONLY public.equipment DROP CONSTRAINT "equipment_pId_fkey";
       public          postgres    false    217    209    3200         �           2606    16543    options options_eId_fkey    FK CONSTRAINT     {   ALTER TABLE ONLY public.options
    ADD CONSTRAINT "options_eId_fkey" FOREIGN KEY ("eId") REFERENCES public.equipment(id);
 D   ALTER TABLE ONLY public.options DROP CONSTRAINT "options_eId_fkey";
       public          postgres    false    211    209    3192         �           2606    16551 .   order_to_equipment order_to_equipment_eId_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public.order_to_equipment
    ADD CONSTRAINT "order_to_equipment_eId_fkey" FOREIGN KEY ("eId") REFERENCES public.equipment(id) NOT VALID;
 Z   ALTER TABLE ONLY public.order_to_equipment DROP CONSTRAINT "order_to_equipment_eId_fkey";
       public          postgres    false    209    3192    213         �           2606    16556 2   order_to_equipment order_to_equipment_orderId_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public.order_to_equipment
    ADD CONSTRAINT "order_to_equipment_orderId_fkey" FOREIGN KEY ("orderId") REFERENCES public.orders(id) NOT VALID;
 ^   ALTER TABLE ONLY public.order_to_equipment DROP CONSTRAINT "order_to_equipment_orderId_fkey";
       public          postgres    false    215    3198    213         �           2606    16566    orders orders_pId_fkey    FK CONSTRAINT        ALTER TABLE ONLY public.orders
    ADD CONSTRAINT "orders_pId_fkey" FOREIGN KEY ("pId") REFERENCES public.place(id) NOT VALID;
 B   ALTER TABLE ONLY public.orders DROP CONSTRAINT "orders_pId_fkey";
       public          postgres    false    217    3200    215         �           2606    16561    orders orders_uId_fkey    FK CONSTRAINT        ALTER TABLE ONLY public.orders
    ADD CONSTRAINT "orders_uId_fkey" FOREIGN KEY ("uId") REFERENCES public.users(id) NOT VALID;
 B   ALTER TABLE ONLY public.orders DROP CONSTRAINT "orders_uId_fkey";
       public          postgres    false    219    3202    215                                                                3348.dat                                                                                            0000600 0004000 0002000 00000013227 14236432007 0014261 0                                                                                                    ustar 00postgres                        postgres                        0000000 0000000                                                                                                                                                                        7	Студийный монитор YAMAHA HS8	38990	HS8 самый большой и самый универсальный из HS серии студийный монитор. HS8 активный 2-полосный студийный монитор с 8" низкочастотным динамиком и 1" твитером. Монитор характеризуется 120 Вт мощности и способен воспроизводить 38 Гц – 30 кГц частотного диапазона. Этот монитор идеален для профессиональной студии. \\nСерия мониторов HS рождена из легендарного HS-10М. Во многих крупных студиях по всему миру Вы можете увидеть мониторы HS-10М, поскольку их частотный диапазон считается довольно "плоским" и если Ваш микс в них звучит великолепно, то и на других акустических системах будет звучать хорошо. HS-10М больше не производиться, но Yamaha применила их наследие в новой серии HS. Фокусируясь на звуковой чистоте, HS серия предоставляет более натуральное и точное воспроизведение. С новой разработкой преобразователей, высокопроизводительным усилителем, корпусом с низким уровнем резонанса и профессиональными входами/выходами, серия HS это лучшее от Yamaha и лучшее для Вашей студии.	Студийный монитор	\N	\N	750	0
1	Студийный монитор YAMAHA HS5	22000	HS5 активный 2-полосный студийный монитор с 5" низкочастотным динамиком и 1" твитером. Несмотря на маленький размер, он чрезвычайно точно воспроизводит частотный диапазон, достигая 54 Гц. Этот монитор идеален для маленькой домашней студии.	Студийный монитор	\N	\N	600	1
3	Студийный монитор YAMAHA HS5	22000	HS5 активный 2-полосный студийный монитор с 5" низкочастотным динамиком и 1" твитером. Несмотря на маленький размер, он чрезвычайно точно воспроизводит частотный диапазон, достигая 54 Гц. Этот монитор идеален для маленькой домашней студии.	Студийный монитор	\N	\N	600	0
6	Студийный монитор YAMAHA HS7	32990	HS7 новый член HS серии студийных мониторов. HS7 активный 2-полосный студийный монитор с 6,5" низкочастотным динамиком и 1" твитером. Монитор характеризуется 95 Вт мощности и способен воспроизводить 43 Гц – 30 кГц частотного диапазона. Этот монитор идеален для любой студии./nСерия мониторов HS рождена из легендарного HS-10М. Во многих крупных студиях по всему миру Вы можете увидеть мониторы HS-10М, поскольку их частотный диапазон считается довольно "плоским" и если Ваш микс в них звучит великолепно, то и на других акустических системах будет звучать хорошо. HS-10М больше не производиться, но Yamaha применила их наследие в новой серии HS. Фокусируясь на звуковой чистоте, HS серия предоставляет более натуральное и точное воспроизведение. С новой разработкой преобразователей, высокопроизводительным усилителем, корпусом с низким уровнем резонанса и профессиональными входами/выходами, серия HS это лучшее от Yamaha и лучшее для Вашей студии.	Студийный монитор	\N	\N	700.99	0
4	Студийный монитор YAMAHA HS5	22000	HS5 активный 2-полосный студийный монитор с 5" низкочастотным динамиком и 1" твитером. Несмотря на маленький размер, он чрезвычайно точно воспроизводит частотный диапазон, достигая 54 Гц. Этот монитор идеален для маленькой домашней студии.	Студийный монитор	\N	\N	600	0
5	Студийный монитор YAMAHA HS5	22000	HS5 активный 2-полосный студийный монитор с 5" низкочастотным динамиком и 1" твитером. Несмотря на маленький размер, он чрезвычайно точно воспроизводит частотный диапазон, достигая 54 Гц. Этот монитор идеален для маленькой домашней студии.	Студийный монитор	\N	\N	600	2
\.


                                                                                                                                                                                                                                                                                                                                                                         3350.dat                                                                                            0000600 0004000 0002000 00000000665 14236432007 0014254 0                                                                                                    ustar 00postgres                        postgres                        0000000 0000000                                                                                                                                                                        2	Вес в упаковке	7.24	0	\N	1	Кг
3	Входы/Выходы	0	0	 XLR3-31, PHONE	1	
4	Вес без упаковки	5.3	0	\N	1	Кг
5	Габариты в заводской упаковке	0	0	 0.31 x 0.26 x 0.42 м	1	
6	Выходная мощность	70	0	\N	1	Вт
7	Габариты (Ширина/Высота/Глубина)	0	0	170 х 285 х 222 мм	1	
1	Частотный диапозон	53	30000	\N	1	Гц
\.


                                                                           3352.dat                                                                                            0000600 0004000 0002000 00000000035 14236432007 0014245 0                                                                                                    ustar 00postgres                        postgres                        0000000 0000000                                                                                                                                                                        1	1	1
2	1	1
3	1	2
4	1	2
\.


                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                   3354.dat                                                                                            0000600 0004000 0002000 00000000167 14236432007 0014255 0                                                                                                    ustar 00postgres                        postgres                        0000000 0000000                                                                                                                                                                        1	2	2	44000	6600	2022-05-06 20:00:00	2022-05-20 03:30:00
2	3	3	44000	6600	2022-05-25 15:10:11	2022-05-27 15:30:00
\.


                                                                                                                                                                                                                                                                                                                                                                                                         3356.dat                                                                                            0000600 0004000 0002000 00000000111 14236432007 0014244 0                                                                                                    ustar 00postgres                        postgres                        0000000 0000000                                                                                                                                                                        2	\N	\N	55.69052445	37.58297149804268
3	\N	\N	55.6911333	37.5816233
\.


                                                                                                                                                                                                                                                                                                                                                                                                                                                       3358.dat                                                                                            0000600 0004000 0002000 00000000400 14236432007 0014247 0                                                                                                    ustar 00postgres                        postgres                        0000000 0000000                                                                                                                                                                        2	Олег	Лебедев	+7(965)288-12-86	lebedevoleg72@gmail.com	$2a$12$N1auko8hGaQrmoBuxqN7SOkAo/GDFhIssTHu/r0WxYmdVlGzYGwuW	0
3	Иван	Иванов	+7(800)555-35-35	pochta@gmail.com	$2a$12$kIRn9Dr99hdAsvEhrze/2e9P77xAWBHdHyLHRw/XL08hD6eUTBpiW	3
\.


                                                                                                                                                                                                                                                                restore.sql                                                                                         0000600 0004000 0002000 00000024411 14236432007 0015367 0                                                                                                    ustar 00postgres                        postgres                        0000000 0000000                                                                                                                                                                        --
-- NOTE:
--
-- File paths need to be edited. Search for $$PATH$$ and
-- replace it with the path to the directory containing
-- the extracted data files.
--
--
-- PostgreSQL database dump
--

-- Dumped from database version 14.2
-- Dumped by pg_dump version 14.2

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

SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- Name: equipment; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.equipment (
    id integer NOT NULL,
    "eName" character varying(60) NOT NULL,
    "ePrice" integer,
    "eDescription" character varying(1000),
    "eCategory" character varying(150),
    "pId" integer,
    date_change time without time zone,
    "priceForHour" real,
    "eUsed" integer DEFAULT 0 NOT NULL
);


ALTER TABLE public.equipment OWNER TO postgres;

--
-- Name: equipment_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

ALTER TABLE public.equipment ALTER COLUMN id ADD GENERATED ALWAYS AS IDENTITY (
    SEQUENCE NAME public.equipment_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);


--
-- Name: options; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.options (
    id integer NOT NULL,
    "oName" character varying(160) NOT NULL,
    "oValueIntA" real,
    "oValueIntB" real,
    "oValueChar" character varying(300),
    "eId" integer NOT NULL,
    "oValueName" character varying(50)
);


ALTER TABLE public.options OWNER TO postgres;

--
-- Name: options_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

ALTER TABLE public.options ALTER COLUMN id ADD GENERATED ALWAYS AS IDENTITY (
    SEQUENCE NAME public.options_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);


--
-- Name: order_to_equipment; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.order_to_equipment (
    id integer NOT NULL,
    "eId" integer NOT NULL,
    "orderId" integer NOT NULL
);


ALTER TABLE public.order_to_equipment OWNER TO postgres;

--
-- Name: order_to_equipment_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

ALTER TABLE public.order_to_equipment ALTER COLUMN id ADD GENERATED ALWAYS AS IDENTITY (
    SEQUENCE NAME public.order_to_equipment_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);


--
-- Name: orders; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.orders (
    id integer NOT NULL,
    "uId" integer NOT NULL,
    "pId" integer NOT NULL,
    "priceAll" integer NOT NULL,
    "priceReady" integer NOT NULL,
    "startDate" timestamp without time zone NOT NULL,
    "endDate" timestamp without time zone NOT NULL
);


ALTER TABLE public.orders OWNER TO postgres;

--
-- Name: orders_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

ALTER TABLE public.orders ALTER COLUMN id ADD GENERATED ALWAYS AS IDENTITY (
    SEQUENCE NAME public.orders_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);


--
-- Name: place; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.place (
    id integer NOT NULL,
    "dateOn" time without time zone,
    "dateOut" time without time zone,
    "pIat" double precision NOT NULL,
    "pIon" double precision NOT NULL
);


ALTER TABLE public.place OWNER TO postgres;

--
-- Name: place_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

ALTER TABLE public.place ALTER COLUMN id ADD GENERATED ALWAYS AS IDENTITY (
    SEQUENCE NAME public.place_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);


--
-- Name: users; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.users (
    id integer NOT NULL,
    "uName" character varying(30) NOT NULL,
    "uLastName" character varying(60) NOT NULL,
    "uPhone" character varying(19),
    "uEmail" character varying(50) NOT NULL,
    "uPassword" character varying(61) NOT NULL,
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
-- Data for Name: equipment; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.equipment (id, "eName", "ePrice", "eDescription", "eCategory", "pId", date_change, "priceForHour", "eUsed") FROM stdin;
\.
COPY public.equipment (id, "eName", "ePrice", "eDescription", "eCategory", "pId", date_change, "priceForHour", "eUsed") FROM '$$PATH$$/3348.dat';

--
-- Data for Name: options; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.options (id, "oName", "oValueIntA", "oValueIntB", "oValueChar", "eId", "oValueName") FROM stdin;
\.
COPY public.options (id, "oName", "oValueIntA", "oValueIntB", "oValueChar", "eId", "oValueName") FROM '$$PATH$$/3350.dat';

--
-- Data for Name: order_to_equipment; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.order_to_equipment (id, "eId", "orderId") FROM stdin;
\.
COPY public.order_to_equipment (id, "eId", "orderId") FROM '$$PATH$$/3352.dat';

--
-- Data for Name: orders; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.orders (id, "uId", "pId", "priceAll", "priceReady", "startDate", "endDate") FROM stdin;
\.
COPY public.orders (id, "uId", "pId", "priceAll", "priceReady", "startDate", "endDate") FROM '$$PATH$$/3354.dat';

--
-- Data for Name: place; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.place (id, "dateOn", "dateOut", "pIat", "pIon") FROM stdin;
\.
COPY public.place (id, "dateOn", "dateOut", "pIat", "pIon") FROM '$$PATH$$/3356.dat';

--
-- Data for Name: users; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.users (id, "uName", "uLastName", "uPhone", "uEmail", "uPassword", "uRole") FROM stdin;
\.
COPY public.users (id, "uName", "uLastName", "uPhone", "uEmail", "uPassword", "uRole") FROM '$$PATH$$/3358.dat';

--
-- Name: equipment_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.equipment_id_seq', 7, true);


--
-- Name: options_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.options_id_seq', 7, true);


--
-- Name: order_to_equipment_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.order_to_equipment_id_seq', 4, true);


--
-- Name: orders_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.orders_id_seq', 2, true);


--
-- Name: place_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.place_id_seq', 3, true);


--
-- Name: users_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.users_id_seq', 3, true);


--
-- Name: equipment equipment_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.equipment
    ADD CONSTRAINT equipment_pkey PRIMARY KEY (id);


--
-- Name: options options_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.options
    ADD CONSTRAINT options_pkey PRIMARY KEY (id);


--
-- Name: order_to_equipment order_to_equipment_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.order_to_equipment
    ADD CONSTRAINT order_to_equipment_pkey PRIMARY KEY (id);


--
-- Name: orders orders_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.orders
    ADD CONSTRAINT orders_pkey PRIMARY KEY (id);


--
-- Name: place place_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.place
    ADD CONSTRAINT place_pkey PRIMARY KEY (id);


--
-- Name: users users_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_pkey PRIMARY KEY (id);


--
-- Name: equipment equipment_pId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.equipment
    ADD CONSTRAINT "equipment_pId_fkey" FOREIGN KEY ("pId") REFERENCES public.place(id) NOT VALID;


--
-- Name: options options_eId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.options
    ADD CONSTRAINT "options_eId_fkey" FOREIGN KEY ("eId") REFERENCES public.equipment(id);


--
-- Name: order_to_equipment order_to_equipment_eId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.order_to_equipment
    ADD CONSTRAINT "order_to_equipment_eId_fkey" FOREIGN KEY ("eId") REFERENCES public.equipment(id) NOT VALID;


--
-- Name: order_to_equipment order_to_equipment_orderId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.order_to_equipment
    ADD CONSTRAINT "order_to_equipment_orderId_fkey" FOREIGN KEY ("orderId") REFERENCES public.orders(id) NOT VALID;


--
-- Name: orders orders_pId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.orders
    ADD CONSTRAINT "orders_pId_fkey" FOREIGN KEY ("pId") REFERENCES public.place(id) NOT VALID;


--
-- Name: orders orders_uId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.orders
    ADD CONSTRAINT "orders_uId_fkey" FOREIGN KEY ("uId") REFERENCES public.users(id) NOT VALID;


--
-- PostgreSQL database dump complete
--

                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                       