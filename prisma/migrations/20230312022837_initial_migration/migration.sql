BEGIN TRY

BEGIN TRAN;

-- CreateTable
CREATE TABLE [dbo].[SurveyQuestion] (
    [id] NVARCHAR(1000) NOT NULL,
    [question] NVARCHAR(1000) NOT NULL,
    [position] INT NOT NULL,
    [questionType] NVARCHAR(1000) NOT NULL,
    CONSTRAINT [SurveyQuestion_pkey] PRIMARY KEY CLUSTERED ([id])
);

-- CreateTable
CREATE TABLE [dbo].[SurveyAnswer] (
    [id] NVARCHAR(1000) NOT NULL,
    [questionId] NVARCHAR(1000) NOT NULL,
    [answer] NVARCHAR(1000) NOT NULL,
    [position] INT NOT NULL,
    [answerType] NVARCHAR(1000) NOT NULL,
    CONSTRAINT [SurveyAnswer_pkey] PRIMARY KEY CLUSTERED ([id])
);

-- CreateTable
CREATE TABLE [dbo].[UserSurveyAnswers] (
    [id] NVARCHAR(1000) NOT NULL,
    [userId] NVARCHAR(1000) NOT NULL,
    [questionId] NVARCHAR(1000) NOT NULL,
    [answerValue] NVARCHAR(1000) NOT NULL,
    CONSTRAINT [UserSurveyAnswers_pkey] PRIMARY KEY CLUSTERED ([id])
);

-- CreateTable
CREATE TABLE [dbo].[ZipCode] (
    [id] NVARCHAR(1000) NOT NULL,
    [userId] NVARCHAR(1000) NOT NULL,
    [zipcode] NVARCHAR(1000) NOT NULL,
    CONSTRAINT [ZipCode_pkey] PRIMARY KEY CLUSTERED ([id]),
    CONSTRAINT [ZipCode_userId_key] UNIQUE NONCLUSTERED ([userId])
);

-- CreateTable
CREATE TABLE [dbo].[CensusTract] (
    [id] NVARCHAR(1000) NOT NULL,
    [name] NVARCHAR(1000) NOT NULL,
    CONSTRAINT [CensusTract_pkey] PRIMARY KEY CLUSTERED ([id])
);

-- CreateTable
CREATE TABLE [dbo].[Account] (
    [id] NVARCHAR(1000) NOT NULL,
    [userId] NVARCHAR(1000) NOT NULL,
    [type] NVARCHAR(1000) NOT NULL,
    [provider] NVARCHAR(1000) NOT NULL,
    [providerAccountId] NVARCHAR(1000) NOT NULL,
    [refresh_token] NVARCHAR(1000),
    [access_token] NVARCHAR(1000),
    [expires_at] INT,
    [token_type] NVARCHAR(1000),
    [scope] NVARCHAR(1000),
    [id_token] NVARCHAR(1000),
    [session_state] NVARCHAR(1000),
    CONSTRAINT [Account_pkey] PRIMARY KEY CLUSTERED ([id]),
    CONSTRAINT [Account_provider_providerAccountId_key] UNIQUE NONCLUSTERED ([provider],[providerAccountId])
);

-- CreateTable
CREATE TABLE [dbo].[Session] (
    [id] NVARCHAR(1000) NOT NULL,
    [sessionToken] NVARCHAR(1000) NOT NULL,
    [userId] NVARCHAR(1000) NOT NULL,
    [expires] DATETIME2 NOT NULL,
    CONSTRAINT [Session_pkey] PRIMARY KEY CLUSTERED ([id]),
    CONSTRAINT [Session_sessionToken_key] UNIQUE NONCLUSTERED ([sessionToken])
);

-- CreateTable
CREATE TABLE [dbo].[User] (
    [id] NVARCHAR(1000) NOT NULL,
    [name] NVARCHAR(1000),
    [email] NVARCHAR(1000),
    [emailVerified] DATETIME2,
    [image] NVARCHAR(1000),
    [censusTractId] NVARCHAR(1000),
    [demoSurveyCompleted] BIT NOT NULL CONSTRAINT [User_demoSurveyCompleted_df] DEFAULT 0,
    CONSTRAINT [User_pkey] PRIMARY KEY CLUSTERED ([id]),
    CONSTRAINT [User_email_key] UNIQUE NONCLUSTERED ([email]),
    CONSTRAINT [User_censusTractId_key] UNIQUE NONCLUSTERED ([censusTractId])
);

