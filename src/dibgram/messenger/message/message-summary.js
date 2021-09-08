import usersStore from '../users-store';

/**
 * Gets a textual representation of the message, and optionally a thumbnail.
 * Usage examples: 
 * - Last message in chat list
 * - Pinned message
 * - Replies
 * - Search results
 * @param {import("tdweb").TdObject} message The message to be converted to text
 * @param {import("tdweb").TdObject} chat If given, sender name will be included
 * @returns An array. First and second items are text and have different color. Third item, if present, is an array containing a thumbnail and a mini-thumbnail
 */
export default function getMessageSummary(message, chat) {
}
