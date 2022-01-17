
namespace TdApi {
    type td_double = number;
    type td_string = string;
    type td_int32 = number;
    type td_int53 = number;
    type td_int64 = string;
    type td_bytes = string;

    type td_Bool = boolean;

    type td_vector<t> = t[];

    
    type td_blob= Blob;
    type td_jsLogLevel= 'error' | 'warning' | 'info' | 'log' | 'debug';

    
    /** An object of this type can be returned on every function call, in case of an error */
    export interface td_error {
        '@type': 'error';
        /** Error code; subject to future changes. If the error code is 406, the error message must not be processed in any way and must not be displayed to the user */
        code: td_int32;
        /** Error message; subject to future changes */
        message: td_string;
    }
    
    
    /** An object of this type is returned on a successful function call for certain functions */
    export interface td_ok {
        '@type': 'ok';
    }
    
    
    /** Contains parameters for TDLib initialization */
    export interface td_tdlibParameters {
        '@type': 'tdlibParameters';
        /** If set to true, the Telegram test environment will be used instead of the production environment */
        use_test_dc: td_Bool;
        /** The path to the directory for the persistent database; if empty, the current working directory will be used */
        database_directory: td_string;
        /** The path to the directory for storing files; if empty, database_directory will be used */
        files_directory: td_string;
        /** If set to true, information about downloaded and uploaded files will be saved between application restarts */
        use_file_database: td_Bool;
        /** If set to true, the library will maintain a cache of users, basic groups, supergroups, channels and secret chats. Implies use_file_database */
        use_chat_info_database: td_Bool;
        /** If set to true, the library will maintain a cache of chats and messages. Implies use_chat_info_database */
        use_message_database: td_Bool;
        /** If set to true, support for secret chats will be enabled */
        use_secret_chats: td_Bool;
        /** Application identifier for Telegram API access, which can be obtained at https://my.telegram.org */
        api_id: td_int32;
        /** Application identifier hash for Telegram API access, which can be obtained at https://my.telegram.org */
        api_hash: td_string;
        /** IETF language tag of the user's operating system language; must be non-empty */
        system_language_code: td_string;
        /** Model of the device the application is being run on; must be non-empty */
        device_model: td_string;
        /** Version of the operating system the application is being run on. If empty, the version is automatically detected by TDLib */
        system_version: td_string;
        /** Application version; must be non-empty */
        application_version: td_string;
        /** If set to true, old files will automatically be deleted */
        enable_storage_optimizer: td_Bool;
        /** If set to true, original file names will be ignored. Otherwise, downloaded files will be saved under names as close as possible to the original name */
        ignore_file_names: td_Bool;
    }
    
    
    /** An authentication code is delivered via a private Telegram message, which can be viewed from another active session */
    export interface td_authenticationCodeTypeTelegramMessage {
        '@type': 'authenticationCodeTypeTelegramMessage';
        /** Length of the code */
        length: td_int32;
    }
    
    
    /** An authentication code is delivered via an SMS message to the specified phone number */
    export interface td_authenticationCodeTypeSms {
        '@type': 'authenticationCodeTypeSms';
        /** Length of the code */
        length: td_int32;
    }
    
    
    /** An authentication code is delivered via a phone call to the specified phone number */
    export interface td_authenticationCodeTypeCall {
        '@type': 'authenticationCodeTypeCall';
        /** Length of the code */
        length: td_int32;
    }
    
    
    /** An authentication code is delivered by an immediately canceled call to the specified phone number. The phone number that calls is the code that must be entered automatically */
    export interface td_authenticationCodeTypeFlashCall {
        '@type': 'authenticationCodeTypeFlashCall';
        /** Pattern of the phone number from which the call will be made */
        pattern: td_string;
    }
    
    
    /** An authentication code is delivered by an immediately canceled call to the specified phone number. The last digits of the phone number that calls are the code that must be entered manually by the user */
    export interface td_authenticationCodeTypeMissedCall {
        '@type': 'authenticationCodeTypeMissedCall';
        /** Prefix of the phone number from which the call will be made */
        phone_number_prefix: td_string;
        /** Number of digits in the code, excluding the prefix */
        length: td_int32;
    }
    
    
    /** Information about the authentication code that was sent */
    export interface td_authenticationCodeInfo {
        '@type': 'authenticationCodeInfo';
        /** A phone number that is being authenticated */
        phone_number: td_string;
        /** The way the code was sent to the user */
        type: td_AuthenticationCodeType;
        /** The way the next code will be sent to the user; may be null */
        next_type?: td_AuthenticationCodeType;
        /** Timeout before the code can be re-sent, in seconds */
        timeout: td_int32;
    }
    
    
    /** Information about the email address authentication code that was sent */
    export interface td_emailAddressAuthenticationCodeInfo {
        '@type': 'emailAddressAuthenticationCodeInfo';
        /** Pattern of the email address to which an authentication code was sent */
        email_address_pattern: td_string;
        /** Length of the code; 0 if unknown */
        length: td_int32;
    }
    
    
    /** Represents a part of the text that needs to be formatted in some unusual way */
    export interface td_textEntity {
        '@type': 'textEntity';
        /** Offset of the entity, in UTF-16 code units */
        offset: td_int32;
        /** Length of the entity, in UTF-16 code units */
        length: td_int32;
        /** Type of the entity */
        type: td_TextEntityType;
    }
    
    
    /** Contains a list of text entities */
    export interface td_textEntities {
        '@type': 'textEntities';
        /** List of text entities */
        entities: td_vector<td_textEntity>;
    }
    
    
    /** A text with some entities */
    export interface td_formattedText {
        '@type': 'formattedText';
        /** The text */
        text: td_string;
        /** Entities contained in the text. Entities can be nested, but must not mutually intersect with each other. -Pre, Code and PreCode entities can't contain other entities. Bold, Italic, Underline, Strikethrough, and Spoiler entities can contain and to be contained in all other entities. All other entities can't contain each other */
        entities: td_vector<td_textEntity>;
    }
    
    
    /** Contains Telegram terms of service */
    export interface td_termsOfService {
        '@type': 'termsOfService';
        /** Text of the terms of service */
        text: td_formattedText;
        /** The minimum age of a user to be able to accept the terms; 0 if any */
        min_user_age: td_int32;
        /** True, if a blocking popup with terms of service must be shown to the user */
        show_popup: td_Bool;
    }
    
    
    /** TDLib needs TdlibParameters for initialization */
    export interface td_authorizationStateWaitTdlibParameters {
        '@type': 'authorizationStateWaitTdlibParameters';
    }
    
    
    /** TDLib needs an encryption key to decrypt the local database */
    export interface td_authorizationStateWaitEncryptionKey {
        '@type': 'authorizationStateWaitEncryptionKey';
        /** True, if the database is currently encrypted */
        is_encrypted: td_Bool;
    }
    
    
    /** TDLib needs the user's phone number to authorize. Call `setAuthenticationPhoneNumber` to provide the phone number, or use `requestQrCodeAuthentication`, or `checkAuthenticationBotToken` for other authentication options */
    export interface td_authorizationStateWaitPhoneNumber {
        '@type': 'authorizationStateWaitPhoneNumber';
    }
    
    
    /** TDLib needs the user's authentication code to authorize */
    export interface td_authorizationStateWaitCode {
        '@type': 'authorizationStateWaitCode';
        /** Information about the authorization code that was sent */
        code_info: td_authenticationCodeInfo;
    }
    
    
    /** The user needs to confirm authorization on another logged in device by scanning a QR code with the provided link */
    export interface td_authorizationStateWaitOtherDeviceConfirmation {
        '@type': 'authorizationStateWaitOtherDeviceConfirmation';
        /** A tg:// URL for the QR code. The link will be updated frequently */
        link: td_string;
    }
    
    
    /** The user is unregistered and need to accept terms of service and enter their first name and last name to finish registration */
    export interface td_authorizationStateWaitRegistration {
        '@type': 'authorizationStateWaitRegistration';
        /** Telegram terms of service */
        terms_of_service: td_termsOfService;
    }
    
    
    /** The user has been authorized, but needs to enter a password to start using the application */
    export interface td_authorizationStateWaitPassword {
        '@type': 'authorizationStateWaitPassword';
        /** Hint for the password; may be empty */
        password_hint: td_string;
        /** True, if a recovery email address has been set up */
        has_recovery_email_address: td_Bool;
        /** Pattern of the email address to which the recovery email was sent; empty until a recovery email has been sent */
        recovery_email_address_pattern: td_string;
    }
    
    
    /** The user has been successfully authorized. TDLib is now ready to answer queries */
    export interface td_authorizationStateReady {
        '@type': 'authorizationStateReady';
    }
    
    
    /** The user is currently logging out */
    export interface td_authorizationStateLoggingOut {
        '@type': 'authorizationStateLoggingOut';
    }
    
    
    /** TDLib is closing, all subsequent queries will be answered with the error 500. Note that closing TDLib can take a while. All resources will be freed only after authorizationStateClosed has been received */
    export interface td_authorizationStateClosing {
        '@type': 'authorizationStateClosing';
    }
    
    
    /** TDLib client is in its final state. All databases are closed and all resources are released. No other updates will be received after this. All queries will be responded to -with error code 500. To continue working, one must create a new instance of the TDLib client */
    export interface td_authorizationStateClosed {
        '@type': 'authorizationStateClosed';
    }
    
    
    /** Represents the current state of 2-step verification */
    export interface td_passwordState {
        '@type': 'passwordState';
        /** True, if a 2-step verification password is set */
        has_password: td_Bool;
        /** Hint for the password; may be empty */
        password_hint: td_string;
        /** True, if a recovery email is set */
        has_recovery_email_address: td_Bool;
        /** True, if some Telegram Passport elements were saved */
        has_passport_data: td_Bool;
        /** Information about the recovery email address to which the confirmation email was sent; may be null */
        recovery_email_address_code_info?: td_emailAddressAuthenticationCodeInfo;
        /** If not 0, point in time (Unix timestamp) after which the password can be reset immediately using resetPassword */
        pending_reset_date: td_int32;
    }
    
    
    /** Contains information about the current recovery email address */
    export interface td_recoveryEmailAddress {
        '@type': 'recoveryEmailAddress';
        /** Recovery email address */
        recovery_email_address: td_string;
    }
    
    
    /** Returns information about the availability of a temporary password, which can be used for payments */
    export interface td_temporaryPasswordState {
        '@type': 'temporaryPasswordState';
        /** True, if a temporary password is available */
        has_password: td_Bool;
        /** Time left before the temporary password expires, in seconds */
        valid_for: td_int32;
    }
    
    
    /** Represents a local file */
    export interface td_localFile {
        '@type': 'localFile';
        /** Local path to the locally available file part; may be empty */
        path: td_string;
        /** True, if it is possible to download or generate the file */
        can_be_downloaded: td_Bool;
        /** True, if the file can be deleted */
        can_be_deleted: td_Bool;
        /** True, if the file is currently being downloaded (or a local copy is being generated by some other means) */
        is_downloading_active: td_Bool;
        /** True, if the local copy is fully available */
        is_downloading_completed: td_Bool;
        /** Download will be started from this offset. downloaded_prefix_size is calculated from this offset */
        download_offset: td_int32;
        /** If is_downloading_completed is false, then only some prefix of the file starting from download_offset is ready to be read. downloaded_prefix_size is the size of that prefix in bytes */
        downloaded_prefix_size: td_int32;
        /** Total downloaded file size, in bytes. Can be used only for calculating download progress. The actual file size may be bigger, and some parts of it may contain garbage */
        downloaded_size: td_int32;
    }
    
    
    /** Represents a remote file */
    export interface td_remoteFile {
        '@type': 'remoteFile';
        /** Remote file identifier; may be empty. Can be used by the current user across application restarts or even from other devices. Uniquely identifies a file, but a file can have a lot of different valid identifiers. -If the ID starts with "http://" or "https://", it represents the HTTP URL of the file. TDLib is currently unable to download files if only their URL is known. -If downloadFile is called on such a file or if it is sent to a secret chat, TDLib starts a file generation process by sending updateFileGenerationStart to the application with the HTTP URL in the original_path and "#url#" as the conversion string. Application must generate the file by downloading it to the specified location */
        id: td_string;
        /** Unique file identifier; may be empty if unknown. The unique file identifier which is the same for the same file even for different users and is persistent over time */
        unique_id: td_string;
        /** True, if the file is currently being uploaded (or a remote copy is being generated by some other means) */
        is_uploading_active: td_Bool;
        /** True, if a remote copy is fully available */
        is_uploading_completed: td_Bool;
        /** Size of the remote available part of the file, in bytes; 0 if unknown */
        uploaded_size: td_int32;
    }
    
    
    /** Represents a file */
    export interface td_file {
        '@type': 'file';
        /** Unique file identifier */
        id: td_int32;
        /** File size, in bytes; 0 if unknown */
        size: td_int32;
        /** Approximate file size in bytes in case the exact file size is unknown. Can be used to show download/upload progress */
        expected_size: td_int32;
        /** Information about the local copy of the file */
        local: td_localFile;
        /** Information about the remote copy of the file */
        remote: td_remoteFile;
    }
    
    
    /** A file defined by its unique ID */
    export interface td_inputFileId {
        '@type': 'inputFileId';
        /** Unique file identifier */
        id: td_int32;
    }
    
    
    /** A file defined by its remote ID. The remote ID is guaranteed to be usable only if the corresponding file is still accessible to the user and known to TDLib. -For example, if the file is from a message, then the message must be not deleted and accessible to the user. If the file database is disabled, then the corresponding object with the file must be preloaded by the application */
    export interface td_inputFileRemote {
        '@type': 'inputFileRemote';
        /** Remote file identifier */
        id: td_string;
    }
    
    
    /** A file defined by a local path */
    export interface td_inputFileLocal {
        '@type': 'inputFileLocal';
        /** Local path to the file */
        path: td_string;
    }
    
    
    /** A file generated by the application */
    export interface td_inputFileGenerated {
        '@type': 'inputFileGenerated';
        /** Local path to a file from which the file is generated; may be empty if there is no such file */
        original_path: td_string;
        /** String specifying the conversion applied to the original file; must be persistent across application restarts. Conversions beginning with '#' are reserved for internal TDLib usage */
        conversion: td_string;
        /** Expected size of the generated file, in bytes; 0 if unknown */
        expected_size: td_int32;
    }
    
    
    /** Describes an image in JPEG format */
    export interface td_photoSize {
        '@type': 'photoSize';
        /** Image type (see https://core.telegram.org/constructor/photoSize) */
        type: td_string;
        /** Information about the image file */
        photo: td_file;
        /** Image width */
        width: td_int32;
        /** Image height */
        height: td_int32;
        /** Sizes of progressive JPEG file prefixes, which can be used to preliminarily show the image; in bytes */
        progressive_sizes: td_vector<td_int32>;
    }
    
    
    /** Thumbnail image of a very poor quality and low resolution */
    export interface td_minithumbnail {
        '@type': 'minithumbnail';
        /** Thumbnail width, usually doesn't exceed 40 */
        width: td_int32;
        /** Thumbnail height, usually doesn't exceed 40 */
        height: td_int32;
        /** The thumbnail in JPEG format */
        data: td_bytes;
    }
    
    
    /** The thumbnail is in JPEG format */
    export interface td_thumbnailFormatJpeg {
        '@type': 'thumbnailFormatJpeg';
    }
    
    
    /** The thumbnail is in PNG format. It will be used only for background patterns */
    export interface td_thumbnailFormatPng {
        '@type': 'thumbnailFormatPng';
    }
    
    
    /** The thumbnail is in WEBP format. It will be used only for some stickers */
    export interface td_thumbnailFormatWebp {
        '@type': 'thumbnailFormatWebp';
    }
    
    
    /** The thumbnail is in static GIF format. It will be used only for some bot inline results */
    export interface td_thumbnailFormatGif {
        '@type': 'thumbnailFormatGif';
    }
    
    
    /** The thumbnail is in TGS format. It will be used only for animated sticker sets */
    export interface td_thumbnailFormatTgs {
        '@type': 'thumbnailFormatTgs';
    }
    
    
    /** The thumbnail is in MPEG4 format. It will be used only for some animations and videos */
    export interface td_thumbnailFormatMpeg4 {
        '@type': 'thumbnailFormatMpeg4';
    }
    
    
    /** Represents a thumbnail */
    export interface td_thumbnail {
        '@type': 'thumbnail';
        /** Thumbnail format */
        format: td_ThumbnailFormat;
        /** Thumbnail width */
        width: td_int32;
        /** Thumbnail height */
        height: td_int32;
        /** The thumbnail */
        file: td_file;
    }
    
    
    /** The mask is placed relatively to the forehead */
    export interface td_maskPointForehead {
        '@type': 'maskPointForehead';
    }
    
    
    /** The mask is placed relatively to the eyes */
    export interface td_maskPointEyes {
        '@type': 'maskPointEyes';
    }
    
    
    /** The mask is placed relatively to the mouth */
    export interface td_maskPointMouth {
        '@type': 'maskPointMouth';
    }
    
    
    /** The mask is placed relatively to the chin */
    export interface td_maskPointChin {
        '@type': 'maskPointChin';
    }
    
    
    /** Position on a photo where a mask is placed */
    export interface td_maskPosition {
        '@type': 'maskPosition';
        /** Part of the face, relative to which the mask is placed */
        point: td_MaskPoint;
        /** Shift by X-axis measured in widths of the mask scaled to the face size, from left to right. (For example, -1.0 will place the mask just to the left of the default mask position) */
        x_shift: td_double;
        /** Shift by Y-axis measured in heights of the mask scaled to the face size, from top to bottom. (For example, 1.0 will place the mask just below the default mask position) */
        y_shift: td_double;
        /** Mask scaling coefficient. (For example, 2.0 means a doubled size) */
        scale: td_double;
    }
    
    
    /** Represents a closed vector path. The path begins at the end point of the last command */
    export interface td_closedVectorPath {
        '@type': 'closedVectorPath';
        /** List of vector path commands */
        commands: td_vector<td_VectorPathCommand>;
    }
    
    
    /** Describes one answer option of a poll */
    export interface td_pollOption {
        '@type': 'pollOption';
        /** Option text; 1-100 characters */
        text: td_string;
        /** Number of voters for this option, available only for closed or voted polls */
        voter_count: td_int32;
        /** The percentage of votes for this option; 0-100 */
        vote_percentage: td_int32;
        /** True, if the option was chosen by the user */
        is_chosen: td_Bool;
        /** True, if the option is being chosen by a pending setPollAnswer request */
        is_being_chosen: td_Bool;
    }
    
    
    /** A regular poll */
    export interface td_pollTypeRegular {
        '@type': 'pollTypeRegular';
        /** True, if multiple answer options can be chosen simultaneously */
        allow_multiple_answers: td_Bool;
    }
    
    
    /** A poll in quiz mode, which has exactly one correct answer option and can be answered only once */
    export interface td_pollTypeQuiz {
        '@type': 'pollTypeQuiz';
        /** 0-based identifier of the correct answer option; -1 for a yet unanswered poll */
        correct_option_id: td_int32;
        /** Text that is shown when the user chooses an incorrect answer or taps on the lamp icon; 0-200 characters with at most 2 line feeds; empty for a yet unanswered poll */
        explanation: td_formattedText;
    }
    
    
    /** Describes an animation file. The animation must be encoded in GIF or MPEG4 format */
    export interface td_animation {
        '@type': 'animation';
        /** Duration of the animation, in seconds; as defined by the sender */
        duration: td_int32;
        /** Width of the animation */
        width: td_int32;
        /** Height of the animation */
        height: td_int32;
        /** Original name of the file; as defined by the sender */
        file_name: td_string;
        /** MIME type of the file, usually "image/gif" or "video/mp4" */
        mime_type: td_string;
        /** True, if stickers were added to the animation. The list of corresponding sticker set can be received using getAttachedStickerSets */
        has_stickers: td_Bool;
        /** Animation minithumbnail; may be null */
        minithumbnail?: td_minithumbnail;
        /** Animation thumbnail in JPEG or MPEG4 format; may be null */
        thumbnail?: td_thumbnail;
        /** File containing the animation */
        animation: td_file;
    }
    
    
    /** Describes an audio file. Audio is usually in MP3 or M4A format */
    export interface td_audio {
        '@type': 'audio';
        /** Duration of the audio, in seconds; as defined by the sender */
        duration: td_int32;
        /** Title of the audio; as defined by the sender */
        title: td_string;
        /** Performer of the audio; as defined by the sender */
        performer: td_string;
        /** Original name of the file; as defined by the sender */
        file_name: td_string;
        /** The MIME type of the file; as defined by the sender */
        mime_type: td_string;
        /** The minithumbnail of the album cover; may be null */
        album_cover_minithumbnail?: td_minithumbnail;
        /** The thumbnail of the album cover in JPEG format; as defined by the sender. The full size thumbnail is supposed to be extracted from the downloaded file; may be null */
        album_cover_thumbnail?: td_thumbnail;
        /** File containing the audio */
        audio: td_file;
    }
    
    
    /** Describes a document of any type */
    export interface td_document {
        '@type': 'document';
        /** Original name of the file; as defined by the sender */
        file_name: td_string;
        /** MIME type of the file; as defined by the sender */
        mime_type: td_string;
        /** Document minithumbnail; may be null */
        minithumbnail?: td_minithumbnail;
        /** Document thumbnail in JPEG or PNG format (PNG will be used only for background patterns); as defined by the sender; may be null */
        thumbnail?: td_thumbnail;
        /** File containing the document */
        document: td_file;
    }
    
    
    /** Describes a photo */
    export interface td_photo {
        '@type': 'photo';
        /** True, if stickers were added to the photo. The list of corresponding sticker sets can be received using getAttachedStickerSets */
        has_stickers: td_Bool;
        /** Photo minithumbnail; may be null */
        minithumbnail?: td_minithumbnail;
        /** Available variants of the photo, in different sizes */
        sizes: td_vector<td_photoSize>;
    }
    
    
    /** Describes a sticker */
    export interface td_sticker {
        '@type': 'sticker';
        /** The identifier of the sticker set to which the sticker belongs; 0 if none */
        set_id: td_int64;
        /** Sticker width; as defined by the sender */
        width: td_int32;
        /** Sticker height; as defined by the sender */
        height: td_int32;
        /** Emoji corresponding to the sticker */
        emoji: td_string;
        /** True, if the sticker is an animated sticker in TGS format */
        is_animated: td_Bool;
        /** True, if the sticker is a mask */
        is_mask: td_Bool;
        /** Position where the mask is placed; may be null */
        mask_position?: td_maskPosition;
        /** Sticker's outline represented as a list of closed vector paths; may be empty. The coordinate system origin is in the upper-left corner */
        outline: td_vector<td_closedVectorPath>;
        /** Sticker thumbnail in WEBP or JPEG format; may be null */
        thumbnail?: td_thumbnail;
        /** File containing the sticker */
        sticker: td_file;
    }
    
    
    /** Describes a video file */
    export interface td_video {
        '@type': 'video';
        /** Duration of the video, in seconds; as defined by the sender */
        duration: td_int32;
        /** Video width; as defined by the sender */
        width: td_int32;
        /** Video height; as defined by the sender */
        height: td_int32;
        /** Original name of the file; as defined by the sender */
        file_name: td_string;
        /** MIME type of the file; as defined by the sender */
        mime_type: td_string;
        /** True, if stickers were added to the video. The list of corresponding sticker sets can be received using getAttachedStickerSets */
        has_stickers: td_Bool;
        /** True, if the video is supposed to be streamed */
        supports_streaming: td_Bool;
        /** Video minithumbnail; may be null */
        minithumbnail?: td_minithumbnail;
        /** Video thumbnail in JPEG or MPEG4 format; as defined by the sender; may be null */
        thumbnail?: td_thumbnail;
        /** File containing the video */
        video: td_file;
    }
    
    
    /** Describes a video note. The video must be equal in width and height, cropped to a circle, and stored in MPEG4 format */
    export interface td_videoNote {
        '@type': 'videoNote';
        /** Duration of the video, in seconds; as defined by the sender */
        duration: td_int32;
        /** Video width and height; as defined by the sender */
        length: td_int32;
        /** Video minithumbnail; may be null */
        minithumbnail?: td_minithumbnail;
        /** Video thumbnail in JPEG format; as defined by the sender; may be null */
        thumbnail?: td_thumbnail;
        /** File containing the video */
        video: td_file;
    }
    
    
    /** Describes a voice note. The voice note must be encoded with the Opus codec, and stored inside an OGG container. Voice notes can have only a single audio channel */
    export interface td_voiceNote {
        '@type': 'voiceNote';
        /** Duration of the voice note, in seconds; as defined by the sender */
        duration: td_int32;
        /** A waveform representation of the voice note in 5-bit format */
        waveform: td_bytes;
        /** MIME type of the file; as defined by the sender */
        mime_type: td_string;
        /** File containing the voice note */
        voice: td_file;
    }
    
    
    /** Describes an animated representation of an emoji */
    export interface td_animatedEmoji {
        '@type': 'animatedEmoji';
        /** Animated sticker for the emoji */
        sticker: td_sticker;
        /** Emoji modifier fitzpatrick type; 0-6; 0 if none */
        fitzpatrick_type: td_int32;
        /** File containing the sound to be played when the animated emoji is clicked if any; may be null. The sound is encoded with the Opus codec, and stored inside an OGG container */
        sound?: td_file;
    }
    
    
    /** Describes a user contact */
    export interface td_contact {
        '@type': 'contact';
        /** Phone number of the user */
        phone_number: td_string;
        /** First name of the user; 1-255 characters in length */
        first_name: td_string;
        /** Last name of the user */
        last_name: td_string;
        /** Additional data about the user in a form of vCard; 0-2048 bytes in length */
        vcard: td_string;
        /** Identifier of the user, if known; otherwise 0 */
        user_id: td_int53;
    }
    
    
    /** Describes a location on planet Earth */
    export interface td_location {
        '@type': 'location';
        /** Latitude of the location in degrees; as defined by the sender */
        latitude: td_double;
        /** Longitude of the location, in degrees; as defined by the sender */
        longitude: td_double;
        /** The estimated horizontal accuracy of the location, in meters; as defined by the sender. 0 if unknown */
        horizontal_accuracy: td_double;
    }
    
    
    /** Describes a venue */
    export interface td_venue {
        '@type': 'venue';
        /** Venue location; as defined by the sender */
        location: td_location;
        /** Venue name; as defined by the sender */
        title: td_string;
        /** Venue address; as defined by the sender */
        address: td_string;
        /** Provider of the venue database; as defined by the sender. Currently, only "foursquare" and "gplaces" (Google Places) need to be supported */
        provider: td_string;
        /** Identifier of the venue in the provider database; as defined by the sender */
        id: td_string;
        /** Type of the venue in the provider database; as defined by the sender */
        type: td_string;
    }
    
    
    /** Describes a game */
    export interface td_game {
        '@type': 'game';
        /** Game ID */
        id: td_int64;
        /** Game short name. To share a game use the URL https://t.me/{bot_username}?game={game_short_name} */
        short_name: td_string;
        /** Game title */
        title: td_string;
        /** Game text, usually containing scoreboards for a game */
        text: td_formattedText;
        /** Describes a game */
        description: td_string;
        /** Game photo */
        photo: td_photo;
        /** Game animation; may be null */
        animation?: td_animation;
    }
    
    
    /** Describes a poll */
    export interface td_poll {
        '@type': 'poll';
        /** Unique poll identifier */
        id: td_int64;
        /** Poll question; 1-300 characters */
        question: td_string;
        /** List of poll answer options */
        options: td_vector<td_pollOption>;
        /** Total number of voters, participating in the poll */
        total_voter_count: td_int32;
        /** User identifiers of recent voters, if the poll is non-anonymous */
        recent_voter_user_ids: td_vector<td_int53>;
        /** True, if the poll is anonymous */
        is_anonymous: td_Bool;
        /** Type of the poll */
        type: td_PollType;
        /** Amount of time the poll will be active after creation, in seconds */
        open_period: td_int32;
        /** Point in time (Unix timestamp) when the poll will automatically be closed */
        close_date: td_int32;
        /** True, if the poll is closed */
        is_closed: td_Bool;
    }
    
    
    /** Describes a user profile photo */
    export interface td_profilePhoto {
        '@type': 'profilePhoto';
        /** Photo identifier; 0 for an empty photo. Can be used to find a photo in a list of user profile photos */
        id: td_int64;
        /** A small (160x160) user profile photo. The file can be downloaded only before the photo is changed */
        small: td_file;
        /** A big (640x640) user profile photo. The file can be downloaded only before the photo is changed */
        big: td_file;
        /** User profile photo minithumbnail; may be null */
        minithumbnail?: td_minithumbnail;
        /** True, if the photo has animated variant */
        has_animation: td_Bool;
    }
    
    
    /** Contains basic information about the photo of a chat */
    export interface td_chatPhotoInfo {
        '@type': 'chatPhotoInfo';
        /** A small (160x160) chat photo variant in JPEG format. The file can be downloaded only before the photo is changed */
        small: td_file;
        /** A big (640x640) chat photo variant in JPEG format. The file can be downloaded only before the photo is changed */
        big: td_file;
        /** Chat photo minithumbnail; may be null */
        minithumbnail?: td_minithumbnail;
        /** True, if the photo has animated variant */
        has_animation: td_Bool;
    }
    
    
    /** A regular user */
    export interface td_userTypeRegular {
        '@type': 'userTypeRegular';
    }
    
    
    /** A deleted user or deleted bot. No information on the user besides the user identifier is available. It is not possible to perform any active actions on this type of user */
    export interface td_userTypeDeleted {
        '@type': 'userTypeDeleted';
    }
    
    
    /** A bot (see https://core.telegram.org/bots) */
    export interface td_userTypeBot {
        '@type': 'userTypeBot';
        /** True, if the bot can be invited to basic group and supergroup chats */
        can_join_groups: td_Bool;
        /** True, if the bot can read all messages in basic group or supergroup chats and not just those addressed to the bot. In private and channel chats a bot can always read all messages */
        can_read_all_group_messages: td_Bool;
        /** True, if the bot supports inline queries */
        is_inline: td_Bool;
        /** Placeholder for inline queries (displayed on the application input field) */
        inline_query_placeholder: td_string;
        /** True, if the location of the user is expected to be sent with every inline query to this bot */
        need_location: td_Bool;
    }
    
    
    /** No information on the user besides the user identifier is available, yet this user has not been deleted. This object is extremely rare and must be handled like a deleted user. It is not possible to perform any actions on users of this type */
    export interface td_userTypeUnknown {
        '@type': 'userTypeUnknown';
    }
    
    
    /** Represents a command supported by a bot */
    export interface td_botCommand {
        '@type': 'botCommand';
        /** Text of the bot command */
        command: td_string;
        /** Represents a command supported by a bot */
        description: td_string;
    }
    
    
    /** Contains a list of bot commands */
    export interface td_botCommands {
        '@type': 'botCommands';
        /** Bot's user identifier */
        bot_user_id: td_int53;
        /** List of bot commands */
        commands: td_vector<td_botCommand>;
    }
    
    
    /** Represents a location to which a chat is connected */
    export interface td_chatLocation {
        '@type': 'chatLocation';
        /** The location */
        location: td_location;
        /** Location address; 1-64 characters, as defined by the chat owner */
        address: td_string;
    }
    
    
    /** Animated variant of a chat photo in MPEG4 format */
    export interface td_animatedChatPhoto {
        '@type': 'animatedChatPhoto';
        /** Animation width and height */
        length: td_int32;
        /** Information about the animation file */
        file: td_file;
        /** Timestamp of the frame, used as a static chat photo */
        main_frame_timestamp: td_double;
    }
    
    
    /** Describes a chat or user profile photo */
    export interface td_chatPhoto {
        '@type': 'chatPhoto';
        /** Unique photo identifier */
        id: td_int64;
        /** Point in time (Unix timestamp) when the photo has been added */
        added_date: td_int32;
        /** Photo minithumbnail; may be null */
        minithumbnail?: td_minithumbnail;
        /** Available variants of the photo in JPEG format, in different size */
        sizes: td_vector<td_photoSize>;
        /** Animated variant of the photo in MPEG4 format; may be null */
        animation?: td_animatedChatPhoto;
    }
    
    
    /** Contains a list of chat or user profile photos */
    export interface td_chatPhotos {
        '@type': 'chatPhotos';
        /** Total number of photos */
        total_count: td_int32;
        /** List of photos */
        photos: td_vector<td_chatPhoto>;
    }
    
    
    /** A previously used profile photo of the current user */
    export interface td_inputChatPhotoPrevious {
        '@type': 'inputChatPhotoPrevious';
        /** Identifier of the current user's profile photo to reuse */
        chat_photo_id: td_int64;
    }
    
    
    /** A static photo in JPEG format */
    export interface td_inputChatPhotoStatic {
        '@type': 'inputChatPhotoStatic';
        /** Photo to be set as profile photo. Only inputFileLocal and inputFileGenerated are allowed */
        photo: td_InputFile;
    }
    
    
    /** An animation in MPEG4 format; must be square, at most 10 seconds long, have width between 160 and 800 and be at most 2MB in size */
    export interface td_inputChatPhotoAnimation {
        '@type': 'inputChatPhotoAnimation';
        /** Animation to be set as profile photo. Only inputFileLocal and inputFileGenerated are allowed */
        animation: td_InputFile;
        /** Timestamp of the frame, which will be used as static chat photo */
        main_frame_timestamp: td_double;
    }
    
    
    /** Represents a user */
    export interface td_user {
        '@type': 'user';
        /** User identifier */
        id: td_int53;
        /** First name of the user */
        first_name: td_string;
        /** Last name of the user */
        last_name: td_string;
        /** Username of the user */
        username: td_string;
        /** Phone number of the user */
        phone_number: td_string;
        /** Current online status of the user */
        status: td_UserStatus;
        /** Profile photo of the user; may be null */
        profile_photo?: td_profilePhoto;
        /** The user is a contact of the current user */
        is_contact: td_Bool;
        /** The user is a contact of the current user and the current user is a contact of the user */
        is_mutual_contact: td_Bool;
        /** True, if the user is verified */
        is_verified: td_Bool;
        /** True, if the user is Telegram support account */
        is_support: td_Bool;
        /** If non-empty, it contains a human-readable description of the reason why access to this user must be restricted */
        restriction_reason: td_string;
        /** True, if many users reported this user as a scam */
        is_scam: td_Bool;
        /** True, if many users reported this user as a fake account */
        is_fake: td_Bool;
        /** If false, the user is inaccessible, and the only information known about the user is inside this class. It can't be passed to any method except GetUser */
        have_access: td_Bool;
        /** Type of the user */
        type: td_UserType;
        /** IETF language tag of the user's language; only available to bots */
        language_code: td_string;
    }
    
    
    /** Contains full information about a user */
    export interface td_userFullInfo {
        '@type': 'userFullInfo';
        /** User profile photo; may be null */
        photo?: td_chatPhoto;
        /** True, if the user is blocked by the current user */
        is_blocked: td_Bool;
        /** True, if the user can be called */
        can_be_called: td_Bool;
        /** True, if a video call can be created with the user */
        supports_video_calls: td_Bool;
        /** True, if the user can't be called due to their privacy settings */
        has_private_calls: td_Bool;
        /** True, if the user can't be linked in forwarded messages due to their privacy settings */
        has_private_forwards: td_Bool;
        /** True, if the current user needs to explicitly allow to share their phone number with the user when the method addContact is used */
        need_phone_number_privacy_exception: td_Bool;
        /** A short user bio */
        bio: td_string;
        /** For bots, the text that is shown on the bot's profile page and is sent together with the link when users share the bot */
        share_text: td_string;
        /** Contains full information about a user */
        description: td_string;
        /** Number of group chats where both the other user and the current user are a member; 0 for the current user */
        group_in_common_count: td_int32;
        /** For bots, list of the bot commands */
        commands: td_vector<td_botCommand>;
    }
    
    
    /** Represents a list of users */
    export interface td_users {
        '@type': 'users';
        /** Approximate total count of users found */
        total_count: td_int32;
        /** A list of user identifiers */
        user_ids: td_vector<td_int53>;
    }
    
    
    /** Contains information about a chat administrator */
    export interface td_chatAdministrator {
        '@type': 'chatAdministrator';
        /** User identifier of the administrator */
        user_id: td_int53;
        /** Custom title of the administrator */
        custom_title: td_string;
        /** True, if the user is the owner of the chat */
        is_owner: td_Bool;
    }
    
    
    /** Represents a list of chat administrators */
    export interface td_chatAdministrators {
        '@type': 'chatAdministrators';
        /** A list of chat administrators */
        administrators: td_vector<td_chatAdministrator>;
    }
    
    
    /** Describes actions that a user is allowed to take in a chat */
    export interface td_chatPermissions {
        '@type': 'chatPermissions';
        /** True, if the user can send text messages, contacts, locations, and venues */
        can_send_messages: td_Bool;
        /** True, if the user can send audio files, documents, photos, videos, video notes, and voice notes. Implies can_send_messages permissions */
        can_send_media_messages: td_Bool;
        /** True, if the user can send polls. Implies can_send_messages permissions */
        can_send_polls: td_Bool;
        /** True, if the user can send animations, games, stickers, and dice and use inline bots. Implies can_send_messages permissions */
        can_send_other_messages: td_Bool;
        /** True, if the user may add a web page preview to their messages. Implies can_send_messages permissions */
        can_add_web_page_previews: td_Bool;
        /** True, if the user can change the chat title, photo, and other settings */
        can_change_info: td_Bool;
        /** True, if the user can invite new users to the chat */
        can_invite_users: td_Bool;
        /** True, if the user can pin messages */
        can_pin_messages: td_Bool;
    }
    
    
    /** The user is the owner of the chat and has all the administrator privileges */
    export interface td_chatMemberStatusCreator {
        '@type': 'chatMemberStatusCreator';
        /** A custom title of the owner; 0-16 characters without emojis; applicable to supergroups only */
        custom_title: td_string;
        /** True, if the creator isn't shown in the chat member list and sends messages anonymously; applicable to supergroups only */
        is_anonymous: td_Bool;
        /** True, if the user is a member of the chat */
        is_member: td_Bool;
    }
    
    
    /** The user is a member of the chat and has some additional privileges. In basic groups, administrators can edit and delete messages sent by others, add new members, ban unprivileged members, and manage video chats. In supergroups and channels, there are more detailed options for administrator privileges */
    export interface td_chatMemberStatusAdministrator {
        '@type': 'chatMemberStatusAdministrator';
        /** A custom title of the administrator; 0-16 characters without emojis; applicable to supergroups only */
        custom_title: td_string;
        /** True, if the current user can edit the administrator privileges for the called user */
        can_be_edited: td_Bool;
        /** True, if the administrator can get chat event log, get chat statistics, get message statistics in channels, get channel members, see anonymous administrators in supergroups and ignore slow mode. Implied by any other privilege; applicable to supergroups and channels only */
        can_manage_chat: td_Bool;
        /** True, if the administrator can change the chat title, photo, and other settings */
        can_change_info: td_Bool;
        /** True, if the administrator can create channel posts; applicable to channels only */
        can_post_messages: td_Bool;
        /** True, if the administrator can edit messages of other users and pin messages; applicable to channels only */
        can_edit_messages: td_Bool;
        /** True, if the administrator can delete messages of other users */
        can_delete_messages: td_Bool;
        /** True, if the administrator can invite new users to the chat */
        can_invite_users: td_Bool;
        /** True, if the administrator can restrict, ban, or unban chat members; always true for channels */
        can_restrict_members: td_Bool;
        /** True, if the administrator can pin messages; applicable to basic groups and supergroups only */
        can_pin_messages: td_Bool;
        /** True, if the administrator can add new administrators with a subset of their own privileges or demote administrators that were directly or indirectly promoted by them */
        can_promote_members: td_Bool;
        /** True, if the administrator can manage video chats */
        can_manage_video_chats: td_Bool;
        /** True, if the administrator isn't shown in the chat member list and sends messages anonymously; applicable to supergroups only */
        is_anonymous: td_Bool;
    }
    
    
    /** The user is a member of the chat, without any additional privileges or restrictions */
    export interface td_chatMemberStatusMember {
        '@type': 'chatMemberStatusMember';
    }
    
    
    /** The user is under certain restrictions in the chat. Not supported in basic groups and channels */
    export interface td_chatMemberStatusRestricted {
        '@type': 'chatMemberStatusRestricted';
        /** True, if the user is a member of the chat */
        is_member: td_Bool;
        /** Point in time (Unix timestamp) when restrictions will be lifted from the user; 0 if never. If the user is restricted for more than 366 days or for less than 30 seconds from the current time, the user is considered to be restricted forever */
        restricted_until_date: td_int32;
        /** User permissions in the chat */
        permissions: td_chatPermissions;
    }
    
    
    /** The user or the chat is not a chat member */
    export interface td_chatMemberStatusLeft {
        '@type': 'chatMemberStatusLeft';
    }
    
    
    /** The user or the chat was banned (and hence is not a member of the chat). Implies the user can't return to the chat, view messages, or be used as a participant identifier to join a video chat of the chat */
    export interface td_chatMemberStatusBanned {
        '@type': 'chatMemberStatusBanned';
        /** Point in time (Unix timestamp) when the user will be unbanned; 0 if never. If the user is banned for more than 366 days or for less than 30 seconds from the current time, the user is considered to be banned forever. Always 0 in basic groups */
        banned_until_date: td_int32;
    }
    
    
    /** Describes a user or a chat as a member of another chat */
    export interface td_chatMember {
        '@type': 'chatMember';
        /** Identifier of the chat member. Currently, other chats can be only Left or Banned. Only supergroups and channels can have other chats as Left or Banned members and these chats must be supergroups or channels */
        member_id: td_MessageSender;
        /** Identifier of a user that invited/promoted/banned this member in the chat; 0 if unknown */
        inviter_user_id: td_int53;
        /** Point in time (Unix timestamp) when the user joined the chat */
        joined_chat_date: td_int32;
        /** Status of the member in the chat */
        status: td_ChatMemberStatus;
    }
    
    
    /** Contains a list of chat members */
    export interface td_chatMembers {
        '@type': 'chatMembers';
        /** Approximate total count of chat members found */
        total_count: td_int32;
        /** A list of chat members */
        members: td_vector<td_chatMember>;
    }
    
    
    /** Returns contacts of the user */
    export interface td_chatMembersFilterContacts {
        '@type': 'chatMembersFilterContacts';
    }
    
    
    /** Returns the owner and administrators */
    export interface td_chatMembersFilterAdministrators {
        '@type': 'chatMembersFilterAdministrators';
    }
    
    
    /** Returns all chat members, including restricted chat members */
    export interface td_chatMembersFilterMembers {
        '@type': 'chatMembersFilterMembers';
    }
    
    
    /** Returns users which can be mentioned in the chat */
    export interface td_chatMembersFilterMention {
        '@type': 'chatMembersFilterMention';
        /** If non-zero, the identifier of the current message thread */
        message_thread_id: td_int53;
    }
    
    
    /** Returns users under certain restrictions in the chat; can be used only by administrators in a supergroup */
    export interface td_chatMembersFilterRestricted {
        '@type': 'chatMembersFilterRestricted';
    }
    
    
    /** Returns users banned from the chat; can be used only by administrators in a supergroup or in a channel */
    export interface td_chatMembersFilterBanned {
        '@type': 'chatMembersFilterBanned';
    }
    
    
    /** Returns bot members of the chat */
    export interface td_chatMembersFilterBots {
        '@type': 'chatMembersFilterBots';
    }
    
    
    /** Returns recently active users in reverse chronological order */
    export interface td_supergroupMembersFilterRecent {
        '@type': 'supergroupMembersFilterRecent';
    }
    
    
    /** Returns contacts of the user, which are members of the supergroup or channel */
    export interface td_supergroupMembersFilterContacts {
        '@type': 'supergroupMembersFilterContacts';
        /** Query to search for */
        query: td_string;
    }
    
    
    /** Returns the owner and administrators */
    export interface td_supergroupMembersFilterAdministrators {
        '@type': 'supergroupMembersFilterAdministrators';
    }
    
    
    /** Used to search for supergroup or channel members via a (string) query */
    export interface td_supergroupMembersFilterSearch {
        '@type': 'supergroupMembersFilterSearch';
        /** Query to search for */
        query: td_string;
    }
    
    
    /** Returns restricted supergroup members; can be used only by administrators */
    export interface td_supergroupMembersFilterRestricted {
        '@type': 'supergroupMembersFilterRestricted';
        /** Query to search for */
        query: td_string;
    }
    
    
    /** Returns users banned from the supergroup or channel; can be used only by administrators */
    export interface td_supergroupMembersFilterBanned {
        '@type': 'supergroupMembersFilterBanned';
        /** Query to search for */
        query: td_string;
    }
    
    
    /** Returns users which can be mentioned in the supergroup */
    export interface td_supergroupMembersFilterMention {
        '@type': 'supergroupMembersFilterMention';
        /** Query to search for */
        query: td_string;
        /** If non-zero, the identifier of the current message thread */
        message_thread_id: td_int53;
    }
    
    
    /** Returns bot members of the supergroup or channel */
    export interface td_supergroupMembersFilterBots {
        '@type': 'supergroupMembersFilterBots';
    }
    
    
    /** Contains a chat invite link */
    export interface td_chatInviteLink {
        '@type': 'chatInviteLink';
        /** Chat invite link */
        invite_link: td_string;
        /** Name of the link */
        name: td_string;
        /** User identifier of an administrator created the link */
        creator_user_id: td_int53;
        /** Point in time (Unix timestamp) when the link was created */
        date: td_int32;
        /** Point in time (Unix timestamp) when the link was last edited; 0 if never or unknown */
        edit_date: td_int32;
        /** Point in time (Unix timestamp) when the link will expire; 0 if never */
        expiration_date: td_int32;
        /** The maximum number of members, which can join the chat using the link simultaneously; 0 if not limited. Always 0 if the link requires approval */
        member_limit: td_int32;
        /** Number of chat members, which joined the chat using the link */
        member_count: td_int32;
        /** Number of pending join requests created using this link */
        pending_join_request_count: td_int32;
        /** True, if the link only creates join request. If true, total number of joining members will be unlimited */
        creates_join_request: td_Bool;
        /** True, if the link is primary. Primary invite link can't have name, expiration date, or usage limit. There is exactly one primary invite link for each administrator with can_invite_users right at a given time */
        is_primary: td_Bool;
        /** True, if the link was revoked */
        is_revoked: td_Bool;
    }
    
    
    /** Contains a list of chat invite links */
    export interface td_chatInviteLinks {
        '@type': 'chatInviteLinks';
        /** Approximate total count of chat invite links found */
        total_count: td_int32;
        /** List of invite links */
        invite_links: td_vector<td_chatInviteLink>;
    }
    
    
    /** Describes a chat administrator with a number of active and revoked chat invite links */
    export interface td_chatInviteLinkCount {
        '@type': 'chatInviteLinkCount';
        /** Administrator's user identifier */
        user_id: td_int53;
        /** Number of active invite links */
        invite_link_count: td_int32;
        /** Number of revoked invite links */
        revoked_invite_link_count: td_int32;
    }
    
    
    /** Contains a list of chat invite link counts */
    export interface td_chatInviteLinkCounts {
        '@type': 'chatInviteLinkCounts';
        /** List of invite link counts */
        invite_link_counts: td_vector<td_chatInviteLinkCount>;
    }
    
    
    /** Describes a chat member joined a chat via an invite link */
    export interface td_chatInviteLinkMember {
        '@type': 'chatInviteLinkMember';
        /** User identifier */
        user_id: td_int53;
        /** Point in time (Unix timestamp) when the user joined the chat */
        joined_chat_date: td_int32;
        /** User identifier of the chat administrator, approved user join request */
        approver_user_id: td_int53;
    }
    
    
    /** Contains a list of chat members joined a chat via an invite link */
    export interface td_chatInviteLinkMembers {
        '@type': 'chatInviteLinkMembers';
        /** Approximate total count of chat members found */
        total_count: td_int32;
        /** List of chat members, joined a chat via an invite link */
        members: td_vector<td_chatInviteLinkMember>;
    }
    
    
    /** Contains information about a chat invite link */
    export interface td_chatInviteLinkInfo {
        '@type': 'chatInviteLinkInfo';
        /** Chat identifier of the invite link; 0 if the user has no access to the chat before joining */
        chat_id: td_int53;
        /** If non-zero, the amount of time for which read access to the chat will remain available, in seconds */
        accessible_for: td_int32;
        /** Type of the chat */
        type: td_ChatType;
        /** Title of the chat */
        title: td_string;
        /** Chat photo; may be null */
        photo?: td_chatPhotoInfo;
        /** Contains information about a chat invite link */
        description: td_string;
        /** Number of members in the chat */
        member_count: td_int32;
        /** User identifiers of some chat members that may be known to the current user */
        member_user_ids: td_vector<td_int53>;
        /** True, if the link only creates join request */
        creates_join_request: td_Bool;
        /** True, if the chat is a public supergroup or channel, i.e. it has a username or it is a location-based supergroup */
        is_public: td_Bool;
    }
    
    
    /** Describes a user that sent a join request and waits for administrator approval */
    export interface td_chatJoinRequest {
        '@type': 'chatJoinRequest';
        /** User identifier */
        user_id: td_int53;
        /** Point in time (Unix timestamp) when the user sent the join request */
        date: td_int32;
        /** A short bio of the user */
        bio: td_string;
    }
    
    
    /** Contains a list of requests to join a chat */
    export interface td_chatJoinRequests {
        '@type': 'chatJoinRequests';
        /** Approximate total count of requests found */
        total_count: td_int32;
        /** List of the requests */
        requests: td_vector<td_chatJoinRequest>;
    }
    
    
    /** Contains information about pending join requests for a chat */
    export interface td_chatJoinRequestsInfo {
        '@type': 'chatJoinRequestsInfo';
        /** Total number of pending join requests */
        total_count: td_int32;
        /** Identifiers of at most 3 users sent the newest pending join requests */
        user_ids: td_vector<td_int53>;
    }
    
    
    /** Represents a basic group of 0-200 users (must be upgraded to a supergroup to accommodate more than 200 users) */
    export interface td_basicGroup {
        '@type': 'basicGroup';
        /** Group identifier */
        id: td_int53;
        /** Number of members in the group */
        member_count: td_int32;
        /** Status of the current user in the group */
        status: td_ChatMemberStatus;
        /** True, if the group is active */
        is_active: td_Bool;
        /** Identifier of the supergroup to which this group was upgraded; 0 if none */
        upgraded_to_supergroup_id: td_int53;
    }
    
    
    /** Contains full information about a basic group */
    export interface td_basicGroupFullInfo {
        '@type': 'basicGroupFullInfo';
        /** Chat photo; may be null */
        photo?: td_chatPhoto;
        /** Contains full information about a basic group */
        description: td_string;
        /** User identifier of the creator of the group; 0 if unknown */
        creator_user_id: td_int53;
        /** Group members */
        members: td_vector<td_chatMember>;
        /** Primary invite link for this group; may be null. For chat administrators with can_invite_users right only. Updated only after the basic group is opened */
        invite_link?: td_chatInviteLink;
        /** List of commands of bots in the group */
        bot_commands: td_vector<td_botCommands>;
    }
    
    
    /** Represents a supergroup or channel with zero or more members (subscribers in the case of channels). From the point of view of the system, a channel is a special kind of a supergroup: only administrators can post and see the list of members, and posts from all administrators use the name and photo of the channel instead of individual names and profile photos. Unlike supergroups, channels can have an unlimited number of subscribers */
    export interface td_supergroup {
        '@type': 'supergroup';
        /** Supergroup or channel identifier */
        id: td_int53;
        /** Username of the supergroup or channel; empty for private supergroups or channels */
        username: td_string;
        /** Point in time (Unix timestamp) when the current user joined, or the point in time when the supergroup or channel was created, in case the user is not a member */
        date: td_int32;
        /** Status of the current user in the supergroup or channel; custom title will be always empty */
        status: td_ChatMemberStatus;
        /** Number of members in the supergroup or channel; 0 if unknown. Currently, it is guaranteed to be known only if the supergroup or channel was received through searchPublicChats, searchChatsNearby, getInactiveSupergroupChats, getSuitableDiscussionChats, getGroupsInCommon, or getUserPrivacySettingRules */
        member_count: td_int32;
        /** True, if the channel has a discussion group, or the supergroup is the designated discussion group for a channel */
        has_linked_chat: td_Bool;
        /** True, if the supergroup is connected to a location, i.e. the supergroup is a location-based supergroup */
        has_location: td_Bool;
        /** True, if messages sent to the channel need to contain information about the sender. This field is only applicable to channels */
        sign_messages: td_Bool;
        /** True, if the slow mode is enabled in the supergroup */
        is_slow_mode_enabled: td_Bool;
        /** True, if the supergroup is a channel */
        is_channel: td_Bool;
        /** True, if the supergroup is a broadcast group, i.e. only administrators can send messages and there is no limit on the number of members */
        is_broadcast_group: td_Bool;
        /** True, if the supergroup or channel is verified */
        is_verified: td_Bool;
        /** If non-empty, contains a human-readable description of the reason why access to this supergroup or channel must be restricted */
        restriction_reason: td_string;
        /** True, if many users reported this supergroup or channel as a scam */
        is_scam: td_Bool;
        /** True, if many users reported this supergroup or channel as a fake account */
        is_fake: td_Bool;
    }
    
    
    /** Contains full information about a supergroup or channel */
    export interface td_supergroupFullInfo {
        '@type': 'supergroupFullInfo';
        /** Chat photo; may be null */
        photo?: td_chatPhoto;
        /** Contains full information about a supergroup or channel */
        description: td_string;
        /** Number of members in the supergroup or channel; 0 if unknown */
        member_count: td_int32;
        /** Number of privileged users in the supergroup or channel; 0 if unknown */
        administrator_count: td_int32;
        /** Number of restricted users in the supergroup; 0 if unknown */
        restricted_count: td_int32;
        /** Number of users banned from chat; 0 if unknown */
        banned_count: td_int32;
        /** Chat identifier of a discussion group for the channel, or a channel, for which the supergroup is the designated discussion group; 0 if none or unknown */
        linked_chat_id: td_int53;
        /** Delay between consecutive sent messages for non-administrator supergroup members, in seconds */
        slow_mode_delay: td_int32;
        /** Time left before next message can be sent in the supergroup, in seconds. An updateSupergroupFullInfo update is not triggered when value of this field changes, but both new and old values are non-zero */
        slow_mode_delay_expires_in: td_double;
        /** True, if members of the chat can be retrieved */
        can_get_members: td_Bool;
        /** True, if the chat username can be changed */
        can_set_username: td_Bool;
        /** True, if the supergroup sticker set can be changed */
        can_set_sticker_set: td_Bool;
        /** True, if the supergroup location can be changed */
        can_set_location: td_Bool;
        /** True, if the supergroup or channel statistics are available */
        can_get_statistics: td_Bool;
        /** True, if new chat members will have access to old messages. In public or discussion groups and both public and private channels, old messages are always available, so this option affects only private supergroups without a linked chat. The value of this field is only available for chat administrators */
        is_all_history_available: td_Bool;
        /** Identifier of the supergroup sticker set; 0 if none */
        sticker_set_id: td_int64;
        /** Location to which the supergroup is connected; may be null */
        location?: td_chatLocation;
        /** Primary invite link for this chat; may be null. For chat administrators with can_invite_users right only */
        invite_link?: td_chatInviteLink;
        /** List of commands of bots in the group */
        bot_commands: td_vector<td_botCommands>;
        /** Identifier of the basic group from which supergroup was upgraded; 0 if none */
        upgraded_from_basic_group_id: td_int53;
        /** Identifier of the last message in the basic group from which supergroup was upgraded; 0 if none */
        upgraded_from_max_message_id: td_int53;
    }
    
    
    /** The secret chat is not yet created; waiting for the other user to get online */
    export interface td_secretChatStatePending {
        '@type': 'secretChatStatePending';
    }
    
    
    /** The secret chat is ready to use */
    export interface td_secretChatStateReady {
        '@type': 'secretChatStateReady';
    }
    
    
    /** The secret chat is closed */
    export interface td_secretChatStateClosed {
        '@type': 'secretChatStateClosed';
    }
    
    
    /** Represents a secret chat */
    export interface td_secretChat {
        '@type': 'secretChat';
        /** Secret chat identifier */
        id: td_int32;
        /** Identifier of the chat partner */
        user_id: td_int53;
        /** State of the secret chat */
        state: td_SecretChatState;
        /** True, if the chat was created by the current user; otherwise false */
        is_outbound: td_Bool;
        /** Hash of the currently used key for comparison with the hash of the chat partner's key. This is a string of 36 little-endian bytes, which must be split into groups of 2 bits, each denoting a pixel of one of 4 colors FFFFFF, D5E6F3, 2D5775, and 2F99C9. -The pixels must be used to make a 12x12 square image filled from left to right, top to bottom. Alternatively, the first 32 bytes of the hash can be converted to the hexadecimal format and printed as 32 2-digit hex numbers */
        key_hash: td_bytes;
        /** Secret chat layer; determines features supported by the chat partner's application. Nested text entities and underline and strikethrough entities are supported if the layer >= 101 */
        layer: td_int32;
    }
    
    
    /** The message was sent by a known user */
    export interface td_messageSenderUser {
        '@type': 'messageSenderUser';
        /** Identifier of the user that sent the message */
        user_id: td_int53;
    }
    
    
    /** The message was sent on behalf of a chat */
    export interface td_messageSenderChat {
        '@type': 'messageSenderChat';
        /** Identifier of the chat that sent the message */
        chat_id: td_int53;
    }
    
    
    /** Represents a list of message senders */
    export interface td_messageSenders {
        '@type': 'messageSenders';
        /** Approximate total count of messages senders found */
        total_count: td_int32;
        /** List of message senders */
        senders: td_vector<td_MessageSender>;
    }
    
    
    /** The message was originally sent by a known user */
    export interface td_messageForwardOriginUser {
        '@type': 'messageForwardOriginUser';
        /** Identifier of the user that originally sent the message */
        sender_user_id: td_int53;
    }
    
    
    /** The message was originally sent on behalf of a chat */
    export interface td_messageForwardOriginChat {
        '@type': 'messageForwardOriginChat';
        /** Identifier of the chat that originally sent the message */
        sender_chat_id: td_int53;
        /** For messages originally sent by an anonymous chat administrator, original message author signature */
        author_signature: td_string;
    }
    
    
    /** The message was originally sent by a user, which is hidden by their privacy settings */
    export interface td_messageForwardOriginHiddenUser {
        '@type': 'messageForwardOriginHiddenUser';
        /** Name of the sender */
        sender_name: td_string;
    }
    
    
    /** The message was originally a post in a channel */
    export interface td_messageForwardOriginChannel {
        '@type': 'messageForwardOriginChannel';
        /** Identifier of the chat from which the message was originally forwarded */
        chat_id: td_int53;
        /** Message identifier of the original message */
        message_id: td_int53;
        /** Original post author signature */
        author_signature: td_string;
    }
    
    
    /** The message was imported from an exported message history */
    export interface td_messageForwardOriginMessageImport {
        '@type': 'messageForwardOriginMessageImport';
        /** Name of the sender */
        sender_name: td_string;
    }
    
    
    /** Contains information about a forwarded message */
    export interface td_messageForwardInfo {
        '@type': 'messageForwardInfo';
        /** Origin of a forwarded message */
        origin: td_MessageForwardOrigin;
        /** Point in time (Unix timestamp) when the message was originally sent */
        date: td_int32;
        /** The type of a public service announcement for the forwarded message */
        public_service_announcement_type: td_string;
        /** For messages forwarded to the chat with the current user (Saved Messages), to the Replies bot chat, or to the channel's discussion group, the identifier of the chat from which the message was forwarded last time; 0 if unknown */
        from_chat_id: td_int53;
        /** For messages forwarded to the chat with the current user (Saved Messages), to the Replies bot chat, or to the channel's discussion group, the identifier of the original message from which the new message was forwarded last time; 0 if unknown */
        from_message_id: td_int53;
    }
    
    
    /** Contains information about replies to a message */
    export interface td_messageReplyInfo {
        '@type': 'messageReplyInfo';
        /** Number of times the message was directly or indirectly replied */
        reply_count: td_int32;
        /** Identifiers of at most 3 recent repliers to the message; available in channels with a discussion supergroup. The users and chats are expected to be inaccessible: only their photo and name will be available */
        recent_replier_ids: td_vector<td_MessageSender>;
        /** Identifier of the last read incoming reply to the message */
        last_read_inbox_message_id: td_int53;
        /** Identifier of the last read outgoing reply to the message */
        last_read_outbox_message_id: td_int53;
        /** Identifier of the last reply to the message */
        last_message_id: td_int53;
    }
    
    
    /** Contains information about interactions with a message */
    export interface td_messageInteractionInfo {
        '@type': 'messageInteractionInfo';
        /** Number of times the message was viewed */
        view_count: td_int32;
        /** Number of times the message was forwarded */
        forward_count: td_int32;
        /** Information about direct or indirect replies to the message; may be null. Currently, available only in channels with a discussion supergroup and discussion supergroups for messages, which are not replies itself */
        reply_info?: td_messageReplyInfo;
    }
    
    
    /** The message is being sent now, but has not yet been delivered to the server */
    export interface td_messageSendingStatePending {
        '@type': 'messageSendingStatePending';
    }
    
    
    /** The message failed to be sent */
    export interface td_messageSendingStateFailed {
        '@type': 'messageSendingStateFailed';
        /** An error code; 0 if unknown */
        error_code: td_int32;
        /** Error message */
        error_message: td_string;
        /** True, if the message can be re-sent */
        can_retry: td_Bool;
        /** True, if the message can be re-sent only on behalf of a different sender */
        need_another_sender: td_Bool;
        /** Time left before the message can be re-sent, in seconds. No update is sent when this field changes */
        retry_after: td_double;
    }
    
    
    /** Describes a message */
    export interface td_message {
        '@type': 'message';
        /** Message identifier; unique for the chat to which the message belongs */
        id: td_int53;
        /** Identifier of the sender of the message */
        sender_id: td_MessageSender;
        /** Chat identifier */
        chat_id: td_int53;
        /** The sending state of the message; may be null */
        sending_state?: td_MessageSendingState;
        /** The scheduling state of the message; may be null */
        scheduling_state?: td_MessageSchedulingState;
        /** True, if the message is outgoing */
        is_outgoing: td_Bool;
        /** True, if the message is pinned */
        is_pinned: td_Bool;
        /** True, if the message can be edited. For live location and poll messages this fields shows whether editMessageLiveLocation or stopPoll can be used with this message by the application */
        can_be_edited: td_Bool;
        /** True, if the message can be forwarded */
        can_be_forwarded: td_Bool;
        /** True, if content of the message can be saved locally or copied */
        can_be_saved: td_Bool;
        /** True, if the message can be deleted only for the current user while other users will continue to see it */
        can_be_deleted_only_for_self: td_Bool;
        /** True, if the message can be deleted for all users */
        can_be_deleted_for_all_users: td_Bool;
        /** True, if the message statistics are available */
        can_get_statistics: td_Bool;
        /** True, if the message thread info is available */
        can_get_message_thread: td_Bool;
        /** True, if chat members already viewed the message can be received through getMessageViewers */
        can_get_viewers: td_Bool;
        /** True, if media timestamp links can be generated for media timestamp entities in the message text, caption or web page description */
        can_get_media_timestamp_links: td_Bool;
        /** True, if media timestamp entities refers to a media in this message as opposed to a media in the replied message */
        has_timestamped_media: td_Bool;
        /** True, if the message is a channel post. All messages to channels are channel posts, all other messages are not channel posts */
        is_channel_post: td_Bool;
        /** True, if the message contains an unread mention for the current user */
        contains_unread_mention: td_Bool;
        /** Point in time (Unix timestamp) when the message was sent */
        date: td_int32;
        /** Point in time (Unix timestamp) when the message was last edited */
        edit_date: td_int32;
        /** Information about the initial message sender; may be null */
        forward_info?: td_messageForwardInfo;
        /** Information about interactions with the message; may be null */
        interaction_info?: td_messageInteractionInfo;
        /** If non-zero, the identifier of the chat to which the replied message belongs; Currently, only messages in the Replies chat can have different reply_in_chat_id and chat_id */
        reply_in_chat_id: td_int53;
        /** If non-zero, the identifier of the message this message is replying to; can be the identifier of a deleted message */
        reply_to_message_id: td_int53;
        /** If non-zero, the identifier of the message thread the message belongs to; unique within the chat to which the message belongs */
        message_thread_id: td_int53;
        /** For self-destructing messages, the message's TTL (Time To Live), in seconds; 0 if none. TDLib will send updateDeleteMessages or updateMessageContent once the TTL expires */
        ttl: td_int32;
        /** Time left before the message expires, in seconds. If the TTL timer isn't started yet, equals to the value of the ttl field */
        ttl_expires_in: td_double;
        /** If non-zero, the user identifier of the bot through which this message was sent */
        via_bot_user_id: td_int53;
        /** For channel posts and anonymous group messages, optional author signature */
        author_signature: td_string;
        /** Unique identifier of an album this message belongs to. Only audios, documents, photos and videos can be grouped together in albums */
        media_album_id: td_int64;
        /** If non-empty, contains a human-readable description of the reason why access to this message must be restricted */
        restriction_reason: td_string;
        /** Content of the message */
        content: td_MessageContent;
        /** Reply markup for the message; may be null */
        reply_markup?: td_ReplyMarkup;
    }
    
    
    /** Contains a list of messages */
    export interface td_messages {
        '@type': 'messages';
        /** Approximate total count of messages found */
        total_count: td_int32;
        /** List of messages; messages may be null */
        messages?: td_vector<td_message>;
    }
    
    
    /** Contains a list of messages found by a search */
    export interface td_foundMessages {
        '@type': 'foundMessages';
        /** Approximate total count of messages found; -1 if unknown */
        total_count: td_int32;
        /** List of messages */
        messages: td_vector<td_message>;
        /** The offset for the next request. If empty, there are no more results */
        next_offset: td_string;
    }
    
    
    /** Contains information about a message in a specific position */
    export interface td_messagePosition {
        '@type': 'messagePosition';
        /** 0-based message position in the full list of suitable messages */
        position: td_int32;
        /** Message identifier */
        message_id: td_int53;
        /** Point in time (Unix timestamp) when the message was sent */
        date: td_int32;
    }
    
    
    /** Contains a list of message positions */
    export interface td_messagePositions {
        '@type': 'messagePositions';
        /** Total count of messages found */
        total_count: td_int32;
        /** List of message positions */
        positions: td_vector<td_messagePosition>;
    }
    
    
    /** Contains information about found messages sent on a specific day */
    export interface td_messageCalendarDay {
        '@type': 'messageCalendarDay';
        /** Total number of found messages sent on the day */
        total_count: td_int32;
        /** First message sent on the day */
        message: td_message;
    }
    
    
    /** Contains information about found messages, split by days according to the option "utc_time_offset" */
    export interface td_messageCalendar {
        '@type': 'messageCalendar';
        /** Total number of found messages */
        total_count: td_int32;
        /** Information about messages sent */
        days: td_vector<td_messageCalendarDay>;
    }
    
    
    /** Describes a sponsored message */
    export interface td_sponsoredMessage {
        '@type': 'sponsoredMessage';
        /** Message identifier; unique for the chat to which the sponsored message belongs among both ordinary and sponsored messages */
        message_id: td_int53;
        /** Sponsor chat identifier; 0 if the sponsor chat is accessible through an invite link */
        sponsor_chat_id: td_int53;
        /** Information about the sponsor chat; may be null unless sponsor_chat_id == 0 */
        sponsor_chat_info?: td_chatInviteLinkInfo;
        /** An internal link to be opened when the sponsored message is clicked; may be null. If null, the sponsor chat needs to be opened instead */
        link?: td_InternalLinkType;
        /** Content of the message. Currently, can be only of the type messageText */
        content: td_MessageContent;
    }
    
    
    /** Notification settings applied to all private and secret chats when the corresponding chat setting has a default value */
    export interface td_notificationSettingsScopePrivateChats {
        '@type': 'notificationSettingsScopePrivateChats';
    }
    
    
    /** Notification settings applied to all basic groups and supergroups when the corresponding chat setting has a default value */
    export interface td_notificationSettingsScopeGroupChats {
        '@type': 'notificationSettingsScopeGroupChats';
    }
    
    
    /** Notification settings applied to all channels when the corresponding chat setting has a default value */
    export interface td_notificationSettingsScopeChannelChats {
        '@type': 'notificationSettingsScopeChannelChats';
    }
    
    
    /** Contains information about notification settings for a chat */
    export interface td_chatNotificationSettings {
        '@type': 'chatNotificationSettings';
        /** If true, mute_for is ignored and the value for the relevant type of chat is used instead */
        use_default_mute_for: td_Bool;
        /** Time left before notifications will be unmuted, in seconds */
        mute_for: td_int32;
        /** If true, sound is ignored and the value for the relevant type of chat is used instead */
        use_default_sound: td_Bool;
        /** The name of an audio file to be used for notification sounds; only applies to iOS applications */
        sound: td_string;
        /** If true, show_preview is ignored and the value for the relevant type of chat is used instead */
        use_default_show_preview: td_Bool;
        /** True, if message content must be displayed in notifications */
        show_preview: td_Bool;
        /** If true, disable_pinned_message_notifications is ignored and the value for the relevant type of chat is used instead */
        use_default_disable_pinned_message_notifications: td_Bool;
        /** If true, notifications for incoming pinned messages will be created as for an ordinary unread message */
        disable_pinned_message_notifications: td_Bool;
        /** If true, disable_mention_notifications is ignored and the value for the relevant type of chat is used instead */
        use_default_disable_mention_notifications: td_Bool;
        /** If true, notifications for messages with mentions will be created as for an ordinary unread message */
        disable_mention_notifications: td_Bool;
    }
    
    
    /** Contains information about notification settings for several chats */
    export interface td_scopeNotificationSettings {
        '@type': 'scopeNotificationSettings';
        /** Time left before notifications will be unmuted, in seconds */
        mute_for: td_int32;
        /** The name of an audio file to be used for notification sounds; only applies to iOS applications */
        sound: td_string;
        /** True, if message content must be displayed in notifications */
        show_preview: td_Bool;
        /** True, if notifications for incoming pinned messages will be created as for an ordinary unread message */
        disable_pinned_message_notifications: td_Bool;
        /** True, if notifications for messages with mentions will be created as for an ordinary unread message */
        disable_mention_notifications: td_Bool;
    }
    
    
    /** Contains information about a message draft */
    export interface td_draftMessage {
        '@type': 'draftMessage';
        /** Identifier of the message to reply to; 0 if none */
        reply_to_message_id: td_int53;
        /** Point in time (Unix timestamp) when the draft was created */
        date: td_int32;
        /** Content of the message draft; must be of the type inputMessageText */
        input_message_text: td_InputMessageContent;
    }
    
    
    /** An ordinary chat with a user */
    export interface td_chatTypePrivate {
        '@type': 'chatTypePrivate';
        /** User identifier */
        user_id: td_int53;
    }
    
    
    /** A basic group (a chat with 0-200 other users) */
    export interface td_chatTypeBasicGroup {
        '@type': 'chatTypeBasicGroup';
        /** Basic group identifier */
        basic_group_id: td_int53;
    }
    
    
    /** A supergroup or channel (with unlimited members) */
    export interface td_chatTypeSupergroup {
        '@type': 'chatTypeSupergroup';
        /** Supergroup or channel identifier */
        supergroup_id: td_int53;
        /** True, if the supergroup is a channel */
        is_channel: td_Bool;
    }
    
    
    /** A secret chat with a user */
    export interface td_chatTypeSecret {
        '@type': 'chatTypeSecret';
        /** Secret chat identifier */
        secret_chat_id: td_int32;
        /** User identifier of the secret chat peer */
        user_id: td_int53;
    }
    
    
    /** Represents a filter of user chats */
    export interface td_chatFilter {
        '@type': 'chatFilter';
        /** The title of the filter; 1-12 characters without line feeds */
        title: td_string;
        /** The chosen icon name for short filter representation. If non-empty, must be one of "All", "Unread", "Unmuted", "Bots", "Channels", "Groups", "Private", "Custom", "Setup", "Cat", "Crown", "Favorite", "Flower", "Game", "Home", "Love", "Mask", "Party", "Sport", "Study", "Trade", "Travel", "Work". -If empty, use getChatFilterDefaultIconName to get default icon name for the filter */
        icon_name: td_string;
        /** The chat identifiers of pinned chats in the filtered chat list */
        pinned_chat_ids: td_vector<td_int53>;
        /** The chat identifiers of always included chats in the filtered chat list */
        included_chat_ids: td_vector<td_int53>;
        /** The chat identifiers of always excluded chats in the filtered chat list */
        excluded_chat_ids: td_vector<td_int53>;
        /** True, if muted chats need to be excluded */
        exclude_muted: td_Bool;
        /** True, if read chats need to be excluded */
        exclude_read: td_Bool;
        /** True, if archived chats need to be excluded */
        exclude_archived: td_Bool;
        /** True, if contacts need to be included */
        include_contacts: td_Bool;
        /** True, if non-contact users need to be included */
        include_non_contacts: td_Bool;
        /** True, if bots need to be included */
        include_bots: td_Bool;
        /** True, if basic groups and supergroups need to be included */
        include_groups: td_Bool;
        /** True, if channels need to be included */
        include_channels: td_Bool;
    }
    
    
    /** Contains basic information about a chat filter */
    export interface td_chatFilterInfo {
        '@type': 'chatFilterInfo';
        /** Unique chat filter identifier */
        id: td_int32;
        /** The title of the filter; 1-12 characters without line feeds */
        title: td_string;
        /** The chosen or default icon name for short filter representation. One of "All", "Unread", "Unmuted", "Bots", "Channels", "Groups", "Private", "Custom", "Setup", "Cat", "Crown", "Favorite", "Flower", "Game", "Home", "Love", "Mask", "Party", "Sport", "Study", "Trade", "Travel", "Work" */
        icon_name: td_string;
    }
    
    
    /** Describes a recommended chat filter */
    export interface td_recommendedChatFilter {
        '@type': 'recommendedChatFilter';
        /** The chat filter */
        filter: td_chatFilter;
        /** Describes a recommended chat filter */
        description: td_string;
    }
    
    
    /** Contains a list of recommended chat filters */
    export interface td_recommendedChatFilters {
        '@type': 'recommendedChatFilters';
        /** List of recommended chat filters */
        chat_filters: td_vector<td_recommendedChatFilter>;
    }
    
    
    /** A main list of chats */
    export interface td_chatListMain {
        '@type': 'chatListMain';
    }
    
    
    /** A list of chats usually located at the top of the main chat list. Unmuted chats are automatically moved from the Archive to the Main chat list when a new message arrives */
    export interface td_chatListArchive {
        '@type': 'chatListArchive';
    }
    
    
    /** A list of chats belonging to a chat filter */
    export interface td_chatListFilter {
        '@type': 'chatListFilter';
        /** Chat filter identifier */
        chat_filter_id: td_int32;
    }
    
    
    /** Contains a list of chat lists */
    export interface td_chatLists {
        '@type': 'chatLists';
        /** List of chat lists */
        chat_lists: td_vector<td_ChatList>;
    }
    
    
    /** The chat is sponsored by the user's MTProxy server */
    export interface td_chatSourceMtprotoProxy {
        '@type': 'chatSourceMtprotoProxy';
    }
    
    
    /** The chat contains a public service announcement */
    export interface td_chatSourcePublicServiceAnnouncement {
        '@type': 'chatSourcePublicServiceAnnouncement';
        /** The type of the announcement */
        type: td_string;
        /** The text of the announcement */
        text: td_string;
    }
    
    
    /** Describes a position of a chat in a chat list */
    export interface td_chatPosition {
        '@type': 'chatPosition';
        /** The chat list */
        list: td_ChatList;
        /** A parameter used to determine order of the chat in the chat list. Chats must be sorted by the pair (order, chat.id) in descending order */
        order: td_int64;
        /** True, if the chat is pinned in the chat list */
        is_pinned: td_Bool;
        /** Source of the chat in the chat list; may be null */
        source?: td_ChatSource;
    }
    
    
    /** Describes a video chat */
    export interface td_videoChat {
        '@type': 'videoChat';
        /** Group call identifier of an active video chat; 0 if none. Full information about the video chat can be received through the method getGroupCall */
        group_call_id: td_int32;
        /** True, if the video chat has participants */
        has_participants: td_Bool;
        /** Default group call participant identifier to join the video chat; may be null */
        default_participant_id?: td_MessageSender;
    }
    
    
    /** A chat. (Can be a private chat, basic group, supergroup, or secret chat) */
    export interface td_chat {
        '@type': 'chat';
        /** Chat unique identifier */
        id: td_int53;
        /** Type of the chat */
        type: td_ChatType;
        /** Chat title */
        title: td_string;
        /** Chat photo; may be null */
        photo?: td_chatPhotoInfo;
        /** Actions that non-administrator chat members are allowed to take in the chat */
        permissions: td_chatPermissions;
        /** Last message in the chat; may be null */
        last_message?: td_message;
        /** Positions of the chat in chat lists */
        positions: td_vector<td_chatPosition>;
        /** Identifier of a user or chat that is selected to send messages in the chat; may be null if the user can't change message sender */
        message_sender_id?: td_MessageSender;
        /** True, if chat content can't be saved locally, forwarded, or copied */
        has_protected_content: td_Bool;
        /** True, if the chat is marked as unread */
        is_marked_as_unread: td_Bool;
        /** True, if the chat is blocked by the current user and private messages from the chat can't be received */
        is_blocked: td_Bool;
        /** True, if the chat has scheduled messages */
        has_scheduled_messages: td_Bool;
        /** True, if the chat messages can be deleted only for the current user while other users will continue to see the messages */
        can_be_deleted_only_for_self: td_Bool;
        /** True, if the chat messages can be deleted for all users */
        can_be_deleted_for_all_users: td_Bool;
        /** True, if the chat can be reported to Telegram moderators through reportChat or reportChatPhoto */
        can_be_reported: td_Bool;
        /** Default value of the disable_notification parameter, used when a message is sent to the chat */
        default_disable_notification: td_Bool;
        /** Number of unread messages in the chat */
        unread_count: td_int32;
        /** Identifier of the last read incoming message */
        last_read_inbox_message_id: td_int53;
        /** Identifier of the last read outgoing message */
        last_read_outbox_message_id: td_int53;
        /** Number of unread messages with a mention/reply in the chat */
        unread_mention_count: td_int32;
        /** Notification settings for this chat */
        notification_settings: td_chatNotificationSettings;
        /** Current message Time To Live setting (self-destruct timer) for the chat; 0 if not defined. TTL is counted from the time message or its content is viewed in secret chats and from the send date in other chats */
        message_ttl: td_int32;
        /** If non-empty, name of a theme, set for the chat */
        theme_name: td_string;
        /** Information about actions which must be possible to do through the chat action bar; may be null */
        action_bar?: td_ChatActionBar;
        /** Information about video chat of the chat */
        video_chat: td_videoChat;
        /** Information about pending join requests; may be null */
        pending_join_requests?: td_chatJoinRequestsInfo;
        /** Identifier of the message from which reply markup needs to be used; 0 if there is no default custom reply markup in the chat */
        reply_markup_message_id: td_int53;
        /** A draft of a message in the chat; may be null */
        draft_message?: td_draftMessage;
        /** Application-specific data associated with the chat. (For example, the chat scroll position or local chat notification settings can be stored here.) Persistent if the message database is used */
        client_data: td_string;
    }
    
    
    /** Represents a list of chats */
    export interface td_chats {
        '@type': 'chats';
        /** Approximate total count of chats found */
        total_count: td_int32;
        /** List of chat identifiers */
        chat_ids: td_vector<td_int53>;
    }
    
    
    /** Describes a chat located nearby */
    export interface td_chatNearby {
        '@type': 'chatNearby';
        /** Chat identifier */
        chat_id: td_int53;
        /** Distance to the chat location, in meters */
        distance: td_int32;
    }
    
    
    /** Represents a list of chats located nearby */
    export interface td_chatsNearby {
        '@type': 'chatsNearby';
        /** List of users nearby */
        users_nearby: td_vector<td_chatNearby>;
        /** List of location-based supergroups nearby */
        supergroups_nearby: td_vector<td_chatNearby>;
    }
    
    
    /** The chat is public, because it has username */
    export interface td_publicChatTypeHasUsername {
        '@type': 'publicChatTypeHasUsername';
    }
    
    
    /** The chat is public, because it is a location-based supergroup */
    export interface td_publicChatTypeIsLocationBased {
        '@type': 'publicChatTypeIsLocationBased';
    }
    
    
    /** The chat can be reported as spam using the method reportChat with the reason chatReportReasonSpam */
    export interface td_chatActionBarReportSpam {
        '@type': 'chatActionBarReportSpam';
        /** If true, the chat was automatically archived and can be moved back to the main chat list using addChatToList simultaneously with setting chat notification settings to default using setChatNotificationSettings */
        can_unarchive: td_Bool;
    }
    
    
    /** The chat is a location-based supergroup, which can be reported as having unrelated location using the method reportChat with the reason chatReportReasonUnrelatedLocation */
    export interface td_chatActionBarReportUnrelatedLocation {
        '@type': 'chatActionBarReportUnrelatedLocation';
    }
    
    
    /** The chat is a recently created group chat to which new members can be invited */
    export interface td_chatActionBarInviteMembers {
        '@type': 'chatActionBarInviteMembers';
    }
    
    
    /** The chat is a private or secret chat, which can be reported using the method reportChat, or the other user can be blocked using the method toggleMessageSenderIsBlocked, or the other user can be added to the contact list using the method addContact */
    export interface td_chatActionBarReportAddBlock {
        '@type': 'chatActionBarReportAddBlock';
        /** If true, the chat was automatically archived and can be moved back to the main chat list using addChatToList simultaneously with setting chat notification settings to default using setChatNotificationSettings */
        can_unarchive: td_Bool;
        /** If non-negative, the current user was found by the peer through searchChatsNearby and this is the distance between the users */
        distance: td_int32;
    }
    
    
    /** The chat is a private or secret chat and the other user can be added to the contact list using the method addContact */
    export interface td_chatActionBarAddContact {
        '@type': 'chatActionBarAddContact';
    }
    
    
    /** The chat is a private or secret chat with a mutual contact and the user's phone number can be shared with the other user using the method sharePhoneNumber */
    export interface td_chatActionBarSharePhoneNumber {
        '@type': 'chatActionBarSharePhoneNumber';
    }
    
    
    /** The chat is a private chat with an administrator of a chat to which the user sent join request */
    export interface td_chatActionBarJoinRequest {
        '@type': 'chatActionBarJoinRequest';
        /** Title of the chat to which the join request was sent */
        title: td_string;
        /** True, if the join request was sent to a channel chat */
        is_channel: td_Bool;
        /** Point in time (Unix timestamp) when the join request was sent */
        request_date: td_int32;
    }
    
    
    /** A simple button, with text that must be sent when the button is pressed */
    export interface td_keyboardButtonTypeText {
        '@type': 'keyboardButtonTypeText';
    }
    
    
    /** A button that sends the user's phone number when pressed; available only in private chats */
    export interface td_keyboardButtonTypeRequestPhoneNumber {
        '@type': 'keyboardButtonTypeRequestPhoneNumber';
    }
    
    
    /** A button that sends the user's location when pressed; available only in private chats */
    export interface td_keyboardButtonTypeRequestLocation {
        '@type': 'keyboardButtonTypeRequestLocation';
    }
    
    
    /** A button that allows the user to create and send a poll when pressed; available only in private chats */
    export interface td_keyboardButtonTypeRequestPoll {
        '@type': 'keyboardButtonTypeRequestPoll';
        /** If true, only regular polls must be allowed to create */
        force_regular: td_Bool;
        /** If true, only polls in quiz mode must be allowed to create */
        force_quiz: td_Bool;
    }
    
    
    /** Represents a single button in a bot keyboard */
    export interface td_keyboardButton {
        '@type': 'keyboardButton';
        /** Text of the button */
        text: td_string;
        /** Type of the button */
        type: td_KeyboardButtonType;
    }
    
    
    /** A button that opens a specified URL */
    export interface td_inlineKeyboardButtonTypeUrl {
        '@type': 'inlineKeyboardButtonTypeUrl';
        /** HTTP or tg:// URL to open */
        url: td_string;
    }
    
    
    /** A button that opens a specified URL and automatically authorize the current user if allowed to do so */
    export interface td_inlineKeyboardButtonTypeLoginUrl {
        '@type': 'inlineKeyboardButtonTypeLoginUrl';
        /** An HTTP URL to open */
        url: td_string;
        /** Unique button identifier */
        id: td_int53;
        /** If non-empty, new text of the button in forwarded messages */
        forward_text: td_string;
    }
    
    
    /** A button that sends a callback query to a bot */
    export interface td_inlineKeyboardButtonTypeCallback {
        '@type': 'inlineKeyboardButtonTypeCallback';
        /** Data to be sent to the bot via a callback query */
        data: td_bytes;
    }
    
    
    /** A button that asks for password of the current user and then sends a callback query to a bot */
    export interface td_inlineKeyboardButtonTypeCallbackWithPassword {
        '@type': 'inlineKeyboardButtonTypeCallbackWithPassword';
        /** Data to be sent to the bot via a callback query */
        data: td_bytes;
    }
    
    
    /** A button with a game that sends a callback query to a bot. This button must be in the first column and row of the keyboard and can be attached only to a message with content of the type messageGame */
    export interface td_inlineKeyboardButtonTypeCallbackGame {
        '@type': 'inlineKeyboardButtonTypeCallbackGame';
    }
    
    
    /** A button that forces an inline query to the bot to be inserted in the input field */
    export interface td_inlineKeyboardButtonTypeSwitchInline {
        '@type': 'inlineKeyboardButtonTypeSwitchInline';
        /** Inline query to be sent to the bot */
        query: td_string;
        /** True, if the inline query must be sent from the current chat */
        in_current_chat: td_Bool;
    }
    
    
    /** A button to buy something. This button must be in the first column and row of the keyboard and can be attached only to a message with content of the type messageInvoice */
    export interface td_inlineKeyboardButtonTypeBuy {
        '@type': 'inlineKeyboardButtonTypeBuy';
    }
    
    
    /** A button with a user reference to be handled in the same way as textEntityTypeMentionName entities */
    export interface td_inlineKeyboardButtonTypeUser {
        '@type': 'inlineKeyboardButtonTypeUser';
        /** User identifier */
        user_id: td_int53;
    }
    
    
    /** Represents a single button in an inline keyboard */
    export interface td_inlineKeyboardButton {
        '@type': 'inlineKeyboardButton';
        /** Text of the button */
        text: td_string;
        /** Type of the button */
        type: td_InlineKeyboardButtonType;
    }
    
    
    /** Instructs application to remove the keyboard once this message has been received. This kind of keyboard can't be received in an incoming message; instead, UpdateChatReplyMarkup with message_id == 0 will be sent */
    export interface td_replyMarkupRemoveKeyboard {
        '@type': 'replyMarkupRemoveKeyboard';
        /** True, if the keyboard is removed only for the mentioned users or the target user of a reply */
        is_personal: td_Bool;
    }
    
    
    /** Instructs application to force a reply to this message */
    export interface td_replyMarkupForceReply {
        '@type': 'replyMarkupForceReply';
        /** True, if a forced reply must automatically be shown to the current user. For outgoing messages, specify true to show the forced reply only for the mentioned users and for the target user of a reply */
        is_personal: td_Bool;
        /** If non-empty, the placeholder to be shown in the input field when the reply is active; 0-64 characters */
        input_field_placeholder: td_string;
    }
    
    
    /** Contains a custom keyboard layout to quickly reply to bots */
    export interface td_replyMarkupShowKeyboard {
        '@type': 'replyMarkupShowKeyboard';
        /** A list of rows of bot keyboard buttons */
        rows: td_vector<td_vector<td_keyboardButton>>;
        /** True, if the application needs to resize the keyboard vertically */
        resize_keyboard: td_Bool;
        /** True, if the application needs to hide the keyboard after use */
        one_time: td_Bool;
        /** True, if the keyboard must automatically be shown to the current user. For outgoing messages, specify true to show the keyboard only for the mentioned users and for the target user of a reply */
        is_personal: td_Bool;
        /** If non-empty, the placeholder to be shown in the input field when the keyboard is active; 0-64 characters */
        input_field_placeholder: td_string;
    }
    
    
    /** Contains an inline keyboard layout */
    export interface td_replyMarkupInlineKeyboard {
        '@type': 'replyMarkupInlineKeyboard';
        /** A list of rows of inline keyboard buttons */
        rows: td_vector<td_vector<td_inlineKeyboardButton>>;
    }
    
    
    /** An HTTP url needs to be open */
    export interface td_loginUrlInfoOpen {
        '@type': 'loginUrlInfoOpen';
        /** The URL to open */
        url: td_string;
        /** True, if there is no need to show an ordinary open URL confirm */
        skip_confirm: td_Bool;
    }
    
    
    /** An authorization confirmation dialog needs to be shown to the user */
    export interface td_loginUrlInfoRequestConfirmation {
        '@type': 'loginUrlInfoRequestConfirmation';
        /** An HTTP URL to be opened */
        url: td_string;
        /** A domain of the URL */
        domain: td_string;
        /** User identifier of a bot linked with the website */
        bot_user_id: td_int53;
        /** True, if the user needs to be requested to give the permission to the bot to send them messages */
        request_write_access: td_Bool;
    }
    
    
    /** Contains information about a message thread */
    export interface td_messageThreadInfo {
        '@type': 'messageThreadInfo';
        /** Identifier of the chat to which the message thread belongs */
        chat_id: td_int53;
        /** Message thread identifier, unique within the chat */
        message_thread_id: td_int53;
        /** Information about the message thread */
        reply_info: td_messageReplyInfo;
        /** Approximate number of unread messages in the message thread */
        unread_message_count: td_int32;
        /** The messages from which the thread starts. The messages are returned in a reverse chronological order (i.e., in order of decreasing message_id) */
        messages: td_vector<td_message>;
        /** A draft of a message in the message thread; may be null */
        draft_message?: td_draftMessage;
    }
    
    
    /** A plain text */
    export interface td_richTextPlain {
        '@type': 'richTextPlain';
        /** Text */
        text: td_string;
    }
    
    
    /** A bold rich text */
    export interface td_richTextBold {
        '@type': 'richTextBold';
        /** Text */
        text: td_RichText;
    }
    
    
    /** An italicized rich text */
    export interface td_richTextItalic {
        '@type': 'richTextItalic';
        /** Text */
        text: td_RichText;
    }
    
    
    /** An underlined rich text */
    export interface td_richTextUnderline {
        '@type': 'richTextUnderline';
        /** Text */
        text: td_RichText;
    }
    
    
    /** A strikethrough rich text */
    export interface td_richTextStrikethrough {
        '@type': 'richTextStrikethrough';
        /** Text */
        text: td_RichText;
    }
    
    
    /** A fixed-width rich text */
    export interface td_richTextFixed {
        '@type': 'richTextFixed';
        /** Text */
        text: td_RichText;
    }
    
    
    /** A rich text URL link */
    export interface td_richTextUrl {
        '@type': 'richTextUrl';
        /** Text */
        text: td_RichText;
        /** URL */
        url: td_string;
        /** True, if the URL has cached instant view server-side */
        is_cached: td_Bool;
    }
    
    
    /** A rich text email link */
    export interface td_richTextEmailAddress {
        '@type': 'richTextEmailAddress';
        /** Text */
        text: td_RichText;
        /** Email address */
        email_address: td_string;
    }
    
    
    /** A subscript rich text */
    export interface td_richTextSubscript {
        '@type': 'richTextSubscript';
        /** Text */
        text: td_RichText;
    }
    
    
    /** A superscript rich text */
    export interface td_richTextSuperscript {
        '@type': 'richTextSuperscript';
        /** Text */
        text: td_RichText;
    }
    
    
    /** A marked rich text */
    export interface td_richTextMarked {
        '@type': 'richTextMarked';
        /** Text */
        text: td_RichText;
    }
    
    
    /** A rich text phone number */
    export interface td_richTextPhoneNumber {
        '@type': 'richTextPhoneNumber';
        /** Text */
        text: td_RichText;
        /** Phone number */
        phone_number: td_string;
    }
    
    
    /** A small image inside the text */
    export interface td_richTextIcon {
        '@type': 'richTextIcon';
        /** The image represented as a document. The image can be in GIF, JPEG or PNG format */
        document: td_document;
        /** Width of a bounding box in which the image must be shown; 0 if unknown */
        width: td_int32;
        /** Height of a bounding box in which the image must be shown; 0 if unknown */
        height: td_int32;
    }
    
    
    /** A reference to a richTexts object on the same web page */
    export interface td_richTextReference {
        '@type': 'richTextReference';
        /** The text */
        text: td_RichText;
        /** The name of a richTextAnchor object, which is the first element of the target richTexts object */
        anchor_name: td_string;
        /** An HTTP URL, opening the reference */
        url: td_string;
    }
    
    
    /** An anchor */
    export interface td_richTextAnchor {
        '@type': 'richTextAnchor';
        /** Anchor name */
        name: td_string;
    }
    
    
    /** A link to an anchor on the same web page */
    export interface td_richTextAnchorLink {
        '@type': 'richTextAnchorLink';
        /** The link text */
        text: td_RichText;
        /** The anchor name. If the name is empty, the link must bring back to top */
        anchor_name: td_string;
        /** An HTTP URL, opening the anchor */
        url: td_string;
    }
    
    
    /** A concatenation of rich texts */
    export interface td_richTexts {
        '@type': 'richTexts';
        /** Texts */
        texts: td_vector<td_RichText>;
    }
    
    
    /** Contains a caption of an instant view web page block, consisting of a text and a trailing credit */
    export interface td_pageBlockCaption {
        '@type': 'pageBlockCaption';
        /** Content of the caption */
        text: td_RichText;
        /** Block credit (like HTML tag <cite>) */
        credit: td_RichText;
    }
    
    
    /** Describes an item of a list page block */
    export interface td_pageBlockListItem {
        '@type': 'pageBlockListItem';
        /** Item label */
        label: td_string;
        /** Item blocks */
        page_blocks: td_vector<td_PageBlock>;
    }
    
    
    /** The content must be left-aligned */
    export interface td_pageBlockHorizontalAlignmentLeft {
        '@type': 'pageBlockHorizontalAlignmentLeft';
    }
    
    
    /** The content must be center-aligned */
    export interface td_pageBlockHorizontalAlignmentCenter {
        '@type': 'pageBlockHorizontalAlignmentCenter';
    }
    
    
    /** The content must be right-aligned */
    export interface td_pageBlockHorizontalAlignmentRight {
        '@type': 'pageBlockHorizontalAlignmentRight';
    }
    
    
    /** The content must be top-aligned */
    export interface td_pageBlockVerticalAlignmentTop {
        '@type': 'pageBlockVerticalAlignmentTop';
    }
    
    
    /** The content must be middle-aligned */
    export interface td_pageBlockVerticalAlignmentMiddle {
        '@type': 'pageBlockVerticalAlignmentMiddle';
    }
    
    
    /** The content must be bottom-aligned */
    export interface td_pageBlockVerticalAlignmentBottom {
        '@type': 'pageBlockVerticalAlignmentBottom';
    }
    
    
    /** Represents a cell of a table */
    export interface td_pageBlockTableCell {
        '@type': 'pageBlockTableCell';
        /** Cell text; may be null. If the text is null, then the cell must be invisible */
        text?: td_RichText;
        /** True, if it is a header cell */
        is_header: td_Bool;
        /** The number of columns the cell spans */
        colspan: td_int32;
        /** The number of rows the cell spans */
        rowspan: td_int32;
        /** Horizontal cell content alignment */
        align: td_PageBlockHorizontalAlignment;
        /** Vertical cell content alignment */
        valign: td_PageBlockVerticalAlignment;
    }
    
    
    /** Contains information about a related article */
    export interface td_pageBlockRelatedArticle {
        '@type': 'pageBlockRelatedArticle';
        /** Related article URL */
        url: td_string;
        /** Article title; may be empty */
        title: td_string;
        /** Contains information about a related article */
        description: td_string;
        /** Article photo; may be null */
        photo?: td_photo;
        /** Article author; may be empty */
        author: td_string;
        /** Point in time (Unix timestamp) when the article was published; 0 if unknown */
        publish_date: td_int32;
    }
    
    
    /** The title of a page */
    export interface td_pageBlockTitle {
        '@type': 'pageBlockTitle';
        /** Title */
        title: td_RichText;
    }
    
    
    /** The subtitle of a page */
    export interface td_pageBlockSubtitle {
        '@type': 'pageBlockSubtitle';
        /** Subtitle */
        subtitle: td_RichText;
    }
    
    
    /** The author and publishing date of a page */
    export interface td_pageBlockAuthorDate {
        '@type': 'pageBlockAuthorDate';
        /** Author */
        author: td_RichText;
        /** Point in time (Unix timestamp) when the article was published; 0 if unknown */
        publish_date: td_int32;
    }
    
    
    /** A header */
    export interface td_pageBlockHeader {
        '@type': 'pageBlockHeader';
        /** Header */
        header: td_RichText;
    }
    
    
    /** A subheader */
    export interface td_pageBlockSubheader {
        '@type': 'pageBlockSubheader';
        /** Subheader */
        subheader: td_RichText;
    }
    
    
    /** A kicker */
    export interface td_pageBlockKicker {
        '@type': 'pageBlockKicker';
        /** Kicker */
        kicker: td_RichText;
    }
    
    
    /** A text paragraph */
    export interface td_pageBlockParagraph {
        '@type': 'pageBlockParagraph';
        /** Paragraph text */
        text: td_RichText;
    }
    
    
    /** A preformatted text paragraph */
    export interface td_pageBlockPreformatted {
        '@type': 'pageBlockPreformatted';
        /** Paragraph text */
        text: td_RichText;
        /** Programming language for which the text needs to be formatted */
        language: td_string;
    }
    
    
    /** The footer of a page */
    export interface td_pageBlockFooter {
        '@type': 'pageBlockFooter';
        /** Footer */
        footer: td_RichText;
    }
    
    
    /** An empty block separating a page */
    export interface td_pageBlockDivider {
        '@type': 'pageBlockDivider';
    }
    
    
    /** An invisible anchor on a page, which can be used in a URL to open the page from the specified anchor */
    export interface td_pageBlockAnchor {
        '@type': 'pageBlockAnchor';
        /** Name of the anchor */
        name: td_string;
    }
    
    
    /** A list of data blocks */
    export interface td_pageBlockList {
        '@type': 'pageBlockList';
        /** The items of the list */
        items: td_vector<td_pageBlockListItem>;
    }
    
    
    /** A block quote */
    export interface td_pageBlockBlockQuote {
        '@type': 'pageBlockBlockQuote';
        /** Quote text */
        text: td_RichText;
        /** Quote credit */
        credit: td_RichText;
    }
    
    
    /** A pull quote */
    export interface td_pageBlockPullQuote {
        '@type': 'pageBlockPullQuote';
        /** Quote text */
        text: td_RichText;
        /** Quote credit */
        credit: td_RichText;
    }
    
    
    /** An animation */
    export interface td_pageBlockAnimation {
        '@type': 'pageBlockAnimation';
        /** Animation file; may be null */
        animation?: td_animation;
        /** Animation caption */
        caption: td_pageBlockCaption;
        /** True, if the animation must be played automatically */
        need_autoplay: td_Bool;
    }
    
    
    /** An audio file */
    export interface td_pageBlockAudio {
        '@type': 'pageBlockAudio';
        /** Audio file; may be null */
        audio?: td_audio;
        /** Audio file caption */
        caption: td_pageBlockCaption;
    }
    
    
    /** A photo */
    export interface td_pageBlockPhoto {
        '@type': 'pageBlockPhoto';
        /** Photo file; may be null */
        photo?: td_photo;
        /** Photo caption */
        caption: td_pageBlockCaption;
        /** URL that needs to be opened when the photo is clicked */
        url: td_string;
    }
    
    
    /** A video */
    export interface td_pageBlockVideo {
        '@type': 'pageBlockVideo';
        /** Video file; may be null */
        video?: td_video;
        /** Video caption */
        caption: td_pageBlockCaption;
        /** True, if the video must be played automatically */
        need_autoplay: td_Bool;
        /** True, if the video must be looped */
        is_looped: td_Bool;
    }
    
    
    /** A voice note */
    export interface td_pageBlockVoiceNote {
        '@type': 'pageBlockVoiceNote';
        /** Voice note; may be null */
        voice_note?: td_voiceNote;
        /** Voice note caption */
        caption: td_pageBlockCaption;
    }
    
    
    /** A page cover */
    export interface td_pageBlockCover {
        '@type': 'pageBlockCover';
        /** Cover */
        cover: td_PageBlock;
    }
    
    
    /** An embedded web page */
    export interface td_pageBlockEmbedded {
        '@type': 'pageBlockEmbedded';
        /** Web page URL, if available */
        url: td_string;
        /** HTML-markup of the embedded page */
        html: td_string;
        /** Poster photo, if available; may be null */
        poster_photo?: td_photo;
        /** Block width; 0 if unknown */
        width: td_int32;
        /** Block height; 0 if unknown */
        height: td_int32;
        /** Block caption */
        caption: td_pageBlockCaption;
        /** True, if the block must be full width */
        is_full_width: td_Bool;
        /** True, if scrolling needs to be allowed */
        allow_scrolling: td_Bool;
    }
    
    
    /** An embedded post */
    export interface td_pageBlockEmbeddedPost {
        '@type': 'pageBlockEmbeddedPost';
        /** Web page URL */
        url: td_string;
        /** Post author */
        author: td_string;
        /** Post author photo; may be null */
        author_photo?: td_photo;
        /** Point in time (Unix timestamp) when the post was created; 0 if unknown */
        date: td_int32;
        /** Post content */
        page_blocks: td_vector<td_PageBlock>;
        /** Post caption */
        caption: td_pageBlockCaption;
    }
    
    
    /** A collage */
    export interface td_pageBlockCollage {
        '@type': 'pageBlockCollage';
        /** Collage item contents */
        page_blocks: td_vector<td_PageBlock>;
        /** Block caption */
        caption: td_pageBlockCaption;
    }
    
    
    /** A slideshow */
    export interface td_pageBlockSlideshow {
        '@type': 'pageBlockSlideshow';
        /** Slideshow item contents */
        page_blocks: td_vector<td_PageBlock>;
        /** Block caption */
        caption: td_pageBlockCaption;
    }
    
    
    /** A link to a chat */
    export interface td_pageBlockChatLink {
        '@type': 'pageBlockChatLink';
        /** Chat title */
        title: td_string;
        /** Chat photo; may be null */
        photo?: td_chatPhotoInfo;
        /** Chat username, by which all other information about the chat can be resolved */
        username: td_string;
    }
    
    
    /** A table */
    export interface td_pageBlockTable {
        '@type': 'pageBlockTable';
        /** Table caption */
        caption: td_RichText;
        /** Table cells */
        cells: td_vector<td_vector<td_pageBlockTableCell>>;
        /** True, if the table is bordered */
        is_bordered: td_Bool;
        /** True, if the table is striped */
        is_striped: td_Bool;
    }
    
    
    /** A collapsible block */
    export interface td_pageBlockDetails {
        '@type': 'pageBlockDetails';
        /** Always visible heading for the block */
        header: td_RichText;
        /** Block contents */
        page_blocks: td_vector<td_PageBlock>;
        /** True, if the block is open by default */
        is_open: td_Bool;
    }
    
    
    /** Related articles */
    export interface td_pageBlockRelatedArticles {
        '@type': 'pageBlockRelatedArticles';
        /** Block header */
        header: td_RichText;
        /** List of related articles */
        articles: td_vector<td_pageBlockRelatedArticle>;
    }
    
    
    /** A map */
    export interface td_pageBlockMap {
        '@type': 'pageBlockMap';
        /** Location of the map center */
        location: td_location;
        /** Map zoom level */
        zoom: td_int32;
        /** Map width */
        width: td_int32;
        /** Map height */
        height: td_int32;
        /** Block caption */
        caption: td_pageBlockCaption;
    }
    
    
    /** Describes an instant view page for a web page */
    export interface td_webPageInstantView {
        '@type': 'webPageInstantView';
        /** Content of the web page */
        page_blocks: td_vector<td_PageBlock>;
        /** Number of the instant view views; 0 if unknown */
        view_count: td_int32;
        /** Version of the instant view; currently, can be 1 or 2 */
        version: td_int32;
        /** True, if the instant view must be shown from right to left */
        is_rtl: td_Bool;
        /** True, if the instant view contains the full page. A network request might be needed to get the full web page instant view */
        is_full: td_Bool;
        /** An internal link to be opened to leave feedback about the instant view */
        feedback_link: td_InternalLinkType;
    }
    
    
    /** Describes a web page preview */
    export interface td_webPage {
        '@type': 'webPage';
        /** Original URL of the link */
        url: td_string;
        /** URL to display */
        display_url: td_string;
        /** Type of the web page. Can be: article, photo, audio, video, document, profile, app, or something else */
        type: td_string;
        /** Short name of the site (e.g., Google Docs, App Store) */
        site_name: td_string;
        /** Title of the content */
        title: td_string;
        /** Describes a web page preview */
        description: td_formattedText;
        /** Image representing the content; may be null */
        photo?: td_photo;
        /** URL to show in the embedded preview */
        embed_url: td_string;
        /** MIME type of the embedded preview, (e.g., text/html or video/mp4) */
        embed_type: td_string;
        /** Width of the embedded preview */
        embed_width: td_int32;
        /** Height of the embedded preview */
        embed_height: td_int32;
        /** Duration of the content, in seconds */
        duration: td_int32;
        /** Author of the content */
        author: td_string;
        /** Preview of the content as an animation, if available; may be null */
        animation?: td_animation;
        /** Preview of the content as an audio file, if available; may be null */
        audio?: td_audio;
        /** Preview of the content as a document, if available; may be null */
        document?: td_document;
        /** Preview of the content as a sticker for small WEBP files, if available; may be null */
        sticker?: td_sticker;
        /** Preview of the content as a video, if available; may be null */
        video?: td_video;
        /** Preview of the content as a video note, if available; may be null */
        video_note?: td_videoNote;
        /** Preview of the content as a voice note, if available; may be null */
        voice_note?: td_voiceNote;
        /** Version of instant view, available for the web page (currently, can be 1 or 2), 0 if none */
        instant_view_version: td_int32;
    }
    
    
    /** Contains information about a country */
    export interface td_countryInfo {
        '@type': 'countryInfo';
        /** A two-letter ISO 3166-1 alpha-2 country code */
        country_code: td_string;
        /** Native name of the country */
        name: td_string;
        /** English name of the country */
        english_name: td_string;
        /** True, if the country must be hidden from the list of all countries */
        is_hidden: td_Bool;
        /** List of country calling codes */
        calling_codes: td_vector<td_string>;
    }
    
    
    /** Contains information about countries */
    export interface td_countries {
        '@type': 'countries';
        /** The list of countries */
        countries: td_vector<td_countryInfo>;
    }
    
    
    /** Contains information about a phone number */
    export interface td_phoneNumberInfo {
        '@type': 'phoneNumberInfo';
        /** Information about the country to which the phone number belongs; may be null */
        country?: td_countryInfo;
        /** The part of the phone number denoting country calling code or its part */
        country_calling_code: td_string;
        /** The phone number without country calling code formatted accordingly to local rules. Expected digits are returned as '-', but even more digits might be entered by the user */
        formatted_phone_number: td_string;
    }
    
    
    /** Describes an action associated with a bank card number */
    export interface td_bankCardActionOpenUrl {
        '@type': 'bankCardActionOpenUrl';
        /** Action text */
        text: td_string;
        /** The URL to be opened */
        url: td_string;
    }
    
    
    /** Information about a bank card */
    export interface td_bankCardInfo {
        '@type': 'bankCardInfo';
        /** Title of the bank card description */
        title: td_string;
        /** Actions that can be done with the bank card number */
        actions: td_vector<td_bankCardActionOpenUrl>;
    }
    
    
    /** Describes an address */
    export interface td_address {
        '@type': 'address';
        /** A two-letter ISO 3166-1 alpha-2 country code */
        country_code: td_string;
        /** State, if applicable */
        state: td_string;
        /** City */
        city: td_string;
        /** First line of the address */
        street_line1: td_string;
        /** Second line of the address */
        street_line2: td_string;
        /** Address postal code */
        postal_code: td_string;
    }
    
    
    /** Portion of the price of a product (e.g., "delivery cost", "tax amount") */
    export interface td_labeledPricePart {
        '@type': 'labeledPricePart';
        /** Label for this portion of the product price */
        label: td_string;
        /** Currency amount in the smallest units of the currency */
        amount: td_int53;
    }
    
    
    /** Product invoice */
    export interface td_invoice {
        '@type': 'invoice';
        /** ISO 4217 currency code */
        currency: td_string;
        /** A list of objects used to calculate the total price of the product */
        price_parts: td_vector<td_labeledPricePart>;
        /** The maximum allowed amount of tip in the smallest units of the currency */
        max_tip_amount: td_int53;
        /** Suggested amounts of tip in the smallest units of the currency */
        suggested_tip_amounts: td_vector<td_int53>;
        /** True, if the payment is a test payment */
        is_test: td_Bool;
        /** True, if the user's name is needed for payment */
        need_name: td_Bool;
        /** True, if the user's phone number is needed for payment */
        need_phone_number: td_Bool;
        /** True, if the user's email address is needed for payment */
        need_email_address: td_Bool;
        /** True, if the user's shipping address is needed for payment */
        need_shipping_address: td_Bool;
        /** True, if the user's phone number will be sent to the provider */
        send_phone_number_to_provider: td_Bool;
        /** True, if the user's email address will be sent to the provider */
        send_email_address_to_provider: td_Bool;
        /** True, if the total price depends on the shipping method */
        is_flexible: td_Bool;
    }
    
    
    /** Order information */
    export interface td_orderInfo {
        '@type': 'orderInfo';
        /** Name of the user */
        name: td_string;
        /** Phone number of the user */
        phone_number: td_string;
        /** Email address of the user */
        email_address: td_string;
        /** Shipping address for this order; may be null */
        shipping_address?: td_address;
    }
    
    
    /** One shipping option */
    export interface td_shippingOption {
        '@type': 'shippingOption';
        /** Shipping option identifier */
        id: td_string;
        /** Option title */
        title: td_string;
        /** A list of objects used to calculate the total shipping costs */
        price_parts: td_vector<td_labeledPricePart>;
    }
    
    
    /** Contains information about saved card credentials */
    export interface td_savedCredentials {
        '@type': 'savedCredentials';
        /** Unique identifier of the saved credentials */
        id: td_string;
        /** Title of the saved credentials */
        title: td_string;
    }
    
    
    /** Applies if a user chooses some previously saved payment credentials. To use their previously saved credentials, the user must have a valid temporary password */
    export interface td_inputCredentialsSaved {
        '@type': 'inputCredentialsSaved';
        /** Identifier of the saved credentials */
        saved_credentials_id: td_string;
    }
    
    
    /** Applies if a user enters new credentials on a payment provider website */
    export interface td_inputCredentialsNew {
        '@type': 'inputCredentialsNew';
        /** JSON-encoded data with the credential identifier from the payment provider */
        data: td_string;
        /** True, if the credential identifier can be saved on the server side */
        allow_save: td_Bool;
    }
    
    
    /** Applies if a user enters new credentials using Apple Pay */
    export interface td_inputCredentialsApplePay {
        '@type': 'inputCredentialsApplePay';
        /** JSON-encoded data with the credential identifier */
        data: td_string;
    }
    
    
    /** Applies if a user enters new credentials using Google Pay */
    export interface td_inputCredentialsGooglePay {
        '@type': 'inputCredentialsGooglePay';
        /** JSON-encoded data with the credential identifier */
        data: td_string;
    }
    
    
    /** Stripe payment provider */
    export interface td_paymentsProviderStripe {
        '@type': 'paymentsProviderStripe';
        /** Stripe API publishable key */
        publishable_key: td_string;
        /** True, if the user country must be provided */
        need_country: td_Bool;
        /** True, if the user ZIP/postal code must be provided */
        need_postal_code: td_Bool;
        /** True, if the cardholder name must be provided */
        need_cardholder_name: td_Bool;
    }
    
    
    /** Theme colors for a payment form */
    export interface td_paymentFormTheme {
        '@type': 'paymentFormTheme';
        /** A color of the payment form background in the RGB24 format */
        background_color: td_int32;
        /** A color of text in the RGB24 format */
        text_color: td_int32;
        /** A color of hints in the RGB24 format */
        hint_color: td_int32;
        /** A color of links in the RGB24 format */
        link_color: td_int32;
        /** A color of the buttons in the RGB24 format */
        button_color: td_int32;
        /** A color of text on the buttons in the RGB24 format */
        button_text_color: td_int32;
    }
    
    
    /** Contains information about an invoice payment form */
    export interface td_paymentForm {
        '@type': 'paymentForm';
        /** The payment form identifier */
        id: td_int64;
        /** Full information of the invoice */
        invoice: td_invoice;
        /** Payment form URL */
        url: td_string;
        /** User identifier of the seller bot */
        seller_bot_user_id: td_int53;
        /** User identifier of the payment provider bot */
        payments_provider_user_id: td_int53;
        /** Information about the payment provider, if available, to support it natively without the need for opening the URL; may be null */
        payments_provider?: td_paymentsProviderStripe;
        /** Saved server-side order information; may be null */
        saved_order_info?: td_orderInfo;
        /** Information about saved card credentials; may be null */
        saved_credentials?: td_savedCredentials;
        /** True, if the user can choose to save credentials */
        can_save_credentials: td_Bool;
        /** True, if the user will be able to save credentials protected by a password they set up */
        need_password: td_Bool;
    }
    
    
    /** Contains a temporary identifier of validated order information, which is stored for one hour. Also contains the available shipping options */
    export interface td_validatedOrderInfo {
        '@type': 'validatedOrderInfo';
        /** Temporary identifier of the order information */
        order_info_id: td_string;
        /** Available shipping options */
        shipping_options: td_vector<td_shippingOption>;
    }
    
    
    /** Contains the result of a payment request */
    export interface td_paymentResult {
        '@type': 'paymentResult';
        /** True, if the payment request was successful; otherwise the verification_url will be non-empty */
        success: td_Bool;
        /** URL for additional payment credentials verification */
        verification_url: td_string;
    }
    
    
    /** Contains information about a successful payment */
    export interface td_paymentReceipt {
        '@type': 'paymentReceipt';
        /** Product title */
        title: td_string;
        /** Contains information about a successful payment */
        description: td_string;
        /** Product photo; may be null */
        photo?: td_photo;
        /** Point in time (Unix timestamp) when the payment was made */
        date: td_int32;
        /** User identifier of the seller bot */
        seller_bot_user_id: td_int53;
        /** User identifier of the payment provider bot */
        payments_provider_user_id: td_int53;
        /** Information about the invoice */
        invoice: td_invoice;
        /** Order information; may be null */
        order_info?: td_orderInfo;
        /** Chosen shipping option; may be null */
        shipping_option?: td_shippingOption;
        /** Title of the saved credentials chosen by the buyer */
        credentials_title: td_string;
        /** The amount of tip chosen by the buyer in the smallest units of the currency */
        tip_amount: td_int53;
    }
    
    
    /** File with the date it was uploaded */
    export interface td_datedFile {
        '@type': 'datedFile';
        /** The file */
        file: td_file;
        /** Point in time (Unix timestamp) when the file was uploaded */
        date: td_int32;
    }
    
    
    /** A Telegram Passport element containing the user's personal details */
    export interface td_passportElementTypePersonalDetails {
        '@type': 'passportElementTypePersonalDetails';
    }
    
    
    /** A Telegram Passport element containing the user's passport */
    export interface td_passportElementTypePassport {
        '@type': 'passportElementTypePassport';
    }
    
    
    /** A Telegram Passport element containing the user's driver license */
    export interface td_passportElementTypeDriverLicense {
        '@type': 'passportElementTypeDriverLicense';
    }
    
    
    /** A Telegram Passport element containing the user's identity card */
    export interface td_passportElementTypeIdentityCard {
        '@type': 'passportElementTypeIdentityCard';
    }
    
    
    /** A Telegram Passport element containing the user's internal passport */
    export interface td_passportElementTypeInternalPassport {
        '@type': 'passportElementTypeInternalPassport';
    }
    
    
    /** A Telegram Passport element containing the user's address */
    export interface td_passportElementTypeAddress {
        '@type': 'passportElementTypeAddress';
    }
    
    
    /** A Telegram Passport element containing the user's utility bill */
    export interface td_passportElementTypeUtilityBill {
        '@type': 'passportElementTypeUtilityBill';
    }
    
    
    /** A Telegram Passport element containing the user's bank statement */
    export interface td_passportElementTypeBankStatement {
        '@type': 'passportElementTypeBankStatement';
    }
    
    
    /** A Telegram Passport element containing the user's rental agreement */
    export interface td_passportElementTypeRentalAgreement {
        '@type': 'passportElementTypeRentalAgreement';
    }
    
    
    /** A Telegram Passport element containing the registration page of the user's passport */
    export interface td_passportElementTypePassportRegistration {
        '@type': 'passportElementTypePassportRegistration';
    }
    
    
    /** A Telegram Passport element containing the user's temporary registration */
    export interface td_passportElementTypeTemporaryRegistration {
        '@type': 'passportElementTypeTemporaryRegistration';
    }
    
    
    /** A Telegram Passport element containing the user's phone number */
    export interface td_passportElementTypePhoneNumber {
        '@type': 'passportElementTypePhoneNumber';
    }
    
    
    /** A Telegram Passport element containing the user's email address */
    export interface td_passportElementTypeEmailAddress {
        '@type': 'passportElementTypeEmailAddress';
    }
    
    
    /** Represents a date according to the Gregorian calendar */
    export interface td_date {
        '@type': 'date';
        /** Day of the month; 1-31 */
        day: td_int32;
        /** Month; 1-12 */
        month: td_int32;
        /** Year; 1-9999 */
        year: td_int32;
    }
    
    
    /** Contains the user's personal details */
    export interface td_personalDetails {
        '@type': 'personalDetails';
        /** First name of the user written in English; 1-255 characters */
        first_name: td_string;
        /** Middle name of the user written in English; 0-255 characters */
        middle_name: td_string;
        /** Last name of the user written in English; 1-255 characters */
        last_name: td_string;
        /** Native first name of the user; 1-255 characters */
        native_first_name: td_string;
        /** Native middle name of the user; 0-255 characters */
        native_middle_name: td_string;
        /** Native last name of the user; 1-255 characters */
        native_last_name: td_string;
        /** Birthdate of the user */
        birthdate: td_date;
        /** Gender of the user, "male" or "female" */
        gender: td_string;
        /** A two-letter ISO 3166-1 alpha-2 country code of the user's country */
        country_code: td_string;
        /** A two-letter ISO 3166-1 alpha-2 country code of the user's residence country */
        residence_country_code: td_string;
    }
    
    
    /** An identity document */
    export interface td_identityDocument {
        '@type': 'identityDocument';
        /** Document number; 1-24 characters */
        number: td_string;
        /** Document expiry date; may be null if not applicable */
        expiry_date?: td_date;
        /** Front side of the document */
        front_side: td_datedFile;
        /** Reverse side of the document; only for driver license and identity card; may be null */
        reverse_side?: td_datedFile;
        /** Selfie with the document; may be null */
        selfie?: td_datedFile;
        /** List of files containing a certified English translation of the document */
        translation: td_vector<td_datedFile>;
    }
    
    
    /** An identity document to be saved to Telegram Passport */
    export interface td_inputIdentityDocument {
        '@type': 'inputIdentityDocument';
        /** Document number; 1-24 characters */
        number: td_string;
        /** Document expiry date; pass null if not applicable */
        expiry_date: td_date;
        /** Front side of the document */
        front_side: td_InputFile;
        /** Reverse side of the document; only for driver license and identity card; pass null otherwise */
        reverse_side: td_InputFile;
        /** Selfie with the document; pass null if unavailable */
        selfie: td_InputFile;
        /** List of files containing a certified English translation of the document */
        translation: td_vector<td_InputFile>;
    }
    
    
    /** A personal document, containing some information about a user */
    export interface td_personalDocument {
        '@type': 'personalDocument';
        /** List of files containing the pages of the document */
        files: td_vector<td_datedFile>;
        /** List of files containing a certified English translation of the document */
        translation: td_vector<td_datedFile>;
    }
    
    
    /** A personal document to be saved to Telegram Passport */
    export interface td_inputPersonalDocument {
        '@type': 'inputPersonalDocument';
        /** List of files containing the pages of the document */
        files: td_vector<td_InputFile>;
        /** List of files containing a certified English translation of the document */
        translation: td_vector<td_InputFile>;
    }
    
    
    /** A Telegram Passport element containing the user's personal details */
    export interface td_passportElementPersonalDetails {
        '@type': 'passportElementPersonalDetails';
        /** Personal details of the user */
        personal_details: td_personalDetails;
    }
    
    
    /** A Telegram Passport element containing the user's passport */
    export interface td_passportElementPassport {
        '@type': 'passportElementPassport';
        /** Passport */
        passport: td_identityDocument;
    }
    
    
    /** A Telegram Passport element containing the user's driver license */
    export interface td_passportElementDriverLicense {
        '@type': 'passportElementDriverLicense';
        /** Driver license */
        driver_license: td_identityDocument;
    }
    
    
    /** A Telegram Passport element containing the user's identity card */
    export interface td_passportElementIdentityCard {
        '@type': 'passportElementIdentityCard';
        /** Identity card */
        identity_card: td_identityDocument;
    }
    
    
    /** A Telegram Passport element containing the user's internal passport */
    export interface td_passportElementInternalPassport {
        '@type': 'passportElementInternalPassport';
        /** Internal passport */
        internal_passport: td_identityDocument;
    }
    
    
    /** A Telegram Passport element containing the user's address */
    export interface td_passportElementAddress {
        '@type': 'passportElementAddress';
        /** Address */
        address: td_address;
    }
    
    
    /** A Telegram Passport element containing the user's utility bill */
    export interface td_passportElementUtilityBill {
        '@type': 'passportElementUtilityBill';
        /** Utility bill */
        utility_bill: td_personalDocument;
    }
    
    
    /** A Telegram Passport element containing the user's bank statement */
    export interface td_passportElementBankStatement {
        '@type': 'passportElementBankStatement';
        /** Bank statement */
        bank_statement: td_personalDocument;
    }
    
    
    /** A Telegram Passport element containing the user's rental agreement */
    export interface td_passportElementRentalAgreement {
        '@type': 'passportElementRentalAgreement';
        /** Rental agreement */
        rental_agreement: td_personalDocument;
    }
    
    
    /** A Telegram Passport element containing the user's passport registration pages */
    export interface td_passportElementPassportRegistration {
        '@type': 'passportElementPassportRegistration';
        /** Passport registration pages */
        passport_registration: td_personalDocument;
    }
    
    
    /** A Telegram Passport element containing the user's temporary registration */
    export interface td_passportElementTemporaryRegistration {
        '@type': 'passportElementTemporaryRegistration';
        /** Temporary registration */
        temporary_registration: td_personalDocument;
    }
    
    
    /** A Telegram Passport element containing the user's phone number */
    export interface td_passportElementPhoneNumber {
        '@type': 'passportElementPhoneNumber';
        /** Phone number */
        phone_number: td_string;
    }
    
    
    /** A Telegram Passport element containing the user's email address */
    export interface td_passportElementEmailAddress {
        '@type': 'passportElementEmailAddress';
        /** Email address */
        email_address: td_string;
    }
    
    
    /** A Telegram Passport element to be saved containing the user's personal details */
    export interface td_inputPassportElementPersonalDetails {
        '@type': 'inputPassportElementPersonalDetails';
        /** Personal details of the user */
        personal_details: td_personalDetails;
    }
    
    
    /** A Telegram Passport element to be saved containing the user's passport */
    export interface td_inputPassportElementPassport {
        '@type': 'inputPassportElementPassport';
        /** The passport to be saved */
        passport: td_inputIdentityDocument;
    }
    
    
    /** A Telegram Passport element to be saved containing the user's driver license */
    export interface td_inputPassportElementDriverLicense {
        '@type': 'inputPassportElementDriverLicense';
        /** The driver license to be saved */
        driver_license: td_inputIdentityDocument;
    }
    
    
    /** A Telegram Passport element to be saved containing the user's identity card */
    export interface td_inputPassportElementIdentityCard {
        '@type': 'inputPassportElementIdentityCard';
        /** The identity card to be saved */
        identity_card: td_inputIdentityDocument;
    }
    
    
    /** A Telegram Passport element to be saved containing the user's internal passport */
    export interface td_inputPassportElementInternalPassport {
        '@type': 'inputPassportElementInternalPassport';
        /** The internal passport to be saved */
        internal_passport: td_inputIdentityDocument;
    }
    
    
    /** A Telegram Passport element to be saved containing the user's address */
    export interface td_inputPassportElementAddress {
        '@type': 'inputPassportElementAddress';
        /** The address to be saved */
        address: td_address;
    }
    
    
    /** A Telegram Passport element to be saved containing the user's utility bill */
    export interface td_inputPassportElementUtilityBill {
        '@type': 'inputPassportElementUtilityBill';
        /** The utility bill to be saved */
        utility_bill: td_inputPersonalDocument;
    }
    
    
    /** A Telegram Passport element to be saved containing the user's bank statement */
    export interface td_inputPassportElementBankStatement {
        '@type': 'inputPassportElementBankStatement';
        /** The bank statement to be saved */
        bank_statement: td_inputPersonalDocument;
    }
    
    
    /** A Telegram Passport element to be saved containing the user's rental agreement */
    export interface td_inputPassportElementRentalAgreement {
        '@type': 'inputPassportElementRentalAgreement';
        /** The rental agreement to be saved */
        rental_agreement: td_inputPersonalDocument;
    }
    
    
    /** A Telegram Passport element to be saved containing the user's passport registration */
    export interface td_inputPassportElementPassportRegistration {
        '@type': 'inputPassportElementPassportRegistration';
        /** The passport registration page to be saved */
        passport_registration: td_inputPersonalDocument;
    }
    
    
    /** A Telegram Passport element to be saved containing the user's temporary registration */
    export interface td_inputPassportElementTemporaryRegistration {
        '@type': 'inputPassportElementTemporaryRegistration';
        /** The temporary registration document to be saved */
        temporary_registration: td_inputPersonalDocument;
    }
    
    
    /** A Telegram Passport element to be saved containing the user's phone number */
    export interface td_inputPassportElementPhoneNumber {
        '@type': 'inputPassportElementPhoneNumber';
        /** The phone number to be saved */
        phone_number: td_string;
    }
    
    
    /** A Telegram Passport element to be saved containing the user's email address */
    export interface td_inputPassportElementEmailAddress {
        '@type': 'inputPassportElementEmailAddress';
        /** The email address to be saved */
        email_address: td_string;
    }
    
    
    /** Contains information about saved Telegram Passport elements */
    export interface td_passportElements {
        '@type': 'passportElements';
        /** Telegram Passport elements */
        elements: td_vector<td_PassportElement>;
    }
    
    
    /** The element contains an error in an unspecified place. The error will be considered resolved when new data is added */
    export interface td_passportElementErrorSourceUnspecified {
        '@type': 'passportElementErrorSourceUnspecified';
    }
    
    
    /** One of the data fields contains an error. The error will be considered resolved when the value of the field changes */
    export interface td_passportElementErrorSourceDataField {
        '@type': 'passportElementErrorSourceDataField';
        /** Field name */
        field_name: td_string;
    }
    
    
    /** The front side of the document contains an error. The error will be considered resolved when the file with the front side changes */
    export interface td_passportElementErrorSourceFrontSide {
        '@type': 'passportElementErrorSourceFrontSide';
    }
    
    
    /** The reverse side of the document contains an error. The error will be considered resolved when the file with the reverse side changes */
    export interface td_passportElementErrorSourceReverseSide {
        '@type': 'passportElementErrorSourceReverseSide';
    }
    
    
    /** The selfie with the document contains an error. The error will be considered resolved when the file with the selfie changes */
    export interface td_passportElementErrorSourceSelfie {
        '@type': 'passportElementErrorSourceSelfie';
    }
    
    
    /** One of files with the translation of the document contains an error. The error will be considered resolved when the file changes */
    export interface td_passportElementErrorSourceTranslationFile {
        '@type': 'passportElementErrorSourceTranslationFile';
        /** Index of a file with the error */
        file_index: td_int32;
    }
    
    
    /** The translation of the document contains an error. The error will be considered resolved when the list of translation files changes */
    export interface td_passportElementErrorSourceTranslationFiles {
        '@type': 'passportElementErrorSourceTranslationFiles';
    }
    
    
    /** The file contains an error. The error will be considered resolved when the file changes */
    export interface td_passportElementErrorSourceFile {
        '@type': 'passportElementErrorSourceFile';
        /** Index of a file with the error */
        file_index: td_int32;
    }
    
    
    /** The list of attached files contains an error. The error will be considered resolved when the list of files changes */
    export interface td_passportElementErrorSourceFiles {
        '@type': 'passportElementErrorSourceFiles';
    }
    
    
    /** Contains the description of an error in a Telegram Passport element */
    export interface td_passportElementError {
        '@type': 'passportElementError';
        /** Type of the Telegram Passport element which has the error */
        type: td_PassportElementType;
        /** Error message */
        message: td_string;
        /** Error source */
        source: td_PassportElementErrorSource;
    }
    
    
    /** Contains information about a Telegram Passport element that was requested by a service */
    export interface td_passportSuitableElement {
        '@type': 'passportSuitableElement';
        /** Type of the element */
        type: td_PassportElementType;
        /** True, if a selfie is required with the identity document */
        is_selfie_required: td_Bool;
        /** True, if a certified English translation is required with the document */
        is_translation_required: td_Bool;
        /** True, if personal details must include the user's name in the language of their country of residence */
        is_native_name_required: td_Bool;
    }
    
    
    /** Contains a description of the required Telegram Passport element that was requested by a service */
    export interface td_passportRequiredElement {
        '@type': 'passportRequiredElement';
        /** List of Telegram Passport elements any of which is enough to provide */
        suitable_elements: td_vector<td_passportSuitableElement>;
    }
    
    
    /** Contains information about a Telegram Passport authorization form that was requested */
    export interface td_passportAuthorizationForm {
        '@type': 'passportAuthorizationForm';
        /** Unique identifier of the authorization form */
        id: td_int32;
        /** Telegram Passport elements that must be provided to complete the form */
        required_elements: td_vector<td_passportRequiredElement>;
        /** URL for the privacy policy of the service; may be empty */
        privacy_policy_url: td_string;
    }
    
    
    /** Contains information about a Telegram Passport elements and corresponding errors */
    export interface td_passportElementsWithErrors {
        '@type': 'passportElementsWithErrors';
        /** Telegram Passport elements */
        elements: td_vector<td_PassportElement>;
        /** Errors in the elements that are already available */
        errors: td_vector<td_passportElementError>;
    }
    
    
    /** Contains encrypted Telegram Passport data credentials */
    export interface td_encryptedCredentials {
        '@type': 'encryptedCredentials';
        /** The encrypted credentials */
        data: td_bytes;
        /** The decrypted data hash */
        hash: td_bytes;
        /** Secret for data decryption, encrypted with the service's public key */
        secret: td_bytes;
    }
    
    
    /** Contains information about an encrypted Telegram Passport element; for bots only */
    export interface td_encryptedPassportElement {
        '@type': 'encryptedPassportElement';
        /** Type of Telegram Passport element */
        type: td_PassportElementType;
        /** Encrypted JSON-encoded data about the user */
        data: td_bytes;
        /** The front side of an identity document */
        front_side: td_datedFile;
        /** The reverse side of an identity document; may be null */
        reverse_side?: td_datedFile;
        /** Selfie with the document; may be null */
        selfie?: td_datedFile;
        /** List of files containing a certified English translation of the document */
        translation: td_vector<td_datedFile>;
        /** List of attached files */
        files: td_vector<td_datedFile>;
        /** Unencrypted data, phone number or email address */
        value: td_string;
        /** Hash of the entire element */
        hash: td_string;
    }
    
    
    /** The element contains an error in an unspecified place. The error will be considered resolved when new data is added */
    export interface td_inputPassportElementErrorSourceUnspecified {
        '@type': 'inputPassportElementErrorSourceUnspecified';
        /** Current hash of the entire element */
        element_hash: td_bytes;
    }
    
    
    /** A data field contains an error. The error is considered resolved when the field's value changes */
    export interface td_inputPassportElementErrorSourceDataField {
        '@type': 'inputPassportElementErrorSourceDataField';
        /** Field name */
        field_name: td_string;
        /** Current data hash */
        data_hash: td_bytes;
    }
    
    
    /** The front side of the document contains an error. The error is considered resolved when the file with the front side of the document changes */
    export interface td_inputPassportElementErrorSourceFrontSide {
        '@type': 'inputPassportElementErrorSourceFrontSide';
        /** Current hash of the file containing the front side */
        file_hash: td_bytes;
    }
    
    
    /** The reverse side of the document contains an error. The error is considered resolved when the file with the reverse side of the document changes */
    export interface td_inputPassportElementErrorSourceReverseSide {
        '@type': 'inputPassportElementErrorSourceReverseSide';
        /** Current hash of the file containing the reverse side */
        file_hash: td_bytes;
    }
    
    
    /** The selfie contains an error. The error is considered resolved when the file with the selfie changes */
    export interface td_inputPassportElementErrorSourceSelfie {
        '@type': 'inputPassportElementErrorSourceSelfie';
        /** Current hash of the file containing the selfie */
        file_hash: td_bytes;
    }
    
    
    /** One of the files containing the translation of the document contains an error. The error is considered resolved when the file with the translation changes */
    export interface td_inputPassportElementErrorSourceTranslationFile {
        '@type': 'inputPassportElementErrorSourceTranslationFile';
        /** Current hash of the file containing the translation */
        file_hash: td_bytes;
    }
    
    
    /** The translation of the document contains an error. The error is considered resolved when the list of files changes */
    export interface td_inputPassportElementErrorSourceTranslationFiles {
        '@type': 'inputPassportElementErrorSourceTranslationFiles';
        /** Current hashes of all files with the translation */
        file_hashes: td_vector<td_bytes>;
    }
    
    
    /** The file contains an error. The error is considered resolved when the file changes */
    export interface td_inputPassportElementErrorSourceFile {
        '@type': 'inputPassportElementErrorSourceFile';
        /** Current hash of the file which has the error */
        file_hash: td_bytes;
    }
    
    
    /** The list of attached files contains an error. The error is considered resolved when the file list changes */
    export interface td_inputPassportElementErrorSourceFiles {
        '@type': 'inputPassportElementErrorSourceFiles';
        /** Current hashes of all attached files */
        file_hashes: td_vector<td_bytes>;
    }
    
    
    /** Contains the description of an error in a Telegram Passport element; for bots only */
    export interface td_inputPassportElementError {
        '@type': 'inputPassportElementError';
        /** Type of Telegram Passport element that has the error */
        type: td_PassportElementType;
        /** Error message */
        message: td_string;
        /** Error source */
        source: td_InputPassportElementErrorSource;
    }
    
    
    /** A text message */
    export interface td_messageText {
        '@type': 'messageText';
        /** Text of the message */
        text: td_formattedText;
        /** A preview of the web page that's mentioned in the text; may be null */
        web_page?: td_webPage;
    }
    
    
    /** An animation message (GIF-style). */
    export interface td_messageAnimation {
        '@type': 'messageAnimation';
        /** The animation description */
        animation: td_animation;
        /** Animation caption */
        caption: td_formattedText;
        /** True, if the animation thumbnail must be blurred and the animation must be shown only while tapped */
        is_secret: td_Bool;
    }
    
    
    /** An audio message */
    export interface td_messageAudio {
        '@type': 'messageAudio';
        /** The audio description */
        audio: td_audio;
        /** Audio caption */
        caption: td_formattedText;
    }
    
    
    /** A document message (general file) */
    export interface td_messageDocument {
        '@type': 'messageDocument';
        /** The document description */
        document: td_document;
        /** Document caption */
        caption: td_formattedText;
    }
    
    
    /** A photo message */
    export interface td_messagePhoto {
        '@type': 'messagePhoto';
        /** The photo description */
        photo: td_photo;
        /** Photo caption */
        caption: td_formattedText;
        /** True, if the photo must be blurred and must be shown only while tapped */
        is_secret: td_Bool;
    }
    
    
    /** An expired photo message (self-destructed after TTL has elapsed) */
    export interface td_messageExpiredPhoto {
        '@type': 'messageExpiredPhoto';
    }
    
    
    /** A sticker message */
    export interface td_messageSticker {
        '@type': 'messageSticker';
        /** The sticker description */
        sticker: td_sticker;
    }
    
    
    /** A video message */
    export interface td_messageVideo {
        '@type': 'messageVideo';
        /** The video description */
        video: td_video;
        /** Video caption */
        caption: td_formattedText;
        /** True, if the video thumbnail must be blurred and the video must be shown only while tapped */
        is_secret: td_Bool;
    }
    
    
    /** An expired video message (self-destructed after TTL has elapsed) */
    export interface td_messageExpiredVideo {
        '@type': 'messageExpiredVideo';
    }
    
    
    /** A video note message */
    export interface td_messageVideoNote {
        '@type': 'messageVideoNote';
        /** The video note description */
        video_note: td_videoNote;
        /** True, if at least one of the recipients has viewed the video note */
        is_viewed: td_Bool;
        /** True, if the video note thumbnail must be blurred and the video note must be shown only while tapped */
        is_secret: td_Bool;
    }
    
    
    /** A voice note message */
    export interface td_messageVoiceNote {
        '@type': 'messageVoiceNote';
        /** The voice note description */
        voice_note: td_voiceNote;
        /** Voice note caption */
        caption: td_formattedText;
        /** True, if at least one of the recipients has listened to the voice note */
        is_listened: td_Bool;
    }
    
    
    /** A message with a location */
    export interface td_messageLocation {
        '@type': 'messageLocation';
        /** The location description */
        location: td_location;
        /** Time relative to the message send date, for which the location can be updated, in seconds */
        live_period: td_int32;
        /** Left time for which the location can be updated, in seconds. updateMessageContent is not sent when this field changes */
        expires_in: td_int32;
        /** For live locations, a direction in which the location moves, in degrees; 1-360. If 0 the direction is unknown */
        heading: td_int32;
        /** For live locations, a maximum distance to another chat member for proximity alerts, in meters (0-100000). 0 if the notification is disabled. Available only for the message sender */
        proximity_alert_radius: td_int32;
    }
    
    
    /** A message with information about a venue */
    export interface td_messageVenue {
        '@type': 'messageVenue';
        /** The venue description */
        venue: td_venue;
    }
    
    
    /** A message with a user contact */
    export interface td_messageContact {
        '@type': 'messageContact';
        /** The contact description */
        contact: td_contact;
    }
    
    
    /** A message with an animated emoji */
    export interface td_messageAnimatedEmoji {
        '@type': 'messageAnimatedEmoji';
        /** The animated emoji */
        animated_emoji: td_animatedEmoji;
        /** The corresponding emoji */
        emoji: td_string;
    }
    
    
    /** A dice message. The dice value is randomly generated by the server */
    export interface td_messageDice {
        '@type': 'messageDice';
        /** The animated stickers with the initial dice animation; may be null if unknown. updateMessageContent will be sent when the sticker became known */
        initial_state?: td_DiceStickers;
        /** The animated stickers with the final dice animation; may be null if unknown. updateMessageContent will be sent when the sticker became known */
        final_state?: td_DiceStickers;
        /** Emoji on which the dice throw animation is based */
        emoji: td_string;
        /** The dice value. If the value is 0, the dice don't have final state yet */
        value: td_int32;
        /** Number of frame after which a success animation like a shower of confetti needs to be shown on updateMessageSendSucceeded */
        success_animation_frame_number: td_int32;
    }
    
    
    /** A message with a game */
    export interface td_messageGame {
        '@type': 'messageGame';
        /** The game description */
        game: td_game;
    }
    
    
    /** A message with a poll */
    export interface td_messagePoll {
        '@type': 'messagePoll';
        /** The poll description */
        poll: td_poll;
    }
    
    
    /** A message with an invoice from a bot */
    export interface td_messageInvoice {
        '@type': 'messageInvoice';
        /** Product title */
        title: td_string;
        /** A message with an invoice from a bot */
        description: td_string;
        /** Product photo; may be null */
        photo?: td_photo;
        /** Currency for the product price */
        currency: td_string;
        /** Product total price in the smallest units of the currency */
        total_amount: td_int53;
        /** Unique invoice bot start_parameter. To share an invoice use the URL https://t.me/{bot_username}?start={start_parameter} */
        start_parameter: td_string;
        /** True, if the invoice is a test invoice */
        is_test: td_Bool;
        /** True, if the shipping address must be specified */
        need_shipping_address: td_Bool;
        /** The identifier of the message with the receipt, after the product has been purchased */
        receipt_message_id: td_int53;
    }
    
    
    /** A message with information about an ended call */
    export interface td_messageCall {
        '@type': 'messageCall';
        /** True, if the call was a video call */
        is_video: td_Bool;
        /** Reason why the call was discarded */
        discard_reason: td_CallDiscardReason;
        /** Call duration, in seconds */
        duration: td_int32;
    }
    
    
    /** A new video chat was scheduled */
    export interface td_messageVideoChatScheduled {
        '@type': 'messageVideoChatScheduled';
        /** Identifier of the video chat. The video chat can be received through the method getGroupCall */
        group_call_id: td_int32;
        /** Point in time (Unix timestamp) when the group call is supposed to be started by an administrator */
        start_date: td_int32;
    }
    
    
    /** A newly created video chat */
    export interface td_messageVideoChatStarted {
        '@type': 'messageVideoChatStarted';
        /** Identifier of the video chat. The video chat can be received through the method getGroupCall */
        group_call_id: td_int32;
    }
    
    
    /** A message with information about an ended video chat */
    export interface td_messageVideoChatEnded {
        '@type': 'messageVideoChatEnded';
        /** Call duration, in seconds */
        duration: td_int32;
    }
    
    
    /** A message with information about an invite to a video chat */
    export interface td_messageInviteVideoChatParticipants {
        '@type': 'messageInviteVideoChatParticipants';
        /** Identifier of the video chat. The video chat can be received through the method getGroupCall */
        group_call_id: td_int32;
        /** Invited user identifiers */
        user_ids: td_vector<td_int53>;
    }
    
    
    /** A newly created basic group */
    export interface td_messageBasicGroupChatCreate {
        '@type': 'messageBasicGroupChatCreate';
        /** Title of the basic group */
        title: td_string;
        /** User identifiers of members in the basic group */
        member_user_ids: td_vector<td_int53>;
    }
    
    
    /** A newly created supergroup or channel */
    export interface td_messageSupergroupChatCreate {
        '@type': 'messageSupergroupChatCreate';
        /** Title of the supergroup or channel */
        title: td_string;
    }
    
    
    /** An updated chat title */
    export interface td_messageChatChangeTitle {
        '@type': 'messageChatChangeTitle';
        /** New chat title */
        title: td_string;
    }
    
    
    /** An updated chat photo */
    export interface td_messageChatChangePhoto {
        '@type': 'messageChatChangePhoto';
        /** New chat photo */
        photo: td_chatPhoto;
    }
    
    
    /** A deleted chat photo */
    export interface td_messageChatDeletePhoto {
        '@type': 'messageChatDeletePhoto';
    }
    
    
    /** New chat members were added */
    export interface td_messageChatAddMembers {
        '@type': 'messageChatAddMembers';
        /** User identifiers of the new members */
        member_user_ids: td_vector<td_int53>;
    }
    
    
    /** A new member joined the chat via an invite link */
    export interface td_messageChatJoinByLink {
        '@type': 'messageChatJoinByLink';
    }
    
    
    /** A new member was accepted to the chat by an administrator */
    export interface td_messageChatJoinByRequest {
        '@type': 'messageChatJoinByRequest';
    }
    
    
    /** A chat member was deleted */
    export interface td_messageChatDeleteMember {
        '@type': 'messageChatDeleteMember';
        /** User identifier of the deleted chat member */
        user_id: td_int53;
    }
    
    
    /** A basic group was upgraded to a supergroup and was deactivated as the result */
    export interface td_messageChatUpgradeTo {
        '@type': 'messageChatUpgradeTo';
        /** Identifier of the supergroup to which the basic group was upgraded */
        supergroup_id: td_int53;
    }
    
    
    /** A supergroup has been created from a basic group */
    export interface td_messageChatUpgradeFrom {
        '@type': 'messageChatUpgradeFrom';
        /** Title of the newly created supergroup */
        title: td_string;
        /** The identifier of the original basic group */
        basic_group_id: td_int53;
    }
    
    
    /** A message has been pinned */
    export interface td_messagePinMessage {
        '@type': 'messagePinMessage';
        /** Identifier of the pinned message, can be an identifier of a deleted message or 0 */
        message_id: td_int53;
    }
    
    
    /** A screenshot of a message in the chat has been taken */
    export interface td_messageScreenshotTaken {
        '@type': 'messageScreenshotTaken';
    }
    
    
    /** A theme in the chat has been changed */
    export interface td_messageChatSetTheme {
        '@type': 'messageChatSetTheme';
        /** If non-empty, name of a new theme, set for the chat. Otherwise chat theme was reset to the default one */
        theme_name: td_string;
    }
    
    
    /** The TTL (Time To Live) setting for messages in the chat has been changed */
    export interface td_messageChatSetTtl {
        '@type': 'messageChatSetTtl';
        /** New message TTL */
        ttl: td_int32;
    }
    
    
    /** A non-standard action has happened in the chat */
    export interface td_messageCustomServiceAction {
        '@type': 'messageCustomServiceAction';
        /** Message text to be shown in the chat */
        text: td_string;
    }
    
    
    /** A new high score was achieved in a game */
    export interface td_messageGameScore {
        '@type': 'messageGameScore';
        /** Identifier of the message with the game, can be an identifier of a deleted message */
        game_message_id: td_int53;
        /** Identifier of the game; may be different from the games presented in the message with the game */
        game_id: td_int64;
        /** New score */
        score: td_int32;
    }
    
    
    /** A payment has been completed */
    export interface td_messagePaymentSuccessful {
        '@type': 'messagePaymentSuccessful';
        /** Identifier of the chat, containing the corresponding invoice message; 0 if unknown */
        invoice_chat_id: td_int53;
        /** Identifier of the message with the corresponding invoice; can be an identifier of a deleted message */
        invoice_message_id: td_int53;
        /** Currency for the price of the product */
        currency: td_string;
        /** Total price for the product, in the smallest units of the currency */
        total_amount: td_int53;
    }
    
    
    /** A payment has been completed; for bots only */
    export interface td_messagePaymentSuccessfulBot {
        '@type': 'messagePaymentSuccessfulBot';
        /** Currency for price of the product */
        currency: td_string;
        /** Total price for the product, in the smallest units of the currency */
        total_amount: td_int53;
        /** Invoice payload */
        invoice_payload: td_bytes;
        /** Identifier of the shipping option chosen by the user; may be empty if not applicable */
        shipping_option_id: td_string;
        /** Information about the order; may be null */
        order_info?: td_orderInfo;
        /** Telegram payment identifier */
        telegram_payment_charge_id: td_string;
        /** Provider payment identifier */
        provider_payment_charge_id: td_string;
    }
    
    
    /** A contact has registered with Telegram */
    export interface td_messageContactRegistered {
        '@type': 'messageContactRegistered';
    }
    
    
    /** The current user has connected a website by logging in using Telegram Login Widget on it */
    export interface td_messageWebsiteConnected {
        '@type': 'messageWebsiteConnected';
        /** Domain name of the connected website */
        domain_name: td_string;
    }
    
    
    /** Telegram Passport data has been sent */
    export interface td_messagePassportDataSent {
        '@type': 'messagePassportDataSent';
        /** List of Telegram Passport element types sent */
        types: td_vector<td_PassportElementType>;
    }
    
    
    /** Telegram Passport data has been received; for bots only */
    export interface td_messagePassportDataReceived {
        '@type': 'messagePassportDataReceived';
        /** List of received Telegram Passport elements */
        elements: td_vector<td_encryptedPassportElement>;
        /** Encrypted data credentials */
        credentials: td_encryptedCredentials;
    }
    
    
    /** A user in the chat came within proximity alert range */
    export interface td_messageProximityAlertTriggered {
        '@type': 'messageProximityAlertTriggered';
        /** The identifier of a user or chat that triggered the proximity alert */
        traveler_id: td_MessageSender;
        /** The identifier of a user or chat that subscribed for the proximity alert */
        watcher_id: td_MessageSender;
        /** The distance between the users */
        distance: td_int32;
    }
    
    
    /** Message content that is not supported in the current TDLib version */
    export interface td_messageUnsupported {
        '@type': 'messageUnsupported';
    }
    
    
    /** A mention of a user by their username */
    export interface td_textEntityTypeMention {
        '@type': 'textEntityTypeMention';
    }
    
    
    /** A hashtag text, beginning with "#" */
    export interface td_textEntityTypeHashtag {
        '@type': 'textEntityTypeHashtag';
    }
    
    
    /** A cashtag text, beginning with "$" and consisting of capital English letters (e.g., "$USD") */
    export interface td_textEntityTypeCashtag {
        '@type': 'textEntityTypeCashtag';
    }
    
    
    /** A bot command, beginning with "/" */
    export interface td_textEntityTypeBotCommand {
        '@type': 'textEntityTypeBotCommand';
    }
    
    
    /** An HTTP URL */
    export interface td_textEntityTypeUrl {
        '@type': 'textEntityTypeUrl';
    }
    
    
    /** An email address */
    export interface td_textEntityTypeEmailAddress {
        '@type': 'textEntityTypeEmailAddress';
    }
    
    
    /** A phone number */
    export interface td_textEntityTypePhoneNumber {
        '@type': 'textEntityTypePhoneNumber';
    }
    
    
    /** A bank card number. The getBankCardInfo method can be used to get information about the bank card */
    export interface td_textEntityTypeBankCardNumber {
        '@type': 'textEntityTypeBankCardNumber';
    }
    
    
    /** A bold text */
    export interface td_textEntityTypeBold {
        '@type': 'textEntityTypeBold';
    }
    
    
    /** An italic text */
    export interface td_textEntityTypeItalic {
        '@type': 'textEntityTypeItalic';
    }
    
    
    /** An underlined text */
    export interface td_textEntityTypeUnderline {
        '@type': 'textEntityTypeUnderline';
    }
    
    
    /** A strikethrough text */
    export interface td_textEntityTypeStrikethrough {
        '@type': 'textEntityTypeStrikethrough';
    }
    
    
    /** A spoiler text. Not supported in secret chats */
    export interface td_textEntityTypeSpoiler {
        '@type': 'textEntityTypeSpoiler';
    }
    
    
    /** Text that must be formatted as if inside a code HTML tag */
    export interface td_textEntityTypeCode {
        '@type': 'textEntityTypeCode';
    }
    
    
    /** Text that must be formatted as if inside a pre HTML tag */
    export interface td_textEntityTypePre {
        '@type': 'textEntityTypePre';
    }
    
    
    /** Text that must be formatted as if inside pre, and code HTML tags */
    export interface td_textEntityTypePreCode {
        '@type': 'textEntityTypePreCode';
        /** Programming language of the code; as defined by the sender */
        language: td_string;
    }
    
    
    /** A text description shown instead of a raw URL */
    export interface td_textEntityTypeTextUrl {
        '@type': 'textEntityTypeTextUrl';
        /** HTTP or tg:// URL to be opened when the link is clicked */
        url: td_string;
    }
    
    
    /** A text shows instead of a raw mention of the user (e.g., when the user has no username) */
    export interface td_textEntityTypeMentionName {
        '@type': 'textEntityTypeMentionName';
        /** Identifier of the mentioned user */
        user_id: td_int53;
    }
    
    
    /** A media timestamp */
    export interface td_textEntityTypeMediaTimestamp {
        '@type': 'textEntityTypeMediaTimestamp';
        /** Timestamp from which a video/audio/video note/voice note playing must start, in seconds. The media can be in the content or the web page preview of the current message, or in the same places in the replied message */
        media_timestamp: td_int32;
    }
    
    
    /** A thumbnail to be sent along with a file; must be in JPEG or WEBP format for stickers, and less than 200 KB in size */
    export interface td_inputThumbnail {
        '@type': 'inputThumbnail';
        /** Thumbnail file to send. Sending thumbnails by file_id is currently not supported */
        thumbnail: td_InputFile;
        /** Thumbnail width, usually shouldn't exceed 320. Use 0 if unknown */
        width: td_int32;
        /** Thumbnail height, usually shouldn't exceed 320. Use 0 if unknown */
        height: td_int32;
    }
    
    
    /** The message will be sent at the specified date */
    export interface td_messageSchedulingStateSendAtDate {
        '@type': 'messageSchedulingStateSendAtDate';
        /** Date the message will be sent. The date must be within 367 days in the future */
        send_date: td_int32;
    }
    
    
    /** The message will be sent when the peer will be online. Applicable to private chats only and when the exact online status of the peer is known */
    export interface td_messageSchedulingStateSendWhenOnline {
        '@type': 'messageSchedulingStateSendWhenOnline';
    }
    
    
    /** Options to be used when a message is sent */
    export interface td_messageSendOptions {
        '@type': 'messageSendOptions';
        /** Pass true to disable notification for the message */
        disable_notification: td_Bool;
        /** Pass true if the message is sent from the background */
        from_background: td_Bool;
        /** Pass true if the content of the message must be protected from forwarding and saving; for bots only */
        protect_content: td_Bool;
        /** Message scheduling state; pass null to send message immediately. Messages sent to a secret chat, live location messages and self-destructing messages can't be scheduled */
        scheduling_state: td_MessageSchedulingState;
    }
    
    
    /** Options to be used when a message content is copied without reference to the original sender. Service messages and messageInvoice can't be copied */
    export interface td_messageCopyOptions {
        '@type': 'messageCopyOptions';
        /** True, if content of the message needs to be copied without reference to the original sender. Always true if the message is forwarded to a secret chat or is local */
        send_copy: td_Bool;
        /** True, if media caption of the message copy needs to be replaced. Ignored if send_copy is false */
        replace_caption: td_Bool;
        /** New message caption; pass null to copy message without caption. Ignored if replace_caption is false */
        new_caption: td_formattedText;
    }
    
    
    /** A text message */
    export interface td_inputMessageText {
        '@type': 'inputMessageText';
        /** Formatted text to be sent; 1-GetOption("message_text_length_max") characters. Only Bold, Italic, Underline, Strikethrough, Spoiler, Code, Pre, PreCode, TextUrl and MentionName entities are allowed to be specified manually */
        text: td_formattedText;
        /** True, if rich web page previews for URLs in the message text must be disabled */
        disable_web_page_preview: td_Bool;
        /** True, if a chat message draft must be deleted */
        clear_draft: td_Bool;
    }
    
    
    /** An animation message (GIF-style). */
    export interface td_inputMessageAnimation {
        '@type': 'inputMessageAnimation';
        /** Animation file to be sent */
        animation: td_InputFile;
        /** Animation thumbnail; pass null to skip thumbnail uploading */
        thumbnail: td_inputThumbnail;
        /** File identifiers of the stickers added to the animation, if applicable */
        added_sticker_file_ids: td_vector<td_int32>;
        /** Duration of the animation, in seconds */
        duration: td_int32;
        /** Width of the animation; may be replaced by the server */
        width: td_int32;
        /** Height of the animation; may be replaced by the server */
        height: td_int32;
        /** Animation caption; pass null to use an empty caption; 0-GetOption("message_caption_length_max") characters */
        caption: td_formattedText;
    }
    
    
    /** An audio message */
    export interface td_inputMessageAudio {
        '@type': 'inputMessageAudio';
        /** Audio file to be sent */
        audio: td_InputFile;
        /** Thumbnail of the cover for the album; pass null to skip thumbnail uploading */
        album_cover_thumbnail: td_inputThumbnail;
        /** Duration of the audio, in seconds; may be replaced by the server */
        duration: td_int32;
        /** Title of the audio; 0-64 characters; may be replaced by the server */
        title: td_string;
        /** Performer of the audio; 0-64 characters, may be replaced by the server */
        performer: td_string;
        /** Audio caption; pass null to use an empty caption; 0-GetOption("message_caption_length_max") characters */
        caption: td_formattedText;
    }
    
    
    /** A document message (general file) */
    export interface td_inputMessageDocument {
        '@type': 'inputMessageDocument';
        /** Document to be sent */
        document: td_InputFile;
        /** Document thumbnail; pass null to skip thumbnail uploading */
        thumbnail: td_inputThumbnail;
        /** If true, automatic file type detection will be disabled and the document will be always sent as file. Always true for files sent to secret chats */
        disable_content_type_detection: td_Bool;
        /** Document caption; pass null to use an empty caption; 0-GetOption("message_caption_length_max") characters */
        caption: td_formattedText;
    }
    
    
    /** A photo message */
    export interface td_inputMessagePhoto {
        '@type': 'inputMessagePhoto';
        /** Photo to send */
        photo: td_InputFile;
        /** Photo thumbnail to be sent; pass null to skip thumbnail uploading. The thumbnail is sent to the other party only in secret chats */
        thumbnail: td_inputThumbnail;
        /** File identifiers of the stickers added to the photo, if applicable */
        added_sticker_file_ids: td_vector<td_int32>;
        /** Photo width */
        width: td_int32;
        /** Photo height */
        height: td_int32;
        /** Photo caption; pass null to use an empty caption; 0-GetOption("message_caption_length_max") characters */
        caption: td_formattedText;
        /** Photo TTL (Time To Live), in seconds (0-60). A non-zero TTL can be specified only in private chats */
        ttl: td_int32;
    }
    
    
    /** A sticker message */
    export interface td_inputMessageSticker {
        '@type': 'inputMessageSticker';
        /** Sticker to be sent */
        sticker: td_InputFile;
        /** Sticker thumbnail; pass null to skip thumbnail uploading */
        thumbnail: td_inputThumbnail;
        /** Sticker width */
        width: td_int32;
        /** Sticker height */
        height: td_int32;
        /** Emoji used to choose the sticker */
        emoji: td_string;
    }
    
    
    /** A video message */
    export interface td_inputMessageVideo {
        '@type': 'inputMessageVideo';
        /** Video to be sent */
        video: td_InputFile;
        /** Video thumbnail; pass null to skip thumbnail uploading */
        thumbnail: td_inputThumbnail;
        /** File identifiers of the stickers added to the video, if applicable */
        added_sticker_file_ids: td_vector<td_int32>;
        /** Duration of the video, in seconds */
        duration: td_int32;
        /** Video width */
        width: td_int32;
        /** Video height */
        height: td_int32;
        /** True, if the video is supposed to be streamed */
        supports_streaming: td_Bool;
        /** Video caption; pass null to use an empty caption; 0-GetOption("message_caption_length_max") characters */
        caption: td_formattedText;
        /** Video TTL (Time To Live), in seconds (0-60). A non-zero TTL can be specified only in private chats */
        ttl: td_int32;
    }
    
    
    /** A video note message */
    export interface td_inputMessageVideoNote {
        '@type': 'inputMessageVideoNote';
        /** Video note to be sent */
        video_note: td_InputFile;
        /** Video thumbnail; pass null to skip thumbnail uploading */
        thumbnail: td_inputThumbnail;
        /** Duration of the video, in seconds */
        duration: td_int32;
        /** Video width and height; must be positive and not greater than 640 */
        length: td_int32;
    }
    
    
    /** A voice note message */
    export interface td_inputMessageVoiceNote {
        '@type': 'inputMessageVoiceNote';
        /** Voice note to be sent */
        voice_note: td_InputFile;
        /** Duration of the voice note, in seconds */
        duration: td_int32;
        /** Waveform representation of the voice note, in 5-bit format */
        waveform: td_bytes;
        /** Voice note caption; pass null to use an empty caption; 0-GetOption("message_caption_length_max") characters */
        caption: td_formattedText;
    }
    
    
    /** A message with a location */
    export interface td_inputMessageLocation {
        '@type': 'inputMessageLocation';
        /** Location to be sent */
        location: td_location;
        /** Period for which the location can be updated, in seconds; must be between 60 and 86400 for a live location and 0 otherwise */
        live_period: td_int32;
        /** For live locations, a direction in which the location moves, in degrees; 1-360. Pass 0 if unknown */
        heading: td_int32;
        /** For live locations, a maximum distance to another chat member for proximity alerts, in meters (0-100000). Pass 0 if the notification is disabled. Can't be enabled in channels and Saved Messages */
        proximity_alert_radius: td_int32;
    }
    
    
    /** A message with information about a venue */
    export interface td_inputMessageVenue {
        '@type': 'inputMessageVenue';
        /** Venue to send */
        venue: td_venue;
    }
    
    
    /** A message containing a user contact */
    export interface td_inputMessageContact {
        '@type': 'inputMessageContact';
        /** Contact to send */
        contact: td_contact;
    }
    
    
    /** A dice message */
    export interface td_inputMessageDice {
        '@type': 'inputMessageDice';
        /** Emoji on which the dice throw animation is based */
        emoji: td_string;
        /** True, if the chat message draft must be deleted */
        clear_draft: td_Bool;
    }
    
    
    /** A message with a game; not supported for channels or secret chats */
    export interface td_inputMessageGame {
        '@type': 'inputMessageGame';
        /** User identifier of the bot that owns the game */
        bot_user_id: td_int53;
        /** Short name of the game */
        game_short_name: td_string;
    }
    
    
    /** A message with an invoice; can be used only by bots */
    export interface td_inputMessageInvoice {
        '@type': 'inputMessageInvoice';
        /** Invoice */
        invoice: td_invoice;
        /** Product title; 1-32 characters */
        title: td_string;
        /** A message with an invoice; can be used only by bots */
        description: td_string;
        /** Product photo URL; optional */
        photo_url: td_string;
        /** Product photo size */
        photo_size: td_int32;
        /** Product photo width */
        photo_width: td_int32;
        /** Product photo height */
        photo_height: td_int32;
        /** The invoice payload */
        payload: td_bytes;
        /** Payment provider token */
        provider_token: td_string;
        /** JSON-encoded data about the invoice, which will be shared with the payment provider */
        provider_data: td_string;
        /** Unique invoice bot deep link parameter for the generation of this invoice. If empty, it would be possible to pay directly from forwards of the invoice message */
        start_parameter: td_string;
    }
    
    
    /** A message with a poll. Polls can't be sent to secret chats. Polls can be sent only to a private chat with a bot */
    export interface td_inputMessagePoll {
        '@type': 'inputMessagePoll';
        /** Poll question; 1-255 characters (up to 300 characters for bots) */
        question: td_string;
        /** List of poll answer options, 2-10 strings 1-100 characters each */
        options: td_vector<td_string>;
        /** True, if the poll voters are anonymous. Non-anonymous polls can't be sent or forwarded to channels */
        is_anonymous: td_Bool;
        /** Type of the poll */
        type: td_PollType;
        /** Amount of time the poll will be active after creation, in seconds; for bots only */
        open_period: td_int32;
        /** Point in time (Unix timestamp) when the poll will automatically be closed; for bots only */
        close_date: td_int32;
        /** True, if the poll needs to be sent already closed; for bots only */
        is_closed: td_Bool;
    }
    
    
    /** A forwarded message */
    export interface td_inputMessageForwarded {
        '@type': 'inputMessageForwarded';
        /** Identifier for the chat this forwarded message came from */
        from_chat_id: td_int53;
        /** Identifier of the message to forward */
        message_id: td_int53;
        /** True, if a game message is being shared from a launched game; applies only to game messages */
        in_game_share: td_Bool;
        /** Options to be used to copy content of the message without reference to the original sender; pass null to forward the message as usual */
        copy_options: td_messageCopyOptions;
    }
    
    
    /** Returns all found messages, no filter is applied */
    export interface td_searchMessagesFilterEmpty {
        '@type': 'searchMessagesFilterEmpty';
    }
    
    
    /** Returns only animation messages */
    export interface td_searchMessagesFilterAnimation {
        '@type': 'searchMessagesFilterAnimation';
    }
    
    
    /** Returns only audio messages */
    export interface td_searchMessagesFilterAudio {
        '@type': 'searchMessagesFilterAudio';
    }
    
    
    /** Returns only document messages */
    export interface td_searchMessagesFilterDocument {
        '@type': 'searchMessagesFilterDocument';
    }
    
    
    /** Returns only photo messages */
    export interface td_searchMessagesFilterPhoto {
        '@type': 'searchMessagesFilterPhoto';
    }
    
    
    /** Returns only video messages */
    export interface td_searchMessagesFilterVideo {
        '@type': 'searchMessagesFilterVideo';
    }
    
    
    /** Returns only voice note messages */
    export interface td_searchMessagesFilterVoiceNote {
        '@type': 'searchMessagesFilterVoiceNote';
    }
    
    
    /** Returns only photo and video messages */
    export interface td_searchMessagesFilterPhotoAndVideo {
        '@type': 'searchMessagesFilterPhotoAndVideo';
    }
    
    
    /** Returns only messages containing URLs */
    export interface td_searchMessagesFilterUrl {
        '@type': 'searchMessagesFilterUrl';
    }
    
    
    /** Returns only messages containing chat photos */
    export interface td_searchMessagesFilterChatPhoto {
        '@type': 'searchMessagesFilterChatPhoto';
    }
    
    
    /** Returns only video note messages */
    export interface td_searchMessagesFilterVideoNote {
        '@type': 'searchMessagesFilterVideoNote';
    }
    
    
    /** Returns only voice and video note messages */
    export interface td_searchMessagesFilterVoiceAndVideoNote {
        '@type': 'searchMessagesFilterVoiceAndVideoNote';
    }
    
    
    /** Returns only messages with mentions of the current user, or messages that are replies to their messages */
    export interface td_searchMessagesFilterMention {
        '@type': 'searchMessagesFilterMention';
    }
    
    
    /** Returns only messages with unread mentions of the current user, or messages that are replies to their messages. When using this filter the results can't be additionally filtered by a query, a message thread or by the sending user */
    export interface td_searchMessagesFilterUnreadMention {
        '@type': 'searchMessagesFilterUnreadMention';
    }
    
    
    /** Returns only failed to send messages. This filter can be used only if the message database is used */
    export interface td_searchMessagesFilterFailedToSend {
        '@type': 'searchMessagesFilterFailedToSend';
    }
    
    
    /** Returns only pinned messages */
    export interface td_searchMessagesFilterPinned {
        '@type': 'searchMessagesFilterPinned';
    }
    
    
    /** The user is typing a message */
    export interface td_chatActionTyping {
        '@type': 'chatActionTyping';
    }
    
    
    /** The user is recording a video */
    export interface td_chatActionRecordingVideo {
        '@type': 'chatActionRecordingVideo';
    }
    
    
    /** The user is uploading a video */
    export interface td_chatActionUploadingVideo {
        '@type': 'chatActionUploadingVideo';
        /** Upload progress, as a percentage */
        progress: td_int32;
    }
    
    
    /** The user is recording a voice note */
    export interface td_chatActionRecordingVoiceNote {
        '@type': 'chatActionRecordingVoiceNote';
    }
    
    
    /** The user is uploading a voice note */
    export interface td_chatActionUploadingVoiceNote {
        '@type': 'chatActionUploadingVoiceNote';
        /** Upload progress, as a percentage */
        progress: td_int32;
    }
    
    
    /** The user is uploading a photo */
    export interface td_chatActionUploadingPhoto {
        '@type': 'chatActionUploadingPhoto';
        /** Upload progress, as a percentage */
        progress: td_int32;
    }
    
    
    /** The user is uploading a document */
    export interface td_chatActionUploadingDocument {
        '@type': 'chatActionUploadingDocument';
        /** Upload progress, as a percentage */
        progress: td_int32;
    }
    
    
    /** The user is picking a sticker to send */
    export interface td_chatActionChoosingSticker {
        '@type': 'chatActionChoosingSticker';
    }
    
    
    /** The user is picking a location or venue to send */
    export interface td_chatActionChoosingLocation {
        '@type': 'chatActionChoosingLocation';
    }
    
    
    /** The user is picking a contact to send */
    export interface td_chatActionChoosingContact {
        '@type': 'chatActionChoosingContact';
    }
    
    
    /** The user has started to play a game */
    export interface td_chatActionStartPlayingGame {
        '@type': 'chatActionStartPlayingGame';
    }
    
    
    /** The user is recording a video note */
    export interface td_chatActionRecordingVideoNote {
        '@type': 'chatActionRecordingVideoNote';
    }
    
    
    /** The user is uploading a video note */
    export interface td_chatActionUploadingVideoNote {
        '@type': 'chatActionUploadingVideoNote';
        /** Upload progress, as a percentage */
        progress: td_int32;
    }
    
    
    /** The user is watching animations sent by the other party by clicking on an animated emoji */
    export interface td_chatActionWatchingAnimations {
        '@type': 'chatActionWatchingAnimations';
        /** The animated emoji */
        emoji: td_string;
    }
    
    
    /** The user has canceled the previous action */
    export interface td_chatActionCancel {
        '@type': 'chatActionCancel';
    }
    
    
    /** The user status was never changed */
    export interface td_userStatusEmpty {
        '@type': 'userStatusEmpty';
    }
    
    
    /** The user is online */
    export interface td_userStatusOnline {
        '@type': 'userStatusOnline';
        /** Point in time (Unix timestamp) when the user's online status will expire */
        expires: td_int32;
    }
    
    
    /** The user is offline */
    export interface td_userStatusOffline {
        '@type': 'userStatusOffline';
        /** Point in time (Unix timestamp) when the user was last online */
        was_online: td_int32;
    }
    
    
    /** The user was online recently */
    export interface td_userStatusRecently {
        '@type': 'userStatusRecently';
    }
    
    
    /** The user is offline, but was online last week */
    export interface td_userStatusLastWeek {
        '@type': 'userStatusLastWeek';
    }
    
    
    /** The user is offline, but was online last month */
    export interface td_userStatusLastMonth {
        '@type': 'userStatusLastMonth';
    }
    
    
    /** Represents a list of stickers */
    export interface td_stickers {
        '@type': 'stickers';
        /** List of stickers */
        stickers: td_vector<td_sticker>;
    }
    
    
    /** Represents a list of emoji */
    export interface td_emojis {
        '@type': 'emojis';
        /** List of emojis */
        emojis: td_vector<td_string>;
    }
    
    
    /** Represents a sticker set */
    export interface td_stickerSet {
        '@type': 'stickerSet';
        /** Identifier of the sticker set */
        id: td_int64;
        /** Title of the sticker set */
        title: td_string;
        /** Name of the sticker set */
        name: td_string;
        /** Sticker set thumbnail in WEBP or TGS format with width and height 100; may be null. The file can be downloaded only before the thumbnail is changed */
        thumbnail?: td_thumbnail;
        /** Sticker set thumbnail's outline represented as a list of closed vector paths; may be empty. The coordinate system origin is in the upper-left corner */
        thumbnail_outline: td_vector<td_closedVectorPath>;
        /** True, if the sticker set has been installed by the current user */
        is_installed: td_Bool;
        /** True, if the sticker set has been archived. A sticker set can't be installed and archived simultaneously */
        is_archived: td_Bool;
        /** True, if the sticker set is official */
        is_official: td_Bool;
        /** True, is the stickers in the set are animated */
        is_animated: td_Bool;
        /** True, if the stickers in the set are masks */
        is_masks: td_Bool;
        /** True for already viewed trending sticker sets */
        is_viewed: td_Bool;
        /** List of stickers in this set */
        stickers: td_vector<td_sticker>;
        /** A list of emoji corresponding to the stickers in the same order. The list is only for informational purposes, because a sticker is always sent with a fixed emoji from the corresponding Sticker object */
        emojis: td_vector<td_emojis>;
    }
    
    
    /** Represents short information about a sticker set */
    export interface td_stickerSetInfo {
        '@type': 'stickerSetInfo';
        /** Identifier of the sticker set */
        id: td_int64;
        /** Title of the sticker set */
        title: td_string;
        /** Name of the sticker set */
        name: td_string;
        /** Sticker set thumbnail in WEBP or TGS format with width and height 100; may be null */
        thumbnail?: td_thumbnail;
        /** Sticker set thumbnail's outline represented as a list of closed vector paths; may be empty. The coordinate system origin is in the upper-left corner */
        thumbnail_outline: td_vector<td_closedVectorPath>;
        /** True, if the sticker set has been installed by the current user */
        is_installed: td_Bool;
        /** True, if the sticker set has been archived. A sticker set can't be installed and archived simultaneously */
        is_archived: td_Bool;
        /** True, if the sticker set is official */
        is_official: td_Bool;
        /** True, is the stickers in the set are animated */
        is_animated: td_Bool;
        /** True, if the stickers in the set are masks */
        is_masks: td_Bool;
        /** True for already viewed trending sticker sets */
        is_viewed: td_Bool;
        /** Total number of stickers in the set */
        size: td_int32;
        /** Up to the first 5 stickers from the set, depending on the context. If the application needs more stickers the full sticker set needs to be requested */
        covers: td_vector<td_sticker>;
    }
    
    
    /** Represents a list of sticker sets */
    export interface td_stickerSets {
        '@type': 'stickerSets';
        /** Approximate total number of sticker sets found */
        total_count: td_int32;
        /** List of sticker sets */
        sets: td_vector<td_stickerSetInfo>;
    }
    
    
    /** The call wasn't discarded, or the reason is unknown */
    export interface td_callDiscardReasonEmpty {
        '@type': 'callDiscardReasonEmpty';
    }
    
    
    /** The call was ended before the conversation started. It was canceled by the caller or missed by the other party */
    export interface td_callDiscardReasonMissed {
        '@type': 'callDiscardReasonMissed';
    }
    
    
    /** The call was ended before the conversation started. It was declined by the other party */
    export interface td_callDiscardReasonDeclined {
        '@type': 'callDiscardReasonDeclined';
    }
    
    
    /** The call was ended during the conversation because the users were disconnected */
    export interface td_callDiscardReasonDisconnected {
        '@type': 'callDiscardReasonDisconnected';
    }
    
    
    /** The call was ended because one of the parties hung up */
    export interface td_callDiscardReasonHungUp {
        '@type': 'callDiscardReasonHungUp';
    }
    
    
    /** Specifies the supported call protocols */
    export interface td_callProtocol {
        '@type': 'callProtocol';
        /** True, if UDP peer-to-peer connections are supported */
        udp_p2p: td_Bool;
        /** True, if connection through UDP reflectors is supported */
        udp_reflector: td_Bool;
        /** The minimum supported API layer; use 65 */
        min_layer: td_int32;
        /** The maximum supported API layer; use 65 */
        max_layer: td_int32;
        /** List of supported tgcalls versions */
        library_versions: td_vector<td_string>;
    }
    
    
    /** A Telegram call reflector */
    export interface td_callServerTypeTelegramReflector {
        '@type': 'callServerTypeTelegramReflector';
        /** A peer tag to be used with the reflector */
        peer_tag: td_bytes;
    }
    
    
    /** A WebRTC server */
    export interface td_callServerTypeWebrtc {
        '@type': 'callServerTypeWebrtc';
        /** Username to be used for authentication */
        username: td_string;
        /** Authentication password */
        password: td_string;
        /** True, if the server supports TURN */
        supports_turn: td_Bool;
        /** True, if the server supports STUN */
        supports_stun: td_Bool;
    }
    
    
    /** Describes a server for relaying call data */
    export interface td_callServer {
        '@type': 'callServer';
        /** Server identifier */
        id: td_int64;
        /** Server IPv4 address */
        ip_address: td_string;
        /** Server IPv6 address */
        ipv6_address: td_string;
        /** Server port number */
        port: td_int32;
        /** Server type */
        type: td_CallServerType;
    }
    
    
    /** Contains the call identifier */
    export interface td_callId {
        '@type': 'callId';
        /** Call identifier */
        id: td_int32;
    }
    
    
    /** Contains the group call identifier */
    export interface td_groupCallId {
        '@type': 'groupCallId';
        /** Group call identifier */
        id: td_int32;
    }
    
    
    /** The call is pending, waiting to be accepted by a user */
    export interface td_callStatePending {
        '@type': 'callStatePending';
        /** True, if the call has already been created by the server */
        is_created: td_Bool;
        /** True, if the call has already been received by the other party */
        is_received: td_Bool;
    }
    
    
    /** The call has been answered and encryption keys are being exchanged */
    export interface td_callStateExchangingKeys {
        '@type': 'callStateExchangingKeys';
    }
    
    
    /** The call is ready to use */
    export interface td_callStateReady {
        '@type': 'callStateReady';
        /** Call protocols supported by the peer */
        protocol: td_callProtocol;
        /** List of available call servers */
        servers: td_vector<td_callServer>;
        /** A JSON-encoded call config */
        config: td_string;
        /** Call encryption key */
        encryption_key: td_bytes;
        /** Encryption key emojis fingerprint */
        emojis: td_vector<td_string>;
        /** True, if peer-to-peer connection is allowed by users privacy settings */
        allow_p2p: td_Bool;
    }
    
    
    /** The call is hanging up after discardCall has been called */
    export interface td_callStateHangingUp {
        '@type': 'callStateHangingUp';
    }
    
    
    /** The call has ended successfully */
    export interface td_callStateDiscarded {
        '@type': 'callStateDiscarded';
        /** The reason, why the call has ended */
        reason: td_CallDiscardReason;
        /** True, if the call rating must be sent to the server */
        need_rating: td_Bool;
        /** True, if the call debug information must be sent to the server */
        need_debug_information: td_Bool;
    }
    
    
    /** The call has ended with an error */
    export interface td_callStateError {
        '@type': 'callStateError';
        /** Error. An error with the code 4005000 will be returned if an outgoing call is missed because of an expired timeout */
        error: td_error;
    }
    
    
    /** The worst available video quality */
    export interface td_groupCallVideoQualityThumbnail {
        '@type': 'groupCallVideoQualityThumbnail';
    }
    
    
    /** The medium video quality */
    export interface td_groupCallVideoQualityMedium {
        '@type': 'groupCallVideoQualityMedium';
    }
    
    
    /** The best available video quality */
    export interface td_groupCallVideoQualityFull {
        '@type': 'groupCallVideoQualityFull';
    }
    
    
    /** Describes a recently speaking participant in a group call */
    export interface td_groupCallRecentSpeaker {
        '@type': 'groupCallRecentSpeaker';
        /** Group call participant identifier */
        participant_id: td_MessageSender;
        /** True, is the user has spoken recently */
        is_speaking: td_Bool;
    }
    
    
    /** Describes a group call */
    export interface td_groupCall {
        '@type': 'groupCall';
        /** Group call identifier */
        id: td_int32;
        /** Group call title */
        title: td_string;
        /** Point in time (Unix timestamp) when the group call is supposed to be started by an administrator; 0 if it is already active or was ended */
        scheduled_start_date: td_int32;
        /** True, if the group call is scheduled and the current user will receive a notification when the group call will start */
        enabled_start_notification: td_Bool;
        /** True, if the call is active */
        is_active: td_Bool;
        /** True, if the call is joined */
        is_joined: td_Bool;
        /** True, if user was kicked from the call because of network loss and the call needs to be rejoined */
        need_rejoin: td_Bool;
        /** True, if the current user can manage the group call */
        can_be_managed: td_Bool;
        /** Number of participants in the group call */
        participant_count: td_int32;
        /** True, if all group call participants are loaded */
        loaded_all_participants: td_Bool;
        /** At most 3 recently speaking users in the group call */
        recent_speakers: td_vector<td_groupCallRecentSpeaker>;
        /** True, if the current user's video is enabled */
        is_my_video_enabled: td_Bool;
        /** True, if the current user's video is paused */
        is_my_video_paused: td_Bool;
        /** True, if the current user can broadcast video or share screen */
        can_enable_video: td_Bool;
        /** True, if only group call administrators can unmute new participants */
        mute_new_participants: td_Bool;
        /** True, if the current user can enable or disable mute_new_participants setting */
        can_toggle_mute_new_participants: td_Bool;
        /** Duration of the ongoing group call recording, in seconds; 0 if none. An updateGroupCall update is not triggered when value of this field changes, but the same recording goes on */
        record_duration: td_int32;
        /** True, if a video file is being recorded for the call */
        is_video_recorded: td_Bool;
        /** Call duration, in seconds; for ended calls only */
        duration: td_int32;
    }
    
    
    /** Describes a group of video synchronization source identifiers */
    export interface td_groupCallVideoSourceGroup {
        '@type': 'groupCallVideoSourceGroup';
        /** The semantics of sources, one of "SIM" or "FID" */
        semantics: td_string;
        /** The list of synchronization source identifiers */
        source_ids: td_vector<td_int32>;
    }
    
    
    /** Contains information about a group call participant's video channel */
    export interface td_groupCallParticipantVideoInfo {
        '@type': 'groupCallParticipantVideoInfo';
        /** List of synchronization source groups of the video */
        source_groups: td_vector<td_groupCallVideoSourceGroup>;
        /** Video channel endpoint identifier */
        endpoint_id: td_string;
        /** True if the video is paused. This flag needs to be ignored, if new video frames are received */
        is_paused: td_Bool;
    }
    
    
    /** Represents a group call participant */
    export interface td_groupCallParticipant {
        '@type': 'groupCallParticipant';
        /** Identifier of the group call participant */
        participant_id: td_MessageSender;
        /** User's audio channel synchronization source identifier */
        audio_source_id: td_int32;
        /** User's screen sharing audio channel synchronization source identifier */
        screen_sharing_audio_source_id: td_int32;
        /** Information about user's video channel; may be null if there is no active video */
        video_info?: td_groupCallParticipantVideoInfo;
        /** Information about user's screen sharing video channel; may be null if there is no active screen sharing video */
        screen_sharing_video_info?: td_groupCallParticipantVideoInfo;
        /** The participant user's bio or the participant chat's description */
        bio: td_string;
        /** True, if the participant is the current user */
        is_current_user: td_Bool;
        /** True, if the participant is speaking as set by setGroupCallParticipantIsSpeaking */
        is_speaking: td_Bool;
        /** True, if the participant hand is raised */
        is_hand_raised: td_Bool;
        /** True, if the current user can mute the participant for all other group call participants */
        can_be_muted_for_all_users: td_Bool;
        /** True, if the current user can allow the participant to unmute themselves or unmute the participant (if the participant is the current user) */
        can_be_unmuted_for_all_users: td_Bool;
        /** True, if the current user can mute the participant only for self */
        can_be_muted_for_current_user: td_Bool;
        /** True, if the current user can unmute the participant for self */
        can_be_unmuted_for_current_user: td_Bool;
        /** True, if the participant is muted for all users */
        is_muted_for_all_users: td_Bool;
        /** True, if the participant is muted for the current user */
        is_muted_for_current_user: td_Bool;
        /** True, if the participant is muted for all users, but can unmute themselves */
        can_unmute_self: td_Bool;
        /** Participant's volume level; 1-20000 in hundreds of percents */
        volume_level: td_int32;
        /** User's order in the group call participant list. Orders must be compared lexicographically. The bigger is order, the higher is user in the list. If order is empty, the user must be removed from the participant list */
        order: td_string;
    }
    
    
    /** The user heard their own voice */
    export interface td_callProblemEcho {
        '@type': 'callProblemEcho';
    }
    
    
    /** The user heard background noise */
    export interface td_callProblemNoise {
        '@type': 'callProblemNoise';
    }
    
    
    /** The other side kept disappearing */
    export interface td_callProblemInterruptions {
        '@type': 'callProblemInterruptions';
    }
    
    
    /** The speech was distorted */
    export interface td_callProblemDistortedSpeech {
        '@type': 'callProblemDistortedSpeech';
    }
    
    
    /** The user couldn't hear the other side */
    export interface td_callProblemSilentLocal {
        '@type': 'callProblemSilentLocal';
    }
    
    
    /** The other side couldn't hear the user */
    export interface td_callProblemSilentRemote {
        '@type': 'callProblemSilentRemote';
    }
    
    
    /** The call ended unexpectedly */
    export interface td_callProblemDropped {
        '@type': 'callProblemDropped';
    }
    
    
    /** The video was distorted */
    export interface td_callProblemDistortedVideo {
        '@type': 'callProblemDistortedVideo';
    }
    
    
    /** The video was pixelated */
    export interface td_callProblemPixelatedVideo {
        '@type': 'callProblemPixelatedVideo';
    }
    
    
    /** Describes a call */
    export interface td_call {
        '@type': 'call';
        /** Call identifier, not persistent */
        id: td_int32;
        /** Peer user identifier */
        user_id: td_int53;
        /** True, if the call is outgoing */
        is_outgoing: td_Bool;
        /** True, if the call is a video call */
        is_video: td_Bool;
        /** Call state */
        state: td_CallState;
    }
    
    
    /** Contains settings for the authentication of the user's phone number */
    export interface td_phoneNumberAuthenticationSettings {
        '@type': 'phoneNumberAuthenticationSettings';
        /** Pass true if the authentication code may be sent via a flash call to the specified phone number */
        allow_flash_call: td_Bool;
        /** Pass true if the authentication code may be sent via a missed call to the specified phone number */
        allow_missed_call: td_Bool;
        /** Pass true if the authenticated phone number is used on the current device */
        is_current_phone_number: td_Bool;
        /** For official applications only. True, if the application can use Android SMS Retriever API (requires Google Play Services >= 10.2) to automatically receive the authentication code from the SMS. See https://developers.google.com/identity/sms-retriever/ for more details */
        allow_sms_retriever_api: td_Bool;
        /** List of up to 20 authentication tokens, recently received in updateOption("authentication_token") in previously logged out sessions */
        authentication_tokens: td_vector<td_string>;
    }
    
    
    /** Represents a list of animations */
    export interface td_animations {
        '@type': 'animations';
        /** List of animations */
        animations: td_vector<td_animation>;
    }
    
    
    /** A regular animated sticker */
    export interface td_diceStickersRegular {
        '@type': 'diceStickersRegular';
        /** The animated sticker with the dice animation */
        sticker: td_sticker;
    }
    
    
    /** Animated stickers to be combined into a slot machine */
    export interface td_diceStickersSlotMachine {
        '@type': 'diceStickersSlotMachine';
        /** The animated sticker with the slot machine background. The background animation must start playing after all reel animations finish */
        background: td_sticker;
        /** The animated sticker with the lever animation. The lever animation must play once in the initial dice state */
        lever: td_sticker;
        /** The animated sticker with the left reel */
        left_reel: td_sticker;
        /** The animated sticker with the center reel */
        center_reel: td_sticker;
        /** The animated sticker with the right reel */
        right_reel: td_sticker;
    }
    
    
    /** Represents the result of an ImportContacts request */
    export interface td_importedContacts {
        '@type': 'importedContacts';
        /** User identifiers of the imported contacts in the same order as they were specified in the request; 0 if the contact is not yet a registered user */
        user_ids: td_vector<td_int53>;
        /** The number of users that imported the corresponding contact; 0 for already registered users or if unavailable */
        importer_count: td_vector<td_int32>;
    }
    
    
    /** Contains an HTTP URL */
    export interface td_httpUrl {
        '@type': 'httpUrl';
        /** The URL */
        url: td_string;
    }
    
    
    /** Represents a link to an animated GIF or an animated (i.e., without sound) H.264/MPEG-4 AVC video */
    export interface td_inputInlineQueryResultAnimation {
        '@type': 'inputInlineQueryResultAnimation';
        /** Unique identifier of the query result */
        id: td_string;
        /** Title of the query result */
        title: td_string;
        /** URL of the result thumbnail (JPEG, GIF, or MPEG4), if it exists */
        thumbnail_url: td_string;
        /** MIME type of the video thumbnail. If non-empty, must be one of "image/jpeg", "image/gif" and "video/mp4" */
        thumbnail_mime_type: td_string;
        /** The URL of the video file (file size must not exceed 1MB) */
        video_url: td_string;
        /** MIME type of the video file. Must be one of "image/gif" and "video/mp4" */
        video_mime_type: td_string;
        /** Duration of the video, in seconds */
        video_duration: td_int32;
        /** Width of the video */
        video_width: td_int32;
        /** Height of the video */
        video_height: td_int32;
        /** The message reply markup; pass null if none. Must be of type replyMarkupInlineKeyboard or null */
        reply_markup: td_ReplyMarkup;
        /** The content of the message to be sent. Must be one of the following types: inputMessageText, inputMessageAnimation, inputMessageInvoice, inputMessageLocation, inputMessageVenue or inputMessageContact */
        input_message_content: td_InputMessageContent;
    }
    
    
    /** Represents a link to an article or web page */
    export interface td_inputInlineQueryResultArticle {
        '@type': 'inputInlineQueryResultArticle';
        /** Unique identifier of the query result */
        id: td_string;
        /** URL of the result, if it exists */
        url: td_string;
        /** True, if the URL must be not shown */
        hide_url: td_Bool;
        /** Title of the result */
        title: td_string;
        /** Represents a link to an article or web page */
        description: td_string;
        /** URL of the result thumbnail, if it exists */
        thumbnail_url: td_string;
        /** Thumbnail width, if known */
        thumbnail_width: td_int32;
        /** Thumbnail height, if known */
        thumbnail_height: td_int32;
        /** The message reply markup; pass null if none. Must be of type replyMarkupInlineKeyboard or null */
        reply_markup: td_ReplyMarkup;
        /** The content of the message to be sent. Must be one of the following types: inputMessageText, inputMessageInvoice, inputMessageLocation, inputMessageVenue or inputMessageContact */
        input_message_content: td_InputMessageContent;
    }
    
    
    /** Represents a link to an MP3 audio file */
    export interface td_inputInlineQueryResultAudio {
        '@type': 'inputInlineQueryResultAudio';
        /** Unique identifier of the query result */
        id: td_string;
        /** Title of the audio file */
        title: td_string;
        /** Performer of the audio file */
        performer: td_string;
        /** The URL of the audio file */
        audio_url: td_string;
        /** Audio file duration, in seconds */
        audio_duration: td_int32;
        /** The message reply markup; pass null if none. Must be of type replyMarkupInlineKeyboard or null */
        reply_markup: td_ReplyMarkup;
        /** The content of the message to be sent. Must be one of the following types: inputMessageText, inputMessageAudio, inputMessageInvoice, inputMessageLocation, inputMessageVenue or inputMessageContact */
        input_message_content: td_InputMessageContent;
    }
    
    
    /** Represents a user contact */
    export interface td_inputInlineQueryResultContact {
        '@type': 'inputInlineQueryResultContact';
        /** Unique identifier of the query result */
        id: td_string;
        /** User contact */
        contact: td_contact;
        /** URL of the result thumbnail, if it exists */
        thumbnail_url: td_string;
        /** Thumbnail width, if known */
        thumbnail_width: td_int32;
        /** Thumbnail height, if known */
        thumbnail_height: td_int32;
        /** The message reply markup; pass null if none. Must be of type replyMarkupInlineKeyboard or null */
        reply_markup: td_ReplyMarkup;
        /** The content of the message to be sent. Must be one of the following types: inputMessageText, inputMessageInvoice, inputMessageLocation, inputMessageVenue or inputMessageContact */
        input_message_content: td_InputMessageContent;
    }
    
    
    /** Represents a link to a file */
    export interface td_inputInlineQueryResultDocument {
        '@type': 'inputInlineQueryResultDocument';
        /** Unique identifier of the query result */
        id: td_string;
        /** Title of the resulting file */
        title: td_string;
        /** Represents a link to a file */
        description: td_string;
        /** URL of the file */
        document_url: td_string;
        /** MIME type of the file content; only "application/pdf" and "application/zip" are currently allowed */
        mime_type: td_string;
        /** The URL of the file thumbnail, if it exists */
        thumbnail_url: td_string;
        /** Width of the thumbnail */
        thumbnail_width: td_int32;
        /** Height of the thumbnail */
        thumbnail_height: td_int32;
        /** The message reply markup; pass null if none. Must be of type replyMarkupInlineKeyboard or null */
        reply_markup: td_ReplyMarkup;
        /** The content of the message to be sent. Must be one of the following types: inputMessageText, inputMessageDocument, inputMessageInvoice, inputMessageLocation, inputMessageVenue or inputMessageContact */
        input_message_content: td_InputMessageContent;
    }
    
    
    /** Represents a game */
    export interface td_inputInlineQueryResultGame {
        '@type': 'inputInlineQueryResultGame';
        /** Unique identifier of the query result */
        id: td_string;
        /** Short name of the game */
        game_short_name: td_string;
        /** The message reply markup; pass null if none. Must be of type replyMarkupInlineKeyboard or null */
        reply_markup: td_ReplyMarkup;
    }
    
    
    /** Represents a point on the map */
    export interface td_inputInlineQueryResultLocation {
        '@type': 'inputInlineQueryResultLocation';
        /** Unique identifier of the query result */
        id: td_string;
        /** Location result */
        location: td_location;
        /** Amount of time relative to the message sent time until the location can be updated, in seconds */
        live_period: td_int32;
        /** Title of the result */
        title: td_string;
        /** URL of the result thumbnail, if it exists */
        thumbnail_url: td_string;
        /** Thumbnail width, if known */
        thumbnail_width: td_int32;
        /** Thumbnail height, if known */
        thumbnail_height: td_int32;
        /** The message reply markup; pass null if none. Must be of type replyMarkupInlineKeyboard or null */
        reply_markup: td_ReplyMarkup;
        /** The content of the message to be sent. Must be one of the following types: inputMessageText, inputMessageInvoice, inputMessageLocation, inputMessageVenue or inputMessageContact */
        input_message_content: td_InputMessageContent;
    }
    
    
    /** Represents link to a JPEG image */
    export interface td_inputInlineQueryResultPhoto {
        '@type': 'inputInlineQueryResultPhoto';
        /** Unique identifier of the query result */
        id: td_string;
        /** Title of the result, if known */
        title: td_string;
        /** Represents link to a JPEG image */
        description: td_string;
        /** URL of the photo thumbnail, if it exists */
        thumbnail_url: td_string;
        /** The URL of the JPEG photo (photo size must not exceed 5MB) */
        photo_url: td_string;
        /** Width of the photo */
        photo_width: td_int32;
        /** Height of the photo */
        photo_height: td_int32;
        /** The message reply markup; pass null if none. Must be of type replyMarkupInlineKeyboard or null */
        reply_markup: td_ReplyMarkup;
        /** The content of the message to be sent. Must be one of the following types: inputMessageText, inputMessagePhoto, inputMessageInvoice, inputMessageLocation, inputMessageVenue or inputMessageContact */
        input_message_content: td_InputMessageContent;
    }
    
    
    /** Represents a link to a WEBP or TGS sticker */
    export interface td_inputInlineQueryResultSticker {
        '@type': 'inputInlineQueryResultSticker';
        /** Unique identifier of the query result */
        id: td_string;
        /** URL of the sticker thumbnail, if it exists */
        thumbnail_url: td_string;
        /** The URL of the WEBP or TGS sticker (sticker file size must not exceed 5MB) */
        sticker_url: td_string;
        /** Width of the sticker */
        sticker_width: td_int32;
        /** Height of the sticker */
        sticker_height: td_int32;
        /** The message reply markup; pass null if none. Must be of type replyMarkupInlineKeyboard or null */
        reply_markup: td_ReplyMarkup;
        /** The content of the message to be sent. Must be one of the following types: inputMessageText, inputMessageSticker, inputMessageInvoice, inputMessageLocation, inputMessageVenue or inputMessageContact */
        input_message_content: td_InputMessageContent;
    }
    
    
    /** Represents information about a venue */
    export interface td_inputInlineQueryResultVenue {
        '@type': 'inputInlineQueryResultVenue';
        /** Unique identifier of the query result */
        id: td_string;
        /** Venue result */
        venue: td_venue;
        /** URL of the result thumbnail, if it exists */
        thumbnail_url: td_string;
        /** Thumbnail width, if known */
        thumbnail_width: td_int32;
        /** Thumbnail height, if known */
        thumbnail_height: td_int32;
        /** The message reply markup; pass null if none. Must be of type replyMarkupInlineKeyboard or null */
        reply_markup: td_ReplyMarkup;
        /** The content of the message to be sent. Must be one of the following types: inputMessageText, inputMessageInvoice, inputMessageLocation, inputMessageVenue or inputMessageContact */
        input_message_content: td_InputMessageContent;
    }
    
    
    /** Represents a link to a page containing an embedded video player or a video file */
    export interface td_inputInlineQueryResultVideo {
        '@type': 'inputInlineQueryResultVideo';
        /** Unique identifier of the query result */
        id: td_string;
        /** Title of the result */
        title: td_string;
        /** Represents a link to a page containing an embedded video player or a video file */
        description: td_string;
        /** The URL of the video thumbnail (JPEG), if it exists */
        thumbnail_url: td_string;
        /** URL of the embedded video player or video file */
        video_url: td_string;
        /** MIME type of the content of the video URL, only "text/html" or "video/mp4" are currently supported */
        mime_type: td_string;
        /** Width of the video */
        video_width: td_int32;
        /** Height of the video */
        video_height: td_int32;
        /** Video duration, in seconds */
        video_duration: td_int32;
        /** The message reply markup; pass null if none. Must be of type replyMarkupInlineKeyboard or null */
        reply_markup: td_ReplyMarkup;
        /** The content of the message to be sent. Must be one of the following types: inputMessageText, inputMessageVideo, inputMessageInvoice, inputMessageLocation, inputMessageVenue or inputMessageContact */
        input_message_content: td_InputMessageContent;
    }
    
    
    /** Represents a link to an opus-encoded audio file within an OGG container, single channel audio */
    export interface td_inputInlineQueryResultVoiceNote {
        '@type': 'inputInlineQueryResultVoiceNote';
        /** Unique identifier of the query result */
        id: td_string;
        /** Title of the voice note */
        title: td_string;
        /** The URL of the voice note file */
        voice_note_url: td_string;
        /** Duration of the voice note, in seconds */
        voice_note_duration: td_int32;
        /** The message reply markup; pass null if none. Must be of type replyMarkupInlineKeyboard or null */
        reply_markup: td_ReplyMarkup;
        /** The content of the message to be sent. Must be one of the following types: inputMessageText, inputMessageVoiceNote, inputMessageInvoice, inputMessageLocation, inputMessageVenue or inputMessageContact */
        input_message_content: td_InputMessageContent;
    }
    
    
    /** Represents a link to an article or web page */
    export interface td_inlineQueryResultArticle {
        '@type': 'inlineQueryResultArticle';
        /** Unique identifier of the query result */
        id: td_string;
        /** URL of the result, if it exists */
        url: td_string;
        /** True, if the URL must be not shown */
        hide_url: td_Bool;
        /** Title of the result */
        title: td_string;
        /** Represents a link to an article or web page */
        description: td_string;
        /** Result thumbnail in JPEG format; may be null */
        thumbnail?: td_thumbnail;
    }
    
    
    /** Represents a user contact */
    export interface td_inlineQueryResultContact {
        '@type': 'inlineQueryResultContact';
        /** Unique identifier of the query result */
        id: td_string;
        /** A user contact */
        contact: td_contact;
        /** Result thumbnail in JPEG format; may be null */
        thumbnail?: td_thumbnail;
    }
    
    
    /** Represents a point on the map */
    export interface td_inlineQueryResultLocation {
        '@type': 'inlineQueryResultLocation';
        /** Unique identifier of the query result */
        id: td_string;
        /** Location result */
        location: td_location;
        /** Title of the result */
        title: td_string;
        /** Result thumbnail in JPEG format; may be null */
        thumbnail?: td_thumbnail;
    }
    
    
    /** Represents information about a venue */
    export interface td_inlineQueryResultVenue {
        '@type': 'inlineQueryResultVenue';
        /** Unique identifier of the query result */
        id: td_string;
        /** Venue result */
        venue: td_venue;
        /** Result thumbnail in JPEG format; may be null */
        thumbnail?: td_thumbnail;
    }
    
    
    /** Represents information about a game */
    export interface td_inlineQueryResultGame {
        '@type': 'inlineQueryResultGame';
        /** Unique identifier of the query result */
        id: td_string;
        /** Game result */
        game: td_game;
    }
    
    
    /** Represents an animation file */
    export interface td_inlineQueryResultAnimation {
        '@type': 'inlineQueryResultAnimation';
        /** Unique identifier of the query result */
        id: td_string;
        /** Animation file */
        animation: td_animation;
        /** Animation title */
        title: td_string;
    }
    
    
    /** Represents an audio file */
    export interface td_inlineQueryResultAudio {
        '@type': 'inlineQueryResultAudio';
        /** Unique identifier of the query result */
        id: td_string;
        /** Audio file */
        audio: td_audio;
    }
    
    
    /** Represents a document */
    export interface td_inlineQueryResultDocument {
        '@type': 'inlineQueryResultDocument';
        /** Unique identifier of the query result */
        id: td_string;
        /** Document */
        document: td_document;
        /** Document title */
        title: td_string;
        /** Represents a document */
        description: td_string;
    }
    
    
    /** Represents a photo */
    export interface td_inlineQueryResultPhoto {
        '@type': 'inlineQueryResultPhoto';
        /** Unique identifier of the query result */
        id: td_string;
        /** Photo */
        photo: td_photo;
        /** Title of the result, if known */
        title: td_string;
        /** Represents a photo */
        description: td_string;
    }
    
    
    /** Represents a sticker */
    export interface td_inlineQueryResultSticker {
        '@type': 'inlineQueryResultSticker';
        /** Unique identifier of the query result */
        id: td_string;
        /** Sticker */
        sticker: td_sticker;
    }
    
    
    /** Represents a video */
    export interface td_inlineQueryResultVideo {
        '@type': 'inlineQueryResultVideo';
        /** Unique identifier of the query result */
        id: td_string;
        /** Video */
        video: td_video;
        /** Title of the video */
        title: td_string;
        /** Represents a video */
        description: td_string;
    }
    
    
    /** Represents a voice note */
    export interface td_inlineQueryResultVoiceNote {
        '@type': 'inlineQueryResultVoiceNote';
        /** Unique identifier of the query result */
        id: td_string;
        /** Voice note */
        voice_note: td_voiceNote;
        /** Title of the voice note */
        title: td_string;
    }
    
    
    /** Represents the results of the inline query. Use sendInlineQueryResultMessage to send the result of the query */
    export interface td_inlineQueryResults {
        '@type': 'inlineQueryResults';
        /** Unique identifier of the inline query */
        inline_query_id: td_int64;
        /** The offset for the next request. If empty, there are no more results */
        next_offset: td_string;
        /** Results of the query */
        results: td_vector<td_InlineQueryResult>;
        /** If non-empty, this text must be shown on the button, which opens a private chat with the bot and sends the bot a start message with the switch_pm_parameter */
        switch_pm_text: td_string;
        /** Parameter for the bot start message */
        switch_pm_parameter: td_string;
    }
    
    
    /** The payload for a general callback button */
    export interface td_callbackQueryPayloadData {
        '@type': 'callbackQueryPayloadData';
        /** Data that was attached to the callback button */
        data: td_bytes;
    }
    
    
    /** The payload for a callback button requiring password */
    export interface td_callbackQueryPayloadDataWithPassword {
        '@type': 'callbackQueryPayloadDataWithPassword';
        /** The password for the current user */
        password: td_string;
        /** Data that was attached to the callback button */
        data: td_bytes;
    }
    
    
    /** The payload for a game callback button */
    export interface td_callbackQueryPayloadGame {
        '@type': 'callbackQueryPayloadGame';
        /** A short name of the game that was attached to the callback button */
        game_short_name: td_string;
    }
    
    
    /** Contains a bot's answer to a callback query */
    export interface td_callbackQueryAnswer {
        '@type': 'callbackQueryAnswer';
        /** Text of the answer */
        text: td_string;
        /** True, if an alert must be shown to the user instead of a toast notification */
        show_alert: td_Bool;
        /** URL to be opened */
        url: td_string;
    }
    
    
    /** Contains the result of a custom request */
    export interface td_customRequestResult {
        '@type': 'customRequestResult';
        /** A JSON-serialized result */
        result: td_string;
    }
    
    
    /** Contains one row of the game high score table */
    export interface td_gameHighScore {
        '@type': 'gameHighScore';
        /** Position in the high score table */
        position: td_int32;
        /** User identifier */
        user_id: td_int53;
        /** User score */
        score: td_int32;
    }
    
    
    /** Contains a list of game high scores */
    export interface td_gameHighScores {
        '@type': 'gameHighScores';
        /** A list of game high scores */
        scores: td_vector<td_gameHighScore>;
    }
    
    
    /** A message was edited */
    export interface td_chatEventMessageEdited {
        '@type': 'chatEventMessageEdited';
        /** The original message before the edit */
        old_message: td_message;
        /** The message after it was edited */
        new_message: td_message;
    }
    
    
    /** A message was deleted */
    export interface td_chatEventMessageDeleted {
        '@type': 'chatEventMessageDeleted';
        /** Deleted message */
        message: td_message;
    }
    
    
    /** A poll in a message was stopped */
    export interface td_chatEventPollStopped {
        '@type': 'chatEventPollStopped';
        /** The message with the poll */
        message: td_message;
    }
    
    
    /** A message was pinned */
    export interface td_chatEventMessagePinned {
        '@type': 'chatEventMessagePinned';
        /** Pinned message */
        message: td_message;
    }
    
    
    /** A message was unpinned */
    export interface td_chatEventMessageUnpinned {
        '@type': 'chatEventMessageUnpinned';
        /** Unpinned message */
        message: td_message;
    }
    
    
    /** A new member joined the chat */
    export interface td_chatEventMemberJoined {
        '@type': 'chatEventMemberJoined';
    }
    
    
    /** A new member joined the chat via an invite link */
    export interface td_chatEventMemberJoinedByInviteLink {
        '@type': 'chatEventMemberJoinedByInviteLink';
        /** Invite link used to join the chat */
        invite_link: td_chatInviteLink;
    }
    
    
    /** A new member was accepted to the chat by an administrator */
    export interface td_chatEventMemberJoinedByRequest {
        '@type': 'chatEventMemberJoinedByRequest';
        /** User identifier of the chat administrator, approved user join request */
        approver_user_id: td_int53;
        /** Invite link used to join the chat; may be null */
        invite_link?: td_chatInviteLink;
    }
    
    
    /** A member left the chat */
    export interface td_chatEventMemberLeft {
        '@type': 'chatEventMemberLeft';
    }
    
    
    /** A new chat member was invited */
    export interface td_chatEventMemberInvited {
        '@type': 'chatEventMemberInvited';
        /** New member user identifier */
        user_id: td_int53;
        /** New member status */
        status: td_ChatMemberStatus;
    }
    
    
    /** A chat member has gained/lost administrator status, or the list of their administrator privileges has changed */
    export interface td_chatEventMemberPromoted {
        '@type': 'chatEventMemberPromoted';
        /** Affected chat member user identifier */
        user_id: td_int53;
        /** Previous status of the chat member */
        old_status: td_ChatMemberStatus;
        /** New status of the chat member */
        new_status: td_ChatMemberStatus;
    }
    
    
    /** A chat member was restricted/unrestricted or banned/unbanned, or the list of their restrictions has changed */
    export interface td_chatEventMemberRestricted {
        '@type': 'chatEventMemberRestricted';
        /** Affected chat member identifier */
        member_id: td_MessageSender;
        /** Previous status of the chat member */
        old_status: td_ChatMemberStatus;
        /** New status of the chat member */
        new_status: td_ChatMemberStatus;
    }
    
    
    /** The chat title was changed */
    export interface td_chatEventTitleChanged {
        '@type': 'chatEventTitleChanged';
        /** Previous chat title */
        old_title: td_string;
        /** New chat title */
        new_title: td_string;
    }
    
    
    /** The chat permissions was changed */
    export interface td_chatEventPermissionsChanged {
        '@type': 'chatEventPermissionsChanged';
        /** Previous chat permissions */
        old_permissions: td_chatPermissions;
        /** New chat permissions */
        new_permissions: td_chatPermissions;
    }
    
    
    /** The chat description was changed */
    export interface td_chatEventDescriptionChanged {
        '@type': 'chatEventDescriptionChanged';
        /** Previous chat description */
        old_description: td_string;
        /** New chat description */
        new_description: td_string;
    }
    
    
    /** The chat username was changed */
    export interface td_chatEventUsernameChanged {
        '@type': 'chatEventUsernameChanged';
        /** Previous chat username */
        old_username: td_string;
        /** New chat username */
        new_username: td_string;
    }
    
    
    /** The chat photo was changed */
    export interface td_chatEventPhotoChanged {
        '@type': 'chatEventPhotoChanged';
        /** Previous chat photo value; may be null */
        old_photo?: td_chatPhoto;
        /** New chat photo value; may be null */
        new_photo?: td_chatPhoto;
    }
    
    
    /** The can_invite_users permission of a supergroup chat was toggled */
    export interface td_chatEventInvitesToggled {
        '@type': 'chatEventInvitesToggled';
        /** New value of can_invite_users permission */
        can_invite_users: td_Bool;
    }
    
    
    /** The linked chat of a supergroup was changed */
    export interface td_chatEventLinkedChatChanged {
        '@type': 'chatEventLinkedChatChanged';
        /** Previous supergroup linked chat identifier */
        old_linked_chat_id: td_int53;
        /** New supergroup linked chat identifier */
        new_linked_chat_id: td_int53;
    }
    
    
    /** The slow_mode_delay setting of a supergroup was changed */
    export interface td_chatEventSlowModeDelayChanged {
        '@type': 'chatEventSlowModeDelayChanged';
        /** Previous value of slow_mode_delay, in seconds */
        old_slow_mode_delay: td_int32;
        /** New value of slow_mode_delay, in seconds */
        new_slow_mode_delay: td_int32;
    }
    
    
    /** The message TTL was changed */
    export interface td_chatEventMessageTtlChanged {
        '@type': 'chatEventMessageTtlChanged';
        /** Previous value of message_ttl */
        old_message_ttl: td_int32;
        /** New value of message_ttl */
        new_message_ttl: td_int32;
    }
    
    
    /** The sign_messages setting of a channel was toggled */
    export interface td_chatEventSignMessagesToggled {
        '@type': 'chatEventSignMessagesToggled';
        /** New value of sign_messages */
        sign_messages: td_Bool;
    }
    
    
    /** The has_protected_content setting of a channel was toggled */
    export interface td_chatEventHasProtectedContentToggled {
        '@type': 'chatEventHasProtectedContentToggled';
        /** New value of has_protected_content */
        has_protected_content: td_Bool;
    }
    
    
    /** The supergroup sticker set was changed */
    export interface td_chatEventStickerSetChanged {
        '@type': 'chatEventStickerSetChanged';
        /** Previous identifier of the chat sticker set; 0 if none */
        old_sticker_set_id: td_int64;
        /** New identifier of the chat sticker set; 0 if none */
        new_sticker_set_id: td_int64;
    }
    
    
    /** The supergroup location was changed */
    export interface td_chatEventLocationChanged {
        '@type': 'chatEventLocationChanged';
        /** Previous location; may be null */
        old_location?: td_chatLocation;
        /** New location; may be null */
        new_location?: td_chatLocation;
    }
    
    
    /** The is_all_history_available setting of a supergroup was toggled */
    export interface td_chatEventIsAllHistoryAvailableToggled {
        '@type': 'chatEventIsAllHistoryAvailableToggled';
        /** New value of is_all_history_available */
        is_all_history_available: td_Bool;
    }
    
    
    /** A chat invite link was edited */
    export interface td_chatEventInviteLinkEdited {
        '@type': 'chatEventInviteLinkEdited';
        /** Previous information about the invite link */
        old_invite_link: td_chatInviteLink;
        /** New information about the invite link */
        new_invite_link: td_chatInviteLink;
    }
    
    
    /** A chat invite link was revoked */
    export interface td_chatEventInviteLinkRevoked {
        '@type': 'chatEventInviteLinkRevoked';
        /** The invite link */
        invite_link: td_chatInviteLink;
    }
    
    
    /** A revoked chat invite link was deleted */
    export interface td_chatEventInviteLinkDeleted {
        '@type': 'chatEventInviteLinkDeleted';
        /** The invite link */
        invite_link: td_chatInviteLink;
    }
    
    
    /** A video chat was created */
    export interface td_chatEventVideoChatCreated {
        '@type': 'chatEventVideoChatCreated';
        /** Identifier of the video chat. The video chat can be received through the method getGroupCall */
        group_call_id: td_int32;
    }
    
    
    /** A video chat was ended */
    export interface td_chatEventVideoChatEnded {
        '@type': 'chatEventVideoChatEnded';
        /** Identifier of the video chat. The video chat can be received through the method getGroupCall */
        group_call_id: td_int32;
    }
    
    
    /** A video chat participant was muted or unmuted */
    export interface td_chatEventVideoChatParticipantIsMutedToggled {
        '@type': 'chatEventVideoChatParticipantIsMutedToggled';
        /** Identifier of the affected group call participant */
        participant_id: td_MessageSender;
        /** New value of is_muted */
        is_muted: td_Bool;
    }
    
    
    /** A video chat participant volume level was changed */
    export interface td_chatEventVideoChatParticipantVolumeLevelChanged {
        '@type': 'chatEventVideoChatParticipantVolumeLevelChanged';
        /** Identifier of the affected group call participant */
        participant_id: td_MessageSender;
        /** New value of volume_level; 1-20000 in hundreds of percents */
        volume_level: td_int32;
    }
    
    
    /** The mute_new_participants setting of a video chat was toggled */
    export interface td_chatEventVideoChatMuteNewParticipantsToggled {
        '@type': 'chatEventVideoChatMuteNewParticipantsToggled';
        /** New value of the mute_new_participants setting */
        mute_new_participants: td_Bool;
    }
    
    
    /** Represents a chat event */
    export interface td_chatEvent {
        '@type': 'chatEvent';
        /** Chat event identifier */
        id: td_int64;
        /** Point in time (Unix timestamp) when the event happened */
        date: td_int32;
        /** Identifier of the user or chat who performed the action */
        member_id: td_MessageSender;
        /** The action */
        action: td_ChatEventAction;
    }
    
    
    /** Contains a list of chat events */
    export interface td_chatEvents {
        '@type': 'chatEvents';
        /** List of events */
        events: td_vector<td_chatEvent>;
    }
    
    
    /** Represents a set of filters used to obtain a chat event log */
    export interface td_chatEventLogFilters {
        '@type': 'chatEventLogFilters';
        /** True, if message edits need to be returned */
        message_edits: td_Bool;
        /** True, if message deletions need to be returned */
        message_deletions: td_Bool;
        /** True, if pin/unpin events need to be returned */
        message_pins: td_Bool;
        /** True, if members joining events need to be returned */
        member_joins: td_Bool;
        /** True, if members leaving events need to be returned */
        member_leaves: td_Bool;
        /** True, if invited member events need to be returned */
        member_invites: td_Bool;
        /** True, if member promotion/demotion events need to be returned */
        member_promotions: td_Bool;
        /** True, if member restricted/unrestricted/banned/unbanned events need to be returned */
        member_restrictions: td_Bool;
        /** True, if changes in chat information need to be returned */
        info_changes: td_Bool;
        /** True, if changes in chat settings need to be returned */
        setting_changes: td_Bool;
        /** True, if changes to invite links need to be returned */
        invite_link_changes: td_Bool;
        /** True, if video chat actions need to be returned */
        video_chat_changes: td_Bool;
    }
    
    
    /** An ordinary language pack string */
    export interface td_languagePackStringValueOrdinary {
        '@type': 'languagePackStringValueOrdinary';
        /** String value */
        value: td_string;
    }
    
    
    /** A language pack string which has different forms based on the number of some object it mentions. See https://www.unicode.org/cldr/charts/latest/supplemental/language_plural_rules.html for more info */
    export interface td_languagePackStringValuePluralized {
        '@type': 'languagePackStringValuePluralized';
        /** Value for zero objects */
        zero_value: td_string;
        /** Value for one object */
        one_value: td_string;
        /** Value for two objects */
        two_value: td_string;
        /** Value for few objects */
        few_value: td_string;
        /** Value for many objects */
        many_value: td_string;
        /** Default value */
        other_value: td_string;
    }
    
    
    /** A deleted language pack string, the value must be taken from the built-in English language pack */
    export interface td_languagePackStringValueDeleted {
        '@type': 'languagePackStringValueDeleted';
    }
    
    
    /** Represents one language pack string */
    export interface td_languagePackString {
        '@type': 'languagePackString';
        /** String key */
        key: td_string;
        /** String value; pass null if the string needs to be taken from the built-in English language pack */
        value: td_LanguagePackStringValue;
    }
    
    
    /** Contains a list of language pack strings */
    export interface td_languagePackStrings {
        '@type': 'languagePackStrings';
        /** A list of language pack strings */
        strings: td_vector<td_languagePackString>;
    }
    
    
    /** Contains information about a language pack */
    export interface td_languagePackInfo {
        '@type': 'languagePackInfo';
        /** Unique language pack identifier */
        id: td_string;
        /** Identifier of a base language pack; may be empty. If a string is missed in the language pack, then it must be fetched from base language pack. Unsupported in custom language packs */
        base_language_pack_id: td_string;
        /** Language name */
        name: td_string;
        /** Name of the language in that language */
        native_name: td_string;
        /** A language code to be used to apply plural forms. See https://www.unicode.org/cldr/charts/latest/supplemental/language_plural_rules.html for more info */
        plural_code: td_string;
        /** True, if the language pack is official */
        is_official: td_Bool;
        /** True, if the language pack strings are RTL */
        is_rtl: td_Bool;
        /** True, if the language pack is a beta language pack */
        is_beta: td_Bool;
        /** True, if the language pack is installed by the current user */
        is_installed: td_Bool;
        /** Total number of non-deleted strings from the language pack */
        total_string_count: td_int32;
        /** Total number of translated strings from the language pack */
        translated_string_count: td_int32;
        /** Total number of non-deleted strings from the language pack available locally */
        local_string_count: td_int32;
        /** Link to language translation interface; empty for custom local language packs */
        translation_url: td_string;
    }
    
    
    /** Contains information about the current localization target */
    export interface td_localizationTargetInfo {
        '@type': 'localizationTargetInfo';
        /** List of available language packs for this application */
        language_packs: td_vector<td_languagePackInfo>;
    }
    
    
    /** A token for Firebase Cloud Messaging */
    export interface td_deviceTokenFirebaseCloudMessaging {
        '@type': 'deviceTokenFirebaseCloudMessaging';
        /** Device registration token; may be empty to deregister a device */
        token: td_string;
        /** True, if push notifications must be additionally encrypted */
        encrypt: td_Bool;
    }
    
    
    /** A token for Apple Push Notification service */
    export interface td_deviceTokenApplePush {
        '@type': 'deviceTokenApplePush';
        /** Device token; may be empty to deregister a device */
        device_token: td_string;
        /** True, if App Sandbox is enabled */
        is_app_sandbox: td_Bool;
    }
    
    
    /** A token for Apple Push Notification service VoIP notifications */
    export interface td_deviceTokenApplePushVoIP {
        '@type': 'deviceTokenApplePushVoIP';
        /** Device token; may be empty to deregister a device */
        device_token: td_string;
        /** True, if App Sandbox is enabled */
        is_app_sandbox: td_Bool;
        /** True, if push notifications must be additionally encrypted */
        encrypt: td_Bool;
    }
    
    
    /** A token for Windows Push Notification Services */
    export interface td_deviceTokenWindowsPush {
        '@type': 'deviceTokenWindowsPush';
        /** The access token that will be used to send notifications; may be empty to deregister a device */
        access_token: td_string;
    }
    
    
    /** A token for Microsoft Push Notification Service */
    export interface td_deviceTokenMicrosoftPush {
        '@type': 'deviceTokenMicrosoftPush';
        /** Push notification channel URI; may be empty to deregister a device */
        channel_uri: td_string;
    }
    
    
    /** A token for Microsoft Push Notification Service VoIP channel */
    export interface td_deviceTokenMicrosoftPushVoIP {
        '@type': 'deviceTokenMicrosoftPushVoIP';
        /** Push notification channel URI; may be empty to deregister a device */
        channel_uri: td_string;
    }
    
    
    /** A token for web Push API */
    export interface td_deviceTokenWebPush {
        '@type': 'deviceTokenWebPush';
        /** Absolute URL exposed by the push service where the application server can send push messages; may be empty to deregister a device */
        endpoint: td_string;
        /** Base64url-encoded P-256 elliptic curve Diffie-Hellman public key */
        p256dh_base64url: td_string;
        /** Base64url-encoded authentication secret */
        auth_base64url: td_string;
    }
    
    
    /** A token for Simple Push API for Firefox OS */
    export interface td_deviceTokenSimplePush {
        '@type': 'deviceTokenSimplePush';
        /** Absolute URL exposed by the push service where the application server can send push messages; may be empty to deregister a device */
        endpoint: td_string;
    }
    
    
    /** A token for Ubuntu Push Client service */
    export interface td_deviceTokenUbuntuPush {
        '@type': 'deviceTokenUbuntuPush';
        /** Token; may be empty to deregister a device */
        token: td_string;
    }
    
    
    /** A token for BlackBerry Push Service */
    export interface td_deviceTokenBlackBerryPush {
        '@type': 'deviceTokenBlackBerryPush';
        /** Token; may be empty to deregister a device */
        token: td_string;
    }
    
    
    /** A token for Tizen Push Service */
    export interface td_deviceTokenTizenPush {
        '@type': 'deviceTokenTizenPush';
        /** Push service registration identifier; may be empty to deregister a device */
        reg_id: td_string;
    }
    
    
    /** Contains a globally unique push receiver identifier, which can be used to identify which account has received a push notification */
    export interface td_pushReceiverId {
        '@type': 'pushReceiverId';
        /** The globally unique identifier of push notification subscription */
        id: td_int64;
    }
    
    
    /** Describes a solid fill of a background */
    export interface td_backgroundFillSolid {
        '@type': 'backgroundFillSolid';
        /** A color of the background in the RGB24 format */
        color: td_int32;
    }
    
    
    /** Describes a gradient fill of a background */
    export interface td_backgroundFillGradient {
        '@type': 'backgroundFillGradient';
        /** A top color of the background in the RGB24 format */
        top_color: td_int32;
        /** A bottom color of the background in the RGB24 format */
        bottom_color: td_int32;
        /** Clockwise rotation angle of the gradient, in degrees; 0-359. Must be always divisible by 45 */
        rotation_angle: td_int32;
    }
    
    
    /** Describes a freeform gradient fill of a background */
    export interface td_backgroundFillFreeformGradient {
        '@type': 'backgroundFillFreeformGradient';
        /** A list of 3 or 4 colors of the freeform gradients in the RGB24 format */
        colors: td_vector<td_int32>;
    }
    
    
    /** A wallpaper in JPEG format */
    export interface td_backgroundTypeWallpaper {
        '@type': 'backgroundTypeWallpaper';
        /** True, if the wallpaper must be downscaled to fit in 450x450 square and then box-blurred with radius 12 */
        is_blurred: td_Bool;
        /** True, if the background needs to be slightly moved when device is tilted */
        is_moving: td_Bool;
    }
    
    
    /** A PNG or TGV (gzipped subset of SVG with MIME type "application/x-tgwallpattern") pattern to be combined with the background fill chosen by the user */
    export interface td_backgroundTypePattern {
        '@type': 'backgroundTypePattern';
        /** Fill of the background */
        fill: td_BackgroundFill;
        /** Intensity of the pattern when it is shown above the filled background; 0-100. */
        intensity: td_int32;
        /** True, if the background fill must be applied only to the pattern itself. All other pixels are black in this case. For dark themes only */
        is_inverted: td_Bool;
        /** True, if the background needs to be slightly moved when device is tilted */
        is_moving: td_Bool;
    }
    
    
    /** A filled background */
    export interface td_backgroundTypeFill {
        '@type': 'backgroundTypeFill';
        /** The background fill */
        fill: td_BackgroundFill;
    }
    
    
    /** Describes a chat background */
    export interface td_background {
        '@type': 'background';
        /** Unique background identifier */
        id: td_int64;
        /** True, if this is one of default backgrounds */
        is_default: td_Bool;
        /** True, if the background is dark and is recommended to be used with dark theme */
        is_dark: td_Bool;
        /** Unique background name */
        name: td_string;
        /** Document with the background; may be null. Null only for filled backgrounds */
        document?: td_document;
        /** Type of the background */
        type: td_BackgroundType;
    }
    
    
    /** Contains a list of backgrounds */
    export interface td_backgrounds {
        '@type': 'backgrounds';
        /** A list of backgrounds */
        backgrounds: td_vector<td_background>;
    }
    
    
    /** A background from a local file */
    export interface td_inputBackgroundLocal {
        '@type': 'inputBackgroundLocal';
        /** Background file to use. Only inputFileLocal and inputFileGenerated are supported. The file must be in JPEG format for wallpapers and in PNG format for patterns */
        background: td_InputFile;
    }
    
    
    /** A background from the server */
    export interface td_inputBackgroundRemote {
        '@type': 'inputBackgroundRemote';
        /** The background identifier */
        background_id: td_int64;
    }
    
    
    /** Describes theme settings */
    export interface td_themeSettings {
        '@type': 'themeSettings';
        /** Theme accent color in ARGB format */
        accent_color: td_int32;
        /** The background to be used in chats; may be null */
        background?: td_background;
        /** The fill to be used as a background for outgoing messages */
        outgoing_message_fill: td_BackgroundFill;
        /** If true, the freeform gradient fill needs to be animated on every sent message */
        animate_outgoing_message_fill: td_Bool;
        /** Accent color of outgoing messages in ARGB format */
        outgoing_message_accent_color: td_int32;
    }
    
    
    /** Describes a chat theme */
    export interface td_chatTheme {
        '@type': 'chatTheme';
        /** Theme name */
        name: td_string;
        /** Theme settings for a light chat theme */
        light_settings: td_themeSettings;
        /** Theme settings for a dark chat theme */
        dark_settings: td_themeSettings;
    }
    
    
    /** Contains a list of hashtags */
    export interface td_hashtags {
        '@type': 'hashtags';
        /** A list of hashtags */
        hashtags: td_vector<td_string>;
    }
    
    
    /** The session can be used */
    export interface td_canTransferOwnershipResultOk {
        '@type': 'canTransferOwnershipResultOk';
    }
    
    
    /** The 2-step verification needs to be enabled first */
    export interface td_canTransferOwnershipResultPasswordNeeded {
        '@type': 'canTransferOwnershipResultPasswordNeeded';
    }
    
    
    /** The 2-step verification was enabled recently, user needs to wait */
    export interface td_canTransferOwnershipResultPasswordTooFresh {
        '@type': 'canTransferOwnershipResultPasswordTooFresh';
        /** Time left before the session can be used to transfer ownership of a chat, in seconds */
        retry_after: td_int32;
    }
    
    
    /** The session was created recently, user needs to wait */
    export interface td_canTransferOwnershipResultSessionTooFresh {
        '@type': 'canTransferOwnershipResultSessionTooFresh';
        /** Time left before the session can be used to transfer ownership of a chat, in seconds */
        retry_after: td_int32;
    }
    
    
    /** The username can be set */
    export interface td_checkChatUsernameResultOk {
        '@type': 'checkChatUsernameResultOk';
    }
    
    
    /** The username is invalid */
    export interface td_checkChatUsernameResultUsernameInvalid {
        '@type': 'checkChatUsernameResultUsernameInvalid';
    }
    
    
    /** The username is occupied */
    export interface td_checkChatUsernameResultUsernameOccupied {
        '@type': 'checkChatUsernameResultUsernameOccupied';
    }
    
    
    /** The user has too much chats with username, one of them must be made private first */
    export interface td_checkChatUsernameResultPublicChatsTooMuch {
        '@type': 'checkChatUsernameResultPublicChatsTooMuch';
    }
    
    
    /** The user can't be a member of a public supergroup */
    export interface td_checkChatUsernameResultPublicGroupsUnavailable {
        '@type': 'checkChatUsernameResultPublicGroupsUnavailable';
    }
    
    
    /** The name can be set */
    export interface td_checkStickerSetNameResultOk {
        '@type': 'checkStickerSetNameResultOk';
    }
    
    
    /** The name is invalid */
    export interface td_checkStickerSetNameResultNameInvalid {
        '@type': 'checkStickerSetNameResultNameInvalid';
    }
    
    
    /** The name is occupied */
    export interface td_checkStickerSetNameResultNameOccupied {
        '@type': 'checkStickerSetNameResultNameOccupied';
    }
    
    
    /** The password was reset */
    export interface td_resetPasswordResultOk {
        '@type': 'resetPasswordResultOk';
    }
    
    
    /** The password reset request is pending */
    export interface td_resetPasswordResultPending {
        '@type': 'resetPasswordResultPending';
        /** Point in time (Unix timestamp) after which the password can be reset immediately using resetPassword */
        pending_reset_date: td_int32;
    }
    
    
    /** The password reset request was declined */
    export interface td_resetPasswordResultDeclined {
        '@type': 'resetPasswordResultDeclined';
        /** Point in time (Unix timestamp) when the password reset can be retried */
        retry_date: td_int32;
    }
    
    
    /** The messages was exported from a private chat */
    export interface td_messageFileTypePrivate {
        '@type': 'messageFileTypePrivate';
        /** Name of the other party; may be empty if unrecognized */
        name: td_string;
    }
    
    
    /** The messages was exported from a group chat */
    export interface td_messageFileTypeGroup {
        '@type': 'messageFileTypeGroup';
        /** Title of the group chat; may be empty if unrecognized */
        title: td_string;
    }
    
    
    /** The messages was exported from a chat of unknown type */
    export interface td_messageFileTypeUnknown {
        '@type': 'messageFileTypeUnknown';
    }
    
    
    /** A general message with hidden content */
    export interface td_pushMessageContentHidden {
        '@type': 'pushMessageContentHidden';
        /** True, if the message is a pinned message with the specified content */
        is_pinned: td_Bool;
    }
    
    
    /** An animation message (GIF-style). */
    export interface td_pushMessageContentAnimation {
        '@type': 'pushMessageContentAnimation';
        /** Message content; may be null */
        animation?: td_animation;
        /** Animation caption */
        caption: td_string;
        /** True, if the message is a pinned message with the specified content */
        is_pinned: td_Bool;
    }
    
    
    /** An audio message */
    export interface td_pushMessageContentAudio {
        '@type': 'pushMessageContentAudio';
        /** Message content; may be null */
        audio?: td_audio;
        /** True, if the message is a pinned message with the specified content */
        is_pinned: td_Bool;
    }
    
    
    /** A message with a user contact */
    export interface td_pushMessageContentContact {
        '@type': 'pushMessageContentContact';
        /** Contact's name */
        name: td_string;
        /** True, if the message is a pinned message with the specified content */
        is_pinned: td_Bool;
    }
    
    
    /** A contact has registered with Telegram */
    export interface td_pushMessageContentContactRegistered {
        '@type': 'pushMessageContentContactRegistered';
    }
    
    
    /** A document message (a general file) */
    export interface td_pushMessageContentDocument {
        '@type': 'pushMessageContentDocument';
        /** Message content; may be null */
        document?: td_document;
        /** True, if the message is a pinned message with the specified content */
        is_pinned: td_Bool;
    }
    
    
    /** A message with a game */
    export interface td_pushMessageContentGame {
        '@type': 'pushMessageContentGame';
        /** Game title, empty for pinned game message */
        title: td_string;
        /** True, if the message is a pinned message with the specified content */
        is_pinned: td_Bool;
    }
    
    
    /** A new high score was achieved in a game */
    export interface td_pushMessageContentGameScore {
        '@type': 'pushMessageContentGameScore';
        /** Game title, empty for pinned message */
        title: td_string;
        /** New score, 0 for pinned message */
        score: td_int32;
        /** True, if the message is a pinned message with the specified content */
        is_pinned: td_Bool;
    }
    
    
    /** A message with an invoice from a bot */
    export interface td_pushMessageContentInvoice {
        '@type': 'pushMessageContentInvoice';
        /** Product price */
        price: td_string;
        /** True, if the message is a pinned message with the specified content */
        is_pinned: td_Bool;
    }
    
    
    /** A message with a location */
    export interface td_pushMessageContentLocation {
        '@type': 'pushMessageContentLocation';
        /** True, if the location is live */
        is_live: td_Bool;
        /** True, if the message is a pinned message with the specified content */
        is_pinned: td_Bool;
    }
    
    
    /** A photo message */
    export interface td_pushMessageContentPhoto {
        '@type': 'pushMessageContentPhoto';
        /** Message content; may be null */
        photo?: td_photo;
        /** Photo caption */
        caption: td_string;
        /** True, if the photo is secret */
        is_secret: td_Bool;
        /** True, if the message is a pinned message with the specified content */
        is_pinned: td_Bool;
    }
    
    
    /** A message with a poll */
    export interface td_pushMessageContentPoll {
        '@type': 'pushMessageContentPoll';
        /** Poll question */
        question: td_string;
        /** True, if the poll is regular and not in quiz mode */
        is_regular: td_Bool;
        /** True, if the message is a pinned message with the specified content */
        is_pinned: td_Bool;
    }
    
    
    /** A screenshot of a message in the chat has been taken */
    export interface td_pushMessageContentScreenshotTaken {
        '@type': 'pushMessageContentScreenshotTaken';
    }
    
    
    /** A message with a sticker */
    export interface td_pushMessageContentSticker {
        '@type': 'pushMessageContentSticker';
        /** Message content; may be null */
        sticker?: td_sticker;
        /** Emoji corresponding to the sticker; may be empty */
        emoji: td_string;
        /** True, if the message is a pinned message with the specified content */
        is_pinned: td_Bool;
    }
    
    
    /** A text message */
    export interface td_pushMessageContentText {
        '@type': 'pushMessageContentText';
        /** Message text */
        text: td_string;
        /** True, if the message is a pinned message with the specified content */
        is_pinned: td_Bool;
    }
    
    
    /** A video message */
    export interface td_pushMessageContentVideo {
        '@type': 'pushMessageContentVideo';
        /** Message content; may be null */
        video?: td_video;
        /** Video caption */
        caption: td_string;
        /** True, if the video is secret */
        is_secret: td_Bool;
        /** True, if the message is a pinned message with the specified content */
        is_pinned: td_Bool;
    }
    
    
    /** A video note message */
    export interface td_pushMessageContentVideoNote {
        '@type': 'pushMessageContentVideoNote';
        /** Message content; may be null */
        video_note?: td_videoNote;
        /** True, if the message is a pinned message with the specified content */
        is_pinned: td_Bool;
    }
    
    
    /** A voice note message */
    export interface td_pushMessageContentVoiceNote {
        '@type': 'pushMessageContentVoiceNote';
        /** Message content; may be null */
        voice_note?: td_voiceNote;
        /** True, if the message is a pinned message with the specified content */
        is_pinned: td_Bool;
    }
    
    
    /** A newly created basic group */
    export interface td_pushMessageContentBasicGroupChatCreate {
        '@type': 'pushMessageContentBasicGroupChatCreate';
    }
    
    
    /** New chat members were invited to a group */
    export interface td_pushMessageContentChatAddMembers {
        '@type': 'pushMessageContentChatAddMembers';
        /** Name of the added member */
        member_name: td_string;
        /** True, if the current user was added to the group */
        is_current_user: td_Bool;
        /** True, if the user has returned to the group themselves */
        is_returned: td_Bool;
    }
    
    
    /** A chat photo was edited */
    export interface td_pushMessageContentChatChangePhoto {
        '@type': 'pushMessageContentChatChangePhoto';
    }
    
    
    /** A chat title was edited */
    export interface td_pushMessageContentChatChangeTitle {
        '@type': 'pushMessageContentChatChangeTitle';
        /** New chat title */
        title: td_string;
    }
    
    
    /** A chat theme was edited */
    export interface td_pushMessageContentChatSetTheme {
        '@type': 'pushMessageContentChatSetTheme';
        /** If non-empty, name of a new theme, set for the chat. Otherwise chat theme was reset to the default one */
        theme_name: td_string;
    }
    
    
    /** A chat member was deleted */
    export interface td_pushMessageContentChatDeleteMember {
        '@type': 'pushMessageContentChatDeleteMember';
        /** Name of the deleted member */
        member_name: td_string;
        /** True, if the current user was deleted from the group */
        is_current_user: td_Bool;
        /** True, if the user has left the group themselves */
        is_left: td_Bool;
    }
    
    
    /** A new member joined the chat via an invite link */
    export interface td_pushMessageContentChatJoinByLink {
        '@type': 'pushMessageContentChatJoinByLink';
    }
    
    
    /** A new member was accepted to the chat by an administrator */
    export interface td_pushMessageContentChatJoinByRequest {
        '@type': 'pushMessageContentChatJoinByRequest';
    }
    
    
    /** A forwarded messages */
    export interface td_pushMessageContentMessageForwards {
        '@type': 'pushMessageContentMessageForwards';
        /** Number of forwarded messages */
        total_count: td_int32;
    }
    
    
    /** A media album */
    export interface td_pushMessageContentMediaAlbum {
        '@type': 'pushMessageContentMediaAlbum';
        /** Number of messages in the album */
        total_count: td_int32;
        /** True, if the album has at least one photo */
        has_photos: td_Bool;
        /** True, if the album has at least one video */
        has_videos: td_Bool;
        /** True, if the album has at least one audio file */
        has_audios: td_Bool;
        /** True, if the album has at least one document */
        has_documents: td_Bool;
    }
    
    
    /** New message was received */
    export interface td_notificationTypeNewMessage {
        '@type': 'notificationTypeNewMessage';
        /** The message */
        message: td_message;
    }
    
    
    /** New secret chat was created */
    export interface td_notificationTypeNewSecretChat {
        '@type': 'notificationTypeNewSecretChat';
    }
    
    
    /** New call was received */
    export interface td_notificationTypeNewCall {
        '@type': 'notificationTypeNewCall';
        /** Call identifier */
        call_id: td_int32;
    }
    
    
    /** New message was received through a push notification */
    export interface td_notificationTypeNewPushMessage {
        '@type': 'notificationTypeNewPushMessage';
        /** The message identifier. The message will not be available in the chat history, but the ID can be used in viewMessages, or as reply_to_message_id */
        message_id: td_int53;
        /** Identifier of the sender of the message. Corresponding user or chat may be inaccessible */
        sender_id: td_MessageSender;
        /** Name of the sender */
        sender_name: td_string;
        /** True, if the message is outgoing */
        is_outgoing: td_Bool;
        /** Push message content */
        content: td_PushMessageContent;
    }
    
    
    /** A group containing notifications of type notificationTypeNewMessage and notificationTypeNewPushMessage with ordinary unread messages */
    export interface td_notificationGroupTypeMessages {
        '@type': 'notificationGroupTypeMessages';
    }
    
    
    /** A group containing notifications of type notificationTypeNewMessage and notificationTypeNewPushMessage with unread mentions of the current user, replies to their messages, or a pinned message */
    export interface td_notificationGroupTypeMentions {
        '@type': 'notificationGroupTypeMentions';
    }
    
    
    /** A group containing a notification of type notificationTypeNewSecretChat */
    export interface td_notificationGroupTypeSecretChat {
        '@type': 'notificationGroupTypeSecretChat';
    }
    
    
    /** A group containing notifications of type notificationTypeNewCall */
    export interface td_notificationGroupTypeCalls {
        '@type': 'notificationGroupTypeCalls';
    }
    
    
    /** Contains information about a notification */
    export interface td_notification {
        '@type': 'notification';
        /** Unique persistent identifier of this notification */
        id: td_int32;
        /** Notification date */
        date: td_int32;
        /** True, if the notification was initially silent */
        is_silent: td_Bool;
        /** Notification type */
        type: td_NotificationType;
    }
    
    
    /** Describes a group of notifications */
    export interface td_notificationGroup {
        '@type': 'notificationGroup';
        /** Unique persistent auto-incremented from 1 identifier of the notification group */
        id: td_int32;
        /** Type of the group */
        type: td_NotificationGroupType;
        /** Identifier of a chat to which all notifications in the group belong */
        chat_id: td_int53;
        /** Total number of active notifications in the group */
        total_count: td_int32;
        /** The list of active notifications */
        notifications: td_vector<td_notification>;
    }
    
    
    /** Represents a boolean option */
    export interface td_optionValueBoolean {
        '@type': 'optionValueBoolean';
        /** The value of the option */
        value: td_Bool;
    }
    
    
    /** Represents an unknown option or an option which has a default value */
    export interface td_optionValueEmpty {
        '@type': 'optionValueEmpty';
    }
    
    
    /** Represents an integer option */
    export interface td_optionValueInteger {
        '@type': 'optionValueInteger';
        /** The value of the option */
        value: td_int64;
    }
    
    
    /** Represents a string option */
    export interface td_optionValueString {
        '@type': 'optionValueString';
        /** The value of the option */
        value: td_string;
    }
    
    
    /** Represents one member of a JSON object */
    export interface td_jsonObjectMember {
        '@type': 'jsonObjectMember';
        /** Member's key */
        key: td_string;
        /** Member's value */
        value: td_JsonValue;
    }
    
    
    /** Represents a null JSON value */
    export interface td_jsonValueNull {
        '@type': 'jsonValueNull';
    }
    
    
    /** Represents a boolean JSON value */
    export interface td_jsonValueBoolean {
        '@type': 'jsonValueBoolean';
        /** The value */
        value: td_Bool;
    }
    
    
    /** Represents a numeric JSON value */
    export interface td_jsonValueNumber {
        '@type': 'jsonValueNumber';
        /** The value */
        value: td_double;
    }
    
    
    /** Represents a string JSON value */
    export interface td_jsonValueString {
        '@type': 'jsonValueString';
        /** The value */
        value: td_string;
    }
    
    
    /** Represents a JSON array */
    export interface td_jsonValueArray {
        '@type': 'jsonValueArray';
        /** The list of array elements */
        values: td_vector<td_JsonValue>;
    }
    
    
    /** Represents a JSON object */
    export interface td_jsonValueObject {
        '@type': 'jsonValueObject';
        /** The list of object members */
        members: td_vector<td_jsonObjectMember>;
    }
    
    
    /** A rule to allow all users to do something */
    export interface td_userPrivacySettingRuleAllowAll {
        '@type': 'userPrivacySettingRuleAllowAll';
    }
    
    
    /** A rule to allow all of a user's contacts to do something */
    export interface td_userPrivacySettingRuleAllowContacts {
        '@type': 'userPrivacySettingRuleAllowContacts';
    }
    
    
    /** A rule to allow certain specified users to do something */
    export interface td_userPrivacySettingRuleAllowUsers {
        '@type': 'userPrivacySettingRuleAllowUsers';
        /** The user identifiers, total number of users in all rules must not exceed 1000 */
        user_ids: td_vector<td_int53>;
    }
    
    
    /** A rule to allow all members of certain specified basic groups and supergroups to doing something */
    export interface td_userPrivacySettingRuleAllowChatMembers {
        '@type': 'userPrivacySettingRuleAllowChatMembers';
        /** The chat identifiers, total number of chats in all rules must not exceed 20 */
        chat_ids: td_vector<td_int53>;
    }
    
    
    /** A rule to restrict all users from doing something */
    export interface td_userPrivacySettingRuleRestrictAll {
        '@type': 'userPrivacySettingRuleRestrictAll';
    }
    
    
    /** A rule to restrict all contacts of a user from doing something */
    export interface td_userPrivacySettingRuleRestrictContacts {
        '@type': 'userPrivacySettingRuleRestrictContacts';
    }
    
    
    /** A rule to restrict all specified users from doing something */
    export interface td_userPrivacySettingRuleRestrictUsers {
        '@type': 'userPrivacySettingRuleRestrictUsers';
        /** The user identifiers, total number of users in all rules must not exceed 1000 */
        user_ids: td_vector<td_int53>;
    }
    
    
    /** A rule to restrict all members of specified basic groups and supergroups from doing something */
    export interface td_userPrivacySettingRuleRestrictChatMembers {
        '@type': 'userPrivacySettingRuleRestrictChatMembers';
        /** The chat identifiers, total number of chats in all rules must not exceed 20 */
        chat_ids: td_vector<td_int53>;
    }
    
    
    /** A list of privacy rules. Rules are matched in the specified order. The first matched rule defines the privacy setting for a given user. If no rule matches, the action is not allowed */
    export interface td_userPrivacySettingRules {
        '@type': 'userPrivacySettingRules';
        /** A list of rules */
        rules: td_vector<td_UserPrivacySettingRule>;
    }
    
    
    /** A privacy setting for managing whether the user's online status is visible */
    export interface td_userPrivacySettingShowStatus {
        '@type': 'userPrivacySettingShowStatus';
    }
    
    
    /** A privacy setting for managing whether the user's profile photo is visible */
    export interface td_userPrivacySettingShowProfilePhoto {
        '@type': 'userPrivacySettingShowProfilePhoto';
    }
    
    
    /** A privacy setting for managing whether a link to the user's account is included in forwarded messages */
    export interface td_userPrivacySettingShowLinkInForwardedMessages {
        '@type': 'userPrivacySettingShowLinkInForwardedMessages';
    }
    
    
    /** A privacy setting for managing whether the user's phone number is visible */
    export interface td_userPrivacySettingShowPhoneNumber {
        '@type': 'userPrivacySettingShowPhoneNumber';
    }
    
    
    /** A privacy setting for managing whether the user can be invited to chats */
    export interface td_userPrivacySettingAllowChatInvites {
        '@type': 'userPrivacySettingAllowChatInvites';
    }
    
    
    /** A privacy setting for managing whether the user can be called */
    export interface td_userPrivacySettingAllowCalls {
        '@type': 'userPrivacySettingAllowCalls';
    }
    
    
    /** A privacy setting for managing whether peer-to-peer connections can be used for calls */
    export interface td_userPrivacySettingAllowPeerToPeerCalls {
        '@type': 'userPrivacySettingAllowPeerToPeerCalls';
    }
    
    
    /** A privacy setting for managing whether the user can be found by their phone number. Checked only if the phone number is not known to the other user. Can be set only to "Allow contacts" or "Allow all" */
    export interface td_userPrivacySettingAllowFindingByPhoneNumber {
        '@type': 'userPrivacySettingAllowFindingByPhoneNumber';
    }
    
    
    /** Contains information about the period of inactivity after which the current user's account will automatically be deleted */
    export interface td_accountTtl {
        '@type': 'accountTtl';
        /** Number of days of inactivity before the account will be flagged for deletion; 30-366 days */
        days: td_int32;
    }
    
    
    /** Contains information about one session in a Telegram application used by the current user. Sessions must be shown to the user in the returned order */
    export interface td_session {
        '@type': 'session';
        /** Session identifier */
        id: td_int64;
        /** True, if this session is the current session */
        is_current: td_Bool;
        /** True, if a password is needed to complete authorization of the session */
        is_password_pending: td_Bool;
        /** True, if incoming secret chats can be accepted by the session */
        can_accept_secret_chats: td_Bool;
        /** True, if incoming calls can be accepted by the session */
        can_accept_calls: td_Bool;
        /** Telegram API identifier, as provided by the application */
        api_id: td_int32;
        /** Name of the application, as provided by the application */
        application_name: td_string;
        /** The version of the application, as provided by the application */
        application_version: td_string;
        /** True, if the application is an official application or uses the api_id of an official application */
        is_official_application: td_Bool;
        /** Model of the device the application has been run or is running on, as provided by the application */
        device_model: td_string;
        /** Operating system the application has been run or is running on, as provided by the application */
        platform: td_string;
        /** Version of the operating system the application has been run or is running on, as provided by the application */
        system_version: td_string;
        /** Point in time (Unix timestamp) when the user has logged in */
        log_in_date: td_int32;
        /** Point in time (Unix timestamp) when the session was last used */
        last_active_date: td_int32;
        /** IP address from which the session was created, in human-readable format */
        ip: td_string;
        /** A two-letter country code for the country from which the session was created, based on the IP address */
        country: td_string;
        /** Region code from which the session was created, based on the IP address */
        region: td_string;
    }
    
    
    /** Contains a list of sessions */
    export interface td_sessions {
        '@type': 'sessions';
        /** List of sessions */
        sessions: td_vector<td_session>;
        /** Number of days of inactivity before sessions will automatically be terminated; 1-366 days */
        inactive_session_ttl_days: td_int32;
    }
    
    
    /** Contains information about one website the current user is logged in with Telegram */
    export interface td_connectedWebsite {
        '@type': 'connectedWebsite';
        /** Website identifier */
        id: td_int64;
        /** The domain name of the website */
        domain_name: td_string;
        /** User identifier of a bot linked with the website */
        bot_user_id: td_int53;
        /** The version of a browser used to log in */
        browser: td_string;
        /** Operating system the browser is running on */
        platform: td_string;
        /** Point in time (Unix timestamp) when the user was logged in */
        log_in_date: td_int32;
        /** Point in time (Unix timestamp) when obtained authorization was last used */
        last_active_date: td_int32;
        /** IP address from which the user was logged in, in human-readable format */
        ip: td_string;
        /** Human-readable description of a country and a region, from which the user was logged in, based on the IP address */
        location: td_string;
    }
    
    
    /** Contains a list of websites the current user is logged in with Telegram */
    export interface td_connectedWebsites {
        '@type': 'connectedWebsites';
        /** List of connected websites */
        websites: td_vector<td_connectedWebsite>;
    }
    
    
    /** The chat contains spam messages */
    export interface td_chatReportReasonSpam {
        '@type': 'chatReportReasonSpam';
    }
    
    
    /** The chat promotes violence */
    export interface td_chatReportReasonViolence {
        '@type': 'chatReportReasonViolence';
    }
    
    
    /** The chat contains pornographic messages */
    export interface td_chatReportReasonPornography {
        '@type': 'chatReportReasonPornography';
    }
    
    
    /** The chat has child abuse related content */
    export interface td_chatReportReasonChildAbuse {
        '@type': 'chatReportReasonChildAbuse';
    }
    
    
    /** The chat contains copyrighted content */
    export interface td_chatReportReasonCopyright {
        '@type': 'chatReportReasonCopyright';
    }
    
    
    /** The location-based chat is unrelated to its stated location */
    export interface td_chatReportReasonUnrelatedLocation {
        '@type': 'chatReportReasonUnrelatedLocation';
    }
    
    
    /** The chat represents a fake account */
    export interface td_chatReportReasonFake {
        '@type': 'chatReportReasonFake';
    }
    
    
    /** A custom reason provided by the user */
    export interface td_chatReportReasonCustom {
        '@type': 'chatReportReasonCustom';
    }
    
    
    /** The link is a link to the active sessions section of the app. Use getActiveSessions to handle the link */
    export interface td_internalLinkTypeActiveSessions {
        '@type': 'internalLinkTypeActiveSessions';
    }
    
    
    /** The link contains an authentication code. Call checkAuthenticationCode with the code if the current authorization state is authorizationStateWaitCode */
    export interface td_internalLinkTypeAuthenticationCode {
        '@type': 'internalLinkTypeAuthenticationCode';
        /** The authentication code */
        code: td_string;
    }
    
    
    /** The link is a link to a background. Call searchBackground with the given background name to process the link */
    export interface td_internalLinkTypeBackground {
        '@type': 'internalLinkTypeBackground';
        /** Name of the background */
        background_name: td_string;
    }
    
    
    /** The link is a link to a chat with a Telegram bot. Call searchPublicChat with the given bot username, check that the user is a bot, show START button in the chat with the bot, -and then call sendBotStartMessage with the given start parameter after the button is pressed */
    export interface td_internalLinkTypeBotStart {
        '@type': 'internalLinkTypeBotStart';
        /** Username of the bot */
        bot_username: td_string;
        /** The parameter to be passed to sendBotStartMessage */
        start_parameter: td_string;
    }
    
    
    /** The link is a link to a Telegram bot, which is supposed to be added to a group chat. Call searchPublicChat with the given bot username, check that the user is a bot and can be added to groups, -ask the current user to select a group to add the bot to, and then call sendBotStartMessage with the given start parameter and the chosen group chat. Bots can be added to a public group only by administrators of the group */
    export interface td_internalLinkTypeBotStartInGroup {
        '@type': 'internalLinkTypeBotStartInGroup';
        /** Username of the bot */
        bot_username: td_string;
        /** The parameter to be passed to sendBotStartMessage */
        start_parameter: td_string;
    }
    
    
    /** The link is a link to the change phone number section of the app */
    export interface td_internalLinkTypeChangePhoneNumber {
        '@type': 'internalLinkTypeChangePhoneNumber';
    }
    
    
    /** The link is a chat invite link. Call checkChatInviteLink with the given invite link to process the link */
    export interface td_internalLinkTypeChatInvite {
        '@type': 'internalLinkTypeChatInvite';
        /** Internal representation of the invite link */
        invite_link: td_string;
    }
    
    
    /** The link is a link to the filter settings section of the app */
    export interface td_internalLinkTypeFilterSettings {
        '@type': 'internalLinkTypeFilterSettings';
    }
    
    
    /** The link is a link to a game. Call searchPublicChat with the given bot username, check that the user is a bot, ask the current user to select a chat to send the game, and then call sendMessage with inputMessageGame */
    export interface td_internalLinkTypeGame {
        '@type': 'internalLinkTypeGame';
        /** Username of the bot that owns the game */
        bot_username: td_string;
        /** Short name of the game */
        game_short_name: td_string;
    }
    
    
    /** The link is a link to a language pack. Call getLanguagePackInfo with the given language pack identifier to process the link */
    export interface td_internalLinkTypeLanguagePack {
        '@type': 'internalLinkTypeLanguagePack';
        /** Language pack identifier */
        language_pack_id: td_string;
    }
    
    
    /** The link is a link to a Telegram message. Call getMessageLinkInfo with the given URL to process the link */
    export interface td_internalLinkTypeMessage {
        '@type': 'internalLinkTypeMessage';
        /** URL to be passed to getMessageLinkInfo */
        url: td_string;
    }
    
    
    /** The link contains a message draft text. A share screen needs to be shown to the user, then the chosen chat must be opened and the text is added to the input field */
    export interface td_internalLinkTypeMessageDraft {
        '@type': 'internalLinkTypeMessageDraft';
        /** Message draft text */
        text: td_formattedText;
        /** True, if the first line of the text contains a link. If true, the input field needs to be focused and the text after the link must be selected */
        contains_link: td_Bool;
    }
    
    
    /** The link contains a request of Telegram passport data. Call getPassportAuthorizationForm with the given parameters to process the link if the link was received from outside of the app, otherwise ignore it */
    export interface td_internalLinkTypePassportDataRequest {
        '@type': 'internalLinkTypePassportDataRequest';
        /** User identifier of the service's bot */
        bot_user_id: td_int53;
        /** Telegram Passport element types requested by the service */
        scope: td_string;
        /** Service's public key */
        public_key: td_string;
        /** Unique request identifier provided by the service */
        nonce: td_string;
        /** An HTTP URL to open once the request is finished or canceled with the parameter tg_passport=success or tg_passport=cancel respectively. If empty, then the link tgbot{bot_user_id}://passport/success or tgbot{bot_user_id}://passport/cancel needs to be opened instead */
        callback_url: td_string;
    }
    
    
    /** The link can be used to confirm ownership of a phone number to prevent account deletion. Call sendPhoneNumberConfirmationCode with the given hash and phone number to process the link */
    export interface td_internalLinkTypePhoneNumberConfirmation {
        '@type': 'internalLinkTypePhoneNumberConfirmation';
        /** Hash value from the link */
        hash: td_string;
        /** Phone number value from the link */
        phone_number: td_string;
    }
    
    
    /** The link is a link to a proxy. Call addProxy with the given parameters to process the link and add the proxy */
    export interface td_internalLinkTypeProxy {
        '@type': 'internalLinkTypeProxy';
        /** Proxy server IP address */
        server: td_string;
        /** Proxy server port */
        port: td_int32;
        /** Type of the proxy */
        type: td_ProxyType;
    }
    
    
    /** The link is a link to a chat by its username. Call searchPublicChat with the given chat username to process the link */
    export interface td_internalLinkTypePublicChat {
        '@type': 'internalLinkTypePublicChat';
        /** Username of the chat */
        chat_username: td_string;
    }
    
    
    /** The link can be used to login the current user on another device, but it must be scanned from QR-code using in-app camera. An alert similar to -"This code can be used to allow someone to log in to your Telegram account. To confirm Telegram login, please go to Settings > Devices > Scan QR and scan the code" needs to be shown */
    export interface td_internalLinkTypeQrCodeAuthentication {
        '@type': 'internalLinkTypeQrCodeAuthentication';
    }
    
    
    /** The link is a link to app settings */
    export interface td_internalLinkTypeSettings {
        '@type': 'internalLinkTypeSettings';
    }
    
    
    /** The link is a link to a sticker set. Call searchStickerSet with the given sticker set name to process the link and show the sticker set */
    export interface td_internalLinkTypeStickerSet {
        '@type': 'internalLinkTypeStickerSet';
        /** Name of the sticker set */
        sticker_set_name: td_string;
    }
    
    
    /** The link is a link to a theme. TDLib has no theme support yet */
    export interface td_internalLinkTypeTheme {
        '@type': 'internalLinkTypeTheme';
        /** Name of the theme */
        theme_name: td_string;
    }
    
    
    /** The link is a link to the theme settings section of the app */
    export interface td_internalLinkTypeThemeSettings {
        '@type': 'internalLinkTypeThemeSettings';
    }
    
    
    /** The link is an unknown tg: link. Call getDeepLinkInfo to process the link */
    export interface td_internalLinkTypeUnknownDeepLink {
        '@type': 'internalLinkTypeUnknownDeepLink';
        /** Link to be passed to getDeepLinkInfo */
        link: td_string;
    }
    
    
    /** The link is a link to an unsupported proxy. An alert can be shown to the user */
    export interface td_internalLinkTypeUnsupportedProxy {
        '@type': 'internalLinkTypeUnsupportedProxy';
    }
    
    
    /** The link is a link to a video chat. Call searchPublicChat with the given chat username, and then joinGoupCall with the given invite hash to process the link */
    export interface td_internalLinkTypeVideoChat {
        '@type': 'internalLinkTypeVideoChat';
        /** Username of the chat with the video chat */
        chat_username: td_string;
        /** If non-empty, invite hash to be used to join the video chat without being muted by administrators */
        invite_hash: td_string;
        /** True, if the video chat is expected to be a live stream in a channel or a broadcast group */
        is_live_stream: td_Bool;
    }
    
    
    /** Contains an HTTPS link to a message in a supergroup or channel */
    export interface td_messageLink {
        '@type': 'messageLink';
        /** Message link */
        link: td_string;
        /** True, if the link will work for non-members of the chat */
        is_public: td_Bool;
    }
    
    
    /** Contains information about a link to a message in a chat */
    export interface td_messageLinkInfo {
        '@type': 'messageLinkInfo';
        /** True, if the link is a public link for a message in a chat */
        is_public: td_Bool;
        /** If found, identifier of the chat to which the message belongs, 0 otherwise */
        chat_id: td_int53;
        /** If found, the linked message; may be null */
        message?: td_message;
        /** Timestamp from which the video/audio/video note/voice note playing must start, in seconds; 0 if not specified. The media can be in the message content or in its web page preview */
        media_timestamp: td_int32;
        /** True, if the whole media album to which the message belongs is linked */
        for_album: td_Bool;
        /** True, if the message is linked as a channel post comment or from a message thread */
        for_comment: td_Bool;
    }
    
    
    /** Contains a part of a file */
    export interface td_filePart {
        '@type': 'filePart';
        /** File bytes */
        data: td_blob;
    }
    
    
    /** The data is not a file */
    export interface td_fileTypeNone {
        '@type': 'fileTypeNone';
    }
    
    
    /** The file is an animation */
    export interface td_fileTypeAnimation {
        '@type': 'fileTypeAnimation';
    }
    
    
    /** The file is an audio file */
    export interface td_fileTypeAudio {
        '@type': 'fileTypeAudio';
    }
    
    
    /** The file is a document */
    export interface td_fileTypeDocument {
        '@type': 'fileTypeDocument';
    }
    
    
    /** The file is a photo */
    export interface td_fileTypePhoto {
        '@type': 'fileTypePhoto';
    }
    
    
    /** The file is a profile photo */
    export interface td_fileTypeProfilePhoto {
        '@type': 'fileTypeProfilePhoto';
    }
    
    
    /** The file was sent to a secret chat (the file type is not known to the server) */
    export interface td_fileTypeSecret {
        '@type': 'fileTypeSecret';
    }
    
    
    /** The file is a thumbnail of a file from a secret chat */
    export interface td_fileTypeSecretThumbnail {
        '@type': 'fileTypeSecretThumbnail';
    }
    
    
    /** The file is a file from Secure storage used for storing Telegram Passport files */
    export interface td_fileTypeSecure {
        '@type': 'fileTypeSecure';
    }
    
    
    /** The file is a sticker */
    export interface td_fileTypeSticker {
        '@type': 'fileTypeSticker';
    }
    
    
    /** The file is a thumbnail of another file */
    export interface td_fileTypeThumbnail {
        '@type': 'fileTypeThumbnail';
    }
    
    
    /** The file type is not yet known */
    export interface td_fileTypeUnknown {
        '@type': 'fileTypeUnknown';
    }
    
    
    /** The file is a video */
    export interface td_fileTypeVideo {
        '@type': 'fileTypeVideo';
    }
    
    
    /** The file is a video note */
    export interface td_fileTypeVideoNote {
        '@type': 'fileTypeVideoNote';
    }
    
    
    /** The file is a voice note */
    export interface td_fileTypeVoiceNote {
        '@type': 'fileTypeVoiceNote';
    }
    
    
    /** The file is a wallpaper or a background pattern */
    export interface td_fileTypeWallpaper {
        '@type': 'fileTypeWallpaper';
    }
    
    
    /** Contains the storage usage statistics for a specific file type */
    export interface td_storageStatisticsByFileType {
        '@type': 'storageStatisticsByFileType';
        /** File type */
        file_type: td_FileType;
        /** Total size of the files, in bytes */
        size: td_int53;
        /** Total number of files */
        count: td_int32;
    }
    
    
    /** Contains the storage usage statistics for a specific chat */
    export interface td_storageStatisticsByChat {
        '@type': 'storageStatisticsByChat';
        /** Chat identifier; 0 if none */
        chat_id: td_int53;
        /** Total size of the files in the chat, in bytes */
        size: td_int53;
        /** Total number of files in the chat */
        count: td_int32;
        /** Statistics split by file types */
        by_file_type: td_vector<td_storageStatisticsByFileType>;
    }
    
    
    /** Contains the exact storage usage statistics split by chats and file type */
    export interface td_storageStatistics {
        '@type': 'storageStatistics';
        /** Total size of files, in bytes */
        size: td_int53;
        /** Total number of files */
        count: td_int32;
        /** Statistics split by chats */
        by_chat: td_vector<td_storageStatisticsByChat>;
    }
    
    
    /** Contains approximate storage usage statistics, excluding files of unknown file type */
    export interface td_storageStatisticsFast {
        '@type': 'storageStatisticsFast';
        /** Approximate total size of files, in bytes */
        files_size: td_int53;
        /** Approximate number of files */
        file_count: td_int32;
        /** Size of the database */
        database_size: td_int53;
        /** Size of the language pack database */
        language_pack_database_size: td_int53;
        /** Size of the TDLib internal log */
        log_size: td_int53;
    }
    
    
    /** Contains database statistics */
    export interface td_databaseStatistics {
        '@type': 'databaseStatistics';
        /** Database statistics in an unspecified human-readable format */
        statistics: td_string;
    }
    
    
    /** The network is not available */
    export interface td_networkTypeNone {
        '@type': 'networkTypeNone';
    }
    
    
    /** A mobile network */
    export interface td_networkTypeMobile {
        '@type': 'networkTypeMobile';
    }
    
    
    /** A mobile roaming network */
    export interface td_networkTypeMobileRoaming {
        '@type': 'networkTypeMobileRoaming';
    }
    
    
    /** A Wi-Fi network */
    export interface td_networkTypeWiFi {
        '@type': 'networkTypeWiFi';
    }
    
    
    /** A different network type (e.g., Ethernet network) */
    export interface td_networkTypeOther {
        '@type': 'networkTypeOther';
    }
    
    
    /** Contains information about the total amount of data that was used to send and receive files */
    export interface td_networkStatisticsEntryFile {
        '@type': 'networkStatisticsEntryFile';
        /** Type of the file the data is part of; pass null if the data isn't related to files */
        file_type: td_FileType;
        /** Type of the network the data was sent through. Call setNetworkType to maintain the actual network type */
        network_type: td_NetworkType;
        /** Total number of bytes sent */
        sent_bytes: td_int53;
        /** Total number of bytes received */
        received_bytes: td_int53;
    }
    
    
    /** Contains information about the total amount of data that was used for calls */
    export interface td_networkStatisticsEntryCall {
        '@type': 'networkStatisticsEntryCall';
        /** Type of the network the data was sent through. Call setNetworkType to maintain the actual network type */
        network_type: td_NetworkType;
        /** Total number of bytes sent */
        sent_bytes: td_int53;
        /** Total number of bytes received */
        received_bytes: td_int53;
        /** Total call duration, in seconds */
        duration: td_double;
    }
    
    
    /** A full list of available network statistic entries */
    export interface td_networkStatistics {
        '@type': 'networkStatistics';
        /** Point in time (Unix timestamp) from which the statistics are collected */
        since_date: td_int32;
        /** Network statistics entries */
        entries: td_vector<td_NetworkStatisticsEntry>;
    }
    
    
    /** Contains auto-download settings */
    export interface td_autoDownloadSettings {
        '@type': 'autoDownloadSettings';
        /** True, if the auto-download is enabled */
        is_auto_download_enabled: td_Bool;
        /** The maximum size of a photo file to be auto-downloaded, in bytes */
        max_photo_file_size: td_int32;
        /** The maximum size of a video file to be auto-downloaded, in bytes */
        max_video_file_size: td_int32;
        /** The maximum size of other file types to be auto-downloaded, in bytes */
        max_other_file_size: td_int32;
        /** The maximum suggested bitrate for uploaded videos, in kbit/s */
        video_upload_bitrate: td_int32;
        /** True, if the beginning of video files needs to be preloaded for instant playback */
        preload_large_videos: td_Bool;
        /** True, if the next audio track needs to be preloaded while the user is listening to an audio file */
        preload_next_audio: td_Bool;
        /** True, if "use less data for calls" option needs to be enabled */
        use_less_data_for_calls: td_Bool;
    }
    
    
    /** Contains auto-download settings presets for the current user */
    export interface td_autoDownloadSettingsPresets {
        '@type': 'autoDownloadSettingsPresets';
        /** Preset with lowest settings; supposed to be used by default when roaming */
        low: td_autoDownloadSettings;
        /** Preset with medium settings; supposed to be used by default when using mobile data */
        medium: td_autoDownloadSettings;
        /** Preset with highest settings; supposed to be used by default when connected on Wi-Fi */
        high: td_autoDownloadSettings;
    }
    
    
    /** Currently waiting for the network to become available. Use setNetworkType to change the available network type */
    export interface td_connectionStateWaitingForNetwork {
        '@type': 'connectionStateWaitingForNetwork';
    }
    
    
    /** Currently establishing a connection with a proxy server */
    export interface td_connectionStateConnectingToProxy {
        '@type': 'connectionStateConnectingToProxy';
    }
    
    
    /** Currently establishing a connection to the Telegram servers */
    export interface td_connectionStateConnecting {
        '@type': 'connectionStateConnecting';
    }
    
    
    /** Downloading data received while the application was offline */
    export interface td_connectionStateUpdating {
        '@type': 'connectionStateUpdating';
    }
    
    
    /** There is a working connection to the Telegram servers */
    export interface td_connectionStateReady {
        '@type': 'connectionStateReady';
    }
    
    
    /** A category containing frequently used private chats with non-bot users */
    export interface td_topChatCategoryUsers {
        '@type': 'topChatCategoryUsers';
    }
    
    
    /** A category containing frequently used private chats with bot users */
    export interface td_topChatCategoryBots {
        '@type': 'topChatCategoryBots';
    }
    
    
    /** A category containing frequently used basic groups and supergroups */
    export interface td_topChatCategoryGroups {
        '@type': 'topChatCategoryGroups';
    }
    
    
    /** A category containing frequently used channels */
    export interface td_topChatCategoryChannels {
        '@type': 'topChatCategoryChannels';
    }
    
    
    /** A category containing frequently used chats with inline bots sorted by their usage in inline mode */
    export interface td_topChatCategoryInlineBots {
        '@type': 'topChatCategoryInlineBots';
    }
    
    
    /** A category containing frequently used chats used for calls */
    export interface td_topChatCategoryCalls {
        '@type': 'topChatCategoryCalls';
    }
    
    
    /** A category containing frequently used chats used to forward messages */
    export interface td_topChatCategoryForwardChats {
        '@type': 'topChatCategoryForwardChats';
    }
    
    
    /** A URL linking to a user */
    export interface td_tMeUrlTypeUser {
        '@type': 'tMeUrlTypeUser';
        /** Identifier of the user */
        user_id: td_int53;
    }
    
    
    /** A URL linking to a public supergroup or channel */
    export interface td_tMeUrlTypeSupergroup {
        '@type': 'tMeUrlTypeSupergroup';
        /** Identifier of the supergroup or channel */
        supergroup_id: td_int53;
    }
    
    
    /** A chat invite link */
    export interface td_tMeUrlTypeChatInvite {
        '@type': 'tMeUrlTypeChatInvite';
        /** Chat invite link info */
        info: td_chatInviteLinkInfo;
    }
    
    
    /** A URL linking to a sticker set */
    export interface td_tMeUrlTypeStickerSet {
        '@type': 'tMeUrlTypeStickerSet';
        /** Identifier of the sticker set */
        sticker_set_id: td_int64;
    }
    
    
    /** Represents a URL linking to an internal Telegram entity */
    export interface td_tMeUrl {
        '@type': 'tMeUrl';
        /** URL */
        url: td_string;
        /** Type of the URL */
        type: td_TMeUrlType;
    }
    
    
    /** Contains a list of t.me URLs */
    export interface td_tMeUrls {
        '@type': 'tMeUrls';
        /** List of URLs */
        urls: td_vector<td_tMeUrl>;
    }
    
    
    /** Suggests the user to enable "archive_and_mute_new_chats_from_unknown_users" option */
    export interface td_suggestedActionEnableArchiveAndMuteNewChats {
        '@type': 'suggestedActionEnableArchiveAndMuteNewChats';
    }
    
    
    /** Suggests the user to check whether they still remember their 2-step verification password */
    export interface td_suggestedActionCheckPassword {
        '@type': 'suggestedActionCheckPassword';
    }
    
    
    /** Suggests the user to check whether authorization phone number is correct and change the phone number if it is inaccessible */
    export interface td_suggestedActionCheckPhoneNumber {
        '@type': 'suggestedActionCheckPhoneNumber';
    }
    
    
    /** Suggests the user to view a hint about the meaning of one and two check marks on sent messages */
    export interface td_suggestedActionViewChecksHint {
        '@type': 'suggestedActionViewChecksHint';
    }
    
    
    /** Suggests the user to convert specified supergroup to a broadcast group */
    export interface td_suggestedActionConvertToBroadcastGroup {
        '@type': 'suggestedActionConvertToBroadcastGroup';
        /** Supergroup identifier */
        supergroup_id: td_int53;
    }
    
    
    /** Suggests the user to set a 2-step verification password to be able to log in again */
    export interface td_suggestedActionSetPassword {
        '@type': 'suggestedActionSetPassword';
        /** The number of days to pass between consecutive authorizations if the user declines to set password */
        authorization_delay: td_int32;
    }
    
    
    /** Contains a counter */
    export interface td_count {
        '@type': 'count';
        /** Count */
        count: td_int32;
    }
    
    
    /** Contains some text */
    export interface td_text {
        '@type': 'text';
        /** Text */
        text: td_string;
    }
    
    
    /** Contains a value representing a number of seconds */
    export interface td_seconds {
        '@type': 'seconds';
        /** Number of seconds */
        seconds: td_double;
    }
    
    
    /** Contains information about a tg: deep link */
    export interface td_deepLinkInfo {
        '@type': 'deepLinkInfo';
        /** Text to be shown to the user */
        text: td_formattedText;
        /** True, if the user must be asked to update the application */
        need_update_application: td_Bool;
    }
    
    
    /** The text uses Markdown-style formatting */
    export interface td_textParseModeMarkdown {
        '@type': 'textParseModeMarkdown';
        /** Version of the parser: 0 or 1 - Telegram Bot API "Markdown" parse mode, 2 - Telegram Bot API "MarkdownV2" parse mode */
        version: td_int32;
    }
    
    
    /** The text uses HTML-style formatting. The same as Telegram Bot API "HTML" parse mode */
    export interface td_textParseModeHTML {
        '@type': 'textParseModeHTML';
    }
    
    
    /** A SOCKS5 proxy server */
    export interface td_proxyTypeSocks5 {
        '@type': 'proxyTypeSocks5';
        /** Username for logging in; may be empty */
        username: td_string;
        /** Password for logging in; may be empty */
        password: td_string;
    }
    
    
    /** A HTTP transparent proxy server */
    export interface td_proxyTypeHttp {
        '@type': 'proxyTypeHttp';
        /** Username for logging in; may be empty */
        username: td_string;
        /** Password for logging in; may be empty */
        password: td_string;
        /** Pass true if the proxy supports only HTTP requests and doesn't support transparent TCP connections via HTTP CONNECT method */
        http_only: td_Bool;
    }
    
    
    /** An MTProto proxy server */
    export interface td_proxyTypeMtproto {
        '@type': 'proxyTypeMtproto';
        /** The proxy's secret in hexadecimal encoding */
        secret: td_string;
    }
    
    
    /** Contains information about a proxy server */
    export interface td_proxy {
        '@type': 'proxy';
        /** Unique identifier of the proxy */
        id: td_int32;
        /** Proxy server IP address */
        server: td_string;
        /** Proxy server port */
        port: td_int32;
        /** Point in time (Unix timestamp) when the proxy was last used; 0 if never */
        last_used_date: td_int32;
        /** True, if the proxy is enabled now */
        is_enabled: td_Bool;
        /** Type of the proxy */
        type: td_ProxyType;
    }
    
    
    /** Represents a list of proxy servers */
    export interface td_proxies {
        '@type': 'proxies';
        /** List of proxy servers */
        proxies: td_vector<td_proxy>;
    }
    
    
    /** A static sticker in PNG format, which will be converted to WEBP server-side */
    export interface td_inputStickerStatic {
        '@type': 'inputStickerStatic';
        /** PNG image with the sticker; must be up to 512 KB in size and fit in a 512x512 square */
        sticker: td_InputFile;
        /** Emojis corresponding to the sticker */
        emojis: td_string;
        /** For masks, position where the mask is placed; pass null if unspecified */
        mask_position: td_maskPosition;
    }
    
    
    /** An animated sticker in TGS format */
    export interface td_inputStickerAnimated {
        '@type': 'inputStickerAnimated';
        /** File with the animated sticker. Only local or uploaded within a week files are supported. See https://core.telegram.org/animated_stickers#technical-requirements for technical requirements */
        sticker: td_InputFile;
        /** Emojis corresponding to the sticker */
        emojis: td_string;
    }
    
    
    /** Represents a date range */
    export interface td_dateRange {
        '@type': 'dateRange';
        /** Point in time (Unix timestamp) at which the date range begins */
        start_date: td_int32;
        /** Point in time (Unix timestamp) at which the date range ends */
        end_date: td_int32;
    }
    
    
    /** A value with information about its recent changes */
    export interface td_statisticalValue {
        '@type': 'statisticalValue';
        /** The current value */
        value: td_double;
        /** The value for the previous day */
        previous_value: td_double;
        /** The growth rate of the value, as a percentage */
        growth_rate_percentage: td_double;
    }
    
    
    /** A graph data */
    export interface td_statisticalGraphData {
        '@type': 'statisticalGraphData';
        /** Graph data in JSON format */
        json_data: td_string;
        /** If non-empty, a token which can be used to receive a zoomed in graph */
        zoom_token: td_string;
    }
    
    
    /** The graph data to be asynchronously loaded through getStatisticalGraph */
    export interface td_statisticalGraphAsync {
        '@type': 'statisticalGraphAsync';
        /** The token to use for data loading */
        token: td_string;
    }
    
    
    /** An error message to be shown to the user instead of the graph */
    export interface td_statisticalGraphError {
        '@type': 'statisticalGraphError';
        /** The error message */
        error_message: td_string;
    }
    
    
    /** Contains statistics about interactions with a message */
    export interface td_chatStatisticsMessageInteractionInfo {
        '@type': 'chatStatisticsMessageInteractionInfo';
        /** Message identifier */
        message_id: td_int53;
        /** Number of times the message was viewed */
        view_count: td_int32;
        /** Number of times the message was forwarded */
        forward_count: td_int32;
    }
    
    
    /** Contains statistics about messages sent by a user */
    export interface td_chatStatisticsMessageSenderInfo {
        '@type': 'chatStatisticsMessageSenderInfo';
        /** User identifier */
        user_id: td_int53;
        /** Number of sent messages */
        sent_message_count: td_int32;
        /** Average number of characters in sent messages; 0 if unknown */
        average_character_count: td_int32;
    }
    
    
    /** Contains statistics about administrator actions done by a user */
    export interface td_chatStatisticsAdministratorActionsInfo {
        '@type': 'chatStatisticsAdministratorActionsInfo';
        /** Administrator user identifier */
        user_id: td_int53;
        /** Number of messages deleted by the administrator */
        deleted_message_count: td_int32;
        /** Number of users banned by the administrator */
        banned_user_count: td_int32;
        /** Number of users restricted by the administrator */
        restricted_user_count: td_int32;
    }
    
    
    /** Contains statistics about number of new members invited by a user */
    export interface td_chatStatisticsInviterInfo {
        '@type': 'chatStatisticsInviterInfo';
        /** User identifier */
        user_id: td_int53;
        /** Number of new members invited by the user */
        added_member_count: td_int32;
    }
    
    
    /** A detailed statistics about a supergroup chat */
    export interface td_chatStatisticsSupergroup {
        '@type': 'chatStatisticsSupergroup';
        /** A period to which the statistics applies */
        period: td_dateRange;
        /** Number of members in the chat */
        member_count: td_statisticalValue;
        /** Number of messages sent to the chat */
        message_count: td_statisticalValue;
        /** Number of users who viewed messages in the chat */
        viewer_count: td_statisticalValue;
        /** Number of users who sent messages to the chat */
        sender_count: td_statisticalValue;
        /** A graph containing number of members in the chat */
        member_count_graph: td_StatisticalGraph;
        /** A graph containing number of members joined and left the chat */
        join_graph: td_StatisticalGraph;
        /** A graph containing number of new member joins per source */
        join_by_source_graph: td_StatisticalGraph;
        /** A graph containing distribution of active users per language */
        language_graph: td_StatisticalGraph;
        /** A graph containing distribution of sent messages by content type */
        message_content_graph: td_StatisticalGraph;
        /** A graph containing number of different actions in the chat */
        action_graph: td_StatisticalGraph;
        /** A graph containing distribution of message views per hour */
        day_graph: td_StatisticalGraph;
        /** A graph containing distribution of message views per day of week */
        week_graph: td_StatisticalGraph;
        /** List of users sent most messages in the last week */
        top_senders: td_vector<td_chatStatisticsMessageSenderInfo>;
        /** List of most active administrators in the last week */
        top_administrators: td_vector<td_chatStatisticsAdministratorActionsInfo>;
        /** List of most active inviters of new members in the last week */
        top_inviters: td_vector<td_chatStatisticsInviterInfo>;
    }
    
    
    /** A detailed statistics about a channel chat */
    export interface td_chatStatisticsChannel {
        '@type': 'chatStatisticsChannel';
        /** A period to which the statistics applies */
        period: td_dateRange;
        /** Number of members in the chat */
        member_count: td_statisticalValue;
        /** Mean number of times the recently sent messages was viewed */
        mean_view_count: td_statisticalValue;
        /** Mean number of times the recently sent messages was shared */
        mean_share_count: td_statisticalValue;
        /** A percentage of users with enabled notifications for the chat */
        enabled_notifications_percentage: td_double;
        /** A graph containing number of members in the chat */
        member_count_graph: td_StatisticalGraph;
        /** A graph containing number of members joined and left the chat */
        join_graph: td_StatisticalGraph;
        /** A graph containing number of members muted and unmuted the chat */
        mute_graph: td_StatisticalGraph;
        /** A graph containing number of message views in a given hour in the last two weeks */
        view_count_by_hour_graph: td_StatisticalGraph;
        /** A graph containing number of message views per source */
        view_count_by_source_graph: td_StatisticalGraph;
        /** A graph containing number of new member joins per source */
        join_by_source_graph: td_StatisticalGraph;
        /** A graph containing number of users viewed chat messages per language */
        language_graph: td_StatisticalGraph;
        /** A graph containing number of chat message views and shares */
        message_interaction_graph: td_StatisticalGraph;
        /** A graph containing number of views of associated with the chat instant views */
        instant_view_interaction_graph: td_StatisticalGraph;
        /** Detailed statistics about number of views and shares of recently sent messages */
        recent_message_interactions: td_vector<td_chatStatisticsMessageInteractionInfo>;
    }
    
    
    /** A detailed statistics about a message */
    export interface td_messageStatistics {
        '@type': 'messageStatistics';
        /** A graph containing number of message views and shares */
        message_interaction_graph: td_StatisticalGraph;
    }
    
    
    /** A point on a Cartesian plane */
    export interface td_point {
        '@type': 'point';
        /** The point's first coordinate */
        x: td_double;
        /** The point's second coordinate */
        y: td_double;
    }
    
    
    /** A straight line to a given point */
    export interface td_vectorPathCommandLine {
        '@type': 'vectorPathCommandLine';
        /** The end point of the straight line */
        end_point: td_point;
    }
    
    
    /** A cubic Bézier curve to a given point */
    export interface td_vectorPathCommandCubicBezierCurve {
        '@type': 'vectorPathCommandCubicBezierCurve';
        /** The start control point of the curve */
        start_control_point: td_point;
        /** The end control point of the curve */
        end_control_point: td_point;
        /** The end point of the curve */
        end_point: td_point;
    }
    
    
    /** A scope covering all users */
    export interface td_botCommandScopeDefault {
        '@type': 'botCommandScopeDefault';
    }
    
    
    /** A scope covering all private chats */
    export interface td_botCommandScopeAllPrivateChats {
        '@type': 'botCommandScopeAllPrivateChats';
    }
    
    
    /** A scope covering all group and supergroup chats */
    export interface td_botCommandScopeAllGroupChats {
        '@type': 'botCommandScopeAllGroupChats';
    }
    
    
    /** A scope covering all group and supergroup chat administrators */
    export interface td_botCommandScopeAllChatAdministrators {
        '@type': 'botCommandScopeAllChatAdministrators';
    }
    
    
    /** A scope covering all members of a chat */
    export interface td_botCommandScopeChat {
        '@type': 'botCommandScopeChat';
        /** Chat identifier */
        chat_id: td_int53;
    }
    
    
    /** A scope covering all administrators of a chat */
    export interface td_botCommandScopeChatAdministrators {
        '@type': 'botCommandScopeChatAdministrators';
        /** Chat identifier */
        chat_id: td_int53;
    }
    
    
    /** A scope covering a member of a chat */
    export interface td_botCommandScopeChatMember {
        '@type': 'botCommandScopeChatMember';
        /** Chat identifier */
        chat_id: td_int53;
        /** User identifier */
        user_id: td_int53;
    }
    
    
    /** The user authorization state has changed */
    export interface td_updateAuthorizationState {
        '@type': 'updateAuthorizationState';
        /** New authorization state */
        authorization_state: td_AuthorizationState;
    }
    
    
    /** A new message was received; can also be an outgoing message */
    export interface td_updateNewMessage {
        '@type': 'updateNewMessage';
        /** The new message */
        message: td_message;
    }
    
    
    /** A request to send a message has reached the Telegram server. This doesn't mean that the message will be sent successfully or even that the send message request will be processed. This update will be sent only if the option "use_quick_ack" is set to true. This update may be sent multiple times for the same message */
    export interface td_updateMessageSendAcknowledged {
        '@type': 'updateMessageSendAcknowledged';
        /** The chat identifier of the sent message */
        chat_id: td_int53;
        /** A temporary message identifier */
        message_id: td_int53;
    }
    
    
    /** A message has been successfully sent */
    export interface td_updateMessageSendSucceeded {
        '@type': 'updateMessageSendSucceeded';
        /** The sent message. Usually only the message identifier, date, and content are changed, but almost all other fields can also change */
        message: td_message;
        /** The previous temporary message identifier */
        old_message_id: td_int53;
    }
    
    
    /** A message failed to send. Be aware that some messages being sent can be irrecoverably deleted, in which case updateDeleteMessages will be received instead of this update */
    export interface td_updateMessageSendFailed {
        '@type': 'updateMessageSendFailed';
        /** The failed to send message */
        message: td_message;
        /** The previous temporary message identifier */
        old_message_id: td_int53;
        /** An error code */
        error_code: td_int32;
        /** Error message */
        error_message: td_string;
    }
    
    
    /** The message content has changed */
    export interface td_updateMessageContent {
        '@type': 'updateMessageContent';
        /** Chat identifier */
        chat_id: td_int53;
        /** Message identifier */
        message_id: td_int53;
        /** New message content */
        new_content: td_MessageContent;
    }
    
    
    /** A message was edited. Changes in the message content will come in a separate updateMessageContent */
    export interface td_updateMessageEdited {
        '@type': 'updateMessageEdited';
        /** Chat identifier */
        chat_id: td_int53;
        /** Message identifier */
        message_id: td_int53;
        /** Point in time (Unix timestamp) when the message was edited */
        edit_date: td_int32;
        /** New message reply markup; may be null */
        reply_markup?: td_ReplyMarkup;
    }
    
    
    /** The message pinned state was changed */
    export interface td_updateMessageIsPinned {
        '@type': 'updateMessageIsPinned';
        /** Chat identifier */
        chat_id: td_int53;
        /** The message identifier */
        message_id: td_int53;
        /** True, if the message is pinned */
        is_pinned: td_Bool;
    }
    
    
    /** The information about interactions with a message has changed */
    export interface td_updateMessageInteractionInfo {
        '@type': 'updateMessageInteractionInfo';
        /** Chat identifier */
        chat_id: td_int53;
        /** Message identifier */
        message_id: td_int53;
        /** New information about interactions with the message; may be null */
        interaction_info?: td_messageInteractionInfo;
    }
    
    
    /** The message content was opened. Updates voice note messages to "listened", video note messages to "viewed" and starts the TTL timer for self-destructing messages */
    export interface td_updateMessageContentOpened {
        '@type': 'updateMessageContentOpened';
        /** Chat identifier */
        chat_id: td_int53;
        /** Message identifier */
        message_id: td_int53;
    }
    
    
    /** A message with an unread mention was read */
    export interface td_updateMessageMentionRead {
        '@type': 'updateMessageMentionRead';
        /** Chat identifier */
        chat_id: td_int53;
        /** Message identifier */
        message_id: td_int53;
        /** The new number of unread mention messages left in the chat */
        unread_mention_count: td_int32;
    }
    
    
    /** A message with a live location was viewed. When the update is received, the application is supposed to update the live location */
    export interface td_updateMessageLiveLocationViewed {
        '@type': 'updateMessageLiveLocationViewed';
        /** Identifier of the chat with the live location message */
        chat_id: td_int53;
        /** Identifier of the message with live location */
        message_id: td_int53;
    }
    
    
    /** A new chat has been loaded/created. This update is guaranteed to come before the chat identifier is returned to the application. The chat field changes will be reported through separate updates */
    export interface td_updateNewChat {
        '@type': 'updateNewChat';
        /** The chat */
        chat: td_chat;
    }
    
    
    /** The title of a chat was changed */
    export interface td_updateChatTitle {
        '@type': 'updateChatTitle';
        /** Chat identifier */
        chat_id: td_int53;
        /** The new chat title */
        title: td_string;
    }
    
    
    /** A chat photo was changed */
    export interface td_updateChatPhoto {
        '@type': 'updateChatPhoto';
        /** Chat identifier */
        chat_id: td_int53;
        /** The new chat photo; may be null */
        photo?: td_chatPhotoInfo;
    }
    
    
    /** Chat permissions was changed */
    export interface td_updateChatPermissions {
        '@type': 'updateChatPermissions';
        /** Chat identifier */
        chat_id: td_int53;
        /** The new chat permissions */
        permissions: td_chatPermissions;
    }
    
    
    /** The last message of a chat was changed. If last_message is null, then the last message in the chat became unknown. Some new unknown messages might be added to the chat in this case */
    export interface td_updateChatLastMessage {
        '@type': 'updateChatLastMessage';
        /** Chat identifier */
        chat_id: td_int53;
        /** The new last message in the chat; may be null */
        last_message?: td_message;
        /** The new chat positions in the chat lists */
        positions: td_vector<td_chatPosition>;
    }
    
    
    /** The position of a chat in a chat list has changed. Instead of this update updateChatLastMessage or updateChatDraftMessage might be sent */
    export interface td_updateChatPosition {
        '@type': 'updateChatPosition';
        /** Chat identifier */
        chat_id: td_int53;
        /** New chat position. If new order is 0, then the chat needs to be removed from the list */
        position: td_chatPosition;
    }
    
    
    /** Incoming messages were read or the number of unread messages has been changed */
    export interface td_updateChatReadInbox {
        '@type': 'updateChatReadInbox';
        /** Chat identifier */
        chat_id: td_int53;
        /** Identifier of the last read incoming message */
        last_read_inbox_message_id: td_int53;
        /** The number of unread messages left in the chat */
        unread_count: td_int32;
    }
    
    
    /** Outgoing messages were read */
    export interface td_updateChatReadOutbox {
        '@type': 'updateChatReadOutbox';
        /** Chat identifier */
        chat_id: td_int53;
        /** Identifier of last read outgoing message */
        last_read_outbox_message_id: td_int53;
    }
    
    
    /** The chat action bar was changed */
    export interface td_updateChatActionBar {
        '@type': 'updateChatActionBar';
        /** Chat identifier */
        chat_id: td_int53;
        /** The new value of the action bar; may be null */
        action_bar?: td_ChatActionBar;
    }
    
    
    /** A chat draft has changed. Be aware that the update may come in the currently opened chat but with old content of the draft. If the user has changed the content of the draft, this update mustn't be applied */
    export interface td_updateChatDraftMessage {
        '@type': 'updateChatDraftMessage';
        /** Chat identifier */
        chat_id: td_int53;
        /** The new draft message; may be null */
        draft_message?: td_draftMessage;
        /** The new chat positions in the chat lists */
        positions: td_vector<td_chatPosition>;
    }
    
    
    /** The message sender that is selected to send messages in a chat has changed */
    export interface td_updateChatMessageSender {
        '@type': 'updateChatMessageSender';
        /** Chat identifier */
        chat_id: td_int53;
        /** New value of message_sender_id; may be null if the user can't change message sender */
        message_sender_id?: td_MessageSender;
    }
    
    
    /** The message Time To Live setting for a chat was changed */
    export interface td_updateChatMessageTtl {
        '@type': 'updateChatMessageTtl';
        /** Chat identifier */
        chat_id: td_int53;
        /** New value of message_ttl */
        message_ttl: td_int32;
    }
    
    
    /** Notification settings for a chat were changed */
    export interface td_updateChatNotificationSettings {
        '@type': 'updateChatNotificationSettings';
        /** Chat identifier */
        chat_id: td_int53;
        /** The new notification settings */
        notification_settings: td_chatNotificationSettings;
    }
    
    
    /** The chat pending join requests were changed */
    export interface td_updateChatPendingJoinRequests {
        '@type': 'updateChatPendingJoinRequests';
        /** Chat identifier */
        chat_id: td_int53;
        /** The new data about pending join requests; may be null */
        pending_join_requests?: td_chatJoinRequestsInfo;
    }
    
    
    /** The default chat reply markup was changed. Can occur because new messages with reply markup were received or because an old reply markup was hidden by the user */
    export interface td_updateChatReplyMarkup {
        '@type': 'updateChatReplyMarkup';
        /** Chat identifier */
        chat_id: td_int53;
        /** Identifier of the message from which reply markup needs to be used; 0 if there is no default custom reply markup in the chat */
        reply_markup_message_id: td_int53;
    }
    
    
    /** The chat theme was changed */
    export interface td_updateChatTheme {
        '@type': 'updateChatTheme';
        /** Chat identifier */
        chat_id: td_int53;
        /** The new name of the chat theme; may be empty if theme was reset to default */
        theme_name: td_string;
    }
    
    
    /** The chat unread_mention_count has changed */
    export interface td_updateChatUnreadMentionCount {
        '@type': 'updateChatUnreadMentionCount';
        /** Chat identifier */
        chat_id: td_int53;
        /** The number of unread mention messages left in the chat */
        unread_mention_count: td_int32;
    }
    
    
    /** A chat video chat state has changed */
    export interface td_updateChatVideoChat {
        '@type': 'updateChatVideoChat';
        /** Chat identifier */
        chat_id: td_int53;
        /** New value of video_chat */
        video_chat: td_videoChat;
    }
    
    
    /** The value of the default disable_notification parameter, used when a message is sent to the chat, was changed */
    export interface td_updateChatDefaultDisableNotification {
        '@type': 'updateChatDefaultDisableNotification';
        /** Chat identifier */
        chat_id: td_int53;
        /** The new default_disable_notification value */
        default_disable_notification: td_Bool;
    }
    
    
    /** A chat content was allowed or restricted for saving */
    export interface td_updateChatHasProtectedContent {
        '@type': 'updateChatHasProtectedContent';
        /** Chat identifier */
        chat_id: td_int53;
        /** New value of has_protected_content */
        has_protected_content: td_Bool;
    }
    
    
    /** A chat's has_scheduled_messages field has changed */
    export interface td_updateChatHasScheduledMessages {
        '@type': 'updateChatHasScheduledMessages';
        /** Chat identifier */
        chat_id: td_int53;
        /** New value of has_scheduled_messages */
        has_scheduled_messages: td_Bool;
    }
    
    
    /** A chat was blocked or unblocked */
    export interface td_updateChatIsBlocked {
        '@type': 'updateChatIsBlocked';
        /** Chat identifier */
        chat_id: td_int53;
        /** New value of is_blocked */
        is_blocked: td_Bool;
    }
    
    
    /** A chat was marked as unread or was read */
    export interface td_updateChatIsMarkedAsUnread {
        '@type': 'updateChatIsMarkedAsUnread';
        /** Chat identifier */
        chat_id: td_int53;
        /** New value of is_marked_as_unread */
        is_marked_as_unread: td_Bool;
    }
    
    
    /** The list of chat filters or a chat filter has changed */
    export interface td_updateChatFilters {
        '@type': 'updateChatFilters';
        /** The new list of chat filters */
        chat_filters: td_vector<td_chatFilterInfo>;
    }
    
    
    /** The number of online group members has changed. This update with non-zero count is sent only for currently opened chats. There is no guarantee that it will be sent just after the count has changed */
    export interface td_updateChatOnlineMemberCount {
        '@type': 'updateChatOnlineMemberCount';
        /** Identifier of the chat */
        chat_id: td_int53;
        /** New number of online members in the chat, or 0 if unknown */
        online_member_count: td_int32;
    }
    
    
    /** Notification settings for some type of chats were updated */
    export interface td_updateScopeNotificationSettings {
        '@type': 'updateScopeNotificationSettings';
        /** Types of chats for which notification settings were updated */
        scope: td_NotificationSettingsScope;
        /** The new notification settings */
        notification_settings: td_scopeNotificationSettings;
    }
    
    
    /** A notification was changed */
    export interface td_updateNotification {
        '@type': 'updateNotification';
        /** Unique notification group identifier */
        notification_group_id: td_int32;
        /** Changed notification */
        notification: td_notification;
    }
    
    
    /** A list of active notifications in a notification group has changed */
    export interface td_updateNotificationGroup {
        '@type': 'updateNotificationGroup';
        /** Unique notification group identifier */
        notification_group_id: td_int32;
        /** New type of the notification group */
        type: td_NotificationGroupType;
        /** Identifier of a chat to which all notifications in the group belong */
        chat_id: td_int53;
        /** Chat identifier, which notification settings must be applied to the added notifications */
        notification_settings_chat_id: td_int53;
        /** True, if the notifications must be shown without sound */
        is_silent: td_Bool;
        /** Total number of unread notifications in the group, can be bigger than number of active notifications */
        total_count: td_int32;
        /** List of added group notifications, sorted by notification ID */
        added_notifications: td_vector<td_notification>;
        /** Identifiers of removed group notifications, sorted by notification ID */
        removed_notification_ids: td_vector<td_int32>;
    }
    
    
    /** Contains active notifications that was shown on previous application launches. This update is sent only if the message database is used. In that case it comes once before any updateNotification and updateNotificationGroup update */
    export interface td_updateActiveNotifications {
        '@type': 'updateActiveNotifications';
        /** Lists of active notification groups */
        groups: td_vector<td_notificationGroup>;
    }
    
    
    /** Describes whether there are some pending notification updates. Can be used to prevent application from killing, while there are some pending notifications */
    export interface td_updateHavePendingNotifications {
        '@type': 'updateHavePendingNotifications';
        /** True, if there are some delayed notification updates, which will be sent soon */
        have_delayed_notifications: td_Bool;
        /** True, if there can be some yet unreceived notifications, which are being fetched from the server */
        have_unreceived_notifications: td_Bool;
    }
    
    
    /** Some messages were deleted */
    export interface td_updateDeleteMessages {
        '@type': 'updateDeleteMessages';
        /** Chat identifier */
        chat_id: td_int53;
        /** Identifiers of the deleted messages */
        message_ids: td_vector<td_int53>;
        /** True, if the messages are permanently deleted by a user (as opposed to just becoming inaccessible) */
        is_permanent: td_Bool;
        /** True, if the messages are deleted only from the cache and can possibly be retrieved again in the future */
        from_cache: td_Bool;
    }
    
    
    /** A message sender activity in the chat has changed */
    export interface td_updateChatAction {
        '@type': 'updateChatAction';
        /** Chat identifier */
        chat_id: td_int53;
        /** If not 0, a message thread identifier in which the action was performed */
        message_thread_id: td_int53;
        /** Identifier of a message sender performing the action */
        sender_id: td_MessageSender;
        /** The action */
        action: td_ChatAction;
    }
    
    
    /** The user went online or offline */
    export interface td_updateUserStatus {
        '@type': 'updateUserStatus';
        /** User identifier */
        user_id: td_int53;
        /** New status of the user */
        status: td_UserStatus;
    }
    
    
    /** Some data of a user has changed. This update is guaranteed to come before the user identifier is returned to the application */
    export interface td_updateUser {
        '@type': 'updateUser';
        /** New data about the user */
        user: td_user;
    }
    
    
    /** Some data of a basic group has changed. This update is guaranteed to come before the basic group identifier is returned to the application */
    export interface td_updateBasicGroup {
        '@type': 'updateBasicGroup';
        /** New data about the group */
        basic_group: td_basicGroup;
    }
    
    
    /** Some data of a supergroup or a channel has changed. This update is guaranteed to come before the supergroup identifier is returned to the application */
    export interface td_updateSupergroup {
        '@type': 'updateSupergroup';
        /** New data about the supergroup */
        supergroup: td_supergroup;
    }
    
    
    /** Some data of a secret chat has changed. This update is guaranteed to come before the secret chat identifier is returned to the application */
    export interface td_updateSecretChat {
        '@type': 'updateSecretChat';
        /** New data about the secret chat */
        secret_chat: td_secretChat;
    }
    
    
    /** Some data in userFullInfo has been changed */
    export interface td_updateUserFullInfo {
        '@type': 'updateUserFullInfo';
        /** User identifier */
        user_id: td_int53;
        /** New full information about the user */
        user_full_info: td_userFullInfo;
    }
    
    
    /** Some data in basicGroupFullInfo has been changed */
    export interface td_updateBasicGroupFullInfo {
        '@type': 'updateBasicGroupFullInfo';
        /** Identifier of a basic group */
        basic_group_id: td_int53;
        /** New full information about the group */
        basic_group_full_info: td_basicGroupFullInfo;
    }
    
    
    /** Some data in supergroupFullInfo has been changed */
    export interface td_updateSupergroupFullInfo {
        '@type': 'updateSupergroupFullInfo';
        /** Identifier of the supergroup or channel */
        supergroup_id: td_int53;
        /** New full information about the supergroup */
        supergroup_full_info: td_supergroupFullInfo;
    }
    
    
    /** A service notification from the server was received. Upon receiving this the application must show a popup with the content of the notification */
    export interface td_updateServiceNotification {
        '@type': 'updateServiceNotification';
        /** Notification type. If type begins with "AUTH_KEY_DROP_", then two buttons "Cancel" and "Log out" must be shown under notification; if user presses the second, all local data must be destroyed using Destroy method */
        type: td_string;
        /** Notification content */
        content: td_MessageContent;
    }
    
    
    /** Information about a file was updated */
    export interface td_updateFile {
        '@type': 'updateFile';
        /** New data about the file */
        file: td_file;
    }
    
    
    /** The file generation process needs to be started by the application */
    export interface td_updateFileGenerationStart {
        '@type': 'updateFileGenerationStart';
        /** Unique identifier for the generation process */
        generation_id: td_int64;
        /** The path to a file from which a new file is generated; may be empty */
        original_path: td_string;
        /** The path to a file that must be created and where the new file is generated */
        destination_path: td_string;
        /** String specifying the conversion applied to the original file. If conversion is "#url#" than original_path contains an HTTP/HTTPS URL of a file, which must be downloaded by the application */
        conversion: td_string;
    }
    
    
    /** File generation is no longer needed */
    export interface td_updateFileGenerationStop {
        '@type': 'updateFileGenerationStop';
        /** Unique identifier for the generation process */
        generation_id: td_int64;
    }
    
    
    /** New call was created or information about a call was updated */
    export interface td_updateCall {
        '@type': 'updateCall';
        /** New data about a call */
        call: td_call;
    }
    
    
    /** Information about a group call was updated */
    export interface td_updateGroupCall {
        '@type': 'updateGroupCall';
        /** New data about a group call */
        group_call: td_groupCall;
    }
    
    
    /** Information about a group call participant was changed. The updates are sent only after the group call is received through getGroupCall and only if the call is joined or being joined */
    export interface td_updateGroupCallParticipant {
        '@type': 'updateGroupCallParticipant';
        /** Identifier of group call */
        group_call_id: td_int32;
        /** New data about a participant */
        participant: td_groupCallParticipant;
    }
    
    
    /** New call signaling data arrived */
    export interface td_updateNewCallSignalingData {
        '@type': 'updateNewCallSignalingData';
        /** The call identifier */
        call_id: td_int32;
        /** The data */
        data: td_bytes;
    }
    
    
    /** Some privacy setting rules have been changed */
    export interface td_updateUserPrivacySettingRules {
        '@type': 'updateUserPrivacySettingRules';
        /** The privacy setting */
        setting: td_UserPrivacySetting;
        /** New privacy rules */
        rules: td_userPrivacySettingRules;
    }
    
    
    /** Number of unread messages in a chat list has changed. This update is sent only if the message database is used */
    export interface td_updateUnreadMessageCount {
        '@type': 'updateUnreadMessageCount';
        /** The chat list with changed number of unread messages */
        chat_list: td_ChatList;
        /** Total number of unread messages */
        unread_count: td_int32;
        /** Total number of unread messages in unmuted chats */
        unread_unmuted_count: td_int32;
    }
    
    
    /** Number of unread chats, i.e. with unread messages or marked as unread, has changed. This update is sent only if the message database is used */
    export interface td_updateUnreadChatCount {
        '@type': 'updateUnreadChatCount';
        /** The chat list with changed number of unread messages */
        chat_list: td_ChatList;
        /** Approximate total number of chats in the chat list */
        total_count: td_int32;
        /** Total number of unread chats */
        unread_count: td_int32;
        /** Total number of unread unmuted chats */
        unread_unmuted_count: td_int32;
        /** Total number of chats marked as unread */
        marked_as_unread_count: td_int32;
        /** Total number of unmuted chats marked as unread */
        marked_as_unread_unmuted_count: td_int32;
    }
    
    
    /** An option changed its value */
    export interface td_updateOption {
        '@type': 'updateOption';
        /** The option name */
        name: td_string;
        /** The new option value */
        value: td_OptionValue;
    }
    
    
    /** A sticker set has changed */
    export interface td_updateStickerSet {
        '@type': 'updateStickerSet';
        /** The sticker set */
        sticker_set: td_stickerSet;
    }
    
    
    /** The list of installed sticker sets was updated */
    export interface td_updateInstalledStickerSets {
        '@type': 'updateInstalledStickerSets';
        /** True, if the list of installed mask sticker sets was updated */
        is_masks: td_Bool;
        /** The new list of installed ordinary sticker sets */
        sticker_set_ids: td_vector<td_int64>;
    }
    
    
    /** The list of trending sticker sets was updated or some of them were viewed */
    export interface td_updateTrendingStickerSets {
        '@type': 'updateTrendingStickerSets';
        /** The prefix of the list of trending sticker sets with the newest trending sticker sets */
        sticker_sets: td_stickerSets;
    }
    
    
    /** The list of recently used stickers was updated */
    export interface td_updateRecentStickers {
        '@type': 'updateRecentStickers';
        /** True, if the list of stickers attached to photo or video files was updated, otherwise the list of sent stickers is updated */
        is_attached: td_Bool;
        /** The new list of file identifiers of recently used stickers */
        sticker_ids: td_vector<td_int32>;
    }
    
    
    /** The list of favorite stickers was updated */
    export interface td_updateFavoriteStickers {
        '@type': 'updateFavoriteStickers';
        /** The new list of file identifiers of favorite stickers */
        sticker_ids: td_vector<td_int32>;
    }
    
    
    /** The list of saved animations was updated */
    export interface td_updateSavedAnimations {
        '@type': 'updateSavedAnimations';
        /** The new list of file identifiers of saved animations */
        animation_ids: td_vector<td_int32>;
    }
    
    
    /** The selected background has changed */
    export interface td_updateSelectedBackground {
        '@type': 'updateSelectedBackground';
        /** True, if background for dark theme has changed */
        for_dark_theme: td_Bool;
        /** The new selected background; may be null */
        background?: td_background;
    }
    
    
    /** The list of available chat themes has changed */
    export interface td_updateChatThemes {
        '@type': 'updateChatThemes';
        /** The new list of chat themes */
        chat_themes: td_vector<td_chatTheme>;
    }
    
    
    /** Some language pack strings have been updated */
    export interface td_updateLanguagePackStrings {
        '@type': 'updateLanguagePackStrings';
        /** Localization target to which the language pack belongs */
        localization_target: td_string;
        /** Identifier of the updated language pack */
        language_pack_id: td_string;
        /** List of changed language pack strings */
        strings: td_vector<td_languagePackString>;
    }
    
    
    /** The connection state has changed. This update must be used only to show a human-readable description of the connection state */
    export interface td_updateConnectionState {
        '@type': 'updateConnectionState';
        /** The new connection state */
        state: td_ConnectionState;
    }
    
    
    /** New terms of service must be accepted by the user. If the terms of service are declined, then the deleteAccount method must be called with the reason "Decline ToS update" */
    export interface td_updateTermsOfService {
        '@type': 'updateTermsOfService';
        /** Identifier of the terms of service */
        terms_of_service_id: td_string;
        /** The new terms of service */
        terms_of_service: td_termsOfService;
    }
    
    
    /** The list of users nearby has changed. The update is guaranteed to be sent only 60 seconds after a successful searchChatsNearby request */
    export interface td_updateUsersNearby {
        '@type': 'updateUsersNearby';
        /** The new list of users nearby */
        users_nearby: td_vector<td_chatNearby>;
    }
    
    
    /** The list of supported dice emojis has changed */
    export interface td_updateDiceEmojis {
        '@type': 'updateDiceEmojis';
        /** The new list of supported dice emojis */
        emojis: td_vector<td_string>;
    }
    
    
    /** Some animated emoji message was clicked and a big animated sticker must be played if the message is visible on the screen. chatActionWatchingAnimations with the text of the message needs to be sent if the sticker is played */
    export interface td_updateAnimatedEmojiMessageClicked {
        '@type': 'updateAnimatedEmojiMessageClicked';
        /** Chat identifier */
        chat_id: td_int53;
        /** Message identifier */
        message_id: td_int53;
        /** The animated sticker to be played */
        sticker: td_sticker;
    }
    
    
    /** The parameters of animation search through GetOption("animation_search_bot_username") bot has changed */
    export interface td_updateAnimationSearchParameters {
        '@type': 'updateAnimationSearchParameters';
        /** Name of the animation search provider */
        provider: td_string;
        /** The new list of emojis suggested for searching */
        emojis: td_vector<td_string>;
    }
    
    
    /** The list of suggested to the user actions has changed */
    export interface td_updateSuggestedActions {
        '@type': 'updateSuggestedActions';
        /** Added suggested actions */
        added_actions: td_vector<td_SuggestedAction>;
        /** Removed suggested actions */
        removed_actions: td_vector<td_SuggestedAction>;
    }
    
    
    /** A new incoming inline query; for bots only */
    export interface td_updateNewInlineQuery {
        '@type': 'updateNewInlineQuery';
        /** Unique query identifier */
        id: td_int64;
        /** Identifier of the user who sent the query */
        sender_user_id: td_int53;
        /** User location; may be null */
        user_location?: td_location;
        /** The type of the chat, from which the query originated; may be null if unknown */
        chat_type?: td_ChatType;
        /** Text of the query */
        query: td_string;
        /** Offset of the first entry to return */
        offset: td_string;
    }
    
    
    /** The user has chosen a result of an inline query; for bots only */
    export interface td_updateNewChosenInlineResult {
        '@type': 'updateNewChosenInlineResult';
        /** Identifier of the user who sent the query */
        sender_user_id: td_int53;
        /** User location; may be null */
        user_location?: td_location;
        /** Text of the query */
        query: td_string;
        /** Identifier of the chosen result */
        result_id: td_string;
        /** Identifier of the sent inline message, if known */
        inline_message_id: td_string;
    }
    
    
    /** A new incoming callback query; for bots only */
    export interface td_updateNewCallbackQuery {
        '@type': 'updateNewCallbackQuery';
        /** Unique query identifier */
        id: td_int64;
        /** Identifier of the user who sent the query */
        sender_user_id: td_int53;
        /** Identifier of the chat where the query was sent */
        chat_id: td_int53;
        /** Identifier of the message, from which the query originated */
        message_id: td_int53;
        /** Identifier that uniquely corresponds to the chat to which the message was sent */
        chat_instance: td_int64;
        /** Query payload */
        payload: td_CallbackQueryPayload;
    }
    
    
    /** A new incoming callback query from a message sent via a bot; for bots only */
    export interface td_updateNewInlineCallbackQuery {
        '@type': 'updateNewInlineCallbackQuery';
        /** Unique query identifier */
        id: td_int64;
        /** Identifier of the user who sent the query */
        sender_user_id: td_int53;
        /** Identifier of the inline message, from which the query originated */
        inline_message_id: td_string;
        /** An identifier uniquely corresponding to the chat a message was sent to */
        chat_instance: td_int64;
        /** Query payload */
        payload: td_CallbackQueryPayload;
    }
    
    
    /** A new incoming shipping query; for bots only. Only for invoices with flexible price */
    export interface td_updateNewShippingQuery {
        '@type': 'updateNewShippingQuery';
        /** Unique query identifier */
        id: td_int64;
        /** Identifier of the user who sent the query */
        sender_user_id: td_int53;
        /** Invoice payload */
        invoice_payload: td_string;
        /** User shipping address */
        shipping_address: td_address;
    }
    
    
    /** A new incoming pre-checkout query; for bots only. Contains full information about a checkout */
    export interface td_updateNewPreCheckoutQuery {
        '@type': 'updateNewPreCheckoutQuery';
        /** Unique query identifier */
        id: td_int64;
        /** Identifier of the user who sent the query */
        sender_user_id: td_int53;
        /** Currency for the product price */
        currency: td_string;
        /** Total price for the product, in the smallest units of the currency */
        total_amount: td_int53;
        /** Invoice payload */
        invoice_payload: td_bytes;
        /** Identifier of a shipping option chosen by the user; may be empty if not applicable */
        shipping_option_id: td_string;
        /** Information about the order; may be null */
        order_info?: td_orderInfo;
    }
    
    
    /** A new incoming event; for bots only */
    export interface td_updateNewCustomEvent {
        '@type': 'updateNewCustomEvent';
        /** A JSON-serialized event */
        event: td_string;
    }
    
    
    /** A new incoming query; for bots only */
    export interface td_updateNewCustomQuery {
        '@type': 'updateNewCustomQuery';
        /** The query identifier */
        id: td_int64;
        /** JSON-serialized query data */
        data: td_string;
        /** Query timeout */
        timeout: td_int32;
    }
    
    
    /** A poll was updated; for bots only */
    export interface td_updatePoll {
        '@type': 'updatePoll';
        /** New data about the poll */
        poll: td_poll;
    }
    
    
    /** A user changed the answer to a poll; for bots only */
    export interface td_updatePollAnswer {
        '@type': 'updatePollAnswer';
        /** Unique poll identifier */
        poll_id: td_int64;
        /** The user, who changed the answer to the poll */
        user_id: td_int53;
        /** 0-based identifiers of answer options, chosen by the user */
        option_ids: td_vector<td_int32>;
    }
    
    
    /** User rights changed in a chat; for bots only */
    export interface td_updateChatMember {
        '@type': 'updateChatMember';
        /** Chat identifier */
        chat_id: td_int53;
        /** Identifier of the user, changing the rights */
        actor_user_id: td_int53;
        /** Point in time (Unix timestamp) when the user rights was changed */
        date: td_int32;
        /** If user has joined the chat using an invite link, the invite link; may be null */
        invite_link?: td_chatInviteLink;
        /** Previous chat member */
        old_chat_member: td_chatMember;
        /** New chat member */
        new_chat_member: td_chatMember;
    }
    
    
    /** A user sent a join request to a chat; for bots only */
    export interface td_updateNewChatJoinRequest {
        '@type': 'updateNewChatJoinRequest';
        /** Chat identifier */
        chat_id: td_int53;
        /** Join request */
        request: td_chatJoinRequest;
        /** The invite link, which was used to send join request; may be null */
        invite_link?: td_chatInviteLink;
    }
    
    
    /** Contains a list of updates */
    export interface td_updates {
        '@type': 'updates';
        /** List of updates */
        updates: td_vector<td_Update>;
    }
    
    
    /** The log is written to stderr or an OS specific log */
    export interface td_logStreamDefault {
        '@type': 'logStreamDefault';
    }
    
    
    /** The log is written to a file */
    export interface td_logStreamFile {
        '@type': 'logStreamFile';
        /** Path to the file to where the internal TDLib log will be written */
        path: td_string;
        /** The maximum size of the file to where the internal TDLib log is written before the file will automatically be rotated, in bytes */
        max_file_size: td_int53;
        /** Pass true to additionally redirect stderr to the log file. Ignored on Windows */
        redirect_stderr: td_Bool;
    }
    
    
    /** The log is written nowhere */
    export interface td_logStreamEmpty {
        '@type': 'logStreamEmpty';
    }
    
    
    /** Contains a TDLib internal log verbosity level */
    export interface td_logVerbosityLevel {
        '@type': 'logVerbosityLevel';
        /** Log verbosity level */
        verbosity_level: td_int32;
    }
    
    
    /** Contains a list of available TDLib internal log tags */
    export interface td_logTags {
        '@type': 'logTags';
        /** List of log tags */
        tags: td_vector<td_string>;
    }
    
    
    /** A simple object containing a number; for testing only */
    export interface td_testInt {
        '@type': 'testInt';
        /** Number */
        value: td_int32;
    }
    
    
    /** A simple object containing a string; for testing only */
    export interface td_testString {
        '@type': 'testString';
        /** String */
        value: td_string;
    }
    
    
    /** A simple object containing a sequence of bytes; for testing only */
    export interface td_testBytes {
        '@type': 'testBytes';
        /** Bytes */
        value: td_bytes;
    }
    
    
    /** A simple object containing a vector of numbers; for testing only */
    export interface td_testVectorInt {
        '@type': 'testVectorInt';
        /** Vector of numbers */
        value: td_vector<td_int32>;
    }
    
    
    /** A simple object containing a vector of objects that hold a number; for testing only */
    export interface td_testVectorIntObject {
        '@type': 'testVectorIntObject';
        /** Vector of objects */
        value: td_vector<td_testInt>;
    }
    
    
    /** A simple object containing a vector of strings; for testing only */
    export interface td_testVectorString {
        '@type': 'testVectorString';
        /** Vector of strings */
        value: td_vector<td_string>;
    }
    
    
    /** A simple object containing a vector of objects that hold a string; for testing only */
    export interface td_testVectorStringObject {
        '@type': 'testVectorStringObject';
        /** Vector of objects */
        value: td_vector<td_testString>;
    }
    
    
    /** TDLib has encountered a fatal error */
    export interface td_updateFatalError {
        '@type': 'updateFatalError';
        /** Error message */
        error: td_string;
    }
    
    
    /** A file from a JavaScript Blob */
    export interface td_inputFileBlob {
        '@type': 'inputFileBlob';
        /** JavaScript blob containing file data */
        data: td_blob;
    }
    
    
    export type td_Error = td_error;
    export type td_Ok = td_ok;
    export type td_TdlibParameters = td_tdlibParameters;
    export type td_AuthenticationCodeType = td_authenticationCodeTypeTelegramMessage | td_authenticationCodeTypeSms | td_authenticationCodeTypeCall | td_authenticationCodeTypeFlashCall | td_authenticationCodeTypeMissedCall;
    export type td_AuthenticationCodeInfo = td_authenticationCodeInfo;
    export type td_EmailAddressAuthenticationCodeInfo = td_emailAddressAuthenticationCodeInfo;
    export type td_TextEntity = td_textEntity;
    export type td_TextEntities = td_textEntities;
    export type td_FormattedText = td_formattedText;
    export type td_TermsOfService = td_termsOfService;
    export type td_AuthorizationState = td_authorizationStateWaitTdlibParameters | td_authorizationStateWaitEncryptionKey | td_authorizationStateWaitPhoneNumber | td_authorizationStateWaitCode | td_authorizationStateWaitOtherDeviceConfirmation | td_authorizationStateWaitRegistration | td_authorizationStateWaitPassword | td_authorizationStateReady | td_authorizationStateLoggingOut | td_authorizationStateClosing | td_authorizationStateClosed;
    export type td_PasswordState = td_passwordState;
    export type td_RecoveryEmailAddress = td_recoveryEmailAddress;
    export type td_TemporaryPasswordState = td_temporaryPasswordState;
    export type td_LocalFile = td_localFile;
    export type td_RemoteFile = td_remoteFile;
    export type td_File = td_file;
    export type td_InputFile = td_inputFileId | td_inputFileRemote | td_inputFileLocal | td_inputFileGenerated | td_inputFileBlob;
    export type td_PhotoSize = td_photoSize;
    export type td_Minithumbnail = td_minithumbnail;
    export type td_ThumbnailFormat = td_thumbnailFormatJpeg | td_thumbnailFormatPng | td_thumbnailFormatWebp | td_thumbnailFormatGif | td_thumbnailFormatTgs | td_thumbnailFormatMpeg4;
    export type td_Thumbnail = td_thumbnail;
    export type td_MaskPoint = td_maskPointForehead | td_maskPointEyes | td_maskPointMouth | td_maskPointChin;
    export type td_MaskPosition = td_maskPosition;
    export type td_ClosedVectorPath = td_closedVectorPath;
    export type td_PollOption = td_pollOption;
    export type td_PollType = td_pollTypeRegular | td_pollTypeQuiz;
    export type td_Animation = td_animation;
    export type td_Audio = td_audio;
    export type td_Document = td_document;
    export type td_Photo = td_photo;
    export type td_Sticker = td_sticker;
    export type td_Video = td_video;
    export type td_VideoNote = td_videoNote;
    export type td_VoiceNote = td_voiceNote;
    export type td_AnimatedEmoji = td_animatedEmoji;
    export type td_Contact = td_contact;
    export type td_Location = td_location;
    export type td_Venue = td_venue;
    export type td_Game = td_game;
    export type td_Poll = td_poll;
    export type td_ProfilePhoto = td_profilePhoto;
    export type td_ChatPhotoInfo = td_chatPhotoInfo;
    export type td_UserType = td_userTypeRegular | td_userTypeDeleted | td_userTypeBot | td_userTypeUnknown;
    export type td_BotCommand = td_botCommand;
    export type td_BotCommands = td_botCommands;
    export type td_ChatLocation = td_chatLocation;
    export type td_AnimatedChatPhoto = td_animatedChatPhoto;
    export type td_ChatPhoto = td_chatPhoto;
    export type td_ChatPhotos = td_chatPhotos;
    export type td_InputChatPhoto = td_inputChatPhotoPrevious | td_inputChatPhotoStatic | td_inputChatPhotoAnimation;
    export type td_User = td_user;
    export type td_UserFullInfo = td_userFullInfo;
    export type td_Users = td_users;
    export type td_ChatAdministrator = td_chatAdministrator;
    export type td_ChatAdministrators = td_chatAdministrators;
    export type td_ChatPermissions = td_chatPermissions;
    export type td_ChatMemberStatus = td_chatMemberStatusCreator | td_chatMemberStatusAdministrator | td_chatMemberStatusMember | td_chatMemberStatusRestricted | td_chatMemberStatusLeft | td_chatMemberStatusBanned;
    export type td_ChatMember = td_chatMember;
    export type td_ChatMembers = td_chatMembers;
    export type td_ChatMembersFilter = td_chatMembersFilterContacts | td_chatMembersFilterAdministrators | td_chatMembersFilterMembers | td_chatMembersFilterMention | td_chatMembersFilterRestricted | td_chatMembersFilterBanned | td_chatMembersFilterBots;
    export type td_SupergroupMembersFilter = td_supergroupMembersFilterRecent | td_supergroupMembersFilterContacts | td_supergroupMembersFilterAdministrators | td_supergroupMembersFilterSearch | td_supergroupMembersFilterRestricted | td_supergroupMembersFilterBanned | td_supergroupMembersFilterMention | td_supergroupMembersFilterBots;
    export type td_ChatInviteLink = td_chatInviteLink;
    export type td_ChatInviteLinks = td_chatInviteLinks;
    export type td_ChatInviteLinkCount = td_chatInviteLinkCount;
    export type td_ChatInviteLinkCounts = td_chatInviteLinkCounts;
    export type td_ChatInviteLinkMember = td_chatInviteLinkMember;
    export type td_ChatInviteLinkMembers = td_chatInviteLinkMembers;
    export type td_ChatInviteLinkInfo = td_chatInviteLinkInfo;
    export type td_ChatJoinRequest = td_chatJoinRequest;
    export type td_ChatJoinRequests = td_chatJoinRequests;
    export type td_ChatJoinRequestsInfo = td_chatJoinRequestsInfo;
    export type td_BasicGroup = td_basicGroup;
    export type td_BasicGroupFullInfo = td_basicGroupFullInfo;
    export type td_Supergroup = td_supergroup;
    export type td_SupergroupFullInfo = td_supergroupFullInfo;
    export type td_SecretChatState = td_secretChatStatePending | td_secretChatStateReady | td_secretChatStateClosed;
    export type td_SecretChat = td_secretChat;
    export type td_MessageSender = td_messageSenderUser | td_messageSenderChat;
    export type td_MessageSenders = td_messageSenders;
    export type td_MessageForwardOrigin = td_messageForwardOriginUser | td_messageForwardOriginChat | td_messageForwardOriginHiddenUser | td_messageForwardOriginChannel | td_messageForwardOriginMessageImport;
    export type td_MessageForwardInfo = td_messageForwardInfo;
    export type td_MessageReplyInfo = td_messageReplyInfo;
    export type td_MessageInteractionInfo = td_messageInteractionInfo;
    export type td_MessageSendingState = td_messageSendingStatePending | td_messageSendingStateFailed;
    export type td_Message = td_message;
    export type td_Messages = td_messages;
    export type td_FoundMessages = td_foundMessages;
    export type td_MessagePosition = td_messagePosition;
    export type td_MessagePositions = td_messagePositions;
    export type td_MessageCalendarDay = td_messageCalendarDay;
    export type td_MessageCalendar = td_messageCalendar;
    export type td_SponsoredMessage = td_sponsoredMessage;
    export type td_NotificationSettingsScope = td_notificationSettingsScopePrivateChats | td_notificationSettingsScopeGroupChats | td_notificationSettingsScopeChannelChats;
    export type td_ChatNotificationSettings = td_chatNotificationSettings;
    export type td_ScopeNotificationSettings = td_scopeNotificationSettings;
    export type td_DraftMessage = td_draftMessage;
    export type td_ChatType = td_chatTypePrivate | td_chatTypeBasicGroup | td_chatTypeSupergroup | td_chatTypeSecret;
    export type td_ChatFilter = td_chatFilter;
    export type td_ChatFilterInfo = td_chatFilterInfo;
    export type td_RecommendedChatFilter = td_recommendedChatFilter;
    export type td_RecommendedChatFilters = td_recommendedChatFilters;
    export type td_ChatList = td_chatListMain | td_chatListArchive | td_chatListFilter;
    export type td_ChatLists = td_chatLists;
    export type td_ChatSource = td_chatSourceMtprotoProxy | td_chatSourcePublicServiceAnnouncement;
    export type td_ChatPosition = td_chatPosition;
    export type td_VideoChat = td_videoChat;
    export type td_Chat = td_chat;
    export type td_Chats = td_chats;
    export type td_ChatNearby = td_chatNearby;
    export type td_ChatsNearby = td_chatsNearby;
    export type td_PublicChatType = td_publicChatTypeHasUsername | td_publicChatTypeIsLocationBased;
    export type td_ChatActionBar = td_chatActionBarReportSpam | td_chatActionBarReportUnrelatedLocation | td_chatActionBarInviteMembers | td_chatActionBarReportAddBlock | td_chatActionBarAddContact | td_chatActionBarSharePhoneNumber | td_chatActionBarJoinRequest;
    export type td_KeyboardButtonType = td_keyboardButtonTypeText | td_keyboardButtonTypeRequestPhoneNumber | td_keyboardButtonTypeRequestLocation | td_keyboardButtonTypeRequestPoll;
    export type td_KeyboardButton = td_keyboardButton;
    export type td_InlineKeyboardButtonType = td_inlineKeyboardButtonTypeUrl | td_inlineKeyboardButtonTypeLoginUrl | td_inlineKeyboardButtonTypeCallback | td_inlineKeyboardButtonTypeCallbackWithPassword | td_inlineKeyboardButtonTypeCallbackGame | td_inlineKeyboardButtonTypeSwitchInline | td_inlineKeyboardButtonTypeBuy | td_inlineKeyboardButtonTypeUser;
    export type td_InlineKeyboardButton = td_inlineKeyboardButton;
    export type td_ReplyMarkup = td_replyMarkupRemoveKeyboard | td_replyMarkupForceReply | td_replyMarkupShowKeyboard | td_replyMarkupInlineKeyboard;
    export type td_LoginUrlInfo = td_loginUrlInfoOpen | td_loginUrlInfoRequestConfirmation;
    export type td_MessageThreadInfo = td_messageThreadInfo;
    export type td_RichText = td_richTextPlain | td_richTextBold | td_richTextItalic | td_richTextUnderline | td_richTextStrikethrough | td_richTextFixed | td_richTextUrl | td_richTextEmailAddress | td_richTextSubscript | td_richTextSuperscript | td_richTextMarked | td_richTextPhoneNumber | td_richTextIcon | td_richTextReference | td_richTextAnchor | td_richTextAnchorLink | td_richTexts;
    export type td_PageBlockCaption = td_pageBlockCaption;
    export type td_PageBlockListItem = td_pageBlockListItem;
    export type td_PageBlockHorizontalAlignment = td_pageBlockHorizontalAlignmentLeft | td_pageBlockHorizontalAlignmentCenter | td_pageBlockHorizontalAlignmentRight;
    export type td_PageBlockVerticalAlignment = td_pageBlockVerticalAlignmentTop | td_pageBlockVerticalAlignmentMiddle | td_pageBlockVerticalAlignmentBottom;
    export type td_PageBlockTableCell = td_pageBlockTableCell;
    export type td_PageBlockRelatedArticle = td_pageBlockRelatedArticle;
    export type td_PageBlock = td_pageBlockTitle | td_pageBlockSubtitle | td_pageBlockAuthorDate | td_pageBlockHeader | td_pageBlockSubheader | td_pageBlockKicker | td_pageBlockParagraph | td_pageBlockPreformatted | td_pageBlockFooter | td_pageBlockDivider | td_pageBlockAnchor | td_pageBlockList | td_pageBlockBlockQuote | td_pageBlockPullQuote | td_pageBlockAnimation | td_pageBlockAudio | td_pageBlockPhoto | td_pageBlockVideo | td_pageBlockVoiceNote | td_pageBlockCover | td_pageBlockEmbedded | td_pageBlockEmbeddedPost | td_pageBlockCollage | td_pageBlockSlideshow | td_pageBlockChatLink | td_pageBlockTable | td_pageBlockDetails | td_pageBlockRelatedArticles | td_pageBlockMap;
    export type td_WebPageInstantView = td_webPageInstantView;
    export type td_WebPage = td_webPage;
    export type td_CountryInfo = td_countryInfo;
    export type td_Countries = td_countries;
    export type td_PhoneNumberInfo = td_phoneNumberInfo;
    export type td_BankCardActionOpenUrl = td_bankCardActionOpenUrl;
    export type td_BankCardInfo = td_bankCardInfo;
    export type td_Address = td_address;
    export type td_LabeledPricePart = td_labeledPricePart;
    export type td_Invoice = td_invoice;
    export type td_OrderInfo = td_orderInfo;
    export type td_ShippingOption = td_shippingOption;
    export type td_SavedCredentials = td_savedCredentials;
    export type td_InputCredentials = td_inputCredentialsSaved | td_inputCredentialsNew | td_inputCredentialsApplePay | td_inputCredentialsGooglePay;
    export type td_PaymentsProviderStripe = td_paymentsProviderStripe;
    export type td_PaymentFormTheme = td_paymentFormTheme;
    export type td_PaymentForm = td_paymentForm;
    export type td_ValidatedOrderInfo = td_validatedOrderInfo;
    export type td_PaymentResult = td_paymentResult;
    export type td_PaymentReceipt = td_paymentReceipt;
    export type td_DatedFile = td_datedFile;
    export type td_PassportElementType = td_passportElementTypePersonalDetails | td_passportElementTypePassport | td_passportElementTypeDriverLicense | td_passportElementTypeIdentityCard | td_passportElementTypeInternalPassport | td_passportElementTypeAddress | td_passportElementTypeUtilityBill | td_passportElementTypeBankStatement | td_passportElementTypeRentalAgreement | td_passportElementTypePassportRegistration | td_passportElementTypeTemporaryRegistration | td_passportElementTypePhoneNumber | td_passportElementTypeEmailAddress;
    export type td_Date = td_date;
    export type td_PersonalDetails = td_personalDetails;
    export type td_IdentityDocument = td_identityDocument;
    export type td_InputIdentityDocument = td_inputIdentityDocument;
    export type td_PersonalDocument = td_personalDocument;
    export type td_InputPersonalDocument = td_inputPersonalDocument;
    export type td_PassportElement = td_passportElementPersonalDetails | td_passportElementPassport | td_passportElementDriverLicense | td_passportElementIdentityCard | td_passportElementInternalPassport | td_passportElementAddress | td_passportElementUtilityBill | td_passportElementBankStatement | td_passportElementRentalAgreement | td_passportElementPassportRegistration | td_passportElementTemporaryRegistration | td_passportElementPhoneNumber | td_passportElementEmailAddress;
    export type td_InputPassportElement = td_inputPassportElementPersonalDetails | td_inputPassportElementPassport | td_inputPassportElementDriverLicense | td_inputPassportElementIdentityCard | td_inputPassportElementInternalPassport | td_inputPassportElementAddress | td_inputPassportElementUtilityBill | td_inputPassportElementBankStatement | td_inputPassportElementRentalAgreement | td_inputPassportElementPassportRegistration | td_inputPassportElementTemporaryRegistration | td_inputPassportElementPhoneNumber | td_inputPassportElementEmailAddress;
    export type td_PassportElements = td_passportElements;
    export type td_PassportElementErrorSource = td_passportElementErrorSourceUnspecified | td_passportElementErrorSourceDataField | td_passportElementErrorSourceFrontSide | td_passportElementErrorSourceReverseSide | td_passportElementErrorSourceSelfie | td_passportElementErrorSourceTranslationFile | td_passportElementErrorSourceTranslationFiles | td_passportElementErrorSourceFile | td_passportElementErrorSourceFiles;
    export type td_PassportElementError = td_passportElementError;
    export type td_PassportSuitableElement = td_passportSuitableElement;
    export type td_PassportRequiredElement = td_passportRequiredElement;
    export type td_PassportAuthorizationForm = td_passportAuthorizationForm;
    export type td_PassportElementsWithErrors = td_passportElementsWithErrors;
    export type td_EncryptedCredentials = td_encryptedCredentials;
    export type td_EncryptedPassportElement = td_encryptedPassportElement;
    export type td_InputPassportElementErrorSource = td_inputPassportElementErrorSourceUnspecified | td_inputPassportElementErrorSourceDataField | td_inputPassportElementErrorSourceFrontSide | td_inputPassportElementErrorSourceReverseSide | td_inputPassportElementErrorSourceSelfie | td_inputPassportElementErrorSourceTranslationFile | td_inputPassportElementErrorSourceTranslationFiles | td_inputPassportElementErrorSourceFile | td_inputPassportElementErrorSourceFiles;
    export type td_InputPassportElementError = td_inputPassportElementError;
    export type td_MessageContent = td_messageText | td_messageAnimation | td_messageAudio | td_messageDocument | td_messagePhoto | td_messageExpiredPhoto | td_messageSticker | td_messageVideo | td_messageExpiredVideo | td_messageVideoNote | td_messageVoiceNote | td_messageLocation | td_messageVenue | td_messageContact | td_messageAnimatedEmoji | td_messageDice | td_messageGame | td_messagePoll | td_messageInvoice | td_messageCall | td_messageVideoChatScheduled | td_messageVideoChatStarted | td_messageVideoChatEnded | td_messageInviteVideoChatParticipants | td_messageBasicGroupChatCreate | td_messageSupergroupChatCreate | td_messageChatChangeTitle | td_messageChatChangePhoto | td_messageChatDeletePhoto | td_messageChatAddMembers | td_messageChatJoinByLink | td_messageChatJoinByRequest | td_messageChatDeleteMember | td_messageChatUpgradeTo | td_messageChatUpgradeFrom | td_messagePinMessage | td_messageScreenshotTaken | td_messageChatSetTheme | td_messageChatSetTtl | td_messageCustomServiceAction | td_messageGameScore | td_messagePaymentSuccessful | td_messagePaymentSuccessfulBot | td_messageContactRegistered | td_messageWebsiteConnected | td_messagePassportDataSent | td_messagePassportDataReceived | td_messageProximityAlertTriggered | td_messageUnsupported;
    export type td_TextEntityType = td_textEntityTypeMention | td_textEntityTypeHashtag | td_textEntityTypeCashtag | td_textEntityTypeBotCommand | td_textEntityTypeUrl | td_textEntityTypeEmailAddress | td_textEntityTypePhoneNumber | td_textEntityTypeBankCardNumber | td_textEntityTypeBold | td_textEntityTypeItalic | td_textEntityTypeUnderline | td_textEntityTypeStrikethrough | td_textEntityTypeSpoiler | td_textEntityTypeCode | td_textEntityTypePre | td_textEntityTypePreCode | td_textEntityTypeTextUrl | td_textEntityTypeMentionName | td_textEntityTypeMediaTimestamp;
    export type td_InputThumbnail = td_inputThumbnail;
    export type td_MessageSchedulingState = td_messageSchedulingStateSendAtDate | td_messageSchedulingStateSendWhenOnline;
    export type td_MessageSendOptions = td_messageSendOptions;
    export type td_MessageCopyOptions = td_messageCopyOptions;
    export type td_InputMessageContent = td_inputMessageText | td_inputMessageAnimation | td_inputMessageAudio | td_inputMessageDocument | td_inputMessagePhoto | td_inputMessageSticker | td_inputMessageVideo | td_inputMessageVideoNote | td_inputMessageVoiceNote | td_inputMessageLocation | td_inputMessageVenue | td_inputMessageContact | td_inputMessageDice | td_inputMessageGame | td_inputMessageInvoice | td_inputMessagePoll | td_inputMessageForwarded;
    export type td_SearchMessagesFilter = td_searchMessagesFilterEmpty | td_searchMessagesFilterAnimation | td_searchMessagesFilterAudio | td_searchMessagesFilterDocument | td_searchMessagesFilterPhoto | td_searchMessagesFilterVideo | td_searchMessagesFilterVoiceNote | td_searchMessagesFilterPhotoAndVideo | td_searchMessagesFilterUrl | td_searchMessagesFilterChatPhoto | td_searchMessagesFilterVideoNote | td_searchMessagesFilterVoiceAndVideoNote | td_searchMessagesFilterMention | td_searchMessagesFilterUnreadMention | td_searchMessagesFilterFailedToSend | td_searchMessagesFilterPinned;
    export type td_ChatAction = td_chatActionTyping | td_chatActionRecordingVideo | td_chatActionUploadingVideo | td_chatActionRecordingVoiceNote | td_chatActionUploadingVoiceNote | td_chatActionUploadingPhoto | td_chatActionUploadingDocument | td_chatActionChoosingSticker | td_chatActionChoosingLocation | td_chatActionChoosingContact | td_chatActionStartPlayingGame | td_chatActionRecordingVideoNote | td_chatActionUploadingVideoNote | td_chatActionWatchingAnimations | td_chatActionCancel;
    export type td_UserStatus = td_userStatusEmpty | td_userStatusOnline | td_userStatusOffline | td_userStatusRecently | td_userStatusLastWeek | td_userStatusLastMonth;
    export type td_Stickers = td_stickers;
    export type td_Emojis = td_emojis;
    export type td_StickerSet = td_stickerSet;
    export type td_StickerSetInfo = td_stickerSetInfo;
    export type td_StickerSets = td_stickerSets;
    export type td_CallDiscardReason = td_callDiscardReasonEmpty | td_callDiscardReasonMissed | td_callDiscardReasonDeclined | td_callDiscardReasonDisconnected | td_callDiscardReasonHungUp;
    export type td_CallProtocol = td_callProtocol;
    export type td_CallServerType = td_callServerTypeTelegramReflector | td_callServerTypeWebrtc;
    export type td_CallServer = td_callServer;
    export type td_CallId = td_callId;
    export type td_GroupCallId = td_groupCallId;
    export type td_CallState = td_callStatePending | td_callStateExchangingKeys | td_callStateReady | td_callStateHangingUp | td_callStateDiscarded | td_callStateError;
    export type td_GroupCallVideoQuality = td_groupCallVideoQualityThumbnail | td_groupCallVideoQualityMedium | td_groupCallVideoQualityFull;
    export type td_GroupCallRecentSpeaker = td_groupCallRecentSpeaker;
    export type td_GroupCall = td_groupCall;
    export type td_GroupCallVideoSourceGroup = td_groupCallVideoSourceGroup;
    export type td_GroupCallParticipantVideoInfo = td_groupCallParticipantVideoInfo;
    export type td_GroupCallParticipant = td_groupCallParticipant;
    export type td_CallProblem = td_callProblemEcho | td_callProblemNoise | td_callProblemInterruptions | td_callProblemDistortedSpeech | td_callProblemSilentLocal | td_callProblemSilentRemote | td_callProblemDropped | td_callProblemDistortedVideo | td_callProblemPixelatedVideo;
    export type td_Call = td_call;
    export type td_PhoneNumberAuthenticationSettings = td_phoneNumberAuthenticationSettings;
    export type td_Animations = td_animations;
    export type td_DiceStickers = td_diceStickersRegular | td_diceStickersSlotMachine;
    export type td_ImportedContacts = td_importedContacts;
    export type td_HttpUrl = td_httpUrl;
    export type td_InputInlineQueryResult = td_inputInlineQueryResultAnimation | td_inputInlineQueryResultArticle | td_inputInlineQueryResultAudio | td_inputInlineQueryResultContact | td_inputInlineQueryResultDocument | td_inputInlineQueryResultGame | td_inputInlineQueryResultLocation | td_inputInlineQueryResultPhoto | td_inputInlineQueryResultSticker | td_inputInlineQueryResultVenue | td_inputInlineQueryResultVideo | td_inputInlineQueryResultVoiceNote;
    export type td_InlineQueryResult = td_inlineQueryResultArticle | td_inlineQueryResultContact | td_inlineQueryResultLocation | td_inlineQueryResultVenue | td_inlineQueryResultGame | td_inlineQueryResultAnimation | td_inlineQueryResultAudio | td_inlineQueryResultDocument | td_inlineQueryResultPhoto | td_inlineQueryResultSticker | td_inlineQueryResultVideo | td_inlineQueryResultVoiceNote;
    export type td_InlineQueryResults = td_inlineQueryResults;
    export type td_CallbackQueryPayload = td_callbackQueryPayloadData | td_callbackQueryPayloadDataWithPassword | td_callbackQueryPayloadGame;
    export type td_CallbackQueryAnswer = td_callbackQueryAnswer;
    export type td_CustomRequestResult = td_customRequestResult;
    export type td_GameHighScore = td_gameHighScore;
    export type td_GameHighScores = td_gameHighScores;
    export type td_ChatEventAction = td_chatEventMessageEdited | td_chatEventMessageDeleted | td_chatEventPollStopped | td_chatEventMessagePinned | td_chatEventMessageUnpinned | td_chatEventMemberJoined | td_chatEventMemberJoinedByInviteLink | td_chatEventMemberJoinedByRequest | td_chatEventMemberLeft | td_chatEventMemberInvited | td_chatEventMemberPromoted | td_chatEventMemberRestricted | td_chatEventTitleChanged | td_chatEventPermissionsChanged | td_chatEventDescriptionChanged | td_chatEventUsernameChanged | td_chatEventPhotoChanged | td_chatEventInvitesToggled | td_chatEventLinkedChatChanged | td_chatEventSlowModeDelayChanged | td_chatEventMessageTtlChanged | td_chatEventSignMessagesToggled | td_chatEventHasProtectedContentToggled | td_chatEventStickerSetChanged | td_chatEventLocationChanged | td_chatEventIsAllHistoryAvailableToggled | td_chatEventInviteLinkEdited | td_chatEventInviteLinkRevoked | td_chatEventInviteLinkDeleted | td_chatEventVideoChatCreated | td_chatEventVideoChatEnded | td_chatEventVideoChatParticipantIsMutedToggled | td_chatEventVideoChatParticipantVolumeLevelChanged | td_chatEventVideoChatMuteNewParticipantsToggled;
    export type td_ChatEvent = td_chatEvent;
    export type td_ChatEvents = td_chatEvents;
    export type td_ChatEventLogFilters = td_chatEventLogFilters;
    export type td_LanguagePackStringValue = td_languagePackStringValueOrdinary | td_languagePackStringValuePluralized | td_languagePackStringValueDeleted;
    export type td_LanguagePackString = td_languagePackString;
    export type td_LanguagePackStrings = td_languagePackStrings;
    export type td_LanguagePackInfo = td_languagePackInfo;
    export type td_LocalizationTargetInfo = td_localizationTargetInfo;
    export type td_DeviceToken = td_deviceTokenFirebaseCloudMessaging | td_deviceTokenApplePush | td_deviceTokenApplePushVoIP | td_deviceTokenWindowsPush | td_deviceTokenMicrosoftPush | td_deviceTokenMicrosoftPushVoIP | td_deviceTokenWebPush | td_deviceTokenSimplePush | td_deviceTokenUbuntuPush | td_deviceTokenBlackBerryPush | td_deviceTokenTizenPush;
    export type td_PushReceiverId = td_pushReceiverId;
    export type td_BackgroundFill = td_backgroundFillSolid | td_backgroundFillGradient | td_backgroundFillFreeformGradient;
    export type td_BackgroundType = td_backgroundTypeWallpaper | td_backgroundTypePattern | td_backgroundTypeFill;
    export type td_Background = td_background;
    export type td_Backgrounds = td_backgrounds;
    export type td_InputBackground = td_inputBackgroundLocal | td_inputBackgroundRemote;
    export type td_ThemeSettings = td_themeSettings;
    export type td_ChatTheme = td_chatTheme;
    export type td_Hashtags = td_hashtags;
    export type td_CanTransferOwnershipResult = td_canTransferOwnershipResultOk | td_canTransferOwnershipResultPasswordNeeded | td_canTransferOwnershipResultPasswordTooFresh | td_canTransferOwnershipResultSessionTooFresh;
    export type td_CheckChatUsernameResult = td_checkChatUsernameResultOk | td_checkChatUsernameResultUsernameInvalid | td_checkChatUsernameResultUsernameOccupied | td_checkChatUsernameResultPublicChatsTooMuch | td_checkChatUsernameResultPublicGroupsUnavailable;
    export type td_CheckStickerSetNameResult = td_checkStickerSetNameResultOk | td_checkStickerSetNameResultNameInvalid | td_checkStickerSetNameResultNameOccupied;
    export type td_ResetPasswordResult = td_resetPasswordResultOk | td_resetPasswordResultPending | td_resetPasswordResultDeclined;
    export type td_MessageFileType = td_messageFileTypePrivate | td_messageFileTypeGroup | td_messageFileTypeUnknown;
    export type td_PushMessageContent = td_pushMessageContentHidden | td_pushMessageContentAnimation | td_pushMessageContentAudio | td_pushMessageContentContact | td_pushMessageContentContactRegistered | td_pushMessageContentDocument | td_pushMessageContentGame | td_pushMessageContentGameScore | td_pushMessageContentInvoice | td_pushMessageContentLocation | td_pushMessageContentPhoto | td_pushMessageContentPoll | td_pushMessageContentScreenshotTaken | td_pushMessageContentSticker | td_pushMessageContentText | td_pushMessageContentVideo | td_pushMessageContentVideoNote | td_pushMessageContentVoiceNote | td_pushMessageContentBasicGroupChatCreate | td_pushMessageContentChatAddMembers | td_pushMessageContentChatChangePhoto | td_pushMessageContentChatChangeTitle | td_pushMessageContentChatSetTheme | td_pushMessageContentChatDeleteMember | td_pushMessageContentChatJoinByLink | td_pushMessageContentChatJoinByRequest | td_pushMessageContentMessageForwards | td_pushMessageContentMediaAlbum;
    export type td_NotificationType = td_notificationTypeNewMessage | td_notificationTypeNewSecretChat | td_notificationTypeNewCall | td_notificationTypeNewPushMessage;
    export type td_NotificationGroupType = td_notificationGroupTypeMessages | td_notificationGroupTypeMentions | td_notificationGroupTypeSecretChat | td_notificationGroupTypeCalls;
    export type td_Notification = td_notification;
    export type td_NotificationGroup = td_notificationGroup;
    export type td_OptionValue = td_optionValueBoolean | td_optionValueEmpty | td_optionValueInteger | td_optionValueString;
    export type td_JsonObjectMember = td_jsonObjectMember;
    export type td_JsonValue = td_jsonValueNull | td_jsonValueBoolean | td_jsonValueNumber | td_jsonValueString | td_jsonValueArray | td_jsonValueObject;
    export type td_UserPrivacySettingRule = td_userPrivacySettingRuleAllowAll | td_userPrivacySettingRuleAllowContacts | td_userPrivacySettingRuleAllowUsers | td_userPrivacySettingRuleAllowChatMembers | td_userPrivacySettingRuleRestrictAll | td_userPrivacySettingRuleRestrictContacts | td_userPrivacySettingRuleRestrictUsers | td_userPrivacySettingRuleRestrictChatMembers;
    export type td_UserPrivacySettingRules = td_userPrivacySettingRules;
    export type td_UserPrivacySetting = td_userPrivacySettingShowStatus | td_userPrivacySettingShowProfilePhoto | td_userPrivacySettingShowLinkInForwardedMessages | td_userPrivacySettingShowPhoneNumber | td_userPrivacySettingAllowChatInvites | td_userPrivacySettingAllowCalls | td_userPrivacySettingAllowPeerToPeerCalls | td_userPrivacySettingAllowFindingByPhoneNumber;
    export type td_AccountTtl = td_accountTtl;
    export type td_Session = td_session;
    export type td_Sessions = td_sessions;
    export type td_ConnectedWebsite = td_connectedWebsite;
    export type td_ConnectedWebsites = td_connectedWebsites;
    export type td_ChatReportReason = td_chatReportReasonSpam | td_chatReportReasonViolence | td_chatReportReasonPornography | td_chatReportReasonChildAbuse | td_chatReportReasonCopyright | td_chatReportReasonUnrelatedLocation | td_chatReportReasonFake | td_chatReportReasonCustom;
    export type td_InternalLinkType = td_internalLinkTypeActiveSessions | td_internalLinkTypeAuthenticationCode | td_internalLinkTypeBackground | td_internalLinkTypeBotStart | td_internalLinkTypeBotStartInGroup | td_internalLinkTypeChangePhoneNumber | td_internalLinkTypeChatInvite | td_internalLinkTypeFilterSettings | td_internalLinkTypeGame | td_internalLinkTypeLanguagePack | td_internalLinkTypeMessage | td_internalLinkTypeMessageDraft | td_internalLinkTypePassportDataRequest | td_internalLinkTypePhoneNumberConfirmation | td_internalLinkTypeProxy | td_internalLinkTypePublicChat | td_internalLinkTypeQrCodeAuthentication | td_internalLinkTypeSettings | td_internalLinkTypeStickerSet | td_internalLinkTypeTheme | td_internalLinkTypeThemeSettings | td_internalLinkTypeUnknownDeepLink | td_internalLinkTypeUnsupportedProxy | td_internalLinkTypeVideoChat;
    export type td_MessageLink = td_messageLink;
    export type td_MessageLinkInfo = td_messageLinkInfo;
    export type td_FilePart = td_filePart;
    export type td_FileType = td_fileTypeNone | td_fileTypeAnimation | td_fileTypeAudio | td_fileTypeDocument | td_fileTypePhoto | td_fileTypeProfilePhoto | td_fileTypeSecret | td_fileTypeSecretThumbnail | td_fileTypeSecure | td_fileTypeSticker | td_fileTypeThumbnail | td_fileTypeUnknown | td_fileTypeVideo | td_fileTypeVideoNote | td_fileTypeVoiceNote | td_fileTypeWallpaper;
    export type td_StorageStatisticsByFileType = td_storageStatisticsByFileType;
    export type td_StorageStatisticsByChat = td_storageStatisticsByChat;
    export type td_StorageStatistics = td_storageStatistics;
    export type td_StorageStatisticsFast = td_storageStatisticsFast;
    export type td_DatabaseStatistics = td_databaseStatistics;
    export type td_NetworkType = td_networkTypeNone | td_networkTypeMobile | td_networkTypeMobileRoaming | td_networkTypeWiFi | td_networkTypeOther;
    export type td_NetworkStatisticsEntry = td_networkStatisticsEntryFile | td_networkStatisticsEntryCall;
    export type td_NetworkStatistics = td_networkStatistics;
    export type td_AutoDownloadSettings = td_autoDownloadSettings;
    export type td_AutoDownloadSettingsPresets = td_autoDownloadSettingsPresets;
    export type td_ConnectionState = td_connectionStateWaitingForNetwork | td_connectionStateConnectingToProxy | td_connectionStateConnecting | td_connectionStateUpdating | td_connectionStateReady;
    export type td_TopChatCategory = td_topChatCategoryUsers | td_topChatCategoryBots | td_topChatCategoryGroups | td_topChatCategoryChannels | td_topChatCategoryInlineBots | td_topChatCategoryCalls | td_topChatCategoryForwardChats;
    export type td_TMeUrlType = td_tMeUrlTypeUser | td_tMeUrlTypeSupergroup | td_tMeUrlTypeChatInvite | td_tMeUrlTypeStickerSet;
    export type td_TMeUrl = td_tMeUrl;
    export type td_TMeUrls = td_tMeUrls;
    export type td_SuggestedAction = td_suggestedActionEnableArchiveAndMuteNewChats | td_suggestedActionCheckPassword | td_suggestedActionCheckPhoneNumber | td_suggestedActionViewChecksHint | td_suggestedActionConvertToBroadcastGroup | td_suggestedActionSetPassword;
    export type td_Count = td_count;
    export type td_Text = td_text;
    export type td_Seconds = td_seconds;
    export type td_DeepLinkInfo = td_deepLinkInfo;
    export type td_TextParseMode = td_textParseModeMarkdown | td_textParseModeHTML;
    export type td_ProxyType = td_proxyTypeSocks5 | td_proxyTypeHttp | td_proxyTypeMtproto;
    export type td_Proxy = td_proxy;
    export type td_Proxies = td_proxies;
    export type td_InputSticker = td_inputStickerStatic | td_inputStickerAnimated;
    export type td_DateRange = td_dateRange;
    export type td_StatisticalValue = td_statisticalValue;
    export type td_StatisticalGraph = td_statisticalGraphData | td_statisticalGraphAsync | td_statisticalGraphError;
    export type td_ChatStatisticsMessageInteractionInfo = td_chatStatisticsMessageInteractionInfo;
    export type td_ChatStatisticsMessageSenderInfo = td_chatStatisticsMessageSenderInfo;
    export type td_ChatStatisticsAdministratorActionsInfo = td_chatStatisticsAdministratorActionsInfo;
    export type td_ChatStatisticsInviterInfo = td_chatStatisticsInviterInfo;
    export type td_ChatStatistics = td_chatStatisticsSupergroup | td_chatStatisticsChannel;
    export type td_MessageStatistics = td_messageStatistics;
    export type td_Point = td_point;
    export type td_VectorPathCommand = td_vectorPathCommandLine | td_vectorPathCommandCubicBezierCurve;
    export type td_BotCommandScope = td_botCommandScopeDefault | td_botCommandScopeAllPrivateChats | td_botCommandScopeAllGroupChats | td_botCommandScopeAllChatAdministrators | td_botCommandScopeChat | td_botCommandScopeChatAdministrators | td_botCommandScopeChatMember;
    export type td_Update = td_updateAuthorizationState | td_updateNewMessage | td_updateMessageSendAcknowledged | td_updateMessageSendSucceeded | td_updateMessageSendFailed | td_updateMessageContent | td_updateMessageEdited | td_updateMessageIsPinned | td_updateMessageInteractionInfo | td_updateMessageContentOpened | td_updateMessageMentionRead | td_updateMessageLiveLocationViewed | td_updateNewChat | td_updateChatTitle | td_updateChatPhoto | td_updateChatPermissions | td_updateChatLastMessage | td_updateChatPosition | td_updateChatReadInbox | td_updateChatReadOutbox | td_updateChatActionBar | td_updateChatDraftMessage | td_updateChatMessageSender | td_updateChatMessageTtl | td_updateChatNotificationSettings | td_updateChatPendingJoinRequests | td_updateChatReplyMarkup | td_updateChatTheme | td_updateChatUnreadMentionCount | td_updateChatVideoChat | td_updateChatDefaultDisableNotification | td_updateChatHasProtectedContent | td_updateChatHasScheduledMessages | td_updateChatIsBlocked | td_updateChatIsMarkedAsUnread | td_updateChatFilters | td_updateChatOnlineMemberCount | td_updateScopeNotificationSettings | td_updateNotification | td_updateNotificationGroup | td_updateActiveNotifications | td_updateHavePendingNotifications | td_updateDeleteMessages | td_updateChatAction | td_updateUserStatus | td_updateUser | td_updateBasicGroup | td_updateSupergroup | td_updateSecretChat | td_updateUserFullInfo | td_updateBasicGroupFullInfo | td_updateSupergroupFullInfo | td_updateServiceNotification | td_updateFile | td_updateFileGenerationStart | td_updateFileGenerationStop | td_updateCall | td_updateGroupCall | td_updateGroupCallParticipant | td_updateNewCallSignalingData | td_updateUserPrivacySettingRules | td_updateUnreadMessageCount | td_updateUnreadChatCount | td_updateOption | td_updateStickerSet | td_updateInstalledStickerSets | td_updateTrendingStickerSets | td_updateRecentStickers | td_updateFavoriteStickers | td_updateSavedAnimations | td_updateSelectedBackground | td_updateChatThemes | td_updateLanguagePackStrings | td_updateConnectionState | td_updateTermsOfService | td_updateUsersNearby | td_updateDiceEmojis | td_updateAnimatedEmojiMessageClicked | td_updateAnimationSearchParameters | td_updateSuggestedActions | td_updateNewInlineQuery | td_updateNewChosenInlineResult | td_updateNewCallbackQuery | td_updateNewInlineCallbackQuery | td_updateNewShippingQuery | td_updateNewPreCheckoutQuery | td_updateNewCustomEvent | td_updateNewCustomQuery | td_updatePoll | td_updatePollAnswer | td_updateChatMember | td_updateNewChatJoinRequest | td_updateFatalError;
    export type td_Updates = td_updates;
    export type td_LogStream = td_logStreamDefault | td_logStreamFile | td_logStreamEmpty;
    export type td_LogVerbosityLevel = td_logVerbosityLevel;
    export type td_LogTags = td_logTags;
    export type td_TestInt = td_testInt;
    export type td_TestString = td_testString;
    export type td_TestBytes = td_testBytes;
    export type td_TestVectorInt = td_testVectorInt;
    export type td_TestVectorIntObject = td_testVectorIntObject;
    export type td_TestVectorString = td_testVectorString;
    export type td_TestVectorStringObject = td_testVectorStringObject;

    export type TdClass = td_Error | td_Ok | td_TdlibParameters | td_AuthenticationCodeType | td_AuthenticationCodeInfo | td_EmailAddressAuthenticationCodeInfo | td_TextEntity | td_TextEntities | td_FormattedText | td_TermsOfService | td_AuthorizationState | td_PasswordState | td_RecoveryEmailAddress | td_TemporaryPasswordState | td_LocalFile | td_RemoteFile | td_File | td_InputFile | td_PhotoSize | td_Minithumbnail | td_ThumbnailFormat | td_Thumbnail | td_MaskPoint | td_MaskPosition | td_ClosedVectorPath | td_PollOption | td_PollType | td_Animation | td_Audio | td_Document | td_Photo | td_Sticker | td_Video | td_VideoNote | td_VoiceNote | td_AnimatedEmoji | td_Contact | td_Location | td_Venue | td_Game | td_Poll | td_ProfilePhoto | td_ChatPhotoInfo | td_UserType | td_BotCommand | td_BotCommands | td_ChatLocation | td_AnimatedChatPhoto | td_ChatPhoto | td_ChatPhotos | td_InputChatPhoto | td_User | td_UserFullInfo | td_Users | td_ChatAdministrator | td_ChatAdministrators | td_ChatPermissions | td_ChatMemberStatus | td_ChatMember | td_ChatMembers | td_ChatMembersFilter | td_SupergroupMembersFilter | td_ChatInviteLink | td_ChatInviteLinks | td_ChatInviteLinkCount | td_ChatInviteLinkCounts | td_ChatInviteLinkMember | td_ChatInviteLinkMembers | td_ChatInviteLinkInfo | td_ChatJoinRequest | td_ChatJoinRequests | td_ChatJoinRequestsInfo | td_BasicGroup | td_BasicGroupFullInfo | td_Supergroup | td_SupergroupFullInfo | td_SecretChatState | td_SecretChat | td_MessageSender | td_MessageSenders | td_MessageForwardOrigin | td_MessageForwardInfo | td_MessageReplyInfo | td_MessageInteractionInfo | td_MessageSendingState | td_Message | td_Messages | td_FoundMessages | td_MessagePosition | td_MessagePositions | td_MessageCalendarDay | td_MessageCalendar | td_SponsoredMessage | td_NotificationSettingsScope | td_ChatNotificationSettings | td_ScopeNotificationSettings | td_DraftMessage | td_ChatType | td_ChatFilter | td_ChatFilterInfo | td_RecommendedChatFilter | td_RecommendedChatFilters | td_ChatList | td_ChatLists | td_ChatSource | td_ChatPosition | td_VideoChat | td_Chat | td_Chats | td_ChatNearby | td_ChatsNearby | td_PublicChatType | td_ChatActionBar | td_KeyboardButtonType | td_KeyboardButton | td_InlineKeyboardButtonType | td_InlineKeyboardButton | td_ReplyMarkup | td_LoginUrlInfo | td_MessageThreadInfo | td_RichText | td_PageBlockCaption | td_PageBlockListItem | td_PageBlockHorizontalAlignment | td_PageBlockVerticalAlignment | td_PageBlockTableCell | td_PageBlockRelatedArticle | td_PageBlock | td_WebPageInstantView | td_WebPage | td_CountryInfo | td_Countries | td_PhoneNumberInfo | td_BankCardActionOpenUrl | td_BankCardInfo | td_Address | td_LabeledPricePart | td_Invoice | td_OrderInfo | td_ShippingOption | td_SavedCredentials | td_InputCredentials | td_PaymentsProviderStripe | td_PaymentFormTheme | td_PaymentForm | td_ValidatedOrderInfo | td_PaymentResult | td_PaymentReceipt | td_DatedFile | td_PassportElementType | td_Date | td_PersonalDetails | td_IdentityDocument | td_InputIdentityDocument | td_PersonalDocument | td_InputPersonalDocument | td_PassportElement | td_InputPassportElement | td_PassportElements | td_PassportElementErrorSource | td_PassportElementError | td_PassportSuitableElement | td_PassportRequiredElement | td_PassportAuthorizationForm | td_PassportElementsWithErrors | td_EncryptedCredentials | td_EncryptedPassportElement | td_InputPassportElementErrorSource | td_InputPassportElementError | td_MessageContent | td_TextEntityType | td_InputThumbnail | td_MessageSchedulingState | td_MessageSendOptions | td_MessageCopyOptions | td_InputMessageContent | td_SearchMessagesFilter | td_ChatAction | td_UserStatus | td_Stickers | td_Emojis | td_StickerSet | td_StickerSetInfo | td_StickerSets | td_CallDiscardReason | td_CallProtocol | td_CallServerType | td_CallServer | td_CallId | td_GroupCallId | td_CallState | td_GroupCallVideoQuality | td_GroupCallRecentSpeaker | td_GroupCall | td_GroupCallVideoSourceGroup | td_GroupCallParticipantVideoInfo | td_GroupCallParticipant | td_CallProblem | td_Call | td_PhoneNumberAuthenticationSettings | td_Animations | td_DiceStickers | td_ImportedContacts | td_HttpUrl | td_InputInlineQueryResult | td_InlineQueryResult | td_InlineQueryResults | td_CallbackQueryPayload | td_CallbackQueryAnswer | td_CustomRequestResult | td_GameHighScore | td_GameHighScores | td_ChatEventAction | td_ChatEvent | td_ChatEvents | td_ChatEventLogFilters | td_LanguagePackStringValue | td_LanguagePackString | td_LanguagePackStrings | td_LanguagePackInfo | td_LocalizationTargetInfo | td_DeviceToken | td_PushReceiverId | td_BackgroundFill | td_BackgroundType | td_Background | td_Backgrounds | td_InputBackground | td_ThemeSettings | td_ChatTheme | td_Hashtags | td_CanTransferOwnershipResult | td_CheckChatUsernameResult | td_CheckStickerSetNameResult | td_ResetPasswordResult | td_MessageFileType | td_PushMessageContent | td_NotificationType | td_NotificationGroupType | td_Notification | td_NotificationGroup | td_OptionValue | td_JsonObjectMember | td_JsonValue | td_UserPrivacySettingRule | td_UserPrivacySettingRules | td_UserPrivacySetting | td_AccountTtl | td_Session | td_Sessions | td_ConnectedWebsite | td_ConnectedWebsites | td_ChatReportReason | td_InternalLinkType | td_MessageLink | td_MessageLinkInfo | td_FilePart | td_FileType | td_StorageStatisticsByFileType | td_StorageStatisticsByChat | td_StorageStatistics | td_StorageStatisticsFast | td_DatabaseStatistics | td_NetworkType | td_NetworkStatisticsEntry | td_NetworkStatistics | td_AutoDownloadSettings | td_AutoDownloadSettingsPresets | td_ConnectionState | td_TopChatCategory | td_TMeUrlType | td_TMeUrl | td_TMeUrls | td_SuggestedAction | td_Count | td_Text | td_Seconds | td_DeepLinkInfo | td_TextParseMode | td_ProxyType | td_Proxy | td_Proxies | td_InputSticker | td_DateRange | td_StatisticalValue | td_StatisticalGraph | td_ChatStatisticsMessageInteractionInfo | td_ChatStatisticsMessageSenderInfo | td_ChatStatisticsAdministratorActionsInfo | td_ChatStatisticsInviterInfo | td_ChatStatistics | td_MessageStatistics | td_Point | td_VectorPathCommand | td_BotCommandScope | td_Update | td_Updates | td_LogStream | td_LogVerbosityLevel | td_LogTags | td_TestInt | td_TestString | td_TestBytes | td_TestVectorInt | td_TestVectorIntObject | td_TestVectorString | td_TestVectorStringObject;
    
    
    /** Returns the current authorization state; this is an offline request. For informational purposes only. Use updateAuthorizationState instead to maintain the current authorization state. Can be called before initialization */
    export interface td_getAuthorizationState {
        '@type': 'getAuthorizationState';
    }
    
    
    /** Sets the parameters for TDLib initialization. Works only when the current authorization state is authorizationStateWaitTdlibParameters */
    export interface td_setTdlibParameters {
        '@type': 'setTdlibParameters';
        /** Parameters for TDLib initialization */
        parameters?: td_tdlibParameters;
    }
    
    
    /** Checks the database encryption key for correctness. Works only when the current authorization state is authorizationStateWaitEncryptionKey */
    export interface td_checkDatabaseEncryptionKey {
        '@type': 'checkDatabaseEncryptionKey';
        /** Encryption key to check or set up */
        encryption_key?: td_bytes;
    }
    
    
    /** Sets the phone number of the user and sends an authentication code to the user. Works only when the current authorization state is authorizationStateWaitPhoneNumber, -or if there is no pending authentication query and the current authorization state is authorizationStateWaitCode, authorizationStateWaitRegistration, or authorizationStateWaitPassword */
    export interface td_setAuthenticationPhoneNumber {
        '@type': 'setAuthenticationPhoneNumber';
        /** The phone number of the user, in international format */
        phone_number?: td_string;
        /** Settings for the authentication of the user's phone number; pass null to use default settings */
        settings?: td_phoneNumberAuthenticationSettings;
    }
    
    
    /** Re-sends an authentication code to the user. Works only when the current authorization state is authorizationStateWaitCode, the next_code_type of the result is not null and the server-specified timeout has passed */
    export interface td_resendAuthenticationCode {
        '@type': 'resendAuthenticationCode';
    }
    
    
    /** Checks the authentication code. Works only when the current authorization state is authorizationStateWaitCode */
    export interface td_checkAuthenticationCode {
        '@type': 'checkAuthenticationCode';
        /** Authentication code to check */
        code?: td_string;
    }
    
    
    /** Requests QR code authentication by scanning a QR code on another logged in device. Works only when the current authorization state is authorizationStateWaitPhoneNumber, -or if there is no pending authentication query and the current authorization state is authorizationStateWaitCode, authorizationStateWaitRegistration, or authorizationStateWaitPassword */
    export interface td_requestQrCodeAuthentication {
        '@type': 'requestQrCodeAuthentication';
        /** List of user identifiers of other users currently using the application */
        other_user_ids?: td_vector<td_int53>;
    }
    
    
    /** Finishes user registration. Works only when the current authorization state is authorizationStateWaitRegistration */
    export interface td_registerUser {
        '@type': 'registerUser';
        /** The first name of the user; 1-64 characters */
        first_name?: td_string;
        /** The last name of the user; 0-64 characters */
        last_name?: td_string;
    }
    
    
    /** Checks the authentication password for correctness. Works only when the current authorization state is authorizationStateWaitPassword */
    export interface td_checkAuthenticationPassword {
        '@type': 'checkAuthenticationPassword';
        /** The password to check */
        password?: td_string;
    }
    
    
    /** Requests to send a password recovery code to an email address that was previously set up. Works only when the current authorization state is authorizationStateWaitPassword */
    export interface td_requestAuthenticationPasswordRecovery {
        '@type': 'requestAuthenticationPasswordRecovery';
    }
    
    
    /** Checks whether a password recovery code sent to an email address is valid. Works only when the current authorization state is authorizationStateWaitPassword */
    export interface td_checkAuthenticationPasswordRecoveryCode {
        '@type': 'checkAuthenticationPasswordRecoveryCode';
        /** Recovery code to check */
        recovery_code?: td_string;
    }
    
    
    /** Recovers the password with a password recovery code sent to an email address that was previously set up. Works only when the current authorization state is authorizationStateWaitPassword */
    export interface td_recoverAuthenticationPassword {
        '@type': 'recoverAuthenticationPassword';
        /** Recovery code to check */
        recovery_code?: td_string;
        /** New password of the user; may be empty to remove the password */
        new_password?: td_string;
        /** New password hint; may be empty */
        new_hint?: td_string;
    }
    
    
    /** Checks the authentication token of a bot; to log in as a bot. Works only when the current authorization state is authorizationStateWaitPhoneNumber. Can be used instead of setAuthenticationPhoneNumber and checkAuthenticationCode to log in */
    export interface td_checkAuthenticationBotToken {
        '@type': 'checkAuthenticationBotToken';
        /** The bot token */
        token?: td_string;
    }
    
    
    /** Closes the TDLib instance after a proper logout. Requires an available network connection. All local data will be destroyed. After the logout completes, updateAuthorizationState with authorizationStateClosed will be sent */
    export interface td_logOut {
        '@type': 'logOut';
    }
    
    
    /** Closes the TDLib instance. All databases will be flushed to disk and properly closed. After the close completes, updateAuthorizationState with authorizationStateClosed will be sent. Can be called before initialization */
    export interface td_close {
        '@type': 'close';
    }
    
    
    /** Closes the TDLib instance, destroying all local data without a proper logout. The current user session will remain in the list of all active sessions. All local data will be destroyed. After the destruction completes updateAuthorizationState with authorizationStateClosed will be sent. Can be called before authorization */
    export interface td_destroy {
        '@type': 'destroy';
    }
    
    
    /** Confirms QR code authentication on another device. Returns created session on success */
    export interface td_confirmQrCodeAuthentication {
        '@type': 'confirmQrCodeAuthentication';
        /** A link from a QR code. The link must be scanned by the in-app camera */
        link?: td_string;
    }
    
    
    /** Returns all updates needed to restore current TDLib state, i.e. all actual UpdateAuthorizationState/UpdateUser/UpdateNewChat and others. This is especially useful if TDLib is run in a separate process. Can be called before initialization */
    export interface td_getCurrentState {
        '@type': 'getCurrentState';
    }
    
    
    /** Changes the database encryption key. Usually the encryption key is never changed and is stored in some OS keychain */
    export interface td_setDatabaseEncryptionKey {
        '@type': 'setDatabaseEncryptionKey';
        /** New encryption key */
        new_encryption_key?: td_bytes;
    }
    
    
    /** Returns the current state of 2-step verification */
    export interface td_getPasswordState {
        '@type': 'getPasswordState';
    }
    
    
    /** Changes the password for the current user. If a new recovery email address is specified, then the change will not be applied until the new recovery email address is confirmed */
    export interface td_setPassword {
        '@type': 'setPassword';
        /** Previous password of the user */
        old_password?: td_string;
        /** New password of the user; may be empty to remove the password */
        new_password?: td_string;
        /** New password hint; may be empty */
        new_hint?: td_string;
        /** Pass true if the recovery email address must be changed */
        set_recovery_email_address?: td_Bool;
        /** New recovery email address; may be empty */
        new_recovery_email_address?: td_string;
    }
    
    
    /** Returns a 2-step verification recovery email address that was previously set up. This method can be used to verify a password provided by the user */
    export interface td_getRecoveryEmailAddress {
        '@type': 'getRecoveryEmailAddress';
        /** The password for the current user */
        password?: td_string;
    }
    
    
    /** Changes the 2-step verification recovery email address of the user. If a new recovery email address is specified, then the change will not be applied until the new recovery email address is confirmed. -If new_recovery_email_address is the same as the email address that is currently set up, this call succeeds immediately and aborts all other requests waiting for an email confirmation */
    export interface td_setRecoveryEmailAddress {
        '@type': 'setRecoveryEmailAddress';
        /** Password of the current user */
        password?: td_string;
        /** New recovery email address */
        new_recovery_email_address?: td_string;
    }
    
    
    /** Checks the 2-step verification recovery email address verification code */
    export interface td_checkRecoveryEmailAddressCode {
        '@type': 'checkRecoveryEmailAddressCode';
        /** Verification code to check */
        code?: td_string;
    }
    
    
    /** Resends the 2-step verification recovery email address verification code */
    export interface td_resendRecoveryEmailAddressCode {
        '@type': 'resendRecoveryEmailAddressCode';
    }
    
    
    /** Requests to send a 2-step verification password recovery code to an email address that was previously set up */
    export interface td_requestPasswordRecovery {
        '@type': 'requestPasswordRecovery';
    }
    
    
    /** Checks whether a 2-step verification password recovery code sent to an email address is valid */
    export interface td_checkPasswordRecoveryCode {
        '@type': 'checkPasswordRecoveryCode';
        /** Recovery code to check */
        recovery_code?: td_string;
    }
    
    
    /** Recovers the 2-step verification password using a recovery code sent to an email address that was previously set up */
    export interface td_recoverPassword {
        '@type': 'recoverPassword';
        /** Recovery code to check */
        recovery_code?: td_string;
        /** New password of the user; may be empty to remove the password */
        new_password?: td_string;
        /** New password hint; may be empty */
        new_hint?: td_string;
    }
    
    
    /** Removes 2-step verification password without previous password and access to recovery email address. The password can't be reset immediately and the request needs to be repeated after the specified time */
    export interface td_resetPassword {
        '@type': 'resetPassword';
    }
    
    
    /** Cancels reset of 2-step verification password. The method can be called if passwordState.pending_reset_date > 0 */
    export interface td_cancelPasswordReset {
        '@type': 'cancelPasswordReset';
    }
    
    
    /** Creates a new temporary password for processing payments */
    export interface td_createTemporaryPassword {
        '@type': 'createTemporaryPassword';
        /** Persistent user password */
        password?: td_string;
        /** Time during which the temporary password will be valid, in seconds; must be between 60 and 86400 */
        valid_for?: td_int32;
    }
    
    
    /** Returns information about the current temporary password */
    export interface td_getTemporaryPasswordState {
        '@type': 'getTemporaryPasswordState';
    }
    
    
    /** Returns the current user */
    export interface td_getMe {
        '@type': 'getMe';
    }
    
    
    /** Returns information about a user by their identifier. This is an offline request if the current user is not a bot */
    export interface td_getUser {
        '@type': 'getUser';
        /** User identifier */
        user_id?: td_int53;
    }
    
    
    /** Returns full information about a user by their identifier */
    export interface td_getUserFullInfo {
        '@type': 'getUserFullInfo';
        /** User identifier */
        user_id?: td_int53;
    }
    
    
    /** Returns information about a basic group by its identifier. This is an offline request if the current user is not a bot */
    export interface td_getBasicGroup {
        '@type': 'getBasicGroup';
        /** Basic group identifier */
        basic_group_id?: td_int53;
    }
    
    
    /** Returns full information about a basic group by its identifier */
    export interface td_getBasicGroupFullInfo {
        '@type': 'getBasicGroupFullInfo';
        /** Basic group identifier */
        basic_group_id?: td_int53;
    }
    
    
    /** Returns information about a supergroup or a channel by its identifier. This is an offline request if the current user is not a bot */
    export interface td_getSupergroup {
        '@type': 'getSupergroup';
        /** Supergroup or channel identifier */
        supergroup_id?: td_int53;
    }
    
    
    /** Returns full information about a supergroup or a channel by its identifier, cached for up to 1 minute */
    export interface td_getSupergroupFullInfo {
        '@type': 'getSupergroupFullInfo';
        /** Supergroup or channel identifier */
        supergroup_id?: td_int53;
    }
    
    
    /** Returns information about a secret chat by its identifier. This is an offline request */
    export interface td_getSecretChat {
        '@type': 'getSecretChat';
        /** Secret chat identifier */
        secret_chat_id?: td_int32;
    }
    
    
    /** Returns information about a chat by its identifier, this is an offline request if the current user is not a bot */
    export interface td_getChat {
        '@type': 'getChat';
        /** Chat identifier */
        chat_id?: td_int53;
    }
    
    
    /** Returns information about a message */
    export interface td_getMessage {
        '@type': 'getMessage';
        /** Identifier of the chat the message belongs to */
        chat_id?: td_int53;
        /** Identifier of the message to get */
        message_id?: td_int53;
    }
    
    
    /** Returns information about a message, if it is available locally without sending network request. This is an offline request */
    export interface td_getMessageLocally {
        '@type': 'getMessageLocally';
        /** Identifier of the chat the message belongs to */
        chat_id?: td_int53;
        /** Identifier of the message to get */
        message_id?: td_int53;
    }
    
    
    /** Returns information about a message that is replied by a given message. Also returns the pinned message, the game message, and the invoice message for messages of the types messagePinMessage, messageGameScore, and messagePaymentSuccessful respectively */
    export interface td_getRepliedMessage {
        '@type': 'getRepliedMessage';
        /** Identifier of the chat the message belongs to */
        chat_id?: td_int53;
        /** Identifier of the reply message */
        message_id?: td_int53;
    }
    
    
    /** Returns information about a newest pinned message in the chat */
    export interface td_getChatPinnedMessage {
        '@type': 'getChatPinnedMessage';
        /** Identifier of the chat the message belongs to */
        chat_id?: td_int53;
    }
    
    
    /** Returns information about a message with the callback button that originated a callback query; for bots only */
    export interface td_getCallbackQueryMessage {
        '@type': 'getCallbackQueryMessage';
        /** Identifier of the chat the message belongs to */
        chat_id?: td_int53;
        /** Message identifier */
        message_id?: td_int53;
        /** Identifier of the callback query */
        callback_query_id?: td_int64;
    }
    
    
    /** Returns information about messages. If a message is not found, returns null on the corresponding position of the result */
    export interface td_getMessages {
        '@type': 'getMessages';
        /** Identifier of the chat the messages belong to */
        chat_id?: td_int53;
        /** Identifiers of the messages to get */
        message_ids?: td_vector<td_int53>;
    }
    
    
    /** Returns information about a message thread. Can be used only if message.can_get_message_thread == true */
    export interface td_getMessageThread {
        '@type': 'getMessageThread';
        /** Chat identifier */
        chat_id?: td_int53;
        /** Identifier of the message */
        message_id?: td_int53;
    }
    
    
    /** Returns viewers of a recent outgoing message in a basic group or a supergroup chat. For video notes and voice notes only users, opened content of the message, are returned. The method can be called if message.can_get_viewers == true */
    export interface td_getMessageViewers {
        '@type': 'getMessageViewers';
        /** Chat identifier */
        chat_id?: td_int53;
        /** Identifier of the message */
        message_id?: td_int53;
    }
    
    
    /** Returns information about a file; this is an offline request */
    export interface td_getFile {
        '@type': 'getFile';
        /** Identifier of the file to get */
        file_id?: td_int32;
    }
    
    
    /** Returns information about a file by its remote ID; this is an offline request. Can be used to register a URL as a file for further uploading, or sending as a message. Even the request succeeds, the file can be used only if it is still accessible to the user. -For example, if the file is from a message, then the message must be not deleted and accessible to the user. If the file database is disabled, then the corresponding object with the file must be preloaded by the application */
    export interface td_getRemoteFile {
        '@type': 'getRemoteFile';
        /** Remote identifier of the file to get */
        remote_file_id?: td_string;
        /** File type; pass null if unknown */
        file_type?: td_FileType;
    }
    
    
    /** Loads more chats from a chat list. The loaded chats and their positions in the chat list will be sent through updates. Chats are sorted by the pair (chat.position.order, chat.id) in descending order. Returns a 404 error if all chats have been loaded */
    export interface td_loadChats {
        '@type': 'loadChats';
        /** The chat list in which to load chats; pass null to load chats from the main chat list */
        chat_list?: td_ChatList;
        /** The maximum number of chats to be loaded. For optimal performance, the number of loaded chats is chosen by TDLib and can be smaller than the specified limit, even if the end of the list is not reached */
        limit?: td_int32;
    }
    
    
    /** Returns an ordered list of chats from the beginning of a chat list. For informational purposes only. Use loadChats and updates processing instead to maintain chat lists in a consistent state */
    export interface td_getChats {
        '@type': 'getChats';
        /** The chat list in which to return chats; pass null to get chats from the main chat list */
        chat_list?: td_ChatList;
        /** The maximum number of chats to be returned */
        limit?: td_int32;
    }
    
    
    /** Searches a public chat by its username. Currently, only private chats, supergroups and channels can be public. Returns the chat if found; otherwise an error is returned */
    export interface td_searchPublicChat {
        '@type': 'searchPublicChat';
        /** Username to be resolved */
        username?: td_string;
    }
    
    
    /** Searches public chats by looking for specified query in their username and title. Currently, only private chats, supergroups and channels can be public. Returns a meaningful number of results. -Excludes private chats with contacts and chats from the chat list from the results */
    export interface td_searchPublicChats {
        '@type': 'searchPublicChats';
        /** Query to search for */
        query?: td_string;
    }
    
    
    /** Searches for the specified query in the title and username of already known chats, this is an offline request. Returns chats in the order seen in the main chat list */
    export interface td_searchChats {
        '@type': 'searchChats';
        /** Query to search for. If the query is empty, returns up to 50 recently found chats */
        query?: td_string;
        /** The maximum number of chats to be returned */
        limit?: td_int32;
    }
    
    
    /** Searches for the specified query in the title and username of already known chats via request to the server. Returns chats in the order seen in the main chat list */
    export interface td_searchChatsOnServer {
        '@type': 'searchChatsOnServer';
        /** Query to search for */
        query?: td_string;
        /** The maximum number of chats to be returned */
        limit?: td_int32;
    }
    
    
    /** Returns a list of users and location-based supergroups nearby. The list of users nearby will be updated for 60 seconds after the request by the updates updateUsersNearby. The request must be sent again every 25 seconds with adjusted location to not miss new chats */
    export interface td_searchChatsNearby {
        '@type': 'searchChatsNearby';
        /** Current user location */
        location?: td_location;
    }
    
    
    /** Returns a list of frequently used chats. Supported only if the chat info database is enabled */
    export interface td_getTopChats {
        '@type': 'getTopChats';
        /** Category of chats to be returned */
        category?: td_TopChatCategory;
        /** The maximum number of chats to be returned; up to 30 */
        limit?: td_int32;
    }
    
    
    /** Removes a chat from the list of frequently used chats. Supported only if the chat info database is enabled */
    export interface td_removeTopChat {
        '@type': 'removeTopChat';
        /** Category of frequently used chats */
        category?: td_TopChatCategory;
        /** Chat identifier */
        chat_id?: td_int53;
    }
    
    
    /** Adds a chat to the list of recently found chats. The chat is added to the beginning of the list. If the chat is already in the list, it will be removed from the list first */
    export interface td_addRecentlyFoundChat {
        '@type': 'addRecentlyFoundChat';
        /** Identifier of the chat to add */
        chat_id?: td_int53;
    }
    
    
    /** Removes a chat from the list of recently found chats */
    export interface td_removeRecentlyFoundChat {
        '@type': 'removeRecentlyFoundChat';
        /** Identifier of the chat to be removed */
        chat_id?: td_int53;
    }
    
    
    /** Clears the list of recently found chats */
    export interface td_clearRecentlyFoundChats {
        '@type': 'clearRecentlyFoundChats';
    }
    
    
    /** Returns recently opened chats, this is an offline request. Returns chats in the order of last opening */
    export interface td_getRecentlyOpenedChats {
        '@type': 'getRecentlyOpenedChats';
        /** The maximum number of chats to be returned */
        limit?: td_int32;
    }
    
    
    /** Checks whether a username can be set for a chat */
    export interface td_checkChatUsername {
        '@type': 'checkChatUsername';
        /** Chat identifier; must be identifier of a supergroup chat, or a channel chat, or a private chat with self, or zero if the chat is being created */
        chat_id?: td_int53;
        /** Username to be checked */
        username?: td_string;
    }
    
    
    /** Returns a list of public chats of the specified type, owned by the user */
    export interface td_getCreatedPublicChats {
        '@type': 'getCreatedPublicChats';
        /** Type of the public chats to return */
        type?: td_PublicChatType;
    }
    
    
    /** Checks whether the maximum number of owned public chats has been reached. Returns corresponding error if the limit was reached */
    export interface td_checkCreatedPublicChatsLimit {
        '@type': 'checkCreatedPublicChatsLimit';
        /** Type of the public chats, for which to check the limit */
        type?: td_PublicChatType;
    }
    
    
    /** Returns a list of basic group and supergroup chats, which can be used as a discussion group for a channel. Returned basic group chats must be first upgraded to supergroups before they can be set as a discussion group. To set a returned supergroup as a discussion group, access to its old messages must be enabled using toggleSupergroupIsAllHistoryAvailable first */
    export interface td_getSuitableDiscussionChats {
        '@type': 'getSuitableDiscussionChats';
    }
    
    
    /** Returns a list of recently inactive supergroups and channels. Can be used when user reaches limit on the number of joined supergroups and channels and receives CHANNELS_TOO_MUCH error */
    export interface td_getInactiveSupergroupChats {
        '@type': 'getInactiveSupergroupChats';
    }
    
    
    /** Returns a list of common group chats with a given user. Chats are sorted by their type and creation date */
    export interface td_getGroupsInCommon {
        '@type': 'getGroupsInCommon';
        /** User identifier */
        user_id?: td_int53;
        /** Chat identifier starting from which to return chats; use 0 for the first request */
        offset_chat_id?: td_int53;
        /** The maximum number of chats to be returned; up to 100 */
        limit?: td_int32;
    }
    
    
    /** Returns messages in a chat. The messages are returned in a reverse chronological order (i.e., in order of decreasing message_id). -For optimal performance, the number of returned messages is chosen by TDLib. This is an offline request if only_local is true */
    export interface td_getChatHistory {
        '@type': 'getChatHistory';
        /** Chat identifier */
        chat_id?: td_int53;
        /** Identifier of the message starting from which history must be fetched; use 0 to get results from the last message */
        from_message_id?: td_int53;
        /** Specify 0 to get results from exactly the from_message_id or a negative offset up to 99 to get additionally some newer messages */
        offset?: td_int32;
        /** The maximum number of messages to be returned; must be positive and can't be greater than 100. If the offset is negative, the limit must be greater than or equal to -offset. For optimal performance, the number of returned messages is chosen by TDLib and can be smaller than the specified limit */
        limit?: td_int32;
        /** If true, returns only messages that are available locally without sending network requests */
        only_local?: td_Bool;
    }
    
    
    /** Returns messages in a message thread of a message. Can be used only if message.can_get_message_thread == true. Message thread of a channel message is in the channel's linked supergroup. -The messages are returned in a reverse chronological order (i.e., in order of decreasing message_id). For optimal performance, the number of returned messages is chosen by TDLib */
    export interface td_getMessageThreadHistory {
        '@type': 'getMessageThreadHistory';
        /** Chat identifier */
        chat_id?: td_int53;
        /** Message identifier, which thread history needs to be returned */
        message_id?: td_int53;
        /** Identifier of the message starting from which history must be fetched; use 0 to get results from the last message */
        from_message_id?: td_int53;
        /** Specify 0 to get results from exactly the from_message_id or a negative offset up to 99 to get additionally some newer messages */
        offset?: td_int32;
        /** The maximum number of messages to be returned; must be positive and can't be greater than 100. If the offset is negative, the limit must be greater than or equal to -offset. For optimal performance, the number of returned messages is chosen by TDLib and can be smaller than the specified limit */
        limit?: td_int32;
    }
    
    
    /** Deletes all messages in the chat. Use chat.can_be_deleted_only_for_self and chat.can_be_deleted_for_all_users fields to find whether and how the method can be applied to the chat */
    export interface td_deleteChatHistory {
        '@type': 'deleteChatHistory';
        /** Chat identifier */
        chat_id?: td_int53;
        /** Pass true if the chat needs to be removed from the chat list */
        remove_from_chat_list?: td_Bool;
        /** Pass true to delete chat history for all users */
        revoke?: td_Bool;
    }
    
    
    /** Deletes a chat along with all messages in the corresponding chat for all chat members; requires owner privileges. For group chats this will release the username and remove all members. Chats with more than 1000 members can't be deleted using this method */
    export interface td_deleteChat {
        '@type': 'deleteChat';
        /** Chat identifier */
        chat_id?: td_int53;
    }
    
    
    /** Searches for messages with given words in the chat. Returns the results in reverse chronological order, i.e. in order of decreasing message_id. Cannot be used in secret chats with a non-empty query -(searchSecretMessages must be used instead), or without an enabled message database. For optimal performance, the number of returned messages is chosen by TDLib and can be smaller than the specified limit */
    export interface td_searchChatMessages {
        '@type': 'searchChatMessages';
        /** Identifier of the chat in which to search messages */
        chat_id?: td_int53;
        /** Query to search for */
        query?: td_string;
        /** Identifier of the sender of messages to search for; pass null to search for messages from any sender. Not supported in secret chats */
        sender_id?: td_MessageSender;
        /** Identifier of the message starting from which history must be fetched; use 0 to get results from the last message */
        from_message_id?: td_int53;
        /** Specify 0 to get results from exactly the from_message_id or a negative offset to get the specified message and some newer messages */
        offset?: td_int32;
        /** The maximum number of messages to be returned; must be positive and can't be greater than 100. If the offset is negative, the limit must be greater than -offset. For optimal performance, the number of returned messages is chosen by TDLib and can be smaller than the specified limit */
        limit?: td_int32;
        /** Additional filter for messages to search; pass null to search for all messages */
        filter?: td_SearchMessagesFilter;
        /** If not 0, only messages in the specified thread will be returned; supergroups only */
        message_thread_id?: td_int53;
    }
    
    
    /** Searches for messages in all chats except secret chats. Returns the results in reverse chronological order (i.e., in order of decreasing (date, chat_id, message_id)). -For optimal performance, the number of returned messages is chosen by TDLib and can be smaller than the specified limit */
    export interface td_searchMessages {
        '@type': 'searchMessages';
        /** Chat list in which to search messages; pass null to search in all chats regardless of their chat list. Only Main and Archive chat lists are supported */
        chat_list?: td_ChatList;
        /** Query to search for */
        query?: td_string;
        /** The date of the message starting from which the results need to be fetched. Use 0 or any date in the future to get results from the last message */
        offset_date?: td_int32;
        /** The chat identifier of the last found message, or 0 for the first request */
        offset_chat_id?: td_int53;
        /** The message identifier of the last found message, or 0 for the first request */
        offset_message_id?: td_int53;
        /** The maximum number of messages to be returned; up to 100. For optimal performance, the number of returned messages is chosen by TDLib and can be smaller than the specified limit */
        limit?: td_int32;
        /** Additional filter for messages to search; pass null to search for all messages. Filters searchMessagesFilterMention, searchMessagesFilterUnreadMention, searchMessagesFilterFailedToSend and searchMessagesFilterPinned are unsupported in this function */
        filter?: td_SearchMessagesFilter;
        /** If not 0, the minimum date of the messages to return */
        min_date?: td_int32;
        /** If not 0, the maximum date of the messages to return */
        max_date?: td_int32;
    }
    
    
    /** Searches for messages in secret chats. Returns the results in reverse chronological order. For optimal performance, the number of returned messages is chosen by TDLib */
    export interface td_searchSecretMessages {
        '@type': 'searchSecretMessages';
        /** Identifier of the chat in which to search. Specify 0 to search in all secret chats */
        chat_id?: td_int53;
        /** Query to search for. If empty, searchChatMessages must be used instead */
        query?: td_string;
        /** Offset of the first entry to return as received from the previous request; use empty string to get first chunk of results */
        offset?: td_string;
        /** The maximum number of messages to be returned; up to 100. For optimal performance, the number of returned messages is chosen by TDLib and can be smaller than the specified limit */
        limit?: td_int32;
        /** Additional filter for messages to search; pass null to search for all messages */
        filter?: td_SearchMessagesFilter;
    }
    
    
    /** Searches for call messages. Returns the results in reverse chronological order (i. e., in order of decreasing message_id). For optimal performance, the number of returned messages is chosen by TDLib */
    export interface td_searchCallMessages {
        '@type': 'searchCallMessages';
        /** Identifier of the message from which to search; use 0 to get results from the last message */
        from_message_id?: td_int53;
        /** The maximum number of messages to be returned; up to 100. For optimal performance, the number of returned messages is chosen by TDLib and can be smaller than the specified limit */
        limit?: td_int32;
        /** If true, returns only messages with missed/declined calls */
        only_missed?: td_Bool;
    }
    
    
    /** Deletes all call messages */
    export interface td_deleteAllCallMessages {
        '@type': 'deleteAllCallMessages';
        /** Pass true to delete the messages for all users */
        revoke?: td_Bool;
    }
    
    
    /** Returns information about the recent locations of chat members that were sent to the chat. Returns up to 1 location message per user */
    export interface td_searchChatRecentLocationMessages {
        '@type': 'searchChatRecentLocationMessages';
        /** Chat identifier */
        chat_id?: td_int53;
        /** The maximum number of messages to be returned */
        limit?: td_int32;
    }
    
    
    /** Returns all active live locations that need to be updated by the application. The list is persistent across application restarts only if the message database is used */
    export interface td_getActiveLiveLocationMessages {
        '@type': 'getActiveLiveLocationMessages';
    }
    
    
    /** Returns the last message sent in a chat no later than the specified date */
    export interface td_getChatMessageByDate {
        '@type': 'getChatMessageByDate';
        /** Chat identifier */
        chat_id?: td_int53;
        /** Point in time (Unix timestamp) relative to which to search for messages */
        date?: td_int32;
    }
    
    
    /** Returns sparse positions of messages of the specified type in the chat to be used for shared media scroll implementation. Returns the results in reverse chronological order (i.e., in order of decreasing message_id). -Cannot be used in secret chats or with searchMessagesFilterFailedToSend filter without an enabled message database */
    export interface td_getChatSparseMessagePositions {
        '@type': 'getChatSparseMessagePositions';
        /** Identifier of the chat in which to return information about message positions */
        chat_id?: td_int53;
        /** Filter for message content. Filters searchMessagesFilterEmpty, searchMessagesFilterMention and searchMessagesFilterUnreadMention are unsupported in this function */
        filter?: td_SearchMessagesFilter;
        /** The message identifier from which to return information about message positions */
        from_message_id?: td_int53;
        /** The expected number of message positions to be returned; 50-2000. A smaller number of positions can be returned, if there are not enough appropriate messages */
        limit?: td_int32;
    }
    
    
    /** Returns information about the next messages of the specified type in the chat split by days. Returns the results in reverse chronological order. Can return partial result for the last returned day. Behavior of this method depends on the value of the option "utc_time_offset" */
    export interface td_getChatMessageCalendar {
        '@type': 'getChatMessageCalendar';
        /** Identifier of the chat in which to return information about messages */
        chat_id?: td_int53;
        /** Filter for message content. Filters searchMessagesFilterEmpty, searchMessagesFilterMention and searchMessagesFilterUnreadMention are unsupported in this function */
        filter?: td_SearchMessagesFilter;
        /** The message identifier from which to return information about messages; use 0 to get results from the last message */
        from_message_id?: td_int53;
    }
    
    
    /** Returns approximate number of messages of the specified type in the chat */
    export interface td_getChatMessageCount {
        '@type': 'getChatMessageCount';
        /** Identifier of the chat in which to count messages */
        chat_id?: td_int53;
        /** Filter for message content; searchMessagesFilterEmpty is unsupported in this function */
        filter?: td_SearchMessagesFilter;
        /** If true, returns count that is available locally without sending network requests, returning -1 if the number of messages is unknown */
        return_local?: td_Bool;
    }
    
    
    /** Returns all scheduled messages in a chat. The messages are returned in a reverse chronological order (i.e., in order of decreasing message_id) */
    export interface td_getChatScheduledMessages {
        '@type': 'getChatScheduledMessages';
        /** Chat identifier */
        chat_id?: td_int53;
    }
    
    
    /** Returns forwarded copies of a channel message to different public channels. For optimal performance, the number of returned messages is chosen by TDLib */
    export interface td_getMessagePublicForwards {
        '@type': 'getMessagePublicForwards';
        /** Chat identifier of the message */
        chat_id?: td_int53;
        /** Message identifier */
        message_id?: td_int53;
        /** Offset of the first entry to return as received from the previous request; use empty string to get first chunk of results */
        offset?: td_string;
        /** The maximum number of messages to be returned; must be positive and can't be greater than 100. For optimal performance, the number of returned messages is chosen by TDLib and can be smaller than the specified limit */
        limit?: td_int32;
    }
    
    
    /** Returns sponsored message to be shown in a chat; for channel chats only. Returns a 404 error if there is no sponsored message in the chat */
    export interface td_getChatSponsoredMessage {
        '@type': 'getChatSponsoredMessage';
        /** Identifier of the chat */
        chat_id?: td_int53;
    }
    
    
    /** Removes an active notification from notification list. Needs to be called only if the notification is removed by the current user */
    export interface td_removeNotification {
        '@type': 'removeNotification';
        /** Identifier of notification group to which the notification belongs */
        notification_group_id?: td_int32;
        /** Identifier of removed notification */
        notification_id?: td_int32;
    }
    
    
    /** Removes a group of active notifications. Needs to be called only if the notification group is removed by the current user */
    export interface td_removeNotificationGroup {
        '@type': 'removeNotificationGroup';
        /** Notification group identifier */
        notification_group_id?: td_int32;
        /** The maximum identifier of removed notifications */
        max_notification_id?: td_int32;
    }
    
    
    /** Returns an HTTPS link to a message in a chat. Available only for already sent messages in supergroups and channels, or if message.can_get_media_timestamp_links and a media timestamp link is generated. This is an offline request */
    export interface td_getMessageLink {
        '@type': 'getMessageLink';
        /** Identifier of the chat to which the message belongs */
        chat_id?: td_int53;
        /** Identifier of the message */
        message_id?: td_int53;
        /** If not 0, timestamp from which the video/audio/video note/voice note playing must start, in seconds. The media can be in the message content or in its web page preview */
        media_timestamp?: td_int32;
        /** Pass true to create a link for the whole media album */
        for_album?: td_Bool;
        /** Pass true to create a link to the message as a channel post comment, or from a message thread */
        for_comment?: td_Bool;
    }
    
    
    /** Returns an HTML code for embedding the message. Available only for messages in supergroups and channels with a username */
    export interface td_getMessageEmbeddingCode {
        '@type': 'getMessageEmbeddingCode';
        /** Identifier of the chat to which the message belongs */
        chat_id?: td_int53;
        /** Identifier of the message */
        message_id?: td_int53;
        /** Pass true to return an HTML code for embedding of the whole media album */
        for_album?: td_Bool;
    }
    
    
    /** Returns information about a public or private message link. Can be called for any internal link of the type internalLinkTypeMessage */
    export interface td_getMessageLinkInfo {
        '@type': 'getMessageLinkInfo';
        /** The message link */
        url?: td_string;
    }
    
    
    /** Returns list of message sender identifiers, which can be used to send messages in a chat */
    export interface td_getChatAvailableMessageSenders {
        '@type': 'getChatAvailableMessageSenders';
        /** Chat identifier */
        chat_id?: td_int53;
    }
    
    
    /** Selects a message sender to send messages in a chat */
    export interface td_setChatMessageSender {
        '@type': 'setChatMessageSender';
        /** Chat identifier */
        chat_id?: td_int53;
        /** New message sender for the chat */
        message_sender_id?: td_MessageSender;
    }
    
    
    /** Sends a message. Returns the sent message */
    export interface td_sendMessage {
        '@type': 'sendMessage';
        /** Target chat */
        chat_id?: td_int53;
        /** If not 0, a message thread identifier in which the message will be sent */
        message_thread_id?: td_int53;
        /** Identifier of the message to reply to or 0 */
        reply_to_message_id?: td_int53;
        /** Options to be used to send the message; pass null to use default options */
        options?: td_messageSendOptions;
        /** Markup for replying to the message; pass null if none; for bots only */
        reply_markup?: td_ReplyMarkup;
        /** The content of the message to be sent */
        input_message_content?: td_InputMessageContent;
    }
    
    
    /** Sends 2-10 messages grouped together into an album. Currently, only audio, document, photo and video messages can be grouped into an album. Documents and audio files can be only grouped in an album with messages of the same type. Returns sent messages */
    export interface td_sendMessageAlbum {
        '@type': 'sendMessageAlbum';
        /** Target chat */
        chat_id?: td_int53;
        /** If not 0, a message thread identifier in which the messages will be sent */
        message_thread_id?: td_int53;
        /** Identifier of a message to reply to or 0 */
        reply_to_message_id?: td_int53;
        /** Options to be used to send the messages; pass null to use default options */
        options?: td_messageSendOptions;
        /** Contents of messages to be sent. At most 10 messages can be added to an album */
        input_message_contents?: td_vector<td_InputMessageContent>;
    }
    
    
    /** Invites a bot to a chat (if it is not yet a member) and sends it the /start command. Bots can't be invited to a private chat other than the chat with the bot. Bots can't be invited to channels (although they can be added as admins) and secret chats. Returns the sent message */
    export interface td_sendBotStartMessage {
        '@type': 'sendBotStartMessage';
        /** Identifier of the bot */
        bot_user_id?: td_int53;
        /** Identifier of the target chat */
        chat_id?: td_int53;
        /** A hidden parameter sent to the bot for deep linking purposes (https://core.telegram.org/bots#deep-linking) */
        parameter?: td_string;
    }
    
    
    /** Sends the result of an inline query as a message. Returns the sent message. Always clears a chat draft message */
    export interface td_sendInlineQueryResultMessage {
        '@type': 'sendInlineQueryResultMessage';
        /** Target chat */
        chat_id?: td_int53;
        /** If not 0, a message thread identifier in which the message will be sent */
        message_thread_id?: td_int53;
        /** Identifier of a message to reply to or 0 */
        reply_to_message_id?: td_int53;
        /** Options to be used to send the message; pass null to use default options */
        options?: td_messageSendOptions;
        /** Identifier of the inline query */
        query_id?: td_int64;
        /** Identifier of the inline result */
        result_id?: td_string;
        /** If true, there will be no mention of a bot, via which the message is sent. Can be used only for bots GetOption("animation_search_bot_username"), GetOption("photo_search_bot_username") and GetOption("venue_search_bot_username") */
        hide_via_bot?: td_Bool;
    }
    
    
    /** Forwards previously sent messages. Returns the forwarded messages in the same order as the message identifiers passed in message_ids. If a message can't be forwarded, null will be returned instead of the message */
    export interface td_forwardMessages {
        '@type': 'forwardMessages';
        /** Identifier of the chat to which to forward messages */
        chat_id?: td_int53;
        /** Identifier of the chat from which to forward messages */
        from_chat_id?: td_int53;
        /** Identifiers of the messages to forward. Message identifiers must be in a strictly increasing order. At most 100 messages can be forwarded simultaneously */
        message_ids?: td_vector<td_int53>;
        /** Options to be used to send the messages; pass null to use default options */
        options?: td_messageSendOptions;
        /** If true, content of the messages will be copied without reference to the original sender. Always true if the messages are forwarded to a secret chat or are local */
        send_copy?: td_Bool;
        /** If true, media caption of message copies will be removed. Ignored if send_copy is false */
        remove_caption?: td_Bool;
        /** If true, messages will not be forwarded and instead fake messages will be returned */
        only_preview?: td_Bool;
    }
    
    
    /** Resends messages which failed to send. Can be called only for messages for which messageSendingStateFailed.can_retry is true and after specified in messageSendingStateFailed.retry_after time passed. -If a message is re-sent, the corresponding failed to send message is deleted. Returns the sent messages in the same order as the message identifiers passed in message_ids. If a message can't be re-sent, null will be returned instead of the message */
    export interface td_resendMessages {
        '@type': 'resendMessages';
        /** Identifier of the chat to send messages */
        chat_id?: td_int53;
        /** Identifiers of the messages to resend. Message identifiers must be in a strictly increasing order */
        message_ids?: td_vector<td_int53>;
    }
    
    
    /** Sends a notification about a screenshot taken in a chat. Supported only in private and secret chats */
    export interface td_sendChatScreenshotTakenNotification {
        '@type': 'sendChatScreenshotTakenNotification';
        /** Chat identifier */
        chat_id?: td_int53;
    }
    
    
    /** Adds a local message to a chat. The message is persistent across application restarts only if the message database is used. Returns the added message */
    export interface td_addLocalMessage {
        '@type': 'addLocalMessage';
        /** Target chat */
        chat_id?: td_int53;
        /** Identifier of the sender of the message */
        sender_id?: td_MessageSender;
        /** Identifier of the message to reply to or 0 */
        reply_to_message_id?: td_int53;
        /** Pass true to disable notification for the message */
        disable_notification?: td_Bool;
        /** The content of the message to be added */
        input_message_content?: td_InputMessageContent;
    }
    
    
    /** Deletes messages */
    export interface td_deleteMessages {
        '@type': 'deleteMessages';
        /** Chat identifier */
        chat_id?: td_int53;
        /** Identifiers of the messages to be deleted */
        message_ids?: td_vector<td_int53>;
        /** Pass true to delete messages for all chat members. Always true for supergroups, channels and secret chats */
        revoke?: td_Bool;
    }
    
    
    /** Deletes all messages sent by the specified message sender in a chat. Supported only for supergroups; requires can_delete_messages administrator privileges */
    export interface td_deleteChatMessagesBySender {
        '@type': 'deleteChatMessagesBySender';
        /** Chat identifier */
        chat_id?: td_int53;
        /** Identifier of the sender of messages to delete */
        sender_id?: td_MessageSender;
    }
    
    
    /** Deletes all messages between the specified dates in a chat. Supported only for private chats and basic groups. Messages sent in the last 30 seconds will not be deleted */
    export interface td_deleteChatMessagesByDate {
        '@type': 'deleteChatMessagesByDate';
        /** Chat identifier */
        chat_id?: td_int53;
        /** The minimum date of the messages to delete */
        min_date?: td_int32;
        /** The maximum date of the messages to delete */
        max_date?: td_int32;
        /** Pass true to delete chat messages for all users; private chats only */
        revoke?: td_Bool;
    }
    
    
    /** Edits the text of a message (or a text of a game message). Returns the edited message after the edit is completed on the server side */
    export interface td_editMessageText {
        '@type': 'editMessageText';
        /** The chat the message belongs to */
        chat_id?: td_int53;
        /** Identifier of the message */
        message_id?: td_int53;
        /** The new message reply markup; pass null if none; for bots only */
        reply_markup?: td_ReplyMarkup;
        /** New text content of the message. Must be of type inputMessageText */
        input_message_content?: td_InputMessageContent;
    }
    
    
    /** Edits the message content of a live location. Messages can be edited for a limited period of time specified in the live location. Returns the edited message after the edit is completed on the server side */
    export interface td_editMessageLiveLocation {
        '@type': 'editMessageLiveLocation';
        /** The chat the message belongs to */
        chat_id?: td_int53;
        /** Identifier of the message */
        message_id?: td_int53;
        /** The new message reply markup; pass null if none; for bots only */
        reply_markup?: td_ReplyMarkup;
        /** New location content of the message; pass null to stop sharing the live location */
        location?: td_location;
        /** The new direction in which the location moves, in degrees; 1-360. Pass 0 if unknown */
        heading?: td_int32;
        /** The new maximum distance for proximity alerts, in meters (0-100000). Pass 0 if the notification is disabled */
        proximity_alert_radius?: td_int32;
    }
    
    
    /** Edits the content of a message with an animation, an audio, a document, a photo or a video, including message caption. If only the caption needs to be edited, use editMessageCaption instead. -The media can't be edited if the message was set to self-destruct or to a self-destructing media. The type of message content in an album can't be changed with exception of replacing a photo with a video or vice versa. Returns the edited message after the edit is completed on the server side */
    export interface td_editMessageMedia {
        '@type': 'editMessageMedia';
        /** The chat the message belongs to */
        chat_id?: td_int53;
        /** Identifier of the message */
        message_id?: td_int53;
        /** The new message reply markup; pass null if none; for bots only */
        reply_markup?: td_ReplyMarkup;
        /** New content of the message. Must be one of the following types: inputMessageAnimation, inputMessageAudio, inputMessageDocument, inputMessagePhoto or inputMessageVideo */
        input_message_content?: td_InputMessageContent;
    }
    
    
    /** Edits the message content caption. Returns the edited message after the edit is completed on the server side */
    export interface td_editMessageCaption {
        '@type': 'editMessageCaption';
        /** The chat the message belongs to */
        chat_id?: td_int53;
        /** Identifier of the message */
        message_id?: td_int53;
        /** The new message reply markup; pass null if none; for bots only */
        reply_markup?: td_ReplyMarkup;
        /** New message content caption; 0-GetOption("message_caption_length_max") characters; pass null to remove caption */
        caption?: td_formattedText;
    }
    
    
    /** Edits the message reply markup; for bots only. Returns the edited message after the edit is completed on the server side */
    export interface td_editMessageReplyMarkup {
        '@type': 'editMessageReplyMarkup';
        /** The chat the message belongs to */
        chat_id?: td_int53;
        /** Identifier of the message */
        message_id?: td_int53;
        /** The new message reply markup; pass null if none */
        reply_markup?: td_ReplyMarkup;
    }
    
    
    /** Edits the text of an inline text or game message sent via a bot; for bots only */
    export interface td_editInlineMessageText {
        '@type': 'editInlineMessageText';
        /** Inline message identifier */
        inline_message_id?: td_string;
        /** The new message reply markup; pass null if none */
        reply_markup?: td_ReplyMarkup;
        /** New text content of the message. Must be of type inputMessageText */
        input_message_content?: td_InputMessageContent;
    }
    
    
    /** Edits the content of a live location in an inline message sent via a bot; for bots only */
    export interface td_editInlineMessageLiveLocation {
        '@type': 'editInlineMessageLiveLocation';
        /** Inline message identifier */
        inline_message_id?: td_string;
        /** The new message reply markup; pass null if none */
        reply_markup?: td_ReplyMarkup;
        /** New location content of the message; pass null to stop sharing the live location */
        location?: td_location;
        /** The new direction in which the location moves, in degrees; 1-360. Pass 0 if unknown */
        heading?: td_int32;
        /** The new maximum distance for proximity alerts, in meters (0-100000). Pass 0 if the notification is disabled */
        proximity_alert_radius?: td_int32;
    }
    
    
    /** Edits the content of a message with an animation, an audio, a document, a photo or a video in an inline message sent via a bot; for bots only */
    export interface td_editInlineMessageMedia {
        '@type': 'editInlineMessageMedia';
        /** Inline message identifier */
        inline_message_id?: td_string;
        /** The new message reply markup; pass null if none; for bots only */
        reply_markup?: td_ReplyMarkup;
        /** New content of the message. Must be one of the following types: inputMessageAnimation, inputMessageAudio, inputMessageDocument, inputMessagePhoto or inputMessageVideo */
        input_message_content?: td_InputMessageContent;
    }
    
    
    /** Edits the caption of an inline message sent via a bot; for bots only */
    export interface td_editInlineMessageCaption {
        '@type': 'editInlineMessageCaption';
        /** Inline message identifier */
        inline_message_id?: td_string;
        /** The new message reply markup; pass null if none */
        reply_markup?: td_ReplyMarkup;
        /** New message content caption; pass null to remove caption; 0-GetOption("message_caption_length_max") characters */
        caption?: td_formattedText;
    }
    
    
    /** Edits the reply markup of an inline message sent via a bot; for bots only */
    export interface td_editInlineMessageReplyMarkup {
        '@type': 'editInlineMessageReplyMarkup';
        /** Inline message identifier */
        inline_message_id?: td_string;
        /** The new message reply markup; pass null if none */
        reply_markup?: td_ReplyMarkup;
    }
    
    
    /** Edits the time when a scheduled message will be sent. Scheduling state of all messages in the same album or forwarded together with the message will be also changed */
    export interface td_editMessageSchedulingState {
        '@type': 'editMessageSchedulingState';
        /** The chat the message belongs to */
        chat_id?: td_int53;
        /** Identifier of the message */
        message_id?: td_int53;
        /** The new message scheduling state; pass null to send the message immediately */
        scheduling_state?: td_MessageSchedulingState;
    }
    
    
    /** Returns all entities (mentions, hashtags, cashtags, bot commands, bank card numbers, URLs, and email addresses) contained in the text. Can be called synchronously */
    export interface td_getTextEntities {
        '@type': 'getTextEntities';
        /** The text in which to look for entites */
        text?: td_string;
    }
    
    
    /** Parses Bold, Italic, Underline, Strikethrough, Spoiler, Code, Pre, PreCode, TextUrl and MentionName entities contained in the text. Can be called synchronously */
    export interface td_parseTextEntities {
        '@type': 'parseTextEntities';
        /** The text to parse */
        text?: td_string;
        /** Text parse mode */
        parse_mode?: td_TextParseMode;
    }
    
    
    /** Parses Markdown entities in a human-friendly format, ignoring markup errors. Can be called synchronously */
    export interface td_parseMarkdown {
        '@type': 'parseMarkdown';
        /** The text to parse. For example, "__italic__ ~~strikethrough~~ ||spoiler|| **bold** `code` ```pre``` __[italic__ text_url](telegram.org) __italic**bold italic__bold**" */
        text?: td_formattedText;
    }
    
    
    /** Replaces text entities with Markdown formatting in a human-friendly format. Entities that can't be represented in Markdown unambiguously are kept as is. Can be called synchronously */
    export interface td_getMarkdownText {
        '@type': 'getMarkdownText';
        /** The text */
        text?: td_formattedText;
    }
    
    
    /** Returns the MIME type of a file, guessed by its extension. Returns an empty string on failure. Can be called synchronously */
    export interface td_getFileMimeType {
        '@type': 'getFileMimeType';
        /** The name of the file or path to the file */
        file_name?: td_string;
    }
    
    
    /** Returns the extension of a file, guessed by its MIME type. Returns an empty string on failure. Can be called synchronously */
    export interface td_getFileExtension {
        '@type': 'getFileExtension';
        /** The MIME type of the file */
        mime_type?: td_string;
    }
    
    
    /** Removes potentially dangerous characters from the name of a file. The encoding of the file name is supposed to be UTF-8. Returns an empty string on failure. Can be called synchronously */
    export interface td_cleanFileName {
        '@type': 'cleanFileName';
        /** File name or path to the file */
        file_name?: td_string;
    }
    
    
    /** Returns a string stored in the local database from the specified localization target and language pack by its key. Returns a 404 error if the string is not found. Can be called synchronously */
    export interface td_getLanguagePackString {
        '@type': 'getLanguagePackString';
        /** Path to the language pack database in which strings are stored */
        language_pack_database_path?: td_string;
        /** Localization target to which the language pack belongs */
        localization_target?: td_string;
        /** Language pack identifier */
        language_pack_id?: td_string;
        /** Language pack key of the string to be returned */
        key?: td_string;
    }
    
    
    /** Converts a JSON-serialized string to corresponding JsonValue object. Can be called synchronously */
    export interface td_getJsonValue {
        '@type': 'getJsonValue';
        /** The JSON-serialized string */
        json?: td_string;
    }
    
    
    /** Converts a JsonValue object to corresponding JSON-serialized string. Can be called synchronously */
    export interface td_getJsonString {
        '@type': 'getJsonString';
        /** The JsonValue object */
        json_value?: td_JsonValue;
    }
    
    
    /** Changes the user answer to a poll. A poll in quiz mode can be answered only once */
    export interface td_setPollAnswer {
        '@type': 'setPollAnswer';
        /** Identifier of the chat to which the poll belongs */
        chat_id?: td_int53;
        /** Identifier of the message containing the poll */
        message_id?: td_int53;
        /** 0-based identifiers of answer options, chosen by the user. User can choose more than 1 answer option only is the poll allows multiple answers */
        option_ids?: td_vector<td_int32>;
    }
    
    
    /** Returns users voted for the specified option in a non-anonymous polls. For optimal performance, the number of returned users is chosen by TDLib */
    export interface td_getPollVoters {
        '@type': 'getPollVoters';
        /** Identifier of the chat to which the poll belongs */
        chat_id?: td_int53;
        /** Identifier of the message containing the poll */
        message_id?: td_int53;
        /** 0-based identifier of the answer option */
        option_id?: td_int32;
        /** Number of users to skip in the result; must be non-negative */
        offset?: td_int32;
        /** The maximum number of users to be returned; must be positive and can't be greater than 50. For optimal performance, the number of returned users is chosen by TDLib and can be smaller than the specified limit, even if the end of the voter list has not been reached */
        limit?: td_int32;
    }
    
    
    /** Stops a poll. A poll in a message can be stopped when the message has can_be_edited flag set */
    export interface td_stopPoll {
        '@type': 'stopPoll';
        /** Identifier of the chat to which the poll belongs */
        chat_id?: td_int53;
        /** Identifier of the message containing the poll */
        message_id?: td_int53;
        /** The new message reply markup; pass null if none; for bots only */
        reply_markup?: td_ReplyMarkup;
    }
    
    
    /** Hides a suggested action */
    export interface td_hideSuggestedAction {
        '@type': 'hideSuggestedAction';
        /** Suggested action to hide */
        action?: td_SuggestedAction;
    }
    
    
    /** Returns information about a button of type inlineKeyboardButtonTypeLoginUrl. The method needs to be called when the user presses the button */
    export interface td_getLoginUrlInfo {
        '@type': 'getLoginUrlInfo';
        /** Chat identifier of the message with the button */
        chat_id?: td_int53;
        /** Message identifier of the message with the button */
        message_id?: td_int53;
        /** Button identifier */
        button_id?: td_int53;
    }
    
    
    /** Returns an HTTP URL which can be used to automatically authorize the user on a website after clicking an inline button of type inlineKeyboardButtonTypeLoginUrl. -Use the method getLoginUrlInfo to find whether a prior user confirmation is needed. If an error is returned, then the button must be handled as an ordinary URL button */
    export interface td_getLoginUrl {
        '@type': 'getLoginUrl';
        /** Chat identifier of the message with the button */
        chat_id?: td_int53;
        /** Message identifier of the message with the button */
        message_id?: td_int53;
        /** Button identifier */
        button_id?: td_int53;
        /** True, if the user allowed the bot to send them messages */
        allow_write_access?: td_Bool;
    }
    
    
    /** Sends an inline query to a bot and returns its results. Returns an error with code 502 if the bot fails to answer the query before the query timeout expires */
    export interface td_getInlineQueryResults {
        '@type': 'getInlineQueryResults';
        /** The identifier of the target bot */
        bot_user_id?: td_int53;
        /** Identifier of the chat where the query was sent */
        chat_id?: td_int53;
        /** Location of the user; pass null if unknown or the bot doesn't need user's location */
        user_location?: td_location;
        /** Text of the query */
        query?: td_string;
        /** Offset of the first entry to return */
        offset?: td_string;
    }
    
    
    /** Sets the result of an inline query; for bots only */
    export interface td_answerInlineQuery {
        '@type': 'answerInlineQuery';
        /** Identifier of the inline query */
        inline_query_id?: td_int64;
        /** True, if the result of the query can be cached for the specified user */
        is_personal?: td_Bool;
        /** The results of the query */
        results?: td_vector<td_InputInlineQueryResult>;
        /** Allowed time to cache the results of the query, in seconds */
        cache_time?: td_int32;
        /** Offset for the next inline query; pass an empty string if there are no more results */
        next_offset?: td_string;
        /** If non-empty, this text must be shown on the button that opens a private chat with the bot and sends a start message to the bot with the parameter switch_pm_parameter */
        switch_pm_text?: td_string;
        /** The parameter for the bot start message */
        switch_pm_parameter?: td_string;
    }
    
    
    /** Sends a callback query to a bot and returns an answer. Returns an error with code 502 if the bot fails to answer the query before the query timeout expires */
    export interface td_getCallbackQueryAnswer {
        '@type': 'getCallbackQueryAnswer';
        /** Identifier of the chat with the message */
        chat_id?: td_int53;
        /** Identifier of the message from which the query originated */
        message_id?: td_int53;
        /** Query payload */
        payload?: td_CallbackQueryPayload;
    }
    
    
    /** Sets the result of a callback query; for bots only */
    export interface td_answerCallbackQuery {
        '@type': 'answerCallbackQuery';
        /** Identifier of the callback query */
        callback_query_id?: td_int64;
        /** Text of the answer */
        text?: td_string;
        /** If true, an alert must be shown to the user instead of a toast notification */
        show_alert?: td_Bool;
        /** URL to be opened */
        url?: td_string;
        /** Time during which the result of the query can be cached, in seconds */
        cache_time?: td_int32;
    }
    
    
    /** Sets the result of a shipping query; for bots only */
    export interface td_answerShippingQuery {
        '@type': 'answerShippingQuery';
        /** Identifier of the shipping query */
        shipping_query_id?: td_int64;
        /** Available shipping options */
        shipping_options?: td_vector<td_shippingOption>;
        /** An error message, empty on success */
        error_message?: td_string;
    }
    
    
    /** Sets the result of a pre-checkout query; for bots only */
    export interface td_answerPreCheckoutQuery {
        '@type': 'answerPreCheckoutQuery';
        /** Identifier of the pre-checkout query */
        pre_checkout_query_id?: td_int64;
        /** An error message, empty on success */
        error_message?: td_string;
    }
    
    
    /** Updates the game score of the specified user in the game; for bots only */
    export interface td_setGameScore {
        '@type': 'setGameScore';
        /** The chat to which the message with the game belongs */
        chat_id?: td_int53;
        /** Identifier of the message */
        message_id?: td_int53;
        /** True, if the message needs to be edited */
        edit_message?: td_Bool;
        /** User identifier */
        user_id?: td_int53;
        /** The new score */
        score?: td_int32;
        /** Pass true to update the score even if it decreases. If the score is 0, the user will be deleted from the high score table */
        force?: td_Bool;
    }
    
    
    /** Updates the game score of the specified user in a game; for bots only */
    export interface td_setInlineGameScore {
        '@type': 'setInlineGameScore';
        /** Inline message identifier */
        inline_message_id?: td_string;
        /** True, if the message needs to be edited */
        edit_message?: td_Bool;
        /** User identifier */
        user_id?: td_int53;
        /** The new score */
        score?: td_int32;
        /** Pass true to update the score even if it decreases. If the score is 0, the user will be deleted from the high score table */
        force?: td_Bool;
    }
    
    
    /** Returns the high scores for a game and some part of the high score table in the range of the specified user; for bots only */
    export interface td_getGameHighScores {
        '@type': 'getGameHighScores';
        /** The chat that contains the message with the game */
        chat_id?: td_int53;
        /** Identifier of the message */
        message_id?: td_int53;
        /** User identifier */
        user_id?: td_int53;
    }
    
    
    /** Returns game high scores and some part of the high score table in the range of the specified user; for bots only */
    export interface td_getInlineGameHighScores {
        '@type': 'getInlineGameHighScores';
        /** Inline message identifier */
        inline_message_id?: td_string;
        /** User identifier */
        user_id?: td_int53;
    }
    
    
    /** Deletes the default reply markup from a chat. Must be called after a one-time keyboard or a ForceReply reply markup has been used. UpdateChatReplyMarkup will be sent if the reply markup is changed */
    export interface td_deleteChatReplyMarkup {
        '@type': 'deleteChatReplyMarkup';
        /** Chat identifier */
        chat_id?: td_int53;
        /** The message identifier of the used keyboard */
        message_id?: td_int53;
    }
    
    
    /** Sends a notification about user activity in a chat */
    export interface td_sendChatAction {
        '@type': 'sendChatAction';
        /** Chat identifier */
        chat_id?: td_int53;
        /** If not 0, a message thread identifier in which the action was performed */
        message_thread_id?: td_int53;
        /** The action description; pass null to cancel the currently active action */
        action?: td_ChatAction;
    }
    
    
    /** Informs TDLib that the chat is opened by the user. Many useful activities depend on the chat being opened or closed (e.g., in supergroups and channels all updates are received only for opened chats) */
    export interface td_openChat {
        '@type': 'openChat';
        /** Chat identifier */
        chat_id?: td_int53;
    }
    
    
    /** Informs TDLib that the chat is closed by the user. Many useful activities depend on the chat being opened or closed */
    export interface td_closeChat {
        '@type': 'closeChat';
        /** Chat identifier */
        chat_id?: td_int53;
    }
    
    
    /** Informs TDLib that messages are being viewed by the user. Sponsored messages must be marked as viewed only when the entire text of the message is shown on the screen (excluding the button). Many useful activities depend on whether the messages are currently being viewed or not (e.g., marking messages as read, incrementing a view counter, updating a view counter, removing deleted messages in supergroups and channels) */
    export interface td_viewMessages {
        '@type': 'viewMessages';
        /** Chat identifier */
        chat_id?: td_int53;
        /** If not 0, a message thread identifier in which the messages are being viewed */
        message_thread_id?: td_int53;
        /** The identifiers of the messages being viewed */
        message_ids?: td_vector<td_int53>;
        /** True, if messages in closed chats must be marked as read by the request */
        force_read?: td_Bool;
    }
    
    
    /** Informs TDLib that the message content has been opened (e.g., the user has opened a photo, video, document, location or venue, or has listened to an audio file or voice note message). An updateMessageContentOpened update will be generated if something has changed */
    export interface td_openMessageContent {
        '@type': 'openMessageContent';
        /** Chat identifier of the message */
        chat_id?: td_int53;
        /** Identifier of the message with the opened content */
        message_id?: td_int53;
    }
    
    
    /** Informs TDLib that a message with an animated emoji was clicked by the user. Returns a big animated sticker to be played or a 404 error if usual animation needs to be played */
    export interface td_clickAnimatedEmojiMessage {
        '@type': 'clickAnimatedEmojiMessage';
        /** Chat identifier of the message */
        chat_id?: td_int53;
        /** Identifier of the clicked message */
        message_id?: td_int53;
    }
    
    
    /** Returns information about the type of an internal link. Returns a 404 error if the link is not internal. Can be called before authorization */
    export interface td_getInternalLinkType {
        '@type': 'getInternalLinkType';
        /** The link */
        link?: td_string;
    }
    
    
    /** Returns information about an action to be done when the current user clicks an external link. Don't use this method for links from secret chats if web page preview is disabled in secret chats */
    export interface td_getExternalLinkInfo {
        '@type': 'getExternalLinkInfo';
        /** The link */
        link?: td_string;
    }
    
    
    /** Returns an HTTP URL which can be used to automatically authorize the current user on a website after clicking an HTTP link. Use the method getExternalLinkInfo to find whether a prior user confirmation is needed */
    export interface td_getExternalLink {
        '@type': 'getExternalLink';
        /** The HTTP link */
        link?: td_string;
        /** True, if the current user allowed the bot, returned in getExternalLinkInfo, to send them messages */
        allow_write_access?: td_Bool;
    }
    
    
    /** Marks all mentions in a chat as read */
    export interface td_readAllChatMentions {
        '@type': 'readAllChatMentions';
        /** Chat identifier */
        chat_id?: td_int53;
    }
    
    
    /** Returns an existing chat corresponding to a given user */
    export interface td_createPrivateChat {
        '@type': 'createPrivateChat';
        /** User identifier */
        user_id?: td_int53;
        /** If true, the chat will be created without network request. In this case all information about the chat except its type, title and photo can be incorrect */
        force?: td_Bool;
    }
    
    
    /** Returns an existing chat corresponding to a known basic group */
    export interface td_createBasicGroupChat {
        '@type': 'createBasicGroupChat';
        /** Basic group identifier */
        basic_group_id?: td_int53;
        /** If true, the chat will be created without network request. In this case all information about the chat except its type, title and photo can be incorrect */
        force?: td_Bool;
    }
    
    
    /** Returns an existing chat corresponding to a known supergroup or channel */
    export interface td_createSupergroupChat {
        '@type': 'createSupergroupChat';
        /** Supergroup or channel identifier */
        supergroup_id?: td_int53;
        /** If true, the chat will be created without network request. In this case all information about the chat except its type, title and photo can be incorrect */
        force?: td_Bool;
    }
    
    
    /** Returns an existing chat corresponding to a known secret chat */
    export interface td_createSecretChat {
        '@type': 'createSecretChat';
        /** Secret chat identifier */
        secret_chat_id?: td_int32;
    }
    
    
    /** Creates a new basic group and sends a corresponding messageBasicGroupChatCreate. Returns the newly created chat */
    export interface td_createNewBasicGroupChat {
        '@type': 'createNewBasicGroupChat';
        /** Identifiers of users to be added to the basic group */
        user_ids?: td_vector<td_int53>;
        /** Title of the new basic group; 1-128 characters */
        title?: td_string;
    }
    
    
    /** Creates a new supergroup or channel and sends a corresponding messageSupergroupChatCreate. Returns the newly created chat */
    export interface td_createNewSupergroupChat {
        '@type': 'createNewSupergroupChat';
        /** Title of the new chat; 1-128 characters */
        title?: td_string;
        /** True, if a channel chat needs to be created */
        is_channel?: td_Bool;
        /** Creates a new supergroup or channel and sends a corresponding messageSupergroupChatCreate. Returns the newly created chat */
        description?: td_string;
        /** Chat location if a location-based supergroup is being created; pass null to create an ordinary supergroup chat */
        location?: td_chatLocation;
        /** True, if the supergroup is created for importing messages using importMessage */
        for_import?: td_Bool;
    }
    
    
    /** Creates a new secret chat. Returns the newly created chat */
    export interface td_createNewSecretChat {
        '@type': 'createNewSecretChat';
        /** Identifier of the target user */
        user_id?: td_int53;
    }
    
    
    /** Creates a new supergroup from an existing basic group and sends a corresponding messageChatUpgradeTo and messageChatUpgradeFrom; requires creator privileges. Deactivates the original basic group */
    export interface td_upgradeBasicGroupChatToSupergroupChat {
        '@type': 'upgradeBasicGroupChatToSupergroupChat';
        /** Identifier of the chat to upgrade */
        chat_id?: td_int53;
    }
    
    
    /** Returns chat lists to which the chat can be added. This is an offline request */
    export interface td_getChatListsToAddChat {
        '@type': 'getChatListsToAddChat';
        /** Chat identifier */
        chat_id?: td_int53;
    }
    
    
    /** Adds a chat to a chat list. A chat can't be simultaneously in Main and Archive chat lists, so it is automatically removed from another one if needed */
    export interface td_addChatToList {
        '@type': 'addChatToList';
        /** Chat identifier */
        chat_id?: td_int53;
        /** The chat list. Use getChatListsToAddChat to get suitable chat lists */
        chat_list?: td_ChatList;
    }
    
    
    /** Returns information about a chat filter by its identifier */
    export interface td_getChatFilter {
        '@type': 'getChatFilter';
        /** Chat filter identifier */
        chat_filter_id?: td_int32;
    }
    
    
    /** Creates new chat filter. Returns information about the created chat filter */
    export interface td_createChatFilter {
        '@type': 'createChatFilter';
        /** Chat filter */
        filter?: td_chatFilter;
    }
    
    
    /** Edits existing chat filter. Returns information about the edited chat filter */
    export interface td_editChatFilter {
        '@type': 'editChatFilter';
        /** Chat filter identifier */
        chat_filter_id?: td_int32;
        /** The edited chat filter */
        filter?: td_chatFilter;
    }
    
    
    /** Deletes existing chat filter */
    export interface td_deleteChatFilter {
        '@type': 'deleteChatFilter';
        /** Chat filter identifier */
        chat_filter_id?: td_int32;
    }
    
    
    /** Changes the order of chat filters */
    export interface td_reorderChatFilters {
        '@type': 'reorderChatFilters';
        /** Identifiers of chat filters in the new correct order */
        chat_filter_ids?: td_vector<td_int32>;
    }
    
    
    /** Returns recommended chat filters for the current user */
    export interface td_getRecommendedChatFilters {
        '@type': 'getRecommendedChatFilters';
    }
    
    
    /** Returns default icon name for a filter. Can be called synchronously */
    export interface td_getChatFilterDefaultIconName {
        '@type': 'getChatFilterDefaultIconName';
        /** Chat filter */
        filter?: td_chatFilter;
    }
    
    
    /** Changes the chat title. Supported only for basic groups, supergroups and channels. Requires can_change_info administrator right */
    export interface td_setChatTitle {
        '@type': 'setChatTitle';
        /** Chat identifier */
        chat_id?: td_int53;
        /** New title of the chat; 1-128 characters */
        title?: td_string;
    }
    
    
    /** Changes the photo of a chat. Supported only for basic groups, supergroups and channels. Requires can_change_info administrator right */
    export interface td_setChatPhoto {
        '@type': 'setChatPhoto';
        /** Chat identifier */
        chat_id?: td_int53;
        /** New chat photo; pass null to delete the chat photo */
        photo?: td_InputChatPhoto;
    }
    
    
    /** Changes the message TTL in a chat. Requires can_delete_messages administrator right in basic groups, supergroups and channels -Message TTL can't be changed in a chat with the current user (Saved Messages) and the chat 777000 (Telegram) */
    export interface td_setChatMessageTtl {
        '@type': 'setChatMessageTtl';
        /** Chat identifier */
        chat_id?: td_int53;
        /** New TTL value, in seconds; must be one of 0, 86400, 7 * 86400, or 31 * 86400 unless the chat is secret */
        ttl?: td_int32;
    }
    
    
    /** Changes the chat members permissions. Supported only for basic groups and supergroups. Requires can_restrict_members administrator right */
    export interface td_setChatPermissions {
        '@type': 'setChatPermissions';
        /** Chat identifier */
        chat_id?: td_int53;
        /** New non-administrator members permissions in the chat */
        permissions?: td_chatPermissions;
    }
    
    
    /** Changes the chat theme. Supported only in private and secret chats */
    export interface td_setChatTheme {
        '@type': 'setChatTheme';
        /** Chat identifier */
        chat_id?: td_int53;
        /** Name of the new chat theme; pass an empty string to return the default theme */
        theme_name?: td_string;
    }
    
    
    /** Changes the draft message in a chat */
    export interface td_setChatDraftMessage {
        '@type': 'setChatDraftMessage';
        /** Chat identifier */
        chat_id?: td_int53;
        /** If not 0, a message thread identifier in which the draft was changed */
        message_thread_id?: td_int53;
        /** New draft message; pass null to remove the draft */
        draft_message?: td_draftMessage;
    }
    
    
    /** Changes the notification settings of a chat. Notification settings of a chat with the current user (Saved Messages) can't be changed */
    export interface td_setChatNotificationSettings {
        '@type': 'setChatNotificationSettings';
        /** Chat identifier */
        chat_id?: td_int53;
        /** New notification settings for the chat. If the chat is muted for more than 1 week, it is considered to be muted forever */
        notification_settings?: td_chatNotificationSettings;
    }
    
    
    /** Changes the ability of users to save, forward, or copy chat content. Supported only for basic groups, supergroups and channels. Requires owner privileges */
    export interface td_toggleChatHasProtectedContent {
        '@type': 'toggleChatHasProtectedContent';
        /** Chat identifier */
        chat_id?: td_int53;
        /** True, if chat content can't be saved locally, forwarded, or copied */
        has_protected_content?: td_Bool;
    }
    
    
    /** Changes the marked as unread state of a chat */
    export interface td_toggleChatIsMarkedAsUnread {
        '@type': 'toggleChatIsMarkedAsUnread';
        /** Chat identifier */
        chat_id?: td_int53;
        /** New value of is_marked_as_unread */
        is_marked_as_unread?: td_Bool;
    }
    
    
    /** Changes the value of the default disable_notification parameter, used when a message is sent to a chat */
    export interface td_toggleChatDefaultDisableNotification {
        '@type': 'toggleChatDefaultDisableNotification';
        /** Chat identifier */
        chat_id?: td_int53;
        /** New value of default_disable_notification */
        default_disable_notification?: td_Bool;
    }
    
    
    /** Changes application-specific data associated with a chat */
    export interface td_setChatClientData {
        '@type': 'setChatClientData';
        /** Chat identifier */
        chat_id?: td_int53;
        /** New value of client_data */
        client_data?: td_string;
    }
    
    
    /** Changes information about a chat. Available for basic groups, supergroups, and channels. Requires can_change_info administrator right */
    export interface td_setChatDescription {
        '@type': 'setChatDescription';
        /** Identifier of the chat */
        chat_id?: td_int53;
        /** Changes information about a chat. Available for basic groups, supergroups, and channels. Requires can_change_info administrator right */
        description?: td_string;
    }
    
    
    /** Changes the discussion group of a channel chat; requires can_change_info administrator right in the channel if it is specified */
    export interface td_setChatDiscussionGroup {
        '@type': 'setChatDiscussionGroup';
        /** Identifier of the channel chat. Pass 0 to remove a link from the supergroup passed in the second argument to a linked channel chat (requires can_pin_messages rights in the supergroup) */
        chat_id?: td_int53;
        /** Identifier of a new channel's discussion group. Use 0 to remove the discussion group. -Use the method getSuitableDiscussionChats to find all suitable groups. Basic group chats must be first upgraded to supergroup chats. If new chat members don't have access to old messages in the supergroup, then toggleSupergroupIsAllHistoryAvailable must be used first to change that */
        discussion_chat_id?: td_int53;
    }
    
    
    /** Changes the location of a chat. Available only for some location-based supergroups, use supergroupFullInfo.can_set_location to check whether the method is allowed to use */
    export interface td_setChatLocation {
        '@type': 'setChatLocation';
        /** Chat identifier */
        chat_id?: td_int53;
        /** New location for the chat; must be valid and not null */
        location?: td_chatLocation;
    }
    
    
    /** Changes the slow mode delay of a chat. Available only for supergroups; requires can_restrict_members rights */
    export interface td_setChatSlowModeDelay {
        '@type': 'setChatSlowModeDelay';
        /** Chat identifier */
        chat_id?: td_int53;
        /** New slow mode delay for the chat, in seconds; must be one of 0, 10, 30, 60, 300, 900, 3600 */
        slow_mode_delay?: td_int32;
    }
    
    
    /** Pins a message in a chat; requires can_pin_messages rights or can_edit_messages rights in the channel */
    export interface td_pinChatMessage {
        '@type': 'pinChatMessage';
        /** Identifier of the chat */
        chat_id?: td_int53;
        /** Identifier of the new pinned message */
        message_id?: td_int53;
        /** True, if there must be no notification about the pinned message. Notifications are always disabled in channels and private chats */
        disable_notification?: td_Bool;
        /** True, if the message needs to be pinned for one side only; private chats only */
        only_for_self?: td_Bool;
    }
    
    
    /** Removes a pinned message from a chat; requires can_pin_messages rights in the group or can_edit_messages rights in the channel */
    export interface td_unpinChatMessage {
        '@type': 'unpinChatMessage';
        /** Identifier of the chat */
        chat_id?: td_int53;
        /** Identifier of the removed pinned message */
        message_id?: td_int53;
    }
    
    
    /** Removes all pinned messages from a chat; requires can_pin_messages rights in the group or can_edit_messages rights in the channel */
    export interface td_unpinAllChatMessages {
        '@type': 'unpinAllChatMessages';
        /** Identifier of the chat */
        chat_id?: td_int53;
    }
    
    
    /** Adds the current user as a new member to a chat. Private and secret chats can't be joined using this method */
    export interface td_joinChat {
        '@type': 'joinChat';
        /** Chat identifier */
        chat_id?: td_int53;
    }
    
    
    /** Removes the current user from chat members. Private and secret chats can't be left using this method */
    export interface td_leaveChat {
        '@type': 'leaveChat';
        /** Chat identifier */
        chat_id?: td_int53;
    }
    
    
    /** Adds a new member to a chat. Members can't be added to private or secret chats */
    export interface td_addChatMember {
        '@type': 'addChatMember';
        /** Chat identifier */
        chat_id?: td_int53;
        /** Identifier of the user */
        user_id?: td_int53;
        /** The number of earlier messages from the chat to be forwarded to the new member; up to 100. Ignored for supergroups and channels, or if the added user is a bot */
        forward_limit?: td_int32;
    }
    
    
    /** Adds multiple new members to a chat. Currently, this method is only available for supergroups and channels. This method can't be used to join a chat. Members can't be added to a channel if it has more than 200 members */
    export interface td_addChatMembers {
        '@type': 'addChatMembers';
        /** Chat identifier */
        chat_id?: td_int53;
        /** Identifiers of the users to be added to the chat. The maximum number of added users is 20 for supergroups and 100 for channels */
        user_ids?: td_vector<td_int53>;
    }
    
    
    /** Changes the status of a chat member, needs appropriate privileges. This function is currently not suitable for transferring chat ownership; use transferChatOwnership instead. Use addChatMember or banChatMember if some additional parameters needs to be passed */
    export interface td_setChatMemberStatus {
        '@type': 'setChatMemberStatus';
        /** Chat identifier */
        chat_id?: td_int53;
        /** Member identifier. Chats can be only banned and unbanned in supergroups and channels */
        member_id?: td_MessageSender;
        /** The new status of the member in the chat */
        status?: td_ChatMemberStatus;
    }
    
    
    /** Bans a member in a chat. Members can't be banned in private or secret chats. In supergroups and channels, the user will not be able to return to the group on their own using invite links, etc., unless unbanned first */
    export interface td_banChatMember {
        '@type': 'banChatMember';
        /** Chat identifier */
        chat_id?: td_int53;
        /** Member identifier */
        member_id?: td_MessageSender;
        /** Point in time (Unix timestamp) when the user will be unbanned; 0 if never. If the user is banned for more than 366 days or for less than 30 seconds from the current time, the user is considered to be banned forever. Ignored in basic groups and if a chat is banned */
        banned_until_date?: td_int32;
        /** Pass true to delete all messages in the chat for the user that is being removed. Always true for supergroups and channels */
        revoke_messages?: td_Bool;
    }
    
    
    /** Checks whether the current session can be used to transfer a chat ownership to another user */
    export interface td_canTransferOwnership {
        '@type': 'canTransferOwnership';
    }
    
    
    /** Changes the owner of a chat. The current user must be a current owner of the chat. Use the method canTransferOwnership to check whether the ownership can be transferred from the current session. Available only for supergroups and channel chats */
    export interface td_transferChatOwnership {
        '@type': 'transferChatOwnership';
        /** Chat identifier */
        chat_id?: td_int53;
        /** Identifier of the user to which transfer the ownership. The ownership can't be transferred to a bot or to a deleted user */
        user_id?: td_int53;
        /** The password of the current user */
        password?: td_string;
    }
    
    
    /** Returns information about a single member of a chat */
    export interface td_getChatMember {
        '@type': 'getChatMember';
        /** Chat identifier */
        chat_id?: td_int53;
        /** Member identifier */
        member_id?: td_MessageSender;
    }
    
    
    /** Searches for a specified query in the first name, last name and username of the members of a specified chat. Requires administrator rights in channels */
    export interface td_searchChatMembers {
        '@type': 'searchChatMembers';
        /** Chat identifier */
        chat_id?: td_int53;
        /** Query to search for */
        query?: td_string;
        /** The maximum number of users to be returned; up to 200 */
        limit?: td_int32;
        /** The type of users to search for; pass null to search among all chat members */
        filter?: td_ChatMembersFilter;
    }
    
    
    /** Returns a list of administrators of the chat with their custom titles */
    export interface td_getChatAdministrators {
        '@type': 'getChatAdministrators';
        /** Chat identifier */
        chat_id?: td_int53;
    }
    
    
    /** Clears draft messages in all chats */
    export interface td_clearAllDraftMessages {
        '@type': 'clearAllDraftMessages';
        /** If true, local draft messages in secret chats will not be cleared */
        exclude_secret_chats?: td_Bool;
    }
    
    
    /** Returns list of chats with non-default notification settings */
    export interface td_getChatNotificationSettingsExceptions {
        '@type': 'getChatNotificationSettingsExceptions';
        /** If specified, only chats from the scope will be returned; pass null to return chats from all scopes */
        scope?: td_NotificationSettingsScope;
        /** If true, also chats with non-default sound will be returned */
        compare_sound?: td_Bool;
    }
    
    
    /** Returns the notification settings for chats of a given type */
    export interface td_getScopeNotificationSettings {
        '@type': 'getScopeNotificationSettings';
        /** Types of chats for which to return the notification settings information */
        scope?: td_NotificationSettingsScope;
    }
    
    
    /** Changes notification settings for chats of a given type */
    export interface td_setScopeNotificationSettings {
        '@type': 'setScopeNotificationSettings';
        /** Types of chats for which to change the notification settings */
        scope?: td_NotificationSettingsScope;
        /** The new notification settings for the given scope */
        notification_settings?: td_scopeNotificationSettings;
    }
    
    
    /** Resets all notification settings to their default values. By default, all chats are unmuted, the sound is set to "default" and message previews are shown */
    export interface td_resetAllNotificationSettings {
        '@type': 'resetAllNotificationSettings';
    }
    
    
    /** Changes the pinned state of a chat. There can be up to GetOption("pinned_chat_count_max")/GetOption("pinned_archived_chat_count_max") pinned non-secret chats and the same number of secret chats in the main/arhive chat list */
    export interface td_toggleChatIsPinned {
        '@type': 'toggleChatIsPinned';
        /** Chat list in which to change the pinned state of the chat */
        chat_list?: td_ChatList;
        /** Chat identifier */
        chat_id?: td_int53;
        /** True, if the chat is pinned */
        is_pinned?: td_Bool;
    }
    
    
    /** Changes the order of pinned chats */
    export interface td_setPinnedChats {
        '@type': 'setPinnedChats';
        /** Chat list in which to change the order of pinned chats */
        chat_list?: td_ChatList;
        /** The new list of pinned chats */
        chat_ids?: td_vector<td_int53>;
    }
    
    
    /** Downloads a file from the cloud. Download progress and completion of the download will be notified through updateFile updates */
    export interface td_downloadFile {
        '@type': 'downloadFile';
        /** Identifier of the file to download */
        file_id?: td_int32;
        /** Priority of the download (1-32). The higher the priority, the earlier the file will be downloaded. If the priorities of two files are equal, then the last one for which downloadFile was called will be downloaded first */
        priority?: td_int32;
        /** The starting position from which the file needs to be downloaded */
        offset?: td_int32;
        /** Number of bytes which need to be downloaded starting from the "offset" position before the download will automatically be canceled; use 0 to download without a limit */
        limit?: td_int32;
        /** If false, this request returns file state just after the download has been started. If true, this request returns file state only after -the download has succeeded, has failed, has been canceled or a new downloadFile request with different offset/limit parameters was sent */
        synchronous?: td_Bool;
    }
    
    
    /** Stops the downloading of a file. If a file has already been downloaded, does nothing */
    export interface td_cancelDownloadFile {
        '@type': 'cancelDownloadFile';
        /** Identifier of a file to stop downloading */
        file_id?: td_int32;
        /** Pass true to stop downloading only if it hasn't been started, i.e. request hasn't been sent to server */
        only_if_pending?: td_Bool;
    }
    
    
    /** Returns suggested name for saving a file in a given directory */
    export interface td_getSuggestedFileName {
        '@type': 'getSuggestedFileName';
        /** Identifier of the file */
        file_id?: td_int32;
        /** Directory in which the file is supposed to be saved */
        directory?: td_string;
    }
    
    
    /** Asynchronously uploads a file to the cloud without sending it in a message. updateFile will be used to notify about upload progress and successful completion of the upload. The file will not have a persistent remote identifier until it will be sent in a message */
    export interface td_uploadFile {
        '@type': 'uploadFile';
        /** File to upload */
        file?: td_InputFile;
        /** File type; pass null if unknown */
        file_type?: td_FileType;
        /** Priority of the upload (1-32). The higher the priority, the earlier the file will be uploaded. If the priorities of two files are equal, then the first one for which uploadFile was called will be uploaded first */
        priority?: td_int32;
    }
    
    
    /** Stops the uploading of a file. Supported only for files uploaded by using uploadFile. For other files the behavior is undefined */
    export interface td_cancelUploadFile {
        '@type': 'cancelUploadFile';
        /** Identifier of the file to stop uploading */
        file_id?: td_int32;
    }
    
    
    /** Writes a part of a generated file. This method is intended to be used only if the application has no direct access to TDLib's file system, because it is usually slower than a direct write to the destination file */
    export interface td_writeGeneratedFilePart {
        '@type': 'writeGeneratedFilePart';
        /** The identifier of the generation process */
        generation_id?: td_int64;
        /** The offset from which to write the data to the file */
        offset?: td_int32;
        /** The data to write */
        data?: td_bytes;
    }
    
    
    /** Informs TDLib on a file generation progress */
    export interface td_setFileGenerationProgress {
        '@type': 'setFileGenerationProgress';
        /** The identifier of the generation process */
        generation_id?: td_int64;
        /** Expected size of the generated file, in bytes; 0 if unknown */
        expected_size?: td_int32;
        /** The number of bytes already generated */
        local_prefix_size?: td_int32;
    }
    
    
    /** Finishes the file generation */
    export interface td_finishFileGeneration {
        '@type': 'finishFileGeneration';
        /** The identifier of the generation process */
        generation_id?: td_int64;
        /** If passed, the file generation has failed and must be terminated; pass null if the file generation succeeded */
        error?: td_error;
    }
    
    
    /** Reads a part of a file from the TDLib file cache and returns read bytes. This method is intended to be used only if the application has no direct access to TDLib's file system, because it is usually slower than a direct read from the file */
    export interface td_readFilePart {
        '@type': 'readFilePart';
        /** Identifier of the file. The file must be located in the TDLib file cache */
        file_id?: td_int32;
        /** The offset from which to read the file */
        offset?: td_int32;
        /** Number of bytes to read. An error will be returned if there are not enough bytes available in the file from the specified position. Pass 0 to read all available data from the specified position */
        count?: td_int32;
    }
    
    
    /** Deletes a file from the TDLib file cache */
    export interface td_deleteFile {
        '@type': 'deleteFile';
        /** Identifier of the file to delete */
        file_id?: td_int32;
    }
    
    
    /** Returns information about a file with messages exported from another app */
    export interface td_getMessageFileType {
        '@type': 'getMessageFileType';
        /** Beginning of the message file; up to 100 first lines */
        message_file_head?: td_string;
    }
    
    
    /** Returns a confirmation text to be shown to the user before starting message import */
    export interface td_getMessageImportConfirmationText {
        '@type': 'getMessageImportConfirmationText';
        /** Identifier of a chat to which the messages will be imported. It must be an identifier of a private chat with a mutual contact or an identifier of a supergroup chat with can_change_info administrator right */
        chat_id?: td_int53;
    }
    
    
    /** Imports messages exported from another app */
    export interface td_importMessages {
        '@type': 'importMessages';
        /** Identifier of a chat to which the messages will be imported. It must be an identifier of a private chat with a mutual contact or an identifier of a supergroup chat with can_change_info administrator right */
        chat_id?: td_int53;
        /** File with messages to import. Only inputFileLocal and inputFileGenerated are supported. The file must not be previously uploaded */
        message_file?: td_InputFile;
        /** Files used in the imported messages. Only inputFileLocal and inputFileGenerated are supported. The files must not be previously uploaded */
        attached_files?: td_vector<td_InputFile>;
    }
    
    
    /** Replaces current primary invite link for a chat with a new primary invite link. Available for basic groups, supergroups, and channels. Requires administrator privileges and can_invite_users right */
    export interface td_replacePrimaryChatInviteLink {
        '@type': 'replacePrimaryChatInviteLink';
        /** Chat identifier */
        chat_id?: td_int53;
    }
    
    
    /** Creates a new invite link for a chat. Available for basic groups, supergroups, and channels. Requires administrator privileges and can_invite_users right in the chat */
    export interface td_createChatInviteLink {
        '@type': 'createChatInviteLink';
        /** Chat identifier */
        chat_id?: td_int53;
        /** Invite link name; 0-32 characters */
        name?: td_string;
        /** Point in time (Unix timestamp) when the link will expire; pass 0 if never */
        expiration_date?: td_int32;
        /** The maximum number of chat members that can join the chat via the link simultaneously; 0-99999; pass 0 if not limited */
        member_limit?: td_int32;
        /** True, if the link only creates join request. If true, member_limit must not be specified */
        creates_join_request?: td_Bool;
    }
    
    
    /** Edits a non-primary invite link for a chat. Available for basic groups, supergroups, and channels. Requires administrator privileges and can_invite_users right in the chat for own links and owner privileges for other links */
    export interface td_editChatInviteLink {
        '@type': 'editChatInviteLink';
        /** Chat identifier */
        chat_id?: td_int53;
        /** Invite link to be edited */
        invite_link?: td_string;
        /** Invite link name; 0-32 characters */
        name?: td_string;
        /** Point in time (Unix timestamp) when the link will expire; pass 0 if never */
        expiration_date?: td_int32;
        /** The maximum number of chat members that can join the chat via the link simultaneously; 0-99999; pass 0 if not limited */
        member_limit?: td_int32;
        /** True, if the link only creates join request. If true, member_limit must not be specified */
        creates_join_request?: td_Bool;
    }
    
    
    /** Returns information about an invite link. Requires administrator privileges and can_invite_users right in the chat to get own links and owner privileges to get other links */
    export interface td_getChatInviteLink {
        '@type': 'getChatInviteLink';
        /** Chat identifier */
        chat_id?: td_int53;
        /** Invite link to get */
        invite_link?: td_string;
    }
    
    
    /** Returns list of chat administrators with number of their invite links. Requires owner privileges in the chat */
    export interface td_getChatInviteLinkCounts {
        '@type': 'getChatInviteLinkCounts';
        /** Chat identifier */
        chat_id?: td_int53;
    }
    
    
    /** Returns invite links for a chat created by specified administrator. Requires administrator privileges and can_invite_users right in the chat to get own links and owner privileges to get other links */
    export interface td_getChatInviteLinks {
        '@type': 'getChatInviteLinks';
        /** Chat identifier */
        chat_id?: td_int53;
        /** User identifier of a chat administrator. Must be an identifier of the current user for non-owner */
        creator_user_id?: td_int53;
        /** Pass true if revoked links needs to be returned instead of active or expired */
        is_revoked?: td_Bool;
        /** Creation date of an invite link starting after which to return invite links; use 0 to get results from the beginning */
        offset_date?: td_int32;
        /** Invite link starting after which to return invite links; use empty string to get results from the beginning */
        offset_invite_link?: td_string;
        /** The maximum number of invite links to return; up to 100 */
        limit?: td_int32;
    }
    
    
    /** Returns chat members joined a chat via an invite link. Requires administrator privileges and can_invite_users right in the chat for own links and owner privileges for other links */
    export interface td_getChatInviteLinkMembers {
        '@type': 'getChatInviteLinkMembers';
        /** Chat identifier */
        chat_id?: td_int53;
        /** Invite link for which to return chat members */
        invite_link?: td_string;
        /** A chat member from which to return next chat members; pass null to get results from the beginning */
        offset_member?: td_chatInviteLinkMember;
        /** The maximum number of chat members to return; up to 100 */
        limit?: td_int32;
    }
    
    
    /** Revokes invite link for a chat. Available for basic groups, supergroups, and channels. Requires administrator privileges and can_invite_users right in the chat for own links and owner privileges for other links. -If a primary link is revoked, then additionally to the revoked link returns new primary link */
    export interface td_revokeChatInviteLink {
        '@type': 'revokeChatInviteLink';
        /** Chat identifier */
        chat_id?: td_int53;
        /** Invite link to be revoked */
        invite_link?: td_string;
    }
    
    
    /** Deletes revoked chat invite links. Requires administrator privileges and can_invite_users right in the chat for own links and owner privileges for other links */
    export interface td_deleteRevokedChatInviteLink {
        '@type': 'deleteRevokedChatInviteLink';
        /** Chat identifier */
        chat_id?: td_int53;
        /** Invite link to revoke */
        invite_link?: td_string;
    }
    
    
    /** Deletes all revoked chat invite links created by a given chat administrator. Requires administrator privileges and can_invite_users right in the chat for own links and owner privileges for other links */
    export interface td_deleteAllRevokedChatInviteLinks {
        '@type': 'deleteAllRevokedChatInviteLinks';
        /** Chat identifier */
        chat_id?: td_int53;
        /** User identifier of a chat administrator, which links will be deleted. Must be an identifier of the current user for non-owner */
        creator_user_id?: td_int53;
    }
    
    
    /** Checks the validity of an invite link for a chat and returns information about the corresponding chat */
    export interface td_checkChatInviteLink {
        '@type': 'checkChatInviteLink';
        /** Invite link to be checked */
        invite_link?: td_string;
    }
    
    
    /** Uses an invite link to add the current user to the chat if possible */
    export interface td_joinChatByInviteLink {
        '@type': 'joinChatByInviteLink';
        /** Invite link to use */
        invite_link?: td_string;
    }
    
    
    /** Returns pending join requests in a chat */
    export interface td_getChatJoinRequests {
        '@type': 'getChatJoinRequests';
        /** Chat identifier */
        chat_id?: td_int53;
        /** Invite link for which to return join requests. If empty, all join requests will be returned. Requires administrator privileges and can_invite_users right in the chat for own links and owner privileges for other links */
        invite_link?: td_string;
        /** A query to search for in the first names, last names and usernames of the users to return */
        query?: td_string;
        /** A chat join request from which to return next requests; pass null to get results from the beginning */
        offset_request?: td_chatJoinRequest;
        /** The maximum number of requests to join the chat to return */
        limit?: td_int32;
    }
    
    
    /** Handles a pending join request in a chat */
    export interface td_processChatJoinRequest {
        '@type': 'processChatJoinRequest';
        /** Chat identifier */
        chat_id?: td_int53;
        /** Identifier of the user that sent the request */
        user_id?: td_int53;
        /** True, if the request is approved. Otherwise the request is declived */
        approve?: td_Bool;
    }
    
    
    /** Handles all pending join requests for a given link in a chat */
    export interface td_processChatJoinRequests {
        '@type': 'processChatJoinRequests';
        /** Chat identifier */
        chat_id?: td_int53;
        /** Invite link for which to process join requests. If empty, all join requests will be processed. Requires administrator privileges and can_invite_users right in the chat for own links and owner privileges for other links */
        invite_link?: td_string;
        /** True, if the requests are approved. Otherwise the requests are declived */
        approve?: td_Bool;
    }
    
    
    /** Creates a new call */
    export interface td_createCall {
        '@type': 'createCall';
        /** Identifier of the user to be called */
        user_id?: td_int53;
        /** The call protocols supported by the application */
        protocol?: td_callProtocol;
        /** True, if a video call needs to be created */
        is_video?: td_Bool;
    }
    
    
    /** Accepts an incoming call */
    export interface td_acceptCall {
        '@type': 'acceptCall';
        /** Call identifier */
        call_id?: td_int32;
        /** The call protocols supported by the application */
        protocol?: td_callProtocol;
    }
    
    
    /** Sends call signaling data */
    export interface td_sendCallSignalingData {
        '@type': 'sendCallSignalingData';
        /** Call identifier */
        call_id?: td_int32;
        /** The data */
        data?: td_bytes;
    }
    
    
    /** Discards a call */
    export interface td_discardCall {
        '@type': 'discardCall';
        /** Call identifier */
        call_id?: td_int32;
        /** True, if the user was disconnected */
        is_disconnected?: td_Bool;
        /** The call duration, in seconds */
        duration?: td_int32;
        /** True, if the call was a video call */
        is_video?: td_Bool;
        /** Identifier of the connection used during the call */
        connection_id?: td_int64;
    }
    
    
    /** Sends a call rating */
    export interface td_sendCallRating {
        '@type': 'sendCallRating';
        /** Call identifier */
        call_id?: td_int32;
        /** Call rating; 1-5 */
        rating?: td_int32;
        /** An optional user comment if the rating is less than 5 */
        comment?: td_string;
        /** List of the exact types of problems with the call, specified by the user */
        problems?: td_vector<td_CallProblem>;
    }
    
    
    /** Sends debug information for a call */
    export interface td_sendCallDebugInformation {
        '@type': 'sendCallDebugInformation';
        /** Call identifier */
        call_id?: td_int32;
        /** Debug information in application-specific format */
        debug_information?: td_string;
    }
    
    
    /** Returns list of participant identifiers, on whose behalf a video chat in the chat can be joined */
    export interface td_getVideoChatAvailableParticipants {
        '@type': 'getVideoChatAvailableParticipants';
        /** Chat identifier */
        chat_id?: td_int53;
    }
    
    
    /** Changes default participant identifier, on whose behalf a video chat in the chat will be joined */
    export interface td_setVideoChatDefaultParticipant {
        '@type': 'setVideoChatDefaultParticipant';
        /** Chat identifier */
        chat_id?: td_int53;
        /** Default group call participant identifier to join the video chats */
        default_participant_id?: td_MessageSender;
    }
    
    
    /** Creates a video chat (a group call bound to a chat). Available only for basic groups, supergroups and channels; requires can_manage_video_chats rights */
    export interface td_createVideoChat {
        '@type': 'createVideoChat';
        /** Chat identifier, in which the video chat will be created */
        chat_id?: td_int53;
        /** Group call title; if empty, chat title will be used */
        title?: td_string;
        /** Point in time (Unix timestamp) when the group call is supposed to be started by an administrator; 0 to start the video chat immediately. The date must be at least 10 seconds and at most 8 days in the future */
        start_date?: td_int32;
    }
    
    
    /** Returns information about a group call */
    export interface td_getGroupCall {
        '@type': 'getGroupCall';
        /** Group call identifier */
        group_call_id?: td_int32;
    }
    
    
    /** Starts a scheduled group call */
    export interface td_startScheduledGroupCall {
        '@type': 'startScheduledGroupCall';
        /** Group call identifier */
        group_call_id?: td_int32;
    }
    
    
    /** Toggles whether the current user will receive a notification when the group call will start; scheduled group calls only */
    export interface td_toggleGroupCallEnabledStartNotification {
        '@type': 'toggleGroupCallEnabledStartNotification';
        /** Group call identifier */
        group_call_id?: td_int32;
        /** New value of the enabled_start_notification setting */
        enabled_start_notification?: td_Bool;
    }
    
    
    /** Joins an active group call. Returns join response payload for tgcalls */
    export interface td_joinGroupCall {
        '@type': 'joinGroupCall';
        /** Group call identifier */
        group_call_id?: td_int32;
        /** Identifier of a group call participant, which will be used to join the call; pass null to join as self; video chats only */
        participant_id?: td_MessageSender;
        /** Caller audio channel synchronization source identifier; received from tgcalls */
        audio_source_id?: td_int32;
        /** Group call join payload; received from tgcalls */
        payload?: td_string;
        /** True, if the user's microphone is muted */
        is_muted?: td_Bool;
        /** True, if the user's video is enabled */
        is_my_video_enabled?: td_Bool;
        /** If non-empty, invite hash to be used to join the group call without being muted by administrators */
        invite_hash?: td_string;
    }
    
    
    /** Starts screen sharing in a joined group call. Returns join response payload for tgcalls */
    export interface td_startGroupCallScreenSharing {
        '@type': 'startGroupCallScreenSharing';
        /** Group call identifier */
        group_call_id?: td_int32;
        /** Screen sharing audio channel synchronization source identifier; received from tgcalls */
        audio_source_id?: td_int32;
        /** Group call join payload; received from tgcalls */
        payload?: td_string;
    }
    
    
    /** Pauses or unpauses screen sharing in a joined group call */
    export interface td_toggleGroupCallScreenSharingIsPaused {
        '@type': 'toggleGroupCallScreenSharingIsPaused';
        /** Group call identifier */
        group_call_id?: td_int32;
        /** True if screen sharing is paused */
        is_paused?: td_Bool;
    }
    
    
    /** Ends screen sharing in a joined group call */
    export interface td_endGroupCallScreenSharing {
        '@type': 'endGroupCallScreenSharing';
        /** Group call identifier */
        group_call_id?: td_int32;
    }
    
    
    /** Sets group call title. Requires groupCall.can_be_managed group call flag */
    export interface td_setGroupCallTitle {
        '@type': 'setGroupCallTitle';
        /** Group call identifier */
        group_call_id?: td_int32;
        /** New group call title; 1-64 characters */
        title?: td_string;
    }
    
    
    /** Toggles whether new participants of a group call can be unmuted only by administrators of the group call. Requires groupCall.can_toggle_mute_new_participants group call flag */
    export interface td_toggleGroupCallMuteNewParticipants {
        '@type': 'toggleGroupCallMuteNewParticipants';
        /** Group call identifier */
        group_call_id?: td_int32;
        /** New value of the mute_new_participants setting */
        mute_new_participants?: td_Bool;
    }
    
    
    /** Invites users to an active group call. Sends a service message of type messageInviteToGroupCall for video chats */
    export interface td_inviteGroupCallParticipants {
        '@type': 'inviteGroupCallParticipants';
        /** Group call identifier */
        group_call_id?: td_int32;
        /** User identifiers. At most 10 users can be invited simultaneously */
        user_ids?: td_vector<td_int53>;
    }
    
    
    /** Returns invite link to a video chat in a public chat */
    export interface td_getGroupCallInviteLink {
        '@type': 'getGroupCallInviteLink';
        /** Group call identifier */
        group_call_id?: td_int32;
        /** Pass true if the invite link needs to contain an invite hash, passing which to joinGroupCall would allow the invited user to unmute themselves. Requires groupCall.can_be_managed group call flag */
        can_self_unmute?: td_Bool;
    }
    
    
    /** Revokes invite link for a group call. Requires groupCall.can_be_managed group call flag */
    export interface td_revokeGroupCallInviteLink {
        '@type': 'revokeGroupCallInviteLink';
        /** Group call identifier */
        group_call_id?: td_int32;
    }
    
    
    /** Starts recording of an active group call. Requires groupCall.can_be_managed group call flag */
    export interface td_startGroupCallRecording {
        '@type': 'startGroupCallRecording';
        /** Group call identifier */
        group_call_id?: td_int32;
        /** Group call recording title; 0-64 characters */
        title?: td_string;
        /** Pass true to record a video file instead of an audio file */
        record_video?: td_Bool;
        /** Pass true to use portrait orientation for video instead of landscape one */
        use_portrait_orientation?: td_Bool;
    }
    
    
    /** Ends recording of an active group call. Requires groupCall.can_be_managed group call flag */
    export interface td_endGroupCallRecording {
        '@type': 'endGroupCallRecording';
        /** Group call identifier */
        group_call_id?: td_int32;
    }
    
    
    /** Toggles whether current user's video is paused */
    export interface td_toggleGroupCallIsMyVideoPaused {
        '@type': 'toggleGroupCallIsMyVideoPaused';
        /** Group call identifier */
        group_call_id?: td_int32;
        /** Pass true if the current user's video is paused */
        is_my_video_paused?: td_Bool;
    }
    
    
    /** Toggles whether current user's video is enabled */
    export interface td_toggleGroupCallIsMyVideoEnabled {
        '@type': 'toggleGroupCallIsMyVideoEnabled';
        /** Group call identifier */
        group_call_id?: td_int32;
        /** Pass true if the current user's video is enabled */
        is_my_video_enabled?: td_Bool;
    }
    
    
    /** Informs TDLib that speaking state of a participant of an active group has changed */
    export interface td_setGroupCallParticipantIsSpeaking {
        '@type': 'setGroupCallParticipantIsSpeaking';
        /** Group call identifier */
        group_call_id?: td_int32;
        /** Group call participant's synchronization audio source identifier, or 0 for the current user */
        audio_source?: td_int32;
        /** True, if the user is speaking */
        is_speaking?: td_Bool;
    }
    
    
    /** Toggles whether a participant of an active group call is muted, unmuted, or allowed to unmute themselves */
    export interface td_toggleGroupCallParticipantIsMuted {
        '@type': 'toggleGroupCallParticipantIsMuted';
        /** Group call identifier */
        group_call_id?: td_int32;
        /** Participant identifier */
        participant_id?: td_MessageSender;
        /** Pass true if the user must be muted and false otherwise */
        is_muted?: td_Bool;
    }
    
    
    /** Changes volume level of a participant of an active group call. If the current user can manage the group call, then the participant's volume level will be changed for all users with the default volume level */
    export interface td_setGroupCallParticipantVolumeLevel {
        '@type': 'setGroupCallParticipantVolumeLevel';
        /** Group call identifier */
        group_call_id?: td_int32;
        /** Participant identifier */
        participant_id?: td_MessageSender;
        /** New participant's volume level; 1-20000 in hundreds of percents */
        volume_level?: td_int32;
    }
    
    
    /** Toggles whether a group call participant hand is rased */
    export interface td_toggleGroupCallParticipantIsHandRaised {
        '@type': 'toggleGroupCallParticipantIsHandRaised';
        /** Group call identifier */
        group_call_id?: td_int32;
        /** Participant identifier */
        participant_id?: td_MessageSender;
        /** Pass true if the user's hand needs to be raised. Only self hand can be raised. Requires groupCall.can_be_managed group call flag to lower other's hand */
        is_hand_raised?: td_Bool;
    }
    
    
    /** Loads more participants of a group call. The loaded participants will be received through updates. Use the field groupCall.loaded_all_participants to check whether all participants have already been loaded */
    export interface td_loadGroupCallParticipants {
        '@type': 'loadGroupCallParticipants';
        /** Group call identifier. The group call must be previously received through getGroupCall and must be joined or being joined */
        group_call_id?: td_int32;
        /** The maximum number of participants to load; up to 100 */
        limit?: td_int32;
    }
    
    
    /** Leaves a group call */
    export interface td_leaveGroupCall {
        '@type': 'leaveGroupCall';
        /** Group call identifier */
        group_call_id?: td_int32;
    }
    
    
    /** Ends a group call. Requires groupCall.can_be_managed */
    export interface td_endGroupCall {
        '@type': 'endGroupCall';
        /** Group call identifier */
        group_call_id?: td_int32;
    }
    
    
    /** Returns a file with a segment of a group call stream in a modified OGG format for audio or MPEG-4 format for video */
    export interface td_getGroupCallStreamSegment {
        '@type': 'getGroupCallStreamSegment';
        /** Group call identifier */
        group_call_id?: td_int32;
        /** Point in time when the stream segment begins; Unix timestamp in milliseconds */
        time_offset?: td_int53;
        /** Segment duration scale; 0-1. Segment's duration is 1000/(2**scale) milliseconds */
        scale?: td_int32;
        /** Identifier of an audio/video channel to get as received from tgcalls */
        channel_id?: td_int32;
        /** Video quality as received from tgcalls; pass null to get the worst available quality */
        video_quality?: td_GroupCallVideoQuality;
    }
    
    
    /** Changes the block state of a message sender. Currently, only users and supergroup chats can be blocked */
    export interface td_toggleMessageSenderIsBlocked {
        '@type': 'toggleMessageSenderIsBlocked';
        /** Identifier of a message sender to block/unblock */
        sender_id?: td_MessageSender;
        /** New value of is_blocked */
        is_blocked?: td_Bool;
    }
    
    
    /** Blocks an original sender of a message in the Replies chat */
    export interface td_blockMessageSenderFromReplies {
        '@type': 'blockMessageSenderFromReplies';
        /** The identifier of an incoming message in the Replies chat */
        message_id?: td_int53;
        /** Pass true if the message must be deleted */
        delete_message?: td_Bool;
        /** Pass true if all messages from the same sender must be deleted */
        delete_all_messages?: td_Bool;
        /** Pass true if the sender must be reported to the Telegram moderators */
        report_spam?: td_Bool;
    }
    
    
    /** Returns users and chats that were blocked by the current user */
    export interface td_getBlockedMessageSenders {
        '@type': 'getBlockedMessageSenders';
        /** Number of users and chats to skip in the result; must be non-negative */
        offset?: td_int32;
        /** The maximum number of users and chats to return; up to 100 */
        limit?: td_int32;
    }
    
    
    /** Adds a user to the contact list or edits an existing contact by their user identifier */
    export interface td_addContact {
        '@type': 'addContact';
        /** The contact to add or edit; phone number can be empty and needs to be specified only if known, vCard is ignored */
        contact?: td_contact;
        /** True, if the new contact needs to be allowed to see current user's phone number. A corresponding rule to userPrivacySettingShowPhoneNumber will be added if needed. Use the field userFullInfo.need_phone_number_privacy_exception to check whether the current user needs to be asked to share their phone number */
        share_phone_number?: td_Bool;
    }
    
    
    /** Adds new contacts or edits existing contacts by their phone numbers; contacts' user identifiers are ignored */
    export interface td_importContacts {
        '@type': 'importContacts';
        /** The list of contacts to import or edit; contacts' vCard are ignored and are not imported */
        contacts?: td_vector<td_contact>;
    }
    
    
    /** Returns all user contacts */
    export interface td_getContacts {
        '@type': 'getContacts';
    }
    
    
    /** Searches for the specified query in the first names, last names and usernames of the known user contacts */
    export interface td_searchContacts {
        '@type': 'searchContacts';
        /** Query to search for; may be empty to return all contacts */
        query?: td_string;
        /** The maximum number of users to be returned */
        limit?: td_int32;
    }
    
    
    /** Removes users from the contact list */
    export interface td_removeContacts {
        '@type': 'removeContacts';
        /** Identifiers of users to be deleted */
        user_ids?: td_vector<td_int53>;
    }
    
    
    /** Returns the total number of imported contacts */
    export interface td_getImportedContactCount {
        '@type': 'getImportedContactCount';
    }
    
    
    /** Changes imported contacts using the list of contacts saved on the device. Imports newly added contacts and, if at least the file database is enabled, deletes recently deleted contacts. -Query result depends on the result of the previous query, so only one query is possible at the same time */
    export interface td_changeImportedContacts {
        '@type': 'changeImportedContacts';
        /** The new list of contacts, contact's vCard are ignored and are not imported */
        contacts?: td_vector<td_contact>;
    }
    
    
    /** Clears all imported contacts, contact list remains unchanged */
    export interface td_clearImportedContacts {
        '@type': 'clearImportedContacts';
    }
    
    
    /** Shares the phone number of the current user with a mutual contact. Supposed to be called when the user clicks on chatActionBarSharePhoneNumber */
    export interface td_sharePhoneNumber {
        '@type': 'sharePhoneNumber';
        /** Identifier of the user with whom to share the phone number. The user must be a mutual contact */
        user_id?: td_int53;
    }
    
    
    /** Returns the profile photos of a user. The result of this query may be outdated: some photos might have been deleted already */
    export interface td_getUserProfilePhotos {
        '@type': 'getUserProfilePhotos';
        /** User identifier */
        user_id?: td_int53;
        /** The number of photos to skip; must be non-negative */
        offset?: td_int32;
        /** The maximum number of photos to be returned; up to 100 */
        limit?: td_int32;
    }
    
    
    /** Returns stickers from the installed sticker sets that correspond to a given emoji. If the emoji is non-empty, favorite and recently used stickers may also be returned */
    export interface td_getStickers {
        '@type': 'getStickers';
        /** String representation of emoji. If empty, returns all known installed stickers */
        emoji?: td_string;
        /** The maximum number of stickers to be returned */
        limit?: td_int32;
    }
    
    
    /** Searches for stickers from public sticker sets that correspond to a given emoji */
    export interface td_searchStickers {
        '@type': 'searchStickers';
        /** String representation of emoji; must be non-empty */
        emoji?: td_string;
        /** The maximum number of stickers to be returned */
        limit?: td_int32;
    }
    
    
    /** Returns a list of installed sticker sets */
    export interface td_getInstalledStickerSets {
        '@type': 'getInstalledStickerSets';
        /** Pass true to return mask sticker sets; pass false to return ordinary sticker sets */
        is_masks?: td_Bool;
    }
    
    
    /** Returns a list of archived sticker sets */
    export interface td_getArchivedStickerSets {
        '@type': 'getArchivedStickerSets';
        /** Pass true to return mask stickers sets; pass false to return ordinary sticker sets */
        is_masks?: td_Bool;
        /** Identifier of the sticker set from which to return the result */
        offset_sticker_set_id?: td_int64;
        /** The maximum number of sticker sets to return; up to 100 */
        limit?: td_int32;
    }
    
    
    /** Returns a list of trending sticker sets. For optimal performance, the number of returned sticker sets is chosen by TDLib */
    export interface td_getTrendingStickerSets {
        '@type': 'getTrendingStickerSets';
        /** The offset from which to return the sticker sets; must be non-negative */
        offset?: td_int32;
        /** The maximum number of sticker sets to be returned; up to 100. For optimal performance, the number of returned sticker sets is chosen by TDLib and can be smaller than the specified limit, even if the end of the list has not been reached */
        limit?: td_int32;
    }
    
    
    /** Returns a list of sticker sets attached to a file. Currently, only photos and videos can have attached sticker sets */
    export interface td_getAttachedStickerSets {
        '@type': 'getAttachedStickerSets';
        /** File identifier */
        file_id?: td_int32;
    }
    
    
    /** Returns information about a sticker set by its identifier */
    export interface td_getStickerSet {
        '@type': 'getStickerSet';
        /** Identifier of the sticker set */
        set_id?: td_int64;
    }
    
    
    /** Searches for a sticker set by its name */
    export interface td_searchStickerSet {
        '@type': 'searchStickerSet';
        /** Name of the sticker set */
        name?: td_string;
    }
    
    
    /** Searches for installed sticker sets by looking for specified query in their title and name */
    export interface td_searchInstalledStickerSets {
        '@type': 'searchInstalledStickerSets';
        /** Pass true to return mask sticker sets; pass false to return ordinary sticker sets */
        is_masks?: td_Bool;
        /** Query to search for */
        query?: td_string;
        /** The maximum number of sticker sets to return */
        limit?: td_int32;
    }
    
    
    /** Searches for ordinary sticker sets by looking for specified query in their title and name. Excludes installed sticker sets from the results */
    export interface td_searchStickerSets {
        '@type': 'searchStickerSets';
        /** Query to search for */
        query?: td_string;
    }
    
    
    /** Installs/uninstalls or activates/archives a sticker set */
    export interface td_changeStickerSet {
        '@type': 'changeStickerSet';
        /** Identifier of the sticker set */
        set_id?: td_int64;
        /** The new value of is_installed */
        is_installed?: td_Bool;
        /** The new value of is_archived. A sticker set can't be installed and archived simultaneously */
        is_archived?: td_Bool;
    }
    
    
    /** Informs the server that some trending sticker sets have been viewed by the user */
    export interface td_viewTrendingStickerSets {
        '@type': 'viewTrendingStickerSets';
        /** Identifiers of viewed trending sticker sets */
        sticker_set_ids?: td_vector<td_int64>;
    }
    
    
    /** Changes the order of installed sticker sets */
    export interface td_reorderInstalledStickerSets {
        '@type': 'reorderInstalledStickerSets';
        /** Pass true to change the order of mask sticker sets; pass false to change the order of ordinary sticker sets */
        is_masks?: td_Bool;
        /** Identifiers of installed sticker sets in the new correct order */
        sticker_set_ids?: td_vector<td_int64>;
    }
    
    
    /** Returns a list of recently used stickers */
    export interface td_getRecentStickers {
        '@type': 'getRecentStickers';
        /** Pass true to return stickers and masks that were recently attached to photos or video files; pass false to return recently sent stickers */
        is_attached?: td_Bool;
    }
    
    
    /** Manually adds a new sticker to the list of recently used stickers. The new sticker is added to the top of the list. If the sticker was already in the list, it is removed from the list first. Only stickers belonging to a sticker set can be added to this list */
    export interface td_addRecentSticker {
        '@type': 'addRecentSticker';
        /** Pass true to add the sticker to the list of stickers recently attached to photo or video files; pass false to add the sticker to the list of recently sent stickers */
        is_attached?: td_Bool;
        /** Sticker file to add */
        sticker?: td_InputFile;
    }
    
    
    /** Removes a sticker from the list of recently used stickers */
    export interface td_removeRecentSticker {
        '@type': 'removeRecentSticker';
        /** Pass true to remove the sticker from the list of stickers recently attached to photo or video files; pass false to remove the sticker from the list of recently sent stickers */
        is_attached?: td_Bool;
        /** Sticker file to delete */
        sticker?: td_InputFile;
    }
    
    
    /** Clears the list of recently used stickers */
    export interface td_clearRecentStickers {
        '@type': 'clearRecentStickers';
        /** Pass true to clear the list of stickers recently attached to photo or video files; pass false to clear the list of recently sent stickers */
        is_attached?: td_Bool;
    }
    
    
    /** Returns favorite stickers */
    export interface td_getFavoriteStickers {
        '@type': 'getFavoriteStickers';
    }
    
    
    /** Adds a new sticker to the list of favorite stickers. The new sticker is added to the top of the list. If the sticker was already in the list, it is removed from the list first. Only stickers belonging to a sticker set can be added to this list */
    export interface td_addFavoriteSticker {
        '@type': 'addFavoriteSticker';
        /** Sticker file to add */
        sticker?: td_InputFile;
    }
    
    
    /** Removes a sticker from the list of favorite stickers */
    export interface td_removeFavoriteSticker {
        '@type': 'removeFavoriteSticker';
        /** Sticker file to delete from the list */
        sticker?: td_InputFile;
    }
    
    
    /** Returns emoji corresponding to a sticker. The list is only for informational purposes, because a sticker is always sent with a fixed emoji from the corresponding Sticker object */
    export interface td_getStickerEmojis {
        '@type': 'getStickerEmojis';
        /** Sticker file identifier */
        sticker?: td_InputFile;
    }
    
    
    /** Searches for emojis by keywords. Supported only if the file database is enabled */
    export interface td_searchEmojis {
        '@type': 'searchEmojis';
        /** Text to search for */
        text?: td_string;
        /** True, if only emojis, which exactly match text needs to be returned */
        exact_match?: td_Bool;
        /** List of possible IETF language tags of the user's input language; may be empty if unknown */
        input_language_codes?: td_vector<td_string>;
    }
    
    
    /** Returns an animated emoji corresponding to a given emoji. Returns a 404 error if the emoji has no animated emoji */
    export interface td_getAnimatedEmoji {
        '@type': 'getAnimatedEmoji';
        /** The emoji */
        emoji?: td_string;
    }
    
    
    /** Returns an HTTP URL which can be used to automatically log in to the translation platform and suggest new emoji replacements. The URL will be valid for 30 seconds after generation */
    export interface td_getEmojiSuggestionsUrl {
        '@type': 'getEmojiSuggestionsUrl';
        /** Language code for which the emoji replacements will be suggested */
        language_code?: td_string;
    }
    
    
    /** Returns saved animations */
    export interface td_getSavedAnimations {
        '@type': 'getSavedAnimations';
    }
    
    
    /** Manually adds a new animation to the list of saved animations. The new animation is added to the beginning of the list. If the animation was already in the list, it is removed first. Only non-secret video animations with MIME type "video/mp4" can be added to the list */
    export interface td_addSavedAnimation {
        '@type': 'addSavedAnimation';
        /** The animation file to be added. Only animations known to the server (i.e., successfully sent via a message) can be added to the list */
        animation?: td_InputFile;
    }
    
    
    /** Removes an animation from the list of saved animations */
    export interface td_removeSavedAnimation {
        '@type': 'removeSavedAnimation';
        /** Animation file to be removed */
        animation?: td_InputFile;
    }
    
    
    /** Returns up to 20 recently used inline bots in the order of their last usage */
    export interface td_getRecentInlineBots {
        '@type': 'getRecentInlineBots';
    }
    
    
    /** Searches for recently used hashtags by their prefix */
    export interface td_searchHashtags {
        '@type': 'searchHashtags';
        /** Hashtag prefix to search for */
        prefix?: td_string;
        /** The maximum number of hashtags to be returned */
        limit?: td_int32;
    }
    
    
    /** Removes a hashtag from the list of recently used hashtags */
    export interface td_removeRecentHashtag {
        '@type': 'removeRecentHashtag';
        /** Hashtag to delete */
        hashtag?: td_string;
    }
    
    
    /** Returns a web page preview by the text of the message. Do not call this function too often. Returns a 404 error if the web page has no preview */
    export interface td_getWebPagePreview {
        '@type': 'getWebPagePreview';
        /** Message text with formatting */
        text?: td_formattedText;
    }
    
    
    /** Returns an instant view version of a web page if available. Returns a 404 error if the web page has no instant view page */
    export interface td_getWebPageInstantView {
        '@type': 'getWebPageInstantView';
        /** The web page URL */
        url?: td_string;
        /** If true, the full instant view for the web page will be returned */
        force_full?: td_Bool;
    }
    
    
    /** Changes a profile photo for the current user */
    export interface td_setProfilePhoto {
        '@type': 'setProfilePhoto';
        /** Profile photo to set */
        photo?: td_InputChatPhoto;
    }
    
    
    /** Deletes a profile photo */
    export interface td_deleteProfilePhoto {
        '@type': 'deleteProfilePhoto';
        /** Identifier of the profile photo to delete */
        profile_photo_id?: td_int64;
    }
    
    
    /** Changes the first and last name of the current user */
    export interface td_setName {
        '@type': 'setName';
        /** The new value of the first name for the current user; 1-64 characters */
        first_name?: td_string;
        /** The new value of the optional last name for the current user; 0-64 characters */
        last_name?: td_string;
    }
    
    
    /** Changes the bio of the current user */
    export interface td_setBio {
        '@type': 'setBio';
        /** The new value of the user bio; 0-70 characters without line feeds */
        bio?: td_string;
    }
    
    
    /** Changes the username of the current user */
    export interface td_setUsername {
        '@type': 'setUsername';
        /** The new value of the username. Use an empty string to remove the username */
        username?: td_string;
    }
    
    
    /** Changes the location of the current user. Needs to be called if GetOption("is_location_visible") is true and location changes for more than 1 kilometer */
    export interface td_setLocation {
        '@type': 'setLocation';
        /** The new location of the user */
        location?: td_location;
    }
    
    
    /** Changes the phone number of the user and sends an authentication code to the user's new phone number. On success, returns information about the sent code */
    export interface td_changePhoneNumber {
        '@type': 'changePhoneNumber';
        /** The new phone number of the user in international format */
        phone_number?: td_string;
        /** Settings for the authentication of the user's phone number; pass null to use default settings */
        settings?: td_phoneNumberAuthenticationSettings;
    }
    
    
    /** Re-sends the authentication code sent to confirm a new phone number for the current user. Works only if the previously received authenticationCodeInfo next_code_type was not null and the server-specified timeout has passed */
    export interface td_resendChangePhoneNumberCode {
        '@type': 'resendChangePhoneNumberCode';
    }
    
    
    /** Checks the authentication code sent to confirm a new phone number of the user */
    export interface td_checkChangePhoneNumberCode {
        '@type': 'checkChangePhoneNumberCode';
        /** Authentication code to check */
        code?: td_string;
    }
    
    
    /** Sets the list of commands supported by the bot for the given user scope and language; for bots only */
    export interface td_setCommands {
        '@type': 'setCommands';
        /** The scope to which the commands are relevant; pass null to change commands in the default bot command scope */
        scope?: td_BotCommandScope;
        /** A two-letter ISO 639-1 country code. If empty, the commands will be applied to all users from the given scope, for which language there are no dedicated commands */
        language_code?: td_string;
        /** List of the bot's commands */
        commands?: td_vector<td_botCommand>;
    }
    
    
    /** Deletes commands supported by the bot for the given user scope and language; for bots only */
    export interface td_deleteCommands {
        '@type': 'deleteCommands';
        /** The scope to which the commands are relevant; pass null to delete commands in the default bot command scope */
        scope?: td_BotCommandScope;
        /** A two-letter ISO 639-1 country code or an empty string */
        language_code?: td_string;
    }
    
    
    /** Returns the list of commands supported by the bot for the given user scope and language; for bots only */
    export interface td_getCommands {
        '@type': 'getCommands';
        /** The scope to which the commands are relevant; pass null to get commands in the default bot command scope */
        scope?: td_BotCommandScope;
        /** A two-letter ISO 639-1 country code or an empty string */
        language_code?: td_string;
    }
    
    
    /** Returns all active sessions of the current user */
    export interface td_getActiveSessions {
        '@type': 'getActiveSessions';
    }
    
    
    /** Terminates a session of the current user */
    export interface td_terminateSession {
        '@type': 'terminateSession';
        /** Session identifier */
        session_id?: td_int64;
    }
    
    
    /** Terminates all other sessions of the current user */
    export interface td_terminateAllOtherSessions {
        '@type': 'terminateAllOtherSessions';
    }
    
    
    /** Toggles whether a session can accept incoming calls */
    export interface td_toggleSessionCanAcceptCalls {
        '@type': 'toggleSessionCanAcceptCalls';
        /** Session identifier */
        session_id?: td_int64;
        /** True, if incoming calls can be accepted by the session */
        can_accept_calls?: td_Bool;
    }
    
    
    /** Toggles whether a session can accept incoming secret chats */
    export interface td_toggleSessionCanAcceptSecretChats {
        '@type': 'toggleSessionCanAcceptSecretChats';
        /** Session identifier */
        session_id?: td_int64;
        /** True, if incoming secret chats can be accepted by the session */
        can_accept_secret_chats?: td_Bool;
    }
    
    
    /** Changes the period of inactivity after which sessions will automatically be terminated */
    export interface td_setInactiveSessionTtl {
        '@type': 'setInactiveSessionTtl';
        /** New number of days of inactivity before sessions will be automatically terminated; 1-366 days */
        inactive_session_ttl_days?: td_int32;
    }
    
    
    /** Returns all website where the current user used Telegram to log in */
    export interface td_getConnectedWebsites {
        '@type': 'getConnectedWebsites';
    }
    
    
    /** Disconnects website from the current user's Telegram account */
    export interface td_disconnectWebsite {
        '@type': 'disconnectWebsite';
        /** Website identifier */
        website_id?: td_int64;
    }
    
    
    /** Disconnects all websites from the current user's Telegram account */
    export interface td_disconnectAllWebsites {
        '@type': 'disconnectAllWebsites';
    }
    
    
    /** Changes the username of a supergroup or channel, requires owner privileges in the supergroup or channel */
    export interface td_setSupergroupUsername {
        '@type': 'setSupergroupUsername';
        /** Identifier of the supergroup or channel */
        supergroup_id?: td_int53;
        /** New value of the username. Use an empty string to remove the username */
        username?: td_string;
    }
    
    
    /** Changes the sticker set of a supergroup; requires can_change_info administrator right */
    export interface td_setSupergroupStickerSet {
        '@type': 'setSupergroupStickerSet';
        /** Identifier of the supergroup */
        supergroup_id?: td_int53;
        /** New value of the supergroup sticker set identifier. Use 0 to remove the supergroup sticker set */
        sticker_set_id?: td_int64;
    }
    
    
    /** Toggles whether sender signature is added to sent messages in a channel; requires can_change_info administrator right */
    export interface td_toggleSupergroupSignMessages {
        '@type': 'toggleSupergroupSignMessages';
        /** Identifier of the channel */
        supergroup_id?: td_int53;
        /** New value of sign_messages */
        sign_messages?: td_Bool;
    }
    
    
    /** Toggles whether the message history of a supergroup is available to new members; requires can_change_info administrator right */
    export interface td_toggleSupergroupIsAllHistoryAvailable {
        '@type': 'toggleSupergroupIsAllHistoryAvailable';
        /** The identifier of the supergroup */
        supergroup_id?: td_int53;
        /** The new value of is_all_history_available */
        is_all_history_available?: td_Bool;
    }
    
    
    /** Upgrades supergroup to a broadcast group; requires owner privileges in the supergroup */
    export interface td_toggleSupergroupIsBroadcastGroup {
        '@type': 'toggleSupergroupIsBroadcastGroup';
        /** Identifier of the supergroup */
        supergroup_id?: td_int53;
    }
    
    
    /** Reports messages in a supergroup as spam; requires administrator rights in the supergroup */
    export interface td_reportSupergroupSpam {
        '@type': 'reportSupergroupSpam';
        /** Supergroup identifier */
        supergroup_id?: td_int53;
        /** Identifiers of messages to report */
        message_ids?: td_vector<td_int53>;
    }
    
    
    /** Returns information about members or banned users in a supergroup or channel. Can be used only if supergroupFullInfo.can_get_members == true; additionally, administrator privileges may be required for some filters */
    export interface td_getSupergroupMembers {
        '@type': 'getSupergroupMembers';
        /** Identifier of the supergroup or channel */
        supergroup_id?: td_int53;
        /** The type of users to return; pass null to use supergroupMembersFilterRecent */
        filter?: td_SupergroupMembersFilter;
        /** Number of users to skip */
        offset?: td_int32;
        /** The maximum number of users be returned; up to 200 */
        limit?: td_int32;
    }
    
    
    /** Closes a secret chat, effectively transferring its state to secretChatStateClosed */
    export interface td_closeSecretChat {
        '@type': 'closeSecretChat';
        /** Secret chat identifier */
        secret_chat_id?: td_int32;
    }
    
    
    /** Returns a list of service actions taken by chat members and administrators in the last 48 hours. Available only for supergroups and channels. Requires administrator rights. Returns results in reverse chronological order (i. e., in order of decreasing event_id) */
    export interface td_getChatEventLog {
        '@type': 'getChatEventLog';
        /** Chat identifier */
        chat_id?: td_int53;
        /** Search query by which to filter events */
        query?: td_string;
        /** Identifier of an event from which to return results. Use 0 to get results from the latest events */
        from_event_id?: td_int64;
        /** The maximum number of events to return; up to 100 */
        limit?: td_int32;
        /** The types of events to return; pass null to get chat events of all types */
        filters?: td_chatEventLogFilters;
        /** User identifiers by which to filter events. By default, events relating to all users will be returned */
        user_ids?: td_vector<td_int53>;
    }
    
    
    /** Returns an invoice payment form. This method must be called when the user presses inlineKeyboardButtonBuy */
    export interface td_getPaymentForm {
        '@type': 'getPaymentForm';
        /** Chat identifier of the Invoice message */
        chat_id?: td_int53;
        /** Message identifier */
        message_id?: td_int53;
        /** Preferred payment form theme; pass null to use the default theme */
        theme?: td_paymentFormTheme;
    }
    
    
    /** Validates the order information provided by a user and returns the available shipping options for a flexible invoice */
    export interface td_validateOrderInfo {
        '@type': 'validateOrderInfo';
        /** Chat identifier of the Invoice message */
        chat_id?: td_int53;
        /** Message identifier */
        message_id?: td_int53;
        /** The order information, provided by the user; pass null if empty */
        order_info?: td_orderInfo;
        /** True, if the order information can be saved */
        allow_save?: td_Bool;
    }
    
    
    /** Sends a filled-out payment form to the bot for final verification */
    export interface td_sendPaymentForm {
        '@type': 'sendPaymentForm';
        /** Chat identifier of the Invoice message */
        chat_id?: td_int53;
        /** Message identifier */
        message_id?: td_int53;
        /** Payment form identifier returned by getPaymentForm */
        payment_form_id?: td_int64;
        /** Identifier returned by validateOrderInfo, or an empty string */
        order_info_id?: td_string;
        /** Identifier of a chosen shipping option, if applicable */
        shipping_option_id?: td_string;
        /** The credentials chosen by user for payment */
        credentials?: td_InputCredentials;
        /** Chosen by the user amount of tip in the smallest units of the currency */
        tip_amount?: td_int53;
    }
    
    
    /** Returns information about a successful payment */
    export interface td_getPaymentReceipt {
        '@type': 'getPaymentReceipt';
        /** Chat identifier of the PaymentSuccessful message */
        chat_id?: td_int53;
        /** Message identifier */
        message_id?: td_int53;
    }
    
    
    /** Returns saved order info, if any */
    export interface td_getSavedOrderInfo {
        '@type': 'getSavedOrderInfo';
    }
    
    
    /** Deletes saved order info */
    export interface td_deleteSavedOrderInfo {
        '@type': 'deleteSavedOrderInfo';
    }
    
    
    /** Deletes saved credentials for all payment provider bots */
    export interface td_deleteSavedCredentials {
        '@type': 'deleteSavedCredentials';
    }
    
    
    /** Returns a user that can be contacted to get support */
    export interface td_getSupportUser {
        '@type': 'getSupportUser';
    }
    
    
    /** Returns backgrounds installed by the user */
    export interface td_getBackgrounds {
        '@type': 'getBackgrounds';
        /** True, if the backgrounds must be ordered for dark theme */
        for_dark_theme?: td_Bool;
    }
    
    
    /** Constructs a persistent HTTP URL for a background */
    export interface td_getBackgroundUrl {
        '@type': 'getBackgroundUrl';
        /** Background name */
        name?: td_string;
        /** Background type */
        type?: td_BackgroundType;
    }
    
    
    /** Searches for a background by its name */
    export interface td_searchBackground {
        '@type': 'searchBackground';
        /** The name of the background */
        name?: td_string;
    }
    
    
    /** Changes the background selected by the user; adds background to the list of installed backgrounds */
    export interface td_setBackground {
        '@type': 'setBackground';
        /** The input background to use; pass null to create a new filled backgrounds or to remove the current background */
        background?: td_InputBackground;
        /** Background type; pass null to use the default type of the remote background or to remove the current background */
        type?: td_BackgroundType;
        /** True, if the background is chosen for dark theme */
        for_dark_theme?: td_Bool;
    }
    
    
    /** Removes background from the list of installed backgrounds */
    export interface td_removeBackground {
        '@type': 'removeBackground';
        /** The background identifier */
        background_id?: td_int64;
    }
    
    
    /** Resets list of installed backgrounds to its default value */
    export interface td_resetBackgrounds {
        '@type': 'resetBackgrounds';
    }
    
    
    /** Returns information about the current localization target. This is an offline request if only_local is true. Can be called before authorization */
    export interface td_getLocalizationTargetInfo {
        '@type': 'getLocalizationTargetInfo';
        /** If true, returns only locally available information without sending network requests */
        only_local?: td_Bool;
    }
    
    
    /** Returns information about a language pack. Returned language pack identifier may be different from a provided one. Can be called before authorization */
    export interface td_getLanguagePackInfo {
        '@type': 'getLanguagePackInfo';
        /** Language pack identifier */
        language_pack_id?: td_string;
    }
    
    
    /** Returns strings from a language pack in the current localization target by their keys. Can be called before authorization */
    export interface td_getLanguagePackStrings {
        '@type': 'getLanguagePackStrings';
        /** Language pack identifier of the strings to be returned */
        language_pack_id?: td_string;
        /** Language pack keys of the strings to be returned; leave empty to request all available strings */
        keys?: td_vector<td_string>;
    }
    
    
    /** Fetches the latest versions of all strings from a language pack in the current localization target from the server. This method doesn't need to be called explicitly for the current used/base language packs. Can be called before authorization */
    export interface td_synchronizeLanguagePack {
        '@type': 'synchronizeLanguagePack';
        /** Language pack identifier */
        language_pack_id?: td_string;
    }
    
    
    /** Adds a custom server language pack to the list of installed language packs in current localization target. Can be called before authorization */
    export interface td_addCustomServerLanguagePack {
        '@type': 'addCustomServerLanguagePack';
        /** Identifier of a language pack to be added; may be different from a name that is used in an "https://t.me/setlanguage/" link */
        language_pack_id?: td_string;
    }
    
    
    /** Adds or changes a custom local language pack to the current localization target */
    export interface td_setCustomLanguagePack {
        '@type': 'setCustomLanguagePack';
        /** Information about the language pack. Language pack ID must start with 'X', consist only of English letters, digits and hyphens, and must not exceed 64 characters. Can be called before authorization */
        info?: td_languagePackInfo;
        /** Strings of the new language pack */
        strings?: td_vector<td_languagePackString>;
    }
    
    
    /** Edits information about a custom local language pack in the current localization target. Can be called before authorization */
    export interface td_editCustomLanguagePackInfo {
        '@type': 'editCustomLanguagePackInfo';
        /** New information about the custom local language pack */
        info?: td_languagePackInfo;
    }
    
    
    /** Adds, edits or deletes a string in a custom local language pack. Can be called before authorization */
    export interface td_setCustomLanguagePackString {
        '@type': 'setCustomLanguagePackString';
        /** Identifier of a previously added custom local language pack in the current localization target */
        language_pack_id?: td_string;
        /** New language pack string */
        new_string?: td_languagePackString;
    }
    
    
    /** Deletes all information about a language pack in the current localization target. The language pack which is currently in use (including base language pack) or is being synchronized can't be deleted. Can be called before authorization */
    export interface td_deleteLanguagePack {
        '@type': 'deleteLanguagePack';
        /** Identifier of the language pack to delete */
        language_pack_id?: td_string;
    }
    
    
    /** Registers the currently used device for receiving push notifications. Returns a globally unique identifier of the push notification subscription */
    export interface td_registerDevice {
        '@type': 'registerDevice';
        /** Device token */
        device_token?: td_DeviceToken;
        /** List of user identifiers of other users currently using the application */
        other_user_ids?: td_vector<td_int53>;
    }
    
    
    /** Handles a push notification. Returns error with code 406 if the push notification is not supported and connection to the server is required to fetch new data. Can be called before authorization */
    export interface td_processPushNotification {
        '@type': 'processPushNotification';
        /** JSON-encoded push notification payload with all fields sent by the server, and "google.sent_time" and "google.notification.sound" fields added */
        payload?: td_string;
    }
    
    
    /** Returns a globally unique push notification subscription identifier for identification of an account, which has received a push notification. Can be called synchronously */
    export interface td_getPushReceiverId {
        '@type': 'getPushReceiverId';
        /** JSON-encoded push notification payload */
        payload?: td_string;
    }
    
    
    /** Returns t.me URLs recently visited by a newly registered user */
    export interface td_getRecentlyVisitedTMeUrls {
        '@type': 'getRecentlyVisitedTMeUrls';
        /** Google Play referrer to identify the user */
        referrer?: td_string;
    }
    
    
    /** Changes user privacy settings */
    export interface td_setUserPrivacySettingRules {
        '@type': 'setUserPrivacySettingRules';
        /** The privacy setting */
        setting?: td_UserPrivacySetting;
        /** The new privacy rules */
        rules?: td_userPrivacySettingRules;
    }
    
    
    /** Returns the current privacy settings */
    export interface td_getUserPrivacySettingRules {
        '@type': 'getUserPrivacySettingRules';
        /** The privacy setting */
        setting?: td_UserPrivacySetting;
    }
    
    
    /** Returns the value of an option by its name. (Check the list of available options on https://core.telegram.org/tdlib/options.) Can be called before authorization */
    export interface td_getOption {
        '@type': 'getOption';
        /** The name of the option */
        name?: td_string;
    }
    
    
    /** Sets the value of an option. (Check the list of available options on https://core.telegram.org/tdlib/options.) Only writable options can be set. Can be called before authorization */
    export interface td_setOption {
        '@type': 'setOption';
        /** The name of the option */
        name?: td_string;
        /** The new value of the option; pass null to reset option value to a default value */
        value?: td_OptionValue;
    }
    
    
    /** Changes the period of inactivity after which the account of the current user will automatically be deleted */
    export interface td_setAccountTtl {
        '@type': 'setAccountTtl';
        /** New account TTL */
        ttl?: td_accountTtl;
    }
    
    
    /** Returns the period of inactivity after which the account of the current user will automatically be deleted */
    export interface td_getAccountTtl {
        '@type': 'getAccountTtl';
    }
    
    
    /** Deletes the account of the current user, deleting all information associated with the user from the server. The phone number of the account can be used to create a new account. Can be called before authorization when the current authorization state is authorizationStateWaitPassword */
    export interface td_deleteAccount {
        '@type': 'deleteAccount';
        /** The reason why the account was deleted; optional */
        reason?: td_string;
    }
    
    
    /** Removes a chat action bar without any other action */
    export interface td_removeChatActionBar {
        '@type': 'removeChatActionBar';
        /** Chat identifier */
        chat_id?: td_int53;
    }
    
    
    /** Reports a chat to the Telegram moderators. A chat can be reported only from the chat action bar, or if chat.can_be_reported */
    export interface td_reportChat {
        '@type': 'reportChat';
        /** Chat identifier */
        chat_id?: td_int53;
        /** Identifiers of reported messages, if any */
        message_ids?: td_vector<td_int53>;
        /** The reason for reporting the chat */
        reason?: td_ChatReportReason;
        /** Additional report details; 0-1024 characters */
        text?: td_string;
    }
    
    
    /** Reports a chat photo to the Telegram moderators. A chat photo can be reported only if chat.can_be_reported */
    export interface td_reportChatPhoto {
        '@type': 'reportChatPhoto';
        /** Chat identifier */
        chat_id?: td_int53;
        /** Identifier of the photo to report. Only full photos from chatPhoto can be reported */
        file_id?: td_int32;
        /** The reason for reporting the chat photo */
        reason?: td_ChatReportReason;
        /** Additional report details; 0-1024 characters */
        text?: td_string;
    }
    
    
    /** Returns detailed statistics about a chat. Currently, this method can be used only for supergroups and channels. Can be used only if supergroupFullInfo.can_get_statistics == true */
    export interface td_getChatStatistics {
        '@type': 'getChatStatistics';
        /** Chat identifier */
        chat_id?: td_int53;
        /** Pass true if a dark theme is used by the application */
        is_dark?: td_Bool;
    }
    
    
    /** Returns detailed statistics about a message. Can be used only if message.can_get_statistics == true */
    export interface td_getMessageStatistics {
        '@type': 'getMessageStatistics';
        /** Chat identifier */
        chat_id?: td_int53;
        /** Message identifier */
        message_id?: td_int53;
        /** Pass true if a dark theme is used by the application */
        is_dark?: td_Bool;
    }
    
    
    /** Loads an asynchronous or a zoomed in statistical graph */
    export interface td_getStatisticalGraph {
        '@type': 'getStatisticalGraph';
        /** Chat identifier */
        chat_id?: td_int53;
        /** The token for graph loading */
        token?: td_string;
        /** X-value for zoomed in graph or 0 otherwise */
        x?: td_int53;
    }
    
    
    /** Returns database statistics */
    export interface td_getDatabaseStatistics {
        '@type': 'getDatabaseStatistics';
    }
    
    
    /** Sets the current network type. Can be called before authorization. Calling this method forces all network connections to reopen, mitigating the delay in switching between different networks, so it must be called whenever the network is changed, even if the network type remains the same. -Network type is used to check whether the library can use the network at all and also for collecting detailed network data usage statistics */
    export interface td_setNetworkType {
        '@type': 'setNetworkType';
        /** The new network type; pass null to set network type to networkTypeOther */
        type?: td_NetworkType;
    }
    
    
    /** Returns network data usage statistics. Can be called before authorization */
    export interface td_getNetworkStatistics {
        '@type': 'getNetworkStatistics';
        /** If true, returns only data for the current library launch */
        only_current?: td_Bool;
    }
    
    
    /** Adds the specified data to data usage statistics. Can be called before authorization */
    export interface td_addNetworkStatistics {
        '@type': 'addNetworkStatistics';
        /** The network statistics entry with the data to be added to statistics */
        entry?: td_NetworkStatisticsEntry;
    }
    
    
    /** Resets all network data usage statistics to zero. Can be called before authorization */
    export interface td_resetNetworkStatistics {
        '@type': 'resetNetworkStatistics';
    }
    
    
    /** Returns auto-download settings presets for the current user */
    export interface td_getAutoDownloadSettingsPresets {
        '@type': 'getAutoDownloadSettingsPresets';
    }
    
    
    /** Sets auto-download settings */
    export interface td_setAutoDownloadSettings {
        '@type': 'setAutoDownloadSettings';
        /** New user auto-download settings */
        settings?: td_autoDownloadSettings;
        /** Type of the network for which the new settings are relevant */
        type?: td_NetworkType;
    }
    
    
    /** Returns information about a bank card */
    export interface td_getBankCardInfo {
        '@type': 'getBankCardInfo';
        /** The bank card number */
        bank_card_number?: td_string;
    }
    
    
    /** Returns one of the available Telegram Passport elements */
    export interface td_getPassportElement {
        '@type': 'getPassportElement';
        /** Telegram Passport element type */
        type?: td_PassportElementType;
        /** Password of the current user */
        password?: td_string;
    }
    
    
    /** Returns all available Telegram Passport elements */
    export interface td_getAllPassportElements {
        '@type': 'getAllPassportElements';
        /** Password of the current user */
        password?: td_string;
    }
    
    
    /** Adds an element to the user's Telegram Passport. May return an error with a message "PHONE_VERIFICATION_NEEDED" or "EMAIL_VERIFICATION_NEEDED" if the chosen phone number or the chosen email address must be verified first */
    export interface td_setPassportElement {
        '@type': 'setPassportElement';
        /** Input Telegram Passport element */
        element?: td_InputPassportElement;
        /** Password of the current user */
        password?: td_string;
    }
    
    
    /** Deletes a Telegram Passport element */
    export interface td_deletePassportElement {
        '@type': 'deletePassportElement';
        /** Element type */
        type?: td_PassportElementType;
    }
    
    
    /** Informs the user that some of the elements in their Telegram Passport contain errors; for bots only. The user will not be able to resend the elements, until the errors are fixed */
    export interface td_setPassportElementErrors {
        '@type': 'setPassportElementErrors';
        /** User identifier */
        user_id?: td_int53;
        /** The errors */
        errors?: td_vector<td_inputPassportElementError>;
    }
    
    
    /** Returns an IETF language tag of the language preferred in the country, which must be used to fill native fields in Telegram Passport personal details. Returns a 404 error if unknown */
    export interface td_getPreferredCountryLanguage {
        '@type': 'getPreferredCountryLanguage';
        /** A two-letter ISO 3166-1 alpha-2 country code */
        country_code?: td_string;
    }
    
    
    /** Sends a code to verify a phone number to be added to a user's Telegram Passport */
    export interface td_sendPhoneNumberVerificationCode {
        '@type': 'sendPhoneNumberVerificationCode';
        /** The phone number of the user, in international format */
        phone_number?: td_string;
        /** Settings for the authentication of the user's phone number; pass null to use default settings */
        settings?: td_phoneNumberAuthenticationSettings;
    }
    
    
    /** Re-sends the code to verify a phone number to be added to a user's Telegram Passport */
    export interface td_resendPhoneNumberVerificationCode {
        '@type': 'resendPhoneNumberVerificationCode';
    }
    
    
    /** Checks the phone number verification code for Telegram Passport */
    export interface td_checkPhoneNumberVerificationCode {
        '@type': 'checkPhoneNumberVerificationCode';
        /** Verification code to check */
        code?: td_string;
    }
    
    
    /** Sends a code to verify an email address to be added to a user's Telegram Passport */
    export interface td_sendEmailAddressVerificationCode {
        '@type': 'sendEmailAddressVerificationCode';
        /** Email address */
        email_address?: td_string;
    }
    
    
    /** Re-sends the code to verify an email address to be added to a user's Telegram Passport */
    export interface td_resendEmailAddressVerificationCode {
        '@type': 'resendEmailAddressVerificationCode';
    }
    
    
    /** Checks the email address verification code for Telegram Passport */
    export interface td_checkEmailAddressVerificationCode {
        '@type': 'checkEmailAddressVerificationCode';
        /** Verification code to check */
        code?: td_string;
    }
    
    
    /** Returns a Telegram Passport authorization form for sharing data with a service */
    export interface td_getPassportAuthorizationForm {
        '@type': 'getPassportAuthorizationForm';
        /** User identifier of the service's bot */
        bot_user_id?: td_int53;
        /** Telegram Passport element types requested by the service */
        scope?: td_string;
        /** Service's public key */
        public_key?: td_string;
        /** Unique request identifier provided by the service */
        nonce?: td_string;
    }
    
    
    /** Returns already available Telegram Passport elements suitable for completing a Telegram Passport authorization form. Result can be received only once for each authorization form */
    export interface td_getPassportAuthorizationFormAvailableElements {
        '@type': 'getPassportAuthorizationFormAvailableElements';
        /** Authorization form identifier */
        autorization_form_id?: td_int32;
        /** Password of the current user */
        password?: td_string;
    }
    
    
    /** Sends a Telegram Passport authorization form, effectively sharing data with the service. This method must be called after getPassportAuthorizationFormAvailableElements if some previously available elements are going to be reused */
    export interface td_sendPassportAuthorizationForm {
        '@type': 'sendPassportAuthorizationForm';
        /** Authorization form identifier */
        autorization_form_id?: td_int32;
        /** Types of Telegram Passport elements chosen by user to complete the authorization form */
        types?: td_vector<td_PassportElementType>;
    }
    
    
    /** Sends phone number confirmation code to handle links of the type internalLinkTypePhoneNumberConfirmation */
    export interface td_sendPhoneNumberConfirmationCode {
        '@type': 'sendPhoneNumberConfirmationCode';
        /** Hash value from the link */
        hash?: td_string;
        /** Phone number value from the link */
        phone_number?: td_string;
        /** Settings for the authentication of the user's phone number; pass null to use default settings */
        settings?: td_phoneNumberAuthenticationSettings;
    }
    
    
    /** Resends phone number confirmation code */
    export interface td_resendPhoneNumberConfirmationCode {
        '@type': 'resendPhoneNumberConfirmationCode';
    }
    
    
    /** Checks phone number confirmation code */
    export interface td_checkPhoneNumberConfirmationCode {
        '@type': 'checkPhoneNumberConfirmationCode';
        /** Confirmation code to check */
        code?: td_string;
    }
    
    
    /** Informs the server about the number of pending bot updates if they haven't been processed for a long time; for bots only */
    export interface td_setBotUpdatesStatus {
        '@type': 'setBotUpdatesStatus';
        /** The number of pending updates */
        pending_update_count?: td_int32;
        /** The last error message */
        error_message?: td_string;
    }
    
    
    /** Uploads a file with a sticker; returns the uploaded file */
    export interface td_uploadStickerFile {
        '@type': 'uploadStickerFile';
        /** Sticker file owner; ignored for regular users */
        user_id?: td_int53;
        /** Sticker file to upload */
        sticker?: td_InputSticker;
    }
    
    
    /** Returns a suggested name for a new sticker set with a given title */
    export interface td_getSuggestedStickerSetName {
        '@type': 'getSuggestedStickerSetName';
        /** Sticker set title; 1-64 characters */
        title?: td_string;
    }
    
    
    /** Checks whether a name can be used for a new sticker set */
    export interface td_checkStickerSetName {
        '@type': 'checkStickerSetName';
        /** Name to be checked */
        name?: td_string;
    }
    
    
    /** Creates a new sticker set. Returns the newly created sticker set */
    export interface td_createNewStickerSet {
        '@type': 'createNewStickerSet';
        /** Sticker set owner; ignored for regular users */
        user_id?: td_int53;
        /** Sticker set title; 1-64 characters */
        title?: td_string;
        /** Sticker set name. Can contain only English letters, digits and underscores. Must end with *"_by_<bot username>"* (*<bot_username>* is case insensitive) for bots; 1-64 characters */
        name?: td_string;
        /** True, if stickers are masks. Animated stickers can't be masks */
        is_masks?: td_Bool;
        /** List of stickers to be added to the set; must be non-empty. All stickers must be of the same type. For animated stickers, uploadStickerFile must be used before the sticker is shown */
        stickers?: td_vector<td_InputSticker>;
        /** Source of the sticker set; may be empty if unknown */
        source?: td_string;
    }
    
    
    /** Adds a new sticker to a set; for bots only. Returns the sticker set */
    export interface td_addStickerToSet {
        '@type': 'addStickerToSet';
        /** Sticker set owner */
        user_id?: td_int53;
        /** Sticker set name */
        name?: td_string;
        /** Sticker to add to the set */
        sticker?: td_InputSticker;
    }
    
    
    /** Sets a sticker set thumbnail; for bots only. Returns the sticker set */
    export interface td_setStickerSetThumbnail {
        '@type': 'setStickerSetThumbnail';
        /** Sticker set owner */
        user_id?: td_int53;
        /** Sticker set name */
        name?: td_string;
        /** Thumbnail to set in PNG or TGS format; pass null to remove the sticker set thumbnail. Animated thumbnail must be set for animated sticker sets and only for them */
        thumbnail?: td_InputFile;
    }
    
    
    /** Changes the position of a sticker in the set to which it belongs; for bots only. The sticker set must have been created by the bot */
    export interface td_setStickerPositionInSet {
        '@type': 'setStickerPositionInSet';
        /** Sticker */
        sticker?: td_InputFile;
        /** New position of the sticker in the set, zero-based */
        position?: td_int32;
    }
    
    
    /** Removes a sticker from the set to which it belongs; for bots only. The sticker set must have been created by the bot */
    export interface td_removeStickerFromSet {
        '@type': 'removeStickerFromSet';
        /** Sticker */
        sticker?: td_InputFile;
    }
    
    
    /** Returns information about a file with a map thumbnail in PNG format. Only map thumbnail files with size less than 1MB can be downloaded */
    export interface td_getMapThumbnailFile {
        '@type': 'getMapThumbnailFile';
        /** Location of the map center */
        location?: td_location;
        /** Map zoom level; 13-20 */
        zoom?: td_int32;
        /** Map width in pixels before applying scale; 16-1024 */
        width?: td_int32;
        /** Map height in pixels before applying scale; 16-1024 */
        height?: td_int32;
        /** Map scale; 1-3 */
        scale?: td_int32;
        /** Identifier of a chat, in which the thumbnail will be shown. Use 0 if unknown */
        chat_id?: td_int53;
    }
    
    
    /** Accepts Telegram terms of services */
    export interface td_acceptTermsOfService {
        '@type': 'acceptTermsOfService';
        /** Terms of service identifier */
        terms_of_service_id?: td_string;
    }
    
    
    /** Sends a custom request; for bots only */
    export interface td_sendCustomRequest {
        '@type': 'sendCustomRequest';
        /** The method name */
        method?: td_string;
        /** JSON-serialized method parameters */
        parameters?: td_string;
    }
    
    
    /** Answers a custom query; for bots only */
    export interface td_answerCustomQuery {
        '@type': 'answerCustomQuery';
        /** Identifier of a custom query */
        custom_query_id?: td_int64;
        /** JSON-serialized answer to the query */
        data?: td_string;
    }
    
    
    /** Succeeds after a specified amount of time has passed. Can be called before initialization */
    export interface td_setAlarm {
        '@type': 'setAlarm';
        /** Number of seconds before the function returns */
        seconds?: td_double;
    }
    
    
    /** Returns information about existing countries. Can be called before authorization */
    export interface td_getCountries {
        '@type': 'getCountries';
    }
    
    
    /** Uses the current IP address to find the current country. Returns two-letter ISO 3166-1 alpha-2 country code. Can be called before authorization */
    export interface td_getCountryCode {
        '@type': 'getCountryCode';
    }
    
    
    /** Returns information about a phone number by its prefix. Can be called before authorization */
    export interface td_getPhoneNumberInfo {
        '@type': 'getPhoneNumberInfo';
        /** The phone number prefix */
        phone_number_prefix?: td_string;
    }
    
    
    /** Returns information about a phone number by its prefix synchronously. getCountries must be called at least once after changing localization to the specified language if properly localized country information is expected. Can be called synchronously */
    export interface td_getPhoneNumberInfoSync {
        '@type': 'getPhoneNumberInfoSync';
        /** A two-letter ISO 639-1 country code for country information localization */
        language_code?: td_string;
        /** The phone number prefix */
        phone_number_prefix?: td_string;
    }
    
    
    /** Returns the link for downloading official Telegram application to be used when the current user invites friends to Telegram */
    export interface td_getApplicationDownloadLink {
        '@type': 'getApplicationDownloadLink';
    }
    
    
    /** Returns information about a tg:// deep link. Use "tg://need_update_for_some_feature" or "tg:some_unsupported_feature" for testing. Returns a 404 error for unknown links. Can be called before authorization */
    export interface td_getDeepLinkInfo {
        '@type': 'getDeepLinkInfo';
        /** The link */
        link?: td_string;
    }
    
    
    /** Returns application config, provided by the server. Can be called before authorization */
    export interface td_getApplicationConfig {
        '@type': 'getApplicationConfig';
    }
    
    
    /** Saves application log event on the server. Can be called before authorization */
    export interface td_saveApplicationLogEvent {
        '@type': 'saveApplicationLogEvent';
        /** Event type */
        type?: td_string;
        /** Optional chat identifier, associated with the event */
        chat_id?: td_int53;
        /** The log event data */
        data?: td_JsonValue;
    }
    
    
    /** Edits an existing proxy server for network requests. Can be called before authorization */
    export interface td_editProxy {
        '@type': 'editProxy';
        /** Proxy identifier */
        proxy_id?: td_int32;
        /** Proxy server IP address */
        server?: td_string;
        /** Proxy server port */
        port?: td_int32;
        /** True, if the proxy needs to be enabled */
        enable?: td_Bool;
        /** Proxy type */
        type?: td_ProxyType;
    }
    
    
    /** Enables a proxy. Only one proxy can be enabled at a time. Can be called before authorization */
    export interface td_enableProxy {
        '@type': 'enableProxy';
        /** Proxy identifier */
        proxy_id?: td_int32;
    }
    
    
    /** Disables the currently enabled proxy. Can be called before authorization */
    export interface td_disableProxy {
        '@type': 'disableProxy';
    }
    
    
    /** Removes a proxy server. Can be called before authorization */
    export interface td_removeProxy {
        '@type': 'removeProxy';
        /** Proxy identifier */
        proxy_id?: td_int32;
    }
    
    
    /** Returns list of proxies that are currently set up. Can be called before authorization */
    export interface td_getProxies {
        '@type': 'getProxies';
    }
    
    
    /** Returns an HTTPS link, which can be used to add a proxy. Available only for SOCKS5 and MTProto proxies. Can be called before authorization */
    export interface td_getProxyLink {
        '@type': 'getProxyLink';
        /** Proxy identifier */
        proxy_id?: td_int32;
    }
    
    
    /** Computes time needed to receive a response from a Telegram server through a proxy. Can be called before authorization */
    export interface td_pingProxy {
        '@type': 'pingProxy';
        /** Proxy identifier. Use 0 to ping a Telegram server without a proxy */
        proxy_id?: td_int32;
    }
    
    
    /** Sets new log stream for internal logging of TDLib. Can be called synchronously */
    export interface td_setLogStream {
        '@type': 'setLogStream';
        /** New log stream */
        log_stream?: td_LogStream;
    }
    
    
    /** Returns information about currently used log stream for internal logging of TDLib. Can be called synchronously */
    export interface td_getLogStream {
        '@type': 'getLogStream';
    }
    
    
    /** Sets the verbosity level of the internal logging of TDLib. Can be called synchronously */
    export interface td_setLogVerbosityLevel {
        '@type': 'setLogVerbosityLevel';
        /** New value of the verbosity level for logging. Value 0 corresponds to fatal errors, value 1 corresponds to errors, value 2 corresponds to warnings and debug warnings, value 3 corresponds to informational, value 4 corresponds to debug, value 5 corresponds to verbose debug, value greater than 5 and up to 1023 can be used to enable even more logging */
        new_verbosity_level?: td_int32;
    }
    
    
    /** Returns current verbosity level of the internal logging of TDLib. Can be called synchronously */
    export interface td_getLogVerbosityLevel {
        '@type': 'getLogVerbosityLevel';
    }
    
    
    /** Returns list of available TDLib internal log tags, for example, ["actor", "binlog", "connections", "notifications", "proxy"]. Can be called synchronously */
    export interface td_getLogTags {
        '@type': 'getLogTags';
    }
    
    
    /** Sets the verbosity level for a specified TDLib internal log tag. Can be called synchronously */
    export interface td_setLogTagVerbosityLevel {
        '@type': 'setLogTagVerbosityLevel';
        /** Logging tag to change verbosity level */
        tag?: td_string;
        /** New verbosity level; 1-1024 */
        new_verbosity_level?: td_int32;
    }
    
    
    /** Returns current verbosity level for a specified TDLib internal log tag. Can be called synchronously */
    export interface td_getLogTagVerbosityLevel {
        '@type': 'getLogTagVerbosityLevel';
        /** Logging tag to change verbosity level */
        tag?: td_string;
    }
    
    
    /** Adds a message to TDLib internal log. Can be called synchronously */
    export interface td_addLogMessage {
        '@type': 'addLogMessage';
        /** The minimum verbosity level needed for the message to be logged; 0-1023 */
        verbosity_level?: td_int32;
        /** Text of a message to log */
        text?: td_string;
    }
    
    
    /** Does nothing; for testing only. This is an offline method. Can be called before authorization */
    export interface td_testCallEmpty {
        '@type': 'testCallEmpty';
    }
    
    
    /** Returns the received string; for testing only. This is an offline method. Can be called before authorization */
    export interface td_testCallString {
        '@type': 'testCallString';
        /** String to return */
        x?: td_string;
    }
    
    
    /** Returns the received bytes; for testing only. This is an offline method. Can be called before authorization */
    export interface td_testCallBytes {
        '@type': 'testCallBytes';
        /** Bytes to return */
        x?: td_bytes;
    }
    
    
    /** Returns the received vector of numbers; for testing only. This is an offline method. Can be called before authorization */
    export interface td_testCallVectorInt {
        '@type': 'testCallVectorInt';
        /** Vector of numbers to return */
        x?: td_vector<td_int32>;
    }
    
    
    /** Returns the received vector of objects containing a number; for testing only. This is an offline method. Can be called before authorization */
    export interface td_testCallVectorIntObject {
        '@type': 'testCallVectorIntObject';
        /** Vector of objects to return */
        x?: td_vector<td_testInt>;
    }
    
    
    /** Returns the received vector of strings; for testing only. This is an offline method. Can be called before authorization */
    export interface td_testCallVectorString {
        '@type': 'testCallVectorString';
        /** Vector of strings to return */
        x?: td_vector<td_string>;
    }
    
    
    /** Returns the received vector of objects containing a string; for testing only. This is an offline method. Can be called before authorization */
    export interface td_testCallVectorStringObject {
        '@type': 'testCallVectorStringObject';
        /** Vector of objects to return */
        x?: td_vector<td_testString>;
    }
    
    
    /** Returns the squared received number; for testing only. This is an offline method. Can be called before authorization */
    export interface td_testSquareInt {
        '@type': 'testSquareInt';
        /** Number to square */
        x?: td_int32;
    }
    
    
    /** Sends a simple network request to the Telegram servers; for testing only. Can be called before authorization */
    export interface td_testNetwork {
        '@type': 'testNetwork';
    }
    
    
    /** Sends a simple network request to the Telegram servers via proxy; for testing only. Can be called before authorization */
    export interface td_testProxy {
        '@type': 'testProxy';
        /** Proxy server IP address */
        server?: td_string;
        /** Proxy server port */
        port?: td_int32;
        /** Proxy type */
        type?: td_ProxyType;
        /** Identifier of a datacenter, with which to test connection */
        dc_id?: td_int32;
        /** The maximum overall timeout for the request */
        timeout?: td_double;
    }
    
    
    /** Forces an updates.getDifference call to the Telegram servers; for testing only */
    export interface td_testGetDifference {
        '@type': 'testGetDifference';
    }
    
    
    /** Does nothing and ensures that the Update object is used; for testing only. This is an offline method. Can be called before authorization */
    export interface td_testUseUpdate {
        '@type': 'testUseUpdate';
    }
    
    
    /** Returns the specified error and ensures that the Error object is used; for testing only. Can be called synchronously */
    export interface td_testReturnError {
        '@type': 'testReturnError';
        /** The error to be returned */
        error?: td_error;
    }
    
    
    /** Changes the verbosity level of TDWeb logging */
    export interface td_setJsLogVerbosityLevel {
        '@type': 'setJsLogVerbosityLevel';
        /** New value of the verbosity level for logging. */
        new_verbosity_level?: td_jsLogLevel;
    }
    
    export type TdFunction = td_getAuthorizationState | td_setTdlibParameters | td_checkDatabaseEncryptionKey | td_setAuthenticationPhoneNumber | td_resendAuthenticationCode | td_checkAuthenticationCode | td_requestQrCodeAuthentication | td_registerUser | td_checkAuthenticationPassword | td_requestAuthenticationPasswordRecovery | td_checkAuthenticationPasswordRecoveryCode | td_recoverAuthenticationPassword | td_checkAuthenticationBotToken | td_logOut | td_close | td_destroy | td_confirmQrCodeAuthentication | td_getCurrentState | td_setDatabaseEncryptionKey | td_getPasswordState | td_setPassword | td_getRecoveryEmailAddress | td_setRecoveryEmailAddress | td_checkRecoveryEmailAddressCode | td_resendRecoveryEmailAddressCode | td_requestPasswordRecovery | td_checkPasswordRecoveryCode | td_recoverPassword | td_resetPassword | td_cancelPasswordReset | td_createTemporaryPassword | td_getTemporaryPasswordState | td_getMe | td_getUser | td_getUserFullInfo | td_getBasicGroup | td_getBasicGroupFullInfo | td_getSupergroup | td_getSupergroupFullInfo | td_getSecretChat | td_getChat | td_getMessage | td_getMessageLocally | td_getRepliedMessage | td_getChatPinnedMessage | td_getCallbackQueryMessage | td_getMessages | td_getMessageThread | td_getMessageViewers | td_getFile | td_getRemoteFile | td_loadChats | td_getChats | td_searchPublicChat | td_searchPublicChats | td_searchChats | td_searchChatsOnServer | td_searchChatsNearby | td_getTopChats | td_removeTopChat | td_addRecentlyFoundChat | td_removeRecentlyFoundChat | td_clearRecentlyFoundChats | td_getRecentlyOpenedChats | td_checkChatUsername | td_getCreatedPublicChats | td_checkCreatedPublicChatsLimit | td_getSuitableDiscussionChats | td_getInactiveSupergroupChats | td_getGroupsInCommon | td_getChatHistory | td_getMessageThreadHistory | td_deleteChatHistory | td_deleteChat | td_searchChatMessages | td_searchMessages | td_searchSecretMessages | td_searchCallMessages | td_deleteAllCallMessages | td_searchChatRecentLocationMessages | td_getActiveLiveLocationMessages | td_getChatMessageByDate | td_getChatSparseMessagePositions | td_getChatMessageCalendar | td_getChatMessageCount | td_getChatScheduledMessages | td_getMessagePublicForwards | td_getChatSponsoredMessage | td_removeNotification | td_removeNotificationGroup | td_getMessageLink | td_getMessageEmbeddingCode | td_getMessageLinkInfo | td_getChatAvailableMessageSenders | td_setChatMessageSender | td_sendMessage | td_sendMessageAlbum | td_sendBotStartMessage | td_sendInlineQueryResultMessage | td_forwardMessages | td_resendMessages | td_sendChatScreenshotTakenNotification | td_addLocalMessage | td_deleteMessages | td_deleteChatMessagesBySender | td_deleteChatMessagesByDate | td_editMessageText | td_editMessageLiveLocation | td_editMessageMedia | td_editMessageCaption | td_editMessageReplyMarkup | td_editInlineMessageText | td_editInlineMessageLiveLocation | td_editInlineMessageMedia | td_editInlineMessageCaption | td_editInlineMessageReplyMarkup | td_editMessageSchedulingState | td_getTextEntities | td_parseTextEntities | td_parseMarkdown | td_getMarkdownText | td_getFileMimeType | td_getFileExtension | td_cleanFileName | td_getLanguagePackString | td_getJsonValue | td_getJsonString | td_setPollAnswer | td_getPollVoters | td_stopPoll | td_hideSuggestedAction | td_getLoginUrlInfo | td_getLoginUrl | td_getInlineQueryResults | td_answerInlineQuery | td_getCallbackQueryAnswer | td_answerCallbackQuery | td_answerShippingQuery | td_answerPreCheckoutQuery | td_setGameScore | td_setInlineGameScore | td_getGameHighScores | td_getInlineGameHighScores | td_deleteChatReplyMarkup | td_sendChatAction | td_openChat | td_closeChat | td_viewMessages | td_openMessageContent | td_clickAnimatedEmojiMessage | td_getInternalLinkType | td_getExternalLinkInfo | td_getExternalLink | td_readAllChatMentions | td_createPrivateChat | td_createBasicGroupChat | td_createSupergroupChat | td_createSecretChat | td_createNewBasicGroupChat | td_createNewSupergroupChat | td_createNewSecretChat | td_upgradeBasicGroupChatToSupergroupChat | td_getChatListsToAddChat | td_addChatToList | td_getChatFilter | td_createChatFilter | td_editChatFilter | td_deleteChatFilter | td_reorderChatFilters | td_getRecommendedChatFilters | td_getChatFilterDefaultIconName | td_setChatTitle | td_setChatPhoto | td_setChatMessageTtl | td_setChatPermissions | td_setChatTheme | td_setChatDraftMessage | td_setChatNotificationSettings | td_toggleChatHasProtectedContent | td_toggleChatIsMarkedAsUnread | td_toggleChatDefaultDisableNotification | td_setChatClientData | td_setChatDescription | td_setChatDiscussionGroup | td_setChatLocation | td_setChatSlowModeDelay | td_pinChatMessage | td_unpinChatMessage | td_unpinAllChatMessages | td_joinChat | td_leaveChat | td_addChatMember | td_addChatMembers | td_setChatMemberStatus | td_banChatMember | td_canTransferOwnership | td_transferChatOwnership | td_getChatMember | td_searchChatMembers | td_getChatAdministrators | td_clearAllDraftMessages | td_getChatNotificationSettingsExceptions | td_getScopeNotificationSettings | td_setScopeNotificationSettings | td_resetAllNotificationSettings | td_toggleChatIsPinned | td_setPinnedChats | td_downloadFile | td_cancelDownloadFile | td_getSuggestedFileName | td_uploadFile | td_cancelUploadFile | td_writeGeneratedFilePart | td_setFileGenerationProgress | td_finishFileGeneration | td_readFilePart | td_deleteFile | td_getMessageFileType | td_getMessageImportConfirmationText | td_importMessages | td_replacePrimaryChatInviteLink | td_createChatInviteLink | td_editChatInviteLink | td_getChatInviteLink | td_getChatInviteLinkCounts | td_getChatInviteLinks | td_getChatInviteLinkMembers | td_revokeChatInviteLink | td_deleteRevokedChatInviteLink | td_deleteAllRevokedChatInviteLinks | td_checkChatInviteLink | td_joinChatByInviteLink | td_getChatJoinRequests | td_processChatJoinRequest | td_processChatJoinRequests | td_createCall | td_acceptCall | td_sendCallSignalingData | td_discardCall | td_sendCallRating | td_sendCallDebugInformation | td_getVideoChatAvailableParticipants | td_setVideoChatDefaultParticipant | td_createVideoChat | td_getGroupCall | td_startScheduledGroupCall | td_toggleGroupCallEnabledStartNotification | td_joinGroupCall | td_startGroupCallScreenSharing | td_toggleGroupCallScreenSharingIsPaused | td_endGroupCallScreenSharing | td_setGroupCallTitle | td_toggleGroupCallMuteNewParticipants | td_inviteGroupCallParticipants | td_getGroupCallInviteLink | td_revokeGroupCallInviteLink | td_startGroupCallRecording | td_endGroupCallRecording | td_toggleGroupCallIsMyVideoPaused | td_toggleGroupCallIsMyVideoEnabled | td_setGroupCallParticipantIsSpeaking | td_toggleGroupCallParticipantIsMuted | td_setGroupCallParticipantVolumeLevel | td_toggleGroupCallParticipantIsHandRaised | td_loadGroupCallParticipants | td_leaveGroupCall | td_endGroupCall | td_getGroupCallStreamSegment | td_toggleMessageSenderIsBlocked | td_blockMessageSenderFromReplies | td_getBlockedMessageSenders | td_addContact | td_importContacts | td_getContacts | td_searchContacts | td_removeContacts | td_getImportedContactCount | td_changeImportedContacts | td_clearImportedContacts | td_sharePhoneNumber | td_getUserProfilePhotos | td_getStickers | td_searchStickers | td_getInstalledStickerSets | td_getArchivedStickerSets | td_getTrendingStickerSets | td_getAttachedStickerSets | td_getStickerSet | td_searchStickerSet | td_searchInstalledStickerSets | td_searchStickerSets | td_changeStickerSet | td_viewTrendingStickerSets | td_reorderInstalledStickerSets | td_getRecentStickers | td_addRecentSticker | td_removeRecentSticker | td_clearRecentStickers | td_getFavoriteStickers | td_addFavoriteSticker | td_removeFavoriteSticker | td_getStickerEmojis | td_searchEmojis | td_getAnimatedEmoji | td_getEmojiSuggestionsUrl | td_getSavedAnimations | td_addSavedAnimation | td_removeSavedAnimation | td_getRecentInlineBots | td_searchHashtags | td_removeRecentHashtag | td_getWebPagePreview | td_getWebPageInstantView | td_setProfilePhoto | td_deleteProfilePhoto | td_setName | td_setBio | td_setUsername | td_setLocation | td_changePhoneNumber | td_resendChangePhoneNumberCode | td_checkChangePhoneNumberCode | td_setCommands | td_deleteCommands | td_getCommands | td_getActiveSessions | td_terminateSession | td_terminateAllOtherSessions | td_toggleSessionCanAcceptCalls | td_toggleSessionCanAcceptSecretChats | td_setInactiveSessionTtl | td_getConnectedWebsites | td_disconnectWebsite | td_disconnectAllWebsites | td_setSupergroupUsername | td_setSupergroupStickerSet | td_toggleSupergroupSignMessages | td_toggleSupergroupIsAllHistoryAvailable | td_toggleSupergroupIsBroadcastGroup | td_reportSupergroupSpam | td_getSupergroupMembers | td_closeSecretChat | td_getChatEventLog | td_getPaymentForm | td_validateOrderInfo | td_sendPaymentForm | td_getPaymentReceipt | td_getSavedOrderInfo | td_deleteSavedOrderInfo | td_deleteSavedCredentials | td_getSupportUser | td_getBackgrounds | td_getBackgroundUrl | td_searchBackground | td_setBackground | td_removeBackground | td_resetBackgrounds | td_getLocalizationTargetInfo | td_getLanguagePackInfo | td_getLanguagePackStrings | td_synchronizeLanguagePack | td_addCustomServerLanguagePack | td_setCustomLanguagePack | td_editCustomLanguagePackInfo | td_setCustomLanguagePackString | td_deleteLanguagePack | td_registerDevice | td_processPushNotification | td_getPushReceiverId | td_getRecentlyVisitedTMeUrls | td_setUserPrivacySettingRules | td_getUserPrivacySettingRules | td_getOption | td_setOption | td_setAccountTtl | td_getAccountTtl | td_deleteAccount | td_removeChatActionBar | td_reportChat | td_reportChatPhoto | td_getChatStatistics | td_getMessageStatistics | td_getStatisticalGraph | td_getDatabaseStatistics | td_setNetworkType | td_getNetworkStatistics | td_addNetworkStatistics | td_resetNetworkStatistics | td_getAutoDownloadSettingsPresets | td_setAutoDownloadSettings | td_getBankCardInfo | td_getPassportElement | td_getAllPassportElements | td_setPassportElement | td_deletePassportElement | td_setPassportElementErrors | td_getPreferredCountryLanguage | td_sendPhoneNumberVerificationCode | td_resendPhoneNumberVerificationCode | td_checkPhoneNumberVerificationCode | td_sendEmailAddressVerificationCode | td_resendEmailAddressVerificationCode | td_checkEmailAddressVerificationCode | td_getPassportAuthorizationForm | td_getPassportAuthorizationFormAvailableElements | td_sendPassportAuthorizationForm | td_sendPhoneNumberConfirmationCode | td_resendPhoneNumberConfirmationCode | td_checkPhoneNumberConfirmationCode | td_setBotUpdatesStatus | td_uploadStickerFile | td_getSuggestedStickerSetName | td_checkStickerSetName | td_createNewStickerSet | td_addStickerToSet | td_setStickerSetThumbnail | td_setStickerPositionInSet | td_removeStickerFromSet | td_getMapThumbnailFile | td_acceptTermsOfService | td_sendCustomRequest | td_answerCustomQuery | td_setAlarm | td_getCountries | td_getCountryCode | td_getPhoneNumberInfo | td_getPhoneNumberInfoSync | td_getApplicationDownloadLink | td_getDeepLinkInfo | td_getApplicationConfig | td_saveApplicationLogEvent | td_editProxy | td_enableProxy | td_disableProxy | td_removeProxy | td_getProxies | td_getProxyLink | td_pingProxy | td_setLogStream | td_getLogStream | td_setLogVerbosityLevel | td_getLogVerbosityLevel | td_getLogTags | td_setLogTagVerbosityLevel | td_getLogTagVerbosityLevel | td_addLogMessage | td_testCallEmpty | td_testCallString | td_testCallBytes | td_testCallVectorInt | td_testCallVectorIntObject | td_testCallVectorString | td_testCallVectorStringObject | td_testSquareInt | td_testNetwork | td_testProxy | td_testGetDifference | td_testUseUpdate | td_testReturnError | td_setJsLogVerbosityLevel;
    export type TdFunctionReturn<t> = 
    t extends td_getAuthorizationState ? td_AuthorizationState :
        t extends td_setTdlibParameters ? td_Ok :
        t extends td_checkDatabaseEncryptionKey ? td_Ok :
        t extends td_setAuthenticationPhoneNumber ? td_Ok :
        t extends td_resendAuthenticationCode ? td_Ok :
        t extends td_checkAuthenticationCode ? td_Ok :
        t extends td_requestQrCodeAuthentication ? td_Ok :
        t extends td_registerUser ? td_Ok :
        t extends td_checkAuthenticationPassword ? td_Ok :
        t extends td_requestAuthenticationPasswordRecovery ? td_Ok :
        t extends td_checkAuthenticationPasswordRecoveryCode ? td_Ok :
        t extends td_recoverAuthenticationPassword ? td_Ok :
        t extends td_checkAuthenticationBotToken ? td_Ok :
        t extends td_logOut ? td_Ok :
        t extends td_close ? td_Ok :
        t extends td_destroy ? td_Ok :
        t extends td_confirmQrCodeAuthentication ? td_Session :
        t extends td_getCurrentState ? td_Updates :
        t extends td_setDatabaseEncryptionKey ? td_Ok :
        t extends td_getPasswordState ? td_PasswordState :
        t extends td_setPassword ? td_PasswordState :
        t extends td_getRecoveryEmailAddress ? td_RecoveryEmailAddress :
        t extends td_setRecoveryEmailAddress ? td_PasswordState :
        t extends td_checkRecoveryEmailAddressCode ? td_PasswordState :
        t extends td_resendRecoveryEmailAddressCode ? td_PasswordState :
        t extends td_requestPasswordRecovery ? td_EmailAddressAuthenticationCodeInfo :
        t extends td_checkPasswordRecoveryCode ? td_Ok :
        t extends td_recoverPassword ? td_PasswordState :
        t extends td_resetPassword ? td_ResetPasswordResult :
        t extends td_cancelPasswordReset ? td_Ok :
        t extends td_createTemporaryPassword ? td_TemporaryPasswordState :
        t extends td_getTemporaryPasswordState ? td_TemporaryPasswordState :
        t extends td_getMe ? td_User :
        t extends td_getUser ? td_User :
        t extends td_getUserFullInfo ? td_UserFullInfo :
        t extends td_getBasicGroup ? td_BasicGroup :
        t extends td_getBasicGroupFullInfo ? td_BasicGroupFullInfo :
        t extends td_getSupergroup ? td_Supergroup :
        t extends td_getSupergroupFullInfo ? td_SupergroupFullInfo :
        t extends td_getSecretChat ? td_SecretChat :
        t extends td_getChat ? td_Chat :
        t extends td_getMessage ? td_Message :
        t extends td_getMessageLocally ? td_Message :
        t extends td_getRepliedMessage ? td_Message :
        t extends td_getChatPinnedMessage ? td_Message :
        t extends td_getCallbackQueryMessage ? td_Message :
        t extends td_getMessages ? td_Messages :
        t extends td_getMessageThread ? td_MessageThreadInfo :
        t extends td_getMessageViewers ? td_Users :
        t extends td_getFile ? td_File :
        t extends td_getRemoteFile ? td_File :
        t extends td_loadChats ? td_Ok :
        t extends td_getChats ? td_Chats :
        t extends td_searchPublicChat ? td_Chat :
        t extends td_searchPublicChats ? td_Chats :
        t extends td_searchChats ? td_Chats :
        t extends td_searchChatsOnServer ? td_Chats :
        t extends td_searchChatsNearby ? td_ChatsNearby :
        t extends td_getTopChats ? td_Chats :
        t extends td_removeTopChat ? td_Ok :
        t extends td_addRecentlyFoundChat ? td_Ok :
        t extends td_removeRecentlyFoundChat ? td_Ok :
        t extends td_clearRecentlyFoundChats ? td_Ok :
        t extends td_getRecentlyOpenedChats ? td_Chats :
        t extends td_checkChatUsername ? td_CheckChatUsernameResult :
        t extends td_getCreatedPublicChats ? td_Chats :
        t extends td_checkCreatedPublicChatsLimit ? td_Ok :
        t extends td_getSuitableDiscussionChats ? td_Chats :
        t extends td_getInactiveSupergroupChats ? td_Chats :
        t extends td_getGroupsInCommon ? td_Chats :
        t extends td_getChatHistory ? td_Messages :
        t extends td_getMessageThreadHistory ? td_Messages :
        t extends td_deleteChatHistory ? td_Ok :
        t extends td_deleteChat ? td_Ok :
        t extends td_searchChatMessages ? td_Messages :
        t extends td_searchMessages ? td_Messages :
        t extends td_searchSecretMessages ? td_FoundMessages :
        t extends td_searchCallMessages ? td_Messages :
        t extends td_deleteAllCallMessages ? td_Ok :
        t extends td_searchChatRecentLocationMessages ? td_Messages :
        t extends td_getActiveLiveLocationMessages ? td_Messages :
        t extends td_getChatMessageByDate ? td_Message :
        t extends td_getChatSparseMessagePositions ? td_MessagePositions :
        t extends td_getChatMessageCalendar ? td_MessageCalendar :
        t extends td_getChatMessageCount ? td_Count :
        t extends td_getChatScheduledMessages ? td_Messages :
        t extends td_getMessagePublicForwards ? td_FoundMessages :
        t extends td_getChatSponsoredMessage ? td_SponsoredMessage :
        t extends td_removeNotification ? td_Ok :
        t extends td_removeNotificationGroup ? td_Ok :
        t extends td_getMessageLink ? td_MessageLink :
        t extends td_getMessageEmbeddingCode ? td_Text :
        t extends td_getMessageLinkInfo ? td_MessageLinkInfo :
        t extends td_getChatAvailableMessageSenders ? td_MessageSenders :
        t extends td_setChatMessageSender ? td_Ok :
        t extends td_sendMessage ? td_Message :
        t extends td_sendMessageAlbum ? td_Messages :
        t extends td_sendBotStartMessage ? td_Message :
        t extends td_sendInlineQueryResultMessage ? td_Message :
        t extends td_forwardMessages ? td_Messages :
        t extends td_resendMessages ? td_Messages :
        t extends td_sendChatScreenshotTakenNotification ? td_Ok :
        t extends td_addLocalMessage ? td_Message :
        t extends td_deleteMessages ? td_Ok :
        t extends td_deleteChatMessagesBySender ? td_Ok :
        t extends td_deleteChatMessagesByDate ? td_Ok :
        t extends td_editMessageText ? td_Message :
        t extends td_editMessageLiveLocation ? td_Message :
        t extends td_editMessageMedia ? td_Message :
        t extends td_editMessageCaption ? td_Message :
        t extends td_editMessageReplyMarkup ? td_Message :
        t extends td_editInlineMessageText ? td_Ok :
        t extends td_editInlineMessageLiveLocation ? td_Ok :
        t extends td_editInlineMessageMedia ? td_Ok :
        t extends td_editInlineMessageCaption ? td_Ok :
        t extends td_editInlineMessageReplyMarkup ? td_Ok :
        t extends td_editMessageSchedulingState ? td_Ok :
        t extends td_getTextEntities ? td_TextEntities :
        t extends td_parseTextEntities ? td_FormattedText :
        t extends td_parseMarkdown ? td_FormattedText :
        t extends td_getMarkdownText ? td_FormattedText :
        t extends td_getFileMimeType ? td_Text :
        t extends td_getFileExtension ? td_Text :
        t extends td_cleanFileName ? td_Text :
        t extends td_getLanguagePackString ? td_LanguagePackStringValue :
        t extends td_getJsonValue ? td_JsonValue :
        t extends td_getJsonString ? td_Text :
        t extends td_setPollAnswer ? td_Ok :
        t extends td_getPollVoters ? td_Users :
        t extends td_stopPoll ? td_Ok :
        t extends td_hideSuggestedAction ? td_Ok :
        t extends td_getLoginUrlInfo ? td_LoginUrlInfo :
        t extends td_getLoginUrl ? td_HttpUrl :
        t extends td_getInlineQueryResults ? td_InlineQueryResults :
        t extends td_answerInlineQuery ? td_Ok :
        t extends td_getCallbackQueryAnswer ? td_CallbackQueryAnswer :
        t extends td_answerCallbackQuery ? td_Ok :
        t extends td_answerShippingQuery ? td_Ok :
        t extends td_answerPreCheckoutQuery ? td_Ok :
        t extends td_setGameScore ? td_Message :
        t extends td_setInlineGameScore ? td_Ok :
        t extends td_getGameHighScores ? td_GameHighScores :
        t extends td_getInlineGameHighScores ? td_GameHighScores :
        t extends td_deleteChatReplyMarkup ? td_Ok :
        t extends td_sendChatAction ? td_Ok :
        t extends td_openChat ? td_Ok :
        t extends td_closeChat ? td_Ok :
        t extends td_viewMessages ? td_Ok :
        t extends td_openMessageContent ? td_Ok :
        t extends td_clickAnimatedEmojiMessage ? td_Sticker :
        t extends td_getInternalLinkType ? td_InternalLinkType :
        t extends td_getExternalLinkInfo ? td_LoginUrlInfo :
        t extends td_getExternalLink ? td_HttpUrl :
        t extends td_readAllChatMentions ? td_Ok :
        t extends td_createPrivateChat ? td_Chat :
        t extends td_createBasicGroupChat ? td_Chat :
        t extends td_createSupergroupChat ? td_Chat :
        t extends td_createSecretChat ? td_Chat :
        t extends td_createNewBasicGroupChat ? td_Chat :
        t extends td_createNewSupergroupChat ? td_Chat :
        t extends td_createNewSecretChat ? td_Chat :
        t extends td_upgradeBasicGroupChatToSupergroupChat ? td_Chat :
        t extends td_getChatListsToAddChat ? td_ChatLists :
        t extends td_addChatToList ? td_Ok :
        t extends td_getChatFilter ? td_ChatFilter :
        t extends td_createChatFilter ? td_ChatFilterInfo :
        t extends td_editChatFilter ? td_ChatFilterInfo :
        t extends td_deleteChatFilter ? td_Ok :
        t extends td_reorderChatFilters ? td_Ok :
        t extends td_getRecommendedChatFilters ? td_RecommendedChatFilters :
        t extends td_getChatFilterDefaultIconName ? td_Text :
        t extends td_setChatTitle ? td_Ok :
        t extends td_setChatPhoto ? td_Ok :
        t extends td_setChatMessageTtl ? td_Ok :
        t extends td_setChatPermissions ? td_Ok :
        t extends td_setChatTheme ? td_Ok :
        t extends td_setChatDraftMessage ? td_Ok :
        t extends td_setChatNotificationSettings ? td_Ok :
        t extends td_toggleChatHasProtectedContent ? td_Ok :
        t extends td_toggleChatIsMarkedAsUnread ? td_Ok :
        t extends td_toggleChatDefaultDisableNotification ? td_Ok :
        t extends td_setChatClientData ? td_Ok :
        t extends td_setChatDescription ? td_Ok :
        t extends td_setChatDiscussionGroup ? td_Ok :
        t extends td_setChatLocation ? td_Ok :
        t extends td_setChatSlowModeDelay ? td_Ok :
        t extends td_pinChatMessage ? td_Ok :
        t extends td_unpinChatMessage ? td_Ok :
        t extends td_unpinAllChatMessages ? td_Ok :
        t extends td_joinChat ? td_Ok :
        t extends td_leaveChat ? td_Ok :
        t extends td_addChatMember ? td_Ok :
        t extends td_addChatMembers ? td_Ok :
        t extends td_setChatMemberStatus ? td_Ok :
        t extends td_banChatMember ? td_Ok :
        t extends td_canTransferOwnership ? td_CanTransferOwnershipResult :
        t extends td_transferChatOwnership ? td_Ok :
        t extends td_getChatMember ? td_ChatMember :
        t extends td_searchChatMembers ? td_ChatMembers :
        t extends td_getChatAdministrators ? td_ChatAdministrators :
        t extends td_clearAllDraftMessages ? td_Ok :
        t extends td_getChatNotificationSettingsExceptions ? td_Chats :
        t extends td_getScopeNotificationSettings ? td_ScopeNotificationSettings :
        t extends td_setScopeNotificationSettings ? td_Ok :
        t extends td_resetAllNotificationSettings ? td_Ok :
        t extends td_toggleChatIsPinned ? td_Ok :
        t extends td_setPinnedChats ? td_Ok :
        t extends td_downloadFile ? td_File :
        t extends td_cancelDownloadFile ? td_Ok :
        t extends td_getSuggestedFileName ? td_Text :
        t extends td_uploadFile ? td_File :
        t extends td_cancelUploadFile ? td_Ok :
        t extends td_writeGeneratedFilePart ? td_Ok :
        t extends td_setFileGenerationProgress ? td_Ok :
        t extends td_finishFileGeneration ? td_Ok :
        t extends td_readFilePart ? td_FilePart :
        t extends td_deleteFile ? td_Ok :
        t extends td_getMessageFileType ? td_MessageFileType :
        t extends td_getMessageImportConfirmationText ? td_Text :
        t extends td_importMessages ? td_Ok :
        t extends td_replacePrimaryChatInviteLink ? td_ChatInviteLink :
        t extends td_createChatInviteLink ? td_ChatInviteLink :
        t extends td_editChatInviteLink ? td_ChatInviteLink :
        t extends td_getChatInviteLink ? td_ChatInviteLink :
        t extends td_getChatInviteLinkCounts ? td_ChatInviteLinkCounts :
        t extends td_getChatInviteLinks ? td_ChatInviteLinks :
        t extends td_getChatInviteLinkMembers ? td_ChatInviteLinkMembers :
        t extends td_revokeChatInviteLink ? td_ChatInviteLinks :
        t extends td_deleteRevokedChatInviteLink ? td_Ok :
        t extends td_deleteAllRevokedChatInviteLinks ? td_Ok :
        t extends td_checkChatInviteLink ? td_ChatInviteLinkInfo :
        t extends td_joinChatByInviteLink ? td_Chat :
        t extends td_getChatJoinRequests ? td_ChatJoinRequests :
        t extends td_processChatJoinRequest ? td_Ok :
        t extends td_processChatJoinRequests ? td_Ok :
        t extends td_createCall ? td_CallId :
        t extends td_acceptCall ? td_Ok :
        t extends td_sendCallSignalingData ? td_Ok :
        t extends td_discardCall ? td_Ok :
        t extends td_sendCallRating ? td_Ok :
        t extends td_sendCallDebugInformation ? td_Ok :
        t extends td_getVideoChatAvailableParticipants ? td_MessageSenders :
        t extends td_setVideoChatDefaultParticipant ? td_Ok :
        t extends td_createVideoChat ? td_GroupCallId :
        t extends td_getGroupCall ? td_GroupCall :
        t extends td_startScheduledGroupCall ? td_Ok :
        t extends td_toggleGroupCallEnabledStartNotification ? td_Ok :
        t extends td_joinGroupCall ? td_Text :
        t extends td_startGroupCallScreenSharing ? td_Text :
        t extends td_toggleGroupCallScreenSharingIsPaused ? td_Ok :
        t extends td_endGroupCallScreenSharing ? td_Ok :
        t extends td_setGroupCallTitle ? td_Ok :
        t extends td_toggleGroupCallMuteNewParticipants ? td_Ok :
        t extends td_inviteGroupCallParticipants ? td_Ok :
        t extends td_getGroupCallInviteLink ? td_HttpUrl :
        t extends td_revokeGroupCallInviteLink ? td_Ok :
        t extends td_startGroupCallRecording ? td_Ok :
        t extends td_endGroupCallRecording ? td_Ok :
        t extends td_toggleGroupCallIsMyVideoPaused ? td_Ok :
        t extends td_toggleGroupCallIsMyVideoEnabled ? td_Ok :
        t extends td_setGroupCallParticipantIsSpeaking ? td_Ok :
        t extends td_toggleGroupCallParticipantIsMuted ? td_Ok :
        t extends td_setGroupCallParticipantVolumeLevel ? td_Ok :
        t extends td_toggleGroupCallParticipantIsHandRaised ? td_Ok :
        t extends td_loadGroupCallParticipants ? td_Ok :
        t extends td_leaveGroupCall ? td_Ok :
        t extends td_endGroupCall ? td_Ok :
        t extends td_getGroupCallStreamSegment ? td_FilePart :
        t extends td_toggleMessageSenderIsBlocked ? td_Ok :
        t extends td_blockMessageSenderFromReplies ? td_Ok :
        t extends td_getBlockedMessageSenders ? td_MessageSenders :
        t extends td_addContact ? td_Ok :
        t extends td_importContacts ? td_ImportedContacts :
        t extends td_getContacts ? td_Users :
        t extends td_searchContacts ? td_Users :
        t extends td_removeContacts ? td_Ok :
        t extends td_getImportedContactCount ? td_Count :
        t extends td_changeImportedContacts ? td_ImportedContacts :
        t extends td_clearImportedContacts ? td_Ok :
        t extends td_sharePhoneNumber ? td_Ok :
        t extends td_getUserProfilePhotos ? td_ChatPhotos :
        t extends td_getStickers ? td_Stickers :
        t extends td_searchStickers ? td_Stickers :
        t extends td_getInstalledStickerSets ? td_StickerSets :
        t extends td_getArchivedStickerSets ? td_StickerSets :
        t extends td_getTrendingStickerSets ? td_StickerSets :
        t extends td_getAttachedStickerSets ? td_StickerSets :
        t extends td_getStickerSet ? td_StickerSet :
        t extends td_searchStickerSet ? td_StickerSet :
        t extends td_searchInstalledStickerSets ? td_StickerSets :
        t extends td_searchStickerSets ? td_StickerSets :
        t extends td_changeStickerSet ? td_Ok :
        t extends td_viewTrendingStickerSets ? td_Ok :
        t extends td_reorderInstalledStickerSets ? td_Ok :
        t extends td_getRecentStickers ? td_Stickers :
        t extends td_addRecentSticker ? td_Stickers :
        t extends td_removeRecentSticker ? td_Ok :
        t extends td_clearRecentStickers ? td_Ok :
        t extends td_getFavoriteStickers ? td_Stickers :
        t extends td_addFavoriteSticker ? td_Ok :
        t extends td_removeFavoriteSticker ? td_Ok :
        t extends td_getStickerEmojis ? td_Emojis :
        t extends td_searchEmojis ? td_Emojis :
        t extends td_getAnimatedEmoji ? td_AnimatedEmoji :
        t extends td_getEmojiSuggestionsUrl ? td_HttpUrl :
        t extends td_getSavedAnimations ? td_Animations :
        t extends td_addSavedAnimation ? td_Ok :
        t extends td_removeSavedAnimation ? td_Ok :
        t extends td_getRecentInlineBots ? td_Users :
        t extends td_searchHashtags ? td_Hashtags :
        t extends td_removeRecentHashtag ? td_Ok :
        t extends td_getWebPagePreview ? td_WebPage :
        t extends td_getWebPageInstantView ? td_WebPageInstantView :
        t extends td_setProfilePhoto ? td_Ok :
        t extends td_deleteProfilePhoto ? td_Ok :
        t extends td_setName ? td_Ok :
        t extends td_setBio ? td_Ok :
        t extends td_setUsername ? td_Ok :
        t extends td_setLocation ? td_Ok :
        t extends td_changePhoneNumber ? td_AuthenticationCodeInfo :
        t extends td_resendChangePhoneNumberCode ? td_AuthenticationCodeInfo :
        t extends td_checkChangePhoneNumberCode ? td_Ok :
        t extends td_setCommands ? td_Ok :
        t extends td_deleteCommands ? td_Ok :
        t extends td_getCommands ? td_BotCommands :
        t extends td_getActiveSessions ? td_Sessions :
        t extends td_terminateSession ? td_Ok :
        t extends td_terminateAllOtherSessions ? td_Ok :
        t extends td_toggleSessionCanAcceptCalls ? td_Ok :
        t extends td_toggleSessionCanAcceptSecretChats ? td_Ok :
        t extends td_setInactiveSessionTtl ? td_Ok :
        t extends td_getConnectedWebsites ? td_ConnectedWebsites :
        t extends td_disconnectWebsite ? td_Ok :
        t extends td_disconnectAllWebsites ? td_Ok :
        t extends td_setSupergroupUsername ? td_Ok :
        t extends td_setSupergroupStickerSet ? td_Ok :
        t extends td_toggleSupergroupSignMessages ? td_Ok :
        t extends td_toggleSupergroupIsAllHistoryAvailable ? td_Ok :
        t extends td_toggleSupergroupIsBroadcastGroup ? td_Ok :
        t extends td_reportSupergroupSpam ? td_Ok :
        t extends td_getSupergroupMembers ? td_ChatMembers :
        t extends td_closeSecretChat ? td_Ok :
        t extends td_getChatEventLog ? td_ChatEvents :
        t extends td_getPaymentForm ? td_PaymentForm :
        t extends td_validateOrderInfo ? td_ValidatedOrderInfo :
        t extends td_sendPaymentForm ? td_PaymentResult :
        t extends td_getPaymentReceipt ? td_PaymentReceipt :
        t extends td_getSavedOrderInfo ? td_OrderInfo :
        t extends td_deleteSavedOrderInfo ? td_Ok :
        t extends td_deleteSavedCredentials ? td_Ok :
        t extends td_getSupportUser ? td_User :
        t extends td_getBackgrounds ? td_Backgrounds :
        t extends td_getBackgroundUrl ? td_HttpUrl :
        t extends td_searchBackground ? td_Background :
        t extends td_setBackground ? td_Background :
        t extends td_removeBackground ? td_Ok :
        t extends td_resetBackgrounds ? td_Ok :
        t extends td_getLocalizationTargetInfo ? td_LocalizationTargetInfo :
        t extends td_getLanguagePackInfo ? td_LanguagePackInfo :
        t extends td_getLanguagePackStrings ? td_LanguagePackStrings :
        t extends td_synchronizeLanguagePack ? td_Ok :
        t extends td_addCustomServerLanguagePack ? td_Ok :
        t extends td_setCustomLanguagePack ? td_Ok :
        t extends td_editCustomLanguagePackInfo ? td_Ok :
        t extends td_setCustomLanguagePackString ? td_Ok :
        t extends td_deleteLanguagePack ? td_Ok :
        t extends td_registerDevice ? td_PushReceiverId :
        t extends td_processPushNotification ? td_Ok :
        t extends td_getPushReceiverId ? td_PushReceiverId :
        t extends td_getRecentlyVisitedTMeUrls ? td_TMeUrls :
        t extends td_setUserPrivacySettingRules ? td_Ok :
        t extends td_getUserPrivacySettingRules ? td_UserPrivacySettingRules :
        t extends td_getOption ? td_OptionValue :
        t extends td_setOption ? td_Ok :
        t extends td_setAccountTtl ? td_Ok :
        t extends td_getAccountTtl ? td_AccountTtl :
        t extends td_deleteAccount ? td_Ok :
        t extends td_removeChatActionBar ? td_Ok :
        t extends td_reportChat ? td_Ok :
        t extends td_reportChatPhoto ? td_Ok :
        t extends td_getChatStatistics ? td_ChatStatistics :
        t extends td_getMessageStatistics ? td_MessageStatistics :
        t extends td_getStatisticalGraph ? td_StatisticalGraph :
        t extends td_getDatabaseStatistics ? td_DatabaseStatistics :
        t extends td_setNetworkType ? td_Ok :
        t extends td_getNetworkStatistics ? td_NetworkStatistics :
        t extends td_addNetworkStatistics ? td_Ok :
        t extends td_resetNetworkStatistics ? td_Ok :
        t extends td_getAutoDownloadSettingsPresets ? td_AutoDownloadSettingsPresets :
        t extends td_setAutoDownloadSettings ? td_Ok :
        t extends td_getBankCardInfo ? td_BankCardInfo :
        t extends td_getPassportElement ? td_PassportElement :
        t extends td_getAllPassportElements ? td_PassportElements :
        t extends td_setPassportElement ? td_PassportElement :
        t extends td_deletePassportElement ? td_Ok :
        t extends td_setPassportElementErrors ? td_Ok :
        t extends td_getPreferredCountryLanguage ? td_Text :
        t extends td_sendPhoneNumberVerificationCode ? td_AuthenticationCodeInfo :
        t extends td_resendPhoneNumberVerificationCode ? td_AuthenticationCodeInfo :
        t extends td_checkPhoneNumberVerificationCode ? td_Ok :
        t extends td_sendEmailAddressVerificationCode ? td_EmailAddressAuthenticationCodeInfo :
        t extends td_resendEmailAddressVerificationCode ? td_EmailAddressAuthenticationCodeInfo :
        t extends td_checkEmailAddressVerificationCode ? td_Ok :
        t extends td_getPassportAuthorizationForm ? td_PassportAuthorizationForm :
        t extends td_getPassportAuthorizationFormAvailableElements ? td_PassportElementsWithErrors :
        t extends td_sendPassportAuthorizationForm ? td_Ok :
        t extends td_sendPhoneNumberConfirmationCode ? td_AuthenticationCodeInfo :
        t extends td_resendPhoneNumberConfirmationCode ? td_AuthenticationCodeInfo :
        t extends td_checkPhoneNumberConfirmationCode ? td_Ok :
        t extends td_setBotUpdatesStatus ? td_Ok :
        t extends td_uploadStickerFile ? td_File :
        t extends td_getSuggestedStickerSetName ? td_Text :
        t extends td_checkStickerSetName ? td_CheckStickerSetNameResult :
        t extends td_createNewStickerSet ? td_StickerSet :
        t extends td_addStickerToSet ? td_StickerSet :
        t extends td_setStickerSetThumbnail ? td_StickerSet :
        t extends td_setStickerPositionInSet ? td_Ok :
        t extends td_removeStickerFromSet ? td_Ok :
        t extends td_getMapThumbnailFile ? td_File :
        t extends td_acceptTermsOfService ? td_Ok :
        t extends td_sendCustomRequest ? td_CustomRequestResult :
        t extends td_answerCustomQuery ? td_Ok :
        t extends td_setAlarm ? td_Ok :
        t extends td_getCountries ? td_Countries :
        t extends td_getCountryCode ? td_Text :
        t extends td_getPhoneNumberInfo ? td_PhoneNumberInfo :
        t extends td_getPhoneNumberInfoSync ? td_PhoneNumberInfo :
        t extends td_getApplicationDownloadLink ? td_HttpUrl :
        t extends td_getDeepLinkInfo ? td_DeepLinkInfo :
        t extends td_getApplicationConfig ? td_JsonValue :
        t extends td_saveApplicationLogEvent ? td_Ok :
        t extends td_editProxy ? td_Proxy :
        t extends td_enableProxy ? td_Ok :
        t extends td_disableProxy ? td_Ok :
        t extends td_removeProxy ? td_Ok :
        t extends td_getProxies ? td_Proxies :
        t extends td_getProxyLink ? td_HttpUrl :
        t extends td_pingProxy ? td_Seconds :
        t extends td_setLogStream ? td_Ok :
        t extends td_getLogStream ? td_LogStream :
        t extends td_setLogVerbosityLevel ? td_Ok :
        t extends td_getLogVerbosityLevel ? td_LogVerbosityLevel :
        t extends td_getLogTags ? td_LogTags :
        t extends td_setLogTagVerbosityLevel ? td_Ok :
        t extends td_getLogTagVerbosityLevel ? td_LogVerbosityLevel :
        t extends td_addLogMessage ? td_Ok :
        t extends td_testCallEmpty ? td_Ok :
        t extends td_testCallString ? td_TestString :
        t extends td_testCallBytes ? td_TestBytes :
        t extends td_testCallVectorInt ? td_TestVectorInt :
        t extends td_testCallVectorIntObject ? td_TestVectorIntObject :
        t extends td_testCallVectorString ? td_TestVectorString :
        t extends td_testCallVectorStringObject ? td_TestVectorStringObject :
        t extends td_testSquareInt ? td_TestInt :
        t extends td_testNetwork ? td_Ok :
        t extends td_testProxy ? td_Ok :
        t extends td_testGetDifference ? td_Ok :
        t extends td_testUseUpdate ? td_Update :
        t extends td_testReturnError ? td_Error :
        t extends td_setJsLogVerbosityLevel ? td_Ok :
        never
    
    export type TdUpdateType<t> = 
    t extends td_updateAuthorizationState ? "updateAuthorizationState" :
        t extends td_updateNewMessage ? "updateNewMessage" :
        t extends td_updateMessageSendAcknowledged ? "updateMessageSendAcknowledged" :
        t extends td_updateMessageSendSucceeded ? "updateMessageSendSucceeded" :
        t extends td_updateMessageSendFailed ? "updateMessageSendFailed" :
        t extends td_updateMessageContent ? "updateMessageContent" :
        t extends td_updateMessageEdited ? "updateMessageEdited" :
        t extends td_updateMessageIsPinned ? "updateMessageIsPinned" :
        t extends td_updateMessageInteractionInfo ? "updateMessageInteractionInfo" :
        t extends td_updateMessageContentOpened ? "updateMessageContentOpened" :
        t extends td_updateMessageMentionRead ? "updateMessageMentionRead" :
        t extends td_updateMessageLiveLocationViewed ? "updateMessageLiveLocationViewed" :
        t extends td_updateNewChat ? "updateNewChat" :
        t extends td_updateChatTitle ? "updateChatTitle" :
        t extends td_updateChatPhoto ? "updateChatPhoto" :
        t extends td_updateChatPermissions ? "updateChatPermissions" :
        t extends td_updateChatLastMessage ? "updateChatLastMessage" :
        t extends td_updateChatPosition ? "updateChatPosition" :
        t extends td_updateChatReadInbox ? "updateChatReadInbox" :
        t extends td_updateChatReadOutbox ? "updateChatReadOutbox" :
        t extends td_updateChatActionBar ? "updateChatActionBar" :
        t extends td_updateChatDraftMessage ? "updateChatDraftMessage" :
        t extends td_updateChatMessageSender ? "updateChatMessageSender" :
        t extends td_updateChatMessageTtl ? "updateChatMessageTtl" :
        t extends td_updateChatNotificationSettings ? "updateChatNotificationSettings" :
        t extends td_updateChatPendingJoinRequests ? "updateChatPendingJoinRequests" :
        t extends td_updateChatReplyMarkup ? "updateChatReplyMarkup" :
        t extends td_updateChatTheme ? "updateChatTheme" :
        t extends td_updateChatUnreadMentionCount ? "updateChatUnreadMentionCount" :
        t extends td_updateChatVideoChat ? "updateChatVideoChat" :
        t extends td_updateChatDefaultDisableNotification ? "updateChatDefaultDisableNotification" :
        t extends td_updateChatHasProtectedContent ? "updateChatHasProtectedContent" :
        t extends td_updateChatHasScheduledMessages ? "updateChatHasScheduledMessages" :
        t extends td_updateChatIsBlocked ? "updateChatIsBlocked" :
        t extends td_updateChatIsMarkedAsUnread ? "updateChatIsMarkedAsUnread" :
        t extends td_updateChatFilters ? "updateChatFilters" :
        t extends td_updateChatOnlineMemberCount ? "updateChatOnlineMemberCount" :
        t extends td_updateScopeNotificationSettings ? "updateScopeNotificationSettings" :
        t extends td_updateNotification ? "updateNotification" :
        t extends td_updateNotificationGroup ? "updateNotificationGroup" :
        t extends td_updateActiveNotifications ? "updateActiveNotifications" :
        t extends td_updateHavePendingNotifications ? "updateHavePendingNotifications" :
        t extends td_updateDeleteMessages ? "updateDeleteMessages" :
        t extends td_updateChatAction ? "updateChatAction" :
        t extends td_updateUserStatus ? "updateUserStatus" :
        t extends td_updateUser ? "updateUser" :
        t extends td_updateBasicGroup ? "updateBasicGroup" :
        t extends td_updateSupergroup ? "updateSupergroup" :
        t extends td_updateSecretChat ? "updateSecretChat" :
        t extends td_updateUserFullInfo ? "updateUserFullInfo" :
        t extends td_updateBasicGroupFullInfo ? "updateBasicGroupFullInfo" :
        t extends td_updateSupergroupFullInfo ? "updateSupergroupFullInfo" :
        t extends td_updateServiceNotification ? "updateServiceNotification" :
        t extends td_updateFile ? "updateFile" :
        t extends td_updateFileGenerationStart ? "updateFileGenerationStart" :
        t extends td_updateFileGenerationStop ? "updateFileGenerationStop" :
        t extends td_updateCall ? "updateCall" :
        t extends td_updateGroupCall ? "updateGroupCall" :
        t extends td_updateGroupCallParticipant ? "updateGroupCallParticipant" :
        t extends td_updateNewCallSignalingData ? "updateNewCallSignalingData" :
        t extends td_updateUserPrivacySettingRules ? "updateUserPrivacySettingRules" :
        t extends td_updateUnreadMessageCount ? "updateUnreadMessageCount" :
        t extends td_updateUnreadChatCount ? "updateUnreadChatCount" :
        t extends td_updateOption ? "updateOption" :
        t extends td_updateStickerSet ? "updateStickerSet" :
        t extends td_updateInstalledStickerSets ? "updateInstalledStickerSets" :
        t extends td_updateTrendingStickerSets ? "updateTrendingStickerSets" :
        t extends td_updateRecentStickers ? "updateRecentStickers" :
        t extends td_updateFavoriteStickers ? "updateFavoriteStickers" :
        t extends td_updateSavedAnimations ? "updateSavedAnimations" :
        t extends td_updateSelectedBackground ? "updateSelectedBackground" :
        t extends td_updateChatThemes ? "updateChatThemes" :
        t extends td_updateLanguagePackStrings ? "updateLanguagePackStrings" :
        t extends td_updateConnectionState ? "updateConnectionState" :
        t extends td_updateTermsOfService ? "updateTermsOfService" :
        t extends td_updateUsersNearby ? "updateUsersNearby" :
        t extends td_updateDiceEmojis ? "updateDiceEmojis" :
        t extends td_updateAnimatedEmojiMessageClicked ? "updateAnimatedEmojiMessageClicked" :
        t extends td_updateAnimationSearchParameters ? "updateAnimationSearchParameters" :
        t extends td_updateSuggestedActions ? "updateSuggestedActions" :
        t extends td_updateNewInlineQuery ? "updateNewInlineQuery" :
        t extends td_updateNewChosenInlineResult ? "updateNewChosenInlineResult" :
        t extends td_updateNewCallbackQuery ? "updateNewCallbackQuery" :
        t extends td_updateNewInlineCallbackQuery ? "updateNewInlineCallbackQuery" :
        t extends td_updateNewShippingQuery ? "updateNewShippingQuery" :
        t extends td_updateNewPreCheckoutQuery ? "updateNewPreCheckoutQuery" :
        t extends td_updateNewCustomEvent ? "updateNewCustomEvent" :
        t extends td_updateNewCustomQuery ? "updateNewCustomQuery" :
        t extends td_updatePoll ? "updatePoll" :
        t extends td_updatePollAnswer ? "updatePollAnswer" :
        t extends td_updateChatMember ? "updateChatMember" :
        t extends td_updateNewChatJoinRequest ? "updateNewChatJoinRequest" :
        t extends td_updateFatalError ? "updateFatalError" :
        never;

    /** Dictionary which contains TDLib options, suitable for a global options storage */
    export interface TdOptions { 
        /** If true, text entities will be automatically parsed in all inputMessageText objects */
        always_parse_markdown?: td_optionValueBoolean;

        /** If true, new chats from non-contacts will be automatically archived and muted. The option can be set only if the option “can_archive_and_mute_new_chats_from_unknown_users” is true. getOption needs to be called explicitly to fetch the latest value of the option, changed from another device */
        archive_and_mute_new_chats_from_unknown_users?: td_optionValueBoolean;

        /** If true, animated emoji will be disabled and shown as plain emoji */
        disable_animated_emoji?: td_optionValueBoolean;

        /** If true, notifications about the user's contacts who have joined Telegram will be disabled. User will still receive the corresponding message in the private chat. getOption needs to be called explicitly to fetch the latest value of the option, changed from another device */
        disable_contact_registered_notifications?: td_optionValueBoolean;

        /** If true, persistent network statistics will be disabled, which significantly reduces disk usage */
        disable_persistent_network_statistics?: td_optionValueBoolean;

        /** If true, notifications about outgoing scheduled messages that were sent will be disabled */
        disable_sent_scheduled_message_notifications?: td_optionValueBoolean;

        /** If true, protection from external time adjustment will be disabled, which significantly reduces disk usage */
        disable_time_adjustment_protection?: td_optionValueBoolean;

        /** If true, support for top chats and statistics collection is disabled */
        disable_top_chats?: td_optionValueBoolean;

        /** If true, allows to skip all updates received while the TDLib instance was not running. The option does nothing if the database or secret chats are used */
        ignore_background_updates?: td_optionValueBoolean;

        /** If true, the disable_notification value specified in the request will be always used instead of the default value */
        ignore_default_disable_notification?: td_optionValueBoolean;

        /** If true, prevents file thumbnails sent by the server along with messages from being saved on the disk */
        ignore_inline_thumbnails?: td_optionValueBoolean;

        /** If true, chat and message restrictions specific to the currently used operating system will be ignored */
        ignore_platform_restrictions?: td_optionValueBoolean;

        /** If true, sensitive content will be shown on all user devices. getOption needs to be called explicitly to fetch the latest value of the option, changed from another device */
        ignore_sensitive_content_restrictions?: td_optionValueBoolean;

        /** If true, other users will be allowed to see the current user's location. getOption needs to be called explicitly to fetch the latest value of the option, changed from another device */
        is_location_visible?: td_optionValueBoolean;

        /** Path to a database for storing language pack strings, so that this database can be shared between different accounts. By default, language pack strings are stored only in memory. Changes of value of this option will be applied only after TDLib restart, so it should be set before call to setTdlibParameters. */
        language_pack_database_path?: td_optionValueString;

        /** Identifier of the currently used language pack from the current localization target */
        language_pack_id?: td_optionValueString;

        /** Name for the current localization target (currently supported: “android”, “android_x”, “ios”, “macos” and “tdesktop”) */
        localization_target?: td_optionValueString;

        /** The maximum time messages are stored in memory before they are unloaded, 60-86400; in seconds. Defaults to 60 for users and 1800 for bots */
        message_unload_delay?: td_optionValueInteger;

        /** Maximum number of notification groups to be shown simultaneously, 0-25 */
        notification_group_count_max?: td_optionValueInteger;

        /** Maximum number of simultaneously shown notifications in a group, 1-25. Defaults to 10 */
        notification_group_size_max?: td_optionValueInteger;

        /** Online status of the current user */
        online?: td_optionValueBoolean;

        /** If true, IPv6 addresses will be preferred over IPv4 addresses */
        prefer_ipv6?: td_optionValueBoolean;

        /** If true, Perfect Forward Secrecy will be enabled for interaction with the Telegram servers for cloud chats */
        use_pfs?: td_optionValueBoolean;

        /** If true, quick acknowledgement will be enabled for outgoing messages */
        use_quick_ack?: td_optionValueBoolean;

        /** If true, the background storage optimizer will be enabled */
        use_storage_optimizer?: td_optionValueBoolean;

        /** A UTC time offset used for splitting messages by days. The option is reset automatically on each TDLib instance launch, so it needs to be set manually only if the time offset is changed during execution. */
        utc_time_offset?: td_optionValueInteger;

        /** Username of a bot which can be used in inline mode for animations search */
        animation_search_bot_username?: td_optionValueString;

        /** An authentication token to be used on subsequent authorizations and received when logging out */
        authentication_token?: td_optionValueString;

        /** Point in time (Unix timestamp) when authorization was received */
        authorization_date?: td_optionValueInteger;

        /** Maximum number of members in a basic group */
        basic_group_size_max?: td_optionValueInteger;

        /** Maximum time to wait for call connection creation to be passed to libtgvoip */
        call_connect_timeout_ms?: td_optionValueInteger;

        /** Maximum time to wait for call packet delivery to be passed to libtgvoip */
        call_packet_timeout_ms?: td_optionValueInteger;

        /** If true, the option “archive_and_mute_new_chats_from_unknown_users” can be changed */
        can_archive_and_mute_new_chats_from_unknown_users?: td_optionValueBoolean;

        /** If true, the option “ignore_sensitive_content_restrictions” can be changed */
        can_ignore_sensitive_content_restrictions?: td_optionValueBoolean;

        /** Identifier of the bot which is shown as the sender of messages sent on behalf of channels when viewed from an outdated client */
        channel_bot_user_id?: td_optionValueInteger;

        /** Identifier of the enabled proxy */
        enabled_proxy_id?: td_optionValueInteger;

        /** If true, access to Telegram is likely blocked for the user */
        expect_blocking?: td_optionValueBoolean;

        /** Maximum number of favorite stickers */
        favorite_stickers_limit?: td_optionValueInteger;

        /** Maximum number of forwarded messages per one request */
        forwarded_message_count_max?: td_optionValueInteger;

        /** Identifier of the bot which is shown as the sender of anonymous messages in groups when viewed from an outdated client */
        group_anonymous_bot_user_id?: td_optionValueInteger;

        /** Maximum length of a message caption */
        message_caption_length_max?: td_optionValueInteger;

        /** Maximum length of a message text */
        message_text_length_max?: td_optionValueInteger;

        /** Identifier of the current user */
        my_id?: td_optionValueInteger;

        /** Maximum number of pinned cloud chats in the Archive chat list. The same amount of secret chats can be pinned locally */
        pinned_archived_chat_count_max?: td_optionValueInteger;

        /** Maximum number of pinned cloud chats in the Main chat list. The same amount of secret chats can be pinned locally */
        pinned_chat_count_max?: td_optionValueInteger;

        /** Username of a bot which can be used in inline mode for photos search */
        photo_search_bot_username?: td_optionValueString;

        /** Identifier of the @replies bot */
        replies_bot_chat_id?: td_optionValueInteger;

        /** Identifier of the language pack, suggested for the user by the server */
        suggested_language_pack_id?: td_optionValueString;

        /** Suggested bit rate for audio encoding in video notes */
        suggested_video_note_audio_bitrate?: td_optionValueString;

        /** Suggested width and height of the video in video notes */
        suggested_video_note_length?: td_optionValueString;

        /** Suggested bit rate for video encoding in video notes */
        suggested_video_note_video_bitrate?: td_optionValueString;

        /** Maximum number of members in a supergroup */
        supergroup_size_max?: td_optionValueInteger;

        /** Current value of t.me URL, i.e. https://t.me/ */
        t_me_url?: td_optionValueString;

        /** Identifier of the Telegram Service Notifications chat */
        telegram_service_notifications_chat_id?: td_optionValueInteger;

        /** If true, the test environment is being used instead of the production environment */
        test_mode?: td_optionValueBoolean;

        /** An estimation of the current Unix timestamp. The option will not be updated automatically unless the difference between the previous estimation and the locally available monotonic clocks changes significantly */
        unix_time?: td_optionValueInteger;

        /** Username of a bot which can be used in inline mode for venues search */
        venue_search_bot_username?: td_optionValueString;

        /** TDLib version. This options is guaranteed to come before all other updates since TDLib 1.4.0 */
        version?: td_optionValueString;

        [key: string]: td_OptionValue; // The app can store custom options with name starting with 'x-' or 'X-'.
    }
    
    /** Similar to `TdOptions` but contains the values themselves instead of `OptionValue`. */
    export interface TdOptions_pure {
        /** If true, text entities will be automatically parsed in all inputMessageText objects */
        always_parse_markdown?: td_Bool;

        /** If true, new chats from non-contacts will be automatically archived and muted. The option can be set only if the option “can_archive_and_mute_new_chats_from_unknown_users” is true. getOption needs to be called explicitly to fetch the latest value of the option, changed from another device */
        archive_and_mute_new_chats_from_unknown_users?: td_Bool;

        /** If true, animated emoji will be disabled and shown as plain emoji */
        disable_animated_emoji?: td_Bool;

        /** If true, notifications about the user's contacts who have joined Telegram will be disabled. User will still receive the corresponding message in the private chat. getOption needs to be called explicitly to fetch the latest value of the option, changed from another device */
        disable_contact_registered_notifications?: td_Bool;

        /** If true, persistent network statistics will be disabled, which significantly reduces disk usage */
        disable_persistent_network_statistics?: td_Bool;

        /** If true, notifications about outgoing scheduled messages that were sent will be disabled */
        disable_sent_scheduled_message_notifications?: td_Bool;

        /** If true, protection from external time adjustment will be disabled, which significantly reduces disk usage */
        disable_time_adjustment_protection?: td_Bool;

        /** If true, support for top chats and statistics collection is disabled */
        disable_top_chats?: td_Bool;

        /** If true, allows to skip all updates received while the TDLib instance was not running. The option does nothing if the database or secret chats are used */
        ignore_background_updates?: td_Bool;

        /** If true, the disable_notification value specified in the request will be always used instead of the default value */
        ignore_default_disable_notification?: td_Bool;

        /** If true, prevents file thumbnails sent by the server along with messages from being saved on the disk */
        ignore_inline_thumbnails?: td_Bool;

        /** If true, chat and message restrictions specific to the currently used operating system will be ignored */
        ignore_platform_restrictions?: td_Bool;

        /** If true, sensitive content will be shown on all user devices. getOption needs to be called explicitly to fetch the latest value of the option, changed from another device */
        ignore_sensitive_content_restrictions?: td_Bool;

        /** If true, other users will be allowed to see the current user's location. getOption needs to be called explicitly to fetch the latest value of the option, changed from another device */
        is_location_visible?: td_Bool;

        /** Path to a database for storing language pack strings, so that this database can be shared between different accounts. By default, language pack strings are stored only in memory. Changes of value of this option will be applied only after TDLib restart, so it should be set before call to setTdlibParameters. */
        language_pack_database_path?: td_string;

        /** Identifier of the currently used language pack from the current localization target */
        language_pack_id?: td_string;

        /** Name for the current localization target (currently supported: “android”, “android_x”, “ios”, “macos” and “tdesktop”) */
        localization_target?: td_string;

        /** The maximum time messages are stored in memory before they are unloaded, 60-86400; in seconds. Defaults to 60 for users and 1800 for bots */
        message_unload_delay?: td_int64;

        /** Maximum number of notification groups to be shown simultaneously, 0-25 */
        notification_group_count_max?: td_int64;

        /** Maximum number of simultaneously shown notifications in a group, 1-25. Defaults to 10 */
        notification_group_size_max?: td_int64;

        /** Online status of the current user */
        online?: td_Bool;

        /** If true, IPv6 addresses will be preferred over IPv4 addresses */
        prefer_ipv6?: td_Bool;

        /** If true, Perfect Forward Secrecy will be enabled for interaction with the Telegram servers for cloud chats */
        use_pfs?: td_Bool;

        /** If true, quick acknowledgement will be enabled for outgoing messages */
        use_quick_ack?: td_Bool;

        /** If true, the background storage optimizer will be enabled */
        use_storage_optimizer?: td_Bool;

        /** A UTC time offset used for splitting messages by days. The option is reset automatically on each TDLib instance launch, so it needs to be set manually only if the time offset is changed during execution. */
        utc_time_offset?: td_int64;

        /** Username of a bot which can be used in inline mode for animations search */
        animation_search_bot_username?: td_string;

        /** An authentication token to be used on subsequent authorizations and received when logging out */
        authentication_token?: td_string;

        /** Point in time (Unix timestamp) when authorization was received */
        authorization_date?: td_int64;

        /** Maximum number of members in a basic group */
        basic_group_size_max?: td_int64;

        /** Maximum time to wait for call connection creation to be passed to libtgvoip */
        call_connect_timeout_ms?: td_int64;

        /** Maximum time to wait for call packet delivery to be passed to libtgvoip */
        call_packet_timeout_ms?: td_int64;

        /** If true, the option “archive_and_mute_new_chats_from_unknown_users” can be changed */
        can_archive_and_mute_new_chats_from_unknown_users?: td_Bool;

        /** If true, the option “ignore_sensitive_content_restrictions” can be changed */
        can_ignore_sensitive_content_restrictions?: td_Bool;

        /** Identifier of the bot which is shown as the sender of messages sent on behalf of channels when viewed from an outdated client */
        channel_bot_user_id?: td_int64;

        /** Identifier of the enabled proxy */
        enabled_proxy_id?: td_int64;

        /** If true, access to Telegram is likely blocked for the user */
        expect_blocking?: td_Bool;

        /** Maximum number of favorite stickers */
        favorite_stickers_limit?: td_int64;

        /** Maximum number of forwarded messages per one request */
        forwarded_message_count_max?: td_int64;

        /** Identifier of the bot which is shown as the sender of anonymous messages in groups when viewed from an outdated client */
        group_anonymous_bot_user_id?: td_int64;

        /** Maximum length of a message caption */
        message_caption_length_max?: td_int64;

        /** Maximum length of a message text */
        message_text_length_max?: td_int64;

        /** Identifier of the current user */
        my_id?: td_int64;

        /** Maximum number of pinned cloud chats in the Archive chat list. The same amount of secret chats can be pinned locally */
        pinned_archived_chat_count_max?: td_int64;

        /** Maximum number of pinned cloud chats in the Main chat list. The same amount of secret chats can be pinned locally */
        pinned_chat_count_max?: td_int64;

        /** Username of a bot which can be used in inline mode for photos search */
        photo_search_bot_username?: td_string;

        /** Identifier of the @replies bot */
        replies_bot_chat_id?: td_int64;

        /** Identifier of the language pack, suggested for the user by the server */
        suggested_language_pack_id?: td_string;

        /** Suggested bit rate for audio encoding in video notes */
        suggested_video_note_audio_bitrate?: td_string;

        /** Suggested width and height of the video in video notes */
        suggested_video_note_length?: td_string;

        /** Suggested bit rate for video encoding in video notes */
        suggested_video_note_video_bitrate?: td_string;

        /** Maximum number of members in a supergroup */
        supergroup_size_max?: td_int64;

        /** Current value of t.me URL, i.e. https://t.me/ */
        t_me_url?: td_string;

        /** Identifier of the Telegram Service Notifications chat */
        telegram_service_notifications_chat_id?: td_int64;

        /** If true, the test environment is being used instead of the production environment */
        test_mode?: td_Bool;

        /** An estimation of the current Unix timestamp. The option will not be updated automatically unless the difference between the previous estimation and the locally available monotonic clocks changes significantly */
        unix_time?: td_int64;

        /** Username of a bot which can be used in inline mode for venues search */
        venue_search_bot_username?: td_string;

        /** TDLib version. This options is guaranteed to come before all other updates since TDLib 1.4.0 */
        version?: td_string;
    }

    export type TdOptionKey= 'always_parse_markdown' | 'archive_and_mute_new_chats_from_unknown_users' | 'disable_animated_emoji' | 'disable_contact_registered_notifications' | 'disable_persistent_network_statistics' | 'disable_sent_scheduled_message_notifications' | 'disable_time_adjustment_protection' | 'disable_top_chats' | 'ignore_background_updates' | 'ignore_default_disable_notification' | 'ignore_inline_thumbnails' | 'ignore_platform_restrictions' | 'ignore_sensitive_content_restrictions' | 'is_location_visible' | 'language_pack_database_path' | 'language_pack_id' | 'localization_target' | 'message_unload_delay' | 'notification_group_count_max' | 'notification_group_size_max' | 'online' | 'prefer_ipv6' | 'use_pfs' | 'use_quick_ack' | 'use_storage_optimizer' | 'utc_time_offset' | 'animation_search_bot_username' | 'authentication_token' | 'authorization_date' | 'basic_group_size_max' | 'call_connect_timeout_ms' | 'call_packet_timeout_ms' | 'can_archive_and_mute_new_chats_from_unknown_users' | 'can_ignore_sensitive_content_restrictions' | 'channel_bot_user_id' | 'enabled_proxy_id' | 'expect_blocking' | 'favorite_stickers_limit' | 'forwarded_message_count_max' | 'group_anonymous_bot_user_id' | 'message_caption_length_max' | 'message_text_length_max' | 'my_id' | 'pinned_archived_chat_count_max' | 'pinned_chat_count_max' | 'photo_search_bot_username' | 'replies_bot_chat_id' | 'suggested_language_pack_id' | 'suggested_video_note_audio_bitrate' | 'suggested_video_note_length' | 'suggested_video_note_video_bitrate' | 'supergroup_size_max' | 't_me_url' | 'telegram_service_notifications_chat_id' | 'test_mode' | 'unix_time' | 'venue_search_bot_username' | 'version' | `x-${string}` | `X-${string}`;

    export type TdOptionKey_writable = 'always_parse_markdown' | 'archive_and_mute_new_chats_from_unknown_users' | 'disable_animated_emoji' | 'disable_contact_registered_notifications' | 'disable_persistent_network_statistics' | 'disable_sent_scheduled_message_notifications' | 'disable_time_adjustment_protection' | 'disable_top_chats' | 'ignore_background_updates' | 'ignore_default_disable_notification' | 'ignore_inline_thumbnails' | 'ignore_platform_restrictions' | 'ignore_sensitive_content_restrictions' | 'is_location_visible' | 'language_pack_database_path' | 'language_pack_id' | 'localization_target' | 'message_unload_delay' | 'notification_group_count_max' | 'notification_group_size_max' | 'online' | 'prefer_ipv6' | 'use_pfs' | 'use_quick_ack' | 'use_storage_optimizer' | 'utc_time_offset' | `x-${string}` | `X-${string}`;

    export type TdOptionType<T extends TdOptionKey | TdOptionKey_writable, U extends T>=
        U extends "always_parse_markdown" ? td_optionValueBoolean :
        U extends "archive_and_mute_new_chats_from_unknown_users" ? td_optionValueBoolean :
        U extends "disable_animated_emoji" ? td_optionValueBoolean :
        U extends "disable_contact_registered_notifications" ? td_optionValueBoolean :
        U extends "disable_persistent_network_statistics" ? td_optionValueBoolean :
        U extends "disable_sent_scheduled_message_notifications" ? td_optionValueBoolean :
        U extends "disable_time_adjustment_protection" ? td_optionValueBoolean :
        U extends "disable_top_chats" ? td_optionValueBoolean :
        U extends "ignore_background_updates" ? td_optionValueBoolean :
        U extends "ignore_default_disable_notification" ? td_optionValueBoolean :
        U extends "ignore_inline_thumbnails" ? td_optionValueBoolean :
        U extends "ignore_platform_restrictions" ? td_optionValueBoolean :
        U extends "ignore_sensitive_content_restrictions" ? td_optionValueBoolean :
        U extends "is_location_visible" ? td_optionValueBoolean :
        U extends "language_pack_database_path" ? td_optionValueString :
        U extends "language_pack_id" ? td_optionValueString :
        U extends "localization_target" ? td_optionValueString :
        U extends "message_unload_delay" ? td_optionValueInteger :
        U extends "notification_group_count_max" ? td_optionValueInteger :
        U extends "notification_group_size_max" ? td_optionValueInteger :
        U extends "online" ? td_optionValueBoolean :
        U extends "prefer_ipv6" ? td_optionValueBoolean :
        U extends "use_pfs" ? td_optionValueBoolean :
        U extends "use_quick_ack" ? td_optionValueBoolean :
        U extends "use_storage_optimizer" ? td_optionValueBoolean :
        U extends "utc_time_offset" ? td_optionValueInteger :
        U extends "animation_search_bot_username" ? td_optionValueString :
        U extends "authentication_token" ? td_optionValueString :
        U extends "authorization_date" ? td_optionValueInteger :
        U extends "basic_group_size_max" ? td_optionValueInteger :
        U extends "call_connect_timeout_ms" ? td_optionValueInteger :
        U extends "call_packet_timeout_ms" ? td_optionValueInteger :
        U extends "can_archive_and_mute_new_chats_from_unknown_users" ? td_optionValueBoolean :
        U extends "can_ignore_sensitive_content_restrictions" ? td_optionValueBoolean :
        U extends "channel_bot_user_id" ? td_optionValueInteger :
        U extends "enabled_proxy_id" ? td_optionValueInteger :
        U extends "expect_blocking" ? td_optionValueBoolean :
        U extends "favorite_stickers_limit" ? td_optionValueInteger :
        U extends "forwarded_message_count_max" ? td_optionValueInteger :
        U extends "group_anonymous_bot_user_id" ? td_optionValueInteger :
        U extends "message_caption_length_max" ? td_optionValueInteger :
        U extends "message_text_length_max" ? td_optionValueInteger :
        U extends "my_id" ? td_optionValueInteger :
        U extends "pinned_archived_chat_count_max" ? td_optionValueInteger :
        U extends "pinned_chat_count_max" ? td_optionValueInteger :
        U extends "photo_search_bot_username" ? td_optionValueString :
        U extends "replies_bot_chat_id" ? td_optionValueInteger :
        U extends "suggested_language_pack_id" ? td_optionValueString :
        U extends "suggested_video_note_audio_bitrate" ? td_optionValueString :
        U extends "suggested_video_note_length" ? td_optionValueString :
        U extends "suggested_video_note_video_bitrate" ? td_optionValueString :
        U extends "supergroup_size_max" ? td_optionValueInteger :
        U extends "t_me_url" ? td_optionValueString :
        U extends "telegram_service_notifications_chat_id" ? td_optionValueInteger :
        U extends "test_mode" ? td_optionValueBoolean :
        U extends "unix_time" ? td_optionValueInteger :
        U extends "venue_search_bot_username" ? td_optionValueString :
        U extends "version" ? td_optionValueString :
        T;
    
}
export default TdApi;
