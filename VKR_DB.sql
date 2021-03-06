toc.dat                                                                                             0000600 0004000 0002000 00000032027 14237176263 0014456 0                                                                                                    ustar 00postgres                        postgres                        0000000 0000000                                                                                                                                                                        PGDMP                           z            VKR_2022_DB    14.1    14.1 ,    ,           0    0    ENCODING    ENCODING        SET client_encoding = 'UTF8';
                      false         -           0    0 
   STDSTRINGS 
   STDSTRINGS     (   SET standard_conforming_strings = 'on';
                      false         .           0    0 
   SEARCHPATH 
   SEARCHPATH     8   SELECT pg_catalog.set_config('search_path', '', false);
                      false         /           1262    17201    VKR_2022_DB    DATABASE     j   CREATE DATABASE "VKR_2022_DB" WITH TEMPLATE = template0 ENCODING = 'UTF8' LOCALE = 'Russian_Russia.1251';
    DROP DATABASE "VKR_2022_DB";
                postgres    false         ?            1259    25393    equip_image    TABLE     ?   CREATE TABLE public.equip_image (
    id integer NOT NULL,
    "fileName" character varying(100) NOT NULL,
    "eName" character varying(200) NOT NULL
);
    DROP TABLE public.equip_image;
       public         heap    postgres    false         ?            1259    25396    equip_image_id_seq    SEQUENCE     ?   ALTER TABLE public.equip_image ALTER COLUMN id ADD GENERATED ALWAYS AS IDENTITY (
    SEQUENCE NAME public.equip_image_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);
            public          postgres    false    209         ?            1259    25397 	   equipment    TABLE     s  CREATE TABLE public.equipment (
    id integer NOT NULL,
    "eName" character varying(60) NOT NULL,
    "ePrice" integer,
    "eDescription" character varying(1000),
    "eCategory" character varying(150),
    "pId" integer DEFAULT 0,
    "priceForHour" real,
    "eUsed" integer DEFAULT 0 NOT NULL,
    date_change timestamp with time zone DEFAULT CURRENT_TIMESTAMP
);
    DROP TABLE public.equipment;
       public         heap    postgres    false         ?            1259    25404    equipment_id_seq    SEQUENCE     ?   ALTER TABLE public.equipment ALTER COLUMN id ADD GENERATED ALWAYS AS IDENTITY (
    SEQUENCE NAME public.equipment_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);
            public          postgres    false    211         ?            1259    25405    options    TABLE       CREATE TABLE public.options (
    id integer NOT NULL,
    "oName" character varying(160) NOT NULL,
    "oValueIntA" real,
    "oValueIntB" real,
    "oValueChar" character varying(300),
    "oValueName" character varying(50),
    "eName" character varying
);
    DROP TABLE public.options;
       public         heap    postgres    false         ?            1259    25410    options_id_seq    SEQUENCE     ?   ALTER TABLE public.options ALTER COLUMN id ADD GENERATED ALWAYS AS IDENTITY (
    SEQUENCE NAME public.options_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);
            public          postgres    false    213         ?            1259    25411    order_to_equipment    TABLE     ?   CREATE TABLE public.order_to_equipment (
    id integer NOT NULL,
    "eId" integer NOT NULL,
    "orderId" integer NOT NULL
);
 &   DROP TABLE public.order_to_equipment;
       public         heap    postgres    false         ?            1259    25414    order_to_equipment_id_seq    SEQUENCE     ?   ALTER TABLE public.order_to_equipment ALTER COLUMN id ADD GENERATED ALWAYS AS IDENTITY (
    SEQUENCE NAME public.order_to_equipment_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);
            public          postgres    false    215         ?            1259    25415    orders    TABLE       CREATE TABLE public.orders (
    id integer NOT NULL,
    "uId" integer NOT NULL,
    "pId" integer NOT NULL,
    "priceAll" integer NOT NULL,
    "priceReady" integer NOT NULL,
    "startDate" timestamp without time zone NOT NULL,
    "endDate" timestamp without time zone NOT NULL
);
    DROP TABLE public.orders;
       public         heap    postgres    false         ?            1259    25418    orders_id_seq    SEQUENCE     ?   ALTER TABLE public.orders ALTER COLUMN id ADD GENERATED ALWAYS AS IDENTITY (
    SEQUENCE NAME public.orders_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);
            public          postgres    false    217         ?            1259    25419    place    TABLE     ?   CREATE TABLE public.place (
    id integer NOT NULL,
    "pIat" double precision NOT NULL,
    "pIon" double precision NOT NULL,
    "dateOn" timestamp without time zone,
    "dateOut" timestamp without time zone
);
    DROP TABLE public.place;
       public         heap    postgres    false         ?            1259    25422    place_id_seq    SEQUENCE     ?   ALTER TABLE public.place ALTER COLUMN id ADD GENERATED BY DEFAULT AS IDENTITY (
    SEQUENCE NAME public.place_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);
            public          postgres    false    219         ?            1259    25423    users    TABLE     <  CREATE TABLE public.users (
    id integer NOT NULL,
    "uName" character varying(30) NOT NULL,
    "uLastName" character varying(60) NOT NULL,
    "uPhone" character varying(19),
    "uEmail" character varying(50) NOT NULL,
    "uPassword" character varying(61) NOT NULL,
    "uRole" integer DEFAULT 3 NOT NULL
);
    DROP TABLE public.users;
       public         heap    postgres    false         ?            1259    25427    users_id_seq    SEQUENCE     ?   ALTER TABLE public.users ALTER COLUMN id ADD GENERATED ALWAYS AS IDENTITY (
    SEQUENCE NAME public.users_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);
            public          postgres    false    221                   0    25393    equip_image 
   TABLE DATA           >   COPY public.equip_image (id, "fileName", "eName") FROM stdin;
    public          postgres    false    209       3356.dat           0    25397 	   equipment 
   TABLE DATA           ?   COPY public.equipment (id, "eName", "ePrice", "eDescription", "eCategory", "pId", "priceForHour", "eUsed", date_change) FROM stdin;
    public          postgres    false    211       3358.dat            0    25405    options 
   TABLE DATA           o   COPY public.options (id, "oName", "oValueIntA", "oValueIntB", "oValueChar", "oValueName", "eName") FROM stdin;
    public          postgres    false    213       3360.dat "          0    25411    order_to_equipment 
   TABLE DATA           B   COPY public.order_to_equipment (id, "eId", "orderId") FROM stdin;
    public          postgres    false    215       3362.dat $          0    25415    orders 
   TABLE DATA           d   COPY public.orders (id, "uId", "pId", "priceAll", "priceReady", "startDate", "endDate") FROM stdin;
    public          postgres    false    217       3364.dat &          0    25419    place 
   TABLE DATA           H   COPY public.place (id, "pIat", "pIon", "dateOn", "dateOut") FROM stdin;
    public          postgres    false    219       3366.dat (          0    25423    users 
   TABLE DATA           c   COPY public.users (id, "uName", "uLastName", "uPhone", "uEmail", "uPassword", "uRole") FROM stdin;
    public          postgres    false    221       3368.dat 0           0    0    equip_image_id_seq    SEQUENCE SET     @   SELECT pg_catalog.setval('public.equip_image_id_seq', 7, true);
          public          postgres    false    210         1           0    0    equipment_id_seq    SEQUENCE SET     ?   SELECT pg_catalog.setval('public.equipment_id_seq', 12, true);
          public          postgres    false    212         2           0    0    options_id_seq    SEQUENCE SET     =   SELECT pg_catalog.setval('public.options_id_seq', 28, true);
          public          postgres    false    214         3           0    0    order_to_equipment_id_seq    SEQUENCE SET     G   SELECT pg_catalog.setval('public.order_to_equipment_id_seq', 4, true);
          public          postgres    false    216         4           0    0    orders_id_seq    SEQUENCE SET     ;   SELECT pg_catalog.setval('public.orders_id_seq', 2, true);
          public          postgres    false    218         5           0    0    place_id_seq    SEQUENCE SET     :   SELECT pg_catalog.setval('public.place_id_seq', 3, true);
          public          postgres    false    220         6           0    0    users_id_seq    SEQUENCE SET     :   SELECT pg_catalog.setval('public.users_id_seq', 3, true);
          public          postgres    false    222                    2606    25429    equip_image equip_image_pkey 
   CONSTRAINT     Z   ALTER TABLE ONLY public.equip_image
    ADD CONSTRAINT equip_image_pkey PRIMARY KEY (id);
 F   ALTER TABLE ONLY public.equip_image DROP CONSTRAINT equip_image_pkey;
       public            postgres    false    209         ?           2606    25431    equipment equipment_pkey 
   CONSTRAINT     V   ALTER TABLE ONLY public.equipment
    ADD CONSTRAINT equipment_pkey PRIMARY KEY (id);
 B   ALTER TABLE ONLY public.equipment DROP CONSTRAINT equipment_pkey;
       public            postgres    false    211         ?           2606    25433    options options_pkey 
   CONSTRAINT     R   ALTER TABLE ONLY public.options
    ADD CONSTRAINT options_pkey PRIMARY KEY (id);
 >   ALTER TABLE ONLY public.options DROP CONSTRAINT options_pkey;
       public            postgres    false    213         ?           2606    25435 *   order_to_equipment order_to_equipment_pkey 
   CONSTRAINT     h   ALTER TABLE ONLY public.order_to_equipment
    ADD CONSTRAINT order_to_equipment_pkey PRIMARY KEY (id);
 T   ALTER TABLE ONLY public.order_to_equipment DROP CONSTRAINT order_to_equipment_pkey;
       public            postgres    false    215         ?           2606    25437    orders orders_pkey 
   CONSTRAINT     P   ALTER TABLE ONLY public.orders
    ADD CONSTRAINT orders_pkey PRIMARY KEY (id);
 <   ALTER TABLE ONLY public.orders DROP CONSTRAINT orders_pkey;
       public            postgres    false    217         ?           2606    25439    place place_pkey 
   CONSTRAINT     N   ALTER TABLE ONLY public.place
    ADD CONSTRAINT place_pkey PRIMARY KEY (id);
 :   ALTER TABLE ONLY public.place DROP CONSTRAINT place_pkey;
       public            postgres    false    219         ?           2606    25441    users users_pkey 
   CONSTRAINT     N   ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_pkey PRIMARY KEY (id);
 :   ALTER TABLE ONLY public.users DROP CONSTRAINT users_pkey;
       public            postgres    false    221         ?           2606    25442    equipment equipment_pId_fkey    FK CONSTRAINT     ?   ALTER TABLE ONLY public.equipment
    ADD CONSTRAINT "equipment_pId_fkey" FOREIGN KEY ("pId") REFERENCES public.place(id) NOT VALID;
 H   ALTER TABLE ONLY public.equipment DROP CONSTRAINT "equipment_pId_fkey";
       public          postgres    false    3209    211    219         ?           2606    25447 .   order_to_equipment order_to_equipment_eId_fkey    FK CONSTRAINT     ?   ALTER TABLE ONLY public.order_to_equipment
    ADD CONSTRAINT "order_to_equipment_eId_fkey" FOREIGN KEY ("eId") REFERENCES public.equipment(id) NOT VALID;
 Z   ALTER TABLE ONLY public.order_to_equipment DROP CONSTRAINT "order_to_equipment_eId_fkey";
       public          postgres    false    3201    211    215         ?           2606    25452 2   order_to_equipment order_to_equipment_orderId_fkey    FK CONSTRAINT     ?   ALTER TABLE ONLY public.order_to_equipment
    ADD CONSTRAINT "order_to_equipment_orderId_fkey" FOREIGN KEY ("orderId") REFERENCES public.orders(id) NOT VALID;
 ^   ALTER TABLE ONLY public.order_to_equipment DROP CONSTRAINT "order_to_equipment_orderId_fkey";
       public          postgres    false    3207    217    215         ?           2606    25457    orders orders_pId_fkey    FK CONSTRAINT        ALTER TABLE ONLY public.orders
    ADD CONSTRAINT "orders_pId_fkey" FOREIGN KEY ("pId") REFERENCES public.place(id) NOT VALID;
 B   ALTER TABLE ONLY public.orders DROP CONSTRAINT "orders_pId_fkey";
       public          postgres    false    217    219    3209         ?           2606    25462    orders orders_uId_fkey    FK CONSTRAINT        ALTER TABLE ONLY public.orders
    ADD CONSTRAINT "orders_uId_fkey" FOREIGN KEY ("uId") REFERENCES public.users(id) NOT VALID;
 B   ALTER TABLE ONLY public.orders DROP CONSTRAINT "orders_uId_fkey";
       public          postgres    false    3211    221    217                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                 3356.dat                                                                                            0000600 0004000 0002000 00000000317 14237176263 0014266 0                                                                                                    ustar 00postgres                        postgres                        0000000 0000000                                                                                                                                                                        1	YAMAHA_HS5.png	Студийный монитор YAMAHA HS5
2	YAMAHA_HS5_1.png	Студийный монитор YAMAHA HS5
6	MACKIE_CR4-XBT_0.png	MACKIE CR4-XBT
7	MACKIE_CR4-XBT_1.png	MACKIE CR4-XBT
\.


                                                                                                                                                                                                                                                                                                                 3358.dat                                                                                            0000600 0004000 0002000 00000022072 14237176263 0014272 0                                                                                                    ustar 00postgres                        postgres                        0000000 0000000                                                                                                                                                                        4	Студийный монитор YAMAHA HS5	22000	HS5 активный 2-полосный студийный монитор с 5" низкочастотным динамиком и 1" твитером. Несмотря на маленький размер, он чрезвычайно точно воспроизводит частотный диапазон, достигая 54 Гц. Этот монитор идеален для маленькой домашней студии.	Студийные мониторы	0	600	0	\N
9	Студийные мониторы JBL 305P MKII	16000	Мощный студийный монитор JBL 305P MkII - следующее поколение монитора JBL LSR308. Модернизация и усовершенствования делают легендарную производительность JBL доступной для каждой студии. Благодаря революционному волноводу JBL Image Control Waveguide и усовершенствованным преобразователям, JBL 305P MkII предлагает потрясающие детали, точную визуализацию, расширение зоны "sweet spot" и впечатляющий динамический диапазон, который расширяет возможности микширования любого современного рабочего пространства. Обладая запатентованными технологиями, полученными из референсных мониторов серии JBL 7 и M2, а также гладкому современному дизайну, JBL 305P MkII обеспечивают отличную производительность и приятный микс по доступной цене. 	Студийные мониторы	0	2400	0	\N
5	Студийный монитор YAMAHA HS5	22000	HS5 активный 2-полосный студийный монитор с 5" низкочастотным динамиком и 1" твитером. Несмотря на маленький размер, он чрезвычайно точно воспроизводит частотный диапазон, достигая 54 Гц. Этот монитор идеален для маленькой домашней студии.	Студийные мониторы	0	600	2	\N
11	Студийные мониторы MACKIE CR4-XBT	26100	Мультимедийные мониторы серии CR Creative Reference предлагают функциональность и студийного качества звук в элегантном дизайне с матовой металлической передней панелью и четкими контурами, мониторы, которые дополнят любое рабочее пространство и станут хорошим приобретением для мьюзик мейкеров, создателей контента, видео продакшена и для тех, кто желает порелаксировать под любимые мелодии. Линейка CR Creative Reference состоит из трёх моделей мониторов, их беспроводных версий с Bluetooth подключением и сабвуфера.	Студийные мониторы	0	3915	0	\N
6	Студийный монитор YAMAHA HS7	32990	HS7 новый член HS серии студийных мониторов. HS7 активный 2-полосный студийный монитор с 6,5" низкочастотным динамиком и 1" твитером. Монитор характеризуется 95 Вт мощности и способен воспроизводить 43 Гц – 30 кГц частотного диапазона. Этот монитор идеален для любой студии./nСерия мониторов HS рождена из легендарного HS-10М. Во многих крупных студиях по всему миру Вы можете увидеть мониторы HS-10М, поскольку их частотный диапазон считается довольно "плоским" и если Ваш микс в них звучит великолепно, то и на других акустических системах будет звучать хорошо. HS-10М больше не производиться, но Yamaha применила их наследие в новой серии HS. Фокусируясь на звуковой чистоте, HS серия предоставляет более натуральное и точное воспроизведение. С новой разработкой преобразователей, высокопроизводительным усилителем, корпусом с низким уровнем резонанса и профессиональными входами/выходами, серия HS это лучшее от Yamaha и лучшее для Вашей студии.	Студийные мониторы	0	700.99	0	\N
1	Студийный монитор YAMAHA HS5	22000	HS5 активный 2-полосный студийный монитор с 5" низкочастотным динамиком и 1" твитером. Несмотря на маленький размер, он чрезвычайно точно воспроизводит частотный диапазон, достигая 54 Гц. Этот монитор идеален для маленькой домашней студии.	Студийные мониторы	2	600	1	2022-05-12 06:54:58.295+03
3	Студийный монитор YAMAHA HS5	22000	HS5 активный 2-полосный студийный монитор с 5" низкочастотным динамиком и 1" твитером. Несмотря на маленький размер, он чрезвычайно точно воспроизводит частотный диапазон, достигая 54 Гц. Этот монитор идеален для маленькой домашней студии.	Студийные мониторы	0	600	0	2022-05-12 10:05:18.897+03
7	Студийный монитор YAMAHA HS8	38990	HS8 самый большой и самый универсальный из HS серии студийный монитор. HS8 активный 2-полосный студийный монитор с 8" низкочастотным динамиком и 1" твитером. Монитор характеризуется 120 Вт мощности и способен воспроизводить 38 Гц – 30 кГц частотного диапазона. Этот монитор идеален для профессиональной студии. \\nСерия мониторов HS рождена из легендарного HS-10М. Во многих крупных студиях по всему миру Вы можете увидеть мониторы HS-10М, поскольку их частотный диапазон считается довольно "плоским" и если Ваш микс в них звучит великолепно, то и на других акустических системах будет звучать хорошо. HS-10М больше не производиться, но Yamaha применила их наследие в новой серии HS. Фокусируясь на звуковой чистоте, HS серия предоставляет более натуральное и точное воспроизведение. С новой разработкой преобразователей, высокопроизводительным усилителем, корпусом с низким уровнем резонанса и профессиональными входами/выходами, серия HS это лучшее от Yamaha и лучшее для Вашей студии.	Студийные мониторы	0	750	0	\N
12	Студийные мониторы MACKIE CR4-XBT	26100	Мультимедийные мониторы серии CR Creative Reference предлагают функциональность и студийного качества звук в элегантном дизайне с матовой металлической передней панелью и четкими контурами, мониторы, которые дополнят любое рабочее пространство и станут хорошим приобретением для мьюзик мейкеров, создателей контента, видео продакшена и для тех, кто желает порелаксировать под любимые мелодии. Линейка CR Creative Reference состоит из трёх моделей мониторов, их беспроводных версий с Bluetooth подключением и сабвуфера.	Студийные мониторы	0	3915	0	\N
\.


                                                                                                                                                                                                                                                                                                                                                                                                                                                                      3360.dat                                                                                            0000600 0004000 0002000 00000004640 14237176263 0014264 0                                                                                                    ustar 00postgres                        postgres                        0000000 0000000                                                                                                                                                                        1	Частотный диапозон	53	30000	\N	Гц	Студийный монитор YAMAHA HS5
2	Вес в упаковке	7.24	0	\N	Кг	Студийный монитор YAMAHA HS5
3	Входы/Выходы	0	0	 XLR3-31, PHONE		Студийный монитор YAMAHA HS5
4	Вес без упаковки	5.3	0	\N	Кг	Студийный монитор YAMAHA HS5
5	Габариты в заводской упаковке	0	0	 0.31 x 0.26 x 0.42 м		Студийный монитор YAMAHA HS5
6	Выходная мощность	70	0	\N	Вт	Студийный монитор YAMAHA HS5
7	Габариты (Ширина/Высота/Глубина)	0	0	170 х 285 х 222 мм		Студийный монитор YAMAHA HS5
8	Частотный диапозон	43	24000	\N	Гц	Студийные мониторы JBL 305P MKII
9	Выходная мощность	41	0	\N	Вт	Студийные мониторы JBL 305P MKII
10	Входы/Выходы	0	0	XLR мама, TRS мама, балансные		Студийные мониторы JBL 305P MKII
11	Габариты (Ширина/Высота/Глубина)	0	0	298 x 185 x 231 мм		Студийные мониторы JBL 305P MKII
12	Габариты в заводской упаковке	0	0	0.315 x 0.265 x 0.37 м		Студийные мониторы JBL 305P MKII
13	Вес без упаковки	4.73	0	\N	Кг	Студийные мониторы JBL 305P MKII
14	Вес в упаковке	5.85	0	\N	Кг	Студийные мониторы JBL 305P MKII
15	Частотный диапозон	0	20000	\N	Гц	Студийные мониторы MACKIE CR4-XBT
16	Выходная мощность	50	0	\N	Вт	Студийные мониторы MACKIE CR4-XBT
17	Входы/Выходы	0	0	1/4" TRS балансные/небалансные входы, RCA небалансные входы, 1/8" стерео выход для наушников 		Студийные мониторы MACKIE CR4-XBT
18	Габариты в заводской упаковке	0	0	0.43 x 0.23 x 0.28 м		Студийные мониторы MACKIE CR4-XBT
19	Габариты (Ширина/Высота/Глубина)	0	0	225 х 155 х 210 мм		Студийные мониторы MACKIE CR4-XBT
20	Вес в упаковке	5.26	0	\N	Кг	Студийные мониторы MACKIE CR4-XBT
21	Вес без упаковки	4.6	0	\N	Кг	Студийные мониторы MACKIE CR4-XBT
\.


                                                                                                3362.dat                                                                                            0000600 0004000 0002000 00000000035 14237176263 0014260 0                                                                                                    ustar 00postgres                        postgres                        0000000 0000000                                                                                                                                                                        1	1	1
2	1	1
3	1	2
4	1	2
\.


                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                   3364.dat                                                                                            0000600 0004000 0002000 00000000167 14237176263 0014270 0                                                                                                    ustar 00postgres                        postgres                        0000000 0000000                                                                                                                                                                        1	2	2	44000	6600	2022-05-06 20:00:00	2022-05-20 03:30:00
2	3	3	44000	6600	2022-05-25 15:10:11	2022-05-27 15:30:00
\.


                                                                                                                                                                                                                                                                                                                                                                                                         3366.dat                                                                                            0000600 0004000 0002000 00000000217 14237176263 0014266 0                                                                                                    ustar 00postgres                        postgres                        0000000 0000000                                                                                                                                                                        3	55.6911333	37.5816233	\N	\N
0	55.670879	37.481567	\N	\N
2	55.69052445	37.58297149804268	2022-05-12 06:54:58.301	2022-05-12 06:44:24.884
\.


                                                                                                                                                                                                                                                                                                                                                                                 3368.dat                                                                                            0000600 0004000 0002000 00000000400 14237176263 0014262 0                                                                                                    ustar 00postgres                        postgres                        0000000 0000000                                                                                                                                                                        2	Олег	Лебедев	+7(965)288-12-86	lebedevoleg72@gmail.com	$2a$12$N1auko8hGaQrmoBuxqN7SOkAo/GDFhIssTHu/r0WxYmdVlGzYGwuW	0
3	Иван	Иванов	+7(800)555-35-35	pochta@gmail.com	$2a$12$kIRn9Dr99hdAsvEhrze/2e9P77xAWBHdHyLHRw/XL08hD6eUTBpiW	3
\.


                                                                                                                                                                                                                                                                restore.sql                                                                                         0000600 0004000 0002000 00000026346 14237176263 0015412 0                                                                                                    ustar 00postgres                        postgres                        0000000 0000000                                                                                                                                                                        --
-- NOTE:
--
-- File paths need to be edited. Search for $$PATH$$ and
-- replace it with the path to the directory containing
-- the extracted data files.
--
--
-- PostgreSQL database dump
--

-- Dumped from database version 14.1
-- Dumped by pg_dump version 14.1

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
-- Name: equip_image; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.equip_image (
    id integer NOT NULL,
    "fileName" character varying(100) NOT NULL,
    "eName" character varying(200) NOT NULL
);


ALTER TABLE public.equip_image OWNER TO postgres;

--
-- Name: equip_image_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

ALTER TABLE public.equip_image ALTER COLUMN id ADD GENERATED ALWAYS AS IDENTITY (
    SEQUENCE NAME public.equip_image_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);


--
-- Name: equipment; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.equipment (
    id integer NOT NULL,
    "eName" character varying(60) NOT NULL,
    "ePrice" integer,
    "eDescription" character varying(1000),
    "eCategory" character varying(150),
    "pId" integer DEFAULT 0,
    "priceForHour" real,
    "eUsed" integer DEFAULT 0 NOT NULL,
    date_change timestamp with time zone DEFAULT CURRENT_TIMESTAMP
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
    "oValueName" character varying(50),
    "eName" character varying
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
    "pIat" double precision NOT NULL,
    "pIon" double precision NOT NULL,
    "dateOn" timestamp without time zone,
    "dateOut" timestamp without time zone
);


ALTER TABLE public.place OWNER TO postgres;

--
-- Name: place_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

ALTER TABLE public.place ALTER COLUMN id ADD GENERATED BY DEFAULT AS IDENTITY (
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
-- Data for Name: equip_image; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.equip_image (id, "fileName", "eName") FROM stdin;
\.
COPY public.equip_image (id, "fileName", "eName") FROM '$$PATH$$/3356.dat';

--
-- Data for Name: equipment; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.equipment (id, "eName", "ePrice", "eDescription", "eCategory", "pId", "priceForHour", "eUsed", date_change) FROM stdin;
\.
COPY public.equipment (id, "eName", "ePrice", "eDescription", "eCategory", "pId", "priceForHour", "eUsed", date_change) FROM '$$PATH$$/3358.dat';

--
-- Data for Name: options; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.options (id, "oName", "oValueIntA", "oValueIntB", "oValueChar", "oValueName", "eName") FROM stdin;
\.
COPY public.options (id, "oName", "oValueIntA", "oValueIntB", "oValueChar", "oValueName", "eName") FROM '$$PATH$$/3360.dat';

--
-- Data for Name: order_to_equipment; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.order_to_equipment (id, "eId", "orderId") FROM stdin;
\.
COPY public.order_to_equipment (id, "eId", "orderId") FROM '$$PATH$$/3362.dat';

--
-- Data for Name: orders; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.orders (id, "uId", "pId", "priceAll", "priceReady", "startDate", "endDate") FROM stdin;
\.
COPY public.orders (id, "uId", "pId", "priceAll", "priceReady", "startDate", "endDate") FROM '$$PATH$$/3364.dat';

--
-- Data for Name: place; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.place (id, "pIat", "pIon", "dateOn", "dateOut") FROM stdin;
\.
COPY public.place (id, "pIat", "pIon", "dateOn", "dateOut") FROM '$$PATH$$/3366.dat';

--
-- Data for Name: users; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.users (id, "uName", "uLastName", "uPhone", "uEmail", "uPassword", "uRole") FROM stdin;
\.
COPY public.users (id, "uName", "uLastName", "uPhone", "uEmail", "uPassword", "uRole") FROM '$$PATH$$/3368.dat';

--
-- Name: equip_image_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.equip_image_id_seq', 7, true);


--
-- Name: equipment_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.equipment_id_seq', 12, true);


--
-- Name: options_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.options_id_seq', 28, true);


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
-- Name: equip_image equip_image_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.equip_image
    ADD CONSTRAINT equip_image_pkey PRIMARY KEY (id);


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

                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                          