-- CreateTable
CREATE TABLE [dbo].[VerificationToken] (
    [identifier] NVARCHAR(1000) NOT NULL,
    [token] NVARCHAR(1000) NOT NULL,
    [expires] DATETIME2 NOT NULL,
    CONSTRAINT [VerificationToken_token_key] UNIQUE NONCLUSTERED ([token]),
    CONSTRAINT [VerificationToken_identifier_token_key] UNIQUE NONCLUSTERED ([identifier],[token])
);

-- AddForeignKey
ALTER TABLE [dbo].[SurveyAnswer] ADD CONSTRAINT [SurveyAnswer_questionId_fkey] FOREIGN KEY ([questionId]) REFERENCES [dbo].[SurveyQuestion]([id]) ON DELETE NO ACTION ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE [dbo].[UserSurveyAnswers] ADD CONSTRAINT [UserSurveyAnswers_userId_fkey] FOREIGN KEY ([userId]) REFERENCES [dbo].[User]([id]) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE [dbo].[UserSurveyAnswers] ADD CONSTRAINT [UserSurveyAnswers_questionId_fkey] FOREIGN KEY ([questionId]) REFERENCES [dbo].[SurveyQuestion]([id]) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE [dbo].[ZipCode] ADD CONSTRAINT [ZipCode_userId_fkey] FOREIGN KEY ([userId]) REFERENCES [dbo].[User]([id]) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE [dbo].[Account] ADD CONSTRAINT [Account_userId_fkey] FOREIGN KEY ([userId]) REFERENCES [dbo].[User]([id]) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE [dbo].[Session] ADD CONSTRAINT [Session_userId_fkey] FOREIGN KEY ([userId]) REFERENCES [dbo].[User]([id]) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE [dbo].[User] ADD CONSTRAINT [User_censusTractId_fkey] FOREIGN KEY ([censusTractId]) REFERENCES [dbo].[CensusTract]([id]) ON DELETE SET NULL ON UPDATE CASCADE;

-- Add Question Data
INSERT INTO
    [dbo].[SurveyQuestion] (
        id,
        question,
        position,
        questionType
    )
VALUES
    (
        '1',
        'Are you a full-time resident of Hawaii (lived in Hawaii at least six months each year)?',
        1,
        'option'
    ),
    (
        '2',
        'What was your age on your last birthday?',
        2,
        'number'
    ),
    (
        '3',
        'What is your gender?',
        3,
        'option'
    ),
    (
        '4',
        'Including yourself, how many persons, in total, live in your household?',
        4,
        'number'
    ),
    (
        '5',
        'Which of the following best describes your current employment status?',
        5,
        'multiSelect'
    ),
    (
        '6',
        'Do you currently have a non-dial-up internet subscription (i.e., cellular data, cable, fiber optic, DSL, satellite)?',
        6,
        'option'
    ),
    (
        '7',
        'Did you have a non-dial-up internet subscription (i.e., cellular data, cable, fiber optic, DSL, satellite) during the pandemic?',
        7,
        'option'
    ),
    (
        '8',
        'Do you currently have health insurance?',
        8,
        'option'
    ),
    (
        '9',
        'Did you have health insurance during the pandemic?',
        9,
        'option'
    ),
    (
        '10',
        'Are you currently living in a… (Select one answer)',
        10,
        'option'
    ),
    (
        '11',
        'Is your housing structure below… (Select one answer)',
        11,
        'option'
    ),
    (
        '12',
        'What is your ethnic identification? If more than one ethnicity, which do you identify most. If you cannot choose, please select mixed. If you have any Hawaiian in your ethnic mix, please select Hawaiian/Part Hawaiian',
        12,
        'option'
    ),
    (
        '13',
        'What is the highest level of education you have completed? (Select one answer)',
        13,
        'option'
    ),
    (
        '14',
        'Do you identify with having a disability?',
        14,
        'option'
    ),
    (
        '15',
        'What was your household income in 2022, before taxes? Please consider and include in your thinking your best estimate of the income of all persons living in your household. (Select one answer)',
        15,
        'option'
    ),
    (
        '16',
        'What is your workshop location? (Select one answer)',
        16,
        'option'
    );

