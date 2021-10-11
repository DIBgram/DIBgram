/**
 * 
 * @param {import("../TdWeb/td_api").TdApi.td_User} user 
 * @returns 
 */
export function getUserFullName(user) {
    return user.last_name ? (user.first_name +' '+ user.last_name) : user.first_name;
}