
namespace TdApi {
    type double = number;
    type int32 = number;
    type int53 = number;
    type int64 = string;
    type bytes = string;

    type Bool = boolean;

    type vector<t> = t[];

    
    type jsLogLevel= 'error' | 'warning' | 'info' | 'log' | 'debug';

    
    /** An object of this type can be returned on every function call, in case of an error */
    export interface error {
        '@type': 'error';
        /** Error code; subject to future changes. If the error code is 406, the error message must not be processed in any way and must not be displayed to the user */
        code: int32;
        /** Error message; subject to future changes */
        message: string;
    }
    
    
    /** An object of this type is returned on a successful function call for certain functions */
    export interface ok {
        '@type': 'ok';
    }
    
    
    /** Contains parameters for TDLib initialization */
    export interface tdlibParameters {
        '@type': 'tdlibParameters';
        /** If set to true, the Telegram test environment will be used instead of the production environment */
        use_test_dc: Bool;
        /** The path to the directory for the persistent database; if empty, the current working directory will be used */
        database_directory: string;
        /** The path to the directory for storing files; if empty, database_directory will be used */
        files_directory: string;
        /** If set to true, information about downloaded and uploaded files will be saved between application restarts */
        use_file_database: Bool;
        /** If set to true, the library will maintain a cache of users, basic groups, supergroups, channels and secret chats. Implies use_file_database */
        use_chat_info_database: Bool;
        /** If set to true, the library will maintain a cache of chats and messages. Implies use_chat_info_database */
        use_message_database: Bool;
        /** If set to true, support for secret chats will be enabled */
        use_secret_chats: Bool;
        /** Application identifier for Telegram API access, which can be obtained at https://my.telegram.org */
        api_id: int32;
        /** Application identifier hash for Telegram API access, which can be obtained at https://my.telegram.org */
        api_hash: string;
        /** IETF language tag of the user's operating system language; must be non-empty */
        system_language_code: string;
        /** Model of the device the application is being run on; must be non-empty */
        device_model: string;
        /** Version of the operating system the application is being run on. If empty, the version is automatically detected by TDLib */
        system_version: string;
        /** Application version; must be non-empty */
        application_version: string;
        /** If set to true, old files will automatically be deleted */
        enable_storage_optimizer: Bool;
        /** If set to true, original file names will be ignored. Otherwise, downloaded files will be saved under names as close as possible to the original name */
        ignore_file_names: Bool;
    }
    
    
    /** An authentication code is delivered via a private Telegram message, which can be viewed from another active session */
    export interface authenticationCodeTypeTelegramMessage {
        '@type': 'authenticationCodeTypeTelegramMessage';
        /** Length of the code */
        length: int32;
    }
    
    
    /** An authentication code is delivered via an SMS message to the specified phone number */
    export interface authenticationCodeTypeSms {
        '@type': 'authenticationCodeTypeSms';
        /** Length of the code */
        length: int32;
    }
    
    
    /** An authentication code is delivered via a phone call to the specified phone number */
    export interface authenticationCodeTypeCall {
        '@type': 'authenticationCodeTypeCall';
        /** Length of the code */
        length: int32;
    }
    
    
    /** An authentication code is delivered by an immediately canceled call to the specified phone number. The phone number that calls is the code that must be entered automatically */
    export interface authenticationCodeTypeFlashCall {
        '@type': 'authenticationCodeTypeFlashCall';
        /** Pattern of the phone number from which the call will be made */
        pattern: string;
    }
    
    
    /** An authentication code is delivered by an immediately canceled call to the specified phone number. The last digits of the phone number that calls are the code that must be entered manually by the user */
    export interface authenticationCodeTypeMissedCall {
        '@type': 'authenticationCodeTypeMissedCall';
        /** Prefix of the phone number from which the call will be made */
        phone_number_prefix: string;
        /** Number of digits in the code, excluding the prefix */
        length: int32;
    }
    
    
    /** Information about the authentication code that was sent */
    export interface authenticationCodeInfo {
        '@type': 'authenticationCodeInfo';
        /** A phone number that is being authenticated */
        phone_number: string;
        /** The way the code was sent to the user */
        type: AuthenticationCodeType;
        /** The way the next code will be sent to the user; may be null */
        next_type?: AuthenticationCodeType;
        /** Timeout before the code can be re-sent, in seconds */
        timeout: int32;
    }
    
    
    /** Information about the email address authentication code that was sent */
    export interface emailAddressAuthenticationCodeInfo {
        '@type': 'emailAddressAuthenticationCodeInfo';
        /** Pattern of the email address to which an authentication code was sent */
        email_address_pattern: string;
        /** Length of the code; 0 if unknown */
        length: int32;
    }
    
    
    /** Represents a part of the text that needs to be formatted in some unusual way */
    export interface textEntity {
        '@type': 'textEntity';
        /** Offset of the entity, in UTF-16 code units */
        offset: int32;
        /** Length of the entity, in UTF-16 code units */
        length: int32;
        /** Type of the entity */
        type: TextEntityType;
    }
    
    
    /** Contains a list of text entities */
    export interface textEntities {
        '@type': 'textEntities';
        /** List of text entities */
        entities: vector<textEntity>;
    }
    
    
    /** A text with some entities */
    export interface formattedText {
        '@type': 'formattedText';
        /** The text */
        text: string;
        /** Entities contained in the text. Entities can be nested, but must not mutually intersect with each other. -Pre, Code and PreCode entities can't contain other entities. Bold, Italic, Underline, Strikethrough, and Spoiler entities can contain and to be contained in all other entities. All other entities can't contain each other */
        entities: vector<textEntity>;
    }
    
    
    /** Contains Telegram terms of service */
    export interface termsOfService {
        '@type': 'termsOfService';
        /** Text of the terms of service */
        text: formattedText;
        /** The minimum age of a user to be able to accept the terms; 0 if age isn't restricted */
        min_user_age: int32;
        /** True, if a blocking popup with terms of service must be shown to the user */
        show_popup: Bool;
    }
    
    
    /** TDLib needs TdlibParameters for initialization */
    export interface authorizationStateWaitTdlibParameters {
        '@type': 'authorizationStateWaitTdlibParameters';
    }
    
    
    /** TDLib needs an encryption key to decrypt the local database */
    export interface authorizationStateWaitEncryptionKey {
        '@type': 'authorizationStateWaitEncryptionKey';
        /** True, if the database is currently encrypted */
        is_encrypted: Bool;
    }
    
    
    /** TDLib needs the user's phone number to authorize. Call `setAuthenticationPhoneNumber` to provide the phone number, or use `requestQrCodeAuthentication`, or `checkAuthenticationBotToken` for other authentication options */
    export interface authorizationStateWaitPhoneNumber {
        '@type': 'authorizationStateWaitPhoneNumber';
    }
    
    
    /** TDLib needs the user's authentication code to authorize */
    export interface authorizationStateWaitCode {
        '@type': 'authorizationStateWaitCode';
        /** Information about the authorization code that was sent */
        code_info: authenticationCodeInfo;
    }
    
    
    /** The user needs to confirm authorization on another logged in device by scanning a QR code with the provided link */
    export interface authorizationStateWaitOtherDeviceConfirmation {
        '@type': 'authorizationStateWaitOtherDeviceConfirmation';
        /** A tg:// URL for the QR code. The link will be updated frequently */
        link: string;
    }
    
    
    /** The user is unregistered and need to accept terms of service and enter their first name and last name to finish registration */
    export interface authorizationStateWaitRegistration {
        '@type': 'authorizationStateWaitRegistration';
        /** Telegram terms of service */
        terms_of_service: termsOfService;
    }
    
    
    /** The user has been authorized, but needs to enter a password to start using the application */
    export interface authorizationStateWaitPassword {
        '@type': 'authorizationStateWaitPassword';
        /** Hint for the password; may be empty */
        password_hint: string;
        /** True, if a recovery email address has been set up */
        has_recovery_email_address: Bool;
        /** Pattern of the email address to which the recovery email was sent; empty until a recovery email has been sent */
        recovery_email_address_pattern: string;
    }
    
    
    /** The user has been successfully authorized. TDLib is now ready to answer queries */
    export interface authorizationStateReady {
        '@type': 'authorizationStateReady';
    }
    
    
    /** The user is currently logging out */
    export interface authorizationStateLoggingOut {
        '@type': 'authorizationStateLoggingOut';
    }
    
    
    /** TDLib is closing, all subsequent queries will be answered with the error 500. Note that closing TDLib can take a while. All resources will be freed only after authorizationStateClosed has been received */
    export interface authorizationStateClosing {
        '@type': 'authorizationStateClosing';
    }
    
    
    /** TDLib client is in its final state. All databases are closed and all resources are released. No other updates will be received after this. All queries will be responded to -with error code 500. To continue working, one must create a new instance of the TDLib client */
    export interface authorizationStateClosed {
        '@type': 'authorizationStateClosed';
    }
    
    
    /** Represents the current state of 2-step verification */
    export interface passwordState {
        '@type': 'passwordState';
        /** True, if a 2-step verification password is set */
        has_password: Bool;
        /** Hint for the password; may be empty */
        password_hint: string;
        /** True, if a recovery email is set */
        has_recovery_email_address: Bool;
        /** True, if some Telegram Passport elements were saved */
        has_passport_data: Bool;
        /** Information about the recovery email address to which the confirmation email was sent; may be null */
        recovery_email_address_code_info?: emailAddressAuthenticationCodeInfo;
        /** If not 0, point in time (Unix timestamp) after which the password can be reset immediately using resetPassword */
        pending_reset_date: int32;
    }
    
    
    /** Contains information about the current recovery email address */
    export interface recoveryEmailAddress {
        '@type': 'recoveryEmailAddress';
        /** Recovery email address */
        recovery_email_address: string;
    }
    
    
    /** Returns information about the availability of a temporary password, which can be used for payments */
    export interface temporaryPasswordState {
        '@type': 'temporaryPasswordState';
        /** True, if a temporary password is available */
        has_password: Bool;
        /** Time left before the temporary password expires, in seconds */
        valid_for: int32;
    }
    
    
    /** Represents a local file */
    export interface localFile {
        '@type': 'localFile';
        /** Local path to the locally available file part; may be empty */
        path: string;
        /** True, if it is possible to download or generate the file */
        can_be_downloaded: Bool;
        /** True, if the file can be deleted */
        can_be_deleted: Bool;
        /** True, if the file is currently being downloaded (or a local copy is being generated by some other means) */
        is_downloading_active: Bool;
        /** True, if the local copy is fully available */
        is_downloading_completed: Bool;
        /** Download will be started from this offset. downloaded_prefix_size is calculated from this offset */
        download_offset: int53;
        /** If is_downloading_completed is false, then only some prefix of the file starting from download_offset is ready to be read. downloaded_prefix_size is the size of that prefix in bytes */
        downloaded_prefix_size: int53;
        /** Total downloaded file size, in bytes. Can be used only for calculating download progress. The actual file size may be bigger, and some parts of it may contain garbage */
        downloaded_size: int53;
    }
    
    
    /** Represents a remote file */
    export interface remoteFile {
        '@type': 'remoteFile';
        /** Remote file identifier; may be empty. Can be used by the current user across application restarts or even from other devices. Uniquely identifies a file, but a file can have a lot of different valid identifiers. -If the ID starts with "http://" or "https://", it represents the HTTP URL of the file. TDLib is currently unable to download files if only their URL is known. -If downloadFile/addFileToDownloads is called on such a file or if it is sent to a secret chat, TDLib starts a file generation process by sending updateFileGenerationStart to the application with the HTTP URL in the original_path and "#url#" as the conversion string. Application must generate the file by downloading it to the specified location */
        id: string;
        /** Unique file identifier; may be empty if unknown. The unique file identifier which is the same for the same file even for different users and is persistent over time */
        unique_id: string;
        /** True, if the file is currently being uploaded (or a remote copy is being generated by some other means) */
        is_uploading_active: Bool;
        /** True, if a remote copy is fully available */
        is_uploading_completed: Bool;
        /** Size of the remote available part of the file, in bytes; 0 if unknown */
        uploaded_size: int53;
    }
    
    
    /** Represents a file */
    export interface file {
        '@type': 'file';
        /** Unique file identifier */
        id: int32;
        /** File size, in bytes; 0 if unknown */
        size: int53;
        /** Approximate file size in bytes in case the exact file size is unknown. Can be used to show download/upload progress */
        expected_size: int53;
        /** Information about the local copy of the file */
        local: localFile;
        /** Information about the remote copy of the file */
        remote: remoteFile;
    }
    
    
    /** A file defined by its unique ID */
    export interface inputFileId {
        '@type': 'inputFileId';
        /** Unique file identifier */
        id: int32;
    }
    
    
    /** A file defined by its remote ID. The remote ID is guaranteed to be usable only if the corresponding file is still accessible to the user and known to TDLib. -For example, if the file is from a message, then the message must be not deleted and accessible to the user. If the file database is disabled, then the corresponding object with the file must be preloaded by the application */
    export interface inputFileRemote {
        '@type': 'inputFileRemote';
        /** Remote file identifier */
        id: string;
    }
    
    
    /** A file defined by a local path */
    export interface inputFileLocal {
        '@type': 'inputFileLocal';
        /** Local path to the file */
        path: string;
    }
    
    
    /** A file generated by the application */
    export interface inputFileGenerated {
        '@type': 'inputFileGenerated';
        /** Local path to a file from which the file is generated; may be empty if there is no such file */
        original_path: string;
        /** String specifying the conversion applied to the original file; must be persistent across application restarts. Conversions beginning with '#' are reserved for internal TDLib usage */
        conversion: string;
        /** Expected size of the generated file, in bytes; 0 if unknown */
        expected_size: int53;
    }
    
    
    /** Describes an image in JPEG format */
    export interface photoSize {
        '@type': 'photoSize';
        /** Image type (see https://core.telegram.org/constructor/photoSize) */
        type: string;
        /** Information about the image file */
        photo: file;
        /** Image width */
        width: int32;
        /** Image height */
        height: int32;
        /** Sizes of progressive JPEG file prefixes, which can be used to preliminarily show the image; in bytes */
        progressive_sizes: vector<int32>;
    }
    
    
    /** Thumbnail image of a very poor quality and low resolution */
    export interface minithumbnail {
        '@type': 'minithumbnail';
        /** Thumbnail width, usually doesn't exceed 40 */
        width: int32;
        /** Thumbnail height, usually doesn't exceed 40 */
        height: int32;
        /** The thumbnail in JPEG format */
        data: bytes;
    }
    
    
    /** The thumbnail is in JPEG format */
    export interface thumbnailFormatJpeg {
        '@type': 'thumbnailFormatJpeg';
    }
    
    
    /** The thumbnail is in static GIF format. It will be used only for some bot inline results */
    export interface thumbnailFormatGif {
        '@type': 'thumbnailFormatGif';
    }
    
    
    /** The thumbnail is in MPEG4 format. It will be used only for some animations and videos */
    export interface thumbnailFormatMpeg4 {
        '@type': 'thumbnailFormatMpeg4';
    }
    
    
    /** The thumbnail is in PNG format. It will be used only for background patterns */
    export interface thumbnailFormatPng {
        '@type': 'thumbnailFormatPng';
    }
    
    
    /** The thumbnail is in TGS format. It will be used only for TGS sticker sets */
    export interface thumbnailFormatTgs {
        '@type': 'thumbnailFormatTgs';
    }
    
    
    /** The thumbnail is in WEBM format. It will be used only for WEBM sticker sets */
    export interface thumbnailFormatWebm {
        '@type': 'thumbnailFormatWebm';
    }
    
    
    /** The thumbnail is in WEBP format. It will be used only for some stickers */
    export interface thumbnailFormatWebp {
        '@type': 'thumbnailFormatWebp';
    }
    
    
    /** Represents a thumbnail */
    export interface thumbnail {
        '@type': 'thumbnail';
        /** Thumbnail format */
        format: ThumbnailFormat;
        /** Thumbnail width */
        width: int32;
        /** Thumbnail height */
        height: int32;
        /** The thumbnail */
        file: file;
    }
    
    
    /** The mask is placed relatively to the forehead */
    export interface maskPointForehead {
        '@type': 'maskPointForehead';
    }
    
    
    /** The mask is placed relatively to the eyes */
    export interface maskPointEyes {
        '@type': 'maskPointEyes';
    }
    
    
    /** The mask is placed relatively to the mouth */
    export interface maskPointMouth {
        '@type': 'maskPointMouth';
    }
    
    
    /** The mask is placed relatively to the chin */
    export interface maskPointChin {
        '@type': 'maskPointChin';
    }
    
    
    /** Position on a photo where a mask is placed */
    export interface maskPosition {
        '@type': 'maskPosition';
        /** Part of the face, relative to which the mask is placed */
        point: MaskPoint;
        /** Shift by X-axis measured in widths of the mask scaled to the face size, from left to right. (For example, -1.0 will place the mask just to the left of the default mask position) */
        x_shift: double;
        /** Shift by Y-axis measured in heights of the mask scaled to the face size, from top to bottom. (For example, 1.0 will place the mask just below the default mask position) */
        y_shift: double;
        /** Mask scaling coefficient. (For example, 2.0 means a doubled size) */
        scale: double;
    }
    
    
    /** The sticker is an image in WEBP format */
    export interface stickerTypeStatic {
        '@type': 'stickerTypeStatic';
    }
    
    
    /** The sticker is an animation in TGS format */
    export interface stickerTypeAnimated {
        '@type': 'stickerTypeAnimated';
    }
    
    
    /** The sticker is a video in WEBM format */
    export interface stickerTypeVideo {
        '@type': 'stickerTypeVideo';
    }
    
    
    /** The sticker is a mask in WEBP format to be placed on photos or videos */
    export interface stickerTypeMask {
        '@type': 'stickerTypeMask';
        /** Position where the mask is placed; may be null */
        mask_position?: maskPosition;
    }
    
    
    /** Represents a closed vector path. The path begins at the end point of the last command */
    export interface closedVectorPath {
        '@type': 'closedVectorPath';
        /** List of vector path commands */
        commands: vector<VectorPathCommand>;
    }
    
    
    /** Describes one answer option of a poll */
    export interface pollOption {
        '@type': 'pollOption';
        /** Option text; 1-100 characters */
        text: string;
        /** Number of voters for this option, available only for closed or voted polls */
        voter_count: int32;
        /** The percentage of votes for this option; 0-100 */
        vote_percentage: int32;
        /** True, if the option was chosen by the user */
        is_chosen: Bool;
        /** True, if the option is being chosen by a pending setPollAnswer request */
        is_being_chosen: Bool;
    }
    
    
    /** A regular poll */
    export interface pollTypeRegular {
        '@type': 'pollTypeRegular';
        /** True, if multiple answer options can be chosen simultaneously */
        allow_multiple_answers: Bool;
    }
    
    
    /** A poll in quiz mode, which has exactly one correct answer option and can be answered only once */
    export interface pollTypeQuiz {
        '@type': 'pollTypeQuiz';
        /** 0-based identifier of the correct answer option; -1 for a yet unanswered poll */
        correct_option_id: int32;
        /** Text that is shown when the user chooses an incorrect answer or taps on the lamp icon; 0-200 characters with at most 2 line feeds; empty for a yet unanswered poll */
        explanation: formattedText;
    }
    
    
    /** Describes an animation file. The animation must be encoded in GIF or MPEG4 format */
    export interface animation {
        '@type': 'animation';
        /** Duration of the animation, in seconds; as defined by the sender */
        duration: int32;
        /** Width of the animation */
        width: int32;
        /** Height of the animation */
        height: int32;
        /** Original name of the file; as defined by the sender */
        file_name: string;
        /** MIME type of the file, usually "image/gif" or "video/mp4" */
        mime_type: string;
        /** True, if stickers were added to the animation. The list of corresponding sticker set can be received using getAttachedStickerSets */
        has_stickers: Bool;
        /** Animation minithumbnail; may be null */
        minithumbnail?: minithumbnail;
        /** Animation thumbnail in JPEG or MPEG4 format; may be null */
        thumbnail?: thumbnail;
        /** File containing the animation */
        animation: file;
    }
    
    
    /** Describes an audio file. Audio is usually in MP3 or M4A format */
    export interface audio {
        '@type': 'audio';
        /** Duration of the audio, in seconds; as defined by the sender */
        duration: int32;
        /** Title of the audio; as defined by the sender */
        title: string;
        /** Performer of the audio; as defined by the sender */
        performer: string;
        /** Original name of the file; as defined by the sender */
        file_name: string;
        /** The MIME type of the file; as defined by the sender */
        mime_type: string;
        /** The minithumbnail of the album cover; may be null */
        album_cover_minithumbnail?: minithumbnail;
        /** The thumbnail of the album cover in JPEG format; as defined by the sender. The full size thumbnail is supposed to be extracted from the downloaded file; may be null */
        album_cover_thumbnail?: thumbnail;
        /** File containing the audio */
        audio: file;
    }
    
    
    /** Describes a document of any type */
    export interface document {
        '@type': 'document';
        /** Original name of the file; as defined by the sender */
        file_name: string;
        /** MIME type of the file; as defined by the sender */
        mime_type: string;
        /** Document minithumbnail; may be null */
        minithumbnail?: minithumbnail;
        /** Document thumbnail in JPEG or PNG format (PNG will be used only for background patterns); as defined by the sender; may be null */
        thumbnail?: thumbnail;
        /** File containing the document */
        document: file;
    }
    
    
    /** Describes a photo */
    export interface photo {
        '@type': 'photo';
        /** True, if stickers were added to the photo. The list of corresponding sticker sets can be received using getAttachedStickerSets */
        has_stickers: Bool;
        /** Photo minithumbnail; may be null */
        minithumbnail?: minithumbnail;
        /** Available variants of the photo, in different sizes */
        sizes: vector<photoSize>;
    }
    
    
    /** Describes a sticker */
    export interface sticker {
        '@type': 'sticker';
        /** The identifier of the sticker set to which the sticker belongs; 0 if none */
        set_id: int64;
        /** Sticker width; as defined by the sender */
        width: int32;
        /** Sticker height; as defined by the sender */
        height: int32;
        /** Emoji corresponding to the sticker */
        emoji: string;
        /** Sticker type */
        type: StickerType;
        /** Sticker's outline represented as a list of closed vector paths; may be empty. The coordinate system origin is in the upper-left corner */
        outline: vector<closedVectorPath>;
        /** Sticker thumbnail in WEBP or JPEG format; may be null */
        thumbnail?: thumbnail;
        /** Premium animation of the sticker; may be null. If present, only Premium users can send the sticker */
        premium_animation?: file;
        /** File containing the sticker */
        sticker: file;
    }
    
    
    /** Describes a video file */
    export interface video {
        '@type': 'video';
        /** Duration of the video, in seconds; as defined by the sender */
        duration: int32;
        /** Video width; as defined by the sender */
        width: int32;
        /** Video height; as defined by the sender */
        height: int32;
        /** Original name of the file; as defined by the sender */
        file_name: string;
        /** MIME type of the file; as defined by the sender */
        mime_type: string;
        /** True, if stickers were added to the video. The list of corresponding sticker sets can be received using getAttachedStickerSets */
        has_stickers: Bool;
        /** True, if the video is supposed to be streamed */
        supports_streaming: Bool;
        /** Video minithumbnail; may be null */
        minithumbnail?: minithumbnail;
        /** Video thumbnail in JPEG or MPEG4 format; as defined by the sender; may be null */
        thumbnail?: thumbnail;
        /** File containing the video */
        video: file;
    }
    
    
    /** Describes a video note. The video must be equal in width and height, cropped to a circle, and stored in MPEG4 format */
    export interface videoNote {
        '@type': 'videoNote';
        /** Duration of the video, in seconds; as defined by the sender */
        duration: int32;
        /** Video width and height; as defined by the sender */
        length: int32;
        /** Video minithumbnail; may be null */
        minithumbnail?: minithumbnail;
        /** Video thumbnail in JPEG format; as defined by the sender; may be null */
        thumbnail?: thumbnail;
        /** File containing the video */
        video: file;
    }
    
    
    /** Describes a voice note. The voice note must be encoded with the Opus codec, and stored inside an OGG container. Voice notes can have only a single audio channel */
    export interface voiceNote {
        '@type': 'voiceNote';
        /** Duration of the voice note, in seconds; as defined by the sender */
        duration: int32;
        /** A waveform representation of the voice note in 5-bit format */
        waveform: bytes;
        /** MIME type of the file; as defined by the sender */
        mime_type: string;
        /** True, if speech recognition is completed; Premium users only */
        is_recognized: Bool;
        /** Recognized text of the voice note; Premium users only. Call recognizeSpeech to get recognized text of the voice note */
        recognized_text: string;
        /** File containing the voice note */
        voice: file;
    }
    
    
    /** Describes an animated representation of an emoji */
    export interface animatedEmoji {
        '@type': 'animatedEmoji';
        /** Animated sticker for the emoji */
        sticker: sticker;
        /** Emoji modifier fitzpatrick type; 0-6; 0 if none */
        fitzpatrick_type: int32;
        /** File containing the sound to be played when the animated emoji is clicked; may be null. The sound is encoded with the Opus codec, and stored inside an OGG container */
        sound?: file;
    }
    
    
    /** Describes a user contact */
    export interface contact {
        '@type': 'contact';
        /** Phone number of the user */
        phone_number: string;
        /** First name of the user; 1-255 characters in length */
        first_name: string;
        /** Last name of the user */
        last_name: string;
        /** Additional data about the user in a form of vCard; 0-2048 bytes in length */
        vcard: string;
        /** Identifier of the user, if known; otherwise 0 */
        user_id: int53;
    }
    
    
    /** Describes a location on planet Earth */
    export interface location {
        '@type': 'location';
        /** Latitude of the location in degrees; as defined by the sender */
        latitude: double;
        /** Longitude of the location, in degrees; as defined by the sender */
        longitude: double;
        /** The estimated horizontal accuracy of the location, in meters; as defined by the sender. 0 if unknown */
        horizontal_accuracy: double;
    }
    
    
    /** Describes a venue */
    export interface venue {
        '@type': 'venue';
        /** Venue location; as defined by the sender */
        location: location;
        /** Venue name; as defined by the sender */
        title: string;
        /** Venue address; as defined by the sender */
        address: string;
        /** Provider of the venue database; as defined by the sender. Currently, only "foursquare" and "gplaces" (Google Places) need to be supported */
        provider: string;
        /** Identifier of the venue in the provider database; as defined by the sender */
        id: string;
        /** Type of the venue in the provider database; as defined by the sender */
        type: string;
    }
    
    
    /** Describes a game */
    export interface game {
        '@type': 'game';
        /** Game ID */
        id: int64;
        /** Game short name. To share a game use the URL https://t.me/{bot_username}?game={game_short_name} */
        short_name: string;
        /** Game title */
        title: string;
        /** Game text, usually containing scoreboards for a game */
        text: formattedText;
        /** Describes a game */
        description: string;
        /** Game photo */
        photo: photo;
        /** Game animation; may be null */
        animation?: animation;
    }
    
    
    /** Describes a poll */
    export interface poll {
        '@type': 'poll';
        /** Unique poll identifier */
        id: int64;
        /** Poll question; 1-300 characters */
        question: string;
        /** List of poll answer options */
        options: vector<pollOption>;
        /** Total number of voters, participating in the poll */
        total_voter_count: int32;
        /** User identifiers of recent voters, if the poll is non-anonymous */
        recent_voter_user_ids: vector<int53>;
        /** True, if the poll is anonymous */
        is_anonymous: Bool;
        /** Type of the poll */
        type: PollType;
        /** Amount of time the poll will be active after creation, in seconds */
        open_period: int32;
        /** Point in time (Unix timestamp) when the poll will automatically be closed */
        close_date: int32;
        /** True, if the poll is closed */
        is_closed: Bool;
    }
    
    
    /** Describes a user profile photo */
    export interface profilePhoto {
        '@type': 'profilePhoto';
        /** Photo identifier; 0 for an empty photo. Can be used to find a photo in a list of user profile photos */
        id: int64;
        /** A small (160x160) user profile photo. The file can be downloaded only before the photo is changed */
        small: file;
        /** A big (640x640) user profile photo. The file can be downloaded only before the photo is changed */
        big: file;
        /** User profile photo minithumbnail; may be null */
        minithumbnail?: minithumbnail;
        /** True, if the photo has animated variant */
        has_animation: Bool;
    }
    
    
    /** Contains basic information about the photo of a chat */
    export interface chatPhotoInfo {
        '@type': 'chatPhotoInfo';
        /** A small (160x160) chat photo variant in JPEG format. The file can be downloaded only before the photo is changed */
        small: file;
        /** A big (640x640) chat photo variant in JPEG format. The file can be downloaded only before the photo is changed */
        big: file;
        /** Chat photo minithumbnail; may be null */
        minithumbnail?: minithumbnail;
        /** True, if the photo has animated variant */
        has_animation: Bool;
    }
    
    
    /** A regular user */
    export interface userTypeRegular {
        '@type': 'userTypeRegular';
    }
    
    
    /** A deleted user or deleted bot. No information on the user besides the user identifier is available. It is not possible to perform any active actions on this type of user */
    export interface userTypeDeleted {
        '@type': 'userTypeDeleted';
    }
    
    
    /** A bot (see https://core.telegram.org/bots) */
    export interface userTypeBot {
        '@type': 'userTypeBot';
        /** True, if the bot can be invited to basic group and supergroup chats */
        can_join_groups: Bool;
        /** True, if the bot can read all messages in basic group or supergroup chats and not just those addressed to the bot. In private and channel chats a bot can always read all messages */
        can_read_all_group_messages: Bool;
        /** True, if the bot supports inline queries */
        is_inline: Bool;
        /** Placeholder for inline queries (displayed on the application input field) */
        inline_query_placeholder: string;
        /** True, if the location of the user is expected to be sent with every inline query to this bot */
        need_location: Bool;
        /** True, if the bot can be added to attachment menu */
        can_be_added_to_attachment_menu: Bool;
    }
    
    
    /** No information on the user besides the user identifier is available, yet this user has not been deleted. This object is extremely rare and must be handled like a deleted user. It is not possible to perform any actions on users of this type */
    export interface userTypeUnknown {
        '@type': 'userTypeUnknown';
    }
    
    
    /** Represents a command supported by a bot */
    export interface botCommand {
        '@type': 'botCommand';
        /** Text of the bot command */
        command: string;
        /** Represents a command supported by a bot */
        description: string;
    }
    
    
    /** Contains a list of bot commands */
    export interface botCommands {
        '@type': 'botCommands';
        /** Bot's user identifier */
        bot_user_id: int53;
        /** List of bot commands */
        commands: vector<botCommand>;
    }
    
    
    /** Describes a button to be shown instead of bot commands menu button */
    export interface botMenuButton {
        '@type': 'botMenuButton';
        /** Text of the button */
        text: string;
        /** URL to be passed to openWebApp */
        url: string;
    }
    
    
    /** Represents a location to which a chat is connected */
    export interface chatLocation {
        '@type': 'chatLocation';
        /** The location */
        location: location;
        /** Location address; 1-64 characters, as defined by the chat owner */
        address: string;
    }
    
    
    /** Animated variant of a chat photo in MPEG4 format */
    export interface animatedChatPhoto {
        '@type': 'animatedChatPhoto';
        /** Animation width and height */
        length: int32;
        /** Information about the animation file */
        file: file;
        /** Timestamp of the frame, used as a static chat photo */
        main_frame_timestamp: double;
    }
    
    
    /** Describes a chat or user profile photo */
    export interface chatPhoto {
        '@type': 'chatPhoto';
        /** Unique photo identifier */
        id: int64;
        /** Point in time (Unix timestamp) when the photo has been added */
        added_date: int32;
        /** Photo minithumbnail; may be null */
        minithumbnail?: minithumbnail;
        /** Available variants of the photo in JPEG format, in different size */
        sizes: vector<photoSize>;
        /** A big (640x640) animated variant of the photo in MPEG4 format; may be null */
        animation?: animatedChatPhoto;
        /** A small (160x160) animated variant of the photo in MPEG4 format; may be null even the big animation is available */
        small_animation?: animatedChatPhoto;
    }
    
    
    /** Contains a list of chat or user profile photos */
    export interface chatPhotos {
        '@type': 'chatPhotos';
        /** Total number of photos */
        total_count: int32;
        /** List of photos */
        photos: vector<chatPhoto>;
    }
    
    
    /** A previously used profile photo of the current user */
    export interface inputChatPhotoPrevious {
        '@type': 'inputChatPhotoPrevious';
        /** Identifier of the current user's profile photo to reuse */
        chat_photo_id: int64;
    }
    
    
    /** A static photo in JPEG format */
    export interface inputChatPhotoStatic {
        '@type': 'inputChatPhotoStatic';
        /** Photo to be set as profile photo. Only inputFileLocal and inputFileGenerated are allowed */
        photo: InputFile;
    }
    
    
    /** An animation in MPEG4 format; must be square, at most 10 seconds long, have width between 160 and 800 and be at most 2MB in size */
    export interface inputChatPhotoAnimation {
        '@type': 'inputChatPhotoAnimation';
        /** Animation to be set as profile photo. Only inputFileLocal and inputFileGenerated are allowed */
        animation: InputFile;
        /** Timestamp of the frame, which will be used as static chat photo */
        main_frame_timestamp: double;
    }
    
    
    /** Describes actions that a user is allowed to take in a chat */
    export interface chatPermissions {
        '@type': 'chatPermissions';
        /** True, if the user can send text messages, contacts, locations, and venues */
        can_send_messages: Bool;
        /** True, if the user can send audio files, documents, photos, videos, video notes, and voice notes. Implies can_send_messages permissions */
        can_send_media_messages: Bool;
        /** True, if the user can send polls. Implies can_send_messages permissions */
        can_send_polls: Bool;
        /** True, if the user can send animations, games, stickers, and dice and use inline bots. Implies can_send_messages permissions */
        can_send_other_messages: Bool;
        /** True, if the user may add a web page preview to their messages. Implies can_send_messages permissions */
        can_add_web_page_previews: Bool;
        /** True, if the user can change the chat title, photo, and other settings */
        can_change_info: Bool;
        /** True, if the user can invite new users to the chat */
        can_invite_users: Bool;
        /** True, if the user can pin messages */
        can_pin_messages: Bool;
    }
    
    
    /** Describes rights of the administrator */
    export interface chatAdministratorRights {
        '@type': 'chatAdministratorRights';
        /** True, if the administrator can get chat event log, get chat statistics, get message statistics in channels, get channel members, see anonymous administrators in supergroups and ignore slow mode. Implied by any other privilege; applicable to supergroups and channels only */
        can_manage_chat: Bool;
        /** True, if the administrator can change the chat title, photo, and other settings */
        can_change_info: Bool;
        /** True, if the administrator can create channel posts; applicable to channels only */
        can_post_messages: Bool;
        /** True, if the administrator can edit messages of other users and pin messages; applicable to channels only */
        can_edit_messages: Bool;
        /** True, if the administrator can delete messages of other users */
        can_delete_messages: Bool;
        /** True, if the administrator can invite new users to the chat */
        can_invite_users: Bool;
        /** True, if the administrator can restrict, ban, or unban chat members; always true for channels */
        can_restrict_members: Bool;
        /** True, if the administrator can pin messages; applicable to basic groups and supergroups only */
        can_pin_messages: Bool;
        /** True, if the administrator can add new administrators with a subset of their own privileges or demote administrators that were directly or indirectly promoted by them */
        can_promote_members: Bool;
        /** True, if the administrator can manage video chats */
        can_manage_video_chats: Bool;
        /** True, if the administrator isn't shown in the chat member list and sends messages anonymously; applicable to supergroups only */
        is_anonymous: Bool;
    }
    
    
    /** Represents a user */
    export interface user {
        '@type': 'user';
        /** User identifier */
        id: int53;
        /** First name of the user */
        first_name: string;
        /** Last name of the user */
        last_name: string;
        /** Username of the user */
        username: string;
        /** Phone number of the user */
        phone_number: string;
        /** Current online status of the user */
        status: UserStatus;
        /** Profile photo of the user; may be null */
        profile_photo?: profilePhoto;
        /** The user is a contact of the current user */
        is_contact: Bool;
        /** The user is a contact of the current user and the current user is a contact of the user */
        is_mutual_contact: Bool;
        /** True, if the user is verified */
        is_verified: Bool;
        /** True, if the user is a Telegram Premium user */
        is_premium: Bool;
        /** True, if the user is Telegram support account */
        is_support: Bool;
        /** If non-empty, it contains a human-readable description of the reason why access to this user must be restricted */
        restriction_reason: string;
        /** True, if many users reported this user as a scam */
        is_scam: Bool;
        /** True, if many users reported this user as a fake account */
        is_fake: Bool;
        /** If false, the user is inaccessible, and the only information known about the user is inside this class. Identifier of the user can't be passed to any method except GetUser */
        have_access: Bool;
        /** Type of the user */
        type: UserType;
        /** IETF language tag of the user's language; only available to bots */
        language_code: string;
        /** True, if the user added the current bot to attachment menu; only available to bots */
        added_to_attachment_menu: Bool;
    }
    
    
    /** Contains information about a bot */
    export interface botInfo {
        '@type': 'botInfo';
        /** The text that is shown on the bot's profile page and is sent together with the link when users share the bot */
        share_text: string;
        /** Contains information about a bot */
        description: string;
        /** Photo shown in the chat with the bot if the chat is empty; may be null */
        photo?: photo;
        /** Animation shown in the chat with the bot if the chat is empty; may be null */
        animation?: animation;
        /** Information about a button to show instead of the bot commands menu button; may be null if ordinary bot commands menu must be shown */
        menu_button?: botMenuButton;
        /** List of the bot commands */
        commands: vector<botCommand>;
        /** Default administrator rights for adding the bot to basic group and supergroup chats; may be null */
        default_group_administrator_rights?: chatAdministratorRights;
        /** Default administrator rights for adding the bot to channels; may be null */
        default_channel_administrator_rights?: chatAdministratorRights;
    }
    
    
    /** Contains full information about a user */
    export interface userFullInfo {
        '@type': 'userFullInfo';
        /** User profile photo; may be null */
        photo?: chatPhoto;
        /** True, if the user is blocked by the current user */
        is_blocked: Bool;
        /** True, if the user can be called */
        can_be_called: Bool;
        /** True, if a video call can be created with the user */
        supports_video_calls: Bool;
        /** True, if the user can't be called due to their privacy settings */
        has_private_calls: Bool;
        /** True, if the user can't be linked in forwarded messages due to their privacy settings */
        has_private_forwards: Bool;
        /** True, if the current user needs to explicitly allow to share their phone number with the user when the method addContact is used */
        need_phone_number_privacy_exception: Bool;
        /** A short user bio; may be null for bots */
        bio?: formattedText;
        /** Number of group chats where both the other user and the current user are a member; 0 for the current user */
        group_in_common_count: int32;
        /** For bots, information about the bot; may be null */
        bot_info?: botInfo;
    }
    
    
    /** Represents a list of users */
    export interface users {
        '@type': 'users';
        /** Approximate total number of users found */
        total_count: int32;
        /** A list of user identifiers */
        user_ids: vector<int53>;
    }
    
    
    /** Contains information about a chat administrator */
    export interface chatAdministrator {
        '@type': 'chatAdministrator';
        /** User identifier of the administrator */
        user_id: int53;
        /** Custom title of the administrator */
        custom_title: string;
        /** True, if the user is the owner of the chat */
        is_owner: Bool;
    }
    
    
    /** Represents a list of chat administrators */
    export interface chatAdministrators {
        '@type': 'chatAdministrators';
        /** A list of chat administrators */
        administrators: vector<chatAdministrator>;
    }
    
    
    /** The user is the owner of the chat and has all the administrator privileges */
    export interface chatMemberStatusCreator {
        '@type': 'chatMemberStatusCreator';
        /** A custom title of the owner; 0-16 characters without emojis; applicable to supergroups only */
        custom_title: string;
        /** True, if the creator isn't shown in the chat member list and sends messages anonymously; applicable to supergroups only */
        is_anonymous: Bool;
        /** True, if the user is a member of the chat */
        is_member: Bool;
    }
    
    
    /** The user is a member of the chat and has some additional privileges. In basic groups, administrators can edit and delete messages sent by others, add new members, ban unprivileged members, and manage video chats. In supergroups and channels, there are more detailed options for administrator privileges */
    export interface chatMemberStatusAdministrator {
        '@type': 'chatMemberStatusAdministrator';
        /** A custom title of the administrator; 0-16 characters without emojis; applicable to supergroups only */
        custom_title: string;
        /** True, if the current user can edit the administrator privileges for the called user */
        can_be_edited: Bool;
        /** Rights of the administrator */
        rights: chatAdministratorRights;
    }
    
    
    /** The user is a member of the chat, without any additional privileges or restrictions */
    export interface chatMemberStatusMember {
        '@type': 'chatMemberStatusMember';
    }
    
    
    /** The user is under certain restrictions in the chat. Not supported in basic groups and channels */
    export interface chatMemberStatusRestricted {
        '@type': 'chatMemberStatusRestricted';
        /** True, if the user is a member of the chat */
        is_member: Bool;
        /** Point in time (Unix timestamp) when restrictions will be lifted from the user; 0 if never. If the user is restricted for more than 366 days or for less than 30 seconds from the current time, the user is considered to be restricted forever */
        restricted_until_date: int32;
        /** User permissions in the chat */
        permissions: chatPermissions;
    }
    
    
    /** The user or the chat is not a chat member */
    export interface chatMemberStatusLeft {
        '@type': 'chatMemberStatusLeft';
    }
    
    
    /** The user or the chat was banned (and hence is not a member of the chat). Implies the user can't return to the chat, view messages, or be used as a participant identifier to join a video chat of the chat */
    export interface chatMemberStatusBanned {
        '@type': 'chatMemberStatusBanned';
        /** Point in time (Unix timestamp) when the user will be unbanned; 0 if never. If the user is banned for more than 366 days or for less than 30 seconds from the current time, the user is considered to be banned forever. Always 0 in basic groups */
        banned_until_date: int32;
    }
    
    
    /** Describes a user or a chat as a member of another chat */
    export interface chatMember {
        '@type': 'chatMember';
        /** Identifier of the chat member. Currently, other chats can be only Left or Banned. Only supergroups and channels can have other chats as Left or Banned members and these chats must be supergroups or channels */
        member_id: MessageSender;
        /** Identifier of a user that invited/promoted/banned this member in the chat; 0 if unknown */
        inviter_user_id: int53;
        /** Point in time (Unix timestamp) when the user joined the chat */
        joined_chat_date: int32;
        /** Status of the member in the chat */
        status: ChatMemberStatus;
    }
    
    
    /** Contains a list of chat members */
    export interface chatMembers {
        '@type': 'chatMembers';
        /** Approximate total number of chat members found */
        total_count: int32;
        /** A list of chat members */
        members: vector<chatMember>;
    }
    
    
    /** Returns contacts of the user */
    export interface chatMembersFilterContacts {
        '@type': 'chatMembersFilterContacts';
    }
    
    
    /** Returns the owner and administrators */
    export interface chatMembersFilterAdministrators {
        '@type': 'chatMembersFilterAdministrators';
    }
    
    
    /** Returns all chat members, including restricted chat members */
    export interface chatMembersFilterMembers {
        '@type': 'chatMembersFilterMembers';
    }
    
    
    /** Returns users which can be mentioned in the chat */
    export interface chatMembersFilterMention {
        '@type': 'chatMembersFilterMention';
        /** If non-zero, the identifier of the current message thread */
        message_thread_id: int53;
    }
    
    
    /** Returns users under certain restrictions in the chat; can be used only by administrators in a supergroup */
    export interface chatMembersFilterRestricted {
        '@type': 'chatMembersFilterRestricted';
    }
    
    
    /** Returns users banned from the chat; can be used only by administrators in a supergroup or in a channel */
    export interface chatMembersFilterBanned {
        '@type': 'chatMembersFilterBanned';
    }
    
    
    /** Returns bot members of the chat */
    export interface chatMembersFilterBots {
        '@type': 'chatMembersFilterBots';
    }
    
    
    /** Returns recently active users in reverse chronological order */
    export interface supergroupMembersFilterRecent {
        '@type': 'supergroupMembersFilterRecent';
    }
    
    
    /** Returns contacts of the user, which are members of the supergroup or channel */
    export interface supergroupMembersFilterContacts {
        '@type': 'supergroupMembersFilterContacts';
        /** Query to search for */
        query: string;
    }
    
    
    /** Returns the owner and administrators */
    export interface supergroupMembersFilterAdministrators {
        '@type': 'supergroupMembersFilterAdministrators';
    }
    
    
    /** Used to search for supergroup or channel members via a (string) query */
    export interface supergroupMembersFilterSearch {
        '@type': 'supergroupMembersFilterSearch';
        /** Query to search for */
        query: string;
    }
    
    
    /** Returns restricted supergroup members; can be used only by administrators */
    export interface supergroupMembersFilterRestricted {
        '@type': 'supergroupMembersFilterRestricted';
        /** Query to search for */
        query: string;
    }
    
    
    /** Returns users banned from the supergroup or channel; can be used only by administrators */
    export interface supergroupMembersFilterBanned {
        '@type': 'supergroupMembersFilterBanned';
        /** Query to search for */
        query: string;
    }
    
    
    /** Returns users which can be mentioned in the supergroup */
    export interface supergroupMembersFilterMention {
        '@type': 'supergroupMembersFilterMention';
        /** Query to search for */
        query: string;
        /** If non-zero, the identifier of the current message thread */
        message_thread_id: int53;
    }
    
    
    /** Returns bot members of the supergroup or channel */
    export interface supergroupMembersFilterBots {
        '@type': 'supergroupMembersFilterBots';
    }
    
    
    /** Contains a chat invite link */
    export interface chatInviteLink {
        '@type': 'chatInviteLink';
        /** Chat invite link */
        invite_link: string;
        /** Name of the link */
        name: string;
        /** User identifier of an administrator created the link */
        creator_user_id: int53;
        /** Point in time (Unix timestamp) when the link was created */
        date: int32;
        /** Point in time (Unix timestamp) when the link was last edited; 0 if never or unknown */
        edit_date: int32;
        /** Point in time (Unix timestamp) when the link will expire; 0 if never */
        expiration_date: int32;
        /** The maximum number of members, which can join the chat using the link simultaneously; 0 if not limited. Always 0 if the link requires approval */
        member_limit: int32;
        /** Number of chat members, which joined the chat using the link */
        member_count: int32;
        /** Number of pending join requests created using this link */
        pending_join_request_count: int32;
        /** True, if the link only creates join request. If true, total number of joining members will be unlimited */
        creates_join_request: Bool;
        /** True, if the link is primary. Primary invite link can't have name, expiration date, or usage limit. There is exactly one primary invite link for each administrator with can_invite_users right at a given time */
        is_primary: Bool;
        /** True, if the link was revoked */
        is_revoked: Bool;
    }
    
    
    /** Contains a list of chat invite links */
    export interface chatInviteLinks {
        '@type': 'chatInviteLinks';
        /** Approximate total number of chat invite links found */
        total_count: int32;
        /** List of invite links */
        invite_links: vector<chatInviteLink>;
    }
    
    
    /** Describes a chat administrator with a number of active and revoked chat invite links */
    export interface chatInviteLinkCount {
        '@type': 'chatInviteLinkCount';
        /** Administrator's user identifier */
        user_id: int53;
        /** Number of active invite links */
        invite_link_count: int32;
        /** Number of revoked invite links */
        revoked_invite_link_count: int32;
    }
    
    
    /** Contains a list of chat invite link counts */
    export interface chatInviteLinkCounts {
        '@type': 'chatInviteLinkCounts';
        /** List of invite link counts */
        invite_link_counts: vector<chatInviteLinkCount>;
    }
    
    
    /** Describes a chat member joined a chat via an invite link */
    export interface chatInviteLinkMember {
        '@type': 'chatInviteLinkMember';
        /** User identifier */
        user_id: int53;
        /** Point in time (Unix timestamp) when the user joined the chat */
        joined_chat_date: int32;
        /** User identifier of the chat administrator, approved user join request */
        approver_user_id: int53;
    }
    
    
    /** Contains a list of chat members joined a chat via an invite link */
    export interface chatInviteLinkMembers {
        '@type': 'chatInviteLinkMembers';
        /** Approximate total number of chat members found */
        total_count: int32;
        /** List of chat members, joined a chat via an invite link */
        members: vector<chatInviteLinkMember>;
    }
    
    
    /** Contains information about a chat invite link */
    export interface chatInviteLinkInfo {
        '@type': 'chatInviteLinkInfo';
        /** Chat identifier of the invite link; 0 if the user has no access to the chat before joining */
        chat_id: int53;
        /** If non-zero, the amount of time for which read access to the chat will remain available, in seconds */
        accessible_for: int32;
        /** Type of the chat */
        type: ChatType;
        /** Title of the chat */
        title: string;
        /** Chat photo; may be null */
        photo?: chatPhotoInfo;
        /** Contains information about a chat invite link */
        description: string;
        /** Number of members in the chat */
        member_count: int32;
        /** User identifiers of some chat members that may be known to the current user */
        member_user_ids: vector<int53>;
        /** True, if the link only creates join request */
        creates_join_request: Bool;
        /** True, if the chat is a public supergroup or channel, i.e. it has a username or it is a location-based supergroup */
        is_public: Bool;
    }
    
    
    /** Describes a user that sent a join request and waits for administrator approval */
    export interface chatJoinRequest {
        '@type': 'chatJoinRequest';
        /** User identifier */
        user_id: int53;
        /** Point in time (Unix timestamp) when the user sent the join request */
        date: int32;
        /** A short bio of the user */
        bio: string;
    }
    
    
    /** Contains a list of requests to join a chat */
    export interface chatJoinRequests {
        '@type': 'chatJoinRequests';
        /** Approximate total number of requests found */
        total_count: int32;
        /** List of the requests */
        requests: vector<chatJoinRequest>;
    }
    
    
    /** Contains information about pending join requests for a chat */
    export interface chatJoinRequestsInfo {
        '@type': 'chatJoinRequestsInfo';
        /** Total number of pending join requests */
        total_count: int32;
        /** Identifiers of at most 3 users sent the newest pending join requests */
        user_ids: vector<int53>;
    }
    
    
    /** Represents a basic group of 0-200 users (must be upgraded to a supergroup to accommodate more than 200 users) */
    export interface basicGroup {
        '@type': 'basicGroup';
        /** Group identifier */
        id: int53;
        /** Number of members in the group */
        member_count: int32;
        /** Status of the current user in the group */
        status: ChatMemberStatus;
        /** True, if the group is active */
        is_active: Bool;
        /** Identifier of the supergroup to which this group was upgraded; 0 if none */
        upgraded_to_supergroup_id: int53;
    }
    
    
    /** Contains full information about a basic group */
    export interface basicGroupFullInfo {
        '@type': 'basicGroupFullInfo';
        /** Chat photo; may be null */
        photo?: chatPhoto;
        /** Contains full information about a basic group */
        description: string;
        /** User identifier of the creator of the group; 0 if unknown */
        creator_user_id: int53;
        /** Group members */
        members: vector<chatMember>;
        /** Primary invite link for this group; may be null. For chat administrators with can_invite_users right only. Updated only after the basic group is opened */
        invite_link?: chatInviteLink;
        /** List of commands of bots in the group */
        bot_commands: vector<botCommands>;
    }
    
    
    /** Represents a supergroup or channel with zero or more members (subscribers in the case of channels). From the point of view of the system, a channel is a special kind of a supergroup: only administrators can post and see the list of members, and posts from all administrators use the name and photo of the channel instead of individual names and profile photos. Unlike supergroups, channels can have an unlimited number of subscribers */
    export interface supergroup {
        '@type': 'supergroup';
        /** Supergroup or channel identifier */
        id: int53;
        /** Username of the supergroup or channel; empty for private supergroups or channels */
        username: string;
        /** Point in time (Unix timestamp) when the current user joined, or the point in time when the supergroup or channel was created, in case the user is not a member */
        date: int32;
        /** Status of the current user in the supergroup or channel; custom title will be always empty */
        status: ChatMemberStatus;
        /** Number of members in the supergroup or channel; 0 if unknown. Currently, it is guaranteed to be known only if the supergroup or channel was received through searchPublicChats, searchChatsNearby, getInactiveSupergroupChats, getSuitableDiscussionChats, getGroupsInCommon, or getUserPrivacySettingRules */
        member_count: int32;
        /** True, if the channel has a discussion group, or the supergroup is the designated discussion group for a channel */
        has_linked_chat: Bool;
        /** True, if the supergroup is connected to a location, i.e. the supergroup is a location-based supergroup */
        has_location: Bool;
        /** True, if messages sent to the channel need to contain information about the sender. This field is only applicable to channels */
        sign_messages: Bool;
        /** True, if users need to join the supergroup before they can send messages. Always true for channels and non-discussion supergroups */
        join_to_send_messages: Bool;
        /** True, if all users directly joining the supergroup need to be approved by supergroup administrators. Always false for channels and supergroups without username, location, or a linked chat */
        join_by_request: Bool;
        /** True, if the slow mode is enabled in the supergroup */
        is_slow_mode_enabled: Bool;
        /** True, if the supergroup is a channel */
        is_channel: Bool;
        /** True, if the supergroup is a broadcast group, i.e. only administrators can send messages and there is no limit on the number of members */
        is_broadcast_group: Bool;
        /** True, if the supergroup or channel is verified */
        is_verified: Bool;
        /** If non-empty, contains a human-readable description of the reason why access to this supergroup or channel must be restricted */
        restriction_reason: string;
        /** True, if many users reported this supergroup or channel as a scam */
        is_scam: Bool;
        /** True, if many users reported this supergroup or channel as a fake account */
        is_fake: Bool;
    }
    
    
    /** Contains full information about a supergroup or channel */
    export interface supergroupFullInfo {
        '@type': 'supergroupFullInfo';
        /** Chat photo; may be null */
        photo?: chatPhoto;
        /** Contains full information about a supergroup or channel */
        description: string;
        /** Number of members in the supergroup or channel; 0 if unknown */
        member_count: int32;
        /** Number of privileged users in the supergroup or channel; 0 if unknown */
        administrator_count: int32;
        /** Number of restricted users in the supergroup; 0 if unknown */
        restricted_count: int32;
        /** Number of users banned from chat; 0 if unknown */
        banned_count: int32;
        /** Chat identifier of a discussion group for the channel, or a channel, for which the supergroup is the designated discussion group; 0 if none or unknown */
        linked_chat_id: int53;
        /** Delay between consecutive sent messages for non-administrator supergroup members, in seconds */
        slow_mode_delay: int32;
        /** Time left before next message can be sent in the supergroup, in seconds. An updateSupergroupFullInfo update is not triggered when value of this field changes, but both new and old values are non-zero */
        slow_mode_delay_expires_in: double;
        /** True, if members of the chat can be retrieved */
        can_get_members: Bool;
        /** True, if the chat username can be changed */
        can_set_username: Bool;
        /** True, if the supergroup sticker set can be changed */
        can_set_sticker_set: Bool;
        /** True, if the supergroup location can be changed */
        can_set_location: Bool;
        /** True, if the supergroup or channel statistics are available */
        can_get_statistics: Bool;
        /** True, if new chat members will have access to old messages. In public or discussion groups and both public and private channels, old messages are always available, so this option affects only private supergroups without a linked chat. The value of this field is only available for chat administrators */
        is_all_history_available: Bool;
        /** Identifier of the supergroup sticker set; 0 if none */
        sticker_set_id: int64;
        /** Location to which the supergroup is connected; may be null */
        location?: chatLocation;
        /** Primary invite link for the chat; may be null. For chat administrators with can_invite_users right only */
        invite_link?: chatInviteLink;
        /** List of commands of bots in the group */
        bot_commands: vector<botCommands>;
        /** Identifier of the basic group from which supergroup was upgraded; 0 if none */
        upgraded_from_basic_group_id: int53;
        /** Identifier of the last message in the basic group from which supergroup was upgraded; 0 if none */
        upgraded_from_max_message_id: int53;
    }
    
    
    /** The secret chat is not yet created; waiting for the other user to get online */
    export interface secretChatStatePending {
        '@type': 'secretChatStatePending';
    }
    
    
    /** The secret chat is ready to use */
    export interface secretChatStateReady {
        '@type': 'secretChatStateReady';
    }
    
    
    /** The secret chat is closed */
    export interface secretChatStateClosed {
        '@type': 'secretChatStateClosed';
    }
    
    
    /** Represents a secret chat */
    export interface secretChat {
        '@type': 'secretChat';
        /** Secret chat identifier */
        id: int32;
        /** Identifier of the chat partner */
        user_id: int53;
        /** State of the secret chat */
        state: SecretChatState;
        /** True, if the chat was created by the current user; otherwise false */
        is_outbound: Bool;
        /** Hash of the currently used key for comparison with the hash of the chat partner's key. This is a string of 36 little-endian bytes, which must be split into groups of 2 bits, each denoting a pixel of one of 4 colors FFFFFF, D5E6F3, 2D5775, and 2F99C9. -The pixels must be used to make a 12x12 square image filled from left to right, top to bottom. Alternatively, the first 32 bytes of the hash can be converted to the hexadecimal format and printed as 32 2-digit hex numbers */
        key_hash: bytes;
        /** Secret chat layer; determines features supported by the chat partner's application. Nested text entities and underline and strikethrough entities are supported if the layer >= 101, files bigger than 2000MB are supported if the layer >= 143 */
        layer: int32;
    }
    
    
    /** The message was sent by a known user */
    export interface messageSenderUser {
        '@type': 'messageSenderUser';
        /** Identifier of the user that sent the message */
        user_id: int53;
    }
    
    
    /** The message was sent on behalf of a chat */
    export interface messageSenderChat {
        '@type': 'messageSenderChat';
        /** Identifier of the chat that sent the message */
        chat_id: int53;
    }
    
    
    /** Represents a list of message senders */
    export interface messageSenders {
        '@type': 'messageSenders';
        /** Approximate total number of messages senders found */
        total_count: int32;
        /** List of message senders */
        senders: vector<MessageSender>;
    }
    
    
    /** The message was originally sent by a known user */
    export interface messageForwardOriginUser {
        '@type': 'messageForwardOriginUser';
        /** Identifier of the user that originally sent the message */
        sender_user_id: int53;
    }
    
    
    /** The message was originally sent on behalf of a chat */
    export interface messageForwardOriginChat {
        '@type': 'messageForwardOriginChat';
        /** Identifier of the chat that originally sent the message */
        sender_chat_id: int53;
        /** For messages originally sent by an anonymous chat administrator, original message author signature */
        author_signature: string;
    }
    
    
    /** The message was originally sent by a user, which is hidden by their privacy settings */
    export interface messageForwardOriginHiddenUser {
        '@type': 'messageForwardOriginHiddenUser';
        /** Name of the sender */
        sender_name: string;
    }
    
    
    /** The message was originally a post in a channel */
    export interface messageForwardOriginChannel {
        '@type': 'messageForwardOriginChannel';
        /** Identifier of the chat from which the message was originally forwarded */
        chat_id: int53;
        /** Message identifier of the original message */
        message_id: int53;
        /** Original post author signature */
        author_signature: string;
    }
    
    
    /** The message was imported from an exported message history */
    export interface messageForwardOriginMessageImport {
        '@type': 'messageForwardOriginMessageImport';
        /** Name of the sender */
        sender_name: string;
    }
    
    
    /** Contains information about a forwarded message */
    export interface messageForwardInfo {
        '@type': 'messageForwardInfo';
        /** Origin of a forwarded message */
        origin: MessageForwardOrigin;
        /** Point in time (Unix timestamp) when the message was originally sent */
        date: int32;
        /** The type of a public service announcement for the forwarded message */
        public_service_announcement_type: string;
        /** For messages forwarded to the chat with the current user (Saved Messages), to the Replies bot chat, or to the channel's discussion group, the identifier of the chat from which the message was forwarded last time; 0 if unknown */
        from_chat_id: int53;
        /** For messages forwarded to the chat with the current user (Saved Messages), to the Replies bot chat, or to the channel's discussion group, the identifier of the original message from which the new message was forwarded last time; 0 if unknown */
        from_message_id: int53;
    }
    
    
    /** Contains information about replies to a message */
    export interface messageReplyInfo {
        '@type': 'messageReplyInfo';
        /** Number of times the message was directly or indirectly replied */
        reply_count: int32;
        /** Identifiers of at most 3 recent repliers to the message; available in channels with a discussion supergroup. The users and chats are expected to be inaccessible: only their photo and name will be available */
        recent_replier_ids: vector<MessageSender>;
        /** Identifier of the last read incoming reply to the message */
        last_read_inbox_message_id: int53;
        /** Identifier of the last read outgoing reply to the message */
        last_read_outbox_message_id: int53;
        /** Identifier of the last reply to the message */
        last_message_id: int53;
    }
    
    
    /** Contains information about a reaction to a message */
    export interface messageReaction {
        '@type': 'messageReaction';
        /** Text representation of the reaction */
        reaction: string;
        /** Number of times the reaction was added */
        total_count: int32;
        /** True, if the reaction is chosen by the current user */
        is_chosen: Bool;
        /** Identifiers of at most 3 recent message senders, added the reaction; available in private, basic group and supergroup chats */
        recent_sender_ids: vector<MessageSender>;
    }
    
    
    /** Contains information about interactions with a message */
    export interface messageInteractionInfo {
        '@type': 'messageInteractionInfo';
        /** Number of times the message was viewed */
        view_count: int32;
        /** Number of times the message was forwarded */
        forward_count: int32;
        /** Information about direct or indirect replies to the message; may be null. Currently, available only in channels with a discussion supergroup and discussion supergroups for messages, which are not replies itself */
        reply_info?: messageReplyInfo;
        /** The list of reactions added to the message */
        reactions: vector<messageReaction>;
    }
    
    
    /** Contains information about an unread reaction to a message */
    export interface unreadReaction {
        '@type': 'unreadReaction';
        /** Text representation of the reaction */
        reaction: string;
        /** Identifier of the sender, added the reaction */
        sender_id: MessageSender;
        /** True, if the reaction was added with a big animation */
        is_big: Bool;
    }
    
    
    /** The message is being sent now, but has not yet been delivered to the server */
    export interface messageSendingStatePending {
        '@type': 'messageSendingStatePending';
    }
    
    
    /** The message failed to be sent */
    export interface messageSendingStateFailed {
        '@type': 'messageSendingStateFailed';
        /** An error code; 0 if unknown */
        error_code: int32;
        /** Error message */
        error_message: string;
        /** True, if the message can be re-sent */
        can_retry: Bool;
        /** True, if the message can be re-sent only on behalf of a different sender */
        need_another_sender: Bool;
        /** Time left before the message can be re-sent, in seconds. No update is sent when this field changes */
        retry_after: double;
    }
    
    
    /** Describes a message */
    export interface message {
        '@type': 'message';
        /** Message identifier; unique for the chat to which the message belongs */
        id: int53;
        /** Identifier of the sender of the message */
        sender_id: MessageSender;
        /** Chat identifier */
        chat_id: int53;
        /** The sending state of the message; may be null */
        sending_state?: MessageSendingState;
        /** The scheduling state of the message; may be null */
        scheduling_state?: MessageSchedulingState;
        /** True, if the message is outgoing */
        is_outgoing: Bool;
        /** True, if the message is pinned */
        is_pinned: Bool;
        /** True, if the message can be edited. For live location and poll messages this fields shows whether editMessageLiveLocation or stopPoll can be used with this message by the application */
        can_be_edited: Bool;
        /** True, if the message can be forwarded */
        can_be_forwarded: Bool;
        /** True, if content of the message can be saved locally or copied */
        can_be_saved: Bool;
        /** True, if the message can be deleted only for the current user while other users will continue to see it */
        can_be_deleted_only_for_self: Bool;
        /** True, if the message can be deleted for all users */
        can_be_deleted_for_all_users: Bool;
        /** True, if the list of added reactions is available through getMessageAddedReactions */
        can_get_added_reactions: Bool;
        /** True, if the message statistics are available through getMessageStatistics */
        can_get_statistics: Bool;
        /** True, if information about the message thread is available through getMessageThread */
        can_get_message_thread: Bool;
        /** True, if chat members already viewed the message can be received through getMessageViewers */
        can_get_viewers: Bool;
        /** True, if media timestamp links can be generated for media timestamp entities in the message text, caption or web page description through getMessageLink */
        can_get_media_timestamp_links: Bool;
        /** True, if media timestamp entities refers to a media in this message as opposed to a media in the replied message */
        has_timestamped_media: Bool;
        /** True, if the message is a channel post. All messages to channels are channel posts, all other messages are not channel posts */
        is_channel_post: Bool;
        /** True, if the message contains an unread mention for the current user */
        contains_unread_mention: Bool;
        /** Point in time (Unix timestamp) when the message was sent */
        date: int32;
        /** Point in time (Unix timestamp) when the message was last edited */
        edit_date: int32;
        /** Information about the initial message sender; may be null */
        forward_info?: messageForwardInfo;
        /** Information about interactions with the message; may be null */
        interaction_info?: messageInteractionInfo;
        /** Information about unread reactions added to the message */
        unread_reactions: vector<unreadReaction>;
        /** If non-zero, the identifier of the chat to which the replied message belongs; Currently, only messages in the Replies chat can have different reply_in_chat_id and chat_id */
        reply_in_chat_id: int53;
        /** If non-zero, the identifier of the message this message is replying to; can be the identifier of a deleted message */
        reply_to_message_id: int53;
        /** If non-zero, the identifier of the message thread the message belongs to; unique within the chat to which the message belongs */
        message_thread_id: int53;
        /** For self-destructing messages, the message's TTL (Time To Live), in seconds; 0 if none. TDLib will send updateDeleteMessages or updateMessageContent once the TTL expires */
        ttl: int32;
        /** Time left before the message expires, in seconds. If the TTL timer isn't started yet, equals to the value of the ttl field */
        ttl_expires_in: double;
        /** If non-zero, the user identifier of the bot through which this message was sent */
        via_bot_user_id: int53;
        /** For channel posts and anonymous group messages, optional author signature */
        author_signature: string;
        /** Unique identifier of an album this message belongs to. Only audios, documents, photos and videos can be grouped together in albums */
        media_album_id: int64;
        /** If non-empty, contains a human-readable description of the reason why access to this message must be restricted */
        restriction_reason: string;
        /** Content of the message */
        content: MessageContent;
        /** Reply markup for the message; may be null */
        reply_markup?: ReplyMarkup;
    }
    
    
    /** Contains a list of messages */
    export interface messages {
        '@type': 'messages';
        /** Approximate total number of messages found */
        total_count: int32;
        /** List of messages; messages may be null */
        messages?: vector<message>;
    }
    
    
    /** Contains a list of messages found by a search */
    export interface foundMessages {
        '@type': 'foundMessages';
        /** Approximate total number of messages found; -1 if unknown */
        total_count: int32;
        /** List of messages */
        messages: vector<message>;
        /** The offset for the next request. If empty, there are no more results */
        next_offset: string;
    }
    
    
    /** Contains information about a message in a specific position */
    export interface messagePosition {
        '@type': 'messagePosition';
        /** 0-based message position in the full list of suitable messages */
        position: int32;
        /** Message identifier */
        message_id: int53;
        /** Point in time (Unix timestamp) when the message was sent */
        date: int32;
    }
    
    
    /** Contains a list of message positions */
    export interface messagePositions {
        '@type': 'messagePositions';
        /** Total number of messages found */
        total_count: int32;
        /** List of message positions */
        positions: vector<messagePosition>;
    }
    
    
    /** Contains information about found messages sent on a specific day */
    export interface messageCalendarDay {
        '@type': 'messageCalendarDay';
        /** Total number of found messages sent on the day */
        total_count: int32;
        /** First message sent on the day */
        message: message;
    }
    
    
    /** Contains information about found messages, split by days according to the option "utc_time_offset" */
    export interface messageCalendar {
        '@type': 'messageCalendar';
        /** Total number of found messages */
        total_count: int32;
        /** Information about messages sent */
        days: vector<messageCalendarDay>;
    }
    
    
    /** Describes a sponsored message */
    export interface sponsoredMessage {
        '@type': 'sponsoredMessage';
        /** Message identifier; unique for the chat to which the sponsored message belongs among both ordinary and sponsored messages */
        message_id: int53;
        /** True, if the message needs to be labeled as "recommended" instead of "sponsored" */
        is_recommended: Bool;
        /** Sponsor chat identifier; 0 if the sponsor chat is accessible through an invite link */
        sponsor_chat_id: int53;
        /** Information about the sponsor chat; may be null unless sponsor_chat_id == 0 */
        sponsor_chat_info?: chatInviteLinkInfo;
        /** An internal link to be opened when the sponsored message is clicked; may be null if the sponsor chat needs to be opened instead */
        link?: InternalLinkType;
        /** Content of the message. Currently, can be only of the type messageText */
        content: MessageContent;
    }
    
    
    /** Describes a file added to file download list */
    export interface fileDownload {
        '@type': 'fileDownload';
        /** File identifier */
        file_id: int32;
        /** The message with the file */
        message: message;
        /** Point in time (Unix timestamp) when the file was added to the download list */
        add_date: int32;
        /** Point in time (Unix timestamp) when the file downloading was completed; 0 if the file downloading isn't completed */
        complete_date: int32;
        /** True, if downloading of the file is paused */
        is_paused: Bool;
    }
    
    
    /** Contains number of being downloaded and recently downloaded files found */
    export interface downloadedFileCounts {
        '@type': 'downloadedFileCounts';
        /** Number of active file downloads found, including paused */
        active_count: int32;
        /** Number of paused file downloads found */
        paused_count: int32;
        /** Number of completed file downloads found */
        completed_count: int32;
    }
    
    
    /** Contains a list of downloaded files, found by a search */
    export interface foundFileDownloads {
        '@type': 'foundFileDownloads';
        /** Total number of suitable files, ignoring offset */
        total_counts: downloadedFileCounts;
        /** The list of files */
        files: vector<fileDownload>;
        /** The offset for the next request. If empty, there are no more results */
        next_offset: string;
    }
    
    
    /** Notification settings applied to all private and secret chats when the corresponding chat setting has a default value */
    export interface notificationSettingsScopePrivateChats {
        '@type': 'notificationSettingsScopePrivateChats';
    }
    
    
    /** Notification settings applied to all basic group and supergroup chats when the corresponding chat setting has a default value */
    export interface notificationSettingsScopeGroupChats {
        '@type': 'notificationSettingsScopeGroupChats';
    }
    
    
    /** Notification settings applied to all channel chats when the corresponding chat setting has a default value */
    export interface notificationSettingsScopeChannelChats {
        '@type': 'notificationSettingsScopeChannelChats';
    }
    
    
    /** Contains information about notification settings for a chat */
    export interface chatNotificationSettings {
        '@type': 'chatNotificationSettings';
        /** If true, mute_for is ignored and the value for the relevant type of chat is used instead */
        use_default_mute_for: Bool;
        /** Time left before notifications will be unmuted, in seconds */
        mute_for: int32;
        /** If true, the value for the relevant type of chat is used instead of sound_id */
        use_default_sound: Bool;
        /** Identifier of the notification sound to be played; 0 if sound is disabled */
        sound_id: int64;
        /** If true, show_preview is ignored and the value for the relevant type of chat is used instead */
        use_default_show_preview: Bool;
        /** True, if message content must be displayed in notifications */
        show_preview: Bool;
        /** If true, disable_pinned_message_notifications is ignored and the value for the relevant type of chat is used instead */
        use_default_disable_pinned_message_notifications: Bool;
        /** If true, notifications for incoming pinned messages will be created as for an ordinary unread message */
        disable_pinned_message_notifications: Bool;
        /** If true, disable_mention_notifications is ignored and the value for the relevant type of chat is used instead */
        use_default_disable_mention_notifications: Bool;
        /** If true, notifications for messages with mentions will be created as for an ordinary unread message */
        disable_mention_notifications: Bool;
    }
    
    
    /** Contains information about notification settings for several chats */
    export interface scopeNotificationSettings {
        '@type': 'scopeNotificationSettings';
        /** Time left before notifications will be unmuted, in seconds */
        mute_for: int32;
        /** Identifier of the notification sound to be played; 0 if sound is disabled */
        sound_id: int64;
        /** True, if message content must be displayed in notifications */
        show_preview: Bool;
        /** True, if notifications for incoming pinned messages will be created as for an ordinary unread message */
        disable_pinned_message_notifications: Bool;
        /** True, if notifications for messages with mentions will be created as for an ordinary unread message */
        disable_mention_notifications: Bool;
    }
    
    
    /** Contains information about a message draft */
    export interface draftMessage {
        '@type': 'draftMessage';
        /** Identifier of the replied message; 0 if none */
        reply_to_message_id: int53;
        /** Point in time (Unix timestamp) when the draft was created */
        date: int32;
        /** Content of the message draft; must be of the type inputMessageText */
        input_message_text: InputMessageContent;
    }
    
    
    /** An ordinary chat with a user */
    export interface chatTypePrivate {
        '@type': 'chatTypePrivate';
        /** User identifier */
        user_id: int53;
    }
    
    
    /** A basic group (a chat with 0-200 other users) */
    export interface chatTypeBasicGroup {
        '@type': 'chatTypeBasicGroup';
        /** Basic group identifier */
        basic_group_id: int53;
    }
    
    
    /** A supergroup or channel (with unlimited members) */
    export interface chatTypeSupergroup {
        '@type': 'chatTypeSupergroup';
        /** Supergroup or channel identifier */
        supergroup_id: int53;
        /** True, if the supergroup is a channel */
        is_channel: Bool;
    }
    
    
    /** A secret chat with a user */
    export interface chatTypeSecret {
        '@type': 'chatTypeSecret';
        /** Secret chat identifier */
        secret_chat_id: int32;
        /** User identifier of the secret chat peer */
        user_id: int53;
    }
    
    
    /** Represents a filter of user chats */
    export interface chatFilter {
        '@type': 'chatFilter';
        /** The title of the filter; 1-12 characters without line feeds */
        title: string;
        /** The chosen icon name for short filter representation. If non-empty, must be one of "All", "Unread", "Unmuted", "Bots", "Channels", "Groups", "Private", "Custom", "Setup", "Cat", "Crown", "Favorite", "Flower", "Game", "Home", "Love", "Mask", "Party", "Sport", "Study", "Trade", "Travel", "Work", "Airplane", "Book", "Light", "Like", "Money", "Note", "Palette". -If empty, use getChatFilterDefaultIconName to get default icon name for the filter */
        icon_name: string;
        /** The chat identifiers of pinned chats in the filtered chat list. There can be up to GetOption("chat_filter_chosen_chat_count_max") pinned and always included non-secret chats and the same number of secret chats, but the limit can be increased with Telegram Premium */
        pinned_chat_ids: vector<int53>;
        /** The chat identifiers of always included chats in the filtered chat list. There can be up to GetOption("chat_filter_chosen_chat_count_max") pinned and always included non-secret chats and the same number of secret chats, but the limit can be increased with Telegram Premium */
        included_chat_ids: vector<int53>;
        /** The chat identifiers of always excluded chats in the filtered chat list. There can be up to GetOption("chat_filter_chosen_chat_count_max") always excluded non-secret chats and the same number of secret chats, but the limit can be increased with Telegram Premium */
        excluded_chat_ids: vector<int53>;
        /** True, if muted chats need to be excluded */
        exclude_muted: Bool;
        /** True, if read chats need to be excluded */
        exclude_read: Bool;
        /** True, if archived chats need to be excluded */
        exclude_archived: Bool;
        /** True, if contacts need to be included */
        include_contacts: Bool;
        /** True, if non-contact users need to be included */
        include_non_contacts: Bool;
        /** True, if bots need to be included */
        include_bots: Bool;
        /** True, if basic groups and supergroups need to be included */
        include_groups: Bool;
        /** True, if channels need to be included */
        include_channels: Bool;
    }
    
    
    /** Contains basic information about a chat filter */
    export interface chatFilterInfo {
        '@type': 'chatFilterInfo';
        /** Unique chat filter identifier */
        id: int32;
        /** The title of the filter; 1-12 characters without line feeds */
        title: string;
        /** The chosen or default icon name for short filter representation. One of "All", "Unread", "Unmuted", "Bots", "Channels", "Groups", "Private", "Custom", "Setup", "Cat", "Crown", "Favorite", "Flower", "Game", "Home", "Love", "Mask", "Party", "Sport", "Study", "Trade", "Travel", "Work", "Airplane", "Book", "Light", "Like", "Money", "Note", "Palette" */
        icon_name: string;
    }
    
    
    /** Describes a recommended chat filter */
    export interface recommendedChatFilter {
        '@type': 'recommendedChatFilter';
        /** The chat filter */
        filter: chatFilter;
        /** Describes a recommended chat filter */
        description: string;
    }
    
    
    /** Contains a list of recommended chat filters */
    export interface recommendedChatFilters {
        '@type': 'recommendedChatFilters';
        /** List of recommended chat filters */
        chat_filters: vector<recommendedChatFilter>;
    }
    
    
    /** A main list of chats */
    export interface chatListMain {
        '@type': 'chatListMain';
    }
    
    
    /** A list of chats usually located at the top of the main chat list. Unmuted chats are automatically moved from the Archive to the Main chat list when a new message arrives */
    export interface chatListArchive {
        '@type': 'chatListArchive';
    }
    
    
    /** A list of chats belonging to a chat filter */
    export interface chatListFilter {
        '@type': 'chatListFilter';
        /** Chat filter identifier */
        chat_filter_id: int32;
    }
    
    
    /** Contains a list of chat lists */
    export interface chatLists {
        '@type': 'chatLists';
        /** List of chat lists */
        chat_lists: vector<ChatList>;
    }
    
    
    /** The chat is sponsored by the user's MTProxy server */
    export interface chatSourceMtprotoProxy {
        '@type': 'chatSourceMtprotoProxy';
    }
    
    
    /** The chat contains a public service announcement */
    export interface chatSourcePublicServiceAnnouncement {
        '@type': 'chatSourcePublicServiceAnnouncement';
        /** The type of the announcement */
        type: string;
        /** The text of the announcement */
        text: string;
    }
    
    
    /** Describes a position of a chat in a chat list */
    export interface chatPosition {
        '@type': 'chatPosition';
        /** The chat list */
        list: ChatList;
        /** A parameter used to determine order of the chat in the chat list. Chats must be sorted by the pair (order, chat.id) in descending order */
        order: int64;
        /** True, if the chat is pinned in the chat list */
        is_pinned: Bool;
        /** Source of the chat in the chat list; may be null */
        source?: ChatSource;
    }
    
    
    /** Describes a video chat */
    export interface videoChat {
        '@type': 'videoChat';
        /** Group call identifier of an active video chat; 0 if none. Full information about the video chat can be received through the method getGroupCall */
        group_call_id: int32;
        /** True, if the video chat has participants */
        has_participants: Bool;
        /** Default group call participant identifier to join the video chat; may be null */
        default_participant_id?: MessageSender;
    }
    
    
    /** A chat. (Can be a private chat, basic group, supergroup, or secret chat) */
    export interface chat {
        '@type': 'chat';
        /** Chat unique identifier */
        id: int53;
        /** Type of the chat */
        type: ChatType;
        /** Chat title */
        title: string;
        /** Chat photo; may be null */
        photo?: chatPhotoInfo;
        /** Actions that non-administrator chat members are allowed to take in the chat */
        permissions: chatPermissions;
        /** Last message in the chat; may be null */
        last_message?: message;
        /** Positions of the chat in chat lists */
        positions: vector<chatPosition>;
        /** Identifier of a user or chat that is selected to send messages in the chat; may be null if the user can't change message sender */
        message_sender_id?: MessageSender;
        /** True, if chat content can't be saved locally, forwarded, or copied */
        has_protected_content: Bool;
        /** True, if the chat is marked as unread */
        is_marked_as_unread: Bool;
        /** True, if the chat is blocked by the current user and private messages from the chat can't be received */
        is_blocked: Bool;
        /** True, if the chat has scheduled messages */
        has_scheduled_messages: Bool;
        /** True, if the chat messages can be deleted only for the current user while other users will continue to see the messages */
        can_be_deleted_only_for_self: Bool;
        /** True, if the chat messages can be deleted for all users */
        can_be_deleted_for_all_users: Bool;
        /** True, if the chat can be reported to Telegram moderators through reportChat or reportChatPhoto */
        can_be_reported: Bool;
        /** Default value of the disable_notification parameter, used when a message is sent to the chat */
        default_disable_notification: Bool;
        /** Number of unread messages in the chat */
        unread_count: int32;
        /** Identifier of the last read incoming message */
        last_read_inbox_message_id: int53;
        /** Identifier of the last read outgoing message */
        last_read_outbox_message_id: int53;
        /** Number of unread messages with a mention/reply in the chat */
        unread_mention_count: int32;
        /** Number of messages with unread reactions in the chat */
        unread_reaction_count: int32;
        /** Notification settings for the chat */
        notification_settings: chatNotificationSettings;
        /** List of reactions, available in the chat */
        available_reactions: vector<string>;
        /** Current message Time To Live setting (self-destruct timer) for the chat; 0 if not defined. TTL is counted from the time message or its content is viewed in secret chats and from the send date in other chats */
        message_ttl: int32;
        /** If non-empty, name of a theme, set for the chat */
        theme_name: string;
        /** Information about actions which must be possible to do through the chat action bar; may be null */
        action_bar?: ChatActionBar;
        /** Information about video chat of the chat */
        video_chat: videoChat;
        /** Information about pending join requests; may be null */
        pending_join_requests?: chatJoinRequestsInfo;
        /** Identifier of the message from which reply markup needs to be used; 0 if there is no default custom reply markup in the chat */
        reply_markup_message_id: int53;
        /** A draft of a message in the chat; may be null */
        draft_message?: draftMessage;
        /** Application-specific data associated with the chat. (For example, the chat scroll position or local chat notification settings can be stored here.) Persistent if the message database is used */
        client_data: string;
    }
    
    
    /** Represents a list of chats */
    export interface chats {
        '@type': 'chats';
        /** Approximate total number of chats found */
        total_count: int32;
        /** List of chat identifiers */
        chat_ids: vector<int53>;
    }
    
    
    /** Describes a chat located nearby */
    export interface chatNearby {
        '@type': 'chatNearby';
        /** Chat identifier */
        chat_id: int53;
        /** Distance to the chat location, in meters */
        distance: int32;
    }
    
    
    /** Represents a list of chats located nearby */
    export interface chatsNearby {
        '@type': 'chatsNearby';
        /** List of users nearby */
        users_nearby: vector<chatNearby>;
        /** List of location-based supergroups nearby */
        supergroups_nearby: vector<chatNearby>;
    }
    
    
    /** The chat is public, because it has username */
    export interface publicChatTypeHasUsername {
        '@type': 'publicChatTypeHasUsername';
    }
    
    
    /** The chat is public, because it is a location-based supergroup */
    export interface publicChatTypeIsLocationBased {
        '@type': 'publicChatTypeIsLocationBased';
    }
    
    
    /** The chat can be reported as spam using the method reportChat with the reason chatReportReasonSpam */
    export interface chatActionBarReportSpam {
        '@type': 'chatActionBarReportSpam';
        /** If true, the chat was automatically archived and can be moved back to the main chat list using addChatToList simultaneously with setting chat notification settings to default using setChatNotificationSettings */
        can_unarchive: Bool;
    }
    
    
    /** The chat is a location-based supergroup, which can be reported as having unrelated location using the method reportChat with the reason chatReportReasonUnrelatedLocation */
    export interface chatActionBarReportUnrelatedLocation {
        '@type': 'chatActionBarReportUnrelatedLocation';
    }
    
    
    /** The chat is a recently created group chat to which new members can be invited */
    export interface chatActionBarInviteMembers {
        '@type': 'chatActionBarInviteMembers';
    }
    
    
    /** The chat is a private or secret chat, which can be reported using the method reportChat, or the other user can be blocked using the method toggleMessageSenderIsBlocked, or the other user can be added to the contact list using the method addContact */
    export interface chatActionBarReportAddBlock {
        '@type': 'chatActionBarReportAddBlock';
        /** If true, the chat was automatically archived and can be moved back to the main chat list using addChatToList simultaneously with setting chat notification settings to default using setChatNotificationSettings */
        can_unarchive: Bool;
        /** If non-negative, the current user was found by the peer through searchChatsNearby and this is the distance between the users */
        distance: int32;
    }
    
    
    /** The chat is a private or secret chat and the other user can be added to the contact list using the method addContact */
    export interface chatActionBarAddContact {
        '@type': 'chatActionBarAddContact';
    }
    
    
    /** The chat is a private or secret chat with a mutual contact and the user's phone number can be shared with the other user using the method sharePhoneNumber */
    export interface chatActionBarSharePhoneNumber {
        '@type': 'chatActionBarSharePhoneNumber';
    }
    
    
    /** The chat is a private chat with an administrator of a chat to which the user sent join request */
    export interface chatActionBarJoinRequest {
        '@type': 'chatActionBarJoinRequest';
        /** Title of the chat to which the join request was sent */
        title: string;
        /** True, if the join request was sent to a channel chat */
        is_channel: Bool;
        /** Point in time (Unix timestamp) when the join request was sent */
        request_date: int32;
    }
    
    
    /** A simple button, with text that must be sent when the button is pressed */
    export interface keyboardButtonTypeText {
        '@type': 'keyboardButtonTypeText';
    }
    
    
    /** A button that sends the user's phone number when pressed; available only in private chats */
    export interface keyboardButtonTypeRequestPhoneNumber {
        '@type': 'keyboardButtonTypeRequestPhoneNumber';
    }
    
    
    /** A button that sends the user's location when pressed; available only in private chats */
    export interface keyboardButtonTypeRequestLocation {
        '@type': 'keyboardButtonTypeRequestLocation';
    }
    
    
    /** A button that allows the user to create and send a poll when pressed; available only in private chats */
    export interface keyboardButtonTypeRequestPoll {
        '@type': 'keyboardButtonTypeRequestPoll';
        /** If true, only regular polls must be allowed to create */
        force_regular: Bool;
        /** If true, only polls in quiz mode must be allowed to create */
        force_quiz: Bool;
    }
    
    
    /** A button that opens a Web App by calling getWebAppUrl */
    export interface keyboardButtonTypeWebApp {
        '@type': 'keyboardButtonTypeWebApp';
        /** An HTTP URL to pass to getWebAppUrl */
        url: string;
    }
    
    
    /** Represents a single button in a bot keyboard */
    export interface keyboardButton {
        '@type': 'keyboardButton';
        /** Text of the button */
        text: string;
        /** Type of the button */
        type: KeyboardButtonType;
    }
    
    
    /** A button that opens a specified URL */
    export interface inlineKeyboardButtonTypeUrl {
        '@type': 'inlineKeyboardButtonTypeUrl';
        /** HTTP or tg:// URL to open */
        url: string;
    }
    
    
    /** A button that opens a specified URL and automatically authorize the current user by calling getLoginUrlInfo */
    export interface inlineKeyboardButtonTypeLoginUrl {
        '@type': 'inlineKeyboardButtonTypeLoginUrl';
        /** An HTTP URL to pass to getLoginUrlInfo */
        url: string;
        /** Unique button identifier */
        id: int53;
        /** If non-empty, new text of the button in forwarded messages */
        forward_text: string;
    }
    
    
    /** A button that opens a Web App by calling openWebApp */
    export interface inlineKeyboardButtonTypeWebApp {
        '@type': 'inlineKeyboardButtonTypeWebApp';
        /** An HTTP URL to pass to openWebApp */
        url: string;
    }
    
    
    /** A button that sends a callback query to a bot */
    export interface inlineKeyboardButtonTypeCallback {
        '@type': 'inlineKeyboardButtonTypeCallback';
        /** Data to be sent to the bot via a callback query */
        data: bytes;
    }
    
    
    /** A button that asks for password of the current user and then sends a callback query to a bot */
    export interface inlineKeyboardButtonTypeCallbackWithPassword {
        '@type': 'inlineKeyboardButtonTypeCallbackWithPassword';
        /** Data to be sent to the bot via a callback query */
        data: bytes;
    }
    
    
    /** A button with a game that sends a callback query to a bot. This button must be in the first column and row of the keyboard and can be attached only to a message with content of the type messageGame */
    export interface inlineKeyboardButtonTypeCallbackGame {
        '@type': 'inlineKeyboardButtonTypeCallbackGame';
    }
    
    
    /** A button that forces an inline query to the bot to be inserted in the input field */
    export interface inlineKeyboardButtonTypeSwitchInline {
        '@type': 'inlineKeyboardButtonTypeSwitchInline';
        /** Inline query to be sent to the bot */
        query: string;
        /** True, if the inline query must be sent from the current chat */
        in_current_chat: Bool;
    }
    
    
    /** A button to buy something. This button must be in the first column and row of the keyboard and can be attached only to a message with content of the type messageInvoice */
    export interface inlineKeyboardButtonTypeBuy {
        '@type': 'inlineKeyboardButtonTypeBuy';
    }
    
    
    /** A button with a user reference to be handled in the same way as textEntityTypeMentionName entities */
    export interface inlineKeyboardButtonTypeUser {
        '@type': 'inlineKeyboardButtonTypeUser';
        /** User identifier */
        user_id: int53;
    }
    
    
    /** Represents a single button in an inline keyboard */
    export interface inlineKeyboardButton {
        '@type': 'inlineKeyboardButton';
        /** Text of the button */
        text: string;
        /** Type of the button */
        type: InlineKeyboardButtonType;
    }
    
    
    /** Instructs application to remove the keyboard once this message has been received. This kind of keyboard can't be received in an incoming message; instead, UpdateChatReplyMarkup with message_id == 0 will be sent */
    export interface replyMarkupRemoveKeyboard {
        '@type': 'replyMarkupRemoveKeyboard';
        /** True, if the keyboard is removed only for the mentioned users or the target user of a reply */
        is_personal: Bool;
    }
    
    
    /** Instructs application to force a reply to this message */
    export interface replyMarkupForceReply {
        '@type': 'replyMarkupForceReply';
        /** True, if a forced reply must automatically be shown to the current user. For outgoing messages, specify true to show the forced reply only for the mentioned users and for the target user of a reply */
        is_personal: Bool;
        /** If non-empty, the placeholder to be shown in the input field when the reply is active; 0-64 characters */
        input_field_placeholder: string;
    }
    
    
    /** Contains a custom keyboard layout to quickly reply to bots */
    export interface replyMarkupShowKeyboard {
        '@type': 'replyMarkupShowKeyboard';
        /** A list of rows of bot keyboard buttons */
        rows: vector<vector<keyboardButton>>;
        /** True, if the application needs to resize the keyboard vertically */
        resize_keyboard: Bool;
        /** True, if the application needs to hide the keyboard after use */
        one_time: Bool;
        /** True, if the keyboard must automatically be shown to the current user. For outgoing messages, specify true to show the keyboard only for the mentioned users and for the target user of a reply */
        is_personal: Bool;
        /** If non-empty, the placeholder to be shown in the input field when the keyboard is active; 0-64 characters */
        input_field_placeholder: string;
    }
    
    
    /** Contains an inline keyboard layout */
    export interface replyMarkupInlineKeyboard {
        '@type': 'replyMarkupInlineKeyboard';
        /** A list of rows of inline keyboard buttons */
        rows: vector<vector<inlineKeyboardButton>>;
    }
    
    
    /** An HTTP url needs to be open */
    export interface loginUrlInfoOpen {
        '@type': 'loginUrlInfoOpen';
        /** The URL to open */
        url: string;
        /** True, if there is no need to show an ordinary open URL confirm */
        skip_confirm: Bool;
    }
    
    
    /** An authorization confirmation dialog needs to be shown to the user */
    export interface loginUrlInfoRequestConfirmation {
        '@type': 'loginUrlInfoRequestConfirmation';
        /** An HTTP URL to be opened */
        url: string;
        /** A domain of the URL */
        domain: string;
        /** User identifier of a bot linked with the website */
        bot_user_id: int53;
        /** True, if the user needs to be requested to give the permission to the bot to send them messages */
        request_write_access: Bool;
    }
    
    
    /** Contains information about a Web App */
    export interface webAppInfo {
        '@type': 'webAppInfo';
        /** Unique identifier for the Web App launch */
        launch_id: int64;
        /** A Web App URL to open in a web view */
        url: string;
    }
    
    
    /** Contains information about a message thread */
    export interface messageThreadInfo {
        '@type': 'messageThreadInfo';
        /** Identifier of the chat to which the message thread belongs */
        chat_id: int53;
        /** Message thread identifier, unique within the chat */
        message_thread_id: int53;
        /** Information about the message thread */
        reply_info: messageReplyInfo;
        /** Approximate number of unread messages in the message thread */
        unread_message_count: int32;
        /** The messages from which the thread starts. The messages are returned in a reverse chronological order (i.e., in order of decreasing message_id) */
        messages: vector<message>;
        /** A draft of a message in the message thread; may be null */
        draft_message?: draftMessage;
    }
    
    
    /** A plain text */
    export interface richTextPlain {
        '@type': 'richTextPlain';
        /** Text */
        text: string;
    }
    
    
    /** A bold rich text */
    export interface richTextBold {
        '@type': 'richTextBold';
        /** Text */
        text: RichText;
    }
    
    
    /** An italicized rich text */
    export interface richTextItalic {
        '@type': 'richTextItalic';
        /** Text */
        text: RichText;
    }
    
    
    /** An underlined rich text */
    export interface richTextUnderline {
        '@type': 'richTextUnderline';
        /** Text */
        text: RichText;
    }
    
    
    /** A strikethrough rich text */
    export interface richTextStrikethrough {
        '@type': 'richTextStrikethrough';
        /** Text */
        text: RichText;
    }
    
    
    /** A fixed-width rich text */
    export interface richTextFixed {
        '@type': 'richTextFixed';
        /** Text */
        text: RichText;
    }
    
    
    /** A rich text URL link */
    export interface richTextUrl {
        '@type': 'richTextUrl';
        /** Text */
        text: RichText;
        /** URL */
        url: string;
        /** True, if the URL has cached instant view server-side */
        is_cached: Bool;
    }
    
    
    /** A rich text email link */
    export interface richTextEmailAddress {
        '@type': 'richTextEmailAddress';
        /** Text */
        text: RichText;
        /** Email address */
        email_address: string;
    }
    
    
    /** A subscript rich text */
    export interface richTextSubscript {
        '@type': 'richTextSubscript';
        /** Text */
        text: RichText;
    }
    
    
    /** A superscript rich text */
    export interface richTextSuperscript {
        '@type': 'richTextSuperscript';
        /** Text */
        text: RichText;
    }
    
    
    /** A marked rich text */
    export interface richTextMarked {
        '@type': 'richTextMarked';
        /** Text */
        text: RichText;
    }
    
    
    /** A rich text phone number */
    export interface richTextPhoneNumber {
        '@type': 'richTextPhoneNumber';
        /** Text */
        text: RichText;
        /** Phone number */
        phone_number: string;
    }
    
    
    /** A small image inside the text */
    export interface richTextIcon {
        '@type': 'richTextIcon';
        /** The image represented as a document. The image can be in GIF, JPEG or PNG format */
        document: document;
        /** Width of a bounding box in which the image must be shown; 0 if unknown */
        width: int32;
        /** Height of a bounding box in which the image must be shown; 0 if unknown */
        height: int32;
    }
    
    
    /** A reference to a richTexts object on the same web page */
    export interface richTextReference {
        '@type': 'richTextReference';
        /** The text */
        text: RichText;
        /** The name of a richTextAnchor object, which is the first element of the target richTexts object */
        anchor_name: string;
        /** An HTTP URL, opening the reference */
        url: string;
    }
    
    
    /** An anchor */
    export interface richTextAnchor {
        '@type': 'richTextAnchor';
        /** Anchor name */
        name: string;
    }
    
    
    /** A link to an anchor on the same web page */
    export interface richTextAnchorLink {
        '@type': 'richTextAnchorLink';
        /** The link text */
        text: RichText;
        /** The anchor name. If the name is empty, the link must bring back to top */
        anchor_name: string;
        /** An HTTP URL, opening the anchor */
        url: string;
    }
    
    
    /** A concatenation of rich texts */
    export interface richTexts {
        '@type': 'richTexts';
        /** Texts */
        texts: vector<RichText>;
    }
    
    
    /** Contains a caption of an instant view web page block, consisting of a text and a trailing credit */
    export interface pageBlockCaption {
        '@type': 'pageBlockCaption';
        /** Content of the caption */
        text: RichText;
        /** Block credit (like HTML tag <cite>) */
        credit: RichText;
    }
    
    
    /** Describes an item of a list page block */
    export interface pageBlockListItem {
        '@type': 'pageBlockListItem';
        /** Item label */
        label: string;
        /** Item blocks */
        page_blocks: vector<PageBlock>;
    }
    
    
    /** The content must be left-aligned */
    export interface pageBlockHorizontalAlignmentLeft {
        '@type': 'pageBlockHorizontalAlignmentLeft';
    }
    
    
    /** The content must be center-aligned */
    export interface pageBlockHorizontalAlignmentCenter {
        '@type': 'pageBlockHorizontalAlignmentCenter';
    }
    
    
    /** The content must be right-aligned */
    export interface pageBlockHorizontalAlignmentRight {
        '@type': 'pageBlockHorizontalAlignmentRight';
    }
    
    
    /** The content must be top-aligned */
    export interface pageBlockVerticalAlignmentTop {
        '@type': 'pageBlockVerticalAlignmentTop';
    }
    
    
    /** The content must be middle-aligned */
    export interface pageBlockVerticalAlignmentMiddle {
        '@type': 'pageBlockVerticalAlignmentMiddle';
    }
    
    
    /** The content must be bottom-aligned */
    export interface pageBlockVerticalAlignmentBottom {
        '@type': 'pageBlockVerticalAlignmentBottom';
    }
    
    
    /** Represents a cell of a table */
    export interface pageBlockTableCell {
        '@type': 'pageBlockTableCell';
        /** Cell text; may be null. If the text is null, then the cell must be invisible */
        text?: RichText;
        /** True, if it is a header cell */
        is_header: Bool;
        /** The number of columns the cell spans */
        colspan: int32;
        /** The number of rows the cell spans */
        rowspan: int32;
        /** Horizontal cell content alignment */
        align: PageBlockHorizontalAlignment;
        /** Vertical cell content alignment */
        valign: PageBlockVerticalAlignment;
    }
    
    
    /** Contains information about a related article */
    export interface pageBlockRelatedArticle {
        '@type': 'pageBlockRelatedArticle';
        /** Related article URL */
        url: string;
        /** Article title; may be empty */
        title: string;
        /** Contains information about a related article */
        description: string;
        /** Article photo; may be null */
        photo?: photo;
        /** Article author; may be empty */
        author: string;
        /** Point in time (Unix timestamp) when the article was published; 0 if unknown */
        publish_date: int32;
    }
    
    
    /** The title of a page */
    export interface pageBlockTitle {
        '@type': 'pageBlockTitle';
        /** Title */
        title: RichText;
    }
    
    
    /** The subtitle of a page */
    export interface pageBlockSubtitle {
        '@type': 'pageBlockSubtitle';
        /** Subtitle */
        subtitle: RichText;
    }
    
    
    /** The author and publishing date of a page */
    export interface pageBlockAuthorDate {
        '@type': 'pageBlockAuthorDate';
        /** Author */
        author: RichText;
        /** Point in time (Unix timestamp) when the article was published; 0 if unknown */
        publish_date: int32;
    }
    
    
    /** A header */
    export interface pageBlockHeader {
        '@type': 'pageBlockHeader';
        /** Header */
        header: RichText;
    }
    
    
    /** A subheader */
    export interface pageBlockSubheader {
        '@type': 'pageBlockSubheader';
        /** Subheader */
        subheader: RichText;
    }
    
    
    /** A kicker */
    export interface pageBlockKicker {
        '@type': 'pageBlockKicker';
        /** Kicker */
        kicker: RichText;
    }
    
    
    /** A text paragraph */
    export interface pageBlockParagraph {
        '@type': 'pageBlockParagraph';
        /** Paragraph text */
        text: RichText;
    }
    
    
    /** A preformatted text paragraph */
    export interface pageBlockPreformatted {
        '@type': 'pageBlockPreformatted';
        /** Paragraph text */
        text: RichText;
        /** Programming language for which the text needs to be formatted */
        language: string;
    }
    
    
    /** The footer of a page */
    export interface pageBlockFooter {
        '@type': 'pageBlockFooter';
        /** Footer */
        footer: RichText;
    }
    
    
    /** An empty block separating a page */
    export interface pageBlockDivider {
        '@type': 'pageBlockDivider';
    }
    
    
    /** An invisible anchor on a page, which can be used in a URL to open the page from the specified anchor */
    export interface pageBlockAnchor {
        '@type': 'pageBlockAnchor';
        /** Name of the anchor */
        name: string;
    }
    
    
    /** A list of data blocks */
    export interface pageBlockList {
        '@type': 'pageBlockList';
        /** The items of the list */
        items: vector<pageBlockListItem>;
    }
    
    
    /** A block quote */
    export interface pageBlockBlockQuote {
        '@type': 'pageBlockBlockQuote';
        /** Quote text */
        text: RichText;
        /** Quote credit */
        credit: RichText;
    }
    
    
    /** A pull quote */
    export interface pageBlockPullQuote {
        '@type': 'pageBlockPullQuote';
        /** Quote text */
        text: RichText;
        /** Quote credit */
        credit: RichText;
    }
    
    
    /** An animation */
    export interface pageBlockAnimation {
        '@type': 'pageBlockAnimation';
        /** Animation file; may be null */
        animation?: animation;
        /** Animation caption */
        caption: pageBlockCaption;
        /** True, if the animation must be played automatically */
        need_autoplay: Bool;
    }
    
    
    /** An audio file */
    export interface pageBlockAudio {
        '@type': 'pageBlockAudio';
        /** Audio file; may be null */
        audio?: audio;
        /** Audio file caption */
        caption: pageBlockCaption;
    }
    
    
    /** A photo */
    export interface pageBlockPhoto {
        '@type': 'pageBlockPhoto';
        /** Photo file; may be null */
        photo?: photo;
        /** Photo caption */
        caption: pageBlockCaption;
        /** URL that needs to be opened when the photo is clicked */
        url: string;
    }
    
    
    /** A video */
    export interface pageBlockVideo {
        '@type': 'pageBlockVideo';
        /** Video file; may be null */
        video?: video;
        /** Video caption */
        caption: pageBlockCaption;
        /** True, if the video must be played automatically */
        need_autoplay: Bool;
        /** True, if the video must be looped */
        is_looped: Bool;
    }
    
    
    /** A voice note */
    export interface pageBlockVoiceNote {
        '@type': 'pageBlockVoiceNote';
        /** Voice note; may be null */
        voice_note?: voiceNote;
        /** Voice note caption */
        caption: pageBlockCaption;
    }
    
    
    /** A page cover */
    export interface pageBlockCover {
        '@type': 'pageBlockCover';
        /** Cover */
        cover: PageBlock;
    }
    
    
    /** An embedded web page */
    export interface pageBlockEmbedded {
        '@type': 'pageBlockEmbedded';
        /** Web page URL, if available */
        url: string;
        /** HTML-markup of the embedded page */
        html: string;
        /** Poster photo, if available; may be null */
        poster_photo?: photo;
        /** Block width; 0 if unknown */
        width: int32;
        /** Block height; 0 if unknown */
        height: int32;
        /** Block caption */
        caption: pageBlockCaption;
        /** True, if the block must be full width */
        is_full_width: Bool;
        /** True, if scrolling needs to be allowed */
        allow_scrolling: Bool;
    }
    
    
    /** An embedded post */
    export interface pageBlockEmbeddedPost {
        '@type': 'pageBlockEmbeddedPost';
        /** Web page URL */
        url: string;
        /** Post author */
        author: string;
        /** Post author photo; may be null */
        author_photo?: photo;
        /** Point in time (Unix timestamp) when the post was created; 0 if unknown */
        date: int32;
        /** Post content */
        page_blocks: vector<PageBlock>;
        /** Post caption */
        caption: pageBlockCaption;
    }
    
    
    /** A collage */
    export interface pageBlockCollage {
        '@type': 'pageBlockCollage';
        /** Collage item contents */
        page_blocks: vector<PageBlock>;
        /** Block caption */
        caption: pageBlockCaption;
    }
    
    
    /** A slideshow */
    export interface pageBlockSlideshow {
        '@type': 'pageBlockSlideshow';
        /** Slideshow item contents */
        page_blocks: vector<PageBlock>;
        /** Block caption */
        caption: pageBlockCaption;
    }
    
    
    /** A link to a chat */
    export interface pageBlockChatLink {
        '@type': 'pageBlockChatLink';
        /** Chat title */
        title: string;
        /** Chat photo; may be null */
        photo?: chatPhotoInfo;
        /** Chat username by which all other information about the chat can be resolved */
        username: string;
    }
    
    
    /** A table */
    export interface pageBlockTable {
        '@type': 'pageBlockTable';
        /** Table caption */
        caption: RichText;
        /** Table cells */
        cells: vector<vector<pageBlockTableCell>>;
        /** True, if the table is bordered */
        is_bordered: Bool;
        /** True, if the table is striped */
        is_striped: Bool;
    }
    
    
    /** A collapsible block */
    export interface pageBlockDetails {
        '@type': 'pageBlockDetails';
        /** Always visible heading for the block */
        header: RichText;
        /** Block contents */
        page_blocks: vector<PageBlock>;
        /** True, if the block is open by default */
        is_open: Bool;
    }
    
    
    /** Related articles */
    export interface pageBlockRelatedArticles {
        '@type': 'pageBlockRelatedArticles';
        /** Block header */
        header: RichText;
        /** List of related articles */
        articles: vector<pageBlockRelatedArticle>;
    }
    
    
    /** A map */
    export interface pageBlockMap {
        '@type': 'pageBlockMap';
        /** Location of the map center */
        location: location;
        /** Map zoom level */
        zoom: int32;
        /** Map width */
        width: int32;
        /** Map height */
        height: int32;
        /** Block caption */
        caption: pageBlockCaption;
    }
    
    
    /** Describes an instant view page for a web page */
    export interface webPageInstantView {
        '@type': 'webPageInstantView';
        /** Content of the web page */
        page_blocks: vector<PageBlock>;
        /** Number of the instant view views; 0 if unknown */
        view_count: int32;
        /** Version of the instant view; currently, can be 1 or 2 */
        version: int32;
        /** True, if the instant view must be shown from right to left */
        is_rtl: Bool;
        /** True, if the instant view contains the full page. A network request might be needed to get the full web page instant view */
        is_full: Bool;
        /** An internal link to be opened to leave feedback about the instant view */
        feedback_link: InternalLinkType;
    }
    
    
    /** Describes a web page preview */
    export interface webPage {
        '@type': 'webPage';
        /** Original URL of the link */
        url: string;
        /** URL to display */
        display_url: string;
        /** Type of the web page. Can be: article, photo, audio, video, document, profile, app, or something else */
        type: string;
        /** Short name of the site (e.g., Google Docs, App Store) */
        site_name: string;
        /** Title of the content */
        title: string;
        /** Describes a web page preview */
        description: formattedText;
        /** Image representing the content; may be null */
        photo?: photo;
        /** URL to show in the embedded preview */
        embed_url: string;
        /** MIME type of the embedded preview, (e.g., text/html or video/mp4) */
        embed_type: string;
        /** Width of the embedded preview */
        embed_width: int32;
        /** Height of the embedded preview */
        embed_height: int32;
        /** Duration of the content, in seconds */
        duration: int32;
        /** Author of the content */
        author: string;
        /** Preview of the content as an animation, if available; may be null */
        animation?: animation;
        /** Preview of the content as an audio file, if available; may be null */
        audio?: audio;
        /** Preview of the content as a document, if available; may be null */
        document?: document;
        /** Preview of the content as a sticker for small WEBP files, if available; may be null */
        sticker?: sticker;
        /** Preview of the content as a video, if available; may be null */
        video?: video;
        /** Preview of the content as a video note, if available; may be null */
        video_note?: videoNote;
        /** Preview of the content as a voice note, if available; may be null */
        voice_note?: voiceNote;
        /** Version of instant view, available for the web page (currently, can be 1 or 2), 0 if none */
        instant_view_version: int32;
    }
    
    
    /** Contains information about a country */
    export interface countryInfo {
        '@type': 'countryInfo';
        /** A two-letter ISO 3166-1 alpha-2 country code */
        country_code: string;
        /** Native name of the country */
        name: string;
        /** English name of the country */
        english_name: string;
        /** True, if the country must be hidden from the list of all countries */
        is_hidden: Bool;
        /** List of country calling codes */
        calling_codes: vector<string>;
    }
    
    
    /** Contains information about countries */
    export interface countries {
        '@type': 'countries';
        /** The list of countries */
        countries: vector<countryInfo>;
    }
    
    
    /** Contains information about a phone number */
    export interface phoneNumberInfo {
        '@type': 'phoneNumberInfo';
        /** Information about the country to which the phone number belongs; may be null */
        country?: countryInfo;
        /** The part of the phone number denoting country calling code or its part */
        country_calling_code: string;
        /** The phone number without country calling code formatted accordingly to local rules. Expected digits are returned as '-', but even more digits might be entered by the user */
        formatted_phone_number: string;
    }
    
    
    /** Describes an action associated with a bank card number */
    export interface bankCardActionOpenUrl {
        '@type': 'bankCardActionOpenUrl';
        /** Action text */
        text: string;
        /** The URL to be opened */
        url: string;
    }
    
    
    /** Information about a bank card */
    export interface bankCardInfo {
        '@type': 'bankCardInfo';
        /** Title of the bank card description */
        title: string;
        /** Actions that can be done with the bank card number */
        actions: vector<bankCardActionOpenUrl>;
    }
    
    
    /** Describes an address */
    export interface address {
        '@type': 'address';
        /** A two-letter ISO 3166-1 alpha-2 country code */
        country_code: string;
        /** State, if applicable */
        state: string;
        /** City */
        city: string;
        /** First line of the address */
        street_line1: string;
        /** Second line of the address */
        street_line2: string;
        /** Address postal code */
        postal_code: string;
    }
    
    
    /** Contains parameters of the application theme */
    export interface themeParameters {
        '@type': 'themeParameters';
        /** A color of the background in the RGB24 format */
        background_color: int32;
        /** A secondary color for the background in the RGB24 format */
        secondary_background_color: int32;
        /** A color of text in the RGB24 format */
        text_color: int32;
        /** A color of hints in the RGB24 format */
        hint_color: int32;
        /** A color of links in the RGB24 format */
        link_color: int32;
        /** A color of the buttons in the RGB24 format */
        button_color: int32;
        /** A color of text on the buttons in the RGB24 format */
        button_text_color: int32;
    }
    
    
    /** Portion of the price of a product (e.g., "delivery cost", "tax amount") */
    export interface labeledPricePart {
        '@type': 'labeledPricePart';
        /** Label for this portion of the product price */
        label: string;
        /** Currency amount in the smallest units of the currency */
        amount: int53;
    }
    
    
    /** Product invoice */
    export interface invoice {
        '@type': 'invoice';
        /** ISO 4217 currency code */
        currency: string;
        /** A list of objects used to calculate the total price of the product */
        price_parts: vector<labeledPricePart>;
        /** The maximum allowed amount of tip in the smallest units of the currency */
        max_tip_amount: int53;
        /** Suggested amounts of tip in the smallest units of the currency */
        suggested_tip_amounts: vector<int53>;
        /** An HTTP URL with terms of service for recurring payments. If non-empty, the invoice payment will result in recurring payments and the user must accept the terms of service before allowed to pay */
        recurring_payment_terms_of_service_url: string;
        /** True, if the payment is a test payment */
        is_test: Bool;
        /** True, if the user's name is needed for payment */
        need_name: Bool;
        /** True, if the user's phone number is needed for payment */
        need_phone_number: Bool;
        /** True, if the user's email address is needed for payment */
        need_email_address: Bool;
        /** True, if the user's shipping address is needed for payment */
        need_shipping_address: Bool;
        /** True, if the user's phone number will be sent to the provider */
        send_phone_number_to_provider: Bool;
        /** True, if the user's email address will be sent to the provider */
        send_email_address_to_provider: Bool;
        /** True, if the total price depends on the shipping method */
        is_flexible: Bool;
    }
    
    
    /** Order information */
    export interface orderInfo {
        '@type': 'orderInfo';
        /** Name of the user */
        name: string;
        /** Phone number of the user */
        phone_number: string;
        /** Email address of the user */
        email_address: string;
        /** Shipping address for this order; may be null */
        shipping_address?: address;
    }
    
    
    /** One shipping option */
    export interface shippingOption {
        '@type': 'shippingOption';
        /** Shipping option identifier */
        id: string;
        /** Option title */
        title: string;
        /** A list of objects used to calculate the total shipping costs */
        price_parts: vector<labeledPricePart>;
    }
    
    
    /** Contains information about saved card credentials */
    export interface savedCredentials {
        '@type': 'savedCredentials';
        /** Unique identifier of the saved credentials */
        id: string;
        /** Title of the saved credentials */
        title: string;
    }
    
    
    /** Applies if a user chooses some previously saved payment credentials. To use their previously saved credentials, the user must have a valid temporary password */
    export interface inputCredentialsSaved {
        '@type': 'inputCredentialsSaved';
        /** Identifier of the saved credentials */
        saved_credentials_id: string;
    }
    
    
    /** Applies if a user enters new credentials on a payment provider website */
    export interface inputCredentialsNew {
        '@type': 'inputCredentialsNew';
        /** JSON-encoded data with the credential identifier from the payment provider */
        data: string;
        /** True, if the credential identifier can be saved on the server side */
        allow_save: Bool;
    }
    
    
    /** Applies if a user enters new credentials using Apple Pay */
    export interface inputCredentialsApplePay {
        '@type': 'inputCredentialsApplePay';
        /** JSON-encoded data with the credential identifier */
        data: string;
    }
    
    
    /** Applies if a user enters new credentials using Google Pay */
    export interface inputCredentialsGooglePay {
        '@type': 'inputCredentialsGooglePay';
        /** JSON-encoded data with the credential identifier */
        data: string;
    }
    
    
    /** Smart Glocal payment provider */
    export interface paymentProviderSmartGlocal {
        '@type': 'paymentProviderSmartGlocal';
        /** Public payment token */
        public_token: string;
    }
    
    
    /** Stripe payment provider */
    export interface paymentProviderStripe {
        '@type': 'paymentProviderStripe';
        /** Stripe API publishable key */
        publishable_key: string;
        /** True, if the user country must be provided */
        need_country: Bool;
        /** True, if the user ZIP/postal code must be provided */
        need_postal_code: Bool;
        /** True, if the cardholder name must be provided */
        need_cardholder_name: Bool;
    }
    
    
    /** Some other payment provider, for which a web payment form must be shown */
    export interface paymentProviderOther {
        '@type': 'paymentProviderOther';
        /** Payment form URL */
        url: string;
    }
    
    
    /** Contains information about an invoice payment form */
    export interface paymentForm {
        '@type': 'paymentForm';
        /** The payment form identifier */
        id: int64;
        /** Full information about the invoice */
        invoice: invoice;
        /** User identifier of the seller bot */
        seller_bot_user_id: int53;
        /** User identifier of the payment provider bot */
        payment_provider_user_id: int53;
        /** Information about the payment provider */
        payment_provider: PaymentProvider;
        /** Saved server-side order information; may be null */
        saved_order_info?: orderInfo;
        /** Information about saved card credentials; may be null */
        saved_credentials?: savedCredentials;
        /** True, if the user can choose to save credentials */
        can_save_credentials: Bool;
        /** True, if the user will be able to save credentials protected by a password they set up */
        need_password: Bool;
        /** Product title */
        product_title: string;
        /** Product description */
        product_description: formattedText;
        /** Product photo; may be null */
        product_photo?: photo;
    }
    
    
    /** Contains a temporary identifier of validated order information, which is stored for one hour. Also contains the available shipping options */
    export interface validatedOrderInfo {
        '@type': 'validatedOrderInfo';
        /** Temporary identifier of the order information */
        order_info_id: string;
        /** Available shipping options */
        shipping_options: vector<shippingOption>;
    }
    
    
    /** Contains the result of a payment request */
    export interface paymentResult {
        '@type': 'paymentResult';
        /** True, if the payment request was successful; otherwise the verification_url will be non-empty */
        success: Bool;
        /** URL for additional payment credentials verification */
        verification_url: string;
    }
    
    
    /** Contains information about a successful payment */
    export interface paymentReceipt {
        '@type': 'paymentReceipt';
        /** Product title */
        title: string;
        /** Contains information about a successful payment */
        description: formattedText;
        /** Product photo; may be null */
        photo?: photo;
        /** Point in time (Unix timestamp) when the payment was made */
        date: int32;
        /** User identifier of the seller bot */
        seller_bot_user_id: int53;
        /** User identifier of the payment provider bot */
        payment_provider_user_id: int53;
        /** Information about the invoice */
        invoice: invoice;
        /** Order information; may be null */
        order_info?: orderInfo;
        /** Chosen shipping option; may be null */
        shipping_option?: shippingOption;
        /** Title of the saved credentials chosen by the buyer */
        credentials_title: string;
        /** The amount of tip chosen by the buyer in the smallest units of the currency */
        tip_amount: int53;
    }
    
    
    /** An invoice from a message of the type messageInvoice */
    export interface inputInvoiceMessage {
        '@type': 'inputInvoiceMessage';
        /** Chat identifier of the message */
        chat_id: int53;
        /** Message identifier */
        message_id: int53;
    }
    
    
    /** An invoice from a link of the type internalLinkTypeInvoice */
    export interface inputInvoiceName {
        '@type': 'inputInvoiceName';
        /** Name of the invoice */
        name: string;
    }
    
    
    /** File with the date it was uploaded */
    export interface datedFile {
        '@type': 'datedFile';
        /** The file */
        file: file;
        /** Point in time (Unix timestamp) when the file was uploaded */
        date: int32;
    }
    
    
    /** A Telegram Passport element containing the user's personal details */
    export interface passportElementTypePersonalDetails {
        '@type': 'passportElementTypePersonalDetails';
    }
    
    
    /** A Telegram Passport element containing the user's passport */
    export interface passportElementTypePassport {
        '@type': 'passportElementTypePassport';
    }
    
    
    /** A Telegram Passport element containing the user's driver license */
    export interface passportElementTypeDriverLicense {
        '@type': 'passportElementTypeDriverLicense';
    }
    
    
    /** A Telegram Passport element containing the user's identity card */
    export interface passportElementTypeIdentityCard {
        '@type': 'passportElementTypeIdentityCard';
    }
    
    
    /** A Telegram Passport element containing the user's internal passport */
    export interface passportElementTypeInternalPassport {
        '@type': 'passportElementTypeInternalPassport';
    }
    
    
    /** A Telegram Passport element containing the user's address */
    export interface passportElementTypeAddress {
        '@type': 'passportElementTypeAddress';
    }
    
    
    /** A Telegram Passport element containing the user's utility bill */
    export interface passportElementTypeUtilityBill {
        '@type': 'passportElementTypeUtilityBill';
    }
    
    
    /** A Telegram Passport element containing the user's bank statement */
    export interface passportElementTypeBankStatement {
        '@type': 'passportElementTypeBankStatement';
    }
    
    
    /** A Telegram Passport element containing the user's rental agreement */
    export interface passportElementTypeRentalAgreement {
        '@type': 'passportElementTypeRentalAgreement';
    }
    
    
    /** A Telegram Passport element containing the registration page of the user's passport */
    export interface passportElementTypePassportRegistration {
        '@type': 'passportElementTypePassportRegistration';
    }
    
    
    /** A Telegram Passport element containing the user's temporary registration */
    export interface passportElementTypeTemporaryRegistration {
        '@type': 'passportElementTypeTemporaryRegistration';
    }
    
    
    /** A Telegram Passport element containing the user's phone number */
    export interface passportElementTypePhoneNumber {
        '@type': 'passportElementTypePhoneNumber';
    }
    
    
    /** A Telegram Passport element containing the user's email address */
    export interface passportElementTypeEmailAddress {
        '@type': 'passportElementTypeEmailAddress';
    }
    
    
    /** Represents a date according to the Gregorian calendar */
    export interface date {
        '@type': 'date';
        /** Day of the month; 1-31 */
        day: int32;
        /** Month; 1-12 */
        month: int32;
        /** Year; 1-9999 */
        year: int32;
    }
    
    
    /** Contains the user's personal details */
    export interface personalDetails {
        '@type': 'personalDetails';
        /** First name of the user written in English; 1-255 characters */
        first_name: string;
        /** Middle name of the user written in English; 0-255 characters */
        middle_name: string;
        /** Last name of the user written in English; 1-255 characters */
        last_name: string;
        /** Native first name of the user; 1-255 characters */
        native_first_name: string;
        /** Native middle name of the user; 0-255 characters */
        native_middle_name: string;
        /** Native last name of the user; 1-255 characters */
        native_last_name: string;
        /** Birthdate of the user */
        birthdate: date;
        /** Gender of the user, "male" or "female" */
        gender: string;
        /** A two-letter ISO 3166-1 alpha-2 country code of the user's country */
        country_code: string;
        /** A two-letter ISO 3166-1 alpha-2 country code of the user's residence country */
        residence_country_code: string;
    }
    
    
    /** An identity document */
    export interface identityDocument {
        '@type': 'identityDocument';
        /** Document number; 1-24 characters */
        number: string;
        /** Document expiry date; may be null if not applicable */
        expiry_date?: date;
        /** Front side of the document */
        front_side: datedFile;
        /** Reverse side of the document; only for driver license and identity card; may be null */
        reverse_side?: datedFile;
        /** Selfie with the document; may be null */
        selfie?: datedFile;
        /** List of files containing a certified English translation of the document */
        translation: vector<datedFile>;
    }
    
    
    /** An identity document to be saved to Telegram Passport */
    export interface inputIdentityDocument {
        '@type': 'inputIdentityDocument';
        /** Document number; 1-24 characters */
        number: string;
        /** Document expiry date; pass null if not applicable */
        expiry_date: date;
        /** Front side of the document */
        front_side: InputFile;
        /** Reverse side of the document; only for driver license and identity card; pass null otherwise */
        reverse_side: InputFile;
        /** Selfie with the document; pass null if unavailable */
        selfie: InputFile;
        /** List of files containing a certified English translation of the document */
        translation: vector<InputFile>;
    }
    
    
    /** A personal document, containing some information about a user */
    export interface personalDocument {
        '@type': 'personalDocument';
        /** List of files containing the pages of the document */
        files: vector<datedFile>;
        /** List of files containing a certified English translation of the document */
        translation: vector<datedFile>;
    }
    
    
    /** A personal document to be saved to Telegram Passport */
    export interface inputPersonalDocument {
        '@type': 'inputPersonalDocument';
        /** List of files containing the pages of the document */
        files: vector<InputFile>;
        /** List of files containing a certified English translation of the document */
        translation: vector<InputFile>;
    }
    
    
    /** A Telegram Passport element containing the user's personal details */
    export interface passportElementPersonalDetails {
        '@type': 'passportElementPersonalDetails';
        /** Personal details of the user */
        personal_details: personalDetails;
    }
    
    
    /** A Telegram Passport element containing the user's passport */
    export interface passportElementPassport {
        '@type': 'passportElementPassport';
        /** Passport */
        passport: identityDocument;
    }
    
    
    /** A Telegram Passport element containing the user's driver license */
    export interface passportElementDriverLicense {
        '@type': 'passportElementDriverLicense';
        /** Driver license */
        driver_license: identityDocument;
    }
    
    
    /** A Telegram Passport element containing the user's identity card */
    export interface passportElementIdentityCard {
        '@type': 'passportElementIdentityCard';
        /** Identity card */
        identity_card: identityDocument;
    }
    
    
    /** A Telegram Passport element containing the user's internal passport */
    export interface passportElementInternalPassport {
        '@type': 'passportElementInternalPassport';
        /** Internal passport */
        internal_passport: identityDocument;
    }
    
    
    /** A Telegram Passport element containing the user's address */
    export interface passportElementAddress {
        '@type': 'passportElementAddress';
        /** Address */
        address: address;
    }
    
    
    /** A Telegram Passport element containing the user's utility bill */
    export interface passportElementUtilityBill {
        '@type': 'passportElementUtilityBill';
        /** Utility bill */
        utility_bill: personalDocument;
    }
    
    
    /** A Telegram Passport element containing the user's bank statement */
    export interface passportElementBankStatement {
        '@type': 'passportElementBankStatement';
        /** Bank statement */
        bank_statement: personalDocument;
    }
    
    
    /** A Telegram Passport element containing the user's rental agreement */
    export interface passportElementRentalAgreement {
        '@type': 'passportElementRentalAgreement';
        /** Rental agreement */
        rental_agreement: personalDocument;
    }
    
    
    /** A Telegram Passport element containing the user's passport registration pages */
    export interface passportElementPassportRegistration {
        '@type': 'passportElementPassportRegistration';
        /** Passport registration pages */
        passport_registration: personalDocument;
    }
    
    
    /** A Telegram Passport element containing the user's temporary registration */
    export interface passportElementTemporaryRegistration {
        '@type': 'passportElementTemporaryRegistration';
        /** Temporary registration */
        temporary_registration: personalDocument;
    }
    
    
    /** A Telegram Passport element containing the user's phone number */
    export interface passportElementPhoneNumber {
        '@type': 'passportElementPhoneNumber';
        /** Phone number */
        phone_number: string;
    }
    
    
    /** A Telegram Passport element containing the user's email address */
    export interface passportElementEmailAddress {
        '@type': 'passportElementEmailAddress';
        /** Email address */
        email_address: string;
    }
    
    
    /** A Telegram Passport element to be saved containing the user's personal details */
    export interface inputPassportElementPersonalDetails {
        '@type': 'inputPassportElementPersonalDetails';
        /** Personal details of the user */
        personal_details: personalDetails;
    }
    
    
    /** A Telegram Passport element to be saved containing the user's passport */
    export interface inputPassportElementPassport {
        '@type': 'inputPassportElementPassport';
        /** The passport to be saved */
        passport: inputIdentityDocument;
    }
    
    
    /** A Telegram Passport element to be saved containing the user's driver license */
    export interface inputPassportElementDriverLicense {
        '@type': 'inputPassportElementDriverLicense';
        /** The driver license to be saved */
        driver_license: inputIdentityDocument;
    }
    
    
    /** A Telegram Passport element to be saved containing the user's identity card */
    export interface inputPassportElementIdentityCard {
        '@type': 'inputPassportElementIdentityCard';
        /** The identity card to be saved */
        identity_card: inputIdentityDocument;
    }
    
    
    /** A Telegram Passport element to be saved containing the user's internal passport */
    export interface inputPassportElementInternalPassport {
        '@type': 'inputPassportElementInternalPassport';
        /** The internal passport to be saved */
        internal_passport: inputIdentityDocument;
    }
    
    
    /** A Telegram Passport element to be saved containing the user's address */
    export interface inputPassportElementAddress {
        '@type': 'inputPassportElementAddress';
        /** The address to be saved */
        address: address;
    }
    
    
    /** A Telegram Passport element to be saved containing the user's utility bill */
    export interface inputPassportElementUtilityBill {
        '@type': 'inputPassportElementUtilityBill';
        /** The utility bill to be saved */
        utility_bill: inputPersonalDocument;
    }
    
    
    /** A Telegram Passport element to be saved containing the user's bank statement */
    export interface inputPassportElementBankStatement {
        '@type': 'inputPassportElementBankStatement';
        /** The bank statement to be saved */
        bank_statement: inputPersonalDocument;
    }
    
    
    /** A Telegram Passport element to be saved containing the user's rental agreement */
    export interface inputPassportElementRentalAgreement {
        '@type': 'inputPassportElementRentalAgreement';
        /** The rental agreement to be saved */
        rental_agreement: inputPersonalDocument;
    }
    
    
    /** A Telegram Passport element to be saved containing the user's passport registration */
    export interface inputPassportElementPassportRegistration {
        '@type': 'inputPassportElementPassportRegistration';
        /** The passport registration page to be saved */
        passport_registration: inputPersonalDocument;
    }
    
    
    /** A Telegram Passport element to be saved containing the user's temporary registration */
    export interface inputPassportElementTemporaryRegistration {
        '@type': 'inputPassportElementTemporaryRegistration';
        /** The temporary registration document to be saved */
        temporary_registration: inputPersonalDocument;
    }
    
    
    /** A Telegram Passport element to be saved containing the user's phone number */
    export interface inputPassportElementPhoneNumber {
        '@type': 'inputPassportElementPhoneNumber';
        /** The phone number to be saved */
        phone_number: string;
    }
    
    
    /** A Telegram Passport element to be saved containing the user's email address */
    export interface inputPassportElementEmailAddress {
        '@type': 'inputPassportElementEmailAddress';
        /** The email address to be saved */
        email_address: string;
    }
    
    
    /** Contains information about saved Telegram Passport elements */
    export interface passportElements {
        '@type': 'passportElements';
        /** Telegram Passport elements */
        elements: vector<PassportElement>;
    }
    
    
    /** The element contains an error in an unspecified place. The error will be considered resolved when new data is added */
    export interface passportElementErrorSourceUnspecified {
        '@type': 'passportElementErrorSourceUnspecified';
    }
    
    
    /** One of the data fields contains an error. The error will be considered resolved when the value of the field changes */
    export interface passportElementErrorSourceDataField {
        '@type': 'passportElementErrorSourceDataField';
        /** Field name */
        field_name: string;
    }
    
    
    /** The front side of the document contains an error. The error will be considered resolved when the file with the front side changes */
    export interface passportElementErrorSourceFrontSide {
        '@type': 'passportElementErrorSourceFrontSide';
    }
    
    
    /** The reverse side of the document contains an error. The error will be considered resolved when the file with the reverse side changes */
    export interface passportElementErrorSourceReverseSide {
        '@type': 'passportElementErrorSourceReverseSide';
    }
    
    
    /** The selfie with the document contains an error. The error will be considered resolved when the file with the selfie changes */
    export interface passportElementErrorSourceSelfie {
        '@type': 'passportElementErrorSourceSelfie';
    }
    
    
    /** One of files with the translation of the document contains an error. The error will be considered resolved when the file changes */
    export interface passportElementErrorSourceTranslationFile {
        '@type': 'passportElementErrorSourceTranslationFile';
        /** Index of a file with the error */
        file_index: int32;
    }
    
    
    /** The translation of the document contains an error. The error will be considered resolved when the list of translation files changes */
    export interface passportElementErrorSourceTranslationFiles {
        '@type': 'passportElementErrorSourceTranslationFiles';
    }
    
    
    /** The file contains an error. The error will be considered resolved when the file changes */
    export interface passportElementErrorSourceFile {
        '@type': 'passportElementErrorSourceFile';
        /** Index of a file with the error */
        file_index: int32;
    }
    
    
    /** The list of attached files contains an error. The error will be considered resolved when the list of files changes */
    export interface passportElementErrorSourceFiles {
        '@type': 'passportElementErrorSourceFiles';
    }
    
    
    /** Contains the description of an error in a Telegram Passport element */
    export interface passportElementError {
        '@type': 'passportElementError';
        /** Type of the Telegram Passport element which has the error */
        type: PassportElementType;
        /** Error message */
        message: string;
        /** Error source */
        source: PassportElementErrorSource;
    }
    
    
    /** Contains information about a Telegram Passport element that was requested by a service */
    export interface passportSuitableElement {
        '@type': 'passportSuitableElement';
        /** Type of the element */
        type: PassportElementType;
        /** True, if a selfie is required with the identity document */
        is_selfie_required: Bool;
        /** True, if a certified English translation is required with the document */
        is_translation_required: Bool;
        /** True, if personal details must include the user's name in the language of their country of residence */
        is_native_name_required: Bool;
    }
    
    
    /** Contains a description of the required Telegram Passport element that was requested by a service */
    export interface passportRequiredElement {
        '@type': 'passportRequiredElement';
        /** List of Telegram Passport elements any of which is enough to provide */
        suitable_elements: vector<passportSuitableElement>;
    }
    
    
    /** Contains information about a Telegram Passport authorization form that was requested */
    export interface passportAuthorizationForm {
        '@type': 'passportAuthorizationForm';
        /** Unique identifier of the authorization form */
        id: int32;
        /** Telegram Passport elements that must be provided to complete the form */
        required_elements: vector<passportRequiredElement>;
        /** URL for the privacy policy of the service; may be empty */
        privacy_policy_url: string;
    }
    
    
    /** Contains information about a Telegram Passport elements and corresponding errors */
    export interface passportElementsWithErrors {
        '@type': 'passportElementsWithErrors';
        /** Telegram Passport elements */
        elements: vector<PassportElement>;
        /** Errors in the elements that are already available */
        errors: vector<passportElementError>;
    }
    
    
    /** Contains encrypted Telegram Passport data credentials */
    export interface encryptedCredentials {
        '@type': 'encryptedCredentials';
        /** The encrypted credentials */
        data: bytes;
        /** The decrypted data hash */
        hash: bytes;
        /** Secret for data decryption, encrypted with the service's public key */
        secret: bytes;
    }
    
    
    /** Contains information about an encrypted Telegram Passport element; for bots only */
    export interface encryptedPassportElement {
        '@type': 'encryptedPassportElement';
        /** Type of Telegram Passport element */
        type: PassportElementType;
        /** Encrypted JSON-encoded data about the user */
        data: bytes;
        /** The front side of an identity document */
        front_side: datedFile;
        /** The reverse side of an identity document; may be null */
        reverse_side?: datedFile;
        /** Selfie with the document; may be null */
        selfie?: datedFile;
        /** List of files containing a certified English translation of the document */
        translation: vector<datedFile>;
        /** List of attached files */
        files: vector<datedFile>;
        /** Unencrypted data, phone number or email address */
        value: string;
        /** Hash of the entire element */
        hash: string;
    }
    
    
    /** The element contains an error in an unspecified place. The error will be considered resolved when new data is added */
    export interface inputPassportElementErrorSourceUnspecified {
        '@type': 'inputPassportElementErrorSourceUnspecified';
        /** Current hash of the entire element */
        element_hash: bytes;
    }
    
    
    /** A data field contains an error. The error is considered resolved when the field's value changes */
    export interface inputPassportElementErrorSourceDataField {
        '@type': 'inputPassportElementErrorSourceDataField';
        /** Field name */
        field_name: string;
        /** Current data hash */
        data_hash: bytes;
    }
    
    
    /** The front side of the document contains an error. The error is considered resolved when the file with the front side of the document changes */
    export interface inputPassportElementErrorSourceFrontSide {
        '@type': 'inputPassportElementErrorSourceFrontSide';
        /** Current hash of the file containing the front side */
        file_hash: bytes;
    }
    
    
    /** The reverse side of the document contains an error. The error is considered resolved when the file with the reverse side of the document changes */
    export interface inputPassportElementErrorSourceReverseSide {
        '@type': 'inputPassportElementErrorSourceReverseSide';
        /** Current hash of the file containing the reverse side */
        file_hash: bytes;
    }
    
    
    /** The selfie contains an error. The error is considered resolved when the file with the selfie changes */
    export interface inputPassportElementErrorSourceSelfie {
        '@type': 'inputPassportElementErrorSourceSelfie';
        /** Current hash of the file containing the selfie */
        file_hash: bytes;
    }
    
    
    /** One of the files containing the translation of the document contains an error. The error is considered resolved when the file with the translation changes */
    export interface inputPassportElementErrorSourceTranslationFile {
        '@type': 'inputPassportElementErrorSourceTranslationFile';
        /** Current hash of the file containing the translation */
        file_hash: bytes;
    }
    
    
    /** The translation of the document contains an error. The error is considered resolved when the list of files changes */
    export interface inputPassportElementErrorSourceTranslationFiles {
        '@type': 'inputPassportElementErrorSourceTranslationFiles';
        /** Current hashes of all files with the translation */
        file_hashes: vector<bytes>;
    }
    
    
    /** The file contains an error. The error is considered resolved when the file changes */
    export interface inputPassportElementErrorSourceFile {
        '@type': 'inputPassportElementErrorSourceFile';
        /** Current hash of the file which has the error */
        file_hash: bytes;
    }
    
    
    /** The list of attached files contains an error. The error is considered resolved when the file list changes */
    export interface inputPassportElementErrorSourceFiles {
        '@type': 'inputPassportElementErrorSourceFiles';
        /** Current hashes of all attached files */
        file_hashes: vector<bytes>;
    }
    
    
    /** Contains the description of an error in a Telegram Passport element; for bots only */
    export interface inputPassportElementError {
        '@type': 'inputPassportElementError';
        /** Type of Telegram Passport element that has the error */
        type: PassportElementType;
        /** Error message */
        message: string;
        /** Error source */
        source: InputPassportElementErrorSource;
    }
    
    
    /** A text message */
    export interface messageText {
        '@type': 'messageText';
        /** Text of the message */
        text: formattedText;
        /** A preview of the web page that's mentioned in the text; may be null */
        web_page?: webPage;
    }
    
    
    /** An animation message (GIF-style). */
    export interface messageAnimation {
        '@type': 'messageAnimation';
        /** The animation description */
        animation: animation;
        /** Animation caption */
        caption: formattedText;
        /** True, if the animation thumbnail must be blurred and the animation must be shown only while tapped */
        is_secret: Bool;
    }
    
    
    /** An audio message */
    export interface messageAudio {
        '@type': 'messageAudio';
        /** The audio description */
        audio: audio;
        /** Audio caption */
        caption: formattedText;
    }
    
    
    /** A document message (general file) */
    export interface messageDocument {
        '@type': 'messageDocument';
        /** The document description */
        document: document;
        /** Document caption */
        caption: formattedText;
    }
    
    
    /** A photo message */
    export interface messagePhoto {
        '@type': 'messagePhoto';
        /** The photo description */
        photo: photo;
        /** Photo caption */
        caption: formattedText;
        /** True, if the photo must be blurred and must be shown only while tapped */
        is_secret: Bool;
    }
    
    
    /** An expired photo message (self-destructed after TTL has elapsed) */
    export interface messageExpiredPhoto {
        '@type': 'messageExpiredPhoto';
    }
    
    
    /** A sticker message */
    export interface messageSticker {
        '@type': 'messageSticker';
        /** The sticker description */
        sticker: sticker;
        /** True, if premium animation of the sticker must be played */
        is_premium: Bool;
    }
    
    
    /** A video message */
    export interface messageVideo {
        '@type': 'messageVideo';
        /** The video description */
        video: video;
        /** Video caption */
        caption: formattedText;
        /** True, if the video thumbnail must be blurred and the video must be shown only while tapped */
        is_secret: Bool;
    }
    
    
    /** An expired video message (self-destructed after TTL has elapsed) */
    export interface messageExpiredVideo {
        '@type': 'messageExpiredVideo';
    }
    
    
    /** A video note message */
    export interface messageVideoNote {
        '@type': 'messageVideoNote';
        /** The video note description */
        video_note: videoNote;
        /** True, if at least one of the recipients has viewed the video note */
        is_viewed: Bool;
        /** True, if the video note thumbnail must be blurred and the video note must be shown only while tapped */
        is_secret: Bool;
    }
    
    
    /** A voice note message */
    export interface messageVoiceNote {
        '@type': 'messageVoiceNote';
        /** The voice note description */
        voice_note: voiceNote;
        /** Voice note caption */
        caption: formattedText;
        /** True, if at least one of the recipients has listened to the voice note */
        is_listened: Bool;
    }
    
    
    /** A message with a location */
    export interface messageLocation {
        '@type': 'messageLocation';
        /** The location description */
        location: location;
        /** Time relative to the message send date, for which the location can be updated, in seconds */
        live_period: int32;
        /** Left time for which the location can be updated, in seconds. updateMessageContent is not sent when this field changes */
        expires_in: int32;
        /** For live locations, a direction in which the location moves, in degrees; 1-360. If 0 the direction is unknown */
        heading: int32;
        /** For live locations, a maximum distance to another chat member for proximity alerts, in meters (0-100000). 0 if the notification is disabled. Available only for the message sender */
        proximity_alert_radius: int32;
    }
    
    
    /** A message with information about a venue */
    export interface messageVenue {
        '@type': 'messageVenue';
        /** The venue description */
        venue: venue;
    }
    
    
    /** A message with a user contact */
    export interface messageContact {
        '@type': 'messageContact';
        /** The contact description */
        contact: contact;
    }
    
    
    /** A message with an animated emoji */
    export interface messageAnimatedEmoji {
        '@type': 'messageAnimatedEmoji';
        /** The animated emoji */
        animated_emoji: animatedEmoji;
        /** The corresponding emoji */
        emoji: string;
    }
    
    
    /** A dice message. The dice value is randomly generated by the server */
    export interface messageDice {
        '@type': 'messageDice';
        /** The animated stickers with the initial dice animation; may be null if unknown. updateMessageContent will be sent when the sticker became known */
        initial_state?: DiceStickers;
        /** The animated stickers with the final dice animation; may be null if unknown. updateMessageContent will be sent when the sticker became known */
        final_state?: DiceStickers;
        /** Emoji on which the dice throw animation is based */
        emoji: string;
        /** The dice value. If the value is 0, the dice don't have final state yet */
        value: int32;
        /** Number of frame after which a success animation like a shower of confetti needs to be shown on updateMessageSendSucceeded */
        success_animation_frame_number: int32;
    }
    
    
    /** A message with a game */
    export interface messageGame {
        '@type': 'messageGame';
        /** The game description */
        game: game;
    }
    
    
    /** A message with a poll */
    export interface messagePoll {
        '@type': 'messagePoll';
        /** The poll description */
        poll: poll;
    }
    
    
    /** A message with an invoice from a bot */
    export interface messageInvoice {
        '@type': 'messageInvoice';
        /** Product title */
        title: string;
        /** A message with an invoice from a bot */
        description: formattedText;
        /** Product photo; may be null */
        photo?: photo;
        /** Currency for the product price */
        currency: string;
        /** Product total price in the smallest units of the currency */
        total_amount: int53;
        /** Unique invoice bot start_parameter. To share an invoice use the URL https://t.me/{bot_username}?start={start_parameter} */
        start_parameter: string;
        /** True, if the invoice is a test invoice */
        is_test: Bool;
        /** True, if the shipping address must be specified */
        need_shipping_address: Bool;
        /** The identifier of the message with the receipt, after the product has been purchased */
        receipt_message_id: int53;
    }
    
    
    /** A message with information about an ended call */
    export interface messageCall {
        '@type': 'messageCall';
        /** True, if the call was a video call */
        is_video: Bool;
        /** Reason why the call was discarded */
        discard_reason: CallDiscardReason;
        /** Call duration, in seconds */
        duration: int32;
    }
    
    
    /** A new video chat was scheduled */
    export interface messageVideoChatScheduled {
        '@type': 'messageVideoChatScheduled';
        /** Identifier of the video chat. The video chat can be received through the method getGroupCall */
        group_call_id: int32;
        /** Point in time (Unix timestamp) when the group call is supposed to be started by an administrator */
        start_date: int32;
    }
    
    
    /** A newly created video chat */
    export interface messageVideoChatStarted {
        '@type': 'messageVideoChatStarted';
        /** Identifier of the video chat. The video chat can be received through the method getGroupCall */
        group_call_id: int32;
    }
    
    
    /** A message with information about an ended video chat */
    export interface messageVideoChatEnded {
        '@type': 'messageVideoChatEnded';
        /** Call duration, in seconds */
        duration: int32;
    }
    
    
    /** A message with information about an invite to a video chat */
    export interface messageInviteVideoChatParticipants {
        '@type': 'messageInviteVideoChatParticipants';
        /** Identifier of the video chat. The video chat can be received through the method getGroupCall */
        group_call_id: int32;
        /** Invited user identifiers */
        user_ids: vector<int53>;
    }
    
    
    /** A newly created basic group */
    export interface messageBasicGroupChatCreate {
        '@type': 'messageBasicGroupChatCreate';
        /** Title of the basic group */
        title: string;
        /** User identifiers of members in the basic group */
        member_user_ids: vector<int53>;
    }
    
    
    /** A newly created supergroup or channel */
    export interface messageSupergroupChatCreate {
        '@type': 'messageSupergroupChatCreate';
        /** Title of the supergroup or channel */
        title: string;
    }
    
    
    /** An updated chat title */
    export interface messageChatChangeTitle {
        '@type': 'messageChatChangeTitle';
        /** New chat title */
        title: string;
    }
    
    
    /** An updated chat photo */
    export interface messageChatChangePhoto {
        '@type': 'messageChatChangePhoto';
        /** New chat photo */
        photo: chatPhoto;
    }
    
    
    /** A deleted chat photo */
    export interface messageChatDeletePhoto {
        '@type': 'messageChatDeletePhoto';
    }
    
    
    /** New chat members were added */
    export interface messageChatAddMembers {
        '@type': 'messageChatAddMembers';
        /** User identifiers of the new members */
        member_user_ids: vector<int53>;
    }
    
    
    /** A new member joined the chat via an invite link */
    export interface messageChatJoinByLink {
        '@type': 'messageChatJoinByLink';
    }
    
    
    /** A new member was accepted to the chat by an administrator */
    export interface messageChatJoinByRequest {
        '@type': 'messageChatJoinByRequest';
    }
    
    
    /** A chat member was deleted */
    export interface messageChatDeleteMember {
        '@type': 'messageChatDeleteMember';
        /** User identifier of the deleted chat member */
        user_id: int53;
    }
    
    
    /** A basic group was upgraded to a supergroup and was deactivated as the result */
    export interface messageChatUpgradeTo {
        '@type': 'messageChatUpgradeTo';
        /** Identifier of the supergroup to which the basic group was upgraded */
        supergroup_id: int53;
    }
    
    
    /** A supergroup has been created from a basic group */
    export interface messageChatUpgradeFrom {
        '@type': 'messageChatUpgradeFrom';
        /** Title of the newly created supergroup */
        title: string;
        /** The identifier of the original basic group */
        basic_group_id: int53;
    }
    
    
    /** A message has been pinned */
    export interface messagePinMessage {
        '@type': 'messagePinMessage';
        /** Identifier of the pinned message, can be an identifier of a deleted message or 0 */
        message_id: int53;
    }
    
    
    /** A screenshot of a message in the chat has been taken */
    export interface messageScreenshotTaken {
        '@type': 'messageScreenshotTaken';
    }
    
    
    /** A theme in the chat has been changed */
    export interface messageChatSetTheme {
        '@type': 'messageChatSetTheme';
        /** If non-empty, name of a new theme, set for the chat. Otherwise chat theme was reset to the default one */
        theme_name: string;
    }
    
    
    /** The TTL (Time To Live) setting for messages in the chat has been changed */
    export interface messageChatSetTtl {
        '@type': 'messageChatSetTtl';
        /** New message TTL */
        ttl: int32;
    }
    
    
    /** A non-standard action has happened in the chat */
    export interface messageCustomServiceAction {
        '@type': 'messageCustomServiceAction';
        /** Message text to be shown in the chat */
        text: string;
    }
    
    
    /** A new high score was achieved in a game */
    export interface messageGameScore {
        '@type': 'messageGameScore';
        /** Identifier of the message with the game, can be an identifier of a deleted message */
        game_message_id: int53;
        /** Identifier of the game; may be different from the games presented in the message with the game */
        game_id: int64;
        /** New score */
        score: int32;
    }
    
    
    /** A payment has been completed */
    export interface messagePaymentSuccessful {
        '@type': 'messagePaymentSuccessful';
        /** Identifier of the chat, containing the corresponding invoice message; 0 if unknown */
        invoice_chat_id: int53;
        /** Identifier of the message with the corresponding invoice; can be 0 or an identifier of a deleted message */
        invoice_message_id: int53;
        /** Currency for the price of the product */
        currency: string;
        /** Total price for the product, in the smallest units of the currency */
        total_amount: int53;
        /** True, if this is a recurring payment */
        is_recurring: Bool;
        /** True, if this is the first recurring payment */
        is_first_recurring: Bool;
        /** Name of the invoice; may be empty if unknown */
        invoice_name: string;
    }
    
    
    /** A payment has been completed; for bots only */
    export interface messagePaymentSuccessfulBot {
        '@type': 'messagePaymentSuccessfulBot';
        /** Currency for price of the product */
        currency: string;
        /** Total price for the product, in the smallest units of the currency */
        total_amount: int53;
        /** True, if this is a recurring payment */
        is_recurring: Bool;
        /** True, if this is the first recurring payment */
        is_first_recurring: Bool;
        /** Invoice payload */
        invoice_payload: bytes;
        /** Identifier of the shipping option chosen by the user; may be empty if not applicable */
        shipping_option_id: string;
        /** Information about the order; may be null */
        order_info?: orderInfo;
        /** Telegram payment identifier */
        telegram_payment_charge_id: string;
        /** Provider payment identifier */
        provider_payment_charge_id: string;
    }
    
    
    /** A contact has registered with Telegram */
    export interface messageContactRegistered {
        '@type': 'messageContactRegistered';
    }
    
    
    /** The current user has connected a website by logging in using Telegram Login Widget on it */
    export interface messageWebsiteConnected {
        '@type': 'messageWebsiteConnected';
        /** Domain name of the connected website */
        domain_name: string;
    }
    
    
    /** Data from a Web App has been sent to a bot */
    export interface messageWebAppDataSent {
        '@type': 'messageWebAppDataSent';
        /** Text of the keyboardButtonTypeWebApp button, which opened the Web App */
        button_text: string;
    }
    
    
    /** Data from a Web App has been received; for bots only */
    export interface messageWebAppDataReceived {
        '@type': 'messageWebAppDataReceived';
        /** Text of the keyboardButtonTypeWebApp button, which opened the Web App */
        button_text: string;
        /** Received data */
        data: string;
    }
    
    
    /** Telegram Passport data has been sent to a bot */
    export interface messagePassportDataSent {
        '@type': 'messagePassportDataSent';
        /** List of Telegram Passport element types sent */
        types: vector<PassportElementType>;
    }
    
    
    /** Telegram Passport data has been received; for bots only */
    export interface messagePassportDataReceived {
        '@type': 'messagePassportDataReceived';
        /** List of received Telegram Passport elements */
        elements: vector<encryptedPassportElement>;
        /** Encrypted data credentials */
        credentials: encryptedCredentials;
    }
    
    
    /** A user in the chat came within proximity alert range */
    export interface messageProximityAlertTriggered {
        '@type': 'messageProximityAlertTriggered';
        /** The identifier of a user or chat that triggered the proximity alert */
        traveler_id: MessageSender;
        /** The identifier of a user or chat that subscribed for the proximity alert */
        watcher_id: MessageSender;
        /** The distance between the users */
        distance: int32;
    }
    
    
    /** Message content that is not supported in the current TDLib version */
    export interface messageUnsupported {
        '@type': 'messageUnsupported';
    }
    
    
    /** A mention of a user by their username */
    export interface textEntityTypeMention {
        '@type': 'textEntityTypeMention';
    }
    
    
    /** A hashtag text, beginning with "#" */
    export interface textEntityTypeHashtag {
        '@type': 'textEntityTypeHashtag';
    }
    
    
    /** A cashtag text, beginning with "$" and consisting of capital English letters (e.g., "$USD") */
    export interface textEntityTypeCashtag {
        '@type': 'textEntityTypeCashtag';
    }
    
    
    /** A bot command, beginning with "/" */
    export interface textEntityTypeBotCommand {
        '@type': 'textEntityTypeBotCommand';
    }
    
    
    /** An HTTP URL */
    export interface textEntityTypeUrl {
        '@type': 'textEntityTypeUrl';
    }
    
    
    /** An email address */
    export interface textEntityTypeEmailAddress {
        '@type': 'textEntityTypeEmailAddress';
    }
    
    
    /** A phone number */
    export interface textEntityTypePhoneNumber {
        '@type': 'textEntityTypePhoneNumber';
    }
    
    
    /** A bank card number. The getBankCardInfo method can be used to get information about the bank card */
    export interface textEntityTypeBankCardNumber {
        '@type': 'textEntityTypeBankCardNumber';
    }
    
    
    /** A bold text */
    export interface textEntityTypeBold {
        '@type': 'textEntityTypeBold';
    }
    
    
    /** An italic text */
    export interface textEntityTypeItalic {
        '@type': 'textEntityTypeItalic';
    }
    
    
    /** An underlined text */
    export interface textEntityTypeUnderline {
        '@type': 'textEntityTypeUnderline';
    }
    
    
    /** A strikethrough text */
    export interface textEntityTypeStrikethrough {
        '@type': 'textEntityTypeStrikethrough';
    }
    
    
    /** A spoiler text. Not supported in secret chats */
    export interface textEntityTypeSpoiler {
        '@type': 'textEntityTypeSpoiler';
    }
    
    
    /** Text that must be formatted as if inside a code HTML tag */
    export interface textEntityTypeCode {
        '@type': 'textEntityTypeCode';
    }
    
    
    /** Text that must be formatted as if inside a pre HTML tag */
    export interface textEntityTypePre {
        '@type': 'textEntityTypePre';
    }
    
    
    /** Text that must be formatted as if inside pre, and code HTML tags */
    export interface textEntityTypePreCode {
        '@type': 'textEntityTypePreCode';
        /** Programming language of the code; as defined by the sender */
        language: string;
    }
    
    
    /** A text description shown instead of a raw URL */
    export interface textEntityTypeTextUrl {
        '@type': 'textEntityTypeTextUrl';
        /** HTTP or tg:// URL to be opened when the link is clicked */
        url: string;
    }
    
    
    /** A text shows instead of a raw mention of the user (e.g., when the user has no username) */
    export interface textEntityTypeMentionName {
        '@type': 'textEntityTypeMentionName';
        /** Identifier of the mentioned user */
        user_id: int53;
    }
    
    
    /** A media timestamp */
    export interface textEntityTypeMediaTimestamp {
        '@type': 'textEntityTypeMediaTimestamp';
        /** Timestamp from which a video/audio/video note/voice note playing must start, in seconds. The media can be in the content or the web page preview of the current message, or in the same places in the replied message */
        media_timestamp: int32;
    }
    
    
    /** A thumbnail to be sent along with a file; must be in JPEG or WEBP format for stickers, and less than 200 KB in size */
    export interface inputThumbnail {
        '@type': 'inputThumbnail';
        /** Thumbnail file to send. Sending thumbnails by file_id is currently not supported */
        thumbnail: InputFile;
        /** Thumbnail width, usually shouldn't exceed 320. Use 0 if unknown */
        width: int32;
        /** Thumbnail height, usually shouldn't exceed 320. Use 0 if unknown */
        height: int32;
    }
    
    
    /** The message will be sent at the specified date */
    export interface messageSchedulingStateSendAtDate {
        '@type': 'messageSchedulingStateSendAtDate';
        /** Date the message will be sent. The date must be within 367 days in the future */
        send_date: int32;
    }
    
    
    /** The message will be sent when the peer will be online. Applicable to private chats only and when the exact online status of the peer is known */
    export interface messageSchedulingStateSendWhenOnline {
        '@type': 'messageSchedulingStateSendWhenOnline';
    }
    
    
    /** Options to be used when a message is sent */
    export interface messageSendOptions {
        '@type': 'messageSendOptions';
        /** Pass true to disable notification for the message */
        disable_notification: Bool;
        /** Pass true if the message is sent from the background */
        from_background: Bool;
        /** Pass true if the content of the message must be protected from forwarding and saving; for bots only */
        protect_content: Bool;
        /** Message scheduling state; pass null to send message immediately. Messages sent to a secret chat, live location messages and self-destructing messages can't be scheduled */
        scheduling_state: MessageSchedulingState;
    }
    
    
    /** Options to be used when a message content is copied without reference to the original sender. Service messages and messageInvoice can't be copied */
    export interface messageCopyOptions {
        '@type': 'messageCopyOptions';
        /** True, if content of the message needs to be copied without reference to the original sender. Always true if the message is forwarded to a secret chat or is local */
        send_copy: Bool;
        /** True, if media caption of the message copy needs to be replaced. Ignored if send_copy is false */
        replace_caption: Bool;
        /** New message caption; pass null to copy message without caption. Ignored if replace_caption is false */
        new_caption: formattedText;
    }
    
    
    /** A text message */
    export interface inputMessageText {
        '@type': 'inputMessageText';
        /** Formatted text to be sent; 1-GetOption("message_text_length_max") characters. Only Bold, Italic, Underline, Strikethrough, Spoiler, Code, Pre, PreCode, TextUrl and MentionName entities are allowed to be specified manually */
        text: formattedText;
        /** True, if rich web page previews for URLs in the message text must be disabled */
        disable_web_page_preview: Bool;
        /** True, if a chat message draft must be deleted */
        clear_draft: Bool;
    }
    
    
    /** An animation message (GIF-style). */
    export interface inputMessageAnimation {
        '@type': 'inputMessageAnimation';
        /** Animation file to be sent */
        animation: InputFile;
        /** Animation thumbnail; pass null to skip thumbnail uploading */
        thumbnail: inputThumbnail;
        /** File identifiers of the stickers added to the animation, if applicable */
        added_sticker_file_ids: vector<int32>;
        /** Duration of the animation, in seconds */
        duration: int32;
        /** Width of the animation; may be replaced by the server */
        width: int32;
        /** Height of the animation; may be replaced by the server */
        height: int32;
        /** Animation caption; pass null to use an empty caption; 0-GetOption("message_caption_length_max") characters */
        caption: formattedText;
    }
    
    
    /** An audio message */
    export interface inputMessageAudio {
        '@type': 'inputMessageAudio';
        /** Audio file to be sent */
        audio: InputFile;
        /** Thumbnail of the cover for the album; pass null to skip thumbnail uploading */
        album_cover_thumbnail: inputThumbnail;
        /** Duration of the audio, in seconds; may be replaced by the server */
        duration: int32;
        /** Title of the audio; 0-64 characters; may be replaced by the server */
        title: string;
        /** Performer of the audio; 0-64 characters, may be replaced by the server */
        performer: string;
        /** Audio caption; pass null to use an empty caption; 0-GetOption("message_caption_length_max") characters */
        caption: formattedText;
    }
    
    
    /** A document message (general file) */
    export interface inputMessageDocument {
        '@type': 'inputMessageDocument';
        /** Document to be sent */
        document: InputFile;
        /** Document thumbnail; pass null to skip thumbnail uploading */
        thumbnail: inputThumbnail;
        /** If true, automatic file type detection will be disabled and the document will be always sent as file. Always true for files sent to secret chats */
        disable_content_type_detection: Bool;
        /** Document caption; pass null to use an empty caption; 0-GetOption("message_caption_length_max") characters */
        caption: formattedText;
    }
    
    
    /** A photo message */
    export interface inputMessagePhoto {
        '@type': 'inputMessagePhoto';
        /** Photo to send. The photo must be at most 10 MB in size. The photo's width and height must not exceed 10000 in total. Width and height ratio must be at most 20 */
        photo: InputFile;
        /** Photo thumbnail to be sent; pass null to skip thumbnail uploading. The thumbnail is sent to the other party only in secret chats */
        thumbnail: inputThumbnail;
        /** File identifiers of the stickers added to the photo, if applicable */
        added_sticker_file_ids: vector<int32>;
        /** Photo width */
        width: int32;
        /** Photo height */
        height: int32;
        /** Photo caption; pass null to use an empty caption; 0-GetOption("message_caption_length_max") characters */
        caption: formattedText;
        /** Photo TTL (Time To Live), in seconds (0-60). A non-zero TTL can be specified only in private chats */
        ttl: int32;
    }
    
    
    /** A sticker message */
    export interface inputMessageSticker {
        '@type': 'inputMessageSticker';
        /** Sticker to be sent */
        sticker: InputFile;
        /** Sticker thumbnail; pass null to skip thumbnail uploading */
        thumbnail: inputThumbnail;
        /** Sticker width */
        width: int32;
        /** Sticker height */
        height: int32;
        /** Emoji used to choose the sticker */
        emoji: string;
    }
    
    
    /** A video message */
    export interface inputMessageVideo {
        '@type': 'inputMessageVideo';
        /** Video to be sent */
        video: InputFile;
        /** Video thumbnail; pass null to skip thumbnail uploading */
        thumbnail: inputThumbnail;
        /** File identifiers of the stickers added to the video, if applicable */
        added_sticker_file_ids: vector<int32>;
        /** Duration of the video, in seconds */
        duration: int32;
        /** Video width */
        width: int32;
        /** Video height */
        height: int32;
        /** True, if the video is supposed to be streamed */
        supports_streaming: Bool;
        /** Video caption; pass null to use an empty caption; 0-GetOption("message_caption_length_max") characters */
        caption: formattedText;
        /** Video TTL (Time To Live), in seconds (0-60). A non-zero TTL can be specified only in private chats */
        ttl: int32;
    }
    
    
    /** A video note message */
    export interface inputMessageVideoNote {
        '@type': 'inputMessageVideoNote';
        /** Video note to be sent */
        video_note: InputFile;
        /** Video thumbnail; pass null to skip thumbnail uploading */
        thumbnail: inputThumbnail;
        /** Duration of the video, in seconds */
        duration: int32;
        /** Video width and height; must be positive and not greater than 640 */
        length: int32;
    }
    
    
    /** A voice note message */
    export interface inputMessageVoiceNote {
        '@type': 'inputMessageVoiceNote';
        /** Voice note to be sent */
        voice_note: InputFile;
        /** Duration of the voice note, in seconds */
        duration: int32;
        /** Waveform representation of the voice note, in 5-bit format */
        waveform: bytes;
        /** Voice note caption; pass null to use an empty caption; 0-GetOption("message_caption_length_max") characters */
        caption: formattedText;
    }
    
    
    /** A message with a location */
    export interface inputMessageLocation {
        '@type': 'inputMessageLocation';
        /** Location to be sent */
        location: location;
        /** Period for which the location can be updated, in seconds; must be between 60 and 86400 for a live location and 0 otherwise */
        live_period: int32;
        /** For live locations, a direction in which the location moves, in degrees; 1-360. Pass 0 if unknown */
        heading: int32;
        /** For live locations, a maximum distance to another chat member for proximity alerts, in meters (0-100000). Pass 0 if the notification is disabled. Can't be enabled in channels and Saved Messages */
        proximity_alert_radius: int32;
    }
    
    
    /** A message with information about a venue */
    export interface inputMessageVenue {
        '@type': 'inputMessageVenue';
        /** Venue to send */
        venue: venue;
    }
    
    
    /** A message containing a user contact */
    export interface inputMessageContact {
        '@type': 'inputMessageContact';
        /** Contact to send */
        contact: contact;
    }
    
    
    /** A dice message */
    export interface inputMessageDice {
        '@type': 'inputMessageDice';
        /** Emoji on which the dice throw animation is based */
        emoji: string;
        /** True, if the chat message draft must be deleted */
        clear_draft: Bool;
    }
    
    
    /** A message with a game; not supported for channels or secret chats */
    export interface inputMessageGame {
        '@type': 'inputMessageGame';
        /** User identifier of the bot that owns the game */
        bot_user_id: int53;
        /** Short name of the game */
        game_short_name: string;
    }
    
    
    /** A message with an invoice; can be used only by bots */
    export interface inputMessageInvoice {
        '@type': 'inputMessageInvoice';
        /** Invoice */
        invoice: invoice;
        /** Product title; 1-32 characters */
        title: string;
        /** A message with an invoice; can be used only by bots */
        description: string;
        /** Product photo URL; optional */
        photo_url: string;
        /** Product photo size */
        photo_size: int32;
        /** Product photo width */
        photo_width: int32;
        /** Product photo height */
        photo_height: int32;
        /** The invoice payload */
        payload: bytes;
        /** Payment provider token */
        provider_token: string;
        /** JSON-encoded data about the invoice, which will be shared with the payment provider */
        provider_data: string;
        /** Unique invoice bot deep link parameter for the generation of this invoice. If empty, it would be possible to pay directly from forwards of the invoice message */
        start_parameter: string;
    }
    
    
    /** A message with a poll. Polls can't be sent to secret chats. Polls can be sent only to a private chat with a bot */
    export interface inputMessagePoll {
        '@type': 'inputMessagePoll';
        /** Poll question; 1-255 characters (up to 300 characters for bots) */
        question: string;
        /** List of poll answer options, 2-10 strings 1-100 characters each */
        options: vector<string>;
        /** True, if the poll voters are anonymous. Non-anonymous polls can't be sent or forwarded to channels */
        is_anonymous: Bool;
        /** Type of the poll */
        type: PollType;
        /** Amount of time the poll will be active after creation, in seconds; for bots only */
        open_period: int32;
        /** Point in time (Unix timestamp) when the poll will automatically be closed; for bots only */
        close_date: int32;
        /** True, if the poll needs to be sent already closed; for bots only */
        is_closed: Bool;
    }
    
    
    /** A forwarded message */
    export interface inputMessageForwarded {
        '@type': 'inputMessageForwarded';
        /** Identifier for the chat this forwarded message came from */
        from_chat_id: int53;
        /** Identifier of the message to forward */
        message_id: int53;
        /** True, if a game message is being shared from a launched game; applies only to game messages */
        in_game_share: Bool;
        /** Options to be used to copy content of the message without reference to the original sender; pass null to forward the message as usual */
        copy_options: messageCopyOptions;
    }
    
    
    /** Returns all found messages, no filter is applied */
    export interface searchMessagesFilterEmpty {
        '@type': 'searchMessagesFilterEmpty';
    }
    
    
    /** Returns only animation messages */
    export interface searchMessagesFilterAnimation {
        '@type': 'searchMessagesFilterAnimation';
    }
    
    
    /** Returns only audio messages */
    export interface searchMessagesFilterAudio {
        '@type': 'searchMessagesFilterAudio';
    }
    
    
    /** Returns only document messages */
    export interface searchMessagesFilterDocument {
        '@type': 'searchMessagesFilterDocument';
    }
    
    
    /** Returns only photo messages */
    export interface searchMessagesFilterPhoto {
        '@type': 'searchMessagesFilterPhoto';
    }
    
    
    /** Returns only video messages */
    export interface searchMessagesFilterVideo {
        '@type': 'searchMessagesFilterVideo';
    }
    
    
    /** Returns only voice note messages */
    export interface searchMessagesFilterVoiceNote {
        '@type': 'searchMessagesFilterVoiceNote';
    }
    
    
    /** Returns only photo and video messages */
    export interface searchMessagesFilterPhotoAndVideo {
        '@type': 'searchMessagesFilterPhotoAndVideo';
    }
    
    
    /** Returns only messages containing URLs */
    export interface searchMessagesFilterUrl {
        '@type': 'searchMessagesFilterUrl';
    }
    
    
    /** Returns only messages containing chat photos */
    export interface searchMessagesFilterChatPhoto {
        '@type': 'searchMessagesFilterChatPhoto';
    }
    
    
    /** Returns only video note messages */
    export interface searchMessagesFilterVideoNote {
        '@type': 'searchMessagesFilterVideoNote';
    }
    
    
    /** Returns only voice and video note messages */
    export interface searchMessagesFilterVoiceAndVideoNote {
        '@type': 'searchMessagesFilterVoiceAndVideoNote';
    }
    
    
    /** Returns only messages with mentions of the current user, or messages that are replies to their messages */
    export interface searchMessagesFilterMention {
        '@type': 'searchMessagesFilterMention';
    }
    
    
    /** Returns only messages with unread mentions of the current user, or messages that are replies to their messages. When using this filter the results can't be additionally filtered by a query, a message thread or by the sending user */
    export interface searchMessagesFilterUnreadMention {
        '@type': 'searchMessagesFilterUnreadMention';
    }
    
    
    /** Returns only messages with unread reactions for the current user. When using this filter the results can't be additionally filtered by a query, a message thread or by the sending user */
    export interface searchMessagesFilterUnreadReaction {
        '@type': 'searchMessagesFilterUnreadReaction';
    }
    
    
    /** Returns only failed to send messages. This filter can be used only if the message database is used */
    export interface searchMessagesFilterFailedToSend {
        '@type': 'searchMessagesFilterFailedToSend';
    }
    
    
    /** Returns only pinned messages */
    export interface searchMessagesFilterPinned {
        '@type': 'searchMessagesFilterPinned';
    }
    
    
    /** The user is typing a message */
    export interface chatActionTyping {
        '@type': 'chatActionTyping';
    }
    
    
    /** The user is recording a video */
    export interface chatActionRecordingVideo {
        '@type': 'chatActionRecordingVideo';
    }
    
    
    /** The user is uploading a video */
    export interface chatActionUploadingVideo {
        '@type': 'chatActionUploadingVideo';
        /** Upload progress, as a percentage */
        progress: int32;
    }
    
    
    /** The user is recording a voice note */
    export interface chatActionRecordingVoiceNote {
        '@type': 'chatActionRecordingVoiceNote';
    }
    
    
    /** The user is uploading a voice note */
    export interface chatActionUploadingVoiceNote {
        '@type': 'chatActionUploadingVoiceNote';
        /** Upload progress, as a percentage */
        progress: int32;
    }
    
    
    /** The user is uploading a photo */
    export interface chatActionUploadingPhoto {
        '@type': 'chatActionUploadingPhoto';
        /** Upload progress, as a percentage */
        progress: int32;
    }
    
    
    /** The user is uploading a document */
    export interface chatActionUploadingDocument {
        '@type': 'chatActionUploadingDocument';
        /** Upload progress, as a percentage */
        progress: int32;
    }
    
    
    /** The user is picking a sticker to send */
    export interface chatActionChoosingSticker {
        '@type': 'chatActionChoosingSticker';
    }
    
    
    /** The user is picking a location or venue to send */
    export interface chatActionChoosingLocation {
        '@type': 'chatActionChoosingLocation';
    }
    
    
    /** The user is picking a contact to send */
    export interface chatActionChoosingContact {
        '@type': 'chatActionChoosingContact';
    }
    
    
    /** The user has started to play a game */
    export interface chatActionStartPlayingGame {
        '@type': 'chatActionStartPlayingGame';
    }
    
    
    /** The user is recording a video note */
    export interface chatActionRecordingVideoNote {
        '@type': 'chatActionRecordingVideoNote';
    }
    
    
    /** The user is uploading a video note */
    export interface chatActionUploadingVideoNote {
        '@type': 'chatActionUploadingVideoNote';
        /** Upload progress, as a percentage */
        progress: int32;
    }
    
    
    /** The user is watching animations sent by the other party by clicking on an animated emoji */
    export interface chatActionWatchingAnimations {
        '@type': 'chatActionWatchingAnimations';
        /** The animated emoji */
        emoji: string;
    }
    
    
    /** The user has canceled the previous action */
    export interface chatActionCancel {
        '@type': 'chatActionCancel';
    }
    
    
    /** The user status was never changed */
    export interface userStatusEmpty {
        '@type': 'userStatusEmpty';
    }
    
    
    /** The user is online */
    export interface userStatusOnline {
        '@type': 'userStatusOnline';
        /** Point in time (Unix timestamp) when the user's online status will expire */
        expires: int32;
    }
    
    
    /** The user is offline */
    export interface userStatusOffline {
        '@type': 'userStatusOffline';
        /** Point in time (Unix timestamp) when the user was last online */
        was_online: int32;
    }
    
    
    /** The user was online recently */
    export interface userStatusRecently {
        '@type': 'userStatusRecently';
    }
    
    
    /** The user is offline, but was online last week */
    export interface userStatusLastWeek {
        '@type': 'userStatusLastWeek';
    }
    
    
    /** The user is offline, but was online last month */
    export interface userStatusLastMonth {
        '@type': 'userStatusLastMonth';
    }
    
    
    /** Represents a list of stickers */
    export interface stickers {
        '@type': 'stickers';
        /** List of stickers */
        stickers: vector<sticker>;
    }
    
    
    /** Represents a list of emoji */
    export interface emojis {
        '@type': 'emojis';
        /** List of emojis */
        emojis: vector<string>;
    }
    
    
    /** Represents a sticker set */
    export interface stickerSet {
        '@type': 'stickerSet';
        /** Identifier of the sticker set */
        id: int64;
        /** Title of the sticker set */
        title: string;
        /** Name of the sticker set */
        name: string;
        /** Sticker set thumbnail in WEBP, TGS, or WEBM format with width and height 100; may be null. The file can be downloaded only before the thumbnail is changed */
        thumbnail?: thumbnail;
        /** Sticker set thumbnail's outline represented as a list of closed vector paths; may be empty. The coordinate system origin is in the upper-left corner */
        thumbnail_outline: vector<closedVectorPath>;
        /** True, if the sticker set has been installed by the current user */
        is_installed: Bool;
        /** True, if the sticker set has been archived. A sticker set can't be installed and archived simultaneously */
        is_archived: Bool;
        /** True, if the sticker set is official */
        is_official: Bool;
        /** Type of the stickers in the set */
        sticker_type: StickerType;
        /** True for already viewed trending sticker sets */
        is_viewed: Bool;
        /** List of stickers in this set */
        stickers: vector<sticker>;
        /** A list of emoji corresponding to the stickers in the same order. The list is only for informational purposes, because a sticker is always sent with a fixed emoji from the corresponding Sticker object */
        emojis: vector<emojis>;
    }
    
    
    /** Represents short information about a sticker set */
    export interface stickerSetInfo {
        '@type': 'stickerSetInfo';
        /** Identifier of the sticker set */
        id: int64;
        /** Title of the sticker set */
        title: string;
        /** Name of the sticker set */
        name: string;
        /** Sticker set thumbnail in WEBP, TGS, or WEBM format with width and height 100; may be null */
        thumbnail?: thumbnail;
        /** Sticker set thumbnail's outline represented as a list of closed vector paths; may be empty. The coordinate system origin is in the upper-left corner */
        thumbnail_outline: vector<closedVectorPath>;
        /** True, if the sticker set has been installed by the current user */
        is_installed: Bool;
        /** True, if the sticker set has been archived. A sticker set can't be installed and archived simultaneously */
        is_archived: Bool;
        /** True, if the sticker set is official */
        is_official: Bool;
        /** Type of the stickers in the set */
        sticker_type: StickerType;
        /** True for already viewed trending sticker sets */
        is_viewed: Bool;
        /** Total number of stickers in the set */
        size: int32;
        /** Up to the first 5 stickers from the set, depending on the context. If the application needs more stickers the full sticker set needs to be requested */
        covers: vector<sticker>;
    }
    
    
    /** Represents a list of sticker sets */
    export interface stickerSets {
        '@type': 'stickerSets';
        /** Approximate total number of sticker sets found */
        total_count: int32;
        /** List of sticker sets */
        sets: vector<stickerSetInfo>;
    }
    
    
    /** Represents a list of trending sticker sets */
    export interface trendingStickerSets {
        '@type': 'trendingStickerSets';
        /** Approximate total number of trending sticker sets */
        total_count: int32;
        /** List of trending sticker sets */
        sets: vector<stickerSetInfo>;
        /** True, if the list contains sticker sets with premium stickers */
        is_premium: Bool;
    }
    
    
    /** The call wasn't discarded, or the reason is unknown */
    export interface callDiscardReasonEmpty {
        '@type': 'callDiscardReasonEmpty';
    }
    
    
    /** The call was ended before the conversation started. It was canceled by the caller or missed by the other party */
    export interface callDiscardReasonMissed {
        '@type': 'callDiscardReasonMissed';
    }
    
    
    /** The call was ended before the conversation started. It was declined by the other party */
    export interface callDiscardReasonDeclined {
        '@type': 'callDiscardReasonDeclined';
    }
    
    
    /** The call was ended during the conversation because the users were disconnected */
    export interface callDiscardReasonDisconnected {
        '@type': 'callDiscardReasonDisconnected';
    }
    
    
    /** The call was ended because one of the parties hung up */
    export interface callDiscardReasonHungUp {
        '@type': 'callDiscardReasonHungUp';
    }
    
    
    /** Specifies the supported call protocols */
    export interface callProtocol {
        '@type': 'callProtocol';
        /** True, if UDP peer-to-peer connections are supported */
        udp_p2p: Bool;
        /** True, if connection through UDP reflectors is supported */
        udp_reflector: Bool;
        /** The minimum supported API layer; use 65 */
        min_layer: int32;
        /** The maximum supported API layer; use 65 */
        max_layer: int32;
        /** List of supported tgcalls versions */
        library_versions: vector<string>;
    }
    
    
    /** A Telegram call reflector */
    export interface callServerTypeTelegramReflector {
        '@type': 'callServerTypeTelegramReflector';
        /** A peer tag to be used with the reflector */
        peer_tag: bytes;
        /** True, if the server uses TCP instead of UDP */
        is_tcp: Bool;
    }
    
    
    /** A WebRTC server */
    export interface callServerTypeWebrtc {
        '@type': 'callServerTypeWebrtc';
        /** Username to be used for authentication */
        username: string;
        /** Authentication password */
        password: string;
        /** True, if the server supports TURN */
        supports_turn: Bool;
        /** True, if the server supports STUN */
        supports_stun: Bool;
    }
    
    
    /** Describes a server for relaying call data */
    export interface callServer {
        '@type': 'callServer';
        /** Server identifier */
        id: int64;
        /** Server IPv4 address */
        ip_address: string;
        /** Server IPv6 address */
        ipv6_address: string;
        /** Server port number */
        port: int32;
        /** Server type */
        type: CallServerType;
    }
    
    
    /** Contains the call identifier */
    export interface callId {
        '@type': 'callId';
        /** Call identifier */
        id: int32;
    }
    
    
    /** Contains the group call identifier */
    export interface groupCallId {
        '@type': 'groupCallId';
        /** Group call identifier */
        id: int32;
    }
    
    
    /** The call is pending, waiting to be accepted by a user */
    export interface callStatePending {
        '@type': 'callStatePending';
        /** True, if the call has already been created by the server */
        is_created: Bool;
        /** True, if the call has already been received by the other party */
        is_received: Bool;
    }
    
    
    /** The call has been answered and encryption keys are being exchanged */
    export interface callStateExchangingKeys {
        '@type': 'callStateExchangingKeys';
    }
    
    
    /** The call is ready to use */
    export interface callStateReady {
        '@type': 'callStateReady';
        /** Call protocols supported by the peer */
        protocol: callProtocol;
        /** List of available call servers */
        servers: vector<callServer>;
        /** A JSON-encoded call config */
        config: string;
        /** Call encryption key */
        encryption_key: bytes;
        /** Encryption key emojis fingerprint */
        emojis: vector<string>;
        /** True, if peer-to-peer connection is allowed by users privacy settings */
        allow_p2p: Bool;
    }
    
    
    /** The call is hanging up after discardCall has been called */
    export interface callStateHangingUp {
        '@type': 'callStateHangingUp';
    }
    
    
    /** The call has ended successfully */
    export interface callStateDiscarded {
        '@type': 'callStateDiscarded';
        /** The reason, why the call has ended */
        reason: CallDiscardReason;
        /** True, if the call rating must be sent to the server */
        need_rating: Bool;
        /** True, if the call debug information must be sent to the server */
        need_debug_information: Bool;
        /** True, if the call log must be sent to the server */
        need_log: Bool;
    }
    
    
    /** The call has ended with an error */
    export interface callStateError {
        '@type': 'callStateError';
        /** Error. An error with the code 4005000 will be returned if an outgoing call is missed because of an expired timeout */
        error: error;
    }
    
    
    /** The worst available video quality */
    export interface groupCallVideoQualityThumbnail {
        '@type': 'groupCallVideoQualityThumbnail';
    }
    
    
    /** The medium video quality */
    export interface groupCallVideoQualityMedium {
        '@type': 'groupCallVideoQualityMedium';
    }
    
    
    /** The best available video quality */
    export interface groupCallVideoQualityFull {
        '@type': 'groupCallVideoQualityFull';
    }
    
    
    /** Describes an available stream in a group call */
    export interface groupCallStream {
        '@type': 'groupCallStream';
        /** Identifier of an audio/video channel */
        channel_id: int32;
        /** Scale of segment durations in the stream. The duration is 1000/(2**scale) milliseconds */
        scale: int32;
        /** Point in time when the stream currently ends; Unix timestamp in milliseconds */
        time_offset: int53;
    }
    
    
    /** Represents a list of group call streams */
    export interface groupCallStreams {
        '@type': 'groupCallStreams';
        /** A list of group call streams */
        streams: vector<groupCallStream>;
    }
    
    
    /** Represents an RTMP url */
    export interface rtmpUrl {
        '@type': 'rtmpUrl';
        /** The URL */
        url: string;
        /** Stream key */
        stream_key: string;
    }
    
    
    /** Describes a recently speaking participant in a group call */
    export interface groupCallRecentSpeaker {
        '@type': 'groupCallRecentSpeaker';
        /** Group call participant identifier */
        participant_id: MessageSender;
        /** True, is the user has spoken recently */
        is_speaking: Bool;
    }
    
    
    /** Describes a group call */
    export interface groupCall {
        '@type': 'groupCall';
        /** Group call identifier */
        id: int32;
        /** Group call title */
        title: string;
        /** Point in time (Unix timestamp) when the group call is supposed to be started by an administrator; 0 if it is already active or was ended */
        scheduled_start_date: int32;
        /** True, if the group call is scheduled and the current user will receive a notification when the group call will start */
        enabled_start_notification: Bool;
        /** True, if the call is active */
        is_active: Bool;
        /** True, if the chat is an RTMP stream instead of an ordinary video chat */
        is_rtmp_stream: Bool;
        /** True, if the call is joined */
        is_joined: Bool;
        /** True, if user was kicked from the call because of network loss and the call needs to be rejoined */
        need_rejoin: Bool;
        /** True, if the current user can manage the group call */
        can_be_managed: Bool;
        /** Number of participants in the group call */
        participant_count: int32;
        /** True, if group call participants, which are muted, aren't returned in participant list */
        has_hidden_listeners: Bool;
        /** True, if all group call participants are loaded */
        loaded_all_participants: Bool;
        /** At most 3 recently speaking users in the group call */
        recent_speakers: vector<groupCallRecentSpeaker>;
        /** True, if the current user's video is enabled */
        is_my_video_enabled: Bool;
        /** True, if the current user's video is paused */
        is_my_video_paused: Bool;
        /** True, if the current user can broadcast video or share screen */
        can_enable_video: Bool;
        /** True, if only group call administrators can unmute new participants */
        mute_new_participants: Bool;
        /** True, if the current user can enable or disable mute_new_participants setting */
        can_toggle_mute_new_participants: Bool;
        /** Duration of the ongoing group call recording, in seconds; 0 if none. An updateGroupCall update is not triggered when value of this field changes, but the same recording goes on */
        record_duration: int32;
        /** True, if a video file is being recorded for the call */
        is_video_recorded: Bool;
        /** Call duration, in seconds; for ended calls only */
        duration: int32;
    }
    
    
    /** Describes a group of video synchronization source identifiers */
    export interface groupCallVideoSourceGroup {
        '@type': 'groupCallVideoSourceGroup';
        /** The semantics of sources, one of "SIM" or "FID" */
        semantics: string;
        /** The list of synchronization source identifiers */
        source_ids: vector<int32>;
    }
    
    
    /** Contains information about a group call participant's video channel */
    export interface groupCallParticipantVideoInfo {
        '@type': 'groupCallParticipantVideoInfo';
        /** List of synchronization source groups of the video */
        source_groups: vector<groupCallVideoSourceGroup>;
        /** Video channel endpoint identifier */
        endpoint_id: string;
        /** True if the video is paused. This flag needs to be ignored, if new video frames are received */
        is_paused: Bool;
    }
    
    
    /** Represents a group call participant */
    export interface groupCallParticipant {
        '@type': 'groupCallParticipant';
        /** Identifier of the group call participant */
        participant_id: MessageSender;
        /** User's audio channel synchronization source identifier */
        audio_source_id: int32;
        /** User's screen sharing audio channel synchronization source identifier */
        screen_sharing_audio_source_id: int32;
        /** Information about user's video channel; may be null if there is no active video */
        video_info?: groupCallParticipantVideoInfo;
        /** Information about user's screen sharing video channel; may be null if there is no active screen sharing video */
        screen_sharing_video_info?: groupCallParticipantVideoInfo;
        /** The participant user's bio or the participant chat's description */
        bio: string;
        /** True, if the participant is the current user */
        is_current_user: Bool;
        /** True, if the participant is speaking as set by setGroupCallParticipantIsSpeaking */
        is_speaking: Bool;
        /** True, if the participant hand is raised */
        is_hand_raised: Bool;
        /** True, if the current user can mute the participant for all other group call participants */
        can_be_muted_for_all_users: Bool;
        /** True, if the current user can allow the participant to unmute themselves or unmute the participant (if the participant is the current user) */
        can_be_unmuted_for_all_users: Bool;
        /** True, if the current user can mute the participant only for self */
        can_be_muted_for_current_user: Bool;
        /** True, if the current user can unmute the participant for self */
        can_be_unmuted_for_current_user: Bool;
        /** True, if the participant is muted for all users */
        is_muted_for_all_users: Bool;
        /** True, if the participant is muted for the current user */
        is_muted_for_current_user: Bool;
        /** True, if the participant is muted for all users, but can unmute themselves */
        can_unmute_self: Bool;
        /** Participant's volume level; 1-20000 in hundreds of percents */
        volume_level: int32;
        /** User's order in the group call participant list. Orders must be compared lexicographically. The bigger is order, the higher is user in the list. If order is empty, the user must be removed from the participant list */
        order: string;
    }
    
    
    /** The user heard their own voice */
    export interface callProblemEcho {
        '@type': 'callProblemEcho';
    }
    
    
    /** The user heard background noise */
    export interface callProblemNoise {
        '@type': 'callProblemNoise';
    }
    
    
    /** The other side kept disappearing */
    export interface callProblemInterruptions {
        '@type': 'callProblemInterruptions';
    }
    
    
    /** The speech was distorted */
    export interface callProblemDistortedSpeech {
        '@type': 'callProblemDistortedSpeech';
    }
    
    
    /** The user couldn't hear the other side */
    export interface callProblemSilentLocal {
        '@type': 'callProblemSilentLocal';
    }
    
    
    /** The other side couldn't hear the user */
    export interface callProblemSilentRemote {
        '@type': 'callProblemSilentRemote';
    }
    
    
    /** The call ended unexpectedly */
    export interface callProblemDropped {
        '@type': 'callProblemDropped';
    }
    
    
    /** The video was distorted */
    export interface callProblemDistortedVideo {
        '@type': 'callProblemDistortedVideo';
    }
    
    
    /** The video was pixelated */
    export interface callProblemPixelatedVideo {
        '@type': 'callProblemPixelatedVideo';
    }
    
    
    /** Describes a call */
    export interface call {
        '@type': 'call';
        /** Call identifier, not persistent */
        id: int32;
        /** Peer user identifier */
        user_id: int53;
        /** True, if the call is outgoing */
        is_outgoing: Bool;
        /** True, if the call is a video call */
        is_video: Bool;
        /** Call state */
        state: CallState;
    }
    
    
    /** Contains settings for the authentication of the user's phone number */
    export interface phoneNumberAuthenticationSettings {
        '@type': 'phoneNumberAuthenticationSettings';
        /** Pass true if the authentication code may be sent via a flash call to the specified phone number */
        allow_flash_call: Bool;
        /** Pass true if the authentication code may be sent via a missed call to the specified phone number */
        allow_missed_call: Bool;
        /** Pass true if the authenticated phone number is used on the current device */
        is_current_phone_number: Bool;
        /** For official applications only. True, if the application can use Android SMS Retriever API (requires Google Play Services >= 10.2) to automatically receive the authentication code from the SMS. See https://developers.google.com/identity/sms-retriever/ for more details */
        allow_sms_retriever_api: Bool;
        /** List of up to 20 authentication tokens, recently received in updateOption("authentication_token") in previously logged out sessions */
        authentication_tokens: vector<string>;
    }
    
    
    /** Represents a reaction applied to a message */
    export interface addedReaction {
        '@type': 'addedReaction';
        /** Text representation of the reaction */
        reaction: string;
        /** Identifier of the chat member, applied the reaction */
        sender_id: MessageSender;
    }
    
    
    /** Represents a list of reactions added to a message */
    export interface addedReactions {
        '@type': 'addedReactions';
        /** The total number of found reactions */
        total_count: int32;
        /** The list of added reactions */
        reactions: vector<addedReaction>;
        /** The offset for the next request. If empty, there are no more results */
        next_offset: string;
    }
    
    
    /** Represents an available reaction */
    export interface availableReaction {
        '@type': 'availableReaction';
        /** Text representation of the reaction */
        reaction: string;
        /** True, if Telegram Premium is needed to send the reaction */
        needs_premium: Bool;
    }
    
    
    /** Represents a list of available reactions */
    export interface availableReactions {
        '@type': 'availableReactions';
        /** List of reactions */
        reactions: vector<availableReaction>;
    }
    
    
    /** Contains stickers which must be used for reaction animation rendering */
    export interface reaction {
        '@type': 'reaction';
        /** Text representation of the reaction */
        reaction: string;
        /** Reaction title */
        title: string;
        /** True, if the reaction can be added to new messages and enabled in chats */
        is_active: Bool;
        /** True, if the reaction is available only for Premium users */
        is_premium: Bool;
        /** Static icon for the reaction */
        static_icon: sticker;
        /** Appear animation for the reaction */
        appear_animation: sticker;
        /** Select animation for the reaction */
        select_animation: sticker;
        /** Activate animation for the reaction */
        activate_animation: sticker;
        /** Effect animation for the reaction */
        effect_animation: sticker;
        /** Around animation for the reaction; may be null */
        around_animation?: sticker;
        /** Center animation for the reaction; may be null */
        center_animation?: sticker;
    }
    
    
    /** Represents a list of animations */
    export interface animations {
        '@type': 'animations';
        /** List of animations */
        animations: vector<animation>;
    }
    
    
    /** A regular animated sticker */
    export interface diceStickersRegular {
        '@type': 'diceStickersRegular';
        /** The animated sticker with the dice animation */
        sticker: sticker;
    }
    
    
    /** Animated stickers to be combined into a slot machine */
    export interface diceStickersSlotMachine {
        '@type': 'diceStickersSlotMachine';
        /** The animated sticker with the slot machine background. The background animation must start playing after all reel animations finish */
        background: sticker;
        /** The animated sticker with the lever animation. The lever animation must play once in the initial dice state */
        lever: sticker;
        /** The animated sticker with the left reel */
        left_reel: sticker;
        /** The animated sticker with the center reel */
        center_reel: sticker;
        /** The animated sticker with the right reel */
        right_reel: sticker;
    }
    
    
    /** Represents the result of an ImportContacts request */
    export interface importedContacts {
        '@type': 'importedContacts';
        /** User identifiers of the imported contacts in the same order as they were specified in the request; 0 if the contact is not yet a registered user */
        user_ids: vector<int53>;
        /** The number of users that imported the corresponding contact; 0 for already registered users or if unavailable */
        importer_count: vector<int32>;
    }
    
    
    /** Describes a color to highlight a bot added to attachment menu */
    export interface attachmentMenuBotColor {
        '@type': 'attachmentMenuBotColor';
        /** Color in the RGB24 format for light themes */
        light_color: int32;
        /** Color in the RGB24 format for dark themes */
        dark_color: int32;
    }
    
    
    /** Represents a bot added to attachment menu */
    export interface attachmentMenuBot {
        '@type': 'attachmentMenuBot';
        /** User identifier of the bot added to attachment menu */
        bot_user_id: int53;
        /** True, if the bot supports opening from attachment menu in the chat with the bot */
        supports_self_chat: Bool;
        /** True, if the bot supports opening from attachment menu in private chats with ordinary users */
        supports_user_chats: Bool;
        /** True, if the bot supports opening from attachment menu in private chats with other bots */
        supports_bot_chats: Bool;
        /** True, if the bot supports opening from attachment menu in basic group and supergroup chats */
        supports_group_chats: Bool;
        /** True, if the bot supports opening from attachment menu in channel chats */
        supports_channel_chats: Bool;
        /** True, if the bot supports "settings_button_pressed" event */
        supports_settings: Bool;
        /** Name for the bot in attachment menu */
        name: string;
        /** Color to highlight selected name of the bot if appropriate; may be null */
        name_color?: attachmentMenuBotColor;
        /** Default attachment menu icon for the bot in SVG format; may be null */
        default_icon?: file;
        /** Attachment menu icon for the bot in SVG format for the official iOS app; may be null */
        ios_static_icon?: file;
        /** Attachment menu icon for the bot in TGS format for the official iOS app; may be null */
        ios_animated_icon?: file;
        /** Attachment menu icon for the bot in TGS format for the official Android app; may be null */
        android_icon?: file;
        /** Attachment menu icon for the bot in TGS format for the official native macOS app; may be null */
        macos_icon?: file;
        /** Color to highlight selected icon of the bot if appropriate; may be null */
        icon_color?: attachmentMenuBotColor;
        /** Default placeholder for opened Web Apps in SVG format; may be null */
        web_app_placeholder?: file;
    }
    
    
    /** Information about the message sent by answerWebAppQuery */
    export interface sentWebAppMessage {
        '@type': 'sentWebAppMessage';
        /** Identifier of the sent inline message, if known */
        inline_message_id: string;
    }
    
    
    /** Contains an HTTP URL */
    export interface httpUrl {
        '@type': 'httpUrl';
        /** The URL */
        url: string;
    }
    
    
    /** Represents a link to an animated GIF or an animated (i.e., without sound) H.264/MPEG-4 AVC video */
    export interface inputInlineQueryResultAnimation {
        '@type': 'inputInlineQueryResultAnimation';
        /** Unique identifier of the query result */
        id: string;
        /** Title of the query result */
        title: string;
        /** URL of the result thumbnail (JPEG, GIF, or MPEG4), if it exists */
        thumbnail_url: string;
        /** MIME type of the video thumbnail. If non-empty, must be one of "image/jpeg", "image/gif" and "video/mp4" */
        thumbnail_mime_type: string;
        /** The URL of the video file (file size must not exceed 1MB) */
        video_url: string;
        /** MIME type of the video file. Must be one of "image/gif" and "video/mp4" */
        video_mime_type: string;
        /** Duration of the video, in seconds */
        video_duration: int32;
        /** Width of the video */
        video_width: int32;
        /** Height of the video */
        video_height: int32;
        /** The message reply markup; pass null if none. Must be of type replyMarkupInlineKeyboard or null */
        reply_markup: ReplyMarkup;
        /** The content of the message to be sent. Must be one of the following types: inputMessageText, inputMessageAnimation, inputMessageInvoice, inputMessageLocation, inputMessageVenue or inputMessageContact */
        input_message_content: InputMessageContent;
    }
    
    
    /** Represents a link to an article or web page */
    export interface inputInlineQueryResultArticle {
        '@type': 'inputInlineQueryResultArticle';
        /** Unique identifier of the query result */
        id: string;
        /** URL of the result, if it exists */
        url: string;
        /** True, if the URL must be not shown */
        hide_url: Bool;
        /** Title of the result */
        title: string;
        /** Represents a link to an article or web page */
        description: string;
        /** URL of the result thumbnail, if it exists */
        thumbnail_url: string;
        /** Thumbnail width, if known */
        thumbnail_width: int32;
        /** Thumbnail height, if known */
        thumbnail_height: int32;
        /** The message reply markup; pass null if none. Must be of type replyMarkupInlineKeyboard or null */
        reply_markup: ReplyMarkup;
        /** The content of the message to be sent. Must be one of the following types: inputMessageText, inputMessageInvoice, inputMessageLocation, inputMessageVenue or inputMessageContact */
        input_message_content: InputMessageContent;
    }
    
    
    /** Represents a link to an MP3 audio file */
    export interface inputInlineQueryResultAudio {
        '@type': 'inputInlineQueryResultAudio';
        /** Unique identifier of the query result */
        id: string;
        /** Title of the audio file */
        title: string;
        /** Performer of the audio file */
        performer: string;
        /** The URL of the audio file */
        audio_url: string;
        /** Audio file duration, in seconds */
        audio_duration: int32;
        /** The message reply markup; pass null if none. Must be of type replyMarkupInlineKeyboard or null */
        reply_markup: ReplyMarkup;
        /** The content of the message to be sent. Must be one of the following types: inputMessageText, inputMessageAudio, inputMessageInvoice, inputMessageLocation, inputMessageVenue or inputMessageContact */
        input_message_content: InputMessageContent;
    }
    
    
    /** Represents a user contact */
    export interface inputInlineQueryResultContact {
        '@type': 'inputInlineQueryResultContact';
        /** Unique identifier of the query result */
        id: string;
        /** User contact */
        contact: contact;
        /** URL of the result thumbnail, if it exists */
        thumbnail_url: string;
        /** Thumbnail width, if known */
        thumbnail_width: int32;
        /** Thumbnail height, if known */
        thumbnail_height: int32;
        /** The message reply markup; pass null if none. Must be of type replyMarkupInlineKeyboard or null */
        reply_markup: ReplyMarkup;
        /** The content of the message to be sent. Must be one of the following types: inputMessageText, inputMessageInvoice, inputMessageLocation, inputMessageVenue or inputMessageContact */
        input_message_content: InputMessageContent;
    }
    
    
    /** Represents a link to a file */
    export interface inputInlineQueryResultDocument {
        '@type': 'inputInlineQueryResultDocument';
        /** Unique identifier of the query result */
        id: string;
        /** Title of the resulting file */
        title: string;
        /** Represents a link to a file */
        description: string;
        /** URL of the file */
        document_url: string;
        /** MIME type of the file content; only "application/pdf" and "application/zip" are currently allowed */
        mime_type: string;
        /** The URL of the file thumbnail, if it exists */
        thumbnail_url: string;
        /** Width of the thumbnail */
        thumbnail_width: int32;
        /** Height of the thumbnail */
        thumbnail_height: int32;
        /** The message reply markup; pass null if none. Must be of type replyMarkupInlineKeyboard or null */
        reply_markup: ReplyMarkup;
        /** The content of the message to be sent. Must be one of the following types: inputMessageText, inputMessageDocument, inputMessageInvoice, inputMessageLocation, inputMessageVenue or inputMessageContact */
        input_message_content: InputMessageContent;
    }
    
    
    /** Represents a game */
    export interface inputInlineQueryResultGame {
        '@type': 'inputInlineQueryResultGame';
        /** Unique identifier of the query result */
        id: string;
        /** Short name of the game */
        game_short_name: string;
        /** The message reply markup; pass null if none. Must be of type replyMarkupInlineKeyboard or null */
        reply_markup: ReplyMarkup;
    }
    
    
    /** Represents a point on the map */
    export interface inputInlineQueryResultLocation {
        '@type': 'inputInlineQueryResultLocation';
        /** Unique identifier of the query result */
        id: string;
        /** Location result */
        location: location;
        /** Amount of time relative to the message sent time until the location can be updated, in seconds */
        live_period: int32;
        /** Title of the result */
        title: string;
        /** URL of the result thumbnail, if it exists */
        thumbnail_url: string;
        /** Thumbnail width, if known */
        thumbnail_width: int32;
        /** Thumbnail height, if known */
        thumbnail_height: int32;
        /** The message reply markup; pass null if none. Must be of type replyMarkupInlineKeyboard or null */
        reply_markup: ReplyMarkup;
        /** The content of the message to be sent. Must be one of the following types: inputMessageText, inputMessageInvoice, inputMessageLocation, inputMessageVenue or inputMessageContact */
        input_message_content: InputMessageContent;
    }
    
    
    /** Represents link to a JPEG image */
    export interface inputInlineQueryResultPhoto {
        '@type': 'inputInlineQueryResultPhoto';
        /** Unique identifier of the query result */
        id: string;
        /** Title of the result, if known */
        title: string;
        /** Represents link to a JPEG image */
        description: string;
        /** URL of the photo thumbnail, if it exists */
        thumbnail_url: string;
        /** The URL of the JPEG photo (photo size must not exceed 5MB) */
        photo_url: string;
        /** Width of the photo */
        photo_width: int32;
        /** Height of the photo */
        photo_height: int32;
        /** The message reply markup; pass null if none. Must be of type replyMarkupInlineKeyboard or null */
        reply_markup: ReplyMarkup;
        /** The content of the message to be sent. Must be one of the following types: inputMessageText, inputMessagePhoto, inputMessageInvoice, inputMessageLocation, inputMessageVenue or inputMessageContact */
        input_message_content: InputMessageContent;
    }
    
    
    /** Represents a link to a WEBP, TGS, or WEBM sticker */
    export interface inputInlineQueryResultSticker {
        '@type': 'inputInlineQueryResultSticker';
        /** Unique identifier of the query result */
        id: string;
        /** URL of the sticker thumbnail, if it exists */
        thumbnail_url: string;
        /** The URL of the WEBP, TGS, or WEBM sticker (sticker file size must not exceed 5MB) */
        sticker_url: string;
        /** Width of the sticker */
        sticker_width: int32;
        /** Height of the sticker */
        sticker_height: int32;
        /** The message reply markup; pass null if none. Must be of type replyMarkupInlineKeyboard or null */
        reply_markup: ReplyMarkup;
        /** The content of the message to be sent. Must be one of the following types: inputMessageText, inputMessageSticker, inputMessageInvoice, inputMessageLocation, inputMessageVenue or inputMessageContact */
        input_message_content: InputMessageContent;
    }
    
    
    /** Represents information about a venue */
    export interface inputInlineQueryResultVenue {
        '@type': 'inputInlineQueryResultVenue';
        /** Unique identifier of the query result */
        id: string;
        /** Venue result */
        venue: venue;
        /** URL of the result thumbnail, if it exists */
        thumbnail_url: string;
        /** Thumbnail width, if known */
        thumbnail_width: int32;
        /** Thumbnail height, if known */
        thumbnail_height: int32;
        /** The message reply markup; pass null if none. Must be of type replyMarkupInlineKeyboard or null */
        reply_markup: ReplyMarkup;
        /** The content of the message to be sent. Must be one of the following types: inputMessageText, inputMessageInvoice, inputMessageLocation, inputMessageVenue or inputMessageContact */
        input_message_content: InputMessageContent;
    }
    
    
    /** Represents a link to a page containing an embedded video player or a video file */
    export interface inputInlineQueryResultVideo {
        '@type': 'inputInlineQueryResultVideo';
        /** Unique identifier of the query result */
        id: string;
        /** Title of the result */
        title: string;
        /** Represents a link to a page containing an embedded video player or a video file */
        description: string;
        /** The URL of the video thumbnail (JPEG), if it exists */
        thumbnail_url: string;
        /** URL of the embedded video player or video file */
        video_url: string;
        /** MIME type of the content of the video URL, only "text/html" or "video/mp4" are currently supported */
        mime_type: string;
        /** Width of the video */
        video_width: int32;
        /** Height of the video */
        video_height: int32;
        /** Video duration, in seconds */
        video_duration: int32;
        /** The message reply markup; pass null if none. Must be of type replyMarkupInlineKeyboard or null */
        reply_markup: ReplyMarkup;
        /** The content of the message to be sent. Must be one of the following types: inputMessageText, inputMessageVideo, inputMessageInvoice, inputMessageLocation, inputMessageVenue or inputMessageContact */
        input_message_content: InputMessageContent;
    }
    
    
    /** Represents a link to an opus-encoded audio file within an OGG container, single channel audio */
    export interface inputInlineQueryResultVoiceNote {
        '@type': 'inputInlineQueryResultVoiceNote';
        /** Unique identifier of the query result */
        id: string;
        /** Title of the voice note */
        title: string;
        /** The URL of the voice note file */
        voice_note_url: string;
        /** Duration of the voice note, in seconds */
        voice_note_duration: int32;
        /** The message reply markup; pass null if none. Must be of type replyMarkupInlineKeyboard or null */
        reply_markup: ReplyMarkup;
        /** The content of the message to be sent. Must be one of the following types: inputMessageText, inputMessageVoiceNote, inputMessageInvoice, inputMessageLocation, inputMessageVenue or inputMessageContact */
        input_message_content: InputMessageContent;
    }
    
    
    /** Represents a link to an article or web page */
    export interface inlineQueryResultArticle {
        '@type': 'inlineQueryResultArticle';
        /** Unique identifier of the query result */
        id: string;
        /** URL of the result, if it exists */
        url: string;
        /** True, if the URL must be not shown */
        hide_url: Bool;
        /** Title of the result */
        title: string;
        /** Represents a link to an article or web page */
        description: string;
        /** Result thumbnail in JPEG format; may be null */
        thumbnail?: thumbnail;
    }
    
    
    /** Represents a user contact */
    export interface inlineQueryResultContact {
        '@type': 'inlineQueryResultContact';
        /** Unique identifier of the query result */
        id: string;
        /** A user contact */
        contact: contact;
        /** Result thumbnail in JPEG format; may be null */
        thumbnail?: thumbnail;
    }
    
    
    /** Represents a point on the map */
    export interface inlineQueryResultLocation {
        '@type': 'inlineQueryResultLocation';
        /** Unique identifier of the query result */
        id: string;
        /** Location result */
        location: location;
        /** Title of the result */
        title: string;
        /** Result thumbnail in JPEG format; may be null */
        thumbnail?: thumbnail;
    }
    
    
    /** Represents information about a venue */
    export interface inlineQueryResultVenue {
        '@type': 'inlineQueryResultVenue';
        /** Unique identifier of the query result */
        id: string;
        /** Venue result */
        venue: venue;
        /** Result thumbnail in JPEG format; may be null */
        thumbnail?: thumbnail;
    }
    
    
    /** Represents information about a game */
    export interface inlineQueryResultGame {
        '@type': 'inlineQueryResultGame';
        /** Unique identifier of the query result */
        id: string;
        /** Game result */
        game: game;
    }
    
    
    /** Represents an animation file */
    export interface inlineQueryResultAnimation {
        '@type': 'inlineQueryResultAnimation';
        /** Unique identifier of the query result */
        id: string;
        /** Animation file */
        animation: animation;
        /** Animation title */
        title: string;
    }
    
    
    /** Represents an audio file */
    export interface inlineQueryResultAudio {
        '@type': 'inlineQueryResultAudio';
        /** Unique identifier of the query result */
        id: string;
        /** Audio file */
        audio: audio;
    }
    
    
    /** Represents a document */
    export interface inlineQueryResultDocument {
        '@type': 'inlineQueryResultDocument';
        /** Unique identifier of the query result */
        id: string;
        /** Document */
        document: document;
        /** Document title */
        title: string;
        /** Represents a document */
        description: string;
    }
    
    
    /** Represents a photo */
    export interface inlineQueryResultPhoto {
        '@type': 'inlineQueryResultPhoto';
        /** Unique identifier of the query result */
        id: string;
        /** Photo */
        photo: photo;
        /** Title of the result, if known */
        title: string;
        /** Represents a photo */
        description: string;
    }
    
    
    /** Represents a sticker */
    export interface inlineQueryResultSticker {
        '@type': 'inlineQueryResultSticker';
        /** Unique identifier of the query result */
        id: string;
        /** Sticker */
        sticker: sticker;
    }
    
    
    /** Represents a video */
    export interface inlineQueryResultVideo {
        '@type': 'inlineQueryResultVideo';
        /** Unique identifier of the query result */
        id: string;
        /** Video */
        video: video;
        /** Title of the video */
        title: string;
        /** Represents a video */
        description: string;
    }
    
    
    /** Represents a voice note */
    export interface inlineQueryResultVoiceNote {
        '@type': 'inlineQueryResultVoiceNote';
        /** Unique identifier of the query result */
        id: string;
        /** Voice note */
        voice_note: voiceNote;
        /** Title of the voice note */
        title: string;
    }
    
    
    /** Represents the results of the inline query. Use sendInlineQueryResultMessage to send the result of the query */
    export interface inlineQueryResults {
        '@type': 'inlineQueryResults';
        /** Unique identifier of the inline query */
        inline_query_id: int64;
        /** The offset for the next request. If empty, there are no more results */
        next_offset: string;
        /** Results of the query */
        results: vector<InlineQueryResult>;
        /** If non-empty, this text must be shown on the button, which opens a private chat with the bot and sends the bot a start message with the switch_pm_parameter */
        switch_pm_text: string;
        /** Parameter for the bot start message */
        switch_pm_parameter: string;
    }
    
    
    /** The payload for a general callback button */
    export interface callbackQueryPayloadData {
        '@type': 'callbackQueryPayloadData';
        /** Data that was attached to the callback button */
        data: bytes;
    }
    
    
    /** The payload for a callback button requiring password */
    export interface callbackQueryPayloadDataWithPassword {
        '@type': 'callbackQueryPayloadDataWithPassword';
        /** The password for the current user */
        password: string;
        /** Data that was attached to the callback button */
        data: bytes;
    }
    
    
    /** The payload for a game callback button */
    export interface callbackQueryPayloadGame {
        '@type': 'callbackQueryPayloadGame';
        /** A short name of the game that was attached to the callback button */
        game_short_name: string;
    }
    
    
    /** Contains a bot's answer to a callback query */
    export interface callbackQueryAnswer {
        '@type': 'callbackQueryAnswer';
        /** Text of the answer */
        text: string;
        /** True, if an alert must be shown to the user instead of a toast notification */
        show_alert: Bool;
        /** URL to be opened */
        url: string;
    }
    
    
    /** Contains the result of a custom request */
    export interface customRequestResult {
        '@type': 'customRequestResult';
        /** A JSON-serialized result */
        result: string;
    }
    
    
    /** Contains one row of the game high score table */
    export interface gameHighScore {
        '@type': 'gameHighScore';
        /** Position in the high score table */
        position: int32;
        /** User identifier */
        user_id: int53;
        /** User score */
        score: int32;
    }
    
    
    /** Contains a list of game high scores */
    export interface gameHighScores {
        '@type': 'gameHighScores';
        /** A list of game high scores */
        scores: vector<gameHighScore>;
    }
    
    
    /** A message was edited */
    export interface chatEventMessageEdited {
        '@type': 'chatEventMessageEdited';
        /** The original message before the edit */
        old_message: message;
        /** The message after it was edited */
        new_message: message;
    }
    
    
    /** A message was deleted */
    export interface chatEventMessageDeleted {
        '@type': 'chatEventMessageDeleted';
        /** Deleted message */
        message: message;
    }
    
    
    /** A message was pinned */
    export interface chatEventMessagePinned {
        '@type': 'chatEventMessagePinned';
        /** Pinned message */
        message: message;
    }
    
    
    /** A message was unpinned */
    export interface chatEventMessageUnpinned {
        '@type': 'chatEventMessageUnpinned';
        /** Unpinned message */
        message: message;
    }
    
    
    /** A poll in a message was stopped */
    export interface chatEventPollStopped {
        '@type': 'chatEventPollStopped';
        /** The message with the poll */
        message: message;
    }
    
    
    /** A new member joined the chat */
    export interface chatEventMemberJoined {
        '@type': 'chatEventMemberJoined';
    }
    
    
    /** A new member joined the chat via an invite link */
    export interface chatEventMemberJoinedByInviteLink {
        '@type': 'chatEventMemberJoinedByInviteLink';
        /** Invite link used to join the chat */
        invite_link: chatInviteLink;
    }
    
    
    /** A new member was accepted to the chat by an administrator */
    export interface chatEventMemberJoinedByRequest {
        '@type': 'chatEventMemberJoinedByRequest';
        /** User identifier of the chat administrator, approved user join request */
        approver_user_id: int53;
        /** Invite link used to join the chat; may be null */
        invite_link?: chatInviteLink;
    }
    
    
    /** A new chat member was invited */
    export interface chatEventMemberInvited {
        '@type': 'chatEventMemberInvited';
        /** New member user identifier */
        user_id: int53;
        /** New member status */
        status: ChatMemberStatus;
    }
    
    
    /** A member left the chat */
    export interface chatEventMemberLeft {
        '@type': 'chatEventMemberLeft';
    }
    
    
    /** A chat member has gained/lost administrator status, or the list of their administrator privileges has changed */
    export interface chatEventMemberPromoted {
        '@type': 'chatEventMemberPromoted';
        /** Affected chat member user identifier */
        user_id: int53;
        /** Previous status of the chat member */
        old_status: ChatMemberStatus;
        /** New status of the chat member */
        new_status: ChatMemberStatus;
    }
    
    
    /** A chat member was restricted/unrestricted or banned/unbanned, or the list of their restrictions has changed */
    export interface chatEventMemberRestricted {
        '@type': 'chatEventMemberRestricted';
        /** Affected chat member identifier */
        member_id: MessageSender;
        /** Previous status of the chat member */
        old_status: ChatMemberStatus;
        /** New status of the chat member */
        new_status: ChatMemberStatus;
    }
    
    
    /** The chat available reactions were changed */
    export interface chatEventAvailableReactionsChanged {
        '@type': 'chatEventAvailableReactionsChanged';
        /** Previous chat available reactions */
        old_available_reactions: vector<string>;
        /** New chat available reactions */
        new_available_reactions: vector<string>;
    }
    
    
    /** The chat description was changed */
    export interface chatEventDescriptionChanged {
        '@type': 'chatEventDescriptionChanged';
        /** Previous chat description */
        old_description: string;
        /** New chat description */
        new_description: string;
    }
    
    
    /** The linked chat of a supergroup was changed */
    export interface chatEventLinkedChatChanged {
        '@type': 'chatEventLinkedChatChanged';
        /** Previous supergroup linked chat identifier */
        old_linked_chat_id: int53;
        /** New supergroup linked chat identifier */
        new_linked_chat_id: int53;
    }
    
    
    /** The supergroup location was changed */
    export interface chatEventLocationChanged {
        '@type': 'chatEventLocationChanged';
        /** Previous location; may be null */
        old_location?: chatLocation;
        /** New location; may be null */
        new_location?: chatLocation;
    }
    
    
    /** The message TTL was changed */
    export interface chatEventMessageTtlChanged {
        '@type': 'chatEventMessageTtlChanged';
        /** Previous value of message_ttl */
        old_message_ttl: int32;
        /** New value of message_ttl */
        new_message_ttl: int32;
    }
    
    
    /** The chat permissions was changed */
    export interface chatEventPermissionsChanged {
        '@type': 'chatEventPermissionsChanged';
        /** Previous chat permissions */
        old_permissions: chatPermissions;
        /** New chat permissions */
        new_permissions: chatPermissions;
    }
    
    
    /** The chat photo was changed */
    export interface chatEventPhotoChanged {
        '@type': 'chatEventPhotoChanged';
        /** Previous chat photo value; may be null */
        old_photo?: chatPhoto;
        /** New chat photo value; may be null */
        new_photo?: chatPhoto;
    }
    
    
    /** The slow_mode_delay setting of a supergroup was changed */
    export interface chatEventSlowModeDelayChanged {
        '@type': 'chatEventSlowModeDelayChanged';
        /** Previous value of slow_mode_delay, in seconds */
        old_slow_mode_delay: int32;
        /** New value of slow_mode_delay, in seconds */
        new_slow_mode_delay: int32;
    }
    
    
    /** The supergroup sticker set was changed */
    export interface chatEventStickerSetChanged {
        '@type': 'chatEventStickerSetChanged';
        /** Previous identifier of the chat sticker set; 0 if none */
        old_sticker_set_id: int64;
        /** New identifier of the chat sticker set; 0 if none */
        new_sticker_set_id: int64;
    }
    
    
    /** The chat title was changed */
    export interface chatEventTitleChanged {
        '@type': 'chatEventTitleChanged';
        /** Previous chat title */
        old_title: string;
        /** New chat title */
        new_title: string;
    }
    
    
    /** The chat username was changed */
    export interface chatEventUsernameChanged {
        '@type': 'chatEventUsernameChanged';
        /** Previous chat username */
        old_username: string;
        /** New chat username */
        new_username: string;
    }
    
    
    /** The has_protected_content setting of a channel was toggled */
    export interface chatEventHasProtectedContentToggled {
        '@type': 'chatEventHasProtectedContentToggled';
        /** New value of has_protected_content */
        has_protected_content: Bool;
    }
    
    
    /** The can_invite_users permission of a supergroup chat was toggled */
    export interface chatEventInvitesToggled {
        '@type': 'chatEventInvitesToggled';
        /** New value of can_invite_users permission */
        can_invite_users: Bool;
    }
    
    
    /** The is_all_history_available setting of a supergroup was toggled */
    export interface chatEventIsAllHistoryAvailableToggled {
        '@type': 'chatEventIsAllHistoryAvailableToggled';
        /** New value of is_all_history_available */
        is_all_history_available: Bool;
    }
    
    
    /** The sign_messages setting of a channel was toggled */
    export interface chatEventSignMessagesToggled {
        '@type': 'chatEventSignMessagesToggled';
        /** New value of sign_messages */
        sign_messages: Bool;
    }
    
    
    /** A chat invite link was edited */
    export interface chatEventInviteLinkEdited {
        '@type': 'chatEventInviteLinkEdited';
        /** Previous information about the invite link */
        old_invite_link: chatInviteLink;
        /** New information about the invite link */
        new_invite_link: chatInviteLink;
    }
    
    
    /** A chat invite link was revoked */
    export interface chatEventInviteLinkRevoked {
        '@type': 'chatEventInviteLinkRevoked';
        /** The invite link */
        invite_link: chatInviteLink;
    }
    
    
    /** A revoked chat invite link was deleted */
    export interface chatEventInviteLinkDeleted {
        '@type': 'chatEventInviteLinkDeleted';
        /** The invite link */
        invite_link: chatInviteLink;
    }
    
    
    /** A video chat was created */
    export interface chatEventVideoChatCreated {
        '@type': 'chatEventVideoChatCreated';
        /** Identifier of the video chat. The video chat can be received through the method getGroupCall */
        group_call_id: int32;
    }
    
    
    /** A video chat was ended */
    export interface chatEventVideoChatEnded {
        '@type': 'chatEventVideoChatEnded';
        /** Identifier of the video chat. The video chat can be received through the method getGroupCall */
        group_call_id: int32;
    }
    
    
    /** The mute_new_participants setting of a video chat was toggled */
    export interface chatEventVideoChatMuteNewParticipantsToggled {
        '@type': 'chatEventVideoChatMuteNewParticipantsToggled';
        /** New value of the mute_new_participants setting */
        mute_new_participants: Bool;
    }
    
    
    /** A video chat participant was muted or unmuted */
    export interface chatEventVideoChatParticipantIsMutedToggled {
        '@type': 'chatEventVideoChatParticipantIsMutedToggled';
        /** Identifier of the affected group call participant */
        participant_id: MessageSender;
        /** New value of is_muted */
        is_muted: Bool;
    }
    
    
    /** A video chat participant volume level was changed */
    export interface chatEventVideoChatParticipantVolumeLevelChanged {
        '@type': 'chatEventVideoChatParticipantVolumeLevelChanged';
        /** Identifier of the affected group call participant */
        participant_id: MessageSender;
        /** New value of volume_level; 1-20000 in hundreds of percents */
        volume_level: int32;
    }
    
    
    /** Represents a chat event */
    export interface chatEvent {
        '@type': 'chatEvent';
        /** Chat event identifier */
        id: int64;
        /** Point in time (Unix timestamp) when the event happened */
        date: int32;
        /** Identifier of the user or chat who performed the action */
        member_id: MessageSender;
        /** The action */
        action: ChatEventAction;
    }
    
    
    /** Contains a list of chat events */
    export interface chatEvents {
        '@type': 'chatEvents';
        /** List of events */
        events: vector<chatEvent>;
    }
    
    
    /** Represents a set of filters used to obtain a chat event log */
    export interface chatEventLogFilters {
        '@type': 'chatEventLogFilters';
        /** True, if message edits need to be returned */
        message_edits: Bool;
        /** True, if message deletions need to be returned */
        message_deletions: Bool;
        /** True, if pin/unpin events need to be returned */
        message_pins: Bool;
        /** True, if members joining events need to be returned */
        member_joins: Bool;
        /** True, if members leaving events need to be returned */
        member_leaves: Bool;
        /** True, if invited member events need to be returned */
        member_invites: Bool;
        /** True, if member promotion/demotion events need to be returned */
        member_promotions: Bool;
        /** True, if member restricted/unrestricted/banned/unbanned events need to be returned */
        member_restrictions: Bool;
        /** True, if changes in chat information need to be returned */
        info_changes: Bool;
        /** True, if changes in chat settings need to be returned */
        setting_changes: Bool;
        /** True, if changes to invite links need to be returned */
        invite_link_changes: Bool;
        /** True, if video chat actions need to be returned */
        video_chat_changes: Bool;
    }
    
    
    /** An ordinary language pack string */
    export interface languagePackStringValueOrdinary {
        '@type': 'languagePackStringValueOrdinary';
        /** String value */
        value: string;
    }
    
    
    /** A language pack string which has different forms based on the number of some object it mentions. See https://www.unicode.org/cldr/charts/latest/supplemental/language_plural_rules.html for more information */
    export interface languagePackStringValuePluralized {
        '@type': 'languagePackStringValuePluralized';
        /** Value for zero objects */
        zero_value: string;
        /** Value for one object */
        one_value: string;
        /** Value for two objects */
        two_value: string;
        /** Value for few objects */
        few_value: string;
        /** Value for many objects */
        many_value: string;
        /** Default value */
        other_value: string;
    }
    
    
    /** A deleted language pack string, the value must be taken from the built-in English language pack */
    export interface languagePackStringValueDeleted {
        '@type': 'languagePackStringValueDeleted';
    }
    
    
    /** Represents one language pack string */
    export interface languagePackString {
        '@type': 'languagePackString';
        /** String key */
        key: string;
        /** String value; pass null if the string needs to be taken from the built-in English language pack */
        value: LanguagePackStringValue;
    }
    
    
    /** Contains a list of language pack strings */
    export interface languagePackStrings {
        '@type': 'languagePackStrings';
        /** A list of language pack strings */
        strings: vector<languagePackString>;
    }
    
    
    /** Contains information about a language pack */
    export interface languagePackInfo {
        '@type': 'languagePackInfo';
        /** Unique language pack identifier */
        id: string;
        /** Identifier of a base language pack; may be empty. If a string is missed in the language pack, then it must be fetched from base language pack. Unsupported in custom language packs */
        base_language_pack_id: string;
        /** Language name */
        name: string;
        /** Name of the language in that language */
        native_name: string;
        /** A language code to be used to apply plural forms. See https://www.unicode.org/cldr/charts/latest/supplemental/language_plural_rules.html for more information */
        plural_code: string;
        /** True, if the language pack is official */
        is_official: Bool;
        /** True, if the language pack strings are RTL */
        is_rtl: Bool;
        /** True, if the language pack is a beta language pack */
        is_beta: Bool;
        /** True, if the language pack is installed by the current user */
        is_installed: Bool;
        /** Total number of non-deleted strings from the language pack */
        total_string_count: int32;
        /** Total number of translated strings from the language pack */
        translated_string_count: int32;
        /** Total number of non-deleted strings from the language pack available locally */
        local_string_count: int32;
        /** Link to language translation interface; empty for custom local language packs */
        translation_url: string;
    }
    
    
    /** Contains information about the current localization target */
    export interface localizationTargetInfo {
        '@type': 'localizationTargetInfo';
        /** List of available language packs for this application */
        language_packs: vector<languagePackInfo>;
    }
    
    
    /** The maximum number of joined supergroups and channels */
    export interface premiumLimitTypeSupergroupCount {
        '@type': 'premiumLimitTypeSupergroupCount';
    }
    
    
    /** The maximum number of pinned chats in the main chat list */
    export interface premiumLimitTypePinnedChatCount {
        '@type': 'premiumLimitTypePinnedChatCount';
    }
    
    
    /** The maximum number of created public chats */
    export interface premiumLimitTypeCreatedPublicChatCount {
        '@type': 'premiumLimitTypeCreatedPublicChatCount';
    }
    
    
    /** The maximum number of saved animations */
    export interface premiumLimitTypeSavedAnimationCount {
        '@type': 'premiumLimitTypeSavedAnimationCount';
    }
    
    
    /** The maximum number of favorite stickers */
    export interface premiumLimitTypeFavoriteStickerCount {
        '@type': 'premiumLimitTypeFavoriteStickerCount';
    }
    
    
    /** The maximum number of chat filters */
    export interface premiumLimitTypeChatFilterCount {
        '@type': 'premiumLimitTypeChatFilterCount';
    }
    
    
    /** The maximum number of pinned and always included, or always excluded chats in a chat filter */
    export interface premiumLimitTypeChatFilterChosenChatCount {
        '@type': 'premiumLimitTypeChatFilterChosenChatCount';
    }
    
    
    /** The maximum number of pinned chats in the archive chat list */
    export interface premiumLimitTypePinnedArchivedChatCount {
        '@type': 'premiumLimitTypePinnedArchivedChatCount';
    }
    
    
    /** The maximum length of sent media caption */
    export interface premiumLimitTypeCaptionLength {
        '@type': 'premiumLimitTypeCaptionLength';
    }
    
    
    /** The maximum length of the user's bio */
    export interface premiumLimitTypeBioLength {
        '@type': 'premiumLimitTypeBioLength';
    }
    
    
    /** Increased limits */
    export interface premiumFeatureIncreasedLimits {
        '@type': 'premiumFeatureIncreasedLimits';
    }
    
    
    /** Increased maximum upload file size */
    export interface premiumFeatureIncreasedUploadFileSize {
        '@type': 'premiumFeatureIncreasedUploadFileSize';
    }
    
    
    /** Improved download speed */
    export interface premiumFeatureImprovedDownloadSpeed {
        '@type': 'premiumFeatureImprovedDownloadSpeed';
    }
    
    
    /** The ability to convert voice notes to text */
    export interface premiumFeatureVoiceRecognition {
        '@type': 'premiumFeatureVoiceRecognition';
    }
    
    
    /** Disabled ads */
    export interface premiumFeatureDisabledAds {
        '@type': 'premiumFeatureDisabledAds';
    }
    
    
    /** Allowed to use more reactions */
    export interface premiumFeatureUniqueReactions {
        '@type': 'premiumFeatureUniqueReactions';
    }
    
    
    /** Allowed to use premium stickers with unique effects */
    export interface premiumFeatureUniqueStickers {
        '@type': 'premiumFeatureUniqueStickers';
    }
    
    
    /** Ability to change position of the main chat list, archive and mute all new chats from non-contacts, and completely disable notifications about the user's contacts joined Telegram */
    export interface premiumFeatureAdvancedChatManagement {
        '@type': 'premiumFeatureAdvancedChatManagement';
    }
    
    
    /** A badge in the user's profile */
    export interface premiumFeatureProfileBadge {
        '@type': 'premiumFeatureProfileBadge';
    }
    
    
    /** Profile photo animation on message and chat screens */
    export interface premiumFeatureAnimatedProfilePhoto {
        '@type': 'premiumFeatureAnimatedProfilePhoto';
    }
    
    
    /** Allowed to set a premium appllication icons */
    export interface premiumFeatureAppIcons {
        '@type': 'premiumFeatureAppIcons';
    }
    
    
    /** Contains information about a limit, increased for Premium users */
    export interface premiumLimit {
        '@type': 'premiumLimit';
        /** The type of the limit */
        type: PremiumLimitType;
        /** Default value of the limit */
        default_value: int32;
        /** Value of the limit for Premium users */
        premium_value: int32;
    }
    
    
    /** Contains information about features, available to Premium users */
    export interface premiumFeatures {
        '@type': 'premiumFeatures';
        /** The list of available features */
        features: vector<PremiumFeature>;
        /** The list of limits, increased for Premium users */
        limits: vector<premiumLimit>;
        /** An internal link to be opened to pay for Telegram Premium if store payment isn't possible; may be null if direct payment isn't available */
        payment_link?: InternalLinkType;
    }
    
    
    /** A limit was exceeded */
    export interface premiumSourceLimitExceeded {
        '@type': 'premiumSourceLimitExceeded';
        /** Type of the exceeded limit */
        limit_type: PremiumLimitType;
    }
    
    
    /** A user tried to use a Premium feature */
    export interface premiumSourceFeature {
        '@type': 'premiumSourceFeature';
        /** The used feature */
        feature: PremiumFeature;
    }
    
    
    /** A user opened an internal link of the type internalLinkTypePremiumFeatures */
    export interface premiumSourceLink {
        '@type': 'premiumSourceLink';
        /** The referrer from the link */
        referrer: string;
    }
    
    
    /** A user opened the Premium features screen from settings */
    export interface premiumSourceSettings {
        '@type': 'premiumSourceSettings';
    }
    
    
    /** Describes a promotion animation for a Premium feature */
    export interface premiumFeaturePromotionAnimation {
        '@type': 'premiumFeaturePromotionAnimation';
        /** Premium feature */
        feature: PremiumFeature;
        /** Promotion animation for the feature */
        animation: animation;
    }
    
    
    /** Contains state of Telegram Premium subscription and promotion videos for Premium features */
    export interface premiumState {
        '@type': 'premiumState';
        /** Text description of the state of the current Premium subscription; may be empty if the current user has no Telegram Premium subscription */
        state: formattedText;
        /** ISO 4217 currency code for Telegram Premium subscription payment */
        currency: string;
        /** Monthly subscription payment for Telegram Premium subscription, in the smallest units of the currency */
        monthly_amount: int53;
        /** The list of available promotion animations for Premium features */
        animations: vector<premiumFeaturePromotionAnimation>;
    }
    
    
    /** A token for Firebase Cloud Messaging */
    export interface deviceTokenFirebaseCloudMessaging {
        '@type': 'deviceTokenFirebaseCloudMessaging';
        /** Device registration token; may be empty to deregister a device */
        token: string;
        /** True, if push notifications must be additionally encrypted */
        encrypt: Bool;
    }
    
    
    /** A token for Apple Push Notification service */
    export interface deviceTokenApplePush {
        '@type': 'deviceTokenApplePush';
        /** Device token; may be empty to deregister a device */
        device_token: string;
        /** True, if App Sandbox is enabled */
        is_app_sandbox: Bool;
    }
    
    
    /** A token for Apple Push Notification service VoIP notifications */
    export interface deviceTokenApplePushVoIP {
        '@type': 'deviceTokenApplePushVoIP';
        /** Device token; may be empty to deregister a device */
        device_token: string;
        /** True, if App Sandbox is enabled */
        is_app_sandbox: Bool;
        /** True, if push notifications must be additionally encrypted */
        encrypt: Bool;
    }
    
    
    /** A token for Windows Push Notification Services */
    export interface deviceTokenWindowsPush {
        '@type': 'deviceTokenWindowsPush';
        /** The access token that will be used to send notifications; may be empty to deregister a device */
        access_token: string;
    }
    
    
    /** A token for Microsoft Push Notification Service */
    export interface deviceTokenMicrosoftPush {
        '@type': 'deviceTokenMicrosoftPush';
        /** Push notification channel URI; may be empty to deregister a device */
        channel_uri: string;
    }
    
    
    /** A token for Microsoft Push Notification Service VoIP channel */
    export interface deviceTokenMicrosoftPushVoIP {
        '@type': 'deviceTokenMicrosoftPushVoIP';
        /** Push notification channel URI; may be empty to deregister a device */
        channel_uri: string;
    }
    
    
    /** A token for web Push API */
    export interface deviceTokenWebPush {
        '@type': 'deviceTokenWebPush';
        /** Absolute URL exposed by the push service where the application server can send push messages; may be empty to deregister a device */
        endpoint: string;
        /** Base64url-encoded P-256 elliptic curve Diffie-Hellman public key */
        p256dh_base64url: string;
        /** Base64url-encoded authentication secret */
        auth_base64url: string;
    }
    
    
    /** A token for Simple Push API for Firefox OS */
    export interface deviceTokenSimplePush {
        '@type': 'deviceTokenSimplePush';
        /** Absolute URL exposed by the push service where the application server can send push messages; may be empty to deregister a device */
        endpoint: string;
    }
    
    
    /** A token for Ubuntu Push Client service */
    export interface deviceTokenUbuntuPush {
        '@type': 'deviceTokenUbuntuPush';
        /** Token; may be empty to deregister a device */
        token: string;
    }
    
    
    /** A token for BlackBerry Push Service */
    export interface deviceTokenBlackBerryPush {
        '@type': 'deviceTokenBlackBerryPush';
        /** Token; may be empty to deregister a device */
        token: string;
    }
    
    
    /** A token for Tizen Push Service */
    export interface deviceTokenTizenPush {
        '@type': 'deviceTokenTizenPush';
        /** Push service registration identifier; may be empty to deregister a device */
        reg_id: string;
    }
    
    
    /** Contains a globally unique push receiver identifier, which can be used to identify which account has received a push notification */
    export interface pushReceiverId {
        '@type': 'pushReceiverId';
        /** The globally unique identifier of push notification subscription */
        id: int64;
    }
    
    
    /** Describes a solid fill of a background */
    export interface backgroundFillSolid {
        '@type': 'backgroundFillSolid';
        /** A color of the background in the RGB24 format */
        color: int32;
    }
    
    
    /** Describes a gradient fill of a background */
    export interface backgroundFillGradient {
        '@type': 'backgroundFillGradient';
        /** A top color of the background in the RGB24 format */
        top_color: int32;
        /** A bottom color of the background in the RGB24 format */
        bottom_color: int32;
        /** Clockwise rotation angle of the gradient, in degrees; 0-359. Must be always divisible by 45 */
        rotation_angle: int32;
    }
    
    
    /** Describes a freeform gradient fill of a background */
    export interface backgroundFillFreeformGradient {
        '@type': 'backgroundFillFreeformGradient';
        /** A list of 3 or 4 colors of the freeform gradients in the RGB24 format */
        colors: vector<int32>;
    }
    
    
    /** A wallpaper in JPEG format */
    export interface backgroundTypeWallpaper {
        '@type': 'backgroundTypeWallpaper';
        /** True, if the wallpaper must be downscaled to fit in 450x450 square and then box-blurred with radius 12 */
        is_blurred: Bool;
        /** True, if the background needs to be slightly moved when device is tilted */
        is_moving: Bool;
    }
    
    
    /** A PNG or TGV (gzipped subset of SVG with MIME type "application/x-tgwallpattern") pattern to be combined with the background fill chosen by the user */
    export interface backgroundTypePattern {
        '@type': 'backgroundTypePattern';
        /** Fill of the background */
        fill: BackgroundFill;
        /** Intensity of the pattern when it is shown above the filled background; 0-100. */
        intensity: int32;
        /** True, if the background fill must be applied only to the pattern itself. All other pixels are black in this case. For dark themes only */
        is_inverted: Bool;
        /** True, if the background needs to be slightly moved when device is tilted */
        is_moving: Bool;
    }
    
    
    /** A filled background */
    export interface backgroundTypeFill {
        '@type': 'backgroundTypeFill';
        /** The background fill */
        fill: BackgroundFill;
    }
    
    
    /** Describes a chat background */
    export interface background {
        '@type': 'background';
        /** Unique background identifier */
        id: int64;
        /** True, if this is one of default backgrounds */
        is_default: Bool;
        /** True, if the background is dark and is recommended to be used with dark theme */
        is_dark: Bool;
        /** Unique background name */
        name: string;
        /** Document with the background; may be null. Null only for filled backgrounds */
        document?: document;
        /** Type of the background */
        type: BackgroundType;
    }
    
    
    /** Contains a list of backgrounds */
    export interface backgrounds {
        '@type': 'backgrounds';
        /** A list of backgrounds */
        backgrounds: vector<background>;
    }
    
    
    /** A background from a local file */
    export interface inputBackgroundLocal {
        '@type': 'inputBackgroundLocal';
        /** Background file to use. Only inputFileLocal and inputFileGenerated are supported. The file must be in JPEG format for wallpapers and in PNG format for patterns */
        background: InputFile;
    }
    
    
    /** A background from the server */
    export interface inputBackgroundRemote {
        '@type': 'inputBackgroundRemote';
        /** The background identifier */
        background_id: int64;
    }
    
    
    /** Describes theme settings */
    export interface themeSettings {
        '@type': 'themeSettings';
        /** Theme accent color in ARGB format */
        accent_color: int32;
        /** The background to be used in chats; may be null */
        background?: background;
        /** The fill to be used as a background for outgoing messages */
        outgoing_message_fill: BackgroundFill;
        /** If true, the freeform gradient fill needs to be animated on every sent message */
        animate_outgoing_message_fill: Bool;
        /** Accent color of outgoing messages in ARGB format */
        outgoing_message_accent_color: int32;
    }
    
    
    /** Describes a chat theme */
    export interface chatTheme {
        '@type': 'chatTheme';
        /** Theme name */
        name: string;
        /** Theme settings for a light chat theme */
        light_settings: themeSettings;
        /** Theme settings for a dark chat theme */
        dark_settings: themeSettings;
    }
    
    
    /** Contains a list of hashtags */
    export interface hashtags {
        '@type': 'hashtags';
        /** A list of hashtags */
        hashtags: vector<string>;
    }
    
    
    /** The session can be used */
    export interface canTransferOwnershipResultOk {
        '@type': 'canTransferOwnershipResultOk';
    }
    
    
    /** The 2-step verification needs to be enabled first */
    export interface canTransferOwnershipResultPasswordNeeded {
        '@type': 'canTransferOwnershipResultPasswordNeeded';
    }
    
    
    /** The 2-step verification was enabled recently, user needs to wait */
    export interface canTransferOwnershipResultPasswordTooFresh {
        '@type': 'canTransferOwnershipResultPasswordTooFresh';
        /** Time left before the session can be used to transfer ownership of a chat, in seconds */
        retry_after: int32;
    }
    
    
    /** The session was created recently, user needs to wait */
    export interface canTransferOwnershipResultSessionTooFresh {
        '@type': 'canTransferOwnershipResultSessionTooFresh';
        /** Time left before the session can be used to transfer ownership of a chat, in seconds */
        retry_after: int32;
    }
    
    
    /** The username can be set */
    export interface checkChatUsernameResultOk {
        '@type': 'checkChatUsernameResultOk';
    }
    
    
    /** The username is invalid */
    export interface checkChatUsernameResultUsernameInvalid {
        '@type': 'checkChatUsernameResultUsernameInvalid';
    }
    
    
    /** The username is occupied */
    export interface checkChatUsernameResultUsernameOccupied {
        '@type': 'checkChatUsernameResultUsernameOccupied';
    }
    
    
    /** The user has too many chats with username, one of them must be made private first */
    export interface checkChatUsernameResultPublicChatsTooMuch {
        '@type': 'checkChatUsernameResultPublicChatsTooMuch';
    }
    
    
    /** The user can't be a member of a public supergroup */
    export interface checkChatUsernameResultPublicGroupsUnavailable {
        '@type': 'checkChatUsernameResultPublicGroupsUnavailable';
    }
    
    
    /** The name can be set */
    export interface checkStickerSetNameResultOk {
        '@type': 'checkStickerSetNameResultOk';
    }
    
    
    /** The name is invalid */
    export interface checkStickerSetNameResultNameInvalid {
        '@type': 'checkStickerSetNameResultNameInvalid';
    }
    
    
    /** The name is occupied */
    export interface checkStickerSetNameResultNameOccupied {
        '@type': 'checkStickerSetNameResultNameOccupied';
    }
    
    
    /** The password was reset */
    export interface resetPasswordResultOk {
        '@type': 'resetPasswordResultOk';
    }
    
    
    /** The password reset request is pending */
    export interface resetPasswordResultPending {
        '@type': 'resetPasswordResultPending';
        /** Point in time (Unix timestamp) after which the password can be reset immediately using resetPassword */
        pending_reset_date: int32;
    }
    
    
    /** The password reset request was declined */
    export interface resetPasswordResultDeclined {
        '@type': 'resetPasswordResultDeclined';
        /** Point in time (Unix timestamp) when the password reset can be retried */
        retry_date: int32;
    }
    
    
    /** The messages was exported from a private chat */
    export interface messageFileTypePrivate {
        '@type': 'messageFileTypePrivate';
        /** Name of the other party; may be empty if unrecognized */
        name: string;
    }
    
    
    /** The messages was exported from a group chat */
    export interface messageFileTypeGroup {
        '@type': 'messageFileTypeGroup';
        /** Title of the group chat; may be empty if unrecognized */
        title: string;
    }
    
    
    /** The messages was exported from a chat of unknown type */
    export interface messageFileTypeUnknown {
        '@type': 'messageFileTypeUnknown';
    }
    
    
    /** A general message with hidden content */
    export interface pushMessageContentHidden {
        '@type': 'pushMessageContentHidden';
        /** True, if the message is a pinned message with the specified content */
        is_pinned: Bool;
    }
    
    
    /** An animation message (GIF-style). */
    export interface pushMessageContentAnimation {
        '@type': 'pushMessageContentAnimation';
        /** Message content; may be null */
        animation?: animation;
        /** Animation caption */
        caption: string;
        /** True, if the message is a pinned message with the specified content */
        is_pinned: Bool;
    }
    
    
    /** An audio message */
    export interface pushMessageContentAudio {
        '@type': 'pushMessageContentAudio';
        /** Message content; may be null */
        audio?: audio;
        /** True, if the message is a pinned message with the specified content */
        is_pinned: Bool;
    }
    
    
    /** A message with a user contact */
    export interface pushMessageContentContact {
        '@type': 'pushMessageContentContact';
        /** Contact's name */
        name: string;
        /** True, if the message is a pinned message with the specified content */
        is_pinned: Bool;
    }
    
    
    /** A contact has registered with Telegram */
    export interface pushMessageContentContactRegistered {
        '@type': 'pushMessageContentContactRegistered';
    }
    
    
    /** A document message (a general file) */
    export interface pushMessageContentDocument {
        '@type': 'pushMessageContentDocument';
        /** Message content; may be null */
        document?: document;
        /** True, if the message is a pinned message with the specified content */
        is_pinned: Bool;
    }
    
    
    /** A message with a game */
    export interface pushMessageContentGame {
        '@type': 'pushMessageContentGame';
        /** Game title, empty for pinned game message */
        title: string;
        /** True, if the message is a pinned message with the specified content */
        is_pinned: Bool;
    }
    
    
    /** A new high score was achieved in a game */
    export interface pushMessageContentGameScore {
        '@type': 'pushMessageContentGameScore';
        /** Game title, empty for pinned message */
        title: string;
        /** New score, 0 for pinned message */
        score: int32;
        /** True, if the message is a pinned message with the specified content */
        is_pinned: Bool;
    }
    
    
    /** A message with an invoice from a bot */
    export interface pushMessageContentInvoice {
        '@type': 'pushMessageContentInvoice';
        /** Product price */
        price: string;
        /** True, if the message is a pinned message with the specified content */
        is_pinned: Bool;
    }
    
    
    /** A message with a location */
    export interface pushMessageContentLocation {
        '@type': 'pushMessageContentLocation';
        /** True, if the location is live */
        is_live: Bool;
        /** True, if the message is a pinned message with the specified content */
        is_pinned: Bool;
    }
    
    
    /** A photo message */
    export interface pushMessageContentPhoto {
        '@type': 'pushMessageContentPhoto';
        /** Message content; may be null */
        photo?: photo;
        /** Photo caption */
        caption: string;
        /** True, if the photo is secret */
        is_secret: Bool;
        /** True, if the message is a pinned message with the specified content */
        is_pinned: Bool;
    }
    
    
    /** A message with a poll */
    export interface pushMessageContentPoll {
        '@type': 'pushMessageContentPoll';
        /** Poll question */
        question: string;
        /** True, if the poll is regular and not in quiz mode */
        is_regular: Bool;
        /** True, if the message is a pinned message with the specified content */
        is_pinned: Bool;
    }
    
    
    /** A screenshot of a message in the chat has been taken */
    export interface pushMessageContentScreenshotTaken {
        '@type': 'pushMessageContentScreenshotTaken';
    }
    
    
    /** A message with a sticker */
    export interface pushMessageContentSticker {
        '@type': 'pushMessageContentSticker';
        /** Message content; may be null */
        sticker?: sticker;
        /** Emoji corresponding to the sticker; may be empty */
        emoji: string;
        /** True, if the message is a pinned message with the specified content */
        is_pinned: Bool;
    }
    
    
    /** A text message */
    export interface pushMessageContentText {
        '@type': 'pushMessageContentText';
        /** Message text */
        text: string;
        /** True, if the message is a pinned message with the specified content */
        is_pinned: Bool;
    }
    
    
    /** A video message */
    export interface pushMessageContentVideo {
        '@type': 'pushMessageContentVideo';
        /** Message content; may be null */
        video?: video;
        /** Video caption */
        caption: string;
        /** True, if the video is secret */
        is_secret: Bool;
        /** True, if the message is a pinned message with the specified content */
        is_pinned: Bool;
    }
    
    
    /** A video note message */
    export interface pushMessageContentVideoNote {
        '@type': 'pushMessageContentVideoNote';
        /** Message content; may be null */
        video_note?: videoNote;
        /** True, if the message is a pinned message with the specified content */
        is_pinned: Bool;
    }
    
    
    /** A voice note message */
    export interface pushMessageContentVoiceNote {
        '@type': 'pushMessageContentVoiceNote';
        /** Message content; may be null */
        voice_note?: voiceNote;
        /** True, if the message is a pinned message with the specified content */
        is_pinned: Bool;
    }
    
    
    /** A newly created basic group */
    export interface pushMessageContentBasicGroupChatCreate {
        '@type': 'pushMessageContentBasicGroupChatCreate';
    }
    
    
    /** New chat members were invited to a group */
    export interface pushMessageContentChatAddMembers {
        '@type': 'pushMessageContentChatAddMembers';
        /** Name of the added member */
        member_name: string;
        /** True, if the current user was added to the group */
        is_current_user: Bool;
        /** True, if the user has returned to the group themselves */
        is_returned: Bool;
    }
    
    
    /** A chat photo was edited */
    export interface pushMessageContentChatChangePhoto {
        '@type': 'pushMessageContentChatChangePhoto';
    }
    
    
    /** A chat title was edited */
    export interface pushMessageContentChatChangeTitle {
        '@type': 'pushMessageContentChatChangeTitle';
        /** New chat title */
        title: string;
    }
    
    
    /** A chat theme was edited */
    export interface pushMessageContentChatSetTheme {
        '@type': 'pushMessageContentChatSetTheme';
        /** If non-empty, name of a new theme, set for the chat. Otherwise chat theme was reset to the default one */
        theme_name: string;
    }
    
    
    /** A chat member was deleted */
    export interface pushMessageContentChatDeleteMember {
        '@type': 'pushMessageContentChatDeleteMember';
        /** Name of the deleted member */
        member_name: string;
        /** True, if the current user was deleted from the group */
        is_current_user: Bool;
        /** True, if the user has left the group themselves */
        is_left: Bool;
    }
    
    
    /** A new member joined the chat via an invite link */
    export interface pushMessageContentChatJoinByLink {
        '@type': 'pushMessageContentChatJoinByLink';
    }
    
    
    /** A new member was accepted to the chat by an administrator */
    export interface pushMessageContentChatJoinByRequest {
        '@type': 'pushMessageContentChatJoinByRequest';
    }
    
    
    /** A new recurrent payment was made by the current user */
    export interface pushMessageContentRecurringPayment {
        '@type': 'pushMessageContentRecurringPayment';
        /** The paid amount */
        amount: string;
    }
    
    
    /** A forwarded messages */
    export interface pushMessageContentMessageForwards {
        '@type': 'pushMessageContentMessageForwards';
        /** Number of forwarded messages */
        total_count: int32;
    }
    
    
    /** A media album */
    export interface pushMessageContentMediaAlbum {
        '@type': 'pushMessageContentMediaAlbum';
        /** Number of messages in the album */
        total_count: int32;
        /** True, if the album has at least one photo */
        has_photos: Bool;
        /** True, if the album has at least one video */
        has_videos: Bool;
        /** True, if the album has at least one audio file */
        has_audios: Bool;
        /** True, if the album has at least one document */
        has_documents: Bool;
    }
    
    
    /** New message was received */
    export interface notificationTypeNewMessage {
        '@type': 'notificationTypeNewMessage';
        /** The message */
        message: message;
        /** True, if message content must be displayed in notifications */
        show_preview: Bool;
    }
    
    
    /** New secret chat was created */
    export interface notificationTypeNewSecretChat {
        '@type': 'notificationTypeNewSecretChat';
    }
    
    
    /** New call was received */
    export interface notificationTypeNewCall {
        '@type': 'notificationTypeNewCall';
        /** Call identifier */
        call_id: int32;
    }
    
    
    /** New message was received through a push notification */
    export interface notificationTypeNewPushMessage {
        '@type': 'notificationTypeNewPushMessage';
        /** The message identifier. The message will not be available in the chat history, but the ID can be used in viewMessages, or as reply_to_message_id */
        message_id: int53;
        /** Identifier of the sender of the message. Corresponding user or chat may be inaccessible */
        sender_id: MessageSender;
        /** Name of the sender */
        sender_name: string;
        /** True, if the message is outgoing */
        is_outgoing: Bool;
        /** Push message content */
        content: PushMessageContent;
    }
    
    
    /** A group containing notifications of type notificationTypeNewMessage and notificationTypeNewPushMessage with ordinary unread messages */
    export interface notificationGroupTypeMessages {
        '@type': 'notificationGroupTypeMessages';
    }
    
    
    /** A group containing notifications of type notificationTypeNewMessage and notificationTypeNewPushMessage with unread mentions of the current user, replies to their messages, or a pinned message */
    export interface notificationGroupTypeMentions {
        '@type': 'notificationGroupTypeMentions';
    }
    
    
    /** A group containing a notification of type notificationTypeNewSecretChat */
    export interface notificationGroupTypeSecretChat {
        '@type': 'notificationGroupTypeSecretChat';
    }
    
    
    /** A group containing notifications of type notificationTypeNewCall */
    export interface notificationGroupTypeCalls {
        '@type': 'notificationGroupTypeCalls';
    }
    
    
    /** Describes a notification sound in MP3 format */
    export interface notificationSound {
        '@type': 'notificationSound';
        /** Unique identifier of the notification sound */
        id: int64;
        /** Duration of the sound, in seconds */
        duration: int32;
        /** Point in time (Unix timestamp) when the sound was created */
        date: int32;
        /** Title of the notification sound */
        title: string;
        /** Arbitrary data, defined while the sound was uploaded */
        data: string;
        /** File containing the sound */
        sound: file;
    }
    
    
    /** Contains a list of notification sounds */
    export interface notificationSounds {
        '@type': 'notificationSounds';
        /** A list of notification sounds */
        notification_sounds: vector<notificationSound>;
    }
    
    
    /** Contains information about a notification */
    export interface notification {
        '@type': 'notification';
        /** Unique persistent identifier of this notification */
        id: int32;
        /** Notification date */
        date: int32;
        /** True, if the notification was explicitly sent without sound */
        is_silent: Bool;
        /** Notification type */
        type: NotificationType;
    }
    
    
    /** Describes a group of notifications */
    export interface notificationGroup {
        '@type': 'notificationGroup';
        /** Unique persistent auto-incremented from 1 identifier of the notification group */
        id: int32;
        /** Type of the group */
        type: NotificationGroupType;
        /** Identifier of a chat to which all notifications in the group belong */
        chat_id: int53;
        /** Total number of active notifications in the group */
        total_count: int32;
        /** The list of active notifications */
        notifications: vector<notification>;
    }
    
    
    /** Represents a boolean option */
    export interface optionValueBoolean {
        '@type': 'optionValueBoolean';
        /** The value of the option */
        value: Bool;
    }
    
    
    /** Represents an unknown option or an option which has a default value */
    export interface optionValueEmpty {
        '@type': 'optionValueEmpty';
    }
    
    
    /** Represents an integer option */
    export interface optionValueInteger {
        '@type': 'optionValueInteger';
        /** The value of the option */
        value: int64;
    }
    
    
    /** Represents a string option */
    export interface optionValueString {
        '@type': 'optionValueString';
        /** The value of the option */
        value: string;
    }
    
    
    /** Represents one member of a JSON object */
    export interface jsonObjectMember {
        '@type': 'jsonObjectMember';
        /** Member's key */
        key: string;
        /** Member's value */
        value: JsonValue;
    }
    
    
    /** Represents a null JSON value */
    export interface jsonValueNull {
        '@type': 'jsonValueNull';
    }
    
    
    /** Represents a boolean JSON value */
    export interface jsonValueBoolean {
        '@type': 'jsonValueBoolean';
        /** The value */
        value: Bool;
    }
    
    
    /** Represents a numeric JSON value */
    export interface jsonValueNumber {
        '@type': 'jsonValueNumber';
        /** The value */
        value: double;
    }
    
    
    /** Represents a string JSON value */
    export interface jsonValueString {
        '@type': 'jsonValueString';
        /** The value */
        value: string;
    }
    
    
    /** Represents a JSON array */
    export interface jsonValueArray {
        '@type': 'jsonValueArray';
        /** The list of array elements */
        values: vector<JsonValue>;
    }
    
    
    /** Represents a JSON object */
    export interface jsonValueObject {
        '@type': 'jsonValueObject';
        /** The list of object members */
        members: vector<jsonObjectMember>;
    }
    
    
    /** A rule to allow all users to do something */
    export interface userPrivacySettingRuleAllowAll {
        '@type': 'userPrivacySettingRuleAllowAll';
    }
    
    
    /** A rule to allow all of a user's contacts to do something */
    export interface userPrivacySettingRuleAllowContacts {
        '@type': 'userPrivacySettingRuleAllowContacts';
    }
    
    
    /** A rule to allow certain specified users to do something */
    export interface userPrivacySettingRuleAllowUsers {
        '@type': 'userPrivacySettingRuleAllowUsers';
        /** The user identifiers, total number of users in all rules must not exceed 1000 */
        user_ids: vector<int53>;
    }
    
    
    /** A rule to allow all members of certain specified basic groups and supergroups to doing something */
    export interface userPrivacySettingRuleAllowChatMembers {
        '@type': 'userPrivacySettingRuleAllowChatMembers';
        /** The chat identifiers, total number of chats in all rules must not exceed 20 */
        chat_ids: vector<int53>;
    }
    
    
    /** A rule to restrict all users from doing something */
    export interface userPrivacySettingRuleRestrictAll {
        '@type': 'userPrivacySettingRuleRestrictAll';
    }
    
    
    /** A rule to restrict all contacts of a user from doing something */
    export interface userPrivacySettingRuleRestrictContacts {
        '@type': 'userPrivacySettingRuleRestrictContacts';
    }
    
    
    /** A rule to restrict all specified users from doing something */
    export interface userPrivacySettingRuleRestrictUsers {
        '@type': 'userPrivacySettingRuleRestrictUsers';
        /** The user identifiers, total number of users in all rules must not exceed 1000 */
        user_ids: vector<int53>;
    }
    
    
    /** A rule to restrict all members of specified basic groups and supergroups from doing something */
    export interface userPrivacySettingRuleRestrictChatMembers {
        '@type': 'userPrivacySettingRuleRestrictChatMembers';
        /** The chat identifiers, total number of chats in all rules must not exceed 20 */
        chat_ids: vector<int53>;
    }
    
    
    /** A list of privacy rules. Rules are matched in the specified order. The first matched rule defines the privacy setting for a given user. If no rule matches, the action is not allowed */
    export interface userPrivacySettingRules {
        '@type': 'userPrivacySettingRules';
        /** A list of rules */
        rules: vector<UserPrivacySettingRule>;
    }
    
    
    /** A privacy setting for managing whether the user's online status is visible */
    export interface userPrivacySettingShowStatus {
        '@type': 'userPrivacySettingShowStatus';
    }
    
    
    /** A privacy setting for managing whether the user's profile photo is visible */
    export interface userPrivacySettingShowProfilePhoto {
        '@type': 'userPrivacySettingShowProfilePhoto';
    }
    
    
    /** A privacy setting for managing whether a link to the user's account is included in forwarded messages */
    export interface userPrivacySettingShowLinkInForwardedMessages {
        '@type': 'userPrivacySettingShowLinkInForwardedMessages';
    }
    
    
    /** A privacy setting for managing whether the user's phone number is visible */
    export interface userPrivacySettingShowPhoneNumber {
        '@type': 'userPrivacySettingShowPhoneNumber';
    }
    
    
    /** A privacy setting for managing whether the user can be invited to chats */
    export interface userPrivacySettingAllowChatInvites {
        '@type': 'userPrivacySettingAllowChatInvites';
    }
    
    
    /** A privacy setting for managing whether the user can be called */
    export interface userPrivacySettingAllowCalls {
        '@type': 'userPrivacySettingAllowCalls';
    }
    
    
    /** A privacy setting for managing whether peer-to-peer connections can be used for calls */
    export interface userPrivacySettingAllowPeerToPeerCalls {
        '@type': 'userPrivacySettingAllowPeerToPeerCalls';
    }
    
    
    /** A privacy setting for managing whether the user can be found by their phone number. Checked only if the phone number is not known to the other user. Can be set only to "Allow contacts" or "Allow all" */
    export interface userPrivacySettingAllowFindingByPhoneNumber {
        '@type': 'userPrivacySettingAllowFindingByPhoneNumber';
    }
    
    
    /** Contains information about the period of inactivity after which the current user's account will automatically be deleted */
    export interface accountTtl {
        '@type': 'accountTtl';
        /** Number of days of inactivity before the account will be flagged for deletion; 30-366 days */
        days: int32;
    }
    
    
    /** The session is running on an Android device */
    export interface sessionTypeAndroid {
        '@type': 'sessionTypeAndroid';
    }
    
    
    /** The session is running on a generic Apple device */
    export interface sessionTypeApple {
        '@type': 'sessionTypeApple';
    }
    
    
    /** The session is running on the Brave browser */
    export interface sessionTypeBrave {
        '@type': 'sessionTypeBrave';
    }
    
    
    /** The session is running on the Chrome browser */
    export interface sessionTypeChrome {
        '@type': 'sessionTypeChrome';
    }
    
    
    /** The session is running on the Edge browser */
    export interface sessionTypeEdge {
        '@type': 'sessionTypeEdge';
    }
    
    
    /** The session is running on the Firefox browser */
    export interface sessionTypeFirefox {
        '@type': 'sessionTypeFirefox';
    }
    
    
    /** The session is running on an iPad device */
    export interface sessionTypeIpad {
        '@type': 'sessionTypeIpad';
    }
    
    
    /** The session is running on an iPhone device */
    export interface sessionTypeIphone {
        '@type': 'sessionTypeIphone';
    }
    
    
    /** The session is running on a Linux device */
    export interface sessionTypeLinux {
        '@type': 'sessionTypeLinux';
    }
    
    
    /** The session is running on a Mac device */
    export interface sessionTypeMac {
        '@type': 'sessionTypeMac';
    }
    
    
    /** The session is running on the Opera browser */
    export interface sessionTypeOpera {
        '@type': 'sessionTypeOpera';
    }
    
    
    /** The session is running on the Safari browser */
    export interface sessionTypeSafari {
        '@type': 'sessionTypeSafari';
    }
    
    
    /** The session is running on an Ubuntu device */
    export interface sessionTypeUbuntu {
        '@type': 'sessionTypeUbuntu';
    }
    
    
    /** The session is running on an unknown type of device */
    export interface sessionTypeUnknown {
        '@type': 'sessionTypeUnknown';
    }
    
    
    /** The session is running on the Vivaldi browser */
    export interface sessionTypeVivaldi {
        '@type': 'sessionTypeVivaldi';
    }
    
    
    /** The session is running on a Windows device */
    export interface sessionTypeWindows {
        '@type': 'sessionTypeWindows';
    }
    
    
    /** The session is running on an Xbox console */
    export interface sessionTypeXbox {
        '@type': 'sessionTypeXbox';
    }
    
    
    /** Contains information about one session in a Telegram application used by the current user. Sessions must be shown to the user in the returned order */
    export interface session {
        '@type': 'session';
        /** Session identifier */
        id: int64;
        /** True, if this session is the current session */
        is_current: Bool;
        /** True, if a password is needed to complete authorization of the session */
        is_password_pending: Bool;
        /** True, if incoming secret chats can be accepted by the session */
        can_accept_secret_chats: Bool;
        /** True, if incoming calls can be accepted by the session */
        can_accept_calls: Bool;
        /** Session type based on the system and application version, which can be used to display a corresponding icon */
        type: SessionType;
        /** Telegram API identifier, as provided by the application */
        api_id: int32;
        /** Name of the application, as provided by the application */
        application_name: string;
        /** The version of the application, as provided by the application */
        application_version: string;
        /** True, if the application is an official application or uses the api_id of an official application */
        is_official_application: Bool;
        /** Model of the device the application has been run or is running on, as provided by the application */
        device_model: string;
        /** Operating system the application has been run or is running on, as provided by the application */
        platform: string;
        /** Version of the operating system the application has been run or is running on, as provided by the application */
        system_version: string;
        /** Point in time (Unix timestamp) when the user has logged in */
        log_in_date: int32;
        /** Point in time (Unix timestamp) when the session was last used */
        last_active_date: int32;
        /** IP address from which the session was created, in human-readable format */
        ip: string;
        /** A two-letter country code for the country from which the session was created, based on the IP address */
        country: string;
        /** Region code from which the session was created, based on the IP address */
        region: string;
    }
    
    
    /** Contains a list of sessions */
    export interface sessions {
        '@type': 'sessions';
        /** List of sessions */
        sessions: vector<session>;
        /** Number of days of inactivity before sessions will automatically be terminated; 1-366 days */
        inactive_session_ttl_days: int32;
    }
    
    
    /** Contains information about one website the current user is logged in with Telegram */
    export interface connectedWebsite {
        '@type': 'connectedWebsite';
        /** Website identifier */
        id: int64;
        /** The domain name of the website */
        domain_name: string;
        /** User identifier of a bot linked with the website */
        bot_user_id: int53;
        /** The version of a browser used to log in */
        browser: string;
        /** Operating system the browser is running on */
        platform: string;
        /** Point in time (Unix timestamp) when the user was logged in */
        log_in_date: int32;
        /** Point in time (Unix timestamp) when obtained authorization was last used */
        last_active_date: int32;
        /** IP address from which the user was logged in, in human-readable format */
        ip: string;
        /** Human-readable description of a country and a region from which the user was logged in, based on the IP address */
        location: string;
    }
    
    
    /** Contains a list of websites the current user is logged in with Telegram */
    export interface connectedWebsites {
        '@type': 'connectedWebsites';
        /** List of connected websites */
        websites: vector<connectedWebsite>;
    }
    
    
    /** The chat contains spam messages */
    export interface chatReportReasonSpam {
        '@type': 'chatReportReasonSpam';
    }
    
    
    /** The chat promotes violence */
    export interface chatReportReasonViolence {
        '@type': 'chatReportReasonViolence';
    }
    
    
    /** The chat contains pornographic messages */
    export interface chatReportReasonPornography {
        '@type': 'chatReportReasonPornography';
    }
    
    
    /** The chat has child abuse related content */
    export interface chatReportReasonChildAbuse {
        '@type': 'chatReportReasonChildAbuse';
    }
    
    
    /** The chat contains copyrighted content */
    export interface chatReportReasonCopyright {
        '@type': 'chatReportReasonCopyright';
    }
    
    
    /** The location-based chat is unrelated to its stated location */
    export interface chatReportReasonUnrelatedLocation {
        '@type': 'chatReportReasonUnrelatedLocation';
    }
    
    
    /** The chat represents a fake account */
    export interface chatReportReasonFake {
        '@type': 'chatReportReasonFake';
    }
    
    
    /** The chat has illegal drugs related content */
    export interface chatReportReasonIllegalDrugs {
        '@type': 'chatReportReasonIllegalDrugs';
    }
    
    
    /** The chat contains messages with personal details */
    export interface chatReportReasonPersonalDetails {
        '@type': 'chatReportReasonPersonalDetails';
    }
    
    
    /** A custom reason provided by the user */
    export interface chatReportReasonCustom {
        '@type': 'chatReportReasonCustom';
    }
    
    
    /** The currently opened chat needs to be kept */
    export interface targetChatCurrent {
        '@type': 'targetChatCurrent';
    }
    
    
    /** The chat needs to be chosen by the user among chats of the specified types */
    export interface targetChatChosen {
        '@type': 'targetChatChosen';
        /** True, if private chats with ordinary users are allowed */
        allow_user_chats: Bool;
        /** True, if private chats with other bots are allowed */
        allow_bot_chats: Bool;
        /** True, if basic group and supergroup chats are allowed */
        allow_group_chats: Bool;
        /** True, if channel chats are allowed */
        allow_channel_chats: Bool;
    }
    
    
    /** The chat needs to be open with the provided internal link */
    export interface targetChatInternalLink {
        '@type': 'targetChatInternalLink';
        /** An internal link pointing to the chat */
        link: InternalLinkType;
    }
    
    
    /** The link is a link to the active sessions section of the application. Use getActiveSessions to handle the link */
    export interface internalLinkTypeActiveSessions {
        '@type': 'internalLinkTypeActiveSessions';
    }
    
    
    /** The link is a link to an attachment menu bot to be opened in the specified or a chosen chat. Process given target_chat to open the chat. -Then call searchPublicChat with the given bot username, check that the user is a bot and can be added to attachment menu. Then use getAttachmentMenuBot to receive information about the bot. -If the bot isn't added to attachment menu, then user needs to confirm adding the bot to attachment menu. If user confirms adding, then use toggleBotIsAddedToAttachmentMenu to add it. -If the attachment menu bot can't be used in the opened chat, show an error to the user. If the bot is added to attachment menu and can be used in the chat, then use openWebApp with the given URL */
    export interface internalLinkTypeAttachmentMenuBot {
        '@type': 'internalLinkTypeAttachmentMenuBot';
        /** Target chat to be opened */
        target_chat: TargetChat;
        /** Username of the bot */
        bot_username: string;
        /** URL to be passed to openWebApp */
        url: string;
    }
    
    
    /** The link contains an authentication code. Call checkAuthenticationCode with the code if the current authorization state is authorizationStateWaitCode */
    export interface internalLinkTypeAuthenticationCode {
        '@type': 'internalLinkTypeAuthenticationCode';
        /** The authentication code */
        code: string;
    }
    
    
    /** The link is a link to a background. Call searchBackground with the given background name to process the link */
    export interface internalLinkTypeBackground {
        '@type': 'internalLinkTypeBackground';
        /** Name of the background */
        background_name: string;
    }
    
    
    /** The link is a link to a chat with a Telegram bot. Call searchPublicChat with the given bot username, check that the user is a bot, show START button in the chat with the bot, -and then call sendBotStartMessage with the given start parameter after the button is pressed */
    export interface internalLinkTypeBotStart {
        '@type': 'internalLinkTypeBotStart';
        /** Username of the bot */
        bot_username: string;
        /** The parameter to be passed to sendBotStartMessage */
        start_parameter: string;
        /** True, if sendBotStartMessage must be called automatically without showing the START button */
        autostart: Bool;
    }
    
    
    /** The link is a link to a Telegram bot, which is supposed to be added to a group chat. Call searchPublicChat with the given bot username, check that the user is a bot and can be added to groups, -ask the current user to select a basic group or a supergroup chat to add the bot to, taking into account that bots can be added to a public supergroup only by administrators of the supergroup. -If administrator rights are provided by the link, call getChatMember to receive the current bot rights in the chat and if the bot already is an administrator, -check that the current user can edit its administrator rights, combine received rights with the requested administrator rights, show confirmation box to the user, -and call setChatMemberStatus with the chosen chat and confirmed administrator rights. Before call to setChatMemberStatus it may be required to upgrade the chosen basic group chat to a supergroup chat. -Then if start_parameter isn't empty, call sendBotStartMessage with the given start parameter and the chosen chat, otherwise just send /start message with bot's username added to the chat. */
    export interface internalLinkTypeBotStartInGroup {
        '@type': 'internalLinkTypeBotStartInGroup';
        /** Username of the bot */
        bot_username: string;
        /** The parameter to be passed to sendBotStartMessage */
        start_parameter: string;
        /** Expected administrator rights for the bot; may be null */
        administrator_rights?: chatAdministratorRights;
    }
    
    
    /** The link is a link to a Telegram bot, which is supposed to be added to a channel chat as an administrator. Call searchPublicChat with the given bot username and check that the user is a bot, -ask the current user to select a channel chat to add the bot to as an administrator. Then call getChatMember to receive the current bot rights in the chat and if the bot already is an administrator, -check that the current user can edit its administrator rights and combine received rights with the requested administrator rights. Then show confirmation box to the user, and call setChatMemberStatus with the chosen chat and confirmed rights */
    export interface internalLinkTypeBotAddToChannel {
        '@type': 'internalLinkTypeBotAddToChannel';
        /** Username of the bot */
        bot_username: string;
        /** Expected administrator rights for the bot */
        administrator_rights: chatAdministratorRights;
    }
    
    
    /** The link is a link to the change phone number section of the app */
    export interface internalLinkTypeChangePhoneNumber {
        '@type': 'internalLinkTypeChangePhoneNumber';
    }
    
    
    /** The link is a chat invite link. Call checkChatInviteLink with the given invite link to process the link */
    export interface internalLinkTypeChatInvite {
        '@type': 'internalLinkTypeChatInvite';
        /** Internal representation of the invite link */
        invite_link: string;
    }
    
    
    /** The link is a link to the filter settings section of the app */
    export interface internalLinkTypeFilterSettings {
        '@type': 'internalLinkTypeFilterSettings';
    }
    
    
    /** The link is a link to a game. Call searchPublicChat with the given bot username, check that the user is a bot, ask the current user to select a chat to send the game, and then call sendMessage with inputMessageGame */
    export interface internalLinkTypeGame {
        '@type': 'internalLinkTypeGame';
        /** Username of the bot that owns the game */
        bot_username: string;
        /** Short name of the game */
        game_short_name: string;
    }
    
    
    /** The link is a link to an invoice. Call getPaymentForm with the given invoice name to process the link */
    export interface internalLinkTypeInvoice {
        '@type': 'internalLinkTypeInvoice';
        /** Name of the invoice */
        invoice_name: string;
    }
    
    
    /** The link is a link to a language pack. Call getLanguagePackInfo with the given language pack identifier to process the link */
    export interface internalLinkTypeLanguagePack {
        '@type': 'internalLinkTypeLanguagePack';
        /** Language pack identifier */
        language_pack_id: string;
    }
    
    
    /** The link is a link to the language settings section of the app */
    export interface internalLinkTypeLanguageSettings {
        '@type': 'internalLinkTypeLanguageSettings';
    }
    
    
    /** The link is a link to a Telegram message. Call getMessageLinkInfo with the given URL to process the link */
    export interface internalLinkTypeMessage {
        '@type': 'internalLinkTypeMessage';
        /** URL to be passed to getMessageLinkInfo */
        url: string;
    }
    
    
    /** The link contains a message draft text. A share screen needs to be shown to the user, then the chosen chat must be opened and the text is added to the input field */
    export interface internalLinkTypeMessageDraft {
        '@type': 'internalLinkTypeMessageDraft';
        /** Message draft text */
        text: formattedText;
        /** True, if the first line of the text contains a link. If true, the input field needs to be focused and the text after the link must be selected */
        contains_link: Bool;
    }
    
    
    /** The link contains a request of Telegram passport data. Call getPassportAuthorizationForm with the given parameters to process the link if the link was received from outside of the application, otherwise ignore it */
    export interface internalLinkTypePassportDataRequest {
        '@type': 'internalLinkTypePassportDataRequest';
        /** User identifier of the service's bot */
        bot_user_id: int53;
        /** Telegram Passport element types requested by the service */
        scope: string;
        /** Service's public key */
        public_key: string;
        /** Unique request identifier provided by the service */
        nonce: string;
        /** An HTTP URL to open once the request is finished or canceled with the parameter tg_passport=success or tg_passport=cancel respectively. If empty, then the link tgbot{bot_user_id}://passport/success or tgbot{bot_user_id}://passport/cancel needs to be opened instead */
        callback_url: string;
    }
    
    
    /** The link can be used to confirm ownership of a phone number to prevent account deletion. Call sendPhoneNumberConfirmationCode with the given hash and phone number to process the link */
    export interface internalLinkTypePhoneNumberConfirmation {
        '@type': 'internalLinkTypePhoneNumberConfirmation';
        /** Hash value from the link */
        hash: string;
        /** Phone number value from the link */
        phone_number: string;
    }
    
    
    /** The link is a link to the Premium features screen of the applcation from which the user can subscribe to Telegram Premium. Call getPremiumFeatures with the given referrer to process the link */
    export interface internalLinkTypePremiumFeatures {
        '@type': 'internalLinkTypePremiumFeatures';
        /** Referrer specified in the link */
        referrer: string;
    }
    
    
    /** The link is a link to the privacy and security settings section of the app */
    export interface internalLinkTypePrivacyAndSecuritySettings {
        '@type': 'internalLinkTypePrivacyAndSecuritySettings';
    }
    
    
    /** The link is a link to a proxy. Call addProxy with the given parameters to process the link and add the proxy */
    export interface internalLinkTypeProxy {
        '@type': 'internalLinkTypeProxy';
        /** Proxy server IP address */
        server: string;
        /** Proxy server port */
        port: int32;
        /** Type of the proxy */
        type: ProxyType;
    }
    
    
    /** The link is a link to a chat by its username. Call searchPublicChat with the given chat username to process the link */
    export interface internalLinkTypePublicChat {
        '@type': 'internalLinkTypePublicChat';
        /** Username of the chat */
        chat_username: string;
    }
    
    
    /** The link can be used to login the current user on another device, but it must be scanned from QR-code using in-app camera. An alert similar to -"This code can be used to allow someone to log in to your Telegram account. To confirm Telegram login, please go to Settings > Devices > Scan QR and scan the code" needs to be shown */
    export interface internalLinkTypeQrCodeAuthentication {
        '@type': 'internalLinkTypeQrCodeAuthentication';
    }
    
    
    /** The link is a link to application settings */
    export interface internalLinkTypeSettings {
        '@type': 'internalLinkTypeSettings';
    }
    
    
    /** The link is a link to a sticker set. Call searchStickerSet with the given sticker set name to process the link and show the sticker set */
    export interface internalLinkTypeStickerSet {
        '@type': 'internalLinkTypeStickerSet';
        /** Name of the sticker set */
        sticker_set_name: string;
    }
    
    
    /** The link is a link to a theme. TDLib has no theme support yet */
    export interface internalLinkTypeTheme {
        '@type': 'internalLinkTypeTheme';
        /** Name of the theme */
        theme_name: string;
    }
    
    
    /** The link is a link to the theme settings section of the app */
    export interface internalLinkTypeThemeSettings {
        '@type': 'internalLinkTypeThemeSettings';
    }
    
    
    /** The link is an unknown tg: link. Call getDeepLinkInfo to process the link */
    export interface internalLinkTypeUnknownDeepLink {
        '@type': 'internalLinkTypeUnknownDeepLink';
        /** Link to be passed to getDeepLinkInfo */
        link: string;
    }
    
    
    /** The link is a link to an unsupported proxy. An alert can be shown to the user */
    export interface internalLinkTypeUnsupportedProxy {
        '@type': 'internalLinkTypeUnsupportedProxy';
    }
    
    
    /** The link is a link to a user by its phone number. Call searchUserByPhoneNumber with the given phone number to process the link */
    export interface internalLinkTypeUserPhoneNumber {
        '@type': 'internalLinkTypeUserPhoneNumber';
        /** Phone number of the user */
        phone_number: string;
    }
    
    
    /** The link is a link to a video chat. Call searchPublicChat with the given chat username, and then joinGroupCall with the given invite hash to process the link */
    export interface internalLinkTypeVideoChat {
        '@type': 'internalLinkTypeVideoChat';
        /** Username of the chat with the video chat */
        chat_username: string;
        /** If non-empty, invite hash to be used to join the video chat without being muted by administrators */
        invite_hash: string;
        /** True, if the video chat is expected to be a live stream in a channel or a broadcast group */
        is_live_stream: Bool;
    }
    
    
    /** Contains an HTTPS link to a message in a supergroup or channel */
    export interface messageLink {
        '@type': 'messageLink';
        /** Message link */
        link: string;
        /** True, if the link will work for non-members of the chat */
        is_public: Bool;
    }
    
    
    /** Contains information about a link to a message in a chat */
    export interface messageLinkInfo {
        '@type': 'messageLinkInfo';
        /** True, if the link is a public link for a message in a chat */
        is_public: Bool;
        /** If found, identifier of the chat to which the message belongs, 0 otherwise */
        chat_id: int53;
        /** If found, the linked message; may be null */
        message?: message;
        /** Timestamp from which the video/audio/video note/voice note playing must start, in seconds; 0 if not specified. The media can be in the message content or in its web page preview */
        media_timestamp: int32;
        /** True, if the whole media album to which the message belongs is linked */
        for_album: Bool;
        /** True, if the message is linked as a channel post comment or from a message thread */
        for_comment: Bool;
    }
    
    
    /** Contains a part of a file */
    export interface filePart {
        '@type': 'filePart';
        /** File bytes */
        data: Blob;
    }
    
    
    /** The data is not a file */
    export interface fileTypeNone {
        '@type': 'fileTypeNone';
    }
    
    
    /** The file is an animation */
    export interface fileTypeAnimation {
        '@type': 'fileTypeAnimation';
    }
    
    
    /** The file is an audio file */
    export interface fileTypeAudio {
        '@type': 'fileTypeAudio';
    }
    
    
    /** The file is a document */
    export interface fileTypeDocument {
        '@type': 'fileTypeDocument';
    }
    
    
    /** The file is a notification sound */
    export interface fileTypeNotificationSound {
        '@type': 'fileTypeNotificationSound';
    }
    
    
    /** The file is a photo */
    export interface fileTypePhoto {
        '@type': 'fileTypePhoto';
    }
    
    
    /** The file is a profile photo */
    export interface fileTypeProfilePhoto {
        '@type': 'fileTypeProfilePhoto';
    }
    
    
    /** The file was sent to a secret chat (the file type is not known to the server) */
    export interface fileTypeSecret {
        '@type': 'fileTypeSecret';
    }
    
    
    /** The file is a thumbnail of a file from a secret chat */
    export interface fileTypeSecretThumbnail {
        '@type': 'fileTypeSecretThumbnail';
    }
    
    
    /** The file is a file from Secure storage used for storing Telegram Passport files */
    export interface fileTypeSecure {
        '@type': 'fileTypeSecure';
    }
    
    
    /** The file is a sticker */
    export interface fileTypeSticker {
        '@type': 'fileTypeSticker';
    }
    
    
    /** The file is a thumbnail of another file */
    export interface fileTypeThumbnail {
        '@type': 'fileTypeThumbnail';
    }
    
    
    /** The file type is not yet known */
    export interface fileTypeUnknown {
        '@type': 'fileTypeUnknown';
    }
    
    
    /** The file is a video */
    export interface fileTypeVideo {
        '@type': 'fileTypeVideo';
    }
    
    
    /** The file is a video note */
    export interface fileTypeVideoNote {
        '@type': 'fileTypeVideoNote';
    }
    
    
    /** The file is a voice note */
    export interface fileTypeVoiceNote {
        '@type': 'fileTypeVoiceNote';
    }
    
    
    /** The file is a wallpaper or a background pattern */
    export interface fileTypeWallpaper {
        '@type': 'fileTypeWallpaper';
    }
    
    
    /** Contains the storage usage statistics for a specific file type */
    export interface storageStatisticsByFileType {
        '@type': 'storageStatisticsByFileType';
        /** File type */
        file_type: FileType;
        /** Total size of the files, in bytes */
        size: int53;
        /** Total number of files */
        count: int32;
    }
    
    
    /** Contains the storage usage statistics for a specific chat */
    export interface storageStatisticsByChat {
        '@type': 'storageStatisticsByChat';
        /** Chat identifier; 0 if none */
        chat_id: int53;
        /** Total size of the files in the chat, in bytes */
        size: int53;
        /** Total number of files in the chat */
        count: int32;
        /** Statistics split by file types */
        by_file_type: vector<storageStatisticsByFileType>;
    }
    
    
    /** Contains the exact storage usage statistics split by chats and file type */
    export interface storageStatistics {
        '@type': 'storageStatistics';
        /** Total size of files, in bytes */
        size: int53;
        /** Total number of files */
        count: int32;
        /** Statistics split by chats */
        by_chat: vector<storageStatisticsByChat>;
    }
    
    
    /** Contains approximate storage usage statistics, excluding files of unknown file type */
    export interface storageStatisticsFast {
        '@type': 'storageStatisticsFast';
        /** Approximate total size of files, in bytes */
        files_size: int53;
        /** Approximate number of files */
        file_count: int32;
        /** Size of the database */
        database_size: int53;
        /** Size of the language pack database */
        language_pack_database_size: int53;
        /** Size of the TDLib internal log */
        log_size: int53;
    }
    
    
    /** Contains database statistics */
    export interface databaseStatistics {
        '@type': 'databaseStatistics';
        /** Database statistics in an unspecified human-readable format */
        statistics: string;
    }
    
    
    /** The network is not available */
    export interface networkTypeNone {
        '@type': 'networkTypeNone';
    }
    
    
    /** A mobile network */
    export interface networkTypeMobile {
        '@type': 'networkTypeMobile';
    }
    
    
    /** A mobile roaming network */
    export interface networkTypeMobileRoaming {
        '@type': 'networkTypeMobileRoaming';
    }
    
    
    /** A Wi-Fi network */
    export interface networkTypeWiFi {
        '@type': 'networkTypeWiFi';
    }
    
    
    /** A different network type (e.g., Ethernet network) */
    export interface networkTypeOther {
        '@type': 'networkTypeOther';
    }
    
    
    /** Contains information about the total amount of data that was used to send and receive files */
    export interface networkStatisticsEntryFile {
        '@type': 'networkStatisticsEntryFile';
        /** Type of the file the data is part of; pass null if the data isn't related to files */
        file_type: FileType;
        /** Type of the network the data was sent through. Call setNetworkType to maintain the actual network type */
        network_type: NetworkType;
        /** Total number of bytes sent */
        sent_bytes: int53;
        /** Total number of bytes received */
        received_bytes: int53;
    }
    
    
    /** Contains information about the total amount of data that was used for calls */
    export interface networkStatisticsEntryCall {
        '@type': 'networkStatisticsEntryCall';
        /** Type of the network the data was sent through. Call setNetworkType to maintain the actual network type */
        network_type: NetworkType;
        /** Total number of bytes sent */
        sent_bytes: int53;
        /** Total number of bytes received */
        received_bytes: int53;
        /** Total call duration, in seconds */
        duration: double;
    }
    
    
    /** A full list of available network statistic entries */
    export interface networkStatistics {
        '@type': 'networkStatistics';
        /** Point in time (Unix timestamp) from which the statistics are collected */
        since_date: int32;
        /** Network statistics entries */
        entries: vector<NetworkStatisticsEntry>;
    }
    
    
    /** Contains auto-download settings */
    export interface autoDownloadSettings {
        '@type': 'autoDownloadSettings';
        /** True, if the auto-download is enabled */
        is_auto_download_enabled: Bool;
        /** The maximum size of a photo file to be auto-downloaded, in bytes */
        max_photo_file_size: int32;
        /** The maximum size of a video file to be auto-downloaded, in bytes */
        max_video_file_size: int53;
        /** The maximum size of other file types to be auto-downloaded, in bytes */
        max_other_file_size: int53;
        /** The maximum suggested bitrate for uploaded videos, in kbit/s */
        video_upload_bitrate: int32;
        /** True, if the beginning of video files needs to be preloaded for instant playback */
        preload_large_videos: Bool;
        /** True, if the next audio track needs to be preloaded while the user is listening to an audio file */
        preload_next_audio: Bool;
        /** True, if "use less data for calls" option needs to be enabled */
        use_less_data_for_calls: Bool;
    }
    
    
    /** Contains auto-download settings presets for the current user */
    export interface autoDownloadSettingsPresets {
        '@type': 'autoDownloadSettingsPresets';
        /** Preset with lowest settings; supposed to be used by default when roaming */
        low: autoDownloadSettings;
        /** Preset with medium settings; supposed to be used by default when using mobile data */
        medium: autoDownloadSettings;
        /** Preset with highest settings; supposed to be used by default when connected on Wi-Fi */
        high: autoDownloadSettings;
    }
    
    
    /** Currently waiting for the network to become available. Use setNetworkType to change the available network type */
    export interface connectionStateWaitingForNetwork {
        '@type': 'connectionStateWaitingForNetwork';
    }
    
    
    /** Currently establishing a connection with a proxy server */
    export interface connectionStateConnectingToProxy {
        '@type': 'connectionStateConnectingToProxy';
    }
    
    
    /** Currently establishing a connection to the Telegram servers */
    export interface connectionStateConnecting {
        '@type': 'connectionStateConnecting';
    }
    
    
    /** Downloading data received while the application was offline */
    export interface connectionStateUpdating {
        '@type': 'connectionStateUpdating';
    }
    
    
    /** There is a working connection to the Telegram servers */
    export interface connectionStateReady {
        '@type': 'connectionStateReady';
    }
    
    
    /** A category containing frequently used private chats with non-bot users */
    export interface topChatCategoryUsers {
        '@type': 'topChatCategoryUsers';
    }
    
    
    /** A category containing frequently used private chats with bot users */
    export interface topChatCategoryBots {
        '@type': 'topChatCategoryBots';
    }
    
    
    /** A category containing frequently used basic groups and supergroups */
    export interface topChatCategoryGroups {
        '@type': 'topChatCategoryGroups';
    }
    
    
    /** A category containing frequently used channels */
    export interface topChatCategoryChannels {
        '@type': 'topChatCategoryChannels';
    }
    
    
    /** A category containing frequently used chats with inline bots sorted by their usage in inline mode */
    export interface topChatCategoryInlineBots {
        '@type': 'topChatCategoryInlineBots';
    }
    
    
    /** A category containing frequently used chats used for calls */
    export interface topChatCategoryCalls {
        '@type': 'topChatCategoryCalls';
    }
    
    
    /** A category containing frequently used chats used to forward messages */
    export interface topChatCategoryForwardChats {
        '@type': 'topChatCategoryForwardChats';
    }
    
    
    /** A URL linking to a user */
    export interface tMeUrlTypeUser {
        '@type': 'tMeUrlTypeUser';
        /** Identifier of the user */
        user_id: int53;
    }
    
    
    /** A URL linking to a public supergroup or channel */
    export interface tMeUrlTypeSupergroup {
        '@type': 'tMeUrlTypeSupergroup';
        /** Identifier of the supergroup or channel */
        supergroup_id: int53;
    }
    
    
    /** A chat invite link */
    export interface tMeUrlTypeChatInvite {
        '@type': 'tMeUrlTypeChatInvite';
        /** Information about the chat invite link */
        info: chatInviteLinkInfo;
    }
    
    
    /** A URL linking to a sticker set */
    export interface tMeUrlTypeStickerSet {
        '@type': 'tMeUrlTypeStickerSet';
        /** Identifier of the sticker set */
        sticker_set_id: int64;
    }
    
    
    /** Represents a URL linking to an internal Telegram entity */
    export interface tMeUrl {
        '@type': 'tMeUrl';
        /** URL */
        url: string;
        /** Type of the URL */
        type: TMeUrlType;
    }
    
    
    /** Contains a list of t.me URLs */
    export interface tMeUrls {
        '@type': 'tMeUrls';
        /** List of URLs */
        urls: vector<tMeUrl>;
    }
    
    
    /** Suggests the user to enable "archive_and_mute_new_chats_from_unknown_users" option */
    export interface suggestedActionEnableArchiveAndMuteNewChats {
        '@type': 'suggestedActionEnableArchiveAndMuteNewChats';
    }
    
    
    /** Suggests the user to check whether they still remember their 2-step verification password */
    export interface suggestedActionCheckPassword {
        '@type': 'suggestedActionCheckPassword';
    }
    
    
    /** Suggests the user to check whether authorization phone number is correct and change the phone number if it is inaccessible */
    export interface suggestedActionCheckPhoneNumber {
        '@type': 'suggestedActionCheckPhoneNumber';
    }
    
    
    /** Suggests the user to view a hint about the meaning of one and two check marks on sent messages */
    export interface suggestedActionViewChecksHint {
        '@type': 'suggestedActionViewChecksHint';
    }
    
    
    /** Suggests the user to convert specified supergroup to a broadcast group */
    export interface suggestedActionConvertToBroadcastGroup {
        '@type': 'suggestedActionConvertToBroadcastGroup';
        /** Supergroup identifier */
        supergroup_id: int53;
    }
    
    
    /** Suggests the user to set a 2-step verification password to be able to log in again */
    export interface suggestedActionSetPassword {
        '@type': 'suggestedActionSetPassword';
        /** The number of days to pass between consecutive authorizations if the user declines to set password */
        authorization_delay: int32;
    }
    
    
    /** Contains a counter */
    export interface count {
        '@type': 'count';
        /** Count */
        count: int32;
    }
    
    
    /** Contains some text */
    export interface text {
        '@type': 'text';
        /** Text */
        text: string;
    }
    
    
    /** Contains a value representing a number of seconds */
    export interface seconds {
        '@type': 'seconds';
        /** Number of seconds */
        seconds: double;
    }
    
    
    /** Contains size of downloaded prefix of a file */
    export interface fileDownloadedPrefixSize {
        '@type': 'fileDownloadedPrefixSize';
        /** The prefix size, in bytes */
        size: int53;
    }
    
    
    /** Contains information about a tg: deep link */
    export interface deepLinkInfo {
        '@type': 'deepLinkInfo';
        /** Text to be shown to the user */
        text: formattedText;
        /** True, if the user must be asked to update the application */
        need_update_application: Bool;
    }
    
    
    /** The text uses Markdown-style formatting */
    export interface textParseModeMarkdown {
        '@type': 'textParseModeMarkdown';
        /** Version of the parser: 0 or 1 - Telegram Bot API "Markdown" parse mode, 2 - Telegram Bot API "MarkdownV2" parse mode */
        version: int32;
    }
    
    
    /** The text uses HTML-style formatting. The same as Telegram Bot API "HTML" parse mode */
    export interface textParseModeHTML {
        '@type': 'textParseModeHTML';
    }
    
    
    /** A SOCKS5 proxy server */
    export interface proxyTypeSocks5 {
        '@type': 'proxyTypeSocks5';
        /** Username for logging in; may be empty */
        username: string;
        /** Password for logging in; may be empty */
        password: string;
    }
    
    
    /** A HTTP transparent proxy server */
    export interface proxyTypeHttp {
        '@type': 'proxyTypeHttp';
        /** Username for logging in; may be empty */
        username: string;
        /** Password for logging in; may be empty */
        password: string;
        /** Pass true if the proxy supports only HTTP requests and doesn't support transparent TCP connections via HTTP CONNECT method */
        http_only: Bool;
    }
    
    
    /** An MTProto proxy server */
    export interface proxyTypeMtproto {
        '@type': 'proxyTypeMtproto';
        /** The proxy's secret in hexadecimal encoding */
        secret: string;
    }
    
    
    /** Contains information about a proxy server */
    export interface proxy {
        '@type': 'proxy';
        /** Unique identifier of the proxy */
        id: int32;
        /** Proxy server IP address */
        server: string;
        /** Proxy server port */
        port: int32;
        /** Point in time (Unix timestamp) when the proxy was last used; 0 if never */
        last_used_date: int32;
        /** True, if the proxy is enabled now */
        is_enabled: Bool;
        /** Type of the proxy */
        type: ProxyType;
    }
    
    
    /** Represents a list of proxy servers */
    export interface proxies {
        '@type': 'proxies';
        /** List of proxy servers */
        proxies: vector<proxy>;
    }
    
    
    /** A sticker to be added to a sticker set */
    export interface inputSticker {
        '@type': 'inputSticker';
        /** File with the sticker; must fit in a 512x512 square. For WEBP stickers and masks the file must be in PNG format, which will be converted to WEBP server-side. Otherwise, the file must be local or uploaded within a week. See https://core.telegram.org/animated_stickers#technical-requirements for technical requirements */
        sticker: InputFile;
        /** Emojis corresponding to the sticker */
        emojis: string;
        /** Sticker type */
        type: StickerType;
    }
    
    
    /** Represents a date range */
    export interface dateRange {
        '@type': 'dateRange';
        /** Point in time (Unix timestamp) at which the date range begins */
        start_date: int32;
        /** Point in time (Unix timestamp) at which the date range ends */
        end_date: int32;
    }
    
    
    /** A value with information about its recent changes */
    export interface statisticalValue {
        '@type': 'statisticalValue';
        /** The current value */
        value: double;
        /** The value for the previous day */
        previous_value: double;
        /** The growth rate of the value, as a percentage */
        growth_rate_percentage: double;
    }
    
    
    /** A graph data */
    export interface statisticalGraphData {
        '@type': 'statisticalGraphData';
        /** Graph data in JSON format */
        json_data: string;
        /** If non-empty, a token which can be used to receive a zoomed in graph */
        zoom_token: string;
    }
    
    
    /** The graph data to be asynchronously loaded through getStatisticalGraph */
    export interface statisticalGraphAsync {
        '@type': 'statisticalGraphAsync';
        /** The token to use for data loading */
        token: string;
    }
    
    
    /** An error message to be shown to the user instead of the graph */
    export interface statisticalGraphError {
        '@type': 'statisticalGraphError';
        /** The error message */
        error_message: string;
    }
    
    
    /** Contains statistics about interactions with a message */
    export interface chatStatisticsMessageInteractionInfo {
        '@type': 'chatStatisticsMessageInteractionInfo';
        /** Message identifier */
        message_id: int53;
        /** Number of times the message was viewed */
        view_count: int32;
        /** Number of times the message was forwarded */
        forward_count: int32;
    }
    
    
    /** Contains statistics about messages sent by a user */
    export interface chatStatisticsMessageSenderInfo {
        '@type': 'chatStatisticsMessageSenderInfo';
        /** User identifier */
        user_id: int53;
        /** Number of sent messages */
        sent_message_count: int32;
        /** Average number of characters in sent messages; 0 if unknown */
        average_character_count: int32;
    }
    
    
    /** Contains statistics about administrator actions done by a user */
    export interface chatStatisticsAdministratorActionsInfo {
        '@type': 'chatStatisticsAdministratorActionsInfo';
        /** Administrator user identifier */
        user_id: int53;
        /** Number of messages deleted by the administrator */
        deleted_message_count: int32;
        /** Number of users banned by the administrator */
        banned_user_count: int32;
        /** Number of users restricted by the administrator */
        restricted_user_count: int32;
    }
    
    
    /** Contains statistics about number of new members invited by a user */
    export interface chatStatisticsInviterInfo {
        '@type': 'chatStatisticsInviterInfo';
        /** User identifier */
        user_id: int53;
        /** Number of new members invited by the user */
        added_member_count: int32;
    }
    
    
    /** A detailed statistics about a supergroup chat */
    export interface chatStatisticsSupergroup {
        '@type': 'chatStatisticsSupergroup';
        /** A period to which the statistics applies */
        period: dateRange;
        /** Number of members in the chat */
        member_count: statisticalValue;
        /** Number of messages sent to the chat */
        message_count: statisticalValue;
        /** Number of users who viewed messages in the chat */
        viewer_count: statisticalValue;
        /** Number of users who sent messages to the chat */
        sender_count: statisticalValue;
        /** A graph containing number of members in the chat */
        member_count_graph: StatisticalGraph;
        /** A graph containing number of members joined and left the chat */
        join_graph: StatisticalGraph;
        /** A graph containing number of new member joins per source */
        join_by_source_graph: StatisticalGraph;
        /** A graph containing distribution of active users per language */
        language_graph: StatisticalGraph;
        /** A graph containing distribution of sent messages by content type */
        message_content_graph: StatisticalGraph;
        /** A graph containing number of different actions in the chat */
        action_graph: StatisticalGraph;
        /** A graph containing distribution of message views per hour */
        day_graph: StatisticalGraph;
        /** A graph containing distribution of message views per day of week */
        week_graph: StatisticalGraph;
        /** List of users sent most messages in the last week */
        top_senders: vector<chatStatisticsMessageSenderInfo>;
        /** List of most active administrators in the last week */
        top_administrators: vector<chatStatisticsAdministratorActionsInfo>;
        /** List of most active inviters of new members in the last week */
        top_inviters: vector<chatStatisticsInviterInfo>;
    }
    
    
    /** A detailed statistics about a channel chat */
    export interface chatStatisticsChannel {
        '@type': 'chatStatisticsChannel';
        /** A period to which the statistics applies */
        period: dateRange;
        /** Number of members in the chat */
        member_count: statisticalValue;
        /** Mean number of times the recently sent messages was viewed */
        mean_view_count: statisticalValue;
        /** Mean number of times the recently sent messages was shared */
        mean_share_count: statisticalValue;
        /** A percentage of users with enabled notifications for the chat */
        enabled_notifications_percentage: double;
        /** A graph containing number of members in the chat */
        member_count_graph: StatisticalGraph;
        /** A graph containing number of members joined and left the chat */
        join_graph: StatisticalGraph;
        /** A graph containing number of members muted and unmuted the chat */
        mute_graph: StatisticalGraph;
        /** A graph containing number of message views in a given hour in the last two weeks */
        view_count_by_hour_graph: StatisticalGraph;
        /** A graph containing number of message views per source */
        view_count_by_source_graph: StatisticalGraph;
        /** A graph containing number of new member joins per source */
        join_by_source_graph: StatisticalGraph;
        /** A graph containing number of users viewed chat messages per language */
        language_graph: StatisticalGraph;
        /** A graph containing number of chat message views and shares */
        message_interaction_graph: StatisticalGraph;
        /** A graph containing number of views of associated with the chat instant views */
        instant_view_interaction_graph: StatisticalGraph;
        /** Detailed statistics about number of views and shares of recently sent messages */
        recent_message_interactions: vector<chatStatisticsMessageInteractionInfo>;
    }
    
    
    /** A detailed statistics about a message */
    export interface messageStatistics {
        '@type': 'messageStatistics';
        /** A graph containing number of message views and shares */
        message_interaction_graph: StatisticalGraph;
    }
    
    
    /** A point on a Cartesian plane */
    export interface point {
        '@type': 'point';
        /** The point's first coordinate */
        x: double;
        /** The point's second coordinate */
        y: double;
    }
    
    
    /** A straight line to a given point */
    export interface vectorPathCommandLine {
        '@type': 'vectorPathCommandLine';
        /** The end point of the straight line */
        end_point: point;
    }
    
    
    /** A cubic Bézier curve to a given point */
    export interface vectorPathCommandCubicBezierCurve {
        '@type': 'vectorPathCommandCubicBezierCurve';
        /** The start control point of the curve */
        start_control_point: point;
        /** The end control point of the curve */
        end_control_point: point;
        /** The end point of the curve */
        end_point: point;
    }
    
    
    /** A scope covering all users */
    export interface botCommandScopeDefault {
        '@type': 'botCommandScopeDefault';
    }
    
    
    /** A scope covering all private chats */
    export interface botCommandScopeAllPrivateChats {
        '@type': 'botCommandScopeAllPrivateChats';
    }
    
    
    /** A scope covering all group and supergroup chats */
    export interface botCommandScopeAllGroupChats {
        '@type': 'botCommandScopeAllGroupChats';
    }
    
    
    /** A scope covering all group and supergroup chat administrators */
    export interface botCommandScopeAllChatAdministrators {
        '@type': 'botCommandScopeAllChatAdministrators';
    }
    
    
    /** A scope covering all members of a chat */
    export interface botCommandScopeChat {
        '@type': 'botCommandScopeChat';
        /** Chat identifier */
        chat_id: int53;
    }
    
    
    /** A scope covering all administrators of a chat */
    export interface botCommandScopeChatAdministrators {
        '@type': 'botCommandScopeChatAdministrators';
        /** Chat identifier */
        chat_id: int53;
    }
    
    
    /** A scope covering a member of a chat */
    export interface botCommandScopeChatMember {
        '@type': 'botCommandScopeChatMember';
        /** Chat identifier */
        chat_id: int53;
        /** User identifier */
        user_id: int53;
    }
    
    
    /** The user authorization state has changed */
    export interface updateAuthorizationState {
        '@type': 'updateAuthorizationState';
        /** New authorization state */
        authorization_state: AuthorizationState;
    }
    
    
    /** A new message was received; can also be an outgoing message */
    export interface updateNewMessage {
        '@type': 'updateNewMessage';
        /** The new message */
        message: message;
    }
    
    
    /** A request to send a message has reached the Telegram server. This doesn't mean that the message will be sent successfully or even that the send message request will be processed. This update will be sent only if the option "use_quick_ack" is set to true. This update may be sent multiple times for the same message */
    export interface updateMessageSendAcknowledged {
        '@type': 'updateMessageSendAcknowledged';
        /** The chat identifier of the sent message */
        chat_id: int53;
        /** A temporary message identifier */
        message_id: int53;
    }
    
    
    /** A message has been successfully sent */
    export interface updateMessageSendSucceeded {
        '@type': 'updateMessageSendSucceeded';
        /** The sent message. Usually only the message identifier, date, and content are changed, but almost all other fields can also change */
        message: message;
        /** The previous temporary message identifier */
        old_message_id: int53;
    }
    
    
    /** A message failed to send. Be aware that some messages being sent can be irrecoverably deleted, in which case updateDeleteMessages will be received instead of this update */
    export interface updateMessageSendFailed {
        '@type': 'updateMessageSendFailed';
        /** The failed to send message */
        message: message;
        /** The previous temporary message identifier */
        old_message_id: int53;
        /** An error code */
        error_code: int32;
        /** Error message */
        error_message: string;
    }
    
    
    /** The message content has changed */
    export interface updateMessageContent {
        '@type': 'updateMessageContent';
        /** Chat identifier */
        chat_id: int53;
        /** Message identifier */
        message_id: int53;
        /** New message content */
        new_content: MessageContent;
    }
    
    
    /** A message was edited. Changes in the message content will come in a separate updateMessageContent */
    export interface updateMessageEdited {
        '@type': 'updateMessageEdited';
        /** Chat identifier */
        chat_id: int53;
        /** Message identifier */
        message_id: int53;
        /** Point in time (Unix timestamp) when the message was edited */
        edit_date: int32;
        /** New message reply markup; may be null */
        reply_markup?: ReplyMarkup;
    }
    
    
    /** The message pinned state was changed */
    export interface updateMessageIsPinned {
        '@type': 'updateMessageIsPinned';
        /** Chat identifier */
        chat_id: int53;
        /** The message identifier */
        message_id: int53;
        /** True, if the message is pinned */
        is_pinned: Bool;
    }
    
    
    /** The information about interactions with a message has changed */
    export interface updateMessageInteractionInfo {
        '@type': 'updateMessageInteractionInfo';
        /** Chat identifier */
        chat_id: int53;
        /** Message identifier */
        message_id: int53;
        /** New information about interactions with the message; may be null */
        interaction_info?: messageInteractionInfo;
    }
    
    
    /** The message content was opened. Updates voice note messages to "listened", video note messages to "viewed" and starts the TTL timer for self-destructing messages */
    export interface updateMessageContentOpened {
        '@type': 'updateMessageContentOpened';
        /** Chat identifier */
        chat_id: int53;
        /** Message identifier */
        message_id: int53;
    }
    
    
    /** A message with an unread mention was read */
    export interface updateMessageMentionRead {
        '@type': 'updateMessageMentionRead';
        /** Chat identifier */
        chat_id: int53;
        /** Message identifier */
        message_id: int53;
        /** The new number of unread mention messages left in the chat */
        unread_mention_count: int32;
    }
    
    
    /** The list of unread reactions added to a message was changed */
    export interface updateMessageUnreadReactions {
        '@type': 'updateMessageUnreadReactions';
        /** Chat identifier */
        chat_id: int53;
        /** Message identifier */
        message_id: int53;
        /** The new list of unread reactions */
        unread_reactions: vector<unreadReaction>;
        /** The new number of messages with unread reactions left in the chat */
        unread_reaction_count: int32;
    }
    
    
    /** A message with a live location was viewed. When the update is received, the application is supposed to update the live location */
    export interface updateMessageLiveLocationViewed {
        '@type': 'updateMessageLiveLocationViewed';
        /** Identifier of the chat with the live location message */
        chat_id: int53;
        /** Identifier of the message with live location */
        message_id: int53;
    }
    
    
    /** A new chat has been loaded/created. This update is guaranteed to come before the chat identifier is returned to the application. The chat field changes will be reported through separate updates */
    export interface updateNewChat {
        '@type': 'updateNewChat';
        /** The chat */
        chat: chat;
    }
    
    
    /** The title of a chat was changed */
    export interface updateChatTitle {
        '@type': 'updateChatTitle';
        /** Chat identifier */
        chat_id: int53;
        /** The new chat title */
        title: string;
    }
    
    
    /** A chat photo was changed */
    export interface updateChatPhoto {
        '@type': 'updateChatPhoto';
        /** Chat identifier */
        chat_id: int53;
        /** The new chat photo; may be null */
        photo?: chatPhotoInfo;
    }
    
    
    /** Chat permissions was changed */
    export interface updateChatPermissions {
        '@type': 'updateChatPermissions';
        /** Chat identifier */
        chat_id: int53;
        /** The new chat permissions */
        permissions: chatPermissions;
    }
    
    
    /** The last message of a chat was changed. If last_message is null, then the last message in the chat became unknown. Some new unknown messages might be added to the chat in this case */
    export interface updateChatLastMessage {
        '@type': 'updateChatLastMessage';
        /** Chat identifier */
        chat_id: int53;
        /** The new last message in the chat; may be null */
        last_message?: message;
        /** The new chat positions in the chat lists */
        positions: vector<chatPosition>;
    }
    
    
    /** The position of a chat in a chat list has changed. Instead of this update updateChatLastMessage or updateChatDraftMessage might be sent */
    export interface updateChatPosition {
        '@type': 'updateChatPosition';
        /** Chat identifier */
        chat_id: int53;
        /** New chat position. If new order is 0, then the chat needs to be removed from the list */
        position: chatPosition;
    }
    
    
    /** Incoming messages were read or the number of unread messages has been changed */
    export interface updateChatReadInbox {
        '@type': 'updateChatReadInbox';
        /** Chat identifier */
        chat_id: int53;
        /** Identifier of the last read incoming message */
        last_read_inbox_message_id: int53;
        /** The number of unread messages left in the chat */
        unread_count: int32;
    }
    
    
    /** Outgoing messages were read */
    export interface updateChatReadOutbox {
        '@type': 'updateChatReadOutbox';
        /** Chat identifier */
        chat_id: int53;
        /** Identifier of last read outgoing message */
        last_read_outbox_message_id: int53;
    }
    
    
    /** The chat action bar was changed */
    export interface updateChatActionBar {
        '@type': 'updateChatActionBar';
        /** Chat identifier */
        chat_id: int53;
        /** The new value of the action bar; may be null */
        action_bar?: ChatActionBar;
    }
    
    
    /** The chat available reactions were changed */
    export interface updateChatAvailableReactions {
        '@type': 'updateChatAvailableReactions';
        /** Chat identifier */
        chat_id: int53;
        /** The new list of reactions, available in the chat */
        available_reactions: vector<string>;
    }
    
    
    /** A chat draft has changed. Be aware that the update may come in the currently opened chat but with old content of the draft. If the user has changed the content of the draft, this update mustn't be applied */
    export interface updateChatDraftMessage {
        '@type': 'updateChatDraftMessage';
        /** Chat identifier */
        chat_id: int53;
        /** The new draft message; may be null */
        draft_message?: draftMessage;
        /** The new chat positions in the chat lists */
        positions: vector<chatPosition>;
    }
    
    
    /** The message sender that is selected to send messages in a chat has changed */
    export interface updateChatMessageSender {
        '@type': 'updateChatMessageSender';
        /** Chat identifier */
        chat_id: int53;
        /** New value of message_sender_id; may be null if the user can't change message sender */
        message_sender_id?: MessageSender;
    }
    
    
    /** The message Time To Live setting for a chat was changed */
    export interface updateChatMessageTtl {
        '@type': 'updateChatMessageTtl';
        /** Chat identifier */
        chat_id: int53;
        /** New value of message_ttl */
        message_ttl: int32;
    }
    
    
    /** Notification settings for a chat were changed */
    export interface updateChatNotificationSettings {
        '@type': 'updateChatNotificationSettings';
        /** Chat identifier */
        chat_id: int53;
        /** The new notification settings */
        notification_settings: chatNotificationSettings;
    }
    
    
    /** The chat pending join requests were changed */
    export interface updateChatPendingJoinRequests {
        '@type': 'updateChatPendingJoinRequests';
        /** Chat identifier */
        chat_id: int53;
        /** The new data about pending join requests; may be null */
        pending_join_requests?: chatJoinRequestsInfo;
    }
    
    
    /** The default chat reply markup was changed. Can occur because new messages with reply markup were received or because an old reply markup was hidden by the user */
    export interface updateChatReplyMarkup {
        '@type': 'updateChatReplyMarkup';
        /** Chat identifier */
        chat_id: int53;
        /** Identifier of the message from which reply markup needs to be used; 0 if there is no default custom reply markup in the chat */
        reply_markup_message_id: int53;
    }
    
    
    /** The chat theme was changed */
    export interface updateChatTheme {
        '@type': 'updateChatTheme';
        /** Chat identifier */
        chat_id: int53;
        /** The new name of the chat theme; may be empty if theme was reset to default */
        theme_name: string;
    }
    
    
    /** The chat unread_mention_count has changed */
    export interface updateChatUnreadMentionCount {
        '@type': 'updateChatUnreadMentionCount';
        /** Chat identifier */
        chat_id: int53;
        /** The number of unread mention messages left in the chat */
        unread_mention_count: int32;
    }
    
    
    /** The chat unread_reaction_count has changed */
    export interface updateChatUnreadReactionCount {
        '@type': 'updateChatUnreadReactionCount';
        /** Chat identifier */
        chat_id: int53;
        /** The number of messages with unread reactions left in the chat */
        unread_reaction_count: int32;
    }
    
    
    /** A chat video chat state has changed */
    export interface updateChatVideoChat {
        '@type': 'updateChatVideoChat';
        /** Chat identifier */
        chat_id: int53;
        /** New value of video_chat */
        video_chat: videoChat;
    }
    
    
    /** The value of the default disable_notification parameter, used when a message is sent to the chat, was changed */
    export interface updateChatDefaultDisableNotification {
        '@type': 'updateChatDefaultDisableNotification';
        /** Chat identifier */
        chat_id: int53;
        /** The new default_disable_notification value */
        default_disable_notification: Bool;
    }
    
    
    /** A chat content was allowed or restricted for saving */
    export interface updateChatHasProtectedContent {
        '@type': 'updateChatHasProtectedContent';
        /** Chat identifier */
        chat_id: int53;
        /** New value of has_protected_content */
        has_protected_content: Bool;
    }
    
    
    /** A chat's has_scheduled_messages field has changed */
    export interface updateChatHasScheduledMessages {
        '@type': 'updateChatHasScheduledMessages';
        /** Chat identifier */
        chat_id: int53;
        /** New value of has_scheduled_messages */
        has_scheduled_messages: Bool;
    }
    
    
    /** A chat was blocked or unblocked */
    export interface updateChatIsBlocked {
        '@type': 'updateChatIsBlocked';
        /** Chat identifier */
        chat_id: int53;
        /** New value of is_blocked */
        is_blocked: Bool;
    }
    
    
    /** A chat was marked as unread or was read */
    export interface updateChatIsMarkedAsUnread {
        '@type': 'updateChatIsMarkedAsUnread';
        /** Chat identifier */
        chat_id: int53;
        /** New value of is_marked_as_unread */
        is_marked_as_unread: Bool;
    }
    
    
    /** The list of chat filters or a chat filter has changed */
    export interface updateChatFilters {
        '@type': 'updateChatFilters';
        /** The new list of chat filters */
        chat_filters: vector<chatFilterInfo>;
        /** Position of the main chat list among chat filters, 0-based */
        main_chat_list_position: int32;
    }
    
    
    /** The number of online group members has changed. This update with non-zero number of online group members is sent only for currently opened chats. There is no guarantee that it will be sent just after the number of online users has changed */
    export interface updateChatOnlineMemberCount {
        '@type': 'updateChatOnlineMemberCount';
        /** Identifier of the chat */
        chat_id: int53;
        /** New number of online members in the chat, or 0 if unknown */
        online_member_count: int32;
    }
    
    
    /** Notification settings for some type of chats were updated */
    export interface updateScopeNotificationSettings {
        '@type': 'updateScopeNotificationSettings';
        /** Types of chats for which notification settings were updated */
        scope: NotificationSettingsScope;
        /** The new notification settings */
        notification_settings: scopeNotificationSettings;
    }
    
    
    /** A notification was changed */
    export interface updateNotification {
        '@type': 'updateNotification';
        /** Unique notification group identifier */
        notification_group_id: int32;
        /** Changed notification */
        notification: notification;
    }
    
    
    /** A list of active notifications in a notification group has changed */
    export interface updateNotificationGroup {
        '@type': 'updateNotificationGroup';
        /** Unique notification group identifier */
        notification_group_id: int32;
        /** New type of the notification group */
        type: NotificationGroupType;
        /** Identifier of a chat to which all notifications in the group belong */
        chat_id: int53;
        /** Chat identifier, which notification settings must be applied to the added notifications */
        notification_settings_chat_id: int53;
        /** Identifier of the notification sound to be played; 0 if sound is disabled */
        notification_sound_id: int64;
        /** Total number of unread notifications in the group, can be bigger than number of active notifications */
        total_count: int32;
        /** List of added group notifications, sorted by notification ID */
        added_notifications: vector<notification>;
        /** Identifiers of removed group notifications, sorted by notification ID */
        removed_notification_ids: vector<int32>;
    }
    
    
    /** Contains active notifications that was shown on previous application launches. This update is sent only if the message database is used. In that case it comes once before any updateNotification and updateNotificationGroup update */
    export interface updateActiveNotifications {
        '@type': 'updateActiveNotifications';
        /** Lists of active notification groups */
        groups: vector<notificationGroup>;
    }
    
    
    /** Describes whether there are some pending notification updates. Can be used to prevent application from killing, while there are some pending notifications */
    export interface updateHavePendingNotifications {
        '@type': 'updateHavePendingNotifications';
        /** True, if there are some delayed notification updates, which will be sent soon */
        have_delayed_notifications: Bool;
        /** True, if there can be some yet unreceived notifications, which are being fetched from the server */
        have_unreceived_notifications: Bool;
    }
    
    
    /** Some messages were deleted */
    export interface updateDeleteMessages {
        '@type': 'updateDeleteMessages';
        /** Chat identifier */
        chat_id: int53;
        /** Identifiers of the deleted messages */
        message_ids: vector<int53>;
        /** True, if the messages are permanently deleted by a user (as opposed to just becoming inaccessible) */
        is_permanent: Bool;
        /** True, if the messages are deleted only from the cache and can possibly be retrieved again in the future */
        from_cache: Bool;
    }
    
    
    /** A message sender activity in the chat has changed */
    export interface updateChatAction {
        '@type': 'updateChatAction';
        /** Chat identifier */
        chat_id: int53;
        /** If not 0, a message thread identifier in which the action was performed */
        message_thread_id: int53;
        /** Identifier of a message sender performing the action */
        sender_id: MessageSender;
        /** The action */
        action: ChatAction;
    }
    
    
    /** The user went online or offline */
    export interface updateUserStatus {
        '@type': 'updateUserStatus';
        /** User identifier */
        user_id: int53;
        /** New status of the user */
        status: UserStatus;
    }
    
    
    /** Some data of a user has changed. This update is guaranteed to come before the user identifier is returned to the application */
    export interface updateUser {
        '@type': 'updateUser';
        /** New data about the user */
        user: user;
    }
    
    
    /** Some data of a basic group has changed. This update is guaranteed to come before the basic group identifier is returned to the application */
    export interface updateBasicGroup {
        '@type': 'updateBasicGroup';
        /** New data about the group */
        basic_group: basicGroup;
    }
    
    
    /** Some data of a supergroup or a channel has changed. This update is guaranteed to come before the supergroup identifier is returned to the application */
    export interface updateSupergroup {
        '@type': 'updateSupergroup';
        /** New data about the supergroup */
        supergroup: supergroup;
    }
    
    
    /** Some data of a secret chat has changed. This update is guaranteed to come before the secret chat identifier is returned to the application */
    export interface updateSecretChat {
        '@type': 'updateSecretChat';
        /** New data about the secret chat */
        secret_chat: secretChat;
    }
    
    
    /** Some data in userFullInfo has been changed */
    export interface updateUserFullInfo {
        '@type': 'updateUserFullInfo';
        /** User identifier */
        user_id: int53;
        /** New full information about the user */
        user_full_info: userFullInfo;
    }
    
    
    /** Some data in basicGroupFullInfo has been changed */
    export interface updateBasicGroupFullInfo {
        '@type': 'updateBasicGroupFullInfo';
        /** Identifier of a basic group */
        basic_group_id: int53;
        /** New full information about the group */
        basic_group_full_info: basicGroupFullInfo;
    }
    
    
    /** Some data in supergroupFullInfo has been changed */
    export interface updateSupergroupFullInfo {
        '@type': 'updateSupergroupFullInfo';
        /** Identifier of the supergroup or channel */
        supergroup_id: int53;
        /** New full information about the supergroup */
        supergroup_full_info: supergroupFullInfo;
    }
    
    
    /** A service notification from the server was received. Upon receiving this the application must show a popup with the content of the notification */
    export interface updateServiceNotification {
        '@type': 'updateServiceNotification';
        /** Notification type. If type begins with "AUTH_KEY_DROP_", then two buttons "Cancel" and "Log out" must be shown under notification; if user presses the second, all local data must be destroyed using Destroy method */
        type: string;
        /** Notification content */
        content: MessageContent;
    }
    
    
    /** Information about a file was updated */
    export interface updateFile {
        '@type': 'updateFile';
        /** New data about the file */
        file: file;
    }
    
    
    /** The file generation process needs to be started by the application */
    export interface updateFileGenerationStart {
        '@type': 'updateFileGenerationStart';
        /** Unique identifier for the generation process */
        generation_id: int64;
        /** The path to a file from which a new file is generated; may be empty */
        original_path: string;
        /** The path to a file that must be created and where the new file is generated */
        destination_path: string;
        /** String specifying the conversion applied to the original file. If conversion is "#url#" than original_path contains an HTTP/HTTPS URL of a file, which must be downloaded by the application */
        conversion: string;
    }
    
    
    /** File generation is no longer needed */
    export interface updateFileGenerationStop {
        '@type': 'updateFileGenerationStop';
        /** Unique identifier for the generation process */
        generation_id: int64;
    }
    
    
    /** The state of the file download list has changed */
    export interface updateFileDownloads {
        '@type': 'updateFileDownloads';
        /** Total size of files in the file download list, in bytes */
        total_size: int53;
        /** Total number of files in the file download list */
        total_count: int32;
        /** Total downloaded size of files in the file download list, in bytes */
        downloaded_size: int53;
    }
    
    
    /** A file was added to the file download list. This update is sent only after file download list is loaded for the first time */
    export interface updateFileAddedToDownloads {
        '@type': 'updateFileAddedToDownloads';
        /** The added file download */
        file_download: fileDownload;
        /** New number of being downloaded and recently downloaded files found */
        counts: downloadedFileCounts;
    }
    
    
    /** A file download was changed. This update is sent only after file download list is loaded for the first time */
    export interface updateFileDownload {
        '@type': 'updateFileDownload';
        /** File identifier */
        file_id: int32;
        /** Point in time (Unix timestamp) when the file downloading was completed; 0 if the file downloading isn't completed */
        complete_date: int32;
        /** True, if downloading of the file is paused */
        is_paused: Bool;
        /** New number of being downloaded and recently downloaded files found */
        counts: downloadedFileCounts;
    }
    
    
    /** A file was removed from the file download list. This update is sent only after file download list is loaded for the first time */
    export interface updateFileRemovedFromDownloads {
        '@type': 'updateFileRemovedFromDownloads';
        /** File identifier */
        file_id: int32;
        /** New number of being downloaded and recently downloaded files found */
        counts: downloadedFileCounts;
    }
    
    
    /** New call was created or information about a call was updated */
    export interface updateCall {
        '@type': 'updateCall';
        /** New data about a call */
        call: call;
    }
    
    
    /** Information about a group call was updated */
    export interface updateGroupCall {
        '@type': 'updateGroupCall';
        /** New data about a group call */
        group_call: groupCall;
    }
    
    
    /** Information about a group call participant was changed. The updates are sent only after the group call is received through getGroupCall and only if the call is joined or being joined */
    export interface updateGroupCallParticipant {
        '@type': 'updateGroupCallParticipant';
        /** Identifier of group call */
        group_call_id: int32;
        /** New data about a participant */
        participant: groupCallParticipant;
    }
    
    
    /** New call signaling data arrived */
    export interface updateNewCallSignalingData {
        '@type': 'updateNewCallSignalingData';
        /** The call identifier */
        call_id: int32;
        /** The data */
        data: bytes;
    }
    
    
    /** Some privacy setting rules have been changed */
    export interface updateUserPrivacySettingRules {
        '@type': 'updateUserPrivacySettingRules';
        /** The privacy setting */
        setting: UserPrivacySetting;
        /** New privacy rules */
        rules: userPrivacySettingRules;
    }
    
    
    /** Number of unread messages in a chat list has changed. This update is sent only if the message database is used */
    export interface updateUnreadMessageCount {
        '@type': 'updateUnreadMessageCount';
        /** The chat list with changed number of unread messages */
        chat_list: ChatList;
        /** Total number of unread messages */
        unread_count: int32;
        /** Total number of unread messages in unmuted chats */
        unread_unmuted_count: int32;
    }
    
    
    /** Number of unread chats, i.e. with unread messages or marked as unread, has changed. This update is sent only if the message database is used */
    export interface updateUnreadChatCount {
        '@type': 'updateUnreadChatCount';
        /** The chat list with changed number of unread messages */
        chat_list: ChatList;
        /** Approximate total number of chats in the chat list */
        total_count: int32;
        /** Total number of unread chats */
        unread_count: int32;
        /** Total number of unread unmuted chats */
        unread_unmuted_count: int32;
        /** Total number of chats marked as unread */
        marked_as_unread_count: int32;
        /** Total number of unmuted chats marked as unread */
        marked_as_unread_unmuted_count: int32;
    }
    
    
    /** An option changed its value */
    export interface updateOption {
        '@type': 'updateOption';
        /** The option name */
        name: string;
        /** The new option value */
        value: OptionValue;
    }
    
    
    /** A sticker set has changed */
    export interface updateStickerSet {
        '@type': 'updateStickerSet';
        /** The sticker set */
        sticker_set: stickerSet;
    }
    
    
    /** The list of installed sticker sets was updated */
    export interface updateInstalledStickerSets {
        '@type': 'updateInstalledStickerSets';
        /** True, if the list of installed mask sticker sets was updated */
        is_masks: Bool;
        /** The new list of installed ordinary sticker sets */
        sticker_set_ids: vector<int64>;
    }
    
    
    /** The list of trending sticker sets was updated or some of them were viewed */
    export interface updateTrendingStickerSets {
        '@type': 'updateTrendingStickerSets';
        /** The prefix of the list of trending sticker sets with the newest trending sticker sets */
        sticker_sets: trendingStickerSets;
    }
    
    
    /** The list of recently used stickers was updated */
    export interface updateRecentStickers {
        '@type': 'updateRecentStickers';
        /** True, if the list of stickers attached to photo or video files was updated, otherwise the list of sent stickers is updated */
        is_attached: Bool;
        /** The new list of file identifiers of recently used stickers */
        sticker_ids: vector<int32>;
    }
    
    
    /** The list of favorite stickers was updated */
    export interface updateFavoriteStickers {
        '@type': 'updateFavoriteStickers';
        /** The new list of file identifiers of favorite stickers */
        sticker_ids: vector<int32>;
    }
    
    
    /** The list of saved animations was updated */
    export interface updateSavedAnimations {
        '@type': 'updateSavedAnimations';
        /** The new list of file identifiers of saved animations */
        animation_ids: vector<int32>;
    }
    
    
    /** The list of saved notifications sounds was updated. This update may not be sent until information about a notification sound was requested for the first time */
    export interface updateSavedNotificationSounds {
        '@type': 'updateSavedNotificationSounds';
        /** The new list of identifiers of saved notification sounds */
        notification_sound_ids: vector<int64>;
    }
    
    
    /** The selected background has changed */
    export interface updateSelectedBackground {
        '@type': 'updateSelectedBackground';
        /** True, if background for dark theme has changed */
        for_dark_theme: Bool;
        /** The new selected background; may be null */
        background?: background;
    }
    
    
    /** The list of available chat themes has changed */
    export interface updateChatThemes {
        '@type': 'updateChatThemes';
        /** The new list of chat themes */
        chat_themes: vector<chatTheme>;
    }
    
    
    /** Some language pack strings have been updated */
    export interface updateLanguagePackStrings {
        '@type': 'updateLanguagePackStrings';
        /** Localization target to which the language pack belongs */
        localization_target: string;
        /** Identifier of the updated language pack */
        language_pack_id: string;
        /** List of changed language pack strings */
        strings: vector<languagePackString>;
    }
    
    
    /** The connection state has changed. This update must be used only to show a human-readable description of the connection state */
    export interface updateConnectionState {
        '@type': 'updateConnectionState';
        /** The new connection state */
        state: ConnectionState;
    }
    
    
    /** New terms of service must be accepted by the user. If the terms of service are declined, then the deleteAccount method must be called with the reason "Decline ToS update" */
    export interface updateTermsOfService {
        '@type': 'updateTermsOfService';
        /** Identifier of the terms of service */
        terms_of_service_id: string;
        /** The new terms of service */
        terms_of_service: termsOfService;
    }
    
    
    /** The list of users nearby has changed. The update is guaranteed to be sent only 60 seconds after a successful searchChatsNearby request */
    export interface updateUsersNearby {
        '@type': 'updateUsersNearby';
        /** The new list of users nearby */
        users_nearby: vector<chatNearby>;
    }
    
    
    /** The list of bots added to attachment menu has changed */
    export interface updateAttachmentMenuBots {
        '@type': 'updateAttachmentMenuBots';
        /** The new list of bots added to attachment menu. The bots must not be shown on scheduled messages screen */
        bots: vector<attachmentMenuBot>;
    }
    
    
    /** A message was sent by an opened Web App, so the Web App needs to be closed */
    export interface updateWebAppMessageSent {
        '@type': 'updateWebAppMessageSent';
        /** Identifier of Web App launch */
        web_app_launch_id: int64;
    }
    
    
    /** The list of supported reactions has changed */
    export interface updateReactions {
        '@type': 'updateReactions';
        /** The new list of supported reactions */
        reactions: vector<reaction>;
    }
    
    
    /** The list of supported dice emojis has changed */
    export interface updateDiceEmojis {
        '@type': 'updateDiceEmojis';
        /** The new list of supported dice emojis */
        emojis: vector<string>;
    }
    
    
    /** Some animated emoji message was clicked and a big animated sticker must be played if the message is visible on the screen. chatActionWatchingAnimations with the text of the message needs to be sent if the sticker is played */
    export interface updateAnimatedEmojiMessageClicked {
        '@type': 'updateAnimatedEmojiMessageClicked';
        /** Chat identifier */
        chat_id: int53;
        /** Message identifier */
        message_id: int53;
        /** The animated sticker to be played */
        sticker: sticker;
    }
    
    
    /** The parameters of animation search through GetOption("animation_search_bot_username") bot has changed */
    export interface updateAnimationSearchParameters {
        '@type': 'updateAnimationSearchParameters';
        /** Name of the animation search provider */
        provider: string;
        /** The new list of emojis suggested for searching */
        emojis: vector<string>;
    }
    
    
    /** The list of suggested to the user actions has changed */
    export interface updateSuggestedActions {
        '@type': 'updateSuggestedActions';
        /** Added suggested actions */
        added_actions: vector<SuggestedAction>;
        /** Removed suggested actions */
        removed_actions: vector<SuggestedAction>;
    }
    
    
    /** A new incoming inline query; for bots only */
    export interface updateNewInlineQuery {
        '@type': 'updateNewInlineQuery';
        /** Unique query identifier */
        id: int64;
        /** Identifier of the user who sent the query */
        sender_user_id: int53;
        /** User location; may be null */
        user_location?: location;
        /** The type of the chat from which the query originated; may be null if unknown */
        chat_type?: ChatType;
        /** Text of the query */
        query: string;
        /** Offset of the first entry to return */
        offset: string;
    }
    
    
    /** The user has chosen a result of an inline query; for bots only */
    export interface updateNewChosenInlineResult {
        '@type': 'updateNewChosenInlineResult';
        /** Identifier of the user who sent the query */
        sender_user_id: int53;
        /** User location; may be null */
        user_location?: location;
        /** Text of the query */
        query: string;
        /** Identifier of the chosen result */
        result_id: string;
        /** Identifier of the sent inline message, if known */
        inline_message_id: string;
    }
    
    
    /** A new incoming callback query; for bots only */
    export interface updateNewCallbackQuery {
        '@type': 'updateNewCallbackQuery';
        /** Unique query identifier */
        id: int64;
        /** Identifier of the user who sent the query */
        sender_user_id: int53;
        /** Identifier of the chat where the query was sent */
        chat_id: int53;
        /** Identifier of the message from which the query originated */
        message_id: int53;
        /** Identifier that uniquely corresponds to the chat to which the message was sent */
        chat_instance: int64;
        /** Query payload */
        payload: CallbackQueryPayload;
    }
    
    
    /** A new incoming callback query from a message sent via a bot; for bots only */
    export interface updateNewInlineCallbackQuery {
        '@type': 'updateNewInlineCallbackQuery';
        /** Unique query identifier */
        id: int64;
        /** Identifier of the user who sent the query */
        sender_user_id: int53;
        /** Identifier of the inline message from which the query originated */
        inline_message_id: string;
        /** An identifier uniquely corresponding to the chat a message was sent to */
        chat_instance: int64;
        /** Query payload */
        payload: CallbackQueryPayload;
    }
    
    
    /** A new incoming shipping query; for bots only. Only for invoices with flexible price */
    export interface updateNewShippingQuery {
        '@type': 'updateNewShippingQuery';
        /** Unique query identifier */
        id: int64;
        /** Identifier of the user who sent the query */
        sender_user_id: int53;
        /** Invoice payload */
        invoice_payload: string;
        /** User shipping address */
        shipping_address: address;
    }
    
    
    /** A new incoming pre-checkout query; for bots only. Contains full information about a checkout */
    export interface updateNewPreCheckoutQuery {
        '@type': 'updateNewPreCheckoutQuery';
        /** Unique query identifier */
        id: int64;
        /** Identifier of the user who sent the query */
        sender_user_id: int53;
        /** Currency for the product price */
        currency: string;
        /** Total price for the product, in the smallest units of the currency */
        total_amount: int53;
        /** Invoice payload */
        invoice_payload: bytes;
        /** Identifier of a shipping option chosen by the user; may be empty if not applicable */
        shipping_option_id: string;
        /** Information about the order; may be null */
        order_info?: orderInfo;
    }
    
    
    /** A new incoming event; for bots only */
    export interface updateNewCustomEvent {
        '@type': 'updateNewCustomEvent';
        /** A JSON-serialized event */
        event: string;
    }
    
    
    /** A new incoming query; for bots only */
    export interface updateNewCustomQuery {
        '@type': 'updateNewCustomQuery';
        /** The query identifier */
        id: int64;
        /** JSON-serialized query data */
        data: string;
        /** Query timeout */
        timeout: int32;
    }
    
    
    /** A poll was updated; for bots only */
    export interface updatePoll {
        '@type': 'updatePoll';
        /** New data about the poll */
        poll: poll;
    }
    
    
    /** A user changed the answer to a poll; for bots only */
    export interface updatePollAnswer {
        '@type': 'updatePollAnswer';
        /** Unique poll identifier */
        poll_id: int64;
        /** The user, who changed the answer to the poll */
        user_id: int53;
        /** 0-based identifiers of answer options, chosen by the user */
        option_ids: vector<int32>;
    }
    
    
    /** User rights changed in a chat; for bots only */
    export interface updateChatMember {
        '@type': 'updateChatMember';
        /** Chat identifier */
        chat_id: int53;
        /** Identifier of the user, changing the rights */
        actor_user_id: int53;
        /** Point in time (Unix timestamp) when the user rights was changed */
        date: int32;
        /** If user has joined the chat using an invite link, the invite link; may be null */
        invite_link?: chatInviteLink;
        /** Previous chat member */
        old_chat_member: chatMember;
        /** New chat member */
        new_chat_member: chatMember;
    }
    
    
    /** A user sent a join request to a chat; for bots only */
    export interface updateNewChatJoinRequest {
        '@type': 'updateNewChatJoinRequest';
        /** Chat identifier */
        chat_id: int53;
        /** Join request */
        request: chatJoinRequest;
        /** The invite link, which was used to send join request; may be null */
        invite_link?: chatInviteLink;
    }
    
    
    /** Contains a list of updates */
    export interface updates {
        '@type': 'updates';
        /** List of updates */
        updates: vector<Update>;
    }
    
    
    /** The log is written to stderr or an OS specific log */
    export interface logStreamDefault {
        '@type': 'logStreamDefault';
    }
    
    
    /** The log is written to a file */
    export interface logStreamFile {
        '@type': 'logStreamFile';
        /** Path to the file to where the internal TDLib log will be written */
        path: string;
        /** The maximum size of the file to where the internal TDLib log is written before the file will automatically be rotated, in bytes */
        max_file_size: int53;
        /** Pass true to additionally redirect stderr to the log file. Ignored on Windows */
        redirect_stderr: Bool;
    }
    
    
    /** The log is written nowhere */
    export interface logStreamEmpty {
        '@type': 'logStreamEmpty';
    }
    
    
    /** Contains a TDLib internal log verbosity level */
    export interface logVerbosityLevel {
        '@type': 'logVerbosityLevel';
        /** Log verbosity level */
        verbosity_level: int32;
    }
    
    
    /** Contains a list of available TDLib internal log tags */
    export interface logTags {
        '@type': 'logTags';
        /** List of log tags */
        tags: vector<string>;
    }
    
    
    /** A simple object containing a number; for testing only */
    export interface testInt {
        '@type': 'testInt';
        /** Number */
        value: int32;
    }
    
    
    /** A simple object containing a string; for testing only */
    export interface testString {
        '@type': 'testString';
        /** String */
        value: string;
    }
    
    
    /** A simple object containing a sequence of bytes; for testing only */
    export interface testBytes {
        '@type': 'testBytes';
        /** Bytes */
        value: bytes;
    }
    
    
    /** A simple object containing a vector of numbers; for testing only */
    export interface testVectorInt {
        '@type': 'testVectorInt';
        /** Vector of numbers */
        value: vector<int32>;
    }
    
    
    /** A simple object containing a vector of objects that hold a number; for testing only */
    export interface testVectorIntObject {
        '@type': 'testVectorIntObject';
        /** Vector of objects */
        value: vector<testInt>;
    }
    
    
    /** A simple object containing a vector of strings; for testing only */
    export interface testVectorString {
        '@type': 'testVectorString';
        /** Vector of strings */
        value: vector<string>;
    }
    
    
    /** A simple object containing a vector of objects that hold a string; for testing only */
    export interface testVectorStringObject {
        '@type': 'testVectorStringObject';
        /** Vector of objects */
        value: vector<testString>;
    }
    
    
    /** TDLib has encountered a fatal error */
    export interface updateFatalError {
        '@type': 'updateFatalError';
        /** Error message */
        error: string;
    }
    
    
    /** A file from a JavaScript Blob */
    export interface inputFileBlob {
        '@type': 'inputFileBlob';
        /** JavaScript blob containing file data */
        data: blob;
    }
    
    
    export type Error = error;
    export type Ok = ok;
    export type TdlibParameters = tdlibParameters;
    export type AuthenticationCodeType = authenticationCodeTypeTelegramMessage | authenticationCodeTypeSms | authenticationCodeTypeCall | authenticationCodeTypeFlashCall | authenticationCodeTypeMissedCall;
    export type AuthenticationCodeInfo = authenticationCodeInfo;
    export type EmailAddressAuthenticationCodeInfo = emailAddressAuthenticationCodeInfo;
    export type TextEntity = textEntity;
    export type TextEntities = textEntities;
    export type FormattedText = formattedText;
    export type TermsOfService = termsOfService;
    export type AuthorizationState = authorizationStateWaitTdlibParameters | authorizationStateWaitEncryptionKey | authorizationStateWaitPhoneNumber | authorizationStateWaitCode | authorizationStateWaitOtherDeviceConfirmation | authorizationStateWaitRegistration | authorizationStateWaitPassword | authorizationStateReady | authorizationStateLoggingOut | authorizationStateClosing | authorizationStateClosed;
    export type PasswordState = passwordState;
    export type RecoveryEmailAddress = recoveryEmailAddress;
    export type TemporaryPasswordState = temporaryPasswordState;
    export type LocalFile = localFile;
    export type RemoteFile = remoteFile;
    export type File = file;
    export type InputFile = inputFileId | inputFileRemote | inputFileLocal | inputFileGenerated | inputFileBlob;
    export type PhotoSize = photoSize;
    export type Minithumbnail = minithumbnail;
    export type ThumbnailFormat = thumbnailFormatJpeg | thumbnailFormatGif | thumbnailFormatMpeg4 | thumbnailFormatPng | thumbnailFormatTgs | thumbnailFormatWebm | thumbnailFormatWebp;
    export type Thumbnail = thumbnail;
    export type MaskPoint = maskPointForehead | maskPointEyes | maskPointMouth | maskPointChin;
    export type MaskPosition = maskPosition;
    export type StickerType = stickerTypeStatic | stickerTypeAnimated | stickerTypeVideo | stickerTypeMask;
    export type ClosedVectorPath = closedVectorPath;
    export type PollOption = pollOption;
    export type PollType = pollTypeRegular | pollTypeQuiz;
    export type Animation = animation;
    export type Audio = audio;
    export type Document = document;
    export type Photo = photo;
    export type Sticker = sticker;
    export type Video = video;
    export type VideoNote = videoNote;
    export type VoiceNote = voiceNote;
    export type AnimatedEmoji = animatedEmoji;
    export type Contact = contact;
    export type Location = location;
    export type Venue = venue;
    export type Game = game;
    export type Poll = poll;
    export type ProfilePhoto = profilePhoto;
    export type ChatPhotoInfo = chatPhotoInfo;
    export type UserType = userTypeRegular | userTypeDeleted | userTypeBot | userTypeUnknown;
    export type BotCommand = botCommand;
    export type BotCommands = botCommands;
    export type BotMenuButton = botMenuButton;
    export type ChatLocation = chatLocation;
    export type AnimatedChatPhoto = animatedChatPhoto;
    export type ChatPhoto = chatPhoto;
    export type ChatPhotos = chatPhotos;
    export type InputChatPhoto = inputChatPhotoPrevious | inputChatPhotoStatic | inputChatPhotoAnimation;
    export type ChatPermissions = chatPermissions;
    export type ChatAdministratorRights = chatAdministratorRights;
    export type User = user;
    export type BotInfo = botInfo;
    export type UserFullInfo = userFullInfo;
    export type Users = users;
    export type ChatAdministrator = chatAdministrator;
    export type ChatAdministrators = chatAdministrators;
    export type ChatMemberStatus = chatMemberStatusCreator | chatMemberStatusAdministrator | chatMemberStatusMember | chatMemberStatusRestricted | chatMemberStatusLeft | chatMemberStatusBanned;
    export type ChatMember = chatMember;
    export type ChatMembers = chatMembers;
    export type ChatMembersFilter = chatMembersFilterContacts | chatMembersFilterAdministrators | chatMembersFilterMembers | chatMembersFilterMention | chatMembersFilterRestricted | chatMembersFilterBanned | chatMembersFilterBots;
    export type SupergroupMembersFilter = supergroupMembersFilterRecent | supergroupMembersFilterContacts | supergroupMembersFilterAdministrators | supergroupMembersFilterSearch | supergroupMembersFilterRestricted | supergroupMembersFilterBanned | supergroupMembersFilterMention | supergroupMembersFilterBots;
    export type ChatInviteLink = chatInviteLink;
    export type ChatInviteLinks = chatInviteLinks;
    export type ChatInviteLinkCount = chatInviteLinkCount;
    export type ChatInviteLinkCounts = chatInviteLinkCounts;
    export type ChatInviteLinkMember = chatInviteLinkMember;
    export type ChatInviteLinkMembers = chatInviteLinkMembers;
    export type ChatInviteLinkInfo = chatInviteLinkInfo;
    export type ChatJoinRequest = chatJoinRequest;
    export type ChatJoinRequests = chatJoinRequests;
    export type ChatJoinRequestsInfo = chatJoinRequestsInfo;
    export type BasicGroup = basicGroup;
    export type BasicGroupFullInfo = basicGroupFullInfo;
    export type Supergroup = supergroup;
    export type SupergroupFullInfo = supergroupFullInfo;
    export type SecretChatState = secretChatStatePending | secretChatStateReady | secretChatStateClosed;
    export type SecretChat = secretChat;
    export type MessageSender = messageSenderUser | messageSenderChat;
    export type MessageSenders = messageSenders;
    export type MessageForwardOrigin = messageForwardOriginUser | messageForwardOriginChat | messageForwardOriginHiddenUser | messageForwardOriginChannel | messageForwardOriginMessageImport;
    export type MessageForwardInfo = messageForwardInfo;
    export type MessageReplyInfo = messageReplyInfo;
    export type MessageReaction = messageReaction;
    export type MessageInteractionInfo = messageInteractionInfo;
    export type UnreadReaction = unreadReaction;
    export type MessageSendingState = messageSendingStatePending | messageSendingStateFailed;
    export type Message = message;
    export type Messages = messages;
    export type FoundMessages = foundMessages;
    export type MessagePosition = messagePosition;
    export type MessagePositions = messagePositions;
    export type MessageCalendarDay = messageCalendarDay;
    export type MessageCalendar = messageCalendar;
    export type SponsoredMessage = sponsoredMessage;
    export type FileDownload = fileDownload;
    export type DownloadedFileCounts = downloadedFileCounts;
    export type FoundFileDownloads = foundFileDownloads;
    export type NotificationSettingsScope = notificationSettingsScopePrivateChats | notificationSettingsScopeGroupChats | notificationSettingsScopeChannelChats;
    export type ChatNotificationSettings = chatNotificationSettings;
    export type ScopeNotificationSettings = scopeNotificationSettings;
    export type DraftMessage = draftMessage;
    export type ChatType = chatTypePrivate | chatTypeBasicGroup | chatTypeSupergroup | chatTypeSecret;
    export type ChatFilter = chatFilter;
    export type ChatFilterInfo = chatFilterInfo;
    export type RecommendedChatFilter = recommendedChatFilter;
    export type RecommendedChatFilters = recommendedChatFilters;
    export type ChatList = chatListMain | chatListArchive | chatListFilter;
    export type ChatLists = chatLists;
    export type ChatSource = chatSourceMtprotoProxy | chatSourcePublicServiceAnnouncement;
    export type ChatPosition = chatPosition;
    export type VideoChat = videoChat;
    export type Chat = chat;
    export type Chats = chats;
    export type ChatNearby = chatNearby;
    export type ChatsNearby = chatsNearby;
    export type PublicChatType = publicChatTypeHasUsername | publicChatTypeIsLocationBased;
    export type ChatActionBar = chatActionBarReportSpam | chatActionBarReportUnrelatedLocation | chatActionBarInviteMembers | chatActionBarReportAddBlock | chatActionBarAddContact | chatActionBarSharePhoneNumber | chatActionBarJoinRequest;
    export type KeyboardButtonType = keyboardButtonTypeText | keyboardButtonTypeRequestPhoneNumber | keyboardButtonTypeRequestLocation | keyboardButtonTypeRequestPoll | keyboardButtonTypeWebApp;
    export type KeyboardButton = keyboardButton;
    export type InlineKeyboardButtonType = inlineKeyboardButtonTypeUrl | inlineKeyboardButtonTypeLoginUrl | inlineKeyboardButtonTypeWebApp | inlineKeyboardButtonTypeCallback | inlineKeyboardButtonTypeCallbackWithPassword | inlineKeyboardButtonTypeCallbackGame | inlineKeyboardButtonTypeSwitchInline | inlineKeyboardButtonTypeBuy | inlineKeyboardButtonTypeUser;
    export type InlineKeyboardButton = inlineKeyboardButton;
    export type ReplyMarkup = replyMarkupRemoveKeyboard | replyMarkupForceReply | replyMarkupShowKeyboard | replyMarkupInlineKeyboard;
    export type LoginUrlInfo = loginUrlInfoOpen | loginUrlInfoRequestConfirmation;
    export type WebAppInfo = webAppInfo;
    export type MessageThreadInfo = messageThreadInfo;
    export type RichText = richTextPlain | richTextBold | richTextItalic | richTextUnderline | richTextStrikethrough | richTextFixed | richTextUrl | richTextEmailAddress | richTextSubscript | richTextSuperscript | richTextMarked | richTextPhoneNumber | richTextIcon | richTextReference | richTextAnchor | richTextAnchorLink | richTexts;
    export type PageBlockCaption = pageBlockCaption;
    export type PageBlockListItem = pageBlockListItem;
    export type PageBlockHorizontalAlignment = pageBlockHorizontalAlignmentLeft | pageBlockHorizontalAlignmentCenter | pageBlockHorizontalAlignmentRight;
    export type PageBlockVerticalAlignment = pageBlockVerticalAlignmentTop | pageBlockVerticalAlignmentMiddle | pageBlockVerticalAlignmentBottom;
    export type PageBlockTableCell = pageBlockTableCell;
    export type PageBlockRelatedArticle = pageBlockRelatedArticle;
    export type PageBlock = pageBlockTitle | pageBlockSubtitle | pageBlockAuthorDate | pageBlockHeader | pageBlockSubheader | pageBlockKicker | pageBlockParagraph | pageBlockPreformatted | pageBlockFooter | pageBlockDivider | pageBlockAnchor | pageBlockList | pageBlockBlockQuote | pageBlockPullQuote | pageBlockAnimation | pageBlockAudio | pageBlockPhoto | pageBlockVideo | pageBlockVoiceNote | pageBlockCover | pageBlockEmbedded | pageBlockEmbeddedPost | pageBlockCollage | pageBlockSlideshow | pageBlockChatLink | pageBlockTable | pageBlockDetails | pageBlockRelatedArticles | pageBlockMap;
    export type WebPageInstantView = webPageInstantView;
    export type WebPage = webPage;
    export type CountryInfo = countryInfo;
    export type Countries = countries;
    export type PhoneNumberInfo = phoneNumberInfo;
    export type BankCardActionOpenUrl = bankCardActionOpenUrl;
    export type BankCardInfo = bankCardInfo;
    export type Address = address;
    export type ThemeParameters = themeParameters;
    export type LabeledPricePart = labeledPricePart;
    export type Invoice = invoice;
    export type OrderInfo = orderInfo;
    export type ShippingOption = shippingOption;
    export type SavedCredentials = savedCredentials;
    export type InputCredentials = inputCredentialsSaved | inputCredentialsNew | inputCredentialsApplePay | inputCredentialsGooglePay;
    export type PaymentProvider = paymentProviderSmartGlocal | paymentProviderStripe | paymentProviderOther;
    export type PaymentForm = paymentForm;
    export type ValidatedOrderInfo = validatedOrderInfo;
    export type PaymentResult = paymentResult;
    export type PaymentReceipt = paymentReceipt;
    export type InputInvoice = inputInvoiceMessage | inputInvoiceName;
    export type DatedFile = datedFile;
    export type PassportElementType = passportElementTypePersonalDetails | passportElementTypePassport | passportElementTypeDriverLicense | passportElementTypeIdentityCard | passportElementTypeInternalPassport | passportElementTypeAddress | passportElementTypeUtilityBill | passportElementTypeBankStatement | passportElementTypeRentalAgreement | passportElementTypePassportRegistration | passportElementTypeTemporaryRegistration | passportElementTypePhoneNumber | passportElementTypeEmailAddress;
    export type Date = date;
    export type PersonalDetails = personalDetails;
    export type IdentityDocument = identityDocument;
    export type InputIdentityDocument = inputIdentityDocument;
    export type PersonalDocument = personalDocument;
    export type InputPersonalDocument = inputPersonalDocument;
    export type PassportElement = passportElementPersonalDetails | passportElementPassport | passportElementDriverLicense | passportElementIdentityCard | passportElementInternalPassport | passportElementAddress | passportElementUtilityBill | passportElementBankStatement | passportElementRentalAgreement | passportElementPassportRegistration | passportElementTemporaryRegistration | passportElementPhoneNumber | passportElementEmailAddress;
    export type InputPassportElement = inputPassportElementPersonalDetails | inputPassportElementPassport | inputPassportElementDriverLicense | inputPassportElementIdentityCard | inputPassportElementInternalPassport | inputPassportElementAddress | inputPassportElementUtilityBill | inputPassportElementBankStatement | inputPassportElementRentalAgreement | inputPassportElementPassportRegistration | inputPassportElementTemporaryRegistration | inputPassportElementPhoneNumber | inputPassportElementEmailAddress;
    export type PassportElements = passportElements;
    export type PassportElementErrorSource = passportElementErrorSourceUnspecified | passportElementErrorSourceDataField | passportElementErrorSourceFrontSide | passportElementErrorSourceReverseSide | passportElementErrorSourceSelfie | passportElementErrorSourceTranslationFile | passportElementErrorSourceTranslationFiles | passportElementErrorSourceFile | passportElementErrorSourceFiles;
    export type PassportElementError = passportElementError;
    export type PassportSuitableElement = passportSuitableElement;
    export type PassportRequiredElement = passportRequiredElement;
    export type PassportAuthorizationForm = passportAuthorizationForm;
    export type PassportElementsWithErrors = passportElementsWithErrors;
    export type EncryptedCredentials = encryptedCredentials;
    export type EncryptedPassportElement = encryptedPassportElement;
    export type InputPassportElementErrorSource = inputPassportElementErrorSourceUnspecified | inputPassportElementErrorSourceDataField | inputPassportElementErrorSourceFrontSide | inputPassportElementErrorSourceReverseSide | inputPassportElementErrorSourceSelfie | inputPassportElementErrorSourceTranslationFile | inputPassportElementErrorSourceTranslationFiles | inputPassportElementErrorSourceFile | inputPassportElementErrorSourceFiles;
    export type InputPassportElementError = inputPassportElementError;
    export type MessageContent = messageText | messageAnimation | messageAudio | messageDocument | messagePhoto | messageExpiredPhoto | messageSticker | messageVideo | messageExpiredVideo | messageVideoNote | messageVoiceNote | messageLocation | messageVenue | messageContact | messageAnimatedEmoji | messageDice | messageGame | messagePoll | messageInvoice | messageCall | messageVideoChatScheduled | messageVideoChatStarted | messageVideoChatEnded | messageInviteVideoChatParticipants | messageBasicGroupChatCreate | messageSupergroupChatCreate | messageChatChangeTitle | messageChatChangePhoto | messageChatDeletePhoto | messageChatAddMembers | messageChatJoinByLink | messageChatJoinByRequest | messageChatDeleteMember | messageChatUpgradeTo | messageChatUpgradeFrom | messagePinMessage | messageScreenshotTaken | messageChatSetTheme | messageChatSetTtl | messageCustomServiceAction | messageGameScore | messagePaymentSuccessful | messagePaymentSuccessfulBot | messageContactRegistered | messageWebsiteConnected | messageWebAppDataSent | messageWebAppDataReceived | messagePassportDataSent | messagePassportDataReceived | messageProximityAlertTriggered | messageUnsupported;
    export type TextEntityType = textEntityTypeMention | textEntityTypeHashtag | textEntityTypeCashtag | textEntityTypeBotCommand | textEntityTypeUrl | textEntityTypeEmailAddress | textEntityTypePhoneNumber | textEntityTypeBankCardNumber | textEntityTypeBold | textEntityTypeItalic | textEntityTypeUnderline | textEntityTypeStrikethrough | textEntityTypeSpoiler | textEntityTypeCode | textEntityTypePre | textEntityTypePreCode | textEntityTypeTextUrl | textEntityTypeMentionName | textEntityTypeMediaTimestamp;
    export type InputThumbnail = inputThumbnail;
    export type MessageSchedulingState = messageSchedulingStateSendAtDate | messageSchedulingStateSendWhenOnline;
    export type MessageSendOptions = messageSendOptions;
    export type MessageCopyOptions = messageCopyOptions;
    export type InputMessageContent = inputMessageText | inputMessageAnimation | inputMessageAudio | inputMessageDocument | inputMessagePhoto | inputMessageSticker | inputMessageVideo | inputMessageVideoNote | inputMessageVoiceNote | inputMessageLocation | inputMessageVenue | inputMessageContact | inputMessageDice | inputMessageGame | inputMessageInvoice | inputMessagePoll | inputMessageForwarded;
    export type SearchMessagesFilter = searchMessagesFilterEmpty | searchMessagesFilterAnimation | searchMessagesFilterAudio | searchMessagesFilterDocument | searchMessagesFilterPhoto | searchMessagesFilterVideo | searchMessagesFilterVoiceNote | searchMessagesFilterPhotoAndVideo | searchMessagesFilterUrl | searchMessagesFilterChatPhoto | searchMessagesFilterVideoNote | searchMessagesFilterVoiceAndVideoNote | searchMessagesFilterMention | searchMessagesFilterUnreadMention | searchMessagesFilterUnreadReaction | searchMessagesFilterFailedToSend | searchMessagesFilterPinned;
    export type ChatAction = chatActionTyping | chatActionRecordingVideo | chatActionUploadingVideo | chatActionRecordingVoiceNote | chatActionUploadingVoiceNote | chatActionUploadingPhoto | chatActionUploadingDocument | chatActionChoosingSticker | chatActionChoosingLocation | chatActionChoosingContact | chatActionStartPlayingGame | chatActionRecordingVideoNote | chatActionUploadingVideoNote | chatActionWatchingAnimations | chatActionCancel;
    export type UserStatus = userStatusEmpty | userStatusOnline | userStatusOffline | userStatusRecently | userStatusLastWeek | userStatusLastMonth;
    export type Stickers = stickers;
    export type Emojis = emojis;
    export type StickerSet = stickerSet;
    export type StickerSetInfo = stickerSetInfo;
    export type StickerSets = stickerSets;
    export type TrendingStickerSets = trendingStickerSets;
    export type CallDiscardReason = callDiscardReasonEmpty | callDiscardReasonMissed | callDiscardReasonDeclined | callDiscardReasonDisconnected | callDiscardReasonHungUp;
    export type CallProtocol = callProtocol;
    export type CallServerType = callServerTypeTelegramReflector | callServerTypeWebrtc;
    export type CallServer = callServer;
    export type CallId = callId;
    export type GroupCallId = groupCallId;
    export type CallState = callStatePending | callStateExchangingKeys | callStateReady | callStateHangingUp | callStateDiscarded | callStateError;
    export type GroupCallVideoQuality = groupCallVideoQualityThumbnail | groupCallVideoQualityMedium | groupCallVideoQualityFull;
    export type GroupCallStream = groupCallStream;
    export type GroupCallStreams = groupCallStreams;
    export type RtmpUrl = rtmpUrl;
    export type GroupCallRecentSpeaker = groupCallRecentSpeaker;
    export type GroupCall = groupCall;
    export type GroupCallVideoSourceGroup = groupCallVideoSourceGroup;
    export type GroupCallParticipantVideoInfo = groupCallParticipantVideoInfo;
    export type GroupCallParticipant = groupCallParticipant;
    export type CallProblem = callProblemEcho | callProblemNoise | callProblemInterruptions | callProblemDistortedSpeech | callProblemSilentLocal | callProblemSilentRemote | callProblemDropped | callProblemDistortedVideo | callProblemPixelatedVideo;
    export type Call = call;
    export type PhoneNumberAuthenticationSettings = phoneNumberAuthenticationSettings;
    export type AddedReaction = addedReaction;
    export type AddedReactions = addedReactions;
    export type AvailableReaction = availableReaction;
    export type AvailableReactions = availableReactions;
    export type Reaction = reaction;
    export type Animations = animations;
    export type DiceStickers = diceStickersRegular | diceStickersSlotMachine;
    export type ImportedContacts = importedContacts;
    export type AttachmentMenuBotColor = attachmentMenuBotColor;
    export type AttachmentMenuBot = attachmentMenuBot;
    export type SentWebAppMessage = sentWebAppMessage;
    export type HttpUrl = httpUrl;
    export type InputInlineQueryResult = inputInlineQueryResultAnimation | inputInlineQueryResultArticle | inputInlineQueryResultAudio | inputInlineQueryResultContact | inputInlineQueryResultDocument | inputInlineQueryResultGame | inputInlineQueryResultLocation | inputInlineQueryResultPhoto | inputInlineQueryResultSticker | inputInlineQueryResultVenue | inputInlineQueryResultVideo | inputInlineQueryResultVoiceNote;
    export type InlineQueryResult = inlineQueryResultArticle | inlineQueryResultContact | inlineQueryResultLocation | inlineQueryResultVenue | inlineQueryResultGame | inlineQueryResultAnimation | inlineQueryResultAudio | inlineQueryResultDocument | inlineQueryResultPhoto | inlineQueryResultSticker | inlineQueryResultVideo | inlineQueryResultVoiceNote;
    export type InlineQueryResults = inlineQueryResults;
    export type CallbackQueryPayload = callbackQueryPayloadData | callbackQueryPayloadDataWithPassword | callbackQueryPayloadGame;
    export type CallbackQueryAnswer = callbackQueryAnswer;
    export type CustomRequestResult = customRequestResult;
    export type GameHighScore = gameHighScore;
    export type GameHighScores = gameHighScores;
    export type ChatEventAction = chatEventMessageEdited | chatEventMessageDeleted | chatEventMessagePinned | chatEventMessageUnpinned | chatEventPollStopped | chatEventMemberJoined | chatEventMemberJoinedByInviteLink | chatEventMemberJoinedByRequest | chatEventMemberInvited | chatEventMemberLeft | chatEventMemberPromoted | chatEventMemberRestricted | chatEventAvailableReactionsChanged | chatEventDescriptionChanged | chatEventLinkedChatChanged | chatEventLocationChanged | chatEventMessageTtlChanged | chatEventPermissionsChanged | chatEventPhotoChanged | chatEventSlowModeDelayChanged | chatEventStickerSetChanged | chatEventTitleChanged | chatEventUsernameChanged | chatEventHasProtectedContentToggled | chatEventInvitesToggled | chatEventIsAllHistoryAvailableToggled | chatEventSignMessagesToggled | chatEventInviteLinkEdited | chatEventInviteLinkRevoked | chatEventInviteLinkDeleted | chatEventVideoChatCreated | chatEventVideoChatEnded | chatEventVideoChatMuteNewParticipantsToggled | chatEventVideoChatParticipantIsMutedToggled | chatEventVideoChatParticipantVolumeLevelChanged;
    export type ChatEvent = chatEvent;
    export type ChatEvents = chatEvents;
    export type ChatEventLogFilters = chatEventLogFilters;
    export type LanguagePackStringValue = languagePackStringValueOrdinary | languagePackStringValuePluralized | languagePackStringValueDeleted;
    export type LanguagePackString = languagePackString;
    export type LanguagePackStrings = languagePackStrings;
    export type LanguagePackInfo = languagePackInfo;
    export type LocalizationTargetInfo = localizationTargetInfo;
    export type PremiumLimitType = premiumLimitTypeSupergroupCount | premiumLimitTypePinnedChatCount | premiumLimitTypeCreatedPublicChatCount | premiumLimitTypeSavedAnimationCount | premiumLimitTypeFavoriteStickerCount | premiumLimitTypeChatFilterCount | premiumLimitTypeChatFilterChosenChatCount | premiumLimitTypePinnedArchivedChatCount | premiumLimitTypeCaptionLength | premiumLimitTypeBioLength;
    export type PremiumFeature = premiumFeatureIncreasedLimits | premiumFeatureIncreasedUploadFileSize | premiumFeatureImprovedDownloadSpeed | premiumFeatureVoiceRecognition | premiumFeatureDisabledAds | premiumFeatureUniqueReactions | premiumFeatureUniqueStickers | premiumFeatureAdvancedChatManagement | premiumFeatureProfileBadge | premiumFeatureAnimatedProfilePhoto | premiumFeatureAppIcons;
    export type PremiumLimit = premiumLimit;
    export type PremiumFeatures = premiumFeatures;
    export type PremiumSource = premiumSourceLimitExceeded | premiumSourceFeature | premiumSourceLink | premiumSourceSettings;
    export type PremiumFeaturePromotionAnimation = premiumFeaturePromotionAnimation;
    export type PremiumState = premiumState;
    export type DeviceToken = deviceTokenFirebaseCloudMessaging | deviceTokenApplePush | deviceTokenApplePushVoIP | deviceTokenWindowsPush | deviceTokenMicrosoftPush | deviceTokenMicrosoftPushVoIP | deviceTokenWebPush | deviceTokenSimplePush | deviceTokenUbuntuPush | deviceTokenBlackBerryPush | deviceTokenTizenPush;
    export type PushReceiverId = pushReceiverId;
    export type BackgroundFill = backgroundFillSolid | backgroundFillGradient | backgroundFillFreeformGradient;
    export type BackgroundType = backgroundTypeWallpaper | backgroundTypePattern | backgroundTypeFill;
    export type Background = background;
    export type Backgrounds = backgrounds;
    export type InputBackground = inputBackgroundLocal | inputBackgroundRemote;
    export type ThemeSettings = themeSettings;
    export type ChatTheme = chatTheme;
    export type Hashtags = hashtags;
    export type CanTransferOwnershipResult = canTransferOwnershipResultOk | canTransferOwnershipResultPasswordNeeded | canTransferOwnershipResultPasswordTooFresh | canTransferOwnershipResultSessionTooFresh;
    export type CheckChatUsernameResult = checkChatUsernameResultOk | checkChatUsernameResultUsernameInvalid | checkChatUsernameResultUsernameOccupied | checkChatUsernameResultPublicChatsTooMuch | checkChatUsernameResultPublicGroupsUnavailable;
    export type CheckStickerSetNameResult = checkStickerSetNameResultOk | checkStickerSetNameResultNameInvalid | checkStickerSetNameResultNameOccupied;
    export type ResetPasswordResult = resetPasswordResultOk | resetPasswordResultPending | resetPasswordResultDeclined;
    export type MessageFileType = messageFileTypePrivate | messageFileTypeGroup | messageFileTypeUnknown;
    export type PushMessageContent = pushMessageContentHidden | pushMessageContentAnimation | pushMessageContentAudio | pushMessageContentContact | pushMessageContentContactRegistered | pushMessageContentDocument | pushMessageContentGame | pushMessageContentGameScore | pushMessageContentInvoice | pushMessageContentLocation | pushMessageContentPhoto | pushMessageContentPoll | pushMessageContentScreenshotTaken | pushMessageContentSticker | pushMessageContentText | pushMessageContentVideo | pushMessageContentVideoNote | pushMessageContentVoiceNote | pushMessageContentBasicGroupChatCreate | pushMessageContentChatAddMembers | pushMessageContentChatChangePhoto | pushMessageContentChatChangeTitle | pushMessageContentChatSetTheme | pushMessageContentChatDeleteMember | pushMessageContentChatJoinByLink | pushMessageContentChatJoinByRequest | pushMessageContentRecurringPayment | pushMessageContentMessageForwards | pushMessageContentMediaAlbum;
    export type NotificationType = notificationTypeNewMessage | notificationTypeNewSecretChat | notificationTypeNewCall | notificationTypeNewPushMessage;
    export type NotificationGroupType = notificationGroupTypeMessages | notificationGroupTypeMentions | notificationGroupTypeSecretChat | notificationGroupTypeCalls;
    export type NotificationSound = notificationSound;
    export type NotificationSounds = notificationSounds;
    export type Notification = notification;
    export type NotificationGroup = notificationGroup;
    export type OptionValue = optionValueBoolean | optionValueEmpty | optionValueInteger | optionValueString;
    export type JsonObjectMember = jsonObjectMember;
    export type JsonValue = jsonValueNull | jsonValueBoolean | jsonValueNumber | jsonValueString | jsonValueArray | jsonValueObject;
    export type UserPrivacySettingRule = userPrivacySettingRuleAllowAll | userPrivacySettingRuleAllowContacts | userPrivacySettingRuleAllowUsers | userPrivacySettingRuleAllowChatMembers | userPrivacySettingRuleRestrictAll | userPrivacySettingRuleRestrictContacts | userPrivacySettingRuleRestrictUsers | userPrivacySettingRuleRestrictChatMembers;
    export type UserPrivacySettingRules = userPrivacySettingRules;
    export type UserPrivacySetting = userPrivacySettingShowStatus | userPrivacySettingShowProfilePhoto | userPrivacySettingShowLinkInForwardedMessages | userPrivacySettingShowPhoneNumber | userPrivacySettingAllowChatInvites | userPrivacySettingAllowCalls | userPrivacySettingAllowPeerToPeerCalls | userPrivacySettingAllowFindingByPhoneNumber;
    export type AccountTtl = accountTtl;
    export type SessionType = sessionTypeAndroid | sessionTypeApple | sessionTypeBrave | sessionTypeChrome | sessionTypeEdge | sessionTypeFirefox | sessionTypeIpad | sessionTypeIphone | sessionTypeLinux | sessionTypeMac | sessionTypeOpera | sessionTypeSafari | sessionTypeUbuntu | sessionTypeUnknown | sessionTypeVivaldi | sessionTypeWindows | sessionTypeXbox;
    export type Session = session;
    export type Sessions = sessions;
    export type ConnectedWebsite = connectedWebsite;
    export type ConnectedWebsites = connectedWebsites;
    export type ChatReportReason = chatReportReasonSpam | chatReportReasonViolence | chatReportReasonPornography | chatReportReasonChildAbuse | chatReportReasonCopyright | chatReportReasonUnrelatedLocation | chatReportReasonFake | chatReportReasonIllegalDrugs | chatReportReasonPersonalDetails | chatReportReasonCustom;
    export type TargetChat = targetChatCurrent | targetChatChosen | targetChatInternalLink;
    export type InternalLinkType = internalLinkTypeActiveSessions | internalLinkTypeAttachmentMenuBot | internalLinkTypeAuthenticationCode | internalLinkTypeBackground | internalLinkTypeBotStart | internalLinkTypeBotStartInGroup | internalLinkTypeBotAddToChannel | internalLinkTypeChangePhoneNumber | internalLinkTypeChatInvite | internalLinkTypeFilterSettings | internalLinkTypeGame | internalLinkTypeInvoice | internalLinkTypeLanguagePack | internalLinkTypeLanguageSettings | internalLinkTypeMessage | internalLinkTypeMessageDraft | internalLinkTypePassportDataRequest | internalLinkTypePhoneNumberConfirmation | internalLinkTypePremiumFeatures | internalLinkTypePrivacyAndSecuritySettings | internalLinkTypeProxy | internalLinkTypePublicChat | internalLinkTypeQrCodeAuthentication | internalLinkTypeSettings | internalLinkTypeStickerSet | internalLinkTypeTheme | internalLinkTypeThemeSettings | internalLinkTypeUnknownDeepLink | internalLinkTypeUnsupportedProxy | internalLinkTypeUserPhoneNumber | internalLinkTypeVideoChat;
    export type MessageLink = messageLink;
    export type MessageLinkInfo = messageLinkInfo;
    export type FilePart = filePart;
    export type FileType = fileTypeNone | fileTypeAnimation | fileTypeAudio | fileTypeDocument | fileTypeNotificationSound | fileTypePhoto | fileTypeProfilePhoto | fileTypeSecret | fileTypeSecretThumbnail | fileTypeSecure | fileTypeSticker | fileTypeThumbnail | fileTypeUnknown | fileTypeVideo | fileTypeVideoNote | fileTypeVoiceNote | fileTypeWallpaper;
    export type StorageStatisticsByFileType = storageStatisticsByFileType;
    export type StorageStatisticsByChat = storageStatisticsByChat;
    export type StorageStatistics = storageStatistics;
    export type StorageStatisticsFast = storageStatisticsFast;
    export type DatabaseStatistics = databaseStatistics;
    export type NetworkType = networkTypeNone | networkTypeMobile | networkTypeMobileRoaming | networkTypeWiFi | networkTypeOther;
    export type NetworkStatisticsEntry = networkStatisticsEntryFile | networkStatisticsEntryCall;
    export type NetworkStatistics = networkStatistics;
    export type AutoDownloadSettings = autoDownloadSettings;
    export type AutoDownloadSettingsPresets = autoDownloadSettingsPresets;
    export type ConnectionState = connectionStateWaitingForNetwork | connectionStateConnectingToProxy | connectionStateConnecting | connectionStateUpdating | connectionStateReady;
    export type TopChatCategory = topChatCategoryUsers | topChatCategoryBots | topChatCategoryGroups | topChatCategoryChannels | topChatCategoryInlineBots | topChatCategoryCalls | topChatCategoryForwardChats;
    export type TMeUrlType = tMeUrlTypeUser | tMeUrlTypeSupergroup | tMeUrlTypeChatInvite | tMeUrlTypeStickerSet;
    export type TMeUrl = tMeUrl;
    export type TMeUrls = tMeUrls;
    export type SuggestedAction = suggestedActionEnableArchiveAndMuteNewChats | suggestedActionCheckPassword | suggestedActionCheckPhoneNumber | suggestedActionViewChecksHint | suggestedActionConvertToBroadcastGroup | suggestedActionSetPassword;
    export type Count = count;
    export type Text = text;
    export type Seconds = seconds;
    export type FileDownloadedPrefixSize = fileDownloadedPrefixSize;
    export type DeepLinkInfo = deepLinkInfo;
    export type TextParseMode = textParseModeMarkdown | textParseModeHTML;
    export type ProxyType = proxyTypeSocks5 | proxyTypeHttp | proxyTypeMtproto;
    export type Proxy = proxy;
    export type Proxies = proxies;
    export type InputSticker = inputSticker;
    export type DateRange = dateRange;
    export type StatisticalValue = statisticalValue;
    export type StatisticalGraph = statisticalGraphData | statisticalGraphAsync | statisticalGraphError;
    export type ChatStatisticsMessageInteractionInfo = chatStatisticsMessageInteractionInfo;
    export type ChatStatisticsMessageSenderInfo = chatStatisticsMessageSenderInfo;
    export type ChatStatisticsAdministratorActionsInfo = chatStatisticsAdministratorActionsInfo;
    export type ChatStatisticsInviterInfo = chatStatisticsInviterInfo;
    export type ChatStatistics = chatStatisticsSupergroup | chatStatisticsChannel;
    export type MessageStatistics = messageStatistics;
    export type Point = point;
    export type VectorPathCommand = vectorPathCommandLine | vectorPathCommandCubicBezierCurve;
    export type BotCommandScope = botCommandScopeDefault | botCommandScopeAllPrivateChats | botCommandScopeAllGroupChats | botCommandScopeAllChatAdministrators | botCommandScopeChat | botCommandScopeChatAdministrators | botCommandScopeChatMember;
    export type Update = updateAuthorizationState | updateNewMessage | updateMessageSendAcknowledged | updateMessageSendSucceeded | updateMessageSendFailed | updateMessageContent | updateMessageEdited | updateMessageIsPinned | updateMessageInteractionInfo | updateMessageContentOpened | updateMessageMentionRead | updateMessageUnreadReactions | updateMessageLiveLocationViewed | updateNewChat | updateChatTitle | updateChatPhoto | updateChatPermissions | updateChatLastMessage | updateChatPosition | updateChatReadInbox | updateChatReadOutbox | updateChatActionBar | updateChatAvailableReactions | updateChatDraftMessage | updateChatMessageSender | updateChatMessageTtl | updateChatNotificationSettings | updateChatPendingJoinRequests | updateChatReplyMarkup | updateChatTheme | updateChatUnreadMentionCount | updateChatUnreadReactionCount | updateChatVideoChat | updateChatDefaultDisableNotification | updateChatHasProtectedContent | updateChatHasScheduledMessages | updateChatIsBlocked | updateChatIsMarkedAsUnread | updateChatFilters | updateChatOnlineMemberCount | updateScopeNotificationSettings | updateNotification | updateNotificationGroup | updateActiveNotifications | updateHavePendingNotifications | updateDeleteMessages | updateChatAction | updateUserStatus | updateUser | updateBasicGroup | updateSupergroup | updateSecretChat | updateUserFullInfo | updateBasicGroupFullInfo | updateSupergroupFullInfo | updateServiceNotification | updateFile | updateFileGenerationStart | updateFileGenerationStop | updateFileDownloads | updateFileAddedToDownloads | updateFileDownload | updateFileRemovedFromDownloads | updateCall | updateGroupCall | updateGroupCallParticipant | updateNewCallSignalingData | updateUserPrivacySettingRules | updateUnreadMessageCount | updateUnreadChatCount | updateOption | updateStickerSet | updateInstalledStickerSets | updateTrendingStickerSets | updateRecentStickers | updateFavoriteStickers | updateSavedAnimations | updateSavedNotificationSounds | updateSelectedBackground | updateChatThemes | updateLanguagePackStrings | updateConnectionState | updateTermsOfService | updateUsersNearby | updateAttachmentMenuBots | updateWebAppMessageSent | updateReactions | updateDiceEmojis | updateAnimatedEmojiMessageClicked | updateAnimationSearchParameters | updateSuggestedActions | updateNewInlineQuery | updateNewChosenInlineResult | updateNewCallbackQuery | updateNewInlineCallbackQuery | updateNewShippingQuery | updateNewPreCheckoutQuery | updateNewCustomEvent | updateNewCustomQuery | updatePoll | updatePollAnswer | updateChatMember | updateNewChatJoinRequest | updateFatalError;
    export type Updates = updates;
    export type LogStream = logStreamDefault | logStreamFile | logStreamEmpty;
    export type LogVerbosityLevel = logVerbosityLevel;
    export type LogTags = logTags;
    export type TestInt = testInt;
    export type TestString = testString;
    export type TestBytes = testBytes;
    export type TestVectorInt = testVectorInt;
    export type TestVectorIntObject = testVectorIntObject;
    export type TestVectorString = testVectorString;
    export type TestVectorStringObject = testVectorStringObject;

    export type TdClass = Error | Ok | TdlibParameters | AuthenticationCodeType | AuthenticationCodeInfo | EmailAddressAuthenticationCodeInfo | TextEntity | TextEntities | FormattedText | TermsOfService | AuthorizationState | PasswordState | RecoveryEmailAddress | TemporaryPasswordState | LocalFile | RemoteFile | File | InputFile | PhotoSize | Minithumbnail | ThumbnailFormat | Thumbnail | MaskPoint | MaskPosition | StickerType | ClosedVectorPath | PollOption | PollType | Animation | Audio | Document | Photo | Sticker | Video | VideoNote | VoiceNote | AnimatedEmoji | Contact | Location | Venue | Game | Poll | ProfilePhoto | ChatPhotoInfo | UserType | BotCommand | BotCommands | BotMenuButton | ChatLocation | AnimatedChatPhoto | ChatPhoto | ChatPhotos | InputChatPhoto | ChatPermissions | ChatAdministratorRights | User | BotInfo | UserFullInfo | Users | ChatAdministrator | ChatAdministrators | ChatMemberStatus | ChatMember | ChatMembers | ChatMembersFilter | SupergroupMembersFilter | ChatInviteLink | ChatInviteLinks | ChatInviteLinkCount | ChatInviteLinkCounts | ChatInviteLinkMember | ChatInviteLinkMembers | ChatInviteLinkInfo | ChatJoinRequest | ChatJoinRequests | ChatJoinRequestsInfo | BasicGroup | BasicGroupFullInfo | Supergroup | SupergroupFullInfo | SecretChatState | SecretChat | MessageSender | MessageSenders | MessageForwardOrigin | MessageForwardInfo | MessageReplyInfo | MessageReaction | MessageInteractionInfo | UnreadReaction | MessageSendingState | Message | Messages | FoundMessages | MessagePosition | MessagePositions | MessageCalendarDay | MessageCalendar | SponsoredMessage | FileDownload | DownloadedFileCounts | FoundFileDownloads | NotificationSettingsScope | ChatNotificationSettings | ScopeNotificationSettings | DraftMessage | ChatType | ChatFilter | ChatFilterInfo | RecommendedChatFilter | RecommendedChatFilters | ChatList | ChatLists | ChatSource | ChatPosition | VideoChat | Chat | Chats | ChatNearby | ChatsNearby | PublicChatType | ChatActionBar | KeyboardButtonType | KeyboardButton | InlineKeyboardButtonType | InlineKeyboardButton | ReplyMarkup | LoginUrlInfo | WebAppInfo | MessageThreadInfo | RichText | PageBlockCaption | PageBlockListItem | PageBlockHorizontalAlignment | PageBlockVerticalAlignment | PageBlockTableCell | PageBlockRelatedArticle | PageBlock | WebPageInstantView | WebPage | CountryInfo | Countries | PhoneNumberInfo | BankCardActionOpenUrl | BankCardInfo | Address | ThemeParameters | LabeledPricePart | Invoice | OrderInfo | ShippingOption | SavedCredentials | InputCredentials | PaymentProvider | PaymentForm | ValidatedOrderInfo | PaymentResult | PaymentReceipt | InputInvoice | DatedFile | PassportElementType | Date | PersonalDetails | IdentityDocument | InputIdentityDocument | PersonalDocument | InputPersonalDocument | PassportElement | InputPassportElement | PassportElements | PassportElementErrorSource | PassportElementError | PassportSuitableElement | PassportRequiredElement | PassportAuthorizationForm | PassportElementsWithErrors | EncryptedCredentials | EncryptedPassportElement | InputPassportElementErrorSource | InputPassportElementError | MessageContent | TextEntityType | InputThumbnail | MessageSchedulingState | MessageSendOptions | MessageCopyOptions | InputMessageContent | SearchMessagesFilter | ChatAction | UserStatus | Stickers | Emojis | StickerSet | StickerSetInfo | StickerSets | TrendingStickerSets | CallDiscardReason | CallProtocol | CallServerType | CallServer | CallId | GroupCallId | CallState | GroupCallVideoQuality | GroupCallStream | GroupCallStreams | RtmpUrl | GroupCallRecentSpeaker | GroupCall | GroupCallVideoSourceGroup | GroupCallParticipantVideoInfo | GroupCallParticipant | CallProblem | Call | PhoneNumberAuthenticationSettings | AddedReaction | AddedReactions | AvailableReaction | AvailableReactions | Reaction | Animations | DiceStickers | ImportedContacts | AttachmentMenuBotColor | AttachmentMenuBot | SentWebAppMessage | HttpUrl | InputInlineQueryResult | InlineQueryResult | InlineQueryResults | CallbackQueryPayload | CallbackQueryAnswer | CustomRequestResult | GameHighScore | GameHighScores | ChatEventAction | ChatEvent | ChatEvents | ChatEventLogFilters | LanguagePackStringValue | LanguagePackString | LanguagePackStrings | LanguagePackInfo | LocalizationTargetInfo | PremiumLimitType | PremiumFeature | PremiumLimit | PremiumFeatures | PremiumSource | PremiumFeaturePromotionAnimation | PremiumState | DeviceToken | PushReceiverId | BackgroundFill | BackgroundType | Background | Backgrounds | InputBackground | ThemeSettings | ChatTheme | Hashtags | CanTransferOwnershipResult | CheckChatUsernameResult | CheckStickerSetNameResult | ResetPasswordResult | MessageFileType | PushMessageContent | NotificationType | NotificationGroupType | NotificationSound | NotificationSounds | Notification | NotificationGroup | OptionValue | JsonObjectMember | JsonValue | UserPrivacySettingRule | UserPrivacySettingRules | UserPrivacySetting | AccountTtl | SessionType | Session | Sessions | ConnectedWebsite | ConnectedWebsites | ChatReportReason | TargetChat | InternalLinkType | MessageLink | MessageLinkInfo | FilePart | FileType | StorageStatisticsByFileType | StorageStatisticsByChat | StorageStatistics | StorageStatisticsFast | DatabaseStatistics | NetworkType | NetworkStatisticsEntry | NetworkStatistics | AutoDownloadSettings | AutoDownloadSettingsPresets | ConnectionState | TopChatCategory | TMeUrlType | TMeUrl | TMeUrls | SuggestedAction | Count | Text | Seconds | FileDownloadedPrefixSize | DeepLinkInfo | TextParseMode | ProxyType | Proxy | Proxies | InputSticker | DateRange | StatisticalValue | StatisticalGraph | ChatStatisticsMessageInteractionInfo | ChatStatisticsMessageSenderInfo | ChatStatisticsAdministratorActionsInfo | ChatStatisticsInviterInfo | ChatStatistics | MessageStatistics | Point | VectorPathCommand | BotCommandScope | Update | Updates | LogStream | LogVerbosityLevel | LogTags | TestInt | TestString | TestBytes | TestVectorInt | TestVectorIntObject | TestVectorString | TestVectorStringObject;
    
    
    /** Returns the current authorization state; this is an offline request. For informational purposes only. Use updateAuthorizationState instead to maintain the current authorization state. Can be called before initialization */
    export interface getAuthorizationState {
        '@type': 'getAuthorizationState';
    }
    
    
    /** Sets the parameters for TDLib initialization. Works only when the current authorization state is authorizationStateWaitTdlibParameters */
    export interface setTdlibParameters {
        '@type': 'setTdlibParameters';
        /** Parameters for TDLib initialization */
        parameters?: tdlibParameters;
    }
    
    
    /** Checks the database encryption key for correctness. Works only when the current authorization state is authorizationStateWaitEncryptionKey */
    export interface checkDatabaseEncryptionKey {
        '@type': 'checkDatabaseEncryptionKey';
        /** Encryption key to check or set up */
        encryption_key?: bytes;
    }
    
    
    /** Sets the phone number of the user and sends an authentication code to the user. Works only when the current authorization state is authorizationStateWaitPhoneNumber, -or if there is no pending authentication query and the current authorization state is authorizationStateWaitCode, authorizationStateWaitRegistration, or authorizationStateWaitPassword */
    export interface setAuthenticationPhoneNumber {
        '@type': 'setAuthenticationPhoneNumber';
        /** The phone number of the user, in international format */
        phone_number?: string;
        /** Settings for the authentication of the user's phone number; pass null to use default settings */
        settings?: phoneNumberAuthenticationSettings;
    }
    
    
    /** Re-sends an authentication code to the user. Works only when the current authorization state is authorizationStateWaitCode, the next_code_type of the result is not null and the server-specified timeout has passed */
    export interface resendAuthenticationCode {
        '@type': 'resendAuthenticationCode';
    }
    
    
    /** Checks the authentication code. Works only when the current authorization state is authorizationStateWaitCode */
    export interface checkAuthenticationCode {
        '@type': 'checkAuthenticationCode';
        /** Authentication code to check */
        code?: string;
    }
    
    
    /** Requests QR code authentication by scanning a QR code on another logged in device. Works only when the current authorization state is authorizationStateWaitPhoneNumber, -or if there is no pending authentication query and the current authorization state is authorizationStateWaitCode, authorizationStateWaitRegistration, or authorizationStateWaitPassword */
    export interface requestQrCodeAuthentication {
        '@type': 'requestQrCodeAuthentication';
        /** List of user identifiers of other users currently using the application */
        other_user_ids?: vector<int53>;
    }
    
    
    /** Finishes user registration. Works only when the current authorization state is authorizationStateWaitRegistration */
    export interface registerUser {
        '@type': 'registerUser';
        /** The first name of the user; 1-64 characters */
        first_name?: string;
        /** The last name of the user; 0-64 characters */
        last_name?: string;
    }
    
    
    /** Checks the authentication password for correctness. Works only when the current authorization state is authorizationStateWaitPassword */
    export interface checkAuthenticationPassword {
        '@type': 'checkAuthenticationPassword';
        /** The password to check */
        password?: string;
    }
    
    
    /** Requests to send a password recovery code to an email address that was previously set up. Works only when the current authorization state is authorizationStateWaitPassword */
    export interface requestAuthenticationPasswordRecovery {
        '@type': 'requestAuthenticationPasswordRecovery';
    }
    
    
    /** Checks whether a password recovery code sent to an email address is valid. Works only when the current authorization state is authorizationStateWaitPassword */
    export interface checkAuthenticationPasswordRecoveryCode {
        '@type': 'checkAuthenticationPasswordRecoveryCode';
        /** Recovery code to check */
        recovery_code?: string;
    }
    
    
    /** Recovers the password with a password recovery code sent to an email address that was previously set up. Works only when the current authorization state is authorizationStateWaitPassword */
    export interface recoverAuthenticationPassword {
        '@type': 'recoverAuthenticationPassword';
        /** Recovery code to check */
        recovery_code?: string;
        /** New password of the user; may be empty to remove the password */
        new_password?: string;
        /** New password hint; may be empty */
        new_hint?: string;
    }
    
    
    /** Checks the authentication token of a bot; to log in as a bot. Works only when the current authorization state is authorizationStateWaitPhoneNumber. Can be used instead of setAuthenticationPhoneNumber and checkAuthenticationCode to log in */
    export interface checkAuthenticationBotToken {
        '@type': 'checkAuthenticationBotToken';
        /** The bot token */
        token?: string;
    }
    
    
    /** Closes the TDLib instance after a proper logout. Requires an available network connection. All local data will be destroyed. After the logout completes, updateAuthorizationState with authorizationStateClosed will be sent */
    export interface logOut {
        '@type': 'logOut';
    }
    
    
    /** Closes the TDLib instance. All databases will be flushed to disk and properly closed. After the close completes, updateAuthorizationState with authorizationStateClosed will be sent. Can be called before initialization */
    export interface close {
        '@type': 'close';
    }
    
    
    /** Closes the TDLib instance, destroying all local data without a proper logout. The current user session will remain in the list of all active sessions. All local data will be destroyed. After the destruction completes updateAuthorizationState with authorizationStateClosed will be sent. Can be called before authorization */
    export interface destroy {
        '@type': 'destroy';
    }
    
    
    /** Confirms QR code authentication on another device. Returns created session on success */
    export interface confirmQrCodeAuthentication {
        '@type': 'confirmQrCodeAuthentication';
        /** A link from a QR code. The link must be scanned by the in-app camera */
        link?: string;
    }
    
    
    /** Returns all updates needed to restore current TDLib state, i.e. all actual UpdateAuthorizationState/UpdateUser/UpdateNewChat and others. This is especially useful if TDLib is run in a separate process. Can be called before initialization */
    export interface getCurrentState {
        '@type': 'getCurrentState';
    }
    
    
    /** Changes the database encryption key. Usually the encryption key is never changed and is stored in some OS keychain */
    export interface setDatabaseEncryptionKey {
        '@type': 'setDatabaseEncryptionKey';
        /** New encryption key */
        new_encryption_key?: bytes;
    }
    
    
    /** Returns the current state of 2-step verification */
    export interface getPasswordState {
        '@type': 'getPasswordState';
    }
    
    
    /** Changes the password for the current user. If a new recovery email address is specified, then the change will not be applied until the new recovery email address is confirmed */
    export interface setPassword {
        '@type': 'setPassword';
        /** Previous password of the user */
        old_password?: string;
        /** New password of the user; may be empty to remove the password */
        new_password?: string;
        /** New password hint; may be empty */
        new_hint?: string;
        /** Pass true to change also the recovery email address */
        set_recovery_email_address?: Bool;
        /** New recovery email address; may be empty */
        new_recovery_email_address?: string;
    }
    
    
    /** Returns a 2-step verification recovery email address that was previously set up. This method can be used to verify a password provided by the user */
    export interface getRecoveryEmailAddress {
        '@type': 'getRecoveryEmailAddress';
        /** The password for the current user */
        password?: string;
    }
    
    
    /** Changes the 2-step verification recovery email address of the user. If a new recovery email address is specified, then the change will not be applied until the new recovery email address is confirmed. -If new_recovery_email_address is the same as the email address that is currently set up, this call succeeds immediately and aborts all other requests waiting for an email confirmation */
    export interface setRecoveryEmailAddress {
        '@type': 'setRecoveryEmailAddress';
        /** Password of the current user */
        password?: string;
        /** New recovery email address */
        new_recovery_email_address?: string;
    }
    
    
    /** Checks the 2-step verification recovery email address verification code */
    export interface checkRecoveryEmailAddressCode {
        '@type': 'checkRecoveryEmailAddressCode';
        /** Verification code to check */
        code?: string;
    }
    
    
    /** Resends the 2-step verification recovery email address verification code */
    export interface resendRecoveryEmailAddressCode {
        '@type': 'resendRecoveryEmailAddressCode';
    }
    
    
    /** Requests to send a 2-step verification password recovery code to an email address that was previously set up */
    export interface requestPasswordRecovery {
        '@type': 'requestPasswordRecovery';
    }
    
    
    /** Checks whether a 2-step verification password recovery code sent to an email address is valid */
    export interface checkPasswordRecoveryCode {
        '@type': 'checkPasswordRecoveryCode';
        /** Recovery code to check */
        recovery_code?: string;
    }
    
    
    /** Recovers the 2-step verification password using a recovery code sent to an email address that was previously set up */
    export interface recoverPassword {
        '@type': 'recoverPassword';
        /** Recovery code to check */
        recovery_code?: string;
        /** New password of the user; may be empty to remove the password */
        new_password?: string;
        /** New password hint; may be empty */
        new_hint?: string;
    }
    
    
    /** Removes 2-step verification password without previous password and access to recovery email address. The password can't be reset immediately and the request needs to be repeated after the specified time */
    export interface resetPassword {
        '@type': 'resetPassword';
    }
    
    
    /** Cancels reset of 2-step verification password. The method can be called if passwordState.pending_reset_date > 0 */
    export interface cancelPasswordReset {
        '@type': 'cancelPasswordReset';
    }
    
    
    /** Creates a new temporary password for processing payments */
    export interface createTemporaryPassword {
        '@type': 'createTemporaryPassword';
        /** Persistent user password */
        password?: string;
        /** Time during which the temporary password will be valid, in seconds; must be between 60 and 86400 */
        valid_for?: int32;
    }
    
    
    /** Returns information about the current temporary password */
    export interface getTemporaryPasswordState {
        '@type': 'getTemporaryPasswordState';
    }
    
    
    /** Returns the current user */
    export interface getMe {
        '@type': 'getMe';
    }
    
    
    /** Returns information about a user by their identifier. This is an offline request if the current user is not a bot */
    export interface getUser {
        '@type': 'getUser';
        /** User identifier */
        user_id?: int53;
    }
    
    
    /** Returns full information about a user by their identifier */
    export interface getUserFullInfo {
        '@type': 'getUserFullInfo';
        /** User identifier */
        user_id?: int53;
    }
    
    
    /** Returns information about a basic group by its identifier. This is an offline request if the current user is not a bot */
    export interface getBasicGroup {
        '@type': 'getBasicGroup';
        /** Basic group identifier */
        basic_group_id?: int53;
    }
    
    
    /** Returns full information about a basic group by its identifier */
    export interface getBasicGroupFullInfo {
        '@type': 'getBasicGroupFullInfo';
        /** Basic group identifier */
        basic_group_id?: int53;
    }
    
    
    /** Returns information about a supergroup or a channel by its identifier. This is an offline request if the current user is not a bot */
    export interface getSupergroup {
        '@type': 'getSupergroup';
        /** Supergroup or channel identifier */
        supergroup_id?: int53;
    }
    
    
    /** Returns full information about a supergroup or a channel by its identifier, cached for up to 1 minute */
    export interface getSupergroupFullInfo {
        '@type': 'getSupergroupFullInfo';
        /** Supergroup or channel identifier */
        supergroup_id?: int53;
    }
    
    
    /** Returns information about a secret chat by its identifier. This is an offline request */
    export interface getSecretChat {
        '@type': 'getSecretChat';
        /** Secret chat identifier */
        secret_chat_id?: int32;
    }
    
    
    /** Returns information about a chat by its identifier, this is an offline request if the current user is not a bot */
    export interface getChat {
        '@type': 'getChat';
        /** Chat identifier */
        chat_id?: int53;
    }
    
    
    /** Returns information about a message */
    export interface getMessage {
        '@type': 'getMessage';
        /** Identifier of the chat the message belongs to */
        chat_id?: int53;
        /** Identifier of the message to get */
        message_id?: int53;
    }
    
    
    /** Returns information about a message, if it is available without sending network request. This is an offline request */
    export interface getMessageLocally {
        '@type': 'getMessageLocally';
        /** Identifier of the chat the message belongs to */
        chat_id?: int53;
        /** Identifier of the message to get */
        message_id?: int53;
    }
    
    
    /** Returns information about a message that is replied by a given message. Also returns the pinned message, the game message, and the invoice message for messages of the types messagePinMessage, messageGameScore, and messagePaymentSuccessful respectively */
    export interface getRepliedMessage {
        '@type': 'getRepliedMessage';
        /** Identifier of the chat the message belongs to */
        chat_id?: int53;
        /** Identifier of the reply message */
        message_id?: int53;
    }
    
    
    /** Returns information about a newest pinned message in the chat */
    export interface getChatPinnedMessage {
        '@type': 'getChatPinnedMessage';
        /** Identifier of the chat the message belongs to */
        chat_id?: int53;
    }
    
    
    /** Returns information about a message with the callback button that originated a callback query; for bots only */
    export interface getCallbackQueryMessage {
        '@type': 'getCallbackQueryMessage';
        /** Identifier of the chat the message belongs to */
        chat_id?: int53;
        /** Message identifier */
        message_id?: int53;
        /** Identifier of the callback query */
        callback_query_id?: int64;
    }
    
    
    /** Returns information about messages. If a message is not found, returns null on the corresponding position of the result */
    export interface getMessages {
        '@type': 'getMessages';
        /** Identifier of the chat the messages belong to */
        chat_id?: int53;
        /** Identifiers of the messages to get */
        message_ids?: vector<int53>;
    }
    
    
    /** Returns information about a message thread. Can be used only if message.can_get_message_thread == true */
    export interface getMessageThread {
        '@type': 'getMessageThread';
        /** Chat identifier */
        chat_id?: int53;
        /** Identifier of the message */
        message_id?: int53;
    }
    
    
    /** Returns viewers of a recent outgoing message in a basic group or a supergroup chat. For video notes and voice notes only users, opened content of the message, are returned. The method can be called if message.can_get_viewers == true */
    export interface getMessageViewers {
        '@type': 'getMessageViewers';
        /** Chat identifier */
        chat_id?: int53;
        /** Identifier of the message */
        message_id?: int53;
    }
    
    
    /** Returns information about a file; this is an offline request */
    export interface getFile {
        '@type': 'getFile';
        /** Identifier of the file to get */
        file_id?: int32;
    }
    
    
    /** Returns information about a file by its remote ID; this is an offline request. Can be used to register a URL as a file for further uploading, or sending as a message. Even the request succeeds, the file can be used only if it is still accessible to the user. -For example, if the file is from a message, then the message must be not deleted and accessible to the user. If the file database is disabled, then the corresponding object with the file must be preloaded by the application */
    export interface getRemoteFile {
        '@type': 'getRemoteFile';
        /** Remote identifier of the file to get */
        remote_file_id?: string;
        /** File type; pass null if unknown */
        file_type?: FileType;
    }
    
    
    /** Loads more chats from a chat list. The loaded chats and their positions in the chat list will be sent through updates. Chats are sorted by the pair (chat.position.order, chat.id) in descending order. Returns a 404 error if all chats have been loaded */
    export interface loadChats {
        '@type': 'loadChats';
        /** The chat list in which to load chats; pass null to load chats from the main chat list */
        chat_list?: ChatList;
        /** The maximum number of chats to be loaded. For optimal performance, the number of loaded chats is chosen by TDLib and can be smaller than the specified limit, even if the end of the list is not reached */
        limit?: int32;
    }
    
    
    /** Returns an ordered list of chats from the beginning of a chat list. For informational purposes only. Use loadChats and updates processing instead to maintain chat lists in a consistent state */
    export interface getChats {
        '@type': 'getChats';
        /** The chat list in which to return chats; pass null to get chats from the main chat list */
        chat_list?: ChatList;
        /** The maximum number of chats to be returned */
        limit?: int32;
    }
    
    
    /** Searches a public chat by its username. Currently, only private chats, supergroups and channels can be public. Returns the chat if found; otherwise an error is returned */
    export interface searchPublicChat {
        '@type': 'searchPublicChat';
        /** Username to be resolved */
        username?: string;
    }
    
    
    /** Searches public chats by looking for specified query in their username and title. Currently, only private chats, supergroups and channels can be public. Returns a meaningful number of results. -Excludes private chats with contacts and chats from the chat list from the results */
    export interface searchPublicChats {
        '@type': 'searchPublicChats';
        /** Query to search for */
        query?: string;
    }
    
    
    /** Searches for the specified query in the title and username of already known chats, this is an offline request. Returns chats in the order seen in the main chat list */
    export interface searchChats {
        '@type': 'searchChats';
        /** Query to search for. If the query is empty, returns up to 50 recently found chats */
        query?: string;
        /** The maximum number of chats to be returned */
        limit?: int32;
    }
    
    
    /** Searches for the specified query in the title and username of already known chats via request to the server. Returns chats in the order seen in the main chat list */
    export interface searchChatsOnServer {
        '@type': 'searchChatsOnServer';
        /** Query to search for */
        query?: string;
        /** The maximum number of chats to be returned */
        limit?: int32;
    }
    
    
    /** Returns a list of users and location-based supergroups nearby. The list of users nearby will be updated for 60 seconds after the request by the updates updateUsersNearby. The request must be sent again every 25 seconds with adjusted location to not miss new chats */
    export interface searchChatsNearby {
        '@type': 'searchChatsNearby';
        /** Current user location */
        location?: location;
    }
    
    
    /** Returns a list of frequently used chats. Supported only if the chat info database is enabled */
    export interface getTopChats {
        '@type': 'getTopChats';
        /** Category of chats to be returned */
        category?: TopChatCategory;
        /** The maximum number of chats to be returned; up to 30 */
        limit?: int32;
    }
    
    
    /** Removes a chat from the list of frequently used chats. Supported only if the chat info database is enabled */
    export interface removeTopChat {
        '@type': 'removeTopChat';
        /** Category of frequently used chats */
        category?: TopChatCategory;
        /** Chat identifier */
        chat_id?: int53;
    }
    
    
    /** Adds a chat to the list of recently found chats. The chat is added to the beginning of the list. If the chat is already in the list, it will be removed from the list first */
    export interface addRecentlyFoundChat {
        '@type': 'addRecentlyFoundChat';
        /** Identifier of the chat to add */
        chat_id?: int53;
    }
    
    
    /** Removes a chat from the list of recently found chats */
    export interface removeRecentlyFoundChat {
        '@type': 'removeRecentlyFoundChat';
        /** Identifier of the chat to be removed */
        chat_id?: int53;
    }
    
    
    /** Clears the list of recently found chats */
    export interface clearRecentlyFoundChats {
        '@type': 'clearRecentlyFoundChats';
    }
    
    
    /** Returns recently opened chats, this is an offline request. Returns chats in the order of last opening */
    export interface getRecentlyOpenedChats {
        '@type': 'getRecentlyOpenedChats';
        /** The maximum number of chats to be returned */
        limit?: int32;
    }
    
    
    /** Checks whether a username can be set for a chat */
    export interface checkChatUsername {
        '@type': 'checkChatUsername';
        /** Chat identifier; must be identifier of a supergroup chat, or a channel chat, or a private chat with self, or zero if the chat is being created */
        chat_id?: int53;
        /** Username to be checked */
        username?: string;
    }
    
    
    /** Returns a list of public chats of the specified type, owned by the user */
    export interface getCreatedPublicChats {
        '@type': 'getCreatedPublicChats';
        /** Type of the public chats to return */
        type?: PublicChatType;
    }
    
    
    /** Checks whether the maximum number of owned public chats has been reached. Returns corresponding error if the limit was reached. The limit can be increased with Telegram Premium */
    export interface checkCreatedPublicChatsLimit {
        '@type': 'checkCreatedPublicChatsLimit';
        /** Type of the public chats, for which to check the limit */
        type?: PublicChatType;
    }
    
    
    /** Returns a list of basic group and supergroup chats, which can be used as a discussion group for a channel. Returned basic group chats must be first upgraded to supergroups before they can be set as a discussion group. To set a returned supergroup as a discussion group, access to its old messages must be enabled using toggleSupergroupIsAllHistoryAvailable first */
    export interface getSuitableDiscussionChats {
        '@type': 'getSuitableDiscussionChats';
    }
    
    
    /** Returns a list of recently inactive supergroups and channels. Can be used when user reaches limit on the number of joined supergroups and channels and receives CHANNELS_TOO_MUCH error. Also, the limit can be increased with Telegram Premium */
    export interface getInactiveSupergroupChats {
        '@type': 'getInactiveSupergroupChats';
    }
    
    
    /** Returns a list of common group chats with a given user. Chats are sorted by their type and creation date */
    export interface getGroupsInCommon {
        '@type': 'getGroupsInCommon';
        /** User identifier */
        user_id?: int53;
        /** Chat identifier starting from which to return chats; use 0 for the first request */
        offset_chat_id?: int53;
        /** The maximum number of chats to be returned; up to 100 */
        limit?: int32;
    }
    
    
    /** Returns messages in a chat. The messages are returned in a reverse chronological order (i.e., in order of decreasing message_id). -For optimal performance, the number of returned messages is chosen by TDLib. This is an offline request if only_local is true */
    export interface getChatHistory {
        '@type': 'getChatHistory';
        /** Chat identifier */
        chat_id?: int53;
        /** Identifier of the message starting from which history must be fetched; use 0 to get results from the last message */
        from_message_id?: int53;
        /** Specify 0 to get results from exactly the from_message_id or a negative offset up to 99 to get additionally some newer messages */
        offset?: int32;
        /** The maximum number of messages to be returned; must be positive and can't be greater than 100. If the offset is negative, the limit must be greater than or equal to -offset. For optimal performance, the number of returned messages is chosen by TDLib and can be smaller than the specified limit */
        limit?: int32;
        /** Pass true to get only messages that are available without sending network requests */
        only_local?: Bool;
    }
    
    
    /** Returns messages in a message thread of a message. Can be used only if message.can_get_message_thread == true. Message thread of a channel message is in the channel's linked supergroup. -The messages are returned in a reverse chronological order (i.e., in order of decreasing message_id). For optimal performance, the number of returned messages is chosen by TDLib */
    export interface getMessageThreadHistory {
        '@type': 'getMessageThreadHistory';
        /** Chat identifier */
        chat_id?: int53;
        /** Message identifier, which thread history needs to be returned */
        message_id?: int53;
        /** Identifier of the message starting from which history must be fetched; use 0 to get results from the last message */
        from_message_id?: int53;
        /** Specify 0 to get results from exactly the from_message_id or a negative offset up to 99 to get additionally some newer messages */
        offset?: int32;
        /** The maximum number of messages to be returned; must be positive and can't be greater than 100. If the offset is negative, the limit must be greater than or equal to -offset. For optimal performance, the number of returned messages is chosen by TDLib and can be smaller than the specified limit */
        limit?: int32;
    }
    
    
    /** Deletes all messages in the chat. Use chat.can_be_deleted_only_for_self and chat.can_be_deleted_for_all_users fields to find whether and how the method can be applied to the chat */
    export interface deleteChatHistory {
        '@type': 'deleteChatHistory';
        /** Chat identifier */
        chat_id?: int53;
        /** Pass true to remove the chat from all chat lists */
        remove_from_chat_list?: Bool;
        /** Pass true to delete chat history for all users */
        revoke?: Bool;
    }
    
    
    /** Deletes a chat along with all messages in the corresponding chat for all chat members. For group chats this will release the username and remove all members. Use the field chat.can_be_deleted_for_all_users to find whether the method can be applied to the chat */
    export interface deleteChat {
        '@type': 'deleteChat';
        /** Chat identifier */
        chat_id?: int53;
    }
    
    
    /** Searches for messages with given words in the chat. Returns the results in reverse chronological order, i.e. in order of decreasing message_id. Cannot be used in secret chats with a non-empty query -(searchSecretMessages must be used instead), or without an enabled message database. For optimal performance, the number of returned messages is chosen by TDLib and can be smaller than the specified limit */
    export interface searchChatMessages {
        '@type': 'searchChatMessages';
        /** Identifier of the chat in which to search messages */
        chat_id?: int53;
        /** Query to search for */
        query?: string;
        /** Identifier of the sender of messages to search for; pass null to search for messages from any sender. Not supported in secret chats */
        sender_id?: MessageSender;
        /** Identifier of the message starting from which history must be fetched; use 0 to get results from the last message */
        from_message_id?: int53;
        /** Specify 0 to get results from exactly the from_message_id or a negative offset to get the specified message and some newer messages */
        offset?: int32;
        /** The maximum number of messages to be returned; must be positive and can't be greater than 100. If the offset is negative, the limit must be greater than -offset. For optimal performance, the number of returned messages is chosen by TDLib and can be smaller than the specified limit */
        limit?: int32;
        /** Additional filter for messages to search; pass null to search for all messages */
        filter?: SearchMessagesFilter;
        /** If not 0, only messages in the specified thread will be returned; supergroups only */
        message_thread_id?: int53;
    }
    
    
    /** Searches for messages in all chats except secret chats. Returns the results in reverse chronological order (i.e., in order of decreasing (date, chat_id, message_id)). -For optimal performance, the number of returned messages is chosen by TDLib and can be smaller than the specified limit */
    export interface searchMessages {
        '@type': 'searchMessages';
        /** Chat list in which to search messages; pass null to search in all chats regardless of their chat list. Only Main and Archive chat lists are supported */
        chat_list?: ChatList;
        /** Query to search for */
        query?: string;
        /** The date of the message starting from which the results need to be fetched. Use 0 or any date in the future to get results from the last message */
        offset_date?: int32;
        /** The chat identifier of the last found message, or 0 for the first request */
        offset_chat_id?: int53;
        /** The message identifier of the last found message, or 0 for the first request */
        offset_message_id?: int53;
        /** The maximum number of messages to be returned; up to 100. For optimal performance, the number of returned messages is chosen by TDLib and can be smaller than the specified limit */
        limit?: int32;
        /** Additional filter for messages to search; pass null to search for all messages. Filters searchMessagesFilterMention, searchMessagesFilterUnreadMention, searchMessagesFilterUnreadReaction, searchMessagesFilterFailedToSend, and searchMessagesFilterPinned are unsupported in this function */
        filter?: SearchMessagesFilter;
        /** If not 0, the minimum date of the messages to return */
        min_date?: int32;
        /** If not 0, the maximum date of the messages to return */
        max_date?: int32;
    }
    
    
    /** Searches for messages in secret chats. Returns the results in reverse chronological order. For optimal performance, the number of returned messages is chosen by TDLib */
    export interface searchSecretMessages {
        '@type': 'searchSecretMessages';
        /** Identifier of the chat in which to search. Specify 0 to search in all secret chats */
        chat_id?: int53;
        /** Query to search for. If empty, searchChatMessages must be used instead */
        query?: string;
        /** Offset of the first entry to return as received from the previous request; use empty string to get the first chunk of results */
        offset?: string;
        /** The maximum number of messages to be returned; up to 100. For optimal performance, the number of returned messages is chosen by TDLib and can be smaller than the specified limit */
        limit?: int32;
        /** Additional filter for messages to search; pass null to search for all messages */
        filter?: SearchMessagesFilter;
    }
    
    
    /** Searches for call messages. Returns the results in reverse chronological order (i. e., in order of decreasing message_id). For optimal performance, the number of returned messages is chosen by TDLib */
    export interface searchCallMessages {
        '@type': 'searchCallMessages';
        /** Identifier of the message from which to search; use 0 to get results from the last message */
        from_message_id?: int53;
        /** The maximum number of messages to be returned; up to 100. For optimal performance, the number of returned messages is chosen by TDLib and can be smaller than the specified limit */
        limit?: int32;
        /** Pass true to search only for messages with missed/declined calls */
        only_missed?: Bool;
    }
    
    
    /** Searches for outgoing messages with content of the type messageDocument in all chats except secret chats. Returns the results in reverse chronological order */
    export interface searchOutgoingDocumentMessages {
        '@type': 'searchOutgoingDocumentMessages';
        /** Query to search for in document file name and message caption */
        query?: string;
        /** The maximum number of messages to be returned; up to 100 */
        limit?: int32;
    }
    
    
    /** Deletes all call messages */
    export interface deleteAllCallMessages {
        '@type': 'deleteAllCallMessages';
        /** Pass true to delete the messages for all users */
        revoke?: Bool;
    }
    
    
    /** Returns information about the recent locations of chat members that were sent to the chat. Returns up to 1 location message per user */
    export interface searchChatRecentLocationMessages {
        '@type': 'searchChatRecentLocationMessages';
        /** Chat identifier */
        chat_id?: int53;
        /** The maximum number of messages to be returned */
        limit?: int32;
    }
    
    
    /** Returns all active live locations that need to be updated by the application. The list is persistent across application restarts only if the message database is used */
    export interface getActiveLiveLocationMessages {
        '@type': 'getActiveLiveLocationMessages';
    }
    
    
    /** Returns the last message sent in a chat no later than the specified date */
    export interface getChatMessageByDate {
        '@type': 'getChatMessageByDate';
        /** Chat identifier */
        chat_id?: int53;
        /** Point in time (Unix timestamp) relative to which to search for messages */
        date?: int32;
    }
    
    
    /** Returns sparse positions of messages of the specified type in the chat to be used for shared media scroll implementation. Returns the results in reverse chronological order (i.e., in order of decreasing message_id). -Cannot be used in secret chats or with searchMessagesFilterFailedToSend filter without an enabled message database */
    export interface getChatSparseMessagePositions {
        '@type': 'getChatSparseMessagePositions';
        /** Identifier of the chat in which to return information about message positions */
        chat_id?: int53;
        /** Filter for message content. Filters searchMessagesFilterEmpty, searchMessagesFilterMention, searchMessagesFilterUnreadMention, and searchMessagesFilterUnreadReaction are unsupported in this function */
        filter?: SearchMessagesFilter;
        /** The message identifier from which to return information about message positions */
        from_message_id?: int53;
        /** The expected number of message positions to be returned; 50-2000. A smaller number of positions can be returned, if there are not enough appropriate messages */
        limit?: int32;
    }
    
    
    /** Returns information about the next messages of the specified type in the chat split by days. Returns the results in reverse chronological order. Can return partial result for the last returned day. Behavior of this method depends on the value of the option "utc_time_offset" */
    export interface getChatMessageCalendar {
        '@type': 'getChatMessageCalendar';
        /** Identifier of the chat in which to return information about messages */
        chat_id?: int53;
        /** Filter for message content. Filters searchMessagesFilterEmpty, searchMessagesFilterMention, searchMessagesFilterUnreadMention, and searchMessagesFilterUnreadReaction are unsupported in this function */
        filter?: SearchMessagesFilter;
        /** The message identifier from which to return information about messages; use 0 to get results from the last message */
        from_message_id?: int53;
    }
    
    
    /** Returns approximate number of messages of the specified type in the chat */
    export interface getChatMessageCount {
        '@type': 'getChatMessageCount';
        /** Identifier of the chat in which to count messages */
        chat_id?: int53;
        /** Filter for message content; searchMessagesFilterEmpty is unsupported in this function */
        filter?: SearchMessagesFilter;
        /** Pass true to get the number of messages without sending network requests, or -1 if the number of messages is unknown locally */
        return_local?: Bool;
    }
    
    
    /** Returns all scheduled messages in a chat. The messages are returned in a reverse chronological order (i.e., in order of decreasing message_id) */
    export interface getChatScheduledMessages {
        '@type': 'getChatScheduledMessages';
        /** Chat identifier */
        chat_id?: int53;
    }
    
    
    /** Returns forwarded copies of a channel message to different public channels. For optimal performance, the number of returned messages is chosen by TDLib */
    export interface getMessagePublicForwards {
        '@type': 'getMessagePublicForwards';
        /** Chat identifier of the message */
        chat_id?: int53;
        /** Message identifier */
        message_id?: int53;
        /** Offset of the first entry to return as received from the previous request; use empty string to get the first chunk of results */
        offset?: string;
        /** The maximum number of messages to be returned; must be positive and can't be greater than 100. For optimal performance, the number of returned messages is chosen by TDLib and can be smaller than the specified limit */
        limit?: int32;
    }
    
    
    /** Returns sponsored message to be shown in a chat; for channel chats only. Returns a 404 error if there is no sponsored message in the chat */
    export interface getChatSponsoredMessage {
        '@type': 'getChatSponsoredMessage';
        /** Identifier of the chat */
        chat_id?: int53;
    }
    
    
    /** Removes an active notification from notification list. Needs to be called only if the notification is removed by the current user */
    export interface removeNotification {
        '@type': 'removeNotification';
        /** Identifier of notification group to which the notification belongs */
        notification_group_id?: int32;
        /** Identifier of removed notification */
        notification_id?: int32;
    }
    
    
    /** Removes a group of active notifications. Needs to be called only if the notification group is removed by the current user */
    export interface removeNotificationGroup {
        '@type': 'removeNotificationGroup';
        /** Notification group identifier */
        notification_group_id?: int32;
        /** The maximum identifier of removed notifications */
        max_notification_id?: int32;
    }
    
    
    /** Returns an HTTPS link to a message in a chat. Available only for already sent messages in supergroups and channels, or if message.can_get_media_timestamp_links and a media timestamp link is generated. This is an offline request */
    export interface getMessageLink {
        '@type': 'getMessageLink';
        /** Identifier of the chat to which the message belongs */
        chat_id?: int53;
        /** Identifier of the message */
        message_id?: int53;
        /** If not 0, timestamp from which the video/audio/video note/voice note playing must start, in seconds. The media can be in the message content or in its web page preview */
        media_timestamp?: int32;
        /** Pass true to create a link for the whole media album */
        for_album?: Bool;
        /** Pass true to create a link to the message as a channel post comment, or from a message thread */
        for_comment?: Bool;
    }
    
    
    /** Returns an HTML code for embedding the message. Available only for messages in supergroups and channels with a username */
    export interface getMessageEmbeddingCode {
        '@type': 'getMessageEmbeddingCode';
        /** Identifier of the chat to which the message belongs */
        chat_id?: int53;
        /** Identifier of the message */
        message_id?: int53;
        /** Pass true to return an HTML code for embedding of the whole media album */
        for_album?: Bool;
    }
    
    
    /** Returns information about a public or private message link. Can be called for any internal link of the type internalLinkTypeMessage */
    export interface getMessageLinkInfo {
        '@type': 'getMessageLinkInfo';
        /** The message link */
        url?: string;
    }
    
    
    /** Translates a text to the given language. Returns a 404 error if the translation can't be performed */
    export interface translateText {
        '@type': 'translateText';
        /** Text to translate */
        text?: string;
        /** A two-letter ISO 639-1 language code of the language from which the message is translated. If empty, the language will be detected automatically */
        from_language_code?: string;
        /** A two-letter ISO 639-1 language code of the language to which the message is translated */
        to_language_code?: string;
    }
    
    
    /** Recognizes speech in a voice note message. The message must be successfully sent and must not be scheduled. May return an error with a message "MSG_VOICE_TOO_LONG" if the voice note is too long to be recognized */
    export interface recognizeSpeech {
        '@type': 'recognizeSpeech';
        /** Identifier of the chat to which the message belongs */
        chat_id?: int53;
        /** Identifier of the message */
        message_id?: int53;
    }
    
    
    /** Rates recognized speech in a voice note message */
    export interface rateSpeechRecognition {
        '@type': 'rateSpeechRecognition';
        /** Identifier of the chat to which the message belongs */
        chat_id?: int53;
        /** Identifier of the message */
        message_id?: int53;
        /** Pass true if the speech recognition is good */
        is_good?: Bool;
    }
    
    
    /** Returns list of message sender identifiers, which can be used to send messages in a chat */
    export interface getChatAvailableMessageSenders {
        '@type': 'getChatAvailableMessageSenders';
        /** Chat identifier */
        chat_id?: int53;
    }
    
    
    /** Selects a message sender to send messages in a chat */
    export interface setChatMessageSender {
        '@type': 'setChatMessageSender';
        /** Chat identifier */
        chat_id?: int53;
        /** New message sender for the chat */
        message_sender_id?: MessageSender;
    }
    
    
    /** Sends a message. Returns the sent message */
    export interface sendMessage {
        '@type': 'sendMessage';
        /** Target chat */
        chat_id?: int53;
        /** If not 0, a message thread identifier in which the message will be sent */
        message_thread_id?: int53;
        /** Identifier of the replied message; 0 if none */
        reply_to_message_id?: int53;
        /** Options to be used to send the message; pass null to use default options */
        options?: messageSendOptions;
        /** Markup for replying to the message; pass null if none; for bots only */
        reply_markup?: ReplyMarkup;
        /** The content of the message to be sent */
        input_message_content?: InputMessageContent;
    }
    
    
    /** Sends 2-10 messages grouped together into an album. Currently, only audio, document, photo and video messages can be grouped into an album. Documents and audio files can be only grouped in an album with messages of the same type. Returns sent messages */
    export interface sendMessageAlbum {
        '@type': 'sendMessageAlbum';
        /** Target chat */
        chat_id?: int53;
        /** If not 0, a message thread identifier in which the messages will be sent */
        message_thread_id?: int53;
        /** Identifier of a replied message; 0 if none */
        reply_to_message_id?: int53;
        /** Options to be used to send the messages; pass null to use default options */
        options?: messageSendOptions;
        /** Contents of messages to be sent. At most 10 messages can be added to an album */
        input_message_contents?: vector<InputMessageContent>;
        /** Pass true to get fake messages instead of actually sending them */
        only_preview?: Bool;
    }
    
    
    /** Invites a bot to a chat (if it is not yet a member) and sends it the /start command. Bots can't be invited to a private chat other than the chat with the bot. Bots can't be invited to channels (although they can be added as admins) and secret chats. Returns the sent message */
    export interface sendBotStartMessage {
        '@type': 'sendBotStartMessage';
        /** Identifier of the bot */
        bot_user_id?: int53;
        /** Identifier of the target chat */
        chat_id?: int53;
        /** A hidden parameter sent to the bot for deep linking purposes (https://core.telegram.org/bots#deep-linking) */
        parameter?: string;
    }
    
    
    /** Sends the result of an inline query as a message. Returns the sent message. Always clears a chat draft message */
    export interface sendInlineQueryResultMessage {
        '@type': 'sendInlineQueryResultMessage';
        /** Target chat */
        chat_id?: int53;
        /** If not 0, a message thread identifier in which the message will be sent */
        message_thread_id?: int53;
        /** Identifier of a replied message; 0 if none */
        reply_to_message_id?: int53;
        /** Options to be used to send the message; pass null to use default options */
        options?: messageSendOptions;
        /** Identifier of the inline query */
        query_id?: int64;
        /** Identifier of the inline result */
        result_id?: string;
        /** Pass true to hide the bot, via which the message is sent. Can be used only for bots GetOption("animation_search_bot_username"), GetOption("photo_search_bot_username"), and GetOption("venue_search_bot_username") */
        hide_via_bot?: Bool;
    }
    
    
    /** Forwards previously sent messages. Returns the forwarded messages in the same order as the message identifiers passed in message_ids. If a message can't be forwarded, null will be returned instead of the message */
    export interface forwardMessages {
        '@type': 'forwardMessages';
        /** Identifier of the chat to which to forward messages */
        chat_id?: int53;
        /** Identifier of the chat from which to forward messages */
        from_chat_id?: int53;
        /** Identifiers of the messages to forward. Message identifiers must be in a strictly increasing order. At most 100 messages can be forwarded simultaneously */
        message_ids?: vector<int53>;
        /** Options to be used to send the messages; pass null to use default options */
        options?: messageSendOptions;
        /** Pass true to copy content of the messages without reference to the original sender. Always true if the messages are forwarded to a secret chat or are local */
        send_copy?: Bool;
        /** Pass true to remove media captions of message copies. Ignored if send_copy is false */
        remove_caption?: Bool;
        /** Pass true to get fake messages instead of actually forwarding them */
        only_preview?: Bool;
    }
    
    
    /** Resends messages which failed to send. Can be called only for messages for which messageSendingStateFailed.can_retry is true and after specified in messageSendingStateFailed.retry_after time passed. -If a message is re-sent, the corresponding failed to send message is deleted. Returns the sent messages in the same order as the message identifiers passed in message_ids. If a message can't be re-sent, null will be returned instead of the message */
    export interface resendMessages {
        '@type': 'resendMessages';
        /** Identifier of the chat to send messages */
        chat_id?: int53;
        /** Identifiers of the messages to resend. Message identifiers must be in a strictly increasing order */
        message_ids?: vector<int53>;
    }
    
    
    /** Sends a notification about a screenshot taken in a chat. Supported only in private and secret chats */
    export interface sendChatScreenshotTakenNotification {
        '@type': 'sendChatScreenshotTakenNotification';
        /** Chat identifier */
        chat_id?: int53;
    }
    
    
    /** Adds a local message to a chat. The message is persistent across application restarts only if the message database is used. Returns the added message */
    export interface addLocalMessage {
        '@type': 'addLocalMessage';
        /** Target chat */
        chat_id?: int53;
        /** Identifier of the sender of the message */
        sender_id?: MessageSender;
        /** Identifier of the replied message; 0 if none */
        reply_to_message_id?: int53;
        /** Pass true to disable notification for the message */
        disable_notification?: Bool;
        /** The content of the message to be added */
        input_message_content?: InputMessageContent;
    }
    
    
    /** Deletes messages */
    export interface deleteMessages {
        '@type': 'deleteMessages';
        /** Chat identifier */
        chat_id?: int53;
        /** Identifiers of the messages to be deleted */
        message_ids?: vector<int53>;
        /** Pass true to delete messages for all chat members. Always true for supergroups, channels and secret chats */
        revoke?: Bool;
    }
    
    
    /** Deletes all messages sent by the specified message sender in a chat. Supported only for supergroups; requires can_delete_messages administrator privileges */
    export interface deleteChatMessagesBySender {
        '@type': 'deleteChatMessagesBySender';
        /** Chat identifier */
        chat_id?: int53;
        /** Identifier of the sender of messages to delete */
        sender_id?: MessageSender;
    }
    
    
    /** Deletes all messages between the specified dates in a chat. Supported only for private chats and basic groups. Messages sent in the last 30 seconds will not be deleted */
    export interface deleteChatMessagesByDate {
        '@type': 'deleteChatMessagesByDate';
        /** Chat identifier */
        chat_id?: int53;
        /** The minimum date of the messages to delete */
        min_date?: int32;
        /** The maximum date of the messages to delete */
        max_date?: int32;
        /** Pass true to delete chat messages for all users; private chats only */
        revoke?: Bool;
    }
    
    
    /** Edits the text of a message (or a text of a game message). Returns the edited message after the edit is completed on the server side */
    export interface editMessageText {
        '@type': 'editMessageText';
        /** The chat the message belongs to */
        chat_id?: int53;
        /** Identifier of the message */
        message_id?: int53;
        /** The new message reply markup; pass null if none; for bots only */
        reply_markup?: ReplyMarkup;
        /** New text content of the message. Must be of type inputMessageText */
        input_message_content?: InputMessageContent;
    }
    
    
    /** Edits the message content of a live location. Messages can be edited for a limited period of time specified in the live location. Returns the edited message after the edit is completed on the server side */
    export interface editMessageLiveLocation {
        '@type': 'editMessageLiveLocation';
        /** The chat the message belongs to */
        chat_id?: int53;
        /** Identifier of the message */
        message_id?: int53;
        /** The new message reply markup; pass null if none; for bots only */
        reply_markup?: ReplyMarkup;
        /** New location content of the message; pass null to stop sharing the live location */
        location?: location;
        /** The new direction in which the location moves, in degrees; 1-360. Pass 0 if unknown */
        heading?: int32;
        /** The new maximum distance for proximity alerts, in meters (0-100000). Pass 0 if the notification is disabled */
        proximity_alert_radius?: int32;
    }
    
    
    /** Edits the content of a message with an animation, an audio, a document, a photo or a video, including message caption. If only the caption needs to be edited, use editMessageCaption instead. -The media can't be edited if the message was set to self-destruct or to a self-destructing media. The type of message content in an album can't be changed with exception of replacing a photo with a video or vice versa. Returns the edited message after the edit is completed on the server side */
    export interface editMessageMedia {
        '@type': 'editMessageMedia';
        /** The chat the message belongs to */
        chat_id?: int53;
        /** Identifier of the message */
        message_id?: int53;
        /** The new message reply markup; pass null if none; for bots only */
        reply_markup?: ReplyMarkup;
        /** New content of the message. Must be one of the following types: inputMessageAnimation, inputMessageAudio, inputMessageDocument, inputMessagePhoto or inputMessageVideo */
        input_message_content?: InputMessageContent;
    }
    
    
    /** Edits the message content caption. Returns the edited message after the edit is completed on the server side */
    export interface editMessageCaption {
        '@type': 'editMessageCaption';
        /** The chat the message belongs to */
        chat_id?: int53;
        /** Identifier of the message */
        message_id?: int53;
        /** The new message reply markup; pass null if none; for bots only */
        reply_markup?: ReplyMarkup;
        /** New message content caption; 0-GetOption("message_caption_length_max") characters; pass null to remove caption */
        caption?: formattedText;
    }
    
    
    /** Edits the message reply markup; for bots only. Returns the edited message after the edit is completed on the server side */
    export interface editMessageReplyMarkup {
        '@type': 'editMessageReplyMarkup';
        /** The chat the message belongs to */
        chat_id?: int53;
        /** Identifier of the message */
        message_id?: int53;
        /** The new message reply markup; pass null if none */
        reply_markup?: ReplyMarkup;
    }
    
    
    /** Edits the text of an inline text or game message sent via a bot; for bots only */
    export interface editInlineMessageText {
        '@type': 'editInlineMessageText';
        /** Inline message identifier */
        inline_message_id?: string;
        /** The new message reply markup; pass null if none */
        reply_markup?: ReplyMarkup;
        /** New text content of the message. Must be of type inputMessageText */
        input_message_content?: InputMessageContent;
    }
    
    
    /** Edits the content of a live location in an inline message sent via a bot; for bots only */
    export interface editInlineMessageLiveLocation {
        '@type': 'editInlineMessageLiveLocation';
        /** Inline message identifier */
        inline_message_id?: string;
        /** The new message reply markup; pass null if none */
        reply_markup?: ReplyMarkup;
        /** New location content of the message; pass null to stop sharing the live location */
        location?: location;
        /** The new direction in which the location moves, in degrees; 1-360. Pass 0 if unknown */
        heading?: int32;
        /** The new maximum distance for proximity alerts, in meters (0-100000). Pass 0 if the notification is disabled */
        proximity_alert_radius?: int32;
    }
    
    
    /** Edits the content of a message with an animation, an audio, a document, a photo or a video in an inline message sent via a bot; for bots only */
    export interface editInlineMessageMedia {
        '@type': 'editInlineMessageMedia';
        /** Inline message identifier */
        inline_message_id?: string;
        /** The new message reply markup; pass null if none; for bots only */
        reply_markup?: ReplyMarkup;
        /** New content of the message. Must be one of the following types: inputMessageAnimation, inputMessageAudio, inputMessageDocument, inputMessagePhoto or inputMessageVideo */
        input_message_content?: InputMessageContent;
    }
    
    
    /** Edits the caption of an inline message sent via a bot; for bots only */
    export interface editInlineMessageCaption {
        '@type': 'editInlineMessageCaption';
        /** Inline message identifier */
        inline_message_id?: string;
        /** The new message reply markup; pass null if none */
        reply_markup?: ReplyMarkup;
        /** New message content caption; pass null to remove caption; 0-GetOption("message_caption_length_max") characters */
        caption?: formattedText;
    }
    
    
    /** Edits the reply markup of an inline message sent via a bot; for bots only */
    export interface editInlineMessageReplyMarkup {
        '@type': 'editInlineMessageReplyMarkup';
        /** Inline message identifier */
        inline_message_id?: string;
        /** The new message reply markup; pass null if none */
        reply_markup?: ReplyMarkup;
    }
    
    
    /** Edits the time when a scheduled message will be sent. Scheduling state of all messages in the same album or forwarded together with the message will be also changed */
    export interface editMessageSchedulingState {
        '@type': 'editMessageSchedulingState';
        /** The chat the message belongs to */
        chat_id?: int53;
        /** Identifier of the message */
        message_id?: int53;
        /** The new message scheduling state; pass null to send the message immediately */
        scheduling_state?: MessageSchedulingState;
    }
    
    
    /** Returns reactions, which can be added to a message. The list can change after updateReactions, updateChatAvailableReactions for the chat, or updateMessageInteractionInfo for the message. The method will return Premium reactions, even the current user has no Premium subscription */
    export interface getMessageAvailableReactions {
        '@type': 'getMessageAvailableReactions';
        /** Identifier of the chat to which the message belongs */
        chat_id?: int53;
        /** Identifier of the message */
        message_id?: int53;
    }
    
    
    /** Changes chosen reaction for a message */
    export interface setMessageReaction {
        '@type': 'setMessageReaction';
        /** Identifier of the chat to which the message belongs */
        chat_id?: int53;
        /** Identifier of the message */
        message_id?: int53;
        /** Text representation of the new chosen reaction. Can be an empty string or the currently chosen non-big reaction to remove the reaction */
        reaction?: string;
        /** Pass true if the reaction is added with a big animation */
        is_big?: Bool;
    }
    
    
    /** Returns reactions added for a message, along with their sender */
    export interface getMessageAddedReactions {
        '@type': 'getMessageAddedReactions';
        /** Identifier of the chat to which the message belongs */
        chat_id?: int53;
        /** Identifier of the message */
        message_id?: int53;
        /** If non-empty, only added reactions with the specified text representation will be returned */
        reaction?: string;
        /** Offset of the first entry to return as received from the previous request; use empty string to get the first chunk of results */
        offset?: string;
        /** The maximum number of reactions to be returned; must be positive and can't be greater than 100 */
        limit?: int32;
    }
    
    
    /** Returns all entities (mentions, hashtags, cashtags, bot commands, bank card numbers, URLs, and email addresses) contained in the text. Can be called synchronously */
    export interface getTextEntities {
        '@type': 'getTextEntities';
        /** The text in which to look for entites */
        text?: string;
    }
    
    
    /** Parses Bold, Italic, Underline, Strikethrough, Spoiler, Code, Pre, PreCode, TextUrl and MentionName entities contained in the text. Can be called synchronously */
    export interface parseTextEntities {
        '@type': 'parseTextEntities';
        /** The text to parse */
        text?: string;
        /** Text parse mode */
        parse_mode?: TextParseMode;
    }
    
    
    /** Parses Markdown entities in a human-friendly format, ignoring markup errors. Can be called synchronously */
    export interface parseMarkdown {
        '@type': 'parseMarkdown';
        /** The text to parse. For example, "__italic__ ~~strikethrough~~ ||spoiler|| **bold** `code` ```pre``` __[italic__ text_url](telegram.org) __italic**bold italic__bold**" */
        text?: formattedText;
    }
    
    
    /** Replaces text entities with Markdown formatting in a human-friendly format. Entities that can't be represented in Markdown unambiguously are kept as is. Can be called synchronously */
    export interface getMarkdownText {
        '@type': 'getMarkdownText';
        /** The text */
        text?: formattedText;
    }
    
    
    /** Returns the MIME type of a file, guessed by its extension. Returns an empty string on failure. Can be called synchronously */
    export interface getFileMimeType {
        '@type': 'getFileMimeType';
        /** The name of the file or path to the file */
        file_name?: string;
    }
    
    
    /** Returns the extension of a file, guessed by its MIME type. Returns an empty string on failure. Can be called synchronously */
    export interface getFileExtension {
        '@type': 'getFileExtension';
        /** The MIME type of the file */
        mime_type?: string;
    }
    
    
    /** Removes potentially dangerous characters from the name of a file. The encoding of the file name is supposed to be UTF-8. Returns an empty string on failure. Can be called synchronously */
    export interface cleanFileName {
        '@type': 'cleanFileName';
        /** File name or path to the file */
        file_name?: string;
    }
    
    
    /** Returns a string stored in the local database from the specified localization target and language pack by its key. Returns a 404 error if the string is not found. Can be called synchronously */
    export interface getLanguagePackString {
        '@type': 'getLanguagePackString';
        /** Path to the language pack database in which strings are stored */
        language_pack_database_path?: string;
        /** Localization target to which the language pack belongs */
        localization_target?: string;
        /** Language pack identifier */
        language_pack_id?: string;
        /** Language pack key of the string to be returned */
        key?: string;
    }
    
    
    /** Converts a JSON-serialized string to corresponding JsonValue object. Can be called synchronously */
    export interface getJsonValue {
        '@type': 'getJsonValue';
        /** The JSON-serialized string */
        json?: string;
    }
    
    
    /** Converts a JsonValue object to corresponding JSON-serialized string. Can be called synchronously */
    export interface getJsonString {
        '@type': 'getJsonString';
        /** The JsonValue object */
        json_value?: JsonValue;
    }
    
    
    /** Converts a themeParameters object to corresponding JSON-serialized string. Can be called synchronously */
    export interface getThemeParametersJsonString {
        '@type': 'getThemeParametersJsonString';
        /** Theme parameters to convert to JSON */
        theme?: themeParameters;
    }
    
    
    /** Changes the user answer to a poll. A poll in quiz mode can be answered only once */
    export interface setPollAnswer {
        '@type': 'setPollAnswer';
        /** Identifier of the chat to which the poll belongs */
        chat_id?: int53;
        /** Identifier of the message containing the poll */
        message_id?: int53;
        /** 0-based identifiers of answer options, chosen by the user. User can choose more than 1 answer option only is the poll allows multiple answers */
        option_ids?: vector<int32>;
    }
    
    
    /** Returns users voted for the specified option in a non-anonymous polls. For optimal performance, the number of returned users is chosen by TDLib */
    export interface getPollVoters {
        '@type': 'getPollVoters';
        /** Identifier of the chat to which the poll belongs */
        chat_id?: int53;
        /** Identifier of the message containing the poll */
        message_id?: int53;
        /** 0-based identifier of the answer option */
        option_id?: int32;
        /** Number of users to skip in the result; must be non-negative */
        offset?: int32;
        /** The maximum number of users to be returned; must be positive and can't be greater than 50. For optimal performance, the number of returned users is chosen by TDLib and can be smaller than the specified limit, even if the end of the voter list has not been reached */
        limit?: int32;
    }
    
    
    /** Stops a poll. A poll in a message can be stopped when the message has can_be_edited flag set */
    export interface stopPoll {
        '@type': 'stopPoll';
        /** Identifier of the chat to which the poll belongs */
        chat_id?: int53;
        /** Identifier of the message containing the poll */
        message_id?: int53;
        /** The new message reply markup; pass null if none; for bots only */
        reply_markup?: ReplyMarkup;
    }
    
    
    /** Hides a suggested action */
    export interface hideSuggestedAction {
        '@type': 'hideSuggestedAction';
        /** Suggested action to hide */
        action?: SuggestedAction;
    }
    
    
    /** Returns information about a button of type inlineKeyboardButtonTypeLoginUrl. The method needs to be called when the user presses the button */
    export interface getLoginUrlInfo {
        '@type': 'getLoginUrlInfo';
        /** Chat identifier of the message with the button */
        chat_id?: int53;
        /** Message identifier of the message with the button */
        message_id?: int53;
        /** Button identifier */
        button_id?: int53;
    }
    
    
    /** Returns an HTTP URL which can be used to automatically authorize the user on a website after clicking an inline button of type inlineKeyboardButtonTypeLoginUrl. -Use the method getLoginUrlInfo to find whether a prior user confirmation is needed. If an error is returned, then the button must be handled as an ordinary URL button */
    export interface getLoginUrl {
        '@type': 'getLoginUrl';
        /** Chat identifier of the message with the button */
        chat_id?: int53;
        /** Message identifier of the message with the button */
        message_id?: int53;
        /** Button identifier */
        button_id?: int53;
        /** Pass true to allow the bot to send messages to the current user */
        allow_write_access?: Bool;
    }
    
    
    /** Sends an inline query to a bot and returns its results. Returns an error with code 502 if the bot fails to answer the query before the query timeout expires */
    export interface getInlineQueryResults {
        '@type': 'getInlineQueryResults';
        /** The identifier of the target bot */
        bot_user_id?: int53;
        /** Identifier of the chat where the query was sent */
        chat_id?: int53;
        /** Location of the user; pass null if unknown or the bot doesn't need user's location */
        user_location?: location;
        /** Text of the query */
        query?: string;
        /** Offset of the first entry to return */
        offset?: string;
    }
    
    
    /** Sets the result of an inline query; for bots only */
    export interface answerInlineQuery {
        '@type': 'answerInlineQuery';
        /** Identifier of the inline query */
        inline_query_id?: int64;
        /** Pass true if results may be cached and returned only for the user that sent the query. By default, results may be returned to any user who sends the same query */
        is_personal?: Bool;
        /** The results of the query */
        results?: vector<InputInlineQueryResult>;
        /** Allowed time to cache the results of the query, in seconds */
        cache_time?: int32;
        /** Offset for the next inline query; pass an empty string if there are no more results */
        next_offset?: string;
        /** If non-empty, this text must be shown on the button that opens a private chat with the bot and sends a start message to the bot with the parameter switch_pm_parameter */
        switch_pm_text?: string;
        /** The parameter for the bot start message */
        switch_pm_parameter?: string;
    }
    
    
    /** Returns an HTTPS URL of a Web App to open after keyboardButtonTypeWebApp button is pressed */
    export interface getWebAppUrl {
        '@type': 'getWebAppUrl';
        /** Identifier of the target bot */
        bot_user_id?: int53;
        /** The URL from the keyboardButtonTypeWebApp button */
        url?: string;
        /** Preferred Web App theme; pass null to use the default theme */
        theme?: themeParameters;
    }
    
    
    /** Sends data received from a keyboardButtonTypeWebApp Web App to a bot */
    export interface sendWebAppData {
        '@type': 'sendWebAppData';
        /** Identifier of the target bot */
        bot_user_id?: int53;
        /** Text of the keyboardButtonTypeWebApp button, which opened the Web App */
        button_text?: string;
        /** Received data */
        data?: string;
    }
    
    
    /** Informs TDLib that a Web App is being opened from attachment menu, a botMenuButton button, an internalLinkTypeAttachmentMenuBot link, or an inlineKeyboardButtonTypeWebApp button. -For each bot, a confirmation alert about data sent to the bot must be shown once */
    export interface openWebApp {
        '@type': 'openWebApp';
        /** Identifier of the chat in which the Web App is opened */
        chat_id?: int53;
        /** Identifier of the bot, providing the Web App */
        bot_user_id?: int53;
        /** The URL from an inlineKeyboardButtonTypeWebApp button, a botMenuButton button, or an internalLinkTypeAttachmentMenuBot link, or an empty string otherwise */
        url?: string;
        /** Preferred Web App theme; pass null to use the default theme */
        theme?: themeParameters;
        /** Identifier of the replied message for the message sent by the Web App; 0 if none */
        reply_to_message_id?: int53;
    }
    
    
    /** Informs TDLib that a previously opened Web App was closed */
    export interface closeWebApp {
        '@type': 'closeWebApp';
        /** Identifier of Web App launch, received from openWebApp */
        web_app_launch_id?: int64;
    }
    
    
    /** Sets the result of interaction with a Web App and sends corresponding message on behalf of the user to the chat from which the query originated; for bots only */
    export interface answerWebAppQuery {
        '@type': 'answerWebAppQuery';
        /** Identifier of the Web App query */
        web_app_query_id?: string;
        /** The result of the query */
        result?: InputInlineQueryResult;
    }
    
    
    /** Sends a callback query to a bot and returns an answer. Returns an error with code 502 if the bot fails to answer the query before the query timeout expires */
    export interface getCallbackQueryAnswer {
        '@type': 'getCallbackQueryAnswer';
        /** Identifier of the chat with the message */
        chat_id?: int53;
        /** Identifier of the message from which the query originated */
        message_id?: int53;
        /** Query payload */
        payload?: CallbackQueryPayload;
    }
    
    
    /** Sets the result of a callback query; for bots only */
    export interface answerCallbackQuery {
        '@type': 'answerCallbackQuery';
        /** Identifier of the callback query */
        callback_query_id?: int64;
        /** Text of the answer */
        text?: string;
        /** Pass true to show an alert to the user instead of a toast notification */
        show_alert?: Bool;
        /** URL to be opened */
        url?: string;
        /** Time during which the result of the query can be cached, in seconds */
        cache_time?: int32;
    }
    
    
    /** Sets the result of a shipping query; for bots only */
    export interface answerShippingQuery {
        '@type': 'answerShippingQuery';
        /** Identifier of the shipping query */
        shipping_query_id?: int64;
        /** Available shipping options */
        shipping_options?: vector<shippingOption>;
        /** An error message, empty on success */
        error_message?: string;
    }
    
    
    /** Sets the result of a pre-checkout query; for bots only */
    export interface answerPreCheckoutQuery {
        '@type': 'answerPreCheckoutQuery';
        /** Identifier of the pre-checkout query */
        pre_checkout_query_id?: int64;
        /** An error message, empty on success */
        error_message?: string;
    }
    
    
    /** Updates the game score of the specified user in the game; for bots only */
    export interface setGameScore {
        '@type': 'setGameScore';
        /** The chat to which the message with the game belongs */
        chat_id?: int53;
        /** Identifier of the message */
        message_id?: int53;
        /** Pass true to edit the game message to include the current scoreboard */
        edit_message?: Bool;
        /** User identifier */
        user_id?: int53;
        /** The new score */
        score?: int32;
        /** Pass true to update the score even if it decreases. If the score is 0, the user will be deleted from the high score table */
        force?: Bool;
    }
    
    
    /** Updates the game score of the specified user in a game; for bots only */
    export interface setInlineGameScore {
        '@type': 'setInlineGameScore';
        /** Inline message identifier */
        inline_message_id?: string;
        /** Pass true to edit the game message to include the current scoreboard */
        edit_message?: Bool;
        /** User identifier */
        user_id?: int53;
        /** The new score */
        score?: int32;
        /** Pass true to update the score even if it decreases. If the score is 0, the user will be deleted from the high score table */
        force?: Bool;
    }
    
    
    /** Returns the high scores for a game and some part of the high score table in the range of the specified user; for bots only */
    export interface getGameHighScores {
        '@type': 'getGameHighScores';
        /** The chat that contains the message with the game */
        chat_id?: int53;
        /** Identifier of the message */
        message_id?: int53;
        /** User identifier */
        user_id?: int53;
    }
    
    
    /** Returns game high scores and some part of the high score table in the range of the specified user; for bots only */
    export interface getInlineGameHighScores {
        '@type': 'getInlineGameHighScores';
        /** Inline message identifier */
        inline_message_id?: string;
        /** User identifier */
        user_id?: int53;
    }
    
    
    /** Deletes the default reply markup from a chat. Must be called after a one-time keyboard or a ForceReply reply markup has been used. UpdateChatReplyMarkup will be sent if the reply markup is changed */
    export interface deleteChatReplyMarkup {
        '@type': 'deleteChatReplyMarkup';
        /** Chat identifier */
        chat_id?: int53;
        /** The message identifier of the used keyboard */
        message_id?: int53;
    }
    
    
    /** Sends a notification about user activity in a chat */
    export interface sendChatAction {
        '@type': 'sendChatAction';
        /** Chat identifier */
        chat_id?: int53;
        /** If not 0, a message thread identifier in which the action was performed */
        message_thread_id?: int53;
        /** The action description; pass null to cancel the currently active action */
        action?: ChatAction;
    }
    
    
    /** Informs TDLib that the chat is opened by the user. Many useful activities depend on the chat being opened or closed (e.g., in supergroups and channels all updates are received only for opened chats) */
    export interface openChat {
        '@type': 'openChat';
        /** Chat identifier */
        chat_id?: int53;
    }
    
    
    /** Informs TDLib that the chat is closed by the user. Many useful activities depend on the chat being opened or closed */
    export interface closeChat {
        '@type': 'closeChat';
        /** Chat identifier */
        chat_id?: int53;
    }
    
    
    /** Informs TDLib that messages are being viewed by the user. Sponsored messages must be marked as viewed only when the entire text of the message is shown on the screen (excluding the button). Many useful activities depend on whether the messages are currently being viewed or not (e.g., marking messages as read, incrementing a view counter, updating a view counter, removing deleted messages in supergroups and channels) */
    export interface viewMessages {
        '@type': 'viewMessages';
        /** Chat identifier */
        chat_id?: int53;
        /** If not 0, a message thread identifier in which the messages are being viewed */
        message_thread_id?: int53;
        /** The identifiers of the messages being viewed */
        message_ids?: vector<int53>;
        /** Pass true to mark as read the specified messages even the chat is closed */
        force_read?: Bool;
    }
    
    
    /** Informs TDLib that the message content has been opened (e.g., the user has opened a photo, video, document, location or venue, or has listened to an audio file or voice note message). An updateMessageContentOpened update will be generated if something has changed */
    export interface openMessageContent {
        '@type': 'openMessageContent';
        /** Chat identifier of the message */
        chat_id?: int53;
        /** Identifier of the message with the opened content */
        message_id?: int53;
    }
    
    
    /** Informs TDLib that a message with an animated emoji was clicked by the user. Returns a big animated sticker to be played or a 404 error if usual animation needs to be played */
    export interface clickAnimatedEmojiMessage {
        '@type': 'clickAnimatedEmojiMessage';
        /** Chat identifier of the message */
        chat_id?: int53;
        /** Identifier of the clicked message */
        message_id?: int53;
    }
    
    
    /** Returns information about the type of an internal link. Returns a 404 error if the link is not internal. Can be called before authorization */
    export interface getInternalLinkType {
        '@type': 'getInternalLinkType';
        /** The link */
        link?: string;
    }
    
    
    /** Returns information about an action to be done when the current user clicks an external link. Don't use this method for links from secret chats if web page preview is disabled in secret chats */
    export interface getExternalLinkInfo {
        '@type': 'getExternalLinkInfo';
        /** The link */
        link?: string;
    }
    
    
    /** Returns an HTTP URL which can be used to automatically authorize the current user on a website after clicking an HTTP link. Use the method getExternalLinkInfo to find whether a prior user confirmation is needed */
    export interface getExternalLink {
        '@type': 'getExternalLink';
        /** The HTTP link */
        link?: string;
        /** Pass true if the current user allowed the bot, returned in getExternalLinkInfo, to send them messages */
        allow_write_access?: Bool;
    }
    
    
    /** Marks all mentions in a chat as read */
    export interface readAllChatMentions {
        '@type': 'readAllChatMentions';
        /** Chat identifier */
        chat_id?: int53;
    }
    
    
    /** Marks all reactions in a chat as read */
    export interface readAllChatReactions {
        '@type': 'readAllChatReactions';
        /** Chat identifier */
        chat_id?: int53;
    }
    
    
    /** Returns an existing chat corresponding to a given user */
    export interface createPrivateChat {
        '@type': 'createPrivateChat';
        /** User identifier */
        user_id?: int53;
        /** Pass true to create the chat without a network request. In this case all information about the chat except its type, title and photo can be incorrect */
        force?: Bool;
    }
    
    
    /** Returns an existing chat corresponding to a known basic group */
    export interface createBasicGroupChat {
        '@type': 'createBasicGroupChat';
        /** Basic group identifier */
        basic_group_id?: int53;
        /** Pass true to create the chat without a network request. In this case all information about the chat except its type, title and photo can be incorrect */
        force?: Bool;
    }
    
    
    /** Returns an existing chat corresponding to a known supergroup or channel */
    export interface createSupergroupChat {
        '@type': 'createSupergroupChat';
        /** Supergroup or channel identifier */
        supergroup_id?: int53;
        /** Pass true to create the chat without a network request. In this case all information about the chat except its type, title and photo can be incorrect */
        force?: Bool;
    }
    
    
    /** Returns an existing chat corresponding to a known secret chat */
    export interface createSecretChat {
        '@type': 'createSecretChat';
        /** Secret chat identifier */
        secret_chat_id?: int32;
    }
    
    
    /** Creates a new basic group and sends a corresponding messageBasicGroupChatCreate. Returns the newly created chat */
    export interface createNewBasicGroupChat {
        '@type': 'createNewBasicGroupChat';
        /** Identifiers of users to be added to the basic group */
        user_ids?: vector<int53>;
        /** Title of the new basic group; 1-128 characters */
        title?: string;
    }
    
    
    /** Creates a new supergroup or channel and sends a corresponding messageSupergroupChatCreate. Returns the newly created chat */
    export interface createNewSupergroupChat {
        '@type': 'createNewSupergroupChat';
        /** Title of the new chat; 1-128 characters */
        title?: string;
        /** Pass true to create a channel chat */
        is_channel?: Bool;
        /** Creates a new supergroup or channel and sends a corresponding messageSupergroupChatCreate. Returns the newly created chat */
        description?: string;
        /** Chat location if a location-based supergroup is being created; pass null to create an ordinary supergroup chat */
        location?: chatLocation;
        /** Pass true to create a supergroup for importing messages using importMessage */
        for_import?: Bool;
    }
    
    
    /** Creates a new secret chat. Returns the newly created chat */
    export interface createNewSecretChat {
        '@type': 'createNewSecretChat';
        /** Identifier of the target user */
        user_id?: int53;
    }
    
    
    /** Creates a new supergroup from an existing basic group and sends a corresponding messageChatUpgradeTo and messageChatUpgradeFrom; requires creator privileges. Deactivates the original basic group */
    export interface upgradeBasicGroupChatToSupergroupChat {
        '@type': 'upgradeBasicGroupChatToSupergroupChat';
        /** Identifier of the chat to upgrade */
        chat_id?: int53;
    }
    
    
    /** Returns chat lists to which the chat can be added. This is an offline request */
    export interface getChatListsToAddChat {
        '@type': 'getChatListsToAddChat';
        /** Chat identifier */
        chat_id?: int53;
    }
    
    
    /** Adds a chat to a chat list. A chat can't be simultaneously in Main and Archive chat lists, so it is automatically removed from another one if needed */
    export interface addChatToList {
        '@type': 'addChatToList';
        /** Chat identifier */
        chat_id?: int53;
        /** The chat list. Use getChatListsToAddChat to get suitable chat lists */
        chat_list?: ChatList;
    }
    
    
    /** Returns information about a chat filter by its identifier */
    export interface getChatFilter {
        '@type': 'getChatFilter';
        /** Chat filter identifier */
        chat_filter_id?: int32;
    }
    
    
    /** Creates new chat filter. Returns information about the created chat filter. There can be up to GetOption("chat_filter_count_max") chat filters, but the limit can be increased with Telegram Premium */
    export interface createChatFilter {
        '@type': 'createChatFilter';
        /** Chat filter */
        filter?: chatFilter;
    }
    
    
    /** Edits existing chat filter. Returns information about the edited chat filter */
    export interface editChatFilter {
        '@type': 'editChatFilter';
        /** Chat filter identifier */
        chat_filter_id?: int32;
        /** The edited chat filter */
        filter?: chatFilter;
    }
    
    
    /** Deletes existing chat filter */
    export interface deleteChatFilter {
        '@type': 'deleteChatFilter';
        /** Chat filter identifier */
        chat_filter_id?: int32;
    }
    
    
    /** Changes the order of chat filters */
    export interface reorderChatFilters {
        '@type': 'reorderChatFilters';
        /** Identifiers of chat filters in the new correct order */
        chat_filter_ids?: vector<int32>;
        /** Position of the main chat list among chat filters, 0-based. Can be non-zero only for Premium users */
        main_chat_list_position?: int32;
    }
    
    
    /** Returns recommended chat filters for the current user */
    export interface getRecommendedChatFilters {
        '@type': 'getRecommendedChatFilters';
    }
    
    
    /** Returns default icon name for a filter. Can be called synchronously */
    export interface getChatFilterDefaultIconName {
        '@type': 'getChatFilterDefaultIconName';
        /** Chat filter */
        filter?: chatFilter;
    }
    
    
    /** Changes the chat title. Supported only for basic groups, supergroups and channels. Requires can_change_info administrator right */
    export interface setChatTitle {
        '@type': 'setChatTitle';
        /** Chat identifier */
        chat_id?: int53;
        /** New title of the chat; 1-128 characters */
        title?: string;
    }
    
    
    /** Changes the photo of a chat. Supported only for basic groups, supergroups and channels. Requires can_change_info administrator right */
    export interface setChatPhoto {
        '@type': 'setChatPhoto';
        /** Chat identifier */
        chat_id?: int53;
        /** New chat photo; pass null to delete the chat photo */
        photo?: InputChatPhoto;
    }
    
    
    /** Changes the message TTL in a chat. Requires can_delete_messages administrator right in basic groups, supergroups and channels -Message TTL can't be changed in a chat with the current user (Saved Messages) and the chat 777000 (Telegram). */
    export interface setChatMessageTtl {
        '@type': 'setChatMessageTtl';
        /** Chat identifier */
        chat_id?: int53;
        /** New TTL value, in seconds; unless the chat is secret, it must be from 0 up to 365 * 86400 and be divisible by 86400 */
        ttl?: int32;
    }
    
    
    /** Changes the chat members permissions. Supported only for basic groups and supergroups. Requires can_restrict_members administrator right */
    export interface setChatPermissions {
        '@type': 'setChatPermissions';
        /** Chat identifier */
        chat_id?: int53;
        /** New non-administrator members permissions in the chat */
        permissions?: chatPermissions;
    }
    
    
    /** Changes the chat theme. Supported only in private and secret chats */
    export interface setChatTheme {
        '@type': 'setChatTheme';
        /** Chat identifier */
        chat_id?: int53;
        /** Name of the new chat theme; pass an empty string to return the default theme */
        theme_name?: string;
    }
    
    
    /** Changes the draft message in a chat */
    export interface setChatDraftMessage {
        '@type': 'setChatDraftMessage';
        /** Chat identifier */
        chat_id?: int53;
        /** If not 0, a message thread identifier in which the draft was changed */
        message_thread_id?: int53;
        /** New draft message; pass null to remove the draft */
        draft_message?: draftMessage;
    }
    
    
    /** Changes the notification settings of a chat. Notification settings of a chat with the current user (Saved Messages) can't be changed */
    export interface setChatNotificationSettings {
        '@type': 'setChatNotificationSettings';
        /** Chat identifier */
        chat_id?: int53;
        /** New notification settings for the chat. If the chat is muted for more than 1 week, it is considered to be muted forever */
        notification_settings?: chatNotificationSettings;
    }
    
    
    /** Changes the ability of users to save, forward, or copy chat content. Supported only for basic groups, supergroups and channels. Requires owner privileges */
    export interface toggleChatHasProtectedContent {
        '@type': 'toggleChatHasProtectedContent';
        /** Chat identifier */
        chat_id?: int53;
        /** New value of has_protected_content */
        has_protected_content?: Bool;
    }
    
    
    /** Changes the marked as unread state of a chat */
    export interface toggleChatIsMarkedAsUnread {
        '@type': 'toggleChatIsMarkedAsUnread';
        /** Chat identifier */
        chat_id?: int53;
        /** New value of is_marked_as_unread */
        is_marked_as_unread?: Bool;
    }
    
    
    /** Changes the value of the default disable_notification parameter, used when a message is sent to a chat */
    export interface toggleChatDefaultDisableNotification {
        '@type': 'toggleChatDefaultDisableNotification';
        /** Chat identifier */
        chat_id?: int53;
        /** New value of default_disable_notification */
        default_disable_notification?: Bool;
    }
    
    
    /** Changes reactions, available in a chat. Available for basic groups, supergroups, and channels. Requires can_change_info administrator right */
    export interface setChatAvailableReactions {
        '@type': 'setChatAvailableReactions';
        /** Identifier of the chat */
        chat_id?: int53;
        /** New list of reactions, available in the chat. All reactions must be active */
        available_reactions?: vector<string>;
    }
    
    
    /** Changes application-specific data associated with a chat */
    export interface setChatClientData {
        '@type': 'setChatClientData';
        /** Chat identifier */
        chat_id?: int53;
        /** New value of client_data */
        client_data?: string;
    }
    
    
    /** Changes information about a chat. Available for basic groups, supergroups, and channels. Requires can_change_info administrator right */
    export interface setChatDescription {
        '@type': 'setChatDescription';
        /** Identifier of the chat */
        chat_id?: int53;
        /** Changes information about a chat. Available for basic groups, supergroups, and channels. Requires can_change_info administrator right */
        description?: string;
    }
    
    
    /** Changes the discussion group of a channel chat; requires can_change_info administrator right in the channel if it is specified */
    export interface setChatDiscussionGroup {
        '@type': 'setChatDiscussionGroup';
        /** Identifier of the channel chat. Pass 0 to remove a link from the supergroup passed in the second argument to a linked channel chat (requires can_pin_messages rights in the supergroup) */
        chat_id?: int53;
        /** Identifier of a new channel's discussion group. Use 0 to remove the discussion group. -Use the method getSuitableDiscussionChats to find all suitable groups. Basic group chats must be first upgraded to supergroup chats. If new chat members don't have access to old messages in the supergroup, then toggleSupergroupIsAllHistoryAvailable must be used first to change that */
        discussion_chat_id?: int53;
    }
    
    
    /** Changes the location of a chat. Available only for some location-based supergroups, use supergroupFullInfo.can_set_location to check whether the method is allowed to use */
    export interface setChatLocation {
        '@type': 'setChatLocation';
        /** Chat identifier */
        chat_id?: int53;
        /** New location for the chat; must be valid and not null */
        location?: chatLocation;
    }
    
    
    /** Changes the slow mode delay of a chat. Available only for supergroups; requires can_restrict_members rights */
    export interface setChatSlowModeDelay {
        '@type': 'setChatSlowModeDelay';
        /** Chat identifier */
        chat_id?: int53;
        /** New slow mode delay for the chat, in seconds; must be one of 0, 10, 30, 60, 300, 900, 3600 */
        slow_mode_delay?: int32;
    }
    
    
    /** Pins a message in a chat; requires can_pin_messages rights or can_edit_messages rights in the channel */
    export interface pinChatMessage {
        '@type': 'pinChatMessage';
        /** Identifier of the chat */
        chat_id?: int53;
        /** Identifier of the new pinned message */
        message_id?: int53;
        /** Pass true to disable notification about the pinned message. Notifications are always disabled in channels and private chats */
        disable_notification?: Bool;
        /** Pass true to pin the message only for self; private chats only */
        only_for_self?: Bool;
    }
    
    
    /** Removes a pinned message from a chat; requires can_pin_messages rights in the group or can_edit_messages rights in the channel */
    export interface unpinChatMessage {
        '@type': 'unpinChatMessage';
        /** Identifier of the chat */
        chat_id?: int53;
        /** Identifier of the removed pinned message */
        message_id?: int53;
    }
    
    
    /** Removes all pinned messages from a chat; requires can_pin_messages rights in the group or can_edit_messages rights in the channel */
    export interface unpinAllChatMessages {
        '@type': 'unpinAllChatMessages';
        /** Identifier of the chat */
        chat_id?: int53;
    }
    
    
    /** Adds the current user as a new member to a chat. Private and secret chats can't be joined using this method. May return an error with a message "INVITE_REQUEST_SENT" if only a join request was created */
    export interface joinChat {
        '@type': 'joinChat';
        /** Chat identifier */
        chat_id?: int53;
    }
    
    
    /** Removes the current user from chat members. Private and secret chats can't be left using this method */
    export interface leaveChat {
        '@type': 'leaveChat';
        /** Chat identifier */
        chat_id?: int53;
    }
    
    
    /** Adds a new member to a chat. Members can't be added to private or secret chats */
    export interface addChatMember {
        '@type': 'addChatMember';
        /** Chat identifier */
        chat_id?: int53;
        /** Identifier of the user */
        user_id?: int53;
        /** The number of earlier messages from the chat to be forwarded to the new member; up to 100. Ignored for supergroups and channels, or if the added user is a bot */
        forward_limit?: int32;
    }
    
    
    /** Adds multiple new members to a chat. Currently, this method is only available for supergroups and channels. This method can't be used to join a chat. Members can't be added to a channel if it has more than 200 members */
    export interface addChatMembers {
        '@type': 'addChatMembers';
        /** Chat identifier */
        chat_id?: int53;
        /** Identifiers of the users to be added to the chat. The maximum number of added users is 20 for supergroups and 100 for channels */
        user_ids?: vector<int53>;
    }
    
    
    /** Changes the status of a chat member, needs appropriate privileges. This function is currently not suitable for transferring chat ownership; use transferChatOwnership instead. Use addChatMember or banChatMember if some additional parameters needs to be passed */
    export interface setChatMemberStatus {
        '@type': 'setChatMemberStatus';
        /** Chat identifier */
        chat_id?: int53;
        /** Member identifier. Chats can be only banned and unbanned in supergroups and channels */
        member_id?: MessageSender;
        /** The new status of the member in the chat */
        status?: ChatMemberStatus;
    }
    
    
    /** Bans a member in a chat. Members can't be banned in private or secret chats. In supergroups and channels, the user will not be able to return to the group on their own using invite links, etc., unless unbanned first */
    export interface banChatMember {
        '@type': 'banChatMember';
        /** Chat identifier */
        chat_id?: int53;
        /** Member identifier */
        member_id?: MessageSender;
        /** Point in time (Unix timestamp) when the user will be unbanned; 0 if never. If the user is banned for more than 366 days or for less than 30 seconds from the current time, the user is considered to be banned forever. Ignored in basic groups and if a chat is banned */
        banned_until_date?: int32;
        /** Pass true to delete all messages in the chat for the user that is being removed. Always true for supergroups and channels */
        revoke_messages?: Bool;
    }
    
    
    /** Checks whether the current session can be used to transfer a chat ownership to another user */
    export interface canTransferOwnership {
        '@type': 'canTransferOwnership';
    }
    
    
    /** Changes the owner of a chat. The current user must be a current owner of the chat. Use the method canTransferOwnership to check whether the ownership can be transferred from the current session. Available only for supergroups and channel chats */
    export interface transferChatOwnership {
        '@type': 'transferChatOwnership';
        /** Chat identifier */
        chat_id?: int53;
        /** Identifier of the user to which transfer the ownership. The ownership can't be transferred to a bot or to a deleted user */
        user_id?: int53;
        /** The password of the current user */
        password?: string;
    }
    
    
    /** Returns information about a single member of a chat */
    export interface getChatMember {
        '@type': 'getChatMember';
        /** Chat identifier */
        chat_id?: int53;
        /** Member identifier */
        member_id?: MessageSender;
    }
    
    
    /** Searches for a specified query in the first name, last name and username of the members of a specified chat. Requires administrator rights in channels */
    export interface searchChatMembers {
        '@type': 'searchChatMembers';
        /** Chat identifier */
        chat_id?: int53;
        /** Query to search for */
        query?: string;
        /** The maximum number of users to be returned; up to 200 */
        limit?: int32;
        /** The type of users to search for; pass null to search among all chat members */
        filter?: ChatMembersFilter;
    }
    
    
    /** Returns a list of administrators of the chat with their custom titles */
    export interface getChatAdministrators {
        '@type': 'getChatAdministrators';
        /** Chat identifier */
        chat_id?: int53;
    }
    
    
    /** Clears message drafts in all chats */
    export interface clearAllDraftMessages {
        '@type': 'clearAllDraftMessages';
        /** Pass true to keep local message drafts in secret chats */
        exclude_secret_chats?: Bool;
    }
    
    
    /** Returns saved notification sound by its identifier. Returns a 404 error if there is no saved notification sound with the specified identifier */
    export interface getSavedNotificationSound {
        '@type': 'getSavedNotificationSound';
        /** Identifier of the notification sound */
        notification_sound_id?: int64;
    }
    
    
    /** Returns list of saved notification sounds. If a sound isn't in the list, then default sound needs to be used */
    export interface getSavedNotificationSounds {
        '@type': 'getSavedNotificationSounds';
    }
    
    
    /** Adds a new notification sound to the list of saved notification sounds. The new notification sound is added to the top of the list. If it is already in the list, its position isn't changed */
    export interface addSavedNotificationSound {
        '@type': 'addSavedNotificationSound';
        /** Notification sound file to add */
        sound?: InputFile;
    }
    
    
    /** Removes a notification sound from the list of saved notification sounds */
    export interface removeSavedNotificationSound {
        '@type': 'removeSavedNotificationSound';
        /** Identifier of the notification sound */
        notification_sound_id?: int64;
    }
    
    
    /** Returns list of chats with non-default notification settings */
    export interface getChatNotificationSettingsExceptions {
        '@type': 'getChatNotificationSettingsExceptions';
        /** If specified, only chats from the scope will be returned; pass null to return chats from all scopes */
        scope?: NotificationSettingsScope;
        /** Pass true to include in the response chats with only non-default sound */
        compare_sound?: Bool;
    }
    
    
    /** Returns the notification settings for chats of a given type */
    export interface getScopeNotificationSettings {
        '@type': 'getScopeNotificationSettings';
        /** Types of chats for which to return the notification settings information */
        scope?: NotificationSettingsScope;
    }
    
    
    /** Changes notification settings for chats of a given type */
    export interface setScopeNotificationSettings {
        '@type': 'setScopeNotificationSettings';
        /** Types of chats for which to change the notification settings */
        scope?: NotificationSettingsScope;
        /** The new notification settings for the given scope */
        notification_settings?: scopeNotificationSettings;
    }
    
    
    /** Resets all notification settings to their default values. By default, all chats are unmuted and message previews are shown */
    export interface resetAllNotificationSettings {
        '@type': 'resetAllNotificationSettings';
    }
    
    
    /** Changes the pinned state of a chat. There can be up to GetOption("pinned_chat_count_max")/GetOption("pinned_archived_chat_count_max") pinned non-secret chats and the same number of secret chats in the main/archive chat list. The limit can be increased with Telegram Premium */
    export interface toggleChatIsPinned {
        '@type': 'toggleChatIsPinned';
        /** Chat list in which to change the pinned state of the chat */
        chat_list?: ChatList;
        /** Chat identifier */
        chat_id?: int53;
        /** Pass true to pin the chat; pass false to unpin it */
        is_pinned?: Bool;
    }
    
    
    /** Changes the order of pinned chats */
    export interface setPinnedChats {
        '@type': 'setPinnedChats';
        /** Chat list in which to change the order of pinned chats */
        chat_list?: ChatList;
        /** The new list of pinned chats */
        chat_ids?: vector<int53>;
    }
    
    
    /** Returns information about a bot that can be added to attachment menu */
    export interface getAttachmentMenuBot {
        '@type': 'getAttachmentMenuBot';
        /** Bot's user identifier */
        bot_user_id?: int53;
    }
    
    
    /** Adds or removes a bot to attachment menu. Bot can be added to attachment menu, only if userTypeBot.can_be_added_to_attachment_menu == true */
    export interface toggleBotIsAddedToAttachmentMenu {
        '@type': 'toggleBotIsAddedToAttachmentMenu';
        /** Bot's user identifier */
        bot_user_id?: int53;
        /** Pass true to add the bot to attachment menu; pass false to remove the bot from attachment menu */
        is_added?: Bool;
    }
    
    
    /** Downloads a file from the cloud. Download progress and completion of the download will be notified through updateFile updates */
    export interface downloadFile {
        '@type': 'downloadFile';
        /** Identifier of the file to download */
        file_id?: int32;
        /** Priority of the download (1-32). The higher the priority, the earlier the file will be downloaded. If the priorities of two files are equal, then the last one for which downloadFile/addFileToDownloads was called will be downloaded first */
        priority?: int32;
        /** The starting position from which the file needs to be downloaded */
        offset?: int53;
        /** Number of bytes which need to be downloaded starting from the "offset" position before the download will automatically be canceled; use 0 to download without a limit */
        limit?: int53;
        /** Pass true to return response only after the file download has succeeded, has failed, has been canceled, or a new downloadFile request with different offset/limit parameters was sent; pass false to return file state immediately, just after the download has been started */
        synchronous?: Bool;
    }
    
    
    /** Stops the downloading of a file. If a file has already been downloaded, does nothing */
    export interface cancelDownloadFile {
        '@type': 'cancelDownloadFile';
        /** Identifier of a file to stop downloading */
        file_id?: int32;
        /** Pass true to stop downloading only if it hasn't been started, i.e. request hasn't been sent to server */
        only_if_pending?: Bool;
    }
    
    
    /** Returns suggested name for saving a file in a given directory */
    export interface getSuggestedFileName {
        '@type': 'getSuggestedFileName';
        /** Identifier of the file */
        file_id?: int32;
        /** Directory in which the file is supposed to be saved */
        directory?: string;
    }
    
    
    /** Asynchronously uploads a file to the cloud without sending it in a message. updateFile will be used to notify about upload progress and successful completion of the upload. The file will not have a persistent remote identifier until it will be sent in a message */
    export interface uploadFile {
        '@type': 'uploadFile';
        /** File to upload */
        file?: InputFile;
        /** File type; pass null if unknown */
        file_type?: FileType;
        /** Priority of the upload (1-32). The higher the priority, the earlier the file will be uploaded. If the priorities of two files are equal, then the first one for which uploadFile was called will be uploaded first */
        priority?: int32;
    }
    
    
    /** Stops the uploading of a file. Supported only for files uploaded by using uploadFile. For other files the behavior is undefined */
    export interface cancelUploadFile {
        '@type': 'cancelUploadFile';
        /** Identifier of the file to stop uploading */
        file_id?: int32;
    }
    
    
    /** Writes a part of a generated file. This method is intended to be used only if the application has no direct access to TDLib's file system, because it is usually slower than a direct write to the destination file */
    export interface writeGeneratedFilePart {
        '@type': 'writeGeneratedFilePart';
        /** The identifier of the generation process */
        generation_id?: int64;
        /** The offset from which to write the data to the file */
        offset?: int53;
        /** The data to write */
        data?: bytes;
    }
    
    
    /** Informs TDLib on a file generation progress */
    export interface setFileGenerationProgress {
        '@type': 'setFileGenerationProgress';
        /** The identifier of the generation process */
        generation_id?: int64;
        /** Expected size of the generated file, in bytes; 0 if unknown */
        expected_size?: int53;
        /** The number of bytes already generated */
        local_prefix_size?: int53;
    }
    
    
    /** Finishes the file generation */
    export interface finishFileGeneration {
        '@type': 'finishFileGeneration';
        /** The identifier of the generation process */
        generation_id?: int64;
        /** If passed, the file generation has failed and must be terminated; pass null if the file generation succeeded */
        error?: error;
    }
    
    
    /** Reads a part of a file from the TDLib file cache and returns read bytes. This method is intended to be used only if the application has no direct access to TDLib's file system, because it is usually slower than a direct read from the file */
    export interface readFilePart {
        '@type': 'readFilePart';
        /** Identifier of the file. The file must be located in the TDLib file cache */
        file_id?: int32;
        /** The offset from which to read the file */
        offset?: int53;
        /** Number of bytes to read. An error will be returned if there are not enough bytes available in the file from the specified position. Pass 0 to read all available data from the specified position */
        count?: int53;
    }
    
    
    /** Deletes a file from the TDLib file cache */
    export interface deleteFile {
        '@type': 'deleteFile';
        /** Identifier of the file to delete */
        file_id?: int32;
    }
    
    
    /** Adds a file from a message to the list of file downloads. Download progress and completion of the download will be notified through updateFile updates. -If message database is used, the list of file downloads is persistent across application restarts. The downloading is independent from download using downloadFile, i.e. it continues if downloadFile is canceled or is used to download a part of the file */
    export interface addFileToDownloads {
        '@type': 'addFileToDownloads';
        /** Identifier of the file to download */
        file_id?: int32;
        /** Chat identifier of the message with the file */
        chat_id?: int53;
        /** Message identifier */
        message_id?: int53;
        /** Priority of the download (1-32). The higher the priority, the earlier the file will be downloaded. If the priorities of two files are equal, then the last one for which downloadFile/addFileToDownloads was called will be downloaded first */
        priority?: int32;
    }
    
    
    /** Changes pause state of a file in the file download list */
    export interface toggleDownloadIsPaused {
        '@type': 'toggleDownloadIsPaused';
        /** Identifier of the downloaded file */
        file_id?: int32;
        /** Pass true if the download is paused */
        is_paused?: Bool;
    }
    
    
    /** Changes pause state of all files in the file download list */
    export interface toggleAllDownloadsArePaused {
        '@type': 'toggleAllDownloadsArePaused';
        /** Pass true to pause all downloads; pass false to unpause them */
        are_paused?: Bool;
    }
    
    
    /** Removes a file from the file download list */
    export interface removeFileFromDownloads {
        '@type': 'removeFileFromDownloads';
        /** Identifier of the downloaded file */
        file_id?: int32;
        /** Pass true to delete the file from the TDLib file cache */
        delete_from_cache?: Bool;
    }
    
    
    /** Removes all files from the file download list */
    export interface removeAllFilesFromDownloads {
        '@type': 'removeAllFilesFromDownloads';
        /** Pass true to remove only active downloads, including paused */
        only_active?: Bool;
        /** Pass true to remove only completed downloads */
        only_completed?: Bool;
        /** Pass true to delete the file from the TDLib file cache */
        delete_from_cache?: Bool;
    }
    
    
    /** Searches for files in the file download list or recently downloaded files from the list */
    export interface searchFileDownloads {
        '@type': 'searchFileDownloads';
        /** Query to search for; may be empty to return all downloaded files */
        query?: string;
        /** Pass true to search only for active downloads, including paused */
        only_active?: Bool;
        /** Pass true to search only for completed downloads */
        only_completed?: Bool;
        /** Offset of the first entry to return as received from the previous request; use empty string to get the first chunk of results */
        offset?: string;
        /** The maximum number of files to be returned */
        limit?: int32;
    }
    
    
    /** Returns information about a file with messages exported from another application */
    export interface getMessageFileType {
        '@type': 'getMessageFileType';
        /** Beginning of the message file; up to 100 first lines */
        message_file_head?: string;
    }
    
    
    /** Returns a confirmation text to be shown to the user before starting message import */
    export interface getMessageImportConfirmationText {
        '@type': 'getMessageImportConfirmationText';
        /** Identifier of a chat to which the messages will be imported. It must be an identifier of a private chat with a mutual contact or an identifier of a supergroup chat with can_change_info administrator right */
        chat_id?: int53;
    }
    
    
    /** Imports messages exported from another app */
    export interface importMessages {
        '@type': 'importMessages';
        /** Identifier of a chat to which the messages will be imported. It must be an identifier of a private chat with a mutual contact or an identifier of a supergroup chat with can_change_info administrator right */
        chat_id?: int53;
        /** File with messages to import. Only inputFileLocal and inputFileGenerated are supported. The file must not be previously uploaded */
        message_file?: InputFile;
        /** Files used in the imported messages. Only inputFileLocal and inputFileGenerated are supported. The files must not be previously uploaded */
        attached_files?: vector<InputFile>;
    }
    
    
    /** Replaces current primary invite link for a chat with a new primary invite link. Available for basic groups, supergroups, and channels. Requires administrator privileges and can_invite_users right */
    export interface replacePrimaryChatInviteLink {
        '@type': 'replacePrimaryChatInviteLink';
        /** Chat identifier */
        chat_id?: int53;
    }
    
    
    /** Creates a new invite link for a chat. Available for basic groups, supergroups, and channels. Requires administrator privileges and can_invite_users right in the chat */
    export interface createChatInviteLink {
        '@type': 'createChatInviteLink';
        /** Chat identifier */
        chat_id?: int53;
        /** Invite link name; 0-32 characters */
        name?: string;
        /** Point in time (Unix timestamp) when the link will expire; pass 0 if never */
        expiration_date?: int32;
        /** The maximum number of chat members that can join the chat via the link simultaneously; 0-99999; pass 0 if not limited */
        member_limit?: int32;
        /** Pass true if users joining the chat via the link need to be approved by chat administrators. In this case, member_limit must be 0 */
        creates_join_request?: Bool;
    }
    
    
    /** Edits a non-primary invite link for a chat. Available for basic groups, supergroups, and channels. Requires administrator privileges and can_invite_users right in the chat for own links and owner privileges for other links */
    export interface editChatInviteLink {
        '@type': 'editChatInviteLink';
        /** Chat identifier */
        chat_id?: int53;
        /** Invite link to be edited */
        invite_link?: string;
        /** Invite link name; 0-32 characters */
        name?: string;
        /** Point in time (Unix timestamp) when the link will expire; pass 0 if never */
        expiration_date?: int32;
        /** The maximum number of chat members that can join the chat via the link simultaneously; 0-99999; pass 0 if not limited */
        member_limit?: int32;
        /** Pass true if users joining the chat via the link need to be approved by chat administrators. In this case, member_limit must be 0 */
        creates_join_request?: Bool;
    }
    
    
    /** Returns information about an invite link. Requires administrator privileges and can_invite_users right in the chat to get own links and owner privileges to get other links */
    export interface getChatInviteLink {
        '@type': 'getChatInviteLink';
        /** Chat identifier */
        chat_id?: int53;
        /** Invite link to get */
        invite_link?: string;
    }
    
    
    /** Returns list of chat administrators with number of their invite links. Requires owner privileges in the chat */
    export interface getChatInviteLinkCounts {
        '@type': 'getChatInviteLinkCounts';
        /** Chat identifier */
        chat_id?: int53;
    }
    
    
    /** Returns invite links for a chat created by specified administrator. Requires administrator privileges and can_invite_users right in the chat to get own links and owner privileges to get other links */
    export interface getChatInviteLinks {
        '@type': 'getChatInviteLinks';
        /** Chat identifier */
        chat_id?: int53;
        /** User identifier of a chat administrator. Must be an identifier of the current user for non-owner */
        creator_user_id?: int53;
        /** Pass true if revoked links needs to be returned instead of active or expired */
        is_revoked?: Bool;
        /** Creation date of an invite link starting after which to return invite links; use 0 to get results from the beginning */
        offset_date?: int32;
        /** Invite link starting after which to return invite links; use empty string to get results from the beginning */
        offset_invite_link?: string;
        /** The maximum number of invite links to return; up to 100 */
        limit?: int32;
    }
    
    
    /** Returns chat members joined a chat via an invite link. Requires administrator privileges and can_invite_users right in the chat for own links and owner privileges for other links */
    export interface getChatInviteLinkMembers {
        '@type': 'getChatInviteLinkMembers';
        /** Chat identifier */
        chat_id?: int53;
        /** Invite link for which to return chat members */
        invite_link?: string;
        /** A chat member from which to return next chat members; pass null to get results from the beginning */
        offset_member?: chatInviteLinkMember;
        /** The maximum number of chat members to return; up to 100 */
        limit?: int32;
    }
    
    
    /** Revokes invite link for a chat. Available for basic groups, supergroups, and channels. Requires administrator privileges and can_invite_users right in the chat for own links and owner privileges for other links. -If a primary link is revoked, then additionally to the revoked link returns new primary link */
    export interface revokeChatInviteLink {
        '@type': 'revokeChatInviteLink';
        /** Chat identifier */
        chat_id?: int53;
        /** Invite link to be revoked */
        invite_link?: string;
    }
    
    
    /** Deletes revoked chat invite links. Requires administrator privileges and can_invite_users right in the chat for own links and owner privileges for other links */
    export interface deleteRevokedChatInviteLink {
        '@type': 'deleteRevokedChatInviteLink';
        /** Chat identifier */
        chat_id?: int53;
        /** Invite link to revoke */
        invite_link?: string;
    }
    
    
    /** Deletes all revoked chat invite links created by a given chat administrator. Requires administrator privileges and can_invite_users right in the chat for own links and owner privileges for other links */
    export interface deleteAllRevokedChatInviteLinks {
        '@type': 'deleteAllRevokedChatInviteLinks';
        /** Chat identifier */
        chat_id?: int53;
        /** User identifier of a chat administrator, which links will be deleted. Must be an identifier of the current user for non-owner */
        creator_user_id?: int53;
    }
    
    
    /** Checks the validity of an invite link for a chat and returns information about the corresponding chat */
    export interface checkChatInviteLink {
        '@type': 'checkChatInviteLink';
        /** Invite link to be checked */
        invite_link?: string;
    }
    
    
    /** Uses an invite link to add the current user to the chat if possible. May return an error with a message "INVITE_REQUEST_SENT" if only a join request was created */
    export interface joinChatByInviteLink {
        '@type': 'joinChatByInviteLink';
        /** Invite link to use */
        invite_link?: string;
    }
    
    
    /** Returns pending join requests in a chat */
    export interface getChatJoinRequests {
        '@type': 'getChatJoinRequests';
        /** Chat identifier */
        chat_id?: int53;
        /** Invite link for which to return join requests. If empty, all join requests will be returned. Requires administrator privileges and can_invite_users right in the chat for own links and owner privileges for other links */
        invite_link?: string;
        /** A query to search for in the first names, last names and usernames of the users to return */
        query?: string;
        /** A chat join request from which to return next requests; pass null to get results from the beginning */
        offset_request?: chatJoinRequest;
        /** The maximum number of requests to join the chat to return */
        limit?: int32;
    }
    
    
    /** Handles a pending join request in a chat */
    export interface processChatJoinRequest {
        '@type': 'processChatJoinRequest';
        /** Chat identifier */
        chat_id?: int53;
        /** Identifier of the user that sent the request */
        user_id?: int53;
        /** Pass true to approve the request; pass false to decline it */
        approve?: Bool;
    }
    
    
    /** Handles all pending join requests for a given link in a chat */
    export interface processChatJoinRequests {
        '@type': 'processChatJoinRequests';
        /** Chat identifier */
        chat_id?: int53;
        /** Invite link for which to process join requests. If empty, all join requests will be processed. Requires administrator privileges and can_invite_users right in the chat for own links and owner privileges for other links */
        invite_link?: string;
        /** Pass true to approve all requests; pass false to decline them */
        approve?: Bool;
    }
    
    
    /** Creates a new call */
    export interface createCall {
        '@type': 'createCall';
        /** Identifier of the user to be called */
        user_id?: int53;
        /** The call protocols supported by the application */
        protocol?: callProtocol;
        /** Pass true to create a video call */
        is_video?: Bool;
    }
    
    
    /** Accepts an incoming call */
    export interface acceptCall {
        '@type': 'acceptCall';
        /** Call identifier */
        call_id?: int32;
        /** The call protocols supported by the application */
        protocol?: callProtocol;
    }
    
    
    /** Sends call signaling data */
    export interface sendCallSignalingData {
        '@type': 'sendCallSignalingData';
        /** Call identifier */
        call_id?: int32;
        /** The data */
        data?: bytes;
    }
    
    
    /** Discards a call */
    export interface discardCall {
        '@type': 'discardCall';
        /** Call identifier */
        call_id?: int32;
        /** Pass true if the user was disconnected */
        is_disconnected?: Bool;
        /** The call duration, in seconds */
        duration?: int32;
        /** Pass true if the call was a video call */
        is_video?: Bool;
        /** Identifier of the connection used during the call */
        connection_id?: int64;
    }
    
    
    /** Sends a call rating */
    export interface sendCallRating {
        '@type': 'sendCallRating';
        /** Call identifier */
        call_id?: int32;
        /** Call rating; 1-5 */
        rating?: int32;
        /** An optional user comment if the rating is less than 5 */
        comment?: string;
        /** List of the exact types of problems with the call, specified by the user */
        problems?: vector<CallProblem>;
    }
    
    
    /** Sends debug information for a call to Telegram servers */
    export interface sendCallDebugInformation {
        '@type': 'sendCallDebugInformation';
        /** Call identifier */
        call_id?: int32;
        /** Debug information in application-specific format */
        debug_information?: string;
    }
    
    
    /** Sends log file for a call to Telegram servers */
    export interface sendCallLog {
        '@type': 'sendCallLog';
        /** Call identifier */
        call_id?: int32;
        /** Call log file. Only inputFileLocal and inputFileGenerated are supported */
        log_file?: InputFile;
    }
    
    
    /** Returns list of participant identifiers, on whose behalf a video chat in the chat can be joined */
    export interface getVideoChatAvailableParticipants {
        '@type': 'getVideoChatAvailableParticipants';
        /** Chat identifier */
        chat_id?: int53;
    }
    
    
    /** Changes default participant identifier, on whose behalf a video chat in the chat will be joined */
    export interface setVideoChatDefaultParticipant {
        '@type': 'setVideoChatDefaultParticipant';
        /** Chat identifier */
        chat_id?: int53;
        /** Default group call participant identifier to join the video chats */
        default_participant_id?: MessageSender;
    }
    
    
    /** Creates a video chat (a group call bound to a chat). Available only for basic groups, supergroups and channels; requires can_manage_video_chats rights */
    export interface createVideoChat {
        '@type': 'createVideoChat';
        /** Identifier of a chat in which the video chat will be created */
        chat_id?: int53;
        /** Group call title; if empty, chat title will be used */
        title?: string;
        /** Point in time (Unix timestamp) when the group call is supposed to be started by an administrator; 0 to start the video chat immediately. The date must be at least 10 seconds and at most 8 days in the future */
        start_date?: int32;
        /** Pass true to create an RTMP stream instead of an ordinary video chat; requires creator privileges */
        is_rtmp_stream?: Bool;
    }
    
    
    /** Returns RTMP URL for streaming to the chat; requires creator privileges */
    export interface getVideoChatRtmpUrl {
        '@type': 'getVideoChatRtmpUrl';
        /** Chat identifier */
        chat_id?: int53;
    }
    
    
    /** Replaces the current RTMP URL for streaming to the chat; requires creator privileges */
    export interface replaceVideoChatRtmpUrl {
        '@type': 'replaceVideoChatRtmpUrl';
        /** Chat identifier */
        chat_id?: int53;
    }
    
    
    /** Returns information about a group call */
    export interface getGroupCall {
        '@type': 'getGroupCall';
        /** Group call identifier */
        group_call_id?: int32;
    }
    
    
    /** Starts a scheduled group call */
    export interface startScheduledGroupCall {
        '@type': 'startScheduledGroupCall';
        /** Group call identifier */
        group_call_id?: int32;
    }
    
    
    /** Toggles whether the current user will receive a notification when the group call will start; scheduled group calls only */
    export interface toggleGroupCallEnabledStartNotification {
        '@type': 'toggleGroupCallEnabledStartNotification';
        /** Group call identifier */
        group_call_id?: int32;
        /** New value of the enabled_start_notification setting */
        enabled_start_notification?: Bool;
    }
    
    
    /** Joins an active group call. Returns join response payload for tgcalls */
    export interface joinGroupCall {
        '@type': 'joinGroupCall';
        /** Group call identifier */
        group_call_id?: int32;
        /** Identifier of a group call participant, which will be used to join the call; pass null to join as self; video chats only */
        participant_id?: MessageSender;
        /** Caller audio channel synchronization source identifier; received from tgcalls */
        audio_source_id?: int32;
        /** Group call join payload; received from tgcalls */
        payload?: string;
        /** Pass true to join the call with muted microphone */
        is_muted?: Bool;
        /** Pass true if the user's video is enabled */
        is_my_video_enabled?: Bool;
        /** If non-empty, invite hash to be used to join the group call without being muted by administrators */
        invite_hash?: string;
    }
    
    
    /** Starts screen sharing in a joined group call. Returns join response payload for tgcalls */
    export interface startGroupCallScreenSharing {
        '@type': 'startGroupCallScreenSharing';
        /** Group call identifier */
        group_call_id?: int32;
        /** Screen sharing audio channel synchronization source identifier; received from tgcalls */
        audio_source_id?: int32;
        /** Group call join payload; received from tgcalls */
        payload?: string;
    }
    
    
    /** Pauses or unpauses screen sharing in a joined group call */
    export interface toggleGroupCallScreenSharingIsPaused {
        '@type': 'toggleGroupCallScreenSharingIsPaused';
        /** Group call identifier */
        group_call_id?: int32;
        /** True if screen sharing is paused */
        is_paused?: Bool;
    }
    
    
    /** Ends screen sharing in a joined group call */
    export interface endGroupCallScreenSharing {
        '@type': 'endGroupCallScreenSharing';
        /** Group call identifier */
        group_call_id?: int32;
    }
    
    
    /** Sets group call title. Requires groupCall.can_be_managed group call flag */
    export interface setGroupCallTitle {
        '@type': 'setGroupCallTitle';
        /** Group call identifier */
        group_call_id?: int32;
        /** New group call title; 1-64 characters */
        title?: string;
    }
    
    
    /** Toggles whether new participants of a group call can be unmuted only by administrators of the group call. Requires groupCall.can_toggle_mute_new_participants group call flag */
    export interface toggleGroupCallMuteNewParticipants {
        '@type': 'toggleGroupCallMuteNewParticipants';
        /** Group call identifier */
        group_call_id?: int32;
        /** New value of the mute_new_participants setting */
        mute_new_participants?: Bool;
    }
    
    
    /** Invites users to an active group call. Sends a service message of type messageInviteToGroupCall for video chats */
    export interface inviteGroupCallParticipants {
        '@type': 'inviteGroupCallParticipants';
        /** Group call identifier */
        group_call_id?: int32;
        /** User identifiers. At most 10 users can be invited simultaneously */
        user_ids?: vector<int53>;
    }
    
    
    /** Returns invite link to a video chat in a public chat */
    export interface getGroupCallInviteLink {
        '@type': 'getGroupCallInviteLink';
        /** Group call identifier */
        group_call_id?: int32;
        /** Pass true if the invite link needs to contain an invite hash, passing which to joinGroupCall would allow the invited user to unmute themselves. Requires groupCall.can_be_managed group call flag */
        can_self_unmute?: Bool;
    }
    
    
    /** Revokes invite link for a group call. Requires groupCall.can_be_managed group call flag */
    export interface revokeGroupCallInviteLink {
        '@type': 'revokeGroupCallInviteLink';
        /** Group call identifier */
        group_call_id?: int32;
    }
    
    
    /** Starts recording of an active group call. Requires groupCall.can_be_managed group call flag */
    export interface startGroupCallRecording {
        '@type': 'startGroupCallRecording';
        /** Group call identifier */
        group_call_id?: int32;
        /** Group call recording title; 0-64 characters */
        title?: string;
        /** Pass true to record a video file instead of an audio file */
        record_video?: Bool;
        /** Pass true to use portrait orientation for video instead of landscape one */
        use_portrait_orientation?: Bool;
    }
    
    
    /** Ends recording of an active group call. Requires groupCall.can_be_managed group call flag */
    export interface endGroupCallRecording {
        '@type': 'endGroupCallRecording';
        /** Group call identifier */
        group_call_id?: int32;
    }
    
    
    /** Toggles whether current user's video is paused */
    export interface toggleGroupCallIsMyVideoPaused {
        '@type': 'toggleGroupCallIsMyVideoPaused';
        /** Group call identifier */
        group_call_id?: int32;
        /** Pass true if the current user's video is paused */
        is_my_video_paused?: Bool;
    }
    
    
    /** Toggles whether current user's video is enabled */
    export interface toggleGroupCallIsMyVideoEnabled {
        '@type': 'toggleGroupCallIsMyVideoEnabled';
        /** Group call identifier */
        group_call_id?: int32;
        /** Pass true if the current user's video is enabled */
        is_my_video_enabled?: Bool;
    }
    
    
    /** Informs TDLib that speaking state of a participant of an active group has changed */
    export interface setGroupCallParticipantIsSpeaking {
        '@type': 'setGroupCallParticipantIsSpeaking';
        /** Group call identifier */
        group_call_id?: int32;
        /** Group call participant's synchronization audio source identifier, or 0 for the current user */
        audio_source?: int32;
        /** Pass true if the user is speaking */
        is_speaking?: Bool;
    }
    
    
    /** Toggles whether a participant of an active group call is muted, unmuted, or allowed to unmute themselves */
    export interface toggleGroupCallParticipantIsMuted {
        '@type': 'toggleGroupCallParticipantIsMuted';
        /** Group call identifier */
        group_call_id?: int32;
        /** Participant identifier */
        participant_id?: MessageSender;
        /** Pass true to mute the user; pass false to unmute the them */
        is_muted?: Bool;
    }
    
    
    /** Changes volume level of a participant of an active group call. If the current user can manage the group call, then the participant's volume level will be changed for all users with the default volume level */
    export interface setGroupCallParticipantVolumeLevel {
        '@type': 'setGroupCallParticipantVolumeLevel';
        /** Group call identifier */
        group_call_id?: int32;
        /** Participant identifier */
        participant_id?: MessageSender;
        /** New participant's volume level; 1-20000 in hundreds of percents */
        volume_level?: int32;
    }
    
    
    /** Toggles whether a group call participant hand is rased */
    export interface toggleGroupCallParticipantIsHandRaised {
        '@type': 'toggleGroupCallParticipantIsHandRaised';
        /** Group call identifier */
        group_call_id?: int32;
        /** Participant identifier */
        participant_id?: MessageSender;
        /** Pass true if the user's hand needs to be raised. Only self hand can be raised. Requires groupCall.can_be_managed group call flag to lower other's hand */
        is_hand_raised?: Bool;
    }
    
    
    /** Loads more participants of a group call. The loaded participants will be received through updates. Use the field groupCall.loaded_all_participants to check whether all participants have already been loaded */
    export interface loadGroupCallParticipants {
        '@type': 'loadGroupCallParticipants';
        /** Group call identifier. The group call must be previously received through getGroupCall and must be joined or being joined */
        group_call_id?: int32;
        /** The maximum number of participants to load; up to 100 */
        limit?: int32;
    }
    
    
    /** Leaves a group call */
    export interface leaveGroupCall {
        '@type': 'leaveGroupCall';
        /** Group call identifier */
        group_call_id?: int32;
    }
    
    
    /** Ends a group call. Requires groupCall.can_be_managed */
    export interface endGroupCall {
        '@type': 'endGroupCall';
        /** Group call identifier */
        group_call_id?: int32;
    }
    
    
    /** Returns information about available group call streams */
    export interface getGroupCallStreams {
        '@type': 'getGroupCallStreams';
        /** Group call identifier */
        group_call_id?: int32;
    }
    
    
    /** Returns a file with a segment of a group call stream in a modified OGG format for audio or MPEG-4 format for video */
    export interface getGroupCallStreamSegment {
        '@type': 'getGroupCallStreamSegment';
        /** Group call identifier */
        group_call_id?: int32;
        /** Point in time when the stream segment begins; Unix timestamp in milliseconds */
        time_offset?: int53;
        /** Segment duration scale; 0-1. Segment's duration is 1000/(2**scale) milliseconds */
        scale?: int32;
        /** Identifier of an audio/video channel to get as received from tgcalls */
        channel_id?: int32;
        /** Video quality as received from tgcalls; pass null to get the worst available quality */
        video_quality?: GroupCallVideoQuality;
    }
    
    
    /** Changes the block state of a message sender. Currently, only users and supergroup chats can be blocked */
    export interface toggleMessageSenderIsBlocked {
        '@type': 'toggleMessageSenderIsBlocked';
        /** Identifier of a message sender to block/unblock */
        sender_id?: MessageSender;
        /** New value of is_blocked */
        is_blocked?: Bool;
    }
    
    
    /** Blocks an original sender of a message in the Replies chat */
    export interface blockMessageSenderFromReplies {
        '@type': 'blockMessageSenderFromReplies';
        /** The identifier of an incoming message in the Replies chat */
        message_id?: int53;
        /** Pass true to delete the message */
        delete_message?: Bool;
        /** Pass true to delete all messages from the same sender */
        delete_all_messages?: Bool;
        /** Pass true to report the sender to the Telegram moderators */
        report_spam?: Bool;
    }
    
    
    /** Returns users and chats that were blocked by the current user */
    export interface getBlockedMessageSenders {
        '@type': 'getBlockedMessageSenders';
        /** Number of users and chats to skip in the result; must be non-negative */
        offset?: int32;
        /** The maximum number of users and chats to return; up to 100 */
        limit?: int32;
    }
    
    
    /** Adds a user to the contact list or edits an existing contact by their user identifier */
    export interface addContact {
        '@type': 'addContact';
        /** The contact to add or edit; phone number may be empty and needs to be specified only if known, vCard is ignored */
        contact?: contact;
        /** Pass true to share the current user's phone number with the new contact. A corresponding rule to userPrivacySettingShowPhoneNumber will be added if needed. Use the field userFullInfo.need_phone_number_privacy_exception to check whether the current user needs to be asked to share their phone number */
        share_phone_number?: Bool;
    }
    
    
    /** Adds new contacts or edits existing contacts by their phone numbers; contacts' user identifiers are ignored */
    export interface importContacts {
        '@type': 'importContacts';
        /** The list of contacts to import or edit; contacts' vCard are ignored and are not imported */
        contacts?: vector<contact>;
    }
    
    
    /** Returns all user contacts */
    export interface getContacts {
        '@type': 'getContacts';
    }
    
    
    /** Searches for the specified query in the first names, last names and usernames of the known user contacts */
    export interface searchContacts {
        '@type': 'searchContacts';
        /** Query to search for; may be empty to return all contacts */
        query?: string;
        /** The maximum number of users to be returned */
        limit?: int32;
    }
    
    
    /** Removes users from the contact list */
    export interface removeContacts {
        '@type': 'removeContacts';
        /** Identifiers of users to be deleted */
        user_ids?: vector<int53>;
    }
    
    
    /** Returns the total number of imported contacts */
    export interface getImportedContactCount {
        '@type': 'getImportedContactCount';
    }
    
    
    /** Changes imported contacts using the list of contacts saved on the device. Imports newly added contacts and, if at least the file database is enabled, deletes recently deleted contacts. -Query result depends on the result of the previous query, so only one query is possible at the same time */
    export interface changeImportedContacts {
        '@type': 'changeImportedContacts';
        /** The new list of contacts, contact's vCard are ignored and are not imported */
        contacts?: vector<contact>;
    }
    
    
    /** Clears all imported contacts, contact list remains unchanged */
    export interface clearImportedContacts {
        '@type': 'clearImportedContacts';
    }
    
    
    /** Searches a user by their phone number. Returns a 404 error if the user can't be found */
    export interface searchUserByPhoneNumber {
        '@type': 'searchUserByPhoneNumber';
        /** Phone number to search for */
        phone_number?: string;
    }
    
    
    /** Shares the phone number of the current user with a mutual contact. Supposed to be called when the user clicks on chatActionBarSharePhoneNumber */
    export interface sharePhoneNumber {
        '@type': 'sharePhoneNumber';
        /** Identifier of the user with whom to share the phone number. The user must be a mutual contact */
        user_id?: int53;
    }
    
    
    /** Returns the profile photos of a user. The result of this query may be outdated: some photos might have been deleted already */
    export interface getUserProfilePhotos {
        '@type': 'getUserProfilePhotos';
        /** User identifier */
        user_id?: int53;
        /** The number of photos to skip; must be non-negative */
        offset?: int32;
        /** The maximum number of photos to be returned; up to 100 */
        limit?: int32;
    }
    
    
    /** Returns stickers from the installed sticker sets that correspond to a given emoji. If the emoji is non-empty, favorite and recently used stickers may also be returned */
    export interface getStickers {
        '@type': 'getStickers';
        /** String representation of emoji. If empty, returns all known installed stickers */
        emoji?: string;
        /** The maximum number of stickers to be returned */
        limit?: int32;
    }
    
    
    /** Searches for stickers from public sticker sets that correspond to a given emoji */
    export interface searchStickers {
        '@type': 'searchStickers';
        /** String representation of emoji; must be non-empty */
        emoji?: string;
        /** The maximum number of stickers to be returned */
        limit?: int32;
    }
    
    
    /** Returns a list of installed sticker sets */
    export interface getInstalledStickerSets {
        '@type': 'getInstalledStickerSets';
        /** Pass true to return mask sticker sets; pass false to return ordinary sticker sets */
        is_masks?: Bool;
    }
    
    
    /** Returns a list of archived sticker sets */
    export interface getArchivedStickerSets {
        '@type': 'getArchivedStickerSets';
        /** Pass true to return mask stickers sets; pass false to return ordinary sticker sets */
        is_masks?: Bool;
        /** Identifier of the sticker set from which to return the result */
        offset_sticker_set_id?: int64;
        /** The maximum number of sticker sets to return; up to 100 */
        limit?: int32;
    }
    
    
    /** Returns a list of trending sticker sets. For optimal performance, the number of returned sticker sets is chosen by TDLib */
    export interface getTrendingStickerSets {
        '@type': 'getTrendingStickerSets';
        /** The offset from which to return the sticker sets; must be non-negative */
        offset?: int32;
        /** The maximum number of sticker sets to be returned; up to 100. For optimal performance, the number of returned sticker sets is chosen by TDLib and can be smaller than the specified limit, even if the end of the list has not been reached */
        limit?: int32;
    }
    
    
    /** Returns a list of sticker sets attached to a file. Currently, only photos and videos can have attached sticker sets */
    export interface getAttachedStickerSets {
        '@type': 'getAttachedStickerSets';
        /** File identifier */
        file_id?: int32;
    }
    
    
    /** Returns information about a sticker set by its identifier */
    export interface getStickerSet {
        '@type': 'getStickerSet';
        /** Identifier of the sticker set */
        set_id?: int64;
    }
    
    
    /** Searches for a sticker set by its name */
    export interface searchStickerSet {
        '@type': 'searchStickerSet';
        /** Name of the sticker set */
        name?: string;
    }
    
    
    /** Searches for installed sticker sets by looking for specified query in their title and name */
    export interface searchInstalledStickerSets {
        '@type': 'searchInstalledStickerSets';
        /** Pass true to return mask sticker sets; pass false to return ordinary sticker sets */
        is_masks?: Bool;
        /** Query to search for */
        query?: string;
        /** The maximum number of sticker sets to return */
        limit?: int32;
    }
    
    
    /** Searches for ordinary sticker sets by looking for specified query in their title and name. Excludes installed sticker sets from the results */
    export interface searchStickerSets {
        '@type': 'searchStickerSets';
        /** Query to search for */
        query?: string;
    }
    
    
    /** Installs/uninstalls or activates/archives a sticker set */
    export interface changeStickerSet {
        '@type': 'changeStickerSet';
        /** Identifier of the sticker set */
        set_id?: int64;
        /** The new value of is_installed */
        is_installed?: Bool;
        /** The new value of is_archived. A sticker set can't be installed and archived simultaneously */
        is_archived?: Bool;
    }
    
    
    /** Informs the server that some trending sticker sets have been viewed by the user */
    export interface viewTrendingStickerSets {
        '@type': 'viewTrendingStickerSets';
        /** Identifiers of viewed trending sticker sets */
        sticker_set_ids?: vector<int64>;
    }
    
    
    /** Changes the order of installed sticker sets */
    export interface reorderInstalledStickerSets {
        '@type': 'reorderInstalledStickerSets';
        /** Pass true to change the order of mask sticker sets; pass false to change the order of ordinary sticker sets */
        is_masks?: Bool;
        /** Identifiers of installed sticker sets in the new correct order */
        sticker_set_ids?: vector<int64>;
    }
    
    
    /** Returns a list of recently used stickers */
    export interface getRecentStickers {
        '@type': 'getRecentStickers';
        /** Pass true to return stickers and masks that were recently attached to photos or video files; pass false to return recently sent stickers */
        is_attached?: Bool;
    }
    
    
    /** Manually adds a new sticker to the list of recently used stickers. The new sticker is added to the top of the list. If the sticker was already in the list, it is removed from the list first. Only stickers belonging to a sticker set can be added to this list */
    export interface addRecentSticker {
        '@type': 'addRecentSticker';
        /** Pass true to add the sticker to the list of stickers recently attached to photo or video files; pass false to add the sticker to the list of recently sent stickers */
        is_attached?: Bool;
        /** Sticker file to add */
        sticker?: InputFile;
    }
    
    
    /** Removes a sticker from the list of recently used stickers */
    export interface removeRecentSticker {
        '@type': 'removeRecentSticker';
        /** Pass true to remove the sticker from the list of stickers recently attached to photo or video files; pass false to remove the sticker from the list of recently sent stickers */
        is_attached?: Bool;
        /** Sticker file to delete */
        sticker?: InputFile;
    }
    
    
    /** Clears the list of recently used stickers */
    export interface clearRecentStickers {
        '@type': 'clearRecentStickers';
        /** Pass true to clear the list of stickers recently attached to photo or video files; pass false to clear the list of recently sent stickers */
        is_attached?: Bool;
    }
    
    
    /** Returns favorite stickers */
    export interface getFavoriteStickers {
        '@type': 'getFavoriteStickers';
    }
    
    
    /** Adds a new sticker to the list of favorite stickers. The new sticker is added to the top of the list. If the sticker was already in the list, it is removed from the list first. Only stickers belonging to a sticker set can be added to this list */
    export interface addFavoriteSticker {
        '@type': 'addFavoriteSticker';
        /** Sticker file to add */
        sticker?: InputFile;
    }
    
    
    /** Removes a sticker from the list of favorite stickers */
    export interface removeFavoriteSticker {
        '@type': 'removeFavoriteSticker';
        /** Sticker file to delete from the list */
        sticker?: InputFile;
    }
    
    
    /** Returns emoji corresponding to a sticker. The list is only for informational purposes, because a sticker is always sent with a fixed emoji from the corresponding Sticker object */
    export interface getStickerEmojis {
        '@type': 'getStickerEmojis';
        /** Sticker file identifier */
        sticker?: InputFile;
    }
    
    
    /** Searches for emojis by keywords. Supported only if the file database is enabled */
    export interface searchEmojis {
        '@type': 'searchEmojis';
        /** Text to search for */
        text?: string;
        /** Pass true if only emojis, which exactly match the text, needs to be returned */
        exact_match?: Bool;
        /** List of possible IETF language tags of the user's input language; may be empty if unknown */
        input_language_codes?: vector<string>;
    }
    
    
    /** Returns an animated emoji corresponding to a given emoji. Returns a 404 error if the emoji has no animated emoji */
    export interface getAnimatedEmoji {
        '@type': 'getAnimatedEmoji';
        /** The emoji */
        emoji?: string;
    }
    
    
    /** Returns all emojis, which has a corresponding animated emoji */
    export interface getAllAnimatedEmojis {
        '@type': 'getAllAnimatedEmojis';
    }
    
    
    /** Returns an HTTP URL which can be used to automatically log in to the translation platform and suggest new emoji replacements. The URL will be valid for 30 seconds after generation */
    export interface getEmojiSuggestionsUrl {
        '@type': 'getEmojiSuggestionsUrl';
        /** Language code for which the emoji replacements will be suggested */
        language_code?: string;
    }
    
    
    /** Returns saved animations */
    export interface getSavedAnimations {
        '@type': 'getSavedAnimations';
    }
    
    
    /** Manually adds a new animation to the list of saved animations. The new animation is added to the beginning of the list. If the animation was already in the list, it is removed first. Only non-secret video animations with MIME type "video/mp4" can be added to the list */
    export interface addSavedAnimation {
        '@type': 'addSavedAnimation';
        /** The animation file to be added. Only animations known to the server (i.e., successfully sent via a message) can be added to the list */
        animation?: InputFile;
    }
    
    
    /** Removes an animation from the list of saved animations */
    export interface removeSavedAnimation {
        '@type': 'removeSavedAnimation';
        /** Animation file to be removed */
        animation?: InputFile;
    }
    
    
    /** Returns up to 20 recently used inline bots in the order of their last usage */
    export interface getRecentInlineBots {
        '@type': 'getRecentInlineBots';
    }
    
    
    /** Searches for recently used hashtags by their prefix */
    export interface searchHashtags {
        '@type': 'searchHashtags';
        /** Hashtag prefix to search for */
        prefix?: string;
        /** The maximum number of hashtags to be returned */
        limit?: int32;
    }
    
    
    /** Removes a hashtag from the list of recently used hashtags */
    export interface removeRecentHashtag {
        '@type': 'removeRecentHashtag';
        /** Hashtag to delete */
        hashtag?: string;
    }
    
    
    /** Returns a web page preview by the text of the message. Do not call this function too often. Returns a 404 error if the web page has no preview */
    export interface getWebPagePreview {
        '@type': 'getWebPagePreview';
        /** Message text with formatting */
        text?: formattedText;
    }
    
    
    /** Returns an instant view version of a web page if available. Returns a 404 error if the web page has no instant view page */
    export interface getWebPageInstantView {
        '@type': 'getWebPageInstantView';
        /** The web page URL */
        url?: string;
        /** Pass true to get full instant view for the web page */
        force_full?: Bool;
    }
    
    
    /** Changes a profile photo for the current user */
    export interface setProfilePhoto {
        '@type': 'setProfilePhoto';
        /** Profile photo to set */
        photo?: InputChatPhoto;
    }
    
    
    /** Deletes a profile photo */
    export interface deleteProfilePhoto {
        '@type': 'deleteProfilePhoto';
        /** Identifier of the profile photo to delete */
        profile_photo_id?: int64;
    }
    
    
    /** Changes the first and last name of the current user */
    export interface setName {
        '@type': 'setName';
        /** The new value of the first name for the current user; 1-64 characters */
        first_name?: string;
        /** The new value of the optional last name for the current user; 0-64 characters */
        last_name?: string;
    }
    
    
    /** Changes the bio of the current user */
    export interface setBio {
        '@type': 'setBio';
        /** The new value of the user bio; 0-GetOption("bio_length_max") characters without line feeds */
        bio?: string;
    }
    
    
    /** Changes the username of the current user */
    export interface setUsername {
        '@type': 'setUsername';
        /** The new value of the username. Use an empty string to remove the username */
        username?: string;
    }
    
    
    /** Changes the location of the current user. Needs to be called if GetOption("is_location_visible") is true and location changes for more than 1 kilometer */
    export interface setLocation {
        '@type': 'setLocation';
        /** The new location of the user */
        location?: location;
    }
    
    
    /** Changes the phone number of the user and sends an authentication code to the user's new phone number. On success, returns information about the sent code */
    export interface changePhoneNumber {
        '@type': 'changePhoneNumber';
        /** The new phone number of the user in international format */
        phone_number?: string;
        /** Settings for the authentication of the user's phone number; pass null to use default settings */
        settings?: phoneNumberAuthenticationSettings;
    }
    
    
    /** Re-sends the authentication code sent to confirm a new phone number for the current user. Works only if the previously received authenticationCodeInfo next_code_type was not null and the server-specified timeout has passed */
    export interface resendChangePhoneNumberCode {
        '@type': 'resendChangePhoneNumberCode';
    }
    
    
    /** Checks the authentication code sent to confirm a new phone number of the user */
    export interface checkChangePhoneNumberCode {
        '@type': 'checkChangePhoneNumberCode';
        /** Authentication code to check */
        code?: string;
    }
    
    
    /** Sets the list of commands supported by the bot for the given user scope and language; for bots only */
    export interface setCommands {
        '@type': 'setCommands';
        /** The scope to which the commands are relevant; pass null to change commands in the default bot command scope */
        scope?: BotCommandScope;
        /** A two-letter ISO 639-1 language code. If empty, the commands will be applied to all users from the given scope, for which language there are no dedicated commands */
        language_code?: string;
        /** List of the bot's commands */
        commands?: vector<botCommand>;
    }
    
    
    /** Deletes commands supported by the bot for the given user scope and language; for bots only */
    export interface deleteCommands {
        '@type': 'deleteCommands';
        /** The scope to which the commands are relevant; pass null to delete commands in the default bot command scope */
        scope?: BotCommandScope;
        /** A two-letter ISO 639-1 language code or an empty string */
        language_code?: string;
    }
    
    
    /** Returns the list of commands supported by the bot for the given user scope and language; for bots only */
    export interface getCommands {
        '@type': 'getCommands';
        /** The scope to which the commands are relevant; pass null to get commands in the default bot command scope */
        scope?: BotCommandScope;
        /** A two-letter ISO 639-1 language code or an empty string */
        language_code?: string;
    }
    
    
    /** Sets menu button for the given user or for all users; for bots only */
    export interface setMenuButton {
        '@type': 'setMenuButton';
        /** Identifier of the user or 0 to set menu button for all users */
        user_id?: int53;
        /** New menu button */
        menu_button?: botMenuButton;
    }
    
    
    /** Returns menu button set by the bot for the given user; for bots only */
    export interface getMenuButton {
        '@type': 'getMenuButton';
        /** Identifier of the user or 0 to get the default menu button */
        user_id?: int53;
    }
    
    
    /** Sets default administrator rights for adding the bot to basic group and supergroup chats; for bots only */
    export interface setDefaultGroupAdministratorRights {
        '@type': 'setDefaultGroupAdministratorRights';
        /** Default administrator rights for adding the bot to basic group and supergroup chats; may be null */
        default_group_administrator_rights?: chatAdministratorRights;
    }
    
    
    /** Sets default administrator rights for adding the bot to channel chats; for bots only */
    export interface setDefaultChannelAdministratorRights {
        '@type': 'setDefaultChannelAdministratorRights';
        /** Default administrator rights for adding the bot to channels; may be null */
        default_channel_administrator_rights?: chatAdministratorRights;
    }
    
    
    /** Returns all active sessions of the current user */
    export interface getActiveSessions {
        '@type': 'getActiveSessions';
    }
    
    
    /** Terminates a session of the current user */
    export interface terminateSession {
        '@type': 'terminateSession';
        /** Session identifier */
        session_id?: int64;
    }
    
    
    /** Terminates all other sessions of the current user */
    export interface terminateAllOtherSessions {
        '@type': 'terminateAllOtherSessions';
    }
    
    
    /** Toggles whether a session can accept incoming calls */
    export interface toggleSessionCanAcceptCalls {
        '@type': 'toggleSessionCanAcceptCalls';
        /** Session identifier */
        session_id?: int64;
        /** Pass true to allow accepting incoming calls by the session; pass false otherwise */
        can_accept_calls?: Bool;
    }
    
    
    /** Toggles whether a session can accept incoming secret chats */
    export interface toggleSessionCanAcceptSecretChats {
        '@type': 'toggleSessionCanAcceptSecretChats';
        /** Session identifier */
        session_id?: int64;
        /** Pass true to allow accepring secret chats by the session; pass false otherwise */
        can_accept_secret_chats?: Bool;
    }
    
    
    /** Changes the period of inactivity after which sessions will automatically be terminated */
    export interface setInactiveSessionTtl {
        '@type': 'setInactiveSessionTtl';
        /** New number of days of inactivity before sessions will be automatically terminated; 1-366 days */
        inactive_session_ttl_days?: int32;
    }
    
    
    /** Returns all website where the current user used Telegram to log in */
    export interface getConnectedWebsites {
        '@type': 'getConnectedWebsites';
    }
    
    
    /** Disconnects website from the current user's Telegram account */
    export interface disconnectWebsite {
        '@type': 'disconnectWebsite';
        /** Website identifier */
        website_id?: int64;
    }
    
    
    /** Disconnects all websites from the current user's Telegram account */
    export interface disconnectAllWebsites {
        '@type': 'disconnectAllWebsites';
    }
    
    
    /** Changes the username of a supergroup or channel, requires owner privileges in the supergroup or channel */
    export interface setSupergroupUsername {
        '@type': 'setSupergroupUsername';
        /** Identifier of the supergroup or channel */
        supergroup_id?: int53;
        /** New value of the username. Use an empty string to remove the username */
        username?: string;
    }
    
    
    /** Changes the sticker set of a supergroup; requires can_change_info administrator right */
    export interface setSupergroupStickerSet {
        '@type': 'setSupergroupStickerSet';
        /** Identifier of the supergroup */
        supergroup_id?: int53;
        /** New value of the supergroup sticker set identifier. Use 0 to remove the supergroup sticker set */
        sticker_set_id?: int64;
    }
    
    
    /** Toggles whether sender signature is added to sent messages in a channel; requires can_change_info administrator right */
    export interface toggleSupergroupSignMessages {
        '@type': 'toggleSupergroupSignMessages';
        /** Identifier of the channel */
        supergroup_id?: int53;
        /** New value of sign_messages */
        sign_messages?: Bool;
    }
    
    
    /** Toggles whether joining is mandatory to send messages to a discussion supergroup; requires can_restrict_members administrator right */
    export interface toggleSupergroupJoinToSendMessages {
        '@type': 'toggleSupergroupJoinToSendMessages';
        /** Identifier of the supergroup */
        supergroup_id?: int53;
        /** New value of join_to_send_messages */
        join_to_send_messages?: Bool;
    }
    
    
    /** Toggles whether all users directly joining the supergroup need to be approved by supergroup administrators; requires can_restrict_members administrator right */
    export interface toggleSupergroupJoinByRequest {
        '@type': 'toggleSupergroupJoinByRequest';
        /** Identifier of the channel */
        supergroup_id?: int53;
        /** New value of join_by_request */
        join_by_request?: Bool;
    }
    
    
    /** Toggles whether the message history of a supergroup is available to new members; requires can_change_info administrator right */
    export interface toggleSupergroupIsAllHistoryAvailable {
        '@type': 'toggleSupergroupIsAllHistoryAvailable';
        /** The identifier of the supergroup */
        supergroup_id?: int53;
        /** The new value of is_all_history_available */
        is_all_history_available?: Bool;
    }
    
    
    /** Upgrades supergroup to a broadcast group; requires owner privileges in the supergroup */
    export interface toggleSupergroupIsBroadcastGroup {
        '@type': 'toggleSupergroupIsBroadcastGroup';
        /** Identifier of the supergroup */
        supergroup_id?: int53;
    }
    
    
    /** Reports messages in a supergroup as spam; requires administrator rights in the supergroup */
    export interface reportSupergroupSpam {
        '@type': 'reportSupergroupSpam';
        /** Supergroup identifier */
        supergroup_id?: int53;
        /** Identifiers of messages to report */
        message_ids?: vector<int53>;
    }
    
    
    /** Returns information about members or banned users in a supergroup or channel. Can be used only if supergroupFullInfo.can_get_members == true; additionally, administrator privileges may be required for some filters */
    export interface getSupergroupMembers {
        '@type': 'getSupergroupMembers';
        /** Identifier of the supergroup or channel */
        supergroup_id?: int53;
        /** The type of users to return; pass null to use supergroupMembersFilterRecent */
        filter?: SupergroupMembersFilter;
        /** Number of users to skip */
        offset?: int32;
        /** The maximum number of users be returned; up to 200 */
        limit?: int32;
    }
    
    
    /** Closes a secret chat, effectively transferring its state to secretChatStateClosed */
    export interface closeSecretChat {
        '@type': 'closeSecretChat';
        /** Secret chat identifier */
        secret_chat_id?: int32;
    }
    
    
    /** Returns a list of service actions taken by chat members and administrators in the last 48 hours. Available only for supergroups and channels. Requires administrator rights. Returns results in reverse chronological order (i. e., in order of decreasing event_id) */
    export interface getChatEventLog {
        '@type': 'getChatEventLog';
        /** Chat identifier */
        chat_id?: int53;
        /** Search query by which to filter events */
        query?: string;
        /** Identifier of an event from which to return results. Use 0 to get results from the latest events */
        from_event_id?: int64;
        /** The maximum number of events to return; up to 100 */
        limit?: int32;
        /** The types of events to return; pass null to get chat events of all types */
        filters?: chatEventLogFilters;
        /** User identifiers by which to filter events. By default, events relating to all users will be returned */
        user_ids?: vector<int53>;
    }
    
    
    /** Returns an invoice payment form. This method must be called when the user presses inlineKeyboardButtonBuy */
    export interface getPaymentForm {
        '@type': 'getPaymentForm';
        /** The invoice */
        input_invoice?: InputInvoice;
        /** Preferred payment form theme; pass null to use the default theme */
        theme?: themeParameters;
    }
    
    
    /** Validates the order information provided by a user and returns the available shipping options for a flexible invoice */
    export interface validateOrderInfo {
        '@type': 'validateOrderInfo';
        /** The invoice */
        input_invoice?: InputInvoice;
        /** The order information, provided by the user; pass null if empty */
        order_info?: orderInfo;
        /** Pass true to save the order information */
        allow_save?: Bool;
    }
    
    
    /** Sends a filled-out payment form to the bot for final verification */
    export interface sendPaymentForm {
        '@type': 'sendPaymentForm';
        /** The invoice */
        input_invoice?: InputInvoice;
        /** Payment form identifier returned by getPaymentForm */
        payment_form_id?: int64;
        /** Identifier returned by validateOrderInfo, or an empty string */
        order_info_id?: string;
        /** Identifier of a chosen shipping option, if applicable */
        shipping_option_id?: string;
        /** The credentials chosen by user for payment */
        credentials?: InputCredentials;
        /** Chosen by the user amount of tip in the smallest units of the currency */
        tip_amount?: int53;
    }
    
    
    /** Returns information about a successful payment */
    export interface getPaymentReceipt {
        '@type': 'getPaymentReceipt';
        /** Chat identifier of the PaymentSuccessful message */
        chat_id?: int53;
        /** Message identifier */
        message_id?: int53;
    }
    
    
    /** Returns saved order information. Returns a 404 error if there is no saved order information */
    export interface getSavedOrderInfo {
        '@type': 'getSavedOrderInfo';
    }
    
    
    /** Deletes saved order information */
    export interface deleteSavedOrderInfo {
        '@type': 'deleteSavedOrderInfo';
    }
    
    
    /** Deletes saved credentials for all payment provider bots */
    export interface deleteSavedCredentials {
        '@type': 'deleteSavedCredentials';
    }
    
    
    /** Creates a link for the given invoice; for bots only */
    export interface createInvoiceLink {
        '@type': 'createInvoiceLink';
        /** Information about the invoice of the type inputMessageInvoice */
        invoice?: InputMessageContent;
    }
    
    
    /** Returns a user that can be contacted to get support */
    export interface getSupportUser {
        '@type': 'getSupportUser';
    }
    
    
    /** Returns backgrounds installed by the user */
    export interface getBackgrounds {
        '@type': 'getBackgrounds';
        /** Pass true to order returned backgrounds for a dark theme */
        for_dark_theme?: Bool;
    }
    
    
    /** Constructs a persistent HTTP URL for a background */
    export interface getBackgroundUrl {
        '@type': 'getBackgroundUrl';
        /** Background name */
        name?: string;
        /** Background type */
        type?: BackgroundType;
    }
    
    
    /** Searches for a background by its name */
    export interface searchBackground {
        '@type': 'searchBackground';
        /** The name of the background */
        name?: string;
    }
    
    
    /** Changes the background selected by the user; adds background to the list of installed backgrounds */
    export interface setBackground {
        '@type': 'setBackground';
        /** The input background to use; pass null to create a new filled backgrounds or to remove the current background */
        background?: InputBackground;
        /** Background type; pass null to use the default type of the remote background or to remove the current background */
        type?: BackgroundType;
        /** Pass true if the background is changed for a dark theme */
        for_dark_theme?: Bool;
    }
    
    
    /** Removes background from the list of installed backgrounds */
    export interface removeBackground {
        '@type': 'removeBackground';
        /** The background identifier */
        background_id?: int64;
    }
    
    
    /** Resets list of installed backgrounds to its default value */
    export interface resetBackgrounds {
        '@type': 'resetBackgrounds';
    }
    
    
    /** Returns information about the current localization target. This is an offline request if only_local is true. Can be called before authorization */
    export interface getLocalizationTargetInfo {
        '@type': 'getLocalizationTargetInfo';
        /** Pass true to get only locally available information without sending network requests */
        only_local?: Bool;
    }
    
    
    /** Returns information about a language pack. Returned language pack identifier may be different from a provided one. Can be called before authorization */
    export interface getLanguagePackInfo {
        '@type': 'getLanguagePackInfo';
        /** Language pack identifier */
        language_pack_id?: string;
    }
    
    
    /** Returns strings from a language pack in the current localization target by their keys. Can be called before authorization */
    export interface getLanguagePackStrings {
        '@type': 'getLanguagePackStrings';
        /** Language pack identifier of the strings to be returned */
        language_pack_id?: string;
        /** Language pack keys of the strings to be returned; leave empty to request all available strings */
        keys?: vector<string>;
    }
    
    
    /** Fetches the latest versions of all strings from a language pack in the current localization target from the server. This method doesn't need to be called explicitly for the current used/base language packs. Can be called before authorization */
    export interface synchronizeLanguagePack {
        '@type': 'synchronizeLanguagePack';
        /** Language pack identifier */
        language_pack_id?: string;
    }
    
    
    /** Adds a custom server language pack to the list of installed language packs in current localization target. Can be called before authorization */
    export interface addCustomServerLanguagePack {
        '@type': 'addCustomServerLanguagePack';
        /** Identifier of a language pack to be added; may be different from a name that is used in an "https://t.me/setlanguage/" link */
        language_pack_id?: string;
    }
    
    
    /** Adds or changes a custom local language pack to the current localization target */
    export interface setCustomLanguagePack {
        '@type': 'setCustomLanguagePack';
        /** Information about the language pack. Language pack ID must start with 'X', consist only of English letters, digits and hyphens, and must not exceed 64 characters. Can be called before authorization */
        info?: languagePackInfo;
        /** Strings of the new language pack */
        strings?: vector<languagePackString>;
    }
    
    
    /** Edits information about a custom local language pack in the current localization target. Can be called before authorization */
    export interface editCustomLanguagePackInfo {
        '@type': 'editCustomLanguagePackInfo';
        /** New information about the custom local language pack */
        info?: languagePackInfo;
    }
    
    
    /** Adds, edits or deletes a string in a custom local language pack. Can be called before authorization */
    export interface setCustomLanguagePackString {
        '@type': 'setCustomLanguagePackString';
        /** Identifier of a previously added custom local language pack in the current localization target */
        language_pack_id?: string;
        /** New language pack string */
        new_string?: languagePackString;
    }
    
    
    /** Deletes all information about a language pack in the current localization target. The language pack which is currently in use (including base language pack) or is being synchronized can't be deleted. Can be called before authorization */
    export interface deleteLanguagePack {
        '@type': 'deleteLanguagePack';
        /** Identifier of the language pack to delete */
        language_pack_id?: string;
    }
    
    
    /** Registers the currently used device for receiving push notifications. Returns a globally unique identifier of the push notification subscription */
    export interface registerDevice {
        '@type': 'registerDevice';
        /** Device token */
        device_token?: DeviceToken;
        /** List of user identifiers of other users currently using the application */
        other_user_ids?: vector<int53>;
    }
    
    
    /** Handles a push notification. Returns error with code 406 if the push notification is not supported and connection to the server is required to fetch new data. Can be called before authorization */
    export interface processPushNotification {
        '@type': 'processPushNotification';
        /** JSON-encoded push notification payload with all fields sent by the server, and "google.sent_time" and "google.notification.sound" fields added */
        payload?: string;
    }
    
    
    /** Returns a globally unique push notification subscription identifier for identification of an account, which has received a push notification. Can be called synchronously */
    export interface getPushReceiverId {
        '@type': 'getPushReceiverId';
        /** JSON-encoded push notification payload */
        payload?: string;
    }
    
    
    /** Returns t.me URLs recently visited by a newly registered user */
    export interface getRecentlyVisitedTMeUrls {
        '@type': 'getRecentlyVisitedTMeUrls';
        /** Google Play referrer to identify the user */
        referrer?: string;
    }
    
    
    /** Changes user privacy settings */
    export interface setUserPrivacySettingRules {
        '@type': 'setUserPrivacySettingRules';
        /** The privacy setting */
        setting?: UserPrivacySetting;
        /** The new privacy rules */
        rules?: userPrivacySettingRules;
    }
    
    
    /** Returns the current privacy settings */
    export interface getUserPrivacySettingRules {
        '@type': 'getUserPrivacySettingRules';
        /** The privacy setting */
        setting?: UserPrivacySetting;
    }
    
    
    /** Returns the value of an option by its name. (Check the list of available options on https://core.telegram.org/tdlib/options.) Can be called before authorization */
    export interface getOption {
        '@type': 'getOption';
        /** The name of the option */
        name?: string;
    }
    
    
    /** Sets the value of an option. (Check the list of available options on https://core.telegram.org/tdlib/options.) Only writable options can be set. Can be called before authorization */
    export interface setOption {
        '@type': 'setOption';
        /** The name of the option */
        name?: string;
        /** The new value of the option; pass null to reset option value to a default value */
        value?: OptionValue;
    }
    
    
    /** Changes the period of inactivity after which the account of the current user will automatically be deleted */
    export interface setAccountTtl {
        '@type': 'setAccountTtl';
        /** New account TTL */
        ttl?: accountTtl;
    }
    
    
    /** Returns the period of inactivity after which the account of the current user will automatically be deleted */
    export interface getAccountTtl {
        '@type': 'getAccountTtl';
    }
    
    
    /** Deletes the account of the current user, deleting all information associated with the user from the server. The phone number of the account can be used to create a new account. Can be called before authorization when the current authorization state is authorizationStateWaitPassword */
    export interface deleteAccount {
        '@type': 'deleteAccount';
        /** The reason why the account was deleted; optional */
        reason?: string;
    }
    
    
    /** Removes a chat action bar without any other action */
    export interface removeChatActionBar {
        '@type': 'removeChatActionBar';
        /** Chat identifier */
        chat_id?: int53;
    }
    
    
    /** Reports a chat to the Telegram moderators. A chat can be reported only from the chat action bar, or if chat.can_be_reported */
    export interface reportChat {
        '@type': 'reportChat';
        /** Chat identifier */
        chat_id?: int53;
        /** Identifiers of reported messages; may be empty to report the whole chat */
        message_ids?: vector<int53>;
        /** The reason for reporting the chat */
        reason?: ChatReportReason;
        /** Additional report details; 0-1024 characters */
        text?: string;
    }
    
    
    /** Reports a chat photo to the Telegram moderators. A chat photo can be reported only if chat.can_be_reported */
    export interface reportChatPhoto {
        '@type': 'reportChatPhoto';
        /** Chat identifier */
        chat_id?: int53;
        /** Identifier of the photo to report. Only full photos from chatPhoto can be reported */
        file_id?: int32;
        /** The reason for reporting the chat photo */
        reason?: ChatReportReason;
        /** Additional report details; 0-1024 characters */
        text?: string;
    }
    
    
    /** Returns detailed statistics about a chat. Currently, this method can be used only for supergroups and channels. Can be used only if supergroupFullInfo.can_get_statistics == true */
    export interface getChatStatistics {
        '@type': 'getChatStatistics';
        /** Chat identifier */
        chat_id?: int53;
        /** Pass true if a dark theme is used by the application */
        is_dark?: Bool;
    }
    
    
    /** Returns detailed statistics about a message. Can be used only if message.can_get_statistics == true */
    export interface getMessageStatistics {
        '@type': 'getMessageStatistics';
        /** Chat identifier */
        chat_id?: int53;
        /** Message identifier */
        message_id?: int53;
        /** Pass true if a dark theme is used by the application */
        is_dark?: Bool;
    }
    
    
    /** Loads an asynchronous or a zoomed in statistical graph */
    export interface getStatisticalGraph {
        '@type': 'getStatisticalGraph';
        /** Chat identifier */
        chat_id?: int53;
        /** The token for graph loading */
        token?: string;
        /** X-value for zoomed in graph or 0 otherwise */
        x?: int53;
    }
    
    
    /** Returns database statistics */
    export interface getDatabaseStatistics {
        '@type': 'getDatabaseStatistics';
    }
    
    
    /** Sets the current network type. Can be called before authorization. Calling this method forces all network connections to reopen, mitigating the delay in switching between different networks, so it must be called whenever the network is changed, even if the network type remains the same. -Network type is used to check whether the library can use the network at all and also for collecting detailed network data usage statistics */
    export interface setNetworkType {
        '@type': 'setNetworkType';
        /** The new network type; pass null to set network type to networkTypeOther */
        type?: NetworkType;
    }
    
    
    /** Returns network data usage statistics. Can be called before authorization */
    export interface getNetworkStatistics {
        '@type': 'getNetworkStatistics';
        /** Pass true to get statistics only for the current library launch */
        only_current?: Bool;
    }
    
    
    /** Adds the specified data to data usage statistics. Can be called before authorization */
    export interface addNetworkStatistics {
        '@type': 'addNetworkStatistics';
        /** The network statistics entry with the data to be added to statistics */
        entry?: NetworkStatisticsEntry;
    }
    
    
    /** Resets all network data usage statistics to zero. Can be called before authorization */
    export interface resetNetworkStatistics {
        '@type': 'resetNetworkStatistics';
    }
    
    
    /** Returns auto-download settings presets for the current user */
    export interface getAutoDownloadSettingsPresets {
        '@type': 'getAutoDownloadSettingsPresets';
    }
    
    
    /** Sets auto-download settings */
    export interface setAutoDownloadSettings {
        '@type': 'setAutoDownloadSettings';
        /** New user auto-download settings */
        settings?: autoDownloadSettings;
        /** Type of the network for which the new settings are relevant */
        type?: NetworkType;
    }
    
    
    /** Returns information about a bank card */
    export interface getBankCardInfo {
        '@type': 'getBankCardInfo';
        /** The bank card number */
        bank_card_number?: string;
    }
    
    
    /** Returns one of the available Telegram Passport elements */
    export interface getPassportElement {
        '@type': 'getPassportElement';
        /** Telegram Passport element type */
        type?: PassportElementType;
        /** Password of the current user */
        password?: string;
    }
    
    
    /** Returns all available Telegram Passport elements */
    export interface getAllPassportElements {
        '@type': 'getAllPassportElements';
        /** Password of the current user */
        password?: string;
    }
    
    
    /** Adds an element to the user's Telegram Passport. May return an error with a message "PHONE_VERIFICATION_NEEDED" or "EMAIL_VERIFICATION_NEEDED" if the chosen phone number or the chosen email address must be verified first */
    export interface setPassportElement {
        '@type': 'setPassportElement';
        /** Input Telegram Passport element */
        element?: InputPassportElement;
        /** Password of the current user */
        password?: string;
    }
    
    
    /** Deletes a Telegram Passport element */
    export interface deletePassportElement {
        '@type': 'deletePassportElement';
        /** Element type */
        type?: PassportElementType;
    }
    
    
    /** Informs the user that some of the elements in their Telegram Passport contain errors; for bots only. The user will not be able to resend the elements, until the errors are fixed */
    export interface setPassportElementErrors {
        '@type': 'setPassportElementErrors';
        /** User identifier */
        user_id?: int53;
        /** The errors */
        errors?: vector<inputPassportElementError>;
    }
    
    
    /** Returns an IETF language tag of the language preferred in the country, which must be used to fill native fields in Telegram Passport personal details. Returns a 404 error if unknown */
    export interface getPreferredCountryLanguage {
        '@type': 'getPreferredCountryLanguage';
        /** A two-letter ISO 3166-1 alpha-2 country code */
        country_code?: string;
    }
    
    
    /** Sends a code to verify a phone number to be added to a user's Telegram Passport */
    export interface sendPhoneNumberVerificationCode {
        '@type': 'sendPhoneNumberVerificationCode';
        /** The phone number of the user, in international format */
        phone_number?: string;
        /** Settings for the authentication of the user's phone number; pass null to use default settings */
        settings?: phoneNumberAuthenticationSettings;
    }
    
    
    /** Re-sends the code to verify a phone number to be added to a user's Telegram Passport */
    export interface resendPhoneNumberVerificationCode {
        '@type': 'resendPhoneNumberVerificationCode';
    }
    
    
    /** Checks the phone number verification code for Telegram Passport */
    export interface checkPhoneNumberVerificationCode {
        '@type': 'checkPhoneNumberVerificationCode';
        /** Verification code to check */
        code?: string;
    }
    
    
    /** Sends a code to verify an email address to be added to a user's Telegram Passport */
    export interface sendEmailAddressVerificationCode {
        '@type': 'sendEmailAddressVerificationCode';
        /** Email address */
        email_address?: string;
    }
    
    
    /** Re-sends the code to verify an email address to be added to a user's Telegram Passport */
    export interface resendEmailAddressVerificationCode {
        '@type': 'resendEmailAddressVerificationCode';
    }
    
    
    /** Checks the email address verification code for Telegram Passport */
    export interface checkEmailAddressVerificationCode {
        '@type': 'checkEmailAddressVerificationCode';
        /** Verification code to check */
        code?: string;
    }
    
    
    /** Returns a Telegram Passport authorization form for sharing data with a service */
    export interface getPassportAuthorizationForm {
        '@type': 'getPassportAuthorizationForm';
        /** User identifier of the service's bot */
        bot_user_id?: int53;
        /** Telegram Passport element types requested by the service */
        scope?: string;
        /** Service's public key */
        public_key?: string;
        /** Unique request identifier provided by the service */
        nonce?: string;
    }
    
    
    /** Returns already available Telegram Passport elements suitable for completing a Telegram Passport authorization form. Result can be received only once for each authorization form */
    export interface getPassportAuthorizationFormAvailableElements {
        '@type': 'getPassportAuthorizationFormAvailableElements';
        /** Authorization form identifier */
        autorization_form_id?: int32;
        /** Password of the current user */
        password?: string;
    }
    
    
    /** Sends a Telegram Passport authorization form, effectively sharing data with the service. This method must be called after getPassportAuthorizationFormAvailableElements if some previously available elements are going to be reused */
    export interface sendPassportAuthorizationForm {
        '@type': 'sendPassportAuthorizationForm';
        /** Authorization form identifier */
        autorization_form_id?: int32;
        /** Types of Telegram Passport elements chosen by user to complete the authorization form */
        types?: vector<PassportElementType>;
    }
    
    
    /** Sends phone number confirmation code to handle links of the type internalLinkTypePhoneNumberConfirmation */
    export interface sendPhoneNumberConfirmationCode {
        '@type': 'sendPhoneNumberConfirmationCode';
        /** Hash value from the link */
        hash?: string;
        /** Phone number value from the link */
        phone_number?: string;
        /** Settings for the authentication of the user's phone number; pass null to use default settings */
        settings?: phoneNumberAuthenticationSettings;
    }
    
    
    /** Resends phone number confirmation code */
    export interface resendPhoneNumberConfirmationCode {
        '@type': 'resendPhoneNumberConfirmationCode';
    }
    
    
    /** Checks phone number confirmation code */
    export interface checkPhoneNumberConfirmationCode {
        '@type': 'checkPhoneNumberConfirmationCode';
        /** Confirmation code to check */
        code?: string;
    }
    
    
    /** Informs the server about the number of pending bot updates if they haven't been processed for a long time; for bots only */
    export interface setBotUpdatesStatus {
        '@type': 'setBotUpdatesStatus';
        /** The number of pending updates */
        pending_update_count?: int32;
        /** The last error message */
        error_message?: string;
    }
    
    
    /** Uploads a file with a sticker; returns the uploaded file */
    export interface uploadStickerFile {
        '@type': 'uploadStickerFile';
        /** Sticker file owner; ignored for regular users */
        user_id?: int53;
        /** Sticker file to upload */
        sticker?: inputSticker;
    }
    
    
    /** Returns a suggested name for a new sticker set with a given title */
    export interface getSuggestedStickerSetName {
        '@type': 'getSuggestedStickerSetName';
        /** Sticker set title; 1-64 characters */
        title?: string;
    }
    
    
    /** Checks whether a name can be used for a new sticker set */
    export interface checkStickerSetName {
        '@type': 'checkStickerSetName';
        /** Name to be checked */
        name?: string;
    }
    
    
    /** Creates a new sticker set. Returns the newly created sticker set */
    export interface createNewStickerSet {
        '@type': 'createNewStickerSet';
        /** Sticker set owner; ignored for regular users */
        user_id?: int53;
        /** Sticker set title; 1-64 characters */
        title?: string;
        /** Sticker set name. Can contain only English letters, digits and underscores. Must end with *"_by_<bot username>"* (*<bot_username>* is case insensitive) for bots; 1-64 characters */
        name?: string;
        /** List of stickers to be added to the set; must be non-empty. All stickers must have the same format. For TGS stickers, uploadStickerFile must be used before the sticker is shown */
        stickers?: vector<inputSticker>;
        /** Source of the sticker set; may be empty if unknown */
        source?: string;
    }
    
    
    /** Adds a new sticker to a set; for bots only. Returns the sticker set */
    export interface addStickerToSet {
        '@type': 'addStickerToSet';
        /** Sticker set owner */
        user_id?: int53;
        /** Sticker set name */
        name?: string;
        /** Sticker to add to the set */
        sticker?: inputSticker;
    }
    
    
    /** Sets a sticker set thumbnail; for bots only. Returns the sticker set */
    export interface setStickerSetThumbnail {
        '@type': 'setStickerSetThumbnail';
        /** Sticker set owner */
        user_id?: int53;
        /** Sticker set name */
        name?: string;
        /** Thumbnail to set in PNG, TGS, or WEBM format; pass null to remove the sticker set thumbnail. Thumbnail format must match the format of stickers in the set */
        thumbnail?: InputFile;
    }
    
    
    /** Changes the position of a sticker in the set to which it belongs; for bots only. The sticker set must have been created by the bot */
    export interface setStickerPositionInSet {
        '@type': 'setStickerPositionInSet';
        /** Sticker */
        sticker?: InputFile;
        /** New position of the sticker in the set, 0-based */
        position?: int32;
    }
    
    
    /** Removes a sticker from the set to which it belongs; for bots only. The sticker set must have been created by the bot */
    export interface removeStickerFromSet {
        '@type': 'removeStickerFromSet';
        /** Sticker */
        sticker?: InputFile;
    }
    
    
    /** Returns information about a file with a map thumbnail in PNG format. Only map thumbnail files with size less than 1MB can be downloaded */
    export interface getMapThumbnailFile {
        '@type': 'getMapThumbnailFile';
        /** Location of the map center */
        location?: location;
        /** Map zoom level; 13-20 */
        zoom?: int32;
        /** Map width in pixels before applying scale; 16-1024 */
        width?: int32;
        /** Map height in pixels before applying scale; 16-1024 */
        height?: int32;
        /** Map scale; 1-3 */
        scale?: int32;
        /** Identifier of a chat in which the thumbnail will be shown. Use 0 if unknown */
        chat_id?: int53;
    }
    
    
    /** Returns information about a limit, increased for Premium users. Returns a 404 error if the limit is unknown */
    export interface getPremiumLimit {
        '@type': 'getPremiumLimit';
        /** Type of the limit */
        limit_type?: PremiumLimitType;
    }
    
    
    /** Returns information about features, available to Premium users */
    export interface getPremiumFeatures {
        '@type': 'getPremiumFeatures';
        /** Source of the request; pass null if the method is called from some non-standard source */
        source?: PremiumSource;
    }
    
    
    /** Returns examples of premium stickers for demonstration purposes */
    export interface getPremiumStickers {
        '@type': 'getPremiumStickers';
    }
    
    
    /** Informs TDLib that the user viewed detailed information about a Premium feature on the Premium features screen */
    export interface viewPremiumFeature {
        '@type': 'viewPremiumFeature';
        /** The viewed premium feature */
        feature?: PremiumFeature;
    }
    
    
    /** Informs TDLib that the user clicked Premium subscription button on the Premium features screen */
    export interface clickPremiumSubscriptionButton {
        '@type': 'clickPremiumSubscriptionButton';
    }
    
    
    /** Returns state of Telegram Premium subscription and promotion videos for Premium features */
    export interface getPremiumState {
        '@type': 'getPremiumState';
    }
    
    
    /** Checks whether Telegram Premium purchase is possible. Must be called before in-store Premium purchase */
    export interface canPurchasePremium {
        '@type': 'canPurchasePremium';
    }
    
    
    /** Informs server about a Telegram Premium purchase through App Store. For official applications only */
    export interface assignAppStoreTransaction {
        '@type': 'assignAppStoreTransaction';
        /** App Store receipt */
        receipt?: bytes;
        /** Pass true if this is a restore of a Telegram Premium purchase */
        is_restore?: Bool;
    }
    
    
    /** Informs server about a Telegram Premium purchase through Google Play. For official applications only */
    export interface assignGooglePlayTransaction {
        '@type': 'assignGooglePlayTransaction';
        /** Google Play purchase token */
        purchase_token?: string;
    }
    
    
    /** Accepts Telegram terms of services */
    export interface acceptTermsOfService {
        '@type': 'acceptTermsOfService';
        /** Terms of service identifier */
        terms_of_service_id?: string;
    }
    
    
    /** Sends a custom request; for bots only */
    export interface sendCustomRequest {
        '@type': 'sendCustomRequest';
        /** The method name */
        method?: string;
        /** JSON-serialized method parameters */
        parameters?: string;
    }
    
    
    /** Answers a custom query; for bots only */
    export interface answerCustomQuery {
        '@type': 'answerCustomQuery';
        /** Identifier of a custom query */
        custom_query_id?: int64;
        /** JSON-serialized answer to the query */
        data?: string;
    }
    
    
    /** Succeeds after a specified amount of time has passed. Can be called before initialization */
    export interface setAlarm {
        '@type': 'setAlarm';
        /** Number of seconds before the function returns */
        seconds?: double;
    }
    
    
    /** Returns information about existing countries. Can be called before authorization */
    export interface getCountries {
        '@type': 'getCountries';
    }
    
    
    /** Uses the current IP address to find the current country. Returns two-letter ISO 3166-1 alpha-2 country code. Can be called before authorization */
    export interface getCountryCode {
        '@type': 'getCountryCode';
    }
    
    
    /** Returns information about a phone number by its prefix. Can be called before authorization */
    export interface getPhoneNumberInfo {
        '@type': 'getPhoneNumberInfo';
        /** The phone number prefix */
        phone_number_prefix?: string;
    }
    
    
    /** Returns information about a phone number by its prefix synchronously. getCountries must be called at least once after changing localization to the specified language if properly localized country information is expected. Can be called synchronously */
    export interface getPhoneNumberInfoSync {
        '@type': 'getPhoneNumberInfoSync';
        /** A two-letter ISO 639-1 language code for country information localization */
        language_code?: string;
        /** The phone number prefix */
        phone_number_prefix?: string;
    }
    
    
    /** Returns the link for downloading official Telegram application to be used when the current user invites friends to Telegram */
    export interface getApplicationDownloadLink {
        '@type': 'getApplicationDownloadLink';
    }
    
    
    /** Returns information about a tg:// deep link. Use "tg://need_update_for_some_feature" or "tg:some_unsupported_feature" for testing. Returns a 404 error for unknown links. Can be called before authorization */
    export interface getDeepLinkInfo {
        '@type': 'getDeepLinkInfo';
        /** The link */
        link?: string;
    }
    
    
    /** Returns application config, provided by the server. Can be called before authorization */
    export interface getApplicationConfig {
        '@type': 'getApplicationConfig';
    }
    
    
    /** Saves application log event on the server. Can be called before authorization */
    export interface saveApplicationLogEvent {
        '@type': 'saveApplicationLogEvent';
        /** Event type */
        type?: string;
        /** Optional chat identifier, associated with the event */
        chat_id?: int53;
        /** The log event data */
        data?: JsonValue;
    }
    
    
    /** Edits an existing proxy server for network requests. Can be called before authorization */
    export interface editProxy {
        '@type': 'editProxy';
        /** Proxy identifier */
        proxy_id?: int32;
        /** Proxy server IP address */
        server?: string;
        /** Proxy server port */
        port?: int32;
        /** Pass true to immediately enable the proxy */
        enable?: Bool;
        /** Proxy type */
        type?: ProxyType;
    }
    
    
    /** Enables a proxy. Only one proxy can be enabled at a time. Can be called before authorization */
    export interface enableProxy {
        '@type': 'enableProxy';
        /** Proxy identifier */
        proxy_id?: int32;
    }
    
    
    /** Disables the currently enabled proxy. Can be called before authorization */
    export interface disableProxy {
        '@type': 'disableProxy';
    }
    
    
    /** Removes a proxy server. Can be called before authorization */
    export interface removeProxy {
        '@type': 'removeProxy';
        /** Proxy identifier */
        proxy_id?: int32;
    }
    
    
    /** Returns list of proxies that are currently set up. Can be called before authorization */
    export interface getProxies {
        '@type': 'getProxies';
    }
    
    
    /** Returns an HTTPS link, which can be used to add a proxy. Available only for SOCKS5 and MTProto proxies. Can be called before authorization */
    export interface getProxyLink {
        '@type': 'getProxyLink';
        /** Proxy identifier */
        proxy_id?: int32;
    }
    
    
    /** Computes time needed to receive a response from a Telegram server through a proxy. Can be called before authorization */
    export interface pingProxy {
        '@type': 'pingProxy';
        /** Proxy identifier. Use 0 to ping a Telegram server without a proxy */
        proxy_id?: int32;
    }
    
    
    /** Sets new log stream for internal logging of TDLib. Can be called synchronously */
    export interface setLogStream {
        '@type': 'setLogStream';
        /** New log stream */
        log_stream?: LogStream;
    }
    
    
    /** Returns information about currently used log stream for internal logging of TDLib. Can be called synchronously */
    export interface getLogStream {
        '@type': 'getLogStream';
    }
    
    
    /** Sets the verbosity level of the internal logging of TDLib. Can be called synchronously */
    export interface setLogVerbosityLevel {
        '@type': 'setLogVerbosityLevel';
        /** New value of the verbosity level for logging. Value 0 corresponds to fatal errors, value 1 corresponds to errors, value 2 corresponds to warnings and debug warnings, value 3 corresponds to informational, value 4 corresponds to debug, value 5 corresponds to verbose debug, value greater than 5 and up to 1023 can be used to enable even more logging */
        new_verbosity_level?: int32;
    }
    
    
    /** Returns current verbosity level of the internal logging of TDLib. Can be called synchronously */
    export interface getLogVerbosityLevel {
        '@type': 'getLogVerbosityLevel';
    }
    
    
    /** Returns list of available TDLib internal log tags, for example, ["actor", "binlog", "connections", "notifications", "proxy"]. Can be called synchronously */
    export interface getLogTags {
        '@type': 'getLogTags';
    }
    
    
    /** Sets the verbosity level for a specified TDLib internal log tag. Can be called synchronously */
    export interface setLogTagVerbosityLevel {
        '@type': 'setLogTagVerbosityLevel';
        /** Logging tag to change verbosity level */
        tag?: string;
        /** New verbosity level; 1-1024 */
        new_verbosity_level?: int32;
    }
    
    
    /** Returns current verbosity level for a specified TDLib internal log tag. Can be called synchronously */
    export interface getLogTagVerbosityLevel {
        '@type': 'getLogTagVerbosityLevel';
        /** Logging tag to change verbosity level */
        tag?: string;
    }
    
    
    /** Adds a message to TDLib internal log. Can be called synchronously */
    export interface addLogMessage {
        '@type': 'addLogMessage';
        /** The minimum verbosity level needed for the message to be logged; 0-1023 */
        verbosity_level?: int32;
        /** Text of a message to log */
        text?: string;
    }
    
    
    /** Does nothing; for testing only. This is an offline method. Can be called before authorization */
    export interface testCallEmpty {
        '@type': 'testCallEmpty';
    }
    
    
    /** Returns the received string; for testing only. This is an offline method. Can be called before authorization */
    export interface testCallString {
        '@type': 'testCallString';
        /** String to return */
        x?: string;
    }
    
    
    /** Returns the received bytes; for testing only. This is an offline method. Can be called before authorization */
    export interface testCallBytes {
        '@type': 'testCallBytes';
        /** Bytes to return */
        x?: bytes;
    }
    
    
    /** Returns the received vector of numbers; for testing only. This is an offline method. Can be called before authorization */
    export interface testCallVectorInt {
        '@type': 'testCallVectorInt';
        /** Vector of numbers to return */
        x?: vector<int32>;
    }
    
    
    /** Returns the received vector of objects containing a number; for testing only. This is an offline method. Can be called before authorization */
    export interface testCallVectorIntObject {
        '@type': 'testCallVectorIntObject';
        /** Vector of objects to return */
        x?: vector<testInt>;
    }
    
    
    /** Returns the received vector of strings; for testing only. This is an offline method. Can be called before authorization */
    export interface testCallVectorString {
        '@type': 'testCallVectorString';
        /** Vector of strings to return */
        x?: vector<string>;
    }
    
    
    /** Returns the received vector of objects containing a string; for testing only. This is an offline method. Can be called before authorization */
    export interface testCallVectorStringObject {
        '@type': 'testCallVectorStringObject';
        /** Vector of objects to return */
        x?: vector<testString>;
    }
    
    
    /** Returns the squared received number; for testing only. This is an offline method. Can be called before authorization */
    export interface testSquareInt {
        '@type': 'testSquareInt';
        /** Number to square */
        x?: int32;
    }
    
    
    /** Sends a simple network request to the Telegram servers; for testing only. Can be called before authorization */
    export interface testNetwork {
        '@type': 'testNetwork';
    }
    
    
    /** Sends a simple network request to the Telegram servers via proxy; for testing only. Can be called before authorization */
    export interface testProxy {
        '@type': 'testProxy';
        /** Proxy server IP address */
        server?: string;
        /** Proxy server port */
        port?: int32;
        /** Proxy type */
        type?: ProxyType;
        /** Identifier of a datacenter with which to test connection */
        dc_id?: int32;
        /** The maximum overall timeout for the request */
        timeout?: double;
    }
    
    
    /** Forces an updates.getDifference call to the Telegram servers; for testing only */
    export interface testGetDifference {
        '@type': 'testGetDifference';
    }
    
    
    /** Does nothing and ensures that the Update object is used; for testing only. This is an offline method. Can be called before authorization */
    export interface testUseUpdate {
        '@type': 'testUseUpdate';
    }
    
    
    /** Returns the specified error and ensures that the Error object is used; for testing only. Can be called synchronously */
    export interface testReturnError {
        '@type': 'testReturnError';
        /** The error to be returned */
        error?: error;
    }
    
    
    /** Changes the verbosity level of TDWeb logging */
    export interface setJsLogVerbosityLevel {
        '@type': 'setJsLogVerbosityLevel';
        /** New value of the verbosity level for logging. */
        new_verbosity_level?: jsLogLevel;
    }
    
    export type TdFunction = getAuthorizationState | setTdlibParameters | checkDatabaseEncryptionKey | setAuthenticationPhoneNumber | resendAuthenticationCode | checkAuthenticationCode | requestQrCodeAuthentication | registerUser | checkAuthenticationPassword | requestAuthenticationPasswordRecovery | checkAuthenticationPasswordRecoveryCode | recoverAuthenticationPassword | checkAuthenticationBotToken | logOut | close | destroy | confirmQrCodeAuthentication | getCurrentState | setDatabaseEncryptionKey | getPasswordState | setPassword | getRecoveryEmailAddress | setRecoveryEmailAddress | checkRecoveryEmailAddressCode | resendRecoveryEmailAddressCode | requestPasswordRecovery | checkPasswordRecoveryCode | recoverPassword | resetPassword | cancelPasswordReset | createTemporaryPassword | getTemporaryPasswordState | getMe | getUser | getUserFullInfo | getBasicGroup | getBasicGroupFullInfo | getSupergroup | getSupergroupFullInfo | getSecretChat | getChat | getMessage | getMessageLocally | getRepliedMessage | getChatPinnedMessage | getCallbackQueryMessage | getMessages | getMessageThread | getMessageViewers | getFile | getRemoteFile | loadChats | getChats | searchPublicChat | searchPublicChats | searchChats | searchChatsOnServer | searchChatsNearby | getTopChats | removeTopChat | addRecentlyFoundChat | removeRecentlyFoundChat | clearRecentlyFoundChats | getRecentlyOpenedChats | checkChatUsername | getCreatedPublicChats | checkCreatedPublicChatsLimit | getSuitableDiscussionChats | getInactiveSupergroupChats | getGroupsInCommon | getChatHistory | getMessageThreadHistory | deleteChatHistory | deleteChat | searchChatMessages | searchMessages | searchSecretMessages | searchCallMessages | searchOutgoingDocumentMessages | deleteAllCallMessages | searchChatRecentLocationMessages | getActiveLiveLocationMessages | getChatMessageByDate | getChatSparseMessagePositions | getChatMessageCalendar | getChatMessageCount | getChatScheduledMessages | getMessagePublicForwards | getChatSponsoredMessage | removeNotification | removeNotificationGroup | getMessageLink | getMessageEmbeddingCode | getMessageLinkInfo | translateText | recognizeSpeech | rateSpeechRecognition | getChatAvailableMessageSenders | setChatMessageSender | sendMessage | sendMessageAlbum | sendBotStartMessage | sendInlineQueryResultMessage | forwardMessages | resendMessages | sendChatScreenshotTakenNotification | addLocalMessage | deleteMessages | deleteChatMessagesBySender | deleteChatMessagesByDate | editMessageText | editMessageLiveLocation | editMessageMedia | editMessageCaption | editMessageReplyMarkup | editInlineMessageText | editInlineMessageLiveLocation | editInlineMessageMedia | editInlineMessageCaption | editInlineMessageReplyMarkup | editMessageSchedulingState | getMessageAvailableReactions | setMessageReaction | getMessageAddedReactions | getTextEntities | parseTextEntities | parseMarkdown | getMarkdownText | getFileMimeType | getFileExtension | cleanFileName | getLanguagePackString | getJsonValue | getJsonString | getThemeParametersJsonString | setPollAnswer | getPollVoters | stopPoll | hideSuggestedAction | getLoginUrlInfo | getLoginUrl | getInlineQueryResults | answerInlineQuery | getWebAppUrl | sendWebAppData | openWebApp | closeWebApp | answerWebAppQuery | getCallbackQueryAnswer | answerCallbackQuery | answerShippingQuery | answerPreCheckoutQuery | setGameScore | setInlineGameScore | getGameHighScores | getInlineGameHighScores | deleteChatReplyMarkup | sendChatAction | openChat | closeChat | viewMessages | openMessageContent | clickAnimatedEmojiMessage | getInternalLinkType | getExternalLinkInfo | getExternalLink | readAllChatMentions | readAllChatReactions | createPrivateChat | createBasicGroupChat | createSupergroupChat | createSecretChat | createNewBasicGroupChat | createNewSupergroupChat | createNewSecretChat | upgradeBasicGroupChatToSupergroupChat | getChatListsToAddChat | addChatToList | getChatFilter | createChatFilter | editChatFilter | deleteChatFilter | reorderChatFilters | getRecommendedChatFilters | getChatFilterDefaultIconName | setChatTitle | setChatPhoto | setChatMessageTtl | setChatPermissions | setChatTheme | setChatDraftMessage | setChatNotificationSettings | toggleChatHasProtectedContent | toggleChatIsMarkedAsUnread | toggleChatDefaultDisableNotification | setChatAvailableReactions | setChatClientData | setChatDescription | setChatDiscussionGroup | setChatLocation | setChatSlowModeDelay | pinChatMessage | unpinChatMessage | unpinAllChatMessages | joinChat | leaveChat | addChatMember | addChatMembers | setChatMemberStatus | banChatMember | canTransferOwnership | transferChatOwnership | getChatMember | searchChatMembers | getChatAdministrators | clearAllDraftMessages | getSavedNotificationSound | getSavedNotificationSounds | addSavedNotificationSound | removeSavedNotificationSound | getChatNotificationSettingsExceptions | getScopeNotificationSettings | setScopeNotificationSettings | resetAllNotificationSettings | toggleChatIsPinned | setPinnedChats | getAttachmentMenuBot | toggleBotIsAddedToAttachmentMenu | downloadFile | cancelDownloadFile | getSuggestedFileName | uploadFile | cancelUploadFile | writeGeneratedFilePart | setFileGenerationProgress | finishFileGeneration | readFilePart | deleteFile | addFileToDownloads | toggleDownloadIsPaused | toggleAllDownloadsArePaused | removeFileFromDownloads | removeAllFilesFromDownloads | searchFileDownloads | getMessageFileType | getMessageImportConfirmationText | importMessages | replacePrimaryChatInviteLink | createChatInviteLink | editChatInviteLink | getChatInviteLink | getChatInviteLinkCounts | getChatInviteLinks | getChatInviteLinkMembers | revokeChatInviteLink | deleteRevokedChatInviteLink | deleteAllRevokedChatInviteLinks | checkChatInviteLink | joinChatByInviteLink | getChatJoinRequests | processChatJoinRequest | processChatJoinRequests | createCall | acceptCall | sendCallSignalingData | discardCall | sendCallRating | sendCallDebugInformation | sendCallLog | getVideoChatAvailableParticipants | setVideoChatDefaultParticipant | createVideoChat | getVideoChatRtmpUrl | replaceVideoChatRtmpUrl | getGroupCall | startScheduledGroupCall | toggleGroupCallEnabledStartNotification | joinGroupCall | startGroupCallScreenSharing | toggleGroupCallScreenSharingIsPaused | endGroupCallScreenSharing | setGroupCallTitle | toggleGroupCallMuteNewParticipants | inviteGroupCallParticipants | getGroupCallInviteLink | revokeGroupCallInviteLink | startGroupCallRecording | endGroupCallRecording | toggleGroupCallIsMyVideoPaused | toggleGroupCallIsMyVideoEnabled | setGroupCallParticipantIsSpeaking | toggleGroupCallParticipantIsMuted | setGroupCallParticipantVolumeLevel | toggleGroupCallParticipantIsHandRaised | loadGroupCallParticipants | leaveGroupCall | endGroupCall | getGroupCallStreams | getGroupCallStreamSegment | toggleMessageSenderIsBlocked | blockMessageSenderFromReplies | getBlockedMessageSenders | addContact | importContacts | getContacts | searchContacts | removeContacts | getImportedContactCount | changeImportedContacts | clearImportedContacts | searchUserByPhoneNumber | sharePhoneNumber | getUserProfilePhotos | getStickers | searchStickers | getInstalledStickerSets | getArchivedStickerSets | getTrendingStickerSets | getAttachedStickerSets | getStickerSet | searchStickerSet | searchInstalledStickerSets | searchStickerSets | changeStickerSet | viewTrendingStickerSets | reorderInstalledStickerSets | getRecentStickers | addRecentSticker | removeRecentSticker | clearRecentStickers | getFavoriteStickers | addFavoriteSticker | removeFavoriteSticker | getStickerEmojis | searchEmojis | getAnimatedEmoji | getAllAnimatedEmojis | getEmojiSuggestionsUrl | getSavedAnimations | addSavedAnimation | removeSavedAnimation | getRecentInlineBots | searchHashtags | removeRecentHashtag | getWebPagePreview | getWebPageInstantView | setProfilePhoto | deleteProfilePhoto | setName | setBio | setUsername | setLocation | changePhoneNumber | resendChangePhoneNumberCode | checkChangePhoneNumberCode | setCommands | deleteCommands | getCommands | setMenuButton | getMenuButton | setDefaultGroupAdministratorRights | setDefaultChannelAdministratorRights | getActiveSessions | terminateSession | terminateAllOtherSessions | toggleSessionCanAcceptCalls | toggleSessionCanAcceptSecretChats | setInactiveSessionTtl | getConnectedWebsites | disconnectWebsite | disconnectAllWebsites | setSupergroupUsername | setSupergroupStickerSet | toggleSupergroupSignMessages | toggleSupergroupJoinToSendMessages | toggleSupergroupJoinByRequest | toggleSupergroupIsAllHistoryAvailable | toggleSupergroupIsBroadcastGroup | reportSupergroupSpam | getSupergroupMembers | closeSecretChat | getChatEventLog | getPaymentForm | validateOrderInfo | sendPaymentForm | getPaymentReceipt | getSavedOrderInfo | deleteSavedOrderInfo | deleteSavedCredentials | createInvoiceLink | getSupportUser | getBackgrounds | getBackgroundUrl | searchBackground | setBackground | removeBackground | resetBackgrounds | getLocalizationTargetInfo | getLanguagePackInfo | getLanguagePackStrings | synchronizeLanguagePack | addCustomServerLanguagePack | setCustomLanguagePack | editCustomLanguagePackInfo | setCustomLanguagePackString | deleteLanguagePack | registerDevice | processPushNotification | getPushReceiverId | getRecentlyVisitedTMeUrls | setUserPrivacySettingRules | getUserPrivacySettingRules | getOption | setOption | setAccountTtl | getAccountTtl | deleteAccount | removeChatActionBar | reportChat | reportChatPhoto | getChatStatistics | getMessageStatistics | getStatisticalGraph | getDatabaseStatistics | setNetworkType | getNetworkStatistics | addNetworkStatistics | resetNetworkStatistics | getAutoDownloadSettingsPresets | setAutoDownloadSettings | getBankCardInfo | getPassportElement | getAllPassportElements | setPassportElement | deletePassportElement | setPassportElementErrors | getPreferredCountryLanguage | sendPhoneNumberVerificationCode | resendPhoneNumberVerificationCode | checkPhoneNumberVerificationCode | sendEmailAddressVerificationCode | resendEmailAddressVerificationCode | checkEmailAddressVerificationCode | getPassportAuthorizationForm | getPassportAuthorizationFormAvailableElements | sendPassportAuthorizationForm | sendPhoneNumberConfirmationCode | resendPhoneNumberConfirmationCode | checkPhoneNumberConfirmationCode | setBotUpdatesStatus | uploadStickerFile | getSuggestedStickerSetName | checkStickerSetName | createNewStickerSet | addStickerToSet | setStickerSetThumbnail | setStickerPositionInSet | removeStickerFromSet | getMapThumbnailFile | getPremiumLimit | getPremiumFeatures | getPremiumStickers | viewPremiumFeature | clickPremiumSubscriptionButton | getPremiumState | canPurchasePremium | assignAppStoreTransaction | assignGooglePlayTransaction | acceptTermsOfService | sendCustomRequest | answerCustomQuery | setAlarm | getCountries | getCountryCode | getPhoneNumberInfo | getPhoneNumberInfoSync | getApplicationDownloadLink | getDeepLinkInfo | getApplicationConfig | saveApplicationLogEvent | editProxy | enableProxy | disableProxy | removeProxy | getProxies | getProxyLink | pingProxy | setLogStream | getLogStream | setLogVerbosityLevel | getLogVerbosityLevel | getLogTags | setLogTagVerbosityLevel | getLogTagVerbosityLevel | addLogMessage | testCallEmpty | testCallString | testCallBytes | testCallVectorInt | testCallVectorIntObject | testCallVectorString | testCallVectorStringObject | testSquareInt | testNetwork | testProxy | testGetDifference | testUseUpdate | testReturnError | setJsLogVerbosityLevel;
    export type TdFunctionReturn<t> = 
    t extends getAuthorizationState ? AuthorizationState :
        t extends setTdlibParameters ? Ok :
        t extends checkDatabaseEncryptionKey ? Ok :
        t extends setAuthenticationPhoneNumber ? Ok :
        t extends resendAuthenticationCode ? Ok :
        t extends checkAuthenticationCode ? Ok :
        t extends requestQrCodeAuthentication ? Ok :
        t extends registerUser ? Ok :
        t extends checkAuthenticationPassword ? Ok :
        t extends requestAuthenticationPasswordRecovery ? Ok :
        t extends checkAuthenticationPasswordRecoveryCode ? Ok :
        t extends recoverAuthenticationPassword ? Ok :
        t extends checkAuthenticationBotToken ? Ok :
        t extends logOut ? Ok :
        t extends close ? Ok :
        t extends destroy ? Ok :
        t extends confirmQrCodeAuthentication ? Session :
        t extends getCurrentState ? Updates :
        t extends setDatabaseEncryptionKey ? Ok :
        t extends getPasswordState ? PasswordState :
        t extends setPassword ? PasswordState :
        t extends getRecoveryEmailAddress ? RecoveryEmailAddress :
        t extends setRecoveryEmailAddress ? PasswordState :
        t extends checkRecoveryEmailAddressCode ? PasswordState :
        t extends resendRecoveryEmailAddressCode ? PasswordState :
        t extends requestPasswordRecovery ? EmailAddressAuthenticationCodeInfo :
        t extends checkPasswordRecoveryCode ? Ok :
        t extends recoverPassword ? PasswordState :
        t extends resetPassword ? ResetPasswordResult :
        t extends cancelPasswordReset ? Ok :
        t extends createTemporaryPassword ? TemporaryPasswordState :
        t extends getTemporaryPasswordState ? TemporaryPasswordState :
        t extends getMe ? User :
        t extends getUser ? User :
        t extends getUserFullInfo ? UserFullInfo :
        t extends getBasicGroup ? BasicGroup :
        t extends getBasicGroupFullInfo ? BasicGroupFullInfo :
        t extends getSupergroup ? Supergroup :
        t extends getSupergroupFullInfo ? SupergroupFullInfo :
        t extends getSecretChat ? SecretChat :
        t extends getChat ? Chat :
        t extends getMessage ? Message :
        t extends getMessageLocally ? Message :
        t extends getRepliedMessage ? Message :
        t extends getChatPinnedMessage ? Message :
        t extends getCallbackQueryMessage ? Message :
        t extends getMessages ? Messages :
        t extends getMessageThread ? MessageThreadInfo :
        t extends getMessageViewers ? Users :
        t extends getFile ? File :
        t extends getRemoteFile ? File :
        t extends loadChats ? Ok :
        t extends getChats ? Chats :
        t extends searchPublicChat ? Chat :
        t extends searchPublicChats ? Chats :
        t extends searchChats ? Chats :
        t extends searchChatsOnServer ? Chats :
        t extends searchChatsNearby ? ChatsNearby :
        t extends getTopChats ? Chats :
        t extends removeTopChat ? Ok :
        t extends addRecentlyFoundChat ? Ok :
        t extends removeRecentlyFoundChat ? Ok :
        t extends clearRecentlyFoundChats ? Ok :
        t extends getRecentlyOpenedChats ? Chats :
        t extends checkChatUsername ? CheckChatUsernameResult :
        t extends getCreatedPublicChats ? Chats :
        t extends checkCreatedPublicChatsLimit ? Ok :
        t extends getSuitableDiscussionChats ? Chats :
        t extends getInactiveSupergroupChats ? Chats :
        t extends getGroupsInCommon ? Chats :
        t extends getChatHistory ? Messages :
        t extends getMessageThreadHistory ? Messages :
        t extends deleteChatHistory ? Ok :
        t extends deleteChat ? Ok :
        t extends searchChatMessages ? Messages :
        t extends searchMessages ? Messages :
        t extends searchSecretMessages ? FoundMessages :
        t extends searchCallMessages ? Messages :
        t extends searchOutgoingDocumentMessages ? FoundMessages :
        t extends deleteAllCallMessages ? Ok :
        t extends searchChatRecentLocationMessages ? Messages :
        t extends getActiveLiveLocationMessages ? Messages :
        t extends getChatMessageByDate ? Message :
        t extends getChatSparseMessagePositions ? MessagePositions :
        t extends getChatMessageCalendar ? MessageCalendar :
        t extends getChatMessageCount ? Count :
        t extends getChatScheduledMessages ? Messages :
        t extends getMessagePublicForwards ? FoundMessages :
        t extends getChatSponsoredMessage ? SponsoredMessage :
        t extends removeNotification ? Ok :
        t extends removeNotificationGroup ? Ok :
        t extends getMessageLink ? MessageLink :
        t extends getMessageEmbeddingCode ? Text :
        t extends getMessageLinkInfo ? MessageLinkInfo :
        t extends translateText ? Text :
        t extends recognizeSpeech ? Ok :
        t extends rateSpeechRecognition ? Ok :
        t extends getChatAvailableMessageSenders ? MessageSenders :
        t extends setChatMessageSender ? Ok :
        t extends sendMessage ? Message :
        t extends sendMessageAlbum ? Messages :
        t extends sendBotStartMessage ? Message :
        t extends sendInlineQueryResultMessage ? Message :
        t extends forwardMessages ? Messages :
        t extends resendMessages ? Messages :
        t extends sendChatScreenshotTakenNotification ? Ok :
        t extends addLocalMessage ? Message :
        t extends deleteMessages ? Ok :
        t extends deleteChatMessagesBySender ? Ok :
        t extends deleteChatMessagesByDate ? Ok :
        t extends editMessageText ? Message :
        t extends editMessageLiveLocation ? Message :
        t extends editMessageMedia ? Message :
        t extends editMessageCaption ? Message :
        t extends editMessageReplyMarkup ? Message :
        t extends editInlineMessageText ? Ok :
        t extends editInlineMessageLiveLocation ? Ok :
        t extends editInlineMessageMedia ? Ok :
        t extends editInlineMessageCaption ? Ok :
        t extends editInlineMessageReplyMarkup ? Ok :
        t extends editMessageSchedulingState ? Ok :
        t extends getMessageAvailableReactions ? AvailableReactions :
        t extends setMessageReaction ? Ok :
        t extends getMessageAddedReactions ? AddedReactions :
        t extends getTextEntities ? TextEntities :
        t extends parseTextEntities ? FormattedText :
        t extends parseMarkdown ? FormattedText :
        t extends getMarkdownText ? FormattedText :
        t extends getFileMimeType ? Text :
        t extends getFileExtension ? Text :
        t extends cleanFileName ? Text :
        t extends getLanguagePackString ? LanguagePackStringValue :
        t extends getJsonValue ? JsonValue :
        t extends getJsonString ? Text :
        t extends getThemeParametersJsonString ? Text :
        t extends setPollAnswer ? Ok :
        t extends getPollVoters ? Users :
        t extends stopPoll ? Ok :
        t extends hideSuggestedAction ? Ok :
        t extends getLoginUrlInfo ? LoginUrlInfo :
        t extends getLoginUrl ? HttpUrl :
        t extends getInlineQueryResults ? InlineQueryResults :
        t extends answerInlineQuery ? Ok :
        t extends getWebAppUrl ? HttpUrl :
        t extends sendWebAppData ? Ok :
        t extends openWebApp ? WebAppInfo :
        t extends closeWebApp ? Ok :
        t extends answerWebAppQuery ? SentWebAppMessage :
        t extends getCallbackQueryAnswer ? CallbackQueryAnswer :
        t extends answerCallbackQuery ? Ok :
        t extends answerShippingQuery ? Ok :
        t extends answerPreCheckoutQuery ? Ok :
        t extends setGameScore ? Message :
        t extends setInlineGameScore ? Ok :
        t extends getGameHighScores ? GameHighScores :
        t extends getInlineGameHighScores ? GameHighScores :
        t extends deleteChatReplyMarkup ? Ok :
        t extends sendChatAction ? Ok :
        t extends openChat ? Ok :
        t extends closeChat ? Ok :
        t extends viewMessages ? Ok :
        t extends openMessageContent ? Ok :
        t extends clickAnimatedEmojiMessage ? Sticker :
        t extends getInternalLinkType ? InternalLinkType :
        t extends getExternalLinkInfo ? LoginUrlInfo :
        t extends getExternalLink ? HttpUrl :
        t extends readAllChatMentions ? Ok :
        t extends readAllChatReactions ? Ok :
        t extends createPrivateChat ? Chat :
        t extends createBasicGroupChat ? Chat :
        t extends createSupergroupChat ? Chat :
        t extends createSecretChat ? Chat :
        t extends createNewBasicGroupChat ? Chat :
        t extends createNewSupergroupChat ? Chat :
        t extends createNewSecretChat ? Chat :
        t extends upgradeBasicGroupChatToSupergroupChat ? Chat :
        t extends getChatListsToAddChat ? ChatLists :
        t extends addChatToList ? Ok :
        t extends getChatFilter ? ChatFilter :
        t extends createChatFilter ? ChatFilterInfo :
        t extends editChatFilter ? ChatFilterInfo :
        t extends deleteChatFilter ? Ok :
        t extends reorderChatFilters ? Ok :
        t extends getRecommendedChatFilters ? RecommendedChatFilters :
        t extends getChatFilterDefaultIconName ? Text :
        t extends setChatTitle ? Ok :
        t extends setChatPhoto ? Ok :
        t extends setChatMessageTtl ? Ok :
        t extends setChatPermissions ? Ok :
        t extends setChatTheme ? Ok :
        t extends setChatDraftMessage ? Ok :
        t extends setChatNotificationSettings ? Ok :
        t extends toggleChatHasProtectedContent ? Ok :
        t extends toggleChatIsMarkedAsUnread ? Ok :
        t extends toggleChatDefaultDisableNotification ? Ok :
        t extends setChatAvailableReactions ? Ok :
        t extends setChatClientData ? Ok :
        t extends setChatDescription ? Ok :
        t extends setChatDiscussionGroup ? Ok :
        t extends setChatLocation ? Ok :
        t extends setChatSlowModeDelay ? Ok :
        t extends pinChatMessage ? Ok :
        t extends unpinChatMessage ? Ok :
        t extends unpinAllChatMessages ? Ok :
        t extends joinChat ? Ok :
        t extends leaveChat ? Ok :
        t extends addChatMember ? Ok :
        t extends addChatMembers ? Ok :
        t extends setChatMemberStatus ? Ok :
        t extends banChatMember ? Ok :
        t extends canTransferOwnership ? CanTransferOwnershipResult :
        t extends transferChatOwnership ? Ok :
        t extends getChatMember ? ChatMember :
        t extends searchChatMembers ? ChatMembers :
        t extends getChatAdministrators ? ChatAdministrators :
        t extends clearAllDraftMessages ? Ok :
        t extends getSavedNotificationSound ? NotificationSounds :
        t extends getSavedNotificationSounds ? NotificationSounds :
        t extends addSavedNotificationSound ? NotificationSound :
        t extends removeSavedNotificationSound ? Ok :
        t extends getChatNotificationSettingsExceptions ? Chats :
        t extends getScopeNotificationSettings ? ScopeNotificationSettings :
        t extends setScopeNotificationSettings ? Ok :
        t extends resetAllNotificationSettings ? Ok :
        t extends toggleChatIsPinned ? Ok :
        t extends setPinnedChats ? Ok :
        t extends getAttachmentMenuBot ? AttachmentMenuBot :
        t extends toggleBotIsAddedToAttachmentMenu ? Ok :
        t extends downloadFile ? File :
        t extends cancelDownloadFile ? Ok :
        t extends getSuggestedFileName ? Text :
        t extends uploadFile ? File :
        t extends cancelUploadFile ? Ok :
        t extends writeGeneratedFilePart ? Ok :
        t extends setFileGenerationProgress ? Ok :
        t extends finishFileGeneration ? Ok :
        t extends readFilePart ? FilePart :
        t extends deleteFile ? Ok :
        t extends addFileToDownloads ? File :
        t extends toggleDownloadIsPaused ? Ok :
        t extends toggleAllDownloadsArePaused ? Ok :
        t extends removeFileFromDownloads ? Ok :
        t extends removeAllFilesFromDownloads ? Ok :
        t extends searchFileDownloads ? FoundFileDownloads :
        t extends getMessageFileType ? MessageFileType :
        t extends getMessageImportConfirmationText ? Text :
        t extends importMessages ? Ok :
        t extends replacePrimaryChatInviteLink ? ChatInviteLink :
        t extends createChatInviteLink ? ChatInviteLink :
        t extends editChatInviteLink ? ChatInviteLink :
        t extends getChatInviteLink ? ChatInviteLink :
        t extends getChatInviteLinkCounts ? ChatInviteLinkCounts :
        t extends getChatInviteLinks ? ChatInviteLinks :
        t extends getChatInviteLinkMembers ? ChatInviteLinkMembers :
        t extends revokeChatInviteLink ? ChatInviteLinks :
        t extends deleteRevokedChatInviteLink ? Ok :
        t extends deleteAllRevokedChatInviteLinks ? Ok :
        t extends checkChatInviteLink ? ChatInviteLinkInfo :
        t extends joinChatByInviteLink ? Chat :
        t extends getChatJoinRequests ? ChatJoinRequests :
        t extends processChatJoinRequest ? Ok :
        t extends processChatJoinRequests ? Ok :
        t extends createCall ? CallId :
        t extends acceptCall ? Ok :
        t extends sendCallSignalingData ? Ok :
        t extends discardCall ? Ok :
        t extends sendCallRating ? Ok :
        t extends sendCallDebugInformation ? Ok :
        t extends sendCallLog ? Ok :
        t extends getVideoChatAvailableParticipants ? MessageSenders :
        t extends setVideoChatDefaultParticipant ? Ok :
        t extends createVideoChat ? GroupCallId :
        t extends getVideoChatRtmpUrl ? RtmpUrl :
        t extends replaceVideoChatRtmpUrl ? RtmpUrl :
        t extends getGroupCall ? GroupCall :
        t extends startScheduledGroupCall ? Ok :
        t extends toggleGroupCallEnabledStartNotification ? Ok :
        t extends joinGroupCall ? Text :
        t extends startGroupCallScreenSharing ? Text :
        t extends toggleGroupCallScreenSharingIsPaused ? Ok :
        t extends endGroupCallScreenSharing ? Ok :
        t extends setGroupCallTitle ? Ok :
        t extends toggleGroupCallMuteNewParticipants ? Ok :
        t extends inviteGroupCallParticipants ? Ok :
        t extends getGroupCallInviteLink ? HttpUrl :
        t extends revokeGroupCallInviteLink ? Ok :
        t extends startGroupCallRecording ? Ok :
        t extends endGroupCallRecording ? Ok :
        t extends toggleGroupCallIsMyVideoPaused ? Ok :
        t extends toggleGroupCallIsMyVideoEnabled ? Ok :
        t extends setGroupCallParticipantIsSpeaking ? Ok :
        t extends toggleGroupCallParticipantIsMuted ? Ok :
        t extends setGroupCallParticipantVolumeLevel ? Ok :
        t extends toggleGroupCallParticipantIsHandRaised ? Ok :
        t extends loadGroupCallParticipants ? Ok :
        t extends leaveGroupCall ? Ok :
        t extends endGroupCall ? Ok :
        t extends getGroupCallStreams ? GroupCallStreams :
        t extends getGroupCallStreamSegment ? FilePart :
        t extends toggleMessageSenderIsBlocked ? Ok :
        t extends blockMessageSenderFromReplies ? Ok :
        t extends getBlockedMessageSenders ? MessageSenders :
        t extends addContact ? Ok :
        t extends importContacts ? ImportedContacts :
        t extends getContacts ? Users :
        t extends searchContacts ? Users :
        t extends removeContacts ? Ok :
        t extends getImportedContactCount ? Count :
        t extends changeImportedContacts ? ImportedContacts :
        t extends clearImportedContacts ? Ok :
        t extends searchUserByPhoneNumber ? User :
        t extends sharePhoneNumber ? Ok :
        t extends getUserProfilePhotos ? ChatPhotos :
        t extends getStickers ? Stickers :
        t extends searchStickers ? Stickers :
        t extends getInstalledStickerSets ? StickerSets :
        t extends getArchivedStickerSets ? StickerSets :
        t extends getTrendingStickerSets ? TrendingStickerSets :
        t extends getAttachedStickerSets ? StickerSets :
        t extends getStickerSet ? StickerSet :
        t extends searchStickerSet ? StickerSet :
        t extends searchInstalledStickerSets ? StickerSets :
        t extends searchStickerSets ? StickerSets :
        t extends changeStickerSet ? Ok :
        t extends viewTrendingStickerSets ? Ok :
        t extends reorderInstalledStickerSets ? Ok :
        t extends getRecentStickers ? Stickers :
        t extends addRecentSticker ? Stickers :
        t extends removeRecentSticker ? Ok :
        t extends clearRecentStickers ? Ok :
        t extends getFavoriteStickers ? Stickers :
        t extends addFavoriteSticker ? Ok :
        t extends removeFavoriteSticker ? Ok :
        t extends getStickerEmojis ? Emojis :
        t extends searchEmojis ? Emojis :
        t extends getAnimatedEmoji ? AnimatedEmoji :
        t extends getAllAnimatedEmojis ? Emojis :
        t extends getEmojiSuggestionsUrl ? HttpUrl :
        t extends getSavedAnimations ? Animations :
        t extends addSavedAnimation ? Ok :
        t extends removeSavedAnimation ? Ok :
        t extends getRecentInlineBots ? Users :
        t extends searchHashtags ? Hashtags :
        t extends removeRecentHashtag ? Ok :
        t extends getWebPagePreview ? WebPage :
        t extends getWebPageInstantView ? WebPageInstantView :
        t extends setProfilePhoto ? Ok :
        t extends deleteProfilePhoto ? Ok :
        t extends setName ? Ok :
        t extends setBio ? Ok :
        t extends setUsername ? Ok :
        t extends setLocation ? Ok :
        t extends changePhoneNumber ? AuthenticationCodeInfo :
        t extends resendChangePhoneNumberCode ? AuthenticationCodeInfo :
        t extends checkChangePhoneNumberCode ? Ok :
        t extends setCommands ? Ok :
        t extends deleteCommands ? Ok :
        t extends getCommands ? BotCommands :
        t extends setMenuButton ? Ok :
        t extends getMenuButton ? BotMenuButton :
        t extends setDefaultGroupAdministratorRights ? Ok :
        t extends setDefaultChannelAdministratorRights ? Ok :
        t extends getActiveSessions ? Sessions :
        t extends terminateSession ? Ok :
        t extends terminateAllOtherSessions ? Ok :
        t extends toggleSessionCanAcceptCalls ? Ok :
        t extends toggleSessionCanAcceptSecretChats ? Ok :
        t extends setInactiveSessionTtl ? Ok :
        t extends getConnectedWebsites ? ConnectedWebsites :
        t extends disconnectWebsite ? Ok :
        t extends disconnectAllWebsites ? Ok :
        t extends setSupergroupUsername ? Ok :
        t extends setSupergroupStickerSet ? Ok :
        t extends toggleSupergroupSignMessages ? Ok :
        t extends toggleSupergroupJoinToSendMessages ? Ok :
        t extends toggleSupergroupJoinByRequest ? Ok :
        t extends toggleSupergroupIsAllHistoryAvailable ? Ok :
        t extends toggleSupergroupIsBroadcastGroup ? Ok :
        t extends reportSupergroupSpam ? Ok :
        t extends getSupergroupMembers ? ChatMembers :
        t extends closeSecretChat ? Ok :
        t extends getChatEventLog ? ChatEvents :
        t extends getPaymentForm ? PaymentForm :
        t extends validateOrderInfo ? ValidatedOrderInfo :
        t extends sendPaymentForm ? PaymentResult :
        t extends getPaymentReceipt ? PaymentReceipt :
        t extends getSavedOrderInfo ? OrderInfo :
        t extends deleteSavedOrderInfo ? Ok :
        t extends deleteSavedCredentials ? Ok :
        t extends createInvoiceLink ? HttpUrl :
        t extends getSupportUser ? User :
        t extends getBackgrounds ? Backgrounds :
        t extends getBackgroundUrl ? HttpUrl :
        t extends searchBackground ? Background :
        t extends setBackground ? Background :
        t extends removeBackground ? Ok :
        t extends resetBackgrounds ? Ok :
        t extends getLocalizationTargetInfo ? LocalizationTargetInfo :
        t extends getLanguagePackInfo ? LanguagePackInfo :
        t extends getLanguagePackStrings ? LanguagePackStrings :
        t extends synchronizeLanguagePack ? Ok :
        t extends addCustomServerLanguagePack ? Ok :
        t extends setCustomLanguagePack ? Ok :
        t extends editCustomLanguagePackInfo ? Ok :
        t extends setCustomLanguagePackString ? Ok :
        t extends deleteLanguagePack ? Ok :
        t extends registerDevice ? PushReceiverId :
        t extends processPushNotification ? Ok :
        t extends getPushReceiverId ? PushReceiverId :
        t extends getRecentlyVisitedTMeUrls ? TMeUrls :
        t extends setUserPrivacySettingRules ? Ok :
        t extends getUserPrivacySettingRules ? UserPrivacySettingRules :
        t extends getOption ? OptionValue :
        t extends setOption ? Ok :
        t extends setAccountTtl ? Ok :
        t extends getAccountTtl ? AccountTtl :
        t extends deleteAccount ? Ok :
        t extends removeChatActionBar ? Ok :
        t extends reportChat ? Ok :
        t extends reportChatPhoto ? Ok :
        t extends getChatStatistics ? ChatStatistics :
        t extends getMessageStatistics ? MessageStatistics :
        t extends getStatisticalGraph ? StatisticalGraph :
        t extends getDatabaseStatistics ? DatabaseStatistics :
        t extends setNetworkType ? Ok :
        t extends getNetworkStatistics ? NetworkStatistics :
        t extends addNetworkStatistics ? Ok :
        t extends resetNetworkStatistics ? Ok :
        t extends getAutoDownloadSettingsPresets ? AutoDownloadSettingsPresets :
        t extends setAutoDownloadSettings ? Ok :
        t extends getBankCardInfo ? BankCardInfo :
        t extends getPassportElement ? PassportElement :
        t extends getAllPassportElements ? PassportElements :
        t extends setPassportElement ? PassportElement :
        t extends deletePassportElement ? Ok :
        t extends setPassportElementErrors ? Ok :
        t extends getPreferredCountryLanguage ? Text :
        t extends sendPhoneNumberVerificationCode ? AuthenticationCodeInfo :
        t extends resendPhoneNumberVerificationCode ? AuthenticationCodeInfo :
        t extends checkPhoneNumberVerificationCode ? Ok :
        t extends sendEmailAddressVerificationCode ? EmailAddressAuthenticationCodeInfo :
        t extends resendEmailAddressVerificationCode ? EmailAddressAuthenticationCodeInfo :
        t extends checkEmailAddressVerificationCode ? Ok :
        t extends getPassportAuthorizationForm ? PassportAuthorizationForm :
        t extends getPassportAuthorizationFormAvailableElements ? PassportElementsWithErrors :
        t extends sendPassportAuthorizationForm ? Ok :
        t extends sendPhoneNumberConfirmationCode ? AuthenticationCodeInfo :
        t extends resendPhoneNumberConfirmationCode ? AuthenticationCodeInfo :
        t extends checkPhoneNumberConfirmationCode ? Ok :
        t extends setBotUpdatesStatus ? Ok :
        t extends uploadStickerFile ? File :
        t extends getSuggestedStickerSetName ? Text :
        t extends checkStickerSetName ? CheckStickerSetNameResult :
        t extends createNewStickerSet ? StickerSet :
        t extends addStickerToSet ? StickerSet :
        t extends setStickerSetThumbnail ? StickerSet :
        t extends setStickerPositionInSet ? Ok :
        t extends removeStickerFromSet ? Ok :
        t extends getMapThumbnailFile ? File :
        t extends getPremiumLimit ? PremiumLimit :
        t extends getPremiumFeatures ? PremiumFeatures :
        t extends getPremiumStickers ? Stickers :
        t extends viewPremiumFeature ? Ok :
        t extends clickPremiumSubscriptionButton ? Ok :
        t extends getPremiumState ? PremiumState :
        t extends canPurchasePremium ? Ok :
        t extends assignAppStoreTransaction ? Ok :
        t extends assignGooglePlayTransaction ? Ok :
        t extends acceptTermsOfService ? Ok :
        t extends sendCustomRequest ? CustomRequestResult :
        t extends answerCustomQuery ? Ok :
        t extends setAlarm ? Ok :
        t extends getCountries ? Countries :
        t extends getCountryCode ? Text :
        t extends getPhoneNumberInfo ? PhoneNumberInfo :
        t extends getPhoneNumberInfoSync ? PhoneNumberInfo :
        t extends getApplicationDownloadLink ? HttpUrl :
        t extends getDeepLinkInfo ? DeepLinkInfo :
        t extends getApplicationConfig ? JsonValue :
        t extends saveApplicationLogEvent ? Ok :
        t extends editProxy ? Proxy :
        t extends enableProxy ? Ok :
        t extends disableProxy ? Ok :
        t extends removeProxy ? Ok :
        t extends getProxies ? Proxies :
        t extends getProxyLink ? HttpUrl :
        t extends pingProxy ? Seconds :
        t extends setLogStream ? Ok :
        t extends getLogStream ? LogStream :
        t extends setLogVerbosityLevel ? Ok :
        t extends getLogVerbosityLevel ? LogVerbosityLevel :
        t extends getLogTags ? LogTags :
        t extends setLogTagVerbosityLevel ? Ok :
        t extends getLogTagVerbosityLevel ? LogVerbosityLevel :
        t extends addLogMessage ? Ok :
        t extends testCallEmpty ? Ok :
        t extends testCallString ? TestString :
        t extends testCallBytes ? TestBytes :
        t extends testCallVectorInt ? TestVectorInt :
        t extends testCallVectorIntObject ? TestVectorIntObject :
        t extends testCallVectorString ? TestVectorString :
        t extends testCallVectorStringObject ? TestVectorStringObject :
        t extends testSquareInt ? TestInt :
        t extends testNetwork ? Ok :
        t extends testProxy ? Ok :
        t extends testGetDifference ? Ok :
        t extends testUseUpdate ? Update :
        t extends testReturnError ? Error :
        t extends setJsLogVerbosityLevel ? Ok :
        never
    
    export type TdUpdateType<t> = 
    t extends updateAuthorizationState ? "ateAuthorizationState" :
        t extends updateNewMessage ? "ateNewMessage" :
        t extends updateMessageSendAcknowledged ? "ateMessageSendAcknowledged" :
        t extends updateMessageSendSucceeded ? "ateMessageSendSucceeded" :
        t extends updateMessageSendFailed ? "ateMessageSendFailed" :
        t extends updateMessageContent ? "ateMessageContent" :
        t extends updateMessageEdited ? "ateMessageEdited" :
        t extends updateMessageIsPinned ? "ateMessageIsPinned" :
        t extends updateMessageInteractionInfo ? "ateMessageInteractionInfo" :
        t extends updateMessageContentOpened ? "ateMessageContentOpened" :
        t extends updateMessageMentionRead ? "ateMessageMentionRead" :
        t extends updateMessageUnreadReactions ? "ateMessageUnreadReactions" :
        t extends updateMessageLiveLocationViewed ? "ateMessageLiveLocationViewed" :
        t extends updateNewChat ? "ateNewChat" :
        t extends updateChatTitle ? "ateChatTitle" :
        t extends updateChatPhoto ? "ateChatPhoto" :
        t extends updateChatPermissions ? "ateChatPermissions" :
        t extends updateChatLastMessage ? "ateChatLastMessage" :
        t extends updateChatPosition ? "ateChatPosition" :
        t extends updateChatReadInbox ? "ateChatReadInbox" :
        t extends updateChatReadOutbox ? "ateChatReadOutbox" :
        t extends updateChatActionBar ? "ateChatActionBar" :
        t extends updateChatAvailableReactions ? "ateChatAvailableReactions" :
        t extends updateChatDraftMessage ? "ateChatDraftMessage" :
        t extends updateChatMessageSender ? "ateChatMessageSender" :
        t extends updateChatMessageTtl ? "ateChatMessageTtl" :
        t extends updateChatNotificationSettings ? "ateChatNotificationSettings" :
        t extends updateChatPendingJoinRequests ? "ateChatPendingJoinRequests" :
        t extends updateChatReplyMarkup ? "ateChatReplyMarkup" :
        t extends updateChatTheme ? "ateChatTheme" :
        t extends updateChatUnreadMentionCount ? "ateChatUnreadMentionCount" :
        t extends updateChatUnreadReactionCount ? "ateChatUnreadReactionCount" :
        t extends updateChatVideoChat ? "ateChatVideoChat" :
        t extends updateChatDefaultDisableNotification ? "ateChatDefaultDisableNotification" :
        t extends updateChatHasProtectedContent ? "ateChatHasProtectedContent" :
        t extends updateChatHasScheduledMessages ? "ateChatHasScheduledMessages" :
        t extends updateChatIsBlocked ? "ateChatIsBlocked" :
        t extends updateChatIsMarkedAsUnread ? "ateChatIsMarkedAsUnread" :
        t extends updateChatFilters ? "ateChatFilters" :
        t extends updateChatOnlineMemberCount ? "ateChatOnlineMemberCount" :
        t extends updateScopeNotificationSettings ? "ateScopeNotificationSettings" :
        t extends updateNotification ? "ateNotification" :
        t extends updateNotificationGroup ? "ateNotificationGroup" :
        t extends updateActiveNotifications ? "ateActiveNotifications" :
        t extends updateHavePendingNotifications ? "ateHavePendingNotifications" :
        t extends updateDeleteMessages ? "ateDeleteMessages" :
        t extends updateChatAction ? "ateChatAction" :
        t extends updateUserStatus ? "ateUserStatus" :
        t extends updateUser ? "ateUser" :
        t extends updateBasicGroup ? "ateBasicGroup" :
        t extends updateSupergroup ? "ateSupergroup" :
        t extends updateSecretChat ? "ateSecretChat" :
        t extends updateUserFullInfo ? "ateUserFullInfo" :
        t extends updateBasicGroupFullInfo ? "ateBasicGroupFullInfo" :
        t extends updateSupergroupFullInfo ? "ateSupergroupFullInfo" :
        t extends updateServiceNotification ? "ateServiceNotification" :
        t extends updateFile ? "ateFile" :
        t extends updateFileGenerationStart ? "ateFileGenerationStart" :
        t extends updateFileGenerationStop ? "ateFileGenerationStop" :
        t extends updateFileDownloads ? "ateFileDownloads" :
        t extends updateFileAddedToDownloads ? "ateFileAddedToDownloads" :
        t extends updateFileDownload ? "ateFileDownload" :
        t extends updateFileRemovedFromDownloads ? "ateFileRemovedFromDownloads" :
        t extends updateCall ? "ateCall" :
        t extends updateGroupCall ? "ateGroupCall" :
        t extends updateGroupCallParticipant ? "ateGroupCallParticipant" :
        t extends updateNewCallSignalingData ? "ateNewCallSignalingData" :
        t extends updateUserPrivacySettingRules ? "ateUserPrivacySettingRules" :
        t extends updateUnreadMessageCount ? "ateUnreadMessageCount" :
        t extends updateUnreadChatCount ? "ateUnreadChatCount" :
        t extends updateOption ? "ateOption" :
        t extends updateStickerSet ? "ateStickerSet" :
        t extends updateInstalledStickerSets ? "ateInstalledStickerSets" :
        t extends updateTrendingStickerSets ? "ateTrendingStickerSets" :
        t extends updateRecentStickers ? "ateRecentStickers" :
        t extends updateFavoriteStickers ? "ateFavoriteStickers" :
        t extends updateSavedAnimations ? "ateSavedAnimations" :
        t extends updateSavedNotificationSounds ? "ateSavedNotificationSounds" :
        t extends updateSelectedBackground ? "ateSelectedBackground" :
        t extends updateChatThemes ? "ateChatThemes" :
        t extends updateLanguagePackStrings ? "ateLanguagePackStrings" :
        t extends updateConnectionState ? "ateConnectionState" :
        t extends updateTermsOfService ? "ateTermsOfService" :
        t extends updateUsersNearby ? "ateUsersNearby" :
        t extends updateAttachmentMenuBots ? "ateAttachmentMenuBots" :
        t extends updateWebAppMessageSent ? "ateWebAppMessageSent" :
        t extends updateReactions ? "ateReactions" :
        t extends updateDiceEmojis ? "ateDiceEmojis" :
        t extends updateAnimatedEmojiMessageClicked ? "ateAnimatedEmojiMessageClicked" :
        t extends updateAnimationSearchParameters ? "ateAnimationSearchParameters" :
        t extends updateSuggestedActions ? "ateSuggestedActions" :
        t extends updateNewInlineQuery ? "ateNewInlineQuery" :
        t extends updateNewChosenInlineResult ? "ateNewChosenInlineResult" :
        t extends updateNewCallbackQuery ? "ateNewCallbackQuery" :
        t extends updateNewInlineCallbackQuery ? "ateNewInlineCallbackQuery" :
        t extends updateNewShippingQuery ? "ateNewShippingQuery" :
        t extends updateNewPreCheckoutQuery ? "ateNewPreCheckoutQuery" :
        t extends updateNewCustomEvent ? "ateNewCustomEvent" :
        t extends updateNewCustomQuery ? "ateNewCustomQuery" :
        t extends updatePoll ? "atePoll" :
        t extends updatePollAnswer ? "atePollAnswer" :
        t extends updateChatMember ? "ateChatMember" :
        t extends updateNewChatJoinRequest ? "ateNewChatJoinRequest" :
        t extends updateFatalError ? "ateFatalError" :
        never;

    /** Dictionary which contains TDLib options, suitable for a global options storage */
    export interface TdOptions { 
        /** If true, text entities will be automatically parsed in all inputMessageText objects */
        always_parse_markdown?: optionValueBoolean;

        /** If true, new chats from non-contacts will be automatically archived and muted. The option can be set only if the option “can_archive_and_mute_new_chats_from_unknown_users” is true. getOption needs to be called explicitly to fetch the latest value of the option, changed from another device */
        archive_and_mute_new_chats_from_unknown_users?: optionValueBoolean;

        /** If true, animated emoji will be disabled and shown as plain emoji */
        disable_animated_emoji?: optionValueBoolean;

        /** If true, notifications about the user's contacts who have joined Telegram will be disabled. User will still receive the corresponding message in the private chat. getOption needs to be called explicitly to fetch the latest value of the option, changed from another device */
        disable_contact_registered_notifications?: optionValueBoolean;

        /** If true, persistent network statistics will be disabled, which significantly reduces disk usage */
        disable_persistent_network_statistics?: optionValueBoolean;

        /** If true, notifications about outgoing scheduled messages that were sent will be disabled */
        disable_sent_scheduled_message_notifications?: optionValueBoolean;

        /** If true, protection from external time adjustment will be disabled, which significantly reduces disk usage */
        disable_time_adjustment_protection?: optionValueBoolean;

        /** If true, support for top chats and statistics collection is disabled */
        disable_top_chats?: optionValueBoolean;

        /** If true, allows to skip all updates received while the TDLib instance was not running. The option does nothing if the database or secret chats are used */
        ignore_background_updates?: optionValueBoolean;

        /** If true, the disable_notification value specified in the request will be always used instead of the default value */
        ignore_default_disable_notification?: optionValueBoolean;

        /** If true, prevents file thumbnails sent by the server along with messages from being saved on the disk */
        ignore_inline_thumbnails?: optionValueBoolean;

        /** If true, chat and message restrictions specific to the currently used operating system will be ignored */
        ignore_platform_restrictions?: optionValueBoolean;

        /** If true, sensitive content will be shown on all user devices. getOption needs to be called explicitly to fetch the latest value of the option, changed from another device */
        ignore_sensitive_content_restrictions?: optionValueBoolean;

        /** If true, other users will be allowed to see the current user's location. getOption needs to be called explicitly to fetch the latest value of the option, changed from another device */
        is_location_visible?: optionValueBoolean;

        /** Path to a database for storing language pack strings, so that this database can be shared between different accounts. By default, language pack strings are stored only in memory. Changes of value of this option will be applied only after TDLib restart, so it should be set before call to setTdlibParameters. */
        language_pack_database_path?: optionValueString;

        /** Identifier of the currently used language pack from the current localization target */
        language_pack_id?: optionValueString;

        /** Name for the current localization target (currently supported: “android”, “android_x”, “ios”, “macos” and “tdesktop”) */
        localization_target?: optionValueString;

        /** The maximum time messages are stored in memory before they are unloaded, 60-86400; in seconds. Defaults to 60 for users and 1800 for bots */
        message_unload_delay?: optionValueInteger;

        /** Maximum number of notification groups to be shown simultaneously, 0-25 */
        notification_group_count_max?: optionValueInteger;

        /** Maximum number of simultaneously shown notifications in a group, 1-25. Defaults to 10 */
        notification_group_size_max?: optionValueInteger;

        /** Online status of the current user */
        online?: optionValueBoolean;

        /** If true, IPv6 addresses will be preferred over IPv4 addresses */
        prefer_ipv6?: optionValueBoolean;

        /** If true, Perfect Forward Secrecy will be enabled for interaction with the Telegram servers for cloud chats */
        use_pfs?: optionValueBoolean;

        /** If true, quick acknowledgement will be enabled for outgoing messages */
        use_quick_ack?: optionValueBoolean;

        /** If true, the background storage optimizer will be enabled */
        use_storage_optimizer?: optionValueBoolean;

        /** A UTC time offset used for splitting messages by days. The option is reset automatically on each TDLib instance launch, so it needs to be set manually only if the time offset is changed during execution. */
        utc_time_offset?: optionValueInteger;

        /** Username of a bot which can be used in inline mode for animations search */
        animation_search_bot_username?: optionValueString;

        /** An authentication token to be used on subsequent authorizations and received when logging out */
        authentication_token?: optionValueString;

        /** Point in time (Unix timestamp) when authorization was received */
        authorization_date?: optionValueInteger;

        /** Maximum number of members in a basic group */
        basic_group_size_max?: optionValueInteger;

        /** Maximum time to wait for call connection creation to be passed to libtgvoip */
        call_connect_timeout_ms?: optionValueInteger;

        /** Maximum time to wait for call packet delivery to be passed to libtgvoip */
        call_packet_timeout_ms?: optionValueInteger;

        /** If true, the option “archive_and_mute_new_chats_from_unknown_users” can be changed */
        can_archive_and_mute_new_chats_from_unknown_users?: optionValueBoolean;

        /** If true, the option “ignore_sensitive_content_restrictions” can be changed */
        can_ignore_sensitive_content_restrictions?: optionValueBoolean;

        /** Identifier of the bot which is shown as the sender of messages sent on behalf of channels when viewed from an outdated client */
        channel_bot_user_id?: optionValueInteger;

        /** Identifier of the enabled proxy */
        enabled_proxy_id?: optionValueInteger;

        /** If true, access to Telegram is likely blocked for the user */
        expect_blocking?: optionValueBoolean;

        /** Maximum number of favorite stickers */
        favorite_stickers_limit?: optionValueInteger;

        /** Maximum number of forwarded messages per one request */
        forwarded_message_count_max?: optionValueInteger;

        /** Identifier of the bot which is shown as the sender of anonymous messages in groups when viewed from an outdated client */
        group_anonymous_bot_user_id?: optionValueInteger;

        /** Maximum length of a message caption */
        message_caption_length_max?: optionValueInteger;

        /** Maximum length of a message text */
        message_text_length_max?: optionValueInteger;

        /** Identifier of the current user */
        my_id?: optionValueInteger;

        /** Maximum number of pinned cloud chats in the Archive chat list. The same amount of secret chats can be pinned locally */
        pinned_archived_chat_count_max?: optionValueInteger;

        /** Maximum number of pinned cloud chats in the Main chat list. The same amount of secret chats can be pinned locally */
        pinned_chat_count_max?: optionValueInteger;

        /** Username of a bot which can be used in inline mode for photos search */
        photo_search_bot_username?: optionValueString;

        /** Identifier of the @replies bot */
        replies_bot_chat_id?: optionValueInteger;

        /** Identifier of the language pack, suggested for the user by the server */
        suggested_language_pack_id?: optionValueString;

        /** Suggested bit rate for audio encoding in video notes, in kbit/s */
        suggested_video_note_audio_bitrate?: optionValueInteger;

        /** Suggested width and height of the video in video notes */
        suggested_video_note_length?: optionValueInteger;

        /** Suggested bit rate for video encoding in video notes, in kbit/s */
        suggested_video_note_video_bitrate?: optionValueInteger;

        /** Maximum number of members in a supergroup */
        supergroup_size_max?: optionValueInteger;

        /** Current value of t.me URL, i.e. https://t.me/ */
        t_me_url?: optionValueString;

        /** Identifier of the Telegram Service Notifications chat */
        telegram_service_notifications_chat_id?: optionValueInteger;

        /** If true, the test environment is being used instead of the production environment */
        test_mode?: optionValueBoolean;

        /** An estimation of the current Unix timestamp. The option will not be updated automatically unless the difference between the previous estimation and the locally available monotonic clocks changes significantly */
        unix_time?: optionValueInteger;

        /** Username of a bot which can be used in inline mode for venues search */
        venue_search_bot_username?: optionValueString;

        /** TDLib version. This options is guaranteed to come before all other updates since TDLib 1.4.0 */
        version?: optionValueString;

        [key: string]: OptionValue; // The app can store custom options with name starting with 'x-' or 'X-'.
    }
    
    /** Similar to `TdOptions` but contains the values themselves instead of `OptionValue`. */
    export interface TdOptions_pure {
        /** If true, text entities will be automatically parsed in all inputMessageText objects */
        always_parse_markdown?: Bool;

        /** If true, new chats from non-contacts will be automatically archived and muted. The option can be set only if the option “can_archive_and_mute_new_chats_from_unknown_users” is true. getOption needs to be called explicitly to fetch the latest value of the option, changed from another device */
        archive_and_mute_new_chats_from_unknown_users?: Bool;

        /** If true, animated emoji will be disabled and shown as plain emoji */
        disable_animated_emoji?: Bool;

        /** If true, notifications about the user's contacts who have joined Telegram will be disabled. User will still receive the corresponding message in the private chat. getOption needs to be called explicitly to fetch the latest value of the option, changed from another device */
        disable_contact_registered_notifications?: Bool;

        /** If true, persistent network statistics will be disabled, which significantly reduces disk usage */
        disable_persistent_network_statistics?: Bool;

        /** If true, notifications about outgoing scheduled messages that were sent will be disabled */
        disable_sent_scheduled_message_notifications?: Bool;

        /** If true, protection from external time adjustment will be disabled, which significantly reduces disk usage */
        disable_time_adjustment_protection?: Bool;

        /** If true, support for top chats and statistics collection is disabled */
        disable_top_chats?: Bool;

        /** If true, allows to skip all updates received while the TDLib instance was not running. The option does nothing if the database or secret chats are used */
        ignore_background_updates?: Bool;

        /** If true, the disable_notification value specified in the request will be always used instead of the default value */
        ignore_default_disable_notification?: Bool;

        /** If true, prevents file thumbnails sent by the server along with messages from being saved on the disk */
        ignore_inline_thumbnails?: Bool;

        /** If true, chat and message restrictions specific to the currently used operating system will be ignored */
        ignore_platform_restrictions?: Bool;

        /** If true, sensitive content will be shown on all user devices. getOption needs to be called explicitly to fetch the latest value of the option, changed from another device */
        ignore_sensitive_content_restrictions?: Bool;

        /** If true, other users will be allowed to see the current user's location. getOption needs to be called explicitly to fetch the latest value of the option, changed from another device */
        is_location_visible?: Bool;

        /** Path to a database for storing language pack strings, so that this database can be shared between different accounts. By default, language pack strings are stored only in memory. Changes of value of this option will be applied only after TDLib restart, so it should be set before call to setTdlibParameters. */
        language_pack_database_path?: string;

        /** Identifier of the currently used language pack from the current localization target */
        language_pack_id?: string;

        /** Name for the current localization target (currently supported: “android”, “android_x”, “ios”, “macos” and “tdesktop”) */
        localization_target?: string;

        /** The maximum time messages are stored in memory before they are unloaded, 60-86400; in seconds. Defaults to 60 for users and 1800 for bots */
        message_unload_delay?: int64;

        /** Maximum number of notification groups to be shown simultaneously, 0-25 */
        notification_group_count_max?: int64;

        /** Maximum number of simultaneously shown notifications in a group, 1-25. Defaults to 10 */
        notification_group_size_max?: int64;

        /** Online status of the current user */
        online?: Bool;

        /** If true, IPv6 addresses will be preferred over IPv4 addresses */
        prefer_ipv6?: Bool;

        /** If true, Perfect Forward Secrecy will be enabled for interaction with the Telegram servers for cloud chats */
        use_pfs?: Bool;

        /** If true, quick acknowledgement will be enabled for outgoing messages */
        use_quick_ack?: Bool;

        /** If true, the background storage optimizer will be enabled */
        use_storage_optimizer?: Bool;

        /** A UTC time offset used for splitting messages by days. The option is reset automatically on each TDLib instance launch, so it needs to be set manually only if the time offset is changed during execution. */
        utc_time_offset?: int64;

        /** Username of a bot which can be used in inline mode for animations search */
        animation_search_bot_username?: string;

        /** An authentication token to be used on subsequent authorizations and received when logging out */
        authentication_token?: string;

        /** Point in time (Unix timestamp) when authorization was received */
        authorization_date?: int64;

        /** Maximum number of members in a basic group */
        basic_group_size_max?: int64;

        /** Maximum time to wait for call connection creation to be passed to libtgvoip */
        call_connect_timeout_ms?: int64;

        /** Maximum time to wait for call packet delivery to be passed to libtgvoip */
        call_packet_timeout_ms?: int64;

        /** If true, the option “archive_and_mute_new_chats_from_unknown_users” can be changed */
        can_archive_and_mute_new_chats_from_unknown_users?: Bool;

        /** If true, the option “ignore_sensitive_content_restrictions” can be changed */
        can_ignore_sensitive_content_restrictions?: Bool;

        /** Identifier of the bot which is shown as the sender of messages sent on behalf of channels when viewed from an outdated client */
        channel_bot_user_id?: int64;

        /** Identifier of the enabled proxy */
        enabled_proxy_id?: int64;

        /** If true, access to Telegram is likely blocked for the user */
        expect_blocking?: Bool;

        /** Maximum number of favorite stickers */
        favorite_stickers_limit?: int64;

        /** Maximum number of forwarded messages per one request */
        forwarded_message_count_max?: int64;

        /** Identifier of the bot which is shown as the sender of anonymous messages in groups when viewed from an outdated client */
        group_anonymous_bot_user_id?: int64;

        /** Maximum length of a message caption */
        message_caption_length_max?: int64;

        /** Maximum length of a message text */
        message_text_length_max?: int64;

        /** Identifier of the current user */
        my_id?: int64;

        /** Maximum number of pinned cloud chats in the Archive chat list. The same amount of secret chats can be pinned locally */
        pinned_archived_chat_count_max?: int64;

        /** Maximum number of pinned cloud chats in the Main chat list. The same amount of secret chats can be pinned locally */
        pinned_chat_count_max?: int64;

        /** Username of a bot which can be used in inline mode for photos search */
        photo_search_bot_username?: string;

        /** Identifier of the @replies bot */
        replies_bot_chat_id?: int64;

        /** Identifier of the language pack, suggested for the user by the server */
        suggested_language_pack_id?: string;

        /** Suggested bit rate for audio encoding in video notes, in kbit/s */
        suggested_video_note_audio_bitrate?: int64;

        /** Suggested width and height of the video in video notes */
        suggested_video_note_length?: int64;

        /** Suggested bit rate for video encoding in video notes, in kbit/s */
        suggested_video_note_video_bitrate?: int64;

        /** Maximum number of members in a supergroup */
        supergroup_size_max?: int64;

        /** Current value of t.me URL, i.e. https://t.me/ */
        t_me_url?: string;

        /** Identifier of the Telegram Service Notifications chat */
        telegram_service_notifications_chat_id?: int64;

        /** If true, the test environment is being used instead of the production environment */
        test_mode?: Bool;

        /** An estimation of the current Unix timestamp. The option will not be updated automatically unless the difference between the previous estimation and the locally available monotonic clocks changes significantly */
        unix_time?: int64;

        /** Username of a bot which can be used in inline mode for venues search */
        venue_search_bot_username?: string;

        /** TDLib version. This options is guaranteed to come before all other updates since TDLib 1.4.0 */
        version?: string;
        
        [key: string]: string | Bool | int64; // The app can store custom options with name starting with 'x-' or 'X-'.
    }

    export type TdOptionKey= 'always_parse_markdown' | 'archive_and_mute_new_chats_from_unknown_users' | 'disable_animated_emoji' | 'disable_contact_registered_notifications' | 'disable_persistent_network_statistics' | 'disable_sent_scheduled_message_notifications' | 'disable_time_adjustment_protection' | 'disable_top_chats' | 'ignore_background_updates' | 'ignore_default_disable_notification' | 'ignore_inline_thumbnails' | 'ignore_platform_restrictions' | 'ignore_sensitive_content_restrictions' | 'is_location_visible' | 'language_pack_database_path' | 'language_pack_id' | 'localization_target' | 'message_unload_delay' | 'notification_group_count_max' | 'notification_group_size_max' | 'online' | 'prefer_ipv6' | 'use_pfs' | 'use_quick_ack' | 'use_storage_optimizer' | 'utc_time_offset' | 'animation_search_bot_username' | 'authentication_token' | 'authorization_date' | 'basic_group_size_max' | 'call_connect_timeout_ms' | 'call_packet_timeout_ms' | 'can_archive_and_mute_new_chats_from_unknown_users' | 'can_ignore_sensitive_content_restrictions' | 'channel_bot_user_id' | 'enabled_proxy_id' | 'expect_blocking' | 'favorite_stickers_limit' | 'forwarded_message_count_max' | 'group_anonymous_bot_user_id' | 'message_caption_length_max' | 'message_text_length_max' | 'my_id' | 'pinned_archived_chat_count_max' | 'pinned_chat_count_max' | 'photo_search_bot_username' | 'replies_bot_chat_id' | 'suggested_language_pack_id' | 'suggested_video_note_audio_bitrate' | 'suggested_video_note_length' | 'suggested_video_note_video_bitrate' | 'supergroup_size_max' | 't_me_url' | 'telegram_service_notifications_chat_id' | 'test_mode' | 'unix_time' | 'venue_search_bot_username' | 'version' | `x-${string}` | `X-${string}`;

    export type TdOptionKey_writable = 'always_parse_markdown' | 'archive_and_mute_new_chats_from_unknown_users' | 'disable_animated_emoji' | 'disable_contact_registered_notifications' | 'disable_persistent_network_statistics' | 'disable_sent_scheduled_message_notifications' | 'disable_time_adjustment_protection' | 'disable_top_chats' | 'ignore_background_updates' | 'ignore_default_disable_notification' | 'ignore_inline_thumbnails' | 'ignore_platform_restrictions' | 'ignore_sensitive_content_restrictions' | 'is_location_visible' | 'language_pack_database_path' | 'language_pack_id' | 'localization_target' | 'message_unload_delay' | 'notification_group_count_max' | 'notification_group_size_max' | 'online' | 'prefer_ipv6' | 'use_pfs' | 'use_quick_ack' | 'use_storage_optimizer' | 'utc_time_offset' | `x-${string}` | `X-${string}`;

    export type TdOptionType<T extends TdOptionKey | TdOptionKey_writable, U extends T>=
        U extends "always_parse_markdown" ? optionValueBoolean :
        U extends "archive_and_mute_new_chats_from_unknown_users" ? optionValueBoolean :
        U extends "disable_animated_emoji" ? optionValueBoolean :
        U extends "disable_contact_registered_notifications" ? optionValueBoolean :
        U extends "disable_persistent_network_statistics" ? optionValueBoolean :
        U extends "disable_sent_scheduled_message_notifications" ? optionValueBoolean :
        U extends "disable_time_adjustment_protection" ? optionValueBoolean :
        U extends "disable_top_chats" ? optionValueBoolean :
        U extends "ignore_background_updates" ? optionValueBoolean :
        U extends "ignore_default_disable_notification" ? optionValueBoolean :
        U extends "ignore_inline_thumbnails" ? optionValueBoolean :
        U extends "ignore_platform_restrictions" ? optionValueBoolean :
        U extends "ignore_sensitive_content_restrictions" ? optionValueBoolean :
        U extends "is_location_visible" ? optionValueBoolean :
        U extends "language_pack_database_path" ? optionValueString :
        U extends "language_pack_id" ? optionValueString :
        U extends "localization_target" ? optionValueString :
        U extends "message_unload_delay" ? optionValueInteger :
        U extends "notification_group_count_max" ? optionValueInteger :
        U extends "notification_group_size_max" ? optionValueInteger :
        U extends "online" ? optionValueBoolean :
        U extends "prefer_ipv6" ? optionValueBoolean :
        U extends "use_pfs" ? optionValueBoolean :
        U extends "use_quick_ack" ? optionValueBoolean :
        U extends "use_storage_optimizer" ? optionValueBoolean :
        U extends "utc_time_offset" ? optionValueInteger :
        U extends "animation_search_bot_username" ? optionValueString :
        U extends "authentication_token" ? optionValueString :
        U extends "authorization_date" ? optionValueInteger :
        U extends "basic_group_size_max" ? optionValueInteger :
        U extends "call_connect_timeout_ms" ? optionValueInteger :
        U extends "call_packet_timeout_ms" ? optionValueInteger :
        U extends "can_archive_and_mute_new_chats_from_unknown_users" ? optionValueBoolean :
        U extends "can_ignore_sensitive_content_restrictions" ? optionValueBoolean :
        U extends "channel_bot_user_id" ? optionValueInteger :
        U extends "enabled_proxy_id" ? optionValueInteger :
        U extends "expect_blocking" ? optionValueBoolean :
        U extends "favorite_stickers_limit" ? optionValueInteger :
        U extends "forwarded_message_count_max" ? optionValueInteger :
        U extends "group_anonymous_bot_user_id" ? optionValueInteger :
        U extends "message_caption_length_max" ? optionValueInteger :
        U extends "message_text_length_max" ? optionValueInteger :
        U extends "my_id" ? optionValueInteger :
        U extends "pinned_archived_chat_count_max" ? optionValueInteger :
        U extends "pinned_chat_count_max" ? optionValueInteger :
        U extends "photo_search_bot_username" ? optionValueString :
        U extends "replies_bot_chat_id" ? optionValueInteger :
        U extends "suggested_language_pack_id" ? optionValueString :
        U extends "suggested_video_note_audio_bitrate" ? optionValueInteger :
        U extends "suggested_video_note_length" ? optionValueInteger :
        U extends "suggested_video_note_video_bitrate" ? optionValueInteger :
        U extends "supergroup_size_max" ? optionValueInteger :
        U extends "t_me_url" ? optionValueString :
        U extends "telegram_service_notifications_chat_id" ? optionValueInteger :
        U extends "test_mode" ? optionValueBoolean :
        U extends "unix_time" ? optionValueInteger :
        U extends "venue_search_bot_username" ? optionValueString :
        U extends "version" ? optionValueString :
        T;
    
}
export default TdApi;