INSERT INTO
    [dbo].[SurveyAnswer] (id, questionId, answer, position, answerType)
VALUES
    (
        '1',
        1,
        'yes',
        1,
        'option'
    ),
    (
        '2',
        1,
        'no',
        2,
        'option'
    ),
    (
        '3',
        2,
        '',
        1,
        'text'
    ),
    (
        '4',
        3,
        'Female',
        1,
        'option'
    ),
    (
        '5',
        3,
        'Male',
        2,
        'option'
    ),
    (
        '6',
        3,
        'Other,',
        3,
        'optionText'
    ),
    (
        '7',
        4,
        '',
        1,
        'number'
    ),
    (
        '8',
        5,
        'Employed full time / part time',
        1,
        'option'
    ),
    (
        '9',
        5,
        'Unemployed, not looking for work',
        2,
        'option'
    ),
    (
        '10',
        5,
        'Unemployed, looking for work',
        3,
        'option'
    ),
    (
        '11',
        5,
        'Retired',
        4,
        'option'
    ),
    (
        '12',
        5,
        'Homemaker',
        5,
        'option'
    ),
    (
        '13',
        5,
        'Self-employed',
        6,
        'option'
    ),
    (
        '14',
        5,
        'Student',
        7,
        'option'
    ),
    (
        '15',
        5,
        'Other, ',
        8,
        'optionText'
    ),
    (
        '16',
        6,
        'yes',
        1,
        'option'
    ),
    (
        '17',
        6,
        'no',
        2,
        'option'
    ),
    (
        '18',
        7,
        'yes',
        1,
        'option'
    ),
    (
        '19',
        7,
        'no',
        2,
        'option'
    ),
    (
        '20',
        8,
        'yes',
        1,
        'option'
    ),
    (
        '21',
        8,
        'no',
        2,
        'option'
    ),
    (
        '22',
        9,
        'yes',
        1,
        'option'
    ),
    (
        '23',
        9,
        'no',
        2,
        'option'
    ),
    (
        '24',
        10,
        'Permanent stable housing structure (e.g., house, apartment, condominium, accessory dwelling unit / ADU, ohana unit)',
        1,
        'option'
    ),
    (
        '25',
        10,
        'Mobile home (e.g., RV, vehicle, boat)',
        2,
        'option'
    ),
    (
        '26',
        10,
        'Group quarters (e.g., institutional facility, college dorms, military housing, correctional facility, transitional housing)',
        3,
        'option'
    ),
    (
        '27',
        10,
        'Other permanent housing (e.g., community village, tiny home)',
        4,
        'option'
    ),
    (
        '28',
        10,
        'I am houseless',
        5,
        'option'
    ),
    (
        '29',
        10,
        'Other,',
        6,
        'optionText'
    ),
    (
        '30',
        11,
        'Owned by you or someone in the household, with mortgage / loan',
        1,
        'option'
    ),
    (
        '31',
        11,
        'Owned by you or someone in the household, without mortgage / loan',
        2,
        'option'
    ),
    (
        '32',
        11,
        'Rented by you or someone in the household',
        3,
        'option'
    ),
    (
        '33',
        11,
        'Rent free to you and your household',
        4,
        'option'
    ),
    (
        '34',
        11,
        'Not applicable',
        5,
        'option'
    ),
    (
        '35',
        12,
        'Caucasian / White',
        1,
        'option'
    ),
    (
        '36',
        12,
        'Black or African American',
        2,
        'option'
    ),
    (
        '37',
        12,
        'American Indian or Alaska Native,',
        3,
        'optiontText'
    ),
    (
        '38',
        12,
        'Asian Indian',
        4,
        'option'
    ),
    (
        '39',
        12,
        'Japanese',
        5,
        'option'
    ),
    (
        '40',
        12,
        'Native Hawaiian',
        6,
        'option'
    ),
    (
        '41',
        12,
        'Chinese',
        7,
        'option'
    ),
    (
        '42',
        12,
        'Korean',
        8,
        'option'
    ),
    (
        '43',
        12,
        'Guamanian or Chamorro',
        9,
        'option'
    ),
    (
        '44',
        12,
        'Filipino',
        10,
        'option'
    ),
    (
        '45',
        12,
        'Vietnamese',
        11,
        'option'
    ),
    (
        '46',
        12,
        'Samoan',
        12,
        'option'
    ),
    (
        '47',
        12,
        'Mixed (not Hawaiian)',
        13,
        'option'
    ),
    (
        '48',
        12,
        'Other Asian,',
        14,
        'optionText'
    ),
    (
        '49',
        12,
        'Other Pacific Islander,',
        15,
        'optionText'
    ),
    (
        '50',
        12,
        'Some other race,',
        16,
        'optionText'
    ),
    (
        '51',
        12,
        'Prefer not to say',
        17,
        'option'
    ),
    (
        '52',
        13,
        'Less than high school',
        1,
        'option'
    ),
    (
        '53',
        13,
        'High school/GED',
        2,
        'option'
    ),
    (
        '54',
        13,
        'Some college, no degree',
        3,
        'option'
    ),
    (
        '55',
        13,
        'Trade school',
        4,
        'option'
    ),
    (
        '56',
        13,
        'Associate degree',
        5,
        'option'
    ),
    (
        '57',
        13,
        'Bachelor’s degree',
        6,
        'option'
    ),
    (
        '58',
        13,
        'Graduate or professional degree',
        7,
        'option'
    ),
    (
        '59',
        14,
        'yes',
        1,
        'option'
    ),
    (
        '60',
        14,
        'no',
        2,
        'option'
    ),
    (
        '61',
        15,
        'Less than $10,000',
        1,
        'option'
    ),
    (
        '62',
        15,
        '$10,000 but less than $15,000',
        2,
        'option'
    ),
    (
        '63',
        15,
        '$15,000 but less than $25,000',
        3,
        'option'
    ),
    (
        '64',
        15,
        '$25,000 but less than $35,000',
        4,
        'option'
    ),
    (
        '65',
        15,
        '$35,000 but less than $50,000',
        5,
        'option'
    ),
    (
        '66',
        15,
        '$50,000 but less than $75,000',
        6,
        'option'
    ),
    (
        '67',
        15,
        '$75,000 but less than $100,000',
        7,
        'option'
    ),
    (
        '68',
        15,
        '$100,000 but less than 150,000',
        8,
        'option'
    ),
    (
        '69',
        15,
        '$150,000 but less than $200,000',
        9,
        'option'
    ),
    (
        '70',
        15,
        '$200,000 or more',
        10,
        'option'
    ),
    (
        '71',
        15,
        'Don’t know/Prefer not to answer',
        11,
        'option'
    ),
        (
        '72',
        16,
        'Maui-Hana',
        1,
        'option'
    ),
    (
        '73',
        16,
        'Maui-Kahikinui (DHHL)',
        2,
        'option'
    ),
    (
        '74',
        16,
        'Maui-Keokea-Waiohuli (DHHL)',
        3,
        'option'
    ),
    (
        '75',
        16,
        'Maui-Lanai',
        4,
        'option'
    ),
    (
        '76',
        16,
        'Maui-Lanai  (DHHL)',
        5,
        'option'
    ),
    (
        '77',
        16,
        'Maui-Molokai (DHHL)',
        6,
        'option'
    ),
    (
        '78',
        16,
        'Maui-Paukūkalo-Wai''ehu Koa (DHHL)',
        7,
        'option'
    ),
    (
        '79',
        16,
        'Maui-Wailuku',
        8,
        'option'
    ),
    (
        '80',
        16,
        'Honolulu-Koolau Poko',
        9,
        'option'
    ),
    (
        '81',
        16,
        'Honolulu-Primary Urban Center',
        10,
        'option'
    ),
    (
        '82',
        16,
        'Honolulu-East Honolulu',
        11,
        'option'
    ),
    (
        '83',
        16,
        'Honolulu-Central Oahu',
        12,
        'option'
    ),
    (
        '84',
        16,
        'Honolulu-Ko''olau Loa',
        13,
        'option'
    ),
    (
        '85',
        16,
        'Honolulu-Papakolea (DHHL)',
        14,
        'option'
    ),
    (
        '86',
        16,
        'Honolulu-Waimanalo (DHHL)',
        15,
        'option'
    ),
    (
        '87',
        16,
        'Honolulu-Waianae Lualualei (DHHL)',
        16,
        'option'
    ),
    (
        '88',
        16,
        'Honolulu-Waianae',
        17,
        'option'
    ),
    (
        '89',
        16,
        'Honolulu-Nanakuli (DHHL)',
        18,
        'option'
    ),
    (
        '90',
        16,
        'Honolulu-Kapolei (DHLL)',
        19,
        'option'
    ),
    (
        '91',
        16,
        'Honolulu-Ewa',
        20,
        'option'
    ),
    (
        '92',
        16,
        'Hawaii-Puna',
        21,
        'option'
    ),
    (
        '93',
        16,
        'Honolulu-North Shore',
        22,
        'option'
    ),
    (
        '94',
        16,
        'Kauai-Anahola (DHHL)',
        23,
        'option'
    ),
    (
        '95',
        16,
        'Kauai-Wailua (DHHL)',
        24,
        'option'
    ),
    (
        '96',
        16,
        'Kauai-West Kauai (DHHL)',
        25,
        'option'
    ),
    (
        '97',
        16,
        'Kauai-Lihue',
        26,
        'option'
    ),
    (
        '98',
        16,
        'Kauai-Lihue Town Center',
        27,
        'option'
    ),
    (
        '99',
        16,
        'Kauai-South Kauai',
        28,
        'option'
    ),
    (
        '100',
        16,
        'Maui-Kahoolawe',
        29,
        'option'
    ),
    (
        '101',
        16,
        'Maui-Kihei',
        30,
        'option'
    ),
    (
        '102',
        16,
        'Maui-Leialii Honokowai  (DHHL)',
        31,
        'option'
    ),
    (
        '103',
        16,
        'Hawaii-Kau (DHHL)',
        32,
        'option'
    ),
    (
        '104',
        16,
        'Hawaii-Kaumana Piihonua (DHHL)',
        33,
        'option'
    ),
    (
        '105',
        16,
        'Hawaii-Kawaihae (DHHL)',
        34,
        'option'
    ),
    (
        '106',
        16,
        'Hawaii-Kealakehe La''i ''Opua (DHHL)',
        35,
        'option'
    ),
    (
        '107',
        16,
        'Hawaii-Keaukaha (DHHL)',
        36,
        'option'
    ),
    (
        '108',
        16,
        'Hawaii-Makuu (DHHL)',
        37,
        'option'
    ),
    (
        '109',
        16,
        'Hawaii-Panaewa (DHHL)',
        38,
        'option'
    ),
    (
        '110',
        16,
        'Hawaii-Waimea (DHHL)',
        39,
        'option'
    ),
    (
        '111',
        16,
        'Hawaii-Hamakua',
        40,
        'option'
    ),
    (
        '112',
        16,
        'Hawaii-Kona',
        41,
        'option'
    ),
    (
        '113',
        16,
        'Hawaii-North Kahala',
        42,
        'option'
    ),
    (
        '114',
        16,
        'Hawaii-South Kahala',
        43,
        'option'
    ),
    (
        '115',
        16,
        'Maui-Makawao',
        44,
        'option'
    ),
    (
        '116',
        16,
        'Maui-Paia',
        45,
        'option'
    ),
    (
        '117',
        16,
        'Maui-West Maui',
        46,
        'option'
    ),
    (
        '118',
        16,
        'Maui-Molokai',
        47,
        'option'
    );

COMMIT TRAN;

END TRY
BEGIN CATCH

IF @@TRANCOUNT > 0
BEGIN
    ROLLBACK TRAN;
END;
THROW

END CATCH
