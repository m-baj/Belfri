CREATE TABLE IF NOT EXISTS CITIES
(
    CITY_ID SERIAL PRIMARY KEY,
    NAME VARCHAR(60)
);

CREATE TABLE IF NOT EXISTS CATEGORIES
(
    CATEGORY_ID SERIAL PRIMARY KEY,
    NAME VARCHAR(40)
);

CREATE TABLE IF NOT EXISTS COMPANIES
(
    COMPANY_ID SERIAL PRIMARY KEY,
    NAME VARCHAR(100) NOT NULL,
    CONTRACT BYTEA,
    MAX_CREDITS INTEGER NOT NULL,
    START_DATE DATE NOT NULL,
    RENEWAL_INTERVAL TIMESTAMPTZ NOT NULL
);

CREATE TABLE IF NOT EXISTS CREDITS
(
    CREDITS_ID SERIAL PRIMARY KEY,
    COMPANY_ID INTEGER NOT NULL,
    BASE_VALUE INTEGER NOT NULL,
    CURRENT_VALUE INTEGER NOT NULL,
    CONSTRAINT CREDITS_COMPANIES_COMPANY_ID_fk FOREIGN KEY (COMPANY_ID) REFERENCES COMPANIES(COMPANY_ID),
    CHECK (BASE_VALUE >= CURRENT_VALUE)
);

CREATE TABLE IF NOT EXISTS USERS
(
    USER_ID SERIAL PRIMARY KEY,
    USERNAME VARCHAR(40) NOT NULL,
    PASS_HASH VARCHAR(300) NOT NULL,
    AUTH_LEVEL INTEGER DEFAULT 1,
    NAME VARCHAR(30) NOT NULL,
    SURNAME VARCHAR(30) NOT NULL,
    EMAIL VARCHAR(100) NOT NULL,
    DATE_OF_BIRTH DATE NOT NULL,
    ACTIVATED INTEGER DEFAULT 0 NOT NULL,
    CREDITS_ID INTEGER,
    CONSTRAINT USERS_CREDITS_CREDITS_ID_FK FOREIGN KEY (CREDITS_ID) REFERENCES CREDITS(CREDITS_ID)
);

CREATE TABLE IF NOT EXISTS TOKENS
(
    TOKEN_ID SERIAL PRIMARY KEY,
    USER_ID INTEGER NOT NULL,
    TOKEN VARCHAR(300) NOT NULL,
    EXPIRATION TIMESTAMPTZ NOT NULL,
    CONSTRAINT TOKENS_fk FOREIGN KEY (USER_ID) REFERENCES USERS(USER_ID)
);

CREATE TABLE IF NOT EXISTS TEST_TABLE
(
    DATA_ID SERIAL PRIMARY KEY,
    USER_ID INTEGER NOT NULL,
    SECRET_VALUE INTEGER
);

CREATE TABLE IF NOT EXISTS TEACHERS
(
    TEACHER_ID SERIAL PRIMARY KEY,
    USER_ID INTEGER NOT NULL,
    IBAN_NUMBER VARCHAR(255) NOT NULL,
    PHONE_NUMBER VARCHAR(20) NOT NULL,
    CONTRACT BYTEA,
    PROFILE_PICTURE BYTEA,
    CONSTRAINT TEACHERS_USERS_USER_ID_fk FOREIGN KEY (USER_ID) REFERENCES USERS(USER_ID)
);

CREATE TABLE IF NOT EXISTS OFFERS
(
    OFFER_ID SERIAL PRIMARY KEY,
    TEACHER_ID INTEGER NOT NULL,
    CATEGORY_ID INTEGER NOT NULL,
    CITY_ID INTEGER NOT NULL,
    NAME VARCHAR(255) NOT NULL,
    DESCRIPTION VARCHAR(1000) NOT NULL,
    RATING FLOAT,
    CONSTRAINT OFFERS_TEACHERS_TEACHER_ID_fk FOREIGN KEY (TEACHER_ID) REFERENCES TEACHERS(TEACHER_ID),
    CONSTRAINT OFFERS_CATEGORIES_CATEGORY_ID_fk FOREIGN KEY (CATEGORY_ID) REFERENCES CATEGORIES(CATEGORY_ID),
    CONSTRAINT OFFERS_CITIES_CITY_ID_fk FOREIGN KEY (CITY_ID) REFERENCES CITIES(CITY_ID)
);

CREATE TABLE IF NOT EXISTS LESSONS
(
    LESSON_ID SERIAL PRIMARY KEY,
    OFFER_ID INTEGER NOT NULL,
    USER_ID INTEGER NOT NULL,
    "DATE" DATE NOT NULL,
    STATUS_ID INTEGER NOT NULL,
    DURATION INTERVAL NOT NULL,
    CONSTRAINT LESSONS_OFFERS_OFFER_ID_fk FOREIGN KEY (OFFER_ID) REFERENCES OFFERS(OFFER_ID),
    CONSTRAINT LESSONS_USERS_USER_ID_fk FOREIGN KEY (USER_ID) REFERENCES USERS(USER_ID),
    CONSTRAINT LESSONS_STATUSES_STATUS_ID_fk FOREIGN KEY (STATUS_ID) REFERENCES STATUSES(STATUS_ID)
);

CREATE TABLE IF NOT EXISTS ACTIVATION
(
    TOKEN_ID SERIAL PRIMARY KEY,
    USER_ID INTEGER NOT NULL,
    TOKEN VARCHAR(200) NOT NULL,
    CONSTRAINT ACTIVATION_USERS_USER_ID_fk FOREIGN KEY (USER_ID) REFERENCES USERS(USER_ID),
    CONSTRAINT ACTIVATION_pk2 UNIQUE (TOKEN)
);

CREATE TABLE IF NOT EXISTS CREDITS_TOKENS
(
    CREDITS_TOKENS_ID SERIAL PRIMARY KEY,
    CREDITS_ID INTEGER NOT NULL,
    TOKEN VARCHAR(300) NOT NULL,
    CONSTRAINT CREDITS_TOKENS_CREDITS_CREDITS_ID_FK FOREIGN KEY (CREDITS_ID) REFERENCES CREDITS(CREDITS_ID),
    CONSTRAINT CREDITS_TOKENS_PK_2 UNIQUE (TOKEN)
);

CREATE TABLE IF NOT EXISTS STATUSES
(
    STATUS_ID SERIAL PRIMARY KEY,
    STATUS_NAME VARCHAR(40)
);
